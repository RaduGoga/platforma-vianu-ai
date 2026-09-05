---
code: S3
duration: ~1 săptămână
---

# @intro
Tot ce urmează în programă e scris în Python. Modulul ăsta e despre limbaj, nu despre machine learning: dacă îl sari, o să pierzi timp la fiecare lecție următoare căutând cum se scrie un dicționar. Dacă știi deja Python, treci repede peste el și oprește-te doar la comprehensions, despachetare, excepții și expresii regulate, care apar constant în codul de concurs.

## Tipuri și variabile
Python nu cere să declari tipul. Îl deduce din valoare, iar tipul poate să se schimbe.

```
n = 42            # int
pi = 3.14         # float
nume = "Victor"     # str
gata = True       # bool
nimic = None      # absența unei valori

print(type(n), type(pi))
```

Poți atribui mai multe variabile deodată, fie cu valori diferite, fie cu aceeași valoare tuturor.

```
a, b, c = 1, 2, 3
x = y = 0
```

Operatorii de atribuire pe scurt (`+=`, `-=`, `*=`, `//=`) modifica valoarea si apoi o pun in variabila respectivă.

```
total = 0
for s in [1, 2, 3]:
    total += s   # total = total + s
```

Pentru text, f-string-ul e felul modern de a insera valori. Pui un `f` în fața ghilimelelor și scrii expresia între acolade.

```
scor = 0.8734
print(f"scor: {scor:.2f}")        # scor: 0.87
print(f"dublu: {scor * 2:.3f}")   # dublu: 1.747
```

Împărțirea are două forme: `/` dă mereu float, `//` dă împărțirea întreagă rotunjită în jos, iar `%` dă restul. `int(...)` trunchiază spre zero, `round(...)` rotunjește normal, iar `str(...)`/`float(...)`/`list(...)` convertesc explicit între tipuri.

```
print(7 / 2)          # 3.5
print(7 // 2)         # 3
print(7 % 2)           # 1
print(int(3.9))        # 3, trunchiază
print(round(3.9))      # 4, rotunjește
print(str(42) + "!")   # "42!"
```

> [!NOTE]
> `0`, `0.0`, `""`, `[]`, `{}`, `set()` și `None` sunt toate „false" când le pui într-un `if`. O listă goală e falsă, orice altceva e adevărat.

## Cele patru structuri de date
Aproape tot ce scrii folosește una dintre astea.

- Lista: ordonată, se poate modifica. `[1, 2, 3]`
- Tuple: ordonată, nu se poate modifica. `(1, 2)`
- Dicționar: perechi cheie–valoare. `{"a": 1}`
- Mulțime: valori unice, fără ordine. `{1, 2, 3}`

```
scoruri = [0.71, 0.83, 0.79]
scoruri.append(0.88)
print(len(scoruri), max(scoruri))
```

Pe lângă `.append()`, listele mai au câteva metode pe care le folosești constant: `.insert(poz, val)` bagă la o poziție anume, `.pop(poz)` scoate elementul (fără argument, scoate ultimul), `.remove(val)` scoate prima apariție a unei valori, `.index(val)` îți dă poziția ei.

```
scoruri.insert(0, 0.5)
ultimul = scoruri.pop()
scoruri.remove(0.71)
print(scoruri.index(0.83))
```

Dicționarele nu se citesc doar cu `d["cheie"]`, care aruncă eroare dacă cheia lipsește. `.get("cheie", implicit)` întoarce o valoare implicită.

```
note = {
	"Radu" : 4,
	"Stefan" : 10,
	"Victor" : 8
}
print(note["Stefan"]) # 10
print(note.get("Radu")) # 4
```

Dicționarele pot conține alte dicționare.

```
elev = {"nume": "Ana", "note": {"ro": 9, "en": 10}}
print(elev["note"]["en"])   # 10
```

Mulțimile scot valorile duplicate și fac operații de tip matematic: reuniune, intersecție, diferență, utile când compari două seturi de etichete sau de cuvinte.

```
a = set([1, 2, 2, 3, 3, 3])   # {1, 2, 3}
b = {3, 4, 5}

a.add(10)
a.discard(1)

print(a | b)   # reuniune: {2, 3, 4, 5, 10}
print(a & b)   # intersecție: {3}
print(a - b)   # diferență: elemente din a care nu sunt în b
```

O altă capcană, mai puțin evidentă: `b = a` nu copiază lista, doar îi dă un nume nou aceleiași liste din memorie. Ca să ai o copie reală, folosește `a.copy()` sau `list(a)`.

```
a = [1, 2, 3]
b = a
b.append(4)
print(a)          # [1, 2, 3, 4], s-a schimbat și a

c = a.copy()
c.append(5)
print(a)          # neschimbat de data asta
```

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

Regula asta se repetă identic la string-uri, la array-urile NumPy și la coloanele Pandas. O înveți o dată și o folosești peste tot. String-urile au însă o particularitate: sunt imutabile, nu poți schimba un caracter pe loc, doar poți construi un string nou.

```
s = "Vianu"
s[0]        # "V", indexarea merge
# s[0] = "X"  # eroare: TypeError, string-urile nu se modifică

s2 = "X" + s[1:]   # "Xianu", string nou
```

Pentru caractere speciale în string-uri folosești secvențe de escape: `\n` linie nouă, `\t` tab, `\\` un singur backslash, `\"` ghilimele în interiorul unui string cu ghilimele duble.

```
print("prima linie\na doua linie")
print("coloana1\tcoloana2")
```

## Condiții și bucle
Blocurile se delimitează prin indentare, nu prin acolade. Patru spații, consecvent.

```
for s in scoruri:
    if s > 0.8:
        print("bun", s)
    else:
        print("slab", s)
```

Comparațiile (`==`, `!=`, `<`, `>`, `<=`, `>=`) și operatorii logici (`and`, `or`, `not`) se combină ca în orice limbaj, dar Python scrie `and`/`or`/`not` în loc de `&&`/`||`/`!`.

```
scor, incercari = 0.9, 3
if scor > 0.8 and incercari < 5:
    print("continuă")
if not (scor < 0.5 or incercari == 0):
    print("are sens să încerci")
```

O capcană clasică pentru cine vine din alt limbaj: `==` compară valorile, `is` compară dacă sunt exact același obiect în memorie. Pentru `None`, folosești mereu `is`, niciodată `==`.

```
x = None
if x is None:       # corect
    print("gol")

a = [1, 2]
b = [1, 2]
print(a == b)   # True, aceleași valori
print(a is b)   # False, obiecte diferite
```

Pentru un `if` scurt care doar alege între două valori, expresia condițională (ternary) încape pe o linie.

```
eticheta = "bun" if scor > 0.8 else "slab"
```

Când ai nevoie și de poziție, folosește `enumerate`. Când parcurgi două liste odată, `zip`.

```
for i, s in enumerate(scoruri):
    print(i, s)

for nume, scor in zip(["a", "b"], [0.7, 0.9]):
    print(nume, scor)
```

Pe lângă `for`, ai `while`, cât timp o condiție rămâne adevărată. `break` iese din buclă, `continue` sare peste iterația curentă.

```
i = 0
while i < len(scoruri):
    if scoruri[i] < 0.5:
        i += 1
        continue
    if scoruri[i] > 0.95:
        break
    print(scoruri[i])
    i += 1
```

Sortarea se face cu `sorted()` sau `.sort()`, iar `key` îți spune după ce sortezi.

```
elevi = [("Ana", 9.2), ("Bogdan", 8.7), ("Cris", 9.5)]
elevi.sort(key=lambda x: x[1], reverse=True)
print(elevi)   # sortați descrescător după notă
```

## Comprehensions
Un mod scurt de a construi o structură dintr-alta. Apare des în codul de concurs, așa că merită citit fluent chiar dacă la început scrii bucle obișnuite.

```
patrate = [x * x for x in range(5)]          # [0, 1, 4, 9, 16]
bune = [s for s in scoruri if s > 0.8]       # doar cele peste 0.8
```

Se citește de la stânga: „ia fiecare x din range, păstrează-l dacă trece condiția, pune x*x în listă". Merge la fel pentru dicționare și mulțimi. `range(n)` nu creează efectiv o listă de n numere, generează valorile pe rând, deci `range(10_000_000)` nu ocupă memorie pentru zece milioane de numere.

```
lungimi = {c: len(c) for c in ["rf", "xgboost"]}   # {"rf": 2, "xgboost": 7}
unice_lung = {len(c) for c in ["rf", "svm", "cnn"]}   # {2, 3}
```

O expresie generator arată la fel ca o list comprehension, dar cu paranteze rotunde. Nu construiește toată structura în memorie dintr-o dată, ci produce valorile pe rând, ceea ce contează pe sume sau bucle mari.

```
suma = sum(x * x for x in range(1_000_000))
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

O variabilă creată într-o funcție există doar acolo, e locală. Funcția vede variabilele globale, dar nu le poate modifica fără cuvântul cheie `global`, iar nevoia de `global` e de obicei semn că funcția ar trebui rescrisă să primească și să întoarcă valori, nu să atingă starea din afară.

```
contor = 0

def increment_gresit():
    contor = contor + 1   # eroare: variabilă locală folosită înainte de a fi definită

def increment():
    global contor
    contor += 1   # merge, dar evită tiparul ăsta când poți
```

Uneori nu știi dinainte câte argumente primești. `*args` adună argumentele poziționale într-un tuple, `**kwargs` pe cele numite într-un dicționar.

```
def raport(*scoruri, **info):
    print("scoruri:", scoruri)
    print("info:", info)

raport(0.8, 0.9, model="rf", seed=42)
```

O `lambda` e o funcție mică, fără nume, scrisă pe o linie. O vezi des ca argument pentru `sorted`, `map` sau `filter`.

```
dublu = lambda x: x * 2
print(dublu(5))     # 10

print(list(map(lambda x: x * x, [1, 2, 3])))      # [1, 4, 9]
print(list(filter(lambda x: x > 0.8, scoruri)))   # doar cele peste 0.8
```

În practică, o comprehension face de multe ori treaba mai clar decât `map`/`filter`. Le folosești mai ales când funcția vine deja definită de altundeva.

O funcție se poate apela pe ea însăși, recursiv. Rar necesar în codul de zi cu zi de AI, dar util să-l recunoști: are mereu un caz de bază care oprește recursivitatea.

```
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))   # 120
```

O funcție cu `yield` în loc de `return` e un generator: nu întoarce toate valorile dintr-o dată, ci una pe rând, de fiecare dată când e apelată din nou printr-o buclă `for`.

```
def numere_pare(pana_la):
    for n in range(pana_la):
        if n % 2 == 0:
            yield n

for n in numere_pare(10):
    print(n)
```

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

O clasă poate moșteni dintr-alta, cu `class Copil(Parinte):`, și `super()` apelează varianta din clasa de bază. Vei vedea tiparul ăsta constant mai târziu, la rețele neuronale în PyTorch, unde orice model e o clasă care moștenește din `nn.Module`.

```
class Model:
    def __init__(self, nume):
        self.nume = nume

    def descrie(self):
        return f"model {self.nume}"

class ModelCuSeed(Model):
    def __init__(self, nume, seed):
        super().__init__(nume)
        self.seed = seed

    def descrie(self):
        return f"{super().descrie()}, seed {self.seed}"

print(ModelCuSeed("rf", 42).descrie())   # model rf, seed 42
```

Codul altcuiva se aduce cu `import`.

```
import math
from collections import Counter

print(math.sqrt(16))
print(Counter(["a", "b", "a"]))    # Counter({'a': 2, 'b': 1})
```

## Erori și excepții
Codul care citește fișiere, parsează date sau primește input dă erori, garantat. Python le numește excepții, și le prinzi cu `try`/`except` ca să nu-ți pice tot programul pentru o singură linie proastă.

```
def imparte(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        print("nu poți împărți la zero")
        return None

print(imparte(10, 2))   # 5.0
print(imparte(10, 0))   # mesaj, apoi None
```

Cele mai dese excepții la concurs: `ValueError` (o conversie eșuată, gen `int("abc")`), `KeyError` (o cheie care nu există într-un dicționar), `IndexError` (un indice în afara listei), `FileNotFoundError` (o cale greșită la date).

> [!NOTE]
> Nu prinde excepții cu `except:` gol. Ascunde orice greșeală, inclusiv pe cele pe care ar trebui să le vezi. Prinde exact tipul pe care îl aștepți, de exemplu `except ValueError:`.

`finally` rulează mereu, cu sau fără excepție, bun pentru curățenie. `assert` verifică rapid o presupunere și oprește programul cu un mesaj clar dacă nu e adevărată, util să prinzi bug-uri devreme, nu la finalul rulării.

```
assert len(X) == len(y), "X și y trebuie să aibă aceeași lungime"
```

## Text și expresii regulate
Multe probleme, mai ales la NLP, cer curățat text înainte să faci orice altceva. String-urile au metode gata făcute pentru asta.

```
s = "  Al Doilea RĂZBOI Mondial  "
print(s.strip())          # scoate spațiile de la capete
print(s.lower())          # litere mici
print(s.split())          # ['Al', 'Doilea', 'RĂZBOI', 'Mondial']
print("-".join(["a", "b", "c"]))   # "a-b-c"
print(s.replace("RĂZBOI", "razboi"))
```

Pentru tipare mai complicate decât `.replace()`, modulul `re` face potriviri după expresii regulate.

```
import re

text = "contact: ana@exemplu.ro sau 0722 123 456"
emailuri = re.findall(r"[\w.]+@[\w.]+", text)
print(emailuri)    # ['ana@exemplu.ro']

curatat = re.sub(r"\d+", "", text)   # scoate toate cifrele
```

> [!NOTE]
> `re` merită învățat treptat, nu dintr-o dată. La început ține minte doar `findall` (găsește toate potrivirile) și `sub` (înlocuiește), și cauți restul când ai nevoie de el.

## Fișiere și formate de date
Citirea și scrierea unui fișier text se fac cu `with`, care îl închide singur chiar dacă apare o eroare.

```
with open("note.txt", "w", encoding="utf-8") as f:
    f.write("prima linie\n")

with open("note.txt", encoding="utf-8") as f:
    for linie in f:
        print(linie.strip())
```

Pune întotdeauna `encoding="utf-8"`. Fără el, pe Windows, diacriticele se citesc greșit.

Datele de concurs vin rar ca text simplu. De obicei sunt CSV sau JSON, și Python are module standard pentru amândouă, chiar înainte să ajungi la Pandas.

```
import csv

with open("scoruri.csv", encoding="utf-8") as f:
    cititor = csv.DictReader(f)
    for rand in cititor:
        print(rand["nume"], rand["scor"])
```

```
import json

date = {"model": "rf", "scor": 0.87}
with open("rezultat.json", "w", encoding="utf-8") as f:
    json.dump(date, f)

with open("rezultat.json", encoding="utf-8") as f:
    incarcat = json.load(f)
```

Pentru căi de fișiere, `pathlib` e mai clar decât să lipești string-uri cu `+`.

```
from pathlib import Path

folder = Path("date")
fisier = folder / "train.csv"
print(fisier.exists())
```

## Random și reproductibilitate
Multe lucruri în AI par întâmplătoare: împărțirea datelor, inițializarea unui model, amestecarea unui set de antrenament. Modulul `random` controlează asta, iar `seed`-ul face rezultatele repetabile.

```
import random

random.seed(42)
print(random.random())        # mereu aceeași valoare, cu același seed
print(random.randint(1, 10))
random.shuffle(scoruri)       # amestecă lista pe loc
```

> [!NOTE]
> Pune `random.seed(...)` la începutul scriptului, o singură dată. Fără el, rulezi codul de două ori și iei rezultate diferite, ceea ce face imposibil să compari corect două idei.