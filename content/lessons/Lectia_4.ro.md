---
code: S4
duration: ~2 săptămâni
---

# @intro
NumPy e biblioteca pentru calcul numeric în Python, adică pentru socoteli pe multe numere deodată, ca suma sau media unui milion de valori. Lucrează cu array-uri (un array seamănă cu o listă de numere, dar toate au același tip) și face operațiile mult mai rapid decât o buclă obișnuită. Pandas e construit peste NumPy și adaugă etichete, adică nume pentru coloane și rânduri. Un tabel Pandas arată ca o foaie de Excel: fiecare coloană are un nume, iar fiecare rând are un index, o etichetă care implicit e numărul rândului (0, 1, 2...). Le folosești pe amândouă în aproape orice problemă din concurs, indiferent de model.

## Instalare
Ambele sunt biblioteci externe, nu vin cu Python: sunt cod scris de alții, pe care pip îl descarcă pentru tine (Lecția 1). Le instalezi o singură dată, în mediul virtual al proiectului (cutia separată pentru bibliotecile lui, din Lecția 1), împreună cu Matplotlib, Seaborn și Pillow. Matplotlib și Seaborn desenează grafice, iar Pillow deschide imagini.

```
pip install numpy
pip install pandas
pip install matplotlib seaborn pillow
```
caption: Rulează comenzile astea în terminal, în folderul proiectului, cu mediul virtual activat.

## De ce nu ajunge Python simplu
În Python obișnuit, o listă de un milion de numere pe care vrei s-o aduni element cu element se face cu o buclă for. Merge, dar e lent. Într-o listă, fiecare element poate fi orice (un număr, un text, altă listă), așa că la fiecare pas Python verifică întâi ce tip are elementul și abia apoi face adunarea. Când ai date reale, asta devine insuportabil.

NumPy rezolvă problema cu o structură nouă: ndarray (de la „n-dimensional array”, un array cu oricâte dimensiuni), o grilă de numere de același tip, cu formă fixă. Grila poate fi un șir de numere, un tabel cu rânduri și coloane sau ceva cu mai multe dimensiuni. Formă fixă înseamnă că, spre deosebire de o listă, nu-i poți adăuga elemente cu `.append()`.

Pentru că toate numerele au același tip, NumPy nu mai verifică nimic la fiecare pas. Operațiile se aplică pe tot array-ul deodată, fără buclă în Python: bucla o face NumPy, în cod compilat scris în C, care merge mult mai repede. Un array cu o singură dimensiune se mai numește vector, iar ideea asta, să scrii operația pe tot vectorul în loc de o buclă, se numește vectorizare. E de zeci de ori mai rapidă.

```
import numpy as np

# lent, în Python pur
total = 0
for x in range(1_000_000):
    total += x * x
print(total)   # 333332833333500000

# rapid, vectorizat
v = np.arange(1_000_000)
total = (v * v).sum()
print(total)   # 333332833333500000, același rezultat
```
caption: Aceeași sumă, dar a doua variantă e mult mai rapidă.

`import numpy as np` aduce biblioteca sub un nume scurt, `np`, pe care îl scrii apoi în fața fiecărei funcții din ea. `np.arange(1_000_000)` face un array cu numerele de la 0 la 999999, ca `range`. `v * v` înmulțește fiecare număr cu el însuși, iar `.sum()` le adună pe toate: pe un array mic, `[0 1 2 3]`, ai avea `[0 1 4 9]` și suma 14.

## Creezi și transformi array-uri
`np.array()` transformă o listă Python într-un ndarray. `np.zeros(n)` și `np.ones(n)` fac un array plin cu 0 sau 1, util când vrei un loc gol de completat. Dacă în loc de `n` le dai o formă, ca în `np.ones((2, 3))`, primești o matrice, adică un tabel de numere, aici cu 2 rânduri și 3 coloane. Parantezele duble nu sunt o greșeală: `(2, 3)` e un tuple (Lecția 3) care descrie forma.

`np.arange(start, stop, pas)` merge ca `range`, dar întoarce un array, iar `stop` nu e inclus. `np.linspace(start, stop, n)` împarte un interval în n valori egal distanțate, cu ambele capete incluse, util pentru grafice.

```
a = np.array([1, 2, 3])        # [1 2 3]
zerouri = np.zeros(5)          # [0. 0. 0. 0. 0.]
unu = np.ones((2, 3))          # matrice 2x3 plină cu 1:
                               # [[1. 1. 1.]
                               #  [1. 1. 1.]]
pasi = np.arange(0, 10, 2)     # [0 2 4 6 8], fără 10
liniar = np.linspace(0, 1, 5)  # [0.   0.25 0.5  0.75 1.  ]
```

În comentarii vezi ce afișează `print` pentru fiecare linie. NumPy scrie array-urile fără virgule, cu spații între numere, iar `0.` înseamnă 0.0, un număr cu zecimale. Jupyter afișează singur doar ultima linie dintr-o celulă, și puțin altfel, de exemplu `array([0., 0., 0., 0., 0.])` sau `np.int64(2)`, dar cu aceleași valori. Ca să le vezi pe toate, pune-le în `print`.

Fiecare array are un singur `dtype`, tipul tuturor elementelor (`int64`, `float64` etc.). `int64` înseamnă numere întregi, ca `int` din Lecția 3, iar `float64` numere cu zecimale, ca `float`. Partea cu 64 spune câtă memorie ocupă fiecare valoare (64 de biți) și deocamdată nu contează. Amestecarea unui întreg cu un float în același array îl convertește pe tot la float.

```
a.dtype                    # int64
np.array([1, 2.5])         # [1.  2.5], acum și 1 e float
np.array([1, 2.5]).dtype   # float64
```

`reshape` schimbă forma unui array fără să-i schimbe conținutul, cât timp numărul total de elemente rămâne același. Forma spune câte elemente are array-ul pe fiecare direcție. `np.arange(6)` are forma `(6,)`: o singură dimensiune, cu 6 numere (virgula arată că e un tuple cu un singur element). `reshape(2, 3)` le așază pe 2 rânduri a câte 3, rând cu rând. Merge pentru că 2 × 3 = 6, pe când `reshape(4, 2)` ar da eroare, fiindcă 4 × 2 = 8. `flatten()` face inversul, îl aduce la o singură dimensiune.

```
v = np.arange(6)       # [0 1 2 3 4 5], forma (6,)
m = v.reshape(2, 3)    # forma (2, 3):
                       # [[0 1 2]
                       #  [3 4 5]]
m.flatten()            # înapoi la [0 1 2 3 4 5]
```

> [!NOTE]
> O felie dintr-un array (`v[1:4]`) e o vedere (view), nu o copie. La o listă, felia e o listă nouă; la NumPy, e doar o fereastră spre aceleași numere din memorie, ca `b = a` din Lecția 3. Așa NumPy nu copiază milioane de numere la fiecare felie, dar modificarea feliei modifică și originalul. Dacă vrei o copie independentă, cere-o explicit cu `.copy()`.

```
v = np.array([1, 2, 3, 4])
felie = v[1:3]        # [2 3]
felie[0] = 99
print(v)              # [ 1 99  3  4], s-a schimbat și originalul

copie = v[1:3].copy()
copie[0] = -1
print(v)              # [ 1 99  3  4], neschimbat de data asta
```

## ndarray: formă, axe, indexare
Un ndarray are o formă (shape): câte rânduri, câte coloane, câte dimensiuni. Un șir de numere are o singură dimensiune (1D), un tabel are două (2D): rânduri și coloane. Un array 2D îl creezi dintr-o listă de liste, în care fiecare listă din interior devine un rând, ca `x` de mai jos.

O imagine alb-negru e o matrice 2D, una color e 3D (înălțime, lățime, canale): fiecare pixel, adică fiecare punct din imagine, are trei numere, pentru roșu, verde și albastru. Prima ta grijă la orice bug e să tipărești forma și să verifici că e ce credeai.

Axele sunt direcțiile pe care operezi. Pe `x` de mai jos, cu 2 rânduri și 3 coloane: cu `axis=0` cobori pe fiecare coloană și combini rândurile între ele, deci primești câte un rezultat pe coloană (3 valori). Cu `axis=1` mergi de-a lungul fiecărui rând și primești câte un rezultat pe rând (2 valori). Ca să nu le încurci: axa pe care o dai dispare din formă, deci (2, 3) devine (3,) cu `axis=0` și (2,) cu `axis=1`. Confuzia dintre axe e printre cele mai frecvente greșeli de început.

```
x = np.array([[1, 2, 3],
              [4, 5, 6]])

x.shape          # (2, 3): 2 rânduri, 3 coloane
x.mean(axis=0)   # media pe fiecare coloană: [2.5 3.5 4.5]
x.mean(axis=1)   # media pe fiecare rând: [2. 5.]
```

Prima coloană are 1 și 4, deci media ei e (1 + 4) / 2 = 2.5. Primul rând are 1, 2 și 3, deci media lui e 6 / 3 = 2. Fără `axis`, `x.mean()` face media tuturor celor 6 numere: 3.5.

La un array cu mai multe dimensiuni, indexarea și felierea se scriu cu o virgulă între dimensiuni, în loc de paranteze separate: unde la o listă de liste ai scrie `x[0][1]`, la NumPy scrii `x[0, 1]`, întâi rândul, apoi coloana. Un `:` singur e o felie fără capete, adică „tot”, așa că `x[:, 0]` înseamnă toate rândurile, coloana 0.

```
x[0, 1]      # 2, rândul 0, coloana 1
x[:, 0]      # [1 4], toate rândurile, coloana 0
x[0, :]      # [1 2 3], tot rândul 0
```

Indexarea cu mască booleană e o unealtă pe care o folosești zilnic: construiești un array de True/False și selectezi doar elementele unde e True. Așa filtrezi date fără buclă. Numele vine de la `bool`, tipul cu True și False din Lecția 3. O comparație ca `x > 3` se face pe fiecare element și dă un array de aceeași formă, plin cu True și False: asta e masca.

```
x > 3            # [[False False False]
                 #  [ True  True  True]]
x[x > 3]         # doar elementele mai mari ca 3 -> [4 5 6]
x[x > 3] = 0     # și le poți și schimba pe loc
print(x)         # [[1 2 3]
                 #  [0 0 0]]
```

## Broadcasting: cum potrivește NumPy forme diferite
Când aduni un număr la un array, NumPy îl adună la fiecare element.

```
np.array([1, 2, 3]) + 10   # [11 12 13]
```

E ca și cum 10 ar fi fost întins într-un array `[10 10 10]`, de aceeași formă cu celălalt. Un singur număr, care nu e array, se numește scalar. Broadcasting e regula prin care NumPy face operații între array-uri de forme diferite, întinzând automat pe cel mic ca să se potrivească. Jumătate din erorile de început vin din forme care nu se potrivesc cum credeai.

Regula: NumPy compară formele de la dreapta la stânga. Două dimensiuni se potrivesc dacă sunt egale sau dacă una e 1 (aia se întinde). Un scalar se potrivește cu orice.

Mai jos, `X` are forma (2, 3), iar mediile coloanelor au forma (3,). De la dreapta, 3 cu 3 se potrivesc. Mediilor le lipsește prima dimensiune, așa că NumPy o tratează ca 1 și le întinde pe 2 rânduri: scade același rând de medii din fiecare rând al lui `X`.

```
X = np.array([[1, 2, 3],
              [4, 5, 6]])      # forma (2, 3)
medii = X.mean(axis=0)         # forma (3,): [2.5 3.5 4.5]
X_centrat = X - medii          # (2,3) - (3,) se potrivește, scade pe coloane
print(X_centrat)               # [[-1.5 -1.5 -1.5]
                               #  [ 1.5  1.5  1.5]]
```
caption: Centrarea unei matrice pe medii, fără nicio buclă.

Centrarea înseamnă să scazi din fiecare coloană media ei, ca fiecare coloană să aibă media 0. Prima coloană, cu 1 și 4 și media 2.5, devine -1.5 și 1.5. Pasul ăsta apare des când pregătești datele pentru un model, și îl revezi în Lecția 5, la scalare.

În schimb, `X - X.mean(axis=1)` dă eroare: mediile pe rânduri au forma (2,), iar de la dreapta, 3 și 2 nu sunt egale și niciuna nu e 1. Dacă faci din ele o coloană, cu `reshape(2, 1)`, forma devine (2, 1) și se potrivește, pentru că 1 se întinde peste cele 3 coloane.

> [!NOTE]
> Când o operație dă eroare de shape, tipărește formele celor doi operanzi (cele două array-uri din operație) și aplică regula de la dreapta la stânga. De 9 din 10 ori vezi imediat unde nu se potrivesc.

## Sortare, căutare și seturi în NumPy
`np.sort()` sortează un array fără să-l schimbe pe loc: întoarce un array nou, sortat. `np.argsort()` întoarce indicii care ar sorta array-ul, adică pozițiile elementelor, de la cel mai mic la cel mai mare. E util când vrei să sortezi un array după valorile altuia.

```
v = np.array([3, 1, 2])
np.sort(v)          # [1 2 3]
np.argsort(v)       # [1 2 0], indicii în ordine crescătoare

nume = np.array(["Ana", "Bogdan", "Cris"])
nume[np.argsort(v)]  # ['Bogdan' 'Cris' 'Ana']
```

`[1 2 0]` se citește așa: cel mai mic element e `v[1]`, adică 1, următorul e `v[2]`, adică 2, iar cel mai mare e `v[0]`, adică 3. Un array de indici pus între paranteze drepte ia elementele de pe pozițiile alea, în ordinea dată, așa că `nume[np.argsort(v)]` așază numele în ordinea crescătoare a valorilor din `v`.

`np.where(condiție, atunci, altfel)` alege între două valori element cu element, mai flexibil decât o mască simplă. Pe `v`, condiția `v > 1` dă `[True False True]`: unde e True, `np.where` ia valoarea din `v`, iar unde e False pune 0. O mască, `v[v > 1]`, ar păstra doar `[3 2]`, pe când aici rămân toate cele 3 poziții. `argmax`/`argmin` dau poziția celui mai mare, respectiv mic element.

```
np.where(v > 1, v, 0)   # [3 0 2], păstrează ce e peste 1, restul devine 0
v.argmax()               # 0, poziția lui 3
v.argmin()               # 1, poziția lui 1
```

`np.unique()` întoarce valorile distincte dintr-un array, sortate: fiecare valoare o singură dată, ca la mulțimile din Lecția 3. `np.concatenate()` lipește mai multe array-uri într-unul singur: îi dai o listă cu bucățile, iar el le pune una după alta.

```
np.unique([1, 2, 2, 3, 1])      # [1 2 3]
np.concatenate([[1, 2], [3, 4]]) # [1 2 3 4]
```

## Pandas: date cu etichete
Datele reale au nume: coloana vârstă, coloana scor, coloana clasă (în exemplele de aici, clasa de la școală, ca 9A). Pandas adaugă etichete peste NumPy, în două structuri: Series (o singură coloană, cu index) și DataFrame (un tabel întreg, mai multe coloane). DataFrame e structura în care ajung mai toate seturile de date de concurs. Indexul e eticheta fiecărui rând, iar dacă nu-l dai tu, Pandas numerotează rândurile 0, 1, 2...

```
import pandas as pd

s = pd.Series([10, 20, 30], index=["a", "b", "c"])
print(s["b"])     # 20
print(s)
# a    10
# b    20
# c    30
# dtype: int64

df = pd.DataFrame({"nume": ["Ana", "Bogdan"], "scor": [9.2, 8.7]})
print(df)
#      nume  scor
# 0     Ana   9.2
# 1  Bogdan   8.7
```

La un Series tipărit vezi indexul în stânga, valorile în dreapta și, pe ultima linie, tipul valorilor. La `df`, fiecare cheie din dicționar devine numele unei coloane, iar lista ei, valorile de pe coloană. Indexul nu l-ai dat, așa că Pandas a pus 0 și 1.

Un DataFrame e practic un dicționar de Series, câte una pentru fiecare coloană: `df["scor"]` îți dă coloana scor, ca Series, la fel cum `d["cheie"]` îți dă o valoare dintr-un dicționar. Un fișier CSV (fișierul text cu valori despărțite prin virgule, din Lecția 3) îl citești cu o singură linie, apoi te uiți la el înainte de orice: primele rânduri, tipurile coloanelor, câte valori lipsesc.

```
import pandas as pd

df = pd.read_csv("date.csv")

df.head()        # primele 5 rânduri
df.info()        # tipuri și câte valori non-nule
df.describe()    # statistici pe coloanele numerice
```

`head()` îți arată primele 5 rânduri (`head(10)` arată 10). `info()` scrie câte rânduri are tabelul și, pentru fiecare coloană, numele, câte valori non-nule are și tipul. Non-nule înseamnă valori care nu lipsesc: dacă o coloană are mai puține decât numărul de rânduri, are goluri. Coloanele cu numere apar ca `int64` sau `float64`, iar cele cu text ca `str` (în versiunile mai vechi de Pandas, `object`).

`describe()` calculează opt statistici pentru fiecare coloană numerică. Iată-le pe notele 9, 7, 10, 6 și 8.

```
note = pd.DataFrame({"scor": [9, 7, 10, 6, 8]})
print(note.describe())
#             scor
# count   5.000000
# mean    8.000000
# std     1.581139
# min     6.000000
# 25%     7.000000
# 50%     8.000000
# 75%     9.000000
# max    10.000000
```

`count` e câte valori sunt, `mean` e media, iar `min` și `max` sunt cea mai mică și cea mai mare valoare. `std` e deviația standard, care măsoară cât de împrăștiate sunt valorile în jurul mediei: 0 dacă sunt toate egale, mai mare cu cât se depărtează de ea. `25%`, `50%` și `75%` sunt cuartilele. Sortate, notele sunt 6, 7, 8, 9, 10: la `50%` e valoarea din mijloc, 8, numită mediană, iar 7 și 9 sunt la un sfert și la trei sferturi din drum. Le reiei pe toate în Lecția 5.

## Selecție: loc vs iloc
Sunt două feluri de a selecta dintr-un DataFrame, și amestecarea lor e o greșeală clasică. loc selectează după etichetă (numele coloanei, valoarea indexului). iloc selectează după poziție (al câtelea rând, a câta coloană, numărând de la 0).

Pe un tabel abia creat, cu indexul 0, 1, 2, cele două găsesc aceleași rânduri. Diferența se vede când etichetele nu mai sunt în ordine, de exemplu după o sortare. `sort_values("scor", ascending=False)` așază rândurile de la scorul cel mai mare la cel mai mic, iar fiecare rând își ia eticheta cu el.

```
elevi = pd.DataFrame({"nume": ["Ana", "Bogdan", "Cris"],
                      "scor": [7.5, 9.2, 8.7]})
df = elevi.sort_values("scor", ascending=False)
print(df)
#      nume  scor
# 1  Bogdan   9.2
# 2    Cris   8.7
# 0     Ana   7.5

df.loc[0, "scor"]         # 7.5, rândul cu eticheta 0 (Ana)
df.iloc[0, 1]             # 9.2, primul rând (Bogdan), coloana 1
df.loc[df["scor"] > 8]    # toate rândurile cu scor peste 8
```

`df.loc[0, "scor"]` caută rândul cu eticheta 0, adică Ana, chiar dacă acum e ultima. `df.iloc[0, 1]` ia primul rând din tabel, oricare ar fi el, și a doua coloană (pozițiile încep de la 0). Ultima linie folosește o mască booleană, ca la NumPy: `df["scor"] > 8` dă True sau False pentru fiecare rând, iar `loc` păstrează rândurile cu True, aici Bogdan și Cris.

## Valori lipsă și curățare
Datele reale au aproape mereu goluri, valori duplicate sau tipuri greșite, și un model antrenat pe date murdare dă predicții proaste. `isna()` marchează unde lipsește o valoare, `dropna()` scoate rândurile cu goluri, `fillna(valoare)` le completează.

Pandas marchează o valoare lipsă cu `NaN` (de la „Not a Number”, adică „nu e un număr”). O celulă goală dintr-un CSV devine `NaN` când îl citești, iar în cod o scrii `np.nan`.

```
df = pd.DataFrame({"nume": ["Ana", "Bogdan", "Cris"],
                   "scor": [9.0, np.nan, 7.0]})

df.isna().sum()          # câte valori lipsesc pe fiecare coloană
                         # nume 0, scor 1
df_complet = df.dropna()  # scoate rândurile cu orice gol: rămân Ana și Cris
# completează golurile cu media
df["scor"] = df["scor"].fillna(df["scor"].mean())
print(df)
#      nume  scor
# 0     Ana   9.0
# 1  Bogdan   8.0
# 2    Cris   7.0
```

`isna()` dă un tabel de aceeași formă, cu True unde lipsește o valoare. `.sum()` adună pe fiecare coloană, iar True contează ca 1 și False ca 0, deci iese numărul de goluri. `mean()` sare peste `NaN`, așa că media e (9 + 7) / 2 = 8, iar Bogdan primește 8.0.

`dropna` și `fillna` nu schimbă datele pe loc, ci întorc o copie nouă, așa că trebuie s-o pui într-o variabilă. Fără `=`, linia nu are niciun efect.

> [!NOTE]
> Alege între `dropna` și `fillna` în funcție de câte rânduri ai și de ce înseamnă lipsa: dacă lipsesc puține valori, le poți arunca; dacă lipsesc multe, arunci prea multe date bune odată cu ele.

`duplicated()` marchează rândurile identice cu unul de mai devreme, `drop_duplicates()` le scoate. Mai jos, Ana apare de două ori cu exact aceleași valori: `duplicated()` dă False la prima apariție și True la a doua, iar `drop_duplicates()` o păstrează doar pe prima.

`astype()` schimbă tipul unei coloane, de exemplu dintr-un text într-un număr: textul `"9.5"` devine numărul 9.5. `pd.to_datetime` face din texte ca `"2026-10-01"` date calendaristice, cu care Pandas știe să socotească, de exemplu câte zile sunt între două date.

```
df = pd.DataFrame({"nume": ["Ana", "Ana", "Bogdan"],
                   "scor": ["9.5", "9.5", "8"],
                   "data": ["2026-10-01", "2026-10-01", "2026-10-03"]})

df.duplicated().sum()          # câte rânduri sunt duplicate: 1
df = df.drop_duplicates()

df["scor"] = df["scor"].astype(float)
df["data"] = pd.to_datetime(df["data"])   # text -> dată calendaristică
```

## groupby, merge, pivot: cele pe care le folosești mereu
groupby împarte datele pe grupuri și calculează ceva pe fiecare grup: media pe clasă, suma pe categorie. Exemplul de mai jos are șase elevi din două clase de la școală, 9A și 9B.

```
df = pd.DataFrame({
    "nume": ["Ana", "Bogdan", "Cris", "Dan", "Elena", "Filip"],
    "clasa": ["9A", "9A", "9A", "9B", "9B", "9B"],
    "scor": [9.0, 10.0, 8.0, 5.0, 9.0, 7.0],
})

df.groupby("clasa")["scor"].mean()      # media scorului pe fiecare clasă
# clasa
# 9A    9.0
# 9B    7.0
# Name: scor, dtype: float64
df.groupby("clasa").size()             # câte rânduri are fiecare clasă
# 3 rânduri la 9A, 3 la 9B
```

`groupby("clasa")` pune la un loc rândurile cu aceeași clasă, `["scor"]` alege coloana, iar `.mean()` face media în fiecare grup: la 9A, (9 + 10 + 8) / 3 = 9. Rezultatul e un Series cu clasele pe post de index, iar `Name: scor` e numele lui, luat de la coloană.

Cu `agg` calculezi mai multe statistici deodată, iar `transform` întoarce rezultatul pe fiecare rând, ca să-l poți pune înapoi în tabel ca o coloană nouă.

```
df.groupby("clasa")["scor"].agg(["mean", "std", "count"])
#        mean  std  count
# clasa
# 9A      9.0  1.0      3
# 9B      7.0  2.0      3

df["media_clasei"] = df.groupby("clasa")["scor"].transform("mean")
print(df)
#      nume clasa  scor  media_clasei
# 0     Ana    9A   9.0           9.0
# 1  Bogdan    9A  10.0           9.0
# 2    Cris    9A   8.0           9.0
# 3     Dan    9B   5.0           7.0
# 4   Elena    9B   9.0           7.0
# 5   Filip    9B   7.0           7.0
```

`agg` primește lista cu numele statisticilor și dă câte un rând pe grup, deci 2 rânduri. `std` e deviația standard de la `describe()`: notele din 9B (5, 7, 9) sunt mai împrăștiate decât cele din 9A (8, 9, 10), așa că ea iese mai mare. `transform` dă câte o valoare pentru fiecare rând din tabelul inițial, deci 6: fiecare elev primește media clasei lui, și de asta rezultatul încape direct într-o coloană nouă.

merge lipește două tabele după o coloană comună. Mai jos, un tabel are elevii, altul notele, iar coloana `id`, numărul fiecărui elev, le leagă.

```
df = pd.DataFrame({"id": [1, 2, 3],
                   "nume": ["Ana", "Bogdan", "Cris"]})
alt_tabel = pd.DataFrame({"id": [1, 3, 4],
                          "scor": [9.0, 7.5, 8.0]})

df.merge(alt_tabel, on="id", how="left")
#    id    nume  scor
# 0   1     Ana   9.0
# 1   2  Bogdan   NaN
# 2   3    Cris   7.5
df.merge(alt_tabel, on="id", how="inner")
#    id  nume  scor
# 0   1   Ana   9.0
# 1   3  Cris   7.5
```

`on="id"` spune după ce coloană potrivești rândurile. how spune ce faci cu rândurile fără pereche: left păstrează tot din stânga, inner doar potrivirile. Aici Bogdan (id 2) n-are notă, iar nota cu id 4 n-are elev. Cu `how="left"`, Bogdan rămâne, cu `NaN` la scor; cu `how="inner"`, rămân doar Ana și Cris. Nota cu id 4 dispare în ambele cazuri, pentru că nu are pereche în tabelul din stânga, `df`.

Când tabelele au aceleași coloane și vrei doar să le pui unul sub altul, folosești `pd.concat()` în loc de merge.

```
df1 = pd.DataFrame({"nume": ["Ana", "Bogdan"], "scor": [9.0, 8.5]})
df2 = pd.DataFrame({"nume": ["Cris"], "scor": [7.5]})

pd.concat([df1, df2])   # pune df2 sub df1, aceleași coloane
#      nume  scor
# 0     Ana   9.0
# 1  Bogdan   8.5
# 0    Cris   7.5
```

`concat` nu potrivește nimic: coloanele rămân aceleași și se adună doar rândurile, 2 + 1 = 3, deci tabelul crește în jos, nu în lateral ca la merge. Fiecare rând își păstrează eticheta, așa că indexul are acum 0 de două ori; `pd.concat([df1, df2], ignore_index=True)` renumerotează rândurile 0, 1, 2.

pivot_table rearanjează un tabel lung într-unul lat, cu o coloană devenită antet: valorile ei, aici anii, devin numele coloanelor noi. Tabelul lung de mai jos are câte un rând pentru fiecare scor, cu clasa și anul lui. Cel lat are câte un rând pe clasă și câte o coloană pe an. E util la rapoarte și la văzut tipare pe două dimensiuni deodată.

```
df = pd.DataFrame({
    "clasa": ["9A", "9A", "9A", "9B", "9B", "9B"],
    "an": [2025, 2025, 2026, 2025, 2026, 2026],
    "scor": [8.0, 9.0, 10.0, 6.0, 7.0, 8.0],
})

# media scorului pe clasă (rânduri) și an (coloane)
df.pivot_table(index="clasa", columns="an",
               values="scor", aggfunc="mean")
# an     2025  2026
# clasa
# 9A      8.5  10.0
# 9B      6.0   7.5
```

`index` dă rândurile tabelului nou, `columns` coloanele, `values` ce pui în căsuțe, iar `aggfunc` cum combini valorile care ajung în aceeași căsuță. La 9A în 2025 sunt două scoruri, 8 și 9, deci căsuța primește media lor, 8.5.

## Alte operații frecvente
`sort_values()` sortează un DataFrame după o coloană, iar `ascending=False` înseamnă descrescător, de la mare la mic. `value_counts()` numără de câte ori apare fiecare valoare distinctă: pe tabelul cu elevi, câți elevi are fiecare clasă. Pe coloana țintă (target), cea pe care o prezici (Lecția 2), e prima verificare când vrei să vezi dacă clasele sunt dezechilibrate. Acolo clasele sunt valorile posibile ale țintei, ca spam și normal, iar dezechilibrate înseamnă că una apare mult mai rar, ca 5 emailuri spam la 95 normale.

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

Prima linie lucrează pe toată coloana deodată, ca la NumPy: un scor de 9.2 devine 92.0. `drop(columns=[...])` primește lista coloanelor de scos și, ca `dropna`, întoarce un tabel nou. În `apply`, funcția e o lambda (funcția scurtă, fără nume, din Lecția 3): primește pe rând fiecare scor `s` și întoarce `"bun"` dacă e peste 8, altfel `"slab"`.

`corr()` calculează corelația dintre coloanele numerice, un prim pas rapid ca să vezi ce coloane par legate de ținta pe care vrei s-o prezici. Corelația e un număr între -1 și 1: aproape de 1 când două coloane cresc împreună (orele de învățat și nota, de exemplu), aproape de -1 când una crește și cealaltă scade, aproape de 0 când nu par legate. Lecția 5 intră în detalii.

```
df.corr(numeric_only=True)
```

Rezultatul e un tabel cu câte un rând și o coloană pentru fiecare coloană numerică, iar la intersecția lor e corelația. Pe diagonală e mereu 1, pentru că fiecare coloană e perfect corelată cu ea însăși. `numeric_only=True` sare peste coloanele cu text.

La final, scrii rezultatul înapoi pe disc cu `to_csv`, exact formatul pe care îl încarci la submisie (fișierul cu predicțiile tale, din Lecția 2). `index=False` îi spune să nu scrie și indexul: fără el, fișierul ar avea în față o coloană în plus, cu 0, 1, 2..., pe care platforma nu o așteaptă.

```
df.to_csv("rezultat.csv", index=False)
```

## Grafice: Matplotlib și Seaborn
Un grafic îți arată în câteva secunde ce într-un tabel n-ai observa: o distribuție strâmbă, o valoare imposibilă, două coloane care cresc împreună. Distribuția unei coloane e felul în care se împart valorile ei, care apar des și care rar. Strâmbă înseamnă că majoritatea valorilor stau într-o parte, iar câteva se întind departe în cealaltă, cum sunt de obicei prețurile. Matplotlib e biblioteca de bază, iar Seaborn e construit peste ea și face graficele statistice dintr-o singură linie. Codul de mai jos e un tipar: `df` e tabelul tău, iar numele coloanelor le înlocuiești cu ale tale.

```
import matplotlib.pyplot as plt
import seaborn as sns

# linie: cum se schimbă o valoare în timp
plt.plot(df["zi"], df["temperatura"])
plt.show()

# bare: câte rânduri are fiecare categorie
df["oras"].value_counts().plot(kind="bar")
plt.show()

# histogramă: distribuția unei coloane
plt.hist(df["varsta"], bins=30)
plt.show()

# scatter: legătura dintre două coloane
plt.scatter(df["suprafata"], df["pret"])
plt.show()
```

- Linia unește punctele în ordine, aici temperatura din fiecare zi: vezi dacă valoarea urcă, coboară sau are salturi.
- Barele arată câte rânduri are fiecare categorie: `value_counts()` numără orașele, iar `.plot(kind="bar")` desenează câte o bară pentru fiecare. Vezi pe loc dacă o categorie domină.
- Histograma împarte valorile coloanei în intervale (`bins=30` înseamnă 30 de intervale) și ridică pe fiecare interval o bară, cu atât mai înaltă cu cât intră mai multe valori în el. Așa vezi distribuția: unde se adună valorile, dacă e strâmbă, dacă are valori imposibile.
- Scatter-ul desenează fiecare rând ca un punct, cu suprafața pe orizontală și prețul pe verticală. Dacă punctele urcă spre dreapta, cele două coloane cresc împreună.

Seaborn adaugă box plotul, bun ca să vezi outlierii, și heatmap-ul, bun pentru matricea de corelații. Outlierii sunt valori ieșite din tipar, mult mai mari sau mai mici decât restul coloanei. Box plotul desenează câte o cutie pentru fiecare grup, aici pentru fiecare clasă (`x="clasa"`), din valorile coloanei `y="scor"`, luate din tabelul `data=df`. Linia din cutie e mediana, iar cutia merge de la prima la a treia cuartilă (`25%` și `75%` din `describe()`). Liniile care ies din cutie arată până unde se întind celelalte valori, iar punctele desenate separat, dincolo de ele, sunt outlierii. Lecția 5 le explică pe larg.

```
# box plot: mediana, cuartilele și valorile ieșite din tipar
sns.boxplot(x="clasa", y="scor", data=df)
plt.show()

# heatmap: corelațiile dintre coloane, pe culori
sns.heatmap(df.corr(numeric_only=True), annot=True, cmap="coolwarm")
plt.show()
```

Heatmap-ul colorează fiecare căsuță dintr-un tabel de numere, aici tabelul de corelații de la `corr()`, ca să vezi dintr-o privire ce coloane merg împreună. `annot=True` scrie și numărul în fiecare căsuță, iar `cmap="coolwarm"` alege culorile: albastru pentru valorile mici, roșu pentru cele mari.

> [!NOTE]
> Pune `plt.show()` după fiecare grafic. Altfel, graficele din aceeași celulă se desenează unul peste altul.

## Imagini ca array-uri
Pentru calculator, o imagine color e un array de numere cu forma (înălțime, lățime, 3): trei canale, roșu, verde și albastru, cu valori de la 0 la 255. Fiecare pixel are câte un număr pe canal, unde 0 înseamnă deloc și 255 la maximum, așa că un pixel roșu e `[255 0 0]`, unul alb `[255 255 255]` și unul negru `[0 0 0]`. O citești cu Pillow și o transformi în array NumPy, iar de acolo merge tot ce ai văzut mai sus: pe array-ul `a` de mai jos, `a[:, :, 0]` îți dă doar canalul roșu.

```
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

# convert("RGB") scoate canalul de transparență, dacă există
img = Image.open("poza.png").convert("RGB")
a = np.array(img)
print(a.shape, a.dtype)                 # (înălțime, lățime, 3) uint8

gri = np.array(img.convert("L"))        # alb-negru, un singur canal
mica = np.array(img.resize((64, 64)))   # aceeași mărime pentru toate

plt.imshow(a)
plt.show()
```

La o poză de 640 pe 480 de pixeli, `print` scrie `(480, 640, 3) uint8`: întâi înălțimea, apoi lățimea. `uint8` e tipul pixelilor: numere întregi fără semn (u vine de la „unsigned”), de la 0 la 255, fiecare pe 8 biți. Unele PNG-uri au și un al patrulea canal, pentru transparență, iar `convert("RGB")` îl scoate. `convert("L")` face imaginea alb-negru: rămâne un singur număr pe pixel, luminozitatea, de la 0 (negru) la 255 (alb), deci forma devine (480, 640).

`resize((64, 64))` aduce poza la 64 pe 64 de pixeli, deci la forma (64, 64, 3). Un model vrea toate imaginile de aceeași formă, de asta le aduci pe toate la aceeași mărime. Atenție, `resize` primește întâi lățimea și apoi înălțimea, invers față de `shape`. `plt.imshow(a)` desenează array-ul ca imagine.

# @practice
- [numpy-100](https://github.com/rougier/numpy-100)
- [Kaggle Learn: Pandas](https://www.kaggle.com/learn/pandas)
- [Kaggle Learn: Data Visualization](https://www.kaggle.com/learn/data-visualization)
