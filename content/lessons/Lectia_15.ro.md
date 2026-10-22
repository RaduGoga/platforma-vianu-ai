---
code: S19
duration: ~1 săptămână
---

# @intro
Un model bun antrenat prost nu învață. Modulul ăsta e despre bucla de antrenare din Lecția 14 (forward, backward, step, zero_grad): cum alegi optimizatorul, cum reglezi learning rate-ul (butonul cel mai important), și cum ții overfitting-ul sub control. Overfitting înseamnă că modelul a învățat pe de rost exemplele de antrenare și greșește pe date noi (Lecția 1). Aceleași straturi, antrenate cu grijă sau la nimereală, dau rezultate complet diferite.

## Epoci, loturi, pași
Trei cuvinte de fixat. Un lot (batch) e un grup mic de exemple pe care le procesezi deodată. O epocă e o trecere completă prin tot setul de antrenare. Un pas (step) e o actualizare a greutăților, adică un lot procesat. Antrenezi de obicei multe epoci, fiecare cu mulți pași.

Cu numere: ai 1000 de exemple de antrenare și loturi de câte 100 (batch size, mărimea lotului, e 100). O epocă are 1000 / 100 = 10 pași. Dacă antrenezi 20 de epoci, faci 20 · 10 = 200 de pași: greutățile se actualizează de 200 de ori, iar fiecare exemplu e văzut de 20 de ori. În exemplul complet din Lecția 14 erau 200 de exemple, loturi de 20 și 100 de epoci, deci 10 pași pe epocă și 1000 în total.

De ce loturi și nu tot setul deodată? Pentru că e mai rapid și adaugă un zgomot util care ajută modelul să nu se blocheze. De ce nu câte un exemplu? Pentru că loturile folosesc mai bine hardware-ul. Un batch size între 32 și 256 e tipic.

Mai rapid, pentru că la o trecere prin date modelul se corectează de 10 ori, nu o singură dată. Zgomotul vine din faptul că gradientul calculat pe 100 de exemple e doar o estimare a celui pe toate 1000, puțin diferită de la un lot la altul. Pașii nu merg perfect drept spre minim, ci ușor în zigzag, iar zigzagul poate scoate modelul dintr-o groapă mică a loss-ului, unde altfel s-ar bloca.

Hardware-ul e partea fizică a calculatorului. Rețelele se antrenează de obicei pe placa video (GPU), care face mii de înmulțiri în paralel, iar cu un singur exemplu cea mai mare parte din ea ar sta degeaba. Un lot de 64 de exemple se calculează mult mai repede decât 64 de exemple luate pe rând, la fel ca la vectorizarea din Lecția 4.

## Optimizatoare
Optimizatorul decide cum folosește gradienții ca să actualizeze greutățile; el face `optimizer.step()` în bucla din Lecția 14. SGD (coborâre pe gradient stochastică) cu momentum e solid și de încredere: momentum-ul adaugă inerție, ca o bilă care se rostogolește, ca să treacă peste denivelări mici.

SGD simplu e chiar regula din Lecția 14, w ← w - η · ∂L/∂w. Stochastic înseamnă „cu o parte de întâmplare”: gradientul nu e calculat pe tot setul, ci pe un lot ales la întâmplare. Cu momentum, fiecare pas păstrează o parte din pasul de dinainte, de obicei 90% (`momentum=0.9`). Când gradienții arată mereu în aceeași direcție, pașii se lungesc, iar când se contrazic de la un lot la altul, se anulează parțial și zigzagul se domolește.

Adam și AdamW se adaptează singure: dau pași mai mari unde e nevoie și mai mici unde nu. Concret, Adam ține socoteala, pentru fiecare greutate, cât de mari sunt de obicei gradienții ei și împarte la mărimea asta, așa că înaintează și greutățile cu gradienți mici. Pornesc mai ușor și cer mai puțin reglaj, de aceea sunt alegerea implicită pentru mulți. AdamW gestionează mai corect weight decay-ul. Începe cu Adam/AdamW dacă nu ești sigur.

Weight decay (micșorarea greutăților) trage la fiecare pas fiecare greutate puțin spre 0, cu atât mai tare cu cât e mai mare. Îl reglezi cu un număr, de exemplu `weight_decay=0.01`. Când îi dai weight decay lui Adam, el adaugă micșorarea la gradient, iar pașii lui adaptivi o deformează. AdamW o aplică separat, direct pe greutăți, de aceea e mai corect.

```
import torch
from torch import nn

model = nn.Linear(10, 1)      # orice model; aici, un singur strat
sgd = torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.9)
adam = torch.optim.Adam(model.parameters(), lr=0.001)
adamw = torch.optim.AdamW(model.parameters(), lr=0.001, weight_decay=0.01)
```

Într-un program creezi unul singur, nu pe toate trei. Fiecare primește `model.parameters()`, greutățile pe care le mută, și `lr`, learning rate-ul. Valorile din cod sunt puncte de pornire obișnuite.

## Learning rate, butonul cel mai important
Learning rate-ul (η) e mărimea pasului la fiecare actualizare. E cel mai important hiperparametru din tot deep learning-ul (hiperparametru: o setare pe care o alegi tu înainte de antrenare, Lecția 9). Prea mare: loss-ul sare haotic sau explodează, modelul diverge. Prea mic: învață dureros de lent sau se blochează înainte să ajungă undeva bun.

A diverge înseamnă că modelul, în loc să se apropie de minim, se depărtează tot mai mult de el, iar loss-ul crește de la un pas la altul. Codul de mai jos reia exemplul din Lecția 14, L(w) = (w - 3)² cu pornire din w = 0, și face 20 de pași cu trei learning rate-uri.

```
for eta in [1.1, 0.1, 0.001]:
    w = 0.0
    for pas in range(20):
        w = w - eta * 2 * (w - 3)       # pasul din Lecția 14
    print(eta, round((w - 3) ** 2, 4))  # loss-ul după 20 de pași
# afișează:
# 1.1 13227.9441
# 0.1 0.0012
# 0.001 8.3074
```

Cu 1.1, fiecare pas sare peste 3, tot mai departe (w = 6.6, apoi -1.32, apoi 8.18), iar după 20 de pași loss-ul trece de 13000: a divergat. Cu 0.1 ajunge la 0.0012. Cu 0.001 abia s-a mișcat, de la 9 la 8.31.

Nu-l ghici, caută-l. Încearcă valori pe o scară logaritmică (de exemplu 0.1, 0.01, 0.001) și uită-te la curba de loss. Vrei cel mai mare learning rate cu care loss-ul încă scade lin, nu haotic.

Pe o scară logaritmică, fiecare valoare e de 10 ori mai mică decât cea dinainte. Așa acoperi în câteva încercări tot intervalul util, de la 1 la 0.00001, pe când între 0.1 și 0.09 diferența abia se simte. Curba de loss e graficul cu loss-ul pe verticală și pașii sau epocile pe orizontală. Nu e curba de învățare din Lecția 8, unde pe orizontală era cantitatea de date. Cu un learning rate bun, curba coboară repede la început, apoi tot mai încet, și se așază. Cu unul prea mare, sare în sus și în jos sau urcă. Cu unul prea mic, coboară aproape plat.

Scheduler-ele schimbă learning rate-ul în timpul antrenării. O rețetă care merge des: un warmup scurt la început (crești rata treptat, ca să nu destabilizezi), urmat de o scădere lină (cosine) spre final, ca să te așezi fin în minim.

Warmup înseamnă „încălzire”: la pornire greutățile sunt aleatoare, iar primii gradienți pot fi mari și haotici. Așa că începi cu un pas mic și îl crești treptat, de exemplu de la 0.01 la 0.1 în primii 10 pași. Cosine: după warmup, learning rate-ul coboară lin spre 0 după forma funcției cosinus de la trigonometrie, încet la început, mai repede pe la mijloc și iar încet la final. Pașii mici de la final nu mai sar peste minim, ci se așază în el.

```
import torch
from torch import nn
from torch.optim import lr_scheduler

model = nn.Linear(10, 1)
optimizer = torch.optim.SGD(model.parameters(), lr=0.1)

# primii 10 pași: warmup, lr urcă de la 0.01 la 0.1
warmup = lr_scheduler.LinearLR(optimizer, start_factor=0.1, total_iters=10)
# următorii 90 de pași: cosine, lr coboară lin spre 0
cosine = lr_scheduler.CosineAnnealingLR(optimizer, T_max=90)
scheduler = lr_scheduler.SequentialLR(optimizer, [warmup, cosine],
                                      milestones=[10])

for pas in range(100):
    lr = scheduler.get_last_lr()[0]    # lr-ul folosit la pasul ăsta
    if pas in [0, 5, 10, 55, 99]:
        print(pas, round(lr, 4))
    # ... forward, loss.backward() ...
    optimizer.step()
    optimizer.zero_grad()
    scheduler.step()                   # pregătește lr-ul pasului următor
# afișează:
# 0 0.01
# 5 0.055
# 10 0.1
# 55 0.05
# 99 0.0
```

`LinearLR` face warmup-ul: înmulțește lr-ul cu un factor care urcă de la 0.1 la 1 în 10 pași. `CosineAnnealingLR` face coborârea, în `T_max=90` de pași. `SequentialLR` le pune unul după altul: primul până la pasul 10 (`milestones=[10]`), apoi al doilea. `get_last_lr()` dă lista cu lr-ul curent, iar `[0]` ia primul element. `scheduler.step()` se cheamă o dată pe pas, după `optimizer.step()`. La pasul 99, lr-ul e 0.00003, de aceea apare rotunjit la 0.0.

> [!NOTE]
> Dacă antrenarea o ia razna sau loss-ul devine NaN, primul lucru pe care îl încerci e să scazi learning rate-ul. De cele mai multe ori asta e cauza. NaN (not a number, „nu e un număr”) e rezultatul unui calcul fără sens. Apare, de exemplu, când greutățile cresc atât de mult încât trec de cel mai mare număr pe care îl poate ține calculatorul și devin infinit, iar programul ajunge să calculeze infinit minus infinit. Odată apărut, se întinde: orice calcul cu NaN dă tot NaN, deci loss-ul rămâne `nan` până la final.

## Regularizarea: ține overfitting-ul în frâu
Regularizarea e orice tehnică prin care împiedici modelul să memoreze antrenarea. Fără ea, o rețea mare învață pe de rost exemplele și cade pe date noi. Ai mai multe unelte, folosite des împreună:

- Dropout: la antrenare, oprește aleator o parte din neuroni la fiecare pas. Forțează rețeaua să nu se bazeze pe un singur drum, deci generalizează mai bine, adică merge bine și pe date pe care nu le-a văzut.
- Weight decay: penalizează greutățile mari, ținându-le mici și modelul simplu. E micșorarea spre 0 de la optimizatoare: cu greutăți mici, predicția nu sare brusc la o schimbare mică a intrării, deci modelul nu poate urmări fiecare detaliu al unui exemplu.
- Batch normalization: normalizează activările în fiecare lot, stabilizează și accelerează antrenarea. Activările sunt ieșirile neuronilor după funcția de activare, numerele care trec de la un strat la altul.
- Early stopping: oprești când scorul pe validare începe să se înrăutățească, chiar dacă cel pe antrenare încă scade. L-ai văzut la boosting, în Lecția 9.

Dropout cu p = 0.5 înseamnă că, la fiecare pas, fiecare neuron dă 0 cu șansa de 50%, deci în medie jumătate dintre ei tac, de fiecare dată alții. La predicție se folosesc toți neuronii, iar `model.eval()` e comanda care trece modelul în modul ăsta. Codul de mai jos aplică dropout pe 8 activări egale cu 1.

```
import torch
from torch import nn

torch.manual_seed(0)
drop = nn.Dropout(p=0.5)
x = torch.ones(8)          # 8 activări, toate egale cu 1

drop.train()               # modul de antrenare
print(drop(x))             # tensor([0., 0., 2., 0., 0., 0., 2., 2.])
print(drop(x))             # tensor([0., 2., 2., 2., 2., 0., 2., 2.])
drop.eval()                # modul de predicție
print(drop(x))             # tensor([1., 1., 1., 1., 1., 1., 1., 1.])
```

La primul pas au rămas 3 activări din 8, la al doilea 6 din 8: jumătatea e doar o medie. Cele rămase sunt înmulțite cu 2, adică 1 / (1 - 0.5), ca suma să fie în medie aceeași ca la predicție, când nu se oprește nimic. Pe un model întreg, `model.train()` și `model.eval()` schimbă modul tuturor straturilor lui.

Batch norm aplică standardizarea din Lecția 5 pe fiecare lot: scade media lotului și împarte la deviația standard. Dacă un neuron dă 2, 4 și 6 pe cele 3 exemple ale unui lot, după batch norm dă -1.22, 0 și 1.22, cu media 0 și deviația 1. Apoi stratul învață, pentru fiecare neuron, două numere cu care poate întinde și muta rezultatul. La predicție, după `model.eval()`, folosește media și deviația adunate în timpul antrenării, nu pe ale lotului curent. Într-o rețea, cele două straturi stau așa:

```
import torch
from torch import nn

model = nn.Sequential(
    nn.Linear(20, 64),
    nn.BatchNorm1d(64),   # normalizează cele 64 de activări pe fiecare lot
    nn.ReLU(),
    nn.Dropout(p=0.5),    # la antrenare, în medie jumătate devin 0
    nn.Linear(64, 2),
)
```

`nn.Sequential` e un `nn.Module` gata făcut: trece datele prin straturi în ordinea în care le scrii, fără să mai scrii tu `forward`.

Early stopping cu răbdare: loss-ul de validare mai sare puțin de la o epocă la alta, așa că nu te oprești la prima înrăutățire. Aștepți un număr de epoci numit răbdare (patience) și te oprești doar dacă în tot timpul ăsta n-a apărut un loss de validare mai bun. Cu răbdarea 3 și loss-ul de validare 0.50, 0.42, 0.38, 0.39, 0.37, 0.40, 0.41, 0.43, cel mai bun e 0.37, la epoca 5. Urmează 3 epoci fără ceva mai bun, așa că te oprești după epoca 8 și păstrezi greutățile din epoca 5. Schița de mai jos face asta în cod, cu răbdarea 5.

```
def evalueaza(model):
    model.eval()                # dropout oprit, batch norm pentru predicție
    with torch.no_grad():       # doar măsori, fără gradienți
        return criterion(model(X_val), y_val).item()

cel_mai_bun = float("inf")      # mai mare decât orice loss
rabdare = 5                     # câte epoci aștepți fără progres
fara_progres = 0
for epoca in range(1, 201):
    antreneaza_o_epoca(model)   # bucla din Lecția 14, o dată prin date
    val_loss = evalueaza(model)
    if val_loss < cel_mai_bun:
        cel_mai_bun = val_loss
        torch.save(model.state_dict(), "cel_mai_bun.pt")
        fara_progres = 0
    else:
        fara_progres += 1
        if fara_progres == rabdare:
            break               # 5 epoci la rând fără progres: te oprești

model.load_state_dict(torch.load("cel_mai_bun.pt"))
```

`antreneaza_o_epoca` o scrii tu: e bucla din Lecția 14, pusă într-o funcție care începe cu `model.train()`. `evalueaza` măsoară loss-ul pe datele de validare (`X_val`, `y_val`). `with torch.no_grad():` îi spune lui PyTorch să nu mai urmărească operațiile pentru gradienți, fiindcă aici doar măsori. `float("inf")` e infinitul, mai mare decât orice loss, ca prima epocă să iasă sigur cea mai bună de până atunci. `model.state_dict()` e dicționarul cu toate greutățile modelului: `torch.save` îl scrie într-un fișier, iar la final `load_state_dict` pune înapoi greutățile din epoca cea mai bună.

Inițializarea greutăților contează mai mult decât pare la început. Inițializarea înseamnă valorile cu care pornesc greutățile, înainte de primul pas: PyTorch le alege la întâmplare și mici, de aceea `torch.manual_seed` face rezultatele repetabile. Greutăți pornite prost pot bloca antrenarea de la zero. Dacă toate greutățile unui strat ar porni de la aceeași valoare, toți neuronii lui ar calcula același lucru și ar primi același gradient, deci ar rămâne copii unul al altuia: 64 de neuroni care se poartă ca unul. Din fericire, straturile din PyTorch au inițializări bune implicit, deci rar trebuie să intervii, dar merită să știi că e un factor.

# @practice
- Testează trei learning rate-uri pe o scară logaritmică și desenează curbele de loss.
- Adaugă dropout și early stopping la o rețea și vezi efectul pe validare.
- Compară SGD cu momentum și Adam pe aceeași problemă mică.
