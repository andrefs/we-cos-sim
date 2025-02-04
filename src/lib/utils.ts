import path from 'node:path';
import { Level } from 'level';
import oldFs from 'node:fs';
import { Readable } from 'node:stream';
import { createInterface } from 'node:readline';
import { createGunzip } from 'node:zlib';

const levelFolder = 'level';
const modelsFolder = 'fasttext-vecs';
export const DEFAULT_WECOSSIM_PATH = path.join(process.env.HOME!, '.we-cos-sim');
export const DEFAULT_LEVEL_PATH = path.join(DEFAULT_WECOSSIM_PATH, levelFolder);

function makeFolders(rootFolder: string) {

  if (!oldFs.existsSync(rootFolder)) {
    oldFs.mkdirSync(rootFolder);
  }
  if (!oldFs.existsSync(path.join(rootFolder, levelFolder))) {
    oldFs.mkdirSync(path.join(rootFolder, levelFolder));
  }
}

export async function downloadModel(lang: string, rootFolder = DEFAULT_WECOSSIM_PATH) {
  const url = `https://dl.fbaipublicfiles.com/fasttext/vectors-crawl/cc.${lang}.300.vec.gz`;
  makeFolders(rootFolder);

  console.log(`Downloading model for ${lang} (this will take a while)...`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download model: ${response.statusText}`);
  }

  const nodeStream = Readable.fromWeb(response.body as any);
  const rl = createInterface({ input: nodeStream });

  const levelFile = path.join(rootFolder, levelFolder, `cc.${lang}.300.vec.lvl`);
  console.log(`Writing level file to ${levelFile}`);
  const db = new Level<string, Buffer>(levelFile, { valueEncoding: 'buffer' });

  for await (const line of rl) {
    const parts = line.split(' ');
    if (parts.length < 2) {
      continue;
    }
    const key = parts[0];
    const vector = new Float32Array(parts.slice(1).map(Number));
    const buffer = Buffer.from(vector.buffer); // Convert Float32Array to Buffer

    await db.put(key!, buffer);
  }

  console.log(`Finished writing level file to ${levelFile}`);
}

export async function getVec(db: Level<string, Buffer>, word: string) {
  const buf = await db.get(word);
  return buf ? [...new Float32Array(buf.buffer)] : null;
}


export async function modelToLevel(modelPath: string, levelPath: string, { verbose = false } = {}) {
  const db = new Level<string, Buffer>(levelPath, { valueEncoding: 'buffer' });
  const gunzip = createGunzip();
  const stream = oldFs.createReadStream(modelPath).pipe(gunzip);
  const rl = createInterface({ input: stream });

  for await (const line of rl) {
    const parts = line.split(' ');
    if (parts.length < 2) {
      continue;
    }
    const key = parts[0];
    const vector = new Float32Array(parts.slice(1).map(Number));
    if (verbose) {
      console.log(`Writing key ${key}: [${vector.slice(0, 5).join(', ')}...]`);
    }
    const buffer = Buffer.from(vector.buffer); // Convert Float32Array to Buffer

    await db.put(key!, buffer);
  }

  db.close();

  return db;
}
