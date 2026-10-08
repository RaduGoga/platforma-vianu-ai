// AUTO-GENERAT de scripts/build-lessons.mjs — NU edita direct.
// Lecțiile care au notebook în public/notebooks (cele cu cel puțin un bloc de cod).
export const notebooks = new Set<string>([
  "setup-si-ce-e-ai.ro",
  "intro-python.ro",
  "numpy-si-pandas.ro",
  "eda-si-preprocesare.ro",
  "pipeline-complet.ro",
  "supervizat-clasic.ro",
  "evaluare-si-validare.ro",
  "ensembles.ro",
  "nesupervizat-si-reducere-dimensionala.ro",
  "nlp-clasic.ro",
  "cv-clasic-si-augmentari.ro",
  "deep-learning-i.ro",
  "cnn-ii-transfer-learning.ro",
  "setup-si-ce-e-ai.en",
  "intro-python.en",
  "numpy-si-pandas.en",
  "eda-si-preprocesare.en",
  "pipeline-complet.en",
  "supervizat-clasic.en",
  "evaluare-si-validare.en",
  "ensembles.en",
  "nesupervizat-si-reducere-dimensionala.en",
  "nlp-clasic.en",
  "cv-clasic-si-augmentari.en",
  "deep-learning-i.en",
  "cnn-ii-transfer-learning.en"
]);

export const hasNotebook = (slug: string, lang: string) => notebooks.has(`${slug}.${lang}`);
