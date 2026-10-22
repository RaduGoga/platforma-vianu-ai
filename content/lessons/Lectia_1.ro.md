---
code: S1
duration: ~2h
---

# @intro
Firesc, prima întrebare e ce înseamnă mai exact inteligența artificială. Cu atâta confuzie în jurul termenului, e important să clarificăm întâi asta și abia apoi să pregătim mediul de lucru, adică programele în care vei scrie și vei rula cod.

## Ce e AI și unde se folosește
Telefonul care recunoaște fețele din pozele tale, Google Translate care îți traduce un text, YouTube care îți recomandă următorul videoclip: toate folosesc inteligență artificială, prescurtat AI (din engleză, artificial intelligence). La bază, inteligența artificială înseamnă orice tehnologie care simulează funcții umane, adică face lucruri pentru care până de curând era nevoie de un om.

De cele mai multe ori, în loc să urmeze reguli stricte, îi arăți mai multe exemple și o lași să găsească singură regulile, prin diverși algoritmi. Un algoritm e o rețetă: un șir de pași pe care calculatorul îi urmează. Nu e nimic misterios la mijloc. ChatGPT nu „gândește”: a învățat din foarte multe exemple de text. Partea asta, de învățat din exemple, se numește machine learning (în română, învățare automată) și e aproape tot ce faci la olimpiadă.

Poate ajuta un exemplu. Ca să deosebești un email spam de unul normal cu reguli scrise de mână, ar trebui să scrii sute de condiții de tipul „dacă conține cuvântul X”. Cu machine learning, îi dai câteva mii de emailuri deja marcate ca spam sau nu, iar modelul învață singur ce combinații de cuvinte prezic spamul. Modelul e programul care învață din exemple. Emailurile marcate, din care învață, sunt datele de antrenare, iar pasul în care învață se numește antrenare. După antrenare îi dai un email nou, nemarcat, și el îți spune dacă e spam: răspunsul lui se numește predicție.

În jurul AI-ului o să mai auzi câțiva termeni. Data science înseamnă să scoți informație utilă din date, cu ajutorul matematicii (mai ales al statisticii) și al informaticii. De exemplu, afli din bonurile unui magazin ce produse se cumpără des împreună. Matematica e baza și se folosește în absolut tot ce vom face, dar nu trebuie neapărat învățată în detaliu ca să rezolvi probleme sau să faci proiecte. Anumiți algoritmi clasici de informatică sunt și ei folosiți în anumite arii ale AI-ului, de exemplu BFS și DFS: două feluri de a căuta un drum, cum ar fi ieșirea dintr-un labirint. Revin în Lecția 11. Machine learningul, menționat mai sus, se împarte la rândul lui în mai multe categorii:

- Învățare supervizată: fiecare exemplu vine cu răspunsul corect, ca emailurile marcate spam sau nu, iar modelul învață să dea singur răspunsul pentru exemple noi.
- Învățare nesupervizată: exemplele nu au răspuns, iar modelul caută singur tipare, de exemplu grupuri de clienți care cumpără lucruri asemănătoare. O vezi în Lecția 10.
- Reinforcement learning (învățare prin recompensă): modelul învață prin încercare și eroare, adică primește puncte pentru mutările bune și pierde puncte pentru cele proaste. De exemplu, un program care învață singur să joace un joc doar din scor. Îl vezi în Lecția 20.
- Învățare self-supervised (autosupervizată), pusă uneori ca o categorie separată: răspunsurile vin chiar din date. Modelul citește un text și încearcă să ghicească următorul cuvânt, pe care textul îl are deja. Așa învață din text modelele ca ChatGPT.

Task e cuvântul englezesc pentru sarcină: tipul de problemă pe care o rezolvă modelul. Câteva taskuri clasice de AI includ, dar nu se limitează la:

- Clasificare: pui o etichetă, adică alegi răspunsul dintr-o listă fixă de variante, numite clase (spam sau nu, ce cifră e în imagine, pentru ce boală sunt specifice simptomele).
- Regresie: prezici un număr (prețul unei case, temperatura de mâine). Ca și clasificarea, e învățare supervizată.
- Clustering: găsești structura din date fără etichete, de obicei grupuri de exemple asemănătoare (ce clienți seamănă între ei). E învățare nesupervizată.

Importante mai sunt și conceptele de overfitting, underfitting, bias și varianță. Gândește-te la un elev care învață pe de rost răspunsurile de la testul de anul trecut. Dacă primește exact aceleași întrebări, ia 10. Dacă primește întrebări noi, nu știe nimic, pentru că n-a înțeles lecția, doar a memorat-o.

Un model poate face la fel: dacă a învățat pe de rost datele de antrenare, inclusiv zgomotul din ele, merge aproape perfect pe ce a văzut și slab pe date noi. Asta e overfitting. Zgomotul înseamnă detaliile întâmplătoare sau greșelile din date, de exemplu un email normal marcat din greșeală ca spam. Detaliile astea nu se repetă în datele noi, deci n-are rost să fie învățate. La capătul opus, un model prea simplu pentru problemă nu prinde nici măcar tiparul real și greșește peste tot, și pe datele de antrenare, și pe cele noi: asta e underfitting. E elevul care a citit doar titlul lecției și greșește chiar și întrebările de anul trecut.

Cele două se explică prin bias și varianță. Biasul e eroarea din presupuneri prea simple, cum ar fi să tragi o dreaptă prin date care descriu de fapt o curbă. Imaginează-ți niște puncte care, pe grafic, urcă tot mai abrupt: orice dreaptă ai trage, trece departe de multe dintre ele. Varianța e sensibilitatea la datele exacte pe care s-a antrenat: schimbi puțin setul de antrenare și modelul dă cu totul alte predicții. Bias mare înseamnă underfitting, varianță mare înseamnă overfitting, iar scăderea unuia îl crește de obicei pe celălalt. Tot ce faci la olimpiadă, de la cât de complex alegi modelul până la cât de mult îl antrenezi, e de fapt căutarea punctului de echilibru dintre ele.

> [!NOTE]
> Cum le recunoști în practică: compari scorul pe antrenare cu cel pe validare. Scorul e un număr care arată cât de bine merge modelul, de exemplu procentul de emailuri clasificate corect. Pentru validare pui deoparte de la început o parte din datele de antrenare, cu tot cu răspuns. Modelul nu le vede la antrenare, așa că scorul pe ele e ca nota la un test cu întrebări noi. Amândouă scorurile slabe înseamnă underfitting, ai nevoie de un model mai complex. Scor bun pe antrenare și slab pe validare înseamnă overfitting, ai nevoie de mai multe date, de regularizare sau de un model mai simplu. Regularizarea e o frână care ține modelul mai simplu, ca să nu poată învăța pe de rost. O vezi la lucru la arbori de decizie în Lecția 7 și la rețele neuronale în Lecția 15.

> [!NOTE]
> La concursurile de AI, aproape orice problemă se reduce la asta: primești date, le analizezi, antrenezi un model și îl pui să prezică pe date noi.

## Ce e Python și de ce el
Python e limbajul de programare standard în care se scrie cod de inteligență artificială (codul e textul cu instrucțiuni pe care le execută calculatorul). Nu pentru că ar fi cel mai rapid, ci pentru că e foarte abstractizat și are deja scrise bibliotecile pe care le vrei, eventual în limbaje mai rapide: NumPy pentru calcul numeric, Pandas pentru tabele, scikit-learn pentru modele clasice, PyTorch pentru rețele neuronale. Abstractizat înseamnă că scrii câteva rânduri pentru lucruri complicate, iar detaliile le ascund bibliotecile. Un model întreg, de exemplu, îl antrenezi cu o singură linie de cod.

O bibliotecă e cod scris de altcineva, pe care îl imporți (îl aduci în codul tău cu comanda `import`) și îl folosești. La taskuri de AI scopul nu e să înveți pe de rost cum se scriu algoritmii sau modelele. Scopul e să le înțelegi, să știi când se folosesc și să le adaptezi la problema respectivă, împreună cu alte metode.

> [!NOTE]
> E bine să instalezi o versiune stabilă de Python, de exemplu 3.11, care e bine susținută de biblioteci. E și versiunea de pe calculatoarele de la olimpiadă.

## Mediul de lucru: Python, pip și Jupyter Lab
Înainte să scrii cod, ai nevoie de trei lucruri instalate pe calculator: Python, pip (care vine automat cu el) și Jupyter Lab. Python e programul care citește și execută codul scris în Python, iar pip e programul cu care instalezi biblioteci. Jupyter Lab, VS Code și Google Colab sunt programe în care poți scrie notebookuri de Python. Un notebook e un document în care codul e împărțit în bucăți numite celule. Rulezi (execuți) celulele una câte una, iar rezultatul fiecăreia apare imediat sub ea.

Câțiva pași îi faci în terminal: o fereastră în care scrii comenzi ca text, în loc să dai clic pe butoane. Calculatorul execută comanda când apeși Enter.

- Windows: intră pe python.org/downloads, descarcă versiunea 3.11 și rulează instalatorul. Butonul mare de sus îți dă cea mai nouă versiune, așa că alege din lista de mai jos Python 3.11.9, ultima 3.11 care are instalator. La primul ecran bifează „Add python.exe to PATH” înainte de Install Now, altfel terminalul nu va găsi Python după instalare. PATH e lista de foldere în care calculatorul caută un program când îi scrii numele în terminal.
- macOS: descarcă tot de pe python.org/downloads fișierul .pkg pentru Python 3.11.9 și parcurge instalatorul. Dacă ai deja Homebrew, un program care instalează alte programe din terminal, merge la fel de bine `brew install python@3.11`.
- Linux (Ubuntu/Debian): deschide un terminal și rulează `sudo apt update && sudo apt install python3 python3-pip python3-venv`.

Pip vine inclus cu Python începând din versiunea 3.4, deci nu-l instalezi separat. Ca să confirmi că merg amândouă, deschide un terminal (Command Prompt sau PowerShell pe Windows, Terminal pe macOS și Linux), scrie pe rând comenzile de mai jos și apasă Enter după fiecare:

```
python --version
pip --version
```
caption: Dacă amândouă îți dau un număr de versiune, de exemplu Python 3.11.9, Python și pip sunt instalate.

Pe macOS și Linux comenzile se numesc de obicei `python3` și `pip3`, deci scrie `python3 --version` și `pip3 --version`. Pe Windows, dacă `python` nu e recunoscut, încearcă `py --version`; dacă nici `pip` nu răspunde, încearcă `pip3` sau `python -m pip --version`.

Cu Python instalat, treci la mediul de lucru propriu-zis. Un mediu virtual e o cutie separată pentru bibliotecile unui proiect, ca să nu se bată cap în cap cu altele instalate global, adică pentru tot calculatorul. Îl creezi o dată pe proiect (de obicei, un folder pentru fiecare problemă la care lucrezi) și lucrezi mereu în el. Așa, un proiect vechi poate rămâne pe o versiune mai veche a unei biblioteci, iar unul nou o poate folosi pe cea mai recentă.

1. Fă-ți un folder pentru lucru și deschide un terminal în el: scrie `cd` și un spațiu, trage folderul cu mouse-ul în fereastra terminalului și apasă Enter. `cd` vine de la „change directory”, adică „mută-te în folderul ăsta”.
2. Creează mediul virtual cu `python -m venv .venv` (pe macOS și Linux, `python3 -m venv .venv`). Comanda face în folderul tău un folder nou, `.venv`: cutia de care vorbeam.
3. Activează-l: `.venv\Scripts\activate` pe Windows, `source .venv/bin/activate` pe macOS și Linux. Când e activ, la începutul rândului din terminal apare `(.venv)`. Dacă PowerShell refuză comanda, fă pașii în Command Prompt. Activarea o repeți de fiecare dată când deschizi un terminal nou.
4. Scrie `pip install jupyterlab` și apasă Enter. Pip descarcă Jupyter Lab și îl instalează în mediul virtual; durează puțin și umple ecranul cu text, e normal.
5. Scrie `jupyter lab` și apasă Enter: ți se deschide automat un tab de browser cu interfața. Ca să faci un notebook nou, apasă pe Python 3 (ipykernel), sub Notebook. Lasă terminalul deschis cât lucrezi, pentru că, dacă îl închizi, se oprește și Jupyter.

> [!NOTE]
> Poți folosi și VS Code, un editor de cod, dar la anumite concursuri nu e disponibil. De asemenea, Google Colab e o variantă bună când lucrezi de pe un calculator care nu e al tău: merge direct în browser, cu un cont Google, fără să instalezi nimic.

## La concurs
La olimpiadă lucrezi pe calculatoarele centrului de concurs, cu Windows, JupyterLab, Python 3.11 și Firefox. În sală nu ai voie cu notițe sau cărți. Pe internet ai acces doar la platforma de concurs (site-ul de unde iei problemele și unde îți încarci răspunsurile) și la documentația oficială a limbajului și a bibliotecilor permise. Documentația e manualul scris de autorii lor, de exemplu docs.python.org, numpy.org/doc, pandas.pydata.org/docs sau scikit-learn.org. Lista exactă o anunță comisia.

De asta merită să te obișnuiești de acum să cauți în documentație, nu pe Google. Ai ajutor și direct în notebook: scrii numele unei funcții urmat de `?`, de exemplu `pd.read_csv?`, sau apeși Shift+Tab între parantezele ei și vezi ce argumente primește. O funcție e o comandă cu nume care face un lucru anume, iar argumentele sunt ce îi dai între paranteze. De exemplu, `pd.read_csv("date.csv")` citește tabelul din fișierul date.csv, iar `"date.csv"` e argumentul ei. Ajutorul cu `?` merge doar după ce ai instalat și importat biblioteca; pentru pandas faci asta în Lecția 4.

> [!NOTE]
> Câteva taste din JupyterLab care îți câștigă timp: Shift+Enter rulează celula și trece la următoarea, Esc apoi A sau B adaugă o celulă deasupra sau dedesubt, Esc apoi M transformă celula în text, pentru notițe. Înainte să trimiți o soluție, rulează Kernel → Restart Kernel and Run All Cells, ca să fii sigur că notebook-ul merge de la zero. Kernelul e programul care rulează codul din celule și ține minte tot ce au calculat ele. Restart îl face să uite tot, iar Run All Cells rulează apoi toate celulele, de sus în jos. Fără pasul ăsta, notebook-ul poate să meargă la tine doar pentru că kernelul ține minte rezultatul unei celule pe care între timp ai șters-o.

# @practice
- Prima submisie pe MLCompete (pașii sunt în Lecția 2)
- Caută în documentația pandas ce face argumentul sep din read_csv, fără Google
