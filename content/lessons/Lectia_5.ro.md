---
code: S6
duration: ~2 săptămâni
---

# @intro
Înainte să antrenezi orice, uită-te la date. La distribuții, la ce lipsește, la cum sunt scalate coloanele (cât de mari sunt numerele din fiecare). Etapa asta se numește EDA, analiză exploratorie, și e prima pe care o faci la orice problemă nouă. După ce te-ai uitat, pregătești datele pentru model, de exemplu umpli golurile și transformi textul în numere. Partea asta se numește preprocesare.

## Ce cauți când te uiți la date
EDA înseamnă să pui întrebări simple datelor și să te uiți la răspuns înainte să tragi vreo concluzie. Câte rânduri și coloane sunt. Ce tip are fiecare coloană. Cum arată ținta, adică ce vrei să prezici. Ce lipsește și cât de mult. La cele mai multe răspunzi cu ce știi din Lecția 4: `df.shape`, `df.info()`, `df.isna().sum()`.

Distribuția unei coloane îți spune ce valori apar în ea și cât de des. Ia salariile dintr-o firmă mare: cei mai mulți oameni câștigă în jur de 4000 de lei, iar câțiva câștigă 20000 sau mai mult. Pe histogramă vezi un munte de bare înalte în stânga și un șir lung de bare mici spre dreapta. Șirul ăsta se numește coadă lungă. O distribuție simetrică arată la fel de o parte și de alta a mijlocului, cum arată de obicei înălțimile elevilor dintr-o școală.

Trasează distribuția fiecărei coloane numerice cu o histogramă. Vezi imediat dacă e simetrică, dacă are o coadă lungă, dacă are valori imposibile (o vârstă de 200, un preț negativ). Valorile imposibile sunt semne de erori în date, pe care le prinzi din ochi.

```
df["varsta"].hist(bins=30)
df["tinta"].value_counts()     # câte exemple din fiecare clasă
```

Prima linie e scurtătura din pandas pentru `plt.hist` din Lecția 4: histograma coloanei, cu 30 de intervale. A doua numără câte rânduri are fiecare clasă, adică fiecare valoare posibilă a țintei, ca spam sau normal.

## Outlieri: valori ieșite din tipar
Un outlier e o valoare mult mai mare sau mai mică decât restul coloanei. Poate fi o eroare, ca vârsta de 200, sau poate fi chiar ce cauți, ca o anomalie la un senzor. Îl vezi cel mai repede pe un box plot.

Regula clasică pentru outlieri folosește cuartilele, pe care le-ai văzut în `describe()`. Ia nouă prețuri, sortate crescător: 10, 12, 14, 15, 16, 18, 20, 22, 90. Mediana e valoarea din mijloc, a cincea: 16. Prima cuartilă (Q1) e valoarea de la un sfert din listă, iar a treia cuartilă (Q3) cea de la trei sferturi. A doua cuartilă e chiar mediana. De la prima poziție la ultima sunt 8 pași: un sfert înseamnă 2 pași, deci Q1 e a treia valoare, 14. Trei sferturi înseamnă 6 pași, deci Q3 e a șaptea, 20. Când pasul nu iese întreg, pandas ia o valoare între cele două vecine.

Regula numără o valoare ca outlier dacă e cu mai mult de 1.5 × IQR sub prima cuartilă sau peste a treia. IQR (interquartile range) e distanța dintre cuartila 1 și cuartila 3. Aici IQR = 20 - 14 = 6, iar 1.5 × 6 = 9. Limitele sunt deci 14 - 9 = 5 și 20 + 9 = 29, iar singurul preț din afara lor e 90. Pe box plot-ul din Lecția 4, exact valorile astea apar ca puncte separate.

```
q1, q3 = df["pret"].quantile([0.25, 0.75])
iqr = q3 - q1
jos, sus = q1 - 1.5 * iqr, q3 + 1.5 * iqr
outlieri = df[(df["pret"] < jos) | (df["pret"] > sus)]
print(len(outlieri))
```

`quantile([0.25, 0.75])` calculează Q1 și Q3 (0.25 e un sfert, 0.75 trei sferturi), iar `q1, q3 = ...` le despachetează în două variabile, ca în Lecția 3. Linia cu `outlieri` păstrează rândurile unde prețul e sub `jos` sau peste `sus`, ca o mască booleană din Lecția 4. Semnul `|` înseamnă „sau”: pandas îl cere în loc de `or`, cu fiecare condiție între paranteze. Pe cele nouă prețuri, codul afișează 1.

Ce faci cu ei depinde de cauză. Erorile le corectezi sau le scoți. Valorile reale, dar extreme, le poți tăia la o limită cu `clip`, iar o coloană cu coadă lungă spre dreapta, ca prețurile sau veniturile, o aduci la o formă mai echilibrată cu `np.log1p`.

```
df["pret"] = df["pret"].clip(upper=sus)
df["venit_log"] = np.log1p(df["venit"])
```

`clip(upper=sus)` înlocuiește orice valoare mai mare decât `sus` cu `sus`. În exemplu, 90 devine 29, iar celelalte prețuri rămân la fel.

`np.log1p` folosește logaritmul, o funcție pe care o faci la matematică abia în clasa a X-a. Aici îți ajunge să știi că crește foarte încet. Ia 9, 99 și 999, adică 10, 100 și 1000 minus 1: `np.log1p` le transformă în aproximativ 2.3, 4.6 și 6.9. Fiecare înmulțire cu 10 adaugă doar 2.3, așa că valorile mari se strâng lângă celelalte și coada lungă se scurtează. Partea „1p” vine de la „plus 1”: funcția calculează logaritmul lui 1 + x, ca să meargă și pe 0, unde dă 0 (logaritmul simplu nu există în 0).

## Clase dezechilibrate: de ce contează devreme
Clasele sunt dezechilibrate când una dintre ele apare mult mai rar decât celelalte. Dacă prezici o clasă care apare în 2% din cazuri (fraudă, o boală rară), un model care spune mereu nu are 98% acuratețe și e complet inutil.

Acuratețea, din Lecția 2, e procentul de răspunsuri corecte. Ia 1000 de plăți cu cardul, dintre care 20 sunt fraude. Un model care răspunde mereu „nu e fraudă” greșește doar cele 20, deci nimerește 980 din 1000, adică 98%. Și totuși n-a prins nicio fraudă, deși pentru asta l-ai făcut.

De asta te uiți la echilibrul claselor de la început: schimbă ce metrică folosești și cum îți împarți datele în antrenare și validare (Lecția 6).

> [!NOTE]
> Când o clasă e rară, acuratețea minte. Reține pentru Lecția 8, despre evaluare: vei avea nevoie de precizie, recall și F1, nu de acuratețe simplă. Recall-ul spune câte dintre fraudele reale ai prins, precizia câte dintre alarmele tale erau fraude adevărate, iar F1 le combină într-un singur scor.

## Corelații: ce coloane spun același lucru
Înălțimea și greutatea elevilor cresc de obicei împreună, iar temperatura de afară și gazul consumat la încălzire merg invers: când una crește, cealaltă scade.

Corelația măsoară cât de mult merg două coloane împreună, de la -1 (invers) prin 0 (deloc) până la 1 (identic ca tendință). Două coloane aproape identice îți spun ceva: poate una e derivată din alta, poate poți arunca una fără să pierzi informație. Temperatura în grade Celsius și aceeași temperatură în Fahrenheit, de exemplu, au corelația 1, pentru că a doua se calculează din prima.

```
df.corr(numeric_only=True)     # matricea de corelații între coloane
```

Rezultatul e tabelul de corelații din Lecția 4, cu câte un rând și o coloană pentru fiecare coloană numerică.

O legătură e liniară când punctele stau pe o dreaptă, ca graficul unei funcții liniare de la matematică. Celsius și Fahrenheit sunt legate exact așa: F = 1.8 × C + 32, deci fiecare grad Celsius în plus adaugă mereu 1.8 grade Fahrenheit.

Implicit e corelația Pearson, care prinde doar legăturile liniare. Cu `df.corr(method="spearman", numeric_only=True)` prinzi și coloanele care cresc împreună fără să fie pe o linie dreaptă.

Spearman se uită doar la ordine. Înlocuiește fiecare valoare cu locul ei în clasament (cea mai mică devine 1, următoarea 2 și așa mai departe), apoi calculează Pearson pe locuri. Ia x = 1, 2, 3, 4, 5 și y = 1, 10, 100, 1000, 10000. y crește mereu odată cu x, dar tot mai repede, deci punctele nu stau pe o dreaptă. Pearson dă aproximativ 0.76, iar Spearman dă 1.

Corelația nu înseamnă cauzalitate. Două lucruri pot crește împreună fără ca unul să-l provoace pe celălalt. Vara cresc și vânzările de înghețată, și înecurile, dar înghețata nu provoacă înecuri: pe amândouă le aduce căldura. E doar un indiciu unde să te uiți, nu o concluzie.

## Valori lipsă: întâi de ce, apoi cum
Înainte să umpli o valoare lipsă, întreabă-te de ce lipsește. Uneori lipsa e o eroare de colectare. Alteori lipsa e chiar informație: un câmp gol la venit poate însemna că persoana a refuzat să răspundă, ceea ce e semnificativ. În cazul ăsta, adaugă o coloană separată care marchează lipsa, de exemplu `venit_lipsa`, cu 1 unde venitul lipsește și 0 în rest.

Umplerea (imputarea) se face cu media, mediana sau valoarea cea mai frecventă, ori cu un model. Mediana e mai sigură ca media când sunt outlieri, pentru că nu e trasă de valorile extreme.

Ia cinci salarii: 3000, 3200, 3500, 4000 și 50000. Media e 63700 / 5 = 12740, mai mult decât câștigă patru dintre cei cinci. Mediana, valoarea din mijloc, e 3500, un salariu obișnuit pentru grupul ăsta. Valoarea cea mai frecventă o folosești la coloanele cu text, ca orașul, unde nu poți face o medie.

De aici încolo, exemplele folosesc `X_train` și `X_val`. Datele de antrenare se împart în două: o parte din care învață modelul și una ținută deoparte, ca să-l verifici, la fel ca la validarea locală din Lecția 2. `X_train` e partea din date pe care antrenezi, iar `X_val` partea pe care verifici modelul. `X` e tabelul cu trăsăturile (features), adică coloanele de intrare, iar `y` e ținta, deci `y_train` e ținta rândurilor din `X_train`. Cum le obții vezi în lecția următoare.

Uneltele de preprocesare din scikit-learn au două metode, `fit` și `transform`, după tiparul `fit`/`predict` din Lecția 3. `fit` învață niște numere din date, aici mediana fiecărei coloane; numerele astea se numesc parametri. `transform` le aplică pe orice tabel, aici umple golurile cu ele. Le înveți doar din `X_train` și le aplici pe ambele părți, ca verificarea să rămână cinstită. Pentru model, `X_val` trebuie să fie date noi, din care n-a învățat nimic.

```
from sklearn.impute import SimpleImputer
imp = SimpleImputer(strategy="median").fit(X_train)
X_train = imp.transform(X_train)
X_val = imp.transform(X_val)    # aceiași parametri, învățați pe train
```

`strategy="median"` alege mediana; mai poți pune `"mean"` pentru medie sau `"most_frequent"` pentru valoarea cea mai frecventă. Din `transform` iese un array NumPy fără goluri, cu aceleași rânduri și coloane.

Coloana care marchează lipsa o adaugă `SimpleImputer` singur, dacă îi dai `add_indicator=True`. Pentru fiecare coloană care avea goluri, pune la final o coloană de 0 și 1. De exemplu, venitul 3000, gol, 4000 devine 3000, 3500, 4000 (golul a primit mediana), plus o coloană nouă cu 0, 1, 0.

La serii în timp, ca citirile unui senzor, golul se completează de obicei cu ultima valoare cunoscută. Sortezi întâi după timp, apoi folosești `ffill`.

```
df = df.sort_values("timp")
df["temperatura"] = df["temperatura"].ffill()
```

`ffill` vine de la forward fill, „umplere înainte”: fiecare gol primește valoarea de pe rândul de deasupra. Citirile 20, gol, gol, 23 devin 20, 20, 20, 23. De asta sortezi întâi: rândul de deasupra trebuie să fie citirea de dinainte.

## Scalarea: ce metodă și când
Ia doi oameni: unul are 20 de ani și un venit de 3000 de lei, celălalt 25 de ani și 3500 de lei. Dacă îi privești ca pe două puncte în plan, (20, 3000) și (25, 3500), distanța dintre ei e, cu teorema lui Pitagora, √(5² + 500²) ≈ 500.02. E aproape exact diferența de venit. Cei 5 ani aproape nu contează, doar pentru că vârsta se măsoară în zeci, iar venitul în mii.

Multe modele măsoară distanțe, ca mai sus (de exemplu kNN, care caută rândurile cele mai apropiate, și K-Means, din Lecția 10). Altele folosesc gradient, adică învață corectându-se în pași mici (regresia, din Lecția 7, și rețelele neuronale, din Lecția 14). Pentru ele, o coloană cu valori mari (venitul, în mii) domină una cu valori mici (vârsta, zeci) doar prin scală, nu prin importanță. Scalarea le aduce la aceeași măsură.

Arborii de decizie și Random Forest nu au nevoie de ea, pentru că despart datele pe praguri. Un arbore de decizie (Lecția 7) pune întrebări ca „venitul e peste 3200?”. Dacă scalezi coloana, se schimbă doar pragul, iar rândurile se împart la fel. Random Forest e un grup de astfel de arbori (Lecția 9).

Sunt două metode uzuale, și alegerea depinde de forma datelor. Prima, standardizarea, folosește media și deviația standard din Lecția 4, care spune cât de departe stau de obicei valorile de medie. Ia valorile 10, 20, 30, cu media 20. Scazi media din fiecare (-10, 0, 10), ridici la pătrat (100, 0, 100), faci media pătratelor (200 / 3 ≈ 66.67) și scoți radical: deviația standard e ≈ 8.16. Standardizat, 10 devine (10 - 20) / 8.16 ≈ -1.22, 20 devine 0, iar 30 devine 1.22.

> [!FORMULA]
> z = (x - μ) / σ
> Standardizarea: scazi media μ (se citește „miu”) și împarți la deviația standard σ („sigma”). Rezultatul are media 0 și deviația 1. O folosești ca variantă implicită, la regresie, SVM și rețele neuronale (le vezi în Lecțiile 7 și 14), când datele n-au outlieri extremi.

```
from sklearn.preprocessing import StandardScaler
sc = StandardScaler().fit(X_train)   # învață μ și σ pe TRAIN
X_train = sc.transform(X_train)
X_val = sc.transform(X_val)          # aplică aceiași μ și σ
```

Dacă verifici de mână, ai grijă la o capcană. `StandardScaler` face media pătratelor ca mai sus, împărțind suma lor la 3, și obține 8.16. `.std()` din pandas împarte implicit suma la 2 (numărul de valori minus 1) și dă 10.0 pentru aceleași valori. Cu `.std(ddof=0)`, pandas dă și el 8.16.

Normalizarea min-max, a doua metodă, mută valorile între 0 și 1. Pe 10, 20, 30, minimul 10 devine 0, maximul 30 devine 1, iar 20 devine (20 - 10) / (30 - 10) = 0.5.

> [!FORMULA]
> x' = (x - min) / (max - min)
> Normalizarea min-max: aduce valorile în intervalul 0 până la 1 (x' e valoarea nouă). O folosești când ai nevoie de un interval fix, de exemplu la o rețea care așteaptă input între 0 și 1, sau la imagini (pixelii, deja în 0-255). Sensibilă la outlieri: un singur punct extrem strică minimul sau maximul pentru tot restul coloanei.

```
from sklearn.preprocessing import MinMaxScaler
sc = MinMaxScaler().fit(X_train)   # învață min și max pe TRAIN
X_train = sc.transform(X_train)
X_val = sc.transform(X_val)
```

Ultima frază din formulă, în numere: adaugă un 1000 lângă 10, 20 și 30. Maximul devine 1000, iar 10, 20 și 30 ajung la 0, 0.01 și 0.02, înghesuite lângă 0.

Când coloana are outlieri, a treia variantă, `RobustScaler`, e mai sigură: scade mediana și împarte la IQR, așa că un punct extrem nu strică scala pentru restul. Pe cele nouă prețuri de la outlieri (mediana 16, IQR 6), 10 devine (10 - 16) / 6 = -1, iar 22 devine 1. Prețul de 90 ajunge la aproximativ 12.33, departe de rest, dar fără să le mai înghesuie pe celelalte.

```
from sklearn.preprocessing import RobustScaler
sc = RobustScaler().fit(X_train)   # învață mediana și IQR pe TRAIN
X_train = sc.transform(X_train)
X_val = sc.transform(X_val)
```

Toate trei învață pe `X_train` și doar aplică pe `X_val`, pentru că parametrii depind de datele din care îi înveți. Să zicem că antrenarea are veniturile 3000, 3500 și 4000, iar validarea 3200 și 50000. Media pe antrenare e 3500, dar pe toate cinci e 12740: un singur venit din validare a schimbat numărul cu care pregătești antrenarea. Preprocesarea a „văzut” deja validarea, ca un elev care a tras cu ochiul la subiecte. Scorul de pe validare nu mai spune cât de bine merge modelul pe date noi.

> [!NOTE]
> Regula de bază a preprocesării: învață parametrii (medie, deviație, mediană, min, max) doar pe setul de antrenare, apoi aplică-i pe validare și test. Niciodată invers. Altfel test-ul se scurge în antrenare și scorul tău e o minciună. Asta se numește scurgere de date (data leakage).

## Variabile categorice: coloane cu categorii
Un model vrea numere, dar multe coloane sunt categorii: oraș, culoare, tip. Transformarea lor în numere se numește encoding (codificare). Alegerea encoding-ului depinde de câte categorii sunt și dacă au o ordine naturală. Numărul de categorii diferite dintr-o coloană se numește cardinalitate: coloana `culoare`, cu roșu, verde și albastru, are cardinalitatea 3, iar un cod poștal poate avea mii.

Fără ordine și cu puține categorii, one-hot encoding e alegerea: face din fiecare categorie o coloană separată de 0 și 1. Cu trei culori, roșu devine [1,0,0], verde [0,1,0]. Nicio categorie nu e mai mare ca alta.

```
pd.get_dummies(df, columns=["oras", "culoare"])
```

`get_dummies` face asta pe coloanele din `columns` și pune numele coloanei vechi în fața categoriei. Coloana `oras` cu București, Cluj și Iași devine `oras_București`, `oras_Cluj` și `oras_Iași`, iar un rând din Cluj primește 0, 1, 0. În pandas recent, coloanele noi apar cu `True` și `False` în loc de 1 și 0. Pentru model e același lucru, iar cu `dtype=int` primești 0 și 1.

Cu ordine naturală (mic, mediu, mare), ordinal encoding le transformă în numere care păstrează ordinea, 0, 1, 2. Merge bine mai ales cu modele bazate pe arbori, care oricum despart datele pe praguri.

```
from sklearn.preprocessing import OrdinalEncoder
enc = OrdinalEncoder(categories=[["mic", "mediu", "mare"]])
df["marime_cod"] = enc.fit_transform(df[["marime"]])
```

`categories` primește ordinea dorită ca listă în listă, câte o listă pentru fiecare coloană codificată (aici una). Cu paranteze duble, `df[["marime"]]` e un tabel cu o singură coloană, forma pe care o cer uneltele din scikit-learn. `fit_transform` face `fit` și `transform` dintr-o singură mișcare.

Label encoding face același lucru, un număr întreg pe categorie, dar fără să ceri tu ordinea, ea vine din ordine alfabetică sau din ordinea de apariție. E gândit pentru ținta y, nu pentru coloanele de intrare: pe o coloană de intrare fără ordine reală, numerele inventează o ordine falsă pe care un model liniar o ia de bună. Dacă București devine 0, Cluj 1 și Iași 2, un model liniar (Lecția 7) ajunge să creadă că Clujul e „între” București și Iași.

```
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
y_encoded = le.fit_transform(y_train)   # ex: "spam"/"nu" -> 1/0
```

Cu sute de categorii (cod poștal, ID de produs), one-hot ar produce sute de coloane aproape numai cu 0. Binary encoding e un compromis: transformă fiecare categorie într-un număr, apoi în cifre binare, și fiecare cifră devine o coloană. În baza 2 (binar), numerele se scriu doar cu 0 și 1: 1 e 1, 2 e 10, 3 e 11, 4 e 100, 5 e 101. Categoria cu numărul 5 se scrie deci 101 și primește 1, 0 și 1 în trei coloane. Pentru 100 de categorii ai nevoie de doar 7 coloane (2^7 = 128), nu 100, și nu inventează nicio ordine. Din 7 cifre de 0 și 1 poți forma 128 de numere diferite, deci ajung pentru toate.

```
from category_encoders import BinaryEncoder
enc = BinaryEncoder(cols=["cod_postal"])
df_encoded = enc.fit_transform(df["cod_postal"])
```

`BinaryEncoder` vine din pachetul `category_encoders`, nu din scikit-learn, așa că s-ar putea să nu fie instalat la concurs. O alternativă cu Pandas simplu e frequency encoding: înlocuiești categoria cu de câte ori apare. Dacă 400001 apare în trei rânduri și 700001 într-unul, rândurile cu 400001 primesc 3, iar cel cu 700001 primește 1.

```
frecventa = df["cod_postal"].value_counts()
df["cod_postal_frecventa"] = df["cod_postal"].map(frecventa)
```

`value_counts()` dă, pentru fiecare cod, de câte ori apare. `map` ia fiecare valoare din coloană, o caută în rezultatul ăsta și pune în loc numărul găsit, ca o căutare într-un dicționar (Lecția 3).

Target encoding merge și mai departe: înlocuiește fiecare categorie cu media țintei pentru acea categorie, o singură coloană indiferent de câte categorii sunt. Să zicem că ținta e 1 dacă un client a cumpărat și 0 dacă nu, iar clienții din Cluj au țintele 1, 0, 1, 1: Cluj devine media lor, 0.75. Ajută cel mai mult la cardinalitate foarte mare, dar e și cel mai expus la scurgere de date. Un oraș care apare într-un singur rând primește chiar ținta acelui rând, așa că modelul vede răspunsul printre trăsături.

```
from sklearn.preprocessing import TargetEncoder
enc = TargetEncoder()
X_train_enc = enc.fit_transform(X_train[["cod_postal"]], y_train)
X_val_enc = enc.transform(X_val[["cod_postal"]])
```

`TargetEncoder` din scikit-learn se apără de problema asta. În `fit_transform`, fiecare rând de antrenare primește o medie calculată din alte rânduri decât el, iar categoriile cu puține rânduri sunt trase spre media generală. De asta pe `X_train` chemi `fit_transform`, iar pe `X_val` doar `transform`.

> [!NOTE]
> Ordinal, binary și target encoding se învață tot doar pe train, la fel ca imputarea și scalarea. Altfel informație din validare/test se scurge în encoding și scorul tău minte.

## Coloane noi din cele existente
De multe ori modelul învață mai bine dintr-o coloană construită de tine decât din datele brute. Asta e feature engineering, adică construirea de trăsături noi. Trei tipare apar des: statistici pe grup, ferestre glisante pe serii și bucăți dintr-o dată calendaristică.

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
df["zi_saptamana"] = df["data"].dt.day_of_week
```

Prima parte calculează media și deviația standard a suprafeței în fiecare oraș și le pune pe fiecare rând din orașul respectiv, cu `transform` din Lecția 4. Dacă apartamentele din Cluj au în medie 60 de metri pătrați, unul de 90 din Cluj primește `medie_oras` egal cu 60, iar modelul poate vedea că e mare pentru orașul lui.

O fereastră glisantă e un grup de rânduri vecine care alunecă în jos cu câte un rând. Pentru citirile 20, 22, 24, 26, 28, 30, media ultimelor 5 dă 20, 21, 22, 23, 24, 26. La început, `min_periods=1` face media din câte citiri există, iar la ultimul rând fereastra cuprinde 22, 24, 26, 28, 30. Funcția scrisă cu `lambda` (Lecția 3) face media, iar `transform` o aplică separat pe citirile fiecărui senzor, ca să nu amesteci senzorii.

Ultima parte transformă textul în dată calendaristică, cu `pd.to_datetime` din Lecția 4, și scoate din ea luna (de la 1 la 12) și ziua din săptămână (0 e luni, 6 e duminică). Pentru 25 decembrie 2024 ies luna 12 și ziua 2, adică miercuri. Un model nu poate folosi direct o dată, dar poate învăța din „luna 12” sau „ziua 5”, de exemplu că lumea cumpără mai mult în decembrie sau sâmbăta.

Dacă statistica pe grup e calculată din țintă, e de fapt target encoding și se învață doar pe train, ca mai sus.

# @practice
- [Kaggle Learn: Data Cleaning](https://www.kaggle.com/learn/data-cleaning)
- [Kaggle Learn: Feature Engineering](https://www.kaggle.com/learn/feature-engineering)
