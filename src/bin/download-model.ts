import { downloadModel } from '../lib/utils';

if (process.argv.length < 3) {
  console.error('Usage: download-model <lang>');
  process.exit(1);
}

const lang = process.argv[2];
downloadModel(lang!)
  .then(() => console.log('Done'))
  .catch((err) => console.error(err));
