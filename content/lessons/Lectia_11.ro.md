---
code: S15
duration: ~2 săptămâni
---

# @intro
Partea asta de AI nu are date de antrenare. Ai o stare de start, un scop, și niște mutări permise. Întrebarea e cum ajungi la scop eficient. E algoritmică, aproape ca la informatică, și apare în probleme de tip puzzle, planificare și jocuri. O rezolvi cu structuri de date, nu cu modele.

## Spațiul stărilor: limbajul comun
Orice problemă de căutare se descrie la fel: o stare de start, un set de acțiuni care duc dintr-o stare în alta, un test de scop care spune dacă ai ajuns, și opțional un cost pe fiecare mutare. Un labirint: starea e poziția, acțiunile sunt pașii în cele patru direcții, scopul e ieșirea.

Toate stările la care poți ajunge formează un graf, unde nodurile sunt stări și muchiile sunt mutări. Căutarea înseamnă să explorezi graful ăsta inteligent, fără să-l construiești tot, pentru că de obicei e uriaș.

> [!NOTE]
> Marchează mereu stările vizitate. Fără asta te învârți în cerc la infinit, revizitând aceleași stări. E cea mai frecventă cauză a unei căutări care nu se termină.

## Căutare neinformată: BFS, DFS, cost uniform
Căutarea neinformată explorează orbește, fără să știe încotro e scopul. BFS (căutare în lățime) explorează nivel cu nivel, folosind o coadă. Găsește mereu drumul cu cele mai puține mutări, dar consumă multă memorie. DFS (căutare în adâncime) merge cât poate pe un drum, cu o stivă. Consumă puțină memorie, dar poate să nu găsească cel mai scurt drum și se poate pierde adânc.

Cost uniform (Dijkstra) e ca BFS, dar ține cont de costul mutărilor: extinde mereu starea cu costul total cel mai mic până la ea. Când mutările au costuri diferite, el găsește drumul cel mai ieftin, nu cel mai scurt ca număr de pași.

- BFS: coadă, drum minim în număr de pași, memorie mare.
- DFS: stivă, memorie mică, nu garantează drumul minim.
- Cost uniform: coadă de priorități pe cost, drum de cost minim.

## A*: căutare informată cu euristică
A* e vedeta modulului. Adaugă o euristică, adică o estimare a distanței rămase până la scop, ca să meargă direct spre țintă în loc să exploreze orbește. Combină costul deja plătit cu estimarea a ce mai are de plătit.

> [!FORMULA]
> f(n) = g(n) + h(n)
> g(n) = costul real de la start până la starea n. h(n) = estimarea (euristica) de la n până la scop. A* extinde mereu starea cu f cel mai mic.

Ca A* să garanteze drumul optim, euristica trebuie să fie admisibilă: să nu supraestimeze niciodată distanța reală rămasă. Dacă h e admisibilă, A* nu poate rata soluția optimă. Dacă supraestimează, poate găsi un drum, dar nu neapărat cel mai scurt.

Euristici clasice pentru puzzle-uri: distanța Manhattan (suma diferențelor pe orizontală și verticală) și numărul de piese greșit plasate. Amândouă nu supraestimează niciodată, deci sunt admisibile.

## Jocuri: minimax și alpha-beta
La jocurile cu doi jucători pe rând (X și 0, șah simplificat), nu cauți un drum, cauți cea mai bună mutare presupunând că adversarul joacă cel mai bine împotriva ta. Asta face minimax: tu maximizezi scorul, adversarul îl minimizează, și analizezi arborele de mutări până la o adâncime.

Arborele crește exploziv: fiecare mutare deschide multe altele. Alpha-beta pruning taie ramurile care oricum nu pot schimba rezultatul, fără să piardă corectitudinea. Cu el ajungi mai adânc în același timp de calcul.

> [!NOTE]
> Alpha-beta dă exact același rezultat ca minimax, doar mai repede. Nu schimbă mutarea aleasă, doar sare peste ramuri pe care le-a demonstrat inutile.

## CSP: probleme cu constrângeri
Un CSP (problemă de satisfacere a constrângerilor) cere o atribuire de valori la niște variabile care respectă toate regulile. Colorarea unei hărți cu trei culori astfel încât vecinii să difere, Sudoku, orarul: toate sunt CSP.

Le rezolvi cu backtracking: atribui o valoare, mergi mai departe, iar dacă te blochezi te întorci și încerci altceva. Fără îmbunătățiri, e lent. Două tehnici îl accelerează mult:

- Forward checking: după fiecare atribuire, elimini din vecini valorile care acum nu mai sunt posibile. Prinzi înfundările devreme.
- MRV (minimum remaining values): alegi mereu variabila cu cele mai puține valori rămase. Ataci întâi partea cea mai constrânsă, unde e mai probabil să dai de contradicție.

# @takeaways
- Orice căutare se descrie la fel: start, acțiuni, test de scop, cost.
- BFS dă drum minim în pași, DFS economisește memorie, cost uniform dă drum de cost minim.
- A* folosește f = g + h; cu euristică admisibilă, găsește soluția optimă.
- Minimax alege mutarea împotriva unui adversar optim; alpha-beta o face mai repede fără să schimbe rezultatul.
- CSP se rezolvă cu backtracking plus forward checking și MRV.

# @pitfalls
- Folosește o euristică admisibilă la A*, ca soluția găsită să fie și optimă.
- Marchează stările vizitate, ca să nu intri în bucle infinite.
- Pune limită de adâncime la minimax pe jocuri mari.

# @practice
- Implementează A* pentru 8-puzzle cu două euristici (Manhattan și piese greșite) și compară numărul de stări extinse.
- Rezolvă o colorare de hartă ca CSP cu forward checking și MRV.
- Scrie minimax cu alpha-beta pentru X și 0 și verifică că nu pierde niciodată.
