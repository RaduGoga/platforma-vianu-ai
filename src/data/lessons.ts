// AUTO-GENERAT din content/lessons/*.ro.md — NU edita direct.
// Editează fișierele markdown din content/lessons/, apoi rulează `npm run lessons`
// (se rulează oricum automat înainte de dev și build).
import type { Lesson } from "./lesson-types";
export type { Block, LessonSection, Lesson } from "./lesson-types";

export const lessons: Lesson[] = [
  {
    "moduleCode": "S1",
    "duration": "~2h",
    "intro": "Prima sesiune are două jumătăți. Întâi limpezim ce înseamnă inteligența artificială, ca să știi despre ce vorbim tot anul. Apoi facem logistica: un loc unde scrii cod și un loc unde trimiți răspunsuri.",
    "sections": [
      {
        "heading": "Ce e AI și unde se folosește",
        "blocks": [
          {
            "p": "Inteligența artificială e ideea de a face un program care rezolvă probleme fără să-i scrii tu, pas cu pas, regula pentru fiecare caz. În loc să-i spui „dacă e așa, fă asta”, îi arăți multe exemple și îl lași să găsească singur regula. Partea asta, de învățat din exemple, se numește machine learning, și e aproape tot ce faci la olimpiadă."
          },
          {
            "p": "Un exemplu face diferența clară. Ca să deosebești un email spam de unul normal cu reguli scrise de mână, ai scrie sute de „dacă conține cuvântul X”. Cu machine learning, îi dai câteva mii de emailuri deja marcate spam sau nu, și modelul învață singur ce combinații de cuvinte prezic spamul."
          },
          {
            "list": [
              "Clasificare: pui un label (spam sau nu, ce cifră e în imagine, pentru ce boală sunt specifice simptomele”).",
              "Regresie: prezici un număr (prețul unei case, temperatura de mâine).",
              "Clustering: găsești structura din date fără labeluri (ce clienți seamănă între ei)."
            ]
          },
          {
            "note": "La concursurile de AI, aproape orice problemă se reduce la asta: primești date cu exemple, antrenezi un model care învață din ele, și îl pui să prezică pe date noi."
          }
        ]
      },
      {
        "heading": "Ce e Python și de ce el",
        "blocks": [
          {
            "p": "Python e limbajul standard în care se scrie cod de inteligență artificială. Nu pentru că ar fi cel mai rapid, ci pentru că are bibliotecile pe care le vrei deja scrise: NumPy pentru calcul numeric, Pandas pentru tabele, scikit-learn pentru modele clasice, PyTorch pentru rețele neuronale."
          },
          {
            "p": "O bibliotecă reprezinta un cod scris de altcineva, pe care îl imporți și îl folosești. În loc să scrii tu algoritmul de sortare sau înmulțirea de matrice, chemi funcția potrivită. Cea mai mare parte din munca ta va fi să legi bibliotecile acestea între ele corect."
          },
          {
            "note": "Instalează Python 3.11 (o versiune stabilă, larg suportată) și JupyterLab. Jupyter îți dă un notebook interactiv unde rulezi cod bucată cu bucată și vezi rezultatul imediat, exact ce vrei când explorezi date."
          }
        ]
      },
      {
        "heading": "Pregătește mediul: Python, pip și Jupyter Lab",
        "blocks": [
          {
            "p": "Înainte să scrii cod, ai nevoie de trei lucruri instalate pe calculator: Python, pip (vine automat cu el) și Jupyter Lab."
          },
          {
            "list": [
              "Windows: intră pe python.org/downloads, descarcă ultima versiune 3.11 sau mai nouă și rulează instalatorul. La primul ecran bifează „Add python.exe to PATH\" înainte de Install Now, altfel terminalul nu va găsi Python după instalare.",
              "macOS: descarcă tot de pe python.org/downloads fișierul .pkg și parcurge instalatorul. Dacă ai deja Homebrew, merge la fel de bine brew install python@3.11.",
              "Linux (Ubuntu/Debian): deschide un terminal și rulează sudo apt update && sudo apt install python3 python3-pip python3-venv."
            ]
          },
          {
            "p": "Pip vine inclus cu Python începând din versiunea 3.4, deci nu-l instalezi separat. Ca să confirmi că merg amândouă, deschide un terminal (Command Prompt sau PowerShell pe Windows, Terminal pe macOS și Linux) și rulează:"
          },
          {
            "code": "python --version\npip --version",
            "caption": "Dacă amândouă îți dau un număr de versiune, Python și pip sunt instalate."
          },
          {
            "p": "Pe Windows, dacă python nu e recunoscut, încearcă py --version; dacă nici pip nu răspunde, încearcă pip3 sau python -m pip --version."
          },
          {
            "p": "Cu Python instalat, treci la mediul de lucru propriu-zis. Un mediu virtual e o cutie separată pentru bibliotecile unui proiect, ca să nu se bată cap în cap cu altele instalate global. Îl creezi o dată pe proiect și lucrezi mereu în el."
          },
          {
            "steps": [
              "Deschide un terminal în folderul unde lucrezi.",
              "Scrie pip install jupyterlab și apasă Enter.",
              "Scrie jupyter lab și apasă Enter: ți se deschide automat un tab de browser cu interfața."
            ]
          },
          {
            "note": "La concurs găsești toate astea deja instalate pe calculatoare."
          }
        ]
      },
      {
        "heading": "Documentația la concurs",
        "blocks": [
          {
            "p": "La concurs nu ești complet offline. Ai internet, dar unul controlat: doar pe o listă fixă de site-uri, de obicei documentația oficială a bibliotecilor pe care le folosești, gen numpy.org, scikit-learn.org, pandas.pydata.org, pytorch.org, docs.python.org. Sistemul vede ce accesezi, și dacă intri pe altceva decât ce e permis, ChatGPT, orice altă pagină, primești flag și riști descalificarea."
          },
          {
            "p": "Practic, poți căuta o funcție în documentația oficială, dar nu poți întreba pe nimeni și nu poți copia cod de pe un forum. Obișnuiește-te din timp să găsești răspunsul direct în docs, nu printr-o căutare pe Google."
          },
          {
            "p": "Există și o variantă mai rapidă, care merge chiar și fără nicio conexiune: în Jupyter, pui un semn de întrebare după o funcție și îți arată ce face și ce argumente ia, direct din biblioteca instalată pe calculator."
          },
          {
            "code": "pd.read_csv?      # deschide ajutorul pentru read_csv\nnp.mean?          # ce face, ce argumente ia",
            "caption": "Semnul întrebării deschide documentația fără internet."
          },
          {
            "note": "Verifică dinainte lista exactă de site-uri permise la concursul la care mergi, regulile diferă de la o competiție la alta. Ieșirea din listă e tratată ca încercare de fraudă."
          }
        ]
      },
      {
        "heading": "Prima submisie, bucla completă",
        "blocks": [
          {
            "p": "MLCompete (platform.olimpiada-ai.ro) si Nitro AI Judge (judge.nitro-ai.org) sunt platformele pe care vei exersa. Fă-ți cont pe amândouă."
          },
          {
            "p": "O competiție funcționează așa: descarci un set de date, antrenezi un model, produci un fișier cu predicțiile tale pentru datele de test, îl încarci, și primești un scor pe un clasament. Scopul primei tale submisii nu e scorul. E să vezi bucla întreagă măcar o dată."
          },
          {
            "steps": [
              "Intră într-o competiție de antrenament și citește ce metrică se punctează.",
              "Descarcă datele și deschide fișierul de exemplu de submisie, ca să vezi exact ce coloane și ce format cere.",
              "Produ un fișier în același format, chiar și cu răspunsuri la întâmplare.",
              "Încarcă-l și uită-te la scor."
            ]
          },
          {
            "note": "Un model bun cu un fișier prost formatat ia zero. Formatul submisiei nu e un detaliu, e o condiție. Verifică-l de fiecare dată: numele coloanelor, ordinea, separatorul, dacă are sau nu antet."
          }
        ]
      }
    ],
    "pitfalls": [],
    "practice": []
  },
  {
    "moduleCode": "S2",
    "duration": "~2h",
    "intro": "Înainte să înveți vreun model, merită să înțelegi despre ce este vorba. O problemă de concurs de AI are mereu aceleași piese: niște date, un target de prezis, o metrică de punctare și un fișier de submisie. Cine citește piesele astea corect pleacă cu un avans mare, fiindcă jumătate din greșelile de concurs nu-s de model, ci de citit enunțul pe fugă.",
    "sections": [
      {
        "heading": "Anatomia unei probleme",
        "blocks": [
          {
            "p": "Primești două seturi de date. Unul de antrenament, care are și răspunsurile corecte (numite labeluri sau target), și unul de test, care are aceleași coloane dar fără răspuns. Sarcina ta e să prezici răspunsul pentru setul de test, pornind de la ce ai învățat pe cel de antrenament."
          },
          {
            "list": [
              "Date de antrenament: rândurile pe care le vezi complet, cu tot cu răspuns. De aici învață modelul.",
              "Date de test: aceleași coloane, dar coloana-target lipsește. Aici trebuie să completezi tu.",
              "Targetul: ce prezici. Poate fi un label (spam sau nu) sau un număr (un preț).",
              "Fișierul de submisie: un tabel cu predicțiile tale, în formatul exact cerut de platformă."
            ]
          },
          {
            "note": "Primul lucru pe care îl faci la o problemă nouă nu e să antrenezi ceva. E să deschizi datele și fișierul de exemplu de submisie și să te uiți la ele: câte rânduri, ce coloane, ce lipsește, cum arată răspunsul cerut."
          }
        ]
      },
      {
        "heading": "Metrica",
        "blocks": [
          {
            "p": "Fiecare problemă are o metrică, adică formula după care se calculează scorul tău. E scrisă în enunț și e singura care contează. Nu ești punctat după cât de deștept pare modelul, ci după numărul pe care îl scoate metrica. Dacă metrica e F1 și tu optimizezi acuratețea, poți urca pe un scor care nu-ți aduce puncte."
          },
          {
            "list": [
              "Acuratețe: procentul de răspunsuri corecte. Simplă, dar înșelătoare când clasele sunt dezechilibrate.",
              "F1: echilibrează precizia cu recallul, bună când clasele sunt inegale.",
              "RMSE sau MAE: pentru numere, cât de departe ești în medie de răspunsul real."
            ]
          },
          {
            "p": "Regula practică: citește metrica înainte de orice, și antrenează cu ea în minte. Dacă se punctează F1, validează local tot pe F1, nu pe altceva."
          }
        ]
      },
      {
        "heading": "Submisie și leaderboard",
        "blocks": [
          {
            "p": "Când ai predicțiile, le pui în fișierul cerut și îl încarci. Platforma îl compară cu răspunsurile corecte, pe care tu nu le vezi, și îți dă un scor pe un clasament. Ai de obicei un număr limitat de submisii, deci nu le irosi pe încercări la întâmplare."
          },
          {
            "p": "Leaderboardul are două fețe. Cel public se calculează pe o parte din datele de test și îl vezi cât ține concursul. Cel privat se calculează pe restul și se dezvăluie abia la final. Clasamentul care contează e cel privat. Splitul ăsta există dintr-un motiv anume, și el te duce la capcana următoare."
          }
        ]
      },
      {
        "heading": "Capcana leaderboardului public",
        "blocks": [
          {
            "p": "Dacă îți alegi modelul după scorul public, ajungi să te potrivești pe acea bucată mică de date, nu pe problema reală. Se cheamă overfitting pe leaderboard: urci frumos pe public, apoi cazi pe privat, unde se împart de fapt punctele."
          },
          {
            "note": "Apărarea e o validare locală serioasă. Îți ții o parte din datele de antrenament deoparte, ca test propriu, și te încrezi în scorul de acolo mai mult decât în leaderboardul public. La final alegi submisiile pe scorul local, nu pe cel public."
          }
        ]
      },
      {
        "heading": "Unde te antrenezi",
        "blocks": [
          {
            "p": "Sunt trei locuri de care ai nevoie tot anul. Nu-s interschimbabile, fiecare are rostul lui."
          },
          {
            "list": [
              "MLCompete (platform.olimpiada-ai.ro): platforma pe care se ține olimpiada și pe care exersezi între etape, cu probleme de arhivă și competiții de antrenament.",
              "Nitro AI Judge (judge.nitro-ai.org): platforma pe care se ține RoAI si alte concursuri de AI."
            ]
          }
        ]
      }
    ],
    "pitfalls": [
      "Citește metrica și formatul submisiei înainte de orice model.",
      "Alege modelul după validarea ta locală, nu după clasamentul public.",
      "Păstrează submisiile zilei pentru ideile pe care le-ai verificat deja local."
    ],
    "practice": [
      "Ia o problemă de arhivă de pe MLCompete și scrie în trei rânduri: care e ținta, care e metrica, cum arată submisia.",
      "Fă-ți un split local de validare și compară scorul lui cu leaderboardul public pe aceeași submisie.",
      "Explică-i unui coleg diferența dintre leaderboardul public și cel privat, cu un exemplu."
    ],
    "keyTakeaways": [
      "O problemă are patru piese: date de antrenament cu etichete, date de test fără, o țintă, o metrică.",
      "Te punctează exact metrica din enunț. Optimizezi ce se punctează, nu ce ți se pare frumos.",
      "Leaderboardul privat decide clasamentul, cel public doar te tentează."
    ]
  },
  {
    "moduleCode": "S3",
    "duration": "~1 săptămână",
    "intro": "Tot ce urmează în programă e scris în Python. Modulul ăsta e despre limbaj, nu despre machine learning: dacă îl sari, o să pierzi timp la fiecare lecție următoare căutând cum se scrie un dicționar. Dacă știi deja Python, treci repede peste el și oprește-te doar la comprehensions, despachetare, excepții și expresii regulate, care apar constant în codul de concurs.",
    "sections": [
      {
        "heading": "Tipuri și variabile",
        "blocks": [
          {
            "p": "Python nu cere să declari tipul. Îl deduce din valoare, iar tipul poate să se schimbe."
          },
          {
            "code": "n = 42            # int\npi = 3.14         # float\nnume = \"Victor\"     # str\ngata = True       # bool\nnimic = None      # absența unei valori\n\nprint(type(n), type(pi))"
          },
          {
            "p": "Poți atribui mai multe variabile deodată, fie cu valori diferite, fie cu aceeași valoare tuturor."
          },
          {
            "code": "a, b, c = 1, 2, 3\nx = y = 0"
          },
          {
            "p": "Operatorii de atribuire pe scurt (`+=`, `-=`, `*=`, `//=`) modifica valoarea si apoi o pun in variabila respectivă."
          },
          {
            "code": "total = 0\nfor s in [1, 2, 3]:\n    total += s   # total = total + s"
          },
          {
            "p": "Pentru text, f-string-ul e felul modern de a insera valori. Pui un `f` în fața ghilimelelor și scrii expresia între acolade."
          },
          {
            "code": "scor = 0.8734\nprint(f\"scor: {scor:.2f}\")        # scor: 0.87\nprint(f\"dublu: {scor * 2:.3f}\")   # dublu: 1.747"
          },
          {
            "p": "Împărțirea are două forme: `/` dă mereu float, `//` dă împărțirea întreagă rotunjită în jos, iar `%` dă restul. `int(...)` trunchiază spre zero, `round(...)` rotunjește normal, iar `str(...)`/`float(...)`/`list(...)` convertesc explicit între tipuri."
          },
          {
            "code": "print(7 / 2)          # 3.5\nprint(7 // 2)         # 3\nprint(7 % 2)           # 1\nprint(int(3.9))        # 3, trunchiază\nprint(round(3.9))      # 4, rotunjește\nprint(str(42) + \"!\")   # \"42!\""
          },
          {
            "note": "`0`, `0.0`, `\"\"`, `[]`, `{}`, `set()` și `None` sunt toate „false\" când le pui într-un `if`. O listă goală e falsă, orice altceva e adevărat."
          }
        ]
      },
      {
        "heading": "Cele patru structuri de date",
        "blocks": [
          {
            "p": "Aproape tot ce scrii folosește una dintre astea."
          },
          {
            "list": [
              "Lista: ordonată, se poate modifica. `[1, 2, 3]`",
              "Tuple: ordonată, nu se poate modifica. `(1, 2)`",
              "Dicționar: perechi cheie–valoare. `{\"a\": 1}`",
              "Mulțime: valori unice, fără ordine. `{1, 2, 3}`"
            ]
          },
          {
            "code": "scoruri = [0.71, 0.83, 0.79]\nscoruri.append(0.88)\nprint(len(scoruri), max(scoruri))"
          },
          {
            "p": "Pe lângă `.append()`, listele mai au câteva metode pe care le folosești constant: `.insert(poz, val)` bagă la o poziție anume, `.pop(poz)` scoate elementul (fără argument, scoate ultimul), `.remove(val)` scoate prima apariție a unei valori, `.index(val)` îți dă poziția ei."
          },
          {
            "code": "scoruri.insert(0, 0.5)\nultimul = scoruri.pop()\nscoruri.remove(0.71)\nprint(scoruri.index(0.83))"
          },
          {
            "p": "Dicționarele nu se citesc doar cu `d[\"cheie\"]`, care aruncă eroare dacă cheia lipsește. `.get(\"cheie\", implicit)` întoarce o valoare implicită."
          },
          {
            "code": "note = {\n\t\"Radu\" : 4,\n\t\"Stefan\" : 10,\n\t\"Victor\" : 8\n}\nprint(note[\"Stefan\"]) # 10\nprint(note.get(\"Radu\")) # 4"
          },
          {
            "p": "Dicționarele pot conține alte dicționare."
          },
          {
            "code": "elev = {\"nume\": \"Ana\", \"note\": {\"ro\": 9, \"en\": 10}}\nprint(elev[\"note\"][\"en\"])   # 10"
          },
          {
            "p": "Mulțimile scot valorile duplicate și fac operații de tip matematic: reuniune, intersecție, diferență, utile când compari două seturi de etichete sau de cuvinte."
          },
          {
            "code": "a = set([1, 2, 2, 3, 3, 3])   # {1, 2, 3}\nb = {3, 4, 5}\n\na.add(10)\na.discard(1)\n\nprint(a | b)   # reuniune: {2, 3, 4, 5, 10}\nprint(a & b)   # intersecție: {3}\nprint(a - b)   # diferență: elemente din a care nu sunt în b"
          },
          {
            "p": "O altă capcană, mai puțin evidentă: `b = a` nu copiază lista, doar îi dă un nume nou aceleiași liste din memorie. Ca să ai o copie reală, folosește `a.copy()` sau `list(a)`."
          },
          {
            "code": "a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)          # [1, 2, 3, 4], s-a schimbat și a\n\nc = a.copy()\nc.append(5)\nprint(a)          # neschimbat de data asta"
          }
        ]
      },
      {
        "heading": "Indexare și felii",
        "blocks": [
          {
            "p": "Indexarea începe de la zero. Indicii negativi numără de la coadă. Felia `a:b` include începutul și exclude sfârșitul."
          },
          {
            "code": "v = [10, 20, 30, 40, 50]\n\nv[0]      # 10, primul\nv[-1]     # 50, ultimul\nv[1:3]    # [20, 30], de la 1 până înainte de 3\nv[:2]     # [10, 20]\nv[::2]    # [10, 30, 50], din doi în doi"
          },
          {
            "p": "Regula asta se repetă identic la string-uri, la array-urile NumPy și la coloanele Pandas. O înveți o dată și o folosești peste tot. String-urile au însă o particularitate: sunt imutabile, nu poți schimba un caracter pe loc, doar poți construi un string nou."
          },
          {
            "code": "s = \"Vianu\"\ns[0]        # \"V\", indexarea merge\n# s[0] = \"X\"  # eroare: TypeError, string-urile nu se modifică\n\ns2 = \"X\" + s[1:]   # \"Xianu\", string nou"
          },
          {
            "p": "Pentru caractere speciale în string-uri folosești secvențe de escape: `\\n` linie nouă, `\\t` tab, `\\\\` un singur backslash, `\\\"` ghilimele în interiorul unui string cu ghilimele duble."
          },
          {
            "code": "print(\"prima linie\\na doua linie\")\nprint(\"coloana1\\tcoloana2\")"
          }
        ]
      },
      {
        "heading": "Condiții și bucle",
        "blocks": [
          {
            "p": "Blocurile se delimitează prin indentare, nu prin acolade. Patru spații, consecvent."
          },
          {
            "code": "for s in scoruri:\n    if s > 0.8:\n        print(\"bun\", s)\n    else:\n        print(\"slab\", s)"
          },
          {
            "p": "Comparațiile (`==`, `!=`, `<`, `>`, `<=`, `>=`) și operatorii logici (`and`, `or`, `not`) se combină ca în orice limbaj, dar Python scrie `and`/`or`/`not` în loc de `&&`/`||`/`!`."
          },
          {
            "code": "scor, incercari = 0.9, 3\nif scor > 0.8 and incercari < 5:\n    print(\"continuă\")\nif not (scor < 0.5 or incercari == 0):\n    print(\"are sens să încerci\")"
          },
          {
            "p": "O capcană clasică pentru cine vine din alt limbaj: `==` compară valorile, `is` compară dacă sunt exact același obiect în memorie. Pentru `None`, folosești mereu `is`, niciodată `==`."
          },
          {
            "code": "x = None\nif x is None:       # corect\n    print(\"gol\")\n\na = [1, 2]\nb = [1, 2]\nprint(a == b)   # True, aceleași valori\nprint(a is b)   # False, obiecte diferite"
          },
          {
            "p": "Pentru un `if` scurt care doar alege între două valori, expresia condițională (ternary) încape pe o linie."
          },
          {
            "code": "eticheta = \"bun\" if scor > 0.8 else \"slab\""
          },
          {
            "p": "Când ai nevoie și de poziție, folosește `enumerate`. Când parcurgi două liste odată, `zip`."
          },
          {
            "code": "for i, s in enumerate(scoruri):\n    print(i, s)\n\nfor nume, scor in zip([\"a\", \"b\"], [0.7, 0.9]):\n    print(nume, scor)"
          },
          {
            "p": "Pe lângă `for`, ai `while`, cât timp o condiție rămâne adevărată. `break` iese din buclă, `continue` sare peste iterația curentă."
          },
          {
            "code": "i = 0\nwhile i < len(scoruri):\n    if scoruri[i] < 0.5:\n        i += 1\n        continue\n    if scoruri[i] > 0.95:\n        break\n    print(scoruri[i])\n    i += 1"
          },
          {
            "p": "Sortarea se face cu `sorted()` sau `.sort()`, iar `key` îți spune după ce sortezi."
          },
          {
            "code": "elevi = [(\"Ana\", 9.2), (\"Bogdan\", 8.7), (\"Cris\", 9.5)]\nelevi.sort(key=lambda x: x[1], reverse=True)\nprint(elevi)   # sortați descrescător după notă"
          }
        ]
      },
      {
        "heading": "Comprehensions",
        "blocks": [
          {
            "p": "Un mod scurt de a construi o structură dintr-alta. Apare des în codul de concurs, așa că merită citit fluent chiar dacă la început scrii bucle obișnuite."
          },
          {
            "code": "patrate = [x * x for x in range(5)]          # [0, 1, 4, 9, 16]\nbune = [s for s in scoruri if s > 0.8]       # doar cele peste 0.8"
          },
          {
            "p": "Se citește de la stânga: „ia fiecare x din range, păstrează-l dacă trece condiția, pune x*x în listă\". Merge la fel pentru dicționare și mulțimi. `range(n)` nu creează efectiv o listă de n numere, generează valorile pe rând, deci `range(10_000_000)` nu ocupă memorie pentru zece milioane de numere."
          },
          {
            "code": "lungimi = {c: len(c) for c in [\"rf\", \"xgboost\"]}   # {\"rf\": 2, \"xgboost\": 7}\nunice_lung = {len(c) for c in [\"rf\", \"svm\", \"cnn\"]}   # {2, 3}"
          },
          {
            "p": "O expresie generator arată la fel ca o list comprehension, dar cu paranteze rotunde. Nu construiește toată structura în memorie dintr-o dată, ci produce valorile pe rând, ceea ce contează pe sume sau bucle mari."
          },
          {
            "code": "suma = sum(x * x for x in range(1_000_000))"
          }
        ]
      },
      {
        "heading": "Funcții",
        "blocks": [
          {
            "p": "O funcție grupează cod pe care îl repeți. Argumentele pot avea valori implicite, iar cele implicite se pun întotdeauna la final."
          },
          {
            "code": "def normalizeaza(v, minim=0.0, maxim=1.0):\n    lo, hi = min(v), max(v)\n    if hi == lo:\n        return [minim] * len(v)\n    return [minim + (x - lo) / (hi - lo) * (maxim - minim) for x in v]\n\nprint(normalizeaza([2, 4, 6]))    # [0.0, 0.5, 1.0]"
          },
          {
            "p": "Despachetarea îți lasă să atribui mai multe valori odată. O vei vedea constant la împărțirea datelor."
          },
          {
            "code": "a, b = 1, 2\nX_tr, X_val, y_tr, y_val = imparte(X, y)   # patru valori dintr-o dată"
          },
          {
            "note": "Nu pune niciodată o listă sau un dicționar ca valoare implicită a unui argument. Se creează o singură dată, la definirea funcției, și rămâne comună între apeluri. Folosește `None` și creează valoarea înăuntru."
          },
          {
            "p": "O variabilă creată într-o funcție există doar acolo, e locală. Funcția vede variabilele globale, dar nu le poate modifica fără cuvântul cheie `global`, iar nevoia de `global` e de obicei semn că funcția ar trebui rescrisă să primească și să întoarcă valori, nu să atingă starea din afară."
          },
          {
            "code": "contor = 0\n\ndef increment_gresit():\n    contor = contor + 1   # eroare: variabilă locală folosită înainte de a fi definită\n\ndef increment():\n    global contor\n    contor += 1   # merge, dar evită tiparul ăsta când poți"
          },
          {
            "p": "Uneori nu știi dinainte câte argumente primești. `*args` adună argumentele poziționale într-un tuple, `**kwargs` pe cele numite într-un dicționar."
          },
          {
            "code": "def raport(*scoruri, **info):\n    print(\"scoruri:\", scoruri)\n    print(\"info:\", info)\n\nraport(0.8, 0.9, model=\"rf\", seed=42)"
          },
          {
            "p": "O `lambda` e o funcție mică, fără nume, scrisă pe o linie. O vezi des ca argument pentru `sorted`, `map` sau `filter`."
          },
          {
            "code": "dublu = lambda x: x * 2\nprint(dublu(5))     # 10\n\nprint(list(map(lambda x: x * x, [1, 2, 3])))      # [1, 4, 9]\nprint(list(filter(lambda x: x > 0.8, scoruri)))   # doar cele peste 0.8"
          },
          {
            "p": "În practică, o comprehension face de multe ori treaba mai clar decât `map`/`filter`. Le folosești mai ales când funcția vine deja definită de altundeva."
          },
          {
            "p": "O funcție se poate apela pe ea însăși, recursiv. Rar necesar în codul de zi cu zi de AI, dar util să-l recunoști: are mereu un caz de bază care oprește recursivitatea."
          },
          {
            "code": "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))   # 120"
          },
          {
            "p": "O funcție cu `yield` în loc de `return` e un generator: nu întoarce toate valorile dintr-o dată, ci una pe rând, de fiecare dată când e apelată din nou printr-o buclă `for`."
          },
          {
            "code": "def numere_pare(pana_la):\n    for n in range(pana_la):\n        if n % 2 == 0:\n            yield n\n\nfor n in numere_pare(10):\n    print(n)"
          }
        ]
      },
      {
        "heading": "Clase și module",
        "blocks": [
          {
            "p": "O clasă ține date și funcții la un loc. N-o să scrii multe, dar toate bibliotecile pe care le folosești sunt construite din clase, deci trebuie să înțelegi ce se întâmplă când scrii `model.fit(X, y)`."
          },
          {
            "code": "class Medie:\n    def __init__(self):\n        self.valoare = None\n\n    def fit(self, y):\n        self.valoare = sum(y) / len(y)\n        return self\n\n    def predict(self, n):\n        return [self.valoare] * n\n\nm = Medie().fit([1, 2, 3])\nprint(m.predict(2))    # [2.0, 2.0]"
          },
          {
            "p": "Asta e exact tiparul din scikit-learn: `fit` învață și reține, `predict` folosește ce a învățat."
          },
          {
            "p": "O clasă poate moșteni dintr-alta, cu `class Copil(Parinte):`, și `super()` apelează varianta din clasa de bază. Vei vedea tiparul ăsta constant mai târziu, la rețele neuronale în PyTorch, unde orice model e o clasă care moștenește din `nn.Module`."
          },
          {
            "code": "class Model:\n    def __init__(self, nume):\n        self.nume = nume\n\n    def descrie(self):\n        return f\"model {self.nume}\"\n\nclass ModelCuSeed(Model):\n    def __init__(self, nume, seed):\n        super().__init__(nume)\n        self.seed = seed\n\n    def descrie(self):\n        return f\"{super().descrie()}, seed {self.seed}\"\n\nprint(ModelCuSeed(\"rf\", 42).descrie())   # model rf, seed 42"
          },
          {
            "p": "Codul altcuiva se aduce cu `import`."
          },
          {
            "code": "import math\nfrom collections import Counter\n\nprint(math.sqrt(16))\nprint(Counter([\"a\", \"b\", \"a\"]))    # Counter({'a': 2, 'b': 1})"
          }
        ]
      },
      {
        "heading": "Erori și excepții",
        "blocks": [
          {
            "p": "Codul care citește fișiere, parsează date sau primește input dă erori, garantat. Python le numește excepții, și le prinzi cu `try`/`except` ca să nu-ți pice tot programul pentru o singură linie proastă."
          },
          {
            "code": "def imparte(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        print(\"nu poți împărți la zero\")\n        return None\n\nprint(imparte(10, 2))   # 5.0\nprint(imparte(10, 0))   # mesaj, apoi None"
          },
          {
            "p": "Cele mai dese excepții la concurs: `ValueError` (o conversie eșuată, gen `int(\"abc\")`), `KeyError` (o cheie care nu există într-un dicționar), `IndexError` (un indice în afara listei), `FileNotFoundError` (o cale greșită la date)."
          },
          {
            "note": "Nu prinde excepții cu `except:` gol. Ascunde orice greșeală, inclusiv pe cele pe care ar trebui să le vezi. Prinde exact tipul pe care îl aștepți, de exemplu `except ValueError:`."
          },
          {
            "p": "`finally` rulează mereu, cu sau fără excepție, bun pentru curățenie. `assert` verifică rapid o presupunere și oprește programul cu un mesaj clar dacă nu e adevărată, util să prinzi bug-uri devreme, nu la finalul rulării."
          },
          {
            "code": "assert len(X) == len(y), \"X și y trebuie să aibă aceeași lungime\""
          }
        ]
      },
      {
        "heading": "Text și expresii regulate",
        "blocks": [
          {
            "p": "Multe probleme, mai ales la NLP, cer curățat text înainte să faci orice altceva. String-urile au metode gata făcute pentru asta."
          },
          {
            "code": "s = \"  Al Doilea RĂZBOI Mondial  \"\nprint(s.strip())          # scoate spațiile de la capete\nprint(s.lower())          # litere mici\nprint(s.split())          # ['Al', 'Doilea', 'RĂZBOI', 'Mondial']\nprint(\"-\".join([\"a\", \"b\", \"c\"]))   # \"a-b-c\"\nprint(s.replace(\"RĂZBOI\", \"razboi\"))"
          },
          {
            "p": "Pentru tipare mai complicate decât `.replace()`, modulul `re` face potriviri după expresii regulate."
          },
          {
            "code": "import re\n\ntext = \"contact: ana@exemplu.ro sau 0722 123 456\"\nemailuri = re.findall(r\"[\\w.]+@[\\w.]+\", text)\nprint(emailuri)    # ['ana@exemplu.ro']\n\ncuratat = re.sub(r\"\\d+\", \"\", text)   # scoate toate cifrele"
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
            "p": "Citirea și scrierea unui fișier text se fac cu `with`, care îl închide singur chiar dacă apare o eroare."
          },
          {
            "code": "with open(\"note.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"prima linie\\n\")\n\nwith open(\"note.txt\", encoding=\"utf-8\") as f:\n    for linie in f:\n        print(linie.strip())"
          },
          {
            "p": "Pune întotdeauna `encoding=\"utf-8\"`. Fără el, pe Windows, diacriticele se citesc greșit."
          },
          {
            "p": "Datele de concurs vin rar ca text simplu. De obicei sunt CSV sau JSON, și Python are module standard pentru amândouă, chiar înainte să ajungi la Pandas."
          },
          {
            "code": "import csv\n\nwith open(\"scoruri.csv\", encoding=\"utf-8\") as f:\n    cititor = csv.DictReader(f)\n    for rand in cititor:\n        print(rand[\"nume\"], rand[\"scor\"])"
          },
          {
            "code": "import json\n\ndate = {\"model\": \"rf\", \"scor\": 0.87}\nwith open(\"rezultat.json\", \"w\", encoding=\"utf-8\") as f:\n    json.dump(date, f)\n\nwith open(\"rezultat.json\", encoding=\"utf-8\") as f:\n    incarcat = json.load(f)"
          },
          {
            "p": "Pentru căi de fișiere, `pathlib` e mai clar decât să lipești string-uri cu `+`."
          },
          {
            "code": "from pathlib import Path\n\nfolder = Path(\"date\")\nfisier = folder / \"train.csv\"\nprint(fisier.exists())"
          }
        ]
      },
      {
        "heading": "Random și reproductibilitate",
        "blocks": [
          {
            "p": "Multe lucruri în AI par întâmplătoare: împărțirea datelor, inițializarea unui model, amestecarea unui set de antrenament. Modulul `random` controlează asta, iar `seed`-ul face rezultatele repetabile."
          },
          {
            "code": "import random\n\nrandom.seed(42)\nprint(random.random())        # mereu aceeași valoare, cu același seed\nprint(random.randint(1, 10))\nrandom.shuffle(scoruri)       # amestecă lista pe loc"
          },
          {
            "note": "Pune `random.seed(...)` la începutul scriptului, o singură dată. Fără el, rulezi codul de două ori și iei rezultate diferite, ceea ce face imposibil să compari corect două idei."
          }
        ]
      }
    ],
    "pitfalls": [],
    "practice": []
  },
  {
    "moduleCode": "S4",
    "duration": "~2 săptămâni",
    "intro": "NumPy e biblioteca pentru calcul numeric în Python: lucrează cu array-uri de numere și face operațiile mult mai rapid decât o buclă obișnuită. Pandas e construit peste NumPy și adaugă etichete: coloane cu nume, rânduri cu index, tabele ca într-un Excel. Le folosești pe amândouă în aproape orice problemă din concurs, indiferent de model.",
    "sections": [
      {
        "heading": "Instalare",
        "blocks": [
          {
            "p": "Ambele sunt biblioteci externe, nu vin cu Python. Le instalezi o singură dată, în mediul virtual al proiectului."
          },
          {
            "code": "pip install numpy\npip install pandas",
            "caption": "Rulează comenzile astea în terminal, în folderul proiectului."
          }
        ]
      },
      {
        "heading": "De ce nu ajunge Python simplu",
        "blocks": [
          {
            "p": "În Python obișnuit, o listă de un milion de numere pe care vrei s-o aduni element cu element se face cu o buclă for. Merge, dar e lent, pentru că Python verifică tipul fiecărui element la fiecare pas. Când ai date reale, asta devine insuportabil."
          },
          {
            "p": "NumPy rezolvă problema cu o structură nouă: ndarray, o grilă de numere de același tip, cu formă fixă. Operațiile se aplică pe tot vectorul deodată, într-un cod compilat rapid, fără buclă în Python. Ideea se numește vectorizare și e de zeci de ori mai rapidă."
          },
          {
            "code": "import numpy as np\n\n# lent, în Python pur\ntotal = 0\nfor x in range(1_000_000):\n    total += x * x\n\n# rapid, vectorizat\nv = np.arange(1_000_000)\ntotal = (v * v).sum()",
            "caption": "Aceeași sumă, dar a doua variantă e mult mai rapidă."
          }
        ]
      },
      {
        "heading": "Creezi și transformi array-uri",
        "blocks": [
          {
            "p": "`np.array()` transformă o listă Python într-un ndarray. `np.zeros(n)` și `np.ones(n)` fac un array plin cu 0 sau 1, util când vrei un loc gol de completat. `np.arange(start, stop, pas)` merge ca `range`, dar întoarce un array. `np.linspace(start, stop, n)` împarte un interval în n valori egal distanțate, util pentru grafice."
          },
          {
            "code": "a = np.array([1, 2, 3])\nzerouri = np.zeros(5)          # [0. 0. 0. 0. 0.]\nunu = np.ones((2, 3))          # matrice 2x3 plină cu 1\npasi = np.arange(0, 10, 2)     # [0 2 4 6 8]\nliniar = np.linspace(0, 1, 5)  # [0. 0.25 0.5 0.75 1.]"
          },
          {
            "p": "Fiecare array are un singur `dtype`, tipul tuturor elementelor (`int64`, `float64` etc.). Amestecarea unui întreg cu un float în același array îl convertește pe tot la float."
          },
          {
            "code": "a.dtype              # dtype('int64')\nnp.array([1, 2.5]).dtype   # dtype('float64')"
          },
          {
            "p": "`reshape` schimbă forma unui array fără să-i schimbe conținutul, cât timp numărul total de elemente rămâne același. `flatten()` face inversul, îl aduce la o singură dimensiune."
          },
          {
            "code": "v = np.arange(6)\nm = v.reshape(2, 3)    # [[0 1 2], [3 4 5]]\nm.flatten()             # înapoi la [0 1 2 3 4 5]"
          },
          {
            "note": "O felie dintr-un array (`v[1:4]`) e o vedere (view), nu o copie: modificarea ei modifică și originalul. Dacă vrei o copie independentă, cere-o explicit cu `.copy()`."
          },
          {
            "code": "v = np.array([1, 2, 3, 4])\nfelie = v[1:3]\nfelie[0] = 99\nprint(v)              # [1, 99, 3, 4], s-a schimbat și originalul\n\ncopie = v[1:3].copy()\ncopie[0] = -1\nprint(v)              # neschimbat de data asta"
          }
        ]
      },
      {
        "heading": "ndarray: formă, axe, indexare",
        "blocks": [
          {
            "p": "Un ndarray are o formă (shape): câte rânduri, câte coloane, câte dimensiuni. O imagine alb-negru e o matrice 2D, una color e 3D (înălțime, lățime, canale). Prima ta grijă la orice bug e să tipărești forma și să verifici că e ce credeai."
          },
          {
            "p": "Axele sunt direcțiile pe care operezi. axis=0 merge pe rânduri (pe verticală, rezultatul e câte o valoare pe coloană), axis=1 merge pe coloane (pe orizontală). Confuzia dintre axe e printre cele mai frecvente greșeli de început."
          },
          {
            "code": "x = np.array([[1, 2, 3],\n              [4, 5, 6]])\n\nx.shape          # (2, 3): 2 rânduri, 3 coloane\nx.mean(axis=0)   # media pe fiecare coloană -> [2.5, 3.5, 4.5]\nx.mean(axis=1)   # media pe fiecare rând    -> [2.0, 5.0]"
          },
          {
            "p": "La un array cu mai multe dimensiuni, indexarea și felierea se scriu cu o virgulă între dimensiuni, în loc de paranteze separate."
          },
          {
            "code": "x[0, 1]      # 2, rândul 0, coloana 1\nx[:, 0]      # [1, 4], toate rândurile, coloana 0\nx[0, :]      # [1, 2, 3], tot rândul 0"
          },
          {
            "p": "Indexarea cu mască booleană e o unealtă pe care o folosești zilnic: construiești un vector de True/False și selectezi doar elementele unde e True. Așa filtrezi date fără buclă."
          },
          {
            "code": "x[x > 3]         # doar elementele mai mari ca 3 -> [4, 5, 6]\nx[x > 3] = 0     # și le poți și schimba pe loc"
          }
        ]
      },
      {
        "heading": "Broadcasting: cum potrivește NumPy forme diferite",
        "blocks": [
          {
            "p": "Broadcasting e regula prin care NumPy face operații între vectori de forme diferite, întinzând automat pe cel mic ca să se potrivească. Jumătate din erorile de început vin din forme care nu se potrivesc cum credeai."
          },
          {
            "p": "Regula: NumPy compară formele de la dreapta la stânga. Două dimensiuni se potrivesc dacă sunt egale sau dacă una e 1 (aia se întinde). Un scalar se potrivește cu orice."
          },
          {
            "code": "X = np.array([[1, 2, 3],\n              [4, 5, 6]])      # forma (2, 3)\nmedii = X.mean(axis=0)         # forma (3,): [2.5, 3.5, 4.5]\nX_centrat = X - medii          # (2,3) - (3,) se potrivește, scade pe coloane",
            "caption": "Centrarea unei matrice pe medii, fără nicio buclă."
          },
          {
            "note": "Când o operație dă eroare de shape, tipărește formele celor doi operanzi și aplică regula de la dreapta la stânga. De 9 din 10 ori vezi imediat unde nu se potrivesc."
          }
        ]
      },
      {
        "heading": "Sortare, căutare și seturi în NumPy",
        "blocks": [
          {
            "p": "`np.sort()` sortează un array fără să-l schimbe pe loc. `np.argsort()` întoarce indicii care ar sorta array-ul, util când vrei să sortezi un array după valorile altuia."
          },
          {
            "code": "v = np.array([3, 1, 2])\nnp.sort(v)          # [1, 2, 3]\nnp.argsort(v)       # [1, 2, 0], indicii în ordine crescătoare"
          },
          {
            "p": "`np.where(condiție, atunci, altfel)` alege între două valori element cu element, mai flexibil decât o mască simplă. `argmax`/`argmin` dau poziția celui mai mare, respectiv mic element."
          },
          {
            "code": "np.where(v > 1, v, 0)   # [3, 0, 2], păstrează ce e peste 1, restul devine 0\nv.argmax()               # 0, poziția lui 3"
          },
          {
            "p": "`np.unique()` întoarce valorile distincte dintr-un array, sortate. `np.concatenate()` lipește mai multe array-uri într-unul singur."
          },
          {
            "code": "np.unique([1, 2, 2, 3, 1])      # [1, 2, 3]\nnp.concatenate([[1, 2], [3, 4]]) # [1, 2, 3, 4]"
          }
        ]
      },
      {
        "heading": "Pandas: date cu etichete",
        "blocks": [
          {
            "p": "Datele reale au nume: coloana vârstă, coloana scor, coloana clasă. Pandas adaugă etichete peste NumPy, în două structuri: Series (o singură coloană, cu index) și DataFrame (un tabel întreg, mai multe coloane). E structura în care ajung mai toate seturile de concurs."
          },
          {
            "code": "s = pd.Series([10, 20, 30], index=[\"a\", \"b\", \"c\"])\nprint(s[\"b\"])     # 20\n\ndf = pd.DataFrame({\"nume\": [\"Ana\", \"Bogdan\"], \"scor\": [9.2, 8.7]})"
          },
          {
            "p": "Un DataFrame e practic un dicționar de Series, câte una pentru fiecare coloană. Citești un fișier CSV cu o singură linie, apoi te uiți la el înainte de orice: primele rânduri, tipurile coloanelor, câte valori lipsesc."
          },
          {
            "code": "import pandas as pd\n\ndf = pd.read_csv(\"date.csv\")\n\ndf.head()        # primele 5 rânduri\ndf.info()        # tipuri și câte valori non-nule\ndf.describe()    # statistici pe coloanele numerice"
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
            "code": "df.loc[10, \"scor\"]        # valoarea de la indexul 10, coloana \"scor\"\ndf.iloc[0, 2]             # rândul 0, coloana 2, după poziție\ndf.loc[df[\"scor\"] > 8]    # toate rândurile cu scor peste 8"
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
            "code": "df.isna().sum()          # câte valori lipsesc pe fiecare coloană\ndf.dropna()               # scoate rândurile cu orice gol\ndf[\"scor\"].fillna(df[\"scor\"].mean())   # completează golurile cu media"
          },
          {
            "note": "Alege între `dropna` și `fillna` în funcție de câte rânduri ai și de ce înseamnă lipsa: dacă lipsesc puține valori, le poți arunca; dacă lipsesc multe, arunci prea multe date bune odată cu ele."
          },
          {
            "p": "`duplicated()` marchează rândurile identice cu unul de mai devreme, `drop_duplicates()` le scoate. `astype()` schimbă tipul unei coloane, de exemplu dintr-un text într-un număr."
          },
          {
            "code": "df.duplicated().sum()          # câte rânduri sunt duplicate\ndf = df.drop_duplicates()\n\ndf[\"scor\"] = df[\"scor\"].astype(float)\ndf[\"data\"] = pd.to_datetime(df[\"data\"])   # text -> dată calendaristică"
          }
        ]
      },
      {
        "heading": "groupby, merge, pivot: cele pe care le folosești mereu",
        "blocks": [
          {
            "p": "groupby împarte datele pe grupuri și calculează ceva pe fiecare grup: media pe clasă, suma pe categorie."
          },
          {
            "code": "df.groupby(\"clasa\")[\"scor\"].mean()      # media scorului pe fiecare clasă\ndf.groupby(\"clasa\").size()             # câte rânduri are fiecare clasă"
          },
          {
            "p": "merge lipește două tabele după o coloană comună. how spune ce faci cu rândurile fără pereche: left păstrează tot din stânga, inner doar potrivirile. Când tabelele au aceleași coloane și vrei doar să le pui unul sub altul, folosești `pd.concat()` în loc de merge."
          },
          {
            "code": "df.merge(alt_tabel, on=\"id\", how=\"left\")\npd.concat([df1, df2])   # pune df2 sub df1, aceleași coloane"
          },
          {
            "p": "pivot_table rearanjează un tabel lung într-unul lat, cu o coloană devenită antet. E util la rapoarte și la văzut tipare pe două dimensiuni deodată."
          }
        ]
      },
      {
        "heading": "Alte operații frecvente",
        "blocks": [
          {
            "p": "`sort_values()` sortează un DataFrame după o coloană. `value_counts()` numără de câte ori apare fiecare valoare distinctă, prima verificare când vrei să vezi dacă o clasă e dezechilibrată."
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
            "p": "`corr()` calculează corelația dintre coloanele numerice, un prim pas rapid ca să vezi ce variabile par legate de ținta pe care vrei s-o prezici."
          },
          {
            "code": "df.corr(numeric_only=True)"
          },
          {
            "p": "La final, scrii rezultatul înapoi pe disc cu `to_csv`, exact formatul pe care îl încarci la submisie."
          },
          {
            "code": "df.to_csv(\"rezultat.csv\", index=False)"
          }
        ]
      }
    ],
    "pitfalls": [],
    "practice": []
  },
  {
    "moduleCode": "S6",
    "duration": "~2 săptămâni",
    "intro": "Înainte să antrenezi orice, uită-te la date. La distribuții, la ce lipsește, la cum sunt scalate coloanele. Etapa asta se numește EDA, analiză exploratorie, și e prima pe care o faci la orice problemă nouă.",
    "sections": [
      {
        "heading": "Ce cauți când te uiți la date",
        "blocks": [
          {
            "p": "EDA înseamnă să pui întrebări simple datelor și să te uiți la răspuns înainte să tragi vreo concluzie. Câte rânduri și coloane sunt. Ce tip are fiecare coloană. Cum arată ținta, adică ce vrei să prezici. Ce lipsește și cât de mult."
          },
          {
            "p": "Trasează distribuția fiecărei coloane numerice cu o histogramă. Vezi imediat dacă e simetrică, dacă are o coadă lungă, dacă are valori imposibile (o vârstă de 200, un preț negativ). Astea sunt semne de erori în date pe care le prinzi din ochi."
          },
          {
            "code": "df[\"varsta\"].hist(bins=30)\ndf[\"tinta\"].value_counts()     # câte exemple din fiecare clasă"
          }
        ]
      },
      {
        "heading": "Clase dezechilibrate: de ce contează devreme",
        "blocks": [
          {
            "p": "Dacă prezici o clasă care apare în 2% din cazuri (fraudă, o boală rară), un model care spune mereu nu are 98% acuratețe și e complet inutil. De asta te uiți la echilibrul claselor de la început: schimbă ce metrică folosești și cum îți împarți datele."
          },
          {
            "note": "Când o clasă e rară, acuratețea minte. Reține pentru modulul de evaluare: vei avea nevoie de precizie, recall și F1, nu de acuratețe simplă."
          }
        ]
      },
      {
        "heading": "Corelații: ce coloane spun același lucru",
        "blocks": [
          {
            "p": "Corelația măsoară cât de mult merg două coloane împreună, de la -1 (invers) prin 0 (deloc) până la 1 (identic ca tendință). Două coloane aproape identice îți spun ceva: poate una e derivată din alta, poate poți arunca una fără să pierzi informație."
          },
          {
            "code": "df.corr(numeric_only=True)     # matricea de corelații între coloane"
          },
          {
            "p": "Corelația nu înseamnă cauzalitate. Două lucruri pot crește împreună fără ca unul să-l provoace pe celălalt. E doar un indiciu unde să te uiți, nu o concluzie."
          }
        ]
      },
      {
        "heading": "Valori lipsă: întâi de ce, apoi cum",
        "blocks": [
          {
            "p": "Înainte să umpli o valoare lipsă, întreabă-te de ce lipsește. Uneori lipsa e o eroare de colectare. Alteori lipsa e chiar informație: un câmp gol la venit poate însemna că persoana a refuzat să răspundă, ceea ce e semnificativ. În cazul ăsta, adaugă o coloană separată care marchează lipsa."
          },
          {
            "p": "Umplerea (imputarea) se face cu media, mediana sau valoarea cea mai frecventă, ori cu un model. Mediana e mai sigură ca media când sunt outlieri, pentru că nu e trasă de valorile extreme."
          },
          {
            "code": "from sklearn.impute import SimpleImputer\nimp = SimpleImputer(strategy=\"median\").fit(X_train)\nX_train = imp.transform(X_train)\nX_val = imp.transform(X_val)    # aceiași parametri, învățați pe train"
          }
        ]
      },
      {
        "heading": "Scalarea: ce metodă și când",
        "blocks": [
          {
            "p": "Multe modele măsoară distanțe (kNN, K-Means) sau folosesc gradient (regresie, rețele). Pentru ele, o coloană cu valori mari (venitul, în mii) domină una cu valori mici (vârsta, zeci) doar prin scală, nu prin importanță. Scalarea le aduce la aceeași măsură. Sunt două metode uzuale, și alegerea depinde de formă datelor."
          },
          {
            "formula": "z = (x - μ) / σ",
            "explain": "Standardizarea: scazi media μ și împarți la deviația standard σ. Rezultatul are media 0 și deviația 1. O folosești ca variantă implicită, la regresie, SVM și rețele neuronale, când datele n-au outlieri extremi."
          },
          {
            "code": "from sklearn.preprocessing import StandardScaler\nsc = StandardScaler().fit(X_train)   # învață μ și σ pe TRAIN\nX_train = sc.transform(X_train)\nX_val = sc.transform(X_val)          # aplică aceiași μ și σ"
          },
          {
            "formula": "x' = (x - min) / (max - min)",
            "explain": "Normalizarea min-max: aduce valorile în intervalul 0 până la 1. O folosești când ai nevoie de un interval fix, de exemplu la o rețea care așteaptă input între 0 și 1, sau la imagini (pixelii, deja în 0-255). Sensibilă la outlieri: un singur punct extrem strică minimul sau maximul pentru tot restul coloanei."
          },
          {
            "code": "from sklearn.preprocessing import MinMaxScaler\nsc = MinMaxScaler().fit(X_train)   # învață min și max pe TRAIN\nX_train = sc.transform(X_train)\nX_val = sc.transform(X_val)"
          },
          {
            "note": "Regula de bază a preprocesării: învață parametrii (medie, deviație, mediană, min, max) doar pe setul de antrenare, apoi aplică-i pe validare și test. Niciodată invers. Altfel test-ul se scurge în antrenare și scorul tău e o minciună."
          }
        ]
      },
      {
        "heading": "Variabile categorice",
        "blocks": [
          {
            "p": "Un model vrea numere, dar multe coloane sunt categorii: oraș, culoare, tip. Alegerea encoding-ului depinde de câte categorii sunt și dacă au o ordine naturală."
          },
          {
            "p": "Fără ordine și cu puține categorii, one-hot encoding e alegerea: face din fiecare categorie o coloană separată de 0 și 1. Roșu devine [1,0,0], verde [0,1,0]. Nicio categorie nu e mai mare ca alta."
          },
          {
            "code": "pd.get_dummies(df, columns=[\"oras\", \"culoare\"])"
          },
          {
            "p": "Cu ordine naturală (mic, mediu, mare), ordinal encoding le mapează la numere care păstrează ordinea, 0, 1, 2. Merge bine mai ales cu modele bazate pe arbori, care oricum despart datele pe praguri."
          },
          {
            "code": "from sklearn.preprocessing import OrdinalEncoder\nenc = OrdinalEncoder(categories=[[\"mic\", \"mediu\", \"mare\"]])\ndf[\"marime_cod\"] = enc.fit_transform(df[[\"marime\"]])"
          },
          {
            "p": "Label encoding face același lucru, un număr întreg pe categorie, dar fără să ceri tu ordinea, ea vine din ordine alfabetică sau din ordinea de apariție. E gândit pentru ținta y, nu pentru coloanele de intrare: pe o coloană de intrare fără ordine reală, numerele inventează o ordine falsă pe care un model liniar o ia de bună."
          },
          {
            "code": "from sklearn.preprocessing import LabelEncoder\nle = LabelEncoder()\ny_encoded = le.fit_transform(y_train)   # ex: \"spam\"/\"nu\" -> 1/0"
          },
          {
            "p": "Cu sute de categorii (cod poștal, ID de produs), one-hot ar produce sute de coloane goale. Binary encoding e un compromis: transformă fiecare categorie într-un număr, apoi în cifre binare, și fiecare cifră devine o coloană. Pentru 100 de categorii ai nevoie de doar 7 coloane (2^7 = 128), nu 100, și nu inventează nicio ordine."
          },
          {
            "code": "from category_encoders import BinaryEncoder\nenc = BinaryEncoder(cols=[\"cod_postal\"])\ndf_encoded = enc.fit_transform(df[\"cod_postal\"])"
          },
          {
            "p": "Target encoding merge și mai departe: înlocuiește fiecare categorie cu media țintei pentru acea categorie, o singură coloană indiferent de câte categorii sunt. Cel mai puternic la cardinalitate foarte mare, dar și cel mai expus la scurgere de date."
          },
          {
            "code": "from sklearn.preprocessing import TargetEncoder\nenc = TargetEncoder()\nX_train_enc = enc.fit_transform(X_train[[\"cod_postal\"]], y_train)\nX_val_enc = enc.transform(X_val[[\"cod_postal\"]])"
          },
          {
            "note": "Ordinal, binary și target encoding se învață tot doar pe train, la fel ca imputarea și scalarea. Altfel informație din validare/test se scurge în encoding și scorul tău minte."
          }
        ]
      }
    ],
    "pitfalls": [],
    "practice": []
  },
  {
    "moduleCode": "S5",
    "duration": "~1 săptămână",
    "intro": "Până acum ai învățat bucăți: Python, NumPy, Pandas. Modulul ăsta le leagă. Nu aduce teorie nouă, ci ordinea în care se fac lucrurile. Contează, pentru că majoritatea greșelilor de la olimpiadă nu vin din model, ci din pași făcuți în ordine greșită. Un pipeline pe care îl poți rula cap-coadă în douăzeci de minute e cea mai valoroasă unealtă pe care o duci în concurs.",
    "sections": [
      {
        "heading": "Cei șase pași, în ordine",
        "blocks": [
          {
            "p": "Orice problemă tabelară de concurs arată la fel dacă o privești de sus. Citești datele. Le împarți. Faci un baseline. Preprocesezi. Antrenezi și validezi. Scrii submisia."
          },
          {
            "p": "Ordinea nu e o sugestie. Fiecare pas presupune că cel dinainte s-a făcut corect, iar doi dintre ei sunt ușor de inversat din grabă: împărțirea datelor și preprocesarea. Dacă le inversezi, scorul tău local devine o minciună și afli abia pe clasamentul privat."
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
            "p": "Primul lucru după citire e să verifici că datele arată cum crezi. Câte rânduri, ce coloane, ce tip are fiecare, cum arată ținta. Nu e analiză completă, aia vine în modulul următor. E doar verificarea că n-ai citit greșit fișierul."
          },
          {
            "code": "import pandas as pd\n\ntrain = pd.read_csv(\"train.csv\")\ntest = pd.read_csv(\"test.csv\")\n\nprint(train.shape, test.shape)\nprint(train.dtypes)\nprint(train[\"target\"].value_counts())"
          },
          {
            "p": "Compară coloanele din train cu cele din test. Diferența dintre ele e, aproape întotdeauna, chiar coloana țintă. Dacă mai lipsește ceva, ai o problemă de înțeles înainte să mergi mai departe."
          }
        ]
      },
      {
        "heading": "Pasul 2: împarți datele înainte să le atingi",
        "blocks": [
          {
            "p": "Aici se pierd cele mai multe puncte. Ai nevoie de o parte din date pe care modelul să n-o fi văzut niciodată, ca să estimezi cinstit cât de bun e. Împărțirea se face înainte de orice transformare."
          },
          {
            "code": "from sklearn.model_selection import train_test_split\n\nX = train.drop(columns=[\"target\"])\ny = train[\"target\"]\n\nX_tr, X_val, y_tr, y_val = train_test_split(\n    X, y, test_size=0.2, random_state=42, stratify=y\n)"
          },
          {
            "p": "Parametrul stratify păstrează aceeași proporție de clase în ambele bucăți. Fără el, pe o problemă dezechilibrată poți nimeri o validare care nu conține deloc clasa rară, iar scorul devine fără sens."
          },
          {
            "note": "random_state fixat înseamnă că aceeași împărțire se repetă la fiecare rulare. Fără el, scorul se schimbă între rulări și nu mai știi dacă o modificare a ajutat sau ai avut noroc."
          }
        ]
      },
      {
        "heading": "Pasul 3: baseline-ul prost dar onest",
        "blocks": [
          {
            "p": "Înainte de orice model serios, fă unul stupid. Prezice mereu clasa majoritară, sau media, și măsoară. Numărul ăla e podeaua ta: orice model care nu-l bate e mai rău decât nimic."
          },
          {
            "code": "from sklearn.dummy import DummyClassifier\nfrom sklearn.metrics import f1_score\n\ndummy = DummyClassifier(strategy=\"most_frequent\").fit(X_tr, y_tr)\nprint(f1_score(y_val, dummy.predict(X_val), average=\"macro\"))"
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
            "p": "Regula de la preprocesare: parametrii (medie, deviație, categorii) se învață doar pe antrenare. Problema e că, făcută manual, regula asta se încalcă ușor."
          },
          {
            "p": "Soluția e Pipeline. Legi preprocesarea de model într-un singur obiect, iar când chemi fit pe el, scikit-learn are grijă singur ca transformările să învețe doar pe ce-i dai la antrenare."
          },
          {
            "code": "from sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.ensemble import RandomForestClassifier\n\nnumerice = X_tr.select_dtypes(include=\"number\").columns\ncategorice = X_tr.select_dtypes(exclude=\"number\").columns\n\npre = ColumnTransformer([\n    (\"num\", Pipeline([\n        (\"imp\", SimpleImputer(strategy=\"median\")),\n        (\"sc\", StandardScaler()),\n    ]), numerice),\n    (\"cat\", Pipeline([\n        (\"imp\", SimpleImputer(strategy=\"most_frequent\")),\n        (\"oh\", OneHotEncoder(handle_unknown=\"ignore\")),\n    ]), categorice),\n])\n\nmodel = Pipeline([(\"pre\", pre), (\"clf\", RandomForestClassifier(random_state=42))])"
          },
          {
            "p": "Argumentul handle_unknown contează în concurs: dacă în test apare o categorie care nu era în antrenare, fără el codul crapă la predicție, exact când n-ai timp să depanezi."
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
            "p": "La final reantrenezi pe toate datele de antrenare, nu doar pe bucata de optzeci la sută. Ai folosit validarea ca să alegi, acum nu mai ai motiv să arunci acele exemple."
          },
          {
            "code": "model.fit(X, y)\npred = model.predict(test)\n\nsub = pd.DataFrame({\"id\": test[\"id\"], \"target\": pred})\nsub.to_csv(\"submission.csv\", index=False)"
          },
          {
            "p": "Înainte de upload, trei verificări care au salvat multe concursuri: numărul de rânduri e egal cu al fișierului de test, numele coloanelor sunt exact cele cerute în enunț, și nu ai valori lipsă în predicții."
          },
          {
            "code": "assert len(sub) == len(test)\nassert list(sub.columns) == [\"id\", \"target\"]\nassert sub[\"target\"].isna().sum() == 0"
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
          }
        ]
      }
    ],
    "pitfalls": [
      "Împarte datele înainte să scalezi sau să imputezi, altfel validarea iese fals optimistă.",
      "Optimizează exact metrica din enunț.",
      "Pune `handle_unknown=\"ignore\"`, ca o categorie nouă din test să nu crape predicția.",
      "Verifică numărul de rânduri și numele coloanelor înainte de upload.",
      "Reantrenează pe toate datele de antrenare pentru submisia finală."
    ],
    "practice": [
      "Ia o problemă de arhivă de pe MLCompete și scrie pipeline-ul cap-coadă într-o oră, cu model simplu.",
      "Rulează același pipeline o dată cu scalare înainte de split și o dată după, și compară scorurile de validare.",
      "Scrie-ți un notebook șablon cu cei șase pași, pe care să-l copiezi la începutul oricărei probleme."
    ],
    "keyTakeaways": [
      "Ordinea pașilor contează mai mult decât alegerea modelului.",
      "Împarți datele înainte de orice transformare, altfel scorul local minte.",
      "Baseline-ul prost e reperul fără de care nu știi dacă modelul tău e bun.",
      "Pipeline face scurgerea de informație greu de comis din greșeală.",
      "Prima submisie validă se face în prima oră, nu la final."
    ]
  },
  {
    "moduleCode": "S8",
    "duration": "~3 săptămâni",
    "intro": "Aici înveți uneltele de bază ale învățării supervizate: regresie liniară și logistică, Naïve Bayes, arbori de decizie, SVM. Supervizat înseamnă că ai exemple cu răspunsul corect (etichete) și modelul învață din ele. Nu te opri la cum le chemi din scikit-learn. Înțelege ce optimizează fiecare și când se potrivește, pentru că asta te face să alegi bine la concurs.",
    "sections": [
      {
        "heading": "Ce înseamnă a antrena un model",
        "blocks": [
          {
            "p": "Un model are niște parametri (numere interne) pe care îi ajustează ca să greșească cât mai puțin pe exemplele de antrenare. Măsura greșelii se numește funcție de cost sau loss. A antrena înseamnă a găsi parametrii care minimizează loss-ul."
          },
          {
            "p": "În scikit-learn tiparul e mereu același: creezi modelul, îl antrenezi cu fit pe datele de antrenare, apoi prezici cu predict pe date noi. Simplu la suprafață, dar sub capotă fiecare model face ceva diferit."
          },
          {
            "code": "model = LogisticRegression()\nmodel.fit(X_train, y_train)     # învață parametrii\ny_pred = model.predict(X_val)   # prezice pe date noi"
          }
        ]
      },
      {
        "heading": "Regresie liniară: prezici un număr",
        "blocks": [
          {
            "p": "Regresia liniară prezice o valoare continuă (un preț, o temperatură) ca o combinație liniară a trăsăturilor. Caută linia (sau planul, în mai multe dimensiuni) care trece cel mai bine prin date."
          },
          {
            "formula": "ŷ = w₁x₁ + w₂x₂ + ... + b",
            "explain": "Fiecare trăsătură x are o greutate w care spune cât contează. b e termenul liber. Modelul învață w-urile și b."
          },
          {
            "p": "Minimizează eroarea pătratică: suma pătratelor diferențelor dintre predicție și adevăr. Pătratul pedepsește greșelile mari mai tare. Un avantaj mare al regresiei liniare: coeficienții se pot citi. Un w pozitiv mare înseamnă că trăsătura aia împinge predicția în sus."
          }
        ]
      },
      {
        "heading": "Regresie logistică: prezici o clasă",
        "blocks": [
          {
            "p": "În ciuda numelui, regresia logistică e pentru clasificare, nu regresie. Ia aceeași combinație liniară și o trece printr-o funcție sigmoidă, care strânge orice număr în intervalul 0 până la 1. Rezultatul e o probabilitate: cât de sigur e modelul că exemplul e din clasa pozitivă."
          },
          {
            "formula": "σ(z) = 1 / (1 + e^(-z))",
            "explain": "Sigmoida: transformă scorul liniar z într-o probabilitate între 0 și 1."
          },
          {
            "p": "Din probabilitate iei decizia cu un prag. Pragul nu e obligatoriu 0.5. Dacă îți pasă mai mult să prinzi toate cazurile pozitive (recall mare), cobori pragul. Dacă vrei să fii sigur când spui pozitiv (precizie mare), îl urci. Pragul e un buton pe care îl reglezi după metrica problemei."
          },
          {
            "code": "m = LogisticRegression(max_iter=1000).fit(X_train, y_train)\nproba = m.predict_proba(X_val)[:, 1]   # probabilitatea clasei pozitive\npred = (proba > 0.3).astype(int)       # prag mutat la 0.3 pentru recall mai mare"
          }
        ]
      },
      {
        "heading": "Naïve Bayes: rapid și surprinzător de bun",
        "blocks": [
          {
            "p": "Naïve Bayes aplică teorema lui Bayes presupunând, naiv, că trăsăturile sunt independente între ele. Presupunerea e aproape mereu falsă, dar modelul merge des foarte bine, mai ales pe text. E rapid, are nevoie de puține date, și e un baseline greu de bătut la clasificarea de documente."
          }
        ]
      },
      {
        "heading": "Arbori de decizie",
        "blocks": [
          {
            "p": "Un arbore de decizie pune întrebări simple, una după alta, ca un joc de 20 de întrebări: e vârsta peste 30? e venitul sub o valoare? La fiecare pas împarte datele ca să separe cât mai bine clasele. Măsura separării e impuritatea Gini sau entropia: cât de amestecate sunt clasele într-un nod."
          },
          {
            "p": "Arborii sunt ușor de citit și nu au nevoie de scalare. Problema lor: lăsați să crească nelimitat, memorează antrenarea până la ultimul exemplu și generalizează prost pe date noi. Asta se numește overfitting. Îl limitezi punând o adâncime maximă sau un minim de exemple pe frunză."
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
            "p": "SVM (mașină cu vectori suport) caută granița dintre clase care lasă marginea cea mai mare de o parte și de alta, adică e cât mai departe de cele mai apropiate exemple din fiecare clasă. Ideea e că o graniță cu margine mare generalizează mai bine."
          },
          {
            "p": "Când datele nu se pot separa cu o linie dreaptă, intervine trucul kernel: proiectează datele într-un spațiu cu mai multe dimensiuni, unde devin separabile, fără să calculeze explicit acel spațiu. Kernelul RBF e cel mai folosit. SVM cere date scalate ca să funcționeze bine."
          }
        ]
      }
    ],
    "pitfalls": [
      "Scalează trăsăturile înainte să interpretezi coeficienții unei regresii.",
      "Limitează adâncimea arborelui, altfel merge perfect pe antrenare și slab pe validare.",
      "Scalează datele înainte de SVM; fără asta merge inexplicabil de prost."
    ],
    "practice": [
      "Compară regresie logistică, arbore și SVM pe aceeași problemă tabelară, cu aceeași metrică.",
      "Mișcă pragul regresiei logistice de la 0.5 în jos și urmărește cum cresc recall-ul și scad precizia.",
      "Limitează adâncimea unui arbore și vezi cum se apropie scorul de antrenare de cel de validare."
    ],
    "keyTakeaways": [
      "A antrena = a găsi parametrii care minimizează funcția de cost.",
      "Regresie liniară prezice numere și dă coeficienți citibili; logistică prezice probabilități de clasă.",
      "Pragul regresiei logistice se reglează după metrică, nu e fix 0.5.",
      "Arborii sunt citibili dar fac overfitting fără limitare de adâncime.",
      "SVM maximizează marginea; kernelul îl lasă să separe date neliniare."
    ]
  },
  {
    "moduleCode": "S11",
    "duration": "~2 săptămâni",
    "intro": "Aici se câștigă sau se pierde concursul. Un model care pare bun pe clasamentul public poate fi slab pe cel ascuns, care contează la final. Modulul ăsta e despre cum să ai încredere justificată în scorul tău. E cea mai puțin spectaculoasă parte și cea care face diferența dintre un top 10 și un mijloc de clasament.",
    "sections": [
      {
        "heading": "De ce acuratețea te minte",
        "blocks": [
          {
            "p": "Acuratețea e procentul de predicții corecte. Sună rezonabil, dar pe clase dezechilibrate e înșelătoare. Dacă 98% din exemple sunt clasa nu, un model care spune mereu nu are 98% acuratețe și zero valoare. De asta ai nevoie de metrici care se uită la fiecare clasă separat."
          }
        ]
      },
      {
        "heading": "Matricea de confuzie: temelia",
        "blocks": [
          {
            "p": "Matricea de confuzie numără cele patru feluri de rezultat pentru o clasificare binară. E baza din care se calculează toate celelalte metrici, deci merită înțeleasă bine."
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
            "p": "Ce te doare mai tare depinde de problemă. La un test de boală, un fals negativ (bolnav trimis acasă) e mai grav decât un fals pozitiv. La un filtru de spam, invers. Metrica bună reflectă ce cost real are fiecare tip de greșeală."
          }
        ]
      },
      {
        "heading": "Precizie, recall, F1",
        "blocks": [
          {
            "formula": "precizie = TP / (TP + FP)",
            "explain": "Din câte ai zis că sunt pozitive, câte chiar erau. Precizie mare = puține alarme false."
          },
          {
            "formula": "recall = TP / (TP + FN)",
            "explain": "Din câte erau de fapt pozitive, câte ai prins. Recall mare = ratezi puține."
          },
          {
            "p": "Precizia și recall-ul trag în direcții opuse. Dacă spui pozitiv doar când ești foarte sigur, precizia crește dar recall-ul scade. Dacă spui pozitiv des, invers. F1 le împacă într-un singur număr, media lor armonică, care e mică dacă oricare din ele e mică."
          },
          {
            "formula": "F1 = 2 · (precizie · recall) / (precizie + recall)",
            "explain": "Media armonică. Pedepsește dezechilibrul: nu poți avea F1 mare cu recall minuscul."
          },
          {
            "note": "Când ai multe clase, F1 se agregă. Macro-F1 face media pe clase tratându-le egal (bun când îți pasă de clasele rare). Weighted-F1 ține cont de mărimea fiecărei clase. Citește în regulament care se punctează și optimizează exact pe aia."
          }
        ]
      },
      {
        "heading": "Validare fără scurgeri",
        "blocks": [
          {
            "p": "O scurgere de informație (data leakage) e când, fără să vrei, informație din test ajunge în antrenare. Rezultatul: scor local grozav care se prăbușește pe clasamentul real. E cel mai perfid mod de a pierde puncte, pentru că totul pare în regulă."
          },
          {
            "p": "Aperi-te împărțind datele corect. Ține un set de validare pe care modelul nu-l vede la antrenare și pe care îl folosești ca să estimezi scorul real. Mai bine, folosește k-fold: împarți datele în k părți, antrenezi pe k-1 și testezi pe una, rotind, apoi mediezi. Așa folosești toate datele și ai o estimare mai stabilă."
          },
          {
            "p": "Când clasele sunt dezechilibrate, folosește k-fold stratificat, care păstrează proporția claselor în fiecare fold. Altfel un fold poate să nu conțină deloc clasa rară. Când datele au timp sau grupuri (același pacient în mai multe rânduri), split-ul trebuie să le respecte, altfel modelul trage cu ochiul."
          },
          {
            "code": "from sklearn.model_selection import StratifiedKFold, cross_val_score\ncv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)\nscoruri = cross_val_score(model, X, y, cv=cv, scoring=\"f1_macro\")\nprint(scoruri.mean(), scoruri.std())"
          }
        ]
      },
      {
        "heading": "Bias, varianță și curba de învățare",
        "blocks": [
          {
            "p": "Două boli opuse. Bias mare (underfitting): modelul e prea simplu, merge slab și pe antrenare, și pe validare. Varianță mare (overfitting): modelul e prea complex, merge grozav pe antrenare dar slab pe validare, pentru că a memorat."
          },
          {
            "p": "Curba de învățare le diagnostichează: desenezi scorul de antrenare și cel de validare pe măsură ce crești datele. Dacă amândouă sunt joase și apropiate, ai bias, îți trebuie model mai puternic. Dacă e o prăpastie mare între ele, ai varianță, îți trebuie mai multe date sau regularizare."
          }
        ]
      },
      {
        "heading": "Cele două submisii finale",
        "blocks": [
          {
            "note": "Regula de aur: la final alege conștient cele două submisii. Una pe scorul tău local (validarea) cel mai bun, una pe clasamentul public cel mai bun. Dacă local și public sunt de acord, ai încredere. Dacă diferă mult, ai o scurgere sau un split prost. Nu lăsa submisiile finale pe ultimele trimise din reflex."
          }
        ]
      }
    ],
    "pitfalls": [
      "Ai încredere în validarea ta locală, nu în clasamentul public.",
      "Folosește k-fold stratificat, ca fiecare fold să conțină și clasele rare.",
      "Pe date dezechilibrate raportează precizie, recall și F1, nu acuratețe."
    ],
    "practice": [
      "Desenează o curbă de învățare și decide dacă modelul suferă de bias sau de varianță.",
      "Găsește o scurgere de informație într-un pipeline dat și repar-o.",
      "Calculează manual precizie, recall și F1 dintr-o matrice de confuzie dată."
    ],
    "keyTakeaways": [
      "Acuratețea minte pe clase dezechilibrate; folosește precizie, recall, F1.",
      "Matricea de confuzie (TP, TN, FP, FN) e baza tuturor metricilor.",
      "Precizia și recall-ul se bat cap în cap; F1 le împacă.",
      "K-fold stratificat estimează scorul stabil, fără scurgeri.",
      "Curba de învățare distinge bias (underfitting) de varianță (overfitting).",
      "Alege cele două submisii finale: una pe local, una pe public."
    ]
  },
  {
    "moduleCode": "S13",
    "duration": "~1 săptămână",
    "intro": "De multe ori câștigătorul la o problemă tabelară e un ensemble, nu un singur model. Ideea e simplă și puternică: mai multe modele împreună greșesc mai puțin decât unul singur, cu condiția să greșească în locuri diferite. Modulul ăsta îți dă cele două rețete mari, bagging și boosting, și disciplina de a regla parametrii fără să te pierzi.",
    "sections": [
      {
        "heading": "De ce funcționează combinarea",
        "blocks": [
          {
            "p": "Dacă ai trei modele care greșesc fiecare în alte locuri, votul majorității e mai bun decât oricare singur: acolo unde unul se înșeală, celelalte două îl corectează. Cheia e diversitatea. Trei modele care fac exact aceleași greșeli nu ajută cu nimic combinate."
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
            "p": "Bagging înseamnă că antrenezi fiecare model pe un eșantion aleator (cu repetiție) din date, apoi mediezi predicțiile. Un singur arbore adânc are varianță mare (overfit). Mediind mulți arbori antrenați pe date diferite, varianța scade fără să crească biasul."
          },
          {
            "p": "Random Forest e bagging pe arbori, cu un truc în plus: la fiecare împărțire, arborele alege dintr-un subset aleator de trăsături. Asta îi face pe arbori și mai diferiți între ei. E robust, greu de stricat, și un prim model excelent pe date tabelare."
          },
          {
            "code": "from sklearn.ensemble import RandomForestClassifier\nrf = RandomForestClassifier(n_estimators=400, max_depth=None, n_jobs=-1)\nrf.fit(X_train, y_train)"
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
            "p": "Boosting construiește arbori pe rând. Primul face o predicție aproximativă, al doilea învață să corecteze greșelile primului, al treilea greșelile rămase, și tot așa. Fiecare arbore e mic, dar împreună formează un model puternic. E des câștigătorul la probleme tabelare."
          },
          {
            "p": "XGBoost și LightGBM sunt implementările rapide și de referință. Sunt mai puternice decât Random Forest, dar și mai ușor de dus în overfitting, deci cer reglare atentă. Verifică întâi regulamentul concursului: nu la orice etapă sunt permise bibliotecile externe."
          }
        ]
      },
      {
        "heading": "Reglarea hiperparametrilor, în ordine",
        "blocks": [
          {
            "p": "Hiperparametrii sunt setările pe care le alegi tu înainte de antrenare (câți arbori, cât de adânci), spre deosebire de parametrii pe care modelul îi învață singur. Greșeala clasică e să reglezi zeci deodată și să nu mai știi ce a ajutat. Mergi în ordine, un lucru pe rând."
          },
          {
            "steps": [
              "Pornește cu un learning rate mic-moderat și un număr rezonabil de arbori.",
              "Reglează întâi adâncimea arborilor (complexitatea fiecăruia).",
              "Apoi numărul de arbori (n_estimators), cu early stopping pe validare.",
              "La final, coboară learning rate-ul și crește numărul de arbori proporțional, pentru un plus de scor."
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
            "p": "Stacking merge mai departe: antrenează un model final care învață cum să combine predicțiile celorlalte. E mai puternic, dar și mai ușor de dus în scurgeri dacă nu ai grijă să folosești predicții out-of-fold. Începe cu voting simplu, treci la stacking doar dacă ai timp."
          }
        ]
      }
    ],
    "pitfalls": [
      "Reglează un hiperparametru pe rând și notează scorul de fiecare dată.",
      "Ia feature importance ca indiciu unde să te uiți, nu ca adevăr final.",
      "Verifică regulamentul etapei înainte să folosești biblioteci externe de boosting."
    ],
    "practice": [
      "Antrenează un Random Forest și un gradient boosting pe aceeași problemă și compară scorurile.",
      "Fă un voting între trei modele diferite și vezi dacă bate cel mai bun singur model.",
      "Reglează learning rate-ul cu early stopping și observă compromisul timp contra scor."
    ],
    "keyTakeaways": [
      "Ensemble-urile funcționează dacă modelele greșesc diferit; diversitatea e cheia.",
      "Bagging (Random Forest) reduce varianța mediind arbori antrenați pe date diferite.",
      "Boosting (XGBoost, LightGBM) construiește arbori care corectează pe rând greșelile.",
      "Reglează hiperparametrii pe rând: adâncime, apoi număr de arbori, apoi learning rate.",
      "Voting-ul între modele diferite bate des cel mai bun model singur."
    ]
  },
  {
    "moduleCode": "S14",
    "duration": "~1 săptămână",
    "intro": "Nu toate problemele au etichete. Uneori vrei doar să vezi structura din date: grupuri naturale, outlieri, o proiecție în două dimensiuni pe care s-o poți desena. Asta e învățarea nesupervizată: modelul găsește tipare fără să i se spună răspunsul corect. E utilă și de sine stătător, și ca pas de pregătire înainte de un model supervizat.",
    "sections": [
      {
        "heading": "Supervizat vs nesupervizat",
        "blocks": [
          {
            "p": "La supervizat aveai perechi (exemplu, etichetă) și învățai să prezici eticheta. La nesupervizat ai doar exemplele, fără răspuns. Modelul caută singur structură: care puncte seamănă între ele, pe ce direcții variază datele cel mai mult. Nu poți măsura corectitudinea la fel de simplu, pentru că nu ai cu ce compara."
          }
        ]
      },
      {
        "heading": "K-Means: grupare pe centre",
        "blocks": [
          {
            "p": "K-Means împarte datele în k grupuri, fiecare cu un centru. Fiecare punct e atribuit celui mai apropiat centru, apoi centrele se mută în media punctelor lor, și se repetă până se stabilizează. Simplu, rapid, dar trebuie să alegi tu k și e sensibil la scală."
          },
          {
            "p": "Cum alegi k? Metoda cotului: rulezi pentru mai multe valori de k și desenezi cât de strânse sunt grupurile. Unde curba se îndoaie ca un cot, ai un k rezonabil. Scorul siluetă e o alternativă numerică, măsoară cât de bine se separă grupurile."
          },
          {
            "note": "K-Means măsoară distanțe, deci scalarea e obligatorie. Fără ea, coloana cu numerele cele mai mari domină gruparea și restul nu contează."
          },
          {
            "code": "from sklearn.cluster import KMeans\nkm = KMeans(n_clusters=4, n_init=10, random_state=0)\nlabels = km.fit_predict(X_scalat)"
          }
        ]
      },
      {
        "heading": "DBSCAN și clustering ierarhic",
        "blocks": [
          {
            "p": "DBSCAN grupează după densitate: unde punctele sunt înghesuite formează un grup, iar punctele izolate le marchează ca zgomot. Avantaje: nu trebuie să spui numărul de grupuri și găsește singur outlierii. Depinde de doi parametri, raza de vecinătate și câți vecini minim, pe care trebuie să-i reglezi."
          },
          {
            "p": "Clustering-ul ierarhic construiește un arbore de grupuri, de la fiecare punct separat până la un singur grup mare. Îl desenezi ca dendrogramă și îl tai la nivelul care îți dă numărul de grupuri pe care îl vrei. Util când vrei să vezi structura la mai multe niveluri."
          }
        ]
      },
      {
        "heading": "PCA: reducerea dimensionalității",
        "blocks": [
          {
            "p": "Când ai zeci sau sute de coloane, e greu de vizualizat și modelele suferă (blestemul dimensionalității). PCA (analiza componentelor principale) găsește direcțiile pe care datele variază cel mai mult și le proiectează pe ele, păstrând cât mai multă informație în mai puține dimensiuni."
          },
          {
            "p": "PCA îți spune cât din varianță păstrezi cu fiecare componentă. Poți reduce de la 100 de coloane la 10 care păstrează, să zicem, 95% din informație. E util și ca preprocesare înainte de un model, nu doar ca desen. Cere date scalate."
          },
          {
            "code": "from sklearn.decomposition import PCA\np = PCA(n_components=0.95).fit(X_scalat)   # păstrează 95% din varianță\nX_redus = p.transform(X_scalat)\nprint(X_redus.shape[1], \"componente\")"
          }
        ]
      },
      {
        "heading": "t-SNE și UMAP: doar pentru vizualizare",
        "blocks": [
          {
            "p": "t-SNE și UMAP fac proiecții în 2D care arată frumos și scot în evidență grupuri. Sunt excelente ca să te uiți la structura datelor. Dar au o capcană importantă: distanțele și mărimile grupurilor din desen nu sunt de încredere. Două grupuri apropiate în desen nu sunt neapărat apropiate în realitate."
          },
          {
            "note": "Folosește t-SNE și UMAP ca să te uiți, nu ca să tragi concluzii dure. Pentru preprocesare de încredere, PCA e alegerea sigură."
          }
        ]
      }
    ],
    "pitfalls": [
      "Scalează datele înainte de K-Means, altfel coloana cu numere mari domină totul.",
      "Citește t-SNE ca pe o hartă de vecinătăți, nu ca pe distanțe reale.",
      "Alege k cu metoda cotului sau cu scorul siluetă."
    ],
    "practice": [
      "Aplică K-Means și DBSCAN pe același set și compară grupurile găsite.",
      "Redu la 2D cu PCA și cu UMAP și vezi ce diferă între ele.",
      "Folosește metoda cotului ca să alegi k pe un set și justifică alegerea."
    ],
    "keyTakeaways": [
      "Nesupervizat = găsești structură fără etichete (grupuri, direcții de variație).",
      "K-Means cere să alegi k și date scalate; alegi k cu cotul sau silueta.",
      "DBSCAN găsește singur numărul de grupuri și outlierii, după densitate.",
      "PCA reduce dimensiunile păstrând varianța; bun și ca preprocesare.",
      "t-SNE și UMAP sunt doar pentru privit, distanțele din ele nu sunt de încredere."
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
            "p": "Orice problemă de căutare se descrie la fel: o stare de start, un set de acțiuni care duc dintr-o stare în alta, un test de scop care spune dacă ai ajuns, și opțional un cost pe fiecare mutare. Un labirint: starea e poziția, acțiunile sunt pașii în cele patru direcții, scopul e ieșirea."
          },
          {
            "p": "Toate stările la care poți ajunge formează un graf, unde nodurile sunt stări și muchiile sunt mutări. Căutarea înseamnă să explorezi graful ăsta inteligent, fără să-l construiești tot, pentru că de obicei e uriaș."
          },
          {
            "note": "Marchează mereu stările vizitate. Fără asta te învârți în cerc la infinit, revizitând aceleași stări. E cea mai frecventă cauză a unei căutări care nu se termină."
          }
        ]
      },
      {
        "heading": "Căutare neinformată: BFS, DFS, cost uniform",
        "blocks": [
          {
            "p": "Căutarea neinformată explorează orbește, fără să știe încotro e scopul. BFS (căutare în lățime) explorează nivel cu nivel, folosind o coadă. Găsește mereu drumul cu cele mai puține mutări, dar consumă multă memorie. DFS (căutare în adâncime) merge cât poate pe un drum, cu o stivă. Consumă puțină memorie, dar poate să nu găsească cel mai scurt drum și se poate pierde adânc."
          },
          {
            "p": "Cost uniform (Dijkstra) e ca BFS, dar ține cont de costul mutărilor: extinde mereu starea cu costul total cel mai mic până la ea. Când mutările au costuri diferite, el găsește drumul cel mai ieftin, nu cel mai scurt ca număr de pași."
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
            "p": "A* e vedeta modulului. Adaugă o euristică, adică o estimare a distanței rămase până la scop, ca să meargă direct spre țintă în loc să exploreze orbește. Combină costul deja plătit cu estimarea a ce mai are de plătit."
          },
          {
            "formula": "f(n) = g(n) + h(n)",
            "explain": "g(n) = costul real de la start până la starea n. h(n) = estimarea (euristica) de la n până la scop. A* extinde mereu starea cu f cel mai mic."
          },
          {
            "p": "Ca A* să garanteze drumul optim, euristica trebuie să fie admisibilă: să nu supraestimeze niciodată distanța reală rămasă. Dacă h e admisibilă, A* nu poate rata soluția optimă. Dacă supraestimează, poate găsi un drum, dar nu neapărat cel mai scurt."
          },
          {
            "p": "Euristici clasice pentru puzzle-uri: distanța Manhattan (suma diferențelor pe orizontală și verticală) și numărul de piese greșit plasate. Amândouă nu supraestimează niciodată, deci sunt admisibile."
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
            "p": "Arborele crește exploziv: fiecare mutare deschide multe altele. Alpha-beta pruning taie ramurile care oricum nu pot schimba rezultatul, fără să piardă corectitudinea. Cu el ajungi mai adânc în același timp de calcul."
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
            "p": "Le rezolvi cu backtracking: atribui o valoare, mergi mai departe, iar dacă te blochezi te întorci și încerci altceva. Fără îmbunătățiri, e lent. Două tehnici îl accelerează mult:"
          },
          {
            "list": [
              "Forward checking: după fiecare atribuire, elimini din vecini valorile care acum nu mai sunt posibile. Prinzi înfundările devreme.",
              "MRV (minimum remaining values): alegi mereu variabila cu cele mai puține valori rămase. Ataci întâi partea cea mai constrânsă, unde e mai probabil să dai de contradicție."
            ]
          }
        ]
      }
    ],
    "pitfalls": [
      "Folosește o euristică admisibilă la A*, ca soluția găsită să fie și optimă.",
      "Marchează stările vizitate, ca să nu intri în bucle infinite.",
      "Pune limită de adâncime la minimax pe jocuri mari."
    ],
    "practice": [
      "Implementează A* pentru 8-puzzle cu două euristici (Manhattan și piese greșite) și compară numărul de stări extinse.",
      "Rezolvă o colorare de hartă ca CSP cu forward checking și MRV.",
      "Scrie minimax cu alpha-beta pentru X și 0 și verifică că nu pierde niciodată."
    ],
    "keyTakeaways": [
      "Orice căutare se descrie la fel: start, acțiuni, test de scop, cost.",
      "BFS dă drum minim în pași, DFS economisește memorie, cost uniform dă drum de cost minim.",
      "A* folosește f = g + h; cu euristică admisibilă, găsește soluția optimă.",
      "Minimax alege mutarea împotriva unui adversar optim; alpha-beta o face mai repede fără să schimbe rezultatul.",
      "CSP se rezolvă cu backtracking plus forward checking și MRV."
    ]
  },
  {
    "moduleCode": "S16",
    "duration": "~1 săptămână",
    "intro": "Se poate face NLP serios fără deep learning. TF-IDF plus un model liniar rezolvă multe probleme de clasificare de text, rapid, explicabil, și e un baseline greu de bătut. Înainte să scoți artileria grea, construiește ăsta. De multe ori e suficient, și mereu e reperul față de care judeci orice model mai complicat.",
    "sections": [
      {
        "heading": "Problema: modelele vor numere, tu ai text",
        "blocks": [
          {
            "p": "Un model matematic lucrează cu numere, dar textul e șir de caractere. Tot NLP-ul clasic e despre cum transformi text în vectori de numere care păstrează sensul, ca să poți pune un model obișnuit deasupra. Pașii sunt: cureți textul, îl tai în unități, îl transformi în numere."
          }
        ]
      },
      {
        "heading": "Preprocesarea textului",
        "blocks": [
          {
            "p": "Tokenizarea taie textul în unități, de obicei cuvinte. Apoi scoți stopwords, cuvintele foarte frecvente și fără conținut (și, sau, de, la), care doar adaugă zgomot. Lematizarea aduce cuvintele la forma de bază: mergeam, mergi, mers devin merge, ca să nu le trateze modelul ca lucruri complet diferite."
          },
          {
            "note": "La română, atenție la diacritice și la flexiunea bogată. Același cuvânt apare scris cu și fără diacritice și în multe forme. Normalizează consecvent (de exemplu, tratezi la fel ș și s), altfel pierzi potriviri și împrăștii semnalul pe forme separate."
          }
        ]
      },
      {
        "heading": "Bag-of-words și TF-IDF",
        "blocks": [
          {
            "p": "Bag-of-words (sac de cuvinte) reprezintă un document prin câte apariții are fiecare cuvânt din vocabular, ignorând ordinea. Simplu, dar cuvintele comune (care apar peste tot) îneacă semnalul, pentru că au numere mari fără să fie informative."
          },
          {
            "p": "TF-IDF repară asta cântărind fiecare cuvânt după două lucruri: cât de des apare în document (TF, term frequency) și cât de rar e în restul documentelor (IDF, inverse document frequency). Un cuvânt care apare des într-un document dar rar în rest primește greutate mare, pentru că e caracteristic acelui document."
          },
          {
            "formula": "tf-idf(cuvânt, doc) = tf(cuvânt, doc) · log(N / df(cuvânt))",
            "explain": "tf = de câte ori apare cuvântul în document. N = numărul total de documente. df = în câte documente apare cuvântul. Cuvintele omniprezente primesc IDF aproape 0."
          },
          {
            "code": "from sklearn.feature_extraction.text import TfidfVectorizer\nvec = TfidfVectorizer(ngram_range=(1, 2), min_df=2)\nX = vec.fit_transform(texte_train)      # fit DOAR pe train\nX_val = vec.transform(texte_val)        # transform pe val",
            "caption": "ngram_range=(1,2) prinde și perechi de cuvinte, nu doar cuvinte izolate."
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
            "p": "Pentru căutare și potrivire de texte, folosești similaritatea cosinus: unghiul dintre doi vectori de documente. Cu cât unghiul e mai mic, cu atât textele sunt mai apropiate ca conținut. E baza motoarelor de căutare simple și a găsirii de duplicate."
          }
        ]
      }
    ],
    "pitfalls": [
      "Normalizează diacriticele consecvent înainte de tokenizare.",
      "Construiește vocabularul doar pe antrenare, apoi aplică-l pe test.",
      "Fă întâi un baseline TF-IDF, ca să ai cu ce compara rețelele."
    ],
    "practice": [
      "Clasifică texte în română cu TF-IDF și regresie logistică, cu fit doar pe train.",
      "Găsește cele mai apropiate două documente dintr-un set prin similaritate cosinus.",
      "Compară bag-of-words simplu cu TF-IDF pe aceeași problemă și vezi diferența."
    ],
    "keyTakeaways": [
      "NLP clasic = transformi text în vectori, apoi pui un model obișnuit deasupra.",
      "Preprocesare: tokenizare, stopwords, lematizare; la română grijă la diacritice și flexiune.",
      "TF-IDF cântărește cuvintele: mult dacă sunt caracteristice, puțin dacă sunt omniprezente.",
      "Naïve Bayes și regresia logistică peste TF-IDF sunt un baseline greu de bătut.",
      "Similaritatea cosinus măsoară cât de apropiate sunt două texte."
    ]
  },
  {
    "moduleCode": "S17",
    "duration": "~1 săptămână",
    "intro": "O imagine e doar un tensor de numere. Înainte de rețele, merită să înțelegi ce faci cu ea: cum o reprezinți, ce e un filtru de convoluție, și ce augmentare ajută fără să strice eticheta. Modulul ăsta e puntea spre CNN-uri: dacă înțelegi imaginea ca tensor și convoluția de mână, straturile convoluționale de mai târziu nu mai sunt magie.",
    "sections": [
      {
        "heading": "Imaginea ca tensor",
        "blocks": [
          {
            "p": "Un tensor e o grilă de numere cu mai multe dimensiuni, generalizarea unei matrice. O imagine alb-negru e o matrice 2D: fiecare număr e intensitatea unui pixel. O imagine color e un tensor 3D: înălțime, lățime și 3 canale (roșu, verde, albastru). Fiecare pixel color e trei numere."
          },
          {
            "note": "Ai grijă la dtype și la interval. Pixelii vin fie ca întregi de la 0 la 255, fie ca zecimale de la 0 la 1. Nu le amesteca: un model antrenat pe 0 până la 1 primește gunoi dacă îi dai 0 până la 255. Normalizarea la același interval e prima grijă."
          },
          {
            "code": "img.shape       # (H, W, 3): înălțime, lățime, 3 canale color\nimg = img / 255.0   # aduci de la 0..255 la 0..1"
          }
        ]
      },
      {
        "heading": "Convoluția: filtre care se plimbă peste imagine",
        "blocks": [
          {
            "p": "Un filtru de convoluție e o matrice mică (de exemplu 3x3) pe care o plimbi peste imagine. La fiecare poziție, înmulțești filtrul cu bucata de imagine de sub el și aduni. Rezultatul e o nouă imagine care scoate în evidență un anumit tipar: margini, blur, contrast."
          },
          {
            "p": "Merită să scrii de mână câteva filtre clasice o dată. Blur mediază vecinii (netezește). Sharpen accentuează diferențele. Sobel detectează margini, unde intensitatea se schimbă brusc. Când le-ai scris o dată, înțelegi exact ce face un strat convoluțional dintr-o rețea: aceeași operație, doar că filtrele sunt învățate, nu scrise de tine."
          },
          {
            "code": "sobel_x = np.array([[-1, 0, 1],\n                    [-2, 0, 2],\n                    [-1, 0, 1]])\n# plimbi sobel_x peste imagine ca să scoți marginile verticale"
          }
        ]
      },
      {
        "heading": "Augmentarea datelor",
        "blocks": [
          {
            "p": "Când ai puține imagini, modelul memorează. Augmentarea mărește artificial setul creând variante ale imaginilor: le întorci, le rotești, le decupezi, le schimbi puțin culorile. Modelul vede aceeași etichetă în forme ușor diferite și învață să generalizeze, nu să memoreze."
          },
          {
            "list": [
              "Flip orizontal: oglindește imaginea stânga-dreapta.",
              "Rotație și decupare aleatoare: schimbă poziția și cadrul.",
              "Color jitter: variază ușor luminozitatea și culoarea.",
              "Cutout: acoperă o bucată aleatoare, forțând modelul să nu se bazeze pe un singur detaliu."
            ]
          },
          {
            "note": "Un singur lucru contează la augmentare: transformarea trebuie să păstreze eticheta. Un flip orizontal la o pisică e tot o pisică, deci e valid. Dar la cifra 2 sau la litera b, flip-ul schimbă sensul, deci NU e valid. Gândește-te mereu dacă transformarea ar schimba răspunsul corect."
          }
        ]
      }
    ],
    "pitfalls": [
      "Alege augmentări care păstrează eticheta: fără flip pe caractere, fără rotații mari pe obiecte cu orientare fixă.",
      "Ține un singur interval de intensitate pe tot setul.",
      "Augmentează doar antrenarea; validarea rămâne curată."
    ],
    "practice": [
      "Scrie de mână un filtru Sobel și aplică-l pe o imagine ca să-i scoți marginile.",
      "Testează dacă un set de augmentări îmbunătățește scorul pe o problemă mică de clasificare.",
      "Ia o listă de augmentări și decide pentru fiecare dacă păstrează eticheta pe o problemă cu cifre."
    ],
    "keyTakeaways": [
      "O imagine e un tensor: 2D alb-negru, 3D color (H, W, canale).",
      "Ai grijă la interval: 0..255 întreg sau 0..1 zecimal, nu le amesteca.",
      "Convoluția plimbă un filtru mic peste imagine; e exact ce fac straturile CNN, cu filtre învățate.",
      "Augmentarea mărește setul și combate overfitting-ul.",
      "Augmentarea validă păstrează eticheta; flip pe cifre sau litere o strică."
    ]
  },
  {
    "moduleCode": "S18",
    "duration": "~1 săptămână",
    "intro": "Aici începe deep learning-ul. O rețea neuronală e un lanț de straturi, iar antrenarea e ajustarea greutăților ca să scadă eroarea. Cheia modulului e să înțelegi ce face backpropagation, nu doar s-o chemi. Când pricepi cum curge gradientul înapoi prin rețea, restul deep learning-ului devine reglaj, nu mister.",
    "sections": [
      {
        "heading": "De la perceptron la rețea",
        "blocks": [
          {
            "p": "Un perceptron, cărămida de bază, ia intrările, le înmulțește cu niște greutăți, le adună cu un termen liber, și trece rezultatul printr-o funcție de activare. Singur, învață doar granițe liniare, la fel ca regresia logistică."
          },
          {
            "p": "Puterea apare când pui multe straturi de neuroni unul după altul: un MLP (perceptron multistrat). Fiecare strat transformă ieșirea celui dinainte. Cu straturi și activări neliniare între ele, rețeaua poate învăța relații oricât de complicate. Fără neliniaritate, oricâte straturi ai pune ar colapsa într-unul singur."
          },
          {
            "p": "Funcția de activare aduce neliniaritatea. ReLU (păstrează pozitivul, taie negativul la zero) e cea mai folosită, e simplă și antrenează rapid. Sigmoida și tanh se mai folosesc, dar ReLU e alegerea implicită în straturile ascunse."
          }
        ]
      },
      {
        "heading": "Funcția de cost și gradientul",
        "blocks": [
          {
            "p": "Antrenarea are nevoie de o măsură a greșelii: funcția de cost (loss). Pentru regresie, eroarea pătratică. Pentru clasificare, cross-entropy, care pedepsește tare încrederea greșită. Scopul e să găsești greutățile care fac loss-ul cât mai mic."
          },
          {
            "p": "Cum? Gradientul loss-ului față de fiecare greutate îți spune în ce direcție să miști greutatea ca să crească loss-ul; tu mergi în direcția opusă. Ideea se numește coborâre pe gradient (gradient descent): pas cu pas, cobori panta către minim."
          },
          {
            "formula": "w ← w - η · ∂L/∂w",
            "explain": "Fiecare greutate w se mută cu un pas mic (learning rate η) în direcția opusă gradientului ∂L/∂w. Repeți de mii de ori."
          }
        ]
      },
      {
        "heading": "Backpropagation: regula lanțului",
        "blocks": [
          {
            "p": "O rețea e un lanț de operații. Ca să afli gradientul loss-ului față de o greutate din primul strat, aplici regula lanțului din analiză: înmulțești gradienții pas cu pas, de la ieșire înapoi spre intrare. Asta e backpropagation, propagarea înapoi a erorii."
          },
          {
            "p": "Concret: fiecare operație din rețea știe cum să-și transmită gradientul înapoi. Pornești de la loss, mergi înapoi strat cu strat, și la final ai gradientul pentru fiecare greutate din rețea, dintr-o singură trecere. E ce face eficient antrenarea rețelelor mari."
          },
          {
            "note": "Backpropagation calculează gradienții. NU actualizează greutățile. Actualizarea o face optimizatorul, într-un pas separat. Confuzia asta e frecventă, ține minte că sunt două lucruri diferite."
          }
        ]
      },
      {
        "heading": "PyTorch: cum arată în cod",
        "blocks": [
          {
            "p": "PyTorch lucrează cu tensori care își rețin gradientul automat. Tu definești rețeaua ca nn.Module, împachetezi datele într-un Dataset și un DataLoader (care le dă în loturi), și la fiecare pas faci patru lucruri, mereu în aceeași ordine."
          },
          {
            "steps": [
              "Treci datele prin model și calculezi loss-ul (forward).",
              "loss.backward(): backpropagation calculează gradienții.",
              "optimizer.step(): optimizatorul actualizează greutățile cu gradienții.",
              "optimizer.zero_grad(): ștergi gradienții, ca să nu se adune la pasul următor."
            ]
          },
          {
            "code": "for x, y in dataloader:\n    pred = model(x)                # forward\n    loss = criterion(pred, y)\n    loss.backward()                # calculează gradienții\n    optimizer.step()               # actualizează greutățile\n    optimizer.zero_grad()          # curăță pentru pasul următor"
          }
        ]
      }
    ],
    "pitfalls": [
      "Cheamă `optimizer.zero_grad()` la fiecare pas, altfel gradienții se adună.",
      "Ține minte că `.backward()` doar calculează gradienți; pasul îl face optimizatorul.",
      "Pune activări între straturile liniare, altfel rețeaua rămâne liniară."
    ],
    "practice": [
      "Construiește backpropagation de mână pentru o rețea cu un strat ascuns, pe hârtie.",
      "Antrenează un MLP pe un set mic în PyTorch și urmărește loss-ul cum scade.",
      "Scoate intenționat zero_grad() și observă cum o ia razna antrenarea."
    ],
    "keyTakeaways": [
      "Un MLP e straturi de neuroni cu activări neliniare între ele; fără neliniaritate colapsează la un strat.",
      "ReLU e activarea implicită în straturile ascunse.",
      "Antrenarea = coborâre pe gradient: muți greutățile opus gradientului loss-ului.",
      "Backpropagation e regula lanțului aplicată înapoi prin rețea; calculează gradienții.",
      "În PyTorch: forward, backward, step, zero_grad, în ordinea asta."
    ]
  },
  {
    "moduleCode": "S19",
    "duration": "~1 săptămână",
    "intro": "Un model bun antrenat prost nu învață. Modulul ăsta e despre bucla de antrenare: cum alegi optimizatorul, cum reglezi learning rate-ul (butonul cel mai important), și cum ții overfitting-ul sub control. Aceleași straturi, antrenate cu grijă sau la nimereală, dau rezultate complet diferite.",
    "sections": [
      {
        "heading": "Epoci, loturi, pași",
        "blocks": [
          {
            "p": "Trei cuvinte de fixat. Un lot (batch) e un grup mic de exemple pe care le procesezi deodată. O epocă e o trecere completă prin tot setul de antrenare. Un pas (step) e o actualizare a greutăților, adică un lot procesat. Antrenezi de obicei multe epoci, fiecare cu mulți pași."
          },
          {
            "p": "De ce loturi și nu tot setul deodată? Pentru că e mai rapid și adaugă un zgomot util care ajută modelul să nu se blocheze. De ce nu câte un exemplu? Pentru că loturile folosesc mai bine hardware-ul. Un batch size între 32 și 256 e tipic."
          }
        ]
      },
      {
        "heading": "Optimizatoare",
        "blocks": [
          {
            "p": "Optimizatorul decide cum folosește gradienții ca să actualizeze greutățile. SGD (coborâre pe gradient stochastică) cu momentum e solid și de încredere: momentum-ul adaugă inerție, ca o bilă care se rostogolește, ca să treacă peste denivelări mici."
          },
          {
            "p": "Adam și AdamW se adaptează singure: dau pași mai mari unde e nevoie și mai mici unde nu. Pornesc mai ușor și cer mai puțin reglaj, de aceea sunt alegerea implicită pentru mulți. AdamW gestionează mai corect weight decay-ul. Începe cu Adam/AdamW dacă nu ești sigur."
          }
        ]
      },
      {
        "heading": "Learning rate, butonul cel mai important",
        "blocks": [
          {
            "p": "Learning rate-ul (η) e mărimea pasului la fiecare actualizare. E cel mai important hiperparametru din tot deep learning-ul. Prea mare: loss-ul sare haotic sau explodează, modelul diverge. Prea mic: învață dureros de lent sau se blochează înainte să ajungă undeva bun."
          },
          {
            "p": "Nu-l ghici, caută-l. Încearcă valori pe o scară logaritmică (de exemplu 0.1, 0.01, 0.001) și uită-te la curba de loss. Vrei cel mai mare learning rate cu care loss-ul încă scade lin, nu haotic."
          },
          {
            "p": "Scheduler-ele schimbă learning rate-ul în timpul antrenării. O rețetă care merge des: un warmup scurt la început (crești rata treptat, ca să nu destabilizezi), urmat de o scădere lină (cosine) spre final, ca să te așezi fin în minim."
          },
          {
            "note": "Dacă antrenarea o ia razna sau loss-ul devine NaN, primul lucru pe care îl încerci e să scazi learning rate-ul. De cele mai multe ori asta e cauza."
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
              "Dropout: la antrenare, oprește aleator o parte din neuroni la fiecare pas. Forțează rețeaua să nu se bazeze pe un singur drum, deci generalizează mai bine.",
              "Weight decay: penalizează greutățile mari, ținându-le mici și modelul simplu.",
              "Batch normalization: normalizează activările în fiecare lot, stabilizează și accelerează antrenarea.",
              "Early stopping: oprești când scorul pe validare începe să se înrăutățească, chiar dacă cel pe antrenare încă scade."
            ]
          },
          {
            "p": "Inițializarea greutăților contează mai mult decât pare la început. Greutăți pornite prost pot bloca antrenarea de la zero. Din fericire, straturile din PyTorch au inițializări bune implicit, deci rar trebuie să intervii, dar merită să știi că e un factor."
          }
        ]
      }
    ],
    "pitfalls": [
      "Verifică întâi learning rate-ul, apoi arhitectura.",
      "Oprește antrenarea când scorul de validare începe să se înrăutățească.",
      "La loss NaN, scade întâi learning rate-ul."
    ],
    "practice": [
      "Testează trei learning rate-uri pe o scară logaritmică și desenează curbele de loss.",
      "Adaugă dropout și early stopping la o rețea și vezi efectul pe validare.",
      "Compară SGD cu momentum și Adam pe aceeași problemă mică."
    ],
    "keyTakeaways": [
      "Lot, epocă, pas: un lot procesat = un pas; o trecere prin tot setul = o epocă.",
      "Adam/AdamW pornesc ușor și cer puțin reglaj; SGD cu momentum e solid.",
      "Learning rate-ul e butonul cel mai important; caută-l pe scară logaritmică.",
      "Warmup plus scădere cosine e o rețetă bună de scheduler.",
      "Dropout, weight decay, batch norm și early stopping țin overfitting-ul în frâu."
    ]
  },
  {
    "moduleCode": "S20",
    "duration": "~1 săptămână",
    "intro": "Mai devreme sau mai târziu, o rețea refuză să învețe: loss-ul stă pe loc, sau scorul e la nivel de ghicit. Panica și schimbatul la nimereală nu ajută. Ai o listă de verificări, în ordine, de la simplu la complex. De cele mai multe ori problema e banală și e pe la începutul listei.",
    "sections": [
      {
        "heading": "Testul care rezolvă jumătate din cazuri",
        "blocks": [
          {
            "p": "Înainte de orice, verifică dacă modelul poate face overfit pe 10 exemple. Iei zece exemple, oprești orice regularizare, și antrenezi până ar trebui să le memoreze perfect. Dacă loss-ul ajunge aproape de zero, mecanismul de învățare funcționează și problema e în altă parte (date, regularizare prea agresivă)."
          },
          {
            "note": "Dacă nici pe zece exemple modelul nu ajunge la loss aproape zero, ai un BUG, nu o problemă de capacitate sau de date. Nu are rost să antrenezi mai mult sau să mărești rețeaua. Ceva e stricat în cod, în date sau în conexiuni."
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
              "Learning rate: prea mare (loss haotic sau NaN) sau prea mic (nu se mișcă). Încearcă altă valoare întâi.",
              "Normalizarea datelor: intrările sunt scalate? O rețea primește greu date pe intervale uriașe sau inconsistente.",
              "Etichetele: sunt aliniate corect cu intrările? Ai amestecat ordinea? Ai funcția de loss potrivită tipului de problemă?",
              "zero_grad: chemi optimizer.zero_grad() la fiecare pas? Fără el, gradienții se adună și antrenarea o ia razna.",
              "Inițializare și gradienți: verifică dacă gradienții explodează (devin uriași) sau dispar (devin zero). Batch norm și inițializarea bună ajută."
            ]
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
            "list": [
              "Loss plat de la început: învățarea nu pornește. Cel mai des, learning rate sau date.",
              "Loss care explodează sau devine NaN: learning rate prea mare sau gradienți care explodează.",
              "Loss de antrenare scade, cel de validare crește: overfitting, adaugă regularizare.",
              "Loss zgomotos dar în scădere: probabil normal, poate un batch size prea mic."
            ]
          }
        ]
      }
    ],
    "pitfalls": [
      "Verifică normalizarea datelor înainte să dai vina pe arhitectură.",
      "Dacă nu învață în primele epoci, oprește și caută bug-ul.",
      "Schimbă un singur lucru pe rând, ca să știi ce a ajutat."
    ],
    "practice": [
      "Ia o rețea care nu învață și găsește cauza trecând prin listă, un pas pe rând.",
      "Reprodu overfitting-ul pe 10 exemple ca test de sănătate înainte de antrenarea reală.",
      "Desenează câteva curbe de loss (bune și rele) și învață să le recunoști din formă."
    ],
    "keyTakeaways": [
      "Primul test: poate modelul să facă overfit pe 10 exemple? Dacă nu, e un bug.",
      "Depanează în ordine: learning rate, normalizare, etichete, zero_grad, gradienți.",
      "Nu schimba lucruri la întâmplare; mergi pe listă, un lucru pe rând.",
      "Curba de loss îți spune cauza: formă plată, explozie, sau prăpastie train-validare."
    ]
  },
  {
    "moduleCode": "S21",
    "duration": "~1 săptămână",
    "intro": "CNN-urile (rețele convoluționale) sunt uneltele pentru imagini. În loc să conecteze fiecare pixel la fiecare neuron, ceea ce ar fi enorm, folosesc filtre mici care se plimbă peste imagine. Așa învață trăsături locale (margini, colțuri, apoi forme) eficient și cu puține greutăți. Ai văzut convoluția de mână la S17; aici o rețeaua o învață singură.",
    "sections": [
      {
        "heading": "De ce nu un MLP obișnuit pe imagini",
        "blocks": [
          {
            "p": "Dacă ai lega fiecare pixel dintr-o imagine de 224x224 color la fiecare neuron, ai avea sute de mii de greutăți doar în primul strat. Prea multe: model uriaș, lent, care face overfitting imediat. În plus, un MLP tratează fiecare pixel independent și pierde faptul că pixelii vecini formează structuri."
          },
          {
            "p": "CNN-urile exploatează două idei. Localitate: trăsăturile utile (o margine) sunt locale, deci un filtru mic ajunge. Partajarea greutăților: același filtru se plimbă peste toată imaginea, deci o margine e recunoscută oriunde apare, cu aceleași greutăți. Puține greutăți, multă putere."
          }
        ]
      },
      {
        "heading": "Stratul convoluțional: kernel, stride, padding",
        "blocks": [
          {
            "p": "Un strat convoluțional aplică mai multe filtre învățate peste intrare, fiecare producând o hartă de trăsături care evidențiază un anumit tipar. Trei setări definesc cum se plimbă filtrul."
          },
          {
            "list": [
              "Kernel: mărimea filtrului (de obicei 3x3). Cât de mare e fereastra care se plimbă.",
              "Stride: cu cât sare filtrul la fiecare pas. Stride 2 sare din doi în doi, micșorând ieșirea.",
              "Padding: cât umpli cu zerouri marginile, ca ieșirea să nu se micșoreze prea repede și colțurile să conteze."
            ]
          },
          {
            "p": "Trebuie să știi să calculezi dimensiunea ieșirii, altfel nu poți lega straturile corect. E o formulă simplă pe care o aplici pentru fiecare strat."
          },
          {
            "formula": "ieșire = (intrare - kernel + 2·padding) / stride + 1",
            "explain": "Pentru o intrare de 32, kernel 3, padding 1, stride 1: (32 - 3 + 2) / 1 + 1 = 32. Dimensiunea se păstrează."
          }
        ]
      },
      {
        "heading": "Pooling și câmpul receptiv",
        "blocks": [
          {
            "p": "Pooling-ul micșorează harta de trăsături, luând de exemplu maximul din fiecare fereastră 2x2 (max pooling). Reduce dimensiunea, deci calculul, și mărește câmpul receptiv: cât din imaginea originală vede un neuron. Straturile de sus, cu câmp receptiv mare, văd forme întregi, nu doar margini."
          },
          {
            "p": "Global average pooling e o alternativă curată la straturile dense de la final: mediază fiecare hartă de trăsături într-un singur număr. Are mai puține greutăți și face mai puțin overfitting decât straturile dense mari."
          }
        ]
      },
      {
        "heading": "Arhitecturi clasice și ResNet",
        "blocks": [
          {
            "p": "Tiparul clasic al unui CNN: alternezi straturi convoluționale și pooling, care extrag trăsături din ce în ce mai abstracte, apoi la final un cap de clasificare care dă clasa. LeNet (cifre) și VGG (stive de convoluții 3x3) sunt punctele de plecare istorice."
          },
          {
            "p": "Problema rețelelor foarte adânci: gradientul dispare pe drumul înapoi prin multe straturi, iar rețeaua nu mai învață. ResNet a rezolvat asta cu conexiuni reziduale: o scurtătură care sare peste câteva straturi și adună intrarea la ieșire. Gradientul poate curge direct prin scurtătură, deci rețele de zeci sau sute de straturi devin antrenabile. De aici pornesc majoritatea modelelor moderne de imagini."
          },
          {
            "note": "Conexiunea reziduală e ideea de reținut din modul. Fără ea, rețelele foarte adânci nu învață. Cu ea, adâncimea devine un avantaj, nu un blocaj."
          }
        ]
      }
    ],
    "pitfalls": [
      "Calculează dimensiunile pe hârtie înainte să legi straturile.",
      "Folosește conexiuni reziduale la rețele adânci, ca gradientul să ajungă înapoi.",
      "Închide cu global average pooling în loc de straturi dense uriașe."
    ],
    "practice": [
      "Calculează pe hârtie dimensiunile ieșirii pentru o mică rețea convoluțională, strat cu strat.",
      "Antrenează o rețea convoluțională simplă pe un set de imagini mic.",
      "Adaugă o conexiune reziduală într-o rețea și compară antrenarea cu și fără ea."
    ],
    "keyTakeaways": [
      "CNN-urile folosesc filtre mici partajate: puține greutăți, recunosc trăsături oriunde apar.",
      "Stratul convoluțional are kernel, stride, padding; ieșirea se calculează cu o formulă simplă.",
      "Pooling-ul micșorează harta și mărește câmpul receptiv.",
      "Tiparul: convoluții plus pooling pentru trăsături, apoi cap de clasificare.",
      "Conexiunile reziduale (ResNet) lasă gradientul să treacă prin rețele adânci."
    ]
  },
  {
    "moduleCode": "S22",
    "duration": "~1 săptămână",
    "intro": "Rar antrenezi o rețea de imagini de la zero. Iei un model deja antrenat pe milioane de imagini (ImageNet) și îl adaptezi la problema ta. Cu date puține, asta e diferența dintre un scor bun și unul jalnic. Modelul a învățat deja să vadă margini, texturi și forme; tu doar îl reorientezi spre clasele tale.",
    "sections": [
      {
        "heading": "De ce funcționează transferul",
        "blocks": [
          {
            "p": "Un CNN antrenat pe multe imagini învață în straturile de jos trăsături generale: margini, colțuri, texturi. Astea sunt utile pentru aproape orice problemă de imagini, nu doar pentru cea pe care a fost antrenat. Straturile de sus învață trăsături specifice (forme de câini, de mașini). Ideea transferului: păstrezi partea generală și rescrii doar partea specifică."
          },
          {
            "p": "Așa, în loc să antrenezi milioane de greutăți de la zero, cu milioane de imagini de care nu dispui, folosești ce a învățat deja modelul și antrenezi doar puțin, cu puține date. E cea mai practică tehnică din tot deep learning-ul de imagini."
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
              "Fine-tuning: dezgheți și straturile de sus ale rețelei și le antrenezi cu un learning rate mic, ca să le ajustezi fin spre problema ta. Mai puternic, potrivit când ai date ceva mai multe."
            ]
          },
          {
            "code": "from torchvision import models\nimport torch.nn as nn\n\nnet = models.resnet18(weights=\"DEFAULT\")\nfor p in net.parameters():\n    p.requires_grad = False          # îngheață tot (feature extraction)\nnet.fc = nn.Linear(net.fc.in_features, NUM_CLASE)   # cap nou, antrenabil"
          }
        ]
      },
      {
        "heading": "Normalizarea: aceeași cu cea de la antrenare",
        "blocks": [
          {
            "p": "Un model preantrenat a văzut imagini normalizate într-un anumit fel: scăzute și împărțite cu statisticile ImageNet (mediile și deviațiile pe cele trei canale). Dacă îi dai imagini normalizate altfel, intrarea nu seamănă cu ce a văzut el la antrenare și merge prost, uneori inexplicabil de prost."
          },
          {
            "note": "Când folosești un model preantrenat, normalizează imaginile exact cu statisticile pe care a fost antrenat (pentru ImageNet, mediile și deviațiile standard cunoscute). E o greșeală tăcută și frecventă."
          }
        ]
      },
      {
        "heading": "Learning rate mic la fine-tuning",
        "blocks": [
          {
            "p": "La fine-tuning, straturile preantrenate au deja greutăți bune. Dacă le antrenezi cu un learning rate mare, pașii mari strică exact trăsăturile valoroase pe care voiai să le păstrezi. Folosește un learning rate mic pentru ele, uneori și mai mic decât pentru capul nou. Așa le ajustezi fin, nu le distrugi."
          }
        ]
      }
    ],
    "pitfalls": [
      "Aplică aceeași normalizare ImageNet ca la preantrenare.",
      "Fă fine-tuning cu learning rate mic, ca să nu strici trăsăturile deja bune.",
      "Cu puține date, folosește feature extraction în loc de fine-tuning complet."
    ],
    "practice": [
      "Adaptează un ResNet la o problemă cu puține imagini prin feature extraction.",
      "Compară feature extraction cu fine-tuning pe același set și vezi când merită fiecare.",
      "Verifică ce se întâmplă cu scorul dacă scoți normalizarea corectă a imaginilor."
    ],
    "keyTakeaways": [
      "Modelele preantrenate au învățat trăsături generale reutilizabile în alte probleme.",
      "Feature extraction (îngheți tot, antrenezi doar capul) e pentru foarte puține date.",
      "Fine-tuning (dezgheți straturile de sus, learning rate mic) e pentru date ceva mai multe.",
      "Normalizează imaginile cu aceleași statistici ca la preantrenare (ImageNet).",
      "Learning rate mare la fine-tuning strică trăsăturile bune deja învățate."
    ]
  },
  {
    "moduleCode": "S23",
    "duration": "~1 săptămână",
    "intro": "One-hot tratează fiecare cuvânt ca pe ceva izolat: câine și pisică sunt la fel de diferite ca și câine și televizor. Embeddings pun cuvintele într-un spațiu unde apropierea înseamnă sens apropiat. E ideea pe care stă tot NLP-ul modern. Modulul ăsta îți dă intuiția, ca modelele mari de mai târziu să nu fie magie.",
    "sections": [
      {
        "heading": "Problema reprezentării one-hot",
        "blocks": [
          {
            "p": "În NLP clasic (S16), un cuvânt era o poziție într-un vector uriaș de zerouri cu un singur 1. Problema: toți vectorii sunt la fel de departe unul de altul. Modelul nu are cum să știe că rege și regină sunt înrudite, sau că bun și excelent sunt apropiate. Sensul se pierde complet."
          },
          {
            "p": "Vectorii sunt și enormi (cât vocabularul, zeci de mii de dimensiuni) și rari (aproape numai zerouri). Ineficient și fără sens semantic. Embeddings rezolvă ambele probleme."
          }
        ]
      },
      {
        "heading": "Embeddings: sens ca poziție în spațiu",
        "blocks": [
          {
            "p": "Un embedding e un vector dens, scurt (de exemplu 100-300 de numere), învățat pentru fiecare cuvânt, astfel încât cuvintele cu sens apropiat să aibă vectori apropiați. Se învață din contexte: cuvintele care apar în contexte similare primesc vectori similari. Câine și pisică apar amândouă lângă hrană, blană, animal, deci ajung aproape."
          },
          {
            "p": "Word2Vec învață astfel de vectori în două variante: skip-gram (din cuvânt prezici contextul) sau CBOW (din context prezici cuvântul). Un rezultat celebru: aritmetica vectorilor funcționează. Vectorul rege minus bărbat plus femeie cade aproape de regină. Sensul devine geometrie."
          },
          {
            "formula": "vec(rege) - vec(bărbat) + vec(femeie) ≈ vec(regină)",
            "explain": "Relațiile de sens devin direcții în spațiu. Diferența bărbat-femeie e aceeași direcție ca rege-regină."
          }
        ]
      },
      {
        "heading": "FastText: important pentru română",
        "blocks": [
          {
            "p": "Word2Vec tratează fiecare cuvânt ca un tot. FastText merge pe subcuvinte (bucăți de litere): reprezintă un cuvânt din fragmentele lui. Asta contează enorm la română, cu flexiunea ei bogată. Merg, mergem, mergeau împart subcuvinte, deci primesc vectori înrudiți, chiar dacă una din forme e rară sau nevăzută la antrenare."
          },
          {
            "note": "La română, preferă FastText sau embeddings care folosesc subcuvinte. Modelele care tratează fiecare formă flexionată ca un cuvânt complet separat pierd legăturile și se împotmolesc pe formele rare."
          },
          {
            "p": "Poți folosi vectori preantrenați (Word2Vec, FastText, GloVe gata antrenați) ca extractoare de trăsături, fără să antrenezi nimic: iei vectorii cuvintelor și pui un model simplu deasupra. Cu puține date, e mult mai bine decât să pornești de la zero."
          }
        ]
      },
      {
        "heading": "Secvențe: RNN, LSTM, GRU",
        "blocks": [
          {
            "p": "Un embedding dă sens unui cuvânt, dar o propoziție e o secvență în care ordinea contează. Rețelele recurente (RNN) procesează textul cuvânt cu cuvânt, ținând o stare care rezumă ce au văzut până acum. Problema: pe secvențe lungi, gradientul dispare și rețeaua uită începutul propoziției."
          },
          {
            "p": "LSTM și GRU rezolvă asta cu porți: mecanisme care decid ce informație rețin, ce uită și ce lasă să treacă. Așa pot ține minte context de mai departe. Nu trebuie să le implementezi de la zero, dar înțelege conceptual de ce funcționează: porțile protejează informația importantă de la a fi ștearsă pas cu pas."
          },
          {
            "p": "RNN-urile și LSTM-urile au fost înlocuite în mare parte de transformere în NLP-ul de vârf, dar rămân importante ca să înțelegi ideea de procesare a secvenței și problema memoriei pe distanță lungă, care e exact ce au venit transformerele să rezolve mai bine."
          }
        ]
      }
    ],
    "pitfalls": [
      "La română folosește vectori care țin cont de subcuvinte, pentru formele flexionate.",
      "Pentru context lung folosește atenție sau transformer, nu un RNN simplu.",
      "Pornește de la embeddings preantrenate când ai puține date."
    ],
    "practice": [
      "Explorează aritmetica vectorilor (rege - bărbat + femeie) pe un set de embeddings preantrenate.",
      "Compară FastText cu Word2Vec pe cuvinte flexionate din română.",
      "Folosește embeddings preantrenate ca trăsături și pune o regresie logistică deasupra."
    ],
    "keyTakeaways": [
      "One-hot pierde sensul; toate cuvintele sunt la fel de departe.",
      "Embeddings sunt vectori denși unde apropierea = sens apropiat, învățați din context.",
      "Aritmetica vectorilor de cuvinte funcționează: relațiile de sens devin direcții.",
      "FastText folosește subcuvinte, esențial pentru flexiunea bogată a românei.",
      "RNN procesează secvențe dar uită pe distanță lungă; LSTM/GRU rețin cu porți."
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
            "p": "La supervizat aveai răspunsul corect pentru fiecare exemplu. La RL nu-l ai. Agentul ia acțiuni într-un mediu, primește recompense (pozitive sau negative), și trebuie să învețe singur ce șir de acțiuni aduce cea mai mare recompensă pe termen lung. Provocarea: o acțiune bună acum poate aduce recompensa abia peste mulți pași."
          },
          {
            "p": "Exemplu clasic: un agent într-un grid-world (o hartă cu căsuțe) trebuie să ajungă la o țintă evitând capcane. Nu i se spune drumul; primește o recompensă mică negativă la fiecare pas și una mare pozitivă la țintă, și învață singur drumul bun."
          }
        ]
      },
      {
        "heading": "MDP: limbajul RL",
        "blocks": [
          {
            "p": "Un MDP (proces de decizie Markov) descrie problema formal. Are stări (unde poate fi agentul), acțiuni (ce poate face), recompense (ce primește), un factor de discount (cât de mult contează viitorul față de prezent), și o politică (regula după care agentul alege acțiunea în fiecare stare). Scopul: găsești politica ce maximizează recompensa totală așteptată."
          },
          {
            "p": "Două funcții măsoară cât de bine stai. V(s) spune cât de bună e o stare (câtă recompensă aștepți de acolo încolo). Q(s,a) spune cât de bună e o pereche stare-acțiune (câtă recompensă aștepți dacă faci acțiunea a în starea s, apoi joci bine). Ecuațiile Bellman le leagă între ele recursiv: valoarea unei stări depinde de valorile stărilor următoare."
          }
        ]
      },
      {
        "heading": "Q-learning tabelar",
        "blocks": [
          {
            "p": "Q-learning învață funcția Q din experiență, ținând un tabel cu o valoare pentru fiecare pereche stare-acțiune. După fiecare acțiune, actualizează valoarea din tabel apropiind-o de recompensa primită plus cea mai bună valoare din starea următoare. Cu destule încercări, tabelul converge și politica bună iese: în fiecare stare, alegi acțiunea cu Q cel mai mare."
          },
          {
            "formula": "Q(s,a) ← Q(s,a) + α · [r + γ · max Q(s',a') - Q(s,a)]",
            "explain": "α = rata de învățare, r = recompensa, γ = factorul de discount, s' = starea următoare. Muți Q spre recompensa reală plus valoarea viitoare."
          },
          {
            "p": "O dilemă centrală: explorare contra exploatare. Dacă agentul alege mereu ce pare cel mai bun acum (exploatare), poate rata un drum mai bun pe care nu l-a încercat. Dacă explorează prea mult, pierde vremea. Strategia ε-greedy echilibrează: cu probabilitate ε face o acțiune la întâmplare (explorare), altfel alege ce e mai bun (exploatare). De obicei începi cu ε mare și îl scazi treptat."
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
            "p": "Un model învață din date, deci moștenește tiparele din ele, inclusiv pe cele nedrepte. Bias-ul intră pe mai multe uși: date istorice care reflectă discriminări trecute, etichetare părtinitoare, sau alegerea unei metrici care ascunde problema. Un model poate merge bine în medie și prost pe un subgrup, iar media ascunde asta."
          },
          {
            "p": "De aceea măsori performanța și pe subgrupuri, nu doar în total. Corectitudinea are mai multe definiții, și aici e partea grea: nu poți mereu să le ai pe toate deodată."
          },
          {
            "list": [
              "Paritate demografică: modelul dă rezultate pozitive în aceeași proporție pentru fiecare grup.",
              "Șanse egale: modelul are aceeași rată de adevărat pozitiv pentru fiecare grup (prinde la fel de bine cazurile reale în fiecare grup)."
            ]
          },
          {
            "p": "Cele două definiții pot fi incompatibile matematic: satisfăcând-o pe una, o încalci pe cealaltă. Nu există un răspuns pur tehnic. Alegerea depinde de context și de ce cost are fiecare tip de greșeală pentru oameni. Important e să fii conștient de compromis și să-l faci explicit, nu să raportezi doar media și să ascunzi restul."
          }
        ]
      }
    ],
    "pitfalls": [
      "Scade ε treptat, ca agentul să exploreze destul la început.",
      "Raportează scorul și pe subgrupuri, nu doar media.",
      "Tratează corectitudinea ca pe mai multe definiții care se bat cap în cap."
    ],
    "practice": [
      "Implementează Q-learning pe un grid-world și urmărește politica cum se formează.",
      "Măsoară performanța unui model pe subgrupuri și discută ce definiție de corectitudine folosești.",
      "Variază ε (explorarea) și observă cum se schimbă ce politică învață agentul."
    ],
    "keyTakeaways": [
      "La RL agentul învață din recompense, nu din răspunsuri corecte date.",
      "Un MDP are stări, acțiuni, recompense, discount și politică; V și Q măsoară cât de bine stai.",
      "Q-learning învață un tabel de valori din experiență și scoate politica bună.",
      "ε-greedy echilibrează explorarea și exploatarea; explorează destul la început.",
      "Bias-ul intră prin date și etichete; măsoară pe subgrupuri, nu doar media.",
      "Definițiile de corectitudine pot fi incompatibile; alegerea e contextuală, nu pur tehnică."
    ]
  }
];

export const lessonByModule = (code: string): Lesson | undefined =>
  lessons.find((l) => l.moduleCode === code);
