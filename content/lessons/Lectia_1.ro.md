---
code: S1
duration: ~2h
---

# @intro
Firesc, prima întrebare e ce înseamnă mai exact inteligența artificială. Cu atâta confuzie în jurul termenului, e important să clarificăm întâi asta și abia apoi să pregătim mediul de lucru.

## Ce e AI și unde se folosește
La bază, inteligența artificială înseamnă orice tehnologie care simulează funcții umane. În loc să urmeze reguli stricte, îi arăți mai multe exemple și o lași să găsească singură regulile, prin diverși algoritmi. Nu e ceva magic, ChatGPT nu „gândește". Partea asta, de învățat din exemple, se numește machine learning și reprezintă aproape tot ce faci la olimpiadă.

În sfera AI merită menționată și o anumită terminologie. Data science se referă la toate domeniile cu care avem de-a face în AI: matematică, informatică și altele. Matematica e baza și se folosește în absolut tot ce vom face, dar nu trebuie neapărat învățată în detaliu ca să rezolvi probleme sau să faci proiecte. Anumiți algoritmi clasici de informatică sunt și ei folosiți, BFS și DFS de exemplu, în anumite arii ale AI-ului. Machine learningul, menționat mai sus, se împarte la rândul lui în mai multe categorii: învățare supervizată, nesupervizată, reinforcement learning și, uneori, self-supervised.

Poate ajuta câteva exemple. Ca să deosebești un email spam de unul normal cu reguli scrise de mână, ar trebui să scrii sute de condiții de tipul „dacă conține cuvântul X". Cu machine learning, îi dai câteva mii de emailuri deja marcate ca spam sau nu, iar modelul învață singur ce combinații de cuvinte prezic spamul. Câteva taskuri clasice de AI includ, dar nu se limitează la:

- Clasificare: pui o etichetă (spam sau nu, ce cifră e în imagine, pentru ce boală sunt specifice simptomele).
- Regresie: prezici un număr (prețul unei case, temperatura de mâine).
- Clustering: găsești structura din date fără etichete (ce clienți seamănă între ei).

Importante mai sunt și conceptele de overfitting, underfitting, bias și varianță. Un model care a învățat pe de rost datele de antrenament, inclusiv zgomotul din ele, merge aproape perfect pe ce a văzut și slab pe date noi: asta e overfitting. La capătul opus, un model prea simplu pentru problemă nu prinde nici măcar tiparul real și greșește peste tot, și pe antrenament, și pe test: asta e underfitting.

Cele două se explică prin bias și varianță. Biasul e eroarea din presupuneri prea simple, cum ar fi să tragi o dreaptă prin date care descriu de fapt o curbă. Varianța e sensibilitatea la datele exacte pe care s-a antrenat: schimbi puțin setul de antrenament și modelul dă cu totul alte predicții. Bias mare înseamnă underfitting, varianță mare înseamnă overfitting, iar scăderea unuia îl crește de obicei pe celălalt. Tot ce faci la olimpiadă, de la cât de complex alegi modelul până la cât de mult îl antrenezi, e de fapt căutarea punctului de echilibru dintre ele.

> [!NOTE]
> Cum le recunoști în practică: compari scorul pe antrenament cu cel pe validare. Amândouă slabe înseamnă underfitting, ai nevoie de un model mai puternic. Scor bun pe antrenament și slab pe validare înseamnă overfitting, ai nevoie de mai multe date, de regularizare sau de un model mai simplu.

> [!NOTE]
> La concursurile de AI, aproape orice problemă se reduce la asta: primești date, le analizezi, antrenezi un model și îl pui să prezică pe date noi.

## Ce e Python și de ce el
Python e limbajul standard în care se scrie cod de inteligență artificială. Nu pentru că ar fi cel mai rapid, ci pentru că e puternic abstractizat și are deja scrise bibliotecile pe care le vrei, eventual în limbaje mai rapide: NumPy pentru calcul numeric, Pandas pentru tabele, scikit-learn pentru modele clasice, PyTorch pentru rețele neuronale.

O bibliotecă e cod scris de altcineva, pe care îl imporți și îl folosești. La taskuri de AI scopul nu e să înveți pe de rost cum se scriu algoritmii sau modelele, ci să le înțelegi, să știi când se folosesc și să le adaptezi la problema respectivă, împreună cu alte metode.

> [!NOTE]
> E bine să instalezi o versiune stabilă de Python, de exemplu 3.11, care e bine susținută de biblioteci.

## Mediul de lucru: Python, pip și Jupyter Lab
Înainte să scrii cod, ai nevoie de trei lucruri instalate pe calculator: Python, pip (care vine automat cu el) și Jupyter Lab. Jupyter Lab, VS Code și Google Colab sunt medii în care poți scrie notebookuri de Python, care îți permit să scrii codul pe bucăți și să îl execuți modular.

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
> Poți folosi și VS Code, dar la anumite concursuri nu e disponibil. De asemenea, Google Colab e o variantă bună când lucrezi de pe un calculator care nu e al tău.

