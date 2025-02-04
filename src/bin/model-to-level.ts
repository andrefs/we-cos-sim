import { modelToLevel } from '../lib/utils'

if (process.argv.length < 4) {
  console.error('Usage: model-to-level <modelPath> <levelPath>');
  process.exit(1);
}

const modelPath = process.argv[2];
const levelPath = process.argv[3];


modelToLevel(modelPath!, levelPath!, { verbose: true })
  .then(() => console.log('Done'))
  .catch((err) => console.error(err));
