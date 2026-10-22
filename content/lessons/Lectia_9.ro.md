---
code: S13
duration: ~1 săptămână
---

# @intro
De multe ori câștigătorul la o problemă tabelară e un ensemble, nu un singur model. Un ensemble e un grup de modele care prezic împreună. Ideea e simplă: mai multe modele împreună greșesc mai puțin decât unul singur, cu condiția să greșească în locuri diferite. Modulul ăsta îți dă cele două rețete mari, bagging și boosting, și disciplina de a regla setările modelelor fără să te pierzi.

## De ce funcționează combinarea
Trei modele, A, B și C, spun despre cinci emailuri dacă sunt spam sau normale. Fiecare greșește la un singur email, dar fiecare la altul. La vot, pentru fiecare email câștigă răspunsul dat de cel puțin două modele din trei.

- Emailul 1, spam: A zice normal, B și C zic spam. Votul: spam.
- Emailul 2, normal: toate trei zic normal.
- Emailul 3, spam: B zice normal, A și C zic spam. Votul: spam.
- Emailul 4, normal: toate trei zic normal.
- Emailul 5, spam: C zice normal, A și B zic spam. Votul: spam.

Fiecare model nimerește 4 emailuri din 5, adică are acuratețe 80%. Votul le nimerește pe toate 5.

Dacă ai trei modele care greșesc fiecare în alte locuri, votul majorității e mai bun decât oricare singur: acolo unde unul se înșeală, celelalte două îl corectează. Cheia e diversitatea. Trei modele care fac exact aceleași greșeli nu ajută cu nimic combinate: dacă toate trei ar fi zis normal la emailul 1, votul ar fi greșit și el.

Sunt două moduri mari de a construi diversitate: bagging (antrenezi modele în paralel pe date ușor diferite și le mediezi) și boosting (antrenezi modele pe rând, fiecare reparând greșelile celui dinainte).

## Bagging și Random Forest
Bagging înseamnă că antrenezi fiecare model pe un eșantion aleator (cu repetiție) din date, apoi mediezi predicțiile. Eșantionul are tot atâtea rânduri câte are setul de antrenare, trase la sorți unul câte unul: după fiecare tragere, rândul se pune înapoi, deci poate ieși din nou. Din rândurile [A, B, C, D, E] poate ieși [B, B, D, A, E]: B apare de două ori, C lipsește. Așa, fiecare model vede alte date.

„Mediezi predicțiile” înseamnă, la numere, chiar media: dacă trei arbori zic 90, 100 și 110, predicția e 100. La clase, numeri voturile, ca la emailuri, sau faci media probabilităților (Lecția 7).

Un singur arbore adânc are varianță mare (overfit): schimbi puțin datele de antrenare și dă alte predicții, pentru că a învățat pe de rost și ciudățeniile lor (Lecțiile 1 și 8). Dar arborii greșesc fiecare în felul lui. Dacă o casă costă 100 și cinci arbori zic 120, 85, 95, 110 și 95, fiecare greșește cu 5 până la 20, dar media lor, 101, greșește cu 1. Mediind mulți arbori antrenați pe date diferite, varianța scade fără să crească biasul (eroarea din presupuneri prea simple).

Random Forest (pădure aleatoare) e bagging pe arbori, cu un truc în plus: la fiecare împărțire, arborele alege dintr-un subset aleator de trăsături (features, adică coloanele de intrare). La fiecare întrebare de tipul „e vârsta peste 30?” (Lecția 7), arborele se uită doar la câteva coloane trase la sorți: din 16 coloane, `RandomForestClassifier` trage implicit 4 (radical din 16). Asta îi face pe arbori și mai diferiți între ei: fără truc, dacă o coloană e mult mai bună decât restul, toți arborii ar începe cu ea. E robust, greu de stricat, și un prim model excelent pe date tabelare.

```
from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators=400, max_depth=None, n_jobs=-1)
rf.fit(X_train, y_train)
```

`n_estimators=400` înseamnă 400 de arbori. `max_depth=None` înseamnă fără limită de adâncime: fiecare arbore își învață eșantionul aproape pe de rost, iar media îi repară overfitting-ul. `n_jobs` e câte nuclee ale procesorului lucrează deodată, iar -1 înseamnă toate, deci arborii se antrenează în paralel, mai repede. Cu `random_state=42` (Lecția 6), pădurea iese la fel la fiecare rulare.

Feature importance (importanța trăsăturilor) spune cât s-a sprijinit modelul pe fiecare coloană: cât au ajutat întrebările puse pe ea să separe clasele, în medie pe toți arborii. O găsești în `feature_importances_`, un număr pe coloană, în ordinea coloanelor, iar numerele adună 1.

```
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

np.random.seed(0)
elevi = pd.DataFrame({
    "id": np.arange(200),                    # numărul rândului
    "nota": np.random.randint(1, 11, 200),   # de la 1 la 10
})
zar = np.random.randint(1, 7, 200)           # de la 1 la 6
promovat = (elevi["nota"] + zar >= 9).astype(int)

rf = RandomForestClassifier(random_state=0).fit(elevi, promovat)
print(rf.feature_importances_.round(2))      # [0.4 0.6]
```

Aici ținta depinde doar de notă și de noroc: promovat e 1 dacă nota plus un zar dau cel puțin 9. Coloana id e doar numărul rândului și nu spune nimic despre țintă, dar primește 0.4 din importanță. Are 200 de valori diferite, deci arborii găsesc mereu pe ea un prag care mai desparte câteva rânduri, chiar dacă e pură întâmplare.

> [!NOTE]
> Feature importance de la Random Forest e util, dar nu îl crede orbește: favorizează trăsăturile cu multe valori distincte. Folosește-l ca indiciu, nu ca adevăr.

## Boosting: XGBoost și LightGBM
Boosting construiește arbori pe rând. Primul face o predicție aproximativă, al doilea învață să corecteze greșelile primului, al treilea greșelile rămase, și tot așa. Fiecare arbore e mic, dar împreună dau un model foarte bun. E des câștigătorul la probleme tabelare.

Ia o casă care costă 100 (de mii de euro). Primul pas dă o estimare grosieră, de obicei media prețurilor, să zicem 80. Al doilea arbore nu mai învață prețul, ci greșeala rămasă: 100 - 80 = 20.

Boosting nu adaugă toată corecția, ci doar o parte din ea, iar partea asta se numește learning rate (rata de învățare). Cu learning rate 0.1 adaugi 0.1 · 20 = 2 și ajungi la 82. Al treilea arbore învață ce a rămas, 18, și adaugă 1.8, deci 83.8. Al patrulea învață 16.2 și adaugă 1.62, deci 85.42. Fiecare arbore închide o zecime din distanța rămasă.

Pașii sunt mici pentru că fiecare arbore învață și din zgomotul datelor de antrenare (Lecția 1), deci corecția lui e puțin greșită. Cu pași mici, greșeala unui arbore contează puțin, iar următorii o repară. Prețul e timpul: îți trebuie mai mulți arbori.

Cu prea mulți arbori, ultimii învață doar zgomot: scorul pe antrenare tot crește, dar cel pe validare se oprește și apoi scade (overfitting). Early stopping (oprire timpurie) înseamnă că, după fiecare arbore nou, verifici scorul pe validare și te oprești când nu se mai îmbunătățește câteva runde la rând.

Varianta folosită în practică se numește gradient boosting. XGBoost și LightGBM sunt implementările rapide și de referință. De obicei scot scoruri mai bune decât Random Forest, dar sunt și mai ușor de dus în overfitting, deci cer reglare atentă. Nu vin cu scikit-learn: le instalezi cu `pip install xgboost lightgbm` și le folosești la fel, cu `fit` și `predict` (`XGBClassifier`, `LGBMClassifier`). Verifică întâi regulamentul concursului: nu la orice etapă sunt permise bibliotecile externe.

Dacă nu ai voie cu ele, scikit-learn are varianta lui, `HistGradientBoostingClassifier`, inspirată din LightGBM și rapidă pe date mari. Are și early stopping.

```
from sklearn.ensemble import HistGradientBoostingClassifier

hgb = HistGradientBoostingClassifier(
    learning_rate=0.1,
    max_iter=1000,            # cel mult 1000 de arbori
    early_stopping=True,
    validation_fraction=0.1,
    n_iter_no_change=10,
    random_state=0,
)
hgb.fit(X_train, y_train)
print(hgb.n_iter_)            # câți arbori a construit până s-a oprit
```

`learning_rate=0.1` e pasul din exemplul cu casa, iar `max_iter` e numărul maxim de arbori (în alte biblioteci, `n_estimators`). Cu `early_stopping=True`, modelul pune deoparte 10% din X_train ca validare (`validation_fraction=0.1`) și se oprește după 10 arbori la rând fără progres pe ea (`n_iter_no_change=10`). `random_state=0` alege aceeași bucată de validare la fiecare rulare. După `fit`, `n_iter_` îți spune câți arbori a construit, de multe ori mult sub 1000.

## Reglarea hiperparametrilor, în ordine
Hiperparametrii sunt setările pe care le alegi tu înainte de antrenare (câți arbori, cât de adânci), spre deosebire de parametrii pe care modelul îi învață singur. Ai văzut deja câțiva: `n_estimators`, `max_depth`, `learning_rate`. Greșeala clasică e să reglezi zeci deodată și să nu mai știi ce a ajutat. Mergi în ordine, un lucru pe rând, și după fiecare schimbare notează scorul pe validare. Ordinea de mai jos e pentru boosting.

1. Pornește cu un learning rate mic-moderat (0.05 sau 0.1) și un număr rezonabil de arbori (câteva sute).
2. Reglează întâi adâncimea arborilor (complexitatea fiecăruia): încearcă, de exemplu, 3, 5 și 8 niveluri.
3. Apoi numărul de arbori (`n_estimators`), cu early stopping pe validare: modelul se oprește singur, iar tu reții câți arbori a folosit.
4. La final, coboară learning rate-ul și crește numărul de arbori proporțional, pentru un plus de scor: de la 0.1 cu 300 de arbori, de exemplu, treci la 0.05 cu 600.

> [!NOTE]
> Learning rate mic plus mai mulți arbori dă aproape mereu un scor mai bun decât learning rate mare, dar antrenează mai lent. E compromisul clasic timp contra scor.

## Voting și stacking
Cel mai simplu ensemble între modele diferite e votul: pui un Random Forest, un boosting și o regresie logistică să voteze, sau le mediezi probabilitățile. Merge cel mai bine când modelele sunt de tipuri diferite, deci greșesc diferit.

Probabilitatea (Lecția 7, `predict_proba`) e un număr între 0 și 1: cât de sigur e modelul. Votul și media pot da răspunsuri diferite. Pentru un email, cele trei modele dau probabilitatea de spam 0.9, 0.4 și 0.45. La vot, fiecare model zice spam doar dacă probabilitatea lui trece de 0.5, deci un vot e pentru spam și două pentru normal: câștigă normal. La medie, (0.9 + 0.4 + 0.45) / 3 ≈ 0.58, peste 0.5, deci spam: un model foarte sigur cântărește mai mult decât doi nehotărâți.

```
from sklearn.ensemble import VotingClassifier
from sklearn.linear_model import LogisticRegression

vot = VotingClassifier(
    estimators=[
        ("rf", RandomForestClassifier(n_estimators=300, random_state=0)),
        ("hgb", HistGradientBoostingClassifier(random_state=0)),
        ("lr", LogisticRegression(max_iter=1000)),
    ],
    voting="soft",   # media probabilităților
)
vot.fit(X_train, y_train)
pred = vot.predict(X_val)
```

`estimators` e o listă de perechi (nume, model), tupluri ca în Lecția 3, cu nume alese de tine. `voting="soft"` face media probabilităților, iar `voting="hard"` numără voturile. De obicei soft merge puțin mai bine. `fit` le antrenează pe toate trei, iar `predict` combină răspunsurile. Dacă regresia logistică dă un ConvergenceWarning, scalează întâi datele (Lecția 5).

Stacking merge mai departe: antrenează un model final care învață cum să combine predicțiile celorlalte. Trăsăturile lui sunt predicțiile modelelor de bază, adică ale celor pe care le combini (probabilitatea de spam dată de Random Forest, cea dată de boosting), iar ținta e eticheta adevărată. Așa poate învăța, de exemplu, că boosting-ul are dreptate mai des. Poate scoate un scor mai bun decât votul, dar te duce mai ușor la scurgeri de date (data leakage, Lecția 8) dacă nu folosești predicții out-of-fold.

Predicțiile out-of-fold („din afara fold-ului”) folosesc k-fold-ul din Lecția 8. Împarți datele de antrenare în 5 părți, antrenezi modelele de bază pe părțile 2, 3, 4 și 5 și prezici pe partea 1, apoi faci la fel pentru fiecare parte. Așa, fiecare rând primește o predicție de la modele care nu l-au văzut la antrenare.

Fără asta, modelele de bază ar prezice pe rândurile pe care s-au antrenat, iar predicțiile ar ieși prea bune: un Random Forest cu arbori adânci nimerește aproape tot ce a văzut. Modelul final ar învăța să aibă încredere oarbă în ele și ar greși pe test, unde predicțiile sunt mai slabe.

```
from sklearn.ensemble import StackingClassifier

stack = StackingClassifier(
    estimators=[
        ("rf", RandomForestClassifier(n_estimators=300, random_state=0)),
        ("hgb", HistGradientBoostingClassifier(random_state=0)),
    ],
    final_estimator=LogisticRegression(max_iter=1000),
    cv=5,   # predicții out-of-fold, cu 5 părți
)
stack.fit(X_train, y_train)
pred = stack.predict(X_val)
```

`final_estimator` e modelul care învață să le combine, iar `cv=5` face predicțiile out-of-fold cu 5 părți. La final, scikit-learn reantrenează modelele de bază pe tot X_train, ca să poată prezice pe date noi. Începe cu voting simplu, treci la stacking doar dacă ai timp.

# @practice
- Antrenează un Random Forest și un gradient boosting (de exemplu HistGradientBoostingClassifier) pe aceeași problemă și compară scorurile.
- Fă un voting între trei modele diferite și vezi dacă bate cel mai bun singur model.
- Reglează learning rate-ul cu early stopping și observă compromisul timp contra scor.
