---
code: S3
duration: ~1 săptămână
---

# @intro
Tot ce urmează în programă e scris în Python. Lecția asta e despre limbaj, nu despre machine learning: dacă o sari, o să pierzi timp la fiecare lecție următoare căutând cum se scrie un dicționar. Dacă n-ai mai programat, citește-o în ordine și rulează fiecare bloc de cod într-un notebook din Jupyter Lab (Lecția 1), apoi modifică o valoare și vezi ce se schimbă. Dacă știi deja Python, treci repede peste ea și oprește-te doar la comprehensions, despachetare, excepții și expresii regulate, care apar constant în codul de concurs.

## Primele linii de cod
Un notebook e format din celule (Lecția 1). Scrii codul într-o celulă și o rulezi cu Shift+Enter: Python execută liniile pe rând, de sus în jos, și îți arată rezultatul chiar sub celulă.

```
print("Salut, Vianu")   # Salut, Vianu
print(2 + 3)            # 5
# rândul ăsta e un comentariu, Python îl sare
print(6 * 7)            # 42
```

Sub celulă apar trei rânduri, în ordine: `Salut, Vianu`, `5` și `42`. `print` e o funcție, adică o comandă cu nume pe care o pui să lucreze (o apelezi) scriind după ea o valoare între paranteze. Valoarea dintre paranteze se numește argument, iar `print` o afișează sub celulă. Textul scris între ghilimele apare exact așa. La `2 + 3`, Python face întâi calculul și afișează rezultatul. În cod, `*` e înmulțirea și `/` împărțirea.

Tot ce urmează după `#` pe un rând e un comentariu: o notiță pentru oameni, pe care Python n-o rulează. În lecția asta, comentariul de la capătul unei linii îți arată ce afișează linia, ca să compari cu ce vezi sub celulă.

Dacă ultima linie din celulă e doar o valoare, fără `print`, Jupyter o afișează și pe ea. Celelalte linii fără `print` nu apar, de aceea exemplele de aici folosesc `print` peste tot. Dacă greșești ceva (de exemplu uiți o ghilimea), Python se oprește și afișează un mesaj de eroare. Se întâmplă tuturor, iar la secțiunea Erori și excepții vezi cum îl citești.

## Tipuri și variabile
Linia `n = 42` pune valoarea 42 sub numele `n`. De acum, oriunde scrii `n`, Python folosește 42. Un nume căruia îi dai o valoare ca s-o folosești mai târziu se numește variabilă, iar pasul în care i-o dai, cu `=`, se numește atribuire. Aici `=` nu e egalul din matematică: înseamnă „pune valoarea din dreapta în numele din stânga”.

Fiecare valoare are un tip, care spune ce fel de valoare e. Tipurile de bază:

- `int`: număr întreg, ca 42, 0 sau -7.
- `float`: număr cu zecimale, scris cu punct, nu cu virgulă: 3.14, 0.5.
- `str` (de la string, șir de caractere): text, scris între ghilimele, ca `"Victor"`.
- `bool`: o valoare de adevăr, `True` (adevărat) sau `False` (fals).
- `None`: „nimic încă”, valoarea pe care o pui într-o variabilă când nu ai încă ce pune în ea.

În alte limbaje de programare scrii tipul înaintea numelui, adică îl declari. Python nu cere să declari tipul. Îl deduce din valoare, iar tipul poate să se schimbe: după `n = 42` poți scrie `n = "Ana"`, și `n` devine text.

```
n = 42            # int
pi = 3.14         # float
nume = "Victor"   # str
gata = True       # bool
nimic = None      # absența unei valori

print(type(n), type(pi))   # <class 'int'> <class 'float'>
```

`type(...)` e o funcție care îți spune tipul unei valori. Răspunsul arată ciudat, `<class 'int'>`, dar contează doar cuvântul dintre apostrofuri (ce e o clasă afli spre finalul lecției). Când dai lui `print` mai multe argumente despărțite prin virgulă, le afișează pe același rând, cu câte un spațiu între ele.

Poți atribui mai multe variabile deodată, fie cu valori diferite, fie cu aceeași valoare tuturor.

```
a, b, c = 1, 2, 3   # a primește 1, b primește 2, c primește 3
x = y = 0           # și x, și y primesc 0
print(a, b, c, x, y)   # 1 2 3 0 0
```

Adesea vrei să schimbi o variabilă pornind de la valoarea ei, de exemplu să adaugi 5 puncte la un scor de 10. Scrii `scor = scor + 5`: Python calculează întâi partea din dreapta, 10 + 5 = 15, apoi pune rezultatul înapoi în `scor`. Operatorii de atribuire pe scurt (`+=`, `-=`, `*=`, `//=`) modifică valoarea și apoi o pun în variabila respectivă, cu mai puțin de scris. Pe `//` îl vezi puțin mai jos.

```
scor = 10
scor += 5      # la fel ca scor = scor + 5
print(scor)    # 15
scor *= 2      # la fel ca scor = scor * 2
print(scor)    # 30
```

Pentru text, f-string-ul e felul modern de a insera valori, de exemplu ca să afișezi „scor: 0.87”. Pui un `f` în fața ghilimelelor și scrii expresia între acolade, `{ }`. Expresia poate fi o variabilă sau un calcul. După două puncte (`:`) poți cere un format: `:.2f` înseamnă „număr cu zecimale (`f`), cu două cifre după punct (`.2`)”, rotunjit. La fel, `:.3f` lasă trei zecimale.

```
scor = 0.8734
print(f"scor: {scor:.2f}")        # scor: 0.87
print(f"dublu: {scor * 2:.3f}")   # dublu: 1.747
```

În al doilea rând, Python calculează întâi 0.8734 * 2 = 1.7468, apoi îl rotunjește la trei zecimale: 1.747.

Împărțirea are două forme. `/` dă mereu float, chiar și când împărțirea e exactă: `6 / 2` dă 3.0. `//` dă împărțirea întreagă rotunjită în jos, adică de câte ori încape 2 în 7: de 3 ori. Iar `%` dă restul: 7 = 2 · 3 + 1, deci `7 % 2` e 1.

`int(...)` trunchiază spre zero, adică taie zecimalele: `int(3.9)` dă 3, iar `int(-3.9)` dă -3. `round(...)` rotunjește la cel mai apropiat întreg, deci `round(3.9)` dă 4. La jumătate, Python merge spre numărul par: `round(2.5)` dă 2, iar `round(3.5)` dă 4. `str(...)`/`float(...)`/`list(...)` convertesc explicit între tipuri, adică transformă o valoare într-un tip ales de tine: `str(42)` e textul `"42"`, iar `float("2.5")` e numărul 2.5. Pe `list(...)` îl vezi la liste.

```
print(7 / 2)          # 3.5
print(7 // 2)         # 3
print(7 % 2)          # 1
print(int(3.9))       # 3, trunchiază
print(int(-3.9))      # -3, tot spre zero
print(round(3.9))     # 4, rotunjește
print(str(42) + "!")  # 42!
```

Ultima linie lipește două texte: `+` între două string-uri le pune unul după altul. Un număr și un text nu se pot aduna direct (`42 + "!"` dă eroare), de aceea transformi întâi 42 în text, cu `str(42)`.

## Cele patru structuri de date
Când ai mai multe valori care țin de același lucru, cum sunt notele din catalog sau scorurile a zece modele, nu faci câte o variabilă pentru fiecare. Le pui pe toate într-o structură de date: o singură variabilă care ține mai multe valori, numite elemente. Aproape tot ce scrii folosește una dintre astea.

- Lista: ordonată, se poate modifica. `[1, 2, 3]`. Seamănă cu o listă de cumpărături: ordonată înseamnă că fiecare element are un loc al lui (primul, al doilea și tot așa), iar „se poate modifica” înseamnă că poți adăuga, scoate sau schimba elemente.
- Tuple: ordonată, nu se poate modifica. `(1, 2)`. Bună pentru valori care merg împreună și nu trebuie să se schimbe, cum sunt coordonatele unui punct.
- Dicționar: perechi formate dintr-o cheie și o valoare. `{"a": 1}`. Ca un catalog: cheia e numele după care cauți (`"Ana"`), valoarea e ce găsești la el (nota 9).
- Mulțime: valori unice, fără ordine. `{1, 2, 3}`. Dintr-o listă de orașe cu repetiții, mulțimea păstrează fiecare oraș o singură dată, iar elementele ei nu au poziții.

Lista de mai jos ține scorurile a trei modele, numere între 0 și 1, ca acuratețea din Lecția 2 (0.71 înseamnă 71% răspunsuri corecte).

```
scoruri = [0.71, 0.83, 0.79]
scoruri.append(0.88)
print(scoruri)                      # [0.71, 0.83, 0.79, 0.88]
print(len(scoruri), max(scoruri))   # 4 0.88
```

`.append(0.88)` adaugă 0.88 la finalul listei. O funcție care ține de o anumită valoare și pe care o apelezi cu un punct după numele valorii, ca `scoruri.append(...)`, se numește metodă. `len` și `max` sunt funcții obișnuite: `len` numără elementele (4), iar `max` îl dă pe cel mai mare (0.88). Pentru cel mai mic există `min`.

Pe lângă `.append()`, listele mai au câteva metode pe care le folosești constant: `.insert(poz, val)` bagă la o poziție anume, `.pop(poz)` scoate elementul (fără argument, scoate ultimul), `.remove(val)` scoate prima apariție a unei valori, `.index(val)` îți dă poziția ei. Pozițiile se numără de la 0, deci poziția 0 e începutul listei (mai multe la Indexare și felii).

```
scoruri = [0.71, 0.83, 0.79]
scoruri.insert(0, 0.5)       # pune 0.5 pe poziția 0, la început
print(scoruri)               # [0.5, 0.71, 0.83, 0.79]
ultimul = scoruri.pop()      # scoate ultimul element și ți-l dă
print(ultimul, scoruri)      # 0.79 [0.5, 0.71, 0.83]
scoruri.remove(0.71)
print(scoruri)               # [0.5, 0.83]
print(scoruri.index(0.83))   # 1
```

Într-un dicționar scrii perechile între acolade, sub forma `cheie: valoare`, despărțite prin virgulă. Valoarea de la o cheie o citești cu `d["cheie"]`, unde `d` e numele dicționarului. Dicționarele nu se citesc doar așa: `d["cheie"]` aruncă eroare (oprește programul) dacă cheia lipsește, iar `.get("cheie", implicit)` întoarce în locul ei o valoare implicită, aleasă de tine. Fără al doilea argument, `.get` întoarce `None`. Cu `note["Ana"] = 9` adaugi o pereche nouă, sau schimbi valoarea dacă cheia există deja.

```
note = {
    "Radu": 4,
    "Stefan": 10,
    "Victor": 8
}
print(note["Stefan"])       # 10
print(note.get("Radu"))     # 4
print(note.get("Ana", 0))   # 0, pentru că "Ana" nu e în dicționar
note["Ana"] = 9             # adaugă cheia "Ana", cu valoarea 9
print(note["Ana"])          # 9
```

Dicționarele pot conține alte dicționare. Le citești din exterior spre interior: `elev["note"]` e dicționarul `{"ro": 9, "en": 10}`, iar `["en"]` scoate din el nota 10.

```
elev = {"nume": "Ana", "note": {"ro": 9, "en": 10}}
print(elev["note"]["en"])   # 10
```

Mulțimile scot valorile duplicate și fac operații de tip matematic: reuniune, intersecție, diferență, utile când compari două seturi de etichete sau de cuvinte. `set(...)` face o mulțime dintr-o listă. `.add(x)` adaugă un element, iar `.discard(x)` îl scoate, fără eroare dacă nu există. Operațiile se scriu cu semne: `|` e reuniunea (ce e în a sau în b), `&` intersecția (ce e în amândouă), `-` diferența (ce e în a, dar nu în b).

```
a = set([1, 2, 2, 3, 3, 3])
print(a)       # {1, 2, 3}
b = {3, 4, 5}

a.add(10)
a.discard(1)
print(a)       # {10, 2, 3}

print(a | b)   # reuniune: {2, 3, 4, 5, 10}
print(a & b)   # intersecție: {3}
print(a - b)   # diferență: {10, 2}
```

`{10, 2, 3}` nu e o greșeală: mulțimea nu ține minte nicio ordine, așa că Python o poate afișa în altă ordine decât te-ai aștepta.

O capcană mai puțin evidentă ține de felul în care Python păstrează valorile. Când scrii `a = [1, 2, 3]`, Python construiește lista în memoria calculatorului și îi lipește eticheta `a`. Un lucru concret din memorie, ca lista asta, se numește obiect. `b = a` nu copiază lista, doar îi dă un nume nou aceleiași liste din memorie: sunt două etichete pe aceeași cutie, deci orice schimbi prin `b` se vede și prin `a`. Ca să ai o copie reală, folosește `a.copy()` sau `list(a)`.

```
a = [1, 2, 3]
b = a
b.append(4)
print(a)          # [1, 2, 3, 4], s-a schimbat și a

c = a.copy()
c.append(5)
print(a)          # [1, 2, 3, 4], neschimbat de data asta
print(c)          # [1, 2, 3, 4, 5]
```

## Indexare și felii
Fiecare element dintr-o listă are un număr de poziție, numit index (la plural, indici). Indexarea începe de la zero: în `v = [10, 20, 30, 40, 50]`, `v[0]` e 10, `v[1]` e 20, iar ultimul element, 50, are indexul 4. Indicii negativi numără de la coadă: `v[-1]` e ultimul element, `v[-2]` penultimul.

O felie (slice) ia o bucată din listă. Felia `a:b` include începutul și exclude sfârșitul: `v[1:3]` ia indicii 1 și 2, fără 3. Un capăt lăsat gol înseamnă „de la început” sau „până la final”, deci `v[:2]` sunt primele două elemente. Un al treilea număr e pasul: `v[::2]` ia din două în două.

```
v = [10, 20, 30, 40, 50]

print(v[0])      # 10, primul
print(v[-1])     # 50, ultimul
print(v[1:3])    # [20, 30], de la 1 până înainte de 3
print(v[:2])     # [10, 20]
print(v[::2])    # [10, 30, 50], din doi în doi
```

Regula asta se repetă identic la string-uri, la array-urile NumPy și la coloanele Pandas, pe care le vezi în Lecția 4. O înveți o dată și o folosești peste tot. String-urile au însă o particularitate: sunt imutabile, adică nu se pot modifica după ce le-ai creat, la fel ca tuplele. Nu poți schimba un caracter (o literă, o cifră, un spațiu) pe loc, doar poți construi un string nou.

```
s = "Vianu"
print(s[0])        # V, indexarea merge
# s[0] = "X"       # eroare: TypeError, string-urile nu se modifică

s2 = "X" + s[1:]   # "X" lipit de "ianu"
print(s2)          # Xianu, string nou
```

Linia care începe cu `#` e un comentariu, deci nu rulează. Dacă ștergi `#`-ul, Python dă eroarea `TypeError`. `s[1:]` e felia de la indexul 1 până la final, adică `"ianu"`.

Unele caractere nu se pot scrie direct între ghilimele, de exemplu un rând nou. Pentru caractere speciale în string-uri folosești secvențe de escape: un backslash `\` urmat de un semn care spune ce caracter vrei. `\n` e o linie nouă, `\t` un tab (un spațiu lat, ca la tasta Tab), `\\` un singur backslash, `\"` ghilimele în interiorul unui string cu ghilimele duble.

```
print("prima linie\na doua linie")   # afișează două rânduri
print("coloana1\tcoloana2")          # un tab între cele două cuvinte
```

## Condiții și bucle
Până acum, toate liniile au rulat, una după alta. De multe ori vrei ca un bloc de cod să ruleze doar în anumite situații, de exemplu să afișezi „bun” doar dacă scorul trece de 0.8. Pentru asta ai `if` (dacă) și `else` (altfel).

```
scor = 0.9
if scor > 0.8:
    print("bun")
else:
    print("slab")
# afișează: bun
```

`if` verifică o condiție, aici `scor > 0.8`. Dacă e adevărată, rulează liniile de sub el. Dacă e falsă, le rulează pe cele de sub `else`. Rândurile cu `if` și cu `else` se termină cu două puncte (`:`). Liniile de sub ele sunt mutate spre dreapta cu patru spații, adică indentate, și formează un bloc: aparțin de `if`-ul sau de `else`-ul de deasupra lor. Blocurile se delimitează prin indentare, nu prin acolade, cum fac alte limbaje. Patru spații, consecvent.

Ca să repeți ceva pentru fiecare element dintr-o listă, folosești o buclă `for`. `for s in scoruri:` ia pe rând fiecare element din `scoruri`, îl pune în variabila `s` și rulează blocul de dedesubt. O trecere prin bloc se numește iterație. Și rândul cu `for` se termină cu două puncte. Mai jos, în blocul buclei stă un `if`, deci liniile cu `print` sunt indentate de două ori: o dată pentru `for`, o dată pentru `if`.

```
scoruri = [0.71, 0.83, 0.79]
for s in scoruri:
    if s > 0.8:
        print("bun", s)
    else:
        print("slab", s)
# afișează:
# slab 0.71
# bun 0.83
# slab 0.79
```

O condiție e o întrebare cu răspunsul `True` sau `False`. Comparațiile (`==`, `!=`, `<`, `>`, `<=`, `>=`) și operatorii logici (`and`, `or`, `not`) se combină ca să construiești condiții. `==` înseamnă „egal” și are două semne, pentru că `=` simplu e atribuirea. `!=` înseamnă „diferit”, iar `<=` și `>=` sunt „mai mic sau egal” și „mai mare sau egal”. `and` cere ca amândouă condițiile să fie adevărate, `or` se mulțumește cu una, iar `not` inversează: adevărat devine fals. Dacă vii din alt limbaj, Python scrie `and`/`or`/`not` în loc de `&&`/`||`/`!`.

```
scor, incercari = 0.9, 3
if scor > 0.8 and incercari < 5:
    print("continuă")
if not (scor < 0.5 or incercari == 0):
    print("are sens să încerci")
# afișează:
# continuă
# are sens să încerci
```

Primul `if` trece, pentru că 0.9 > 0.8 și 3 < 5 sunt amândouă adevărate. La al doilea, paranteza e falsă (nici 0.9 < 0.5, nici 3 == 0 nu e adevărat), iar `not` o face adevărată. Aici nu există `else`: e opțional, iar fără el, când condiția e falsă, blocul pur și simplu nu rulează.

> [!NOTE]
> `0`, `0.0`, `""`, `[]`, `{}`, `set()` și `None` sunt toate „false” când le pui într-un `if`, deși nu sunt `False`: Python tratează ca falsă orice valoare zero sau goală. O listă goală e falsă, una cu elemente e adevărată, deci `if scoruri:` rulează blocul doar dacă lista are măcar un element.

O capcană clasică pentru cine vine din alt limbaj: `==` compară valorile („au aceeași valoare?”), `is` compară dacă sunt exact același obiect în memorie („e chiar aceeași cutie?”, ca la `b = a` de mai sus). Două liste construite separat pot avea aceleași valori și totuși să fie obiecte diferite. Pentru `None`, folosești mereu `is`, niciodată `==`: există un singur `None`, deci întrebi direct dacă variabila e chiar el.

```
x = None
if x is None:       # corect
    print("gol")    # se afișează

a = [1, 2]
b = [1, 2]
print(a == b)   # True, aceleași valori
print(a is b)   # False, obiecte diferite
```

Pentru un `if` scurt care doar alege între două valori, expresia condițională (ternary) încape pe o linie. Se citește aproape ca în română: `eticheta` primește `"bun"` dacă scorul trece de 0.8, altfel primește `"slab"`.

```
scor = 0.9
eticheta = "bun" if scor > 0.8 else "slab"
print(eticheta)   # bun
```

Când ai nevoie și de poziție, folosește `enumerate`. Când parcurgi două liste odată, `zip`. `enumerate(scoruri)` îți dă la fiecare iterație o pereche, poziția și elementul, așa că după `for` scrii două variabile: `i` primește poziția, `s` elementul. `zip` merge pe două liste în paralel, ca un fermoar: primul element cu primul, al doilea cu al doilea.

```
scoruri = [0.71, 0.83, 0.79]
for i, s in enumerate(scoruri):
    print(i, s)
# afișează:
# 0 0.71
# 1 0.83
# 2 0.79

for nume, scor in zip(["a", "b"], [0.7, 0.9]):
    print(nume, scor)
# afișează:
# a 0.7
# b 0.9
```

Pe lângă `for`, ai `while`, cât timp o condiție rămâne adevărată. `while` verifică condiția înainte de fiecare iterație și se oprește când devine falsă. `break` iese din buclă, `continue` sare peste iterația curentă și trece direct la următoarea. În exemplu, `i` e indexul elementului verificat: pornește de la 0 și crește cu 1 la fiecare pas, cât timp e mai mic decât `len(scoruri)`.

```
scoruri = [0.71, 0.42, 0.83, 0.97, 0.79]
i = 0
while i < len(scoruri):
    if scoruri[i] < 0.5:
        i += 1
        continue
    if scoruri[i] > 0.95:
        break
    print(scoruri[i])
    i += 1
# afișează:
# 0.71
# 0.83
```

Pas cu pas: 0.71 se afișează. 0.42 e sub 0.5, așa că `continue` trece la următorul element fără să-l afișeze. 0.83 se afișează. La 0.97, `break` oprește bucla de tot, deci 0.79 nu mai e verificat deloc. `i += 1` dinainte de `continue` contează: fără el, `i` ar rămâne pe loc și bucla s-ar învârti la nesfârșit. Dacă ți se întâmplă, oprești celula cu butonul ■ din bara de sus a notebook-ului.

Sortarea se face cu `sorted()` sau `.sort()`, iar `key` îți spune după ce sortezi. `sorted(lista)` îți dă o listă nouă, sortată, și o lasă pe cea veche neschimbată. `lista.sort()` sortează chiar lista, pe loc, fără să facă una nouă.

```
print(sorted([3, 1, 2]))   # [1, 2, 3]

elevi = [("Ana", 9.2), ("Bogdan", 8.7), ("Cris", 9.5)]
elevi.sort(key=lambda x: x[1], reverse=True)
print(elevi)   # [('Cris', 9.5), ('Ana', 9.2), ('Bogdan', 8.7)]
```

Fiecare elev e un tuple (nume, notă). `key=lambda x: x[1]` îi spune lui `sort` să compare elevii după `x[1]`, elementul de pe poziția 1, adică nota. `lambda x: x[1]` e o funcție scurtă, scrisă pe un rând, care primește un elev `x` și întoarce nota lui; o explicăm la Funcții. `reverse=True` inversează ordinea, ca notele mari să vină primele. Argumentele scrise cu nume, ca `key=...` sau `reverse=True`, se numesc argumente numite. Python afișează textele cu apostrofuri (`'Cris'`), dar e același lucru ca `"Cris"`.

## Comprehensions (liste construite pe un rând)
Un mod scurt de a construi o structură dintr-alta. Apare des în codul de concurs, așa că merită citit fluent chiar dacă la început scrii bucle obișnuite. Exemplul de mai jos face aceeași listă de pătrate în ambele feluri. `range(5)` îți dă pe rând numerele 0, 1, 2, 3, 4: de la 0 până la 5, fără 5, ca la felii.

```
# cu o buclă obișnuită
patrate = []
for x in range(5):
    patrate.append(x * x)
print(patrate)   # [0, 1, 4, 9, 16]

# la fel, cu o list comprehension
patrate = [x * x for x in range(5)]
print(patrate)   # [0, 1, 4, 9, 16]

scoruri = [0.71, 0.83, 0.79, 0.88]
bune = [s for s in scoruri if s > 0.8]
print(bune)      # [0.83, 0.88], doar cele peste 0.8
```

Se citește așa: „ia fiecare x din range, păstrează-l dacă trece condiția (`if`, când există), pune x*x în listă”. Merge la fel pentru dicționare și mulțimi. `range(n)` nu creează efectiv o listă de n numere, generează valorile pe rând: ține minte doar unde a ajuns și calculează următorul număr abia când îi e cerut. Deci `range(10_000_000)` nu ocupă memorie pentru zece milioane de numere. Liniuțele jos din `10_000_000` doar te ajută să numeri cifrele, ca spațiile din 10 000 000. O listă cu zece milioane de numere ar ocupa câteva sute de MB, pe când `range` ocupă aproape nimic.

```
lungimi = {c: len(c) for c in ["rf", "xgboost"]}
print(lungimi)      # {'rf': 2, 'xgboost': 7}
unice_lung = {len(c) for c in ["rf", "svm", "cnn"]}
print(unice_lung)   # {2, 3}
```

Prima linie face un dicționar, cu `cheie: valoare` între acolade, iar a treia o mulțime, doar cu valoarea. `len` numără și caracterele unui string: `len("rf")` e 2. `rf`, `xgboost`, `svm` și `cnn` sunt nume scurte de modele, pe care le înveți mai târziu. În mulțime, 3 apare o singură dată, deși `"svm"` și `"cnn"` au amândouă trei litere.

O expresie generator arată la fel ca o list comprehension, dar cu paranteze rotunde. Nu construiește toată structura în memorie dintr-o dată, ci produce valorile pe rând, ceea ce contează pe sume sau bucle mari. `sum(...)` adună toate valorile primite, iar parantezele lui `sum` țin loc și de parantezele generatorului.

```
suma = sum(x * x for x in range(1_000_000))
print(suma)   # 333332833333500000
```

## Funcții
O funcție grupează cod pe care îl repeți. Ai folosit deja funcții gata făcute, ca `print`, `len` sau `max`. Acum îți scrii una: îi dai un nume o dată, apoi o apelezi ori de câte ori ai nevoie.

```
def dublu(x):
    return x * 2

print(dublu(5))    # 10
print(dublu(21))   # 42
```

`def` (de la define, „a defini”) începe definiția: numele funcției, apoi, între paranteze, parametrii, adică numele sub care funcția primește valori. Aici e unul singur, `x`. Corpul funcției e blocul indentat de dedesubt, iar `return` trimite rezultatul înapoi celui care a apelat funcția. La `dublu(5)`, Python pune argumentul 5 în `x`, calculează 5 * 2 și îți dă înapoi 10, pe care `print` îl afișează. Definiția singură nu afișează nimic: funcția rulează abia când o apelezi.

Argumentele pot avea valori implicite, iar cele implicite se pun întotdeauna la final, după celelalte. O valoare implicită se scrie în `def`, cu `=`, și e folosită când nu dai argumentul respectiv la apel. Funcția de mai jos aduce numerele unei liste între `minim` și `maxim`, implicit între 0 și 1, ceva ce vei face des începând cu Lecția 5.

```
def normalizeaza(v, minim=0.0, maxim=1.0):
    lo, hi = min(v), max(v)
    if hi == lo:
        return [minim] * len(v)
    return [minim + (x - lo) / (hi - lo) * (maxim - minim) for x in v]

print(normalizeaza([2, 4, 6]))             # [0.0, 0.5, 1.0]
print(normalizeaza([2, 4, 6], maxim=10))   # [0.0, 5.0, 10.0]
```

Pas cu pas, pentru `[2, 4, 6]`: `lo` e 2 (cel mai mic) și `hi` e 6 (cel mai mare), deci `hi - lo` e 4. Pentru fiecare `x`, formula calculează `(x - lo) / (hi - lo)`: pentru 2 iese 0 / 4 = 0.0, pentru 4 iese 2 / 4 = 0.5, pentru 6 iese 4 / 4 = 1.0. Cu `minim` 0 și `maxim` 1, rezultatul e chiar fracția, iar în al doilea apel `maxim=10` o înmulțește cu 10. `if`-ul evită împărțirea la zero când toate numerele sunt egale: atunci `return` întoarce `[minim] * len(v)`, adică `minim` repetat de `len(v)` ori, și oprește funcția pe loc.

Despachetarea îți lasă să atribui mai multe valori odată. Când o funcție scrie `return min(v), max(v)`, întoarce un tuple cu două valori, iar `mic, mare = ...` îl despachetează: prima valoare ajunge în `mic`, a doua în `mare`. O vei vedea constant la împărțirea datelor.

```
a, b = 1, 2

def min_si_max(v):
    return min(v), max(v)

mic, mare = min_si_max([4, 1, 7])
print(mic, mare)   # 1 7

# în Lecția 6: X_tr, X_val, y_tr, y_val = train_test_split(X, y)
```

În Lecția 6, `train_test_split` împarte datele în patru bucăți, pe care le primești dintr-odată în patru variabile. `X` sunt trăsăturile (coloanele de intrare), `y` e ținta, ca în Lecția 2, iar `tr` și `val` vin de la antrenare și validare.

Valorile implicite au o capcană. Funcția de mai jos ar trebui să pornească de fiecare dată de la o listă goală:

```
def adauga(x, lista=[]):
    lista.append(x)
    return lista

print(adauga(1))   # [1]
print(adauga(2))   # [1, 2], nu [2]
```

> [!NOTE]
> Nu pune niciodată o listă sau un dicționar ca valoare implicită a unui argument. Se creează o singură dată, la definirea funcției, și rămâne comună între apeluri: de aceea al doilea apel a găsit în listă 1-ul pus de primul. Folosește `None` și creează valoarea înăuntru: `def adauga(x, lista=None):`, iar în corp `if lista is None: lista = []`.

O variabilă creată într-o funcție există doar acolo, e locală: dispare când funcția se termină. Variabilele create în afara oricărei funcții se numesc globale. Funcția vede variabilele globale, dar nu le poate modifica fără cuvântul cheie `global` (un cuvânt cu sens special în Python, ca `if` sau `def`). Nevoia de `global` e de obicei semn că funcția ar trebui rescrisă să primească și să întoarcă valori, nu să atingă starea din afară.

```
contor = 0

def increment_gresit():
    contor = contor + 1   # eroare la apel, vezi mai jos

def increment():
    global contor
    contor += 1   # merge, dar evită tiparul ăsta când poți

increment()
increment()
print(contor)   # 2
```

Dacă apelezi `increment_gresit()`, primești `UnboundLocalError`. Pentru că funcția atribuie ceva lui `contor`, Python îl consideră o variabilă locală nouă, iar la `contor + 1` aceasta nu are încă nicio valoare. Pe `global` îl folosești rar, când chiar vrei ca o funcție să schimbe ceva din afara ei, ca un contor al apelurilor.

Uneori nu știi dinainte câte argumente primești. `*args` adună argumentele poziționale într-un tuple, `**kwargs` pe cele numite într-un dicționar. Poziționale sunt cele date doar prin valoare, în ordine, ca 0.8 și 0.9 de mai jos, iar numite sunt cele date cu nume, ca `model="rf"`. Contează steluțele: `args` și `kwargs` sunt doar numele obișnuite, iar mai jos le-am zis `scoruri` și `info`. Așa e făcut și `print`, care primește oricâte valori.

```
def raport(*scoruri, **info):
    print("scoruri:", scoruri)
    print("info:", info)

raport(0.8, 0.9, model="rf", seed=42)
# afișează:
# scoruri: (0.8, 0.9)
# info: {'model': 'rf', 'seed': 42}
```

O `lambda` e o funcție mică, fără nume, scrisă pe o linie. O vezi des ca argument pentru `sorted`, `map` sau `filter`. `lambda x: x * 2` face exact ce face `dublu` de mai sus: primește `x` și întoarce `x * 2`, fără `def` și fără `return`. O folosești când îți trebuie o funcție mică o singură dată, ca argument pentru alta, cum ai văzut la `sort(key=...)`.

```
dublu = lambda x: x * 2
print(dublu(5))     # 10

scoruri = [0.71, 0.83, 0.79, 0.88]
print(list(map(lambda x: x * x, [1, 2, 3])))      # [1, 4, 9]
print(list(filter(lambda x: x > 0.8, scoruri)))   # [0.83, 0.88]
```

`map(f, lista)` aplică funcția `f` pe fiecare element. `filter(f, lista)` păstrează doar elementele pentru care `f` dă `True`. Amândouă dau rezultatele pe rând, ca `range`, așa că le pui în `list(...)` ca să vezi toată lista.

În practică, o comprehension face de multe ori treaba mai clar decât `map`/`filter`: `[x * x for x in [1, 2, 3]]` dă tot `[1, 4, 9]`. Le folosești mai ales când funcția vine deja definită de altundeva.

O funcție se poate apela pe ea însăși, recursiv. Rar necesar în codul de zi cu zi de AI, dar util să-l recunoști: are mereu un caz de bază care oprește recursivitatea. Exemplul calculează factorialul: factorialul lui 5 e 5 · 4 · 3 · 2 · 1 = 120, adică 5 înmulțit cu factorialul lui 4.

```
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))   # 120
```

`factorial(5)` cere `5 * factorial(4)`, care cere `4 * factorial(3)`, și tot așa până la `factorial(1)`. Acolo e cazul de bază: `n <= 1` întoarce direct 1, fără alt apel. Apoi înmulțirile se fac la întoarcere: 1, 2, 6, 24, 120. Fără cazul de bază, funcția s-ar apela la nesfârșit. Îl recunoști la algoritmii de căutare din Lecția 11, ca backtracking-ul, care se scriu natural recursiv.

O funcție cu `yield` în loc de `return` e un generator: nu întoarce toate valorile dintr-o dată, ci una pe rând. La fiecare `yield`, funcția dă o valoare buclei `for` și se oprește în loc. Când bucla cere următoarea valoare, funcția continuă de unde a rămas. Îl folosești când ai multe valori și nu vrei să le ții pe toate în memorie deodată, ca la `range`.

```
def numere_pare(pana_la):
    for n in range(pana_la):
        if n % 2 == 0:   # restul la 2 e 0, deci n e par
            yield n

for n in numere_pare(10):
    print(n)
# afișează 0, 2, 4, 6, 8, fiecare pe rândul lui
```

## Clase și module
O clasă ține date și funcții la un loc. N-o să scrii multe, dar toate bibliotecile pe care le folosești sunt construite din clase, deci trebuie să înțelegi ce se întâmplă când scrii `model.fit(X, y)`. Așa antrenezi un model în lecțiile următoare: `fit` îl pune să învețe din trăsăturile `X` și răspunsurile `y`, iar `model.predict(...)` îi cere apoi predicții pentru date noi.

Aici, clasă înseamnă o construcție din Python, nu o categorie de la clasificare. O clasă e un șablon, ca formularul gol de înscriere la olimpiadă. Un obiect e un lucru făcut după șablon, ca un formular completat: are aceleași câmpuri, dar cu datele lui. Din aceeași clasă poți face oricâte obiecte. Ai mai întâlnit asta: `int` și `list` sunt clase, de aceea `type(n)` afișa `<class 'int'>`, iar fiecare listă pe care o creezi e un obiect al clasei `list`.

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

- `class Medie:` începe șablonul. Tot ce e indentat sub el ține de clasă.
- O metodă e o funcție scrisă în interiorul clasei, ca `fit` și `predict`. O apelezi cu punct, `m.predict(2)`, la fel ca `.append` la liste.
- `self` e obiectul însuși. Fiecare metodă îl primește primul, dar nu-l scrii tu la apel: la `m.predict(2)`, Python pune singur `m` în `self` și 2 în `n`.
- Un atribut e o variabilă păstrată în interiorul obiectului, scrisă cu `self.` în față, ca `self.valoare`. Rămâne acolo între apeluri, așa că `predict` vede ce a calculat `fit`.
- `__init__` rulează singur când creezi obiectul cu `Medie()` și îl pregătește: aici pornește atributul `valoare` cu `None`. Numele cu două liniuțe jos de fiecare parte sunt nume speciale, pe care Python le apelează singur.

Pas cu pas: `Medie()` creează obiectul și rulează `__init__`. `.fit([1, 2, 3])` calculează media, (1 + 2 + 3) / 3 = 2.0, și o păstrează în `self.valoare`. `return self` dă înapoi chiar obiectul, de aceea poți scrie `Medie().fit(...)` pe un rând și pui rezultatul în `m`. `m.predict(2)` întoarce `[self.valoare] * 2`, media repetată de două ori, câte o predicție pentru fiecare dintre două rânduri noi.

Asta e exact tiparul din scikit-learn: `fit` învață și reține, `predict` folosește ce a învățat. `Medie` e cel mai simplu model posibil: învață o singură valoare și o prezice pentru orice rând nou.

O clasă poate moșteni dintr-alta, cu `class Copil(Parinte):`, și `super()` apelează varianta din clasa de bază. Moștenirea înseamnă că noua clasă (copilul) primește tot ce are clasa de bază (părintele), atribute și metode, și adaugă sau schimbă doar ce e diferit. Vei vedea tiparul ăsta constant mai târziu, la rețele neuronale în PyTorch (Lecția 14), unde orice model e o clasă care moștenește din `nn.Module`.

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

`ModelCuSeed("rf", 42)` rulează `__init__`-ul copilului. Acolo, `super().__init__(nume)` rulează întâi `__init__`-ul părintelui, care pune `self.nume = "rf"`, apoi copilul adaugă `self.seed = 42`. Seed-ul e un număr de pornire pentru valorile la întâmplare, îl vezi la finalul lecției. Copilul își scrie și propria `descrie`, care o înlocuiește pe a părintelui, dar o folosește prin `super().descrie()`: ia textul `"model rf"` și îi adaugă `", seed 42"`.

Codul altcuiva se aduce cu `import`. Un modul e un fișier cu cod Python gata scris, funcții și clase, pe care îl aduci în programul tău. Python vine cu multe module incluse: `math` are funcții de matematică, iar `collections` are structuri de date în plus. Bibliotecile din Lecția 1, ca NumPy sau Pandas, sunt făcute tot din module, doar că pe ele le instalezi cu pip.

```
import math
from collections import Counter

print(math.sqrt(16))               # 4.0
print(Counter(["a", "b", "a"]))    # Counter({'a': 2, 'b': 1})
```

`import math` aduce tot modulul, iar funcțiile lui le apelezi cu numele modulului în față: `math.sqrt(16)` e radical din 16. `from collections import Counter` aduce doar `Counter`, pe care îl folosești fără prefix. `Counter` numără de câte ori apare fiecare valoare: `'a'` de două ori, `'b'` o dată.

## Erori și excepții
Codul care citește fișiere, parsează date (transformă text în valori, de exemplu `"12"` în numărul 12) sau primește date scrise de un om dă erori, garantat. Python le numește excepții, și le prinzi cu `try`/`except` ca să nu-ți pice tot programul pentru o singură linie proastă.

```
def imparte(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        print("nu poți împărți la zero")
        return None

print(imparte(10, 2))   # 5.0
print(imparte(10, 0))   # nu poți împărți la zero, apoi None
```

`try` (încearcă) rulează blocul de sub el. Dacă apare o eroare de tipul scris la `except`, aici `ZeroDivisionError` (împărțire la zero), Python nu oprește programul: sare în blocul de sub `except` și continuă de acolo.

Cele mai dese excepții la concurs: `ValueError` (o conversie eșuată, gen `int("abc")`), `KeyError` (o cheie care nu există într-un dicționar), `IndexError` (un indice în afara listei), `FileNotFoundError` (o cale greșită la date, adică fișierul nu e unde i-ai spus lui Python să-l caute). O eroare pe care n-o prinzi cu `try` oprește celula și afișează un mesaj ca acesta:

```
note = {"Ana": 9}
print(note["Radu"])

# sub celulă apare:
# ---------------------------------------------------------------------------
# KeyError                                  Traceback (most recent call last)
# Cell In[1], line 2
#       1 note = {"Ana": 9}
# ----> 2 print(note["Radu"])
#
# KeyError: 'Radu'
```

Când apare una, citește mesajul de jos în sus: ultima linie îți spune tipul erorii și motivul, iar mai sus săgeata arată linia de cod care a picat. Aici, `KeyError: 'Radu'` înseamnă că dicționarul nu are cheia `'Radu'`, iar `---->` arată linia 2 din celulă. Când eroarea apare în interiorul unei funcții, mesajul are mai multe bucăți ca asta, una sub alta, iar cea de jos arată locul exact unde a apărut.

> [!NOTE]
> Nu prinde excepții cu `except:` gol, fără niciun tip după el. Ascunde orice greșeală, inclusiv pe cele pe care ar trebui să le vezi. Prinde exact tipul pe care îl aștepți, de exemplu `except ValueError:`.

`finally` rulează mereu, cu sau fără excepție, bun pentru curățenie, de exemplu ca să închizi ceva deschis sau să anunți că s-a terminat o etapă. `assert` verifică rapid o presupunere și oprește programul cu un mesaj clar dacă nu e adevărată, util să prinzi bug-uri (greșeli în cod) devreme, nu la finalul rulării.

```
try:
    n = int("abc")
except ValueError:
    print("nu e un număr")
finally:
    print("verificare terminată")   # rulează oricum

X = [[1, 2], [3, 4], [5, 6]]   # trei rânduri de date
y = [0, 1]                     # doar două răspunsuri
assert len(X) == len(y), "X și y trebuie să aibă aceeași lungime"
# AssertionError: X și y trebuie să aibă aceeași lungime
```

`X` și `y` sunt numele obișnuite pentru trăsături (aici o listă de rânduri, fiecare rând fiind o listă de două numere) și pentru țintă (câte un răspuns pe rând). Lipsește un răspuns, așa că `assert` oprește celula cu mesajul tău. Cu trei valori în `y`, linia ar trece fără să afișeze nimic.

## Text și expresii regulate
Multe probleme, mai ales la NLP (prelucrarea textului scris de oameni, în Lecția 12), cer curățat text înainte să faci orice altceva. String-urile au metode gata făcute pentru asta.

```
s = "  Al Doilea RĂZBOI Mondial  "
print(s.strip())          # scoate spațiile de la capete
print(s.lower())          # litere mici
print(s.split())          # ['Al', 'Doilea', 'RĂZBOI', 'Mondial']
print("-".join(["a", "b", "c"]))       # a-b-c
print(s.replace("RĂZBOI", "razboi"))   # Al Doilea razboi Mondial
```

`.split()` taie textul la spații și îți dă lista cuvintelor. `"-".join(lista)` face invers: lipește elementele unei liste de string-uri, cu `"-"` între ele. `.replace(vechi, nou)` înlocuiește peste tot textul `vechi` cu `nou`. Niciuna nu schimbă `s`, pentru că string-urile sunt imutabile: fiecare îți dă un string nou.

Pentru tipare mai complicate decât `.replace()`, modulul `re` face potriviri după expresii regulate. O expresie regulată (regex) e un tipar care descrie ce fel de text cauți, de exemplu „un șir de cifre”, în loc de un text exact.

```
import re

text = "contact: ana@exemplu.ro sau 0722 123 456"
emailuri = re.findall(r"[\w.]+@[\w.]+", text)
print(emailuri)    # ['ana@exemplu.ro']

curatat = re.sub(r"\d+", "", text)   # scoate toate cifrele
print(curatat)     # contact: ana@exemplu.ro sau
```

- `r"..."`: un string brut (raw), în care Python lasă backslash-ul `\` neschimbat, ca să ajungă așa la `re`. Tiparele le scrii mereu așa.
- `\d`: o cifră, de la 0 la 9.
- `\w`: o literă, o cifră sau `_`, adică un caracter care poate face parte dintr-un cuvânt.
- `+`: „unul sau mai multe” din ce e imediat în stânga, deci `\d+` e un șir de cifre lipite, ca `0722`.
- `[...]`: oricare dintre caracterele din paranteze, deci `[\w.]` e o literă, o cifră, `_` sau un punct.

Pus cap la cap, `[\w.]+@[\w.]+` înseamnă „litere, cifre sau puncte, apoi @, apoi iar litere, cifre sau puncte”, adică forma unei adrese de email. `re.findall(tipar, text)` îți dă lista tuturor potrivirilor, iar `re.sub(tipar, nou, text)` le înlocuiește cu `nou`, aici cu nimic.

> [!NOTE]
> `re` merită învățat treptat, nu dintr-o dată. La început ține minte doar `findall` (găsește toate potrivirile) și `sub` (înlocuiește), și cauți restul când ai nevoie de el.

## Fișiere și formate de date
Citirea și scrierea unui fișier text se fac cu `with`, care îl închide singur chiar dacă apare o eroare. Contează, pentru că ce scrii ajunge sigur în fișier abia când îl închizi.

```
with open("note.txt", "w", encoding="utf-8") as f:
    f.write("prima linie\n")

with open("note.txt", encoding="utf-8") as f:
    for linie in f:
        print(linie.strip())   # prima linie
```

`open("note.txt", "w", ...)` deschide fișierul pentru scriere: `"w"` (de la write) îl creează dacă nu există și îi șterge tot conținutul dacă există. `as f` îi dă fișierului deschis numele `f`, iar `f.write(...)` scrie text în el; `\n` încheie rândul. Fără al doilea argument, `open` deschide fișierul doar pentru citire. `for linie in f` îl parcurge rând cu rând, iar `.strip()` scoate `\n`-ul de la capătul fiecărui rând. Fișierul apare în același folder cu notebook-ul.

Pune întotdeauna `encoding="utf-8"`. Fără el, pe Windows, diacriticele se citesc greșit. Encoding-ul e regula după care literele sunt salvate ca numere în fișier, iar UTF-8 e regula standard, care cunoaște și diacriticele.

Datele de concurs vin rar ca text simplu. De obicei sunt CSV sau JSON, și Python are module standard pentru amândouă, chiar înainte să ajungi la Pandas. Un fișier CSV e un tabel scris ca text: primul rând are numele coloanelor, iar fiecare rând următor e un rând din tabel, cu valorile despărțite prin virgule. Codul de mai jos scrie întâi un CSV de trei rânduri, ca să ai ce citi.

```
import csv

with open("scoruri.csv", "w", encoding="utf-8") as f:
    f.write("nume,scor\n")
    f.write("Ana,0.91\n")
    f.write("Bogdan,0.78\n")

with open("scoruri.csv", encoding="utf-8") as f:
    cititor = csv.DictReader(f)
    for rand in cititor:
        print(rand["nume"], rand["scor"])
# afișează:
# Ana 0.91
# Bogdan 0.78
```

`csv.DictReader` citește fiecare rând ca un dicționar: numele coloanei e cheia, iar ce scrie în tabel e valoarea. Valorile citite sunt text: `rand["scor"]` e `"0.91"`, deci ca să calculezi cu el scrii `float(rand["scor"])`.

JSON e un format de text care arată aproape la fel ca un dicționar din Python. Codul de mai jos salvează dicționarul `date` în `rezultat.json`, unde apare ca textul `{"model": "rf", "scor": 0.87}`, apoi îl citește înapoi. `json.dump(date, f)` scrie, iar `json.load(f)` citește și îți dă din nou un dicționar.

```
import json

date = {"model": "rf", "scor": 0.87}
with open("rezultat.json", "w", encoding="utf-8") as f:
    json.dump(date, f)

with open("rezultat.json", encoding="utf-8") as f:
    incarcat = json.load(f)
print(incarcat["scor"])   # 0.87
```

Pentru căi de fișiere, `pathlib` e mai clar decât să lipești string-uri cu `+`. Calea unui fișier e adresa lui pe calculator: folderele în care stă, apoi numele lui, deci `date/train.csv` e fișierul `train.csv` din folderul `date`. Cu `Path`, semnul `/` nu împarte: lipește un folder de un nume de fișier, cu separatorul potrivit sistemului, `/` pe macOS și Linux, `\` pe Windows.

```
from pathlib import Path

folder = Path("date")
fisier = folder / "train.csv"
print(fisier)            # date/train.csv (pe Windows, date\train.csv)
print(fisier.exists())   # False, dacă n-ai un folder date cu train.csv
```

## Random și reproductibilitate
Multe lucruri în AI par întâmplătoare: împărțirea datelor, inițializarea unui model (numerele de la care pornește, înainte să învețe), amestecarea setului de antrenare. Modulul `random` controlează asta, iar `seed`-ul face rezultatele repetabile.

Calculatorul nu dă cu zarul de-adevăratelea. Numerele „la întâmplare” vin de la un generator de numere aleatoare, o formulă care pornește de la un număr de start și calculează din el un șir care doar pare întâmplător. Numărul de start e seed-ul (în engleză, „sămânță”). Același seed dă de fiecare dată exact același șir de numere.

```
import random

random.seed(42)
print(random.random())        # 0.6394267984578837, mereu la fel cu seed 42
print(random.randint(1, 10))  # 1
scoruri = [0.71, 0.83, 0.79, 0.88]
random.shuffle(scoruri)       # amestecă lista pe loc
print(scoruri)                # [0.83, 0.88, 0.71, 0.79]
```

`random.random()` dă un număr cu zecimale între 0 și 1. `random.randint(1, 10)` dă un întreg de la 1 la 10, cu tot cu 10, spre deosebire de `range`. `random.shuffle(lista)` amestecă lista pe loc, adică schimbă chiar lista, fără să facă alta nouă. Rulează celula de mai multe ori: datorită lui `random.seed(42)`, vezi de fiecare dată aceleași rezultate. 42 e doar un obicei, orice număr merge.

> [!NOTE]
> Pune `random.seed(...)` la începutul scriptului (al programului sau al notebook-ului), o singură dată. Fără el, rulezi codul de două ori și iei rezultate diferite, ceea ce face imposibil să compari corect două idei: nu mai știi dacă scorul a crescut datorită ideii sau din noroc.

`random.seed` controlează doar modulul `random`. NumPy (Lecția 4) are generatorul lui, pe care îl fixezi cu `np.random.seed(42)`, iar funcțiile și modelele din scikit-learn primesc `random_state=42`, cum o să vezi la împărțirea datelor, în Lecția 6.

# @practice
- [Kaggle Learn: Python](https://www.kaggle.com/learn/python)
