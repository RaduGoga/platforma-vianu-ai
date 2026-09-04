---
code: S8
duration: ~3 săptămâni
---

# @intro
Aici înveți uneltele de bază ale învățării supervizate: regresie liniară și logistică, Naïve Bayes, arbori de decizie, SVM. Supervizat înseamnă că ai exemple cu răspunsul corect (etichete) și modelul învață din ele. Nu te opri la cum le chemi din scikit-learn. Înțelege ce optimizează fiecare și când se potrivește, pentru că asta te face să alegi bine la concurs.

## Ce înseamnă a antrena un model
Un model are niște parametri (numere interne) pe care îi ajustează ca să greșească cât mai puțin pe exemplele de antrenare. Măsura greșelii se numește funcție de cost sau loss. A antrena înseamnă a găsi parametrii care minimizează loss-ul.

În scikit-learn tiparul e mereu același: creezi modelul, îl antrenezi cu fit pe datele de antrenare, apoi prezici cu predict pe date noi. Simplu la suprafață, dar sub capotă fiecare model face ceva diferit.

```
model = LogisticRegression()
model.fit(X_train, y_train)     # învață parametrii
y_pred = model.predict(X_val)   # prezice pe date noi
```

## Regresie liniară: prezici un număr
Regresia liniară prezice o valoare continuă (un preț, o temperatură) ca o combinație liniară a trăsăturilor. Caută linia (sau planul, în mai multe dimensiuni) care trece cel mai bine prin date.

> [!FORMULA]
> ŷ = w₁x₁ + w₂x₂ + ... + b
> Fiecare trăsătură x are o greutate w care spune cât contează. b e termenul liber. Modelul învață w-urile și b.

Minimizează eroarea pătratică: suma pătratelor diferențelor dintre predicție și adevăr. Pătratul pedepsește greșelile mari mai tare. Un avantaj mare al regresiei liniare: coeficienții se pot citi. Un w pozitiv mare înseamnă că trăsătura aia împinge predicția în sus.

## Regresie logistică: prezici o clasă
În ciuda numelui, regresia logistică e pentru clasificare, nu regresie. Ia aceeași combinație liniară și o trece printr-o funcție sigmoidă, care strânge orice număr în intervalul 0 până la 1. Rezultatul e o probabilitate: cât de sigur e modelul că exemplul e din clasa pozitivă.

> [!FORMULA]
> σ(z) = 1 / (1 + e^(-z))
> Sigmoida: transformă scorul liniar z într-o probabilitate între 0 și 1.

Din probabilitate iei decizia cu un prag. Pragul nu e obligatoriu 0.5. Dacă îți pasă mai mult să prinzi toate cazurile pozitive (recall mare), cobori pragul. Dacă vrei să fii sigur când spui pozitiv (precizie mare), îl urci. Pragul e un buton pe care îl reglezi după metrica problemei.

```
m = LogisticRegression(max_iter=1000).fit(X_train, y_train)
proba = m.predict_proba(X_val)[:, 1]   # probabilitatea clasei pozitive
pred = (proba > 0.3).astype(int)       # prag mutat la 0.3 pentru recall mai mare
```

## Naïve Bayes: rapid și surprinzător de bun
Naïve Bayes aplică teorema lui Bayes presupunând, naiv, că trăsăturile sunt independente între ele. Presupunerea e aproape mereu falsă, dar modelul merge des foarte bine, mai ales pe text. E rapid, are nevoie de puține date, și e un baseline greu de bătut la clasificarea de documente.

## Arbori de decizie
Un arbore de decizie pune întrebări simple, una după alta, ca un joc de 20 de întrebări: e vârsta peste 30? e venitul sub o valoare? La fiecare pas împarte datele ca să separe cât mai bine clasele. Măsura separării e impuritatea Gini sau entropia: cât de amestecate sunt clasele într-un nod.

Arborii sunt ușor de citit și nu au nevoie de scalare. Problema lor: lăsați să crească nelimitat, memorează antrenarea până la ultimul exemplu și generalizează prost pe date noi. Asta se numește overfitting. Îl limitezi punând o adâncime maximă sau un minim de exemple pe frunză.

> [!NOTE]
> Un arbore care merge perfect pe antrenare și slab pe validare a memorat, n-a învățat. Semnul clasic de overfitting. Taie-i adâncimea.

## SVM: marginea cea mai mare
SVM (mașină cu vectori suport) caută granița dintre clase care lasă marginea cea mai mare de o parte și de alta, adică e cât mai departe de cele mai apropiate exemple din fiecare clasă. Ideea e că o graniță cu margine mare generalizează mai bine.

Când datele nu se pot separa cu o linie dreaptă, intervine trucul kernel: proiectează datele într-un spațiu cu mai multe dimensiuni, unde devin separabile, fără să calculeze explicit acel spațiu. Kernelul RBF e cel mai folosit. SVM cere date scalate ca să funcționeze bine.

# @takeaways
- A antrena = a găsi parametrii care minimizează funcția de cost.
- Regresie liniară prezice numere și dă coeficienți citibili; logistică prezice probabilități de clasă.
- Pragul regresiei logistice se reglează după metrică, nu e fix 0.5.
- Arborii sunt citibili dar fac overfitting fără limitare de adâncime.
- SVM maximizează marginea; kernelul îl lasă să separe date neliniare.

# @pitfalls
- Scalează trăsăturile înainte să interpretezi coeficienții unei regresii.
- Limitează adâncimea arborelui, altfel merge perfect pe antrenare și slab pe validare.
- Scalează datele înainte de SVM; fără asta merge inexplicabil de prost.

# @practice
- Compară regresie logistică, arbore și SVM pe aceeași problemă tabelară, cu aceeași metrică.
- Mișcă pragul regresiei logistice de la 0.5 în jos și urmărește cum cresc recall-ul și scad precizia.
- Limitează adâncimea unui arbore și vezi cum se apropie scorul de antrenare de cel de validare.
