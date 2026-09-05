---
code: S1
duration: ~2h
---

# @intro
Prima sesiune are două jumătăți. Întâi limpezim ce înseamnă inteligența artificială, ca să știi despre ce vorbim tot anul. Apoi facem logistica: un loc unde scrii cod și un loc unde trimiți răspunsuri.

## Ce e AI și unde se folosește
Inteligența artificială e ideea de a face un program care rezolvă probleme fără să-i scrii tu, pas cu pas, regula pentru fiecare caz. În loc să-i spui „dacă e așa, fă asta”, îi arăți multe exemple și îl lași să găsească singur regula. Partea asta, de învățat din exemple, se numește machine learning, și e aproape tot ce faci la olimpiadă.

Un exemplu face diferența clară. Ca să deosebești un email spam de unul normal cu reguli scrise de mână, ai scrie sute de „dacă conține cuvântul X”. Cu machine learning, îi dai câteva mii de emailuri deja marcate spam sau nu, și modelul învață singur ce combinații de cuvinte prezic spamul.

- Clasificare: pui un label (spam sau nu, ce cifră e în imagine, pentru ce boală sunt specifice simptomele”).
- Regresie: prezici un număr (prețul unei case, temperatura de mâine).
- Clustering: găsești structura din date fără labeluri (ce clienți seamănă între ei).

> [!NOTE]
> La concursurile de AI, aproape orice problemă se reduce la asta: primești date cu exemple, antrenezi un model care învață din ele, și îl pui să prezică pe date noi.

## Ce e Python și de ce el
Python e limbajul standard în care se scrie cod de inteligență artificială. Nu pentru că ar fi cel mai rapid, ci pentru că are bibliotecile pe care le vrei deja scrise: NumPy pentru calcul numeric, Pandas pentru tabele, scikit-learn pentru modele clasice, PyTorch pentru rețele neuronale.

O bibliotecă reprezinta un cod scris de altcineva, pe care îl imporți și îl folosești. În loc să scrii tu algoritmul de sortare sau înmulțirea de matrice, chemi funcția potrivită. Cea mai mare parte din munca ta va fi să legi bibliotecile acestea între ele corect.

> [!NOTE]
> Instalează Python 3.11 (o versiune stabilă, larg suportată) și JupyterLab. Jupyter îți dă un notebook interactiv unde rulezi cod bucată cu bucată și vezi rezultatul imediat, exact ce vrei când explorezi date.

## Pregătește mediul: Python, pip și Jupyter Lab
Înainte să scrii cod, ai nevoie de trei lucruri instalate pe calculator: Python, pip (vine automat cu el) și Jupyter Lab.

- Windows: intră pe python.org/downloads, descarcă ultima versiune 3.11 sau mai nouă și rulează instalatorul. La primul ecran bifează „Add python.exe to PATH" înainte de Install Now, altfel terminalul nu va găsi Python după instalare.
- macOS: descarcă tot de pe python.org/downloads fișierul .pkg și parcurge instalatorul. Dacă ai deja Homebrew, merge la fel de bine brew install python@3.11.
- Linux (Ubuntu/Debian): deschide un terminal și rulează sudo apt update && sudo apt install python3 python3-pip python3-venv.

Pip vine inclus cu Python începând din versiunea 3.4, deci nu-l instalezi separat. Ca să confirmi că merg amândouă, deschide un terminal (Command Prompt sau PowerShell pe Windows, Terminal pe macOS și Linux) și rulează:

```
python --version
pip --version
```
caption: Dacă amândouă îți dau un număr de versiune, Python și pip sunt instalate.

Pe Windows, dacă python nu e recunoscut, încearcă py --version; dacă nici pip nu răspunde, încearcă pip3 sau python -m pip --version.

Cu Python instalat, treci la mediul de lucru propriu-zis. Un mediu virtual e o cutie separată pentru bibliotecile unui proiect, ca să nu se bată cap în cap cu altele instalate global. Îl creezi o dată pe proiect și lucrezi mereu în el.

1. Deschide un terminal în folderul unde lucrezi.
2. Scrie pip install jupyterlab și apasă Enter.
3. Scrie jupyter lab și apasă Enter: ți se deschide automat un tab de browser cu interfața.

> [!NOTE]
> La concurs găsești toate astea deja instalate pe calculatoare.

## Documentația la concurs
La concurs nu ești complet offline. Ai internet, dar unul controlat: doar pe o listă fixă de site-uri, de obicei documentația oficială a bibliotecilor pe care le folosești, gen numpy.org, scikit-learn.org, pandas.pydata.org, pytorch.org, docs.python.org. Sistemul vede ce accesezi, și dacă intri pe altceva decât ce e permis, ChatGPT, orice altă pagină, primești flag și riști descalificarea.

Practic, poți căuta o funcție în documentația oficială, dar nu poți întreba pe nimeni și nu poți copia cod de pe un forum. Obișnuiește-te din timp să găsești răspunsul direct în docs, nu printr-o căutare pe Google.

Există și o variantă mai rapidă, care merge chiar și fără nicio conexiune: în Jupyter, pui un semn de întrebare după o funcție și îți arată ce face și ce argumente ia, direct din biblioteca instalată pe calculator.

```
pd.read_csv?      # deschide ajutorul pentru read_csv
np.mean?          # ce face, ce argumente ia
```
caption: Semnul întrebării deschide documentația fără internet.

> [!NOTE]
> Verifică dinainte lista exactă de site-uri permise la concursul la care mergi, regulile diferă de la o competiție la alta. Ieșirea din listă e tratată ca încercare de fraudă.

## Prima submisie, bucla completă
MLCompete (platform.olimpiada-ai.ro) si Nitro AI Judge (judge.nitro-ai.org) sunt platformele pe care vei exersa. Fă-ți cont pe amândouă.

O competiție funcționează așa: descarci un set de date, antrenezi un model, produci un fișier cu predicțiile tale pentru datele de test, îl încarci, și primești un scor pe un clasament. Scopul primei tale submisii nu e scorul. E să vezi bucla întreagă măcar o dată.

1. Intră într-o competiție de antrenament și citește ce metrică se punctează.
2. Descarcă datele și deschide fișierul de exemplu de submisie, ca să vezi exact ce coloane și ce format cere.
3. Produ un fișier în același format, chiar și cu răspunsuri la întâmplare.
4. Încarcă-l și uită-te la scor.

> [!NOTE]
> Un model bun cu un fișier prost formatat ia zero. Formatul submisiei nu e un detaliu, e o condiție. Verifică-l de fiecare dată: numele coloanelor, ordinea, separatorul, dacă are sau nu antet.
