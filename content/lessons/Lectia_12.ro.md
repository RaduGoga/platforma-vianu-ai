---
code: S16
duration: ~1 săptămână
---

# @intro
Se poate face NLP serios fără deep learning. TF-IDF plus un model liniar rezolvă multe probleme de clasificare de text, rapid, explicabil, și e un baseline greu de bătut. Înainte să scoți artileria grea, construiește ăsta. De multe ori e suficient, și mereu e reperul față de care judeci orice model mai complicat.

## Problema: modelele vor numere, tu ai text
Un model matematic lucrează cu numere, dar textul e șir de caractere. Tot NLP-ul clasic e despre cum transformi text în vectori de numere care păstrează sensul, ca să poți pune un model obișnuit deasupra. Pașii sunt: cureți textul, îl tai în unități, îl transformi în numere.

## Preprocesarea textului
Tokenizarea taie textul în unități, de obicei cuvinte. Apoi scoți stopwords, cuvintele foarte frecvente și fără conținut (și, sau, de, la), care doar adaugă zgomot. Lematizarea aduce cuvintele la forma de bază: mergeam, mergi, mers devin merge, ca să nu le trateze modelul ca lucruri complet diferite.

> [!NOTE]
> La română, atenție la diacritice și la flexiunea bogată. Același cuvânt apare scris cu și fără diacritice și în multe forme. Normalizează consecvent (de exemplu, tratezi la fel ș și s), altfel pierzi potriviri și împrăștii semnalul pe forme separate.

## Bag-of-words și TF-IDF
Bag-of-words (sac de cuvinte) reprezintă un document prin câte apariții are fiecare cuvânt din vocabular, ignorând ordinea. Simplu, dar cuvintele comune (care apar peste tot) îneacă semnalul, pentru că au numere mari fără să fie informative.

TF-IDF repară asta cântărind fiecare cuvânt după două lucruri: cât de des apare în document (TF, term frequency) și cât de rar e în restul documentelor (IDF, inverse document frequency). Un cuvânt care apare des într-un document dar rar în rest primește greutate mare, pentru că e caracteristic acelui document.

> [!FORMULA]
> tf-idf(cuvânt, doc) = tf(cuvânt, doc) · log(N / df(cuvânt))
> tf = de câte ori apare cuvântul în document. N = numărul total de documente. df = în câte documente apare cuvântul. Cuvintele omniprezente primesc IDF aproape 0.

```
from sklearn.feature_extraction.text import TfidfVectorizer
vec = TfidfVectorizer(ngram_range=(1, 2), min_df=2)
X = vec.fit_transform(texte_train)      # fit DOAR pe train
X_val = vec.transform(texte_val)        # transform pe val
```
caption: ngram_range=(1,2) prinde și perechi de cuvinte, nu doar cuvinte izolate.

## Clasificarea textului
Peste vectorii TF-IDF, două modele merg surprinzător de bine: Naïve Bayes multinomial (rapid, potrivit pentru numărători de cuvinte) și regresia logistică (des cel mai bun baseline). Amândouă sunt rapide și explicabile: poți vedea ce cuvinte împing spre fiecare clasă.

Pentru căutare și potrivire de texte, folosești similaritatea cosinus: unghiul dintre doi vectori de documente. Cu cât unghiul e mai mic, cu atât textele sunt mai apropiate ca conținut. E baza motoarelor de căutare simple și a găsirii de duplicate.

# @takeaways
- NLP clasic = transformi text în vectori, apoi pui un model obișnuit deasupra.
- Preprocesare: tokenizare, stopwords, lematizare; la română grijă la diacritice și flexiune.
- TF-IDF cântărește cuvintele: mult dacă sunt caracteristice, puțin dacă sunt omniprezente.
- Naïve Bayes și regresia logistică peste TF-IDF sunt un baseline greu de bătut.
- Similaritatea cosinus măsoară cât de apropiate sunt două texte.

# @pitfalls
- Normalizează diacriticele consecvent înainte de tokenizare.
- Construiește vocabularul doar pe antrenare, apoi aplică-l pe test.
- Fă întâi un baseline TF-IDF, ca să ai cu ce compara rețelele.

# @practice
- Clasifică texte în română cu TF-IDF și regresie logistică, cu fit doar pe train.
- Găsește cele mai apropiate două documente dintr-un set prin similaritate cosinus.
- Compară bag-of-words simplu cu TF-IDF pe aceeași problemă și vezi diferența.
