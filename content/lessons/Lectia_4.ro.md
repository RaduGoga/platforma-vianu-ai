---
code: S4
duration: ~2 săptămâni
---

# @intro
NumPy e biblioteca pentru calcul numeric în Python: lucrează cu array-uri de numere și face operațiile mult mai rapid decât o buclă obișnuită. Pandas e construit peste NumPy și adaugă etichete: coloane cu nume, rânduri cu index, tabele ca într-un Excel. Le folosești pe amândouă în aproape orice problemă din concurs, indiferent de model.

## Instalare
Ambele sunt biblioteci externe, nu vin cu Python. Le instalezi o singură dată, în mediul virtual al proiectului.

```
pip install numpy
pip install pandas
```
caption: Rulează comenzile astea în terminal, în folderul proiectului.

## De ce nu ajunge Python simplu
În Python obișnuit, o listă de un milion de numere pe care vrei s-o aduni element cu element se face cu o buclă for. Merge, dar e lent, pentru că Python verifică tipul fiecărui element la fiecare pas. Când ai date reale, asta devine insuportabil.

NumPy rezolvă problema cu o structură nouă: ndarray, o grilă de numere de același tip, cu formă fixă. Operațiile se aplică pe tot vectorul deodată, într-un cod compilat rapid, fără buclă în Python. Ideea se numește vectorizare și e de zeci de ori mai rapidă.

```
import numpy as np

# lent, în Python pur
total = 0
for x in range(1_000_000):
    total += x * x

# rapid, vectorizat
v = np.arange(1_000_000)
total = (v * v).sum()
```
caption: Aceeași sumă, dar a doua variantă e mult mai rapidă.

## Creezi și transformi array-uri
`np.array()` transformă o listă Python într-un ndarray. `np.zeros(n)` și `np.ones(n)` fac un array plin cu 0 sau 1, util când vrei un loc gol de completat. `np.arange(start, stop, pas)` merge ca `range`, dar întoarce un array. `np.linspace(start, stop, n)` împarte un interval în n valori egal distanțate, util pentru grafice.

```
a = np.array([1, 2, 3])
zerouri = np.zeros(5)          # [0. 0. 0. 0. 0.]
unu = np.ones((2, 3))          # matrice 2x3 plină cu 1
pasi = np.arange(0, 10, 2)     # [0 2 4 6 8]
liniar = np.linspace(0, 1, 5)  # [0. 0.25 0.5 0.75 1.]
```

Fiecare array are un singur `dtype`, tipul tuturor elementelor (`int64`, `float64` etc.). Amestecarea unui întreg cu un float în același array îl convertește pe tot la float.

```
a.dtype              # dtype('int64')
np.array([1, 2.5]).dtype   # dtype('float64')
```

`reshape` schimbă forma unui array fără să-i schimbe conținutul, cât timp numărul total de elemente rămâne același. `flatten()` face inversul, îl aduce la o singură dimensiune.

```
v = np.arange(6)
m = v.reshape(2, 3)    # [[0 1 2], [3 4 5]]
m.flatten()             # înapoi la [0 1 2 3 4 5]
```

> [!NOTE]
> O felie dintr-un array (`v[1:4]`) e o vedere (view), nu o copie: modificarea ei modifică și originalul. Dacă vrei o copie independentă, cere-o explicit cu `.copy()`.

```
v = np.array([1, 2, 3, 4])
felie = v[1:3]
felie[0] = 99
print(v)              # [1, 99, 3, 4], s-a schimbat și originalul

copie = v[1:3].copy()
copie[0] = -1
print(v)              # neschimbat de data asta
```

## ndarray: formă, axe, indexare
Un ndarray are o formă (shape): câte rânduri, câte coloane, câte dimensiuni. O imagine alb-negru e o matrice 2D, una color e 3D (înălțime, lățime, canale). Prima ta grijă la orice bug e să tipărești forma și să verifici că e ce credeai.

Axele sunt direcțiile pe care operezi. axis=0 merge pe rânduri (pe verticală, rezultatul e câte o valoare pe coloană), axis=1 merge pe coloane (pe orizontală). Confuzia dintre axe e printre cele mai frecvente greșeli de început.

```
x = np.array([[1, 2, 3],
              [4, 5, 6]])

x.shape          # (2, 3): 2 rânduri, 3 coloane
x.mean(axis=0)   # media pe fiecare coloană -> [2.5, 3.5, 4.5]
x.mean(axis=1)   # media pe fiecare rând    -> [2.0, 5.0]
```

La un array cu mai multe dimensiuni, indexarea și felierea se scriu cu o virgulă între dimensiuni, în loc de paranteze separate.

```
x[0, 1]      # 2, rândul 0, coloana 1
x[:, 0]      # [1, 4], toate rândurile, coloana 0
x[0, :]      # [1, 2, 3], tot rândul 0
```

Indexarea cu mască booleană e o unealtă pe care o folosești zilnic: construiești un vector de True/False și selectezi doar elementele unde e True. Așa filtrezi date fără buclă.

```
x[x > 3]         # doar elementele mai mari ca 3 -> [4, 5, 6]
x[x > 3] = 0     # și le poți și schimba pe loc
```

## Broadcasting: cum potrivește NumPy forme diferite
Broadcasting e regula prin care NumPy face operații între vectori de forme diferite, întinzând automat pe cel mic ca să se potrivească. Jumătate din erorile de început vin din forme care nu se potrivesc cum credeai.

Regula: NumPy compară formele de la dreapta la stânga. Două dimensiuni se potrivesc dacă sunt egale sau dacă una e 1 (aia se întinde). Un scalar se potrivește cu orice.

```
X = np.array([[1, 2, 3],
              [4, 5, 6]])      # forma (2, 3)
medii = X.mean(axis=0)         # forma (3,): [2.5, 3.5, 4.5]
X_centrat = X - medii          # (2,3) - (3,) se potrivește, scade pe coloane
```
caption: Centrarea unei matrice pe medii, fără nicio buclă.

> [!NOTE]
> Când o operație dă eroare de shape, tipărește formele celor doi operanzi și aplică regula de la dreapta la stânga. De 9 din 10 ori vezi imediat unde nu se potrivesc.

## Sortare, căutare și seturi în NumPy
`np.sort()` sortează un array fără să-l schimbe pe loc. `np.argsort()` întoarce indicii care ar sorta array-ul, util când vrei să sortezi un array după valorile altuia.

```
v = np.array([3, 1, 2])
np.sort(v)          # [1, 2, 3]
np.argsort(v)       # [1, 2, 0], indicii în ordine crescătoare
```

`np.where(condiție, atunci, altfel)` alege între două valori element cu element, mai flexibil decât o mască simplă. `argmax`/`argmin` dau poziția celui mai mare, respectiv mic element.

```
np.where(v > 1, v, 0)   # [3, 0, 2], păstrează ce e peste 1, restul devine 0
v.argmax()               # 0, poziția lui 3
```

`np.unique()` întoarce valorile distincte dintr-un array, sortate. `np.concatenate()` lipește mai multe array-uri într-unul singur.

```
np.unique([1, 2, 2, 3, 1])      # [1, 2, 3]
np.concatenate([[1, 2], [3, 4]]) # [1, 2, 3, 4]
```

## Pandas: date cu etichete
Datele reale au nume: coloana vârstă, coloana scor, coloana clasă. Pandas adaugă etichete peste NumPy, în două structuri: Series (o singură coloană, cu index) și DataFrame (un tabel întreg, mai multe coloane). E structura în care ajung mai toate seturile de concurs.

```
s = pd.Series([10, 20, 30], index=["a", "b", "c"])
print(s["b"])     # 20

df = pd.DataFrame({"nume": ["Ana", "Bogdan"], "scor": [9.2, 8.7]})
```

Un DataFrame e practic un dicționar de Series, câte una pentru fiecare coloană. Citești un fișier CSV cu o singură linie, apoi te uiți la el înainte de orice: primele rânduri, tipurile coloanelor, câte valori lipsesc.

```
import pandas as pd

df = pd.read_csv("date.csv")

df.head()        # primele 5 rânduri
df.info()        # tipuri și câte valori non-nule
df.describe()    # statistici pe coloanele numerice
```

## Selecție: loc vs iloc
Sunt două feluri de a selecta dintr-un DataFrame, și amestecarea lor e o greșeală clasică. loc selectează după etichetă (numele coloanei, valoarea indexului). iloc selectează după poziție (al câtelea rând, a câta coloană, numărând de la 0).

```
df.loc[10, "scor"]        # valoarea de la indexul 10, coloana "scor"
df.iloc[0, 2]             # rândul 0, coloana 2, după poziție
df.loc[df["scor"] > 8]    # toate rândurile cu scor peste 8
```

## Valori lipsă și curățare
Datele reale au aproape mereu goluri, valori duplicate sau tipuri greșite, și un model antrenat pe date murdare dă predicții proaste. `isna()` marchează unde lipsește o valoare, `dropna()` scoate rândurile cu goluri, `fillna(valoare)` le completează.

```
df.isna().sum()          # câte valori lipsesc pe fiecare coloană
df.dropna()               # scoate rândurile cu orice gol
df["scor"].fillna(df["scor"].mean())   # completează golurile cu media
```

> [!NOTE]
> Alege între `dropna` și `fillna` în funcție de câte rânduri ai și de ce înseamnă lipsa: dacă lipsesc puține valori, le poți arunca; dacă lipsesc multe, arunci prea multe date bune odată cu ele.

`duplicated()` marchează rândurile identice cu unul de mai devreme, `drop_duplicates()` le scoate. `astype()` schimbă tipul unei coloane, de exemplu dintr-un text într-un număr.

```
df.duplicated().sum()          # câte rânduri sunt duplicate
df = df.drop_duplicates()

df["scor"] = df["scor"].astype(float)
df["data"] = pd.to_datetime(df["data"])   # text -> dată calendaristică
```

## groupby, merge, pivot: cele pe care le folosești mereu
groupby împarte datele pe grupuri și calculează ceva pe fiecare grup: media pe clasă, suma pe categorie.

```
df.groupby("clasa")["scor"].mean()      # media scorului pe fiecare clasă
df.groupby("clasa").size()             # câte rânduri are fiecare clasă
```

merge lipește două tabele după o coloană comună. how spune ce faci cu rândurile fără pereche: left păstrează tot din stânga, inner doar potrivirile. Când tabelele au aceleași coloane și vrei doar să le pui unul sub altul, folosești `pd.concat()` în loc de merge.

```
df.merge(alt_tabel, on="id", how="left")
pd.concat([df1, df2])   # pune df2 sub df1, aceleași coloane
```

pivot_table rearanjează un tabel lung într-unul lat, cu o coloană devenită antet. E util la rapoarte și la văzut tipare pe două dimensiuni deodată.

## Alte operații frecvente
`sort_values()` sortează un DataFrame după o coloană. `value_counts()` numără de câte ori apare fiecare valoare distinctă, prima verificare când vrei să vezi dacă o clasă e dezechilibrată.

```
df.sort_values("scor", ascending=False)
df["clasa"].value_counts()   # câte rânduri are fiecare clasă
```

Adaugi o coloană nouă direct prin atribuire, ștergi una cu `drop`. `apply()` rulează o funcție pe fiecare valoare dintr-o coloană, util când transformarea nu are deja o metodă gata făcută.

```
df["scor_procent"] = df["scor"] * 10
df = df.drop(columns=["coloana_inutila"])
df["eticheta"] = df["scor"].apply(lambda s: "bun" if s > 8 else "slab")
```

`corr()` calculează corelația dintre coloanele numerice, un prim pas rapid ca să vezi ce variabile par legate de ținta pe care vrei s-o prezici.

```
df.corr(numeric_only=True)
```

La final, scrii rezultatul înapoi pe disc cu `to_csv`, exact formatul pe care îl încarci la submisie.

```
df.to_csv("rezultat.csv", index=False)
```
