import { modelToLevel } from '../lib/utils';

const args = process.argv.slice(2);
const verboseIndex = args.findIndex((a) => a === '-v' || a === '--verbose' || a === '-p' || a === '--progress');
const verbose = verboseIndex >= 0 ? (args[verboseIndex] === '-p' || args[verboseIndex] === '--progress' ? 'progress' : true) : false;

if (verboseIndex >= 0) {
  args.splice(verboseIndex, 1);
}

if (args.length < 2) {
  console.error('Usage: model-to-level <modelPath> <levelPath> [-v|--verbose|-p|--progress]');
  process.exit(1);
}

const [modelPath, levelPath] = args as [string, string];

modelToLevel(modelPath, levelPath, { verbose })
  .then(() => console.log('Done'))
  .catch((err: Error) => console.error(err));
