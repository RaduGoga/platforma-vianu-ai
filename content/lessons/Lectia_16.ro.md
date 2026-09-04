---
code: S20
duration: ~1 săptămână
---

# @intro
Mai devreme sau mai târziu, o rețea refuză să învețe: loss-ul stă pe loc, sau scorul e la nivel de ghicit. Panica și schimbatul la nimereală nu ajută. Ai o listă de verificări, în ordine, de la simplu la complex. De cele mai multe ori problema e banală și e pe la începutul listei.

## Testul care rezolvă jumătate din cazuri
Înainte de orice, verifică dacă modelul poate face overfit pe 10 exemple. Iei zece exemple, oprești orice regularizare, și antrenezi până ar trebui să le memoreze perfect. Dacă loss-ul ajunge aproape de zero, mecanismul de învățare funcționează și problema e în altă parte (date, regularizare prea agresivă).

> [!NOTE]
> Dacă nici pe zece exemple modelul nu ajunge la loss aproape zero, ai un BUG, nu o problemă de capacitate sau de date. Nu are rost să antrenezi mai mult sau să mărești rețeaua. Ceva e stricat în cod, în date sau în conexiuni.

## Lista de verificări, în ordine
Dacă testul de overfit pe 10 exemple pică, treci prin lista asta, de sus în jos. Sunt cauzele cele mai frecvente, ordonate cam după cât de des apar.

1. Learning rate: prea mare (loss haotic sau NaN) sau prea mic (nu se mișcă). Încearcă altă valoare întâi.
2. Normalizarea datelor: intrările sunt scalate? O rețea primește greu date pe intervale uriașe sau inconsistente.
3. Etichetele: sunt aliniate corect cu intrările? Ai amestecat ordinea? Ai funcția de loss potrivită tipului de problemă?
4. zero_grad: chemi optimizer.zero_grad() la fiecare pas? Fără el, gradienții se adună și antrenarea o ia razna.
5. Inițializare și gradienți: verifică dacă gradienții explodează (devin uriași) sau dispar (devin zero). Batch norm și inițializarea bună ajută.

## Cum citești curba de loss
Curba de loss e principalul instrument de diagnostic. Uită-te la ea, nu doar la scorul final. Fiecare formă îți spune altceva.

- Loss plat de la început: învățarea nu pornește. Cel mai des, learning rate sau date.
- Loss care explodează sau devine NaN: learning rate prea mare sau gradienți care explodează.
- Loss de antrenare scade, cel de validare crește: overfitting, adaugă regularizare.
- Loss zgomotos dar în scădere: probabil normal, poate un batch size prea mic.

# @takeaways
- Primul test: poate modelul să facă overfit pe 10 exemple? Dacă nu, e un bug.
- Depanează în ordine: learning rate, normalizare, etichete, zero_grad, gradienți.
- Nu schimba lucruri la întâmplare; mergi pe listă, un lucru pe rând.
- Curba de loss îți spune cauza: formă plată, explozie, sau prăpastie train-validare.

# @pitfalls
- Verifică normalizarea datelor înainte să dai vina pe arhitectură.
- Dacă nu învață în primele epoci, oprește și caută bug-ul.
- Schimbă un singur lucru pe rând, ca să știi ce a ajutat.

# @practice
- Ia o rețea care nu învață și găsește cauza trecând prin listă, un pas pe rând.
- Reprodu overfitting-ul pe 10 exemple ca test de sănătate înainte de antrenarea reală.
- Desenează câteva curbe de loss (bune și rele) și învață să le recunoști din formă.
