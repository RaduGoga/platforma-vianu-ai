---
code: S14
duration: ~1 săptămână
---

# @intro
Nu toate problemele au etichete, adică răspunsul corect pentru fiecare rând. Uneori vrei doar să vezi structura din date: grupuri naturale, outlieri (valori ieșite din tipar, Lecția 5), o proiecție în două dimensiuni pe care s-o poți desena. Asta e învățarea nesupervizată: modelul găsește tipare fără să i se spună răspunsul corect. E utilă și de sine stătător, și ca pas de pregătire înainte de un model supervizat.

## Supervizat vs nesupervizat
La supervizat aveai perechi (exemplu, etichetă) și învățai să prezici eticheta. La nesupervizat ai doar exemplele, fără răspuns. Modelul caută singur structură: care puncte seamănă între ele, pe ce direcții variază datele cel mai mult. Nu poți măsura corectitudinea la fel de simplu, pentru că nu ai cu ce compara.

Un exemplu: un magazin online știe, pentru fiecare client, câți lei a cheltuit luna asta și de câte ori a cumpărat, dar nicio coloană nu spune ce fel de client e. Un algoritm nesupervizat poate găsi singur grupuri, de exemplu clienți care cumpără des și puțin și clienți care cumpără rar și mult. Asta e clustering-ul din Lecția 1.

Ca în Lecția 5, fiecare rând e un punct, iar două rânduri care seamănă sunt două puncte apropiate. Distanța dintre ele se calculează cu teorema lui Pitagora, ca acolo: aduni pătratele diferențelor de pe fiecare coloană și scoți radical.

## K-Means: grupare pe centre
K-Means împarte datele în k grupuri, fiecare cu un centru. Centrul unui grup e media punctelor din el, coloană cu coloană. Fiecare punct e atribuit celui mai apropiat centru, apoi centrele se mută în media punctelor lor, și se repetă până se stabilizează. Simplu, rapid, dar trebuie să alegi tu k și e sensibil la scală.

Un exemplu pe o singură coloană, ca să-l poți urmări cu creionul: punctele 1, 2, 3, 10, 11, 12 și k = 2.

1. Pornești cu două centre puse la întâmplare, să zicem în 1 și în 2.
2. Fiecare punct merge la centrul cel mai apropiat, deci grupurile sunt {1} și {2, 3, 10, 11, 12}.
3. Muți fiecare centru în media grupului lui: primul rămâne în 1, al doilea ajunge în (2 + 3 + 10 + 11 + 12) / 5 = 7.6.
4. Reîmparți punctele. Punctul 2 e la distanța 1 de primul centru și la 5.6 de al doilea, deci trece la primul, la fel și 3. Grupurile devin {1, 2, 3} și {10, 11, 12}.
5. Muți iar centrele, în (1 + 2 + 3) / 3 = 2 și în (10 + 11 + 12) / 3 = 11.
6. Reîmparți și niciun punct nu-și mai schimbă grupul, deci te oprești.

> [!NOTE]
> K-Means măsoară distanțe, deci scalarea e obligatorie. Fără ea, coloana cu numerele cele mai mari domină gruparea și restul nu contează.

```
from sklearn.cluster import KMeans
km = KMeans(n_clusters=4, n_init=10, random_state=0)
labels = km.fit_predict(X_scalat)
```

`X_scalat` sunt trăsăturile tale (features, adică coloanele de intrare) după scalare, de exemplu cu `StandardScaler().fit_transform(X)` (Lecția 5). `n_clusters=4` e k. Un start nefericit al centrelor poate da grupuri proaste, așa că `n_init=10` rulează algoritmul din 10 starturi diferite și îl păstrează pe cel mai bun. `random_state=0` face starturile la fel la fiecare rulare. `fit_predict` face `fit` și `predict` deodată: găsește centrele și îți dă grupul fiecărui rând, un număr de la 0 la 3. Numerele sunt doar nume: grupul 3 nu e mai bun decât grupul 1.

## Metoda cotului și scorul siluetă
Cum alegi k? Metoda cotului: rulezi pentru mai multe valori de k și desenezi cât de strânse sunt grupurile. Unde curba se îndoaie ca un cot, ai un k rezonabil.

Cât de strânse sunt grupurile măsori cu inerția: suma pătratelor distanțelor de la fiecare punct la centrul lui. În exemplul de mai sus, cu centrele 2 și 11, distanțele sunt 1, 0, 1, 1, 0 și 1, deci inerția e 1² + 0² + 1² + 1² + 0² + 1² = 4. Pe grafic pui k pe axa orizontală și inerția pe cea verticală.

```
import numpy as np
from sklearn.cluster import KMeans

puncte = np.array([[1], [2], [3], [10], [11], [12]])   # o coloană
for k in range(1, 5):
    km = KMeans(n_clusters=k, n_init=10, random_state=0).fit(puncte)
    print(k, round(km.inertia_, 1))
# 1 125.5
# 2 4.0
# 3 2.5
# 4 1.0
```

Fiecare punct e un rând cu o singură coloană, de aceea parantezele duble, iar `inertia_` e inerția calculată la `fit`. De la k = 1 la k = 2 inerția scade de la 125.5 la 4, apoi foarte puțin, deci cotul e la k = 2. Nu alege k cu inerția cea mai mică: ea scade mereu când crești k, până la 0, când fiecare punct e propriul centru.

Scorul siluetă e o alternativă numerică, măsoară cât de bine se separă grupurile. Pentru fiecare punct compari două distanțe medii: a, până la celelalte puncte din grupul lui, și b, până la punctele din cel mai apropiat alt grup.

> [!FORMULA]
> s = (b - a) / max(a, b)
> s iese între -1 și 1. Aproape de 1, punctul e mult mai aproape de grupul lui decât de celălalt. Aproape de 0, stă la granița dintre două grupuri. Negativ, probabil e în grupul greșit. Scorul siluetă e media lui s pe toate punctele.

Pentru punctul 1 din exemplu, a = (1 + 2) / 2 = 1.5, media distanțelor până la 2 și 3, iar b = (9 + 10 + 11) / 3 = 10, media distanțelor până la 10, 11 și 12. Deci s = (10 - 1.5) / 10 = 0.85. Media pe toate cele 6 puncte iese tot 0.85.

```
from sklearn.metrics import silhouette_score

for k in range(2, 5):
    km = KMeans(n_clusters=k, n_init=10, random_state=0)
    labels = km.fit_predict(puncte)
    print(k, round(silhouette_score(puncte, labels), 2))
# 2 0.85
# 3 0.5
# 4 0.17
```

Alegi k cu scorul cel mai mare, aici tot k = 2. Bucla pornește de la 2, pentru că scorul siluetă are nevoie de cel puțin două grupuri.

## DBSCAN și clustering ierarhic
DBSCAN grupează după densitate: unde punctele sunt înghesuite formează un grup, iar punctele izolate le marchează ca zgomot (aici, puncte care nu țin de niciun grup). Avantaje: nu trebuie să spui numărul de grupuri și găsește singur outlierii. Depinde de doi hiperparametri, raza de vecinătate și câți vecini minim, pe care trebuie să-i reglezi.

În scikit-learn se numesc `eps` și `min_samples`. Două puncte sunt vecine dacă distanța dintre ele e cel mult `eps`. Un punct care are în raza lui cel puțin `min_samples` puncte, numărându-se și pe el, e în miezul unui grup, iar vecinii lui intră în același grup. Ce nu intră în niciun grup e zgomot.

```
from sklearn.cluster import DBSCAN

puncte = [[1], [2], [3], [10], [11], [12], [30]]
db = DBSCAN(eps=1.5, min_samples=2)
print(db.fit_predict(puncte))   # [ 0  0  0  1  1  1 -1]
```

Punctele 1, 2 și 3 sunt vecine pe rând și formează grupul 0, iar 10, 11 și 12 grupul 1. Punctul 30 n-are vecini și primește -1, eticheta pentru zgomot. Ca să reglezi `eps`, încearcă mai multe valori: aici, cu 0.5 totul ar ieși zgomot, iar cu 20 un singur grup. Scalează datele întâi, ca la K-Means.

Clustering-ul ierarhic construiește un arbore de grupuri, de la fiecare punct separat până la un singur grup mare. Îl desenezi ca dendrogramă și îl tai la nivelul care îți dă numărul de grupuri pe care îl vrei. Util când vrei să vezi structura la mai multe niveluri.

Pornești cu fiecare punct ca grup separat și, la fiecare pas, unești cele două grupuri cele mai apropiate, până rămâne unul singur. Dendrograma desenează aceste uniri ca un arbore genealogic: jos sunt punctele, iar fiecare unire e o linie orizontală, la înălțimea distanței dintre cele două grupuri. Dacă tai desenul cu o linie orizontală, fiecare ramură tăiată e un grup.

```
from scipy.cluster.hierarchy import linkage, dendrogram, fcluster
import matplotlib.pyplot as plt

puncte = [[1], [2], [3], [10], [11], [12]]
Z = linkage(puncte, method="average")   # toate unirile, în ordine
dendrogram(Z)
plt.show()
print(fcluster(Z, t=5, criterion="distance"))   # [1 1 1 2 2 2]
```

Cu `method="average"`, distanța dintre două grupuri e media distanțelor dintre punctele lor. Jos, punctele apar cu poziția lor din listă, de la 0 la 5. Mai întâi se unesc 1 cu 2 și 10 cu 11, la înălțimea 1, apoi 3 și 12 li se alătură la 1.5, iar cele două grupuri mari se unesc abia la 9. `fcluster` taie la înălțimea `t=5` și dă grupul fiecărui punct, numerotat de la 1. scipy se instalează odată cu scikit-learn.

## PCA: reducerea dimensionalității
Aici dimensiune înseamnă coloană: un rând cu 2 coloane e un punct în plan, iar unul cu 100 de coloane e un punct într-un spațiu cu 100 de axe, pe care nu-l mai poți desena. La NumPy (Lecția 4), cuvântul avea alt sens: acolo un tabel era un array cu 2 dimensiuni.

Când ai zeci sau sute de coloane, e greu de vizualizat și modelele suferă (blestemul dimensionalității). PCA (analiza componentelor principale) găsește direcțiile pe care datele variază cel mai mult și le proiectează pe ele, păstrând cât mai multă informație în mai puține dimensiuni.

Blestemul dimensionalității: cu fiecare coloană în plus, punctele ajung mai rare. Ca să acoperi un segment cu puncte la 0.1 unul de altul îți trebuie 10 puncte. Pentru un pătrat îți trebuie 100, pentru un cub 1000, iar pentru 10 coloane zece miliarde (10 la puterea 10). Cu sute de coloane și câteva mii de rânduri, datele tale sunt puncte rare într-un spațiu aproape gol, iar modelele găsesc ușor tipare care sunt doar întâmplare.

Un exemplu în 2D: la elevii unei clase, înălțimea și greutatea cresc împreună, așa că pe un scatter plot punctele stau aproape pe o linie oblică. De-a lungul liniei, direcția spune cam „cât de mare e elevul” și acolo datele variază cel mai mult. Pe direcția perpendiculară, „mai greu sau mai ușor decât te-ai aștepta după înălțime”, punctele se abat puțin.

„Variază cel mai mult” înseamnă că valorile sunt cele mai împrăștiate. Împrăștierea se măsoară cu varianța, pătratul deviației standard din Lecțiile 4 și 5: media pătratelor distanțelor până la medie. Listele 4, 5, 6 și 0, 5, 10 au aceeași medie, 5, dar varianțe foarte diferite: (1 + 0 + 1) / 3 ≈ 0.67 și (25 + 0 + 25) / 3 ≈ 16.7.

> [!NOTE]
> Varianța de aici e alt lucru decât varianța unui model din Lecțiile 1 și 8 (cât de mult se schimbă modelul când schimbi datele de antrenare). La PCA, varianța e doar cât de împrăștiate sunt valorile.

Direcțiile găsite de PCA se numesc componente. Fiecare componentă e o coloană nouă, calculată din cele vechi: prima, la elevi, crește când cresc și înălțimea, și greutatea. A proiecta un punct pe o componentă înseamnă să păstrezi doar unde cade el pe direcția aceea, ca umbra lui pe o linie. Cu prima componentă, fiecare elev e descris de un singur număr în loc de două.

PCA îți spune cât din varianță păstrezi cu fiecare componentă. Poți reduce de la 100 de coloane la 10 care păstrează, să zicem, 95% din informație. E util și ca preprocesare înainte de un model, pe lângă desene. Cere date scalate: altfel, o coloană în mii de lei pare cea mai împrăștiată doar din cauza unității de măsură, iar prima componentă ar fi aproape numai ea.

```
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

# înălțime (cm) și greutate (kg) pentru 6 elevi
elevi = np.array([[150, 45], [155, 52], [160, 50],
                  [170, 63], [175, 66], [185, 72]])
elevi_scalat = StandardScaler().fit_transform(elevi)
p = PCA().fit(elevi_scalat)
print(p.explained_variance_ratio_.round(2))   # [0.99 0.01]
```

`explained_variance_ratio_` e varianța explicată: partea din împrăștierea totală prinsă de fiecare componentă. Prima prinde 99%, a doua 1%, deci poți păstra doar prima.

```
from sklearn.decomposition import PCA
p = PCA(n_components=0.95).fit(X_scalat)   # păstrează 95% din varianță
X_redus = p.transform(X_scalat)
print(X_redus.shape[1], "componente")
```

`n_components=0.95` îi cere lui PCA atâtea componente câte trebuie ca să ajungă la 95% din varianță, iar un număr întreg, de exemplu 2, îi cere exact atâtea. `fit` găsește direcțiile, `transform` calculează valorile fiecărui rând pe ele, iar `X_redus.shape[1]` e numărul de coloane rămase. Înaintea unui model supervizat, fă `fit` doar pe datele de antrenare, ca la scalare (Lecția 5), și aplică `transform` pe validare și test.

## t-SNE și UMAP: doar pentru vizualizare
O proiecție în 2D transformă fiecare rând, cu toate coloanele lui, într-un punct cu doar două coordonate, x și y, pe care îl poți pune pe un scatter plot (Lecția 4). PCA cu `n_components=2` face și el o proiecție în 2D.

t-SNE și UMAP fac proiecții în 2D care arată frumos și scot în evidență grupuri. Sunt excelente ca să te uiți la structura datelor. Dar au o capcană importantă: distanțele și mărimile grupurilor din desen nu sunt de încredere. Două grupuri apropiate în desen nu sunt neapărat apropiate în realitate.

Motivul: t-SNE și UMAP încearcă să păstreze doar vecinii. Rândurile care seamănă ajung aproape în desen, dar distanțele mari dintre grupuri nu se păstrează.

```
from sklearn.manifold import TSNE
import matplotlib.pyplot as plt

X_2d = TSNE(n_components=2, random_state=0).fit_transform(X_scalat)
print(X_2d.shape)   # (numărul de rânduri, 2)
plt.scatter(X_2d[:, 0], X_2d[:, 1], s=5)
plt.show()
```

`X_2d[:, 0]` sunt toate rândurile din coloana 0, adică x-ul fiecărui punct, iar `s=5` face punctele mici. t-SNE e în scikit-learn, dar pe zeci de mii de rânduri merge greu, deci desenează un eșantion. UMAP e în pachetul separat umap-learn (`pip install umap-learn`, apoi `import umap`), care s-ar putea să lipsească la concurs. t-SNE nu are nici `transform` pentru date noi, deci nu-l poți aplica pe test.

> [!NOTE]
> Folosește t-SNE și UMAP ca să te uiți, nu ca să tragi concluzii dure. Pentru preprocesare de încredere, PCA e alegerea sigură.

# @practice
- Aplică K-Means și DBSCAN pe același set și compară grupurile găsite.
- Redu la 2D cu PCA și cu UMAP (sau cu t-SNE, dacă umap-learn nu e instalat) și vezi ce diferă între ele.
- Folosește metoda cotului ca să alegi k pe un set și justifică alegerea.
