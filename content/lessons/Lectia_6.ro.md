---
code: S5
duration: ~1 săptămână
---

# @intro
Până acum ai învățat bucăți: Python, NumPy, Pandas, EDA și preprocesare. Modulul ăsta le leagă. Nu aduce teorie nouă, ci ordinea în care se fac lucrurile. Contează, pentru că majoritatea greșelilor de la olimpiadă nu vin din model, ci din pași făcuți în ordine greșită. Un pipeline pe care îl poți rula cap-coadă în douăzeci de minute e cea mai valoroasă unealtă pe care o duci în concurs.

## Cei șase pași, în ordine
Orice problemă tabelară de concurs arată la fel dacă o privești de sus. Citești datele. Le împarți. Faci un baseline. Preprocesezi. Antrenezi și validezi. Scrii submisia.

Ordinea nu e o sugestie. Fiecare pas presupune că cel dinainte s-a făcut corect, iar doi dintre ei sunt ușor de inversat din grabă: împărțirea datelor și preprocesarea. Dacă le inversezi, scorul tău local devine o minciună și afli abia pe clasamentul privat.

- Citești și te uiți la ce ai primit.
- Împarți în antrenare și validare.
- Faci un baseline prost, ca să ai un reper.
- Preprocesezi, cu parametri învățați doar pe antrenare.
- Antrenezi un model și îl compari cu baseline-ul.
- Scrii fișierul de submisie și îl verifici înainte de upload.

## Pasul 1: citești și te uiți
Primul lucru după citire e să verifici că datele arată cum crezi. Câte rânduri, ce coloane, ce tip are fiecare, cum arată ținta. Nu e analiză completă, pentru asta ai lecția de EDA. E doar verificarea că n-ai citit greșit fișierul.

```
import pandas as pd

train = pd.read_csv("train.csv")
test = pd.read_csv("test.csv")

print(train.shape, test.shape)
print(train.dtypes)
print(train["target"].value_counts())
```

Compară coloanele din train cu cele din test. Diferența dintre ele e, aproape întotdeauna, chiar coloana țintă. Dacă mai lipsește ceva, ai o problemă de înțeles înainte să mergi mai departe.

## Pasul 2: împarți datele înainte să le atingi
Aici se pierd cele mai multe puncte. Ai nevoie de o parte din date pe care modelul să n-o fi văzut niciodată, ca să estimezi cinstit cât de bun e. Împărțirea se face înainte de orice transformare.

```
from sklearn.model_selection import train_test_split

# id-ul e doar un număr de rând, nu o informație despre el
X = train.drop(columns=["id", "target"])
y = train["target"]

X_tr, X_val, y_tr, y_val = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
```

Parametrul stratify păstrează aceeași proporție de clase în ambele bucăți. Fără el, pe o problemă dezechilibrată poți nimeri o validare care nu conține deloc clasa rară, iar scorul devine fără sens.

> [!NOTE]
> random_state fixat înseamnă că aceeași împărțire se repetă la fiecare rulare. Fără el, scorul se schimbă între rulări și nu mai știi dacă o modificare a ajutat sau ai avut noroc.

## Pasul 3: baseline-ul prost dar onest
Înainte de orice model serios, fă unul stupid. Prezice mereu clasa majoritară, sau media, și măsoară. Numărul ăla e podeaua ta: orice model care nu-l bate e mai rău decât nimic.

```
from sklearn.dummy import DummyClassifier
from sklearn.metrics import f1_score

dummy = DummyClassifier(strategy="most_frequent").fit(X_tr, y_tr)
print(f1_score(y_val, dummy.predict(X_val), average="macro"))
```

Pare o pierdere de timp. Nu e. De multe ori un model complicat scoate un scor care pare rezonabil, până compari cu baseline-ul și descoperi că e la fel sau mai prost. Fără reper, n-ai fi știut.

## Pasul 4: preprocesarea care nu se scurge
Regula de la preprocesare: parametrii (medie, deviație, categorii) se învață doar pe antrenare. Problema e că, făcută manual, regula asta se încalcă ușor.

Soluția e Pipeline. Legi preprocesarea de model într-un singur obiect, iar când chemi fit pe el, scikit-learn are grijă singur ca transformările să învețe doar pe ce-i dai la antrenare.

```
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier

numerice = X_tr.select_dtypes(include="number").columns
categorice = X_tr.select_dtypes(exclude="number").columns

pre = ColumnTransformer([
    ("num", Pipeline([
        ("imp", SimpleImputer(strategy="median")),
        ("sc", StandardScaler()),
    ]), numerice),
    ("cat", Pipeline([
        ("imp", SimpleImputer(strategy="most_frequent")),
        ("oh", OneHotEncoder(handle_unknown="ignore")),
    ]), categorice),
])

model = Pipeline([("pre", pre), ("clf", RandomForestClassifier(random_state=42))])
```

Argumentul handle_unknown contează în concurs: dacă în test apare o categorie care nu era în antrenare, fără el codul crapă la predicție, exact când n-ai timp să depanezi.

## Pasul 5: antrenezi și compari
Acum ai un obiect care face totul. Îl antrenezi pe bucata de antrenare și îl măsori pe validare, cu aceeași metrică pe care o folosește concursul.

```
model.fit(X_tr, y_tr)
scor = f1_score(y_val, model.predict(X_val), average="macro")
print(f"model: {scor:.4f}")
```

Metrica trebuie să fie cea din enunț. Dacă concursul punctează cu F1 macro și tu optimizezi acuratețea, urci pe scorul tău local și cobori pe al lor.

> [!NOTE]
> Schimbă un singur lucru între două rulări și notează scorul de fiecare dată. Un tabel cu zece rânduri, chiar și scris pe hârtie, valorează mai mult decât zece idei încercate deodată din care nu știi care a ajutat.

## Pasul 6: submisia și verificările
La final reantrenezi pe toate datele de antrenare, nu doar pe bucata de optzeci la sută. Ai folosit validarea ca să alegi, acum nu mai ai motiv să arunci acele exemple.

```
model.fit(X, y)
pred = model.predict(test.drop(columns=["id"]))

sub = pd.DataFrame({"id": test["id"], "target": pred})
sub.to_csv("submission.csv", index=False)
```

Înainte de upload, trei verificări care au salvat multe concursuri: numărul de rânduri e egal cu al fișierului de test, numele coloanelor sunt exact cele cerute în enunț, și nu ai valori lipsă în predicții.

```
assert len(sub) == len(test)
assert list(sub.columns) == ["id", "target"]
assert sub["target"].isna().sum() == 0
```

Și mai sigur e să pornești de la fișierul de exemplu din enunț: îl citești, verifici că rândurile sunt în aceeași ordine ca în test, schimbi doar coloana țintă și îl salvezi. Așa, numele și ordinea coloanelor sunt sigur cele cerute.

```
sub = pd.read_csv("sample_submission.csv")
assert (sub["id"] == test["id"]).all()
sub["target"] = pred
sub.to_csv("submission.csv", index=False)
```

Dacă metrica e AUC sau log loss, trimiți probabilități, nu clase: `model.predict_proba(...)[:, 1]` îți dă probabilitatea clasei pozitive.

## Cum arată asta în ziua concursului
Prima oră o dai pe pipeline-ul de mai sus, cu un model simplu. Ai deja o submisie validă și un scor pe clasament. De acolo îmbunătățești, cu plasa de siguranță că orice s-ar întâmpla ai ceva trimis.

Ordinea inversă, în care lucrezi două ore la un model bun și abia apoi te apuci de submisie, e cel mai frecvent mod de a termina concursul cu zero puncte pentru cod care mergea aproape.

La ONIA trimiți și codul care a produs fișierul, iar platforma îl rulează fără acces la internet. Înainte de fiecare submisie rulează Restart Kernel and Run All Cells, ca să fii sigur că notebook-ul merge de la zero, și citește datele cu căi relative. Spre final alegi cele două submisii care contează: de obicei cea mai bună pe validarea locală și una mai sigură, cu un model mai simplu.

# @practice
- Ia o problemă de arhivă de pe MLCompete și scrie pipeline-ul cap-coadă într-o oră, cu model simplu.
- Rulează același pipeline o dată cu scalare înainte de split și o dată după, și compară scorurile de validare.
- Scrie-ți un notebook șablon cu cei șase pași, pe care să-l copiezi la începutul oricărei probleme.
- [House Prices pe Kaggle](https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques)
- [Kaggle Learn: Intermediate Machine Learning](https://www.kaggle.com/learn/intermediate-machine-learning)
