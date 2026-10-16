---
code: S6
duration: ~2 săptămâni
---

# @intro
Înainte să antrenezi orice, uită-te la date. La distribuții, la ce lipsește, la cum sunt scalate coloanele. Etapa asta se numește EDA, analiză exploratorie, și e prima pe care o faci la orice problemă nouă.

## Ce cauți când te uiți la date
EDA înseamnă să pui întrebări simple datelor și să te uiți la răspuns înainte să tragi vreo concluzie. Câte rânduri și coloane sunt. Ce tip are fiecare coloană. Cum arată ținta, adică ce vrei să prezici. Ce lipsește și cât de mult.

Trasează distribuția fiecărei coloane numerice cu o histogramă. Vezi imediat dacă e simetrică, dacă are o coadă lungă, dacă are valori imposibile (o vârstă de 200, un preț negativ). Astea sunt semne de erori în date pe care le prinzi din ochi.

```
df["varsta"].hist(bins=30)
df["tinta"].value_counts()     # câte exemple din fiecare clasă
```

## Outlieri: valori ieșite din tipar
Un outlier e o valoare mult mai mare sau mai mică decât restul coloanei. Poate fi o eroare, ca vârsta de 200, sau poate fi chiar ce cauți, ca o anomalie la un senzor. Îl vezi cel mai repede pe un box plot. Regula clasică îl numără ca outlier dacă e cu mai mult de 1,5 IQR sub prima cuartilă sau peste a treia, unde IQR e distanța dintre cuartila 1 și cuartila 3.

```
q1, q3 = df["pret"].quantile([0.25, 0.75])
iqr = q3 - q1
jos, sus = q1 - 1.5 * iqr, q3 + 1.5 * iqr
outlieri = df[(df["pret"] < jos) | (df["pret"] > sus)]
print(len(outlieri))
```

Ce faci cu ei depinde de cauză. Erorile le corectezi sau le scoți. Valorile reale, dar extreme, le poți tăia la o limită cu `clip`, iar o coloană cu coadă lungă spre dreapta, ca prețurile sau veniturile, o aduci la o formă mai echilibrată cu `np.log1p`.

```
df["pret"] = df["pret"].clip(upper=sus)
df["venit_log"] = np.log1p(df["venit"])
```

## Clase dezechilibrate: de ce contează devreme
Dacă prezici o clasă care apare în 2% din cazuri (fraudă, o boală rară), un model care spune mereu nu are 98% acuratețe și e complet inutil. De asta te uiți la echilibrul claselor de la început: schimbă ce metrică folosești și cum îți împarți datele.

> [!NOTE]
> Când o clasă e rară, acuratețea minte. Reține pentru modulul de evaluare: vei avea nevoie de precizie, recall și F1, nu de acuratețe simplă.

## Corelații: ce coloane spun același lucru
Corelația măsoară cât de mult merg două coloane împreună, de la -1 (invers) prin 0 (deloc) până la 1 (identic ca tendință). Două coloane aproape identice îți spun ceva: poate una e derivată din alta, poate poți arunca una fără să pierzi informație.

```
df.corr(numeric_only=True)     # matricea de corelații între coloane
```

Implicit e corelația Pearson, care prinde doar legăturile liniare. Cu `df.corr(method="spearman", numeric_only=True)` prinzi și coloanele care cresc împreună fără să fie pe o linie dreaptă.

Corelația nu înseamnă cauzalitate. Două lucruri pot crește împreună fără ca unul să-l provoace pe celălalt. E doar un indiciu unde să te uiți, nu o concluzie.

## Valori lipsă: întâi de ce, apoi cum
Înainte să umpli o valoare lipsă, întreabă-te de ce lipsește. Uneori lipsa e o eroare de colectare. Alteori lipsa e chiar informație: un câmp gol la venit poate însemna că persoana a refuzat să răspundă, ceea ce e semnificativ. În cazul ăsta, adaugă o coloană separată care marchează lipsa.

Umplerea (imputarea) se face cu media, mediana sau valoarea cea mai frecventă, ori cu un model. Mediana e mai sigură ca media când sunt outlieri, pentru că nu e trasă de valorile extreme.

În exemplele de aici, `X_train` e partea din date pe care antrenezi, iar `X_val` partea pe care verifici modelul. Cum le obții vezi în lecția următoare.

```
from sklearn.impute import SimpleImputer
imp = SimpleImputer(strategy="median").fit(X_train)
X_train = imp.transform(X_train)
X_val = imp.transform(X_val)    # aceiași parametri, învățați pe train
```

Coloana care marchează lipsa o adaugă `SimpleImputer` singur, dacă îi dai `add_indicator=True`.

La serii în timp, ca citirile unui senzor, golul se completează de obicei cu ultima valoare cunoscută. Sortezi întâi după timp, apoi folosești `ffill`.

```
df = df.sort_values("timp")
df["temperatura"] = df["temperatura"].ffill()
```

## Scalarea: ce metodă și când
Multe modele măsoară distanțe (kNN, K-Means) sau folosesc gradient (regresie, rețele). Pentru ele, o coloană cu valori mari (venitul, în mii) domină una cu valori mici (vârsta, zeci) doar prin scală, nu prin importanță. Scalarea le aduce la aceeași măsură. Arborii de decizie și Random Forest nu au nevoie de ea, pentru că despart datele pe praguri. Sunt două metode uzuale, și alegerea depinde de forma datelor.

> [!FORMULA]
> z = (x - μ) / σ
> Standardizarea: scazi media μ și împarți la deviația standard σ. Rezultatul are media 0 și deviația 1. O folosești ca variantă implicită, la regresie, SVM și rețele neuronale, când datele n-au outlieri extremi.

```
from sklearn.preprocessing import StandardScaler
sc = StandardScaler().fit(X_train)   # învață μ și σ pe TRAIN
X_train = sc.transform(X_train)
X_val = sc.transform(X_val)          # aplică aceiași μ și σ
```

> [!FORMULA]
> x' = (x - min) / (max - min)
> Normalizarea min-max: aduce valorile în intervalul 0 până la 1. O folosești când ai nevoie de un interval fix, de exemplu la o rețea care așteaptă input între 0 și 1, sau la imagini (pixelii, deja în 0-255). Sensibilă la outlieri: un singur punct extrem strică minimul sau maximul pentru tot restul coloanei.

```
from sklearn.preprocessing import MinMaxScaler
sc = MinMaxScaler().fit(X_train)   # învață min și max pe TRAIN
X_train = sc.transform(X_train)
X_val = sc.transform(X_val)
```

Când coloana are outlieri, a treia variantă, `RobustScaler`, e mai sigură: scade mediana și împarte la IQR, așa că un punct extrem nu strică scala pentru restul.

```
from sklearn.preprocessing import RobustScaler
sc = RobustScaler().fit(X_train)   # învață mediana și IQR pe TRAIN
X_train = sc.transform(X_train)
X_val = sc.transform(X_val)
```

> [!NOTE]
> Regula de bază a preprocesării: învață parametrii (medie, deviație, mediană, min, max) doar pe setul de antrenare, apoi aplică-i pe validare și test. Niciodată invers. Altfel test-ul se scurge în antrenare și scorul tău e o minciună.

## Variabile categorice
Un model vrea numere, dar multe coloane sunt categorii: oraș, culoare, tip. Alegerea encoding-ului depinde de câte categorii sunt și dacă au o ordine naturală.

Fără ordine și cu puține categorii, one-hot encoding e alegerea: face din fiecare categorie o coloană separată de 0 și 1. Roșu devine [1,0,0], verde [0,1,0]. Nicio categorie nu e mai mare ca alta.

```
pd.get_dummies(df, columns=["oras", "culoare"])
```

Cu ordine naturală (mic, mediu, mare), ordinal encoding le mapează la numere care păstrează ordinea, 0, 1, 2. Merge bine mai ales cu modele bazate pe arbori, care oricum despart datele pe praguri.

```
from sklearn.preprocessing import OrdinalEncoder
enc = OrdinalEncoder(categories=[["mic", "mediu", "mare"]])
df["marime_cod"] = enc.fit_transform(df[["marime"]])
```

Label encoding face același lucru, un număr întreg pe categorie, dar fără să ceri tu ordinea, ea vine din ordine alfabetică sau din ordinea de apariție. E gândit pentru ținta y, nu pentru coloanele de intrare: pe o coloană de intrare fără ordine reală, numerele inventează o ordine falsă pe care un model liniar o ia de bună.

```
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
y_encoded = le.fit_transform(y_train)   # ex: "spam"/"nu" -> 1/0
```

Cu sute de categorii (cod poștal, ID de produs), one-hot ar produce sute de coloane goale. Binary encoding e un compromis: transformă fiecare categorie într-un număr, apoi în cifre binare, și fiecare cifră devine o coloană. Pentru 100 de categorii ai nevoie de doar 7 coloane (2^7 = 128), nu 100, și nu inventează nicio ordine.

```
from category_encoders import BinaryEncoder
enc = BinaryEncoder(cols=["cod_postal"])
df_encoded = enc.fit_transform(df["cod_postal"])
```

`BinaryEncoder` vine din pachetul `category_encoders`, nu din scikit-learn, așa că s-ar putea să nu fie instalat la concurs. O alternativă cu Pandas simplu e frequency encoding: înlocuiești categoria cu de câte ori apare.

```
frecventa = df["cod_postal"].value_counts()
df["cod_postal_frecventa"] = df["cod_postal"].map(frecventa)
```

Target encoding merge și mai departe: înlocuiește fiecare categorie cu media țintei pentru acea categorie, o singură coloană indiferent de câte categorii sunt. Cel mai puternic la cardinalitate foarte mare, dar și cel mai expus la scurgere de date.

```
from sklearn.preprocessing import TargetEncoder
enc = TargetEncoder()
X_train_enc = enc.fit_transform(X_train[["cod_postal"]], y_train)
X_val_enc = enc.transform(X_val[["cod_postal"]])
```

> [!NOTE]
> Ordinal, binary și target encoding se învață tot doar pe train, la fel ca imputarea și scalarea. Altfel informație din validare/test se scurge în encoding și scorul tău minte.

## Coloane noi din cele existente
De multe ori modelul învață mai bine dintr-o coloană construită de tine decât din datele brute. Asta e feature engineering. Trei tipare apar des: statistici pe grup, ferestre glisante pe serii și bucăți dintr-o dată calendaristică.

```
# media și deviația pe grup, puse pe fiecare rând
df["medie_oras"] = df.groupby("oras")["suprafata"].transform("mean")
df["std_oras"] = df.groupby("oras")["suprafata"].transform("std")

# fereastră glisantă: media ultimelor 5 citiri, pe fiecare senzor
df = df.sort_values(["senzor", "timp"])
medie_5 = lambda s: s.rolling(5, min_periods=1).mean()
df["temp_5"] = df.groupby("senzor")["temperatura"].transform(medie_5)

# bucăți dintr-o dată calendaristică
df["data"] = pd.to_datetime(df["data"])
df["luna"] = df["data"].dt.month
df["zi_saptamana"] = df["data"].dt.dayofweek
```

Dacă statistica pe grup e calculată din țintă, e de fapt target encoding și se învață doar pe train, ca mai sus.

# @practice
- [Kaggle Learn: Data Cleaning](https://www.kaggle.com/learn/data-cleaning)
- [Kaggle Learn: Feature Engineering](https://www.kaggle.com/learn/feature-engineering)
