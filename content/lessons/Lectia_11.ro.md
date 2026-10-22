---
code: S15
duration: ~2 săptămâni
---

# @intro
Partea asta de AI nu are date de antrenare. Ai o stare de start, un scop, și niște mutări permise. Întrebarea e cum ajungi la scop eficient. E algoritmică, aproape ca la informatică, și apare în probleme de tip puzzle, planificare și jocuri. O rezolvi cu structuri de date, nu cu modele.

## Spațiul stărilor: limbajul comun
Ia un labirint mic, de 3 pe 3 căsuțe. S e startul, G e scopul (de la goal), # e un zid, iar punctul e o căsuță liberă. Te poți muta câte o căsuță în sus, în jos, la stânga sau la dreapta, dar nu prin ziduri.

```
S . #
. # .
. . G
```

Fiecare căsuță are coordonatele (rând, coloană), numărate de la 0, ca indicii din Python. S e la (0, 0), zidurile sunt la (0, 2) și (1, 1), iar G e la (2, 2). Căsuța în care ești acum e starea ta: o stare e tot ce trebuie să știi despre situație ca să poți continua de acolo.

Orice problemă de căutare se descrie la fel: o stare de start, un set de acțiuni care duc dintr-o stare în alta, un test de scop care spune dacă ai ajuns, și opțional un cost pe fiecare mutare. Un labirint: starea e poziția, acțiunile sunt pașii în cele patru direcții, scopul e ieșirea. În labirintul nostru, testul de scop e întrebarea „sunt pe G?”, iar fiecare pas costă 1.

Toate stările la care poți ajunge formează un graf, unde nodurile sunt stări și muchiile sunt mutări. Un graf e un set de puncte, numite noduri, legate prin linii, numite muchii. Harta metroului e un graf: stațiile sunt nodurile, iar bucățile de linie dintre două stații vecine sunt muchiile.

În labirint, nodurile sunt cele 7 căsuțe libere. O muchie leagă două căsuțe libere vecine: S cu (0, 1), S cu (1, 0), (1, 0) cu (2, 0), (2, 0) cu (2, 1), (2, 1) cu G și (1, 2) cu G.

Căutarea înseamnă să explorezi graful ăsta inteligent, fără să-l construiești tot, pentru că de obicei e uriaș. Labirintul nostru are 7 stări, dar un cub Rubik are peste 43 de miliarde de miliarde.

> [!NOTE]
> Marchează mereu stările vizitate. Fără asta te învârți în cerc la infinit, revizitând aceleași stări. În labirint, din S mergi la (1, 0), din (1, 0) o mutare te duce înapoi în S, de acolo iar la (1, 0), și tot așa. E cea mai frecventă cauză a unei căutări care nu se termină.

## Căutare neinformată: BFS, DFS, cost uniform
Căutarea neinformată explorează orbește, fără să știe încotro e scopul. Algoritmii de mai jos diferă prin ordinea în care aleg următoarea stare de explorat, iar ordinea vine din structura în care țin stările care își așteaptă rândul.

Prima structură e coada (queue), ca la cantină: cine a venit primul e servit primul. Adaugi la capătul din spate și scoți din față.

BFS (căutare în lățime, de la breadth-first search) explorează nivel cu nivel, folosind o coadă. Întâi toate stările aflate la un pas de start, apoi toate cele aflate la doi pași, și tot așa. Găsește mereu drumul cu cele mai puține mutări, dar consumă multă memorie: un nivel întreg stă în coadă deodată. Dacă fiecare stare are 3 mutări noi, la nivelul 10 pot aștepta 3^10 = 59 049 de stări.

Pe labirint, BFS pornește cu S în coadă. Scoate S și pune în coadă vecinii lui liberi, (1, 0) și (0, 1). Pasul ăsta se numește extinderea unei stări: o scoți din coadă și îi adaugi vecinii nevizitați. Urmează (1, 0), care adaugă (2, 0). Apoi (0, 1), o fundătură care nu adaugă nimic. Apoi (2, 0) adaugă (2, 1), iar (2, 1) adaugă G. Când G iese din coadă, ai terminat.

Ca să afli drumul, fiecare căsuță reține din ce căsuță ai ajuns în ea, adică părintele ei. Pornești de la G și mergi din părinte în părinte: G, (2, 1), (2, 0), (1, 0), S. Întors, ăsta e drumul de 4 pași. E cel mai scurt posibil: BFS termină toate căsuțele aflate la 1 pas înainte să treacă la cele de la 2 pași, deci prima dată când ajunge la G, a ajuns pe cel mai scurt drum.

În Python, coada se face cu `deque` din modulul `collections`, de unde ai importat `Counter` în Lecția 3. `append` adaugă la spate, iar `popleft` scoate din față. Merge și o listă obișnuită, dar `lista.pop(0)` mută toate celelalte elemente cu o poziție, deci e lentă pe liste lungi.

```
from collections import deque

labirint = ["S.#",
            ".#.",
            "..G"]
randuri, coloane = len(labirint), len(labirint[0])

def vecini(poz):
    r, c = poz
    rez = []
    # sus, jos, stânga, dreapta
    for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
        nr, nc = r + dr, c + dc
        in_grila = 0 <= nr < randuri and 0 <= nc < coloane
        if in_grila and labirint[nr][nc] != "#":
            rez.append((nr, nc))
    return rez

def bfs(start, scop):
    coada = deque([start])
    parinte = {start: None}       # de unde ai venit; ține și vizitatele
    while coada:
        poz = coada.popleft()     # scoți din față
        if poz == scop:
            break
        for v in vecini(poz):
            if v not in parinte:  # încă nevizitat
                parinte[v] = poz
                coada.append(v)   # pui la spate
    if scop not in parinte:
        return None               # nu există drum
    drum = []
    poz = scop
    while poz is not None:        # înapoi, din părinte în părinte
        drum.append(poz)
        poz = parinte[poz]
    return drum[::-1]             # întors: de la start la scop

print(bfs((0, 0), (2, 2)))
# [(0, 0), (1, 0), (2, 0), (2, 1), (2, 2)]
```

Intră labirintul, ca listă de string-uri, plus startul și scopul; iese drumul, ca listă de coordonate. `randuri` și `coloane` se calculează din labirint, așa că același cod merge pe orice grilă dreptunghiulară. `vecini` încearcă cele patru direcții și păstrează doar căsuțele din grilă care nu sunt ziduri.

Fiecare pereche (dr, dc) spune cu cât se schimbă rândul și coloana: (-1, 0) e un rând mai sus, (0, 1) o coloană la dreapta. `0 <= nr < randuri` verifică dintr-o dată două lucruri: că rândul e cel puțin 0 și că e mai mic decât numărul de rânduri. `labirint[nr][nc]` alege întâi string-ul rândului nr, apoi caracterul de pe poziția nc din el.

Dicționarul `parinte` face două treburi: ține părintele fiecărei căsuțe, iar cheile lui sunt căsuțele vizitate, deci `v not in parinte` înseamnă „încă nevizitată”. `while coada:` merge cât timp coada nu e goală, pentru că o coadă goală e falsă, ca o listă goală (Lecția 3). `drum[::-1]` întoarce lista invers: e felia `[::2]` din Lecția 3, cu pasul -1.

A doua structură e stiva (stack), ca un teanc de farfurii: pui deasupra și iei tot de deasupra, deci ultima pusă e prima luată.

DFS (căutare în adâncime, de la depth-first search) merge cât poate pe un drum, cu o stivă. Consumă puțină memorie, dar poate să nu găsească cel mai scurt drum și se poate pierde adânc. Memoria e mică pentru că ține doar drumul pe care merge acum și vecinii lăsați pe mai târziu de-a lungul lui, nu un nivel întreg. Ca să-l vezi la lucru, scrie în codul de mai sus `coada.pop()` în loc de `coada.popleft()`: scoți mereu ultima stare pusă, deci deque-ul se poartă ca o stivă.

Pe labirint, după S iese întâi (0, 1), pentru că a fost pusă ultima, și abia după fundătură vine rândul lui (1, 0). Aici există un singur drum, deci DFS îl găsește tot pe el. Pe o grilă goală de 5 pe 5, de la un colț la cel opus, aceeași variantă întoarce un drum șerpuit de 16 pași, deși cel mai scurt are 8.

Cost uniform (Dijkstra) e ca BFS, dar ține cont de costul mutărilor: extinde mereu starea cu costul total cel mai mic până la ea. Când mutările au costuri diferite, el găsește drumul cel mai ieftin, nu cel mai scurt ca număr de pași.

Un exemplu cu costuri: patru orașe, A, B, C și D, legate prin drumuri cu sens unic, ca exemplul să rămână scurt. Fiecare drum are un cost în minute: de la A la B 1, de la A la C 4, de la B la C 2, de la B la D 5 și de la C la D 1. Vrei să ajungi din A în D cât mai repede.

BFS caută drumul cu cele mai puține muchii, deci ar întoarce A, B, D (6 minute) sau A, C, D (5 minute). Cel mai rapid e însă A, B, C, D: 1 + 2 + 1 = 4 minute, deși are trei muchii.

Cost uniform folosește o coadă de priorități. Din ea nu iese cine a venit primul, ci elementul cu prioritatea cea mai bună, ca la urgențe, unde intră întâi cazul cel mai grav. Aici prioritatea e costul: iese mereu starea la care ai ajuns cel mai ieftin.

Pe orașe: pornești cu A, la costul 0. Extinzi A, iar B intră în coadă cu costul 1, C cu 4. Iese B (1), cel mai mic: C intră încă o dată, cu 1 + 2 = 3, și D cu 1 + 5 = 6. Iese C (3), iar D intră cu 3 + 1 = 4. Iese C (4), dar C a fost deja extins pe un drum mai ieftin, așa că îl sari. Iese D (4), scopul: drumul A, B, C, D, de 4 minute.

Te oprești când scopul iese din coadă, nu când intră. D a intrat prima dată cu costul 6, dar până să-i vină rândul a apărut varianta de 4.

În Python, coada de priorități e modulul `heapq`. `heapq.heappush(coada, x)` adaugă, iar `heapq.heappop(coada)` scoate cel mai mic element. Când elementele sunt tuple, le compară după primul număr, aici costul.

```
import heapq

drumuri = {"A": [("B", 1), ("C", 4)],
           "B": [("C", 2), ("D", 5)],
           "C": [("D", 1)],
           "D": []}

def cost_uniform(start, scop):
    coada = [(0, start, [start])]    # (cost până aici, oraș, drum)
    gata = set()                     # orașe deja extinse
    while coada:
        cost, oras, drum = heapq.heappop(coada)   # cel mai ieftin
        if oras == scop:
            return cost, drum
        if oras in gata:
            continue                 # am ajuns deja aici mai ieftin
        gata.add(oras)
        for vecin, c in drumuri[oras]:
            heapq.heappush(coada, (cost + c, vecin, drum + [vecin]))
    return None

print(cost_uniform("A", "D"))   # (4, ['A', 'B', 'C', 'D'])
```

`drumuri` spune, pentru fiecare oraș, unde poți merge și cu ce cost. În coadă stau tuple (cost, oraș, drum): cât te-a costat până acolo, orașul și drumul parcurs. Mulțimea `gata` ține orașele deja extinse, ca să sari peste a doua apariție a lui C. `drum + [vecin]` face o listă nouă, cu vecinul pus la capăt. Funcția întoarce costul minim și drumul.

- BFS: coadă, drum minim în număr de pași, memorie mare.
- DFS: stivă, memorie mică, nu garantează drumul minim.
- Cost uniform: coadă de priorități pe cost, drum de cost minim.

## A*: căutare informată cu euristică
A* (se citește „A star”) e vedeta modulului. Adaugă o euristică, adică o estimare a distanței rămase până la scop, ca să meargă direct spre țintă în loc să exploreze orbește. Combină costul deja plătit cu estimarea a ce mai are de plătit.

O euristică e o regulă rapidă de estimare. Pe o hartă, distanța în linie dreaptă până la oraș îți spune cam cât mai ai, deși încă nu știi pe ce drumuri vei merge.

> [!FORMULA]
> f(n) = g(n) + h(n)
> g(n) = costul real de la start până la starea n. h(n) = estimarea (euristica) de la n până la scop. A* extinde mereu starea cu f cel mai mic.

Pe grilă, o euristică naturală e distanța Manhattan: câte rânduri plus câte coloane te despart de scop, ca și cum n-ar exista ziduri. Între (r1, c1) și (r2, c2) e |r1 - r2| + |c1 - c2|, unde |x| e modulul, adică numărul fără semn. De la S = (0, 0) la G = (2, 2) iese |0 - 2| + |0 - 2| = 2 + 2 = 4. Numele vine de la străzile din Manhattan, așezate ca o grilă, unde nu poți tăia în diagonală printre clădiri.

A* pe labirint, unde fiecare pas costă 1: în S, g = 0 și h = 4, deci f = 4. Vecinul (1, 0) are g = 1 și h = |1 - 2| + |0 - 2| = 3, deci f = 4. Vecinul (0, 1) are g = 1 și h = |0 - 2| + |1 - 2| = 3, tot f = 4. Euristica nu vede zidurile, așa că fundătura (0, 1) i se pare la fel de bună.

Pe drumul bun, (2, 0) are g = 2 și h = 2, (2, 1) are g = 3 și h = 1, iar G are g = 4 și h = 0. f rămâne 4 tot drumul, pentru că aici euristica a ghicit exact cât mai era.

Pe o grilă fără ziduri se vede de ce A* merge țintit. Un pas spre scop crește g cu 1 și scade h cu 1, deci f rămâne la fel. Un pas în direcția greșită crește și g, și h cu câte 1, deci f crește cu 2. A* scoate mereu starea cu f cel mai mic, așa că pașii greșiți rămân la urmă și de multe ori nici nu mai sunt extinși.

Codul e cel de la cost uniform, cu o schimbare: în coadă pui tuple (g + h, g, nod, drum). Scoți după f = g + h, dar păstrezi g ca să calculezi costul vecinilor.

Ca A* să garanteze drumul optim, euristica trebuie să fie admisibilă: să nu supraestimeze niciodată distanța reală rămasă. Dacă h e admisibilă, A* nu poate rata soluția optimă. Dacă supraestimează, poate găsi un drum, dar nu neapărat cel mai scurt.

Manhattan e admisibilă în labirint: fiecare pas schimbă rândul sau coloana cu exact 1, deci îți trebuie cel puțin |r1 - r2| + |c1 - c2| pași, iar zidurile pot doar să lungească drumul.

Pe orașe se vede ce strică o supraestimare. Costul real rămas până la D e 4 din A, 3 din B și 1 din C. Euristica h(A) = 3, h(B) = 2, h(C) = 1, h(D) = 0 nu le depășește niciodată, iar A* găsește drumul A, B, C, D, de 4 minute. Acum schimbă doar h(C) în 10. După ce extinde A și B, cel mai bun C din coadă are f = 3 + 10 = 13, iar D are f = 6 + 0 = 6. Iese D, iar A* întoarce A, B, D, de 6 minute. Cu h(C) = 1, C ar fi avut f = 3 + 1 = 4, sub 6, și A* ar fi trecut prin el.

Un puzzle clasic e 8-puzzle-ul: o tablă de 3 pe 3 cu piesele de la 1 la 8 și un loc gol. La fiecare mutare împingi în locul gol o piesă vecină, iar scopul e să aranjezi piesele în ordine.

Euristici clasice pentru puzzle-uri: distanța Manhattan (suma diferențelor pe orizontală și verticală) și numărul de piese greșit plasate. Amândouă nu supraestimează niciodată, deci sunt admisibile.

La 8-puzzle, Manhattan adună, pentru fiecare piesă, câte rânduri și coloane o despart de locul ei. Nu poate supraestima, pentru că o mutare deplasează o singură piesă cu o singură căsuță. Nici numărul de piese greșit plasate nu poate, pentru că fiecare dintre ele are nevoie de cel puțin o mutare. Manhattan dă estimări mai mari, deci mai apropiate de costul real, așa că A* extinde de obicei mai puține stări cu ea.

## Jocuri: minimax și alpha-beta
La jocurile cu doi jucători pe rând (X și 0, șah simplificat), nu cauți un drum, cauți cea mai bună mutare presupunând că adversarul joacă cel mai bine împotriva ta. Asta face minimax: tu maximizezi scorul, adversarul îl minimizează, și analizezi arborele de mutări până la o adâncime.

Arborele de mutări pornește din poziția de acum. Din ea pleacă o ramură pentru fiecare mutare a ta, din fiecare poziție nouă câte o ramură pentru fiecare răspuns al adversarului, și tot așa. La capetele ramurilor, numite frunze, jocul s-a terminat și ai un scor: mare e bine pentru tine, mic e bine pentru adversar. Adâncimea e numărul de mutări la care te uiți înainte. Dacă jocul nu s-a terminat acolo, dai poziției un scor estimat, de exemplu la șah diferența de piese.

Un arbore mic: tu ai trei mutări, A, B și C, iar după fiecare adversarul are două răspunsuri. Jocul se termină cu scorul 3 sau 5 după A, cu 2 sau 9 după B și cu 1 sau 7 după C.

Minimax calculează de jos în sus. Adversarul alege minimul din fiecare ramură: după A îți lasă 3, după B 2, după C 1. Tu alegi maximul dintre aceste minime, adică 3, deci mutarea A. Dacă te luai după cel mai mare număr din arbore, alegeai B pentru 9, dar adversarul răspundea cu mutarea care îți dă 2.

Arborele crește exploziv: fiecare mutare deschide multe altele. La X și 0, prima mutare are 9 variante, a doua 8, a treia 7, deci după trei mutări ai deja 9 · 8 · 7 = 504 ramuri. La șah, cu vreo 30 de mutări posibile la fiecare pas, după patru mutări ai 30^4 = 810 000.

Alpha-beta pruning taie ramurile care oricum nu pot schimba rezultatul, fără să piardă corectitudinea (pruning înseamnă tăierea crengilor, ca la pomi). Cu el ajungi mai adânc în același timp de calcul.

Pe arborele de mai sus: după ce calculezi A, știi că poți obține cel puțin 3. La B, prima frunză e 2, deci adversarul te poate ține la 2 sau mai puțin, sub 3. B e sigur mai slab decât A, așa că nu mai citești frunza cu 9: oricât ar fi, adversarul n-o să te lase s-o iei. La C, prima frunză e 1 și tai la fel. Ai citit 4 frunze din 6 și ai ales aceeași mutare, A.

Numele vine de la cele două numere pe care le ține minte algoritmul: alpha, scorul pe care ți l-ai asigurat deja (aici 3), și beta, scorul pe care și l-a asigurat adversarul. Ordinea contează: dacă verificai întâi C, apoi B și A, nu tăiai nimic. De aceea programele de șah încearcă întâi mutările care par bune.

> [!NOTE]
> Alpha-beta dă exact același rezultat ca minimax, doar mai repede. Nu schimbă mutarea aleasă, doar sare peste ramuri pe care le-a demonstrat inutile.

## CSP: probleme cu constrângeri
Un CSP (problemă de satisfacere a constrângerilor) cere o atribuire de valori la niște variabile care respectă toate regulile. Colorarea unei hărți cu trei culori astfel încât vecinii să difere, Sudoku, orarul: toate sunt CSP.

Un CSP are variabile (ce trebuie să alegi), câte un domeniu pentru fiecare variabilă (valorile pe care le poate lua) și constrângeri (regulile). La Sudoku, variabilele sunt cele 81 de căsuțe, iar domeniul fiecăreia sunt cifrele de la 1 la 9. Constrângerile cer cifre diferite pe fiecare rând, pe fiecare coloană și în fiecare pătrat de 3 pe 3.

Ia patru regiuni de pe harta României: Transilvania, Moldova, Muntenia și Oltenia. Ele sunt variabilele, iar domeniul fiecăreia e {roșu, verde, albastru}. Constrângerea: două regiuni vecine au culori diferite. Transilvania se învecinează cu toate celelalte trei, Muntenia cu Moldova și cu Oltenia, iar Moldova și Oltenia nu se ating.

Le rezolvi cu backtracking: atribui o valoare, mergi mai departe, iar dacă te blochezi te întorci și încerci altceva.

Pe hartă, iei regiunile pe rând și încerci culorile în ordinea roșu, verde, albastru. Transilvania primește roșu. Moldova nu poate fi roșie, fiindcă e vecină cu Transilvania, deci primește verde. Muntenia se învecinează cu amândouă, așa că rămâne albastru. Oltenia nu poate fi roșie (Transilvania) sau albastră (Muntenia), deci primește verde. Moldova și Oltenia sunt amândouă verzi, dar nu se ating, deci e voie.

Întoarcerea se vede dacă încerci doar cu roșu și verde. Transilvania e roșie, Moldova verde, iar Muntenia, vecină cu amândouă, nu mai are nicio culoare. Te întorci la Moldova, dar nici ea nu are altă culoare liberă, așa că te întorci la Transilvania și o faci verde. Moldova devine roșie, iar Muntenia se blochează la fel. Concluzia: cu două culori nu există soluție, pentru că Transilvania, Moldova și Muntenia se ating toate trei între ele.

Fără îmbunătățiri, backtracking-ul e lent. Pe o hartă mare poți colora corect zeci de regiuni și să afli abia la final că o alegere de la început nu mergea. Două tehnici îl accelerează mult:

- Forward checking: după fiecare atribuire, elimini din vecini valorile care acum nu mai sunt posibile. Prinzi înfundările devreme.
- MRV (minimum remaining values): alegi mereu variabila cu cele mai puține valori rămase. Ataci întâi partea cea mai constrânsă, unde e mai probabil să dai de contradicție.

Forward checking pe hartă, cu trei culori: după Transilvania = roșu, scoți roșu din domeniile vecinilor, așa că Moldova, Muntenia și Oltenia rămân cu {verde, albastru}. După Moldova = verde, scoți verde de la Muntenia, care rămâne doar cu {albastru}. Cu două culori, același pas lăsa domeniul Munteniei gol imediat după ce colorai Moldova, deci știai pe loc că trebuie să te întorci.

MRV alege apoi Muntenia, cu o singură culoare rămasă, înaintea Olteniei, care mai are două. Muntenia ia albastru, Oltenia rămâne doar cu {verde}, și harta e gata fără nicio încercare greșită. La început toate regiunile au câte trei culori, deci poți porni cu oricare.

# @practice
- Implementează A* pentru 8-puzzle cu două euristici (Manhattan și piese greșit plasate) și compară numărul de stări extinse.
- Rezolvă o colorare de hartă ca CSP cu forward checking și MRV.
- Scrie minimax cu alpha-beta pentru X și 0 și verifică că nu pierde niciodată.
