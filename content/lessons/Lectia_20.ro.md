---
code: S24
duration: ~1 săptămână
---

# @intro
Reinforcement learning (învățare prin recompensă) e cerut la clasele mari. Un agent învață ce să facă din recompense, prin încercare și eroare, fără să i se spună răspunsul corect la fiecare pas. La final atingem și etica: modelele pot fi nedrepte cu anumite grupuri, și merită să știi de ce se întâmplă și cum se măsoară.

## Ce e diferit la RL
La supervizat aveai răspunsul corect pentru fiecare exemplu. La RL nu-l ai. Agentul ia acțiuni într-un mediu, primește recompense (pozitive sau negative), și trebuie să învețe singur ce șir de acțiuni aduce cea mai mare recompensă pe termen lung. Provocarea: o acțiune bună acum poate aduce recompensa abia peste mulți pași.

Exemplu clasic: un agent într-un grid-world (o hartă cu căsuțe) trebuie să ajungă la o țintă evitând capcane. Nu i se spune drumul; primește o recompensă mică negativă la fiecare pas și una mare pozitivă la țintă, și învață singur drumul bun.

## MDP: limbajul RL
Un MDP (proces de decizie Markov) descrie problema formal. Are stări (unde poate fi agentul), acțiuni (ce poate face), recompense (ce primește), un factor de discount (cât de mult contează viitorul față de prezent), și o politică (regula după care agentul alege acțiunea în fiecare stare). Scopul: găsești politica ce maximizează recompensa totală așteptată.

Două funcții măsoară cât de bine stai. V(s) spune cât de bună e o stare (câtă recompensă aștepți de acolo încolo). Q(s,a) spune cât de bună e o pereche stare-acțiune (câtă recompensă aștepți dacă faci acțiunea a în starea s, apoi joci bine). Ecuațiile Bellman le leagă între ele recursiv: valoarea unei stări depinde de valorile stărilor următoare.

## Q-learning tabelar
Q-learning învață funcția Q din experiență, ținând un tabel cu o valoare pentru fiecare pereche stare-acțiune. După fiecare acțiune, actualizează valoarea din tabel apropiind-o de recompensa primită plus cea mai bună valoare din starea următoare. Cu destule încercări, tabelul converge și politica bună iese: în fiecare stare, alegi acțiunea cu Q cel mai mare.

> [!FORMULA]
> Q(s,a) ← Q(s,a) + α · [r + γ · max Q(s',a') - Q(s,a)]
> α = rata de învățare, r = recompensa, γ = factorul de discount, s' = starea următoare. Muți Q spre recompensa reală plus valoarea viitoare.

O dilemă centrală: explorare contra exploatare. Dacă agentul alege mereu ce pare cel mai bun acum (exploatare), poate rata un drum mai bun pe care nu l-a încercat. Dacă explorează prea mult, pierde vremea. Strategia ε-greedy echilibrează: cu probabilitate ε face o acțiune la întâmplare (explorare), altfel alege ce e mai bun (exploatare). De obicei începi cu ε mare și îl scazi treptat.

> [!NOTE]
> ε prea mic prea devreme e o capcană clasică: agentul se fixează pe primul drum decent găsit și nu mai explorează, rămânând blocat într-o soluție mediocră. Lasă-l să exploreze destul la început.

## Bias și corectitudine
Un model învață din date, deci moștenește tiparele din ele, inclusiv pe cele nedrepte. Bias-ul intră pe mai multe uși: date istorice care reflectă discriminări trecute, etichetare părtinitoare, sau alegerea unei metrici care ascunde problema. Un model poate merge bine în medie și prost pe un subgrup, iar media ascunde asta.

De aceea măsori performanța și pe subgrupuri, nu doar în total. Corectitudinea are mai multe definiții, și aici e partea grea: nu poți mereu să le ai pe toate deodată.

- Paritate demografică: modelul dă rezultate pozitive în aceeași proporție pentru fiecare grup.
- Șanse egale: modelul are aceeași rată de adevărat pozitiv pentru fiecare grup (prinde la fel de bine cazurile reale în fiecare grup).

Cele două definiții pot fi incompatibile matematic: satisfăcând-o pe una, o încalci pe cealaltă. Nu există un răspuns pur tehnic. Alegerea depinde de context și de ce cost are fiecare tip de greșeală pentru oameni. Important e să fii conștient de compromis și să-l faci explicit, nu să raportezi doar media și să ascunzi restul.

# @takeaways
- La RL agentul învață din recompense, nu din răspunsuri corecte date.
- Un MDP are stări, acțiuni, recompense, discount și politică; V și Q măsoară cât de bine stai.
- Q-learning învață un tabel de valori din experiență și scoate politica bună.
- ε-greedy echilibrează explorarea și exploatarea; explorează destul la început.
- Bias-ul intră prin date și etichete; măsoară pe subgrupuri, nu doar media.
- Definițiile de corectitudine pot fi incompatibile; alegerea e contextuală, nu pur tehnică.

# @pitfalls
- Scade ε treptat, ca agentul să exploreze destul la început.
- Raportează scorul și pe subgrupuri, nu doar media.
- Tratează corectitudinea ca pe mai multe definiții care se bat cap în cap.

# @practice
- Implementează Q-learning pe un grid-world și urmărește politica cum se formează.
- Măsoară performanța unui model pe subgrupuri și discută ce definiție de corectitudine folosești.
- Variază ε (explorarea) și observă cum se schimbă ce politică învață agentul.
