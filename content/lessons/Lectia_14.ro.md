---
code: S18
duration: ~1 săptămână
---

# @intro
Aici începe deep learning-ul (învățarea profundă): machine learning cu rețele neuronale care au multe straturi. O rețea neuronală e un lanț de straturi, iar antrenarea e ajustarea greutăților ca să scadă eroarea. Greutățile sunt numerele pe care le învață rețeaua, ca w-urile din regresia liniară (Lecția 7). Cheia modulului e să înțelegi ce face backpropagation, nu doar s-o chemi: e metoda prin care rețeaua află încotro să mute fiecare greutate. Când pricepi cum curge gradientul înapoi prin rețea (gradientul e panta erorii, explicată mai jos), restul deep learning-ului devine reglaj, nu mister.

## De la perceptron la rețea
Un exemplu mic: vrei să ghicești dacă un elev trece un test, din două numere de intrare: x₁ = 3 ore de învățat și x₂ = 2 ore pe telefon în seara dinainte. Fiecare intrare are o greutate, care spune cât contează și în ce sens: w₁ = 0.8 (învățatul ajută), w₂ = -0.5 (telefonul încurcă). Se mai adaugă un termen liber, b = -1, ca b-ul din regresia liniară (Lecția 7); în PyTorch îi spune bias. Suma e z = 0.8 · 3 + (-0.5) · 2 + (-1) = 2.4 - 1 - 1 = 0.4.

La final, o regulă decide: dacă z e mai mare decât 0, răspunsul e 1 (trece), altfel e 0 (pică). Aici z = 0.4, deci 1. Regula asta e cea mai simplă funcție de activare: funcția care primește suma z și dă ieșirea.

Asta face un perceptron, cărămida de bază: ia intrările, le înmulțește cu niște greutăți, le adună cu un termen liber, și trece rezultatul printr-o funcție de activare. Greutățile și termenul liber sunt parametrii lui, numerele pe care le învață din exemple.

> [!FORMULA]
> ieșire = f(w₁x₁ + w₂x₂ + b)
> f e funcția de activare. Cu mai multe intrări, adaugi câte un produs w · x pentru fiecare, ca la regresia liniară.

Singur, învață doar granițe liniare, la fel ca regresia logistică. Granița e locul unde z = 0, aici dreapta 0.8 · x₁ - 0.5 · x₂ - 1 = 0 din planul cu axele x₁ și x₂: punctele (x₁, x₂) de o parte a ei primesc 1, cele de cealaltă parte primesc 0. Dacă elevii care trec și cei care pică nu pot fi despărțiți de o singură dreaptă, un perceptron nu se descurcă.

Soluția e să legi mai mulți perceptroni între ei. Într-o rețea, fiecare se numește neuron. Un strat e un grup de neuroni care primesc aceleași intrări, fiecare cu greutățile lui, iar ieșirile unui strat devin intrările stratului următor.

Puterea apare când pui multe straturi de neuroni unul după altul: un MLP (perceptron multistrat). Fiecare strat transformă ieșirea celui dinainte. Cu straturi și activări neliniare între ele, rețeaua poate învăța relații oricât de complicate. Fără neliniaritate, oricâte straturi ai pune ar colapsa într-unul singur.

Straturile dintre intrări și stratul de ieșire se numesc straturi ascunse, pentru că valorile lor nu apar nicăieri în date. Un MLP mic pentru exemplul cu testul: 2 intrări, un strat ascuns de 3 neuroni, un neuron de ieșire. Fiecare neuron ascuns are 2 greutăți și un termen liber, iar neuronul de ieșire are 3 greutăți (câte una pentru fiecare neuron ascuns) și un termen liber. În total, 3 · 3 + 4 = 13 parametri.

Colapsul de mai sus se vede ușor cu numere. Fără funcție de activare, un neuron doar înmulțește și adună, adică e o funcție liniară, ca f(x) = ax + b de la mate, al cărei grafic e o dreaptă. Ia două straturi cu câte un neuron: primul calculează 3x + 1, al doilea înmulțește rezultatul cu 2. Împreună dau 2 · (3x + 1) = 6x + 2, tot o dreaptă. Un singur neuron cu greutatea 6 și termenul liber 2 făcea exact același lucru. Oricâte straturi liniare pui unul după altul, rezultatul rămâne o dreaptă.

Funcția de activare aduce neliniaritatea. ReLU (păstrează pozitivul, taie negativul la zero) e cea mai folosită, e simplă și antrenează rapid. Sigmoida și tanh se mai folosesc, dar ReLU e alegerea implicită în straturile ascunse.

> [!FORMULA]
> ReLU(z) = max(0, z)
> Pozitivul trece neschimbat, negativul devine 0: ReLU(5) = 5, ReLU(0.4) = 0.4, ReLU(-2) = 0. Graficul are un cot în 0, iar din multe coturi puse în locuri diferite, câte unul de la fiecare neuron, rețeaua poate construi aproape orice formă.

Sigmoida o știi din Lecția 7: strânge orice număr între 0 și 1, cu σ(0) = 0.5, σ(2) ≈ 0.88 și σ(-2) ≈ 0.12. Tanh are aceeași formă de S, dar strânge numerele între -1 și 1: tanh(0) = 0, tanh(2) ≈ 0.96, tanh(-2) ≈ -0.96.

## Funcția de cost și gradientul
Antrenarea are nevoie de o măsură a greșelii: funcția de cost (loss), pe care ai văzut-o în Lecția 7. E un număr care spune cât greșește modelul, iar mai mic e mai bine. Pentru regresie, eroarea pătratică. Pentru clasificare, cross-entropy, care pedepsește tare încrederea greșită. Scopul e să găsești greutățile care fac loss-ul cât mai mic.

La regresie se folosește de obicei MSE (mean squared error, media erorilor pătratice): pentru fiecare exemplu scazi răspunsul real din predicție, ridici diferența la pătrat, apoi faci media. Dacă modelul prezice 3 și 5, iar răspunsurile reale sunt 2 și 8, diferențele sunt 1 și -3, pătratele 1 și 9, iar MSE = (1 + 9) / 2 = 5.

La clasificare, rețeaua dă câte o probabilitate pentru fiecare clasă, care adunate fac 1 (le obține cu o funcție numită softmax, pe care `nn.CrossEntropyLoss` din PyTorch o aplică singur). Cross-entropy se uită doar la probabilitatea p dată clasei corecte.

> [!FORMULA]
> loss = -log(p)
> p e probabilitatea pe care modelul a dat-o clasei corecte. p = 0.9 dă un loss de 0.105, p = 0.5 dă 0.69, iar p = 0.1 dă 2.3.

Logaritmul îl faci la mate abia în clasa a 10-a; aici îți ajung câteva valori (e logaritmul natural, `math.log` din Python): log(1) = 0, log(0.9) ≈ -0.105, log(0.5) ≈ -0.69, log(0.1) ≈ -2.3. Cu cât p e mai aproape de 0, cu atât log(p) coboară mai jos, iar minusul din față face loss-ul pozitiv. Un model care dă 0.9 clasei corecte plătește 0.105. Unul care greșește sigur pe el, dând clasei corecte doar 0.1, plătește 2.3, de aproape 22 de ori mai mult.

Cum găsești greutățile care fac loss-ul mic? Ia cel mai simplu caz: un model cu o singură greutate w și loss-ul L(w) = (w - 3)². Loss-ul e minim, 0, când w = 3, dar modelul nu știe asta. Pornește de la w = 0, unde L = (0 - 3)² = 9.

Mută w puțin în sus, la 0.1: L = (0.1 - 3)² = 8.41, deci loss-ul a scăzut cu 0.59. Împarte schimbarea loss-ului la mutarea lui w: -0.59 / 0.1 = -5.9. Cu o mutare și mai mică, la w = 0.01, iese -5.99, tot mai aproape de -6. Numărul ăsta e panta loss-ului în w = 0: cât se schimbă loss-ul la o mutare foarte mică a lui w, raportat la mărimea mutării. Minusul arată că loss-ul scade când w crește.

Panta asta e gradientul. Pentru L(w) = (w - 3)², gradientul are formula 2 · (w - 3), care vine din derivate (la mate, în clasa a 11-a); aici o iei ca atare. În w = 0 dă 2 · (0 - 3) = -6, exact ce ai găsit mai sus. Când loss-ul depinde de multe greutăți, gradientul față de una dintre ele se scrie ∂L/∂w și se citește „gradientul lui L față de w”: cât se schimbă L când miști puțin doar w, cu celelalte greutăți ținute pe loc. Semnul ∂ e un d rotunjit care arată tocmai asta, că te uiți la o singură greutate dintre mai multe.

Gradientul loss-ului față de fiecare greutate îți spune în ce direcție să miști greutatea ca să crească loss-ul; tu mergi în direcția opusă. În exemplu, gradientul -6 arată că loss-ul crește spre w mai mic, deci tu muți w în sus. Ideea se numește coborâre pe gradient (gradient descent): pas cu pas, cobori panta către minim, punctul unde loss-ul e cel mai mic.

> [!FORMULA]
> w ← w - η · ∂L/∂w
> Fiecare greutate w se mută cu un pas mic (learning rate η) în direcția opusă gradientului ∂L/∂w. Repeți de mii de ori. Săgeata înseamnă „primește valoarea”, ca `w = w - eta * grad` în Python. η (litera grecească eta) e un număr mic, de exemplu 0.1; ai mai întâlnit learning rate-ul la boosting, în Lecția 9.

Doi pași de mână, cu η = 0.1. Pasul 1: în w = 0 gradientul e -6, deci w ← 0 - 0.1 · (-6) = 0.6, iar loss-ul scade de la 9 la (0.6 - 3)² = 5.76. Pasul 2: în w = 0.6 gradientul e 2 · (0.6 - 3) = -4.8, deci w ← 0.6 - 0.1 · (-4.8) = 1.08, iar loss-ul ajunge la 3.69. Pașii se micșorează singuri, pentru că panta se îndulcește pe măsură ce te apropii de minim.

```
w = 0.0
eta = 0.1                    # learning rate
for pas in range(1, 31):
    grad = 2 * (w - 3)       # gradientul lui (w - 3) ** 2 în punctul w
    w = w - eta * grad       # un pas de coborâre
    if pas % 10 == 0:
        print(pas, round(w, 4))
# afișează:
# 10 2.6779
# 20 2.9654
# 30 2.9963
```

Codul repetă pasul de 30 de ori și afișează w după fiecare al zecelea pas: greutatea se apropie de 3, deci loss-ul (w - 3)² se apropie de 0.

## Backpropagation: regula lanțului
O rețea e un lanț de operații. Ca să afli gradientul loss-ului față de o greutate din primul strat, aplici regula lanțului din analiză (analiza matematică, tot din clasa a 11-a): înmulțești gradienții pas cu pas, de la ieșire înapoi spre intrare. Asta e backpropagation, propagarea înapoi a erorii.

Ideea regulii lanțului: ritmurile de schimbare se înmulțesc. Ia y = 3x + 1 și L = 2 · y. Dacă x crește cu 0.1 (de la 1 la 1.1), y crește de 3 ori mai mult, cu 0.3 (de la 4 la 4.3). L crește de 2 ori cât y, cu 0.6 (de la 8 la 8.6). Deci L se schimbă de 3 · 2 = 6 ori mai repede decât x, ca în exemplul cu straturile: 2 · (3x + 1) = 6x + 2.

Același lucru într-o rețea minusculă, cu o singură greutate: intrarea x = 2, predicția p = w · x, răspunsul corect 8 și loss-ul L = (p - 8)². Pornești cu w = 1, deci p = 2 și L = 36. Lanțul are două verigi. Prima e gradientul lui L față de p: după aceeași formulă ca la (w - 3)², e 2 · (p - 8) = 2 · (2 - 8) = -12. A doua e cât de repede se schimbă p când se schimbă w: p = w · 2, deci de 2 ori mai repede. Le înmulțești: ∂L/∂w = -12 · 2 = -24. Verifici cu o mutare mică: la w = 1.01, L scade la 35.76, adică cu 0.24, de 24 de ori cât mutarea de 0.01.

Concret: fiecare operație din rețea știe cum să-și transmită gradientul înapoi. Pornești de la loss, mergi înapoi strat cu strat, și la final ai gradientul pentru fiecare greutate din rețea, dintr-o singură trecere. Produsul calculat până la un strat e refolosit pentru stratul de dinaintea lui, deci nu iei lanțul de la capăt pentru fiecare greutate. E ce face eficient antrenarea rețelelor mari.

> [!NOTE]
> Backpropagation calculează gradienții. NU actualizează greutățile. Actualizarea o face optimizatorul, într-un pas separat. Optimizatorul e bucata de cod care aplică regula w ← w - η · ∂L/∂w, sau o variantă mai isteață a ei (le vezi în Lecția 15). Confuzia asta e frecventă: sunt două lucruri diferite.

## PyTorch: cum arată în cod
PyTorch e biblioteca pentru rețele neuronale pomenită în Lecția 1. O instalezi cu `pip install torch`, în mediul virtual.

PyTorch lucrează cu tensori care își rețin gradientul automat. Un tensor (grila de numere din Lecția 13) seamănă cu un array NumPy din Lecția 4, cu o diferență: își amintește din ce operații a ieșit, așa că PyTorch poate face singur backpropagation.

```
import torch

w = torch.tensor(0.0, requires_grad=True)   # o greutate, cu gradient
L = (w - 3) ** 2          # loss-ul din exemplul cu panta
L.backward()              # backpropagation: calculează gradientul
print(w.grad)             # tensor(-6.)

L = (w - 3) ** 2
L.backward()              # încă o dată, fără să ștergi
print(w.grad)             # tensor(-12.): -6 s-a adunat peste -6
```

`requires_grad=True` îi cere lui PyTorch să urmărească tot ce se calculează din w. `L.backward()` face backpropagation și pune gradientul în `w.grad`: -6 (afișat ca `tensor(-6.)`), ca la calculul de mână. A doua oară, gradientul nou s-a adunat peste cel vechi: PyTorch nu șterge singur gradienții, de aceea bucla de antrenare cheamă `zero_grad()`.

Rețeaua o definești ca `nn.Module`: îți scrii o clasă (Lecția 3) care moștenește din `nn.Module`, clasa de bază a PyTorch pentru modele. În `__init__` creezi straturile, iar în metoda `forward` scrii cum trec datele prin ele. Stratul de bază e `nn.Linear(intrări, neuroni)`, în care fiecare neuron e legat de toate intrările; i se mai spune strat dens. De exemplu, `nn.Linear(2, 3)` e stratul ascuns din exemplul cu testul: 3 neuroni cu câte 2 greutăți, plus 3 termeni liberi.

Datele le împachetezi într-un `Dataset` și un `DataLoader`. Dataset-ul ține perechile (intrare, răspuns corect) și ți-o dă pe oricare după numărul ei. DataLoader-ul ia Dataset-ul și ți-l dă în loturi (batches), adică grupuri mici de exemple procesate deodată, de exemplu câte 20. De ce loturi și cât de mari, vezi în Lecția 15.

La fiecare pas, adică pentru fiecare lot, faci patru lucruri, mereu în aceeași ordine.

1. Treci datele prin model și calculezi loss-ul (forward, trecerea înainte).
2. `loss.backward()`: backpropagation calculează gradienții.
3. `optimizer.step()`: optimizatorul actualizează greutățile cu gradienții.
4. `optimizer.zero_grad()`: ștergi gradienții, ca să nu se adune la pasul următor.

```
for x, y in dataloader:
    pred = model(x)                # forward
    loss = criterion(pred, y)
    loss.backward()                # calculează gradienții
    optimizer.step()               # actualizează greutățile
    optimizer.zero_grad()          # curăță pentru pasul următor
```

La fiecare tură a buclei, `dataloader` îți dă un lot: `x` are intrările, `y` răspunsurile corecte. `model(x)` cheamă `forward` și întoarce predicțiile. `criterion` e funcția de loss (criteriul după care judeci predicția): `nn.MSELoss()` pentru numere, `nn.CrossEntropyLoss()` pentru clase. Optimizatorul se creează, de exemplu, cu `torch.optim.SGD(model.parameters(), lr=0.1)`: primește parametrii modelului și learning rate-ul, iar `step()` aplică pe fiecare parametru regula w ← w - η · ∂L/∂w.

## Un exemplu complet, de rulat
Codul de mai jos pune toate piesele laolaltă și merge rulat așa cum e. Rețeaua învață din 200 de exemple inventate relația y = x², care nu e o dreaptă, cu un strat ascuns de 32 de neuroni cu ReLU. Loss-ul e MSE, pentru că prezice un număr.

```
import torch
from torch import nn
from torch.utils.data import TensorDataset, DataLoader

torch.manual_seed(0)          # aceleași numere aleatoare la fiecare rulare

# date inventate: 200 de valori x între -2 și 2, ținta e x la pătrat
X_train = torch.linspace(-2, 2, 200).reshape(-1, 1)   # forma (200, 1)
y_train = X_train ** 2

class Retea(nn.Module):
    def __init__(self):
        super().__init__()
        self.ascuns = nn.Linear(1, 32)    # strat ascuns: 32 de neuroni
        self.iesire = nn.Linear(32, 1)    # un neuron de ieșire

    def forward(self, x):
        h = torch.relu(self.ascuns(x))    # activarea ReLU
        return self.iesire(h)

model = Retea()
date = TensorDataset(X_train, y_train)
dataloader = DataLoader(date, batch_size=20, shuffle=True)
criterion = nn.MSELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.1)

for epoca in range(1, 101):       # 100 de treceri prin toate datele
    total = 0
    for x, y in dataloader:       # 10 loturi a câte 20 de exemple
        pred = model(x)
        loss = criterion(pred, y)
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()
        total += loss.item()
    if epoca in [1, 10, 50, 100]:
        print(epoca, round(total / len(dataloader), 4))

x_nou = torch.tensor([[1.5]])          # un exemplu nou, forma (1, 1)
print(round(model(x_nou).item(), 3))   # răspunsul corect: 1.5 ** 2 = 2.25
# afișează:
# 1 0.9165
# 10 0.0135
# 50 0.0023
# 100 0.0012
# 2.272
```

- `torch.linspace(-2, 2, 200)` dă 200 de numere egal depărtate între -2 și 2, ca `np.linspace` din Lecția 4, iar `.reshape(-1, 1)` le așază pe o coloană: 200 de rânduri, câte o trăsătură (-1 înseamnă „câte rânduri ies”).
- `super().__init__()` pregătește partea moștenită din `nn.Module`, ca `super()` din Lecția 3.
- `TensorDataset` e un Dataset gata făcut pentru date care stau deja în tensori. `batch_size=20` dă 10 loturi de câte 20, iar `shuffle=True` amestecă exemplele la fiecare trecere.
- Bucla de afară trece de 100 de ori prin toate datele; o trecere completă se numește epocă (o explică Lecția 15). Înăuntru e bucla de mai sus, neschimbată.
- `loss.item()` scoate numărul din tensor, iar `total / len(dataloader)` e loss-ul mediu pe cele 10 loturi ale epocii.
- `torch.manual_seed(0)` fixează greutățile de pornire și ordinea amestecării (ca `random.seed` din Lecția 3), deci obții aceleași numere ca în comentarii.

Loss-ul mediu scade de la 0.92 la 0.0012, iar pentru x = 1.5 rețeaua prezice 2.272, aproape de răspunsul corect, 2.25. Încearcă să scoți `torch.relu` din `forward`: loss-ul rămâne pe la 1.46, iar rețeaua dă cam 1.46 pentru orice x, o dreaptă orizontală. Fără activare, cele două straturi s-au strâns într-unul singur, ca la 2 · (3x + 1).

# @practice
- Construiește backpropagation de mână pentru o rețea cu un strat ascuns, pe hârtie.
- Antrenează un MLP pe un set mic în PyTorch și urmărește loss-ul cum scade.
- Scoate intenționat zero_grad() și observă cum o ia razna antrenarea.
