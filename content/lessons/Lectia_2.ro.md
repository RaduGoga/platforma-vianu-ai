---
code: S2
duration: ~2h
---

# @intro
Înainte să înveți vreun model, merită să înțelegi despre ce este vorba. O problemă de concurs de AI are foarte des aceleași bucăți: niște date, o țintă de prezis, o metrică de punctare și un fișier de submisie, cu răspunsurile tale. Cine citește cerința corect pleacă cu un avans mare.

## Anatomia unei probleme
Primești două seturi de date. Unul de antrenare, care are și răspunsurile corecte (numite etichete sau țintă, labels sau target în engleză), și unul de test, care are aceleași coloane dar fără răspuns. Sarcina ta e să prezici răspunsul pentru setul de test, pornind de la ce ai învățat pe cel de antrenare.

Un exemplu mic, după problema Titanic de pe Kaggle: din vârsta unui pasager și din prețul biletului său trebuie să ghicești dacă a supraviețuit naufragiului. Datele vin de obicei ca fișiere CSV, adică tabele salvate ca text. Fiecare linie e un rând din tabel, cu valorile despărțite prin virgule, iar prima linie are numele coloanelor. Fișierul de antrenare, `train.csv`, arată așa:

```
id,varsta,pret_bilet,a_supravietuit
1,22,7,0
2,38,71,1
3,26,8,1
4,35,53,1
5,35,8,0
```
caption: Fiecare rând e un pasager. Ultima coloană e răspunsul: 1 dacă a supraviețuit, 0 dacă nu.

Fișierul de test, `test.csv`, are alți pasageri și aceleași coloane, mai puțin ultima. Pe ea trebuie s-o ghicești tu:

```
id,varsta,pret_bilet
6,34,8
7,4,16
8,58,26
```
caption: Aceleași coloane, fără răspuns.

Răspunsurile tale le scrii într-un fișier de submisie, de obicei `submission.csv`. Submisia e răspunsul tău la problemă: fișierul pe care îl încarci pe platformă ca să fie notat. Are câte un rând pentru fiecare pasager din test, cu id-ul lui și predicția ta:

```
id,a_supravietuit
6,0
7,1
8,1
```
caption: Pentru fiecare id din test, 1 sau 0, după cum crezi tu.

- Date de antrenare: rândurile pe care le vezi complet, cu tot cu răspuns, ca în `train.csv`. De aici învață modelul.
- Date de test: aceleași coloane, dar coloana-țintă lipsește, ca în `test.csv`. Aici trebuie să completezi tu.
- Ținta (target): ce prezici, aici coloana `a_supravietuit`. Poate fi o etichetă (spam sau nu) sau un număr (un preț). Eticheta (label) e răspunsul de pe un singur rând: pasagerul 2 are eticheta 1.
- Fișierul de submisie: un tabel cu predicțiile tale, în formatul exact cerut de platformă, ca `submission.csv`.

> [!NOTE]
> Coloanele folosite ca intrare pentru model se numesc trăsături (features), aici `varsta` și `pret_bilet`. Coloana `id` nu e o trăsătură: e doar numărul rândului, ca platforma să știe a cui e fiecare predicție.

## Metrica
Fiecare problemă are o metrică, adică formula după care se calculează scorul tău. E scrisă în enunț și contează mult. Dacă metrica e F1 și tu optimizezi acuratețea (le explicăm imediat mai jos), poți urca pe un scor care nu-ți aduce puncte. Câteva exemple:

- Acuratețe: procentul de răspunsuri corecte. Simplă, dar înșelătoare când clasele (variantele de răspuns, ca spam și normal) sunt dezechilibrate, adică una e mult mai rară decât celelalte.
- F1: echilibrează precizia cu recallul, bună când clasele sunt dezechilibrate.
- RMSE sau MAE: pentru ținte numerice (regresie), cât de departe ești în medie de răspunsul real.

Un exemplu de clase dezechilibrate: din 100 de plăți cu cardul, 98 sunt normale și 2 sunt fraude. Un model care spune mereu „normală” nimerește 98 din 100, deci are acuratețe 98%. Totuși, n-a prins nicio fraudă, adică exact ce te interesa.

Aici te ajută F1, care se calculează din două numere. Precizia arată câte dintre plățile marcate de model ca fraudă chiar erau fraude. Recallul arată câte dintre fraudele reale a prins modelul. Modelul care spune mereu „normală” n-a prins nicio fraudă, deci are recallul 0 și F1 tot 0. F1 e un scor între 0 și 1, mai mare e mai bine; formula și restul detaliilor sunt în Lecția 8.

Pentru numere, un exemplu calculat de mână. Prezici temperatura de mâine în trei orașe: 10, 12 și 9 grade. În realitate au fost 11, 12 și 6 grade, deci erorile tale, fără semn, sunt 1, 0 și 3 grade. MAE (mean absolute error, eroarea absolută medie) e media lor: (1 + 0 + 3) / 3 ≈ 1.33 grade. RMSE (root mean squared error, radicalul din media erorilor la pătrat) ridică întâi fiecare eroare la pătrat (1, 0, 9), face media și apoi scoate radicalul: √((1 + 0 + 9) / 3) ≈ √3.33 ≈ 1.83 grade. Iese mai mare pentru că eroarea de 3 grade devine 9 la pătrat: RMSE pedepsește mai tare erorile mari.

O regulă bună: citește metrica înainte de orice, și antrenează cu ea în minte. Dacă se punctează F1, validează local tot pe F1, adică măsoară F1 și pe datele puse deoparte ca să-ți verifici modelul (validarea din Lecția 1).

## Submisie și leaderboard
Când ai predicțiile, le pui în fișierul cerut și îl încarci. Platforma îl compară cu răspunsurile corecte, pe care tu nu le vezi, și îți dă un scor pe un clasament cu toți concurenții, numit leaderboard. Ai de obicei un număr limitat de submisii, deci nu le irosi pe încercări la întâmplare.

Leaderboardul are două bucăți. Cel public se calculează pe o parte din datele de test și îl vezi cât ține concursul. Cel privat se calculează pe restul și se dezvăluie abia la final. De exemplu, dacă testul are 1000 de rânduri, scorul public poate veni din 300 dintre ele, iar cel privat din celelalte 700, fără să știi care sunt care. Clasamentul care contează e cel privat. Împărțirea asta în două (în engleză, split) există dintr-un motiv anume.

Dacă îți alegi modelul după scorul public, ajungi să te potrivești pe acea bucată mică de date, nu pe problema reală. Se cheamă overfitting pe leaderboard: urci frumos pe public, apoi cazi pe privat, unde se împart de fapt punctele. E overfittingul din Lecția 1 (învățatul pe de rost), doar că acum îl faci tu, prin alegerile tale. Dacă încerci 50 de variante și o păstrezi pe cea cu cel mai bun scor public, se poate să fi ales doar varianta care a avut noroc pe cele 300 de rânduri publice.

> [!NOTE]
> Apărarea e o validare locală serioasă. Îți ții o parte din datele de antrenare deoparte, ca test propriu, și te încrezi în scorul de acolo mai mult decât în leaderboardul public. De exemplu, din 4000 de rânduri de antrenare pui deoparte 20%, adică 800. Antrenezi modelul pe celelalte 3200 și îl notezi pe cele 800, al căror răspuns îl știi (codul e în Lecția 6). Sunt mai multe rânduri decât cele 300 publice și le poți folosi de câte ori vrei, fără să consumi submisii. La final alegi submisiile pe scorul local, nu pe cel public.

## Regulile de la ONIA
Din regulamentul olimpiadei (ONIA, Olimpiada Națională de Inteligență Artificială), câteva lucruri pe care e bine să le știi dinainte:

- Proba durează patru ore.
- Soluția unei probleme are două părți: fișierul cu răspunsul și codul Python care l-a produs. Le trimiți pe amândouă pe platformă.
- Numărul de submisii e limitat, iar între două submisii trebuie să treacă un timp minim. Le afli odată cu subiectele.
- Scorul din timpul probei e provizoriu, calculat pe o parte din datele de test, ca un leaderboard public. Cel final se calculează pe tot setul.
- La fiecare problemă alegi două submisii. Doar ele intră în clasamentul final.
- Contul pe platform.olimpiada-ai.ro trebuie creat și activat înainte de termenul anunțat. După termen nu te mai poți înscrie.

> [!NOTE]
> Pragul minim pentru etapa națională e 60% din punctajul total.

## Unde te antrenezi
Trei platforme pe care găsești probleme:

- Kaggle (kaggle.com): cea mai folosită platformă internațională de machine learning.
- MLCompete (platform.olimpiada-ai.ro): platforma pe care se ține olimpiada și pe care exersezi între etape, cu probleme de arhivă și competiții de antrenament.
- Nitro AI Judge (judge.nitro-ai.org): platforma pe care se ține RoAI și alte concursuri de AI.

## Prima submisie
MLCompete (platform.olimpiada-ai.ro) și Nitro AI Judge (judge.nitro-ai.org) sunt platformele pe care vei exersa. Fă-ți cont pe amândouă. Prima submisie nu trebuie să aibă un scor bun: o faci ca să înveți drumul de la date până la scor.

1. Intră într-o competiție de antrenament și citește ce metrică se punctează.
2. Descarcă datele și deschide fișierul de exemplu de submisie (de obicei `sample_submission.csv`), ca să vezi exact ce coloane și ce format cere. Dacă îl deschizi cu Notepad sau alt editor de text, arată ca exemplele de mai sus.
3. Produ un fișier în același format, chiar și cu răspunsuri la întâmplare. Cel mai simplu e să încarci chiar fișierul de exemplu, neschimbat.
4. Încarcă-l și uită-te la scor.

> [!NOTE]
> Dacă fișierul nu e formatat corect, primești erori de validare. Citește-le, îți spun exact ce nu se potrivește. Aici „validare” înseamnă că platforma îți verifică formatul fișierului, nu modelul.

# @practice
- Orice problemă cu fișier de submisie de exemplu
- [Titanic pe Kaggle](https://www.kaggle.com/competitions/titanic)
