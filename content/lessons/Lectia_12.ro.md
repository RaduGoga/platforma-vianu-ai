---
code: S16
duration: ~1 săptămână
---

# @intro
NLP (prelucrarea limbajului natural) înseamnă să faci un program să lucreze cu text scris de oameni: recenzii, emailuri, știri. Se poate face NLP serios fără deep learning, adică fără rețelele neuronale mari de la Lecția 14 încolo. TF-IDF e un mod de a transforma textul în numere, pe care îl construiești mai jos. Împreună cu un model liniar, ca regresia logistică din Lecția 7, rezolvă multe probleme de clasificare de text, rapid și explicabil. E un baseline greu de bătut (modelul simplu de la care pornești, ca în Lecția 6). Înainte să scoți artileria grea, construiește ăsta. De multe ori e suficient, și mereu e reperul față de care judeci orice model mai complicat.

## Problema: modelele vor numere, tu ai text
Un model matematic lucrează cu numere, dar textul e șir de caractere. Regresia logistică din Lecția 7 înmulțește fiecare trăsătură cu o greutate, iar „filmul a fost super” nu se poate înmulți cu nimic.

Tot NLP-ul clasic e despre cum transformi text în vectori de numere care păstrează sensul, ca să poți pune un model obișnuit deasupra. Un vector e aici o listă de numere de aceeași lungime pentru fiecare text, ca un rând dintr-un tabel cu trăsături (features), adică coloanele de intrare. Pașii sunt: cureți textul, îl tai în unități, îl transformi în numere.

## Preprocesarea textului
Tokenizarea taie textul în unități, numite tokeni, de obicei cuvinte. Cel mai simplu tokenizator e `text.lower().split()` din Lecția 3, care taie la spații, dar lasă punctuația lipită de cuvinte, ca în `'școală,'`. `re.findall(r"\w+", text.lower())`, tot din Lecția 3, e mai bun: `\w+` înseamnă „una sau mai multe litere sau cifre la rând”, deci virgulele și punctele rămân pe dinafară.

Apoi scoți stopwords, cuvintele foarte frecvente și fără conținut (și, sau, de, la), care doar adaugă zgomot. Le pui într-o mulțime (set) și păstrezi doar tokenii care nu sunt în ea.

Lematizarea aduce cuvintele la forma de bază: mergeam, mergi, mers devin merge, ca să nu le trateze modelul ca lucruri complet diferite. Forma de bază, numită lemă, e cea din dicționar: infinitivul la verbe, singularul fără articol la substantive. Pentru asta îți trebuie un dicționar cu toate formele cuvintelor, așa că lematizarea o faci cu o bibliotecă, de exemplu spaCy, care are un model pentru română.

Toți pașii, pe o singură propoziție: „Mergeam la școală, dar am uitat temele.” devine după tokenizare `['mergeam', 'la', 'școală', 'dar', 'am', 'uitat', 'temele']`. Fără stopwords (la, dar, am) rămâne `['mergeam', 'școală', 'uitat', 'temele']`, iar după lematizare `['merge', 'școală', 'uita', 'temă']`.

> [!NOTE]
> La română, atenție la diacritice și la flexiunea bogată. Același cuvânt apare scris cu și fără diacritice și în multe forme. Normalizează consecvent (de exemplu, tratezi la fel ș și s), altfel pierzi potriviri și împrăștii semnalul pe forme separate: pentru model, „școală” și „scoala” sunt cuvinte diferite, iar ce învață despre unul nu se aplică celuilalt. Ca să scoți diacriticele, după ce ai trecut textul la litere mici, folosești `text.translate(str.maketrans("ăâîșț", "aaist"))`: înlocuiește fiecare literă din primul șir cu cea de pe aceeași poziție din al doilea.

## Bag-of-words și TF-IDF
Bag-of-words (sac de cuvinte) descrie un document prin câte apariții are fiecare cuvânt din vocabular, ignorând ordinea. Un document e aici orice text pe care îl prelucrezi (o propoziție, o recenzie, un email), iar vocabularul e lista tuturor cuvintelor care apar în documente.

Trei documente: „filmul este bun”, „filmul este foarte foarte bun” și „filmul este prost”. Vocabularul, în ordine alfabetică, e bun, este, filmul, foarte, prost. Fiecare document devine un vector cu 5 numere, câte unul pentru fiecare cuvânt din vocabular: [1, 1, 1, 0, 0], [1, 1, 1, 2, 0] și [0, 1, 1, 0, 1]. Al doilea are 2 pe poziția lui „foarte”, pentru că îl conține de două ori.

```
from sklearn.feature_extraction.text import CountVectorizer

docs = ["filmul este bun",
        "filmul este foarte foarte bun",
        "filmul este prost"]
vec = CountVectorizer()
X = vec.fit_transform(docs)
print(vec.get_feature_names_out())
# ['bun' 'este' 'filmul' 'foarte' 'prost']
print(X.toarray())
# [[1 1 1 0 0]
#  [1 1 1 2 0]
#  [0 1 1 0 1]]
```

`CountVectorizer` face bag-of-words: `fit` învață vocabularul, `transform` numără cuvintele, iar `fit_transform` le face pe amândouă deodată. `get_feature_names_out()` îți dă vocabularul, adică numele coloanelor. Implicit trece textul la litere mici. Tot implicit, sare peste cuvintele de o singură literă, ca „e” sau „o”.

Rezultatul e o matrice rară (sparse), care ține minte doar numerele diferite de zero. Pe texte reale vocabularul are zeci de mii de cuvinte, iar fiecare vector e aproape numai zerouri. `.toarray()` o face un array NumPy obișnuit, ca s-o poți afișa.

Simplu, dar cuvintele comune (care apar peste tot) îneacă semnalul, pentru că au numere mari fără să fie informative. În exemplu, „filmul” și „este” apar în toate trei documentele, deci nu te ajută deloc să le deosebești.

TF-IDF repară asta cântărind fiecare cuvânt după două lucruri: cât de des apare în document (TF, term frequency) și cât de rar e în restul documentelor (IDF, inverse document frequency). Un cuvânt care apare des într-un document dar rar în rest primește greutate mare, pentru că e caracteristic acelui document.

> [!FORMULA]
> tf-idf(cuvânt, doc) = tf(cuvânt, doc) · log(N / df(cuvânt))
> tf = de câte ori apare cuvântul în document. N = numărul total de documente. df = în câte documente apare cuvântul. Cuvintele omniprezente primesc IDF aproape 0.

log e logaritmul: log(x) îți spune la ce putere trebuie ridicat 10 ca să obții x. log(10) = 1, log(100) = 2, log(1000) = 3, deci crește foarte încet, iar log(1) = 0, pentru că 10 la puterea 0 e 1. Pentru numerele dintre 1 și 10 dă valori între 0 și 1, de exemplu log(3) ≈ 0.48. Un cuvânt prezent în toate documentele are N / df = 1, deci IDF = log(1) = 0.

Pe cele trei documente de mai sus, N = 3. „filmul” și „este” apar în toate trei, deci IDF = log(3 / 3) = 0 și dispar. „bun” apare în două, deci IDF = log(3 / 2) = log(1.5) ≈ 0.18. „foarte” și „prost” apar într-unul singur, cu IDF = log(3) ≈ 0.48. În al doilea document, „foarte” are tf = 2, deci tf-idf = 2 · 0.48 ≈ 0.95, iar „bun” are 1 · 0.18 = 0.18. Al treilea rămâne doar cu „prost”, cu 0.48: exact cuvântul care îl deosebește de celelalte.

TF-IDF nu știe ce înseamnă cuvintele. „bun” primește greutate mică doar pentru că apare în două documente din trei, nu pentru că ar conta mai puțin într-o recenzie.

```
from sklearn.feature_extraction.text import TfidfVectorizer
vec = TfidfVectorizer(ngram_range=(1, 2), min_df=2)
X = vec.fit_transform(texte_train)      # fit DOAR pe train
X_val = vec.transform(texte_val)        # transform pe val
```
caption: ngram_range=(1,2) pune în vocabular și perechi de cuvinte, pe lângă cuvintele izolate.

`texte_train` și `texte_val` sunt liste de string-uri, câte un text pe element. `X` iese o matrice rară, cu un rând pentru fiecare text și o coloană pentru fiecare cuvânt sau pereche de cuvinte din vocabular. `TfidfVectorizer` folosește o variantă puțin ajustată a formulei: logaritmul natural (aceeași idee, dar cu baza e ≈ 2.718 în loc de 10) și câte un 1 adăugat, ca un cuvânt prezent peste tot să nu ajungă exact la 0. Apoi aduce fiecare vector la lungimea 1, ca un text lung să nu pară important doar pentru că are multe cuvinte. Ce e lungimea unui vector vezi mai jos, la similaritatea cosinus. Numerele lui nu ies identic cu cele calculate de mână, dar cuvintele rare primesc tot greutăți mai mari.

Un n-gram e un șir de n cuvinte la rând, iar `ngram_range=(1, 2)` pune în vocabular cuvinte singure și perechi de cuvinte vecine. Din „nu este bun” ies nu, este, bun, „nu este” și „este bun”. Perechea „nu este” prinde negația, pe care cuvintele luate separat o pierd.

`min_df=2` păstrează doar cuvintele care apar în cel puțin 2 documente, același df ca în formulă. Un cuvânt dintr-un singur document, de exemplu o greșeală de tastare, nu-l ajută pe model să generalizeze și doar lungește vectorii.

Vocabularul și valorile IDF sunt parametrii învățați de vectorizator, ca media și deviația standard la `StandardScaler` din Lecția 5. De aceea faci `fit` doar pe antrenare și doar `transform` pe validare. Dacă ai face `fit` și pe textele de validare, IDF-ul ar folosi informație din ele, o scurgere de date (data leakage), iar scorul de validare ar ieși mai bun decât cel real.

## Clasificarea textului
Peste vectorii TF-IDF, două modele merg surprinzător de bine: Naïve Bayes multinomial (rapid, potrivit pentru numărători de cuvinte) și regresia logistică (des cel mai bun baseline). Amândouă sunt rapide și explicabile: poți vedea ce cuvinte împing spre fiecare clasă.

Regresia logistică (Lecția 7) dă fiecărui cuvânt din vocabular o greutate. Pentru un text, înmulțește valoarea TF-IDF a fiecărui cuvânt cu greutatea lui și adună totul, împreună cu termenul liber. Apoi trece suma prin sigmoidă, care o strânge într-o probabilitate între 0 și 1. O greutate pozitivă împinge spre clasa 1, una negativă spre clasa 0.

Naïve Bayes (tot din Lecția 7) se uită cât de des apare fiecare cuvânt în textele fiecărei clase și tratează cuvintele ca și cum n-ar avea legătură între ele. Varianta multinomială e cea făcută pentru numărători, cum sunt cele de cuvinte.

Un exemplu complet, pe opt recenzii scurte de film: patru pozitive (eticheta 1) și patru negative (eticheta 0). Toate opt sunt date de antrenare, iar cele două propoziții noi joacă rolul datelor de test.

```
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB

texte = ["filmul a fost minunat",
         "actori buni și o poveste frumoasă",
         "mi-a plăcut mult, îl recomand",
         "o regie bună și actori buni",
         "filmul a fost plictisitor",
         "actori slabi și o poveste banală",
         "nu mi-a plăcut, actori slabi",
         "plictisitor și mult prea lung"]
etichete = [1, 1, 1, 1, 0, 0, 0, 0]    # 1 = pozitiv, 0 = negativ

vec = TfidfVectorizer()
X = vec.fit_transform(texte)           # 8 rânduri, 21 de coloane
model = LogisticRegression().fit(X, etichete)

noi = vec.transform(["un film minunat, cu actori buni",
                     "un film plictisitor și prea lung"])
print(model.predict(noi))                        # [1 0]
print(model.predict_proba(noi)[:, 1].round(2))   # [0.61 0.4 ]

nb = MultinomialNB().fit(X, etichete)
print(nb.predict(noi))                           # [1 0]

cuvinte = vec.get_feature_names_out()
ordine = model.coef_[0].argsort()     # de la greutatea cea mai mică
print(cuvinte[ordine[:3]])    # ['plictisitor' 'slabi' 'banală']
print(cuvinte[ordine[-3:]])   # ['frumoasă' 'minunat' 'buni']
```

`predict` dă clasa, iar `predict_proba(noi)[:, 1]` dă probabilitatea clasei 1 pentru fiecare text nou, ca în Lecția 7. Probabilitățile sunt doar puțin peste și sub 0.5, pentru că modelul a văzut doar opt exemple. „film” lipsește din vocabular, unde e doar „filmul”, așa că vectorizatorul îl ignoră, la fel ca pe „un” și „cu”. Aici ar fi ajutat lematizarea, care aduce „filmul” și „film” la aceeași formă.

`model.coef_[0]` sunt greutățile, câte una pentru fiecare cuvânt din vocabular (`[0]` pentru că, la două clase, `coef_` are un singur rând). `argsort` din Lecția 4 le ordonează pozițiile de la greutatea cea mai mică la cea mai mare, așa că primele trei cuvinte împing cel mai tare spre negativ, iar ultimele trei spre pozitiv. Naïve Bayes se folosește la fel: `fit` pe aceleași date, apoi `predict`.

Pentru căutare și potrivire de texte, folosești similaritatea cosinus: cosinusul unghiului dintre doi vectori de documente. Cu cât unghiul e mai mic, cu atât textele sunt mai apropiate ca conținut. E baza motoarelor de căutare simple și a găsirii de duplicate.

Ia un vocabular cu doar două cuvinte, „fotbal” și „meci”. Un text în care „fotbal” apare de 3 ori și „meci” de 4 ori e vectorul (3, 4), o săgeată în plan de la (0, 0) la punctul (3, 4). Textele care folosesc aceleași cuvinte în aceleași proporții au săgeți pe aceeași direcție, iar două texte fără niciun cuvânt comun au săgeți perpendiculare. Cosinusul unghiului dintre ele, din geometrie, e 1 la 0° și 0 la 90°.

> [!FORMULA]
> similaritate(a, b) = (a₁·b₁ + a₂·b₂) / (lungime(a) · lungime(b))
> a₁ și a₂ sunt cele două numere din a, de câte ori apare fiecare cuvânt. lungime(a) = √(a₁² + a₂²), din teorema lui Pitagora. Cu mai multe cuvinte în vocabular, aduni câte un termen pentru fiecare cuvânt, sus și sub radical.

Pentru a = (3, 4) și b = (4, 3): sus ai 3·4 + 4·3 = 24, iar fiecare săgeată are lungimea √(9 + 16) = 5, deci similaritatea e 24 / 25 = 0.96. Pentru a și c = (6, 8), adică același text scris de două ori: 3·6 + 4·8 = 50, lungimile sunt 5 și 10, deci 50 / 50 = 1. Lungimea textului nu contează, doar proporția cuvintelor. Pentru (1, 0) și (0, 1), două texte fără cuvinte comune, sus iese 0, deci similaritatea e 0.

Vectorii TF-IDF nu au valori negative, așa că unghiul dintre doi dintre ei e între 0° și 90°, iar similaritatea e între 0 și 1.

```
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

docs = ["echipa a câștigat meciul de fotbal",
        "meciul de fotbal s-a terminat egal",
        "o rețetă simplă cu mere"]
vec = TfidfVectorizer()
X = vec.fit_transform(docs)
print(cosine_similarity(X).round(2))
# [[1.   0.46 0.  ]
#  [0.46 1.   0.  ]
#  [0.   0.   1.  ]]

cautare = vec.transform(["cine a câștigat meciul"])
print(cosine_similarity(cautare, X).round(2))   # [[0.65 0.24 0.  ]]
```

`cosine_similarity(X)` compară fiecare document cu fiecare și dă un tabel de 3 pe 3: pe rândul i și coloana j e similaritatea dintre documentele i și j. Pe diagonală e 1, fiecare document cu el însuși. Primele două vorbesc despre fotbal și au 0.46, iar rețeta nu are niciun cuvânt comun cu ele, deci 0. `.round(2)` rotunjește la două zecimale. Căutarea merge la fel: transformi întrebarea cu același vectorizator, o compari cu toate documentele și îl afișezi primul pe cel mai apropiat, aici primul document, cu 0.65.

# @practice
- Clasifică texte în română cu TF-IDF și regresie logistică, cu fit doar pe train.
- Găsește cele mai apropiate două documente dintr-un set prin similaritate cosinus.
- Compară bag-of-words simplu cu TF-IDF pe aceeași problemă și vezi diferența.
