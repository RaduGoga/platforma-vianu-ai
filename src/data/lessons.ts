// AUTO-GENERAT din content/lessons/*.ro.md — NU edita direct.
// Editează fișierele markdown din content/lessons/, apoi rulează `npm run lessons`
// (se rulează oricum automat înainte de dev și build).
import type { Lesson } from "./lesson-types";
export type { Block, LessonSection, Lesson } from "./lesson-types";

export const lessons: Lesson[] = [
  {
    "moduleCode": "S1",
    "duration": "~2h",
    "intro": "Firesc, prima întrebare e ce înseamnă mai exact inteligența artificială. Cu atâta confuzie în jurul termenului, e important să clarificăm întâi asta și abia apoi să pregătim mediul de lucru, adică programele în care vei scrie și vei rula cod.",
    "sections": [
      {
        "heading": "Ce e AI și unde se folosește",
        "blocks": [
          {
            "p": "Telefonul care recunoaște fețele din pozele tale, Google Translate care îți traduce un text, YouTube care îți recomandă următorul videoclip: toate folosesc inteligență artificială, prescurtat AI (din engleză, artificial intelligence). La bază, inteligența artificială înseamnă orice tehnologie care simulează funcții umane, adică face lucruri pentru care până de curând era nevoie de un om."
          },
          {
            "p": "De cele mai multe ori, în loc să urmeze reguli stricte, îi arăți mai multe exemple și o lași să găsească singură regulile, prin diverși algoritmi. Un algoritm e o rețetă: un șir de pași pe care calculatorul îi urmează. Nu e nimic misterios la mijloc. ChatGPT nu „gândește”: a învățat din foarte multe exemple de text. Partea asta, de învățat din exemple, se numește machine learning (în română, învățare automată) și e aproape tot ce faci la olimpiadă."
          },
          {
            "p": "Poate ajuta un exemplu. Ca să deosebești un email spam de unul normal cu reguli scrise de mână, ar trebui să scrii sute de condiții de tipul „dacă conține cuvântul X”. Cu machine learning, îi dai câteva mii de emailuri deja marcate ca spam sau nu, iar modelul învață singur ce combinații de cuvinte prezic spamul. Modelul e programul care învață din exemple. Emailurile marcate, din care învață, sunt datele de antrenare, iar pasul în care învață se numește antrenare. După antrenare îi dai un email nou, nemarcat, și el îți spune dacă e spam: răspunsul lui se numește predicție."
          },
          {
            "p": "În jurul AI-ului o să mai auzi câțiva termeni. Data science înseamnă să scoți informație utilă din date, cu ajutorul matematicii (mai ales al statisticii) și al informaticii. De exemplu, afli din bonurile unui magazin ce produse se cumpără des împreună. Matematica e baza și se folosește în absolut tot ce vom face, dar nu trebuie neapărat învățată în detaliu ca să rezolvi probleme sau să faci proiecte. Anumiți algoritmi clasici de informatică sunt și ei folosiți în anumite arii ale AI-ului, de exemplu BFS și DFS: două feluri de a căuta un drum, cum ar fi ieșirea dintr-un labirint. Revin în Lecția 11. Machine learningul, menționat mai sus, se împarte la rândul lui în mai multe categorii:"
          },
          {
            "list": [
              "Învățare supervizată: fiecare exemplu vine cu răspunsul corect, ca emailurile marcate spam sau nu, iar modelul învață să dea singur răspunsul pentru exemple noi.",
              "Învățare nesupervizată: exemplele nu au răspuns, iar modelul caută singur tipare, de exemplu grupuri de clienți care cumpără lucruri asemănătoare. O vezi în Lecția 10.",
              "Reinforcement learning (învățare prin recompensă): modelul învață prin încercare și eroare, adică primește puncte pentru mutările bune și pierde puncte pentru cele proaste. De exemplu, un program care învață singur să joace un joc doar din scor. Îl vezi în Lecția 20.",
              "Învățare self-supervised (autosupervizată), pusă uneori ca o categorie separată: răspunsurile vin chiar din date. Modelul citește un text și încearcă să ghicească următorul cuvânt, pe care textul îl are deja. Așa învață din text modelele ca ChatGPT."
            ]
          },
          {
            "p": "Task e cuvântul englezesc pentru sarcină: tipul de problemă pe care o rezolvă modelul. Câteva taskuri clasice de AI includ, dar nu se limitează la:"
          },
          {
            "list": [
              "Clasificare: pui o etichetă, adică alegi răspunsul dintr-o listă fixă de variante, numite clase (spam sau nu, ce cifră e în imagine, pentru ce boală sunt specifice simptomele).",
              "Regresie: prezici un număr (prețul unei case, temperatura de mâine). Ca și clasificarea, e învățare supervizată.",
              "Clustering: găsești structura din date fără etichete, de obicei grupuri de exemple asemănătoare (ce clienți seamănă între ei). E învățare nesupervizată."
            ]
          },
          {
            "p": "Importante mai sunt și conceptele de overfitting, underfitting, bias și varianță. Gândește-te la un elev care învață pe de rost răspunsurile de la testul de anul trecut. Dacă primește exact aceleași întrebări, ia 10. Dacă primește întrebări noi, nu știe nimic, pentru că n-a înțeles lecția, doar a memorat-o."
          },
          {
            "p": "Un model poate face la fel: dacă a învățat pe de rost datele de antrenare, inclusiv zgomotul din ele, merge aproape perfect pe ce a văzut și slab pe date noi. Asta e overfitting. Zgomotul înseamnă detaliile întâmplătoare sau greșelile din date, de exemplu un email normal marcat din greșeală ca spam. Detaliile astea nu se repetă în datele noi, deci n-are rost să fie învățate. La capătul opus, un model prea simplu pentru problemă nu prinde nici măcar tiparul real și greșește peste tot, și pe datele de antrenare, și pe cele noi: asta e underfitting. E elevul care a citit doar titlul lecției și greșește chiar și întrebările de anul trecut."
          },
          {
            "p": "Cele două se explică prin bias și varianță. Biasul e eroarea din presupuneri prea simple, cum ar fi să tragi o dreaptă prin date care descriu de fapt o curbă. Imaginează-ți niște puncte care, pe grafic, urcă tot mai abrupt: orice dreaptă ai trage, trece departe de multe dintre ele. Varianța e sensibilitatea la datele exacte pe care s-a antrenat: schimbi puțin setul de antrenare și modelul dă cu totul alte predicții. Bias mare înseamnă underfitting, varianță mare înseamnă overfitting, iar scăderea unuia îl crește de obicei pe celălalt. Tot ce faci la olimpiadă, de la cât de complex alegi modelul până la cât de mult îl antrenezi, e de fapt căutarea punctului de echilibru dintre ele."
          },
          {
            "note": "Cum le recunoști în practică: compari scorul pe antrenare cu cel pe validare. Scorul e un număr care arată cât de bine merge modelul, de exemplu procentul de emailuri clasificate corect. Pentru validare pui deoparte de la început o parte din datele de antrenare, cu tot cu răspuns. Modelul nu le vede la antrenare, așa că scorul pe ele e ca nota la un test cu întrebări noi. Amândouă scorurile slabe înseamnă underfitting, ai nevoie de un model mai complex. Scor bun pe antrenare și slab pe validare înseamnă overfitting, ai nevoie de mai multe date, de regularizare sau de un model mai simplu. Regularizarea e o frână care ține modelul mai simplu, ca să nu poată învăța pe de rost. O vezi la lucru la arbori de decizie în Lecția 7 și la rețele neuronale în Lecția 15."
          },
          {
            "note": "La concursurile de AI, aproape orice problemă se reduce la asta: primești date, le analizezi, antrenezi un model și îl pui să prezică pe date noi."
          }
        ]
      },
      {
        "heading": "Ce e Python și de ce el",
        "blocks": [
          {
            "p": "Python e limbajul de programare standard în care se scrie cod de inteligență artificială (codul e textul cu instrucțiuni pe care le execută calculatorul). Nu pentru că ar fi cel mai rapid, ci pentru că e foarte abstractizat și are deja scrise bibliotecile pe care le vrei, eventual în limbaje mai rapide: NumPy pentru calcul numeric, Pandas pentru tabele, scikit-learn pentru modele clasice, PyTorch pentru rețele neuronale. Abstractizat înseamnă că scrii câteva rânduri pentru lucruri complicate, iar detaliile le ascund bibliotecile. Un model întreg, de exemplu, îl antrenezi cu o singură linie de cod."
          },
          {
            "p": "O bibliotecă e cod scris de altcineva, pe care îl imporți (îl aduci în codul tău cu comanda `import`) și îl folosești. La taskuri de AI scopul nu e să înveți pe de rost cum se scriu algoritmii sau modelele. Scopul e să le înțelegi, să știi când se folosesc și să le adaptezi la problema respectivă, împreună cu alte metode."
          },
          {
            "note": "E bine să instalezi o versiune stabilă de Python, de exemplu 3.11, care e bine susținută de biblioteci. E și versiunea de pe calculatoarele de la olimpiadă."
          }
        ]
      },
      {
        "heading": "Mediul de lucru: Python, pip și Jupyter Lab",
        "blocks": [
          {
            "p": "Înainte să scrii cod, ai nevoie de trei lucruri instalate pe calculator: Python, pip (care vine automat cu el) și Jupyter Lab. Python e programul care citește și execută codul scris în Python, iar pip e programul cu care instalezi biblioteci. Jupyter Lab, VS Code și Google Colab sunt programe în care poți scrie notebookuri de Python. Un notebook e un document în care codul e împărțit în bucăți numite celule. Rulezi (execuți) celulele una câte una, iar rezultatul fiecăreia apare imediat sub ea."
          },
          {
            "p": "Câțiva pași îi faci în terminal: o fereastră în care scrii comenzi ca text, în loc să dai clic pe butoane. Calculatorul execută comanda când apeși Enter."
          },
          {
            "list": [
              "Windows: intră pe python.org/downloads, descarcă versiunea 3.11 și rulează instalatorul. Butonul mare de sus îți dă cea mai nouă versiune, așa că alege din lista de mai jos Python 3.11.9, ultima 3.11 care are instalator. La primul ecran bifează „Add python.exe to PATH” înainte de Install Now, altfel terminalul nu va găsi Python după instalare. PATH e lista de foldere în care calculatorul caută un program când îi scrii numele în terminal.",
              "macOS: descarcă tot de pe python.org/downloads fișierul .pkg pentru Python 3.11.9 și parcurge instalatorul. Dacă ai deja Homebrew, un program care instalează alte programe din terminal, merge la fel de bine `brew install python@3.11`.",
              "Linux (Ubuntu/Debian): deschide un terminal și rulează `sudo apt update && sudo apt install python3 python3-pip python3-venv`."
            ]
          },
          {
            "p": "Pip vine inclus cu Python începând din versiunea 3.4, deci nu-l instalezi separat. Ca să confirmi că merg amândouă, deschide un terminal (Command Prompt sau PowerShell pe Windows, Terminal pe macOS și Linux), scrie pe rând comenzile de mai jos și apasă Enter după fiecare:"
          },
          {
            "code": "python --version\npip --version",
            "caption": "Dacă amândouă îți dau un număr de versiune, de exemplu Python 3.11.9, Python și pip sunt instalate."
          },
          {
            "p": "Pe macOS și Linux comenzile se numesc de obicei `python3` și `pip3`, deci scrie `python3 --version` și `pip3 --version`. Pe Windows, dacă `python` nu e recunoscut, încearcă `py --version`; dacă nici `pip` nu răspunde, încearcă `pip3` sau `python -m pip --version`."
          },
          {
            "p": "Cu Python instalat, treci la mediul de lucru propriu-zis. Un mediu virtual e o cutie separată pentru bibliotecile unui proiect, ca să nu se bată cap în cap cu altele instalate global, adică pentru tot calculatorul. Îl creezi o dată pe proiect (de obicei, un folder pentru fiecare problemă la care lucrezi) și lucrezi mereu în el. Așa, un proiect vechi poate rămâne pe o versiune mai veche a unei biblioteci, iar unul nou o poate folosi pe cea mai recentă."
          },
          {
            "steps": [
              "Fă-ți un folder pentru lucru și deschide un terminal în el: scrie `cd` și un spațiu, trage folderul cu mouse-ul în fereastra terminalului și apasă Enter. `cd` vine de la „change directory”, adică „mută-te în folderul ăsta”.",
              "Creează mediul virtual cu `python -m venv .venv` (pe macOS și Linux, `python3 -m venv .venv`). Comanda face în folderul tău un folder nou, `.venv`: cutia de care vorbeam.",
              "Activează-l: `.venv\\Scripts\\activate` pe Windows, `source .venv/bin/activate` pe macOS și Linux. Când e activ, la începutul rândului din terminal apare `(.venv)`. Dacă PowerShell refuză comanda, fă pașii în Command Prompt. Activarea o repeți de fiecare dată când deschizi un terminal nou.",
              "Scrie `pip install jupyterlab` și apasă Enter. Pip descarcă Jupyter Lab și îl instalează în mediul virtual; durează puțin și umple ecranul cu text, e normal.",
              "Scrie `jupyter lab` și apasă Enter: ți se deschide automat un tab de browser cu interfața. Ca să faci un notebook nou, apasă pe Python 3 (ipykernel), sub Notebook. Lasă terminalul deschis cât lucrezi, pentru că, dacă îl închizi, se oprește și Jupyter."
            ]
          },
          {
            "note": "Poți folosi și VS Code, un editor de cod, dar la anumite concursuri nu e disponibil. De asemenea, Google Colab e o variantă bună când lucrezi de pe un calculator care nu e al tău: merge direct în browser, cu un cont Google, fără să instalezi nimic."
          }
        ]
      },
      {
        "heading": "La concurs",
        "blocks": [
          {
            "p": "La olimpiadă lucrezi pe calculatoarele centrului de concurs, cu Windows, JupyterLab, Python 3.11 și Firefox. În sală nu ai voie cu notițe sau cărți. Pe internet ai acces doar la platforma de concurs (site-ul de unde iei problemele și unde îți încarci răspunsurile) și la documentația oficială a limbajului și a bibliotecilor permise. Documentația e manualul scris de autorii lor, de exemplu docs.python.org, numpy.org/doc, pandas.pydata.org/docs sau scikit-learn.org. Lista exactă o anunță comisia."
          },
          {
            "p": "De asta merită să te obișnuiești de acum să cauți în documentație, nu pe Google. Ai ajutor și direct în notebook: scrii numele unei funcții urmat de `?`, de exemplu `pd.read_csv?`, sau apeși Shift+Tab între parantezele ei și vezi ce argumente primește. O funcție e o comandă cu nume care face un lucru anume, iar argumentele sunt ce îi dai între paranteze. De exemplu, `pd.read_csv(\"date.csv\")` citește tabelul din fișierul date.csv, iar `\"date.csv\"` e argumentul ei. Ajutorul cu `?` merge doar după ce ai instalat și importat biblioteca; pentru pandas faci asta în Lecția 4."
          },
          {
            "note": "Câteva taste din JupyterLab care îți câștigă timp: Shift+Enter rulează celula și trece la următoarea, Esc apoi A sau B adaugă o celulă deasupra sau dedesubt, Esc apoi M transformă celula în text, pentru notițe. Înainte să trimiți o soluție, rulează Kernel → Restart Kernel and Run All Cells, ca să fii sigur că notebook-ul merge de la zero. Kernelul e programul care rulează codul din celule și ține minte tot ce au calculat ele. Restart îl face să uite tot, iar Run All Cells rulează apoi toate celulele, de sus în jos. Fără pasul ăsta, notebook-ul poate să meargă la tine doar pentru că kernelul ține minte rezultatul unei celule pe care între timp ai șters-o."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Prima submisie pe MLCompete (pașii sunt în Lecția 2)"
      },
      {
        "title": "Caută în documentația pandas ce face argumentul sep din read_csv, fără Google"
      }
    ]
  },
  {
    "moduleCode": "S2",
    "duration": "~2h",
    "intro": "Înainte să înveți vreun model, merită să înțelegi despre ce este vorba. O problemă de concurs de AI are foarte des aceleași bucăți: niște date, o țintă de prezis, o metrică de punctare și un fișier de submisie, cu răspunsurile tale. Cine citește cerința corect pleacă cu un avans mare.",
    "sections": [
      {
        "heading": "Anatomia unei probleme",
        "blocks": [
          {
            "p": "Primești două seturi de date. Unul de antrenare, care are și răspunsurile corecte (numite etichete sau țintă, labels sau target în engleză), și unul de test, care are aceleași coloane dar fără răspuns. Sarcina ta e să prezici răspunsul pentru setul de test, pornind de la ce ai învățat pe cel de antrenare."
          },
          {
            "p": "Un exemplu mic, după problema Titanic de pe Kaggle: din vârsta unui pasager și din prețul biletului său trebuie să ghicești dacă a supraviețuit naufragiului. Datele vin de obicei ca fișiere CSV, adică tabele salvate ca text. Fiecare linie e un rând din tabel, cu valorile despărțite prin virgule, iar prima linie are numele coloanelor. Fișierul de antrenare, `train.csv`, arată așa:"
          },
          {
            "code": "id,varsta,pret_bilet,a_supravietuit\n1,22,7,0\n2,38,71,1\n3,26,8,1\n4,35,53,1\n5,35,8,0",
            "caption": "Fiecare rând e un pasager. Ultima coloană e răspunsul: 1 dacă a supraviețuit, 0 dacă nu."
          },
          {
            "p": "Fișierul de test, `test.csv`, are alți pasageri și aceleași coloane, mai puțin ultima. Pe ea trebuie s-o ghicești tu:"
          },
          {
            "code": "id,varsta,pret_bilet\n6,34,8\n7,4,16\n8,58,26",
            "caption": "Aceleași coloane, fără răspuns."
          },
          {
            "p": "Răspunsurile tale le scrii într-un fișier de submisie, de obicei `submission.csv`. Submisia e răspunsul tău la problemă: fișierul pe care îl încarci pe platformă ca să fie notat. Are câte un rând pentru fiecare pasager din test, cu id-ul lui și predicția ta:"
          },
          {
            "code": "id,a_supravietuit\n6,0\n7,1\n8,1",
            "caption": "Pentru fiecare id din test, 1 sau 0, după cum crezi tu."
          },
          {
            "list": [
              "Date de antrenare: rândurile pe care le vezi complet, cu tot cu răspuns, ca în `train.csv`. De aici învață modelul.",
              "Date de test: aceleași coloane, dar coloana-țintă lipsește, ca în `test.csv`. Aici trebuie să completezi tu.",
              "Ținta (target): ce prezici, aici coloana `a_supravietuit`. Poate fi o etichetă (spam sau nu) sau un număr (un preț). Eticheta (label) e răspunsul de pe un singur rând: pasagerul 2 are eticheta 1.",
              "Fișierul de submisie: un tabel cu predicțiile tale, în formatul exact cerut de platformă, ca `submission.csv`."
            ]
          },
          {
            "note": "Coloanele folosite ca intrare pentru model se numesc trăsături (features), aici `varsta` și `pret_bilet`. Coloana `id` nu e o trăsătură: e doar numărul rândului, ca platforma să știe a cui e fiecare predicție."
          }
        ]
      },
      {
        "heading": "Metrica",
        "blocks": [
          {
            "p": "Fiecare problemă are o metrică, adică formula după care se calculează scorul tău. E scrisă în enunț și contează mult. Dacă metrica e F1 și tu optimizezi acuratețea (le explicăm imediat mai jos), poți urca pe un scor care nu-ți aduce puncte. Câteva exemple:"
          },
          {
            "list": [
              "Acuratețe: procentul de răspunsuri corecte. Simplă, dar înșelătoare când clasele (variantele de răspuns, ca spam și normal) sunt dezechilibrate, adică una e mult mai rară decât celelalte.",
              "F1: echilibrează precizia cu recallul, bună când clasele sunt dezechilibrate.",
              "RMSE sau MAE: pentru ținte numerice (regresie), cât de departe ești în medie de răspunsul real."
            ]
          },
          {
            "p": "Un exemplu de clase dezechilibrate: din 100 de plăți cu cardul, 98 sunt normale și 2 sunt fraude. Un model care spune mereu „normală” nimerește 98 din 100, deci are acuratețe 98%. Totuși, n-a prins nicio fraudă, adică exact ce te interesa."
          },
          {
            "p": "Aici te ajută F1, care se calculează din două numere. Precizia arată câte dintre plățile marcate de model ca fraudă chiar erau fraude. Recallul arată câte dintre fraudele reale a prins modelul. Modelul care spune mereu „normală” n-a prins nicio fraudă, deci are recallul 0 și F1 tot 0. F1 e un scor între 0 și 1, mai mare e mai bine; formula și restul detaliilor sunt în Lecția 8."
          },
          {
            "p": "Pentru numere, un exemplu calculat de mână. Prezici temperatura de mâine în trei orașe: 10, 12 și 9 grade. În realitate au fost 11, 12 și 6 grade, deci erorile tale, fără semn, sunt 1, 0 și 3 grade. MAE (mean absolute error, eroarea absolută medie) e media lor: (1 + 0 + 3) / 3 ≈ 1.33 grade. RMSE (root mean squared error, radicalul din media erorilor la pătrat) ridică întâi fiecare eroare la pătrat (1, 0, 9), face media și apoi scoate radicalul: √((1 + 0 + 9) / 3) ≈ √3.33 ≈ 1.83 grade. Iese mai mare pentru că eroarea de 3 grade devine 9 la pătrat: RMSE pedepsește mai tare erorile mari."
          },
          {
            "p": "O regulă bună: citește metrica înainte de orice, și antrenează cu ea în minte. Dacă se punctează F1, validează local tot pe F1, adică măsoară F1 și pe datele puse deoparte ca să-ți verifici modelul (validarea din Lecția 1)."
          }
        ]
      },
      {
        "heading": "Submisie și leaderboard",
        "blocks": [
          {
            "p": "Când ai predicțiile, le pui în fișierul cerut și îl încarci. Platforma îl compară cu răspunsurile corecte, pe care tu nu le vezi, și îți dă un scor pe un clasament cu toți concurenții, numit leaderboard. Ai de obicei un număr limitat de submisii, deci nu le irosi pe încercări la întâmplare."
          },
          {
            "p": "Leaderboardul are două bucăți. Cel public se calculează pe o parte din datele de test și îl vezi cât ține concursul. Cel privat se calculează pe restul și se dezvăluie abia la final. De exemplu, dacă testul are 1000 de rânduri, scorul public poate veni din 300 dintre ele, iar cel privat din celelalte 700, fără să știi care sunt care. Clasamentul care contează e cel privat. Împărțirea asta în două (în engleză, split) există dintr-un motiv anume."
          },
          {
            "p": "Dacă îți alegi modelul după scorul public, ajungi să te potrivești pe acea bucată mică de date, nu pe problema reală. Se cheamă overfitting pe leaderboard: urci frumos pe public, apoi cazi pe privat, unde se împart de fapt punctele. E overfittingul din Lecția 1 (învățatul pe de rost), doar că acum îl faci tu, prin alegerile tale. Dacă încerci 50 de variante și o păstrezi pe cea cu cel mai bun scor public, se poate să fi ales doar varianta care a avut noroc pe cele 300 de rânduri publice."
          },
          {
            "note": "Apărarea e o validare locală serioasă. Îți ții o parte din datele de antrenare deoparte, ca test propriu, și te încrezi în scorul de acolo mai mult decât în leaderboardul public. De exemplu, din 4000 de rânduri de antrenare pui deoparte 20%, adică 800. Antrenezi modelul pe celelalte 3200 și îl notezi pe cele 800, al căror răspuns îl știi (codul e în Lecția 6). Sunt mai multe rânduri decât cele 300 publice și le poți folosi de câte ori vrei, fără să consumi submisii. La final alegi submisiile pe scorul local, nu pe cel public."
          }
        ]
      },
      {
        "heading": "Regulile de la ONIA",
        "blocks": [
          {
            "p": "Din regulamentul olimpiadei (ONIA, Olimpiada Națională de Inteligență Artificială), câteva lucruri pe care e bine să le știi dinainte:"
          },
          {
            "list": [
              "Proba durează patru ore.",
              "Soluția unei probleme are două părți: fișierul cu răspunsul și codul Python care l-a produs. Le trimiți pe amândouă pe platformă.",
              "Numărul de submisii e limitat, iar între două submisii trebuie să treacă un timp minim. Le afli odată cu subiectele.",
              "Scorul din timpul probei e provizoriu, calculat pe o parte din datele de test, ca un leaderboard public. Cel final se calculează pe tot setul.",
              "La fiecare problemă alegi două submisii. Doar ele intră în clasamentul final.",
              "Contul pe platform.olimpiada-ai.ro trebuie creat și activat înainte de termenul anunțat. După termen nu te mai poți înscrie."
            ]
          },
          {
            "note": "Pragul minim pentru etapa națională e 60% din punctajul total."
          }
        ]
      },
      {
        "heading": "Unde te antrenezi",
        "blocks": [
          {
            "p": "Trei platforme pe care găsești probleme:"
          },
          {
            "list": [
              "Kaggle (kaggle.com): cea mai folosită platformă internațională de machine learning.",
              "MLCompete (platform.olimpiada-ai.ro): platforma pe care se ține olimpiada și pe care exersezi între etape, cu probleme de arhivă și competiții de antrenament.",
              "Nitro AI Judge (judge.nitro-ai.org): platforma pe care se ține RoAI și alte concursuri de AI."
            ]
          }
        ]
      },
      {
        "heading": "Prima submisie",
        "blocks": [
          {
            "p": "MLCompete (platform.olimpiada-ai.ro) și Nitro AI Judge (judge.nitro-ai.org) sunt platformele pe care vei exersa. Fă-ți cont pe amândouă. Prima submisie nu trebuie să aibă un scor bun: o faci ca să înveți drumul de la date până la scor."
          },
          {
            "steps": [
              "Intră într-o competiție de antrenament și citește ce metrică se punctează.",
              "Descarcă datele și deschide fișierul de exemplu de submisie (de obicei `sample_submission.csv`), ca să vezi exact ce coloane și ce format cere. Dacă îl deschizi cu Notepad sau alt editor de text, arată ca exemplele de mai sus.",
              "Produ un fișier în același format, chiar și cu răspunsuri la întâmplare. Cel mai simplu e să încarci chiar fișierul de exemplu, neschimbat.",
              "Încarcă-l și uită-te la scor."
            ]
          },
          {
            "note": "Dacă fișierul nu e formatat corect, primești erori de validare. Citește-le, îți spun exact ce nu se potrivește. Aici „validare” înseamnă că platforma îți verifică formatul fișierului, nu modelul."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Orice problemă cu fișier de submisie de exemplu"
      },
      {
        "title": "Titanic pe Kaggle",
        "url": "https://www.kaggle.com/competitions/titanic"
      }
    ]
  },
  {
    "moduleCode": "S3",
    "duration": "~1 săptămână",
    "intro": "Tot ce urmează în programă e scris în Python. Lecția asta e despre limbaj, nu despre machine learning: dacă o sari, o să pierzi timp la fiecare lecție următoare căutând cum se scrie un dicționar. Dacă n-ai mai programat, citește-o în ordine și rulează fiecare bloc de cod într-un notebook din Jupyter Lab (Lecția 1), apoi modifică o valoare și vezi ce se schimbă. Dacă știi deja Python, treci repede peste ea și oprește-te doar la comprehensions, despachetare, excepții și expresii regulate, care apar constant în codul de concurs.",
    "sections": [
      {
        "heading": "Primele linii de cod",
        "blocks": [
          {
            "p": "Un notebook e format din celule (Lecția 1). Scrii codul într-o celulă și o rulezi cu Shift+Enter: Python execută liniile pe rând, de sus în jos, și îți arată rezultatul chiar sub celulă."
          },
          {
            "code": "print(\"Salut, Vianu\")   # Salut, Vianu\nprint(2 + 3)            # 5\n# rândul ăsta e un comentariu, Python îl sare\nprint(6 * 7)            # 42"
          },
          {
            "p": "Sub celulă apar trei rânduri, în ordine: `Salut, Vianu`, `5` și `42`. `print` e o funcție, adică o comandă cu nume pe care o pui să lucreze (o apelezi) scriind după ea o valoare între paranteze. Valoarea dintre paranteze se numește argument, iar `print` o afișează sub celulă. Textul scris între ghilimele apare exact așa. La `2 + 3`, Python face întâi calculul și afișează rezultatul. În cod, `*` e înmulțirea și `/` împărțirea."
          },
          {
            "p": "Tot ce urmează după `#` pe un rând e un comentariu: o notiță pentru oameni, pe care Python n-o rulează. În lecția asta, comentariul de la capătul unei linii îți arată ce afișează linia, ca să compari cu ce vezi sub celulă."
          },
          {
            "p": "Dacă ultima linie din celulă e doar o valoare, fără `print`, Jupyter o afișează și pe ea. Celelalte linii fără `print` nu apar, de aceea exemplele de aici folosesc `print` peste tot. Dacă greșești ceva (de exemplu uiți o ghilimea), Python se oprește și afișează un mesaj de eroare. Se întâmplă tuturor, iar la secțiunea Erori și excepții vezi cum îl citești."
          }
        ]
      },
      {
        "heading": "Tipuri și variabile",
        "blocks": [
          {
            "p": "Linia `n = 42` pune valoarea 42 sub numele `n`. De acum, oriunde scrii `n`, Python folosește 42. Un nume căruia îi dai o valoare ca s-o folosești mai târziu se numește variabilă, iar pasul în care i-o dai, cu `=`, se numește atribuire. Aici `=` nu e egalul din matematică: înseamnă „pune valoarea din dreapta în numele din stânga”."
          },
          {
            "p": "Fiecare valoare are un tip, care spune ce fel de valoare e. Tipurile de bază:"
          },
          {
            "list": [
              "`int`: număr întreg, ca 42, 0 sau -7.",
              "`float`: număr cu zecimale, scris cu punct, nu cu virgulă: 3.14, 0.5.",
              "`str` (de la string, șir de caractere): text, scris între ghilimele, ca `\"Victor\"`.",
              "`bool`: o valoare de adevăr, `True` (adevărat) sau `False` (fals).",
              "`None`: „nimic încă”, valoarea pe care o pui într-o variabilă când nu ai încă ce pune în ea."
            ]
          },
          {
            "p": "În alte limbaje de programare scrii tipul înaintea numelui, adică îl declari. Python nu cere să declari tipul. Îl deduce din valoare, iar tipul poate să se schimbe: după `n = 42` poți scrie `n = \"Ana\"`, și `n` devine text."
          },
          {
            "code": "n = 42            # int\npi = 3.14         # float\nnume = \"Victor\"   # str\ngata = True       # bool\nnimic = None      # absența unei valori\n\nprint(type(n), type(pi))   # <class 'int'> <class 'float'>"
          },
          {
            "p": "`type(...)` e o funcție care îți spune tipul unei valori. Răspunsul arată ciudat, `<class 'int'>`, dar contează doar cuvântul dintre apostrofuri (ce e o clasă afli spre finalul lecției). Când dai lui `print` mai multe argumente despărțite prin virgulă, le afișează pe același rând, cu câte un spațiu între ele."
          },
          {
            "p": "Poți atribui mai multe variabile deodată, fie cu valori diferite, fie cu aceeași valoare tuturor."
          },
          {
            "code": "a, b, c = 1, 2, 3   # a primește 1, b primește 2, c primește 3\nx = y = 0           # și x, și y primesc 0\nprint(a, b, c, x, y)   # 1 2 3 0 0"
          },
          {
            "p": "Adesea vrei să schimbi o variabilă pornind de la valoarea ei, de exemplu să adaugi 5 puncte la un scor de 10. Scrii `scor = scor + 5`: Python calculează întâi partea din dreapta, 10 + 5 = 15, apoi pune rezultatul înapoi în `scor`. Operatorii de atribuire pe scurt (`+=`, `-=`, `*=`, `//=`) modifică valoarea și apoi o pun în variabila respectivă, cu mai puțin de scris. Pe `//` îl vezi puțin mai jos."
          },
          {
            "code": "scor = 10\nscor += 5      # la fel ca scor = scor + 5\nprint(scor)    # 15\nscor *= 2      # la fel ca scor = scor * 2\nprint(scor)    # 30"
          },
          {
            "p": "Pentru text, f-string-ul e felul modern de a insera valori, de exemplu ca să afișezi „scor: 0.87”. Pui un `f` în fața ghilimelelor și scrii expresia între acolade, `{ }`. Expresia poate fi o variabilă sau un calcul. După două puncte (`:`) poți cere un format: `:.2f` înseamnă „număr cu zecimale (`f`), cu două cifre după punct (`.2`)”, rotunjit. La fel, `:.3f` lasă trei zecimale."
          },
          {
            "code": "scor = 0.8734\nprint(f\"scor: {scor:.2f}\")        # scor: 0.87\nprint(f\"dublu: {scor * 2:.3f}\")   # dublu: 1.747"
          },
          {
            "p": "În al doilea rând, Python calculează întâi 0.8734 * 2 = 1.7468, apoi îl rotunjește la trei zecimale: 1.747."
          },
          {
            "p": "Împărțirea are două forme. `/` dă mereu float, chiar și când împărțirea e exactă: `6 / 2` dă 3.0. `//` dă împărțirea întreagă rotunjită în jos, adică de câte ori încape 2 în 7: de 3 ori. Iar `%` dă restul: 7 = 2 · 3 + 1, deci `7 % 2` e 1."
          },
          {
            "p": "`int(...)` trunchiază spre zero, adică taie zecimalele: `int(3.9)` dă 3, iar `int(-3.9)` dă -3. `round(...)` rotunjește la cel mai apropiat întreg, deci `round(3.9)` dă 4. La jumătate, Python merge spre numărul par: `round(2.5)` dă 2, iar `round(3.5)` dă 4. `str(...)`/`float(...)`/`list(...)` convertesc explicit între tipuri, adică transformă o valoare într-un tip ales de tine: `str(42)` e textul `\"42\"`, iar `float(\"2.5\")` e numărul 2.5. Pe `list(...)` îl vezi la liste."
          },
          {
            "code": "print(7 / 2)          # 3.5\nprint(7 // 2)         # 3\nprint(7 % 2)          # 1\nprint(int(3.9))       # 3, trunchiază\nprint(int(-3.9))      # -3, tot spre zero\nprint(round(3.9))     # 4, rotunjește\nprint(str(42) + \"!\")  # 42!"
          },
          {
            "p": "Ultima linie lipește două texte: `+` între două string-uri le pune unul după altul. Un număr și un text nu se pot aduna direct (`42 + \"!\"` dă eroare), de aceea transformi întâi 42 în text, cu `str(42)`."
          }
        ]
      },
      {
        "heading": "Cele patru structuri de date",
        "blocks": [
          {
            "p": "Când ai mai multe valori care țin de același lucru, cum sunt notele din catalog sau scorurile a zece modele, nu faci câte o variabilă pentru fiecare. Le pui pe toate într-o structură de date: o singură variabilă care ține mai multe valori, numite elemente. Aproape tot ce scrii folosește una dintre astea."
          },
          {
            "list": [
              "Lista: ordonată, se poate modifica. `[1, 2, 3]`. Seamănă cu o listă de cumpărături: ordonată înseamnă că fiecare element are un loc al lui (primul, al doilea și tot așa), iar „se poate modifica” înseamnă că poți adăuga, scoate sau schimba elemente.",
              "Tuple: ordonată, nu se poate modifica. `(1, 2)`. Bună pentru valori care merg împreună și nu trebuie să se schimbe, cum sunt coordonatele unui punct.",
              "Dicționar: perechi formate dintr-o cheie și o valoare. `{\"a\": 1}`. Ca un catalog: cheia e numele după care cauți (`\"Ana\"`), valoarea e ce găsești la el (nota 9).",
              "Mulțime: valori unice, fără ordine. `{1, 2, 3}`. Dintr-o listă de orașe cu repetiții, mulțimea păstrează fiecare oraș o singură dată, iar elementele ei nu au poziții."
            ]
          },
          {
            "p": "Lista de mai jos ține scorurile a trei modele, numere între 0 și 1, ca acuratețea din Lecția 2 (0.71 înseamnă 71% răspunsuri corecte)."
          },
          {
            "code": "scoruri = [0.71, 0.83, 0.79]\nscoruri.append(0.88)\nprint(scoruri)                      # [0.71, 0.83, 0.79, 0.88]\nprint(len(scoruri), max(scoruri))   # 4 0.88"
          },
          {
            "p": "`.append(0.88)` adaugă 0.88 la finalul listei. O funcție care ține de o anumită valoare și pe care o apelezi cu un punct după numele valorii, ca `scoruri.append(...)`, se numește metodă. `len` și `max` sunt funcții obișnuite: `len` numără elementele (4), iar `max` îl dă pe cel mai mare (0.88). Pentru cel mai mic există `min`."
          },
          {
            "p": "Pe lângă `.append()`, listele mai au câteva metode pe care le folosești constant: `.insert(poz, val)` bagă la o poziție anume, `.pop(poz)` scoate elementul (fără argument, scoate ultimul), `.remove(val)` scoate prima apariție a unei valori, `.index(val)` îți dă poziția ei. Pozițiile se numără de la 0, deci poziția 0 e începutul listei (mai multe la Indexare și felii)."
          },
          {
            "code": "scoruri = [0.71, 0.83, 0.79]\nscoruri.insert(0, 0.5)       # pune 0.5 pe poziția 0, la început\nprint(scoruri)               # [0.5, 0.71, 0.83, 0.79]\nultimul = scoruri.pop()      # scoate ultimul element și ți-l dă\nprint(ultimul, scoruri)      # 0.79 [0.5, 0.71, 0.83]\nscoruri.remove(0.71)\nprint(scoruri)               # [0.5, 0.83]\nprint(scoruri.index(0.83))   # 1"
          },
          {
            "p": "Într-un dicționar scrii perechile între acolade, sub forma `cheie: valoare`, despărțite prin virgulă. Valoarea de la o cheie o citești cu `d[\"cheie\"]`, unde `d` e numele dicționarului. Dicționarele nu se citesc doar așa: `d[\"cheie\"]` aruncă eroare (oprește programul) dacă cheia lipsește, iar `.get(\"cheie\", implicit)` întoarce în locul ei o valoare implicită, aleasă de tine. Fără al doilea argument, `.get` întoarce `None`. Cu `note[\"Ana\"] = 9` adaugi o pereche nouă, sau schimbi valoarea dacă cheia există deja."
          },
          {
            "code": "note = {\n    \"Radu\": 4,\n    \"Stefan\": 10,\n    \"Victor\": 8\n}\nprint(note[\"Stefan\"])       # 10\nprint(note.get(\"Radu\"))     # 4\nprint(note.get(\"Ana\", 0))   # 0, pentru că \"Ana\" nu e în dicționar\nnote[\"Ana\"] = 9             # adaugă cheia \"Ana\", cu valoarea 9\nprint(note[\"Ana\"])          # 9"
          },
          {
            "p": "Dicționarele pot conține alte dicționare. Le citești din exterior spre interior: `elev[\"note\"]` e dicționarul `{\"ro\": 9, \"en\": 10}`, iar `[\"en\"]` scoate din el nota 10."
          },
          {
            "code": "elev = {\"nume\": \"Ana\", \"note\": {\"ro\": 9, \"en\": 10}}\nprint(elev[\"note\"][\"en\"])   # 10"
          },
          {
            "p": "Mulțimile scot valorile duplicate și fac operații de tip matematic: reuniune, intersecție, diferență, utile când compari două seturi de etichete sau de cuvinte. `set(...)` face o mulțime dintr-o listă. `.add(x)` adaugă un element, iar `.discard(x)` îl scoate, fără eroare dacă nu există. Operațiile se scriu cu semne: `|` e reuniunea (ce e în a sau în b), `&` intersecția (ce e în amândouă), `-` diferența (ce e în a, dar nu în b)."
          },
          {
            "code": "a = set([1, 2, 2, 3, 3, 3])\nprint(a)       # {1, 2, 3}\nb = {3, 4, 5}\n\na.add(10)\na.discard(1)\nprint(a)       # {10, 2, 3}\n\nprint(a | b)   # reuniune: {2, 3, 4, 5, 10}\nprint(a & b)   # intersecție: {3}\nprint(a - b)   # diferență: {10, 2}"
          },
          {
            "p": "`{10, 2, 3}` nu e o greșeală: mulțimea nu ține minte nicio ordine, așa că Python o poate afișa în altă ordine decât te-ai aștepta."
          },
          {
            "p": "O capcană mai puțin evidentă ține de felul în care Python păstrează valorile. Când scrii `a = [1, 2, 3]`, Python construiește lista în memoria calculatorului și îi lipește eticheta `a`. Un lucru concret din memorie, ca lista asta, se numește obiect. `b = a` nu copiază lista, doar îi dă un nume nou aceleiași liste din memorie: sunt două etichete pe aceeași cutie, deci orice schimbi prin `b` se vede și prin `a`. Ca să ai o copie reală, folosește `a.copy()` sau `list(a)`."
          },
          {
            "code": "a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)          # [1, 2, 3, 4], s-a schimbat și a\n\nc = a.copy()\nc.append(5)\nprint(a)          # [1, 2, 3, 4], neschimbat de data asta\nprint(c)          # [1, 2, 3, 4, 5]"
          }
        ]
      },
      {
        "heading": "Indexare și felii",
        "blocks": [
          {
            "p": "Fiecare element dintr-o listă are un număr de poziție, numit index (la plural, indici). Indexarea începe de la zero: în `v = [10, 20, 30, 40, 50]`, `v[0]` e 10, `v[1]` e 20, iar ultimul element, 50, are indexul 4. Indicii negativi numără de la coadă: `v[-1]` e ultimul element, `v[-2]` penultimul."
          },
          {
            "p": "O felie (slice) ia o bucată din listă. Felia `a:b` include începutul și exclude sfârșitul: `v[1:3]` ia indicii 1 și 2, fără 3. Un capăt lăsat gol înseamnă „de la început” sau „până la final”, deci `v[:2]` sunt primele două elemente. Un al treilea număr e pasul: `v[::2]` ia din două în două."
          },
          {
            "code": "v = [10, 20, 30, 40, 50]\n\nprint(v[0])      # 10, primul\nprint(v[-1])     # 50, ultimul\nprint(v[1:3])    # [20, 30], de la 1 până înainte de 3\nprint(v[:2])     # [10, 20]\nprint(v[::2])    # [10, 30, 50], din doi în doi"
          },
          {
            "p": "Regula asta se repetă identic la string-uri, la array-urile NumPy și la coloanele Pandas, pe care le vezi în Lecția 4. O înveți o dată și o folosești peste tot. String-urile au însă o particularitate: sunt imutabile, adică nu se pot modifica după ce le-ai creat, la fel ca tuplele. Nu poți schimba un caracter (o literă, o cifră, un spațiu) pe loc, doar poți construi un string nou."
          },
          {
            "code": "s = \"Vianu\"\nprint(s[0])        # V, indexarea merge\n# s[0] = \"X\"       # eroare: TypeError, string-urile nu se modifică\n\ns2 = \"X\" + s[1:]   # \"X\" lipit de \"ianu\"\nprint(s2)          # Xianu, string nou"
          },
          {
            "p": "Linia care începe cu `#` e un comentariu, deci nu rulează. Dacă ștergi `#`-ul, Python dă eroarea `TypeError`. `s[1:]` e felia de la indexul 1 până la final, adică `\"ianu\"`."
          },
          {
            "p": "Unele caractere nu se pot scrie direct între ghilimele, de exemplu un rând nou. Pentru caractere speciale în string-uri folosești secvențe de escape: un backslash `\\` urmat de un semn care spune ce caracter vrei. `\\n` e o linie nouă, `\\t` un tab (un spațiu lat, ca la tasta Tab), `\\\\` un singur backslash, `\\\"` ghilimele în interiorul unui string cu ghilimele duble."
          },
          {
            "code": "print(\"prima linie\\na doua linie\")   # afișează două rânduri\nprint(\"coloana1\\tcoloana2\")          # un tab între cele două cuvinte"
          }
        ]
      },
      {
        "heading": "Condiții și bucle",
        "blocks": [
          {
            "p": "Până acum, toate liniile au rulat, una după alta. De multe ori vrei ca un bloc de cod să ruleze doar în anumite situații, de exemplu să afișezi „bun” doar dacă scorul trece de 0.8. Pentru asta ai `if` (dacă) și `else` (altfel)."
          },
          {
            "code": "scor = 0.9\nif scor > 0.8:\n    print(\"bun\")\nelse:\n    print(\"slab\")\n# afișează: bun"
          },
          {
            "p": "`if` verifică o condiție, aici `scor > 0.8`. Dacă e adevărată, rulează liniile de sub el. Dacă e falsă, le rulează pe cele de sub `else`. Rândurile cu `if` și cu `else` se termină cu două puncte (`:`). Liniile de sub ele sunt mutate spre dreapta cu patru spații, adică indentate, și formează un bloc: aparțin de `if`-ul sau de `else`-ul de deasupra lor. Blocurile se delimitează prin indentare, nu prin acolade, cum fac alte limbaje. Patru spații, consecvent."
          },
          {
            "p": "Ca să repeți ceva pentru fiecare element dintr-o listă, folosești o buclă `for`. `for s in scoruri:` ia pe rând fiecare element din `scoruri`, îl pune în variabila `s` și rulează blocul de dedesubt. O trecere prin bloc se numește iterație. Și rândul cu `for` se termină cu două puncte. Mai jos, în blocul buclei stă un `if`, deci liniile cu `print` sunt indentate de două ori: o dată pentru `for`, o dată pentru `if`."
          },
          {
            "code": "scoruri = [0.71, 0.83, 0.79]\nfor s in scoruri:\n    if s > 0.8:\n        print(\"bun\", s)\n    else:\n        print(\"slab\", s)\n# afișează:\n# slab 0.71\n# bun 0.83\n# slab 0.79"
          },
          {
            "p": "O condiție e o întrebare cu răspunsul `True` sau `False`. Comparațiile (`==`, `!=`, `<`, `>`, `<=`, `>=`) și operatorii logici (`and`, `or`, `not`) se combină ca să construiești condiții. `==` înseamnă „egal” și are două semne, pentru că `=` simplu e atribuirea. `!=` înseamnă „diferit”, iar `<=` și `>=` sunt „mai mic sau egal” și „mai mare sau egal”. `and` cere ca amândouă condițiile să fie adevărate, `or` se mulțumește cu una, iar `not` inversează: adevărat devine fals. Dacă vii din alt limbaj, Python scrie `and`/`or`/`not` în loc de `&&`/`||`/`!`."
          },
          {
            "code": "scor, incercari = 0.9, 3\nif scor > 0.8 and incercari < 5:\n    print(\"continuă\")\nif not (scor < 0.5 or incercari == 0):\n    print(\"are sens să încerci\")\n# afișează:\n# continuă\n# are sens să încerci"
          },
          {
            "p": "Primul `if` trece, pentru că 0.9 > 0.8 și 3 < 5 sunt amândouă adevărate. La al doilea, paranteza e falsă (nici 0.9 < 0.5, nici 3 == 0 nu e adevărat), iar `not` o face adevărată. Aici nu există `else`: e opțional, iar fără el, când condiția e falsă, blocul pur și simplu nu rulează."
          },
          {
            "note": "`0`, `0.0`, `\"\"`, `[]`, `{}`, `set()` și `None` sunt toate „false” când le pui într-un `if`, deși nu sunt `False`: Python tratează ca falsă orice valoare zero sau goală. O listă goală e falsă, una cu elemente e adevărată, deci `if scoruri:` rulează blocul doar dacă lista are măcar un element."
          },
          {
            "p": "O capcană clasică pentru cine vine din alt limbaj: `==` compară valorile („au aceeași valoare?”), `is` compară dacă sunt exact același obiect în memorie („e chiar aceeași cutie?”, ca la `b = a` de mai sus). Două liste construite separat pot avea aceleași valori și totuși să fie obiecte diferite. Pentru `None`, folosești mereu `is`, niciodată `==`: există un singur `None`, deci întrebi direct dacă variabila e chiar el."
          },
          {
            "code": "x = None\nif x is None:       # corect\n    print(\"gol\")    # se afișează\n\na = [1, 2]\nb = [1, 2]\nprint(a == b)   # True, aceleași valori\nprint(a is b)   # False, obiecte diferite"
          },
          {
            "p": "Pentru un `if` scurt care doar alege între două valori, expresia condițională (ternary) încape pe o linie. Se citește aproape ca în română: `eticheta` primește `\"bun\"` dacă scorul trece de 0.8, altfel primește `\"slab\"`."
          },
          {
            "code": "scor = 0.9\neticheta = \"bun\" if scor > 0.8 else \"slab\"\nprint(eticheta)   # bun"
          },
          {
            "p": "Când ai nevoie și de poziție, folosește `enumerate`. Când parcurgi două liste odată, `zip`. `enumerate(scoruri)` îți dă la fiecare iterație o pereche, poziția și elementul, așa că după `for` scrii două variabile: `i` primește poziția, `s` elementul. `zip` merge pe două liste în paralel, ca un fermoar: primul element cu primul, al doilea cu al doilea."
          },
          {
            "code": "scoruri = [0.71, 0.83, 0.79]\nfor i, s in enumerate(scoruri):\n    print(i, s)\n# afișează:\n# 0 0.71\n# 1 0.83\n# 2 0.79\n\nfor nume, scor in zip([\"a\", \"b\"], [0.7, 0.9]):\n    print(nume, scor)\n# afișează:\n# a 0.7\n# b 0.9"
          },
          {
            "p": "Pe lângă `for`, ai `while`, cât timp o condiție rămâne adevărată. `while` verifică condiția înainte de fiecare iterație și se oprește când devine falsă. `break` iese din buclă, `continue` sare peste iterația curentă și trece direct la următoarea. În exemplu, `i` e indexul elementului verificat: pornește de la 0 și crește cu 1 la fiecare pas, cât timp e mai mic decât `len(scoruri)`."
          },
          {
            "code": "scoruri = [0.71, 0.42, 0.83, 0.97, 0.79]\ni = 0\nwhile i < len(scoruri):\n    if scoruri[i] < 0.5:\n        i += 1\n        continue\n    if scoruri[i] > 0.95:\n        break\n    print(scoruri[i])\n    i += 1\n# afișează:\n# 0.71\n# 0.83"
          },
          {
            "p": "Pas cu pas: 0.71 se afișează. 0.42 e sub 0.5, așa că `continue` trece la următorul element fără să-l afișeze. 0.83 se afișează. La 0.97, `break` oprește bucla de tot, deci 0.79 nu mai e verificat deloc. `i += 1` dinainte de `continue` contează: fără el, `i` ar rămâne pe loc și bucla s-ar învârti la nesfârșit. Dacă ți se întâmplă, oprești celula cu butonul ■ din bara de sus a notebook-ului."
          },
          {
            "p": "Sortarea se face cu `sorted()` sau `.sort()`, iar `key` îți spune după ce sortezi. `sorted(lista)` îți dă o listă nouă, sortată, și o lasă pe cea veche neschimbată. `lista.sort()` sortează chiar lista, pe loc, fără să facă una nouă."
          },
          {
            "code": "print(sorted([3, 1, 2]))   # [1, 2, 3]\n\nelevi = [(\"Ana\", 9.2), (\"Bogdan\", 8.7), (\"Cris\", 9.5)]\nelevi.sort(key=lambda x: x[1], reverse=True)\nprint(elevi)   # [('Cris', 9.5), ('Ana', 9.2), ('Bogdan', 8.7)]"
          },
          {
            "p": "Fiecare elev e un tuple (nume, notă). `key=lambda x: x[1]` îi spune lui `sort` să compare elevii după `x[1]`, elementul de pe poziția 1, adică nota. `lambda x: x[1]` e o funcție scurtă, scrisă pe un rând, care primește un elev `x` și întoarce nota lui; o explicăm la Funcții. `reverse=True` inversează ordinea, ca notele mari să vină primele. Argumentele scrise cu nume, ca `key=...` sau `reverse=True`, se numesc argumente numite. Python afișează textele cu apostrofuri (`'Cris'`), dar e același lucru ca `\"Cris\"`."
          }
        ]
      },
      {
        "heading": "Comprehensions (liste construite pe un rând)",
        "blocks": [
          {
            "p": "Un mod scurt de a construi o structură dintr-alta. Apare des în codul de concurs, așa că merită citit fluent chiar dacă la început scrii bucle obișnuite. Exemplul de mai jos face aceeași listă de pătrate în ambele feluri. `range(5)` îți dă pe rând numerele 0, 1, 2, 3, 4: de la 0 până la 5, fără 5, ca la felii."
          },
          {
            "code": "# cu o buclă obișnuită\npatrate = []\nfor x in range(5):\n    patrate.append(x * x)\nprint(patrate)   # [0, 1, 4, 9, 16]\n\n# la fel, cu o list comprehension\npatrate = [x * x for x in range(5)]\nprint(patrate)   # [0, 1, 4, 9, 16]\n\nscoruri = [0.71, 0.83, 0.79, 0.88]\nbune = [s for s in scoruri if s > 0.8]\nprint(bune)      # [0.83, 0.88], doar cele peste 0.8"
          },
          {
            "p": "Se citește așa: „ia fiecare x din range, păstrează-l dacă trece condiția (`if`, când există), pune x*x în listă”. Merge la fel pentru dicționare și mulțimi. `range(n)` nu creează efectiv o listă de n numere, generează valorile pe rând: ține minte doar unde a ajuns și calculează următorul număr abia când îi e cerut. Deci `range(10_000_000)` nu ocupă memorie pentru zece milioane de numere. Liniuțele jos din `10_000_000` doar te ajută să numeri cifrele, ca spațiile din 10 000 000. O listă cu zece milioane de numere ar ocupa câteva sute de MB, pe când `range` ocupă aproape nimic."
          },
          {
            "code": "lungimi = {c: len(c) for c in [\"rf\", \"xgboost\"]}\nprint(lungimi)      # {'rf': 2, 'xgboost': 7}\nunice_lung = {len(c) for c in [\"rf\", \"svm\", \"cnn\"]}\nprint(unice_lung)   # {2, 3}"
          },
          {
            "p": "Prima linie face un dicționar, cu `cheie: valoare` între acolade, iar a treia o mulțime, doar cu valoarea. `len` numără și caracterele unui string: `len(\"rf\")` e 2. `rf`, `xgboost`, `svm` și `cnn` sunt nume scurte de modele, pe care le înveți mai târziu. În mulțime, 3 apare o singură dată, deși `\"svm\"` și `\"cnn\"` au amândouă trei litere."
          },
          {
            "p": "O expresie generator arată la fel ca o list comprehension, dar cu paranteze rotunde. Nu construiește toată structura în memorie dintr-o dată, ci produce valorile pe rând, ceea ce contează pe sume sau bucle mari. `sum(...)` adună toate valorile primite, iar parantezele lui `sum` țin loc și de parantezele generatorului."
          },
          {
            "code": "suma = sum(x * x for x in range(1_000_000))\nprint(suma)   # 333332833333500000"
          }
        ]
      },
      {
        "heading": "Funcții",
        "blocks": [
          {
            "p": "O funcție grupează cod pe care îl repeți. Ai folosit deja funcții gata făcute, ca `print`, `len` sau `max`. Acum îți scrii una: îi dai un nume o dată, apoi o apelezi ori de câte ori ai nevoie."
          },
          {
            "code": "def dublu(x):\n    return x * 2\n\nprint(dublu(5))    # 10\nprint(dublu(21))   # 42"
          },
          {
            "p": "`def` (de la define, „a defini”) începe definiția: numele funcției, apoi, între paranteze, parametrii, adică numele sub care funcția primește valori. Aici e unul singur, `x`. Corpul funcției e blocul indentat de dedesubt, iar `return` trimite rezultatul înapoi celui care a apelat funcția. La `dublu(5)`, Python pune argumentul 5 în `x`, calculează 5 * 2 și îți dă înapoi 10, pe care `print` îl afișează. Definiția singură nu afișează nimic: funcția rulează abia când o apelezi."
          },
          {
            "p": "Argumentele pot avea valori implicite, iar cele implicite se pun întotdeauna la final, după celelalte. O valoare implicită se scrie în `def`, cu `=`, și e folosită când nu dai argumentul respectiv la apel. Funcția de mai jos aduce numerele unei liste între `minim` și `maxim`, implicit între 0 și 1, ceva ce vei face des începând cu Lecția 5."
          },
          {
            "code": "def normalizeaza(v, minim=0.0, maxim=1.0):\n    lo, hi = min(v), max(v)\n    if hi == lo:\n        return [minim] * len(v)\n    return [minim + (x - lo) / (hi - lo) * (maxim - minim) for x in v]\n\nprint(normalizeaza([2, 4, 6]))             # [0.0, 0.5, 1.0]\nprint(normalizeaza([2, 4, 6], maxim=10))   # [0.0, 5.0, 10.0]"
          },
          {
            "p": "Pas cu pas, pentru `[2, 4, 6]`: `lo` e 2 (cel mai mic) și `hi` e 6 (cel mai mare), deci `hi - lo` e 4. Pentru fiecare `x`, formula calculează `(x - lo) / (hi - lo)`: pentru 2 iese 0 / 4 = 0.0, pentru 4 iese 2 / 4 = 0.5, pentru 6 iese 4 / 4 = 1.0. Cu `minim` 0 și `maxim` 1, rezultatul e chiar fracția, iar în al doilea apel `maxim=10` o înmulțește cu 10. `if`-ul evită împărțirea la zero când toate numerele sunt egale: atunci `return` întoarce `[minim] * len(v)`, adică `minim` repetat de `len(v)` ori, și oprește funcția pe loc."
          },
          {
            "p": "Despachetarea îți lasă să atribui mai multe valori odată. Când o funcție scrie `return min(v), max(v)`, întoarce un tuple cu două valori, iar `mic, mare = ...` îl despachetează: prima valoare ajunge în `mic`, a doua în `mare`. O vei vedea constant la împărțirea datelor."
          },
          {
            "code": "a, b = 1, 2\n\ndef min_si_max(v):\n    return min(v), max(v)\n\nmic, mare = min_si_max([4, 1, 7])\nprint(mic, mare)   # 1 7\n\n# în Lecția 6: X_tr, X_val, y_tr, y_val = train_test_split(X, y)"
          },
          {
            "p": "În Lecția 6, `train_test_split` împarte datele în patru bucăți, pe care le primești dintr-odată în patru variabile. `X` sunt trăsăturile (coloanele de intrare), `y` e ținta, ca în Lecția 2, iar `tr` și `val` vin de la antrenare și validare."
          },
          {
            "p": "Valorile implicite au o capcană. Funcția de mai jos ar trebui să pornească de fiecare dată de la o listă goală:"
          },
          {
            "code": "def adauga(x, lista=[]):\n    lista.append(x)\n    return lista\n\nprint(adauga(1))   # [1]\nprint(adauga(2))   # [1, 2], nu [2]"
          },
          {
            "note": "Nu pune niciodată o listă sau un dicționar ca valoare implicită a unui argument. Se creează o singură dată, la definirea funcției, și rămâne comună între apeluri: de aceea al doilea apel a găsit în listă 1-ul pus de primul. Folosește `None` și creează valoarea înăuntru: `def adauga(x, lista=None):`, iar în corp `if lista is None: lista = []`."
          },
          {
            "p": "O variabilă creată într-o funcție există doar acolo, e locală: dispare când funcția se termină. Variabilele create în afara oricărei funcții se numesc globale. Funcția vede variabilele globale, dar nu le poate modifica fără cuvântul cheie `global` (un cuvânt cu sens special în Python, ca `if` sau `def`). Nevoia de `global` e de obicei semn că funcția ar trebui rescrisă să primească și să întoarcă valori, nu să atingă starea din afară."
          },
          {
            "code": "contor = 0\n\ndef increment_gresit():\n    contor = contor + 1   # eroare la apel, vezi mai jos\n\ndef increment():\n    global contor\n    contor += 1   # merge, dar evită tiparul ăsta când poți\n\nincrement()\nincrement()\nprint(contor)   # 2"
          },
          {
            "p": "Dacă apelezi `increment_gresit()`, primești `UnboundLocalError`. Pentru că funcția atribuie ceva lui `contor`, Python îl consideră o variabilă locală nouă, iar la `contor + 1` aceasta nu are încă nicio valoare. Pe `global` îl folosești rar, când chiar vrei ca o funcție să schimbe ceva din afara ei, ca un contor al apelurilor."
          },
          {
            "p": "Uneori nu știi dinainte câte argumente primești. `*args` adună argumentele poziționale într-un tuple, `**kwargs` pe cele numite într-un dicționar. Poziționale sunt cele date doar prin valoare, în ordine, ca 0.8 și 0.9 de mai jos, iar numite sunt cele date cu nume, ca `model=\"rf\"`. Contează steluțele: `args` și `kwargs` sunt doar numele obișnuite, iar mai jos le-am zis `scoruri` și `info`. Așa e făcut și `print`, care primește oricâte valori."
          },
          {
            "code": "def raport(*scoruri, **info):\n    print(\"scoruri:\", scoruri)\n    print(\"info:\", info)\n\nraport(0.8, 0.9, model=\"rf\", seed=42)\n# afișează:\n# scoruri: (0.8, 0.9)\n# info: {'model': 'rf', 'seed': 42}"
          },
          {
            "p": "O `lambda` e o funcție mică, fără nume, scrisă pe o linie. O vezi des ca argument pentru `sorted`, `map` sau `filter`. `lambda x: x * 2` face exact ce face `dublu` de mai sus: primește `x` și întoarce `x * 2`, fără `def` și fără `return`. O folosești când îți trebuie o funcție mică o singură dată, ca argument pentru alta, cum ai văzut la `sort(key=...)`."
          },
          {
            "code": "dublu = lambda x: x * 2\nprint(dublu(5))     # 10\n\nscoruri = [0.71, 0.83, 0.79, 0.88]\nprint(list(map(lambda x: x * x, [1, 2, 3])))      # [1, 4, 9]\nprint(list(filter(lambda x: x > 0.8, scoruri)))   # [0.83, 0.88]"
          },
          {
            "p": "`map(f, lista)` aplică funcția `f` pe fiecare element. `filter(f, lista)` păstrează doar elementele pentru care `f` dă `True`. Amândouă dau rezultatele pe rând, ca `range`, așa că le pui în `list(...)` ca să vezi toată lista."
          },
          {
            "p": "În practică, o comprehension face de multe ori treaba mai clar decât `map`/`filter`: `[x * x for x in [1, 2, 3]]` dă tot `[1, 4, 9]`. Le folosești mai ales când funcția vine deja definită de altundeva."
          },
          {
            "p": "O funcție se poate apela pe ea însăși, recursiv. Rar necesar în codul de zi cu zi de AI, dar util să-l recunoști: are mereu un caz de bază care oprește recursivitatea. Exemplul calculează factorialul: factorialul lui 5 e 5 · 4 · 3 · 2 · 1 = 120, adică 5 înmulțit cu factorialul lui 4."
          },
          {
            "code": "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))   # 120"
          },
          {
            "p": "`factorial(5)` cere `5 * factorial(4)`, care cere `4 * factorial(3)`, și tot așa până la `factorial(1)`. Acolo e cazul de bază: `n <= 1` întoarce direct 1, fără alt apel. Apoi înmulțirile se fac la întoarcere: 1, 2, 6, 24, 120. Fără cazul de bază, funcția s-ar apela la nesfârșit. Îl recunoști la algoritmii de căutare din Lecția 11, ca backtracking-ul, care se scriu natural recursiv."
          },
          {
            "p": "O funcție cu `yield` în loc de `return` e un generator: nu întoarce toate valorile dintr-o dată, ci una pe rând. La fiecare `yield`, funcția dă o valoare buclei `for` și se oprește în loc. Când bucla cere următoarea valoare, funcția continuă de unde a rămas. Îl folosești când ai multe valori și nu vrei să le ții pe toate în memorie deodată, ca la `range`."
          },
          {
            "code": "def numere_pare(pana_la):\n    for n in range(pana_la):\n        if n % 2 == 0:   # restul la 2 e 0, deci n e par\n            yield n\n\nfor n in numere_pare(10):\n    print(n)\n# afișează 0, 2, 4, 6, 8, fiecare pe rândul lui"
          }
        ]
      },
      {
        "heading": "Clase și module",
        "blocks": [
          {
            "p": "O clasă ține date și funcții la un loc. N-o să scrii multe, dar toate bibliotecile pe care le folosești sunt construite din clase, deci trebuie să înțelegi ce se întâmplă când scrii `model.fit(X, y)`. Așa antrenezi un model în lecțiile următoare: `fit` îl pune să învețe din trăsăturile `X` și răspunsurile `y`, iar `model.predict(...)` îi cere apoi predicții pentru date noi."
          },
          {
            "p": "Aici, clasă înseamnă o construcție din Python, nu o categorie de la clasificare. O clasă e un șablon, ca formularul gol de înscriere la olimpiadă. Un obiect e un lucru făcut după șablon, ca un formular completat: are aceleași câmpuri, dar cu datele lui. Din aceeași clasă poți face oricâte obiecte. Ai mai întâlnit asta: `int` și `list` sunt clase, de aceea `type(n)` afișa `<class 'int'>`, iar fiecare listă pe care o creezi e un obiect al clasei `list`."
          },
          {
            "code": "class Medie:\n    def __init__(self):\n        self.valoare = None\n\n    def fit(self, y):\n        self.valoare = sum(y) / len(y)\n        return self\n\n    def predict(self, n):\n        return [self.valoare] * n\n\nm = Medie().fit([1, 2, 3])\nprint(m.predict(2))    # [2.0, 2.0]"
          },
          {
            "list": [
              "`class Medie:` începe șablonul. Tot ce e indentat sub el ține de clasă.",
              "O metodă e o funcție scrisă în interiorul clasei, ca `fit` și `predict`. O apelezi cu punct, `m.predict(2)`, la fel ca `.append` la liste.",
              "`self` e obiectul însuși. Fiecare metodă îl primește primul, dar nu-l scrii tu la apel: la `m.predict(2)`, Python pune singur `m` în `self` și 2 în `n`.",
              "Un atribut e o variabilă păstrată în interiorul obiectului, scrisă cu `self.` în față, ca `self.valoare`. Rămâne acolo între apeluri, așa că `predict` vede ce a calculat `fit`.",
              "`__init__` rulează singur când creezi obiectul cu `Medie()` și îl pregătește: aici pornește atributul `valoare` cu `None`. Numele cu două liniuțe jos de fiecare parte sunt nume speciale, pe care Python le apelează singur."
            ]
          },
          {
            "p": "Pas cu pas: `Medie()` creează obiectul și rulează `__init__`. `.fit([1, 2, 3])` calculează media, (1 + 2 + 3) / 3 = 2.0, și o păstrează în `self.valoare`. `return self` dă înapoi chiar obiectul, de aceea poți scrie `Medie().fit(...)` pe un rând și pui rezultatul în `m`. `m.predict(2)` întoarce `[self.valoare] * 2`, media repetată de două ori, câte o predicție pentru fiecare dintre două rânduri noi."
          },
          {
            "p": "Asta e exact tiparul din scikit-learn: `fit` învață și reține, `predict` folosește ce a învățat. `Medie` e cel mai simplu model posibil: învață o singură valoare și o prezice pentru orice rând nou."
          },
          {
            "p": "O clasă poate moșteni dintr-alta, cu `class Copil(Parinte):`, și `super()` apelează varianta din clasa de bază. Moștenirea înseamnă că noua clasă (copilul) primește tot ce are clasa de bază (părintele), atribute și metode, și adaugă sau schimbă doar ce e diferit. Vei vedea tiparul ăsta constant mai târziu, la rețele neuronale în PyTorch (Lecția 14), unde orice model e o clasă care moștenește din `nn.Module`."
          },
          {
            "code": "class Model:\n    def __init__(self, nume):\n        self.nume = nume\n\n    def descrie(self):\n        return f\"model {self.nume}\"\n\nclass ModelCuSeed(Model):\n    def __init__(self, nume, seed):\n        super().__init__(nume)\n        self.seed = seed\n\n    def descrie(self):\n        return f\"{super().descrie()}, seed {self.seed}\"\n\nprint(ModelCuSeed(\"rf\", 42).descrie())   # model rf, seed 42"
          },
          {
            "p": "`ModelCuSeed(\"rf\", 42)` rulează `__init__`-ul copilului. Acolo, `super().__init__(nume)` rulează întâi `__init__`-ul părintelui, care pune `self.nume = \"rf\"`, apoi copilul adaugă `self.seed = 42`. Seed-ul e un număr de pornire pentru valorile la întâmplare, îl vezi la finalul lecției. Copilul își scrie și propria `descrie`, care o înlocuiește pe a părintelui, dar o folosește prin `super().descrie()`: ia textul `\"model rf\"` și îi adaugă `\", seed 42\"`."
          },
          {
            "p": "Codul altcuiva se aduce cu `import`. Un modul e un fișier cu cod Python gata scris, funcții și clase, pe care îl aduci în programul tău. Python vine cu multe module incluse: `math` are funcții de matematică, iar `collections` are structuri de date în plus. Bibliotecile din Lecția 1, ca NumPy sau Pandas, sunt făcute tot din module, doar că pe ele le instalezi cu pip."
          },
          {
            "code": "import math\nfrom collections import Counter\n\nprint(math.sqrt(16))               # 4.0\nprint(Counter([\"a\", \"b\", \"a\"]))    # Counter({'a': 2, 'b': 1})"
          },
          {
            "p": "`import math` aduce tot modulul, iar funcțiile lui le apelezi cu numele modulului în față: `math.sqrt(16)` e radical din 16. `from collections import Counter` aduce doar `Counter`, pe care îl folosești fără prefix. `Counter` numără de câte ori apare fiecare valoare: `'a'` de două ori, `'b'` o dată."
          }
        ]
      },
      {
        "heading": "Erori și excepții",
        "blocks": [
          {
            "p": "Codul care citește fișiere, parsează date (transformă text în valori, de exemplu `\"12\"` în numărul 12) sau primește date scrise de un om dă erori, garantat. Python le numește excepții, și le prinzi cu `try`/`except` ca să nu-ți pice tot programul pentru o singură linie proastă."
          },
          {
            "code": "def imparte(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        print(\"nu poți împărți la zero\")\n        return None\n\nprint(imparte(10, 2))   # 5.0\nprint(imparte(10, 0))   # nu poți împărți la zero, apoi None"
          },
          {
            "p": "`try` (încearcă) rulează blocul de sub el. Dacă apare o eroare de tipul scris la `except`, aici `ZeroDivisionError` (împărțire la zero), Python nu oprește programul: sare în blocul de sub `except` și continuă de acolo."
          },
          {
            "p": "Cele mai dese excepții la concurs: `ValueError` (o conversie eșuată, gen `int(\"abc\")`), `KeyError` (o cheie care nu există într-un dicționar), `IndexError` (un indice în afara listei), `FileNotFoundError` (o cale greșită la date, adică fișierul nu e unde i-ai spus lui Python să-l caute). O eroare pe care n-o prinzi cu `try` oprește celula și afișează un mesaj ca acesta:"
          },
          {
            "code": "note = {\"Ana\": 9}\nprint(note[\"Radu\"])\n\n# sub celulă apare:\n# ---------------------------------------------------------------------------\n# KeyError                                  Traceback (most recent call last)\n# Cell In[1], line 2\n#       1 note = {\"Ana\": 9}\n# ----> 2 print(note[\"Radu\"])\n#\n# KeyError: 'Radu'"
          },
          {
            "p": "Când apare una, citește mesajul de jos în sus: ultima linie îți spune tipul erorii și motivul, iar mai sus săgeata arată linia de cod care a picat. Aici, `KeyError: 'Radu'` înseamnă că dicționarul nu are cheia `'Radu'`, iar `---->` arată linia 2 din celulă. Când eroarea apare în interiorul unei funcții, mesajul are mai multe bucăți ca asta, una sub alta, iar cea de jos arată locul exact unde a apărut."
          },
          {
            "note": "Nu prinde excepții cu `except:` gol, fără niciun tip după el. Ascunde orice greșeală, inclusiv pe cele pe care ar trebui să le vezi. Prinde exact tipul pe care îl aștepți, de exemplu `except ValueError:`."
          },
          {
            "p": "`finally` rulează mereu, cu sau fără excepție, bun pentru curățenie, de exemplu ca să închizi ceva deschis sau să anunți că s-a terminat o etapă. `assert` verifică rapid o presupunere și oprește programul cu un mesaj clar dacă nu e adevărată, util să prinzi bug-uri (greșeli în cod) devreme, nu la finalul rulării."
          },
          {
            "code": "try:\n    n = int(\"abc\")\nexcept ValueError:\n    print(\"nu e un număr\")\nfinally:\n    print(\"verificare terminată\")   # rulează oricum\n\nX = [[1, 2], [3, 4], [5, 6]]   # trei rânduri de date\ny = [0, 1]                     # doar două răspunsuri\nassert len(X) == len(y), \"X și y trebuie să aibă aceeași lungime\"\n# AssertionError: X și y trebuie să aibă aceeași lungime"
          },
          {
            "p": "`X` și `y` sunt numele obișnuite pentru trăsături (aici o listă de rânduri, fiecare rând fiind o listă de două numere) și pentru țintă (câte un răspuns pe rând). Lipsește un răspuns, așa că `assert` oprește celula cu mesajul tău. Cu trei valori în `y`, linia ar trece fără să afișeze nimic."
          }
        ]
      },
      {
        "heading": "Text și expresii regulate",
        "blocks": [
          {
            "p": "Multe probleme, mai ales la NLP (prelucrarea textului scris de oameni, în Lecția 12), cer curățat text înainte să faci orice altceva. String-urile au metode gata făcute pentru asta."
          },
          {
            "code": "s = \"  Al Doilea RĂZBOI Mondial  \"\nprint(s.strip())          # scoate spațiile de la capete\nprint(s.lower())          # litere mici\nprint(s.split())          # ['Al', 'Doilea', 'RĂZBOI', 'Mondial']\nprint(\"-\".join([\"a\", \"b\", \"c\"]))       # a-b-c\nprint(s.replace(\"RĂZBOI\", \"razboi\"))   # Al Doilea razboi Mondial"
          },
          {
            "p": "`.split()` taie textul la spații și îți dă lista cuvintelor. `\"-\".join(lista)` face invers: lipește elementele unei liste de string-uri, cu `\"-\"` între ele. `.replace(vechi, nou)` înlocuiește peste tot textul `vechi` cu `nou`. Niciuna nu schimbă `s`, pentru că string-urile sunt imutabile: fiecare îți dă un string nou."
          },
          {
            "p": "Pentru tipare mai complicate decât `.replace()`, modulul `re` face potriviri după expresii regulate. O expresie regulată (regex) e un tipar care descrie ce fel de text cauți, de exemplu „un șir de cifre”, în loc de un text exact."
          },
          {
            "code": "import re\n\ntext = \"contact: ana@exemplu.ro sau 0722 123 456\"\nemailuri = re.findall(r\"[\\w.]+@[\\w.]+\", text)\nprint(emailuri)    # ['ana@exemplu.ro']\n\ncuratat = re.sub(r\"\\d+\", \"\", text)   # scoate toate cifrele\nprint(curatat)     # contact: ana@exemplu.ro sau"
          },
          {
            "list": [
              "`r\"...\"`: un string brut (raw), în care Python lasă backslash-ul `\\` neschimbat, ca să ajungă așa la `re`. Tiparele le scrii mereu așa.",
              "`\\d`: o cifră, de la 0 la 9.",
              "`\\w`: o literă, o cifră sau `_`, adică un caracter care poate face parte dintr-un cuvânt.",
              "`+`: „unul sau mai multe” din ce e imediat în stânga, deci `\\d+` e un șir de cifre lipite, ca `0722`.",
              "`[...]`: oricare dintre caracterele din paranteze, deci `[\\w.]` e o literă, o cifră, `_` sau un punct."
            ]
          },
          {
            "p": "Pus cap la cap, `[\\w.]+@[\\w.]+` înseamnă „litere, cifre sau puncte, apoi @, apoi iar litere, cifre sau puncte”, adică forma unei adrese de email. `re.findall(tipar, text)` îți dă lista tuturor potrivirilor, iar `re.sub(tipar, nou, text)` le înlocuiește cu `nou`, aici cu nimic."
          },
          {
            "note": "`re` merită învățat treptat, nu dintr-o dată. La început ține minte doar `findall` (găsește toate potrivirile) și `sub` (înlocuiește), și cauți restul când ai nevoie de el."
          }
        ]
      },
      {
        "heading": "Fișiere și formate de date",
        "blocks": [
          {
            "p": "Citirea și scrierea unui fișier text se fac cu `with`, care îl închide singur chiar dacă apare o eroare. Contează, pentru că ce scrii ajunge sigur în fișier abia când îl închizi."
          },
          {
            "code": "with open(\"note.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"prima linie\\n\")\n\nwith open(\"note.txt\", encoding=\"utf-8\") as f:\n    for linie in f:\n        print(linie.strip())   # prima linie"
          },
          {
            "p": "`open(\"note.txt\", \"w\", ...)` deschide fișierul pentru scriere: `\"w\"` (de la write) îl creează dacă nu există și îi șterge tot conținutul dacă există. `as f` îi dă fișierului deschis numele `f`, iar `f.write(...)` scrie text în el; `\\n` încheie rândul. Fără al doilea argument, `open` deschide fișierul doar pentru citire. `for linie in f` îl parcurge rând cu rând, iar `.strip()` scoate `\\n`-ul de la capătul fiecărui rând. Fișierul apare în același folder cu notebook-ul."
          },
          {
            "p": "Pune întotdeauna `encoding=\"utf-8\"`. Fără el, pe Windows, diacriticele se citesc greșit. Encoding-ul e regula după care literele sunt salvate ca numere în fișier, iar UTF-8 e regula standard, care cunoaște și diacriticele."
          },
          {
            "p": "Datele de concurs vin rar ca text simplu. De obicei sunt CSV sau JSON, și Python are module standard pentru amândouă, chiar înainte să ajungi la Pandas. Un fișier CSV e un tabel scris ca text: primul rând are numele coloanelor, iar fiecare rând următor e un rând din tabel, cu valorile despărțite prin virgule. Codul de mai jos scrie întâi un CSV de trei rânduri, ca să ai ce citi."
          },
          {
            "code": "import csv\n\nwith open(\"scoruri.csv\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"nume,scor\\n\")\n    f.write(\"Ana,0.91\\n\")\n    f.write(\"Bogdan,0.78\\n\")\n\nwith open(\"scoruri.csv\", encoding=\"utf-8\") as f:\n    cititor = csv.DictReader(f)\n    for rand in cititor:\n        print(rand[\"nume\"], rand[\"scor\"])\n# afișează:\n# Ana 0.91\n# Bogdan 0.78"
          },
          {
            "p": "`csv.DictReader` citește fiecare rând ca un dicționar: numele coloanei e cheia, iar ce scrie în tabel e valoarea. Valorile citite sunt text: `rand[\"scor\"]` e `\"0.91\"`, deci ca să calculezi cu el scrii `float(rand[\"scor\"])`."
          },
          {
            "p": "JSON e un format de text care arată aproape la fel ca un dicționar din Python. Codul de mai jos salvează dicționarul `date` în `rezultat.json`, unde apare ca textul `{\"model\": \"rf\", \"scor\": 0.87}`, apoi îl citește înapoi. `json.dump(date, f)` scrie, iar `json.load(f)` citește și îți dă din nou un dicționar."
          },
          {
            "code": "import json\n\ndate = {\"model\": \"rf\", \"scor\": 0.87}\nwith open(\"rezultat.json\", \"w\", encoding=\"utf-8\") as f:\n    json.dump(date, f)\n\nwith open(\"rezultat.json\", encoding=\"utf-8\") as f:\n    incarcat = json.load(f)\nprint(incarcat[\"scor\"])   # 0.87"
          },
          {
            "p": "Pentru căi de fișiere, `pathlib` e mai clar decât să lipești string-uri cu `+`. Calea unui fișier e adresa lui pe calculator: folderele în care stă, apoi numele lui, deci `date/train.csv` e fișierul `train.csv` din folderul `date`. Cu `Path`, semnul `/` nu împarte: lipește un folder de un nume de fișier, cu separatorul potrivit sistemului, `/` pe macOS și Linux, `\\` pe Windows."
          },
          {
            "code": "from pathlib import Path\n\nfolder = Path(\"date\")\nfisier = folder / \"train.csv\"\nprint(fisier)            # date/train.csv (pe Windows, date\\train.csv)\nprint(fisier.exists())   # False, dacă n-ai un folder date cu train.csv"
          }
        ]
      },
      {
        "heading": "Random și reproductibilitate",
        "blocks": [
          {
            "p": "Multe lucruri în AI par întâmplătoare: împărțirea datelor, inițializarea unui model (numerele de la care pornește, înainte să învețe), amestecarea setului de antrenare. Modulul `random` controlează asta, iar `seed`-ul face rezultatele repetabile."
          },
          {
            "p": "Calculatorul nu dă cu zarul de-adevăratelea. Numerele „la întâmplare” vin de la un generator de numere aleatoare, o formulă care pornește de la un număr de start și calculează din el un șir care doar pare întâmplător. Numărul de start e seed-ul (în engleză, „sămânță”). Același seed dă de fiecare dată exact același șir de numere."
          },
          {
            "code": "import random\n\nrandom.seed(42)\nprint(random.random())        # 0.6394267984578837, mereu la fel cu seed 42\nprint(random.randint(1, 10))  # 1\nscoruri = [0.71, 0.83, 0.79, 0.88]\nrandom.shuffle(scoruri)       # amestecă lista pe loc\nprint(scoruri)                # [0.83, 0.88, 0.71, 0.79]"
          },
          {
            "p": "`random.random()` dă un număr cu zecimale între 0 și 1. `random.randint(1, 10)` dă un întreg de la 1 la 10, cu tot cu 10, spre deosebire de `range`. `random.shuffle(lista)` amestecă lista pe loc, adică schimbă chiar lista, fără să facă alta nouă. Rulează celula de mai multe ori: datorită lui `random.seed(42)`, vezi de fiecare dată aceleași rezultate. 42 e doar un obicei, orice număr merge."
          },
          {
            "note": "Pune `random.seed(...)` la începutul scriptului (al programului sau al notebook-ului), o singură dată. Fără el, rulezi codul de două ori și iei rezultate diferite, ceea ce face imposibil să compari corect două idei: nu mai știi dacă scorul a crescut datorită ideii sau din noroc."
          },
          {
            "p": "`random.seed` controlează doar modulul `random`. NumPy (Lecția 4) are generatorul lui, pe care îl fixezi cu `np.random.seed(42)`, iar funcțiile și modelele din scikit-learn primesc `random_state=42`, cum o să vezi la împărțirea datelor, în Lecția 6."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Kaggle Learn: Python",
        "url": "https://www.kaggle.com/learn/python"
      }
    ]
  },
  {
    "moduleCode": "S4",
    "duration": "~2 săptămâni",
    "intro": "NumPy e biblioteca pentru calcul numeric în Python, adică pentru socoteli pe multe numere deodată, ca suma sau media unui milion de valori. Lucrează cu array-uri (un array seamănă cu o listă de numere, dar toate au același tip) și face operațiile mult mai rapid decât o buclă obișnuită. Pandas e construit peste NumPy și adaugă etichete, adică nume pentru coloane și rânduri. Un tabel Pandas arată ca o foaie de Excel: fiecare coloană are un nume, iar fiecare rând are un index, o etichetă care implicit e numărul rândului (0, 1, 2...). Le folosești pe amândouă în aproape orice problemă din concurs, indiferent de model.",
    "sections": [
      {
        "heading": "Instalare",
        "blocks": [
          {
            "p": "Ambele sunt biblioteci externe, nu vin cu Python: sunt cod scris de alții, pe care pip îl descarcă pentru tine (Lecția 1). Le instalezi o singură dată, în mediul virtual al proiectului (cutia separată pentru bibliotecile lui, din Lecția 1), împreună cu Matplotlib, Seaborn și Pillow. Matplotlib și Seaborn desenează grafice, iar Pillow deschide imagini."
          },
          {
            "code": "pip install numpy\npip install pandas\npip install matplotlib seaborn pillow",
            "caption": "Rulează comenzile astea în terminal, în folderul proiectului, cu mediul virtual activat."
          }
        ]
      },
      {
        "heading": "De ce nu ajunge Python simplu",
        "blocks": [
          {
            "p": "În Python obișnuit, o listă de un milion de numere pe care vrei s-o aduni element cu element se face cu o buclă for. Merge, dar e lent. Într-o listă, fiecare element poate fi orice (un număr, un text, altă listă), așa că la fiecare pas Python verifică întâi ce tip are elementul și abia apoi face adunarea. Când ai date reale, asta devine insuportabil."
          },
          {
            "p": "NumPy rezolvă problema cu o structură nouă: ndarray (de la „n-dimensional array”, un array cu oricâte dimensiuni), o grilă de numere de același tip, cu formă fixă. Grila poate fi un șir de numere, un tabel cu rânduri și coloane sau ceva cu mai multe dimensiuni. Formă fixă înseamnă că, spre deosebire de o listă, nu-i poți adăuga elemente cu `.append()`."
          },
          {
            "p": "Pentru că toate numerele au același tip, NumPy nu mai verifică nimic la fiecare pas. Operațiile se aplică pe tot array-ul deodată, fără buclă în Python: bucla o face NumPy, în cod compilat scris în C, care merge mult mai repede. Un array cu o singură dimensiune se mai numește vector, iar ideea asta, să scrii operația pe tot vectorul în loc de o buclă, se numește vectorizare. E de zeci de ori mai rapidă."
          },
          {
            "code": "import numpy as np\n\n# lent, în Python pur\ntotal = 0\nfor x in range(1_000_000):\n    total += x * x\nprint(total)   # 333332833333500000\n\n# rapid, vectorizat\nv = np.arange(1_000_000)\ntotal = (v * v).sum()\nprint(total)   # 333332833333500000, același rezultat",
            "caption": "Aceeași sumă, dar a doua variantă e mult mai rapidă."
          },
          {
            "p": "`import numpy as np` aduce biblioteca sub un nume scurt, `np`, pe care îl scrii apoi în fața fiecărei funcții din ea. `np.arange(1_000_000)` face un array cu numerele de la 0 la 999999, ca `range`. `v * v` înmulțește fiecare număr cu el însuși, iar `.sum()` le adună pe toate: pe un array mic, `[0 1 2 3]`, ai avea `[0 1 4 9]` și suma 14."
          }
        ]
      },
      {
        "heading": "Creezi și transformi array-uri",
        "blocks": [
          {
            "p": "`np.array()` transformă o listă Python într-un ndarray. `np.zeros(n)` și `np.ones(n)` fac un array plin cu 0 sau 1, util când vrei un loc gol de completat. Dacă în loc de `n` le dai o formă, ca în `np.ones((2, 3))`, primești o matrice, adică un tabel de numere, aici cu 2 rânduri și 3 coloane. Parantezele duble nu sunt o greșeală: `(2, 3)` e un tuple (Lecția 3) care descrie forma."
          },
          {
            "p": "`np.arange(start, stop, pas)` merge ca `range`, dar întoarce un array, iar `stop` nu e inclus. `np.linspace(start, stop, n)` împarte un interval în n valori egal distanțate, cu ambele capete incluse, util pentru grafice."
          },
          {
            "code": "a = np.array([1, 2, 3])        # [1 2 3]\nzerouri = np.zeros(5)          # [0. 0. 0. 0. 0.]\nunu = np.ones((2, 3))          # matrice 2x3 plină cu 1:\n                               # [[1. 1. 1.]\n                               #  [1. 1. 1.]]\npasi = np.arange(0, 10, 2)     # [0 2 4 6 8], fără 10\nliniar = np.linspace(0, 1, 5)  # [0.   0.25 0.5  0.75 1.  ]"
          },
          {
            "p": "În comentarii vezi ce afișează `print` pentru fiecare linie. NumPy scrie array-urile fără virgule, cu spații între numere, iar `0.` înseamnă 0.0, un număr cu zecimale. Jupyter afișează singur doar ultima linie dintr-o celulă, și puțin altfel, de exemplu `array([0., 0., 0., 0., 0.])` sau `np.int64(2)`, dar cu aceleași valori. Ca să le vezi pe toate, pune-le în `print`."
          },
          {
            "p": "Fiecare array are un singur `dtype`, tipul tuturor elementelor (`int64`, `float64` etc.). `int64` înseamnă numere întregi, ca `int` din Lecția 3, iar `float64` numere cu zecimale, ca `float`. Partea cu 64 spune câtă memorie ocupă fiecare valoare (64 de biți) și deocamdată nu contează. Amestecarea unui întreg cu un float în același array îl convertește pe tot la float."
          },
          {
            "code": "a.dtype                    # int64\nnp.array([1, 2.5])         # [1.  2.5], acum și 1 e float\nnp.array([1, 2.5]).dtype   # float64"
          },
          {
            "p": "`reshape` schimbă forma unui array fără să-i schimbe conținutul, cât timp numărul total de elemente rămâne același. Forma spune câte elemente are array-ul pe fiecare direcție. `np.arange(6)` are forma `(6,)`: o singură dimensiune, cu 6 numere (virgula arată că e un tuple cu un singur element). `reshape(2, 3)` le așază pe 2 rânduri a câte 3, rând cu rând. Merge pentru că 2 × 3 = 6, pe când `reshape(4, 2)` ar da eroare, fiindcă 4 × 2 = 8. `flatten()` face inversul, îl aduce la o singură dimensiune."
          },
          {
            "code": "v = np.arange(6)       # [0 1 2 3 4 5], forma (6,)\nm = v.reshape(2, 3)    # forma (2, 3):\n                       # [[0 1 2]\n                       #  [3 4 5]]\nm.flatten()            # înapoi la [0 1 2 3 4 5]"
          },
          {
            "note": "O felie dintr-un array (`v[1:4]`) e o vedere (view), nu o copie. La o listă, felia e o listă nouă; la NumPy, e doar o fereastră spre aceleași numere din memorie, ca `b = a` din Lecția 3. Așa NumPy nu copiază milioane de numere la fiecare felie, dar modificarea feliei modifică și originalul. Dacă vrei o copie independentă, cere-o explicit cu `.copy()`."
          },
          {
            "code": "v = np.array([1, 2, 3, 4])\nfelie = v[1:3]        # [2 3]\nfelie[0] = 99\nprint(v)              # [ 1 99  3  4], s-a schimbat și originalul\n\ncopie = v[1:3].copy()\ncopie[0] = -1\nprint(v)              # [ 1 99  3  4], neschimbat de data asta"
          }
        ]
      },
      {
        "heading": "ndarray: formă, axe, indexare",
        "blocks": [
          {
            "p": "Un ndarray are o formă (shape): câte rânduri, câte coloane, câte dimensiuni. Un șir de numere are o singură dimensiune (1D), un tabel are două (2D): rânduri și coloane. Un array 2D îl creezi dintr-o listă de liste, în care fiecare listă din interior devine un rând, ca `x` de mai jos."
          },
          {
            "p": "O imagine alb-negru e o matrice 2D, una color e 3D (înălțime, lățime, canale): fiecare pixel, adică fiecare punct din imagine, are trei numere, pentru roșu, verde și albastru. Prima ta grijă la orice bug e să tipărești forma și să verifici că e ce credeai."
          },
          {
            "p": "Axele sunt direcțiile pe care operezi. Pe `x` de mai jos, cu 2 rânduri și 3 coloane: cu `axis=0` cobori pe fiecare coloană și combini rândurile între ele, deci primești câte un rezultat pe coloană (3 valori). Cu `axis=1` mergi de-a lungul fiecărui rând și primești câte un rezultat pe rând (2 valori). Ca să nu le încurci: axa pe care o dai dispare din formă, deci (2, 3) devine (3,) cu `axis=0` și (2,) cu `axis=1`. Confuzia dintre axe e printre cele mai frecvente greșeli de început."
          },
          {
            "code": "x = np.array([[1, 2, 3],\n              [4, 5, 6]])\n\nx.shape          # (2, 3): 2 rânduri, 3 coloane\nx.mean(axis=0)   # media pe fiecare coloană: [2.5 3.5 4.5]\nx.mean(axis=1)   # media pe fiecare rând: [2. 5.]"
          },
          {
            "p": "Prima coloană are 1 și 4, deci media ei e (1 + 4) / 2 = 2.5. Primul rând are 1, 2 și 3, deci media lui e 6 / 3 = 2. Fără `axis`, `x.mean()` face media tuturor celor 6 numere: 3.5."
          },
          {
            "p": "La un array cu mai multe dimensiuni, indexarea și felierea se scriu cu o virgulă între dimensiuni, în loc de paranteze separate: unde la o listă de liste ai scrie `x[0][1]`, la NumPy scrii `x[0, 1]`, întâi rândul, apoi coloana. Un `:` singur e o felie fără capete, adică „tot”, așa că `x[:, 0]` înseamnă toate rândurile, coloana 0."
          },
          {
            "code": "x[0, 1]      # 2, rândul 0, coloana 1\nx[:, 0]      # [1 4], toate rândurile, coloana 0\nx[0, :]      # [1 2 3], tot rândul 0"
          },
          {
            "p": "Indexarea cu mască booleană e o unealtă pe care o folosești zilnic: construiești un array de True/False și selectezi doar elementele unde e True. Așa filtrezi date fără buclă. Numele vine de la `bool`, tipul cu True și False din Lecția 3. O comparație ca `x > 3` se face pe fiecare element și dă un array de aceeași formă, plin cu True și False: asta e masca."
          },
          {
            "code": "x > 3            # [[False False False]\n                 #  [ True  True  True]]\nx[x > 3]         # doar elementele mai mari ca 3 -> [4 5 6]\nx[x > 3] = 0     # și le poți și schimba pe loc\nprint(x)         # [[1 2 3]\n                 #  [0 0 0]]"
          }
        ]
      },
      {
        "heading": "Broadcasting: cum potrivește NumPy forme diferite",
        "blocks": [
          {
            "p": "Când aduni un număr la un array, NumPy îl adună la fiecare element."
          },
          {
            "code": "np.array([1, 2, 3]) + 10   # [11 12 13]"
          },
          {
            "p": "E ca și cum 10 ar fi fost întins într-un array `[10 10 10]`, de aceeași formă cu celălalt. Un singur număr, care nu e array, se numește scalar. Broadcasting e regula prin care NumPy face operații între array-uri de forme diferite, întinzând automat pe cel mic ca să se potrivească. Jumătate din erorile de început vin din forme care nu se potrivesc cum credeai."
          },
          {
            "p": "Regula: NumPy compară formele de la dreapta la stânga. Două dimensiuni se potrivesc dacă sunt egale sau dacă una e 1 (aia se întinde). Un scalar se potrivește cu orice."
          },
          {
            "p": "Mai jos, `X` are forma (2, 3), iar mediile coloanelor au forma (3,). De la dreapta, 3 cu 3 se potrivesc. Mediilor le lipsește prima dimensiune, așa că NumPy o tratează ca 1 și le întinde pe 2 rânduri: scade același rând de medii din fiecare rând al lui `X`."
          },
          {
            "code": "X = np.array([[1, 2, 3],\n              [4, 5, 6]])      # forma (2, 3)\nmedii = X.mean(axis=0)         # forma (3,): [2.5 3.5 4.5]\nX_centrat = X - medii          # (2,3) - (3,) se potrivește, scade pe coloane\nprint(X_centrat)               # [[-1.5 -1.5 -1.5]\n                               #  [ 1.5  1.5  1.5]]",
            "caption": "Centrarea unei matrice pe medii, fără nicio buclă."
          },
          {
            "p": "Centrarea înseamnă să scazi din fiecare coloană media ei, ca fiecare coloană să aibă media 0. Prima coloană, cu 1 și 4 și media 2.5, devine -1.5 și 1.5. Pasul ăsta apare des când pregătești datele pentru un model, și îl revezi în Lecția 5, la scalare."
          },
          {
            "p": "În schimb, `X - X.mean(axis=1)` dă eroare: mediile pe rânduri au forma (2,), iar de la dreapta, 3 și 2 nu sunt egale și niciuna nu e 1. Dacă faci din ele o coloană, cu `reshape(2, 1)`, forma devine (2, 1) și se potrivește, pentru că 1 se întinde peste cele 3 coloane."
          },
          {
            "note": "Când o operație dă eroare de shape, tipărește formele celor doi operanzi (cele două array-uri din operație) și aplică regula de la dreapta la stânga. De 9 din 10 ori vezi imediat unde nu se potrivesc."
          }
        ]
      },
      {
        "heading": "Sortare, căutare și seturi în NumPy",
        "blocks": [
          {
            "p": "`np.sort()` sortează un array fără să-l schimbe pe loc: întoarce un array nou, sortat. `np.argsort()` întoarce indicii care ar sorta array-ul, adică pozițiile elementelor, de la cel mai mic la cel mai mare. E util când vrei să sortezi un array după valorile altuia."
          },
          {
            "code": "v = np.array([3, 1, 2])\nnp.sort(v)          # [1 2 3]\nnp.argsort(v)       # [1 2 0], indicii în ordine crescătoare\n\nnume = np.array([\"Ana\", \"Bogdan\", \"Cris\"])\nnume[np.argsort(v)]  # ['Bogdan' 'Cris' 'Ana']"
          },
          {
            "p": "`[1 2 0]` se citește așa: cel mai mic element e `v[1]`, adică 1, următorul e `v[2]`, adică 2, iar cel mai mare e `v[0]`, adică 3. Un array de indici pus între paranteze drepte ia elementele de pe pozițiile alea, în ordinea dată, așa că `nume[np.argsort(v)]` așază numele în ordinea crescătoare a valorilor din `v`."
          },
          {
            "p": "`np.where(condiție, atunci, altfel)` alege între două valori element cu element, mai flexibil decât o mască simplă. Pe `v`, condiția `v > 1` dă `[True False True]`: unde e True, `np.where` ia valoarea din `v`, iar unde e False pune 0. O mască, `v[v > 1]`, ar păstra doar `[3 2]`, pe când aici rămân toate cele 3 poziții. `argmax`/`argmin` dau poziția celui mai mare, respectiv mic element."
          },
          {
            "code": "np.where(v > 1, v, 0)   # [3 0 2], păstrează ce e peste 1, restul devine 0\nv.argmax()               # 0, poziția lui 3\nv.argmin()               # 1, poziția lui 1"
          },
          {
            "p": "`np.unique()` întoarce valorile distincte dintr-un array, sortate: fiecare valoare o singură dată, ca la mulțimile din Lecția 3. `np.concatenate()` lipește mai multe array-uri într-unul singur: îi dai o listă cu bucățile, iar el le pune una după alta."
          },
          {
            "code": "np.unique([1, 2, 2, 3, 1])      # [1 2 3]\nnp.concatenate([[1, 2], [3, 4]]) # [1 2 3 4]"
          }
        ]
      },
      {
        "heading": "Pandas: date cu etichete",
        "blocks": [
          {
            "p": "Datele reale au nume: coloana vârstă, coloana scor, coloana clasă (în exemplele de aici, clasa de la școală, ca 9A). Pandas adaugă etichete peste NumPy, în două structuri: Series (o singură coloană, cu index) și DataFrame (un tabel întreg, mai multe coloane). DataFrame e structura în care ajung mai toate seturile de date de concurs. Indexul e eticheta fiecărui rând, iar dacă nu-l dai tu, Pandas numerotează rândurile 0, 1, 2..."
          },
          {
            "code": "import pandas as pd\n\ns = pd.Series([10, 20, 30], index=[\"a\", \"b\", \"c\"])\nprint(s[\"b\"])     # 20\nprint(s)\n# a    10\n# b    20\n# c    30\n# dtype: int64\n\ndf = pd.DataFrame({\"nume\": [\"Ana\", \"Bogdan\"], \"scor\": [9.2, 8.7]})\nprint(df)\n#      nume  scor\n# 0     Ana   9.2\n# 1  Bogdan   8.7"
          },
          {
            "p": "La un Series tipărit vezi indexul în stânga, valorile în dreapta și, pe ultima linie, tipul valorilor. La `df`, fiecare cheie din dicționar devine numele unei coloane, iar lista ei, valorile de pe coloană. Indexul nu l-ai dat, așa că Pandas a pus 0 și 1."
          },
          {
            "p": "Un DataFrame e practic un dicționar de Series, câte una pentru fiecare coloană: `df[\"scor\"]` îți dă coloana scor, ca Series, la fel cum `d[\"cheie\"]` îți dă o valoare dintr-un dicționar. Un fișier CSV (fișierul text cu valori despărțite prin virgule, din Lecția 3) îl citești cu o singură linie, apoi te uiți la el înainte de orice: primele rânduri, tipurile coloanelor, câte valori lipsesc."
          },
          {
            "code": "import pandas as pd\n\ndf = pd.read_csv(\"date.csv\")\n\ndf.head()        # primele 5 rânduri\ndf.info()        # tipuri și câte valori non-nule\ndf.describe()    # statistici pe coloanele numerice"
          },
          {
            "p": "`head()` îți arată primele 5 rânduri (`head(10)` arată 10). `info()` scrie câte rânduri are tabelul și, pentru fiecare coloană, numele, câte valori non-nule are și tipul. Non-nule înseamnă valori care nu lipsesc: dacă o coloană are mai puține decât numărul de rânduri, are goluri. Coloanele cu numere apar ca `int64` sau `float64`, iar cele cu text ca `str` (în versiunile mai vechi de Pandas, `object`)."
          },
          {
            "p": "`describe()` calculează opt statistici pentru fiecare coloană numerică. Iată-le pe notele 9, 7, 10, 6 și 8."
          },
          {
            "code": "note = pd.DataFrame({\"scor\": [9, 7, 10, 6, 8]})\nprint(note.describe())\n#             scor\n# count   5.000000\n# mean    8.000000\n# std     1.581139\n# min     6.000000\n# 25%     7.000000\n# 50%     8.000000\n# 75%     9.000000\n# max    10.000000"
          },
          {
            "p": "`count` e câte valori sunt, `mean` e media, iar `min` și `max` sunt cea mai mică și cea mai mare valoare. `std` e deviația standard, care măsoară cât de împrăștiate sunt valorile în jurul mediei: 0 dacă sunt toate egale, mai mare cu cât se depărtează de ea. `25%`, `50%` și `75%` sunt cuartilele. Sortate, notele sunt 6, 7, 8, 9, 10: la `50%` e valoarea din mijloc, 8, numită mediană, iar 7 și 9 sunt la un sfert și la trei sferturi din drum. Le reiei pe toate în Lecția 5."
          }
        ]
      },
      {
        "heading": "Selecție: loc vs iloc",
        "blocks": [
          {
            "p": "Sunt două feluri de a selecta dintr-un DataFrame, și amestecarea lor e o greșeală clasică. loc selectează după etichetă (numele coloanei, valoarea indexului). iloc selectează după poziție (al câtelea rând, a câta coloană, numărând de la 0)."
          },
          {
            "p": "Pe un tabel abia creat, cu indexul 0, 1, 2, cele două găsesc aceleași rânduri. Diferența se vede când etichetele nu mai sunt în ordine, de exemplu după o sortare. `sort_values(\"scor\", ascending=False)` așază rândurile de la scorul cel mai mare la cel mai mic, iar fiecare rând își ia eticheta cu el."
          },
          {
            "code": "elevi = pd.DataFrame({\"nume\": [\"Ana\", \"Bogdan\", \"Cris\"],\n                      \"scor\": [7.5, 9.2, 8.7]})\ndf = elevi.sort_values(\"scor\", ascending=False)\nprint(df)\n#      nume  scor\n# 1  Bogdan   9.2\n# 2    Cris   8.7\n# 0     Ana   7.5\n\ndf.loc[0, \"scor\"]         # 7.5, rândul cu eticheta 0 (Ana)\ndf.iloc[0, 1]             # 9.2, primul rând (Bogdan), coloana 1\ndf.loc[df[\"scor\"] > 8]    # toate rândurile cu scor peste 8"
          },
          {
            "p": "`df.loc[0, \"scor\"]` caută rândul cu eticheta 0, adică Ana, chiar dacă acum e ultima. `df.iloc[0, 1]` ia primul rând din tabel, oricare ar fi el, și a doua coloană (pozițiile încep de la 0). Ultima linie folosește o mască booleană, ca la NumPy: `df[\"scor\"] > 8` dă True sau False pentru fiecare rând, iar `loc` păstrează rândurile cu True, aici Bogdan și Cris."
          }
        ]
      },
      {
        "heading": "Valori lipsă și curățare",
        "blocks": [
          {
            "p": "Datele reale au aproape mereu goluri, valori duplicate sau tipuri greșite, și un model antrenat pe date murdare dă predicții proaste. `isna()` marchează unde lipsește o valoare, `dropna()` scoate rândurile cu goluri, `fillna(valoare)` le completează."
          },
          {
            "p": "Pandas marchează o valoare lipsă cu `NaN` (de la „Not a Number”, adică „nu e un număr”). O celulă goală dintr-un CSV devine `NaN` când îl citești, iar în cod o scrii `np.nan`."
          },
          {
            "code": "df = pd.DataFrame({\"nume\": [\"Ana\", \"Bogdan\", \"Cris\"],\n                   \"scor\": [9.0, np.nan, 7.0]})\n\ndf.isna().sum()          # câte valori lipsesc pe fiecare coloană\n                         # nume 0, scor 1\ndf_complet = df.dropna()  # scoate rândurile cu orice gol: rămân Ana și Cris\n# completează golurile cu media\ndf[\"scor\"] = df[\"scor\"].fillna(df[\"scor\"].mean())\nprint(df)\n#      nume  scor\n# 0     Ana   9.0\n# 1  Bogdan   8.0\n# 2    Cris   7.0"
          },
          {
            "p": "`isna()` dă un tabel de aceeași formă, cu True unde lipsește o valoare. `.sum()` adună pe fiecare coloană, iar True contează ca 1 și False ca 0, deci iese numărul de goluri. `mean()` sare peste `NaN`, așa că media e (9 + 7) / 2 = 8, iar Bogdan primește 8.0."
          },
          {
            "p": "`dropna` și `fillna` nu schimbă datele pe loc, ci întorc o copie nouă, așa că trebuie s-o pui într-o variabilă. Fără `=`, linia nu are niciun efect."
          },
          {
            "note": "Alege între `dropna` și `fillna` în funcție de câte rânduri ai și de ce înseamnă lipsa: dacă lipsesc puține valori, le poți arunca; dacă lipsesc multe, arunci prea multe date bune odată cu ele."
          },
          {
            "p": "`duplicated()` marchează rândurile identice cu unul de mai devreme, `drop_duplicates()` le scoate. Mai jos, Ana apare de două ori cu exact aceleași valori: `duplicated()` dă False la prima apariție și True la a doua, iar `drop_duplicates()` o păstrează doar pe prima."
          },
          {
            "p": "`astype()` schimbă tipul unei coloane, de exemplu dintr-un text într-un număr: textul `\"9.5\"` devine numărul 9.5. `pd.to_datetime` face din texte ca `\"2026-10-01\"` date calendaristice, cu care Pandas știe să socotească, de exemplu câte zile sunt între două date."
          },
          {
            "code": "df = pd.DataFrame({\"nume\": [\"Ana\", \"Ana\", \"Bogdan\"],\n                   \"scor\": [\"9.5\", \"9.5\", \"8\"],\n                   \"data\": [\"2026-10-01\", \"2026-10-01\", \"2026-10-03\"]})\n\ndf.duplicated().sum()          # câte rânduri sunt duplicate: 1\ndf = df.drop_duplicates()\n\ndf[\"scor\"] = df[\"scor\"].astype(float)\ndf[\"data\"] = pd.to_datetime(df[\"data\"])   # text -> dată calendaristică"
          }
        ]
      },
      {
        "heading": "groupby, merge, pivot: cele pe care le folosești mereu",
        "blocks": [
          {
            "p": "groupby împarte datele pe grupuri și calculează ceva pe fiecare grup: media pe clasă, suma pe categorie. Exemplul de mai jos are șase elevi din două clase de la școală, 9A și 9B."
          },
          {
            "code": "df = pd.DataFrame({\n    \"nume\": [\"Ana\", \"Bogdan\", \"Cris\", \"Dan\", \"Elena\", \"Filip\"],\n    \"clasa\": [\"9A\", \"9A\", \"9A\", \"9B\", \"9B\", \"9B\"],\n    \"scor\": [9.0, 10.0, 8.0, 5.0, 9.0, 7.0],\n})\n\ndf.groupby(\"clasa\")[\"scor\"].mean()      # media scorului pe fiecare clasă\n# clasa\n# 9A    9.0\n# 9B    7.0\n# Name: scor, dtype: float64\ndf.groupby(\"clasa\").size()             # câte rânduri are fiecare clasă\n# 3 rânduri la 9A, 3 la 9B"
          },
          {
            "p": "`groupby(\"clasa\")` pune la un loc rândurile cu aceeași clasă, `[\"scor\"]` alege coloana, iar `.mean()` face media în fiecare grup: la 9A, (9 + 10 + 8) / 3 = 9. Rezultatul e un Series cu clasele pe post de index, iar `Name: scor` e numele lui, luat de la coloană."
          },
          {
            "p": "Cu `agg` calculezi mai multe statistici deodată, iar `transform` întoarce rezultatul pe fiecare rând, ca să-l poți pune înapoi în tabel ca o coloană nouă."
          },
          {
            "code": "df.groupby(\"clasa\")[\"scor\"].agg([\"mean\", \"std\", \"count\"])\n#        mean  std  count\n# clasa\n# 9A      9.0  1.0      3\n# 9B      7.0  2.0      3\n\ndf[\"media_clasei\"] = df.groupby(\"clasa\")[\"scor\"].transform(\"mean\")\nprint(df)\n#      nume clasa  scor  media_clasei\n# 0     Ana    9A   9.0           9.0\n# 1  Bogdan    9A  10.0           9.0\n# 2    Cris    9A   8.0           9.0\n# 3     Dan    9B   5.0           7.0\n# 4   Elena    9B   9.0           7.0\n# 5   Filip    9B   7.0           7.0"
          },
          {
            "p": "`agg` primește lista cu numele statisticilor și dă câte un rând pe grup, deci 2 rânduri. `std` e deviația standard de la `describe()`: notele din 9B (5, 7, 9) sunt mai împrăștiate decât cele din 9A (8, 9, 10), așa că ea iese mai mare. `transform` dă câte o valoare pentru fiecare rând din tabelul inițial, deci 6: fiecare elev primește media clasei lui, și de asta rezultatul încape direct într-o coloană nouă."
          },
          {
            "p": "merge lipește două tabele după o coloană comună. Mai jos, un tabel are elevii, altul notele, iar coloana `id`, numărul fiecărui elev, le leagă."
          },
          {
            "code": "df = pd.DataFrame({\"id\": [1, 2, 3],\n                   \"nume\": [\"Ana\", \"Bogdan\", \"Cris\"]})\nalt_tabel = pd.DataFrame({\"id\": [1, 3, 4],\n                          \"scor\": [9.0, 7.5, 8.0]})\n\ndf.merge(alt_tabel, on=\"id\", how=\"left\")\n#    id    nume  scor\n# 0   1     Ana   9.0\n# 1   2  Bogdan   NaN\n# 2   3    Cris   7.5\ndf.merge(alt_tabel, on=\"id\", how=\"inner\")\n#    id  nume  scor\n# 0   1   Ana   9.0\n# 1   3  Cris   7.5"
          },
          {
            "p": "`on=\"id\"` spune după ce coloană potrivești rândurile. how spune ce faci cu rândurile fără pereche: left păstrează tot din stânga, inner doar potrivirile. Aici Bogdan (id 2) n-are notă, iar nota cu id 4 n-are elev. Cu `how=\"left\"`, Bogdan rămâne, cu `NaN` la scor; cu `how=\"inner\"`, rămân doar Ana și Cris. Nota cu id 4 dispare în ambele cazuri, pentru că nu are pereche în tabelul din stânga, `df`."
          },
          {
            "p": "Când tabelele au aceleași coloane și vrei doar să le pui unul sub altul, folosești `pd.concat()` în loc de merge."
          },
          {
            "code": "df1 = pd.DataFrame({\"nume\": [\"Ana\", \"Bogdan\"], \"scor\": [9.0, 8.5]})\ndf2 = pd.DataFrame({\"nume\": [\"Cris\"], \"scor\": [7.5]})\n\npd.concat([df1, df2])   # pune df2 sub df1, aceleași coloane\n#      nume  scor\n# 0     Ana   9.0\n# 1  Bogdan   8.5\n# 0    Cris   7.5"
          },
          {
            "p": "`concat` nu potrivește nimic: coloanele rămân aceleași și se adună doar rândurile, 2 + 1 = 3, deci tabelul crește în jos, nu în lateral ca la merge. Fiecare rând își păstrează eticheta, așa că indexul are acum 0 de două ori; `pd.concat([df1, df2], ignore_index=True)` renumerotează rândurile 0, 1, 2."
          },
          {
            "p": "pivot_table rearanjează un tabel lung într-unul lat, cu o coloană devenită antet: valorile ei, aici anii, devin numele coloanelor noi. Tabelul lung de mai jos are câte un rând pentru fiecare scor, cu clasa și anul lui. Cel lat are câte un rând pe clasă și câte o coloană pe an. E util la rapoarte și la văzut tipare pe două dimensiuni deodată."
          },
          {
            "code": "df = pd.DataFrame({\n    \"clasa\": [\"9A\", \"9A\", \"9A\", \"9B\", \"9B\", \"9B\"],\n    \"an\": [2025, 2025, 2026, 2025, 2026, 2026],\n    \"scor\": [8.0, 9.0, 10.0, 6.0, 7.0, 8.0],\n})\n\n# media scorului pe clasă (rânduri) și an (coloane)\ndf.pivot_table(index=\"clasa\", columns=\"an\",\n               values=\"scor\", aggfunc=\"mean\")\n# an     2025  2026\n# clasa\n# 9A      8.5  10.0\n# 9B      6.0   7.5"
          },
          {
            "p": "`index` dă rândurile tabelului nou, `columns` coloanele, `values` ce pui în căsuțe, iar `aggfunc` cum combini valorile care ajung în aceeași căsuță. La 9A în 2025 sunt două scoruri, 8 și 9, deci căsuța primește media lor, 8.5."
          }
        ]
      },
      {
        "heading": "Alte operații frecvente",
        "blocks": [
          {
            "p": "`sort_values()` sortează un DataFrame după o coloană, iar `ascending=False` înseamnă descrescător, de la mare la mic. `value_counts()` numără de câte ori apare fiecare valoare distinctă: pe tabelul cu elevi, câți elevi are fiecare clasă. Pe coloana țintă (target), cea pe care o prezici (Lecția 2), e prima verificare când vrei să vezi dacă clasele sunt dezechilibrate. Acolo clasele sunt valorile posibile ale țintei, ca spam și normal, iar dezechilibrate înseamnă că una apare mult mai rar, ca 5 emailuri spam la 95 normale."
          },
          {
            "code": "df.sort_values(\"scor\", ascending=False)\ndf[\"clasa\"].value_counts()   # câte rânduri are fiecare clasă"
          },
          {
            "p": "Adaugi o coloană nouă direct prin atribuire, ștergi una cu `drop`. `apply()` rulează o funcție pe fiecare valoare dintr-o coloană, util când transformarea nu are deja o metodă gata făcută."
          },
          {
            "code": "df[\"scor_procent\"] = df[\"scor\"] * 10\ndf = df.drop(columns=[\"coloana_inutila\"])\ndf[\"eticheta\"] = df[\"scor\"].apply(lambda s: \"bun\" if s > 8 else \"slab\")"
          },
          {
            "p": "Prima linie lucrează pe toată coloana deodată, ca la NumPy: un scor de 9.2 devine 92.0. `drop(columns=[...])` primește lista coloanelor de scos și, ca `dropna`, întoarce un tabel nou. În `apply`, funcția e o lambda (funcția scurtă, fără nume, din Lecția 3): primește pe rând fiecare scor `s` și întoarce `\"bun\"` dacă e peste 8, altfel `\"slab\"`."
          },
          {
            "p": "`corr()` calculează corelația dintre coloanele numerice, un prim pas rapid ca să vezi ce coloane par legate de ținta pe care vrei s-o prezici. Corelația e un număr între -1 și 1: aproape de 1 când două coloane cresc împreună (orele de învățat și nota, de exemplu), aproape de -1 când una crește și cealaltă scade, aproape de 0 când nu par legate. Lecția 5 intră în detalii."
          },
          {
            "code": "df.corr(numeric_only=True)"
          },
          {
            "p": "Rezultatul e un tabel cu câte un rând și o coloană pentru fiecare coloană numerică, iar la intersecția lor e corelația. Pe diagonală e mereu 1, pentru că fiecare coloană e perfect corelată cu ea însăși. `numeric_only=True` sare peste coloanele cu text."
          },
          {
            "p": "La final, scrii rezultatul înapoi pe disc cu `to_csv`, exact formatul pe care îl încarci la submisie (fișierul cu predicțiile tale, din Lecția 2). `index=False` îi spune să nu scrie și indexul: fără el, fișierul ar avea în față o coloană în plus, cu 0, 1, 2..., pe care platforma nu o așteaptă."
          },
          {
            "code": "df.to_csv(\"rezultat.csv\", index=False)"
          }
        ]
      },
      {
        "heading": "Grafice: Matplotlib și Seaborn",
        "blocks": [
          {
            "p": "Un grafic îți arată în câteva secunde ce într-un tabel n-ai observa: o distribuție strâmbă, o valoare imposibilă, două coloane care cresc împreună. Distribuția unei coloane e felul în care se împart valorile ei, care apar des și care rar. Strâmbă înseamnă că majoritatea valorilor stau într-o parte, iar câteva se întind departe în cealaltă, cum sunt de obicei prețurile. Matplotlib e biblioteca de bază, iar Seaborn e construit peste ea și face graficele statistice dintr-o singură linie. Codul de mai jos e un tipar: `df` e tabelul tău, iar numele coloanelor le înlocuiești cu ale tale."
          },
          {
            "code": "import matplotlib.pyplot as plt\nimport seaborn as sns\n\n# linie: cum se schimbă o valoare în timp\nplt.plot(df[\"zi\"], df[\"temperatura\"])\nplt.show()\n\n# bare: câte rânduri are fiecare categorie\ndf[\"oras\"].value_counts().plot(kind=\"bar\")\nplt.show()\n\n# histogramă: distribuția unei coloane\nplt.hist(df[\"varsta\"], bins=30)\nplt.show()\n\n# scatter: legătura dintre două coloane\nplt.scatter(df[\"suprafata\"], df[\"pret\"])\nplt.show()"
          },
          {
            "list": [
              "Linia unește punctele în ordine, aici temperatura din fiecare zi: vezi dacă valoarea urcă, coboară sau are salturi.",
              "Barele arată câte rânduri are fiecare categorie: `value_counts()` numără orașele, iar `.plot(kind=\"bar\")` desenează câte o bară pentru fiecare. Vezi pe loc dacă o categorie domină.",
              "Histograma împarte valorile coloanei în intervale (`bins=30` înseamnă 30 de intervale) și ridică pe fiecare interval o bară, cu atât mai înaltă cu cât intră mai multe valori în el. Așa vezi distribuția: unde se adună valorile, dacă e strâmbă, dacă are valori imposibile.",
              "Scatter-ul desenează fiecare rând ca un punct, cu suprafața pe orizontală și prețul pe verticală. Dacă punctele urcă spre dreapta, cele două coloane cresc împreună."
            ]
          },
          {
            "p": "Seaborn adaugă box plotul, bun ca să vezi outlierii, și heatmap-ul, bun pentru matricea de corelații. Outlierii sunt valori ieșite din tipar, mult mai mari sau mai mici decât restul coloanei. Box plotul desenează câte o cutie pentru fiecare grup, aici pentru fiecare clasă (`x=\"clasa\"`), din valorile coloanei `y=\"scor\"`, luate din tabelul `data=df`. Linia din cutie e mediana, iar cutia merge de la prima la a treia cuartilă (`25%` și `75%` din `describe()`). Liniile care ies din cutie arată până unde se întind celelalte valori, iar punctele desenate separat, dincolo de ele, sunt outlierii. Lecția 5 le explică pe larg."
          },
          {
            "code": "# box plot: mediana, cuartilele și valorile ieșite din tipar\nsns.boxplot(x=\"clasa\", y=\"scor\", data=df)\nplt.show()\n\n# heatmap: corelațiile dintre coloane, pe culori\nsns.heatmap(df.corr(numeric_only=True), annot=True, cmap=\"coolwarm\")\nplt.show()"
          },
          {
            "p": "Heatmap-ul colorează fiecare căsuță dintr-un tabel de numere, aici tabelul de corelații de la `corr()`, ca să vezi dintr-o privire ce coloane merg împreună. `annot=True` scrie și numărul în fiecare căsuță, iar `cmap=\"coolwarm\"` alege culorile: albastru pentru valorile mici, roșu pentru cele mari."
          },
          {
            "note": "Pune `plt.show()` după fiecare grafic. Altfel, graficele din aceeași celulă se desenează unul peste altul."
          }
        ]
      },
      {
        "heading": "Imagini ca array-uri",
        "blocks": [
          {
            "p": "Pentru calculator, o imagine color e un array de numere cu forma (înălțime, lățime, 3): trei canale, roșu, verde și albastru, cu valori de la 0 la 255. Fiecare pixel are câte un număr pe canal, unde 0 înseamnă deloc și 255 la maximum, așa că un pixel roșu e `[255 0 0]`, unul alb `[255 255 255]` și unul negru `[0 0 0]`. O citești cu Pillow și o transformi în array NumPy, iar de acolo merge tot ce ai văzut mai sus: pe array-ul `a` de mai jos, `a[:, :, 0]` îți dă doar canalul roșu."
          },
          {
            "code": "from PIL import Image\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# convert(\"RGB\") scoate canalul de transparență, dacă există\nimg = Image.open(\"poza.png\").convert(\"RGB\")\na = np.array(img)\nprint(a.shape, a.dtype)                 # (înălțime, lățime, 3) uint8\n\ngri = np.array(img.convert(\"L\"))        # alb-negru, un singur canal\nmica = np.array(img.resize((64, 64)))   # aceeași mărime pentru toate\n\nplt.imshow(a)\nplt.show()"
          },
          {
            "p": "La o poză de 640 pe 480 de pixeli, `print` scrie `(480, 640, 3) uint8`: întâi înălțimea, apoi lățimea. `uint8` e tipul pixelilor: numere întregi fără semn (u vine de la „unsigned”), de la 0 la 255, fiecare pe 8 biți. Unele PNG-uri au și un al patrulea canal, pentru transparență, iar `convert(\"RGB\")` îl scoate. `convert(\"L\")` face imaginea alb-negru: rămâne un singur număr pe pixel, luminozitatea, de la 0 (negru) la 255 (alb), deci forma devine (480, 640)."
          },
          {
            "p": "`resize((64, 64))` aduce poza la 64 pe 64 de pixeli, deci la forma (64, 64, 3). Un model vrea toate imaginile de aceeași formă, de asta le aduci pe toate la aceeași mărime. Atenție, `resize` primește întâi lățimea și apoi înălțimea, invers față de `shape`. `plt.imshow(a)` desenează array-ul ca imagine."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "numpy-100",
        "url": "https://github.com/rougier/numpy-100"
      },
      {
        "title": "Kaggle Learn: Pandas",
        "url": "https://www.kaggle.com/learn/pandas"
      },
      {
        "title": "Kaggle Learn: Data Visualization",
        "url": "https://www.kaggle.com/learn/data-visualization"
      }
    ]
  },
  {
    "moduleCode": "S6",
    "duration": "~2 săptămâni",
    "intro": "Înainte să antrenezi orice, uită-te la date. La distribuții, la ce lipsește, la cum sunt scalate coloanele (cât de mari sunt numerele din fiecare). Etapa asta se numește EDA, analiză exploratorie, și e prima pe care o faci la orice problemă nouă. După ce te-ai uitat, pregătești datele pentru model, de exemplu umpli golurile și transformi textul în numere. Partea asta se numește preprocesare.",
    "sections": [
      {
        "heading": "Ce cauți când te uiți la date",
        "blocks": [
          {
            "p": "EDA înseamnă să pui întrebări simple datelor și să te uiți la răspuns înainte să tragi vreo concluzie. Câte rânduri și coloane sunt. Ce tip are fiecare coloană. Cum arată ținta, adică ce vrei să prezici. Ce lipsește și cât de mult. La cele mai multe răspunzi cu ce știi din Lecția 4: `df.shape`, `df.info()`, `df.isna().sum()`."
          },
          {
            "p": "Distribuția unei coloane îți spune ce valori apar în ea și cât de des. Ia salariile dintr-o firmă mare: cei mai mulți oameni câștigă în jur de 4000 de lei, iar câțiva câștigă 20000 sau mai mult. Pe histogramă vezi un munte de bare înalte în stânga și un șir lung de bare mici spre dreapta. Șirul ăsta se numește coadă lungă. O distribuție simetrică arată la fel de o parte și de alta a mijlocului, cum arată de obicei înălțimile elevilor dintr-o școală."
          },
          {
            "p": "Trasează distribuția fiecărei coloane numerice cu o histogramă. Vezi imediat dacă e simetrică, dacă are o coadă lungă, dacă are valori imposibile (o vârstă de 200, un preț negativ). Valorile imposibile sunt semne de erori în date, pe care le prinzi din ochi."
          },
          {
            "code": "df[\"varsta\"].hist(bins=30)\ndf[\"tinta\"].value_counts()     # câte exemple din fiecare clasă"
          },
          {
            "p": "Prima linie e scurtătura din pandas pentru `plt.hist` din Lecția 4: histograma coloanei, cu 30 de intervale. A doua numără câte rânduri are fiecare clasă, adică fiecare valoare posibilă a țintei, ca spam sau normal."
          }
        ]
      },
      {
        "heading": "Outlieri: valori ieșite din tipar",
        "blocks": [
          {
            "p": "Un outlier e o valoare mult mai mare sau mai mică decât restul coloanei. Poate fi o eroare, ca vârsta de 200, sau poate fi chiar ce cauți, ca o anomalie la un senzor. Îl vezi cel mai repede pe un box plot."
          },
          {
            "p": "Regula clasică pentru outlieri folosește cuartilele, pe care le-ai văzut în `describe()`. Ia nouă prețuri, sortate crescător: 10, 12, 14, 15, 16, 18, 20, 22, 90. Mediana e valoarea din mijloc, a cincea: 16. Prima cuartilă (Q1) e valoarea de la un sfert din listă, iar a treia cuartilă (Q3) cea de la trei sferturi. A doua cuartilă e chiar mediana. De la prima poziție la ultima sunt 8 pași: un sfert înseamnă 2 pași, deci Q1 e a treia valoare, 14. Trei sferturi înseamnă 6 pași, deci Q3 e a șaptea, 20. Când pasul nu iese întreg, pandas ia o valoare între cele două vecine."
          },
          {
            "p": "Regula numără o valoare ca outlier dacă e cu mai mult de 1.5 × IQR sub prima cuartilă sau peste a treia. IQR (interquartile range) e distanța dintre cuartila 1 și cuartila 3. Aici IQR = 20 - 14 = 6, iar 1.5 × 6 = 9. Limitele sunt deci 14 - 9 = 5 și 20 + 9 = 29, iar singurul preț din afara lor e 90. Pe box plot-ul din Lecția 4, exact valorile astea apar ca puncte separate."
          },
          {
            "code": "q1, q3 = df[\"pret\"].quantile([0.25, 0.75])\niqr = q3 - q1\njos, sus = q1 - 1.5 * iqr, q3 + 1.5 * iqr\noutlieri = df[(df[\"pret\"] < jos) | (df[\"pret\"] > sus)]\nprint(len(outlieri))"
          },
          {
            "p": "`quantile([0.25, 0.75])` calculează Q1 și Q3 (0.25 e un sfert, 0.75 trei sferturi), iar `q1, q3 = ...` le despachetează în două variabile, ca în Lecția 3. Linia cu `outlieri` păstrează rândurile unde prețul e sub `jos` sau peste `sus`, ca o mască booleană din Lecția 4. Semnul `|` înseamnă „sau”: pandas îl cere în loc de `or`, cu fiecare condiție între paranteze. Pe cele nouă prețuri, codul afișează 1."
          },
          {
            "p": "Ce faci cu ei depinde de cauză. Erorile le corectezi sau le scoți. Valorile reale, dar extreme, le poți tăia la o limită cu `clip`, iar o coloană cu coadă lungă spre dreapta, ca prețurile sau veniturile, o aduci la o formă mai echilibrată cu `np.log1p`."
          },
          {
            "code": "df[\"pret\"] = df[\"pret\"].clip(upper=sus)\ndf[\"venit_log\"] = np.log1p(df[\"venit\"])"
          },
          {
            "p": "`clip(upper=sus)` înlocuiește orice valoare mai mare decât `sus` cu `sus`. În exemplu, 90 devine 29, iar celelalte prețuri rămân la fel."
          },
          {
            "p": "`np.log1p` folosește logaritmul, o funcție pe care o faci la matematică abia în clasa a X-a. Aici îți ajunge să știi că crește foarte încet. Ia 9, 99 și 999, adică 10, 100 și 1000 minus 1: `np.log1p` le transformă în aproximativ 2.3, 4.6 și 6.9. Fiecare înmulțire cu 10 adaugă doar 2.3, așa că valorile mari se strâng lângă celelalte și coada lungă se scurtează. Partea „1p” vine de la „plus 1”: funcția calculează logaritmul lui 1 + x, ca să meargă și pe 0, unde dă 0 (logaritmul simplu nu există în 0)."
          }
        ]
      },
      {
        "heading": "Clase dezechilibrate: de ce contează devreme",
        "blocks": [
          {
            "p": "Clasele sunt dezechilibrate când una dintre ele apare mult mai rar decât celelalte. Dacă prezici o clasă care apare în 2% din cazuri (fraudă, o boală rară), un model care spune mereu nu are 98% acuratețe și e complet inutil."
          },
          {
            "p": "Acuratețea, din Lecția 2, e procentul de răspunsuri corecte. Ia 1000 de plăți cu cardul, dintre care 20 sunt fraude. Un model care răspunde mereu „nu e fraudă” greșește doar cele 20, deci nimerește 980 din 1000, adică 98%. Și totuși n-a prins nicio fraudă, deși pentru asta l-ai făcut."
          },
          {
            "p": "De asta te uiți la echilibrul claselor de la început: schimbă ce metrică folosești și cum îți împarți datele în antrenare și validare (Lecția 6)."
          },
          {
            "note": "Când o clasă e rară, acuratețea minte. Reține pentru Lecția 8, despre evaluare: vei avea nevoie de precizie, recall și F1, nu de acuratețe simplă. Recall-ul spune câte dintre fraudele reale ai prins, precizia câte dintre alarmele tale erau fraude adevărate, iar F1 le combină într-un singur scor."
          }
        ]
      },
      {
        "heading": "Corelații: ce coloane spun același lucru",
        "blocks": [
          {
            "p": "Înălțimea și greutatea elevilor cresc de obicei împreună, iar temperatura de afară și gazul consumat la încălzire merg invers: când una crește, cealaltă scade."
          },
          {
            "p": "Corelația măsoară cât de mult merg două coloane împreună, de la -1 (invers) prin 0 (deloc) până la 1 (identic ca tendință). Două coloane aproape identice îți spun ceva: poate una e derivată din alta, poate poți arunca una fără să pierzi informație. Temperatura în grade Celsius și aceeași temperatură în Fahrenheit, de exemplu, au corelația 1, pentru că a doua se calculează din prima."
          },
          {
            "code": "df.corr(numeric_only=True)     # matricea de corelații între coloane"
          },
          {
            "p": "Rezultatul e tabelul de corelații din Lecția 4, cu câte un rând și o coloană pentru fiecare coloană numerică."
          },
          {
            "p": "O legătură e liniară când punctele stau pe o dreaptă, ca graficul unei funcții liniare de la matematică. Celsius și Fahrenheit sunt legate exact așa: F = 1.8 × C + 32, deci fiecare grad Celsius în plus adaugă mereu 1.8 grade Fahrenheit."
          },
          {
            "p": "Implicit e corelația Pearson, care prinde doar legăturile liniare. Cu `df.corr(method=\"spearman\", numeric_only=True)` prinzi și coloanele care cresc împreună fără să fie pe o linie dreaptă."
          },
          {
            "p": "Spearman se uită doar la ordine. Înlocuiește fiecare valoare cu locul ei în clasament (cea mai mică devine 1, următoarea 2 și așa mai departe), apoi calculează Pearson pe locuri. Ia x = 1, 2, 3, 4, 5 și y = 1, 10, 100, 1000, 10000. y crește mereu odată cu x, dar tot mai repede, deci punctele nu stau pe o dreaptă. Pearson dă aproximativ 0.76, iar Spearman dă 1."
          },
          {
            "p": "Corelația nu înseamnă cauzalitate. Două lucruri pot crește împreună fără ca unul să-l provoace pe celălalt. Vara cresc și vânzările de înghețată, și înecurile, dar înghețata nu provoacă înecuri: pe amândouă le aduce căldura. E doar un indiciu unde să te uiți, nu o concluzie."
          }
        ]
      },
      {
        "heading": "Valori lipsă: întâi de ce, apoi cum",
        "blocks": [
          {
            "p": "Înainte să umpli o valoare lipsă, întreabă-te de ce lipsește. Uneori lipsa e o eroare de colectare. Alteori lipsa e chiar informație: un câmp gol la venit poate însemna că persoana a refuzat să răspundă, ceea ce e semnificativ. În cazul ăsta, adaugă o coloană separată care marchează lipsa, de exemplu `venit_lipsa`, cu 1 unde venitul lipsește și 0 în rest."
          },
          {
            "p": "Umplerea (imputarea) se face cu media, mediana sau valoarea cea mai frecventă, ori cu un model. Mediana e mai sigură ca media când sunt outlieri, pentru că nu e trasă de valorile extreme."
          },
          {
            "p": "Ia cinci salarii: 3000, 3200, 3500, 4000 și 50000. Media e 63700 / 5 = 12740, mai mult decât câștigă patru dintre cei cinci. Mediana, valoarea din mijloc, e 3500, un salariu obișnuit pentru grupul ăsta. Valoarea cea mai frecventă o folosești la coloanele cu text, ca orașul, unde nu poți face o medie."
          },
          {
            "p": "De aici încolo, exemplele folosesc `X_train` și `X_val`. Datele de antrenare se împart în două: o parte din care învață modelul și una ținută deoparte, ca să-l verifici, la fel ca la validarea locală din Lecția 2. `X_train` e partea din date pe care antrenezi, iar `X_val` partea pe care verifici modelul. `X` e tabelul cu trăsăturile (features), adică coloanele de intrare, iar `y` e ținta, deci `y_train` e ținta rândurilor din `X_train`. Cum le obții vezi în lecția următoare."
          },
          {
            "p": "Uneltele de preprocesare din scikit-learn au două metode, `fit` și `transform`, după tiparul `fit`/`predict` din Lecția 3. `fit` învață niște numere din date, aici mediana fiecărei coloane; numerele astea se numesc parametri. `transform` le aplică pe orice tabel, aici umple golurile cu ele. Le înveți doar din `X_train` și le aplici pe ambele părți, ca verificarea să rămână cinstită. Pentru model, `X_val` trebuie să fie date noi, din care n-a învățat nimic."
          },
          {
            "code": "from sklearn.impute import SimpleImputer\nimp = SimpleImputer(strategy=\"median\").fit(X_train)\nX_train = imp.transform(X_train)\nX_val = imp.transform(X_val)    # aceiași parametri, învățați pe train"
          },
          {
            "p": "`strategy=\"median\"` alege mediana; mai poți pune `\"mean\"` pentru medie sau `\"most_frequent\"` pentru valoarea cea mai frecventă. Din `transform` iese un array NumPy fără goluri, cu aceleași rânduri și coloane."
          },
          {
            "p": "Coloana care marchează lipsa o adaugă `SimpleImputer` singur, dacă îi dai `add_indicator=True`. Pentru fiecare coloană care avea goluri, pune la final o coloană de 0 și 1. De exemplu, venitul 3000, gol, 4000 devine 3000, 3500, 4000 (golul a primit mediana), plus o coloană nouă cu 0, 1, 0."
          },
          {
            "p": "La serii în timp, ca citirile unui senzor, golul se completează de obicei cu ultima valoare cunoscută. Sortezi întâi după timp, apoi folosești `ffill`."
          },
          {
            "code": "df = df.sort_values(\"timp\")\ndf[\"temperatura\"] = df[\"temperatura\"].ffill()"
          },
          {
            "p": "`ffill` vine de la forward fill, „umplere înainte”: fiecare gol primește valoarea de pe rândul de deasupra. Citirile 20, gol, gol, 23 devin 20, 20, 20, 23. De asta sortezi întâi: rândul de deasupra trebuie să fie citirea de dinainte."
          }
        ]
      },
      {
        "heading": "Scalarea: ce metodă și când",
        "blocks": [
          {
            "p": "Ia doi oameni: unul are 20 de ani și un venit de 3000 de lei, celălalt 25 de ani și 3500 de lei. Dacă îi privești ca pe două puncte în plan, (20, 3000) și (25, 3500), distanța dintre ei e, cu teorema lui Pitagora, √(5² + 500²) ≈ 500.02. E aproape exact diferența de venit. Cei 5 ani aproape nu contează, doar pentru că vârsta se măsoară în zeci, iar venitul în mii."
          },
          {
            "p": "Multe modele măsoară distanțe, ca mai sus (de exemplu kNN, care caută rândurile cele mai apropiate, și K-Means, din Lecția 10). Altele folosesc gradient, adică învață corectându-se în pași mici (regresia, din Lecția 7, și rețelele neuronale, din Lecția 14). Pentru ele, o coloană cu valori mari (venitul, în mii) domină una cu valori mici (vârsta, zeci) doar prin scală, nu prin importanță. Scalarea le aduce la aceeași măsură."
          },
          {
            "p": "Arborii de decizie și Random Forest nu au nevoie de ea, pentru că despart datele pe praguri. Un arbore de decizie (Lecția 7) pune întrebări ca „venitul e peste 3200?”. Dacă scalezi coloana, se schimbă doar pragul, iar rândurile se împart la fel. Random Forest e un grup de astfel de arbori (Lecția 9)."
          },
          {
            "p": "Sunt două metode uzuale, și alegerea depinde de forma datelor. Prima, standardizarea, folosește media și deviația standard din Lecția 4, care spune cât de departe stau de obicei valorile de medie. Ia valorile 10, 20, 30, cu media 20. Scazi media din fiecare (-10, 0, 10), ridici la pătrat (100, 0, 100), faci media pătratelor (200 / 3 ≈ 66.67) și scoți radical: deviația standard e ≈ 8.16. Standardizat, 10 devine (10 - 20) / 8.16 ≈ -1.22, 20 devine 0, iar 30 devine 1.22."
          },
          {
            "formula": "z = (x - μ) / σ",
            "explain": "Standardizarea: scazi media μ (se citește „miu”) și împarți la deviația standard σ („sigma”). Rezultatul are media 0 și deviația 1. O folosești ca variantă implicită, la regresie, SVM și rețele neuronale (le vezi în Lecțiile 7 și 14), când datele n-au outlieri extremi."
          },
          {
            "code": "from sklearn.preprocessing import StandardScaler\nsc = StandardScaler().fit(X_train)   # învață μ și σ pe TRAIN\nX_train = sc.transform(X_train)\nX_val = sc.transform(X_val)          # aplică aceiași μ și σ"
          },
          {
            "p": "Dacă verifici de mână, ai grijă la o capcană. `StandardScaler` face media pătratelor ca mai sus, împărțind suma lor la 3, și obține 8.16. `.std()` din pandas împarte implicit suma la 2 (numărul de valori minus 1) și dă 10.0 pentru aceleași valori. Cu `.std(ddof=0)`, pandas dă și el 8.16."
          },
          {
            "p": "Normalizarea min-max, a doua metodă, mută valorile între 0 și 1. Pe 10, 20, 30, minimul 10 devine 0, maximul 30 devine 1, iar 20 devine (20 - 10) / (30 - 10) = 0.5."
          },
          {
            "formula": "x' = (x - min) / (max - min)",
            "explain": "Normalizarea min-max: aduce valorile în intervalul 0 până la 1 (x' e valoarea nouă). O folosești când ai nevoie de un interval fix, de exemplu la o rețea care așteaptă input între 0 și 1, sau la imagini (pixelii, deja în 0-255). Sensibilă la outlieri: un singur punct extrem strică minimul sau maximul pentru tot restul coloanei."
          },
          {
            "code": "from sklearn.preprocessing import MinMaxScaler\nsc = MinMaxScaler().fit(X_train)   # învață min și max pe TRAIN\nX_train = sc.transform(X_train)\nX_val = sc.transform(X_val)"
          },
          {
            "p": "Ultima frază din formulă, în numere: adaugă un 1000 lângă 10, 20 și 30. Maximul devine 1000, iar 10, 20 și 30 ajung la 0, 0.01 și 0.02, înghesuite lângă 0."
          },
          {
            "p": "Când coloana are outlieri, a treia variantă, `RobustScaler`, e mai sigură: scade mediana și împarte la IQR, așa că un punct extrem nu strică scala pentru restul. Pe cele nouă prețuri de la outlieri (mediana 16, IQR 6), 10 devine (10 - 16) / 6 = -1, iar 22 devine 1. Prețul de 90 ajunge la aproximativ 12.33, departe de rest, dar fără să le mai înghesuie pe celelalte."
          },
          {
            "code": "from sklearn.preprocessing import RobustScaler\nsc = RobustScaler().fit(X_train)   # învață mediana și IQR pe TRAIN\nX_train = sc.transform(X_train)\nX_val = sc.transform(X_val)"
          },
          {
            "p": "Toate trei învață pe `X_train` și doar aplică pe `X_val`, pentru că parametrii depind de datele din care îi înveți. Să zicem că antrenarea are veniturile 3000, 3500 și 4000, iar validarea 3200 și 50000. Media pe antrenare e 3500, dar pe toate cinci e 12740: un singur venit din validare a schimbat numărul cu care pregătești antrenarea. Preprocesarea a „văzut” deja validarea, ca un elev care a tras cu ochiul la subiecte. Scorul de pe validare nu mai spune cât de bine merge modelul pe date noi."
          },
          {
            "note": "Regula de bază a preprocesării: învață parametrii (medie, deviație, mediană, min, max) doar pe setul de antrenare, apoi aplică-i pe validare și test. Niciodată invers. Altfel test-ul se scurge în antrenare și scorul tău e o minciună. Asta se numește scurgere de date (data leakage)."
          }
        ]
      },
      {
        "heading": "Variabile categorice: coloane cu categorii",
        "blocks": [
          {
            "p": "Un model vrea numere, dar multe coloane sunt categorii: oraș, culoare, tip. Transformarea lor în numere se numește encoding (codificare). Alegerea encoding-ului depinde de câte categorii sunt și dacă au o ordine naturală. Numărul de categorii diferite dintr-o coloană se numește cardinalitate: coloana `culoare`, cu roșu, verde și albastru, are cardinalitatea 3, iar un cod poștal poate avea mii."
          },
          {
            "p": "Fără ordine și cu puține categorii, one-hot encoding e alegerea: face din fiecare categorie o coloană separată de 0 și 1. Cu trei culori, roșu devine [1,0,0], verde [0,1,0]. Nicio categorie nu e mai mare ca alta."
          },
          {
            "code": "pd.get_dummies(df, columns=[\"oras\", \"culoare\"])"
          },
          {
            "p": "`get_dummies` face asta pe coloanele din `columns` și pune numele coloanei vechi în fața categoriei. Coloana `oras` cu București, Cluj și Iași devine `oras_București`, `oras_Cluj` și `oras_Iași`, iar un rând din Cluj primește 0, 1, 0. În pandas recent, coloanele noi apar cu `True` și `False` în loc de 1 și 0. Pentru model e același lucru, iar cu `dtype=int` primești 0 și 1."
          },
          {
            "p": "Cu ordine naturală (mic, mediu, mare), ordinal encoding le transformă în numere care păstrează ordinea, 0, 1, 2. Merge bine mai ales cu modele bazate pe arbori, care oricum despart datele pe praguri."
          },
          {
            "code": "from sklearn.preprocessing import OrdinalEncoder\nenc = OrdinalEncoder(categories=[[\"mic\", \"mediu\", \"mare\"]])\ndf[\"marime_cod\"] = enc.fit_transform(df[[\"marime\"]])"
          },
          {
            "p": "`categories` primește ordinea dorită ca listă în listă, câte o listă pentru fiecare coloană codificată (aici una). Cu paranteze duble, `df[[\"marime\"]]` e un tabel cu o singură coloană, forma pe care o cer uneltele din scikit-learn. `fit_transform` face `fit` și `transform` dintr-o singură mișcare."
          },
          {
            "p": "Label encoding face același lucru, un număr întreg pe categorie, dar fără să ceri tu ordinea, ea vine din ordine alfabetică sau din ordinea de apariție. E gândit pentru ținta y, nu pentru coloanele de intrare: pe o coloană de intrare fără ordine reală, numerele inventează o ordine falsă pe care un model liniar o ia de bună. Dacă București devine 0, Cluj 1 și Iași 2, un model liniar (Lecția 7) ajunge să creadă că Clujul e „între” București și Iași."
          },
          {
            "code": "from sklearn.preprocessing import LabelEncoder\nle = LabelEncoder()\ny_encoded = le.fit_transform(y_train)   # ex: \"spam\"/\"nu\" -> 1/0"
          },
          {
            "p": "Cu sute de categorii (cod poștal, ID de produs), one-hot ar produce sute de coloane aproape numai cu 0. Binary encoding e un compromis: transformă fiecare categorie într-un număr, apoi în cifre binare, și fiecare cifră devine o coloană. În baza 2 (binar), numerele se scriu doar cu 0 și 1: 1 e 1, 2 e 10, 3 e 11, 4 e 100, 5 e 101. Categoria cu numărul 5 se scrie deci 101 și primește 1, 0 și 1 în trei coloane. Pentru 100 de categorii ai nevoie de doar 7 coloane (2^7 = 128), nu 100, și nu inventează nicio ordine. Din 7 cifre de 0 și 1 poți forma 128 de numere diferite, deci ajung pentru toate."
          },
          {
            "code": "from category_encoders import BinaryEncoder\nenc = BinaryEncoder(cols=[\"cod_postal\"])\ndf_encoded = enc.fit_transform(df[\"cod_postal\"])"
          },
          {
            "p": "`BinaryEncoder` vine din pachetul `category_encoders`, nu din scikit-learn, așa că s-ar putea să nu fie instalat la concurs. O alternativă cu Pandas simplu e frequency encoding: înlocuiești categoria cu de câte ori apare. Dacă 400001 apare în trei rânduri și 700001 într-unul, rândurile cu 400001 primesc 3, iar cel cu 700001 primește 1."
          },
          {
            "code": "frecventa = df[\"cod_postal\"].value_counts()\ndf[\"cod_postal_frecventa\"] = df[\"cod_postal\"].map(frecventa)"
          },
          {
            "p": "`value_counts()` dă, pentru fiecare cod, de câte ori apare. `map` ia fiecare valoare din coloană, o caută în rezultatul ăsta și pune în loc numărul găsit, ca o căutare într-un dicționar (Lecția 3)."
          },
          {
            "p": "Target encoding merge și mai departe: înlocuiește fiecare categorie cu media țintei pentru acea categorie, o singură coloană indiferent de câte categorii sunt. Să zicem că ținta e 1 dacă un client a cumpărat și 0 dacă nu, iar clienții din Cluj au țintele 1, 0, 1, 1: Cluj devine media lor, 0.75. Ajută cel mai mult la cardinalitate foarte mare, dar e și cel mai expus la scurgere de date. Un oraș care apare într-un singur rând primește chiar ținta acelui rând, așa că modelul vede răspunsul printre trăsături."
          },
          {
            "code": "from sklearn.preprocessing import TargetEncoder\nenc = TargetEncoder()\nX_train_enc = enc.fit_transform(X_train[[\"cod_postal\"]], y_train)\nX_val_enc = enc.transform(X_val[[\"cod_postal\"]])"
          },
          {
            "p": "`TargetEncoder` din scikit-learn se apără de problema asta. În `fit_transform`, fiecare rând de antrenare primește o medie calculată din alte rânduri decât el, iar categoriile cu puține rânduri sunt trase spre media generală. De asta pe `X_train` chemi `fit_transform`, iar pe `X_val` doar `transform`."
          },
          {
            "note": "Ordinal, binary și target encoding se învață tot doar pe train, la fel ca imputarea și scalarea. Altfel informație din validare/test se scurge în encoding și scorul tău minte."
          }
        ]
      },
      {
        "heading": "Coloane noi din cele existente",
        "blocks": [
          {
            "p": "De multe ori modelul învață mai bine dintr-o coloană construită de tine decât din datele brute. Asta e feature engineering, adică construirea de trăsături noi. Trei tipare apar des: statistici pe grup, ferestre glisante pe serii și bucăți dintr-o dată calendaristică."
          },
          {
            "code": "# media și deviația pe grup, puse pe fiecare rând\ndf[\"medie_oras\"] = df.groupby(\"oras\")[\"suprafata\"].transform(\"mean\")\ndf[\"std_oras\"] = df.groupby(\"oras\")[\"suprafata\"].transform(\"std\")\n\n# fereastră glisantă: media ultimelor 5 citiri, pe fiecare senzor\ndf = df.sort_values([\"senzor\", \"timp\"])\nmedie_5 = lambda s: s.rolling(5, min_periods=1).mean()\ndf[\"temp_5\"] = df.groupby(\"senzor\")[\"temperatura\"].transform(medie_5)\n\n# bucăți dintr-o dată calendaristică\ndf[\"data\"] = pd.to_datetime(df[\"data\"])\ndf[\"luna\"] = df[\"data\"].dt.month\ndf[\"zi_saptamana\"] = df[\"data\"].dt.day_of_week"
          },
          {
            "p": "Prima parte calculează media și deviația standard a suprafeței în fiecare oraș și le pune pe fiecare rând din orașul respectiv, cu `transform` din Lecția 4. Dacă apartamentele din Cluj au în medie 60 de metri pătrați, unul de 90 din Cluj primește `medie_oras` egal cu 60, iar modelul poate vedea că e mare pentru orașul lui."
          },
          {
            "p": "O fereastră glisantă e un grup de rânduri vecine care alunecă în jos cu câte un rând. Pentru citirile 20, 22, 24, 26, 28, 30, media ultimelor 5 dă 20, 21, 22, 23, 24, 26. La început, `min_periods=1` face media din câte citiri există, iar la ultimul rând fereastra cuprinde 22, 24, 26, 28, 30. Funcția scrisă cu `lambda` (Lecția 3) face media, iar `transform` o aplică separat pe citirile fiecărui senzor, ca să nu amesteci senzorii."
          },
          {
            "p": "Ultima parte transformă textul în dată calendaristică, cu `pd.to_datetime` din Lecția 4, și scoate din ea luna (de la 1 la 12) și ziua din săptămână (0 e luni, 6 e duminică). Pentru 25 decembrie 2024 ies luna 12 și ziua 2, adică miercuri. Un model nu poate folosi direct o dată, dar poate învăța din „luna 12” sau „ziua 5”, de exemplu că lumea cumpără mai mult în decembrie sau sâmbăta."
          },
          {
            "p": "Dacă statistica pe grup e calculată din țintă, e de fapt target encoding și se învață doar pe train, ca mai sus."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Kaggle Learn: Data Cleaning",
        "url": "https://www.kaggle.com/learn/data-cleaning"
      },
      {
        "title": "Kaggle Learn: Feature Engineering",
        "url": "https://www.kaggle.com/learn/feature-engineering"
      }
    ]
  },
  {
    "moduleCode": "S5",
    "duration": "~1 săptămână",
    "intro": "Până acum ai învățat bucăți: Python, NumPy, Pandas, EDA și preprocesare. Modulul ăsta le leagă. Nu aduce teorie nouă, ci ordinea în care se fac lucrurile. Contează, pentru că majoritatea greșelilor de la olimpiadă nu vin din model, ci din pași făcuți în ordine greșită. Șirul de pași care te duce de la fișierele primite la fișierul de submisie se numește pipeline. Un pipeline pe care îl poți rula cap-coadă în douăzeci de minute e cea mai valoroasă unealtă pe care o duci în concurs.",
    "sections": [
      {
        "heading": "Cei șase pași, în ordine",
        "blocks": [
          {
            "p": "Orice problemă tabelară de concurs, cu datele într-un tabel ca un fișier CSV, arată la fel dacă o privești de sus. Citești datele. Le împarți. Faci un baseline, adică un model de reper, cât se poate de simplu. Preprocesezi. Antrenezi și validezi. Scrii submisia."
          },
          {
            "p": "Ordinea nu e o sugestie. Fiecare pas presupune că cel dinainte s-a făcut corect, iar doi dintre ei sunt ușor de inversat din grabă: împărțirea datelor și preprocesarea. Dacă le inversezi, preprocesarea învață și din rândurile de validare, adică scurgerea de date din Lecția 5. Scorul tău local devine o minciună și afli abia pe clasamentul privat."
          },
          {
            "list": [
              "Citești și te uiți la ce ai primit.",
              "Împarți în antrenare și validare.",
              "Faci un baseline prost, ca să ai un reper.",
              "Preprocesezi, cu parametri învățați doar pe antrenare.",
              "Antrenezi un model și îl compari cu baseline-ul.",
              "Scrii fișierul de submisie și îl verifici înainte de upload."
            ]
          }
        ]
      },
      {
        "heading": "Pasul 1: citești și te uiți",
        "blocks": [
          {
            "p": "Primul lucru după citire e să verifici că datele arată cum crezi. Câte rânduri, ce coloane, ce tip are fiecare, cum arată ținta. Nu e analiză completă, pentru asta ai Lecția 5, despre EDA. E doar verificarea că n-ai citit greșit fișierul."
          },
          {
            "code": "import pandas as pd\n\ntrain = pd.read_csv(\"train.csv\")\ntest = pd.read_csv(\"test.csv\")\n\nprint(train.shape, test.shape)\nprint(train.dtypes)\nprint(train[\"target\"].value_counts())"
          },
          {
            "p": "`train.shape` îți dă numărul de rânduri și de coloane, de exemplu `(1000, 6)`. `train.dtypes` arată tipul fiecărei coloane, iar coloanele cu text apar ca `object` sau `str`, după versiunea de pandas. `value_counts()` numără câte rânduri are fiecare clasă a țintei."
          },
          {
            "p": "Compară coloanele din train cu cele din test. Diferența dintre ele e, aproape întotdeauna, chiar coloana țintă. Dacă mai lipsește ceva, ai o problemă de înțeles înainte să mergi mai departe. Cel mai repede o vezi cu diferența de mulțimi din Lecția 3: `set(train.columns) - set(test.columns)` îți dă coloanele care sunt în train și lipsesc din test."
          }
        ]
      },
      {
        "heading": "Pasul 2: împarți datele înainte să le atingi",
        "blocks": [
          {
            "p": "Aici se pierd cele mai multe puncte. Ai nevoie de o parte din date pe care modelul să n-o fi văzut niciodată, ca să estimezi cinstit cât de bun e. Împărțirea (în engleză, split) se face înainte de orice transformare. De aici vin `X_train` și `X_val` din Lecția 5."
          },
          {
            "code": "from sklearn.model_selection import train_test_split\n\n# id-ul e doar un număr de rând, nu o informație despre el\nX = train.drop(columns=[\"id\", \"target\"])\ny = train[\"target\"]\n\nX_tr, X_val, y_tr, y_val = train_test_split(\n    X, y, test_size=0.2, random_state=42, stratify=y\n)"
          },
          {
            "p": "`X` primește toate coloanele în afară de `id` și țintă, adică trăsăturile (features), coloanele de intrare. `y` primește ținta. `train_test_split` amestecă rândurile, le împarte în două și întoarce patru bucăți: trăsăturile și ținta pentru antrenare (`X_tr` și `y_tr`, prescurtări de la `X_train` și `y_train`), apoi aceleași pentru validare (`X_val` și `y_val`). `test_size=0.2` trimite 20% din rânduri în validare, iar restul de 80% rămân pentru antrenare."
          },
          {
            "p": "Argumentul `stratify` păstrează aceeași proporție de clase în ambele bucăți. Fără el, pe o problemă dezechilibrată poți nimeri o validare care nu conține deloc clasa rară, iar scorul devine fără sens."
          },
          {
            "p": "Să zicem că din 1000 de rânduri, 100 sunt din clasa rară, adică 10%. Cu `stratify=y`, validarea primește 200 de rânduri, dintre care exact 20 rare, iar antrenarea 800, dintre care 80 rare: 10% în ambele. Fără `stratify`, numărul de rânduri rare din validare se schimbă de la o împărțire la alta, de exemplu 12 sau 26."
          },
          {
            "note": "`random_state` fixat înseamnă că aceeași împărțire se repetă la fiecare rulare. Fără el, scorul se schimbă între rulări și nu mai știi dacă o modificare a ajutat sau ai avut noroc. E aceeași idee ca seed-ul din Lecția 3, iar 42 nu are nimic special: contează doar să rămână același."
          }
        ]
      },
      {
        "heading": "Pasul 3: baseline-ul prost dar onest",
        "blocks": [
          {
            "p": "Înainte de orice model serios, fă unul stupid. Prezice mereu clasa majoritară, adică pe cea cu cele mai multe rânduri, sau media țintei, dacă prezici un număr, și măsoară. Numărul ăla e podeaua ta: orice model care nu-l bate e mai rău decât nimic."
          },
          {
            "code": "from sklearn.dummy import DummyClassifier\nfrom sklearn.metrics import f1_score\n\ndummy = DummyClassifier(strategy=\"most_frequent\").fit(X_tr, y_tr)\nprint(f1_score(y_val, dummy.predict(X_val), average=\"macro\"))"
          },
          {
            "p": "`DummyClassifier(strategy=\"most_frequent\")` e un model care nici nu se uită la trăsături. La `fit` reține doar clasa cea mai frecventă din `y_tr`, iar `predict` o dă pentru fiecare rând. `f1_score` primește întâi răspunsurile corecte, apoi predicțiile."
          },
          {
            "p": "F1 e un scor între 0 și 1, iar mai mare e mai bine. Spre deosebire de acuratețe, nu se lasă păcălit de o clasă rară. `average=\"macro\"` calculează F1 separat pe fiecare clasă și face media lor, deci clasa rară contează cât cea mare. Îl explicăm pe larg în Lecția 8. Cu 90% din rânduri într-o clasă și 10% în cealaltă, baseline-ul are 90% acuratețe, dar F1 macro doar 0.47: aproape 0.95 pe clasa mare și 0 pe cea rară."
          },
          {
            "p": "Pare o pierdere de timp. Nu e. De multe ori un model complicat scoate un scor care pare rezonabil, până compari cu baseline-ul și descoperi că e la fel sau mai prost. Fără reper, n-ai fi știut."
          }
        ]
      },
      {
        "heading": "Pasul 4: preprocesarea care nu se scurge",
        "blocks": [
          {
            "p": "Regula de la preprocesare, din Lecția 5: parametrii (medie, deviație, categorii) se învață doar pe antrenare. Problema e că, făcută manual, regula asta se încalcă ușor."
          },
          {
            "p": "Soluția e Pipeline. Legi preprocesarea de model într-un singur obiect, iar când chemi `fit` pe el, scikit-learn are grijă singur ca transformările să învețe doar pe ce-i dai la antrenare."
          },
          {
            "p": "Gândește-te la o bandă de asamblare: fiecare rând trece prin aceiași pași, în aceeași ordine. La `fit`, fiecare pas învață din datele de antrenare, le transformă și le dă pasului următor, iar la capăt modelul se antrenează pe ce a primit. La `predict`, rândurile noi trec prin aceiași pași, doar cu `transform`, cu numerele învățate la antrenare."
          },
          {
            "code": "from sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.ensemble import RandomForestClassifier\n\nnumerice = X_tr.select_dtypes(include=\"number\").columns\ncategorice = X_tr.select_dtypes(exclude=\"number\").columns\n\npre = ColumnTransformer([\n    (\"num\", Pipeline([\n        (\"imp\", SimpleImputer(strategy=\"median\")),\n        (\"sc\", StandardScaler()),\n    ]), numerice),\n    (\"cat\", Pipeline([\n        (\"imp\", SimpleImputer(strategy=\"most_frequent\")),\n        (\"oh\", OneHotEncoder(handle_unknown=\"ignore\")),\n    ]), categorice),\n])\n\nmodel = Pipeline([\n    (\"pre\", pre),\n    (\"clf\", RandomForestClassifier(random_state=42)),\n])"
          },
          {
            "p": "`select_dtypes(include=\"number\")` alege coloanele cu numere, iar `exclude=\"number\"` pe toate celelalte, adică pe cele cu text. `.columns` păstrează doar numele lor."
          },
          {
            "p": "`ColumnTransformer` trimite fiecare grup de coloane pe banda lui. Primește o listă de tuple cu câte trei elemente: un nume ales de tine, pașii și coloanele. Coloanele numerice își umplu golurile cu mediana, apoi sunt standardizate. Cele cu text își umplu golurile cu valoarea cea mai frecventă, apoi trec prin one-hot. Un `Pipeline` primește perechi (nume, pas), în ordinea în care se execută. `OneHotEncoder` face același one-hot ca `pd.get_dummies` din Lecția 5, dar ține minte categoriile văzute la `fit`."
          },
          {
            "p": "`RandomForestClassifier` e modelul de la capătul benzii, iar `clf` e prescurtarea obișnuită de la classifier (clasificator). E un model format din mulți arbori de decizie care votează, explicat în Lecțiile 7 și 9. Aici contează doar că are `fit` și `predict`, ca orice model din scikit-learn. `random_state=42` face rezultatul repetabil, ca la împărțire."
          },
          {
            "p": "Argumentul `handle_unknown` contează în concurs: dacă în test apare o categorie care nu era în antrenare, fără el codul crapă la predicție, exact când n-ai timp să depanezi. Să zicem că în antrenare ai doar Cluj și Iași, iar în test apare Brașov. Fără argument primești `ValueError: Found unknown categories`. Cu `handle_unknown=\"ignore\"`, Brașov primește 0 în toate coloanele de oraș, iar predicția merge mai departe."
          }
        ]
      },
      {
        "heading": "Pasul 5: antrenezi și compari",
        "blocks": [
          {
            "p": "Acum ai un obiect care face totul. Îl antrenezi pe bucata de antrenare și îl măsori pe validare, cu aceeași metrică pe care o folosește concursul."
          },
          {
            "code": "model.fit(X_tr, y_tr)\nscor = f1_score(y_val, model.predict(X_val), average=\"macro\")\nprint(f\"model: {scor:.4f}\")"
          },
          {
            "p": "Metrica trebuie să fie cea din enunț. Dacă concursul punctează cu F1 macro și tu optimizezi acuratețea, urci pe scorul tău local și cobori pe al lor."
          },
          {
            "note": "Schimbă un singur lucru între două rulări și notează scorul de fiecare dată. Un tabel cu zece rânduri, chiar și scris pe hârtie, valorează mai mult decât zece idei încercate deodată din care nu știi care a ajutat."
          }
        ]
      },
      {
        "heading": "Pasul 6: submisia și verificările",
        "blocks": [
          {
            "p": "La final reantrenezi pe toate datele de antrenare, nu doar pe bucata de optzeci la sută. Ai folosit validarea ca să alegi, acum nu mai ai motiv să arunci acele exemple. Cu mai multe exemple, modelul învață de obicei puțin mai bine. `model.fit(X, y)` reia toată banda de la zero, pe toate rândurile: și medianele, și modelul se învață din nou."
          },
          {
            "code": "model.fit(X, y)\npred = model.predict(test.drop(columns=[\"id\"]))\n\nsub = pd.DataFrame({\"id\": test[\"id\"], \"target\": pred})\nsub.to_csv(\"submission.csv\", index=False)"
          },
          {
            "p": "`test.drop(columns=[\"id\"])` lasă în test exact coloanele din `X`. `index=False`, ca în Lecția 4, nu scrie în fișier numerele de rând, care ar apărea ca o coloană în plus."
          },
          {
            "p": "Înainte de upload, trei verificări care au salvat multe concursuri: numărul de rânduri e egal cu al fișierului de test, numele coloanelor sunt exact cele cerute în enunț, și nu ai valori lipsă în predicții."
          },
          {
            "code": "assert len(sub) == len(test)\nassert list(sub.columns) == [\"id\", \"target\"]\nassert sub[\"target\"].isna().sum() == 0"
          },
          {
            "p": "`assert` (Lecția 3) oprește programul cu o eroare dacă o condiție e falsă. Dacă celula rulează fără niciun mesaj, toate trei verificările au trecut."
          },
          {
            "p": "Și mai sigur e să pornești de la fișierul de exemplu din enunț: îl citești, verifici că rândurile sunt în aceeași ordine ca în test, schimbi doar coloana țintă și îl salvezi. Așa, numele și ordinea coloanelor sunt sigur cele cerute."
          },
          {
            "code": "sub = pd.read_csv(\"sample_submission.csv\")\nassert (sub[\"id\"] == test[\"id\"]).all()\nsub[\"target\"] = pred\nsub.to_csv(\"submission.csv\", index=False)"
          },
          {
            "p": "`sub[\"id\"] == test[\"id\"]` compară cele două coloane rând cu rând, iar `.all()` dă `True` doar dacă toate perechile sunt egale."
          },
          {
            "p": "Dacă metrica e AUC sau log loss, trimiți probabilități, nu clase: `model.predict_proba(...)[:, 1]` îți dă probabilitatea clasei pozitive."
          },
          {
            "p": "Amândouă punctează cât de bune sunt probabilitățile. AUC măsoară cât de bine le ordonează: 1 înseamnă că toate rândurile din clasa pozitivă au primit probabilități mai mari decât toate celelalte, iar 0.5 e cât ai lua dând cu banul. Log loss pedepsește probabilitățile sigure pe ele și greșite. Dacă spui 0.99 pentru clasa 1 la un rând care e din clasa 0, pierzi de vreo cinci ori mai mult decât dacă spuneai 0.6. La log loss, mai mic e mai bine."
          },
          {
            "p": "`predict_proba` întoarce un tabel cu câte o coloană pentru fiecare clasă, iar pe fiecare rând probabilitățile se adună la 1. `[:, 1]` ia toate rândurile din coloana 1, ca la NumPy în Lecția 4. Clasa pozitivă e cea notată cu 1, de obicei cea pe care o cauți, ca frauda sau spamul."
          }
        ]
      },
      {
        "heading": "Cum arată asta în ziua concursului",
        "blocks": [
          {
            "p": "Prima oră o dai pe pipeline-ul de mai sus, cu un model simplu. Ai deja o submisie validă și un scor pe clasament. De acolo îmbunătățești, cu plasa de siguranță că orice s-ar întâmpla ai ceva trimis."
          },
          {
            "p": "Ordinea inversă, în care lucrezi două ore la un model bun și abia apoi te apuci de submisie, e cel mai frecvent mod de a termina concursul cu zero puncte pentru cod care mergea aproape."
          },
          {
            "p": "La ONIA trimiți și codul care a produs fișierul, iar platforma îl rulează fără acces la internet. Înainte de fiecare submisie rulează Restart Kernel and Run All Cells, ca să fii sigur că notebook-ul merge de la zero, și citește datele cu căi relative."
          },
          {
            "p": "O cale relativă pornește din folderul în care e notebook-ul, ca `date/train.csv` sau simplu `train.csv`. Una absolută pornește de la rădăcina discului, ca `C:/Users/Ana/Desktop/train.csv`, și pe alt calculator nu mai există. Dacă datele stau lângă notebook, calea relativă le găsește oriunde e mutat folderul."
          },
          {
            "p": "Spre final alegi cele două submisii care contează: de obicei cea mai bună pe validarea locală și una mai sigură, cu un model mai simplu."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Ia o problemă de arhivă de pe MLCompete și scrie pipeline-ul cap-coadă într-o oră, cu model simplu."
      },
      {
        "title": "Rulează același pipeline o dată cu scalare înainte de split și o dată după, și compară scorurile de validare."
      },
      {
        "title": "Scrie-ți un notebook șablon cu cei șase pași, pe care să-l copiezi la începutul oricărei probleme."
      },
      {
        "title": "House Prices pe Kaggle",
        "url": "https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques"
      },
      {
        "title": "Kaggle Learn: Intermediate Machine Learning",
        "url": "https://www.kaggle.com/learn/intermediate-machine-learning"
      }
    ]
  },
  {
    "moduleCode": "S8",
    "duration": "~3 săptămâni",
    "intro": "Aici înveți uneltele de bază ale învățării supervizate: regresie liniară și logistică, Naïve Bayes, arbori de decizie, SVM. Supervizat înseamnă că ai exemple cu răspunsul corect (etichete) și modelul învață din ele. Nu te opri la cum le chemi din scikit-learn. Înțelege ce optimizează fiecare, adică ce greșeală încearcă să facă cât mai mică, și când se potrivește, pentru că asta te face să alegi bine la concurs.",
    "sections": [
      {
        "heading": "Ce înseamnă a antrena un model",
        "blocks": [
          {
            "p": "Pornește de la un exemplu. Vrei să ghicești prețul unei case doar din suprafața ei, cu regula preț = w · suprafață, unde w e un singur număr: câte mii de euro costă un metru pătrat. Ai trei case cu prețul cunoscut: 50 m² la 100 de mii de euro, 80 m² la 170 de mii și 100 m² la 200 de mii."
          },
          {
            "p": "Încearcă w = 1.5. Regula prezice 75, 120 și 150 de mii, deci greșește cu 25, 50 și 50, în total cu 125 de mii. Cu w = 2 prezice 100, 160 și 200, deci greșește cu 0, 10 și 0, în total doar cu 10 mii. Al doilea w e mult mai bun."
          },
          {
            "p": "Un model are niște parametri (numere interne, ca w de mai sus) pe care îi ajustează ca să greșească cât mai puțin pe exemplele de antrenare. Măsura greșelii se numește funcție de cost sau loss: în exemplu, greșeala totală de 125 sau de 10 mii. A antrena înseamnă a găsi parametrii care minimizează loss-ul, adică îl fac cât mai mic. Căutarea o face modelul: unele modele își calculează parametrii direct, altele îi îmbunătățesc pas cu pas, ca tine când ai trecut de la 1.5 la 2. Cum se aleg pașii vezi în Lecția 14."
          },
          {
            "p": "În scikit-learn tiparul e mereu același: creezi modelul, îl antrenezi cu `fit` pe datele de antrenare, apoi prezici cu `predict` pe date noi, ca la `Medie` din Lecția 3. Simplu la suprafață, dar sub capotă fiecare model face ceva diferit."
          },
          {
            "code": "from sklearn.linear_model import LogisticRegression\n\nmodel = LogisticRegression()\nmodel.fit(X_train, y_train)     # învață parametrii\ny_pred = model.predict(X_val)   # prezice pe date noi"
          },
          {
            "p": "`LogisticRegression` e unul dintre modelele din lecția asta, îl vezi mai jos. `X_train` e tabelul cu trăsăturile (features), adică coloanele de intrare, pentru rândurile de antrenare. `y_train` e ținta (target): răspunsurile pentru aceleași rânduri, în aceeași ordine. `X_val` sunt rândurile de validare (Lecția 5), cu răspunsurile ținute deoparte în `y_val`. `y_pred` („y prezis”) sunt predicțiile pentru `X_val`, pe care le compari apoi cu `y_val`."
          },
          {
            "p": "X e cu literă mare pentru că e un tabel, cu mai multe coloane, iar y cu literă mică pentru că e o singură coloană. E doar o convenție: în Lecția 6 le-ai văzut scurtate, `X_tr` și `y_tr`."
          }
        ]
      },
      {
        "heading": "Regresie liniară: prezici un număr",
        "blocks": [
          {
            "p": "Regresia liniară prezice o valoare continuă (un preț, o temperatură) ca o combinație liniară a trăsăturilor. Continuă înseamnă că poate ieși orice număr, cu zecimale cu tot. Combinație liniară înseamnă că înmulțești fiecare trăsătură cu un număr al ei, aduni rezultatele și mai adaugi un număr fix."
          },
          {
            "p": "De exemplu, preț = 1500 · suprafață + 20000 · camere + 10000, în euro. O casă de 60 m² cu 2 camere iese 1500 · 60 + 20000 · 2 + 10000 = 90000 + 40000 + 10000 = 140000 de euro."
          },
          {
            "p": "Regresia caută linia (sau planul, în mai multe dimensiuni) care trece cel mai bine prin date. Cu o singură trăsătură e o dreaptă, ca graficul lui f(x) = ax + b de la matematică. Fiecare casă e un punct (suprafață, preț), iar modelul caută dreapta care trece cât mai aproape de toate punctele. Cu două trăsături, punctele stau în spațiu și dreapta devine un plan, ca o foaie de hârtie ținută înclinat. Cu mai multe nu-l mai poți desena, dar calculul e același."
          },
          {
            "formula": "ŷ = w₁x₁ + w₂x₂ + ... + b",
            "explain": "ŷ (citit „y cu căciulă”) e predicția, iar y simplu e răspunsul adevărat. x₁, x₂ sunt trăsăturile, în exemplu suprafața și camerele. Fiecare trăsătură x are o greutate w care spune cât contează, aici 1500 și 20000. b e termenul liber, numărul adunat mereu, ca b din f(x) = ax + b, aici 10000. Modelul învață w-urile și b."
          },
          {
            "p": "Minimizează eroarea pătratică: suma pătratelor diferențelor dintre predicție și adevăr. La cele trei case de la început, cu w = 1.5, diferențele 25, 50 și 50, ridicate la pătrat, dau 625 + 2500 + 2500 = 5625. Cu w = 2, diferențele 0, 10 și 0 dau 0 + 100 + 0 = 100. Pătratul pedepsește greșelile mari mai tare: 50 e de 5 ori mai mult decât 10, dar 2500 e de 25 de ori mai mult decât 100."
          },
          {
            "code": "import numpy as np\nfrom sklearn.linear_model import LinearRegression\n\n# 4 case: suprafața (m²) și numărul de camere\nX = np.array([[50, 1], [60, 2], [80, 3], [100, 3]])\ny = np.array([105000, 140000, 190000, 220000])   # prețurile, în euro\n\nmodel = LinearRegression().fit(X, y)\nprint(model.coef_)                # [ 1500. 20000.]\nprint(round(model.intercept_))    # 10000\nprint(model.predict([[70, 2]]))   # [155000.]"
          },
          {
            "p": "Prețurile din `y` sunt calculate chiar cu regula de mai sus, iar `fit` o găsește singur. `coef_` sunt greutățile, în ordinea coloanelor, și `intercept_` e termenul liber. În scikit-learn, numele terminate cu `_` sunt lucruri învățate la `fit`. `round` doar curăță un 9999.99999 rămas din calcul. `[[70, 2]]` are două perechi de paranteze pentru că `predict` primește un tabel, aici cu un singur rând. Pe date reale punctele nu stau perfect pe un plan și greutățile ies aproximative."
          },
          {
            "p": "Un avantaj mare al regresiei liniare: coeficienții, adică greutățile w, se pot citi. Greutatea 20000 de la camere înseamnă că, la aceeași suprafață, fiecare cameră în plus adaugă 20000 de euro. Un w pozitiv mare înseamnă că trăsătura aia împinge predicția în sus, iar unul negativ o trage în jos."
          },
          {
            "p": "Atenție când compari greutăți între ele. Suprafața are doar 1500 față de 20000, dar asta nu înseamnă că contează mai puțin: un metru pătrat e o unitate mică, o cameră e una mare. Greutățile se compară corect doar când trăsăturile sunt pe aceeași scară, de exemplu după standardizarea din Lecția 5."
          }
        ]
      },
      {
        "heading": "Regresie logistică: prezici o clasă",
        "blocks": [
          {
            "p": "În ciuda numelui, regresia logistică e pentru clasificare, nu regresie. Ia un filtru de spam: fiecare email e spam (eticheta 1) sau normal (eticheta 0). Clasa pe care o cauți, aici spam, se numește clasa pozitivă."
          },
          {
            "p": "Modelul calculează întâi un scor z, cu aceeași combinație liniară ca regresia liniară. Scorul poate ieși orice număr, -7 sau 12, deci nu e o probabilitate. Regresia logistică îl trece printr-o funcție sigmoidă, care strânge orice număr în intervalul 0 până la 1. Rezultatul e o probabilitate: cât de sigur e modelul că exemplul e din clasa pozitivă. De exemplu, 0.9 înseamnă 90% șanse să fie spam."
          },
          {
            "formula": "σ(z) = 1 / (1 + e^(-z))",
            "explain": "Sigmoida: transformă scorul liniar z într-o probabilitate între 0 și 1. Numărul e valorează aproximativ 2.718 și e fix, ca π, iar e^(-z) înseamnă e la puterea -z."
          },
          {
            "p": "σ(0) = 1 / (1 + e^0) = 1 / (1 + 1) = 0.5, deci modelul e nehotărât. σ(2) = 1 / (1 + e^(-2)) ≈ 1 / (1 + 0.135) ≈ 0.88, pentru că e^(-2) = 1 / e² ≈ 0.135. La fel, σ(-2) ≈ 0.12. Cu cât scorul e mai mare, cu atât probabilitatea se apropie de 1, iar cu cât e mai negativ, cu atât se apropie de 0."
          },
          {
            "p": "Din probabilitate iei decizia cu un prag. Cu pragul 0.5, un email cu probabilitatea 0.88 e marcat spam, iar unul cu 0.12 rămâne normal. Pragul nu e obligatoriu 0.5. Dacă îți pasă mai mult să prinzi toate cazurile pozitive (recall mare), cobori pragul. Dacă vrei să fii sigur când spui pozitiv (precizie mare), îl urci. Pragul e un buton pe care îl reglezi după metrica problemei."
          },
          {
            "p": "Recall-ul e partea din spamurile adevărate pe care le prinzi, iar precizia e partea din emailurile marcate spam care chiar sunt spam. Cu pragul 0.3, ajunge la spam și un email cu 0.4. Prinzi mai mult spam, deci recall-ul crește, dar ajung acolo și câteva emailuri normale, deci precizia scade. Le calculezi exact în Lecția 8."
          },
          {
            "code": "m = LogisticRegression(max_iter=1000).fit(X_train, y_train)\nproba = m.predict_proba(X_val)[:, 1]   # probabilitatea clasei pozitive\npred = (proba > 0.3).astype(int)       # prag 0.3, pentru recall mai mare"
          },
          {
            "p": "`fit` întoarce chiar modelul, de aceea poți scrie `.fit(...)` imediat după ce îl creezi, ca la `Medie().fit(...)` în Lecția 3. Regresia logistică își caută parametrii pas cu pas, iar `max_iter` e numărul maxim de pași. Implicit sunt 100, uneori prea puțini: primești atunci un `ConvergenceWarning`, adică modelul n-a terminat de căutat. `max_iter=1000` îi dă de zece ori mai mulți. Dacă avertismentul apare și cu 1000, scalează trăsăturile (Lecția 5)."
          },
          {
            "p": "`predict_proba(X_val)` dă un tabel cu un rând pe email și două coloane: probabilitatea clasei 0 și a clasei 1, care adună 1 (de exemplu 0.19 și 0.81). `[:, 1]` ia toate rândurile, coloana 1, ca `x[:, 0]` din Lecția 4, deci probabilitatea de spam. `proba > 0.3` dă `True` sau `False` pe fiecare rând, iar `.astype(int)` face din `True` 1 și din `False` 0, adică etichete."
          }
        ]
      },
      {
        "heading": "Naïve Bayes: rapid și surprinzător de bun",
        "blocks": [
          {
            "p": "Rămâi la filtrul de spam. Din emailurile de antrenare numeri cât de des apare fiecare cuvânt în spam și cât de des în emailurile normale. De exemplu, „gratuit” apare în 40% din spamuri și în 5% din emailurile normale, iar „factură” în 10% din spamuri și în 20% din cele normale."
          },
          {
            "p": "Vine un email nou cu „gratuit” și „factură”. Modelul înmulțește dovezile cuvintelor, separat pentru fiecare clasă: pentru spam 0.40 · 0.10 = 0.04, pentru normal 0.05 · 0.20 = 0.01. Scorul de spam e de 4 ori mai mare, deci emailul are probabilitatea 0.04 / (0.04 + 0.01) = 0.8 să fie spam."
          },
          {
            "p": "Aici am presupus că jumătate din emailuri sunt spam. Dacă spamul e mai rar, înmulțești fiecare scor și cu cât de frecventă e clasa lui. Cu 20% spam și 80% emailuri normale, scorurile devin 0.2 · 0.04 = 0.008 și 0.8 · 0.01 = 0.008, iar emailul coboară la 50%. Regula asta, care pune la un loc cât de frecventă e o clasă și dovezile din cuvinte, e teorema lui Bayes."
          },
          {
            "p": "Naïve Bayes aplică teorema lui Bayes presupunând, naiv, că trăsăturile sunt independente între ele. Adică tratează fiecare cuvânt ca și cum n-ar avea legătură cu celelalte, și de aceea poate înmulți pur și simplu dovezile. În realitate, lângă „câștigat” apare des „premiu”, iar modelul numără aceeași dovadă de două ori."
          },
          {
            "p": "Presupunerea e aproape mereu falsă, dar modelul merge des foarte bine, mai ales pe text. E rapid, are nevoie de puține date, și e un baseline (reperul de la care pornești, Lecția 6) greu de bătut la clasificarea de documente."
          },
          {
            "p": "În scikit-learn, varianta pentru numărători de cuvinte e `MultinomialNB`: fiecare email devine un rând de numere care spun de câte ori apare în el fiecare cuvânt. Cum scoți automat aceste numere dintr-un text vezi în Lecția 12."
          },
          {
            "code": "from sklearn.naive_bayes import MultinomialNB\n\n# coloane: de câte ori apar gratuit, premiu, factură\nX = [[2, 1, 0], [3, 2, 0], [1, 1, 0], [0, 0, 2], [0, 1, 1], [0, 0, 3]]\ny = [1, 1, 1, 0, 0, 0]   # 1 = spam, 0 = normal\n\nnb = MultinomialNB().fit(X, y)\nprint(nb.predict([[1, 0, 0], [0, 0, 1]]))   # [1 0]",
            "caption": "Un email cu „gratuit” o dată iese spam, unul cu „factură” o dată iese normal."
          }
        ]
      },
      {
        "heading": "Arbori de decizie",
        "blocks": [
          {
            "p": "Un arbore de decizie pune întrebări simple, una după alta, ca un joc de 20 de întrebări: e vârsta peste 30? e venitul sub o valoare? La fiecare pas împarte datele ca să separe cât mai bine clasele."
          },
          {
            "p": "Fiecare întrebare stă într-un nod. Răspunsul, da sau nu, trimite rândul pe una din două ramuri, spre nodul următor. Unde nu mai sunt întrebări e o frunză, care dă predicția: clasa cea mai frecventă printre rândurile de antrenare ajunse acolo."
          },
          {
            "p": "Măsura separării e impuritatea Gini sau entropia: cât de amestecate sunt clasele într-un nod. Gini e 1 minus suma pătratelor proporțiilor fiecărei clase. Un nod cu 5 spamuri și 5 emailuri normale e cât se poate de amestecat: 1 - 0.5² - 0.5² = 0.5. Unul cu 10 spamuri și niciun email normal e pur: 1 - 1² - 0² = 0. Unul cu 8 spamuri și 2 normale e între ele: 1 - 0.8² - 0.2² = 1 - 0.64 - 0.04 = 0.32."
          },
          {
            "p": "La fiecare nod, arborele încearcă multe întrebări și o alege pe cea după care nodurile de dedesubt ies cât mai pure. Pornești, de exemplu, de la 5 spamuri și 5 normale (Gini 0.5). Întrebarea „conține «gratuit»?” poate trimite 4 spamuri și 1 normal pe da, iar 1 spam și 4 normale pe nu. Ambele noduri noi au Gini 0.32, deci amestecul a scăzut de la 0.5 la 0.32."
          },
          {
            "p": "Entropia măsoară același amestec cu altă formulă: tot 0 la un nod pur și maximă la jumătate-jumătate. Dă arbori foarte asemănători, iar scikit-learn folosește Gini dacă nu ceri altceva."
          },
          {
            "p": "Arborii sunt ușor de citit și nu au nevoie de scalare. Fiecare întrebare compară o singură coloană cu un prag, de exemplu „suprafața peste 70 m²?”. Cu suprafața în centimetri pătrați, pragul ar fi 700000, iar rândurile s-ar împărți exact la fel."
          },
          {
            "p": "Problema lor: lăsați să crească nelimitat, memorează antrenarea până la ultimul exemplu și generalizează prost, adică greșesc pe date noi. Un arbore fără limită pune întrebări până când fiecare frunză e pură, uneori cu un singur rând. Asta se numește overfitting (Lecția 1). Îl limitezi punând o adâncime maximă (câte întrebări pot veni una după alta) sau un minim de exemple pe frunză."
          },
          {
            "code": "from sklearn.tree import DecisionTreeClassifier\n\narbore = DecisionTreeClassifier(max_depth=4, min_samples_leaf=5)\narbore.fit(X_train, y_train)\nprint(arbore.score(X_train, y_train))   # acuratețea pe antrenare\nprint(arbore.score(X_val, y_val))       # acuratețea pe validare"
          },
          {
            "p": "`max_depth=4` permite cel mult 4 întrebări pe orice drum, iar `min_samples_leaf=5` cere cel puțin 5 rânduri de antrenare în fiecare frunză. `score` prezice pe tabelul primit și dă acuratețea față de răspunsuri. Setări ca acestea nu se învață din date, le alegi tu înainte de `fit`. Se numesc hiperparametri, ca să nu le confunzi cu parametrii pe care îi învață modelul."
          },
          {
            "note": "Un arbore care merge perfect pe antrenare și slab pe validare a memorat, n-a învățat. Semnul clasic de overfitting. Taie-i adâncimea."
          }
        ]
      },
      {
        "heading": "SVM: marginea cea mai mare",
        "blocks": [
          {
            "p": "Ia două trăsături ale unui email, de exemplu câte linkuri are și câte cuvinte cu majuscule. Fiecare email devine un punct în plan, iar spamurile și emailurile normale formează două grupuri. De obicei le pot despărți multe drepte, iar tu trebuie s-o alegi pe una."
          },
          {
            "p": "SVM (mașină cu vectori suport) caută granița dintre clase care lasă marginea cea mai mare de o parte și de alta, adică e cât mai departe de cele mai apropiate exemple din fiecare clasă. Ideea e că o graniță cu margine mare generalizează mai bine."
          },
          {
            "p": "Gândește-te la graniță ca la linia din mijlocul unui drum. SVM caută cel mai lat drum care încape între cele două grupuri, fără niciun punct pe el, iar marginea e lățimea drumului. Punctele de pe marginile drumului se numesc vectori suport: ele „susțin” drumul, iar fiecare punct e un rând de numere, adică un vector. Numai ele decid pe unde trece drumul. Un email nou care cade puțin spre celălalt grup tot rămâne pe partea bună a unui drum lat, pe când un drum îngust l-ar putea lăsa de partea greșită."
          },
          {
            "p": "Când datele nu se pot separa cu o linie dreaptă, intervine trucul kernel: proiectează datele într-un spațiu cu mai multe dimensiuni, unde devin separabile, fără să calculeze explicit acel spațiu."
          },
          {
            "p": "Cel mai simplu exemplu e pe o singură axă. Clasa A are punctele -1, 0 și 1, la mijloc, iar clasa B are punctele -3, -2, 2 și 3, de o parte și de alta. Nicio tăietură unică nu le desparte, pentru că B e și la stânga, și la dreapta lui A. Adaugă fiecărui punct a doua coordonată, x². A devine (-1, 1), (0, 0) și (1, 1), iar B devine (-3, 9), (-2, 4), (2, 4) și (3, 9). Acum dreapta orizontală y = 2.5 le desparte: A are y cel mult 1, B cel puțin 4."
          },
          {
            "p": "Adăugarea lui x² e chiar proiecția într-un spațiu cu mai multe dimensiuni. Trucul e că SVM nu are nevoie de coordonatele noi, ci doar de cât de asemănătoare sunt două puncte. Kernelul e o formulă care dă direct această asemănare, fără să construiască coordonatele noi."
          },
          {
            "p": "Kernelul RBF e cel mai folosit. Măsoară asemănarea după distanță: puncte apropiate au asemănarea aproape 1, puncte depărtate aproape 0. Cu el, granița se poate curba în jurul grupurilor de puncte."
          },
          {
            "p": "SVM cere date scalate ca să funcționeze bine, pentru că marginea și asemănarea se calculează din distanțe. Cu venitul în mii și vârsta în zeci, distanța ar depinde aproape numai de venit, exact problema rezolvată de scalare în Lecția 5."
          },
          {
            "code": "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.svm import SVC\n\nsvm = Pipeline([\n    (\"sc\", StandardScaler()),\n    (\"svm\", SVC(kernel=\"rbf\", C=1.0)),\n])\nsvm.fit(X_train, y_train)\npred = svm.predict(X_val)"
          },
          {
            "p": "Pipeline-ul din Lecția 6 leagă scalarea de model, ca `StandardScaler` să învețe media și deviația doar pe datele de antrenare. `SVC` e SVM-ul de clasificare din scikit-learn, iar `kernel=\"rbf\"` și `C=1.0` sunt chiar valorile implicite."
          },
          {
            "p": "În date reale grupurile se amestecă puțin, deci unele puncte ajung pe drum sau de partea greșită. `C` spune cât de tare le pedepsește modelul. Un `C` mic acceptă câteva greșeli ca să păstreze drumul lat. Un `C` mare vrea să nu greșească la niciun exemplu de antrenare, chiar cu un drum îngust, și riscă overfitting. Încearcă 0.1, 1 și 10 și compară-le pe validare."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Compară regresie logistică, arbore și SVM pe aceeași problemă tabelară, cu aceeași metrică."
      },
      {
        "title": "Mișcă pragul regresiei logistice de la 0.5 în jos și urmărește cum crește recall-ul și scade precizia (le măsori cu recall_score și precision_score din sklearn.metrics)."
      },
      {
        "title": "Limitează adâncimea unui arbore și vezi cum se apropie scorul de antrenare de cel de validare."
      }
    ]
  },
  {
    "moduleCode": "S11",
    "duration": "~2 săptămâni",
    "intro": "Aici se câștigă sau se pierde concursul. Un model care pare bun pe clasamentul public poate fi slab pe cel ascuns (clasamentul privat din Lecția 2), care contează la final. Modulul ăsta e despre cum să ai încredere justificată în scorul tău. E cea mai puțin spectaculoasă parte și cea care face diferența dintre un top 10 și un mijloc de clasament.",
    "sections": [
      {
        "heading": "De ce acuratețea te minte",
        "blocks": [
          {
            "p": "Acuratețea e procentul de predicții corecte. Sună rezonabil, dar pe clase dezechilibrate (o clasă mult mai rară decât cealaltă, Lecția 5) e înșelătoare. Dacă 98% din exemple sunt clasa „nu”, un model care spune mereu „nu” are 98% acuratețe și zero valoare: nu găsește niciodată cazurile pe care le cauți. De asta ai nevoie de metrici care se uită la fiecare clasă separat."
          }
        ]
      },
      {
        "heading": "Matricea de confuzie: temelia",
        "blocks": [
          {
            "p": "Matricea de confuzie e un tabel de 2 pe 2 care numără cele patru feluri de rezultat pentru o clasificare binară, adică cu două clase. E baza din care se calculează toate celelalte metrici, deci merită înțeleasă bine."
          },
          {
            "p": "Una dintre clase e cea pe care o cauți, de exemplu spam: ea e clasa pozitivă, iar emailurile normale sunt clasa negativă (ca la regresia logistică din Lecția 7). În fiecare nume de mai jos, a doua parte spune ce ai prezis, iar prima dacă ai avut dreptate."
          },
          {
            "list": [
              "TP (adevărat pozitiv): era pozitiv, ai zis pozitiv. Corect.",
              "TN (adevărat negativ): era negativ, ai zis negativ. Corect.",
              "FP (fals pozitiv): era negativ, ai zis pozitiv. Alarmă falsă.",
              "FN (fals negativ): era pozitiv, ai zis negativ. L-ai ratat."
            ]
          },
          {
            "p": "Un exemplu. Din 100 de emailuri, 10 sunt spam. Modelul marchează 12 ca spam, iar dintre ele 8 chiar sunt. Deci TP = 8 (spamuri prinse), FP = 4 (emailuri normale marcate greșit), FN = 2 (spamuri scăpate) și TN = 86 (emailuri normale lăsate în pace), care adună 100. Acuratețea e (8 + 86) / 100 = 0.94, deși modelul ratează un spam din cinci."
          },
          {
            "code": "import numpy as np\nfrom sklearn.metrics import confusion_matrix\n\n# 100 de emailuri: 1 = spam, 0 = normal\ny_true = np.array([1] * 10 + [0] * 90)\n# modelul prinde 8 spamuri, ratează 2 și dă 4 alarme false\ny_pred = np.array([1] * 8 + [0] * 2 + [1] * 4 + [0] * 86)\n\nprint(confusion_matrix(y_true, y_pred))\n# [[86  4]\n#  [ 2  8]]"
          },
          {
            "p": "`[1] * 10` e o listă cu zece de 1, iar `+` lipește listele una după alta, deci `y_true` are întâi cele 10 spamuri, apoi cele 90 de emailuri normale. `y_pred` are predicțiile, în aceeași ordine. În rezultat, rândurile sunt răspunsurile adevărate și coloanele predicțiile, întâi clasa 0, apoi clasa 1. Deci sus-stânga e TN, sus-dreapta FP, jos-stânga FN și jos-dreapta TP."
          },
          {
            "p": "Ce te doare mai tare depinde de problemă. La un test de boală, un fals negativ (bolnav trimis acasă) e mai grav decât un fals pozitiv. La un filtru de spam, invers: un email important mutat la spam te costă mai mult decât o reclamă scăpată în inbox. Metrica bună reflectă ce cost real are fiecare tip de greșeală."
          }
        ]
      },
      {
        "heading": "Precizie, recall, F1",
        "blocks": [
          {
            "formula": "precizie = TP / (TP + FP)",
            "explain": "Din câte ai zis că sunt pozitive, câte chiar erau. Precizie mare = puține alarme false. În exemplu: 8 / (8 + 4) = 8 / 12 ≈ 0.67."
          },
          {
            "formula": "recall = TP / (TP + FN)",
            "explain": "Din câte erau de fapt pozitive, câte ai prins. Recall mare = ratezi puține. În exemplu: 8 / (8 + 2) = 0.8."
          },
          {
            "p": "Precizia și recall-ul trag în direcții opuse. Dacă spui pozitiv doar când ești foarte sigur, precizia crește dar recall-ul scade. Dacă spui pozitiv des, invers. Exact asta reglezi cu pragul din Lecția 7. F1 le împacă într-un singur număr, media lor armonică, care e mică dacă oricare din ele e mică."
          },
          {
            "formula": "F1 = 2 · (precizie · recall) / (precizie + recall)",
            "explain": "Media armonică. Pedepsește dezechilibrul: nu poți avea F1 mare cu recall minuscul. În exemplu: 2 · (0.67 · 0.8) / (0.67 + 0.8) ≈ 0.73."
          },
          {
            "p": "Media obișnuită ar ascunde problema. Un model care marchează spam un singur email, de care e absolut sigur, și nimerește, are precizia 1.0. Din cele 10 spamuri a prins însă unul, deci recall-ul e 0.1. Media obișnuită ar da (1.0 + 0.1) / 2 = 0.55, un scor care pare decent pentru un model aproape inutil. F1 dă 2 · (1.0 · 0.1) / (1.0 + 0.1) ≈ 0.18."
          },
          {
            "code": "from sklearn.metrics import classification_report\n\nprint(classification_report(y_true, y_pred))\n#               precision    recall  f1-score   support\n#\n#            0       0.98      0.96      0.97        90\n#            1       0.67      0.80      0.73        10\n#\n#     accuracy                           0.94       100\n#    macro avg       0.82      0.88      0.85       100\n# weighted avg       0.95      0.94      0.94       100"
          },
          {
            "p": "`classification_report` face toate calculele deodată, pe `y_true` și `y_pred` de mai sus. Rândul 1 e clasa spam: 0.67, 0.80 și 0.73, exact ce ai calculat de mână. Rândul 0 face aceleași calcule cu emailurile normale pe post de clasă pozitivă. `support` e câte rânduri din fiecare clasă sunt în date. `accuracy` e acuratețea de 0.94 de mai sus, iar ultimele două rânduri sunt două feluri de a face media pe clase."
          },
          {
            "p": "La fel calculezi și cu mai mult de două clase: câte un F1 pentru fiecare clasă, tratată pe rând drept clasa pozitivă, apoi o medie. Ia 100 de poze, cu 80 de câini, 15 iepuri și 5 papagali, și un model cu F1 0.9 pe câini, 0.6 pe iepuri și 0.2 pe papagali. Media simplă, macro-F1, e (0.9 + 0.6 + 0.2) / 3 ≈ 0.57. Media ponderată, weighted-F1, înmulțește fiecare F1 cu partea din date a clasei: 0.8 · 0.9 + 0.15 · 0.6 + 0.05 · 0.2 = 0.82. Papagalii trag macro-F1 în jos, dar în weighted-F1 abia se simt."
          },
          {
            "note": "Când ai multe clase, F1 se agregă. Macro-F1 face media pe clase tratându-le egal (bun când îți pasă de clasele rare). Weighted-F1 ține cont de mărimea fiecărei clase. În `f1_score` le alegi cu `average=\"macro\"` sau `average=\"weighted\"`, ca în Lecția 6. Citește în regulament care se punctează și optimizează exact pe aia."
          }
        ]
      },
      {
        "heading": "Validare fără scurgeri",
        "blocks": [
          {
            "p": "O scurgere de date (data leakage) e când, fără să vrei, informație din datele pe care evaluezi (validare sau test) ajunge în antrenare. Rezultatul: scor local grozav care se prăbușește pe clasamentul real. E cel mai perfid mod de a pierde puncte, pentru că totul pare în regulă. Câteva exemple des întâlnite:"
          },
          {
            "list": [
              "Scalarea sau imputarea învățată pe toate rândurile, înainte de împărțire. Media din `StandardScaler` conține deja valori din validare, deci modelul a „văzut” ceva din ea (Lecția 5).",
              "Același pacient în antrenare și în validare. Dacă are cinci vizite, trei ajung în antrenare și două în validare, iar modelul învață să recunoască pacientul, nu boala. Pe pacienți noi, scorul cade.",
              "O coloană calculată din răspuns. Prezici dacă un client își va închide contul, iar o coloană e data închiderii: există doar la cei care au plecat, deci îi dă modelului răspunsul."
            ]
          },
          {
            "p": "Aperi-te împărțind datele corect. Ține un set de validare pe care modelul nu-l vede la antrenare și pe care îl folosești ca să estimezi scorul real."
          },
          {
            "p": "Mai bine, folosește k-fold: împarți datele în k părți, antrenezi pe k-1 și testezi pe una, rotind, apoi mediezi. Fiecare parte se numește fold. Cu k = 5 și 100 de rânduri, fiecare fold are 20. În prima rundă antrenezi pe fold-urile 2, 3, 4 și 5 (80 de rânduri) și măsori pe fold-ul 1. În a doua antrenezi pe 1, 3, 4, 5 și măsori pe 2, și tot așa, de cinci ori. Fiecare rând ajunge exact o dată în validare, iar la final faci media celor 5 scoruri."
          },
          {
            "p": "Așa folosești toate datele și ai o estimare mai stabilă. Cu o singură validare de 20 de rânduri, scorul depinde mult de ce rânduri au nimerit acolo, iar media a cinci scoruri depinde mai puțin de noroc."
          },
          {
            "p": "Când clasele sunt dezechilibrate, folosește k-fold stratificat, care păstrează proporția claselor în fiecare fold. Altfel un fold poate să nu conțină deloc clasa rară. Cu 10 spamuri în 100 de rânduri, varianta stratificată pune exact 2 spamuri în fiecare fold de 20, ca `stratify` din Lecția 6. O împărțire la întâmplare poate da, de exemplu, 4 spamuri într-un fold și niciunul în altul."
          },
          {
            "p": "Când datele au timp sau grupuri (același pacient în mai multe rânduri), split-ul trebuie să le respecte, altfel modelul trage cu ochiul. Adică vede la antrenare ceva ce nu va avea când prezice de-adevăratelea, ca un elev care a zărit subiectele înainte de test. La grupuri, toate rândurile unui pacient merg în același fold. La date în timp, antrenezi pe trecut și validezi pe ce urmează, cum va lucra și modelul în realitate. În scikit-learn ai `GroupKFold` pentru grupuri (coloana cu pacientul o dai prin argumentul `groups`) și `TimeSeriesSplit` pentru timp."
          },
          {
            "code": "from sklearn.model_selection import StratifiedKFold, cross_val_score\ncv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)\nscoruri = cross_val_score(model, X, y, cv=cv, scoring=\"f1_macro\")\nprint(scoruri.mean(), scoruri.std())"
          },
          {
            "p": "`StratifiedKFold(n_splits=5, ...)` pregătește împărțirea în 5 fold-uri stratificate. `shuffle=True` amestecă rândurile înainte, ca fold-urile să nu urmeze ordinea din fișier, iar `random_state=0` face amestecarea la fel la fiecare rulare (Lecția 6). La date în timp nu amesteca: acolo ordinea contează."
          },
          {
            "p": "`cross_val_score` face singur cele 5 runde. Primește modelul, toate datele de antrenare, `X` și `y` (validarea o fac fold-urile, nu o mai separi tu), împărțirea din `cv` și metrica din `scoring`, aici F1 macro. Dacă `model` e un Pipeline (Lecția 6), scalarea se învață din nou în fiecare rundă, doar pe fold-urile de antrenare, deci nu se scurge nimic."
          },
          {
            "p": "Întoarce un array cu 5 scoruri, câte unul pe fold. `mean()` e media lor, scorul tău estimat. `std()` e deviația standard (σ de la standardizare, Lecția 5): cât de mult variază scorurile de la un fold la altul. Scorurile 0.81, 0.79, 0.83, 0.80 și 0.82 au media 0.81 și deviația 0.014, deci estimarea e stabilă. Scorurile 0.60, 0.95, 0.70, 0.88 și 0.92 au tot media 0.81, dar deviația 0.14: acolo, o diferență de 0.01 între două modele poate fi doar noroc."
          }
        ]
      },
      {
        "heading": "Bias, varianță și curba de învățare",
        "blocks": [
          {
            "p": "Două boli opuse, pe care le-ai întâlnit în Lecția 1. Bias mare (underfitting): modelul e prea simplu, merge slab și pe antrenare, și pe validare. Varianță mare (overfitting): modelul e prea complex, merge grozav pe antrenare dar slab pe validare, pentru că a memorat."
          },
          {
            "p": "Cu arborii din Lecția 7: unul cu o singură întrebare poate avea scorul 0.70 pe antrenare și 0.68 pe validare, adică bias. Unul fără limită de adâncime poate avea 1.00 pe antrenare și 0.75 pe validare, adică varianță."
          },
          {
            "p": "Curba de învățare le diagnostichează: desenezi scorul de antrenare și cel de validare pe măsură ce crești datele. Concret, antrenezi modelul pe tot mai multe rânduri, de exemplu 80, 200, 400, 600 și 800, și de fiecare dată măsori ambele scoruri. Pe axa x pui câte rânduri de antrenare ai folosit, pe axa y scorul, și ies două linii. De obicei, cea de antrenare coboară puțin (multe exemple se memorează mai greu), iar cea de validare urcă (modelul a văzut mai multe cazuri)."
          },
          {
            "p": "Dacă amândouă sunt joase și apropiate, ai bias, îți trebuie un model mai complex, de exemplu un arbore mai adânc. Dacă e o prăpastie mare între ele, ai varianță, îți trebuie mai multe date sau regularizare. Regularizarea e orice limită pusă modelului ca să nu poată memora: la arbori, `max_depth` e o formă de regularizare, iar la rețele neuronale o vezi în Lecția 15."
          },
          {
            "code": "import matplotlib.pyplot as plt\nfrom sklearn.model_selection import learning_curve\n\nmarimi, sc_train, sc_val = learning_curve(\n    model, X, y, cv=5, scoring=\"f1_macro\",\n    train_sizes=[0.1, 0.25, 0.5, 0.75, 1.0],\n)\nplt.plot(marimi, sc_train.mean(axis=1), label=\"antrenare\")\nplt.plot(marimi, sc_val.mean(axis=1), label=\"validare\")\nplt.xlabel(\"rânduri de antrenare\")\nplt.ylabel(\"F1 macro\")\nplt.legend()\nplt.show()"
          },
          {
            "p": "`learning_curve` face singur antrenările. Pentru fiecare valoare din `train_sizes` folosește acea parte din rândurile de antrenare (10%, 25% și așa mai departe) și rulează un k-fold cu `cv=5`. Cu 1000 de rânduri, fiecare rundă are 800 de rânduri de antrenare, deci mărimile ies 80, 200, 400, 600 și 800. Întoarce trei lucruri: mărimile, apoi scorurile pe antrenare și pe validare, câte unul pentru fiecare mărime și fiecare fold. `mean(axis=1)` face media pe fold-uri pentru fiecare mărime (Lecția 4)."
          },
          {
            "p": "`label` dă numele fiecărei linii, iar `plt.legend()` le afișează. Cele două `plt.plot` înainte de un singur `plt.show()` desenează liniile pe același grafic, exact ce vrei aici."
          }
        ]
      },
      {
        "heading": "Cele două submisii finale",
        "blocks": [
          {
            "p": "La ONIA alegi la fiecare problemă două submisii, și doar ele intră în clasamentul final (Lecția 2)."
          },
          {
            "note": "Regula de aur: la final alege conștient cele două submisii. Una pe scorul tău local (validarea, de exemplu media din k-fold) cel mai bun, una pe clasamentul public cel mai bun. Dacă local și public sunt de acord, ai încredere. Dacă diferă mult, ai o scurgere sau un split prost. Nu lăsa submisiile finale pe ultimele trimise din reflex."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Desenează o curbă de învățare și decide dacă modelul suferă de bias sau de varianță."
      },
      {
        "title": "Găsește o scurgere de date într-un pipeline dat și repar-o."
      },
      {
        "title": "Calculează manual precizie, recall și F1 dintr-o matrice de confuzie dată."
      }
    ]
  },
  {
    "moduleCode": "S13",
    "duration": "~1 săptămână",
    "intro": "De multe ori câștigătorul la o problemă tabelară e un ensemble, nu un singur model. Un ensemble e un grup de modele care prezic împreună. Ideea e simplă: mai multe modele împreună greșesc mai puțin decât unul singur, cu condiția să greșească în locuri diferite. Modulul ăsta îți dă cele două rețete mari, bagging și boosting, și disciplina de a regla setările modelelor fără să te pierzi.",
    "sections": [
      {
        "heading": "De ce funcționează combinarea",
        "blocks": [
          {
            "p": "Trei modele, A, B și C, spun despre cinci emailuri dacă sunt spam sau normale. Fiecare greșește la un singur email, dar fiecare la altul. La vot, pentru fiecare email câștigă răspunsul dat de cel puțin două modele din trei."
          },
          {
            "list": [
              "Emailul 1, spam: A zice normal, B și C zic spam. Votul: spam.",
              "Emailul 2, normal: toate trei zic normal.",
              "Emailul 3, spam: B zice normal, A și C zic spam. Votul: spam.",
              "Emailul 4, normal: toate trei zic normal.",
              "Emailul 5, spam: C zice normal, A și B zic spam. Votul: spam."
            ]
          },
          {
            "p": "Fiecare model nimerește 4 emailuri din 5, adică are acuratețe 80%. Votul le nimerește pe toate 5."
          },
          {
            "p": "Dacă ai trei modele care greșesc fiecare în alte locuri, votul majorității e mai bun decât oricare singur: acolo unde unul se înșeală, celelalte două îl corectează. Cheia e diversitatea. Trei modele care fac exact aceleași greșeli nu ajută cu nimic combinate: dacă toate trei ar fi zis normal la emailul 1, votul ar fi greșit și el."
          },
          {
            "p": "Sunt două moduri mari de a construi diversitate: bagging (antrenezi modele în paralel pe date ușor diferite și le mediezi) și boosting (antrenezi modele pe rând, fiecare reparând greșelile celui dinainte)."
          }
        ]
      },
      {
        "heading": "Bagging și Random Forest",
        "blocks": [
          {
            "p": "Bagging înseamnă că antrenezi fiecare model pe un eșantion aleator (cu repetiție) din date, apoi mediezi predicțiile. Eșantionul are tot atâtea rânduri câte are setul de antrenare, trase la sorți unul câte unul: după fiecare tragere, rândul se pune înapoi, deci poate ieși din nou. Din rândurile [A, B, C, D, E] poate ieși [B, B, D, A, E]: B apare de două ori, C lipsește. Așa, fiecare model vede alte date."
          },
          {
            "p": "„Mediezi predicțiile” înseamnă, la numere, chiar media: dacă trei arbori zic 90, 100 și 110, predicția e 100. La clase, numeri voturile, ca la emailuri, sau faci media probabilităților (Lecția 7)."
          },
          {
            "p": "Un singur arbore adânc are varianță mare (overfit): schimbi puțin datele de antrenare și dă alte predicții, pentru că a învățat pe de rost și ciudățeniile lor (Lecțiile 1 și 8). Dar arborii greșesc fiecare în felul lui. Dacă o casă costă 100 și cinci arbori zic 120, 85, 95, 110 și 95, fiecare greșește cu 5 până la 20, dar media lor, 101, greșește cu 1. Mediind mulți arbori antrenați pe date diferite, varianța scade fără să crească biasul (eroarea din presupuneri prea simple)."
          },
          {
            "p": "Random Forest (pădure aleatoare) e bagging pe arbori, cu un truc în plus: la fiecare împărțire, arborele alege dintr-un subset aleator de trăsături (features, adică coloanele de intrare). La fiecare întrebare de tipul „e vârsta peste 30?” (Lecția 7), arborele se uită doar la câteva coloane trase la sorți: din 16 coloane, `RandomForestClassifier` trage implicit 4 (radical din 16). Asta îi face pe arbori și mai diferiți între ei: fără truc, dacă o coloană e mult mai bună decât restul, toți arborii ar începe cu ea. E robust, greu de stricat, și un prim model excelent pe date tabelare."
          },
          {
            "code": "from sklearn.ensemble import RandomForestClassifier\nrf = RandomForestClassifier(n_estimators=400, max_depth=None, n_jobs=-1)\nrf.fit(X_train, y_train)"
          },
          {
            "p": "`n_estimators=400` înseamnă 400 de arbori. `max_depth=None` înseamnă fără limită de adâncime: fiecare arbore își învață eșantionul aproape pe de rost, iar media îi repară overfitting-ul. `n_jobs` e câte nuclee ale procesorului lucrează deodată, iar -1 înseamnă toate, deci arborii se antrenează în paralel, mai repede. Cu `random_state=42` (Lecția 6), pădurea iese la fel la fiecare rulare."
          },
          {
            "p": "Feature importance (importanța trăsăturilor) spune cât s-a sprijinit modelul pe fiecare coloană: cât au ajutat întrebările puse pe ea să separe clasele, în medie pe toți arborii. O găsești în `feature_importances_`, un număr pe coloană, în ordinea coloanelor, iar numerele adună 1."
          },
          {
            "code": "import numpy as np\nimport pandas as pd\nfrom sklearn.ensemble import RandomForestClassifier\n\nnp.random.seed(0)\nelevi = pd.DataFrame({\n    \"id\": np.arange(200),                    # numărul rândului\n    \"nota\": np.random.randint(1, 11, 200),   # de la 1 la 10\n})\nzar = np.random.randint(1, 7, 200)           # de la 1 la 6\npromovat = (elevi[\"nota\"] + zar >= 9).astype(int)\n\nrf = RandomForestClassifier(random_state=0).fit(elevi, promovat)\nprint(rf.feature_importances_.round(2))      # [0.4 0.6]"
          },
          {
            "p": "Aici ținta depinde doar de notă și de noroc: promovat e 1 dacă nota plus un zar dau cel puțin 9. Coloana id e doar numărul rândului și nu spune nimic despre țintă, dar primește 0.4 din importanță. Are 200 de valori diferite, deci arborii găsesc mereu pe ea un prag care mai desparte câteva rânduri, chiar dacă e pură întâmplare."
          },
          {
            "note": "Feature importance de la Random Forest e util, dar nu îl crede orbește: favorizează trăsăturile cu multe valori distincte. Folosește-l ca indiciu, nu ca adevăr."
          }
        ]
      },
      {
        "heading": "Boosting: XGBoost și LightGBM",
        "blocks": [
          {
            "p": "Boosting construiește arbori pe rând. Primul face o predicție aproximativă, al doilea învață să corecteze greșelile primului, al treilea greșelile rămase, și tot așa. Fiecare arbore e mic, dar împreună dau un model foarte bun. E des câștigătorul la probleme tabelare."
          },
          {
            "p": "Ia o casă care costă 100 (de mii de euro). Primul pas dă o estimare grosieră, de obicei media prețurilor, să zicem 80. Al doilea arbore nu mai învață prețul, ci greșeala rămasă: 100 - 80 = 20."
          },
          {
            "p": "Boosting nu adaugă toată corecția, ci doar o parte din ea, iar partea asta se numește learning rate (rata de învățare). Cu learning rate 0.1 adaugi 0.1 · 20 = 2 și ajungi la 82. Al treilea arbore învață ce a rămas, 18, și adaugă 1.8, deci 83.8. Al patrulea învață 16.2 și adaugă 1.62, deci 85.42. Fiecare arbore închide o zecime din distanța rămasă."
          },
          {
            "p": "Pașii sunt mici pentru că fiecare arbore învață și din zgomotul datelor de antrenare (Lecția 1), deci corecția lui e puțin greșită. Cu pași mici, greșeala unui arbore contează puțin, iar următorii o repară. Prețul e timpul: îți trebuie mai mulți arbori."
          },
          {
            "p": "Cu prea mulți arbori, ultimii învață doar zgomot: scorul pe antrenare tot crește, dar cel pe validare se oprește și apoi scade (overfitting). Early stopping (oprire timpurie) înseamnă că, după fiecare arbore nou, verifici scorul pe validare și te oprești când nu se mai îmbunătățește câteva runde la rând."
          },
          {
            "p": "Varianta folosită în practică se numește gradient boosting. XGBoost și LightGBM sunt implementările rapide și de referință. De obicei scot scoruri mai bune decât Random Forest, dar sunt și mai ușor de dus în overfitting, deci cer reglare atentă. Nu vin cu scikit-learn: le instalezi cu `pip install xgboost lightgbm` și le folosești la fel, cu `fit` și `predict` (`XGBClassifier`, `LGBMClassifier`). Verifică întâi regulamentul concursului: nu la orice etapă sunt permise bibliotecile externe."
          },
          {
            "p": "Dacă nu ai voie cu ele, scikit-learn are varianta lui, `HistGradientBoostingClassifier`, inspirată din LightGBM și rapidă pe date mari. Are și early stopping."
          },
          {
            "code": "from sklearn.ensemble import HistGradientBoostingClassifier\n\nhgb = HistGradientBoostingClassifier(\n    learning_rate=0.1,\n    max_iter=1000,            # cel mult 1000 de arbori\n    early_stopping=True,\n    validation_fraction=0.1,\n    n_iter_no_change=10,\n    random_state=0,\n)\nhgb.fit(X_train, y_train)\nprint(hgb.n_iter_)            # câți arbori a construit până s-a oprit"
          },
          {
            "p": "`learning_rate=0.1` e pasul din exemplul cu casa, iar `max_iter` e numărul maxim de arbori (în alte biblioteci, `n_estimators`). Cu `early_stopping=True`, modelul pune deoparte 10% din X_train ca validare (`validation_fraction=0.1`) și se oprește după 10 arbori la rând fără progres pe ea (`n_iter_no_change=10`). `random_state=0` alege aceeași bucată de validare la fiecare rulare. După `fit`, `n_iter_` îți spune câți arbori a construit, de multe ori mult sub 1000."
          }
        ]
      },
      {
        "heading": "Reglarea hiperparametrilor, în ordine",
        "blocks": [
          {
            "p": "Hiperparametrii sunt setările pe care le alegi tu înainte de antrenare (câți arbori, cât de adânci), spre deosebire de parametrii pe care modelul îi învață singur. Ai văzut deja câțiva: `n_estimators`, `max_depth`, `learning_rate`. Greșeala clasică e să reglezi zeci deodată și să nu mai știi ce a ajutat. Mergi în ordine, un lucru pe rând, și după fiecare schimbare notează scorul pe validare. Ordinea de mai jos e pentru boosting."
          },
          {
            "steps": [
              "Pornește cu un learning rate mic-moderat (0.05 sau 0.1) și un număr rezonabil de arbori (câteva sute).",
              "Reglează întâi adâncimea arborilor (complexitatea fiecăruia): încearcă, de exemplu, 3, 5 și 8 niveluri.",
              "Apoi numărul de arbori (`n_estimators`), cu early stopping pe validare: modelul se oprește singur, iar tu reții câți arbori a folosit.",
              "La final, coboară learning rate-ul și crește numărul de arbori proporțional, pentru un plus de scor: de la 0.1 cu 300 de arbori, de exemplu, treci la 0.05 cu 600."
            ]
          },
          {
            "note": "Learning rate mic plus mai mulți arbori dă aproape mereu un scor mai bun decât learning rate mare, dar antrenează mai lent. E compromisul clasic timp contra scor."
          }
        ]
      },
      {
        "heading": "Voting și stacking",
        "blocks": [
          {
            "p": "Cel mai simplu ensemble între modele diferite e votul: pui un Random Forest, un boosting și o regresie logistică să voteze, sau le mediezi probabilitățile. Merge cel mai bine când modelele sunt de tipuri diferite, deci greșesc diferit."
          },
          {
            "p": "Probabilitatea (Lecția 7, `predict_proba`) e un număr între 0 și 1: cât de sigur e modelul. Votul și media pot da răspunsuri diferite. Pentru un email, cele trei modele dau probabilitatea de spam 0.9, 0.4 și 0.45. La vot, fiecare model zice spam doar dacă probabilitatea lui trece de 0.5, deci un vot e pentru spam și două pentru normal: câștigă normal. La medie, (0.9 + 0.4 + 0.45) / 3 ≈ 0.58, peste 0.5, deci spam: un model foarte sigur cântărește mai mult decât doi nehotărâți."
          },
          {
            "code": "from sklearn.ensemble import VotingClassifier\nfrom sklearn.linear_model import LogisticRegression\n\nvot = VotingClassifier(\n    estimators=[\n        (\"rf\", RandomForestClassifier(n_estimators=300, random_state=0)),\n        (\"hgb\", HistGradientBoostingClassifier(random_state=0)),\n        (\"lr\", LogisticRegression(max_iter=1000)),\n    ],\n    voting=\"soft\",   # media probabilităților\n)\nvot.fit(X_train, y_train)\npred = vot.predict(X_val)"
          },
          {
            "p": "`estimators` e o listă de perechi (nume, model), tupluri ca în Lecția 3, cu nume alese de tine. `voting=\"soft\"` face media probabilităților, iar `voting=\"hard\"` numără voturile. De obicei soft merge puțin mai bine. `fit` le antrenează pe toate trei, iar `predict` combină răspunsurile. Dacă regresia logistică dă un ConvergenceWarning, scalează întâi datele (Lecția 5)."
          },
          {
            "p": "Stacking merge mai departe: antrenează un model final care învață cum să combine predicțiile celorlalte. Trăsăturile lui sunt predicțiile modelelor de bază, adică ale celor pe care le combini (probabilitatea de spam dată de Random Forest, cea dată de boosting), iar ținta e eticheta adevărată. Așa poate învăța, de exemplu, că boosting-ul are dreptate mai des. Poate scoate un scor mai bun decât votul, dar te duce mai ușor la scurgeri de date (data leakage, Lecția 8) dacă nu folosești predicții out-of-fold."
          },
          {
            "p": "Predicțiile out-of-fold („din afara fold-ului”) folosesc k-fold-ul din Lecția 8. Împarți datele de antrenare în 5 părți, antrenezi modelele de bază pe părțile 2, 3, 4 și 5 și prezici pe partea 1, apoi faci la fel pentru fiecare parte. Așa, fiecare rând primește o predicție de la modele care nu l-au văzut la antrenare."
          },
          {
            "p": "Fără asta, modelele de bază ar prezice pe rândurile pe care s-au antrenat, iar predicțiile ar ieși prea bune: un Random Forest cu arbori adânci nimerește aproape tot ce a văzut. Modelul final ar învăța să aibă încredere oarbă în ele și ar greși pe test, unde predicțiile sunt mai slabe."
          },
          {
            "code": "from sklearn.ensemble import StackingClassifier\n\nstack = StackingClassifier(\n    estimators=[\n        (\"rf\", RandomForestClassifier(n_estimators=300, random_state=0)),\n        (\"hgb\", HistGradientBoostingClassifier(random_state=0)),\n    ],\n    final_estimator=LogisticRegression(max_iter=1000),\n    cv=5,   # predicții out-of-fold, cu 5 părți\n)\nstack.fit(X_train, y_train)\npred = stack.predict(X_val)"
          },
          {
            "p": "`final_estimator` e modelul care învață să le combine, iar `cv=5` face predicțiile out-of-fold cu 5 părți. La final, scikit-learn reantrenează modelele de bază pe tot X_train, ca să poată prezice pe date noi. Începe cu voting simplu, treci la stacking doar dacă ai timp."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Antrenează un Random Forest și un gradient boosting (de exemplu HistGradientBoostingClassifier) pe aceeași problemă și compară scorurile."
      },
      {
        "title": "Fă un voting între trei modele diferite și vezi dacă bate cel mai bun singur model."
      },
      {
        "title": "Reglează learning rate-ul cu early stopping și observă compromisul timp contra scor."
      }
    ]
  },
  {
    "moduleCode": "S14",
    "duration": "~1 săptămână",
    "intro": "Nu toate problemele au etichete, adică răspunsul corect pentru fiecare rând. Uneori vrei doar să vezi structura din date: grupuri naturale, outlieri (valori ieșite din tipar, Lecția 5), o proiecție în două dimensiuni pe care s-o poți desena. Asta e învățarea nesupervizată: modelul găsește tipare fără să i se spună răspunsul corect. E utilă și de sine stătător, și ca pas de pregătire înainte de un model supervizat.",
    "sections": [
      {
        "heading": "Supervizat vs nesupervizat",
        "blocks": [
          {
            "p": "La supervizat aveai perechi (exemplu, etichetă) și învățai să prezici eticheta. La nesupervizat ai doar exemplele, fără răspuns. Modelul caută singur structură: care puncte seamănă între ele, pe ce direcții variază datele cel mai mult. Nu poți măsura corectitudinea la fel de simplu, pentru că nu ai cu ce compara."
          },
          {
            "p": "Un exemplu: un magazin online știe, pentru fiecare client, câți lei a cheltuit luna asta și de câte ori a cumpărat, dar nicio coloană nu spune ce fel de client e. Un algoritm nesupervizat poate găsi singur grupuri, de exemplu clienți care cumpără des și puțin și clienți care cumpără rar și mult. Asta e clustering-ul din Lecția 1."
          },
          {
            "p": "Ca în Lecția 5, fiecare rând e un punct, iar două rânduri care seamănă sunt două puncte apropiate. Distanța dintre ele se calculează cu teorema lui Pitagora, ca acolo: aduni pătratele diferențelor de pe fiecare coloană și scoți radical."
          }
        ]
      },
      {
        "heading": "K-Means: grupare pe centre",
        "blocks": [
          {
            "p": "K-Means împarte datele în k grupuri, fiecare cu un centru. Centrul unui grup e media punctelor din el, coloană cu coloană. Fiecare punct e atribuit celui mai apropiat centru, apoi centrele se mută în media punctelor lor, și se repetă până se stabilizează. Simplu, rapid, dar trebuie să alegi tu k și e sensibil la scală."
          },
          {
            "p": "Un exemplu pe o singură coloană, ca să-l poți urmări cu creionul: punctele 1, 2, 3, 10, 11, 12 și k = 2."
          },
          {
            "steps": [
              "Pornești cu două centre puse la întâmplare, să zicem în 1 și în 2.",
              "Fiecare punct merge la centrul cel mai apropiat, deci grupurile sunt {1} și {2, 3, 10, 11, 12}.",
              "Muți fiecare centru în media grupului lui: primul rămâne în 1, al doilea ajunge în (2 + 3 + 10 + 11 + 12) / 5 = 7.6.",
              "Reîmparți punctele. Punctul 2 e la distanța 1 de primul centru și la 5.6 de al doilea, deci trece la primul, la fel și 3. Grupurile devin {1, 2, 3} și {10, 11, 12}.",
              "Muți iar centrele, în (1 + 2 + 3) / 3 = 2 și în (10 + 11 + 12) / 3 = 11.",
              "Reîmparți și niciun punct nu-și mai schimbă grupul, deci te oprești."
            ]
          },
          {
            "note": "K-Means măsoară distanțe, deci scalarea e obligatorie. Fără ea, coloana cu numerele cele mai mari domină gruparea și restul nu contează."
          },
          {
            "code": "from sklearn.cluster import KMeans\nkm = KMeans(n_clusters=4, n_init=10, random_state=0)\nlabels = km.fit_predict(X_scalat)"
          },
          {
            "p": "`X_scalat` sunt trăsăturile tale (features, adică coloanele de intrare) după scalare, de exemplu cu `StandardScaler().fit_transform(X)` (Lecția 5). `n_clusters=4` e k. Un start nefericit al centrelor poate da grupuri proaste, așa că `n_init=10` rulează algoritmul din 10 starturi diferite și îl păstrează pe cel mai bun. `random_state=0` face starturile la fel la fiecare rulare. `fit_predict` face `fit` și `predict` deodată: găsește centrele și îți dă grupul fiecărui rând, un număr de la 0 la 3. Numerele sunt doar nume: grupul 3 nu e mai bun decât grupul 1."
          }
        ]
      },
      {
        "heading": "Metoda cotului și scorul siluetă",
        "blocks": [
          {
            "p": "Cum alegi k? Metoda cotului: rulezi pentru mai multe valori de k și desenezi cât de strânse sunt grupurile. Unde curba se îndoaie ca un cot, ai un k rezonabil."
          },
          {
            "p": "Cât de strânse sunt grupurile măsori cu inerția: suma pătratelor distanțelor de la fiecare punct la centrul lui. În exemplul de mai sus, cu centrele 2 și 11, distanțele sunt 1, 0, 1, 1, 0 și 1, deci inerția e 1² + 0² + 1² + 1² + 0² + 1² = 4. Pe grafic pui k pe axa orizontală și inerția pe cea verticală."
          },
          {
            "code": "import numpy as np\nfrom sklearn.cluster import KMeans\n\npuncte = np.array([[1], [2], [3], [10], [11], [12]])   # o coloană\nfor k in range(1, 5):\n    km = KMeans(n_clusters=k, n_init=10, random_state=0).fit(puncte)\n    print(k, round(km.inertia_, 1))\n# 1 125.5\n# 2 4.0\n# 3 2.5\n# 4 1.0"
          },
          {
            "p": "Fiecare punct e un rând cu o singură coloană, de aceea parantezele duble, iar `inertia_` e inerția calculată la `fit`. De la k = 1 la k = 2 inerția scade de la 125.5 la 4, apoi foarte puțin, deci cotul e la k = 2. Nu alege k cu inerția cea mai mică: ea scade mereu când crești k, până la 0, când fiecare punct e propriul centru."
          },
          {
            "p": "Scorul siluetă e o alternativă numerică, măsoară cât de bine se separă grupurile. Pentru fiecare punct compari două distanțe medii: a, până la celelalte puncte din grupul lui, și b, până la punctele din cel mai apropiat alt grup."
          },
          {
            "formula": "s = (b - a) / max(a, b)",
            "explain": "s iese între -1 și 1. Aproape de 1, punctul e mult mai aproape de grupul lui decât de celălalt. Aproape de 0, stă la granița dintre două grupuri. Negativ, probabil e în grupul greșit. Scorul siluetă e media lui s pe toate punctele."
          },
          {
            "p": "Pentru punctul 1 din exemplu, a = (1 + 2) / 2 = 1.5, media distanțelor până la 2 și 3, iar b = (9 + 10 + 11) / 3 = 10, media distanțelor până la 10, 11 și 12. Deci s = (10 - 1.5) / 10 = 0.85. Media pe toate cele 6 puncte iese tot 0.85."
          },
          {
            "code": "from sklearn.metrics import silhouette_score\n\nfor k in range(2, 5):\n    km = KMeans(n_clusters=k, n_init=10, random_state=0)\n    labels = km.fit_predict(puncte)\n    print(k, round(silhouette_score(puncte, labels), 2))\n# 2 0.85\n# 3 0.5\n# 4 0.17"
          },
          {
            "p": "Alegi k cu scorul cel mai mare, aici tot k = 2. Bucla pornește de la 2, pentru că scorul siluetă are nevoie de cel puțin două grupuri."
          }
        ]
      },
      {
        "heading": "DBSCAN și clustering ierarhic",
        "blocks": [
          {
            "p": "DBSCAN grupează după densitate: unde punctele sunt înghesuite formează un grup, iar punctele izolate le marchează ca zgomot (aici, puncte care nu țin de niciun grup). Avantaje: nu trebuie să spui numărul de grupuri și găsește singur outlierii. Depinde de doi hiperparametri, raza de vecinătate și câți vecini minim, pe care trebuie să-i reglezi."
          },
          {
            "p": "În scikit-learn se numesc `eps` și `min_samples`. Două puncte sunt vecine dacă distanța dintre ele e cel mult `eps`. Un punct care are în raza lui cel puțin `min_samples` puncte, numărându-se și pe el, e în miezul unui grup, iar vecinii lui intră în același grup. Ce nu intră în niciun grup e zgomot."
          },
          {
            "code": "from sklearn.cluster import DBSCAN\n\npuncte = [[1], [2], [3], [10], [11], [12], [30]]\ndb = DBSCAN(eps=1.5, min_samples=2)\nprint(db.fit_predict(puncte))   # [ 0  0  0  1  1  1 -1]"
          },
          {
            "p": "Punctele 1, 2 și 3 sunt vecine pe rând și formează grupul 0, iar 10, 11 și 12 grupul 1. Punctul 30 n-are vecini și primește -1, eticheta pentru zgomot. Ca să reglezi `eps`, încearcă mai multe valori: aici, cu 0.5 totul ar ieși zgomot, iar cu 20 un singur grup. Scalează datele întâi, ca la K-Means."
          },
          {
            "p": "Clustering-ul ierarhic construiește un arbore de grupuri, de la fiecare punct separat până la un singur grup mare. Îl desenezi ca dendrogramă și îl tai la nivelul care îți dă numărul de grupuri pe care îl vrei. Util când vrei să vezi structura la mai multe niveluri."
          },
          {
            "p": "Pornești cu fiecare punct ca grup separat și, la fiecare pas, unești cele două grupuri cele mai apropiate, până rămâne unul singur. Dendrograma desenează aceste uniri ca un arbore genealogic: jos sunt punctele, iar fiecare unire e o linie orizontală, la înălțimea distanței dintre cele două grupuri. Dacă tai desenul cu o linie orizontală, fiecare ramură tăiată e un grup."
          },
          {
            "code": "from scipy.cluster.hierarchy import linkage, dendrogram, fcluster\nimport matplotlib.pyplot as plt\n\npuncte = [[1], [2], [3], [10], [11], [12]]\nZ = linkage(puncte, method=\"average\")   # toate unirile, în ordine\ndendrogram(Z)\nplt.show()\nprint(fcluster(Z, t=5, criterion=\"distance\"))   # [1 1 1 2 2 2]"
          },
          {
            "p": "Cu `method=\"average\"`, distanța dintre două grupuri e media distanțelor dintre punctele lor. Jos, punctele apar cu poziția lor din listă, de la 0 la 5. Mai întâi se unesc 1 cu 2 și 10 cu 11, la înălțimea 1, apoi 3 și 12 li se alătură la 1.5, iar cele două grupuri mari se unesc abia la 9. `fcluster` taie la înălțimea `t=5` și dă grupul fiecărui punct, numerotat de la 1. scipy se instalează odată cu scikit-learn."
          }
        ]
      },
      {
        "heading": "PCA: reducerea dimensionalității",
        "blocks": [
          {
            "p": "Aici dimensiune înseamnă coloană: un rând cu 2 coloane e un punct în plan, iar unul cu 100 de coloane e un punct într-un spațiu cu 100 de axe, pe care nu-l mai poți desena. La NumPy (Lecția 4), cuvântul avea alt sens: acolo un tabel era un array cu 2 dimensiuni."
          },
          {
            "p": "Când ai zeci sau sute de coloane, e greu de vizualizat și modelele suferă (blestemul dimensionalității). PCA (analiza componentelor principale) găsește direcțiile pe care datele variază cel mai mult și le proiectează pe ele, păstrând cât mai multă informație în mai puține dimensiuni."
          },
          {
            "p": "Blestemul dimensionalității: cu fiecare coloană în plus, punctele ajung mai rare. Ca să acoperi un segment cu puncte la 0.1 unul de altul îți trebuie 10 puncte. Pentru un pătrat îți trebuie 100, pentru un cub 1000, iar pentru 10 coloane zece miliarde (10 la puterea 10). Cu sute de coloane și câteva mii de rânduri, datele tale sunt puncte rare într-un spațiu aproape gol, iar modelele găsesc ușor tipare care sunt doar întâmplare."
          },
          {
            "p": "Un exemplu în 2D: la elevii unei clase, înălțimea și greutatea cresc împreună, așa că pe un scatter plot punctele stau aproape pe o linie oblică. De-a lungul liniei, direcția spune cam „cât de mare e elevul” și acolo datele variază cel mai mult. Pe direcția perpendiculară, „mai greu sau mai ușor decât te-ai aștepta după înălțime”, punctele se abat puțin."
          },
          {
            "p": "„Variază cel mai mult” înseamnă că valorile sunt cele mai împrăștiate. Împrăștierea se măsoară cu varianța, pătratul deviației standard din Lecțiile 4 și 5: media pătratelor distanțelor până la medie. Listele 4, 5, 6 și 0, 5, 10 au aceeași medie, 5, dar varianțe foarte diferite: (1 + 0 + 1) / 3 ≈ 0.67 și (25 + 0 + 25) / 3 ≈ 16.7."
          },
          {
            "note": "Varianța de aici e alt lucru decât varianța unui model din Lecțiile 1 și 8 (cât de mult se schimbă modelul când schimbi datele de antrenare). La PCA, varianța e doar cât de împrăștiate sunt valorile."
          },
          {
            "p": "Direcțiile găsite de PCA se numesc componente. Fiecare componentă e o coloană nouă, calculată din cele vechi: prima, la elevi, crește când cresc și înălțimea, și greutatea. A proiecta un punct pe o componentă înseamnă să păstrezi doar unde cade el pe direcția aceea, ca umbra lui pe o linie. Cu prima componentă, fiecare elev e descris de un singur număr în loc de două."
          },
          {
            "p": "PCA îți spune cât din varianță păstrezi cu fiecare componentă. Poți reduce de la 100 de coloane la 10 care păstrează, să zicem, 95% din informație. E util și ca preprocesare înainte de un model, pe lângă desene. Cere date scalate: altfel, o coloană în mii de lei pare cea mai împrăștiată doar din cauza unității de măsură, iar prima componentă ar fi aproape numai ea."
          },
          {
            "code": "import numpy as np\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.decomposition import PCA\n\n# înălțime (cm) și greutate (kg) pentru 6 elevi\nelevi = np.array([[150, 45], [155, 52], [160, 50],\n                  [170, 63], [175, 66], [185, 72]])\nelevi_scalat = StandardScaler().fit_transform(elevi)\np = PCA().fit(elevi_scalat)\nprint(p.explained_variance_ratio_.round(2))   # [0.99 0.01]"
          },
          {
            "p": "`explained_variance_ratio_` e varianța explicată: partea din împrăștierea totală prinsă de fiecare componentă. Prima prinde 99%, a doua 1%, deci poți păstra doar prima."
          },
          {
            "code": "from sklearn.decomposition import PCA\np = PCA(n_components=0.95).fit(X_scalat)   # păstrează 95% din varianță\nX_redus = p.transform(X_scalat)\nprint(X_redus.shape[1], \"componente\")"
          },
          {
            "p": "`n_components=0.95` îi cere lui PCA atâtea componente câte trebuie ca să ajungă la 95% din varianță, iar un număr întreg, de exemplu 2, îi cere exact atâtea. `fit` găsește direcțiile, `transform` calculează valorile fiecărui rând pe ele, iar `X_redus.shape[1]` e numărul de coloane rămase. Înaintea unui model supervizat, fă `fit` doar pe datele de antrenare, ca la scalare (Lecția 5), și aplică `transform` pe validare și test."
          }
        ]
      },
      {
        "heading": "t-SNE și UMAP: doar pentru vizualizare",
        "blocks": [
          {
            "p": "O proiecție în 2D transformă fiecare rând, cu toate coloanele lui, într-un punct cu doar două coordonate, x și y, pe care îl poți pune pe un scatter plot (Lecția 4). PCA cu `n_components=2` face și el o proiecție în 2D."
          },
          {
            "p": "t-SNE și UMAP fac proiecții în 2D care arată frumos și scot în evidență grupuri. Sunt excelente ca să te uiți la structura datelor. Dar au o capcană importantă: distanțele și mărimile grupurilor din desen nu sunt de încredere. Două grupuri apropiate în desen nu sunt neapărat apropiate în realitate."
          },
          {
            "p": "Motivul: t-SNE și UMAP încearcă să păstreze doar vecinii. Rândurile care seamănă ajung aproape în desen, dar distanțele mari dintre grupuri nu se păstrează."
          },
          {
            "code": "from sklearn.manifold import TSNE\nimport matplotlib.pyplot as plt\n\nX_2d = TSNE(n_components=2, random_state=0).fit_transform(X_scalat)\nprint(X_2d.shape)   # (numărul de rânduri, 2)\nplt.scatter(X_2d[:, 0], X_2d[:, 1], s=5)\nplt.show()"
          },
          {
            "p": "`X_2d[:, 0]` sunt toate rândurile din coloana 0, adică x-ul fiecărui punct, iar `s=5` face punctele mici. t-SNE e în scikit-learn, dar pe zeci de mii de rânduri merge greu, deci desenează un eșantion. UMAP e în pachetul separat umap-learn (`pip install umap-learn`, apoi `import umap`), care s-ar putea să lipsească la concurs. t-SNE nu are nici `transform` pentru date noi, deci nu-l poți aplica pe test."
          },
          {
            "note": "Folosește t-SNE și UMAP ca să te uiți, nu ca să tragi concluzii dure. Pentru preprocesare de încredere, PCA e alegerea sigură."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Aplică K-Means și DBSCAN pe același set și compară grupurile găsite."
      },
      {
        "title": "Redu la 2D cu PCA și cu UMAP (sau cu t-SNE, dacă umap-learn nu e instalat) și vezi ce diferă între ele."
      },
      {
        "title": "Folosește metoda cotului ca să alegi k pe un set și justifică alegerea."
      }
    ]
  },
  {
    "moduleCode": "S15",
    "duration": "~2 săptămâni",
    "intro": "Partea asta de AI nu are date de antrenare. Ai o stare de start, un scop, și niște mutări permise. Întrebarea e cum ajungi la scop eficient. E algoritmică, aproape ca la informatică, și apare în probleme de tip puzzle, planificare și jocuri. O rezolvi cu structuri de date, nu cu modele.",
    "sections": [
      {
        "heading": "Spațiul stărilor: limbajul comun",
        "blocks": [
          {
            "p": "Ia un labirint mic, de 3 pe 3 căsuțe. S e startul, G e scopul (de la goal), # e un zid, iar punctul e o căsuță liberă. Te poți muta câte o căsuță în sus, în jos, la stânga sau la dreapta, dar nu prin ziduri."
          },
          {
            "code": "S . #\n. # .\n. . G"
          },
          {
            "p": "Fiecare căsuță are coordonatele (rând, coloană), numărate de la 0, ca indicii din Python. S e la (0, 0), zidurile sunt la (0, 2) și (1, 1), iar G e la (2, 2). Căsuța în care ești acum e starea ta: o stare e tot ce trebuie să știi despre situație ca să poți continua de acolo."
          },
          {
            "p": "Orice problemă de căutare se descrie la fel: o stare de start, un set de acțiuni care duc dintr-o stare în alta, un test de scop care spune dacă ai ajuns, și opțional un cost pe fiecare mutare. Un labirint: starea e poziția, acțiunile sunt pașii în cele patru direcții, scopul e ieșirea. În labirintul nostru, testul de scop e întrebarea „sunt pe G?”, iar fiecare pas costă 1."
          },
          {
            "p": "Toate stările la care poți ajunge formează un graf, unde nodurile sunt stări și muchiile sunt mutări. Un graf e un set de puncte, numite noduri, legate prin linii, numite muchii. Harta metroului e un graf: stațiile sunt nodurile, iar bucățile de linie dintre două stații vecine sunt muchiile."
          },
          {
            "p": "În labirint, nodurile sunt cele 7 căsuțe libere. O muchie leagă două căsuțe libere vecine: S cu (0, 1), S cu (1, 0), (1, 0) cu (2, 0), (2, 0) cu (2, 1), (2, 1) cu G și (1, 2) cu G."
          },
          {
            "p": "Căutarea înseamnă să explorezi graful ăsta inteligent, fără să-l construiești tot, pentru că de obicei e uriaș. Labirintul nostru are 7 stări, dar un cub Rubik are peste 43 de miliarde de miliarde."
          },
          {
            "note": "Marchează mereu stările vizitate. Fără asta te învârți în cerc la infinit, revizitând aceleași stări. În labirint, din S mergi la (1, 0), din (1, 0) o mutare te duce înapoi în S, de acolo iar la (1, 0), și tot așa. E cea mai frecventă cauză a unei căutări care nu se termină."
          }
        ]
      },
      {
        "heading": "Căutare neinformată: BFS, DFS, cost uniform",
        "blocks": [
          {
            "p": "Căutarea neinformată explorează orbește, fără să știe încotro e scopul. Algoritmii de mai jos diferă prin ordinea în care aleg următoarea stare de explorat, iar ordinea vine din structura în care țin stările care își așteaptă rândul."
          },
          {
            "p": "Prima structură e coada (queue), ca la cantină: cine a venit primul e servit primul. Adaugi la capătul din spate și scoți din față."
          },
          {
            "p": "BFS (căutare în lățime, de la breadth-first search) explorează nivel cu nivel, folosind o coadă. Întâi toate stările aflate la un pas de start, apoi toate cele aflate la doi pași, și tot așa. Găsește mereu drumul cu cele mai puține mutări, dar consumă multă memorie: un nivel întreg stă în coadă deodată. Dacă fiecare stare are 3 mutări noi, la nivelul 10 pot aștepta 3^10 = 59 049 de stări."
          },
          {
            "p": "Pe labirint, BFS pornește cu S în coadă. Scoate S și pune în coadă vecinii lui liberi, (1, 0) și (0, 1). Pasul ăsta se numește extinderea unei stări: o scoți din coadă și îi adaugi vecinii nevizitați. Urmează (1, 0), care adaugă (2, 0). Apoi (0, 1), o fundătură care nu adaugă nimic. Apoi (2, 0) adaugă (2, 1), iar (2, 1) adaugă G. Când G iese din coadă, ai terminat."
          },
          {
            "p": "Ca să afli drumul, fiecare căsuță reține din ce căsuță ai ajuns în ea, adică părintele ei. Pornești de la G și mergi din părinte în părinte: G, (2, 1), (2, 0), (1, 0), S. Întors, ăsta e drumul de 4 pași. E cel mai scurt posibil: BFS termină toate căsuțele aflate la 1 pas înainte să treacă la cele de la 2 pași, deci prima dată când ajunge la G, a ajuns pe cel mai scurt drum."
          },
          {
            "p": "În Python, coada se face cu `deque` din modulul `collections`, de unde ai importat `Counter` în Lecția 3. `append` adaugă la spate, iar `popleft` scoate din față. Merge și o listă obișnuită, dar `lista.pop(0)` mută toate celelalte elemente cu o poziție, deci e lentă pe liste lungi."
          },
          {
            "code": "from collections import deque\n\nlabirint = [\"S.#\",\n            \".#.\",\n            \"..G\"]\nranduri, coloane = len(labirint), len(labirint[0])\n\ndef vecini(poz):\n    r, c = poz\n    rez = []\n    # sus, jos, stânga, dreapta\n    for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:\n        nr, nc = r + dr, c + dc\n        in_grila = 0 <= nr < randuri and 0 <= nc < coloane\n        if in_grila and labirint[nr][nc] != \"#\":\n            rez.append((nr, nc))\n    return rez\n\ndef bfs(start, scop):\n    coada = deque([start])\n    parinte = {start: None}       # de unde ai venit; ține și vizitatele\n    while coada:\n        poz = coada.popleft()     # scoți din față\n        if poz == scop:\n            break\n        for v in vecini(poz):\n            if v not in parinte:  # încă nevizitat\n                parinte[v] = poz\n                coada.append(v)   # pui la spate\n    if scop not in parinte:\n        return None               # nu există drum\n    drum = []\n    poz = scop\n    while poz is not None:        # înapoi, din părinte în părinte\n        drum.append(poz)\n        poz = parinte[poz]\n    return drum[::-1]             # întors: de la start la scop\n\nprint(bfs((0, 0), (2, 2)))\n# [(0, 0), (1, 0), (2, 0), (2, 1), (2, 2)]"
          },
          {
            "p": "Intră labirintul, ca listă de string-uri, plus startul și scopul; iese drumul, ca listă de coordonate. `randuri` și `coloane` se calculează din labirint, așa că același cod merge pe orice grilă dreptunghiulară. `vecini` încearcă cele patru direcții și păstrează doar căsuțele din grilă care nu sunt ziduri."
          },
          {
            "p": "Fiecare pereche (dr, dc) spune cu cât se schimbă rândul și coloana: (-1, 0) e un rând mai sus, (0, 1) o coloană la dreapta. `0 <= nr < randuri` verifică dintr-o dată două lucruri: că rândul e cel puțin 0 și că e mai mic decât numărul de rânduri. `labirint[nr][nc]` alege întâi string-ul rândului nr, apoi caracterul de pe poziția nc din el."
          },
          {
            "p": "Dicționarul `parinte` face două treburi: ține părintele fiecărei căsuțe, iar cheile lui sunt căsuțele vizitate, deci `v not in parinte` înseamnă „încă nevizitată”. `while coada:` merge cât timp coada nu e goală, pentru că o coadă goală e falsă, ca o listă goală (Lecția 3). `drum[::-1]` întoarce lista invers: e felia `[::2]` din Lecția 3, cu pasul -1."
          },
          {
            "p": "A doua structură e stiva (stack), ca un teanc de farfurii: pui deasupra și iei tot de deasupra, deci ultima pusă e prima luată."
          },
          {
            "p": "DFS (căutare în adâncime, de la depth-first search) merge cât poate pe un drum, cu o stivă. Consumă puțină memorie, dar poate să nu găsească cel mai scurt drum și se poate pierde adânc. Memoria e mică pentru că ține doar drumul pe care merge acum și vecinii lăsați pe mai târziu de-a lungul lui, nu un nivel întreg. Ca să-l vezi la lucru, scrie în codul de mai sus `coada.pop()` în loc de `coada.popleft()`: scoți mereu ultima stare pusă, deci deque-ul se poartă ca o stivă."
          },
          {
            "p": "Pe labirint, după S iese întâi (0, 1), pentru că a fost pusă ultima, și abia după fundătură vine rândul lui (1, 0). Aici există un singur drum, deci DFS îl găsește tot pe el. Pe o grilă goală de 5 pe 5, de la un colț la cel opus, aceeași variantă întoarce un drum șerpuit de 16 pași, deși cel mai scurt are 8."
          },
          {
            "p": "Cost uniform (Dijkstra) e ca BFS, dar ține cont de costul mutărilor: extinde mereu starea cu costul total cel mai mic până la ea. Când mutările au costuri diferite, el găsește drumul cel mai ieftin, nu cel mai scurt ca număr de pași."
          },
          {
            "p": "Un exemplu cu costuri: patru orașe, A, B, C și D, legate prin drumuri cu sens unic, ca exemplul să rămână scurt. Fiecare drum are un cost în minute: de la A la B 1, de la A la C 4, de la B la C 2, de la B la D 5 și de la C la D 1. Vrei să ajungi din A în D cât mai repede."
          },
          {
            "p": "BFS caută drumul cu cele mai puține muchii, deci ar întoarce A, B, D (6 minute) sau A, C, D (5 minute). Cel mai rapid e însă A, B, C, D: 1 + 2 + 1 = 4 minute, deși are trei muchii."
          },
          {
            "p": "Cost uniform folosește o coadă de priorități. Din ea nu iese cine a venit primul, ci elementul cu prioritatea cea mai bună, ca la urgențe, unde intră întâi cazul cel mai grav. Aici prioritatea e costul: iese mereu starea la care ai ajuns cel mai ieftin."
          },
          {
            "p": "Pe orașe: pornești cu A, la costul 0. Extinzi A, iar B intră în coadă cu costul 1, C cu 4. Iese B (1), cel mai mic: C intră încă o dată, cu 1 + 2 = 3, și D cu 1 + 5 = 6. Iese C (3), iar D intră cu 3 + 1 = 4. Iese C (4), dar C a fost deja extins pe un drum mai ieftin, așa că îl sari. Iese D (4), scopul: drumul A, B, C, D, de 4 minute."
          },
          {
            "p": "Te oprești când scopul iese din coadă, nu când intră. D a intrat prima dată cu costul 6, dar până să-i vină rândul a apărut varianta de 4."
          },
          {
            "p": "În Python, coada de priorități e modulul `heapq`. `heapq.heappush(coada, x)` adaugă, iar `heapq.heappop(coada)` scoate cel mai mic element. Când elementele sunt tuple, le compară după primul număr, aici costul."
          },
          {
            "code": "import heapq\n\ndrumuri = {\"A\": [(\"B\", 1), (\"C\", 4)],\n           \"B\": [(\"C\", 2), (\"D\", 5)],\n           \"C\": [(\"D\", 1)],\n           \"D\": []}\n\ndef cost_uniform(start, scop):\n    coada = [(0, start, [start])]    # (cost până aici, oraș, drum)\n    gata = set()                     # orașe deja extinse\n    while coada:\n        cost, oras, drum = heapq.heappop(coada)   # cel mai ieftin\n        if oras == scop:\n            return cost, drum\n        if oras in gata:\n            continue                 # am ajuns deja aici mai ieftin\n        gata.add(oras)\n        for vecin, c in drumuri[oras]:\n            heapq.heappush(coada, (cost + c, vecin, drum + [vecin]))\n    return None\n\nprint(cost_uniform(\"A\", \"D\"))   # (4, ['A', 'B', 'C', 'D'])"
          },
          {
            "p": "`drumuri` spune, pentru fiecare oraș, unde poți merge și cu ce cost. În coadă stau tuple (cost, oraș, drum): cât te-a costat până acolo, orașul și drumul parcurs. Mulțimea `gata` ține orașele deja extinse, ca să sari peste a doua apariție a lui C. `drum + [vecin]` face o listă nouă, cu vecinul pus la capăt. Funcția întoarce costul minim și drumul."
          },
          {
            "list": [
              "BFS: coadă, drum minim în număr de pași, memorie mare.",
              "DFS: stivă, memorie mică, nu garantează drumul minim.",
              "Cost uniform: coadă de priorități pe cost, drum de cost minim."
            ]
          }
        ]
      },
      {
        "heading": "A*: căutare informată cu euristică",
        "blocks": [
          {
            "p": "A* (se citește „A star”) e vedeta modulului. Adaugă o euristică, adică o estimare a distanței rămase până la scop, ca să meargă direct spre țintă în loc să exploreze orbește. Combină costul deja plătit cu estimarea a ce mai are de plătit."
          },
          {
            "p": "O euristică e o regulă rapidă de estimare. Pe o hartă, distanța în linie dreaptă până la oraș îți spune cam cât mai ai, deși încă nu știi pe ce drumuri vei merge."
          },
          {
            "formula": "f(n) = g(n) + h(n)",
            "explain": "g(n) = costul real de la start până la starea n. h(n) = estimarea (euristica) de la n până la scop. A* extinde mereu starea cu f cel mai mic."
          },
          {
            "p": "Pe grilă, o euristică naturală e distanța Manhattan: câte rânduri plus câte coloane te despart de scop, ca și cum n-ar exista ziduri. Între (r1, c1) și (r2, c2) e |r1 - r2| + |c1 - c2|, unde |x| e modulul, adică numărul fără semn. De la S = (0, 0) la G = (2, 2) iese |0 - 2| + |0 - 2| = 2 + 2 = 4. Numele vine de la străzile din Manhattan, așezate ca o grilă, unde nu poți tăia în diagonală printre clădiri."
          },
          {
            "p": "A* pe labirint, unde fiecare pas costă 1: în S, g = 0 și h = 4, deci f = 4. Vecinul (1, 0) are g = 1 și h = |1 - 2| + |0 - 2| = 3, deci f = 4. Vecinul (0, 1) are g = 1 și h = |0 - 2| + |1 - 2| = 3, tot f = 4. Euristica nu vede zidurile, așa că fundătura (0, 1) i se pare la fel de bună."
          },
          {
            "p": "Pe drumul bun, (2, 0) are g = 2 și h = 2, (2, 1) are g = 3 și h = 1, iar G are g = 4 și h = 0. f rămâne 4 tot drumul, pentru că aici euristica a ghicit exact cât mai era."
          },
          {
            "p": "Pe o grilă fără ziduri se vede de ce A* merge țintit. Un pas spre scop crește g cu 1 și scade h cu 1, deci f rămâne la fel. Un pas în direcția greșită crește și g, și h cu câte 1, deci f crește cu 2. A* scoate mereu starea cu f cel mai mic, așa că pașii greșiți rămân la urmă și de multe ori nici nu mai sunt extinși."
          },
          {
            "p": "Codul e cel de la cost uniform, cu o schimbare: în coadă pui tuple (g + h, g, nod, drum). Scoți după f = g + h, dar păstrezi g ca să calculezi costul vecinilor."
          },
          {
            "p": "Ca A* să garanteze drumul optim, euristica trebuie să fie admisibilă: să nu supraestimeze niciodată distanța reală rămasă. Dacă h e admisibilă, A* nu poate rata soluția optimă. Dacă supraestimează, poate găsi un drum, dar nu neapărat cel mai scurt."
          },
          {
            "p": "Manhattan e admisibilă în labirint: fiecare pas schimbă rândul sau coloana cu exact 1, deci îți trebuie cel puțin |r1 - r2| + |c1 - c2| pași, iar zidurile pot doar să lungească drumul."
          },
          {
            "p": "Pe orașe se vede ce strică o supraestimare. Costul real rămas până la D e 4 din A, 3 din B și 1 din C. Euristica h(A) = 3, h(B) = 2, h(C) = 1, h(D) = 0 nu le depășește niciodată, iar A* găsește drumul A, B, C, D, de 4 minute. Acum schimbă doar h(C) în 10. După ce extinde A și B, cel mai bun C din coadă are f = 3 + 10 = 13, iar D are f = 6 + 0 = 6. Iese D, iar A* întoarce A, B, D, de 6 minute. Cu h(C) = 1, C ar fi avut f = 3 + 1 = 4, sub 6, și A* ar fi trecut prin el."
          },
          {
            "p": "Un puzzle clasic e 8-puzzle-ul: o tablă de 3 pe 3 cu piesele de la 1 la 8 și un loc gol. La fiecare mutare împingi în locul gol o piesă vecină, iar scopul e să aranjezi piesele în ordine."
          },
          {
            "p": "Euristici clasice pentru puzzle-uri: distanța Manhattan (suma diferențelor pe orizontală și verticală) și numărul de piese greșit plasate. Amândouă nu supraestimează niciodată, deci sunt admisibile."
          },
          {
            "p": "La 8-puzzle, Manhattan adună, pentru fiecare piesă, câte rânduri și coloane o despart de locul ei. Nu poate supraestima, pentru că o mutare deplasează o singură piesă cu o singură căsuță. Nici numărul de piese greșit plasate nu poate, pentru că fiecare dintre ele are nevoie de cel puțin o mutare. Manhattan dă estimări mai mari, deci mai apropiate de costul real, așa că A* extinde de obicei mai puține stări cu ea."
          }
        ]
      },
      {
        "heading": "Jocuri: minimax și alpha-beta",
        "blocks": [
          {
            "p": "La jocurile cu doi jucători pe rând (X și 0, șah simplificat), nu cauți un drum, cauți cea mai bună mutare presupunând că adversarul joacă cel mai bine împotriva ta. Asta face minimax: tu maximizezi scorul, adversarul îl minimizează, și analizezi arborele de mutări până la o adâncime."
          },
          {
            "p": "Arborele de mutări pornește din poziția de acum. Din ea pleacă o ramură pentru fiecare mutare a ta, din fiecare poziție nouă câte o ramură pentru fiecare răspuns al adversarului, și tot așa. La capetele ramurilor, numite frunze, jocul s-a terminat și ai un scor: mare e bine pentru tine, mic e bine pentru adversar. Adâncimea e numărul de mutări la care te uiți înainte. Dacă jocul nu s-a terminat acolo, dai poziției un scor estimat, de exemplu la șah diferența de piese."
          },
          {
            "p": "Un arbore mic: tu ai trei mutări, A, B și C, iar după fiecare adversarul are două răspunsuri. Jocul se termină cu scorul 3 sau 5 după A, cu 2 sau 9 după B și cu 1 sau 7 după C."
          },
          {
            "p": "Minimax calculează de jos în sus. Adversarul alege minimul din fiecare ramură: după A îți lasă 3, după B 2, după C 1. Tu alegi maximul dintre aceste minime, adică 3, deci mutarea A. Dacă te luai după cel mai mare număr din arbore, alegeai B pentru 9, dar adversarul răspundea cu mutarea care îți dă 2."
          },
          {
            "p": "Arborele crește exploziv: fiecare mutare deschide multe altele. La X și 0, prima mutare are 9 variante, a doua 8, a treia 7, deci după trei mutări ai deja 9 · 8 · 7 = 504 ramuri. La șah, cu vreo 30 de mutări posibile la fiecare pas, după patru mutări ai 30^4 = 810 000."
          },
          {
            "p": "Alpha-beta pruning taie ramurile care oricum nu pot schimba rezultatul, fără să piardă corectitudinea (pruning înseamnă tăierea crengilor, ca la pomi). Cu el ajungi mai adânc în același timp de calcul."
          },
          {
            "p": "Pe arborele de mai sus: după ce calculezi A, știi că poți obține cel puțin 3. La B, prima frunză e 2, deci adversarul te poate ține la 2 sau mai puțin, sub 3. B e sigur mai slab decât A, așa că nu mai citești frunza cu 9: oricât ar fi, adversarul n-o să te lase s-o iei. La C, prima frunză e 1 și tai la fel. Ai citit 4 frunze din 6 și ai ales aceeași mutare, A."
          },
          {
            "p": "Numele vine de la cele două numere pe care le ține minte algoritmul: alpha, scorul pe care ți l-ai asigurat deja (aici 3), și beta, scorul pe care și l-a asigurat adversarul. Ordinea contează: dacă verificai întâi C, apoi B și A, nu tăiai nimic. De aceea programele de șah încearcă întâi mutările care par bune."
          },
          {
            "note": "Alpha-beta dă exact același rezultat ca minimax, doar mai repede. Nu schimbă mutarea aleasă, doar sare peste ramuri pe care le-a demonstrat inutile."
          }
        ]
      },
      {
        "heading": "CSP: probleme cu constrângeri",
        "blocks": [
          {
            "p": "Un CSP (problemă de satisfacere a constrângerilor) cere o atribuire de valori la niște variabile care respectă toate regulile. Colorarea unei hărți cu trei culori astfel încât vecinii să difere, Sudoku, orarul: toate sunt CSP."
          },
          {
            "p": "Un CSP are variabile (ce trebuie să alegi), câte un domeniu pentru fiecare variabilă (valorile pe care le poate lua) și constrângeri (regulile). La Sudoku, variabilele sunt cele 81 de căsuțe, iar domeniul fiecăreia sunt cifrele de la 1 la 9. Constrângerile cer cifre diferite pe fiecare rând, pe fiecare coloană și în fiecare pătrat de 3 pe 3."
          },
          {
            "p": "Ia patru regiuni de pe harta României: Transilvania, Moldova, Muntenia și Oltenia. Ele sunt variabilele, iar domeniul fiecăreia e {roșu, verde, albastru}. Constrângerea: două regiuni vecine au culori diferite. Transilvania se învecinează cu toate celelalte trei, Muntenia cu Moldova și cu Oltenia, iar Moldova și Oltenia nu se ating."
          },
          {
            "p": "Le rezolvi cu backtracking: atribui o valoare, mergi mai departe, iar dacă te blochezi te întorci și încerci altceva."
          },
          {
            "p": "Pe hartă, iei regiunile pe rând și încerci culorile în ordinea roșu, verde, albastru. Transilvania primește roșu. Moldova nu poate fi roșie, fiindcă e vecină cu Transilvania, deci primește verde. Muntenia se învecinează cu amândouă, așa că rămâne albastru. Oltenia nu poate fi roșie (Transilvania) sau albastră (Muntenia), deci primește verde. Moldova și Oltenia sunt amândouă verzi, dar nu se ating, deci e voie."
          },
          {
            "p": "Întoarcerea se vede dacă încerci doar cu roșu și verde. Transilvania e roșie, Moldova verde, iar Muntenia, vecină cu amândouă, nu mai are nicio culoare. Te întorci la Moldova, dar nici ea nu are altă culoare liberă, așa că te întorci la Transilvania și o faci verde. Moldova devine roșie, iar Muntenia se blochează la fel. Concluzia: cu două culori nu există soluție, pentru că Transilvania, Moldova și Muntenia se ating toate trei între ele."
          },
          {
            "p": "Fără îmbunătățiri, backtracking-ul e lent. Pe o hartă mare poți colora corect zeci de regiuni și să afli abia la final că o alegere de la început nu mergea. Două tehnici îl accelerează mult:"
          },
          {
            "list": [
              "Forward checking: după fiecare atribuire, elimini din vecini valorile care acum nu mai sunt posibile. Prinzi înfundările devreme.",
              "MRV (minimum remaining values): alegi mereu variabila cu cele mai puține valori rămase. Ataci întâi partea cea mai constrânsă, unde e mai probabil să dai de contradicție."
            ]
          },
          {
            "p": "Forward checking pe hartă, cu trei culori: după Transilvania = roșu, scoți roșu din domeniile vecinilor, așa că Moldova, Muntenia și Oltenia rămân cu {verde, albastru}. După Moldova = verde, scoți verde de la Muntenia, care rămâne doar cu {albastru}. Cu două culori, același pas lăsa domeniul Munteniei gol imediat după ce colorai Moldova, deci știai pe loc că trebuie să te întorci."
          },
          {
            "p": "MRV alege apoi Muntenia, cu o singură culoare rămasă, înaintea Olteniei, care mai are două. Muntenia ia albastru, Oltenia rămâne doar cu {verde}, și harta e gata fără nicio încercare greșită. La început toate regiunile au câte trei culori, deci poți porni cu oricare."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Implementează A* pentru 8-puzzle cu două euristici (Manhattan și piese greșit plasate) și compară numărul de stări extinse."
      },
      {
        "title": "Rezolvă o colorare de hartă ca CSP cu forward checking și MRV."
      },
      {
        "title": "Scrie minimax cu alpha-beta pentru X și 0 și verifică că nu pierde niciodată."
      }
    ]
  },
  {
    "moduleCode": "S16",
    "duration": "~1 săptămână",
    "intro": "NLP (prelucrarea limbajului natural) înseamnă să faci un program să lucreze cu text scris de oameni: recenzii, emailuri, știri. Se poate face NLP serios fără deep learning, adică fără rețelele neuronale mari de la Lecția 14 încolo. TF-IDF e un mod de a transforma textul în numere, pe care îl construiești mai jos. Împreună cu un model liniar, ca regresia logistică din Lecția 7, rezolvă multe probleme de clasificare de text, rapid și explicabil. E un baseline greu de bătut (modelul simplu de la care pornești, ca în Lecția 6). Înainte să scoți artileria grea, construiește ăsta. De multe ori e suficient, și mereu e reperul față de care judeci orice model mai complicat.",
    "sections": [
      {
        "heading": "Problema: modelele vor numere, tu ai text",
        "blocks": [
          {
            "p": "Un model matematic lucrează cu numere, dar textul e șir de caractere. Regresia logistică din Lecția 7 înmulțește fiecare trăsătură cu o greutate, iar „filmul a fost super” nu se poate înmulți cu nimic."
          },
          {
            "p": "Tot NLP-ul clasic e despre cum transformi text în vectori de numere care păstrează sensul, ca să poți pune un model obișnuit deasupra. Un vector e aici o listă de numere de aceeași lungime pentru fiecare text, ca un rând dintr-un tabel cu trăsături (features), adică coloanele de intrare. Pașii sunt: cureți textul, îl tai în unități, îl transformi în numere."
          }
        ]
      },
      {
        "heading": "Preprocesarea textului",
        "blocks": [
          {
            "p": "Tokenizarea taie textul în unități, numite tokeni, de obicei cuvinte. Cel mai simplu tokenizator e `text.lower().split()` din Lecția 3, care taie la spații, dar lasă punctuația lipită de cuvinte, ca în `'școală,'`. `re.findall(r\"\\w+\", text.lower())`, tot din Lecția 3, e mai bun: `\\w+` înseamnă „una sau mai multe litere sau cifre la rând”, deci virgulele și punctele rămân pe dinafară."
          },
          {
            "p": "Apoi scoți stopwords, cuvintele foarte frecvente și fără conținut (și, sau, de, la), care doar adaugă zgomot. Le pui într-o mulțime (set) și păstrezi doar tokenii care nu sunt în ea."
          },
          {
            "p": "Lematizarea aduce cuvintele la forma de bază: mergeam, mergi, mers devin merge, ca să nu le trateze modelul ca lucruri complet diferite. Forma de bază, numită lemă, e cea din dicționar: infinitivul la verbe, singularul fără articol la substantive. Pentru asta îți trebuie un dicționar cu toate formele cuvintelor, așa că lematizarea o faci cu o bibliotecă, de exemplu spaCy, care are un model pentru română."
          },
          {
            "p": "Toți pașii, pe o singură propoziție: „Mergeam la școală, dar am uitat temele.” devine după tokenizare `['mergeam', 'la', 'școală', 'dar', 'am', 'uitat', 'temele']`. Fără stopwords (la, dar, am) rămâne `['mergeam', 'școală', 'uitat', 'temele']`, iar după lematizare `['merge', 'școală', 'uita', 'temă']`."
          },
          {
            "note": "La română, atenție la diacritice și la flexiunea bogată. Același cuvânt apare scris cu și fără diacritice și în multe forme. Normalizează consecvent (de exemplu, tratezi la fel ș și s), altfel pierzi potriviri și împrăștii semnalul pe forme separate: pentru model, „școală” și „scoala” sunt cuvinte diferite, iar ce învață despre unul nu se aplică celuilalt. Ca să scoți diacriticele, după ce ai trecut textul la litere mici, folosești `text.translate(str.maketrans(\"ăâîșț\", \"aaist\"))`: înlocuiește fiecare literă din primul șir cu cea de pe aceeași poziție din al doilea."
          }
        ]
      },
      {
        "heading": "Bag-of-words și TF-IDF",
        "blocks": [
          {
            "p": "Bag-of-words (sac de cuvinte) descrie un document prin câte apariții are fiecare cuvânt din vocabular, ignorând ordinea. Un document e aici orice text pe care îl prelucrezi (o propoziție, o recenzie, un email), iar vocabularul e lista tuturor cuvintelor care apar în documente."
          },
          {
            "p": "Trei documente: „filmul este bun”, „filmul este foarte foarte bun” și „filmul este prost”. Vocabularul, în ordine alfabetică, e bun, este, filmul, foarte, prost. Fiecare document devine un vector cu 5 numere, câte unul pentru fiecare cuvânt din vocabular: [1, 1, 1, 0, 0], [1, 1, 1, 2, 0] și [0, 1, 1, 0, 1]. Al doilea are 2 pe poziția lui „foarte”, pentru că îl conține de două ori."
          },
          {
            "code": "from sklearn.feature_extraction.text import CountVectorizer\n\ndocs = [\"filmul este bun\",\n        \"filmul este foarte foarte bun\",\n        \"filmul este prost\"]\nvec = CountVectorizer()\nX = vec.fit_transform(docs)\nprint(vec.get_feature_names_out())\n# ['bun' 'este' 'filmul' 'foarte' 'prost']\nprint(X.toarray())\n# [[1 1 1 0 0]\n#  [1 1 1 2 0]\n#  [0 1 1 0 1]]"
          },
          {
            "p": "`CountVectorizer` face bag-of-words: `fit` învață vocabularul, `transform` numără cuvintele, iar `fit_transform` le face pe amândouă deodată. `get_feature_names_out()` îți dă vocabularul, adică numele coloanelor. Implicit trece textul la litere mici. Tot implicit, sare peste cuvintele de o singură literă, ca „e” sau „o”."
          },
          {
            "p": "Rezultatul e o matrice rară (sparse), care ține minte doar numerele diferite de zero. Pe texte reale vocabularul are zeci de mii de cuvinte, iar fiecare vector e aproape numai zerouri. `.toarray()` o face un array NumPy obișnuit, ca s-o poți afișa."
          },
          {
            "p": "Simplu, dar cuvintele comune (care apar peste tot) îneacă semnalul, pentru că au numere mari fără să fie informative. În exemplu, „filmul” și „este” apar în toate trei documentele, deci nu te ajută deloc să le deosebești."
          },
          {
            "p": "TF-IDF repară asta cântărind fiecare cuvânt după două lucruri: cât de des apare în document (TF, term frequency) și cât de rar e în restul documentelor (IDF, inverse document frequency). Un cuvânt care apare des într-un document dar rar în rest primește greutate mare, pentru că e caracteristic acelui document."
          },
          {
            "formula": "tf-idf(cuvânt, doc) = tf(cuvânt, doc) · log(N / df(cuvânt))",
            "explain": "tf = de câte ori apare cuvântul în document. N = numărul total de documente. df = în câte documente apare cuvântul. Cuvintele omniprezente primesc IDF aproape 0."
          },
          {
            "p": "log e logaritmul: log(x) îți spune la ce putere trebuie ridicat 10 ca să obții x. log(10) = 1, log(100) = 2, log(1000) = 3, deci crește foarte încet, iar log(1) = 0, pentru că 10 la puterea 0 e 1. Pentru numerele dintre 1 și 10 dă valori între 0 și 1, de exemplu log(3) ≈ 0.48. Un cuvânt prezent în toate documentele are N / df = 1, deci IDF = log(1) = 0."
          },
          {
            "p": "Pe cele trei documente de mai sus, N = 3. „filmul” și „este” apar în toate trei, deci IDF = log(3 / 3) = 0 și dispar. „bun” apare în două, deci IDF = log(3 / 2) = log(1.5) ≈ 0.18. „foarte” și „prost” apar într-unul singur, cu IDF = log(3) ≈ 0.48. În al doilea document, „foarte” are tf = 2, deci tf-idf = 2 · 0.48 ≈ 0.95, iar „bun” are 1 · 0.18 = 0.18. Al treilea rămâne doar cu „prost”, cu 0.48: exact cuvântul care îl deosebește de celelalte."
          },
          {
            "p": "TF-IDF nu știe ce înseamnă cuvintele. „bun” primește greutate mică doar pentru că apare în două documente din trei, nu pentru că ar conta mai puțin într-o recenzie."
          },
          {
            "code": "from sklearn.feature_extraction.text import TfidfVectorizer\nvec = TfidfVectorizer(ngram_range=(1, 2), min_df=2)\nX = vec.fit_transform(texte_train)      # fit DOAR pe train\nX_val = vec.transform(texte_val)        # transform pe val",
            "caption": "ngram_range=(1,2) pune în vocabular și perechi de cuvinte, pe lângă cuvintele izolate."
          },
          {
            "p": "`texte_train` și `texte_val` sunt liste de string-uri, câte un text pe element. `X` iese o matrice rară, cu un rând pentru fiecare text și o coloană pentru fiecare cuvânt sau pereche de cuvinte din vocabular. `TfidfVectorizer` folosește o variantă puțin ajustată a formulei: logaritmul natural (aceeași idee, dar cu baza e ≈ 2.718 în loc de 10) și câte un 1 adăugat, ca un cuvânt prezent peste tot să nu ajungă exact la 0. Apoi aduce fiecare vector la lungimea 1, ca un text lung să nu pară important doar pentru că are multe cuvinte. Ce e lungimea unui vector vezi mai jos, la similaritatea cosinus. Numerele lui nu ies identic cu cele calculate de mână, dar cuvintele rare primesc tot greutăți mai mari."
          },
          {
            "p": "Un n-gram e un șir de n cuvinte la rând, iar `ngram_range=(1, 2)` pune în vocabular cuvinte singure și perechi de cuvinte vecine. Din „nu este bun” ies nu, este, bun, „nu este” și „este bun”. Perechea „nu este” prinde negația, pe care cuvintele luate separat o pierd."
          },
          {
            "p": "`min_df=2` păstrează doar cuvintele care apar în cel puțin 2 documente, același df ca în formulă. Un cuvânt dintr-un singur document, de exemplu o greșeală de tastare, nu-l ajută pe model să generalizeze și doar lungește vectorii."
          },
          {
            "p": "Vocabularul și valorile IDF sunt parametrii învățați de vectorizator, ca media și deviația standard la `StandardScaler` din Lecția 5. De aceea faci `fit` doar pe antrenare și doar `transform` pe validare. Dacă ai face `fit` și pe textele de validare, IDF-ul ar folosi informație din ele, o scurgere de date (data leakage), iar scorul de validare ar ieși mai bun decât cel real."
          }
        ]
      },
      {
        "heading": "Clasificarea textului",
        "blocks": [
          {
            "p": "Peste vectorii TF-IDF, două modele merg surprinzător de bine: Naïve Bayes multinomial (rapid, potrivit pentru numărători de cuvinte) și regresia logistică (des cel mai bun baseline). Amândouă sunt rapide și explicabile: poți vedea ce cuvinte împing spre fiecare clasă."
          },
          {
            "p": "Regresia logistică (Lecția 7) dă fiecărui cuvânt din vocabular o greutate. Pentru un text, înmulțește valoarea TF-IDF a fiecărui cuvânt cu greutatea lui și adună totul, împreună cu termenul liber. Apoi trece suma prin sigmoidă, care o strânge într-o probabilitate între 0 și 1. O greutate pozitivă împinge spre clasa 1, una negativă spre clasa 0."
          },
          {
            "p": "Naïve Bayes (tot din Lecția 7) se uită cât de des apare fiecare cuvânt în textele fiecărei clase și tratează cuvintele ca și cum n-ar avea legătură între ele. Varianta multinomială e cea făcută pentru numărători, cum sunt cele de cuvinte."
          },
          {
            "p": "Un exemplu complet, pe opt recenzii scurte de film: patru pozitive (eticheta 1) și patru negative (eticheta 0). Toate opt sunt date de antrenare, iar cele două propoziții noi joacă rolul datelor de test."
          },
          {
            "code": "from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.naive_bayes import MultinomialNB\n\ntexte = [\"filmul a fost minunat\",\n         \"actori buni și o poveste frumoasă\",\n         \"mi-a plăcut mult, îl recomand\",\n         \"o regie bună și actori buni\",\n         \"filmul a fost plictisitor\",\n         \"actori slabi și o poveste banală\",\n         \"nu mi-a plăcut, actori slabi\",\n         \"plictisitor și mult prea lung\"]\netichete = [1, 1, 1, 1, 0, 0, 0, 0]    # 1 = pozitiv, 0 = negativ\n\nvec = TfidfVectorizer()\nX = vec.fit_transform(texte)           # 8 rânduri, 21 de coloane\nmodel = LogisticRegression().fit(X, etichete)\n\nnoi = vec.transform([\"un film minunat, cu actori buni\",\n                     \"un film plictisitor și prea lung\"])\nprint(model.predict(noi))                        # [1 0]\nprint(model.predict_proba(noi)[:, 1].round(2))   # [0.61 0.4 ]\n\nnb = MultinomialNB().fit(X, etichete)\nprint(nb.predict(noi))                           # [1 0]\n\ncuvinte = vec.get_feature_names_out()\nordine = model.coef_[0].argsort()     # de la greutatea cea mai mică\nprint(cuvinte[ordine[:3]])    # ['plictisitor' 'slabi' 'banală']\nprint(cuvinte[ordine[-3:]])   # ['frumoasă' 'minunat' 'buni']"
          },
          {
            "p": "`predict` dă clasa, iar `predict_proba(noi)[:, 1]` dă probabilitatea clasei 1 pentru fiecare text nou, ca în Lecția 7. Probabilitățile sunt doar puțin peste și sub 0.5, pentru că modelul a văzut doar opt exemple. „film” lipsește din vocabular, unde e doar „filmul”, așa că vectorizatorul îl ignoră, la fel ca pe „un” și „cu”. Aici ar fi ajutat lematizarea, care aduce „filmul” și „film” la aceeași formă."
          },
          {
            "p": "`model.coef_[0]` sunt greutățile, câte una pentru fiecare cuvânt din vocabular (`[0]` pentru că, la două clase, `coef_` are un singur rând). `argsort` din Lecția 4 le ordonează pozițiile de la greutatea cea mai mică la cea mai mare, așa că primele trei cuvinte împing cel mai tare spre negativ, iar ultimele trei spre pozitiv. Naïve Bayes se folosește la fel: `fit` pe aceleași date, apoi `predict`."
          },
          {
            "p": "Pentru căutare și potrivire de texte, folosești similaritatea cosinus: cosinusul unghiului dintre doi vectori de documente. Cu cât unghiul e mai mic, cu atât textele sunt mai apropiate ca conținut. E baza motoarelor de căutare simple și a găsirii de duplicate."
          },
          {
            "p": "Ia un vocabular cu doar două cuvinte, „fotbal” și „meci”. Un text în care „fotbal” apare de 3 ori și „meci” de 4 ori e vectorul (3, 4), o săgeată în plan de la (0, 0) la punctul (3, 4). Textele care folosesc aceleași cuvinte în aceleași proporții au săgeți pe aceeași direcție, iar două texte fără niciun cuvânt comun au săgeți perpendiculare. Cosinusul unghiului dintre ele, din geometrie, e 1 la 0° și 0 la 90°."
          },
          {
            "formula": "similaritate(a, b) = (a₁·b₁ + a₂·b₂) / (lungime(a) · lungime(b))",
            "explain": "a₁ și a₂ sunt cele două numere din a, de câte ori apare fiecare cuvânt. lungime(a) = √(a₁² + a₂²), din teorema lui Pitagora. Cu mai multe cuvinte în vocabular, aduni câte un termen pentru fiecare cuvânt, sus și sub radical."
          },
          {
            "p": "Pentru a = (3, 4) și b = (4, 3): sus ai 3·4 + 4·3 = 24, iar fiecare săgeată are lungimea √(9 + 16) = 5, deci similaritatea e 24 / 25 = 0.96. Pentru a și c = (6, 8), adică același text scris de două ori: 3·6 + 4·8 = 50, lungimile sunt 5 și 10, deci 50 / 50 = 1. Lungimea textului nu contează, doar proporția cuvintelor. Pentru (1, 0) și (0, 1), două texte fără cuvinte comune, sus iese 0, deci similaritatea e 0."
          },
          {
            "p": "Vectorii TF-IDF nu au valori negative, așa că unghiul dintre doi dintre ei e între 0° și 90°, iar similaritatea e între 0 și 1."
          },
          {
            "code": "from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.metrics.pairwise import cosine_similarity\n\ndocs = [\"echipa a câștigat meciul de fotbal\",\n        \"meciul de fotbal s-a terminat egal\",\n        \"o rețetă simplă cu mere\"]\nvec = TfidfVectorizer()\nX = vec.fit_transform(docs)\nprint(cosine_similarity(X).round(2))\n# [[1.   0.46 0.  ]\n#  [0.46 1.   0.  ]\n#  [0.   0.   1.  ]]\n\ncautare = vec.transform([\"cine a câștigat meciul\"])\nprint(cosine_similarity(cautare, X).round(2))   # [[0.65 0.24 0.  ]]"
          },
          {
            "p": "`cosine_similarity(X)` compară fiecare document cu fiecare și dă un tabel de 3 pe 3: pe rândul i și coloana j e similaritatea dintre documentele i și j. Pe diagonală e 1, fiecare document cu el însuși. Primele două vorbesc despre fotbal și au 0.46, iar rețeta nu are niciun cuvânt comun cu ele, deci 0. `.round(2)` rotunjește la două zecimale. Căutarea merge la fel: transformi întrebarea cu același vectorizator, o compari cu toate documentele și îl afișezi primul pe cel mai apropiat, aici primul document, cu 0.65."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Clasifică texte în română cu TF-IDF și regresie logistică, cu fit doar pe train."
      },
      {
        "title": "Găsește cele mai apropiate două documente dintr-un set prin similaritate cosinus."
      },
      {
        "title": "Compară bag-of-words simplu cu TF-IDF pe aceeași problemă și vezi diferența."
      }
    ]
  },
  {
    "moduleCode": "S17",
    "duration": "~1 săptămână",
    "intro": "O imagine e doar un tensor de numere, adică o grilă de numere cu mai multe dimensiuni. Înainte de rețelele neuronale (de la Lecția 14), merită să înțelegi ce faci cu ea: cum o reprezinți, ce e un filtru de convoluție, și ce augmentare ajută fără să strice eticheta. Modulul ăsta e puntea spre CNN-uri, rețelele pentru imagini din Lecția 17: dacă înțelegi imaginea ca tensor și convoluția de mână, straturile convoluționale de mai târziu nu mai sunt magie.",
    "sections": [
      {
        "heading": "Imaginea ca tensor",
        "blocks": [
          {
            "p": "Un tensor e o grilă de numere cu mai multe dimensiuni, generalizarea unei matrice. Un singur număr are 0 dimensiuni, o listă de numere are 1, un tabel cu rânduri și coloane (o matrice) are 2, iar un teanc de tabele are 3. La un array NumPy, numărul de dimensiuni e numărul de valori din `shape` (Lecția 4): un array cu forma (2, 3) are 2 dimensiuni. NumPy îi spune ndarray, PyTorch (Lecția 14) îi spune tensor, dar ideea e aceeași."
          },
          {
            "p": "O imagine alb-negru e o matrice 2D: fiecare număr e intensitatea unui pixel, adică cât de luminos e, de la 0 (negru) la 255 (alb). O imagine color e un tensor 3D: înălțime, lățime și 3 canale (roșu, verde, albastru). Fiecare pixel color e trei numere: (255, 0, 0) e roșu aprins, (255, 255, 0) e galben, iar (255, 255, 255) e alb. O poză de telefon de 4000 pe 3000 de pixeli are deci 4000 · 3000 · 3 = 36 de milioane de numere."
          },
          {
            "note": "Ai grijă la dtype și la interval. Pixelii vin fie ca întregi de la 0 la 255, fie ca zecimale de la 0 la 1. Imaginea citită cu Pillow în Lecția 4 avea dtype `uint8`, adică întregi fără minus, pe 8 biți: exact numerele de la 0 la 255. Nu le amesteca: un model antrenat pe 0 până la 1 primește gunoi dacă îi dai 0 până la 255. Normalizarea la același interval e prima grijă. Și nu face calcule direct în `uint8`: acolo 250 + 10 dă 4, pentru că rezultatul trece de 255 și o ia de la 0."
          },
          {
            "code": "img.shape       # (H, W, 3): înălțime, lățime, 3 canale color\nimg = img / 255.0   # aduci de la 0..255 la 0..1"
          },
          {
            "p": "`img` e aici array-ul NumPy al unei poze, ca `a` din Lecția 4. H vine de la height (înălțimea, numărul de rânduri de pixeli), iar W de la width (lățimea, numărul de coloane). `img / 255.0` împarte fiecare pixel la 255, prin broadcasting (Lecția 4), și dă un array cu zecimale, de tip `float64`: 255 devine 1.0, 51 devine 0.2, iar 0 rămâne 0.0."
          }
        ]
      },
      {
        "heading": "Convoluția: filtre care se plimbă peste imagine",
        "blocks": [
          {
            "p": "Un filtru de convoluție e o matrice mică (de exemplu 3x3) pe care o plimbi peste imagine. La fiecare poziție, înmulțești filtrul cu bucata de imagine de sub el și aduni: fiecare număr din filtru cu pixelul de sub el, apoi aduni cele 9 produse. Suma devine un pixel din imaginea nouă. Rezultatul e o nouă imagine care scoate în evidență un anumit tipar: margini, blur, contrast."
          },
          {
            "p": "Merită să scrii de mână câteva filtre clasice o dată. Blur mediază vecinii (netezește): toate cele 9 numere ale filtrului sunt 1/9, deci rezultatul e media celor 9 pixeli de sub el. Sharpen accentuează diferențele: are 5 în mijloc, -1 sus, jos, la stânga și la dreapta, și 0 în colțuri. Pe o zonă uniformă, cu toți pixelii 10, dă 5 · 10 - 4 · 10 = 10, deci nu schimbă nimic, dar lângă o margine întunecă partea întunecată și luminează partea luminoasă. Sobel detectează margini, unde intensitatea se schimbă brusc."
          },
          {
            "p": "Când le-ai scris o dată, înțelegi exact ce face un strat convoluțional dintr-o rețea (Lecția 17): aceeași operație, doar că filtrele sunt învățate, nu scrise de tine. Cele 9 numere din filtru sunt parametri, ca greutățile din Lecția 7."
          },
          {
            "code": "import numpy as np\n\nsobel_x = np.array([[-1, 0, 1],\n                    [-2, 0, 2],\n                    [-1, 0, 1]])\n# plimbi sobel_x peste imagine ca să scoți marginile verticale\n\nbucata = np.array([[0, 0, 9],\n                   [0, 0, 9],\n                   [0, 0, 9]])    # întunecat la stânga, luminos la dreapta\nprint((bucata * sobel_x).sum())   # 36"
          },
          {
            "p": "`bucata` e un pătrat de 3x3 dintr-o imagine, cu o margine verticală: pixeli de 0 (negru) la stânga și de 9 (luminos) la dreapta. Numerele sunt mici ca să le poți verifica cu creionul. `bucata * sobel_x` înmulțește pe poziții, ca în Lecția 4, iar `.sum()` adună tot. De mână, pe rânduri: -1 · 0 + 0 · 0 + 1 · 9 = 9, apoi -2 · 0 + 0 · 0 + 2 · 9 = 18, apoi iar 9, deci 9 + 18 + 9 = 36."
          },
          {
            "p": "Pe o bucată uniformă, cu toți pixelii 9, ar ieși (-9 + 9) + (-18 + 18) + (-9 + 9) = 0. Un număr mare înseamnă margine, iar 0 înseamnă zonă uniformă. Blur pe aceeași bucată dă media: (0 + 0 + 9) · 3 / 9 = 3."
          },
          {
            "p": "Ca să obții toată imaginea nouă, repeți calculul în fiecare poziție. Funcția de mai jos face asta pe o imagine de 4 pe 6 pixeli, cu 0 în stânga și 9 în dreapta, și folosește `np` și `sobel_x` din blocul de mai sus."
          },
          {
            "code": "img = np.array([[0, 0, 0, 9, 9, 9],\n                [0, 0, 0, 9, 9, 9],\n                [0, 0, 0, 9, 9, 9],\n                [0, 0, 0, 9, 9, 9]], dtype=float)\n\ndef convolutie(img, filtru):\n    H, W = img.shape\n    rez = np.zeros((H - 2, W - 2))\n    for i in range(H - 2):\n        for j in range(W - 2):\n            bucata = img[i:i + 3, j:j + 3]       # fereastra de 3x3\n            rez[i, j] = (bucata * filtru).sum()  # înmulțești și aduni\n    return rez\n\nblur = np.ones((3, 3)) / 9\nprint(convolutie(img, blur))\n# [[0. 3. 6. 9.]\n#  [0. 3. 6. 9.]]\nprint(convolutie(img, sobel_x))\n# [[ 0. 36. 36.  0.]\n#  [ 0. 36. 36.  0.]]"
          },
          {
            "p": "Intră o imagine alb-negru (un array 2D) și un filtru de 3x3; iese imaginea filtrată. `img[i:i + 3, j:j + 3]` e felia de 3 rânduri și 3 coloane care începe la rândul i și coloana j. `dtype=float` face pixelii zecimale, ca să eviți surprizele de la `uint8`, iar `np.ones((3, 3)) / 9` e filtrul de blur."
          },
          {
            "p": "Rezultatul are 2 pe 4 pixeli, nu 4 pe 6, pentru că filtrul încape doar în 2 poziții pe verticală și în 4 pe orizontală. În Lecția 17 vezi cum păstrezi mărimea cu padding, o ramă de zerouri pusă în jurul imaginii. Blur-ul a transformat saltul brusc de la 0 la 9 într-o trecere lină: 0, 3, 6, 9. Sobel dă 36 doar lângă margine și 0 pe zonele uniforme din ambele părți."
          }
        ]
      },
      {
        "heading": "Augmentarea datelor",
        "blocks": [
          {
            "p": "Când ai puține imagini, modelul memorează (overfitting, din Lecția 1). Augmentarea mărește artificial setul creând variante ale imaginilor: le întorci, le rotești, le decupezi, le schimbi puțin culorile. Modelul vede aceeași etichetă în forme ușor diferite și învață să generalizeze, nu să memoreze. Dacă în toate pozele tale pisica are capul în stânga, modelul poate învăța „pisică = cap în stânga”. După un flip, vede pisica și cu capul în dreapta."
          },
          {
            "list": [
              "Flip orizontal: oglindește imaginea stânga-dreapta.",
              "Rotație și decupare aleatoare: schimbă poziția și cadrul, de exemplu rotești cu câteva grade sau păstrezi doar o bucată dintr-un loc ales la întâmplare.",
              "Color jitter: variază ușor luminozitatea și culoarea, ca la aceeași poză făcută dimineața, seara sau la neon (jitter înseamnă tremur).",
              "Cutout: acoperă o bucată aleatoare cu un pătrat negru, ca un deget pus peste obiectiv, forțând modelul să nu se bazeze pe un singur detaliu."
            ]
          },
          {
            "p": "Pe un array, flip-ul și rotația doar mută numerele. Uite ce fac pe un array mic de 2 pe 3:"
          },
          {
            "code": "import numpy as np\n\na = np.array([[1, 2, 3],\n              [4, 5, 6]])\nprint(np.fliplr(a))   # oglindă stânga-dreapta\n# [[3 2 1]\n#  [6 5 4]]\nprint(np.rot90(a))    # rotație cu 90°, invers acelor de ceasornic\n# [[3 6]\n#  [2 5]\n#  [1 4]]"
          },
          {
            "p": "`np.fliplr` inversează ordinea coloanelor. Pe o imagine de forma (H, W, 3) face același lucru, deci o oglindește și lasă canalele neatinse. `np.rot90` rotește cu 90 de grade, iar forma (2, 3) devine (3, 2): la o imagine, înălțimea și lățimea își schimbă locul."
          },
          {
            "p": "În practică nu le scrii de mână. torchvision, biblioteca pentru imagini a lui PyTorch (o folosești de la Lecția 14), le are gata făcute, cu tot cu partea aleatoare:"
          },
          {
            "code": "from PIL import Image\nfrom torchvision import transforms\n\naug = transforms.Compose([\n    transforms.Resize((64, 64)),              # toate pozele la 64x64\n    transforms.RandomHorizontalFlip(p=0.5),   # flip, cu șansa 50%\n    transforms.RandomRotation(15),            # între -15 și 15 grade\n    transforms.RandomCrop(56),                # o bucată de 56x56\n    transforms.ColorJitter(brightness=0.2),   # luminozitate x0.8 ... x1.2\n    transforms.ToTensor(),                    # tensor (3, H, W), 0 ... 1\n    transforms.RandomErasing(p=0.5),          # cutout, cu șansa 50%\n])\n\nimg = Image.open(\"pisica.jpg\").convert(\"RGB\")\nx = aug(img)              # la fiecare apel, altă variantă\nprint(x.shape)            # torch.Size([3, 56, 56])"
          },
          {
            "p": "Aici `img` e poza deschisă cu Pillow, ca în Lecția 4, nu un array. `Compose` pune transformările în lanț: poza trece prin ele pe rând, de sus în jos. Cele cu Random în nume dau cu banul la fiecare apel: `p=0.5` înseamnă că se aplică în jumătate din cazuri, iar unghiul și locul decupării se aleg la întâmplare. `ColorJitter(brightness=0.2)` înmulțește luminozitatea cu un număr ales la întâmplare între 0.8 și 1.2. Așa, de fiecare dată când modelul cere poza, vede altă variantă, fără să salvezi copii pe disc."
          },
          {
            "p": "`ToTensor` face din poza Pillow un tensor PyTorch cu valori de la 0 la 1, dar cu canalele primele: forma e (3, H, W), nu (H, W, 3) ca în NumPy. `RandomErasing` e cutout-ul și vine după `ToTensor`, pentru că lucrează pe tensori."
          },
          {
            "p": "Augmentările le aplici doar pe datele de antrenare. Pe validare și test lași imaginile neschimbate, ca scorul să arate cât de bine merge modelul pe poze reale."
          },
          {
            "note": "Un singur lucru contează la augmentare: transformarea trebuie să păstreze eticheta. Un flip orizontal la o pisică e tot o pisică, deci e valid. Dar la cifra 2 sau la litera b, flip-ul schimbă sensul, deci NU e valid. La fel, un 6 rotit cu 180 de grade devine 9. Gândește-te mereu dacă transformarea ar schimba răspunsul corect."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Scrie de mână un filtru Sobel și aplică-l pe o imagine ca să-i scoți marginile."
      },
      {
        "title": "Testează dacă un set de augmentări îmbunătățește scorul pe o problemă mică de clasificare."
      },
      {
        "title": "Ia o listă de augmentări și decide pentru fiecare dacă păstrează eticheta pe o problemă cu cifre."
      }
    ]
  },
  {
    "moduleCode": "S18",
    "duration": "~1 săptămână",
    "intro": "Aici începe deep learning-ul (învățarea profundă): machine learning cu rețele neuronale care au multe straturi. O rețea neuronală e un lanț de straturi, iar antrenarea e ajustarea greutăților ca să scadă eroarea. Greutățile sunt numerele pe care le învață rețeaua, ca w-urile din regresia liniară (Lecția 7). Cheia modulului e să înțelegi ce face backpropagation, nu doar s-o chemi: e metoda prin care rețeaua află încotro să mute fiecare greutate. Când pricepi cum curge gradientul înapoi prin rețea (gradientul e panta erorii, explicată mai jos), restul deep learning-ului devine reglaj, nu mister.",
    "sections": [
      {
        "heading": "De la perceptron la rețea",
        "blocks": [
          {
            "p": "Un exemplu mic: vrei să ghicești dacă un elev trece un test, din două numere de intrare: x₁ = 3 ore de învățat și x₂ = 2 ore pe telefon în seara dinainte. Fiecare intrare are o greutate, care spune cât contează și în ce sens: w₁ = 0.8 (învățatul ajută), w₂ = -0.5 (telefonul încurcă). Se mai adaugă un termen liber, b = -1, ca b-ul din regresia liniară (Lecția 7); în PyTorch îi spune bias. Suma e z = 0.8 · 3 + (-0.5) · 2 + (-1) = 2.4 - 1 - 1 = 0.4."
          },
          {
            "p": "La final, o regulă decide: dacă z e mai mare decât 0, răspunsul e 1 (trece), altfel e 0 (pică). Aici z = 0.4, deci 1. Regula asta e cea mai simplă funcție de activare: funcția care primește suma z și dă ieșirea."
          },
          {
            "p": "Asta face un perceptron, cărămida de bază: ia intrările, le înmulțește cu niște greutăți, le adună cu un termen liber, și trece rezultatul printr-o funcție de activare. Greutățile și termenul liber sunt parametrii lui, numerele pe care le învață din exemple."
          },
          {
            "formula": "ieșire = f(w₁x₁ + w₂x₂ + b)",
            "explain": "f e funcția de activare. Cu mai multe intrări, adaugi câte un produs w · x pentru fiecare, ca la regresia liniară."
          },
          {
            "p": "Singur, învață doar granițe liniare, la fel ca regresia logistică. Granița e locul unde z = 0, aici dreapta 0.8 · x₁ - 0.5 · x₂ - 1 = 0 din planul cu axele x₁ și x₂: punctele (x₁, x₂) de o parte a ei primesc 1, cele de cealaltă parte primesc 0. Dacă elevii care trec și cei care pică nu pot fi despărțiți de o singură dreaptă, un perceptron nu se descurcă."
          },
          {
            "p": "Soluția e să legi mai mulți perceptroni între ei. Într-o rețea, fiecare se numește neuron. Un strat e un grup de neuroni care primesc aceleași intrări, fiecare cu greutățile lui, iar ieșirile unui strat devin intrările stratului următor."
          },
          {
            "p": "Puterea apare când pui multe straturi de neuroni unul după altul: un MLP (perceptron multistrat). Fiecare strat transformă ieșirea celui dinainte. Cu straturi și activări neliniare între ele, rețeaua poate învăța relații oricât de complicate. Fără neliniaritate, oricâte straturi ai pune ar colapsa într-unul singur."
          },
          {
            "p": "Straturile dintre intrări și stratul de ieșire se numesc straturi ascunse, pentru că valorile lor nu apar nicăieri în date. Un MLP mic pentru exemplul cu testul: 2 intrări, un strat ascuns de 3 neuroni, un neuron de ieșire. Fiecare neuron ascuns are 2 greutăți și un termen liber, iar neuronul de ieșire are 3 greutăți (câte una pentru fiecare neuron ascuns) și un termen liber. În total, 3 · 3 + 4 = 13 parametri."
          },
          {
            "p": "Colapsul de mai sus se vede ușor cu numere. Fără funcție de activare, un neuron doar înmulțește și adună, adică e o funcție liniară, ca f(x) = ax + b de la mate, al cărei grafic e o dreaptă. Ia două straturi cu câte un neuron: primul calculează 3x + 1, al doilea înmulțește rezultatul cu 2. Împreună dau 2 · (3x + 1) = 6x + 2, tot o dreaptă. Un singur neuron cu greutatea 6 și termenul liber 2 făcea exact același lucru. Oricâte straturi liniare pui unul după altul, rezultatul rămâne o dreaptă."
          },
          {
            "p": "Funcția de activare aduce neliniaritatea. ReLU (păstrează pozitivul, taie negativul la zero) e cea mai folosită, e simplă și antrenează rapid. Sigmoida și tanh se mai folosesc, dar ReLU e alegerea implicită în straturile ascunse."
          },
          {
            "formula": "ReLU(z) = max(0, z)",
            "explain": "Pozitivul trece neschimbat, negativul devine 0: ReLU(5) = 5, ReLU(0.4) = 0.4, ReLU(-2) = 0. Graficul are un cot în 0, iar din multe coturi puse în locuri diferite, câte unul de la fiecare neuron, rețeaua poate construi aproape orice formă."
          },
          {
            "p": "Sigmoida o știi din Lecția 7: strânge orice număr între 0 și 1, cu σ(0) = 0.5, σ(2) ≈ 0.88 și σ(-2) ≈ 0.12. Tanh are aceeași formă de S, dar strânge numerele între -1 și 1: tanh(0) = 0, tanh(2) ≈ 0.96, tanh(-2) ≈ -0.96."
          }
        ]
      },
      {
        "heading": "Funcția de cost și gradientul",
        "blocks": [
          {
            "p": "Antrenarea are nevoie de o măsură a greșelii: funcția de cost (loss), pe care ai văzut-o în Lecția 7. E un număr care spune cât greșește modelul, iar mai mic e mai bine. Pentru regresie, eroarea pătratică. Pentru clasificare, cross-entropy, care pedepsește tare încrederea greșită. Scopul e să găsești greutățile care fac loss-ul cât mai mic."
          },
          {
            "p": "La regresie se folosește de obicei MSE (mean squared error, media erorilor pătratice): pentru fiecare exemplu scazi răspunsul real din predicție, ridici diferența la pătrat, apoi faci media. Dacă modelul prezice 3 și 5, iar răspunsurile reale sunt 2 și 8, diferențele sunt 1 și -3, pătratele 1 și 9, iar MSE = (1 + 9) / 2 = 5."
          },
          {
            "p": "La clasificare, rețeaua dă câte o probabilitate pentru fiecare clasă, care adunate fac 1 (le obține cu o funcție numită softmax, pe care `nn.CrossEntropyLoss` din PyTorch o aplică singur). Cross-entropy se uită doar la probabilitatea p dată clasei corecte."
          },
          {
            "formula": "loss = -log(p)",
            "explain": "p e probabilitatea pe care modelul a dat-o clasei corecte. p = 0.9 dă un loss de 0.105, p = 0.5 dă 0.69, iar p = 0.1 dă 2.3."
          },
          {
            "p": "Logaritmul îl faci la mate abia în clasa a 10-a; aici îți ajung câteva valori (e logaritmul natural, `math.log` din Python): log(1) = 0, log(0.9) ≈ -0.105, log(0.5) ≈ -0.69, log(0.1) ≈ -2.3. Cu cât p e mai aproape de 0, cu atât log(p) coboară mai jos, iar minusul din față face loss-ul pozitiv. Un model care dă 0.9 clasei corecte plătește 0.105. Unul care greșește sigur pe el, dând clasei corecte doar 0.1, plătește 2.3, de aproape 22 de ori mai mult."
          },
          {
            "p": "Cum găsești greutățile care fac loss-ul mic? Ia cel mai simplu caz: un model cu o singură greutate w și loss-ul L(w) = (w - 3)². Loss-ul e minim, 0, când w = 3, dar modelul nu știe asta. Pornește de la w = 0, unde L = (0 - 3)² = 9."
          },
          {
            "p": "Mută w puțin în sus, la 0.1: L = (0.1 - 3)² = 8.41, deci loss-ul a scăzut cu 0.59. Împarte schimbarea loss-ului la mutarea lui w: -0.59 / 0.1 = -5.9. Cu o mutare și mai mică, la w = 0.01, iese -5.99, tot mai aproape de -6. Numărul ăsta e panta loss-ului în w = 0: cât se schimbă loss-ul la o mutare foarte mică a lui w, raportat la mărimea mutării. Minusul arată că loss-ul scade când w crește."
          },
          {
            "p": "Panta asta e gradientul. Pentru L(w) = (w - 3)², gradientul are formula 2 · (w - 3), care vine din derivate (la mate, în clasa a 11-a); aici o iei ca atare. În w = 0 dă 2 · (0 - 3) = -6, exact ce ai găsit mai sus. Când loss-ul depinde de multe greutăți, gradientul față de una dintre ele se scrie ∂L/∂w și se citește „gradientul lui L față de w”: cât se schimbă L când miști puțin doar w, cu celelalte greutăți ținute pe loc. Semnul ∂ e un d rotunjit care arată tocmai asta, că te uiți la o singură greutate dintre mai multe."
          },
          {
            "p": "Gradientul loss-ului față de fiecare greutate îți spune în ce direcție să miști greutatea ca să crească loss-ul; tu mergi în direcția opusă. În exemplu, gradientul -6 arată că loss-ul crește spre w mai mic, deci tu muți w în sus. Ideea se numește coborâre pe gradient (gradient descent): pas cu pas, cobori panta către minim, punctul unde loss-ul e cel mai mic."
          },
          {
            "formula": "w ← w - η · ∂L/∂w",
            "explain": "Fiecare greutate w se mută cu un pas mic (learning rate η) în direcția opusă gradientului ∂L/∂w. Repeți de mii de ori. Săgeata înseamnă „primește valoarea”, ca `w = w - eta * grad` în Python. η (litera grecească eta) e un număr mic, de exemplu 0.1; ai mai întâlnit learning rate-ul la boosting, în Lecția 9."
          },
          {
            "p": "Doi pași de mână, cu η = 0.1. Pasul 1: în w = 0 gradientul e -6, deci w ← 0 - 0.1 · (-6) = 0.6, iar loss-ul scade de la 9 la (0.6 - 3)² = 5.76. Pasul 2: în w = 0.6 gradientul e 2 · (0.6 - 3) = -4.8, deci w ← 0.6 - 0.1 · (-4.8) = 1.08, iar loss-ul ajunge la 3.69. Pașii se micșorează singuri, pentru că panta se îndulcește pe măsură ce te apropii de minim."
          },
          {
            "code": "w = 0.0\neta = 0.1                    # learning rate\nfor pas in range(1, 31):\n    grad = 2 * (w - 3)       # gradientul lui (w - 3) ** 2 în punctul w\n    w = w - eta * grad       # un pas de coborâre\n    if pas % 10 == 0:\n        print(pas, round(w, 4))\n# afișează:\n# 10 2.6779\n# 20 2.9654\n# 30 2.9963"
          },
          {
            "p": "Codul repetă pasul de 30 de ori și afișează w după fiecare al zecelea pas: greutatea se apropie de 3, deci loss-ul (w - 3)² se apropie de 0."
          }
        ]
      },
      {
        "heading": "Backpropagation: regula lanțului",
        "blocks": [
          {
            "p": "O rețea e un lanț de operații. Ca să afli gradientul loss-ului față de o greutate din primul strat, aplici regula lanțului din analiză (analiza matematică, tot din clasa a 11-a): înmulțești gradienții pas cu pas, de la ieșire înapoi spre intrare. Asta e backpropagation, propagarea înapoi a erorii."
          },
          {
            "p": "Ideea regulii lanțului: ritmurile de schimbare se înmulțesc. Ia y = 3x + 1 și L = 2 · y. Dacă x crește cu 0.1 (de la 1 la 1.1), y crește de 3 ori mai mult, cu 0.3 (de la 4 la 4.3). L crește de 2 ori cât y, cu 0.6 (de la 8 la 8.6). Deci L se schimbă de 3 · 2 = 6 ori mai repede decât x, ca în exemplul cu straturile: 2 · (3x + 1) = 6x + 2."
          },
          {
            "p": "Același lucru într-o rețea minusculă, cu o singură greutate: intrarea x = 2, predicția p = w · x, răspunsul corect 8 și loss-ul L = (p - 8)². Pornești cu w = 1, deci p = 2 și L = 36. Lanțul are două verigi. Prima e gradientul lui L față de p: după aceeași formulă ca la (w - 3)², e 2 · (p - 8) = 2 · (2 - 8) = -12. A doua e cât de repede se schimbă p când se schimbă w: p = w · 2, deci de 2 ori mai repede. Le înmulțești: ∂L/∂w = -12 · 2 = -24. Verifici cu o mutare mică: la w = 1.01, L scade la 35.76, adică cu 0.24, de 24 de ori cât mutarea de 0.01."
          },
          {
            "p": "Concret: fiecare operație din rețea știe cum să-și transmită gradientul înapoi. Pornești de la loss, mergi înapoi strat cu strat, și la final ai gradientul pentru fiecare greutate din rețea, dintr-o singură trecere. Produsul calculat până la un strat e refolosit pentru stratul de dinaintea lui, deci nu iei lanțul de la capăt pentru fiecare greutate. E ce face eficient antrenarea rețelelor mari."
          },
          {
            "note": "Backpropagation calculează gradienții. NU actualizează greutățile. Actualizarea o face optimizatorul, într-un pas separat. Optimizatorul e bucata de cod care aplică regula w ← w - η · ∂L/∂w, sau o variantă mai isteață a ei (le vezi în Lecția 15). Confuzia asta e frecventă: sunt două lucruri diferite."
          }
        ]
      },
      {
        "heading": "PyTorch: cum arată în cod",
        "blocks": [
          {
            "p": "PyTorch e biblioteca pentru rețele neuronale pomenită în Lecția 1. O instalezi cu `pip install torch`, în mediul virtual."
          },
          {
            "p": "PyTorch lucrează cu tensori care își rețin gradientul automat. Un tensor (grila de numere din Lecția 13) seamănă cu un array NumPy din Lecția 4, cu o diferență: își amintește din ce operații a ieșit, așa că PyTorch poate face singur backpropagation."
          },
          {
            "code": "import torch\n\nw = torch.tensor(0.0, requires_grad=True)   # o greutate, cu gradient\nL = (w - 3) ** 2          # loss-ul din exemplul cu panta\nL.backward()              # backpropagation: calculează gradientul\nprint(w.grad)             # tensor(-6.)\n\nL = (w - 3) ** 2\nL.backward()              # încă o dată, fără să ștergi\nprint(w.grad)             # tensor(-12.): -6 s-a adunat peste -6"
          },
          {
            "p": "`requires_grad=True` îi cere lui PyTorch să urmărească tot ce se calculează din w. `L.backward()` face backpropagation și pune gradientul în `w.grad`: -6 (afișat ca `tensor(-6.)`), ca la calculul de mână. A doua oară, gradientul nou s-a adunat peste cel vechi: PyTorch nu șterge singur gradienții, de aceea bucla de antrenare cheamă `zero_grad()`."
          },
          {
            "p": "Rețeaua o definești ca `nn.Module`: îți scrii o clasă (Lecția 3) care moștenește din `nn.Module`, clasa de bază a PyTorch pentru modele. În `__init__` creezi straturile, iar în metoda `forward` scrii cum trec datele prin ele. Stratul de bază e `nn.Linear(intrări, neuroni)`, în care fiecare neuron e legat de toate intrările; i se mai spune strat dens. De exemplu, `nn.Linear(2, 3)` e stratul ascuns din exemplul cu testul: 3 neuroni cu câte 2 greutăți, plus 3 termeni liberi."
          },
          {
            "p": "Datele le împachetezi într-un `Dataset` și un `DataLoader`. Dataset-ul ține perechile (intrare, răspuns corect) și ți-o dă pe oricare după numărul ei. DataLoader-ul ia Dataset-ul și ți-l dă în loturi (batches), adică grupuri mici de exemple procesate deodată, de exemplu câte 20. De ce loturi și cât de mari, vezi în Lecția 15."
          },
          {
            "p": "La fiecare pas, adică pentru fiecare lot, faci patru lucruri, mereu în aceeași ordine."
          },
          {
            "steps": [
              "Treci datele prin model și calculezi loss-ul (forward, trecerea înainte).",
              "`loss.backward()`: backpropagation calculează gradienții.",
              "`optimizer.step()`: optimizatorul actualizează greutățile cu gradienții.",
              "`optimizer.zero_grad()`: ștergi gradienții, ca să nu se adune la pasul următor."
            ]
          },
          {
            "code": "for x, y in dataloader:\n    pred = model(x)                # forward\n    loss = criterion(pred, y)\n    loss.backward()                # calculează gradienții\n    optimizer.step()               # actualizează greutățile\n    optimizer.zero_grad()          # curăță pentru pasul următor"
          },
          {
            "p": "La fiecare tură a buclei, `dataloader` îți dă un lot: `x` are intrările, `y` răspunsurile corecte. `model(x)` cheamă `forward` și întoarce predicțiile. `criterion` e funcția de loss (criteriul după care judeci predicția): `nn.MSELoss()` pentru numere, `nn.CrossEntropyLoss()` pentru clase. Optimizatorul se creează, de exemplu, cu `torch.optim.SGD(model.parameters(), lr=0.1)`: primește parametrii modelului și learning rate-ul, iar `step()` aplică pe fiecare parametru regula w ← w - η · ∂L/∂w."
          }
        ]
      },
      {
        "heading": "Un exemplu complet, de rulat",
        "blocks": [
          {
            "p": "Codul de mai jos pune toate piesele laolaltă și merge rulat așa cum e. Rețeaua învață din 200 de exemple inventate relația y = x², care nu e o dreaptă, cu un strat ascuns de 32 de neuroni cu ReLU. Loss-ul e MSE, pentru că prezice un număr."
          },
          {
            "code": "import torch\nfrom torch import nn\nfrom torch.utils.data import TensorDataset, DataLoader\n\ntorch.manual_seed(0)          # aceleași numere aleatoare la fiecare rulare\n\n# date inventate: 200 de valori x între -2 și 2, ținta e x la pătrat\nX_train = torch.linspace(-2, 2, 200).reshape(-1, 1)   # forma (200, 1)\ny_train = X_train ** 2\n\nclass Retea(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.ascuns = nn.Linear(1, 32)    # strat ascuns: 32 de neuroni\n        self.iesire = nn.Linear(32, 1)    # un neuron de ieșire\n\n    def forward(self, x):\n        h = torch.relu(self.ascuns(x))    # activarea ReLU\n        return self.iesire(h)\n\nmodel = Retea()\ndate = TensorDataset(X_train, y_train)\ndataloader = DataLoader(date, batch_size=20, shuffle=True)\ncriterion = nn.MSELoss()\noptimizer = torch.optim.SGD(model.parameters(), lr=0.1)\n\nfor epoca in range(1, 101):       # 100 de treceri prin toate datele\n    total = 0\n    for x, y in dataloader:       # 10 loturi a câte 20 de exemple\n        pred = model(x)\n        loss = criterion(pred, y)\n        loss.backward()\n        optimizer.step()\n        optimizer.zero_grad()\n        total += loss.item()\n    if epoca in [1, 10, 50, 100]:\n        print(epoca, round(total / len(dataloader), 4))\n\nx_nou = torch.tensor([[1.5]])          # un exemplu nou, forma (1, 1)\nprint(round(model(x_nou).item(), 3))   # răspunsul corect: 1.5 ** 2 = 2.25\n# afișează:\n# 1 0.9165\n# 10 0.0135\n# 50 0.0023\n# 100 0.0012\n# 2.272"
          },
          {
            "list": [
              "`torch.linspace(-2, 2, 200)` dă 200 de numere egal depărtate între -2 și 2, ca `np.linspace` din Lecția 4, iar `.reshape(-1, 1)` le așază pe o coloană: 200 de rânduri, câte o trăsătură (-1 înseamnă „câte rânduri ies”).",
              "`super().__init__()` pregătește partea moștenită din `nn.Module`, ca `super()` din Lecția 3.",
              "`TensorDataset` e un Dataset gata făcut pentru date care stau deja în tensori. `batch_size=20` dă 10 loturi de câte 20, iar `shuffle=True` amestecă exemplele la fiecare trecere.",
              "Bucla de afară trece de 100 de ori prin toate datele; o trecere completă se numește epocă (o explică Lecția 15). Înăuntru e bucla de mai sus, neschimbată.",
              "`loss.item()` scoate numărul din tensor, iar `total / len(dataloader)` e loss-ul mediu pe cele 10 loturi ale epocii.",
              "`torch.manual_seed(0)` fixează greutățile de pornire și ordinea amestecării (ca `random.seed` din Lecția 3), deci obții aceleași numere ca în comentarii."
            ]
          },
          {
            "p": "Loss-ul mediu scade de la 0.92 la 0.0012, iar pentru x = 1.5 rețeaua prezice 2.272, aproape de răspunsul corect, 2.25. Încearcă să scoți `torch.relu` din `forward`: loss-ul rămâne pe la 1.46, iar rețeaua dă cam 1.46 pentru orice x, o dreaptă orizontală. Fără activare, cele două straturi s-au strâns într-unul singur, ca la 2 · (3x + 1)."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Construiește backpropagation de mână pentru o rețea cu un strat ascuns, pe hârtie."
      },
      {
        "title": "Antrenează un MLP pe un set mic în PyTorch și urmărește loss-ul cum scade."
      },
      {
        "title": "Scoate intenționat zero_grad() și observă cum o ia razna antrenarea."
      }
    ]
  },
  {
    "moduleCode": "S19",
    "duration": "~1 săptămână",
    "intro": "Un model bun antrenat prost nu învață. Modulul ăsta e despre bucla de antrenare din Lecția 14 (forward, backward, step, zero_grad): cum alegi optimizatorul, cum reglezi learning rate-ul (butonul cel mai important), și cum ții overfitting-ul sub control. Overfitting înseamnă că modelul a învățat pe de rost exemplele de antrenare și greșește pe date noi (Lecția 1). Aceleași straturi, antrenate cu grijă sau la nimereală, dau rezultate complet diferite.",
    "sections": [
      {
        "heading": "Epoci, loturi, pași",
        "blocks": [
          {
            "p": "Trei cuvinte de fixat. Un lot (batch) e un grup mic de exemple pe care le procesezi deodată. O epocă e o trecere completă prin tot setul de antrenare. Un pas (step) e o actualizare a greutăților, adică un lot procesat. Antrenezi de obicei multe epoci, fiecare cu mulți pași."
          },
          {
            "p": "Cu numere: ai 1000 de exemple de antrenare și loturi de câte 100 (batch size, mărimea lotului, e 100). O epocă are 1000 / 100 = 10 pași. Dacă antrenezi 20 de epoci, faci 20 · 10 = 200 de pași: greutățile se actualizează de 200 de ori, iar fiecare exemplu e văzut de 20 de ori. În exemplul complet din Lecția 14 erau 200 de exemple, loturi de 20 și 100 de epoci, deci 10 pași pe epocă și 1000 în total."
          },
          {
            "p": "De ce loturi și nu tot setul deodată? Pentru că e mai rapid și adaugă un zgomot util care ajută modelul să nu se blocheze. De ce nu câte un exemplu? Pentru că loturile folosesc mai bine hardware-ul. Un batch size între 32 și 256 e tipic."
          },
          {
            "p": "Mai rapid, pentru că la o trecere prin date modelul se corectează de 10 ori, nu o singură dată. Zgomotul vine din faptul că gradientul calculat pe 100 de exemple e doar o estimare a celui pe toate 1000, puțin diferită de la un lot la altul. Pașii nu merg perfect drept spre minim, ci ușor în zigzag, iar zigzagul poate scoate modelul dintr-o groapă mică a loss-ului, unde altfel s-ar bloca."
          },
          {
            "p": "Hardware-ul e partea fizică a calculatorului. Rețelele se antrenează de obicei pe placa video (GPU), care face mii de înmulțiri în paralel, iar cu un singur exemplu cea mai mare parte din ea ar sta degeaba. Un lot de 64 de exemple se calculează mult mai repede decât 64 de exemple luate pe rând, la fel ca la vectorizarea din Lecția 4."
          }
        ]
      },
      {
        "heading": "Optimizatoare",
        "blocks": [
          {
            "p": "Optimizatorul decide cum folosește gradienții ca să actualizeze greutățile; el face `optimizer.step()` în bucla din Lecția 14. SGD (coborâre pe gradient stochastică) cu momentum e solid și de încredere: momentum-ul adaugă inerție, ca o bilă care se rostogolește, ca să treacă peste denivelări mici."
          },
          {
            "p": "SGD simplu e chiar regula din Lecția 14, w ← w - η · ∂L/∂w. Stochastic înseamnă „cu o parte de întâmplare”: gradientul nu e calculat pe tot setul, ci pe un lot ales la întâmplare. Cu momentum, fiecare pas păstrează o parte din pasul de dinainte, de obicei 90% (`momentum=0.9`). Când gradienții arată mereu în aceeași direcție, pașii se lungesc, iar când se contrazic de la un lot la altul, se anulează parțial și zigzagul se domolește."
          },
          {
            "p": "Adam și AdamW se adaptează singure: dau pași mai mari unde e nevoie și mai mici unde nu. Concret, Adam ține socoteala, pentru fiecare greutate, cât de mari sunt de obicei gradienții ei și împarte la mărimea asta, așa că înaintează și greutățile cu gradienți mici. Pornesc mai ușor și cer mai puțin reglaj, de aceea sunt alegerea implicită pentru mulți. AdamW gestionează mai corect weight decay-ul. Începe cu Adam/AdamW dacă nu ești sigur."
          },
          {
            "p": "Weight decay (micșorarea greutăților) trage la fiecare pas fiecare greutate puțin spre 0, cu atât mai tare cu cât e mai mare. Îl reglezi cu un număr, de exemplu `weight_decay=0.01`. Când îi dai weight decay lui Adam, el adaugă micșorarea la gradient, iar pașii lui adaptivi o deformează. AdamW o aplică separat, direct pe greutăți, de aceea e mai corect."
          },
          {
            "code": "import torch\nfrom torch import nn\n\nmodel = nn.Linear(10, 1)      # orice model; aici, un singur strat\nsgd = torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.9)\nadam = torch.optim.Adam(model.parameters(), lr=0.001)\nadamw = torch.optim.AdamW(model.parameters(), lr=0.001, weight_decay=0.01)"
          },
          {
            "p": "Într-un program creezi unul singur, nu pe toate trei. Fiecare primește `model.parameters()`, greutățile pe care le mută, și `lr`, learning rate-ul. Valorile din cod sunt puncte de pornire obișnuite."
          }
        ]
      },
      {
        "heading": "Learning rate, butonul cel mai important",
        "blocks": [
          {
            "p": "Learning rate-ul (η) e mărimea pasului la fiecare actualizare. E cel mai important hiperparametru din tot deep learning-ul (hiperparametru: o setare pe care o alegi tu înainte de antrenare, Lecția 9). Prea mare: loss-ul sare haotic sau explodează, modelul diverge. Prea mic: învață dureros de lent sau se blochează înainte să ajungă undeva bun."
          },
          {
            "p": "A diverge înseamnă că modelul, în loc să se apropie de minim, se depărtează tot mai mult de el, iar loss-ul crește de la un pas la altul. Codul de mai jos reia exemplul din Lecția 14, L(w) = (w - 3)² cu pornire din w = 0, și face 20 de pași cu trei learning rate-uri."
          },
          {
            "code": "for eta in [1.1, 0.1, 0.001]:\n    w = 0.0\n    for pas in range(20):\n        w = w - eta * 2 * (w - 3)       # pasul din Lecția 14\n    print(eta, round((w - 3) ** 2, 4))  # loss-ul după 20 de pași\n# afișează:\n# 1.1 13227.9441\n# 0.1 0.0012\n# 0.001 8.3074"
          },
          {
            "p": "Cu 1.1, fiecare pas sare peste 3, tot mai departe (w = 6.6, apoi -1.32, apoi 8.18), iar după 20 de pași loss-ul trece de 13000: a divergat. Cu 0.1 ajunge la 0.0012. Cu 0.001 abia s-a mișcat, de la 9 la 8.31."
          },
          {
            "p": "Nu-l ghici, caută-l. Încearcă valori pe o scară logaritmică (de exemplu 0.1, 0.01, 0.001) și uită-te la curba de loss. Vrei cel mai mare learning rate cu care loss-ul încă scade lin, nu haotic."
          },
          {
            "p": "Pe o scară logaritmică, fiecare valoare e de 10 ori mai mică decât cea dinainte. Așa acoperi în câteva încercări tot intervalul util, de la 1 la 0.00001, pe când între 0.1 și 0.09 diferența abia se simte. Curba de loss e graficul cu loss-ul pe verticală și pașii sau epocile pe orizontală. Nu e curba de învățare din Lecția 8, unde pe orizontală era cantitatea de date. Cu un learning rate bun, curba coboară repede la început, apoi tot mai încet, și se așază. Cu unul prea mare, sare în sus și în jos sau urcă. Cu unul prea mic, coboară aproape plat."
          },
          {
            "p": "Scheduler-ele schimbă learning rate-ul în timpul antrenării. O rețetă care merge des: un warmup scurt la început (crești rata treptat, ca să nu destabilizezi), urmat de o scădere lină (cosine) spre final, ca să te așezi fin în minim."
          },
          {
            "p": "Warmup înseamnă „încălzire”: la pornire greutățile sunt aleatoare, iar primii gradienți pot fi mari și haotici. Așa că începi cu un pas mic și îl crești treptat, de exemplu de la 0.01 la 0.1 în primii 10 pași. Cosine: după warmup, learning rate-ul coboară lin spre 0 după forma funcției cosinus de la trigonometrie, încet la început, mai repede pe la mijloc și iar încet la final. Pașii mici de la final nu mai sar peste minim, ci se așază în el."
          },
          {
            "code": "import torch\nfrom torch import nn\nfrom torch.optim import lr_scheduler\n\nmodel = nn.Linear(10, 1)\noptimizer = torch.optim.SGD(model.parameters(), lr=0.1)\n\n# primii 10 pași: warmup, lr urcă de la 0.01 la 0.1\nwarmup = lr_scheduler.LinearLR(optimizer, start_factor=0.1, total_iters=10)\n# următorii 90 de pași: cosine, lr coboară lin spre 0\ncosine = lr_scheduler.CosineAnnealingLR(optimizer, T_max=90)\nscheduler = lr_scheduler.SequentialLR(optimizer, [warmup, cosine],\n                                      milestones=[10])\n\nfor pas in range(100):\n    lr = scheduler.get_last_lr()[0]    # lr-ul folosit la pasul ăsta\n    if pas in [0, 5, 10, 55, 99]:\n        print(pas, round(lr, 4))\n    # ... forward, loss.backward() ...\n    optimizer.step()\n    optimizer.zero_grad()\n    scheduler.step()                   # pregătește lr-ul pasului următor\n# afișează:\n# 0 0.01\n# 5 0.055\n# 10 0.1\n# 55 0.05\n# 99 0.0"
          },
          {
            "p": "`LinearLR` face warmup-ul: înmulțește lr-ul cu un factor care urcă de la 0.1 la 1 în 10 pași. `CosineAnnealingLR` face coborârea, în `T_max=90` de pași. `SequentialLR` le pune unul după altul: primul până la pasul 10 (`milestones=[10]`), apoi al doilea. `get_last_lr()` dă lista cu lr-ul curent, iar `[0]` ia primul element. `scheduler.step()` se cheamă o dată pe pas, după `optimizer.step()`. La pasul 99, lr-ul e 0.00003, de aceea apare rotunjit la 0.0."
          },
          {
            "note": "Dacă antrenarea o ia razna sau loss-ul devine NaN, primul lucru pe care îl încerci e să scazi learning rate-ul. De cele mai multe ori asta e cauza. NaN (not a number, „nu e un număr”) e rezultatul unui calcul fără sens. Apare, de exemplu, când greutățile cresc atât de mult încât trec de cel mai mare număr pe care îl poate ține calculatorul și devin infinit, iar programul ajunge să calculeze infinit minus infinit. Odată apărut, se întinde: orice calcul cu NaN dă tot NaN, deci loss-ul rămâne `nan` până la final."
          }
        ]
      },
      {
        "heading": "Regularizarea: ține overfitting-ul în frâu",
        "blocks": [
          {
            "p": "Regularizarea e orice tehnică prin care împiedici modelul să memoreze antrenarea. Fără ea, o rețea mare învață pe de rost exemplele și cade pe date noi. Ai mai multe unelte, folosite des împreună:"
          },
          {
            "list": [
              "Dropout: la antrenare, oprește aleator o parte din neuroni la fiecare pas. Forțează rețeaua să nu se bazeze pe un singur drum, deci generalizează mai bine, adică merge bine și pe date pe care nu le-a văzut.",
              "Weight decay: penalizează greutățile mari, ținându-le mici și modelul simplu. E micșorarea spre 0 de la optimizatoare: cu greutăți mici, predicția nu sare brusc la o schimbare mică a intrării, deci modelul nu poate urmări fiecare detaliu al unui exemplu.",
              "Batch normalization: normalizează activările în fiecare lot, stabilizează și accelerează antrenarea. Activările sunt ieșirile neuronilor după funcția de activare, numerele care trec de la un strat la altul.",
              "Early stopping: oprești când scorul pe validare începe să se înrăutățească, chiar dacă cel pe antrenare încă scade. L-ai văzut la boosting, în Lecția 9."
            ]
          },
          {
            "p": "Dropout cu p = 0.5 înseamnă că, la fiecare pas, fiecare neuron dă 0 cu șansa de 50%, deci în medie jumătate dintre ei tac, de fiecare dată alții. La predicție se folosesc toți neuronii, iar `model.eval()` e comanda care trece modelul în modul ăsta. Codul de mai jos aplică dropout pe 8 activări egale cu 1."
          },
          {
            "code": "import torch\nfrom torch import nn\n\ntorch.manual_seed(0)\ndrop = nn.Dropout(p=0.5)\nx = torch.ones(8)          # 8 activări, toate egale cu 1\n\ndrop.train()               # modul de antrenare\nprint(drop(x))             # tensor([0., 0., 2., 0., 0., 0., 2., 2.])\nprint(drop(x))             # tensor([0., 2., 2., 2., 2., 0., 2., 2.])\ndrop.eval()                # modul de predicție\nprint(drop(x))             # tensor([1., 1., 1., 1., 1., 1., 1., 1.])"
          },
          {
            "p": "La primul pas au rămas 3 activări din 8, la al doilea 6 din 8: jumătatea e doar o medie. Cele rămase sunt înmulțite cu 2, adică 1 / (1 - 0.5), ca suma să fie în medie aceeași ca la predicție, când nu se oprește nimic. Pe un model întreg, `model.train()` și `model.eval()` schimbă modul tuturor straturilor lui."
          },
          {
            "p": "Batch norm aplică standardizarea din Lecția 5 pe fiecare lot: scade media lotului și împarte la deviația standard. Dacă un neuron dă 2, 4 și 6 pe cele 3 exemple ale unui lot, după batch norm dă -1.22, 0 și 1.22, cu media 0 și deviația 1. Apoi stratul învață, pentru fiecare neuron, două numere cu care poate întinde și muta rezultatul. La predicție, după `model.eval()`, folosește media și deviația adunate în timpul antrenării, nu pe ale lotului curent. Într-o rețea, cele două straturi stau așa:"
          },
          {
            "code": "import torch\nfrom torch import nn\n\nmodel = nn.Sequential(\n    nn.Linear(20, 64),\n    nn.BatchNorm1d(64),   # normalizează cele 64 de activări pe fiecare lot\n    nn.ReLU(),\n    nn.Dropout(p=0.5),    # la antrenare, în medie jumătate devin 0\n    nn.Linear(64, 2),\n)"
          },
          {
            "p": "`nn.Sequential` e un `nn.Module` gata făcut: trece datele prin straturi în ordinea în care le scrii, fără să mai scrii tu `forward`."
          },
          {
            "p": "Early stopping cu răbdare: loss-ul de validare mai sare puțin de la o epocă la alta, așa că nu te oprești la prima înrăutățire. Aștepți un număr de epoci numit răbdare (patience) și te oprești doar dacă în tot timpul ăsta n-a apărut un loss de validare mai bun. Cu răbdarea 3 și loss-ul de validare 0.50, 0.42, 0.38, 0.39, 0.37, 0.40, 0.41, 0.43, cel mai bun e 0.37, la epoca 5. Urmează 3 epoci fără ceva mai bun, așa că te oprești după epoca 8 și păstrezi greutățile din epoca 5. Schița de mai jos face asta în cod, cu răbdarea 5."
          },
          {
            "code": "def evalueaza(model):\n    model.eval()                # dropout oprit, batch norm pentru predicție\n    with torch.no_grad():       # doar măsori, fără gradienți\n        return criterion(model(X_val), y_val).item()\n\ncel_mai_bun = float(\"inf\")      # mai mare decât orice loss\nrabdare = 5                     # câte epoci aștepți fără progres\nfara_progres = 0\nfor epoca in range(1, 201):\n    antreneaza_o_epoca(model)   # bucla din Lecția 14, o dată prin date\n    val_loss = evalueaza(model)\n    if val_loss < cel_mai_bun:\n        cel_mai_bun = val_loss\n        torch.save(model.state_dict(), \"cel_mai_bun.pt\")\n        fara_progres = 0\n    else:\n        fara_progres += 1\n        if fara_progres == rabdare:\n            break               # 5 epoci la rând fără progres: te oprești\n\nmodel.load_state_dict(torch.load(\"cel_mai_bun.pt\"))"
          },
          {
            "p": "`antreneaza_o_epoca` o scrii tu: e bucla din Lecția 14, pusă într-o funcție care începe cu `model.train()`. `evalueaza` măsoară loss-ul pe datele de validare (`X_val`, `y_val`). `with torch.no_grad():` îi spune lui PyTorch să nu mai urmărească operațiile pentru gradienți, fiindcă aici doar măsori. `float(\"inf\")` e infinitul, mai mare decât orice loss, ca prima epocă să iasă sigur cea mai bună de până atunci. `model.state_dict()` e dicționarul cu toate greutățile modelului: `torch.save` îl scrie într-un fișier, iar la final `load_state_dict` pune înapoi greutățile din epoca cea mai bună."
          },
          {
            "p": "Inițializarea greutăților contează mai mult decât pare la început. Inițializarea înseamnă valorile cu care pornesc greutățile, înainte de primul pas: PyTorch le alege la întâmplare și mici, de aceea `torch.manual_seed` face rezultatele repetabile. Greutăți pornite prost pot bloca antrenarea de la zero. Dacă toate greutățile unui strat ar porni de la aceeași valoare, toți neuronii lui ar calcula același lucru și ar primi același gradient, deci ar rămâne copii unul al altuia: 64 de neuroni care se poartă ca unul. Din fericire, straturile din PyTorch au inițializări bune implicit, deci rar trebuie să intervii, dar merită să știi că e un factor."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Testează trei learning rate-uri pe o scară logaritmică și desenează curbele de loss."
      },
      {
        "title": "Adaugă dropout și early stopping la o rețea și vezi efectul pe validare."
      },
      {
        "title": "Compară SGD cu momentum și Adam pe aceeași problemă mică."
      }
    ]
  },
  {
    "moduleCode": "S20",
    "duration": "~1 săptămână",
    "intro": "Mai devreme sau mai târziu, o rețea refuză să învețe: loss-ul stă pe loc, sau scorul e la nivel de ghicit, adică cât ai lua fără să te uiți la date, de exemplu spunând mereu clasa cea mai frecventă, ca baseline-ul din Lecția 6. Panica și schimbatul la nimereală nu ajută. Ai o listă de verificări, în ordine, de la simplu la complex. De cele mai multe ori problema e banală și e pe la începutul listei.",
    "sections": [
      {
        "heading": "Testul care rezolvă jumătate din cazuri",
        "blocks": [
          {
            "p": "Înainte de orice, verifică dacă modelul poate face overfit pe 10 exemple, adică dacă le poate învăța pe de rost (Lecția 1). Iei zece exemple, oprești orice regularizare (fără dropout, fără weight decay, Lecția 15), și antrenezi până ar trebui să le memoreze perfect. Dacă loss-ul ajunge aproape de zero, mecanismul de învățare funcționează și problema e în altă parte (date, regularizare prea agresivă)."
          },
          {
            "p": "Testul are sens pentru că memorarea e cel mai ușor lucru pe care i-l poți cere unei rețele. Chiar și o rețea mică are sute de greutăți, iar 10 exemple sunt nimic pentru ea. Dacă datele ajung corect în model, loss-ul e calculat corect, gradienții curg înapoi și optimizatorul mută greutățile, loss-ul trebuie să coboare aproape de 0. Pe 10 exemple, testul durează câteva secunde."
          },
          {
            "code": "import torch\nfrom torch import nn\n\ntorch.manual_seed(0)\nX = torch.randn(10, 5)              # 10 exemple, 5 trăsături inventate\ny = torch.randint(0, 2, (10,))      # 10 etichete la întâmplare: 0 sau 1\n\nmodel = nn.Sequential(nn.Linear(5, 32), nn.ReLU(), nn.Linear(32, 2))\ncriterion = nn.CrossEntropyLoss()\noptimizer = torch.optim.Adam(model.parameters(), lr=0.01)\n\nfor pas in range(1, 301):\n    loss = criterion(model(X), y)   # toate cele 10 exemple, la fiecare pas\n    loss.backward()\n    optimizer.step()\n    optimizer.zero_grad()\n    if pas in [1, 100, 200, 300]:\n        print(pas, round(loss.item(), 4))\n\nprint(model(X).argmax(dim=1))       # clasa aleasă pentru fiecare exemplu\nprint(y)                            # etichetele adevărate\n# afișează:\n# 1 0.6561\n# 100 0.0047\n# 200 0.0012\n# 300 0.0006\n# tensor([0, 0, 0, 0, 1, 1, 0, 0, 0, 1])\n# tensor([0, 0, 0, 0, 1, 1, 0, 0, 0, 1])"
          },
          {
            "p": "`torch.randn(10, 5)` dă 10 rânduri cu câte 5 numere aleatoare în jurul lui 0. `torch.randint(0, 2, (10,))` dă 10 numere întregi de la 0 până la 2, fără 2 (ca la `range`), deci 0 sau 1. Etichetele sunt la întâmplare, deci nu există nicio regulă de învățat: rețeaua le poate doar memora, exact ce verifici. Toate cele 10 exemple intră la fiecare pas, fără DataLoader. Pentru fiecare exemplu, rețeaua dă două numere, câte un scor pentru fiecare clasă, iar `nn.CrossEntropyLoss` le face probabilități (Lecția 14)."
          },
          {
            "p": "Loss-ul pornește de la 0.66, aproape de -log(0.5) = 0.69, cât iei când dai 50% fiecărei clase, și ajunge la 0.0006. `argmax(dim=1)` alege pentru fiecare rând clasa cu scorul mai mare, iar predicțiile ies identice cu etichetele. Pe datele tale, faci testul cu modelul tău și cu primele 10 rânduri, `X_train[:10]` și `y_train[:10]`."
          },
          {
            "note": "Dacă nici pe zece exemple modelul nu ajunge la loss aproape zero, ai un BUG, nu o problemă de capacitate sau de date. Capacitatea e cât de mult poate învăța un model și crește cu numărul de greutăți; pentru 10 exemple, aproape orice rețea are destulă. Nu are rost să antrenezi mai mult sau să mărești rețeaua. Ceva e stricat în cod, în date sau în conexiuni (felul în care sunt legate straturile între ele)."
          }
        ]
      },
      {
        "heading": "Lista de verificări, în ordine",
        "blocks": [
          {
            "p": "Dacă testul de overfit pe 10 exemple pică, treci prin lista asta, de sus în jos. Sunt cauzele cele mai frecvente, ordonate cam după cât de des apar."
          },
          {
            "steps": [
              "Learning rate: prea mare (loss haotic sau NaN, rezultatul unui calcul scăpat de sub control, Lecția 15) sau prea mic (nu se mișcă). Încearcă altă valoare întâi, de 10 ori mai mică sau mai mare.",
              "Normalizarea datelor: intrările sunt scalate? O rețea primește greu date pe intervale uriașe sau inconsistente. Standardizează coloanele (media 0, deviația 1, Lecția 5) și adu pixelii la 0..1 (Lecția 13).",
              "Etichetele: sunt aliniate corect cu intrările? Ai amestecat ordinea? Ai funcția de loss potrivită tipului de problemă? Rândul i din X trebuie să aibă eticheta lui pe rândul i din y, iar dacă amesteci doar X, perechile se strică. Pentru clase folosești `nn.CrossEntropyLoss`, pentru numere `nn.MSELoss`.",
              "zero_grad: chemi optimizer.zero_grad() la fiecare pas? Fără el, gradienții se adună și antrenarea o ia razna. În Lecția 14 ai văzut cum gradientul -6 devine -12.",
              "Inițializare și gradienți: verifică dacă gradienții explodează (devin uriași) sau dispar (devin zero). Batch norm și inițializarea bună ajută."
            ]
          },
          {
            "p": "Gradienții explodează sau dispar din cauza regulii lanțului din Lecția 14: backpropagation înmulțește gradientul cu câte un factor la fiecare strat. Dacă factorii sunt pe la 0.5, după 20 de straturi gradientul e înmulțit cu 0.5 la puterea 20, cam 0.000001, și primele straturi aproape nu mai învață. Dacă sunt pe la 2, e înmulțit cu 2 la puterea 20, cam un milion, iar pașii aruncă greutățile cât colo, până la NaN. Ca să verifici, după `loss.backward()` te uiți la mărimea gradienților, strat cu strat:"
          },
          {
            "code": "torch.manual_seed(0)                # aceeași rețea ca mai sus, neantrenată\nX = torch.randn(10, 5)\ny = torch.randint(0, 2, (10,))\nmodel = nn.Sequential(nn.Linear(5, 32), nn.ReLU(), nn.Linear(32, 2))\n\nloss = criterion(model(X), y)\nloss.backward()                     # calculează gradienții, fără niciun pas\nfor nume, p in model.named_parameters():\n    print(nume, round(p.grad.abs().mean().item(), 4))\n# afișează:\n# 0.weight 0.0087\n# 0.bias 0.0119\n# 2.weight 0.0539\n# 2.bias 0.207"
          },
          {
            "p": "`named_parameters()` dă perechi (nume, tensor): `0.weight` sunt greutățile stratului de pe poziția 0 din `nn.Sequential`, iar `2.bias` termenii liberi ai stratului de pe poziția 2. `.abs()` ia valoarea absolută (fără semn), iar `.mean()` face media. Valori ca 0.01 sau 0.2 sunt normale. 0.0 la primele straturi înseamnă gradienți care dispar, iar mii sau milioane înseamnă gradienți care explodează."
          }
        ]
      },
      {
        "heading": "Cum citești curba de loss",
        "blocks": [
          {
            "p": "Curba de loss e principalul instrument de diagnostic. Uită-te la ea, nu doar la scorul final. Fiecare formă îți spune altceva."
          },
          {
            "p": "Curba are loss-ul pe verticală și epocile pe orizontală (Lecția 15), de obicei cu două linii: una pentru antrenare, una pentru validare. O curbă sănătoasă, la o clasificare cu două clase, arată cam așa de la o epocă la alta: 0.69, 0.45, 0.31, 0.24, 0.21, 0.20. Coboară repede la început, apoi tot mai încet, și se așază, cu validarea puțin deasupra antrenării."
          },
          {
            "list": [
              "Loss plat de la început: învățarea nu pornește. Cel mai des, learning rate sau date. De exemplu 0.693, 0.693, 0.692, 0.693, adică exact -log(0.5): modelul dă 50% fiecărei clase și nu se clintește.",
              "Loss care explodează sau devine NaN: learning rate prea mare sau gradienți care explodează. De exemplu 0.69, 0.81, 3.5, 140, apoi nan.",
              "Loss de antrenare scade, cel de validare crește: overfitting, adaugă regularizare. De exemplu, antrenarea 0.60, 0.40, 0.25, 0.12, 0.05 și validarea 0.62, 0.48, 0.45, 0.50, 0.61: momentul bun e minimul validării, epoca 3, unde te-ar opri early stopping.",
              "Loss zgomotos dar în scădere: probabil normal, poate un batch size prea mic. De exemplu 0.90, 0.75, 0.82, 0.61, 0.66, 0.50: urcă și coboară de la o epocă la alta, dar tendința e în jos, iar loturile mici dau gradienți mai zgomotoși (Lecția 15)."
            ]
          },
          {
            "p": "Codul de mai jos produce a treia formă cu numere reale: doar 10 exemple de antrenare și o rețea mult prea mare pentru ele."
          },
          {
            "code": "import torch\nfrom torch import nn\n\ntorch.manual_seed(0)\nX = torch.randn(110, 1)\nY = X + 0.5 * torch.randn(110, 1)        # o dreaptă, plus zgomot\nX_train, y_train = X[:10], Y[:10]         # doar 10 exemple de antrenare\nX_val, y_val = X[10:], Y[10:]             # 100 de exemple de validare\n\nmodel = nn.Sequential(nn.Linear(1, 128), nn.ReLU(),\n                      nn.Linear(128, 128), nn.ReLU(),\n                      nn.Linear(128, 1))  # mult prea mare pentru 10 exemple\ncriterion = nn.MSELoss()\noptimizer = torch.optim.Adam(model.parameters(), lr=0.01)\n\nfor epoca in range(1, 401):\n    model.train()\n    loss = criterion(model(X_train), y_train)\n    loss.backward()\n    optimizer.step()\n    optimizer.zero_grad()\n    model.eval()\n    with torch.no_grad():                 # validarea doar se măsoară\n        val_loss = criterion(model(X_val), y_val).item()\n    if epoca in [1, 25, 100, 200, 400]:\n        print(epoca, round(loss.item(), 3), round(val_loss, 3))\n# afișează (epoca, antrenare, validare):\n# 1 0.749 0.628\n# 25 0.082 0.203\n# 100 0.059 1.142\n# 200 0.048 3.949\n# 400 0.025 5.119"
          },
          {
            "p": "La fiecare epocă, modelul face un pas pe cele 10 exemple, apoi `model.eval()` și `torch.no_grad()` (Lecția 15) măsoară loss-ul pe validare fără să schimbe nimic. Antrenarea coboară până la 0.025, dar validarea ajunge pe la 0.2 în primele epoci, apoi urcă până la 5.1: rețeaua a învățat pe de rost cele 10 puncte, cu zgomot cu tot. Ca să desenezi curbele, pui la fiecare epocă cele două valori în două liste și le dai lui `plt.plot` (Lecția 4)."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Ia o rețea care nu învață și găsește cauza trecând prin listă, un pas pe rând."
      },
      {
        "title": "Reprodu overfitting-ul pe 10 exemple ca test de sănătate înainte de antrenarea reală."
      },
      {
        "title": "Desenează câteva curbe de loss (bune și rele) și învață să le recunoști din formă."
      }
    ]
  },
  {
    "moduleCode": "S21",
    "duration": "~1 săptămână",
    "intro": "CNN-urile (rețele convoluționale) sunt uneltele pentru imagini. În loc să conecteze fiecare pixel la fiecare neuron, ceea ce ar fi enorm, folosesc filtre mici care se plimbă peste imagine. Așa învață trăsături locale (tipare mici dintr-o zonă a imaginii: margini, colțuri, apoi forme) eficient și cu puține greutăți. Ai văzut convoluția de mână în Lecția 13, cu filtre scrise de tine; aici rețeaua își învață singură filtrele.",
    "sections": [
      {
        "heading": "De ce nu un MLP obișnuit pe imagini",
        "blocks": [
          {
            "p": "Un MLP (rețeaua din Lecția 14, în care fiecare neuron e legat de toate intrările) ar primi imaginea ca pe un șir lung de numere. O imagine color de 224x224 are 224 · 224 · 3 = 150 528 de numere (trei canale pe pixel, Lecția 13). Un neuron legat de toate are 150 528 de greutăți, iar un prim strat cu 1000 de neuroni are aproximativ 150 de milioane. Prea multe: model uriaș, lent, care face overfitting imediat (învață pe de rost imaginile de antrenare și greșește pe cele noi, Lecția 1)."
          },
          {
            "p": "În plus, un MLP tratează fiecare pixel independent și pierde faptul că pixelii vecini formează structuri. Imaginea intră în el întinsă într-un singur rând, ca după `flatten()` din Lecția 4, așa că rețeaua nu știe care pixeli erau vecini. Dacă ai amesteca ordinea pixelilor la fel în toate imaginile, un MLP ar învăța la fel de bine, deși tu n-ai mai recunoaște nimic în poze."
          },
          {
            "p": "CNN-urile exploatează două idei. Localitate: trăsăturile utile (o margine) sunt locale, deci un filtru mic ajunge. Ca să afli dacă într-un punct e o margine, îți ajunge pătratul 3x3 din jurul lui. Partajarea greutăților: același filtru se plimbă peste toată imaginea, deci o margine e recunoscută oriunde apare, cu aceleași greutăți. Așa lucrează și filtrul Sobel din Lecția 13: aceleași 9 numere găsesc marginile din toată imaginea."
          },
          {
            "p": "Cu numere: un filtru 3x3 pe o imagine color acoperă 3 · 3 · 3 = 27 de numere (3x3 pixeli, câte 3 canale), deci are 27 de greutăți plus un termen liber, ca la perceptronul din Lecția 14. Atât, oricât de mare ar fi imaginea, 32x32 sau 224x224. Un strat cu 64 de filtre are 64 · 28 = 1792 de parametri (numerele pe care le învață), față de cele 150 de milioane de mai sus. Puține greutăți, multă putere."
          }
        ]
      },
      {
        "heading": "Stratul convoluțional: kernel, stride, padding",
        "blocks": [
          {
            "p": "Un strat convoluțional aplică mai multe filtre învățate peste intrare, fiecare producând o hartă de trăsături care evidențiază un anumit tipar. Harta de trăsături (feature map) e grila de numere scoasă de un singur filtru: câte un număr pentru fiecare poziție a filtrului, mare acolo unde apare tiparul. Imaginea cu margini pe care o dă filtrul Sobel din Lecția 13 e o hartă de trăsături. Atenție la cuvânt: aici o trăsătură e un tipar din imagine, nu o coloană dintr-un tabel ca în lecțiile cu date tabelare."
          },
          {
            "p": "Un strat cu 16 filtre scoate 16 hărți, așezate una peste alta ca niște canale: intră 3 canale de culoare, ies 16. Fiecare filtru trece prin toate canalele de intrare deodată, de aceea un filtru 3x3 pe o imagine color are 3 · 3 · 3 greutăți. Numerele din filtre sunt greutăți ca oricare altele: pornesc la întâmplare și sunt ajustate prin coborâre pe gradient (Lecția 14)."
          },
          {
            "p": "Trei setări definesc cum se plimbă filtrul."
          },
          {
            "list": [
              "Kernel: mărimea filtrului (de obicei 3x3). Cât de mare e fereastra care se plimbă. Pe un rând de 5 pixeli, o fereastră de 3 poate porni de la pixelul 1, 2 sau 3, deci ieșirea are 3 numere.",
              "Stride: cu cât sare filtrul la fiecare pas. Stride 2 sare din doi în doi, micșorând ieșirea. Pe un rând de 7 pixeli, cu kernel 3 și stride 2, fereastra pornește de la pixelii 1, 3 și 5, deci ieșirea are 3 numere în loc de 5.",
              "Padding: cât umpli cu zerouri marginile, ca ieșirea să nu se micșoreze prea repede și colțurile să conteze. Padding 1 pune o ramă de zerouri lată de un pixel: rândul de 5 devine 7, iar kernelul 3 dă din nou 5 numere."
            ]
          },
          {
            "p": "Trebuie să știi să calculezi dimensiunea ieșirii, altfel nu poți lega straturile corect. De exemplu, stratul `nn.Linear` de la finalul rețelei (Lecția 14) trebuie să știe câte numere primește, iar dacă greșești, PyTorch se oprește cu o eroare de formă (shape). E o formulă simplă pe care o aplici pentru fiecare strat."
          },
          {
            "formula": "ieșire = (intrare - kernel + 2·padding) / stride + 1",
            "explain": "Pentru o intrare de 32, kernel 3, padding 1, stride 1: (32 - 3 + 2) / 1 + 1 = 32. Dimensiunea se păstrează."
          },
          {
            "p": "Intrarea și ieșirea sunt lățimea (sau înălțimea) în pixeli; la o imagine pătrată, amândouă dau același rezultat. Cu stride 2, împărțirea poate să nu iasă exact. Pentru intrare 32, kernel 3, padding 1 și stride 2: (32 - 3 + 2) / 2 + 1 = 31 / 2 + 1 = 15.5 + 1. Împărțirea se rotunjește în jos, la 15, pentru că filtrul nu poate porni de la o jumătate de pixel. Ieșirea are 15 + 1 = 16 pixeli, deci stride 2 a înjumătățit imaginea. PyTorch rotunjește la fel."
          }
        ]
      },
      {
        "heading": "Pooling și câmpul receptiv",
        "blocks": [
          {
            "p": "Pooling-ul micșorează harta de trăsături, luând de exemplu maximul din fiecare fereastră 2x2 (max pooling). În codul de mai jos, o hartă de 4x4 devine 2x2. PyTorch lucrează cu loturi de imagini (batch, Lecția 15) de forma (N, C, H, W): numărul de imagini, canalele, înălțimea și lățimea. Canalele vin primele, nu la final ca în Lecția 13, de aceea grila de 4x4 e pusă în forma (1, 1, 4, 4)."
          },
          {
            "code": "import torch\nimport torch.nn as nn\n\nx = torch.tensor([[1, 3, 2, 0],\n                  [4, 2, 1, 1],\n                  [0, 1, 5, 6],\n                  [2, 0, 7, 3]])\nx = x.reshape(1, 1, 4, 4)    # 1 imagine, 1 canal, 4x4\npool = nn.MaxPool2d(2)       # ferestre 2x2, sare din 2 în 2\nprint(pool(x).reshape(2, 2))\n# tensor([[4, 2],\n#         [2, 7]])"
          },
          {
            "p": "Fereastra 2x2 sare din doi în doi, deci cele 16 numere se împart în patru pătrate, iar din fiecare rămâne cel mai mare. Din pătratul din stânga sus (1, 3, 4, 2) rămâne 4, iar din cel din dreapta jos (5, 6, 7, 3) rămâne 7. Pooling-ul nu are greutăți de învățat. Păstrează cât de clar a apărut tiparul în fiecare zonă și uită poziția lui exactă."
          },
          {
            "p": "Reduce dimensiunea, deci calculul, și mărește câmpul receptiv: cât din imaginea originală vede un neuron. Aici un neuron e un număr dintr-o hartă de trăsături, iar el depinde doar de o bucată din imagine. După o convoluție 3x3, fiecare număr vede 3x3 pixeli. După a doua convoluție, o fereastră 3x3 adună 3x3 numere din prima hartă, care împreună acoperă 5x5 pixeli (trei ferestre de câte 3 pixeli, decalate cu câte unul, acoperă 5). După a treia convoluție, câmpul receptiv e 7x7."
          },
          {
            "p": "După un pooling 2x2, un pas pe hartă înseamnă 2 pixeli în imagine, deci convoluțiile de după el lărgesc câmpul receptiv de două ori mai repede. Straturile de sus (ultimele, cele mai departe de imagine), cu câmp receptiv mare, văd forme întregi, iar primele văd doar margini."
          },
          {
            "p": "La finalul unui CNN vin de obicei câteva straturi dense (fully connected): straturi în care fiecare neuron e legat de toate numerele de intrare, ca în MLP-ul din Lecția 14, adică `nn.Linear` în PyTorch. Global average pooling e o alternativă curată la straturile dense de la final: mediază fiecare hartă de trăsături într-un singur număr. Are mai puține greutăți și face mai puțin overfitting decât straturile dense mari."
          },
          {
            "p": "Un exemplu cu numere. VGG, o rețea clasică din secțiunea următoare, întinde la final 512 hărți de 7x7 într-un rând de 512 · 7 · 7 = 25 088 de numere. Le leagă de un strat dens cu 4096 de neuroni: peste 102 milioane de greutăți, doar acolo. Cu global average pooling rămân 512 numere, unul pe hartă, iar un strat dens de la ele la 10 clase are 512 · 10 + 10 = 5130 de parametri."
          }
        ]
      },
      {
        "heading": "Arhitecturi clasice și ResNet",
        "blocks": [
          {
            "p": "Tiparul clasic al unui CNN: alternezi straturi convoluționale și pooling, care extrag trăsături din ce în ce mai abstracte, apoi la final un cap de clasificare care dă clasa. Mai abstracte înseamnă că primele straturi găsesc margini, următoarele colțuri și texturi, iar ultimele bucăți de obiecte, ca un ochi sau o roată. Capul de clasificare e ultimul strat (sau ultimele câteva): primește trăsăturile și dă câte un scor pentru fiecare clasă, iar clasa cu scorul cel mai mare e predicția."
          },
          {
            "p": "Codul de mai jos construiește un CNN mic pentru imagini color de 32x32 cu 10 clase și afișează forma datelor după fiecare strat."
          },
          {
            "code": "import torch\nimport torch.nn as nn\n\ntorch.manual_seed(0)\nmodel = nn.Sequential(\n    nn.Conv2d(3, 16, kernel_size=3, padding=1),    # 16 filtre 3x3\n    nn.ReLU(),\n    nn.MaxPool2d(2),                               # 32x32 -> 16x16\n    nn.Conv2d(16, 32, kernel_size=3, padding=1),   # 32 de filtre 3x3\n    nn.ReLU(),\n    nn.MaxPool2d(2),                               # 16x16 -> 8x8\n    nn.AdaptiveAvgPool2d(1),                       # global average pooling\n    nn.Flatten(),\n    nn.Linear(32, 10),                             # capul: 10 clase\n)\n\nx = torch.randn(8, 3, 32, 32)   # un lot: 8 imagini color de 32x32\nfor strat in model:\n    x = strat(x)\n    print(type(strat).__name__, tuple(x.shape))\n# Conv2d (8, 16, 32, 32)\n# ReLU (8, 16, 32, 32)\n# MaxPool2d (8, 16, 16, 16)\n# Conv2d (8, 32, 16, 16)\n# ReLU (8, 32, 16, 16)\n# MaxPool2d (8, 32, 8, 8)\n# AdaptiveAvgPool2d (8, 32, 1, 1)\n# Flatten (8, 32)\n# Linear (8, 10)"
          },
          {
            "p": "`nn.Sequential` leagă straturile în lanț: ieșirea unuia intră în următorul, iar bucla `for` le ia pe rând. `nn.Conv2d(3, 16, kernel_size=3, padding=1)` primește 3 canale și are 16 filtre, deci scoate 16 hărți, iar padding 1 păstrează mărimea. ReLU (taie negativele la zero, Lecția 14) nu schimbă forma. `nn.MaxPool2d(2)` e max pooling cu ferestre 2x2, iar `nn.AdaptiveAvgPool2d(1)` e global average pooling: lasă din fiecare hartă un singur număr. `nn.Flatten()` transformă forma (8, 32, 1, 1) în (8, 32), un rând pe imagine. `nn.Linear(32, 10)` e capul: 10 scoruri pe imagine. `type(strat).__name__` dă doar numele stratului, ca să știi ce rând e ce."
          },
          {
            "p": "Ce iese: după fiecare strat vezi forma (imagini, canale, înălțime, lățime). Convoluțiile schimbă numărul de canale, pooling-ul înjumătățește înălțimea și lățimea, iar la final rămân 10 numere pe imagine. Tot modelul are doar 5418 parametri. Îl antrenezi exact cu bucla din Lecția 14, cu `nn.CrossEntropyLoss()` ca loss, fiindcă e o problemă de clasificare."
          },
          {
            "p": "LeNet (cifre) și VGG (stive de convoluții 3x3) sunt punctele de plecare istorice. LeNet (1998) citea cifre scrise de mână din imagini alb-negru de 32x32. VGG (2014) are 16 sau 19 straturi cu greutăți și folosește doar convoluții 3x3, puse una după alta."
          },
          {
            "p": "Problema rețelelor foarte adânci: gradientul dispare pe drumul înapoi prin multe straturi, iar rețeaua nu mai învață. La backpropagation (Lecția 14), gradientul pentru primele straturi se obține înmulțind câte un factor pentru fiecare strat prin care trece. Dacă factorii sunt sub 1, de exemplu 0.5, după 20 de straturi rămâne 0.5 la puterea 20, cam 0.000001. Primele straturi aproape nu se mai mișcă: sunt gradienții care dispar din lista de verificări din Lecția 16."
          },
          {
            "p": "ResNet (2015) a rezolvat asta cu conexiuni reziduale: o scurtătură care sare peste câteva straturi și adună intrarea la ieșire. Dacă x e intrarea unui bloc și F(x) e ce calculează straturile din el (de exemplu, două convoluții), blocul dă la ieșire y = F(x) + x. Păstrează intrarea așa cum e și îi adaugă o corecție învățată. Dacă straturile n-au nimic util de adăugat, ajunge ca F(x) să fie aproape 0, iar intrarea trece mai departe neschimbată."
          },
          {
            "p": "Gradientul poate curge direct prin scurtătură, deci rețele de zeci sau sute de straturi devin antrenabile. Pe drumul înapoi, ramura „+ x” dă gradientul mai departe înmulțit cu 1, așa că el ajunge întreg la primele straturi. De aici pornesc majoritatea modelelor moderne de imagini."
          },
          {
            "p": "Un bloc rezidual în PyTorch arată ca mai jos. Ca să poți aduna F(x) cu x, cele două trebuie să aibă aceeași formă, de aceea convoluțiile din bloc păstrează numărul de canale și mărimea (padding 1)."
          },
          {
            "code": "class BlocRezidual(nn.Module):\n    def __init__(self, canale):\n        super().__init__()\n        self.conv1 = nn.Conv2d(canale, canale, 3, padding=1)\n        self.conv2 = nn.Conv2d(canale, canale, 3, padding=1)\n\n    def forward(self, x):\n        f = self.conv2(torch.relu(self.conv1(x)))   # F(x)\n        return torch.relu(f + x)                    # F(x) + x\n\nbloc = BlocRezidual(16)\ny = bloc(torch.randn(8, 16, 32, 32))\nprint(y.shape)   # torch.Size([8, 16, 32, 32]), aceeași formă ca intrarea"
          },
          {
            "p": "`torch.relu` e ReLU folosit ca funcție. Singura diferență față de o rețea obișnuită e `f + x` din `forward`: fără „+ x”, ar fi două convoluții simple, una după alta."
          },
          {
            "note": "Conexiunea reziduală e ideea de reținut din modul. Fără ea, rețelele foarte adânci nu învață. Cu ea, adâncimea devine un avantaj, nu un blocaj."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Calculează pe hârtie dimensiunile ieșirii pentru o mică rețea convoluțională, strat cu strat."
      },
      {
        "title": "Antrenează o rețea convoluțională simplă pe un set de imagini mic."
      },
      {
        "title": "Adaugă o conexiune reziduală într-o rețea și compară antrenarea cu și fără ea."
      }
    ]
  },
  {
    "moduleCode": "S22",
    "duration": "~1 săptămână",
    "intro": "Rar antrenezi o rețea de imagini de la zero. Iei un model preantrenat, adică antrenat deja de altcineva pe foarte multe imagini, și îl adaptezi la problema ta. De obicei e vorba de ImageNet: aproximativ 1.2 milioane de fotografii etichetate în 1000 de clase, de la rase de câini la fructe și unelte. Cu date puține, asta e diferența dintre un scor bun și unul jalnic. Modelul a învățat deja să vadă margini, texturi și forme; tu doar îl reorientezi spre clasele tale.",
    "sections": [
      {
        "heading": "De ce funcționează transferul",
        "blocks": [
          {
            "p": "Un CNN antrenat pe multe imagini învață în straturile de jos (primele, cele mai aproape de imagine) trăsături generale: margini, colțuri, texturi. Astea sunt utile pentru aproape orice problemă de imagini, inclusiv pentru una pe care modelul n-a văzut-o niciodată. Straturile de sus (ultimele, aproape de ieșire) învață trăsături specifice (forme de câini, de mașini). Ideea transferului: păstrezi partea generală și rescrii doar partea specifică."
          },
          {
            "p": "Să zicem că ai 300 de poze cu frunze, sănătoase sau bolnave. ImageNet nu are clasa „frunză bolnavă”, dar petele, marginile și texturile pe care modelul le recunoaște deja sunt exact ce-ți trebuie ca să le deosebești."
          },
          {
            "p": "ResNet18, modelul din codul de mai jos, e un ResNet (Lecția 17) cu 18 straturi și aproximativ 11.7 milioane de parametri. Așa, în loc să antrenezi milioane de greutăți de la zero, cu milioane de imagini de care nu dispui, folosești ce a învățat deja modelul și antrenezi doar puțin, cu puține date. E cea mai practică tehnică din tot deep learning-ul de imagini."
          }
        ]
      },
      {
        "heading": "Feature extraction vs fine-tuning",
        "blocks": [
          {
            "p": "Sunt două moduri de a adapta un model preantrenat, în funcție de cât de multe date ai."
          },
          {
            "list": [
              "Feature extraction: îngheți toată rețeaua (nu se mai antrenează) și înlocuiești doar capul de clasificare, pe care îl antrenezi pe clasele tale. Rapid, potrivit când ai foarte puține date.",
              "Fine-tuning: dezgheți și straturile de sus ale rețelei și le antrenezi cu un learning rate mic, ca să le ajustezi fin spre problema ta. Poate da un scor mai bun, potrivit când ai date ceva mai multe."
            ]
          },
          {
            "p": "Capul de clasificare e ultimul strat al rețelei, cel care dă câte un scor pentru fiecare clasă (Lecția 17). La ResNet se numește `net.fc` (de la fully connected) și duce de la 512 numere la 1000 de scoruri, câte unul pentru fiecare clasă din ImageNet. Problema ta are alte clase, deci îl înlocuiești cu unul nou."
          },
          {
            "p": "Numele de feature extraction vine de la ce face rețeaua înghețată: extrage trăsături. Pentru fiecare imagine scoate 512 numere care o descriu, iar capul nou învață din ele, ca un model obișnuit pe un tabel cu 512 coloane."
          },
          {
            "p": "A îngheța o greutate înseamnă `requires_grad = False`: PyTorch nu-i mai calculează gradientul. Fără gradient, optimizatorul n-are cu ce s-o miște la `optimizer.step()` (Lecția 14), deci rămâne exact cum a venit."
          },
          {
            "code": "from torchvision import models\nimport torch\nimport torch.nn as nn\n\nNUM_CLASE = 2                        # de exemplu: frunză sănătoasă / bolnavă\n\nnet = models.resnet18(weights=\"DEFAULT\")\nfor p in net.parameters():\n    p.requires_grad = False          # îngheață tot (feature extraction)\nnet.fc = nn.Linear(net.fc.in_features, NUM_CLASE)   # cap nou, antrenabil\nprint(net.fc)   # Linear(in_features=512, out_features=2, bias=True)\n\noptimizer = torch.optim.Adam(net.fc.parameters(), lr=1e-3)   # doar capul"
          },
          {
            "p": "`weights=\"DEFAULT\"` încarcă cele mai bune greutăți ImageNet pe care le are torchvision pentru ResNet18. `net.fc.in_features` e numărul de intrări ale capului vechi, 512 la ResNet18. Îl citești de acolo în loc să scrii 512 de mână, ca să meargă și cu alte modele (ResNet50 are 2048). `NUM_CLASE` e numărul tău de clase. Capul nou e creat după înghețare, deci greutățile lui au `requires_grad = True` și sunt singurele care se antrenează: 512 · 2 + 2 = 1026 de numere din peste 11 milioane. Optimizatorul primește doar `net.fc.parameters()`, adică greutățile capului, iar `lr=1e-3` e un learning rate de 0.001."
          },
          {
            "note": "`weights=\"DEFAULT\"` descarcă greutățile de pe internet prima dată când rulezi codul (la ResNet18, un fișier de aproximativ 45 MB) și le păstrează pe calculator pentru data viitoare. La ONIA, platforma îți rulează codul fără acces la internet (Lecția 6), deci descărcarea pică. Poți folosi un model preantrenat la concurs doar dacă regulamentul îl permite și fișierul cu greutăți e deja disponibil acolo unde rulează codul. Atunci creezi modelul cu `weights=None` (greutăți la întâmplare) și încarci fișierul cu `net.load_state_dict(torch.load(\"resnet18.pth\"))`. Verifică regulile înainte de concurs, nu în timpul lui."
          }
        ]
      },
      {
        "heading": "Normalizarea: aceeași cu cea de la antrenare",
        "blocks": [
          {
            "p": "Un model preantrenat a văzut imagini normalizate într-un anumit fel: scăzute și împărțite cu statisticile ImageNet (mediile și deviațiile pe cele trei canale). Concret, după ce pixelii au fost aduși între 0 și 1 (Lecția 13), pe fiecare canal s-a scăzut media și s-a împărțit la deviația standard, exact standardizarea din Lecția 5. Mediile, calculate pe pozele din ImageNet, sunt 0.485, 0.456 și 0.406 (roșu, verde, albastru), iar deviațiile standard sunt 0.229, 0.224 și 0.225."
          },
          {
            "p": "Un pixel cu roșul 0.8 devine (0.8 - 0.485) / 0.229 ≈ 1.38, iar unul cu roșul exact 0.485 devine 0, adică „roșu obișnuit” pentru ImageNet. Dacă îi dai imagini normalizate altfel, intrarea nu seamănă cu ce a văzut el la antrenare și merge prost, uneori inexplicabil de prost."
          },
          {
            "p": "În torchvision, pregătirea pozelor arată ca mai jos."
          },
          {
            "code": "from PIL import Image\nfrom torchvision import transforms\n\ntransform = transforms.Compose([\n    transforms.Resize((224, 224)),           # mărimea pozelor din ImageNet\n    transforms.ToTensor(),                   # 0..255 -> 0..1, forma (3, H, W)\n    transforms.Normalize(mean=[0.485, 0.456, 0.406],\n                         std=[0.229, 0.224, 0.225]),\n])\n\nimg = Image.new(\"RGB\", (300, 200), (204, 128, 51))   # o poză de probă\nx = transform(img)\nprint(x.shape)      # torch.Size([3, 224, 224])\nprint(x[:, 0, 0])   # tensor([ 1.3755,  0.2052, -0.9156])"
          },
          {
            "p": "`transforms.Compose` pune pașii în ordine, ca un Pipeline din Lecția 6. `Resize((224, 224))` aduce poza la 224x224, mărimea pe care s-a antrenat modelul. `ToTensor()` transformă poza Pillow (Lecția 4) într-un tensor cu valori între 0 și 1 și cu canalele primele, iar `Normalize` face scăderea și împărțirea pe fiecare canal. Poza de probă are peste tot culoarea (204, 128, 51), iar 204 / 255 = 0.8, deci primul număr e chiar (0.8 - 0.485) / 0.229 ≈ 1.3755. `x[:, 0, 0]` ia toate cele trei canale ale pixelului din colțul din stânga sus."
          },
          {
            "note": "Când folosești un model preantrenat, normalizează imaginile exact cu statisticile pe care a fost antrenat (pentru ImageNet, mediile și deviațiile standard de mai sus). E o greșeală tăcută și frecventă: codul merge fără nicio eroare, doar scorul iese prost. Ca să fii sigur, poți lua pașii oficiali ai modelului cu `models.ResNet18_Weights.DEFAULT.transforms()`."
          }
        ]
      },
      {
        "heading": "Learning rate mic la fine-tuning",
        "blocks": [
          {
            "p": "La fine-tuning, straturile preantrenate au deja greutăți bune. Dacă le antrenezi cu un learning rate mare, pașii mari strică exact trăsăturile valoroase pe care voiai să le păstrezi. Folosește un learning rate mic pentru ele, uneori și mai mic decât pentru capul nou. Așa le ajustezi fin, nu le distrugi."
          },
          {
            "p": "În PyTorch, optimizatorul poate primi grupuri de parametri, fiecare cu learning rate-ul lui. Mai jos, ultimul bloc din corpul preantrenat (tot ce e înainte de cap) e dezghețat și primește pași de 10 ori mai mici decât capul nou. Restul corpului rămâne înghețat."
          },
          {
            "code": "for p in net.layer4.parameters():\n    p.requires_grad = True           # dezgheți ultimul bloc\n\noptimizer = torch.optim.AdamW([\n    {\"params\": net.layer4.parameters(), \"lr\": 1e-4},   # corp: pași mici\n    {\"params\": net.fc.parameters(), \"lr\": 1e-3},       # cap: pași mai mari\n])"
          },
          {
            "p": "Corpul ResNet18 are patru blocuri mari, `net.layer1` până la `net.layer4`, iar `net.layer4` e cel mai aproape de cap. AdamW e optimizatorul din Lecția 15. Fiecare dicționar din listă e un grup: `\"params\"` spune ce greutăți conține, iar `\"lr\"` cu ce learning rate le mișcă. 1e-4 înseamnă 0.0001, de 10 ori mai puțin decât 1e-3."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Adaptează un ResNet la o problemă cu puține imagini prin feature extraction."
      },
      {
        "title": "Compară feature extraction cu fine-tuning pe același set și vezi când merită fiecare."
      },
      {
        "title": "Verifică ce se întâmplă cu scorul dacă scoți normalizarea corectă a imaginilor."
      }
    ]
  },
  {
    "moduleCode": "S23",
    "duration": "~1 săptămână",
    "intro": "One-hot (vectorul de zerouri cu un singur 1, din Lecția 5) tratează fiecare cuvânt ca pe ceva izolat: câine și pisică sunt la fel de diferite ca și câine și televizor. Embeddings pun cuvintele într-un spațiu unde apropierea înseamnă sens apropiat. E ideea pe care stă tot NLP-ul modern. Modulul ăsta îți dă intuiția, ca modelele mari de text (ChatGPT, de exemplu) să nu fie magie pentru tine.",
    "sections": [
      {
        "heading": "Problema reprezentării one-hot",
        "blocks": [
          {
            "p": "În NLP clasic (Lecția 12), un cuvânt era o poziție într-un vector uriaș de zerouri cu un singur 1. Cu un vocabular de doar trei cuvinte, câine, pisică și televizor, vectorii ar fi câine = [1, 0, 0], pisică = [0, 1, 0] și televizor = [0, 0, 1]. Problema: toți vectorii sunt la fel de departe unul de altul. Similaritatea cosinus (Lecția 12) dintre oricare doi e 0, fiindcă nu au niciun 1 pe aceeași poziție. Modelul nu are cum să știe că rege și regină sunt înrudite, sau că bun și excelent sunt apropiate. Sensul se pierde complet."
          },
          {
            "p": "Vectorii sunt și enormi (cât vocabularul, zeci de mii de dimensiuni) și rari (sparse: aproape numai zerouri). La un vocabular de 50 000 de cuvinte, fiecare vector are 49 999 de zerouri și un singur 1. Ineficient și fără nicio informație despre sens. Embeddings rezolvă ambele probleme: folosesc vectori denși, adică scurți și cu numere diferite de zero aproape peste tot."
          }
        ]
      },
      {
        "heading": "Embeddings: sens ca poziție în spațiu",
        "blocks": [
          {
            "p": "Un embedding e un vector dens, scurt (de exemplu 100-300 de numere), învățat pentru fiecare cuvânt, astfel încât cuvintele cu sens apropiat să aibă vectori apropiați. Ca să vezi ideea, ia vectori cu doar două numere, adică puncte în plan. Să zicem că după antrenare ai câine = [4, 3], pisică = [3, 4] și televizor = [-3, 4]. Numerele sunt alese de noi; cele reale sunt învățate și nu au un sens atât de simplu."
          },
          {
            "p": "Similaritatea cosinus e produsul celor doi vectori (înmulțești pozițiile între ele și aduni) împărțit la produsul lungimilor lor. Lungimea lui [4, 3] e √(4² + 3²) = √25 = 5, și la fel pentru ceilalți doi. Câine și pisică: (4 · 3 + 3 · 4) / (5 · 5) = 24 / 25 = 0.96, aproape 1, deci sens apropiat. Câine și televizor: (4 · (-3) + 3 · 4) / 25 = 0 / 25 = 0, nimic în comun."
          },
          {
            "code": "import numpy as np\n\ndef cosinus(a, b):\n    return a @ b / (np.linalg.norm(a) * np.linalg.norm(b))\n\ncaine = np.array([4, 3])\npisica = np.array([3, 4])\ntelevizor = np.array([-3, 4])\nprint(cosinus(caine, pisica))      # 0.96\nprint(cosinus(caine, televizor))   # 0.0\nprint(cosinus(pisica, televizor))  # 0.28"
          },
          {
            "p": "`a @ b` e produsul de mai sus: înmulțește pozițiile între ele și adună, 4 · 3 + 3 · 4 = 24. `np.linalg.norm(a)` dă lungimea vectorului, aici 5. Pisică și televizor ies la 0.28, tot departe."
          },
          {
            "p": "Se învață din contexte: cuvintele care apar în contexte similare primesc vectori similari. Câine și pisică apar amândouă lângă hrană, blană, animal, deci ajung aproape. Contextul unui cuvânt sunt cuvintele din jurul lui, de obicei cele aflate la cel mult două poziții distanță, la stânga și la dreapta. În propoziția „pisica mea bea lapte în bucătărie”, contextul lui „bea” e format din „pisica”, „mea”, „lapte” și „în”. Fereastra asta se plimbă peste milioane de propoziții, cuvânt cu cuvânt."
          },
          {
            "p": "Word2Vec învață astfel de vectori în două variante: skip-gram (din cuvânt prezici contextul) sau CBOW (din context prezici cuvântul). Skip-gram primește „bea” și trebuie să ghicească, pe rând, „pisica”, „mea”, „lapte” și „în”. CBOW face invers: primește cele patru cuvinte din jur și ghicește „bea”. Ghicitul e doar un pretext: după antrenare arunci partea care ghicește și păstrezi vectorii învățați pe drum."
          },
          {
            "p": "Un rezultat celebru: aritmetica vectorilor funcționează. Vectorul rege minus bărbat plus femeie cade aproape de regină. Sensul devine geometrie."
          },
          {
            "formula": "vec(rege) - vec(bărbat) + vec(femeie) ≈ vec(regină)",
            "explain": "Relațiile de sens devin direcții în spațiu. Diferența bărbat-femeie e aceeași direcție ca rege-regină."
          },
          {
            "p": "Un exemplu de jucărie, cu două numere: primul arată cât de regal e cuvântul, al doilea cât de masculin. Să zicem că rege = [9, 8], bărbat = [1, 8], femeie = [1, 1] și regină = [9, 1]. Atunci rege - bărbat + femeie = [9 - 1 + 1, 8 - 8 + 1] = [9, 1], adică exact regină. Diferența femeie - bărbat = [0, -7] e aceeași cu regină - rege: e „direcția” de la masculin la feminin. Cu embeddings reale, rezultatul cade doar aproape de regină (de aici ≈), așa că se caută cuvântul cu cea mai mare similaritate cosinus față de el."
          }
        ]
      },
      {
        "heading": "FastText: important pentru română",
        "blocks": [
          {
            "p": "Word2Vec tratează fiecare cuvânt ca un tot. FastText merge pe subcuvinte (bucăți de litere): construiește vectorul unui cuvânt din fragmentele lui. Asta contează enorm la română, cu flexiunea ei bogată: același cuvânt își schimbă forma după persoană, număr, timp sau caz. Merg, mergem, mergeau împart subcuvinte, deci primesc vectori înrudiți, chiar dacă una din forme e rară sau nevăzută la antrenare."
          },
          {
            "p": "Concret, FastText pune un < la începutul cuvântului și un > la sfârșit, ca să știe unde începe și unde se termină, apoi îl taie în bucăți de câte 3 litere. De obicei folosește bucăți de 3 până la 6 litere, dar aici rămânem la 3."
          },
          {
            "code": "def bucati(cuvant, n=3):\n    c = \"<\" + cuvant + \">\"\n    return [c[i:i + n] for i in range(len(c) - n + 1)]\n\nprint(bucati(\"mergem\"))   # ['<me', 'mer', 'erg', 'rge', 'gem', 'em>']\nprint(bucati(\"merg\"))     # ['<me', 'mer', 'erg', 'rg>']"
          },
          {
            "p": "`c[i:i + n]` e o felie de n litere care începe la poziția i (Lecția 3), iar lista le ia pe toate, de la prima poziție la ultima. „merg” și „mergem” au în comun primele trei bucăți: „<me”, „mer” și „erg”. Vectorul unui cuvânt e media vectorilor bucăților lui, plus vectorul cuvântului întreg dacă l-a văzut la antrenare. Așa, și o formă nevăzută, de exemplu „mergeați”, primește un vector din bucățile pe care le are."
          },
          {
            "note": "La română, preferă FastText sau embeddings care folosesc subcuvinte. Modelele care tratează fiecare formă flexionată ca un cuvânt complet separat pierd legăturile și se împotmolesc pe formele rare."
          }
        ]
      },
      {
        "heading": "Embeddings preantrenate",
        "blocks": [
          {
            "p": "Poți folosi vectori preantrenați (Word2Vec, FastText, GloVe gata antrenați) ca extractoare de trăsături, fără să antrenezi nimic: iei vectorii cuvintelor și pui un model simplu deasupra. Preantrenați înseamnă că altcineva a antrenat deja modelul pe miliarde de cuvinte, de exemplu pe toată Wikipedia, și a publicat vectorii. GloVe e încă o metodă de a învăța vectori de cuvinte, asemănătoare cu Word2Vec, iar FastText are vectori gata antrenați și pentru română. Cu puține date, e mult mai bine decât să pornești de la zero."
          },
          {
            "p": "Ca să ai un singur rând de trăsături pentru un text întreg, cel mai simplu e să faci media vectorilor cuvintelor din el. Un text de 10 cuvinte, cu vectori de 300 de numere, devine un singur rând de 300 de numere, iar peste rândurile astea pui o regresie logistică (Lecția 7)."
          },
          {
            "note": "Fișierele cu vectori preantrenați sunt mari (de la sute de MB la câțiva GB) și se descarcă de pe internet. La concurs, platforma îți rulează codul fără internet (Lecția 6), deci îi poți folosi doar dacă regulamentul îi permite și fișierele sunt deja disponibile acolo unde rulează codul."
          }
        ]
      },
      {
        "heading": "Secvențe: RNN, LSTM, GRU",
        "blocks": [
          {
            "p": "Un embedding dă sens unui cuvânt, dar o propoziție e o secvență în care ordinea contează. „Câinele a mușcat poștașul” și „poștașul a mușcat câinele” au aceleași cuvinte, dar nu spun același lucru, iar un bag-of-words (Lecția 12) le vede identice. Rețelele recurente (RNN) procesează textul cuvânt cu cuvânt, ținând o stare care rezumă ce au văzut până acum."
          },
          {
            "p": "Starea seamănă cu ce ții în minte când citești. Nu reții fiecare cuvânt, dar știi cine e personajul și ce s-a întâmplat până acum, iar fiecare cuvânt nou îți actualizează rezumatul. La un RNN, starea e un vector de numere, de exemplu 16. La fiecare cuvânt, rețeaua ia embedding-ul lui și starea veche și calculează din ele starea nouă, cu aceleași greutăți la fiecare pas (ca filtrul care se plimbă din Lecția 17). Starea de după ultimul cuvânt rezumă toată propoziția și poate intra într-un strat dens care dă clasa."
          },
          {
            "p": "În PyTorch, `nn.Embedding` e chiar un tabel de embeddings: câte un vector pentru fiecare cuvânt din vocabular, învățat odată cu restul rețelei. Cuvintele intră ca numere (poziția fiecăruia în vocabular), iar tabelul le dă vectorii."
          },
          {
            "code": "import torch\nimport torch.nn as nn\n\ntorch.manual_seed(0)\nids = torch.randint(0, 1000, (4, 7))   # 4 propoziții, câte 7 cuvinte\nemb = nn.Embedding(1000, 50)           # 1000 de cuvinte, vectori de 50\nx = emb(ids)\nprint(x.shape)        # torch.Size([4, 7, 50])\n\nrnn = nn.RNN(input_size=50, hidden_size=16, batch_first=True)\niesiri, stare = rnn(x)\nprint(iesiri.shape)   # torch.Size([4, 7, 16]): starea după fiecare cuvânt\nprint(stare.shape)    # torch.Size([1, 4, 16]): starea de după ultimul"
          },
          {
            "p": "Ce intră: 4 propoziții de câte 7 cuvinte, date ca numere între 0 și 999 (aici alese la întâmplare cu `torch.randint`). `nn.Embedding(1000, 50)` le transformă în vectori de 50 de numere, deci forma devine (4, 7, 50). `batch_first=True` îi spune RNN-ului că prima dimensiune e lotul (propozițiile), apoi vin cuvintele. Ce iese: `iesiri` are starea de după fiecare cuvânt, 16 numere pe cuvânt, iar `stare` doar starea de după ultimul cuvânt. Acel 1 din față e numărul de straturi RNN puse unul peste altul, aici unul singur."
          },
          {
            "p": "Problema: pe secvențe lungi, gradientul dispare și rețeaua uită începutul propoziției. La backpropagation (Lecția 14), gradientul trece înapoi prin fiecare pas, ca printr-o rețea cu câte un strat pentru fiecare cuvânt. Dacă la fiecare pas se înmulțește cu 0.9, după 50 de cuvinte rămâne 0.9 la puterea 50, cam 0.005. E problema gradienților care dispar (Lecția 16), aceeași ca la rețelele foarte adânci din Lecția 17: primele cuvinte aproape nu mai contează la antrenare."
          },
          {
            "p": "LSTM și GRU rezolvă asta cu porți: mecanisme care decid ce informație rețin, ce uită și ce lasă să treacă. Așa pot ține minte context de mai departe. O poartă e un șir de numere între 0 și 1, scoase de o sigmoidă (Lecția 14), cu care se înmulțește informația: 0 o blochează, 1 o lasă să treacă întreagă, iar 0.5 lasă jumătate."
          },
          {
            "p": "LSTM-ul ține, pe lângă stare, o memorie separată și are trei porți. Poarta de uitare decide ce ștergi din memorie, poarta de intrare ce scrii nou în ea, iar poarta de ieșire ce parte din memorie folosești la pasul ăsta. GRU e o variantă mai simplă, cu două porți, des la fel de bună și mai rapidă."
          },
          {
            "p": "În „Maria a plecat dimineața și, după o zi lungă la școală, seara s-a întors obosită”, forma „obosită” depinde de „Maria”, aflată cu peste zece cuvinte mai devreme. Un LSTM poate păstra în memorie că subiectul e feminin până acolo, ținând poarta de uitare aproape de 1. Nu trebuie să le implementezi de la zero, dar înțelege conceptual de ce funcționează: porțile protejează informația importantă de la a fi ștearsă pas cu pas."
          },
          {
            "p": "Memoria LSTM-ului se actualizează mai ales prin adunare, ca la conexiunea reziduală din Lecția 17. Când poarta de uitare e aproape de 1, memoria trece aproape neschimbată de la un cuvânt la altul, iar gradientul la fel. În PyTorch, `nn.LSTM` se folosește ca `nn.RNN`, cu aceiași parametri, doar că întoarce și memoria: `iesiri, (stare, memorie) = lstm(x)`."
          },
          {
            "p": "RNN-urile și LSTM-urile au fost înlocuite în mare parte de transformere în NLP-ul de vârf. Un transformer nu mai citește cuvânt cu cuvânt: se uită la toate cuvintele deodată și învață, pentru fiecare cuvânt, la care dintre celelalte să fie atent. Pe ideea asta sunt construite modelele mari de text, ca ChatGPT. RNN-urile rămân totuși importante ca să înțelegi ideea de procesare a secvenței și problema memoriei pe distanță lungă, care e exact ce au venit transformerele să rezolve mai bine."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Explorează aritmetica vectorilor (rege - bărbat + femeie) pe un set de embeddings preantrenate."
      },
      {
        "title": "Compară FastText cu Word2Vec pe cuvinte flexionate din română."
      },
      {
        "title": "Folosește embeddings preantrenate ca trăsături și pune o regresie logistică deasupra."
      }
    ]
  },
  {
    "moduleCode": "S24",
    "duration": "~1 săptămână",
    "intro": "Reinforcement learning (învățare prin recompensă) e cerut la clasele mari. Un agent învață ce să facă din recompense, prin încercare și eroare, fără să i se spună răspunsul corect la fiecare pas. La final atingem și etica: modelele pot fi nedrepte cu anumite grupuri, și merită să știi de ce se întâmplă și cum se măsoară.",
    "sections": [
      {
        "heading": "Ce e diferit la RL",
        "blocks": [
          {
            "p": "La învățarea supervizată din lecțiile de până acum aveai răspunsul corect pentru fiecare exemplu. La RL nu-l ai. Agentul ia acțiuni într-un mediu, primește recompense (pozitive sau negative), și trebuie să învețe singur ce șir de acțiuni aduce cea mai mare recompensă pe termen lung. Provocarea: o acțiune bună acum poate aduce recompensa abia peste mulți pași."
          },
          {
            "p": "Exemplu clasic: un agent într-un grid-world (o hartă cu căsuțe) trebuie să ajungă la o țintă evitând capcane. Nu i se spune drumul; primește o recompensă mică negativă la fiecare pas și una mare pozitivă la țintă, și învață singur drumul bun. Recompensa negativă de la fiecare pas îl împinge spre drumul cel mai scurt, pentru că fiecare pas în plus îl costă. Pe exemplul ăsta, cuvintele de bază din RL înseamnă:"
          },
          {
            "list": [
              "Agentul e cel care decide ce face, aici robotul de pe hartă. În cod, e programul tău.",
              "Mediul e lumea în care trăiește agentul: harta cu pereți, capcane și țintă, plus regulile după care se mută robotul.",
              "O acțiune e o mutare: sus, jos, stânga sau dreapta.",
              "Recompensa e un număr pe care mediul i-l dă agentului după fiecare acțiune, de exemplu -1 pentru un pas obișnuit, -10 pentru o capcană și +10 pentru țintă.",
              "Un episod e o încercare completă, de la start până când agentul ajunge la țintă sau cade într-o capcană. Agentul joacă multe episoade și se descurcă tot mai bine."
            ]
          },
          {
            "p": "Diferența față de căutarea din Lecția 11: acolo cunoșteai harta și căutai pe ea drumul cel mai bun. Aici agentul nu știe harta și nici unde sunt capcanele. Le descoperă încercând."
          }
        ]
      },
      {
        "heading": "MDP: limbajul RL",
        "blocks": [
          {
            "p": "Un MDP (proces de decizie Markov) descrie problema formal. Markov vine de la matematicianul rus Andrei Markov și înseamnă că ce se întâmplă mai departe depinde doar de starea de acum, nu și de drumul pe care ai ajuns în ea. Pe hartă: dacă știi căsuța în care e robotul, nu contează pe unde a venit. Un MDP are:"
          },
          {
            "list": [
              "Stări: unde poate fi agentul, aici căsuța în care se află.",
              "Acțiuni: ce poate face în fiecare stare, aici cele patru mutări.",
              "Tranziții: unde ajunge după o acțiune. „Dreapta” îl mută o căsuță la dreapta, iar dacă acolo e un perete, rămâne pe loc.",
              "Recompense: ce primește după fiecare acțiune.",
              "Un factor de discount: cât de mult contează viitorul față de prezent."
            ]
          },
          {
            "p": "Politica e regula după care agentul alege acțiunea în fiecare stare. Pe hartă, o politică e câte o săgeată desenată în fiecare căsuță. Politica nu face parte din descrierea problemei: e ce cauți. Scopul: găsești politica ce maximizează recompensa totală așteptată. Așteptată înseamnă în medie: uneori mediul e întâmplător (de exemplu, robotul alunecă și ajunge în altă căsuță decât voia), deci contează ce obții în medie, pe multe episoade."
          },
          {
            "p": "Discountul se notează γ (litera grecească gamma) și e un număr între 0 și 1, de obicei 0.9 sau 0.99. Fiecare pas de așteptare înmulțește o recompensă cu γ. Cu γ = 0.9, o recompensă de 10 primită chiar acum valorează 10. Dacă vine cu un pas mai târziu, valorează 10 · 0.9 = 9, cu doi pași mai târziu 10 · 0.9² = 8.1, iar cu trei pași mai târziu 10 · 0.9³ = 7.29. Un câștig de acum e mai sigur decât unul promis peste mult timp, iar așa agentul ajunge să prefere drumurile scurte. Cu γ = 0 s-ar uita doar la recompensa imediată; cu γ aproape de 1, viitorul contează aproape cât prezentul."
          },
          {
            "p": "Două funcții măsoară cât de bine stai. V(s) spune cât de bună e o stare (câtă recompensă aștepți de acolo încolo). Q(s,a) spune cât de bună e o pereche stare-acțiune (câtă recompensă aștepți dacă faci acțiunea a în starea s, apoi joci bine). Litera s vine de la stare, a de la acțiune, iar recompensele viitoare se adună cu discount, ca mai sus."
          },
          {
            "p": "Cel mai mic grid-world e un coridor de 5 căsuțe, numerotate de la 0 la 4. Agentul pornește din căsuța 0 și poate merge la stânga sau la dreapta. Ținta e căsuța 4: când ajunge acolo primește 10 și episodul se termină. Orice alt pas dă 0, ca să iasă calcule simple. Dacă e în căsuța 0 și merge la stânga, se lovește de perete și rămâne pe loc. Discountul e γ = 0.9."
          },
          {
            "p": "Cea mai bună politică e „mereu la dreapta”. Din căsuța 3, recompensa de 10 vine chiar la mutarea următoare, deci V(3) = 10. Din căsuța 2 vine cu un pas mai târziu, deci V(2) = 9. La fel, V(1) = 8.1 și V(0) = 7.29, exact numerele de la discount."
          },
          {
            "p": "Q compară acțiunile. Q(2, dreapta) = 0 + 0.9 · V(3) = 9: acum primești 0 și ajungi în căsuța 3, care valorează 10. Q(2, stânga) = 0 + 0.9 · V(1) = 0.9 · 8.1 = 7.29: ajungi în căsuța 1, mai departe de țintă. Q-ul mai mare îți spune ce să faci: din căsuța 2 mergi la dreapta."
          },
          {
            "p": "Ecuațiile Bellman le leagă între ele recursiv: valoarea unei stări depinde de valorile stărilor următoare. Valoarea de aici e recompensa pe care o primești acum plus γ înmulțit cu valoarea stării în care ajungi, dacă de acolo joci cât mai bine. Exact așa ai calculat mai sus: ca să afli V(2), ți-a trebuit V(3)."
          }
        ]
      },
      {
        "heading": "Q-learning tabelar",
        "blocks": [
          {
            "p": "Q-learning învață funcția Q din experiență, ținând un tabel cu o valoare pentru fiecare pereche stare-acțiune. În coridor, tabelul are 5 rânduri (căsuțele) și 2 coloane (stânga, dreapta). După fiecare acțiune, actualizează valoarea din tabel apropiind-o de recompensa primită plus cea mai bună valoare din starea următoare. Cu destule încercări, tabelul converge (valorile nu se mai schimbă) și politica bună iese: în fiecare stare, alegi acțiunea cu Q cel mai mare."
          },
          {
            "p": "Mai sus ai calculat Q de mână pentru că știai harta. Agentul nu o știe: află recompensele și unde ajunge după fiecare mutare doar încercând. Formula de mai jos îi spune cum să-și corecteze tabelul după fiecare pas."
          },
          {
            "formula": "Q(s,a) ← Q(s,a) + α · [r + γ · max Q(s',a') - Q(s,a)]",
            "explain": "α = rata de învățare, r = recompensa, γ = factorul de discount, s' = starea următoare. Muți Q spre recompensa reală plus valoarea viitoare. max Q(s',a') e cea mai mare valoare din rândul stării s', iar săgeata ← înseamnă „devine”, ca `=` în Python."
          },
          {
            "p": "Paranteza dreaptă e diferența dintre ce tocmai ai aflat, r + γ · max Q(s',a'), și ce credeai înainte, Q(s,a). α (alfa) spune cât din diferență corectezi, ca learning rate-ul η din Lecția 14: cu α = 0.5 faci jumătate din drum."
          },
          {
            "p": "Un calcul de mână în coridor, cu α = 0.5 și γ = 0.9. Tabelul pornește numai cu zerouri. Agentul e în căsuța 3, merge la dreapta, primește r = 10 și ajunge la țintă. După țintă nu mai urmează nimic, deci max Q(s',a') = 0. Q(3, dreapta) ← 0 + 0.5 · [10 + 0.9 · 0 - 0] = 5."
          },
          {
            "p": "Într-un episod de mai târziu, agentul e în căsuța 2 și merge la dreapta: r = 0 și ajunge în căsuța 3, unde cea mai mare valoare e acum 5. Q(2, dreapta) ← 0 + 0.5 · [0 + 0.9 · 5 - 0] = 2.25. Când ajunge iar în căsuța 3 și merge la dreapta, Q(3, dreapta) ← 5 + 0.5 · [10 + 0.9 · 0 - 5] = 7.5. Valoarea țintei se scurge înapoi, căsuță cu căsuță, iar cu destule episoade numerele se apropie de 10, 9, 8.1 și 7.29."
          }
        ]
      },
      {
        "heading": "Explorare contra exploatare",
        "blocks": [
          {
            "p": "O dilemă centrală: explorare contra exploatare. Dacă agentul alege mereu ce pare cel mai bun acum (exploatare), poate rata un drum mai bun pe care nu l-a încercat. Dacă explorează prea mult, pierde vremea. Strategia ε-greedy echilibrează: cu probabilitate ε face o acțiune la întâmplare (explorare), altfel alege ce e mai bun (exploatare). De obicei începi cu ε mare și îl scazi treptat."
          },
          {
            "p": "ε (epsilon) e tot o literă grecească, aici un număr între 0 și 1, iar greedy înseamnă „lacom”: ia mereu ce pare cel mai bun acum. Cu ε = 0.1, cam o mutare din 10 e aleasă la întâmplare, iar celelalte 9 sunt cele mai bune după tabel. Cu ε = 1, toate sunt la întâmplare, ce vrei la început, când tabelul e plin de zerouri și agentul nu știe nimic."
          },
          {
            "p": "Codul de mai jos pune totul laolaltă: coridorul, tabelul Q, formula și ε-greedy."
          },
          {
            "code": "import random\nimport numpy as np\n\nrandom.seed(0)\nN = 5                    # căsuțele 0, 1, 2, 3, 4; ținta e căsuța 4\nQ = np.zeros((N, 2))     # coloana 0 = stânga, coloana 1 = dreapta\nalfa, gamma = 0.5, 0.9\n\nfor episod in range(300):\n    eps = max(0.1, 1 - episod / 100)   # pornește de la 1, scade până la 0.1\n    s = 0                              # fiecare episod începe din căsuța 0\n    while s != N - 1:\n        if random.random() < eps:\n            a = random.randint(0, 1)   # explorare: o acțiune la întâmplare\n        else:\n            a = Q[s].argmax()          # exploatare: cea mai bună până acum\n        s2 = max(s - 1, 0) if a == 0 else s + 1   # din 0, stânga = pe loc\n        r = 10 if s2 == N - 1 else 0\n        viitor = 0 if s2 == N - 1 else Q[s2].max()\n        Q[s, a] += alfa * (r + gamma * viitor - Q[s, a])\n        s = s2\n\nprint(Q.round(2))\n# [[ 6.56  7.29]\n#  [ 6.56  8.1 ]\n#  [ 7.29  9.  ]\n#  [ 8.1  10.  ]\n#  [ 0.    0.  ]]\nprint(Q[:N - 1].argmax(axis=1))   # [1 1 1 1]: dreapta în fiecare căsuță"
          },
          {
            "p": "Fiecare episod pornește din căsuța 0 și ține până când agentul ajunge în căsuța 4 (bucla `while`). `Q[s]` e rândul căsuței s, iar `Q[s].argmax()` dă coloana cu valoarea cea mai mare (Lecția 4), adică acțiunea cea mai bună de până acum. `random.random()` dă un număr la întâmplare între 0 și 1 (Lecția 3); când ε = 0.1, numărul iese sub ε cam o dată din 10, și atunci agentul alege la întâmplare. `s2` e căsuța următoare, `r` recompensa, iar `viitor` e max Q(s',a'), adică 0 dacă s-a ajuns la țintă. Rândul cu `+=` e chiar formula de mai sus."
          },
          {
            "p": "Ce iese: tabelul învățat, rotunjit la două zecimale cu `Q.round(2)`. Pe coloana dreapta sunt exact valorile calculate de mână: 7.29, 8.1, 9 și 10. Și coloana stânga se potrivește, de exemplu Q(2, stânga) = 7.29, ca mai sus. Rândul căsuței 4 rămâne 0, fiindcă acolo jocul se termină. `Q[:N - 1].argmax(axis=1)` alege cea mai bună coloană pe fiecare rând în afară de ultimul: 1, adică dreapta, peste tot."
          },
          {
            "p": "ε din cod scade: e 1 la primul episod, 0.5 la episodul 50 și 0.1 de la episodul 90 încolo. La început agentul încearcă orice, apoi folosește tot mai des ce a învățat. Pentru că ε nu ajunge la 0, agentul mai încearcă stânga din când în când, de aceea are valori și coloana stânga."
          },
          {
            "note": "ε prea mic prea devreme e o capcană clasică: agentul se fixează pe primul drum decent găsit și nu mai explorează, rămânând blocat într-o soluție mediocră. Lasă-l să exploreze destul la început."
          }
        ]
      },
      {
        "heading": "Bias și corectitudine",
        "blocks": [
          {
            "p": "Aici bias nu mai înseamnă eroarea din presupuneri prea simple din Lecția 1. Înseamnă o nedreptate sistematică: modelul greșește mai des, sau decide mai prost, pentru un anumit grup de oameni. Un model învață din date, deci moștenește tiparele din ele, inclusiv pe cele nedrepte. Bias-ul intră pe mai multe uși: date istorice care reflectă discriminări trecute, etichetare părtinitoare, sau alegerea unei metrici care ascunde problema."
          },
          {
            "p": "De exemplu, dacă o firmă a angajat în trecut mai ales bărbați, un model antrenat pe angajările vechi învață că a fi bărbat e un semn bun. Asta nu spune însă nimic despre cât de bine lucrează cineva. Un model poate merge bine în medie și prost pe un subgrup, iar media ascunde asta. Cu numere: grupul A e 90% din date și modelul are pe el acuratețea 99%, iar grupul B e 10% din date și acolo modelul greșește jumătate din cazuri. Acuratețea totală e 0.9 · 99% + 0.1 · 50% = 89.1% + 5% = 94.1%, care arată foarte bine."
          },
          {
            "p": "De aceea măsori performanța separat pe fiecare subgrup, pe lângă scorul total. Cu pandas, dacă ai o coloană `grup` și o coloană `corect` (True când predicția e bună), `df.groupby(\"grup\")[\"corect\"].mean()` îți dă acuratețea pe fiecare grup (Lecția 4). Media unor valori True și False e chiar proporția de True. Corectitudinea are mai multe definiții, și aici e partea grea: nu poți mereu să le ai pe toate deodată."
          },
          {
            "list": [
              "Paritate demografică: modelul dă rezultate pozitive în aceeași proporție pentru fiecare grup. De exemplu, aprobă 45% din cereri și în grupul A, și în grupul B.",
              "Șanse egale: modelul are aceeași rată de adevărat pozitiv pentru fiecare grup (prinde la fel de bine cazurile reale în fiecare grup). Rata de adevărat pozitiv e recall-ul din Lecția 8, calculat separat pe fiecare grup."
            ]
          },
          {
            "p": "Un exemplu cu credite. În grupul A sunt 100 de oameni, dintre care 60 ar da banii înapoi. În grupul B sunt tot 100, dar doar 30 ar da banii înapoi. „Pozitiv” înseamnă că modelul aprobă creditul."
          },
          {
            "p": "Un model perfect aprobă exact oamenii care ar da banii înapoi: 60 în A și 30 în B. Rata de adevărat pozitiv e 60 / 60 = 100% în A și 30 / 30 = 100% în B, deci șansele egale sunt respectate. Rata de aprobare e însă 60% în A și 30% în B, deci paritatea demografică e încălcată."
          },
          {
            "p": "Acum ceri paritate: 45 de aprobări în fiecare grup. În A, cel mai bun lucru pe care îl poți face e să aprobi 45 din cei 60 care ar plăti, deci refuzi 15 oameni care ar fi meritat: rata de adevărat pozitiv scade la 45 / 60 = 75%. În B aprobi toți cei 30 care ar plăti, plus 15 care nu vor da banii înapoi, iar rata rămâne 100%. Paritatea e respectată (45% și 45%), dar șansele egale nu mai sunt (75% față de 100%)."
          },
          {
            "p": "Cele două definiții pot fi incompatibile matematic: satisfăcând-o pe una, o încalci pe cealaltă. Se întâmplă când grupurile au proporții diferite de cazuri pozitive reale, ca 60% și 30% aici. Le poți respecta pe amândouă doar cu un model care greșește mai mult: refuză oameni care ar fi meritat sau aprobă oameni care n-ar fi meritat. Nu există un răspuns pur tehnic. Alegerea depinde de context și de ce cost are fiecare tip de greșeală pentru oameni. Important e să fii conștient de compromis și să-l faci explicit, nu să raportezi doar media și să ascunzi restul."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Implementează Q-learning pe un grid-world și urmărește politica cum se formează."
      },
      {
        "title": "Măsoară performanța unui model pe subgrupuri și discută ce definiție de corectitudine folosești."
      },
      {
        "title": "Variază ε (explorarea) și observă cum se schimbă ce politică învață agentul."
      }
    ]
  }
];

export const lessonByModule = (code: string): Lesson | undefined =>
  lessons.find((l) => l.moduleCode === code);
