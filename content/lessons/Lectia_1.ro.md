---
code: S1
duration: ~2h
---

# @intro
Prima sesiune are două jumătăți. Întâi limpezim ce înseamnă inteligența artificială, ca să știi despre ce vorbim tot anul. Apoi facem logistica: un loc unde scrii cod și un loc unde trimiți răspunsuri.

## Ce e AI și unde se folosește
Inteligența artificială e ideea de a face un program care rezolvă probleme fără să-i scrii tu, pas cu pas, regula pentru fiecare caz. În loc să-i spui „dacă e așa, fă asta”, îi arăți multe exemple și îl lași să găsească singur regula. Partea asta, de învățat din exemple, se numește machine learning, și e aproape tot ce faci la olimpiadă.

Un exemplu face diferența clară. Ca să deosebești un email spam de unul normal cu reguli scrise de mână, ai scrie sute de „dacă conține cuvântul X”. Cu machine learning, îi dai câteva mii de emailuri deja marcate spam sau nu, și modelul învață singur ce combinații de cuvinte prezic spamul.

- Clasificare: pui un label (spam sau nu, ce cifră e în imagine, pentru ce boală sunt specifice simptomele”).
- Regresie: prezici un număr (prețul unei case, temperatura de mâine).
- Clustering: găsești structura din date fără labeluri (ce clienți seamănă între ei).

> [!NOTE]
> La concursurile de AI, aproape orice problemă se reduce la asta: primești date cu exemple, antrenezi un model care învață din ele, și îl pui să prezică pe date noi.

## Ce e Python și de ce el
Python e limbajul standard în care se scrie cod de inteligență artificială. Nu pentru că ar fi cel mai rapid, ci pentru că are bibliotecile pe care le vrei deja scrise: NumPy pentru calcul numeric, Pandas pentru tabele, scikit-learn pentru modele clasice, PyTorch pentru rețele neuronale.

O bibliotecă reprezinta un cod scris de altcineva, pe care îl imporți și îl folosești. În loc să scrii tu algoritmul de sortare sau înmulțirea de matrice, chemi funcția potrivită. Cea mai mare parte din munca ta va fi să legi bibliotecile acestea între ele corect.

> [!NOTE]
> Instalează Python 3.11 (o versiune stabilă, larg suportată) și JupyterLab. Jupyter îți dă un notebook interactiv unde rulezi cod bucată cu bucată și vezi rezultatul imediat, exact ce vrei când explorezi date.

## Pune mediul la punct
Un mediu virtual e o cutie separată pentru bibliotecile unui proiect, ca să nu se bată cap în cap cu altele. Îl creezi o dată și lucrezi mereu în el. Pașii de mai jos îți dau un mediu curat cu tot ce ai nevoie la început.

1. Deschide un terminal în folderul de lucru.
2. Creează mediul: python3.11 -m venv .venv
3. Activează-l: source .venv/bin/activate (pe Windows: .venv\Scripts\activate).
4. Instalează uneltele: pip install numpy pandas matplotlib scikit-learn jupyterlab
5. Pornește Jupyter: jupyter lab

```
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LogisticRegression

print("numpy", np.__version__)
print("pandas", pd.__version__)
print("totul merge")
```
caption: Dacă rulează fără eroare, ești gata de treabă.

## Documentația offline
La concurs, mai toate etapele sunt offline: fără internet. Singurul lucru la care te poți uita e documentația locală, adică fișierele de ajutor ale bibliotecilor, salvate pe calculator.

Obișnuiește-te din timp să cauți în documentația offline. În Jupyter, pui un semn de întrebare după o funcție și îți arată ce face și ce argumente ia. E reflexul care îți salvează minute prețioase.

```
pd.read_csv?      # deschide ajutorul pentru read_csv
np.mean?          # ce face, ce argumente ia
```
caption: Semnul întrebării deschide documentația fără internet.

## Prima submisie, bucla completă
MLCompete (platform.olimpiada-ai.ro) e platforma pe care te antrenezi tot anul. Nitro AI Judge (judge.nitro-ai.org) e alta, pentru probleme de tip hackathon NLP. Fă-ți cont pe amândouă acum.

O competiție funcționează așa: descarci un set de date, antrenezi un model, produci un fișier cu predicțiile tale pentru datele de test, îl încarci, și primești un scor pe un clasament. Scopul primei tale submisii nu e scorul. E să vezi bucla întreagă măcar o dată.

1. Intră într-o competiție de antrenament și citește ce metrică se punctează.
2. Descarcă datele și deschide fișierul de exemplu de submisie, ca să vezi exact ce coloane și ce format cere.
3. Produ un fișier în același format, chiar și cu răspunsuri la întâmplare.
4. Încarcă-l și uită-te la scor.

> [!NOTE]
> Un model bun cu un fișier prost formatat ia zero. Formatul submisiei nu e un detaliu, e o condiție. Verifică-l de fiecare dată: numele coloanelor, ordinea, separatorul, dacă are sau nu antet.

# @takeaways
- AI la olimpiadă înseamnă machine learning: modelul învață regula din exemple, nu i-o scrii tu.
- Python plus câteva biblioteci fac tot: NumPy, Pandas, scikit-learn, PyTorch.
- Mediul și documentația offline se pregătesc acasă, nu în ziua concursului.
- Bucla de concurs: date in, fișier de predicții out, scor pe clasament.
- Formatul submisiei e o condiție de punctare, nu un detaliu.

# @pitfalls
- Fă-ți setup-ul cu câteva zile înainte, nu în seara dinaintea concursului.
- Verifică formatul submisiei înainte de model: un fișier bun ca model, dar prost formatat, ia zero.
- Antrenează-te offline, cu documentația locală, fiindcă în concurs n-ai internet.

# @practice
- Trimite o submisie validă pe o competiție de antrenament de pe MLCompete.
- Salvează documentația offline pentru numpy și pandas și caută în ea fără internet.
- Scrie de memorie pașii de la date la fișierul de submisie, fără să te uiți.
