---
code: S23
duration: ~1 săptămână
---

# @intro
One-hot (vectorul de zerouri cu un singur 1, din Lecția 5) tratează fiecare cuvânt ca pe ceva izolat: câine și pisică sunt la fel de diferite ca și câine și televizor. Embeddings pun cuvintele într-un spațiu unde apropierea înseamnă sens apropiat. E ideea pe care stă tot NLP-ul modern. Modulul ăsta îți dă intuiția, ca modelele mari de text (ChatGPT, de exemplu) să nu fie magie pentru tine.

## Problema reprezentării one-hot
În NLP clasic (Lecția 12), un cuvânt era o poziție într-un vector uriaș de zerouri cu un singur 1. Cu un vocabular de doar trei cuvinte, câine, pisică și televizor, vectorii ar fi câine = [1, 0, 0], pisică = [0, 1, 0] și televizor = [0, 0, 1]. Problema: toți vectorii sunt la fel de departe unul de altul. Similaritatea cosinus (Lecția 12) dintre oricare doi e 0, fiindcă nu au niciun 1 pe aceeași poziție. Modelul nu are cum să știe că rege și regină sunt înrudite, sau că bun și excelent sunt apropiate. Sensul se pierde complet.

Vectorii sunt și enormi (cât vocabularul, zeci de mii de dimensiuni) și rari (sparse: aproape numai zerouri). La un vocabular de 50 000 de cuvinte, fiecare vector are 49 999 de zerouri și un singur 1. Ineficient și fără nicio informație despre sens. Embeddings rezolvă ambele probleme: folosesc vectori denși, adică scurți și cu numere diferite de zero aproape peste tot.

## Embeddings: sens ca poziție în spațiu
Un embedding e un vector dens, scurt (de exemplu 100-300 de numere), învățat pentru fiecare cuvânt, astfel încât cuvintele cu sens apropiat să aibă vectori apropiați. Ca să vezi ideea, ia vectori cu doar două numere, adică puncte în plan. Să zicem că după antrenare ai câine = [4, 3], pisică = [3, 4] și televizor = [-3, 4]. Numerele sunt alese de noi; cele reale sunt învățate și nu au un sens atât de simplu.

Similaritatea cosinus e produsul celor doi vectori (înmulțești pozițiile între ele și aduni) împărțit la produsul lungimilor lor. Lungimea lui [4, 3] e √(4² + 3²) = √25 = 5, și la fel pentru ceilalți doi. Câine și pisică: (4 · 3 + 3 · 4) / (5 · 5) = 24 / 25 = 0.96, aproape 1, deci sens apropiat. Câine și televizor: (4 · (-3) + 3 · 4) / 25 = 0 / 25 = 0, nimic în comun.

```
import numpy as np

def cosinus(a, b):
    return a @ b / (np.linalg.norm(a) * np.linalg.norm(b))

caine = np.array([4, 3])
pisica = np.array([3, 4])
televizor = np.array([-3, 4])
print(cosinus(caine, pisica))      # 0.96
print(cosinus(caine, televizor))   # 0.0
print(cosinus(pisica, televizor))  # 0.28
```

`a @ b` e produsul de mai sus: înmulțește pozițiile între ele și adună, 4 · 3 + 3 · 4 = 24. `np.linalg.norm(a)` dă lungimea vectorului, aici 5. Pisică și televizor ies la 0.28, tot departe.

Se învață din contexte: cuvintele care apar în contexte similare primesc vectori similari. Câine și pisică apar amândouă lângă hrană, blană, animal, deci ajung aproape. Contextul unui cuvânt sunt cuvintele din jurul lui, de obicei cele aflate la cel mult două poziții distanță, la stânga și la dreapta. În propoziția „pisica mea bea lapte în bucătărie”, contextul lui „bea” e format din „pisica”, „mea”, „lapte” și „în”. Fereastra asta se plimbă peste milioane de propoziții, cuvânt cu cuvânt.

Word2Vec învață astfel de vectori în două variante: skip-gram (din cuvânt prezici contextul) sau CBOW (din context prezici cuvântul). Skip-gram primește „bea” și trebuie să ghicească, pe rând, „pisica”, „mea”, „lapte” și „în”. CBOW face invers: primește cele patru cuvinte din jur și ghicește „bea”. Ghicitul e doar un pretext: după antrenare arunci partea care ghicește și păstrezi vectorii învățați pe drum.

Un rezultat celebru: aritmetica vectorilor funcționează. Vectorul rege minus bărbat plus femeie cade aproape de regină. Sensul devine geometrie.

> [!FORMULA]
> vec(rege) - vec(bărbat) + vec(femeie) ≈ vec(regină)
> Relațiile de sens devin direcții în spațiu. Diferența bărbat-femeie e aceeași direcție ca rege-regină.

Un exemplu de jucărie, cu două numere: primul arată cât de regal e cuvântul, al doilea cât de masculin. Să zicem că rege = [9, 8], bărbat = [1, 8], femeie = [1, 1] și regină = [9, 1]. Atunci rege - bărbat + femeie = [9 - 1 + 1, 8 - 8 + 1] = [9, 1], adică exact regină. Diferența femeie - bărbat = [0, -7] e aceeași cu regină - rege: e „direcția” de la masculin la feminin. Cu embeddings reale, rezultatul cade doar aproape de regină (de aici ≈), așa că se caută cuvântul cu cea mai mare similaritate cosinus față de el.

## FastText: important pentru română
Word2Vec tratează fiecare cuvânt ca un tot. FastText merge pe subcuvinte (bucăți de litere): construiește vectorul unui cuvânt din fragmentele lui. Asta contează enorm la română, cu flexiunea ei bogată: același cuvânt își schimbă forma după persoană, număr, timp sau caz. Merg, mergem, mergeau împart subcuvinte, deci primesc vectori înrudiți, chiar dacă una din forme e rară sau nevăzută la antrenare.

Concret, FastText pune un < la începutul cuvântului și un > la sfârșit, ca să știe unde începe și unde se termină, apoi îl taie în bucăți de câte 3 litere. De obicei folosește bucăți de 3 până la 6 litere, dar aici rămânem la 3.

```
def bucati(cuvant, n=3):
    c = "<" + cuvant + ">"
    return [c[i:i + n] for i in range(len(c) - n + 1)]

print(bucati("mergem"))   # ['<me', 'mer', 'erg', 'rge', 'gem', 'em>']
print(bucati("merg"))     # ['<me', 'mer', 'erg', 'rg>']
```

`c[i:i + n]` e o felie de n litere care începe la poziția i (Lecția 3), iar lista le ia pe toate, de la prima poziție la ultima. „merg” și „mergem” au în comun primele trei bucăți: „<me”, „mer” și „erg”. Vectorul unui cuvânt e media vectorilor bucăților lui, plus vectorul cuvântului întreg dacă l-a văzut la antrenare. Așa, și o formă nevăzută, de exemplu „mergeați”, primește un vector din bucățile pe care le are.

> [!NOTE]
> La română, preferă FastText sau embeddings care folosesc subcuvinte. Modelele care tratează fiecare formă flexionată ca un cuvânt complet separat pierd legăturile și se împotmolesc pe formele rare.

## Embeddings preantrenate
Poți folosi vectori preantrenați (Word2Vec, FastText, GloVe gata antrenați) ca extractoare de trăsături, fără să antrenezi nimic: iei vectorii cuvintelor și pui un model simplu deasupra. Preantrenați înseamnă că altcineva a antrenat deja modelul pe miliarde de cuvinte, de exemplu pe toată Wikipedia, și a publicat vectorii. GloVe e încă o metodă de a învăța vectori de cuvinte, asemănătoare cu Word2Vec, iar FastText are vectori gata antrenați și pentru română. Cu puține date, e mult mai bine decât să pornești de la zero.

Ca să ai un singur rând de trăsături pentru un text întreg, cel mai simplu e să faci media vectorilor cuvintelor din el. Un text de 10 cuvinte, cu vectori de 300 de numere, devine un singur rând de 300 de numere, iar peste rândurile astea pui o regresie logistică (Lecția 7).

> [!NOTE]
> Fișierele cu vectori preantrenați sunt mari (de la sute de MB la câțiva GB) și se descarcă de pe internet. La concurs, platforma îți rulează codul fără internet (Lecția 6), deci îi poți folosi doar dacă regulamentul îi permite și fișierele sunt deja disponibile acolo unde rulează codul.

## Secvențe: RNN, LSTM, GRU
Un embedding dă sens unui cuvânt, dar o propoziție e o secvență în care ordinea contează. „Câinele a mușcat poștașul” și „poștașul a mușcat câinele” au aceleași cuvinte, dar nu spun același lucru, iar un bag-of-words (Lecția 12) le vede identice. Rețelele recurente (RNN) procesează textul cuvânt cu cuvânt, ținând o stare care rezumă ce au văzut până acum.

Starea seamănă cu ce ții în minte când citești. Nu reții fiecare cuvânt, dar știi cine e personajul și ce s-a întâmplat până acum, iar fiecare cuvânt nou îți actualizează rezumatul. La un RNN, starea e un vector de numere, de exemplu 16. La fiecare cuvânt, rețeaua ia embedding-ul lui și starea veche și calculează din ele starea nouă, cu aceleași greutăți la fiecare pas (ca filtrul care se plimbă din Lecția 17). Starea de după ultimul cuvânt rezumă toată propoziția și poate intra într-un strat dens care dă clasa.

În PyTorch, `nn.Embedding` e chiar un tabel de embeddings: câte un vector pentru fiecare cuvânt din vocabular, învățat odată cu restul rețelei. Cuvintele intră ca numere (poziția fiecăruia în vocabular), iar tabelul le dă vectorii.

```
import torch
import torch.nn as nn

torch.manual_seed(0)
ids = torch.randint(0, 1000, (4, 7))   # 4 propoziții, câte 7 cuvinte
emb = nn.Embedding(1000, 50)           # 1000 de cuvinte, vectori de 50
x = emb(ids)
print(x.shape)        # torch.Size([4, 7, 50])

rnn = nn.RNN(input_size=50, hidden_size=16, batch_first=True)
iesiri, stare = rnn(x)
print(iesiri.shape)   # torch.Size([4, 7, 16]): starea după fiecare cuvânt
print(stare.shape)    # torch.Size([1, 4, 16]): starea de după ultimul
```

Ce intră: 4 propoziții de câte 7 cuvinte, date ca numere între 0 și 999 (aici alese la întâmplare cu `torch.randint`). `nn.Embedding(1000, 50)` le transformă în vectori de 50 de numere, deci forma devine (4, 7, 50). `batch_first=True` îi spune RNN-ului că prima dimensiune e lotul (propozițiile), apoi vin cuvintele. Ce iese: `iesiri` are starea de după fiecare cuvânt, 16 numere pe cuvânt, iar `stare` doar starea de după ultimul cuvânt. Acel 1 din față e numărul de straturi RNN puse unul peste altul, aici unul singur.

Problema: pe secvențe lungi, gradientul dispare și rețeaua uită începutul propoziției. La backpropagation (Lecția 14), gradientul trece înapoi prin fiecare pas, ca printr-o rețea cu câte un strat pentru fiecare cuvânt. Dacă la fiecare pas se înmulțește cu 0.9, după 50 de cuvinte rămâne 0.9 la puterea 50, cam 0.005. E problema gradienților care dispar (Lecția 16), aceeași ca la rețelele foarte adânci din Lecția 17: primele cuvinte aproape nu mai contează la antrenare.

LSTM și GRU rezolvă asta cu porți: mecanisme care decid ce informație rețin, ce uită și ce lasă să treacă. Așa pot ține minte context de mai departe. O poartă e un șir de numere între 0 și 1, scoase de o sigmoidă (Lecția 14), cu care se înmulțește informația: 0 o blochează, 1 o lasă să treacă întreagă, iar 0.5 lasă jumătate.

LSTM-ul ține, pe lângă stare, o memorie separată și are trei porți. Poarta de uitare decide ce ștergi din memorie, poarta de intrare ce scrii nou în ea, iar poarta de ieșire ce parte din memorie folosești la pasul ăsta. GRU e o variantă mai simplă, cu două porți, des la fel de bună și mai rapidă.

În „Maria a plecat dimineața și, după o zi lungă la școală, seara s-a întors obosită”, forma „obosită” depinde de „Maria”, aflată cu peste zece cuvinte mai devreme. Un LSTM poate păstra în memorie că subiectul e feminin până acolo, ținând poarta de uitare aproape de 1. Nu trebuie să le implementezi de la zero, dar înțelege conceptual de ce funcționează: porțile protejează informația importantă de la a fi ștearsă pas cu pas.

Memoria LSTM-ului se actualizează mai ales prin adunare, ca la conexiunea reziduală din Lecția 17. Când poarta de uitare e aproape de 1, memoria trece aproape neschimbată de la un cuvânt la altul, iar gradientul la fel. În PyTorch, `nn.LSTM` se folosește ca `nn.RNN`, cu aceiași parametri, doar că întoarce și memoria: `iesiri, (stare, memorie) = lstm(x)`.

RNN-urile și LSTM-urile au fost înlocuite în mare parte de transformere în NLP-ul de vârf. Un transformer nu mai citește cuvânt cu cuvânt: se uită la toate cuvintele deodată și învață, pentru fiecare cuvânt, la care dintre celelalte să fie atent. Pe ideea asta sunt construite modelele mari de text, ca ChatGPT. RNN-urile rămân totuși importante ca să înțelegi ideea de procesare a secvenței și problema memoriei pe distanță lungă, care e exact ce au venit transformerele să rezolve mai bine.

# @practice
- Explorează aritmetica vectorilor (rege - bărbat + femeie) pe un set de embeddings preantrenate.
- Compară FastText cu Word2Vec pe cuvinte flexionate din română.
- Folosește embeddings preantrenate ca trăsături și pune o regresie logistică deasupra.
