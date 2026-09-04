---
code: S6
duration: ~2 săptămâni
---

# @intro
Înainte să antrenezi orice, uită-te la date. La distribuții, la ce lipsește, la cum sunt scalate coloanele. Sună plictisitor, dar jumătate din câștig vine de aici, nu din modelul ales. Etapa asta se numește EDA, analiză exploratorie, și e prima pe care o faci la orice problemă nouă.

## Ce cauți când te uiți la date
EDA înseamnă să pui întrebări simple datelor și să te uiți la răspuns înainte să tragi vreo concluzie. Câte rânduri și coloane sunt. Ce tip are fiecare coloană. Cum arată ținta, adică ce vrei să prezici. Ce lipsește și cât de mult.

Trasează distribuția fiecărei coloane numerice cu o histogramă. Vezi imediat dacă e simetrică, dacă are o coadă lungă, dacă are valori imposibile (o vârstă de 200, un preț negativ). Astea sunt semne de erori în date pe care le prinzi din ochi.

```
df["varsta"].hist(bins=30)
df["tinta"].value_counts()     # câte exemple din fiecare clasă
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

Corelația nu înseamnă cauzalitate. Două lucruri pot crește împreună fără ca unul să-l provoace pe celălalt. E doar un indiciu unde să te uiți, nu o concluzie.

## Valori lipsă: întâi de ce, apoi cum
Înainte să umpli o valoare lipsă, întreabă-te de ce lipsește. Uneori lipsa e o eroare de colectare. Alteori lipsa e chiar informație: un câmp gol la venit poate însemna că persoana a refuzat să răspundă, ceea ce e semnificativ. În cazul ăsta, adaugă o coloană separată care marchează lipsa.

Umplerea (imputarea) se face cu media, mediana sau valoarea cea mai frecventă, ori cu un model. Mediana e mai sigură ca media când sunt outlieri, pentru că nu e trasă de valorile extreme.

```
from sklearn.impute import SimpleImputer
imp = SimpleImputer(strategy="median").fit(X_train)
X_train = imp.transform(X_train)
X_val = imp.transform(X_val)    # aceiași parametri, învățați pe train
```

## Scalarea: de ce și cum
Multe modele măsoară distanțe (kNN, K-Means) sau folosesc gradient (regresie, rețele). Pentru ele, o coloană cu valori mari (venitul, în mii) domină una cu valori mici (vârsta, zeci) doar prin scală, nu prin importanță. Scalarea le aduce la aceeași măsură.

> [!FORMULA]
> z = (x - μ) / σ
> Standardizarea: scazi media μ și împarți la deviația standard σ. Rezultatul are media 0 și deviația 1.

Normalizarea min-max aduce, în schimb, valorile în intervalul 0 până la 1. Standardizarea e mai des folosită. Important nu e care, ci regula de mai jos.

> [!NOTE]
> Regula de bază a preprocesării: învață parametrii (medie, deviație, mediană) doar pe setul de antrenare, apoi aplică-i pe validare și test. Niciodată invers. Altfel test-ul se scurge în antrenare și scorul tău e o minciună.

```
from sklearn.preprocessing import StandardScaler
sc = StandardScaler().fit(X_train)      # învață μ și σ pe TRAIN
X_train = sc.transform(X_train)
X_val = sc.transform(X_val)             # aplică aceiași μ și σ
```

## Variabile categorice
Un model vrea numere, dar multe coloane sunt categorii: oraș, culoare, tip. Nu le poți da direct ca text și nici nu le poți numerota 1,2,3 la întâmplare, pentru că modelul ar crede că 3 e mai mare ca 1, ceea ce n-are sens pentru culori.

One-hot encoding rezolvă asta: face din fiecare categorie o coloană separată de 0 și 1. Roșu devine [1,0,0], verde [0,1,0]. Nicio categorie nu e mai mare ca alta.

```
pd.get_dummies(df, columns=["oras", "culoare"])
```

# @takeaways
- EDA înseamnă să te uiți la date (distribuții, lipsuri, echilibrul claselor) înainte de orice model.
- Clasele dezechilibrate schimbă metrica și modul de împărțire a datelor.
- Întreabă de ce lipsește o valoare înainte s-o umpli; uneori lipsa e informație.
- Scalarea aduce coloanele la aceeași măsură pentru modele bazate pe distanță sau gradient.
- Învață parametrii de preprocesare doar pe train, aplică-i pe val/test.

# @pitfalls
- Învață parametrii de preprocesare doar pe antrenare, după split.
- Impută valorile lipsă cu statistici calculate doar pe antrenare.
- Folosește one-hot pentru categorii fără ordine; numerotarea 1, 2, 3 inventează o ordine.

# @practice
- Fă un raport de completitudine pe un set și decide ce coloane păstrezi.
- Compară trei strategii de imputare (medie, mediană, cea mai frecventă) pe aceeași problemă.
- Standardizează corect: fit pe train, transform pe val, și verifică că mediile pe train sunt aproape 0.
