---
code: S17
duration: ~1 săptămână
---

# @intro
O imagine e doar un tensor de numere, adică o grilă de numere cu mai multe dimensiuni. Înainte de rețelele neuronale (de la Lecția 14), merită să înțelegi ce faci cu ea: cum o reprezinți, ce e un filtru de convoluție, și ce augmentare ajută fără să strice eticheta. Modulul ăsta e puntea spre CNN-uri, rețelele pentru imagini din Lecția 17: dacă înțelegi imaginea ca tensor și convoluția de mână, straturile convoluționale de mai târziu nu mai sunt magie.

## Imaginea ca tensor
Un tensor e o grilă de numere cu mai multe dimensiuni, generalizarea unei matrice. Un singur număr are 0 dimensiuni, o listă de numere are 1, un tabel cu rânduri și coloane (o matrice) are 2, iar un teanc de tabele are 3. La un array NumPy, numărul de dimensiuni e numărul de valori din `shape` (Lecția 4): un array cu forma (2, 3) are 2 dimensiuni. NumPy îi spune ndarray, PyTorch (Lecția 14) îi spune tensor, dar ideea e aceeași.

O imagine alb-negru e o matrice 2D: fiecare număr e intensitatea unui pixel, adică cât de luminos e, de la 0 (negru) la 255 (alb). O imagine color e un tensor 3D: înălțime, lățime și 3 canale (roșu, verde, albastru). Fiecare pixel color e trei numere: (255, 0, 0) e roșu aprins, (255, 255, 0) e galben, iar (255, 255, 255) e alb. O poză de telefon de 4000 pe 3000 de pixeli are deci 4000 · 3000 · 3 = 36 de milioane de numere.

> [!NOTE]
> Ai grijă la dtype și la interval. Pixelii vin fie ca întregi de la 0 la 255, fie ca zecimale de la 0 la 1. Imaginea citită cu Pillow în Lecția 4 avea dtype `uint8`, adică întregi fără minus, pe 8 biți: exact numerele de la 0 la 255. Nu le amesteca: un model antrenat pe 0 până la 1 primește gunoi dacă îi dai 0 până la 255. Normalizarea la același interval e prima grijă. Și nu face calcule direct în `uint8`: acolo 250 + 10 dă 4, pentru că rezultatul trece de 255 și o ia de la 0.

```
img.shape       # (H, W, 3): înălțime, lățime, 3 canale color
img = img / 255.0   # aduci de la 0..255 la 0..1
```

`img` e aici array-ul NumPy al unei poze, ca `a` din Lecția 4. H vine de la height (înălțimea, numărul de rânduri de pixeli), iar W de la width (lățimea, numărul de coloane). `img / 255.0` împarte fiecare pixel la 255, prin broadcasting (Lecția 4), și dă un array cu zecimale, de tip `float64`: 255 devine 1.0, 51 devine 0.2, iar 0 rămâne 0.0.

## Convoluția: filtre care se plimbă peste imagine
Un filtru de convoluție e o matrice mică (de exemplu 3x3) pe care o plimbi peste imagine. La fiecare poziție, înmulțești filtrul cu bucata de imagine de sub el și aduni: fiecare număr din filtru cu pixelul de sub el, apoi aduni cele 9 produse. Suma devine un pixel din imaginea nouă. Rezultatul e o nouă imagine care scoate în evidență un anumit tipar: margini, blur, contrast.

Merită să scrii de mână câteva filtre clasice o dată. Blur mediază vecinii (netezește): toate cele 9 numere ale filtrului sunt 1/9, deci rezultatul e media celor 9 pixeli de sub el. Sharpen accentuează diferențele: are 5 în mijloc, -1 sus, jos, la stânga și la dreapta, și 0 în colțuri. Pe o zonă uniformă, cu toți pixelii 10, dă 5 · 10 - 4 · 10 = 10, deci nu schimbă nimic, dar lângă o margine întunecă partea întunecată și luminează partea luminoasă. Sobel detectează margini, unde intensitatea se schimbă brusc.

Când le-ai scris o dată, înțelegi exact ce face un strat convoluțional dintr-o rețea (Lecția 17): aceeași operație, doar că filtrele sunt învățate, nu scrise de tine. Cele 9 numere din filtru sunt parametri, ca greutățile din Lecția 7.

```
import numpy as np

sobel_x = np.array([[-1, 0, 1],
                    [-2, 0, 2],
                    [-1, 0, 1]])
# plimbi sobel_x peste imagine ca să scoți marginile verticale

bucata = np.array([[0, 0, 9],
                   [0, 0, 9],
                   [0, 0, 9]])    # întunecat la stânga, luminos la dreapta
print((bucata * sobel_x).sum())   # 36
```

`bucata` e un pătrat de 3x3 dintr-o imagine, cu o margine verticală: pixeli de 0 (negru) la stânga și de 9 (luminos) la dreapta. Numerele sunt mici ca să le poți verifica cu creionul. `bucata * sobel_x` înmulțește pe poziții, ca în Lecția 4, iar `.sum()` adună tot. De mână, pe rânduri: -1 · 0 + 0 · 0 + 1 · 9 = 9, apoi -2 · 0 + 0 · 0 + 2 · 9 = 18, apoi iar 9, deci 9 + 18 + 9 = 36.

Pe o bucată uniformă, cu toți pixelii 9, ar ieși (-9 + 9) + (-18 + 18) + (-9 + 9) = 0. Un număr mare înseamnă margine, iar 0 înseamnă zonă uniformă. Blur pe aceeași bucată dă media: (0 + 0 + 9) · 3 / 9 = 3.

Ca să obții toată imaginea nouă, repeți calculul în fiecare poziție. Funcția de mai jos face asta pe o imagine de 4 pe 6 pixeli, cu 0 în stânga și 9 în dreapta, și folosește `np` și `sobel_x` din blocul de mai sus.

```
img = np.array([[0, 0, 0, 9, 9, 9],
                [0, 0, 0, 9, 9, 9],
                [0, 0, 0, 9, 9, 9],
                [0, 0, 0, 9, 9, 9]], dtype=float)

def convolutie(img, filtru):
    H, W = img.shape
    rez = np.zeros((H - 2, W - 2))
    for i in range(H - 2):
        for j in range(W - 2):
            bucata = img[i:i + 3, j:j + 3]       # fereastra de 3x3
            rez[i, j] = (bucata * filtru).sum()  # înmulțești și aduni
    return rez

blur = np.ones((3, 3)) / 9
print(convolutie(img, blur))
# [[0. 3. 6. 9.]
#  [0. 3. 6. 9.]]
print(convolutie(img, sobel_x))
# [[ 0. 36. 36.  0.]
#  [ 0. 36. 36.  0.]]
```

Intră o imagine alb-negru (un array 2D) și un filtru de 3x3; iese imaginea filtrată. `img[i:i + 3, j:j + 3]` e felia de 3 rânduri și 3 coloane care începe la rândul i și coloana j. `dtype=float` face pixelii zecimale, ca să eviți surprizele de la `uint8`, iar `np.ones((3, 3)) / 9` e filtrul de blur.

Rezultatul are 2 pe 4 pixeli, nu 4 pe 6, pentru că filtrul încape doar în 2 poziții pe verticală și în 4 pe orizontală. În Lecția 17 vezi cum păstrezi mărimea cu padding, o ramă de zerouri pusă în jurul imaginii. Blur-ul a transformat saltul brusc de la 0 la 9 într-o trecere lină: 0, 3, 6, 9. Sobel dă 36 doar lângă margine și 0 pe zonele uniforme din ambele părți.

## Augmentarea datelor
Când ai puține imagini, modelul memorează (overfitting, din Lecția 1). Augmentarea mărește artificial setul creând variante ale imaginilor: le întorci, le rotești, le decupezi, le schimbi puțin culorile. Modelul vede aceeași etichetă în forme ușor diferite și învață să generalizeze, nu să memoreze. Dacă în toate pozele tale pisica are capul în stânga, modelul poate învăța „pisică = cap în stânga”. După un flip, vede pisica și cu capul în dreapta.

- Flip orizontal: oglindește imaginea stânga-dreapta.
- Rotație și decupare aleatoare: schimbă poziția și cadrul, de exemplu rotești cu câteva grade sau păstrezi doar o bucată dintr-un loc ales la întâmplare.
- Color jitter: variază ușor luminozitatea și culoarea, ca la aceeași poză făcută dimineața, seara sau la neon (jitter înseamnă tremur).
- Cutout: acoperă o bucată aleatoare cu un pătrat negru, ca un deget pus peste obiectiv, forțând modelul să nu se bazeze pe un singur detaliu.

Pe un array, flip-ul și rotația doar mută numerele. Uite ce fac pe un array mic de 2 pe 3:

```
import numpy as np

a = np.array([[1, 2, 3],
              [4, 5, 6]])
print(np.fliplr(a))   # oglindă stânga-dreapta
# [[3 2 1]
#  [6 5 4]]
print(np.rot90(a))    # rotație cu 90°, invers acelor de ceasornic
# [[3 6]
#  [2 5]
#  [1 4]]
```

`np.fliplr` inversează ordinea coloanelor. Pe o imagine de forma (H, W, 3) face același lucru, deci o oglindește și lasă canalele neatinse. `np.rot90` rotește cu 90 de grade, iar forma (2, 3) devine (3, 2): la o imagine, înălțimea și lățimea își schimbă locul.

În practică nu le scrii de mână. torchvision, biblioteca pentru imagini a lui PyTorch (o folosești de la Lecția 14), le are gata făcute, cu tot cu partea aleatoare:

```
from PIL import Image
from torchvision import transforms

aug = transforms.Compose([
    transforms.Resize((64, 64)),              # toate pozele la 64x64
    transforms.RandomHorizontalFlip(p=0.5),   # flip, cu șansa 50%
    transforms.RandomRotation(15),            # între -15 și 15 grade
    transforms.RandomCrop(56),                # o bucată de 56x56
    transforms.ColorJitter(brightness=0.2),   # luminozitate x0.8 ... x1.2
    transforms.ToTensor(),                    # tensor (3, H, W), 0 ... 1
    transforms.RandomErasing(p=0.5),          # cutout, cu șansa 50%
])

img = Image.open("pisica.jpg").convert("RGB")
x = aug(img)              # la fiecare apel, altă variantă
print(x.shape)            # torch.Size([3, 56, 56])
```

Aici `img` e poza deschisă cu Pillow, ca în Lecția 4, nu un array. `Compose` pune transformările în lanț: poza trece prin ele pe rând, de sus în jos. Cele cu Random în nume dau cu banul la fiecare apel: `p=0.5` înseamnă că se aplică în jumătate din cazuri, iar unghiul și locul decupării se aleg la întâmplare. `ColorJitter(brightness=0.2)` înmulțește luminozitatea cu un număr ales la întâmplare între 0.8 și 1.2. Așa, de fiecare dată când modelul cere poza, vede altă variantă, fără să salvezi copii pe disc.

`ToTensor` face din poza Pillow un tensor PyTorch cu valori de la 0 la 1, dar cu canalele primele: forma e (3, H, W), nu (H, W, 3) ca în NumPy. `RandomErasing` e cutout-ul și vine după `ToTensor`, pentru că lucrează pe tensori.

Augmentările le aplici doar pe datele de antrenare. Pe validare și test lași imaginile neschimbate, ca scorul să arate cât de bine merge modelul pe poze reale.

> [!NOTE]
> Un singur lucru contează la augmentare: transformarea trebuie să păstreze eticheta. Un flip orizontal la o pisică e tot o pisică, deci e valid. Dar la cifra 2 sau la litera b, flip-ul schimbă sensul, deci NU e valid. La fel, un 6 rotit cu 180 de grade devine 9. Gândește-te mereu dacă transformarea ar schimba răspunsul corect.

# @practice
- Scrie de mână un filtru Sobel și aplică-l pe o imagine ca să-i scoți marginile.
- Testează dacă un set de augmentări îmbunătățește scorul pe o problemă mică de clasificare.
- Ia o listă de augmentări și decide pentru fiecare dacă păstrează eticheta pe o problemă cu cifre.
