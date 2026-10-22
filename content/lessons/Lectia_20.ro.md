---
code: S24
duration: ~1 săptămână
---

# @intro
Reinforcement learning (învățare prin recompensă) e cerut la clasele mari. Un agent învață ce să facă din recompense, prin încercare și eroare, fără să i se spună răspunsul corect la fiecare pas. La final atingem și etica: modelele pot fi nedrepte cu anumite grupuri, și merită să știi de ce se întâmplă și cum se măsoară.

## Ce e diferit la RL
La învățarea supervizată din lecțiile de până acum aveai răspunsul corect pentru fiecare exemplu. La RL nu-l ai. Agentul ia acțiuni într-un mediu, primește recompense (pozitive sau negative), și trebuie să învețe singur ce șir de acțiuni aduce cea mai mare recompensă pe termen lung. Provocarea: o acțiune bună acum poate aduce recompensa abia peste mulți pași.

Exemplu clasic: un agent într-un grid-world (o hartă cu căsuțe) trebuie să ajungă la o țintă evitând capcane. Nu i se spune drumul; primește o recompensă mică negativă la fiecare pas și una mare pozitivă la țintă, și învață singur drumul bun. Recompensa negativă de la fiecare pas îl împinge spre drumul cel mai scurt, pentru că fiecare pas în plus îl costă. Pe exemplul ăsta, cuvintele de bază din RL înseamnă:

- Agentul e cel care decide ce face, aici robotul de pe hartă. În cod, e programul tău.
- Mediul e lumea în care trăiește agentul: harta cu pereți, capcane și țintă, plus regulile după care se mută robotul.
- O acțiune e o mutare: sus, jos, stânga sau dreapta.
- Recompensa e un număr pe care mediul i-l dă agentului după fiecare acțiune, de exemplu -1 pentru un pas obișnuit, -10 pentru o capcană și +10 pentru țintă.
- Un episod e o încercare completă, de la start până când agentul ajunge la țintă sau cade într-o capcană. Agentul joacă multe episoade și se descurcă tot mai bine.

Diferența față de căutarea din Lecția 11: acolo cunoșteai harta și căutai pe ea drumul cel mai bun. Aici agentul nu știe harta și nici unde sunt capcanele. Le descoperă încercând.

## MDP: limbajul RL
Un MDP (proces de decizie Markov) descrie problema formal. Markov vine de la matematicianul rus Andrei Markov și înseamnă că ce se întâmplă mai departe depinde doar de starea de acum, nu și de drumul pe care ai ajuns în ea. Pe hartă: dacă știi căsuța în care e robotul, nu contează pe unde a venit. Un MDP are:

- Stări: unde poate fi agentul, aici căsuța în care se află.
- Acțiuni: ce poate face în fiecare stare, aici cele patru mutări.
- Tranziții: unde ajunge după o acțiune. „Dreapta” îl mută o căsuță la dreapta, iar dacă acolo e un perete, rămâne pe loc.
- Recompense: ce primește după fiecare acțiune.
- Un factor de discount: cât de mult contează viitorul față de prezent.

Politica e regula după care agentul alege acțiunea în fiecare stare. Pe hartă, o politică e câte o săgeată desenată în fiecare căsuță. Politica nu face parte din descrierea problemei: e ce cauți. Scopul: găsești politica ce maximizează recompensa totală așteptată. Așteptată înseamnă în medie: uneori mediul e întâmplător (de exemplu, robotul alunecă și ajunge în altă căsuță decât voia), deci contează ce obții în medie, pe multe episoade.

Discountul se notează γ (litera grecească gamma) și e un număr între 0 și 1, de obicei 0.9 sau 0.99. Fiecare pas de așteptare înmulțește o recompensă cu γ. Cu γ = 0.9, o recompensă de 10 primită chiar acum valorează 10. Dacă vine cu un pas mai târziu, valorează 10 · 0.9 = 9, cu doi pași mai târziu 10 · 0.9² = 8.1, iar cu trei pași mai târziu 10 · 0.9³ = 7.29. Un câștig de acum e mai sigur decât unul promis peste mult timp, iar așa agentul ajunge să prefere drumurile scurte. Cu γ = 0 s-ar uita doar la recompensa imediată; cu γ aproape de 1, viitorul contează aproape cât prezentul.

Două funcții măsoară cât de bine stai. V(s) spune cât de bună e o stare (câtă recompensă aștepți de acolo încolo). Q(s,a) spune cât de bună e o pereche stare-acțiune (câtă recompensă aștepți dacă faci acțiunea a în starea s, apoi joci bine). Litera s vine de la stare, a de la acțiune, iar recompensele viitoare se adună cu discount, ca mai sus.

Cel mai mic grid-world e un coridor de 5 căsuțe, numerotate de la 0 la 4. Agentul pornește din căsuța 0 și poate merge la stânga sau la dreapta. Ținta e căsuța 4: când ajunge acolo primește 10 și episodul se termină. Orice alt pas dă 0, ca să iasă calcule simple. Dacă e în căsuța 0 și merge la stânga, se lovește de perete și rămâne pe loc. Discountul e γ = 0.9.

Cea mai bună politică e „mereu la dreapta”. Din căsuța 3, recompensa de 10 vine chiar la mutarea următoare, deci V(3) = 10. Din căsuța 2 vine cu un pas mai târziu, deci V(2) = 9. La fel, V(1) = 8.1 și V(0) = 7.29, exact numerele de la discount.

Q compară acțiunile. Q(2, dreapta) = 0 + 0.9 · V(3) = 9: acum primești 0 și ajungi în căsuța 3, care valorează 10. Q(2, stânga) = 0 + 0.9 · V(1) = 0.9 · 8.1 = 7.29: ajungi în căsuța 1, mai departe de țintă. Q-ul mai mare îți spune ce să faci: din căsuța 2 mergi la dreapta.

Ecuațiile Bellman le leagă între ele recursiv: valoarea unei stări depinde de valorile stărilor următoare. Valoarea de aici e recompensa pe care o primești acum plus γ înmulțit cu valoarea stării în care ajungi, dacă de acolo joci cât mai bine. Exact așa ai calculat mai sus: ca să afli V(2), ți-a trebuit V(3).

## Q-learning tabelar
Q-learning învață funcția Q din experiență, ținând un tabel cu o valoare pentru fiecare pereche stare-acțiune. În coridor, tabelul are 5 rânduri (căsuțele) și 2 coloane (stânga, dreapta). După fiecare acțiune, actualizează valoarea din tabel apropiind-o de recompensa primită plus cea mai bună valoare din starea următoare. Cu destule încercări, tabelul converge (valorile nu se mai schimbă) și politica bună iese: în fiecare stare, alegi acțiunea cu Q cel mai mare.

Mai sus ai calculat Q de mână pentru că știai harta. Agentul nu o știe: află recompensele și unde ajunge după fiecare mutare doar încercând. Formula de mai jos îi spune cum să-și corecteze tabelul după fiecare pas.

> [!FORMULA]
> Q(s,a) ← Q(s,a) + α · [r + γ · max Q(s',a') - Q(s,a)]
> α = rata de învățare, r = recompensa, γ = factorul de discount, s' = starea următoare. Muți Q spre recompensa reală plus valoarea viitoare. max Q(s',a') e cea mai mare valoare din rândul stării s', iar săgeata ← înseamnă „devine”, ca `=` în Python.

Paranteza dreaptă e diferența dintre ce tocmai ai aflat, r + γ · max Q(s',a'), și ce credeai înainte, Q(s,a). α (alfa) spune cât din diferență corectezi, ca learning rate-ul η din Lecția 14: cu α = 0.5 faci jumătate din drum.

Un calcul de mână în coridor, cu α = 0.5 și γ = 0.9. Tabelul pornește numai cu zerouri. Agentul e în căsuța 3, merge la dreapta, primește r = 10 și ajunge la țintă. După țintă nu mai urmează nimic, deci max Q(s',a') = 0. Q(3, dreapta) ← 0 + 0.5 · [10 + 0.9 · 0 - 0] = 5.

Într-un episod de mai târziu, agentul e în căsuța 2 și merge la dreapta: r = 0 și ajunge în căsuța 3, unde cea mai mare valoare e acum 5. Q(2, dreapta) ← 0 + 0.5 · [0 + 0.9 · 5 - 0] = 2.25. Când ajunge iar în căsuța 3 și merge la dreapta, Q(3, dreapta) ← 5 + 0.5 · [10 + 0.9 · 0 - 5] = 7.5. Valoarea țintei se scurge înapoi, căsuță cu căsuță, iar cu destule episoade numerele se apropie de 10, 9, 8.1 și 7.29.

## Explorare contra exploatare
O dilemă centrală: explorare contra exploatare. Dacă agentul alege mereu ce pare cel mai bun acum (exploatare), poate rata un drum mai bun pe care nu l-a încercat. Dacă explorează prea mult, pierde vremea. Strategia ε-greedy echilibrează: cu probabilitate ε face o acțiune la întâmplare (explorare), altfel alege ce e mai bun (exploatare). De obicei începi cu ε mare și îl scazi treptat.

ε (epsilon) e tot o literă grecească, aici un număr între 0 și 1, iar greedy înseamnă „lacom”: ia mereu ce pare cel mai bun acum. Cu ε = 0.1, cam o mutare din 10 e aleasă la întâmplare, iar celelalte 9 sunt cele mai bune după tabel. Cu ε = 1, toate sunt la întâmplare, ce vrei la început, când tabelul e plin de zerouri și agentul nu știe nimic.

Codul de mai jos pune totul laolaltă: coridorul, tabelul Q, formula și ε-greedy.

```
import random
import numpy as np

random.seed(0)
N = 5                    # căsuțele 0, 1, 2, 3, 4; ținta e căsuța 4
Q = np.zeros((N, 2))     # coloana 0 = stânga, coloana 1 = dreapta
alfa, gamma = 0.5, 0.9

for episod in range(300):
    eps = max(0.1, 1 - episod / 100)   # pornește de la 1, scade până la 0.1
    s = 0                              # fiecare episod începe din căsuța 0
    while s != N - 1:
        if random.random() < eps:
            a = random.randint(0, 1)   # explorare: o acțiune la întâmplare
        else:
            a = Q[s].argmax()          # exploatare: cea mai bună până acum
        s2 = max(s - 1, 0) if a == 0 else s + 1   # din 0, stânga = pe loc
        r = 10 if s2 == N - 1 else 0
        viitor = 0 if s2 == N - 1 else Q[s2].max()
        Q[s, a] += alfa * (r + gamma * viitor - Q[s, a])
        s = s2

print(Q.round(2))
# [[ 6.56  7.29]
#  [ 6.56  8.1 ]
#  [ 7.29  9.  ]
#  [ 8.1  10.  ]
#  [ 0.    0.  ]]
print(Q[:N - 1].argmax(axis=1))   # [1 1 1 1]: dreapta în fiecare căsuță
```

Fiecare episod pornește din căsuța 0 și ține până când agentul ajunge în căsuța 4 (bucla `while`). `Q[s]` e rândul căsuței s, iar `Q[s].argmax()` dă coloana cu valoarea cea mai mare (Lecția 4), adică acțiunea cea mai bună de până acum. `random.random()` dă un număr la întâmplare între 0 și 1 (Lecția 3); când ε = 0.1, numărul iese sub ε cam o dată din 10, și atunci agentul alege la întâmplare. `s2` e căsuța următoare, `r` recompensa, iar `viitor` e max Q(s',a'), adică 0 dacă s-a ajuns la țintă. Rândul cu `+=` e chiar formula de mai sus.

Ce iese: tabelul învățat, rotunjit la două zecimale cu `Q.round(2)`. Pe coloana dreapta sunt exact valorile calculate de mână: 7.29, 8.1, 9 și 10. Și coloana stânga se potrivește, de exemplu Q(2, stânga) = 7.29, ca mai sus. Rândul căsuței 4 rămâne 0, fiindcă acolo jocul se termină. `Q[:N - 1].argmax(axis=1)` alege cea mai bună coloană pe fiecare rând în afară de ultimul: 1, adică dreapta, peste tot.

ε din cod scade: e 1 la primul episod, 0.5 la episodul 50 și 0.1 de la episodul 90 încolo. La început agentul încearcă orice, apoi folosește tot mai des ce a învățat. Pentru că ε nu ajunge la 0, agentul mai încearcă stânga din când în când, de aceea are valori și coloana stânga.

> [!NOTE]
> ε prea mic prea devreme e o capcană clasică: agentul se fixează pe primul drum decent găsit și nu mai explorează, rămânând blocat într-o soluție mediocră. Lasă-l să exploreze destul la început.

## Bias și corectitudine
Aici bias nu mai înseamnă eroarea din presupuneri prea simple din Lecția 1. Înseamnă o nedreptate sistematică: modelul greșește mai des, sau decide mai prost, pentru un anumit grup de oameni. Un model învață din date, deci moștenește tiparele din ele, inclusiv pe cele nedrepte. Bias-ul intră pe mai multe uși: date istorice care reflectă discriminări trecute, etichetare părtinitoare, sau alegerea unei metrici care ascunde problema.

De exemplu, dacă o firmă a angajat în trecut mai ales bărbați, un model antrenat pe angajările vechi învață că a fi bărbat e un semn bun. Asta nu spune însă nimic despre cât de bine lucrează cineva. Un model poate merge bine în medie și prost pe un subgrup, iar media ascunde asta. Cu numere: grupul A e 90% din date și modelul are pe el acuratețea 99%, iar grupul B e 10% din date și acolo modelul greșește jumătate din cazuri. Acuratețea totală e 0.9 · 99% + 0.1 · 50% = 89.1% + 5% = 94.1%, care arată foarte bine.

De aceea măsori performanța separat pe fiecare subgrup, pe lângă scorul total. Cu pandas, dacă ai o coloană `grup` și o coloană `corect` (True când predicția e bună), `df.groupby("grup")["corect"].mean()` îți dă acuratețea pe fiecare grup (Lecția 4). Media unor valori True și False e chiar proporția de True. Corectitudinea are mai multe definiții, și aici e partea grea: nu poți mereu să le ai pe toate deodată.

- Paritate demografică: modelul dă rezultate pozitive în aceeași proporție pentru fiecare grup. De exemplu, aprobă 45% din cereri și în grupul A, și în grupul B.
- Șanse egale: modelul are aceeași rată de adevărat pozitiv pentru fiecare grup (prinde la fel de bine cazurile reale în fiecare grup). Rata de adevărat pozitiv e recall-ul din Lecția 8, calculat separat pe fiecare grup.

Un exemplu cu credite. În grupul A sunt 100 de oameni, dintre care 60 ar da banii înapoi. În grupul B sunt tot 100, dar doar 30 ar da banii înapoi. „Pozitiv” înseamnă că modelul aprobă creditul.

Un model perfect aprobă exact oamenii care ar da banii înapoi: 60 în A și 30 în B. Rata de adevărat pozitiv e 60 / 60 = 100% în A și 30 / 30 = 100% în B, deci șansele egale sunt respectate. Rata de aprobare e însă 60% în A și 30% în B, deci paritatea demografică e încălcată.

Acum ceri paritate: 45 de aprobări în fiecare grup. În A, cel mai bun lucru pe care îl poți face e să aprobi 45 din cei 60 care ar plăti, deci refuzi 15 oameni care ar fi meritat: rata de adevărat pozitiv scade la 45 / 60 = 75%. În B aprobi toți cei 30 care ar plăti, plus 15 care nu vor da banii înapoi, iar rata rămâne 100%. Paritatea e respectată (45% și 45%), dar șansele egale nu mai sunt (75% față de 100%).

Cele două definiții pot fi incompatibile matematic: satisfăcând-o pe una, o încalci pe cealaltă. Se întâmplă când grupurile au proporții diferite de cazuri pozitive reale, ca 60% și 30% aici. Le poți respecta pe amândouă doar cu un model care greșește mai mult: refuză oameni care ar fi meritat sau aprobă oameni care n-ar fi meritat. Nu există un răspuns pur tehnic. Alegerea depinde de context și de ce cost are fiecare tip de greșeală pentru oameni. Important e să fii conștient de compromis și să-l faci explicit, nu să raportezi doar media și să ascunzi restul.

# @practice
- Implementează Q-learning pe un grid-world și urmărește politica cum se formează.
- Măsoară performanța unui model pe subgrupuri și discută ce definiție de corectitudine folosești.
- Variază ε (explorarea) și observă cum se schimbă ce politică învață agentul.
