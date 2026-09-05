---
code: S2
duration: ~2h
---

# @intro
Înainte să înveți vreun model, merită să înțelegi despre ce este vorba. O problemă de concurs de AI are mereu aceleași piese: niște date, un target de prezis, o metrică de punctare și un fișier de submisie. Cine citește piesele astea corect pleacă cu un avans mare, fiindcă jumătate din greșelile de concurs nu-s de model, ci de citit enunțul pe fugă.

## Anatomia unei probleme
Primești două seturi de date. Unul de antrenament, care are și răspunsurile corecte (numite labeluri sau target), și unul de test, care are aceleași coloane dar fără răspuns. Sarcina ta e să prezici răspunsul pentru setul de test, pornind de la ce ai învățat pe cel de antrenament.

- Date de antrenament: rândurile pe care le vezi complet, cu tot cu răspuns. De aici învață modelul.
- Date de test: aceleași coloane, dar coloana-target lipsește. Aici trebuie să completezi tu.
- Targetul: ce prezici. Poate fi un label (spam sau nu) sau un număr (un preț).
- Fișierul de submisie: un tabel cu predicțiile tale, în formatul exact cerut de platformă.

> [!NOTE]
> Primul lucru pe care îl faci la o problemă nouă nu e să antrenezi ceva. E să deschizi datele și fișierul de exemplu de submisie și să te uiți la ele: câte rânduri, ce coloane, ce lipsește, cum arată răspunsul cerut.

## Metrica
Fiecare problemă are o metrică, adică formula după care se calculează scorul tău. E scrisă în enunț și e singura care contează. Nu ești punctat după cât de deștept pare modelul, ci după numărul pe care îl scoate metrica. Dacă metrica e F1 și tu optimizezi acuratețea, poți urca pe un scor care nu-ți aduce puncte.

- Acuratețe: procentul de răspunsuri corecte. Simplă, dar înșelătoare când clasele sunt dezechilibrate.
- F1: echilibrează precizia cu recallul, bună când clasele sunt inegale.
- RMSE sau MAE: pentru numere, cât de departe ești în medie de răspunsul real.

Regula practică: citește metrica înainte de orice, și antrenează cu ea în minte. Dacă se punctează F1, validează local tot pe F1, nu pe altceva.

## Submisie și leaderboard
Când ai predicțiile, le pui în fișierul cerut și îl încarci. Platforma îl compară cu răspunsurile corecte, pe care tu nu le vezi, și îți dă un scor pe un clasament. Ai de obicei un număr limitat de submisii, deci nu le irosi pe încercări la întâmplare.

Leaderboardul are două fețe. Cel public se calculează pe o parte din datele de test și îl vezi cât ține concursul. Cel privat se calculează pe restul și se dezvăluie abia la final. Clasamentul care contează e cel privat. Splitul ăsta există dintr-un motiv anume, și el te duce la capcana următoare.

## Capcana leaderboardului public
Dacă îți alegi modelul după scorul public, ajungi să te potrivești pe acea bucată mică de date, nu pe problema reală. Se cheamă overfitting pe leaderboard: urci frumos pe public, apoi cazi pe privat, unde se împart de fapt punctele.

> [!NOTE]
> Apărarea e o validare locală serioasă. Îți ții o parte din datele de antrenament deoparte, ca test propriu, și te încrezi în scorul de acolo mai mult decât în leaderboardul public. La final alegi submisiile pe scorul local, nu pe cel public.

## Unde te antrenezi
Sunt trei locuri de care ai nevoie tot anul. Nu-s interschimbabile, fiecare are rostul lui.

- MLCompete (platform.olimpiada-ai.ro): platforma pe care se ține olimpiada și pe care exersezi între etape, cu probleme de arhivă și competiții de antrenament.
- Nitro AI Judge (judge.nitro-ai.org): platforma pe care se ține RoAI si alte concursuri de AI.

# @takeaways
- O problemă are patru piese: date de antrenament cu etichete, date de test fără, o țintă, o metrică.
- Te punctează exact metrica din enunț. Optimizezi ce se punctează, nu ce ți se pare frumos.
- Leaderboardul privat decide clasamentul, cel public doar te tentează.

# @pitfalls
- Citește metrica și formatul submisiei înainte de orice model.
- Alege modelul după validarea ta locală, nu după clasamentul public.
- Păstrează submisiile zilei pentru ideile pe care le-ai verificat deja local.

# @practice
- Ia o problemă de arhivă de pe MLCompete și scrie în trei rânduri: care e ținta, care e metrica, cum arată submisia.
- Fă-ți un split local de validare și compară scorul lui cu leaderboardul public pe aceeași submisie.
- Explică-i unui coleg diferența dintre leaderboardul public și cel privat, cu un exemplu.
