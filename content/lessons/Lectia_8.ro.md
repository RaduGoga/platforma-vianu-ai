---
code: S11
duration: ~2 săptămâni
---

# @intro
Aici se câștigă sau se pierde concursul. Un model care pare bun pe clasamentul public poate fi slab pe cel ascuns (clasamentul privat din Lecția 2), care contează la final. Modulul ăsta e despre cum să ai încredere justificată în scorul tău. E cea mai puțin spectaculoasă parte și cea care face diferența dintre un top 10 și un mijloc de clasament.

## De ce acuratețea te minte
Acuratețea e procentul de predicții corecte. Sună rezonabil, dar pe clase dezechilibrate (o clasă mult mai rară decât cealaltă, Lecția 5) e înșelătoare. Dacă 98% din exemple sunt clasa „nu”, un model care spune mereu „nu” are 98% acuratețe și zero valoare: nu găsește niciodată cazurile pe care le cauți. De asta ai nevoie de metrici care se uită la fiecare clasă separat.

## Matricea de confuzie: temelia
Matricea de confuzie e un tabel de 2 pe 2 care numără cele patru feluri de rezultat pentru o clasificare binară, adică cu două clase. E baza din care se calculează toate celelalte metrici, deci merită înțeleasă bine.

Una dintre clase e cea pe care o cauți, de exemplu spam: ea e clasa pozitivă, iar emailurile normale sunt clasa negativă (ca la regresia logistică din Lecția 7). În fiecare nume de mai jos, a doua parte spune ce ai prezis, iar prima dacă ai avut dreptate.

- TP (adevărat pozitiv): era pozitiv, ai zis pozitiv. Corect.
- TN (adevărat negativ): era negativ, ai zis negativ. Corect.
- FP (fals pozitiv): era negativ, ai zis pozitiv. Alarmă falsă.
- FN (fals negativ): era pozitiv, ai zis negativ. L-ai ratat.

Un exemplu. Din 100 de emailuri, 10 sunt spam. Modelul marchează 12 ca spam, iar dintre ele 8 chiar sunt. Deci TP = 8 (spamuri prinse), FP = 4 (emailuri normale marcate greșit), FN = 2 (spamuri scăpate) și TN = 86 (emailuri normale lăsate în pace), care adună 100. Acuratețea e (8 + 86) / 100 = 0.94, deși modelul ratează un spam din cinci.

```
import numpy as np
from sklearn.metrics import confusion_matrix

# 100 de emailuri: 1 = spam, 0 = normal
y_true = np.array([1] * 10 + [0] * 90)
# modelul prinde 8 spamuri, ratează 2 și dă 4 alarme false
y_pred = np.array([1] * 8 + [0] * 2 + [1] * 4 + [0] * 86)

print(confusion_matrix(y_true, y_pred))
# [[86  4]
#  [ 2  8]]
```

`[1] * 10` e o listă cu zece de 1, iar `+` lipește listele una după alta, deci `y_true` are întâi cele 10 spamuri, apoi cele 90 de emailuri normale. `y_pred` are predicțiile, în aceeași ordine. În rezultat, rândurile sunt răspunsurile adevărate și coloanele predicțiile, întâi clasa 0, apoi clasa 1. Deci sus-stânga e TN, sus-dreapta FP, jos-stânga FN și jos-dreapta TP.

Ce te doare mai tare depinde de problemă. La un test de boală, un fals negativ (bolnav trimis acasă) e mai grav decât un fals pozitiv. La un filtru de spam, invers: un email important mutat la spam te costă mai mult decât o reclamă scăpată în inbox. Metrica bună reflectă ce cost real are fiecare tip de greșeală.

## Precizie, recall, F1
> [!FORMULA]
> precizie = TP / (TP + FP)
> Din câte ai zis că sunt pozitive, câte chiar erau. Precizie mare = puține alarme false. În exemplu: 8 / (8 + 4) = 8 / 12 ≈ 0.67.

> [!FORMULA]
> recall = TP / (TP + FN)
> Din câte erau de fapt pozitive, câte ai prins. Recall mare = ratezi puține. În exemplu: 8 / (8 + 2) = 0.8.

Precizia și recall-ul trag în direcții opuse. Dacă spui pozitiv doar când ești foarte sigur, precizia crește dar recall-ul scade. Dacă spui pozitiv des, invers. Exact asta reglezi cu pragul din Lecția 7. F1 le împacă într-un singur număr, media lor armonică, care e mică dacă oricare din ele e mică.

> [!FORMULA]
> F1 = 2 · (precizie · recall) / (precizie + recall)
> Media armonică. Pedepsește dezechilibrul: nu poți avea F1 mare cu recall minuscul. În exemplu: 2 · (0.67 · 0.8) / (0.67 + 0.8) ≈ 0.73.

Media obișnuită ar ascunde problema. Un model care marchează spam un singur email, de care e absolut sigur, și nimerește, are precizia 1.0. Din cele 10 spamuri a prins însă unul, deci recall-ul e 0.1. Media obișnuită ar da (1.0 + 0.1) / 2 = 0.55, un scor care pare decent pentru un model aproape inutil. F1 dă 2 · (1.0 · 0.1) / (1.0 + 0.1) ≈ 0.18.

```
from sklearn.metrics import classification_report

print(classification_report(y_true, y_pred))
#               precision    recall  f1-score   support
#
#            0       0.98      0.96      0.97        90
#            1       0.67      0.80      0.73        10
#
#     accuracy                           0.94       100
#    macro avg       0.82      0.88      0.85       100
# weighted avg       0.95      0.94      0.94       100
```

`classification_report` face toate calculele deodată, pe `y_true` și `y_pred` de mai sus. Rândul 1 e clasa spam: 0.67, 0.80 și 0.73, exact ce ai calculat de mână. Rândul 0 face aceleași calcule cu emailurile normale pe post de clasă pozitivă. `support` e câte rânduri din fiecare clasă sunt în date. `accuracy` e acuratețea de 0.94 de mai sus, iar ultimele două rânduri sunt două feluri de a face media pe clase.

La fel calculezi și cu mai mult de două clase: câte un F1 pentru fiecare clasă, tratată pe rând drept clasa pozitivă, apoi o medie. Ia 100 de poze, cu 80 de câini, 15 iepuri și 5 papagali, și un model cu F1 0.9 pe câini, 0.6 pe iepuri și 0.2 pe papagali. Media simplă, macro-F1, e (0.9 + 0.6 + 0.2) / 3 ≈ 0.57. Media ponderată, weighted-F1, înmulțește fiecare F1 cu partea din date a clasei: 0.8 · 0.9 + 0.15 · 0.6 + 0.05 · 0.2 = 0.82. Papagalii trag macro-F1 în jos, dar în weighted-F1 abia se simt.

> [!NOTE]
> Când ai multe clase, F1 se agregă. Macro-F1 face media pe clase tratându-le egal (bun când îți pasă de clasele rare). Weighted-F1 ține cont de mărimea fiecărei clase. În `f1_score` le alegi cu `average="macro"` sau `average="weighted"`, ca în Lecția 6. Citește în regulament care se punctează și optimizează exact pe aia.

## Validare fără scurgeri
O scurgere de date (data leakage) e când, fără să vrei, informație din datele pe care evaluezi (validare sau test) ajunge în antrenare. Rezultatul: scor local grozav care se prăbușește pe clasamentul real. E cel mai perfid mod de a pierde puncte, pentru că totul pare în regulă. Câteva exemple des întâlnite:

- Scalarea sau imputarea învățată pe toate rândurile, înainte de împărțire. Media din `StandardScaler` conține deja valori din validare, deci modelul a „văzut” ceva din ea (Lecția 5).
- Același pacient în antrenare și în validare. Dacă are cinci vizite, trei ajung în antrenare și două în validare, iar modelul învață să recunoască pacientul, nu boala. Pe pacienți noi, scorul cade.
- O coloană calculată din răspuns. Prezici dacă un client își va închide contul, iar o coloană e data închiderii: există doar la cei care au plecat, deci îi dă modelului răspunsul.

Aperi-te împărțind datele corect. Ține un set de validare pe care modelul nu-l vede la antrenare și pe care îl folosești ca să estimezi scorul real.

Mai bine, folosește k-fold: împarți datele în k părți, antrenezi pe k-1 și testezi pe una, rotind, apoi mediezi. Fiecare parte se numește fold. Cu k = 5 și 100 de rânduri, fiecare fold are 20. În prima rundă antrenezi pe fold-urile 2, 3, 4 și 5 (80 de rânduri) și măsori pe fold-ul 1. În a doua antrenezi pe 1, 3, 4, 5 și măsori pe 2, și tot așa, de cinci ori. Fiecare rând ajunge exact o dată în validare, iar la final faci media celor 5 scoruri.

Așa folosești toate datele și ai o estimare mai stabilă. Cu o singură validare de 20 de rânduri, scorul depinde mult de ce rânduri au nimerit acolo, iar media a cinci scoruri depinde mai puțin de noroc.

Când clasele sunt dezechilibrate, folosește k-fold stratificat, care păstrează proporția claselor în fiecare fold. Altfel un fold poate să nu conțină deloc clasa rară. Cu 10 spamuri în 100 de rânduri, varianta stratificată pune exact 2 spamuri în fiecare fold de 20, ca `stratify` din Lecția 6. O împărțire la întâmplare poate da, de exemplu, 4 spamuri într-un fold și niciunul în altul.

Când datele au timp sau grupuri (același pacient în mai multe rânduri), split-ul trebuie să le respecte, altfel modelul trage cu ochiul. Adică vede la antrenare ceva ce nu va avea când prezice de-adevăratelea, ca un elev care a zărit subiectele înainte de test. La grupuri, toate rândurile unui pacient merg în același fold. La date în timp, antrenezi pe trecut și validezi pe ce urmează, cum va lucra și modelul în realitate. În scikit-learn ai `GroupKFold` pentru grupuri (coloana cu pacientul o dai prin argumentul `groups`) și `TimeSeriesSplit` pentru timp.

```
from sklearn.model_selection import StratifiedKFold, cross_val_score
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
scoruri = cross_val_score(model, X, y, cv=cv, scoring="f1_macro")
print(scoruri.mean(), scoruri.std())
```

`StratifiedKFold(n_splits=5, ...)` pregătește împărțirea în 5 fold-uri stratificate. `shuffle=True` amestecă rândurile înainte, ca fold-urile să nu urmeze ordinea din fișier, iar `random_state=0` face amestecarea la fel la fiecare rulare (Lecția 6). La date în timp nu amesteca: acolo ordinea contează.

`cross_val_score` face singur cele 5 runde. Primește modelul, toate datele de antrenare, `X` și `y` (validarea o fac fold-urile, nu o mai separi tu), împărțirea din `cv` și metrica din `scoring`, aici F1 macro. Dacă `model` e un Pipeline (Lecția 6), scalarea se învață din nou în fiecare rundă, doar pe fold-urile de antrenare, deci nu se scurge nimic.

Întoarce un array cu 5 scoruri, câte unul pe fold. `mean()` e media lor, scorul tău estimat. `std()` e deviația standard (σ de la standardizare, Lecția 5): cât de mult variază scorurile de la un fold la altul. Scorurile 0.81, 0.79, 0.83, 0.80 și 0.82 au media 0.81 și deviația 0.014, deci estimarea e stabilă. Scorurile 0.60, 0.95, 0.70, 0.88 și 0.92 au tot media 0.81, dar deviația 0.14: acolo, o diferență de 0.01 între două modele poate fi doar noroc.

## Bias, varianță și curba de învățare
Două boli opuse, pe care le-ai întâlnit în Lecția 1. Bias mare (underfitting): modelul e prea simplu, merge slab și pe antrenare, și pe validare. Varianță mare (overfitting): modelul e prea complex, merge grozav pe antrenare dar slab pe validare, pentru că a memorat.

Cu arborii din Lecția 7: unul cu o singură întrebare poate avea scorul 0.70 pe antrenare și 0.68 pe validare, adică bias. Unul fără limită de adâncime poate avea 1.00 pe antrenare și 0.75 pe validare, adică varianță.

Curba de învățare le diagnostichează: desenezi scorul de antrenare și cel de validare pe măsură ce crești datele. Concret, antrenezi modelul pe tot mai multe rânduri, de exemplu 80, 200, 400, 600 și 800, și de fiecare dată măsori ambele scoruri. Pe axa x pui câte rânduri de antrenare ai folosit, pe axa y scorul, și ies două linii. De obicei, cea de antrenare coboară puțin (multe exemple se memorează mai greu), iar cea de validare urcă (modelul a văzut mai multe cazuri).

Dacă amândouă sunt joase și apropiate, ai bias, îți trebuie un model mai complex, de exemplu un arbore mai adânc. Dacă e o prăpastie mare între ele, ai varianță, îți trebuie mai multe date sau regularizare. Regularizarea e orice limită pusă modelului ca să nu poată memora: la arbori, `max_depth` e o formă de regularizare, iar la rețele neuronale o vezi în Lecția 15.

```
import matplotlib.pyplot as plt
from sklearn.model_selection import learning_curve

marimi, sc_train, sc_val = learning_curve(
    model, X, y, cv=5, scoring="f1_macro",
    train_sizes=[0.1, 0.25, 0.5, 0.75, 1.0],
)
plt.plot(marimi, sc_train.mean(axis=1), label="antrenare")
plt.plot(marimi, sc_val.mean(axis=1), label="validare")
plt.xlabel("rânduri de antrenare")
plt.ylabel("F1 macro")
plt.legend()
plt.show()
```

`learning_curve` face singur antrenările. Pentru fiecare valoare din `train_sizes` folosește acea parte din rândurile de antrenare (10%, 25% și așa mai departe) și rulează un k-fold cu `cv=5`. Cu 1000 de rânduri, fiecare rundă are 800 de rânduri de antrenare, deci mărimile ies 80, 200, 400, 600 și 800. Întoarce trei lucruri: mărimile, apoi scorurile pe antrenare și pe validare, câte unul pentru fiecare mărime și fiecare fold. `mean(axis=1)` face media pe fold-uri pentru fiecare mărime (Lecția 4).

`label` dă numele fiecărei linii, iar `plt.legend()` le afișează. Cele două `plt.plot` înainte de un singur `plt.show()` desenează liniile pe același grafic, exact ce vrei aici.

## Cele două submisii finale
La ONIA alegi la fiecare problemă două submisii, și doar ele intră în clasamentul final (Lecția 2).

> [!NOTE]
> Regula de aur: la final alege conștient cele două submisii. Una pe scorul tău local (validarea, de exemplu media din k-fold) cel mai bun, una pe clasamentul public cel mai bun. Dacă local și public sunt de acord, ai încredere. Dacă diferă mult, ai o scurgere sau un split prost. Nu lăsa submisiile finale pe ultimele trimise din reflex.

# @practice
- Desenează o curbă de învățare și decide dacă modelul suferă de bias sau de varianță.
- Găsește o scurgere de date într-un pipeline dat și repar-o.
- Calculează manual precizie, recall și F1 dintr-o matrice de confuzie dată.
