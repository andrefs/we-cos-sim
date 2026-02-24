import { verifyLevelDb } from '../lib/utils';

if (process.argv.length < 3) {
  console.error('Usage: verify-level-db <levelPath> [word1] [word2] ...');
  process.exit(1);
}

const levelPath = process.argv[2] as string;
const words = process.argv.slice(3) as string[];

verifyLevelDb(levelPath, words)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
