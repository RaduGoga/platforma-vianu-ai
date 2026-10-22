---
code: S22
duration: ~1 săptămână
---

# @intro
Rar antrenezi o rețea de imagini de la zero. Iei un model preantrenat, adică antrenat deja de altcineva pe foarte multe imagini, și îl adaptezi la problema ta. De obicei e vorba de ImageNet: aproximativ 1.2 milioane de fotografii etichetate în 1000 de clase, de la rase de câini la fructe și unelte. Cu date puține, asta e diferența dintre un scor bun și unul jalnic. Modelul a învățat deja să vadă margini, texturi și forme; tu doar îl reorientezi spre clasele tale.

## De ce funcționează transferul
Un CNN antrenat pe multe imagini învață în straturile de jos (primele, cele mai aproape de imagine) trăsături generale: margini, colțuri, texturi. Astea sunt utile pentru aproape orice problemă de imagini, inclusiv pentru una pe care modelul n-a văzut-o niciodată. Straturile de sus (ultimele, aproape de ieșire) învață trăsături specifice (forme de câini, de mașini). Ideea transferului: păstrezi partea generală și rescrii doar partea specifică.

Să zicem că ai 300 de poze cu frunze, sănătoase sau bolnave. ImageNet nu are clasa „frunză bolnavă”, dar petele, marginile și texturile pe care modelul le recunoaște deja sunt exact ce-ți trebuie ca să le deosebești.

ResNet18, modelul din codul de mai jos, e un ResNet (Lecția 17) cu 18 straturi și aproximativ 11.7 milioane de parametri. Așa, în loc să antrenezi milioane de greutăți de la zero, cu milioane de imagini de care nu dispui, folosești ce a învățat deja modelul și antrenezi doar puțin, cu puține date. E cea mai practică tehnică din tot deep learning-ul de imagini.

## Feature extraction vs fine-tuning
Sunt două moduri de a adapta un model preantrenat, în funcție de cât de multe date ai.

- Feature extraction: îngheți toată rețeaua (nu se mai antrenează) și înlocuiești doar capul de clasificare, pe care îl antrenezi pe clasele tale. Rapid, potrivit când ai foarte puține date.
- Fine-tuning: dezgheți și straturile de sus ale rețelei și le antrenezi cu un learning rate mic, ca să le ajustezi fin spre problema ta. Poate da un scor mai bun, potrivit când ai date ceva mai multe.

Capul de clasificare e ultimul strat al rețelei, cel care dă câte un scor pentru fiecare clasă (Lecția 17). La ResNet se numește `net.fc` (de la fully connected) și duce de la 512 numere la 1000 de scoruri, câte unul pentru fiecare clasă din ImageNet. Problema ta are alte clase, deci îl înlocuiești cu unul nou.

Numele de feature extraction vine de la ce face rețeaua înghețată: extrage trăsături. Pentru fiecare imagine scoate 512 numere care o descriu, iar capul nou învață din ele, ca un model obișnuit pe un tabel cu 512 coloane.

A îngheța o greutate înseamnă `requires_grad = False`: PyTorch nu-i mai calculează gradientul. Fără gradient, optimizatorul n-are cu ce s-o miște la `optimizer.step()` (Lecția 14), deci rămâne exact cum a venit.

```
from torchvision import models
import torch
import torch.nn as nn

NUM_CLASE = 2                        # de exemplu: frunză sănătoasă / bolnavă

net = models.resnet18(weights="DEFAULT")
for p in net.parameters():
    p.requires_grad = False          # îngheață tot (feature extraction)
net.fc = nn.Linear(net.fc.in_features, NUM_CLASE)   # cap nou, antrenabil
print(net.fc)   # Linear(in_features=512, out_features=2, bias=True)

optimizer = torch.optim.Adam(net.fc.parameters(), lr=1e-3)   # doar capul
```

`weights="DEFAULT"` încarcă cele mai bune greutăți ImageNet pe care le are torchvision pentru ResNet18. `net.fc.in_features` e numărul de intrări ale capului vechi, 512 la ResNet18. Îl citești de acolo în loc să scrii 512 de mână, ca să meargă și cu alte modele (ResNet50 are 2048). `NUM_CLASE` e numărul tău de clase. Capul nou e creat după înghețare, deci greutățile lui au `requires_grad = True` și sunt singurele care se antrenează: 512 · 2 + 2 = 1026 de numere din peste 11 milioane. Optimizatorul primește doar `net.fc.parameters()`, adică greutățile capului, iar `lr=1e-3` e un learning rate de 0.001.

> [!NOTE]
> `weights="DEFAULT"` descarcă greutățile de pe internet prima dată când rulezi codul (la ResNet18, un fișier de aproximativ 45 MB) și le păstrează pe calculator pentru data viitoare. La ONIA, platforma îți rulează codul fără acces la internet (Lecția 6), deci descărcarea pică. Poți folosi un model preantrenat la concurs doar dacă regulamentul îl permite și fișierul cu greutăți e deja disponibil acolo unde rulează codul. Atunci creezi modelul cu `weights=None` (greutăți la întâmplare) și încarci fișierul cu `net.load_state_dict(torch.load("resnet18.pth"))`. Verifică regulile înainte de concurs, nu în timpul lui.

## Normalizarea: aceeași cu cea de la antrenare
Un model preantrenat a văzut imagini normalizate într-un anumit fel: scăzute și împărțite cu statisticile ImageNet (mediile și deviațiile pe cele trei canale). Concret, după ce pixelii au fost aduși între 0 și 1 (Lecția 13), pe fiecare canal s-a scăzut media și s-a împărțit la deviația standard, exact standardizarea din Lecția 5. Mediile, calculate pe pozele din ImageNet, sunt 0.485, 0.456 și 0.406 (roșu, verde, albastru), iar deviațiile standard sunt 0.229, 0.224 și 0.225.

Un pixel cu roșul 0.8 devine (0.8 - 0.485) / 0.229 ≈ 1.38, iar unul cu roșul exact 0.485 devine 0, adică „roșu obișnuit” pentru ImageNet. Dacă îi dai imagini normalizate altfel, intrarea nu seamănă cu ce a văzut el la antrenare și merge prost, uneori inexplicabil de prost.

În torchvision, pregătirea pozelor arată ca mai jos.

```
from PIL import Image
from torchvision import transforms

transform = transforms.Compose([
    transforms.Resize((224, 224)),           # mărimea pozelor din ImageNet
    transforms.ToTensor(),                   # 0..255 -> 0..1, forma (3, H, W)
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225]),
])

img = Image.new("RGB", (300, 200), (204, 128, 51))   # o poză de probă
x = transform(img)
print(x.shape)      # torch.Size([3, 224, 224])
print(x[:, 0, 0])   # tensor([ 1.3755,  0.2052, -0.9156])
```

`transforms.Compose` pune pașii în ordine, ca un Pipeline din Lecția 6. `Resize((224, 224))` aduce poza la 224x224, mărimea pe care s-a antrenat modelul. `ToTensor()` transformă poza Pillow (Lecția 4) într-un tensor cu valori între 0 și 1 și cu canalele primele, iar `Normalize` face scăderea și împărțirea pe fiecare canal. Poza de probă are peste tot culoarea (204, 128, 51), iar 204 / 255 = 0.8, deci primul număr e chiar (0.8 - 0.485) / 0.229 ≈ 1.3755. `x[:, 0, 0]` ia toate cele trei canale ale pixelului din colțul din stânga sus.

> [!NOTE]
> Când folosești un model preantrenat, normalizează imaginile exact cu statisticile pe care a fost antrenat (pentru ImageNet, mediile și deviațiile standard de mai sus). E o greșeală tăcută și frecventă: codul merge fără nicio eroare, doar scorul iese prost. Ca să fii sigur, poți lua pașii oficiali ai modelului cu `models.ResNet18_Weights.DEFAULT.transforms()`.

## Learning rate mic la fine-tuning
La fine-tuning, straturile preantrenate au deja greutăți bune. Dacă le antrenezi cu un learning rate mare, pașii mari strică exact trăsăturile valoroase pe care voiai să le păstrezi. Folosește un learning rate mic pentru ele, uneori și mai mic decât pentru capul nou. Așa le ajustezi fin, nu le distrugi.

În PyTorch, optimizatorul poate primi grupuri de parametri, fiecare cu learning rate-ul lui. Mai jos, ultimul bloc din corpul preantrenat (tot ce e înainte de cap) e dezghețat și primește pași de 10 ori mai mici decât capul nou. Restul corpului rămâne înghețat.

```
for p in net.layer4.parameters():
    p.requires_grad = True           # dezgheți ultimul bloc

optimizer = torch.optim.AdamW([
    {"params": net.layer4.parameters(), "lr": 1e-4},   # corp: pași mici
    {"params": net.fc.parameters(), "lr": 1e-3},       # cap: pași mai mari
])
```

Corpul ResNet18 are patru blocuri mari, `net.layer1` până la `net.layer4`, iar `net.layer4` e cel mai aproape de cap. AdamW e optimizatorul din Lecția 15. Fiecare dicționar din listă e un grup: `"params"` spune ce greutăți conține, iar `"lr"` cu ce learning rate le mișcă. 1e-4 înseamnă 0.0001, de 10 ori mai puțin decât 1e-3.

# @practice
- Adaptează un ResNet la o problemă cu puține imagini prin feature extraction.
- Compară feature extraction cu fine-tuning pe același set și vezi când merită fiecare.
- Verifică ce se întâmplă cu scorul dacă scoți normalizarea corectă a imaginilor.
