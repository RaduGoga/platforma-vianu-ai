---
code: S5
duration: ~1 săptămână
---

# @intro
Până acum ai învățat bucăți: Python, NumPy, Pandas, EDA și preprocesare. Modulul ăsta le leagă. Nu aduce teorie nouă, ci ordinea în care se fac lucrurile. Contează, pentru că majoritatea greșelilor de la olimpiadă nu vin din model, ci din pași făcuți în ordine greșită. Șirul de pași care te duce de la fișierele primite la fișierul de submisie se numește pipeline. Un pipeline pe care îl poți rula cap-coadă în douăzeci de minute e cea mai valoroasă unealtă pe care o duci în concurs.

## Cei șase pași, în ordine
Orice problemă tabelară de concurs, cu datele într-un tabel ca un fișier CSV, arată la fel dacă o privești de sus. Citești datele. Le împarți. Faci un baseline, adică un model de reper, cât se poate de simplu. Preprocesezi. Antrenezi și validezi. Scrii submisia.

Ordinea nu e o sugestie. Fiecare pas presupune că cel dinainte s-a făcut corect, iar doi dintre ei sunt ușor de inversat din grabă: împărțirea datelor și preprocesarea. Dacă le inversezi, preprocesarea învață și din rândurile de validare, adică scurgerea de date din Lecția 5. Scorul tău local devine o minciună și afli abia pe clasamentul privat.

- Citești și te uiți la ce ai primit.
- Împarți în antrenare și validare.
- Faci un baseline prost, ca să ai un reper.
- Preprocesezi, cu parametri învățați doar pe antrenare.
- Antrenezi un model și îl compari cu baseline-ul.
- Scrii fișierul de submisie și îl verifici înainte de upload.

## Pasul 1: citești și te uiți
Primul lucru după citire e să verifici că datele arată cum crezi. Câte rânduri, ce coloane, ce tip are fiecare, cum arată ținta. Nu e analiză completă, pentru asta ai Lecția 5, despre EDA. E doar verificarea că n-ai citit greșit fișierul.

```
import pandas as pd

train = pd.read_csv("train.csv")
test = pd.read_csv("test.csv")

print(train.shape, test.shape)
print(train.dtypes)
print(train["target"].value_counts())
```

`train.shape` îți dă numărul de rânduri și de coloane, de exemplu `(1000, 6)`. `train.dtypes` arată tipul fiecărei coloane, iar coloanele cu text apar ca `object` sau `str`, după versiunea de pandas. `value_counts()` numără câte rânduri are fiecare clasă a țintei.

Compară coloanele din train cu cele din test. Diferența dintre ele e, aproape întotdeauna, chiar coloana țintă. Dacă mai lipsește ceva, ai o problemă de înțeles înainte să mergi mai departe. Cel mai repede o vezi cu diferența de mulțimi din Lecția 3: `set(train.columns) - set(test.columns)` îți dă coloanele care sunt în train și lipsesc din test.

## Pasul 2: împarți datele înainte să le atingi
Aici se pierd cele mai multe puncte. Ai nevoie de o parte din date pe care modelul să n-o fi văzut niciodată, ca să estimezi cinstit cât de bun e. Împărțirea (în engleză, split) se face înainte de orice transformare. De aici vin `X_train` și `X_val` din Lecția 5.

```
from sklearn.model_selection import train_test_split

# id-ul e doar un număr de rând, nu o informație despre el
X = train.drop(columns=["id", "target"])
y = train["target"]

X_tr, X_val, y_tr, y_val = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
```

`X` primește toate coloanele în afară de `id` și țintă, adică trăsăturile (features), coloanele de intrare. `y` primește ținta. `train_test_split` amestecă rândurile, le împarte în două și întoarce patru bucăți: trăsăturile și ținta pentru antrenare (`X_tr` și `y_tr`, prescurtări de la `X_train` și `y_train`), apoi aceleași pentru validare (`X_val` și `y_val`). `test_size=0.2` trimite 20% din rânduri în validare, iar restul de 80% rămân pentru antrenare.

Argumentul `stratify` păstrează aceeași proporție de clase în ambele bucăți. Fără el, pe o problemă dezechilibrată poți nimeri o validare care nu conține deloc clasa rară, iar scorul devine fără sens.

Să zicem că din 1000 de rânduri, 100 sunt din clasa rară, adică 10%. Cu `stratify=y`, validarea primește 200 de rânduri, dintre care exact 20 rare, iar antrenarea 800, dintre care 80 rare: 10% în ambele. Fără `stratify`, numărul de rânduri rare din validare se schimbă de la o împărțire la alta, de exemplu 12 sau 26.

> [!NOTE]
> `random_state` fixat înseamnă că aceeași împărțire se repetă la fiecare rulare. Fără el, scorul se schimbă între rulări și nu mai știi dacă o modificare a ajutat sau ai avut noroc. E aceeași idee ca seed-ul din Lecția 3, iar 42 nu are nimic special: contează doar să rămână același.

## Pasul 3: baseline-ul prost dar onest
Înainte de orice model serios, fă unul stupid. Prezice mereu clasa majoritară, adică pe cea cu cele mai multe rânduri, sau media țintei, dacă prezici un număr, și măsoară. Numărul ăla e podeaua ta: orice model care nu-l bate e mai rău decât nimic.

```
from sklearn.dummy import DummyClassifier
from sklearn.metrics import f1_score

dummy = DummyClassifier(strategy="most_frequent").fit(X_tr, y_tr)
print(f1_score(y_val, dummy.predict(X_val), average="macro"))
```

`DummyClassifier(strategy="most_frequent")` e un model care nici nu se uită la trăsături. La `fit` reține doar clasa cea mai frecventă din `y_tr`, iar `predict` o dă pentru fiecare rând. `f1_score` primește întâi răspunsurile corecte, apoi predicțiile.

F1 e un scor între 0 și 1, iar mai mare e mai bine. Spre deosebire de acuratețe, nu se lasă păcălit de o clasă rară. `average="macro"` calculează F1 separat pe fiecare clasă și face media lor, deci clasa rară contează cât cea mare. Îl explicăm pe larg în Lecția 8. Cu 90% din rânduri într-o clasă și 10% în cealaltă, baseline-ul are 90% acuratețe, dar F1 macro doar 0.47: aproape 0.95 pe clasa mare și 0 pe cea rară.

Pare o pierdere de timp. Nu e. De multe ori un model complicat scoate un scor care pare rezonabil, până compari cu baseline-ul și descoperi că e la fel sau mai prost. Fără reper, n-ai fi știut.

## Pasul 4: preprocesarea care nu se scurge
Regula de la preprocesare, din Lecția 5: parametrii (medie, deviație, categorii) se învață doar pe antrenare. Problema e că, făcută manual, regula asta se încalcă ușor.

Soluția e Pipeline. Legi preprocesarea de model într-un singur obiect, iar când chemi `fit` pe el, scikit-learn are grijă singur ca transformările să învețe doar pe ce-i dai la antrenare.

Gândește-te la o bandă de asamblare: fiecare rând trece prin aceiași pași, în aceeași ordine. La `fit`, fiecare pas învață din datele de antrenare, le transformă și le dă pasului următor, iar la capăt modelul se antrenează pe ce a primit. La `predict`, rândurile noi trec prin aceiași pași, doar cu `transform`, cu numerele învățate la antrenare.

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

model = Pipeline([
    ("pre", pre),
    ("clf", RandomForestClassifier(random_state=42)),
])
```

`select_dtypes(include="number")` alege coloanele cu numere, iar `exclude="number"` pe toate celelalte, adică pe cele cu text. `.columns` păstrează doar numele lor.

`ColumnTransformer` trimite fiecare grup de coloane pe banda lui. Primește o listă de tuple cu câte trei elemente: un nume ales de tine, pașii și coloanele. Coloanele numerice își umplu golurile cu mediana, apoi sunt standardizate. Cele cu text își umplu golurile cu valoarea cea mai frecventă, apoi trec prin one-hot. Un `Pipeline` primește perechi (nume, pas), în ordinea în care se execută. `OneHotEncoder` face același one-hot ca `pd.get_dummies` din Lecția 5, dar ține minte categoriile văzute la `fit`.

`RandomForestClassifier` e modelul de la capătul benzii, iar `clf` e prescurtarea obișnuită de la classifier (clasificator). E un model format din mulți arbori de decizie care votează, explicat în Lecțiile 7 și 9. Aici contează doar că are `fit` și `predict`, ca orice model din scikit-learn. `random_state=42` face rezultatul repetabil, ca la împărțire.

Argumentul `handle_unknown` contează în concurs: dacă în test apare o categorie care nu era în antrenare, fără el codul crapă la predicție, exact când n-ai timp să depanezi. Să zicem că în antrenare ai doar Cluj și Iași, iar în test apare Brașov. Fără argument primești `ValueError: Found unknown categories`. Cu `handle_unknown="ignore"`, Brașov primește 0 în toate coloanele de oraș, iar predicția merge mai departe.

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
La final reantrenezi pe toate datele de antrenare, nu doar pe bucata de optzeci la sută. Ai folosit validarea ca să alegi, acum nu mai ai motiv să arunci acele exemple. Cu mai multe exemple, modelul învață de obicei puțin mai bine. `model.fit(X, y)` reia toată banda de la zero, pe toate rândurile: și medianele, și modelul se învață din nou.

```
model.fit(X, y)
pred = model.predict(test.drop(columns=["id"]))

sub = pd.DataFrame({"id": test["id"], "target": pred})
sub.to_csv("submission.csv", index=False)
```

`test.drop(columns=["id"])` lasă în test exact coloanele din `X`. `index=False`, ca în Lecția 4, nu scrie în fișier numerele de rând, care ar apărea ca o coloană în plus.

Înainte de upload, trei verificări care au salvat multe concursuri: numărul de rânduri e egal cu al fișierului de test, numele coloanelor sunt exact cele cerute în enunț, și nu ai valori lipsă în predicții.

```
assert len(sub) == len(test)
assert list(sub.columns) == ["id", "target"]
assert sub["target"].isna().sum() == 0
```

`assert` (Lecția 3) oprește programul cu o eroare dacă o condiție e falsă. Dacă celula rulează fără niciun mesaj, toate trei verificările au trecut.

Și mai sigur e să pornești de la fișierul de exemplu din enunț: îl citești, verifici că rândurile sunt în aceeași ordine ca în test, schimbi doar coloana țintă și îl salvezi. Așa, numele și ordinea coloanelor sunt sigur cele cerute.

```
sub = pd.read_csv("sample_submission.csv")
assert (sub["id"] == test["id"]).all()
sub["target"] = pred
sub.to_csv("submission.csv", index=False)
```

`sub["id"] == test["id"]` compară cele două coloane rând cu rând, iar `.all()` dă `True` doar dacă toate perechile sunt egale.

Dacă metrica e AUC sau log loss, trimiți probabilități, nu clase: `model.predict_proba(...)[:, 1]` îți dă probabilitatea clasei pozitive.

Amândouă punctează cât de bune sunt probabilitățile. AUC măsoară cât de bine le ordonează: 1 înseamnă că toate rândurile din clasa pozitivă au primit probabilități mai mari decât toate celelalte, iar 0.5 e cât ai lua dând cu banul. Log loss pedepsește probabilitățile sigure pe ele și greșite. Dacă spui 0.99 pentru clasa 1 la un rând care e din clasa 0, pierzi de vreo cinci ori mai mult decât dacă spuneai 0.6. La log loss, mai mic e mai bine.

`predict_proba` întoarce un tabel cu câte o coloană pentru fiecare clasă, iar pe fiecare rând probabilitățile se adună la 1. `[:, 1]` ia toate rândurile din coloana 1, ca la NumPy în Lecția 4. Clasa pozitivă e cea notată cu 1, de obicei cea pe care o cauți, ca frauda sau spamul.

## Cum arată asta în ziua concursului
Prima oră o dai pe pipeline-ul de mai sus, cu un model simplu. Ai deja o submisie validă și un scor pe clasament. De acolo îmbunătățești, cu plasa de siguranță că orice s-ar întâmpla ai ceva trimis.

Ordinea inversă, în care lucrezi două ore la un model bun și abia apoi te apuci de submisie, e cel mai frecvent mod de a termina concursul cu zero puncte pentru cod care mergea aproape.

La ONIA trimiți și codul care a produs fișierul, iar platforma îl rulează fără acces la internet. Înainte de fiecare submisie rulează Restart Kernel and Run All Cells, ca să fii sigur că notebook-ul merge de la zero, și citește datele cu căi relative.

O cale relativă pornește din folderul în care e notebook-ul, ca `date/train.csv` sau simplu `train.csv`. Una absolută pornește de la rădăcina discului, ca `C:/Users/Ana/Desktop/train.csv`, și pe alt calculator nu mai există. Dacă datele stau lângă notebook, calea relativă le găsește oriunde e mutat folderul.

Spre final alegi cele două submisii care contează: de obicei cea mai bună pe validarea locală și una mai sigură, cu un model mai simplu.

# @practice
- Ia o problemă de arhivă de pe MLCompete și scrie pipeline-ul cap-coadă într-o oră, cu model simplu.
- Rulează același pipeline o dată cu scalare înainte de split și o dată după, și compară scorurile de validare.
- Scrie-ți un notebook șablon cu cei șase pași, pe care să-l copiezi la începutul oricărei probleme.
- [House Prices pe Kaggle](https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques)
- [Kaggle Learn: Intermediate Machine Learning](https://www.kaggle.com/learn/intermediate-machine-learning)
