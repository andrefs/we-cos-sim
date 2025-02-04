import { buildCosSimFn, loadVec } from "../lib/cosSim";

if (process.argv.length < 5) {
  console.error('Usage: we-cos-sim <lang> <word1> <word2>');
  process.exit(1);
}

const lang = process.argv[2];
const word1 = process.argv[3];
const word2 = process.argv[4];

loadVec(lang!)
  .then(async (db) => buildCosSimFn(db))
  .then(async (cosSim) => {
    if (!lang || !word1 || !word2) {
      console.error('Usage: we-cos-sim <lang> <word1> <word2>');
      process.exit(1);
    }
    return cosSim(word1, word2);
  })
  .then((result) => console.log(result))
  .catch((err) => console.error(err));




