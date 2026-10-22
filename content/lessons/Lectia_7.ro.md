---
code: S8
duration: ~3 săptămâni
---

# @intro
Aici înveți uneltele de bază ale învățării supervizate: regresie liniară și logistică, Naïve Bayes, arbori de decizie, SVM. Supervizat înseamnă că ai exemple cu răspunsul corect (etichete) și modelul învață din ele. Nu te opri la cum le chemi din scikit-learn. Înțelege ce optimizează fiecare, adică ce greșeală încearcă să facă cât mai mică, și când se potrivește, pentru că asta te face să alegi bine la concurs.

## Ce înseamnă a antrena un model
Pornește de la un exemplu. Vrei să ghicești prețul unei case doar din suprafața ei, cu regula preț = w · suprafață, unde w e un singur număr: câte mii de euro costă un metru pătrat. Ai trei case cu prețul cunoscut: 50 m² la 100 de mii de euro, 80 m² la 170 de mii și 100 m² la 200 de mii.

Încearcă w = 1.5. Regula prezice 75, 120 și 150 de mii, deci greșește cu 25, 50 și 50, în total cu 125 de mii. Cu w = 2 prezice 100, 160 și 200, deci greșește cu 0, 10 și 0, în total doar cu 10 mii. Al doilea w e mult mai bun.

Un model are niște parametri (numere interne, ca w de mai sus) pe care îi ajustează ca să greșească cât mai puțin pe exemplele de antrenare. Măsura greșelii se numește funcție de cost sau loss: în exemplu, greșeala totală de 125 sau de 10 mii. A antrena înseamnă a găsi parametrii care minimizează loss-ul, adică îl fac cât mai mic. Căutarea o face modelul: unele modele își calculează parametrii direct, altele îi îmbunătățesc pas cu pas, ca tine când ai trecut de la 1.5 la 2. Cum se aleg pașii vezi în Lecția 14.

În scikit-learn tiparul e mereu același: creezi modelul, îl antrenezi cu `fit` pe datele de antrenare, apoi prezici cu `predict` pe date noi, ca la `Medie` din Lecția 3. Simplu la suprafață, dar sub capotă fiecare model face ceva diferit.

```
from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
model.fit(X_train, y_train)     # învață parametrii
y_pred = model.predict(X_val)   # prezice pe date noi
```

`LogisticRegression` e unul dintre modelele din lecția asta, îl vezi mai jos. `X_train` e tabelul cu trăsăturile (features), adică coloanele de intrare, pentru rândurile de antrenare. `y_train` e ținta (target): răspunsurile pentru aceleași rânduri, în aceeași ordine. `X_val` sunt rândurile de validare (Lecția 5), cu răspunsurile ținute deoparte în `y_val`. `y_pred` („y prezis”) sunt predicțiile pentru `X_val`, pe care le compari apoi cu `y_val`.

X e cu literă mare pentru că e un tabel, cu mai multe coloane, iar y cu literă mică pentru că e o singură coloană. E doar o convenție: în Lecția 6 le-ai văzut scurtate, `X_tr` și `y_tr`.

## Regresie liniară: prezici un număr
Regresia liniară prezice o valoare continuă (un preț, o temperatură) ca o combinație liniară a trăsăturilor. Continuă înseamnă că poate ieși orice număr, cu zecimale cu tot. Combinație liniară înseamnă că înmulțești fiecare trăsătură cu un număr al ei, aduni rezultatele și mai adaugi un număr fix.

De exemplu, preț = 1500 · suprafață + 20000 · camere + 10000, în euro. O casă de 60 m² cu 2 camere iese 1500 · 60 + 20000 · 2 + 10000 = 90000 + 40000 + 10000 = 140000 de euro.

Regresia caută linia (sau planul, în mai multe dimensiuni) care trece cel mai bine prin date. Cu o singură trăsătură e o dreaptă, ca graficul lui f(x) = ax + b de la matematică. Fiecare casă e un punct (suprafață, preț), iar modelul caută dreapta care trece cât mai aproape de toate punctele. Cu două trăsături, punctele stau în spațiu și dreapta devine un plan, ca o foaie de hârtie ținută înclinat. Cu mai multe nu-l mai poți desena, dar calculul e același.

> [!FORMULA]
> ŷ = w₁x₁ + w₂x₂ + ... + b
> ŷ (citit „y cu căciulă”) e predicția, iar y simplu e răspunsul adevărat. x₁, x₂ sunt trăsăturile, în exemplu suprafața și camerele. Fiecare trăsătură x are o greutate w care spune cât contează, aici 1500 și 20000. b e termenul liber, numărul adunat mereu, ca b din f(x) = ax + b, aici 10000. Modelul învață w-urile și b.

Minimizează eroarea pătratică: suma pătratelor diferențelor dintre predicție și adevăr. La cele trei case de la început, cu w = 1.5, diferențele 25, 50 și 50, ridicate la pătrat, dau 625 + 2500 + 2500 = 5625. Cu w = 2, diferențele 0, 10 și 0 dau 0 + 100 + 0 = 100. Pătratul pedepsește greșelile mari mai tare: 50 e de 5 ori mai mult decât 10, dar 2500 e de 25 de ori mai mult decât 100.

```
import numpy as np
from sklearn.linear_model import LinearRegression

# 4 case: suprafața (m²) și numărul de camere
X = np.array([[50, 1], [60, 2], [80, 3], [100, 3]])
y = np.array([105000, 140000, 190000, 220000])   # prețurile, în euro

model = LinearRegression().fit(X, y)
print(model.coef_)                # [ 1500. 20000.]
print(round(model.intercept_))    # 10000
print(model.predict([[70, 2]]))   # [155000.]
```

Prețurile din `y` sunt calculate chiar cu regula de mai sus, iar `fit` o găsește singur. `coef_` sunt greutățile, în ordinea coloanelor, și `intercept_` e termenul liber. În scikit-learn, numele terminate cu `_` sunt lucruri învățate la `fit`. `round` doar curăță un 9999.99999 rămas din calcul. `[[70, 2]]` are două perechi de paranteze pentru că `predict` primește un tabel, aici cu un singur rând. Pe date reale punctele nu stau perfect pe un plan și greutățile ies aproximative.

Un avantaj mare al regresiei liniare: coeficienții, adică greutățile w, se pot citi. Greutatea 20000 de la camere înseamnă că, la aceeași suprafață, fiecare cameră în plus adaugă 20000 de euro. Un w pozitiv mare înseamnă că trăsătura aia împinge predicția în sus, iar unul negativ o trage în jos.

Atenție când compari greutăți între ele. Suprafața are doar 1500 față de 20000, dar asta nu înseamnă că contează mai puțin: un metru pătrat e o unitate mică, o cameră e una mare. Greutățile se compară corect doar când trăsăturile sunt pe aceeași scară, de exemplu după standardizarea din Lecția 5.

## Regresie logistică: prezici o clasă
În ciuda numelui, regresia logistică e pentru clasificare, nu regresie. Ia un filtru de spam: fiecare email e spam (eticheta 1) sau normal (eticheta 0). Clasa pe care o cauți, aici spam, se numește clasa pozitivă.

Modelul calculează întâi un scor z, cu aceeași combinație liniară ca regresia liniară. Scorul poate ieși orice număr, -7 sau 12, deci nu e o probabilitate. Regresia logistică îl trece printr-o funcție sigmoidă, care strânge orice număr în intervalul 0 până la 1. Rezultatul e o probabilitate: cât de sigur e modelul că exemplul e din clasa pozitivă. De exemplu, 0.9 înseamnă 90% șanse să fie spam.

> [!FORMULA]
> σ(z) = 1 / (1 + e^(-z))
> Sigmoida: transformă scorul liniar z într-o probabilitate între 0 și 1. Numărul e valorează aproximativ 2.718 și e fix, ca π, iar e^(-z) înseamnă e la puterea -z.

σ(0) = 1 / (1 + e^0) = 1 / (1 + 1) = 0.5, deci modelul e nehotărât. σ(2) = 1 / (1 + e^(-2)) ≈ 1 / (1 + 0.135) ≈ 0.88, pentru că e^(-2) = 1 / e² ≈ 0.135. La fel, σ(-2) ≈ 0.12. Cu cât scorul e mai mare, cu atât probabilitatea se apropie de 1, iar cu cât e mai negativ, cu atât se apropie de 0.

Din probabilitate iei decizia cu un prag. Cu pragul 0.5, un email cu probabilitatea 0.88 e marcat spam, iar unul cu 0.12 rămâne normal. Pragul nu e obligatoriu 0.5. Dacă îți pasă mai mult să prinzi toate cazurile pozitive (recall mare), cobori pragul. Dacă vrei să fii sigur când spui pozitiv (precizie mare), îl urci. Pragul e un buton pe care îl reglezi după metrica problemei.

Recall-ul e partea din spamurile adevărate pe care le prinzi, iar precizia e partea din emailurile marcate spam care chiar sunt spam. Cu pragul 0.3, ajunge la spam și un email cu 0.4. Prinzi mai mult spam, deci recall-ul crește, dar ajung acolo și câteva emailuri normale, deci precizia scade. Le calculezi exact în Lecția 8.

```
m = LogisticRegression(max_iter=1000).fit(X_train, y_train)
proba = m.predict_proba(X_val)[:, 1]   # probabilitatea clasei pozitive
pred = (proba > 0.3).astype(int)       # prag 0.3, pentru recall mai mare
```

`fit` întoarce chiar modelul, de aceea poți scrie `.fit(...)` imediat după ce îl creezi, ca la `Medie().fit(...)` în Lecția 3. Regresia logistică își caută parametrii pas cu pas, iar `max_iter` e numărul maxim de pași. Implicit sunt 100, uneori prea puțini: primești atunci un `ConvergenceWarning`, adică modelul n-a terminat de căutat. `max_iter=1000` îi dă de zece ori mai mulți. Dacă avertismentul apare și cu 1000, scalează trăsăturile (Lecția 5).

`predict_proba(X_val)` dă un tabel cu un rând pe email și două coloane: probabilitatea clasei 0 și a clasei 1, care adună 1 (de exemplu 0.19 și 0.81). `[:, 1]` ia toate rândurile, coloana 1, ca `x[:, 0]` din Lecția 4, deci probabilitatea de spam. `proba > 0.3` dă `True` sau `False` pe fiecare rând, iar `.astype(int)` face din `True` 1 și din `False` 0, adică etichete.

## Naïve Bayes: rapid și surprinzător de bun
Rămâi la filtrul de spam. Din emailurile de antrenare numeri cât de des apare fiecare cuvânt în spam și cât de des în emailurile normale. De exemplu, „gratuit” apare în 40% din spamuri și în 5% din emailurile normale, iar „factură” în 10% din spamuri și în 20% din cele normale.

Vine un email nou cu „gratuit” și „factură”. Modelul înmulțește dovezile cuvintelor, separat pentru fiecare clasă: pentru spam 0.40 · 0.10 = 0.04, pentru normal 0.05 · 0.20 = 0.01. Scorul de spam e de 4 ori mai mare, deci emailul are probabilitatea 0.04 / (0.04 + 0.01) = 0.8 să fie spam.

Aici am presupus că jumătate din emailuri sunt spam. Dacă spamul e mai rar, înmulțești fiecare scor și cu cât de frecventă e clasa lui. Cu 20% spam și 80% emailuri normale, scorurile devin 0.2 · 0.04 = 0.008 și 0.8 · 0.01 = 0.008, iar emailul coboară la 50%. Regula asta, care pune la un loc cât de frecventă e o clasă și dovezile din cuvinte, e teorema lui Bayes.

Naïve Bayes aplică teorema lui Bayes presupunând, naiv, că trăsăturile sunt independente între ele. Adică tratează fiecare cuvânt ca și cum n-ar avea legătură cu celelalte, și de aceea poate înmulți pur și simplu dovezile. În realitate, lângă „câștigat” apare des „premiu”, iar modelul numără aceeași dovadă de două ori.

Presupunerea e aproape mereu falsă, dar modelul merge des foarte bine, mai ales pe text. E rapid, are nevoie de puține date, și e un baseline (reperul de la care pornești, Lecția 6) greu de bătut la clasificarea de documente.

În scikit-learn, varianta pentru numărători de cuvinte e `MultinomialNB`: fiecare email devine un rând de numere care spun de câte ori apare în el fiecare cuvânt. Cum scoți automat aceste numere dintr-un text vezi în Lecția 12.

```
from sklearn.naive_bayes import MultinomialNB

# coloane: de câte ori apar gratuit, premiu, factură
X = [[2, 1, 0], [3, 2, 0], [1, 1, 0], [0, 0, 2], [0, 1, 1], [0, 0, 3]]
y = [1, 1, 1, 0, 0, 0]   # 1 = spam, 0 = normal

nb = MultinomialNB().fit(X, y)
print(nb.predict([[1, 0, 0], [0, 0, 1]]))   # [1 0]
```
caption: Un email cu „gratuit” o dată iese spam, unul cu „factură” o dată iese normal.

## Arbori de decizie
Un arbore de decizie pune întrebări simple, una după alta, ca un joc de 20 de întrebări: e vârsta peste 30? e venitul sub o valoare? La fiecare pas împarte datele ca să separe cât mai bine clasele.

Fiecare întrebare stă într-un nod. Răspunsul, da sau nu, trimite rândul pe una din două ramuri, spre nodul următor. Unde nu mai sunt întrebări e o frunză, care dă predicția: clasa cea mai frecventă printre rândurile de antrenare ajunse acolo.

Măsura separării e impuritatea Gini sau entropia: cât de amestecate sunt clasele într-un nod. Gini e 1 minus suma pătratelor proporțiilor fiecărei clase. Un nod cu 5 spamuri și 5 emailuri normale e cât se poate de amestecat: 1 - 0.5² - 0.5² = 0.5. Unul cu 10 spamuri și niciun email normal e pur: 1 - 1² - 0² = 0. Unul cu 8 spamuri și 2 normale e între ele: 1 - 0.8² - 0.2² = 1 - 0.64 - 0.04 = 0.32.

La fiecare nod, arborele încearcă multe întrebări și o alege pe cea după care nodurile de dedesubt ies cât mai pure. Pornești, de exemplu, de la 5 spamuri și 5 normale (Gini 0.5). Întrebarea „conține «gratuit»?” poate trimite 4 spamuri și 1 normal pe da, iar 1 spam și 4 normale pe nu. Ambele noduri noi au Gini 0.32, deci amestecul a scăzut de la 0.5 la 0.32.

Entropia măsoară același amestec cu altă formulă: tot 0 la un nod pur și maximă la jumătate-jumătate. Dă arbori foarte asemănători, iar scikit-learn folosește Gini dacă nu ceri altceva.

Arborii sunt ușor de citit și nu au nevoie de scalare. Fiecare întrebare compară o singură coloană cu un prag, de exemplu „suprafața peste 70 m²?”. Cu suprafața în centimetri pătrați, pragul ar fi 700000, iar rândurile s-ar împărți exact la fel.

Problema lor: lăsați să crească nelimitat, memorează antrenarea până la ultimul exemplu și generalizează prost, adică greșesc pe date noi. Un arbore fără limită pune întrebări până când fiecare frunză e pură, uneori cu un singur rând. Asta se numește overfitting (Lecția 1). Îl limitezi punând o adâncime maximă (câte întrebări pot veni una după alta) sau un minim de exemple pe frunză.

```
from sklearn.tree import DecisionTreeClassifier

arbore = DecisionTreeClassifier(max_depth=4, min_samples_leaf=5)
arbore.fit(X_train, y_train)
print(arbore.score(X_train, y_train))   # acuratețea pe antrenare
print(arbore.score(X_val, y_val))       # acuratețea pe validare
```

`max_depth=4` permite cel mult 4 întrebări pe orice drum, iar `min_samples_leaf=5` cere cel puțin 5 rânduri de antrenare în fiecare frunză. `score` prezice pe tabelul primit și dă acuratețea față de răspunsuri. Setări ca acestea nu se învață din date, le alegi tu înainte de `fit`. Se numesc hiperparametri, ca să nu le confunzi cu parametrii pe care îi învață modelul.

> [!NOTE]
> Un arbore care merge perfect pe antrenare și slab pe validare a memorat, n-a învățat. Semnul clasic de overfitting. Taie-i adâncimea.

## SVM: marginea cea mai mare
Ia două trăsături ale unui email, de exemplu câte linkuri are și câte cuvinte cu majuscule. Fiecare email devine un punct în plan, iar spamurile și emailurile normale formează două grupuri. De obicei le pot despărți multe drepte, iar tu trebuie s-o alegi pe una.

SVM (mașină cu vectori suport) caută granița dintre clase care lasă marginea cea mai mare de o parte și de alta, adică e cât mai departe de cele mai apropiate exemple din fiecare clasă. Ideea e că o graniță cu margine mare generalizează mai bine.

Gândește-te la graniță ca la linia din mijlocul unui drum. SVM caută cel mai lat drum care încape între cele două grupuri, fără niciun punct pe el, iar marginea e lățimea drumului. Punctele de pe marginile drumului se numesc vectori suport: ele „susțin” drumul, iar fiecare punct e un rând de numere, adică un vector. Numai ele decid pe unde trece drumul. Un email nou care cade puțin spre celălalt grup tot rămâne pe partea bună a unui drum lat, pe când un drum îngust l-ar putea lăsa de partea greșită.

Când datele nu se pot separa cu o linie dreaptă, intervine trucul kernel: proiectează datele într-un spațiu cu mai multe dimensiuni, unde devin separabile, fără să calculeze explicit acel spațiu.

Cel mai simplu exemplu e pe o singură axă. Clasa A are punctele -1, 0 și 1, la mijloc, iar clasa B are punctele -3, -2, 2 și 3, de o parte și de alta. Nicio tăietură unică nu le desparte, pentru că B e și la stânga, și la dreapta lui A. Adaugă fiecărui punct a doua coordonată, x². A devine (-1, 1), (0, 0) și (1, 1), iar B devine (-3, 9), (-2, 4), (2, 4) și (3, 9). Acum dreapta orizontală y = 2.5 le desparte: A are y cel mult 1, B cel puțin 4.

Adăugarea lui x² e chiar proiecția într-un spațiu cu mai multe dimensiuni. Trucul e că SVM nu are nevoie de coordonatele noi, ci doar de cât de asemănătoare sunt două puncte. Kernelul e o formulă care dă direct această asemănare, fără să construiască coordonatele noi.

Kernelul RBF e cel mai folosit. Măsoară asemănarea după distanță: puncte apropiate au asemănarea aproape 1, puncte depărtate aproape 0. Cu el, granița se poate curba în jurul grupurilor de puncte.

SVM cere date scalate ca să funcționeze bine, pentru că marginea și asemănarea se calculează din distanțe. Cu venitul în mii și vârsta în zeci, distanța ar depinde aproape numai de venit, exact problema rezolvată de scalare în Lecția 5.

```
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

svm = Pipeline([
    ("sc", StandardScaler()),
    ("svm", SVC(kernel="rbf", C=1.0)),
])
svm.fit(X_train, y_train)
pred = svm.predict(X_val)
```

Pipeline-ul din Lecția 6 leagă scalarea de model, ca `StandardScaler` să învețe media și deviația doar pe datele de antrenare. `SVC` e SVM-ul de clasificare din scikit-learn, iar `kernel="rbf"` și `C=1.0` sunt chiar valorile implicite.

În date reale grupurile se amestecă puțin, deci unele puncte ajung pe drum sau de partea greșită. `C` spune cât de tare le pedepsește modelul. Un `C` mic acceptă câteva greșeli ca să păstreze drumul lat. Un `C` mare vrea să nu greșească la niciun exemplu de antrenare, chiar cu un drum îngust, și riscă overfitting. Încearcă 0.1, 1 și 10 și compară-le pe validare.

# @practice
- Compară regresie logistică, arbore și SVM pe aceeași problemă tabelară, cu aceeași metrică.
- Mișcă pragul regresiei logistice de la 0.5 în jos și urmărește cum crește recall-ul și scade precizia (le măsori cu recall_score și precision_score din sklearn.metrics).
- Limitează adâncimea unui arbore și vezi cum se apropie scorul de antrenare de cel de validare.
