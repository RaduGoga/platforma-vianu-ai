---
code: S3
duration: ~1 săptămână
---

# @intro
Tot ce urmează în programă e scris în Python. Modulul ăsta e despre limbaj, nu despre machine learning: dacă îl sari, o să pierzi timp la fiecare lecție următoare căutând cum se scrie un dicționar. Dacă știi deja Python, treci repede peste el și oprește-te doar la comprehensions și la despachetare, care apar constant în codul de concurs.

## Tipuri și variabile
Python nu cere să declari tipul. Îl deduce din valoare, iar tipul poate să se schimbe. Asta e comod, dar înseamnă că erorile de tip apar la rulare, nu înainte.

```
n = 42            # int
pi = 3.14         # float
nume = "Radu"     # str
gata = True       # bool
nimic = None      # absența unei valori

print(type(n), type(pi))
```

Pentru text, f-string-ul e felul modern de a insera valori. Pui un `f` în fața ghilimelelor și scrii expresia între acolade.

```
scor = 0.8734
print(f"scor: {scor:.2f}")        # scor: 0.87
print(f"dublu: {scor * 2:.3f}")   # dublu: 1.747
```

## Cele patru structuri de date
Aproape tot ce scrii folosește una dintre astea. Alegerea corectă îți simplifică restul codului.

- Lista: ordonată, se poate modifica. `[1, 2, 3]`
- Tuple: ordonată, nu se poate modifica. `(1, 2)`
- Dicționar: perechi cheie–valoare. `{"a": 1}`
- Mulțime: valori unice, fără ordine. `{1, 2, 3}`

```
scoruri = [0.71, 0.83, 0.79]
scoruri.append(0.88)
print(len(scoruri), max(scoruri))

model = {"nume": "rf", "adancime": 8}
print(model["nume"])
model["seed"] = 42

unice = set([1, 2, 2, 3, 3, 3])   # {1, 2, 3}
```

> [!NOTE]
> Caută rapid într-o mulțime sau într-un dicționar, nu într-o listă. Verificarea `x in lista` parcurge toate elementele; `x in multime` e aproape instant. Pe zeci de mii de elemente diferența se simte.

## Indexare și felii
Indexarea începe de la zero. Indicii negativi numără de la coadă. Felia `a:b` include începutul și exclude sfârșitul.

```
v = [10, 20, 30, 40, 50]

v[0]      # 10, primul
v[-1]     # 50, ultimul
v[1:3]    # [20, 30], de la 1 până înainte de 3
v[:2]     # [10, 20]
v[::2]    # [10, 30, 50], din doi în doi
```

Regula asta se repetă identic la string-uri, la array-urile NumPy și la coloanele Pandas. O înveți o dată și o folosești peste tot.

## Condiții și bucle
Blocurile se delimitează prin indentare, nu prin acolade. Patru spații, consecvent.

```
for s in scoruri:
    if s > 0.8:
        print("bun", s)
    else:
        print("slab", s)
```

Când ai nevoie și de poziție, folosește `enumerate`. Când parcurgi două liste odată, `zip`.

```
for i, s in enumerate(scoruri):
    print(i, s)

for nume, scor in zip(["a", "b"], [0.7, 0.9]):
    print(nume, scor)
```

## List comprehensions
Un mod scurt de a construi o listă dintr-alta. Apare des în codul de concurs, așa că merită citit fluent chiar dacă la început scrii bucle obișnuite.

```
patrate = [x * x for x in range(5)]          # [0, 1, 4, 9, 16]
bune = [s for s in scoruri if s > 0.8]       # doar cele peste 0.8
```

Se citește de la stânga: „ia fiecare x din range, păstrează-l dacă trece condiția, pune x*x în listă". Merge și pentru dicționare.

```
lungimi = {c: len(c) for c in ["rf", "xgboost"]}   # {"rf": 2, "xgboost": 7}
```

## Funcții
O funcție grupează cod pe care îl repeți. Argumentele pot avea valori implicite, iar cele implicite se pun întotdeauna la final.

```
def normalizeaza(v, minim=0.0, maxim=1.0):
    lo, hi = min(v), max(v)
    if hi == lo:
        return [minim] * len(v)
    return [minim + (x - lo) / (hi - lo) * (maxim - minim) for x in v]

print(normalizeaza([2, 4, 6]))    # [0.0, 0.5, 1.0]
```

Despachetarea îți lasă să atribui mai multe valori odată. O vei vedea constant la împărțirea datelor.

```
a, b = 1, 2
X_tr, X_val, y_tr, y_val = imparte(X, y)   # patru valori dintr-o dată
```

> [!NOTE]
> Nu pune niciodată o listă sau un dicționar ca valoare implicită a unui argument. Se creează o singură dată, la definirea funcției, și rămâne comună între apeluri. Folosește `None` și creează valoarea înăuntru.

## Clase și module
O clasă ține date și funcții la un loc. N-o să scrii multe, dar toate bibliotecile pe care le folosești sunt construite din clase, deci trebuie să înțelegi ce se întâmplă când scrii `model.fit(X, y)`.

```
class Medie:
    def __init__(self):
        self.valoare = None

    def fit(self, y):
        self.valoare = sum(y) / len(y)
        return self

    def predict(self, n):
        return [self.valoare] * n

m = Medie().fit([1, 2, 3])
print(m.predict(2))    # [2.0, 2.0]
```

Asta e exact tiparul din scikit-learn: `fit` învață și reține, `predict` folosește ce a învățat.

Codul altcuiva se aduce cu `import`.

```
import math
from collections import Counter

print(math.sqrt(16))
print(Counter(["a", "b", "a"]))    # Counter({'a': 2, 'b': 1})
```

## Fișiere
Citirea și scrierea se fac cu `with`, care închide fișierul singur chiar dacă apare o eroare.

```
with open("note.txt", "w", encoding="utf-8") as f:
    f.write("prima linie\n")

with open("note.txt", encoding="utf-8") as f:
    for linie in f:
        print(linie.strip())
```

Pune întotdeauna `encoding="utf-8"`. Fără el, pe Windows, diacriticele se citesc greșit.

# @takeaways
- Alegi structura după ce ai nevoie: listă pentru ordine, dicționar pentru căutare după cheie, mulțime pentru unicitate.
- Feliile `a:b` includ începutul și exclud sfârșitul, la fel peste tot în Python.
- Comprehensions scurtează buclele care construiesc liste; merită citite fluent.
- Tiparul `fit` și `predict` din clase e chiar cel din scikit-learn.
- `with open(...)` închide fișierul singur; pune mereu `encoding="utf-8"`.

# @pitfalls
- Folosește tuple când vrei ceva ce nu se modifică și listă când vrei să adaugi.
- Caută cu `in` într-o mulțime sau într-un dicționar, nu într-o listă mare.
- Pune `None` ca valoare implicită și creează lista sau dicționarul înăuntrul funcției.
- Indentează consecvent cu patru spații, niciodată amestecate cu tab-uri.
- Pune `encoding="utf-8"` la orice fișier cu diacritice.

# @practice
- Scrie o funcție care primește o listă de numere și întoarce media, mediana și valoarea maximă.
- Numără cuvintele dintr-un text cu un dicționar, apoi rescrie soluția cu `Counter`.
- Rescrie trei bucle `for` pe care le-ai scris deja ca list comprehensions.
