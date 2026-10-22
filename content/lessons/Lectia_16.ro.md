---
code: S20
duration: ~1 săptămână
---

# @intro
Mai devreme sau mai târziu, o rețea refuză să învețe: loss-ul stă pe loc, sau scorul e la nivel de ghicit, adică cât ai lua fără să te uiți la date, de exemplu spunând mereu clasa cea mai frecventă, ca baseline-ul din Lecția 6. Panica și schimbatul la nimereală nu ajută. Ai o listă de verificări, în ordine, de la simplu la complex. De cele mai multe ori problema e banală și e pe la începutul listei.

## Testul care rezolvă jumătate din cazuri
Înainte de orice, verifică dacă modelul poate face overfit pe 10 exemple, adică dacă le poate învăța pe de rost (Lecția 1). Iei zece exemple, oprești orice regularizare (fără dropout, fără weight decay, Lecția 15), și antrenezi până ar trebui să le memoreze perfect. Dacă loss-ul ajunge aproape de zero, mecanismul de învățare funcționează și problema e în altă parte (date, regularizare prea agresivă).

Testul are sens pentru că memorarea e cel mai ușor lucru pe care i-l poți cere unei rețele. Chiar și o rețea mică are sute de greutăți, iar 10 exemple sunt nimic pentru ea. Dacă datele ajung corect în model, loss-ul e calculat corect, gradienții curg înapoi și optimizatorul mută greutățile, loss-ul trebuie să coboare aproape de 0. Pe 10 exemple, testul durează câteva secunde.

```
import torch
from torch import nn

torch.manual_seed(0)
X = torch.randn(10, 5)              # 10 exemple, 5 trăsături inventate
y = torch.randint(0, 2, (10,))      # 10 etichete la întâmplare: 0 sau 1

model = nn.Sequential(nn.Linear(5, 32), nn.ReLU(), nn.Linear(32, 2))
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

for pas in range(1, 301):
    loss = criterion(model(X), y)   # toate cele 10 exemple, la fiecare pas
    loss.backward()
    optimizer.step()
    optimizer.zero_grad()
    if pas in [1, 100, 200, 300]:
        print(pas, round(loss.item(), 4))

print(model(X).argmax(dim=1))       # clasa aleasă pentru fiecare exemplu
print(y)                            # etichetele adevărate
# afișează:
# 1 0.6561
# 100 0.0047
# 200 0.0012
# 300 0.0006
# tensor([0, 0, 0, 0, 1, 1, 0, 0, 0, 1])
# tensor([0, 0, 0, 0, 1, 1, 0, 0, 0, 1])
```

`torch.randn(10, 5)` dă 10 rânduri cu câte 5 numere aleatoare în jurul lui 0. `torch.randint(0, 2, (10,))` dă 10 numere întregi de la 0 până la 2, fără 2 (ca la `range`), deci 0 sau 1. Etichetele sunt la întâmplare, deci nu există nicio regulă de învățat: rețeaua le poate doar memora, exact ce verifici. Toate cele 10 exemple intră la fiecare pas, fără DataLoader. Pentru fiecare exemplu, rețeaua dă două numere, câte un scor pentru fiecare clasă, iar `nn.CrossEntropyLoss` le face probabilități (Lecția 14).

Loss-ul pornește de la 0.66, aproape de -log(0.5) = 0.69, cât iei când dai 50% fiecărei clase, și ajunge la 0.0006. `argmax(dim=1)` alege pentru fiecare rând clasa cu scorul mai mare, iar predicțiile ies identice cu etichetele. Pe datele tale, faci testul cu modelul tău și cu primele 10 rânduri, `X_train[:10]` și `y_train[:10]`.

> [!NOTE]
> Dacă nici pe zece exemple modelul nu ajunge la loss aproape zero, ai un BUG, nu o problemă de capacitate sau de date. Capacitatea e cât de mult poate învăța un model și crește cu numărul de greutăți; pentru 10 exemple, aproape orice rețea are destulă. Nu are rost să antrenezi mai mult sau să mărești rețeaua. Ceva e stricat în cod, în date sau în conexiuni (felul în care sunt legate straturile între ele).

## Lista de verificări, în ordine
Dacă testul de overfit pe 10 exemple pică, treci prin lista asta, de sus în jos. Sunt cauzele cele mai frecvente, ordonate cam după cât de des apar.

1. Learning rate: prea mare (loss haotic sau NaN, rezultatul unui calcul scăpat de sub control, Lecția 15) sau prea mic (nu se mișcă). Încearcă altă valoare întâi, de 10 ori mai mică sau mai mare.
2. Normalizarea datelor: intrările sunt scalate? O rețea primește greu date pe intervale uriașe sau inconsistente. Standardizează coloanele (media 0, deviația 1, Lecția 5) și adu pixelii la 0..1 (Lecția 13).
3. Etichetele: sunt aliniate corect cu intrările? Ai amestecat ordinea? Ai funcția de loss potrivită tipului de problemă? Rândul i din X trebuie să aibă eticheta lui pe rândul i din y, iar dacă amesteci doar X, perechile se strică. Pentru clase folosești `nn.CrossEntropyLoss`, pentru numere `nn.MSELoss`.
4. zero_grad: chemi optimizer.zero_grad() la fiecare pas? Fără el, gradienții se adună și antrenarea o ia razna. În Lecția 14 ai văzut cum gradientul -6 devine -12.
5. Inițializare și gradienți: verifică dacă gradienții explodează (devin uriași) sau dispar (devin zero). Batch norm și inițializarea bună ajută.

Gradienții explodează sau dispar din cauza regulii lanțului din Lecția 14: backpropagation înmulțește gradientul cu câte un factor la fiecare strat. Dacă factorii sunt pe la 0.5, după 20 de straturi gradientul e înmulțit cu 0.5 la puterea 20, cam 0.000001, și primele straturi aproape nu mai învață. Dacă sunt pe la 2, e înmulțit cu 2 la puterea 20, cam un milion, iar pașii aruncă greutățile cât colo, până la NaN. Ca să verifici, după `loss.backward()` te uiți la mărimea gradienților, strat cu strat:

```
torch.manual_seed(0)                # aceeași rețea ca mai sus, neantrenată
X = torch.randn(10, 5)
y = torch.randint(0, 2, (10,))
model = nn.Sequential(nn.Linear(5, 32), nn.ReLU(), nn.Linear(32, 2))

loss = criterion(model(X), y)
loss.backward()                     # calculează gradienții, fără niciun pas
for nume, p in model.named_parameters():
    print(nume, round(p.grad.abs().mean().item(), 4))
# afișează:
# 0.weight 0.0087
# 0.bias 0.0119
# 2.weight 0.0539
# 2.bias 0.207
```

`named_parameters()` dă perechi (nume, tensor): `0.weight` sunt greutățile stratului de pe poziția 0 din `nn.Sequential`, iar `2.bias` termenii liberi ai stratului de pe poziția 2. `.abs()` ia valoarea absolută (fără semn), iar `.mean()` face media. Valori ca 0.01 sau 0.2 sunt normale. 0.0 la primele straturi înseamnă gradienți care dispar, iar mii sau milioane înseamnă gradienți care explodează.

## Cum citești curba de loss
Curba de loss e principalul instrument de diagnostic. Uită-te la ea, nu doar la scorul final. Fiecare formă îți spune altceva.

Curba are loss-ul pe verticală și epocile pe orizontală (Lecția 15), de obicei cu două linii: una pentru antrenare, una pentru validare. O curbă sănătoasă, la o clasificare cu două clase, arată cam așa de la o epocă la alta: 0.69, 0.45, 0.31, 0.24, 0.21, 0.20. Coboară repede la început, apoi tot mai încet, și se așază, cu validarea puțin deasupra antrenării.

- Loss plat de la început: învățarea nu pornește. Cel mai des, learning rate sau date. De exemplu 0.693, 0.693, 0.692, 0.693, adică exact -log(0.5): modelul dă 50% fiecărei clase și nu se clintește.
- Loss care explodează sau devine NaN: learning rate prea mare sau gradienți care explodează. De exemplu 0.69, 0.81, 3.5, 140, apoi nan.
- Loss de antrenare scade, cel de validare crește: overfitting, adaugă regularizare. De exemplu, antrenarea 0.60, 0.40, 0.25, 0.12, 0.05 și validarea 0.62, 0.48, 0.45, 0.50, 0.61: momentul bun e minimul validării, epoca 3, unde te-ar opri early stopping.
- Loss zgomotos dar în scădere: probabil normal, poate un batch size prea mic. De exemplu 0.90, 0.75, 0.82, 0.61, 0.66, 0.50: urcă și coboară de la o epocă la alta, dar tendința e în jos, iar loturile mici dau gradienți mai zgomotoși (Lecția 15).

Codul de mai jos produce a treia formă cu numere reale: doar 10 exemple de antrenare și o rețea mult prea mare pentru ele.

```
import torch
from torch import nn

torch.manual_seed(0)
X = torch.randn(110, 1)
Y = X + 0.5 * torch.randn(110, 1)        # o dreaptă, plus zgomot
X_train, y_train = X[:10], Y[:10]         # doar 10 exemple de antrenare
X_val, y_val = X[10:], Y[10:]             # 100 de exemple de validare

model = nn.Sequential(nn.Linear(1, 128), nn.ReLU(),
                      nn.Linear(128, 128), nn.ReLU(),
                      nn.Linear(128, 1))  # mult prea mare pentru 10 exemple
criterion = nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

for epoca in range(1, 401):
    model.train()
    loss = criterion(model(X_train), y_train)
    loss.backward()
    optimizer.step()
    optimizer.zero_grad()
    model.eval()
    with torch.no_grad():                 # validarea doar se măsoară
        val_loss = criterion(model(X_val), y_val).item()
    if epoca in [1, 25, 100, 200, 400]:
        print(epoca, round(loss.item(), 3), round(val_loss, 3))
# afișează (epoca, antrenare, validare):
# 1 0.749 0.628
# 25 0.082 0.203
# 100 0.059 1.142
# 200 0.048 3.949
# 400 0.025 5.119
```

La fiecare epocă, modelul face un pas pe cele 10 exemple, apoi `model.eval()` și `torch.no_grad()` (Lecția 15) măsoară loss-ul pe validare fără să schimbe nimic. Antrenarea coboară până la 0.025, dar validarea ajunge pe la 0.2 în primele epoci, apoi urcă până la 5.1: rețeaua a învățat pe de rost cele 10 puncte, cu zgomot cu tot. Ca să desenezi curbele, pui la fiecare epocă cele două valori în două liste și le dai lui `plt.plot` (Lecția 4).

# @practice
- Ia o rețea care nu învață și găsește cauza trecând prin listă, un pas pe rând.
- Reprodu overfitting-ul pe 10 exemple ca test de sănătate înainte de antrenarea reală.
- Desenează câteva curbe de loss (bune și rele) și învață să le recunoști din formă.
