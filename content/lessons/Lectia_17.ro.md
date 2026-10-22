---
code: S21
duration: ~1 săptămână
---

# @intro
CNN-urile (rețele convoluționale) sunt uneltele pentru imagini. În loc să conecteze fiecare pixel la fiecare neuron, ceea ce ar fi enorm, folosesc filtre mici care se plimbă peste imagine. Așa învață trăsături locale (tipare mici dintr-o zonă a imaginii: margini, colțuri, apoi forme) eficient și cu puține greutăți. Ai văzut convoluția de mână în Lecția 13, cu filtre scrise de tine; aici rețeaua își învață singură filtrele.

## De ce nu un MLP obișnuit pe imagini
Un MLP (rețeaua din Lecția 14, în care fiecare neuron e legat de toate intrările) ar primi imaginea ca pe un șir lung de numere. O imagine color de 224x224 are 224 · 224 · 3 = 150 528 de numere (trei canale pe pixel, Lecția 13). Un neuron legat de toate are 150 528 de greutăți, iar un prim strat cu 1000 de neuroni are aproximativ 150 de milioane. Prea multe: model uriaș, lent, care face overfitting imediat (învață pe de rost imaginile de antrenare și greșește pe cele noi, Lecția 1).

În plus, un MLP tratează fiecare pixel independent și pierde faptul că pixelii vecini formează structuri. Imaginea intră în el întinsă într-un singur rând, ca după `flatten()` din Lecția 4, așa că rețeaua nu știe care pixeli erau vecini. Dacă ai amesteca ordinea pixelilor la fel în toate imaginile, un MLP ar învăța la fel de bine, deși tu n-ai mai recunoaște nimic în poze.

CNN-urile exploatează două idei. Localitate: trăsăturile utile (o margine) sunt locale, deci un filtru mic ajunge. Ca să afli dacă într-un punct e o margine, îți ajunge pătratul 3x3 din jurul lui. Partajarea greutăților: același filtru se plimbă peste toată imaginea, deci o margine e recunoscută oriunde apare, cu aceleași greutăți. Așa lucrează și filtrul Sobel din Lecția 13: aceleași 9 numere găsesc marginile din toată imaginea.

Cu numere: un filtru 3x3 pe o imagine color acoperă 3 · 3 · 3 = 27 de numere (3x3 pixeli, câte 3 canale), deci are 27 de greutăți plus un termen liber, ca la perceptronul din Lecția 14. Atât, oricât de mare ar fi imaginea, 32x32 sau 224x224. Un strat cu 64 de filtre are 64 · 28 = 1792 de parametri (numerele pe care le învață), față de cele 150 de milioane de mai sus. Puține greutăți, multă putere.

## Stratul convoluțional: kernel, stride, padding
Un strat convoluțional aplică mai multe filtre învățate peste intrare, fiecare producând o hartă de trăsături care evidențiază un anumit tipar. Harta de trăsături (feature map) e grila de numere scoasă de un singur filtru: câte un număr pentru fiecare poziție a filtrului, mare acolo unde apare tiparul. Imaginea cu margini pe care o dă filtrul Sobel din Lecția 13 e o hartă de trăsături. Atenție la cuvânt: aici o trăsătură e un tipar din imagine, nu o coloană dintr-un tabel ca în lecțiile cu date tabelare.

Un strat cu 16 filtre scoate 16 hărți, așezate una peste alta ca niște canale: intră 3 canale de culoare, ies 16. Fiecare filtru trece prin toate canalele de intrare deodată, de aceea un filtru 3x3 pe o imagine color are 3 · 3 · 3 greutăți. Numerele din filtre sunt greutăți ca oricare altele: pornesc la întâmplare și sunt ajustate prin coborâre pe gradient (Lecția 14).

Trei setări definesc cum se plimbă filtrul.

- Kernel: mărimea filtrului (de obicei 3x3). Cât de mare e fereastra care se plimbă. Pe un rând de 5 pixeli, o fereastră de 3 poate porni de la pixelul 1, 2 sau 3, deci ieșirea are 3 numere.
- Stride: cu cât sare filtrul la fiecare pas. Stride 2 sare din doi în doi, micșorând ieșirea. Pe un rând de 7 pixeli, cu kernel 3 și stride 2, fereastra pornește de la pixelii 1, 3 și 5, deci ieșirea are 3 numere în loc de 5.
- Padding: cât umpli cu zerouri marginile, ca ieșirea să nu se micșoreze prea repede și colțurile să conteze. Padding 1 pune o ramă de zerouri lată de un pixel: rândul de 5 devine 7, iar kernelul 3 dă din nou 5 numere.

Trebuie să știi să calculezi dimensiunea ieșirii, altfel nu poți lega straturile corect. De exemplu, stratul `nn.Linear` de la finalul rețelei (Lecția 14) trebuie să știe câte numere primește, iar dacă greșești, PyTorch se oprește cu o eroare de formă (shape). E o formulă simplă pe care o aplici pentru fiecare strat.

> [!FORMULA]
> ieșire = (intrare - kernel + 2·padding) / stride + 1
> Pentru o intrare de 32, kernel 3, padding 1, stride 1: (32 - 3 + 2) / 1 + 1 = 32. Dimensiunea se păstrează.

Intrarea și ieșirea sunt lățimea (sau înălțimea) în pixeli; la o imagine pătrată, amândouă dau același rezultat. Cu stride 2, împărțirea poate să nu iasă exact. Pentru intrare 32, kernel 3, padding 1 și stride 2: (32 - 3 + 2) / 2 + 1 = 31 / 2 + 1 = 15.5 + 1. Împărțirea se rotunjește în jos, la 15, pentru că filtrul nu poate porni de la o jumătate de pixel. Ieșirea are 15 + 1 = 16 pixeli, deci stride 2 a înjumătățit imaginea. PyTorch rotunjește la fel.

## Pooling și câmpul receptiv
Pooling-ul micșorează harta de trăsături, luând de exemplu maximul din fiecare fereastră 2x2 (max pooling). În codul de mai jos, o hartă de 4x4 devine 2x2. PyTorch lucrează cu loturi de imagini (batch, Lecția 15) de forma (N, C, H, W): numărul de imagini, canalele, înălțimea și lățimea. Canalele vin primele, nu la final ca în Lecția 13, de aceea grila de 4x4 e pusă în forma (1, 1, 4, 4).

```
import torch
import torch.nn as nn

x = torch.tensor([[1, 3, 2, 0],
                  [4, 2, 1, 1],
                  [0, 1, 5, 6],
                  [2, 0, 7, 3]])
x = x.reshape(1, 1, 4, 4)    # 1 imagine, 1 canal, 4x4
pool = nn.MaxPool2d(2)       # ferestre 2x2, sare din 2 în 2
print(pool(x).reshape(2, 2))
# tensor([[4, 2],
#         [2, 7]])
```

Fereastra 2x2 sare din doi în doi, deci cele 16 numere se împart în patru pătrate, iar din fiecare rămâne cel mai mare. Din pătratul din stânga sus (1, 3, 4, 2) rămâne 4, iar din cel din dreapta jos (5, 6, 7, 3) rămâne 7. Pooling-ul nu are greutăți de învățat. Păstrează cât de clar a apărut tiparul în fiecare zonă și uită poziția lui exactă.

Reduce dimensiunea, deci calculul, și mărește câmpul receptiv: cât din imaginea originală vede un neuron. Aici un neuron e un număr dintr-o hartă de trăsături, iar el depinde doar de o bucată din imagine. După o convoluție 3x3, fiecare număr vede 3x3 pixeli. După a doua convoluție, o fereastră 3x3 adună 3x3 numere din prima hartă, care împreună acoperă 5x5 pixeli (trei ferestre de câte 3 pixeli, decalate cu câte unul, acoperă 5). După a treia convoluție, câmpul receptiv e 7x7.

După un pooling 2x2, un pas pe hartă înseamnă 2 pixeli în imagine, deci convoluțiile de după el lărgesc câmpul receptiv de două ori mai repede. Straturile de sus (ultimele, cele mai departe de imagine), cu câmp receptiv mare, văd forme întregi, iar primele văd doar margini.

La finalul unui CNN vin de obicei câteva straturi dense (fully connected): straturi în care fiecare neuron e legat de toate numerele de intrare, ca în MLP-ul din Lecția 14, adică `nn.Linear` în PyTorch. Global average pooling e o alternativă curată la straturile dense de la final: mediază fiecare hartă de trăsături într-un singur număr. Are mai puține greutăți și face mai puțin overfitting decât straturile dense mari.

Un exemplu cu numere. VGG, o rețea clasică din secțiunea următoare, întinde la final 512 hărți de 7x7 într-un rând de 512 · 7 · 7 = 25 088 de numere. Le leagă de un strat dens cu 4096 de neuroni: peste 102 milioane de greutăți, doar acolo. Cu global average pooling rămân 512 numere, unul pe hartă, iar un strat dens de la ele la 10 clase are 512 · 10 + 10 = 5130 de parametri.

## Arhitecturi clasice și ResNet
Tiparul clasic al unui CNN: alternezi straturi convoluționale și pooling, care extrag trăsături din ce în ce mai abstracte, apoi la final un cap de clasificare care dă clasa. Mai abstracte înseamnă că primele straturi găsesc margini, următoarele colțuri și texturi, iar ultimele bucăți de obiecte, ca un ochi sau o roată. Capul de clasificare e ultimul strat (sau ultimele câteva): primește trăsăturile și dă câte un scor pentru fiecare clasă, iar clasa cu scorul cel mai mare e predicția.

Codul de mai jos construiește un CNN mic pentru imagini color de 32x32 cu 10 clase și afișează forma datelor după fiecare strat.

```
import torch
import torch.nn as nn

torch.manual_seed(0)
model = nn.Sequential(
    nn.Conv2d(3, 16, kernel_size=3, padding=1),    # 16 filtre 3x3
    nn.ReLU(),
    nn.MaxPool2d(2),                               # 32x32 -> 16x16
    nn.Conv2d(16, 32, kernel_size=3, padding=1),   # 32 de filtre 3x3
    nn.ReLU(),
    nn.MaxPool2d(2),                               # 16x16 -> 8x8
    nn.AdaptiveAvgPool2d(1),                       # global average pooling
    nn.Flatten(),
    nn.Linear(32, 10),                             # capul: 10 clase
)

x = torch.randn(8, 3, 32, 32)   # un lot: 8 imagini color de 32x32
for strat in model:
    x = strat(x)
    print(type(strat).__name__, tuple(x.shape))
# Conv2d (8, 16, 32, 32)
# ReLU (8, 16, 32, 32)
# MaxPool2d (8, 16, 16, 16)
# Conv2d (8, 32, 16, 16)
# ReLU (8, 32, 16, 16)
# MaxPool2d (8, 32, 8, 8)
# AdaptiveAvgPool2d (8, 32, 1, 1)
# Flatten (8, 32)
# Linear (8, 10)
```

`nn.Sequential` leagă straturile în lanț: ieșirea unuia intră în următorul, iar bucla `for` le ia pe rând. `nn.Conv2d(3, 16, kernel_size=3, padding=1)` primește 3 canale și are 16 filtre, deci scoate 16 hărți, iar padding 1 păstrează mărimea. ReLU (taie negativele la zero, Lecția 14) nu schimbă forma. `nn.MaxPool2d(2)` e max pooling cu ferestre 2x2, iar `nn.AdaptiveAvgPool2d(1)` e global average pooling: lasă din fiecare hartă un singur număr. `nn.Flatten()` transformă forma (8, 32, 1, 1) în (8, 32), un rând pe imagine. `nn.Linear(32, 10)` e capul: 10 scoruri pe imagine. `type(strat).__name__` dă doar numele stratului, ca să știi ce rând e ce.

Ce iese: după fiecare strat vezi forma (imagini, canale, înălțime, lățime). Convoluțiile schimbă numărul de canale, pooling-ul înjumătățește înălțimea și lățimea, iar la final rămân 10 numere pe imagine. Tot modelul are doar 5418 parametri. Îl antrenezi exact cu bucla din Lecția 14, cu `nn.CrossEntropyLoss()` ca loss, fiindcă e o problemă de clasificare.

LeNet (cifre) și VGG (stive de convoluții 3x3) sunt punctele de plecare istorice. LeNet (1998) citea cifre scrise de mână din imagini alb-negru de 32x32. VGG (2014) are 16 sau 19 straturi cu greutăți și folosește doar convoluții 3x3, puse una după alta.

Problema rețelelor foarte adânci: gradientul dispare pe drumul înapoi prin multe straturi, iar rețeaua nu mai învață. La backpropagation (Lecția 14), gradientul pentru primele straturi se obține înmulțind câte un factor pentru fiecare strat prin care trece. Dacă factorii sunt sub 1, de exemplu 0.5, după 20 de straturi rămâne 0.5 la puterea 20, cam 0.000001. Primele straturi aproape nu se mai mișcă: sunt gradienții care dispar din lista de verificări din Lecția 16.

ResNet (2015) a rezolvat asta cu conexiuni reziduale: o scurtătură care sare peste câteva straturi și adună intrarea la ieșire. Dacă x e intrarea unui bloc și F(x) e ce calculează straturile din el (de exemplu, două convoluții), blocul dă la ieșire y = F(x) + x. Păstrează intrarea așa cum e și îi adaugă o corecție învățată. Dacă straturile n-au nimic util de adăugat, ajunge ca F(x) să fie aproape 0, iar intrarea trece mai departe neschimbată.

Gradientul poate curge direct prin scurtătură, deci rețele de zeci sau sute de straturi devin antrenabile. Pe drumul înapoi, ramura „+ x” dă gradientul mai departe înmulțit cu 1, așa că el ajunge întreg la primele straturi. De aici pornesc majoritatea modelelor moderne de imagini.

Un bloc rezidual în PyTorch arată ca mai jos. Ca să poți aduna F(x) cu x, cele două trebuie să aibă aceeași formă, de aceea convoluțiile din bloc păstrează numărul de canale și mărimea (padding 1).

```
class BlocRezidual(nn.Module):
    def __init__(self, canale):
        super().__init__()
        self.conv1 = nn.Conv2d(canale, canale, 3, padding=1)
        self.conv2 = nn.Conv2d(canale, canale, 3, padding=1)

    def forward(self, x):
        f = self.conv2(torch.relu(self.conv1(x)))   # F(x)
        return torch.relu(f + x)                    # F(x) + x

bloc = BlocRezidual(16)
y = bloc(torch.randn(8, 16, 32, 32))
print(y.shape)   # torch.Size([8, 16, 32, 32]), aceeași formă ca intrarea
```

`torch.relu` e ReLU folosit ca funcție. Singura diferență față de o rețea obișnuită e `f + x` din `forward`: fără „+ x”, ar fi două convoluții simple, una după alta.

> [!NOTE]
> Conexiunea reziduală e ideea de reținut din modul. Fără ea, rețelele foarte adânci nu învață. Cu ea, adâncimea devine un avantaj, nu un blocaj.

# @practice
- Calculează pe hârtie dimensiunile ieșirii pentru o mică rețea convoluțională, strat cu strat.
- Antrenează o rețea convoluțională simplă pe un set de imagini mic.
- Adaugă o conexiune reziduală într-o rețea și compară antrenarea cu și fără ea.
