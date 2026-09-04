---
code: S18
duration: ~1 săptămână
---

# @intro
Aici începe deep learning-ul. O rețea neuronală e un lanț de straturi, iar antrenarea e ajustarea greutăților ca să scadă eroarea. Cheia modulului e să înțelegi ce face backpropagation, nu doar s-o chemi. Când pricepi cum curge gradientul înapoi prin rețea, restul deep learning-ului devine reglaj, nu mister.

## De la perceptron la rețea
Un perceptron, cărămida de bază, ia intrările, le înmulțește cu niște greutăți, le adună cu un termen liber, și trece rezultatul printr-o funcție de activare. Singur, învață doar granițe liniare, la fel ca regresia logistică.

Puterea apare când pui multe straturi de neuroni unul după altul: un MLP (perceptron multistrat). Fiecare strat transformă ieșirea celui dinainte. Cu straturi și activări neliniare între ele, rețeaua poate învăța relații oricât de complicate. Fără neliniaritate, oricâte straturi ai pune ar colapsa într-unul singur.

Funcția de activare aduce neliniaritatea. ReLU (păstrează pozitivul, taie negativul la zero) e cea mai folosită, e simplă și antrenează rapid. Sigmoida și tanh se mai folosesc, dar ReLU e alegerea implicită în straturile ascunse.

## Funcția de cost și gradientul
Antrenarea are nevoie de o măsură a greșelii: funcția de cost (loss). Pentru regresie, eroarea pătratică. Pentru clasificare, cross-entropy, care pedepsește tare încrederea greșită. Scopul e să găsești greutățile care fac loss-ul cât mai mic.

Cum? Gradientul loss-ului față de fiecare greutate îți spune în ce direcție să miști greutatea ca să crească loss-ul; tu mergi în direcția opusă. Ideea se numește coborâre pe gradient (gradient descent): pas cu pas, cobori panta către minim.

> [!FORMULA]
> w ← w - η · ∂L/∂w
> Fiecare greutate w se mută cu un pas mic (learning rate η) în direcția opusă gradientului ∂L/∂w. Repeți de mii de ori.

## Backpropagation: regula lanțului
O rețea e un lanț de operații. Ca să afli gradientul loss-ului față de o greutate din primul strat, aplici regula lanțului din analiză: înmulțești gradienții pas cu pas, de la ieșire înapoi spre intrare. Asta e backpropagation, propagarea înapoi a erorii.

Concret: fiecare operație din rețea știe cum să-și transmită gradientul înapoi. Pornești de la loss, mergi înapoi strat cu strat, și la final ai gradientul pentru fiecare greutate din rețea, dintr-o singură trecere. E ce face eficient antrenarea rețelelor mari.

> [!NOTE]
> Backpropagation calculează gradienții. NU actualizează greutățile. Actualizarea o face optimizatorul, într-un pas separat. Confuzia asta e frecventă, ține minte că sunt două lucruri diferite.

## PyTorch: cum arată în cod
PyTorch lucrează cu tensori care își rețin gradientul automat. Tu definești rețeaua ca nn.Module, împachetezi datele într-un Dataset și un DataLoader (care le dă în loturi), și la fiecare pas faci patru lucruri, mereu în aceeași ordine.

1. Treci datele prin model și calculezi loss-ul (forward).
2. loss.backward(): backpropagation calculează gradienții.
3. optimizer.step(): optimizatorul actualizează greutățile cu gradienții.
4. optimizer.zero_grad(): ștergi gradienții, ca să nu se adune la pasul următor.

```
for x, y in dataloader:
    pred = model(x)                # forward
    loss = criterion(pred, y)
    loss.backward()                # calculează gradienții
    optimizer.step()               # actualizează greutățile
    optimizer.zero_grad()          # curăță pentru pasul următor
```

# @takeaways
- Un MLP e straturi de neuroni cu activări neliniare între ele; fără neliniaritate colapsează la un strat.
- ReLU e activarea implicită în straturile ascunse.
- Antrenarea = coborâre pe gradient: muți greutățile opus gradientului loss-ului.
- Backpropagation e regula lanțului aplicată înapoi prin rețea; calculează gradienții.
- În PyTorch: forward, backward, step, zero_grad, în ordinea asta.

# @pitfalls
- Cheamă `optimizer.zero_grad()` la fiecare pas, altfel gradienții se adună.
- Ține minte că `.backward()` doar calculează gradienți; pasul îl face optimizatorul.
- Pune activări între straturile liniare, altfel rețeaua rămâne liniară.

# @practice
- Construiește backpropagation de mână pentru o rețea cu un strat ascuns, pe hârtie.
- Antrenează un MLP pe un set mic în PyTorch și urmărește loss-ul cum scade.
- Scoate intenționat zero_grad() și observă cum o ia razna antrenarea.
