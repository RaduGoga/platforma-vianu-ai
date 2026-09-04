---
code: S4
duration: ~2 săptămâni
---

# @intro
NumPy și Pandas sunt uneltele pe care le folosești în fiecare problemă, indiferent de model. Dacă te împiedici de ele, pierzi timp prețios. Scopul aici nu e doar să scrii cod care merge, ci să-l scrii repede și din reflex. Le înveți o dată bine și le folosești tot restul anului.

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

Indexarea cu mască booleană e o unealtă pe care o folosești zilnic: construiești un vector de True/False și selectezi doar elementele unde e True. Așa filtrezi date fără buclă.

```
x[x > 3]         # doar elementele mai mari ca 3 -> [4, 5, 6]
x[x > 3] = 0     # și le poți și schimba pe loc
```

## Broadcasting: cum potrivește NumPy forme diferite
Broadcasting e regula prin care NumPy face operații între vectori de forme diferite, întinzând automat pe cel mic ca să se potrivească. E de aur când o înțelegi și sursă de bug-uri ciudate când nu. Jumătate din erorile de început vin din forme care nu se potrivesc cum credeai.

Regula, simplu: NumPy compară formele de la dreapta la stânga. Două dimensiuni se potrivesc dacă sunt egale sau dacă una e 1 (aia se întinde). Un scalar se potrivește cu orice.

```
X = np.array([[1, 2, 3],
              [4, 5, 6]])      # forma (2, 3)
medii = X.mean(axis=0)         # forma (3,): [2.5, 3.5, 4.5]
X_centrat = X - medii          # (2,3) - (3,) se potrivește, scade pe coloane
```
caption: Centrarea unei matrice pe medii, fără nicio buclă.

> [!NOTE]
> Când o operație dă eroare de shape, tipărește formele celor doi operanzi și aplică regula de la dreapta la stânga. De 9 din 10 ori vezi imediat unde nu se potrivesc.

## Pandas: date cu etichete
NumPy e bun la numere, dar datele reale au nume: coloana vârstă, coloana scor, coloana clasă. Pandas adaugă etichete peste NumPy. Un DataFrame e un tabel cu nume de coloane și un index pe rânduri. E structura în care ajung mai toate seturile de concurs.

Citești un fișier CSV cu o singură linie. Apoi te uiți la el înainte de orice: primele rânduri, tipurile coloanelor, câte valori lipsesc.

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

> [!NOTE]
> Capcana apare când indexul nu e 0,1,2,... De exemplu după o filtrare, indexul are goluri. Atunci iloc[0] și loc[0] pot fi rânduri complet diferite. Alege conștient care vrei.

## groupby, merge, pivot: cele trei pe care le folosești mereu
groupby împarte datele pe grupuri și calculează ceva pe fiecare grup: media pe clasă, suma pe categorie. E tiparul split-apply-combine: împarți, aplici o funcție, lipești rezultatele la loc.

```
df.groupby("clasa")["scor"].mean()      # media scorului pe fiecare clasă
df.groupby("clasa").size()             # câte rânduri are fiecare clasă
```

merge lipește două tabele după o coloană comună, exact ca un JOIN din baze de date. how spune ce faci cu rândurile fără pereche: left păstrează tot din stânga, inner doar potrivirile.

```
df.merge(alt_tabel, on="id", how="left")
```

pivot_table rearanjează un tabel lung într-unul lat, cu o coloană devenită antet. E util la rapoarte și la văzut tipare pe două dimensiuni deodată.

# @takeaways
- Vectorizarea înlocuiește buclele: operezi pe tot vectorul deodată, mult mai rapid.
- Forma și axele sunt primul lucru de verificat la un bug de NumPy.
- Broadcasting potrivește forme comparând de la dreapta la stânga; una din dimensiuni trebuie să fie egală sau 1.
- loc după etichetă, iloc după poziție, nu le amesteca.
- groupby, merge, pivot_table apar în aproape orice problemă tabelară.

# @pitfalls
- Vectorizează în loc să iterezi peste rândurile unui DataFrame; aproape mereu există o variantă.
- Verifică indexul înainte să alegi între loc și iloc, mai ales când nu e 0, 1, 2.
- La eroare de shape, tipărește formele și aplică regula de broadcasting.

# @practice
- Ia un CSV și răspunde la cinci întrebări despre el folosind doar groupby și filtrări cu măști.
- Rescrie o buclă Python cu o operație vectorizată și compară timpii.
- Centrează o matrice pe mediile coloanelor folosind broadcasting, fără buclă.
