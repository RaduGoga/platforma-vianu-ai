---
code: S2
duration: ~2h
---

# @intro
Înainte să înveți vreun model, merită să înțelegi despre ce este vorba. O problemă de concurs de AI are foarte des aceleași bucăți: niște date, un target de prezis, o metrică de punctare și un fișier de submisie. Cine citește cerința corect pleacă cu un avans mare.

## Anatomia unei probleme
Primești două seturi de date. Unul de antrenament, care are și răspunsurile corecte (numite labeluri sau target), și unul de test, care are aceleași coloane dar fără răspuns. Sarcina ta e să prezici răspunsul pentru setul de test, pornind de la ce ai învățat pe cel de antrenament.

- Date de antrenament: rândurile pe care le vezi complet, cu tot cu răspuns. De aici învață modelul.
- Date de test: aceleași coloane, dar coloana-target lipsește. Aici trebuie să completezi tu.
- Targetul: ce prezici. Poate fi un label (spam sau nu) sau un număr (un preț).
- Fișierul de submisie: un tabel cu predicțiile tale, în formatul exact cerut de platformă.

> [!NOTE]
> Coloanele folosite ca intrare pentru model se numesc features.

## Metrica
Fiecare problemă are o metrică, adică formula după care se calculează scorul tău. E scrisă în enunț și contează mult. Dacă metrica e F1 și tu optimizezi acuratețea, poți urca pe un scor care nu-ți aduce puncte. Câteva exemple:

- Acuratețe: procentul de răspunsuri corecte. Simplă, dar înșelătoare când clasele sunt dezechilibrate.
- F1: echilibrează precizia cu recallul, bună când clasele sunt inegale.
- RMSE sau MAE: pentru numere, cât de departe ești în medie de răspunsul real.

O regulă bună: citește metrica înainte de orice, și antrenează cu ea în minte. Dacă se punctează F1, validează local tot pe F1.

## Submisie și leaderboard
Când ai predicțiile, le pui în fișierul cerut și îl încarci. Platforma îl compară cu răspunsurile corecte, pe care tu nu le vezi, și îți dă un scor pe un clasament. Ai de obicei un număr limitat de submisii, deci nu le irosi pe încercări la întâmplare.

Leaderboardul are două bucăți. Cel public se calculează pe o parte din datele de test și îl vezi cât ține concursul. Cel privat se calculează pe restul și se dezvăluie abia la final. Clasamentul care contează e cel privat. Splitul ăsta există dintr-un motiv anume.

Dacă îți alegi modelul după scorul public, ajungi să te potrivești pe acea bucată mică de date, nu pe problema reală. Se cheamă overfitting pe leaderboard: urci frumos pe public, apoi cazi pe privat, unde se împart de fapt punctele.

> [!NOTE]
> Apărarea e o validare locală serioasă. Îți ții o parte din datele de antrenament deoparte, ca test propriu, și te încrezi în scorul de acolo mai mult decât în leaderboardul public. La final alegi submisiile pe scorul local, nu pe cel public.

## Unde te antrenezi
Trei platforme pe care găsești probleme:

- Kaggle (kaggle.com): cea mai folosită platformă internațională de ML.
- MLCompete (platform.olimpiada-ai.ro): platforma pe care se ține olimpiada și pe care exersezi între etape, cu probleme de arhivă și competiții de antrenament.
- Nitro AI Judge (judge.nitro-ai.org): platforma pe care se ține RoAI și alte concursuri de AI.

## Prima submisie
MLCompete (platform.olimpiada-ai.ro) și Nitro AI Judge (judge.nitro-ai.org) sunt platformele pe care vei exersa. Fă-ți cont pe amândouă.

1. Intră într-o competiție de antrenament și citește ce metrică se punctează.
2. Descarcă datele și deschide fișierul de exemplu de submisie, ca să vezi exact ce coloane și ce format cere.
3. Produ un fișier în același format, chiar și cu răspunsuri la întâmplare.
4. Încarcă-l și uită-te la scor.

> [!NOTE]
> Dacă fișierul nu e formatat corect, primești erori de validare. Citește-le, îți spun exact ce nu se potrivește.

# @practice
- Orice problemă cu fișier de submisie de exemplu
