import { Level } from 'level';
import { getVec } from './utils';

export async function loadVec(path: string) {
  console.log(`Loading vector file from ${path}`);
  const db = new Level<string, Buffer>(path, { valueEncoding: 'buffer' });
  try {
    await db.open();
  }
  catch (err) {
    console.error(`Failed to open LevelDB at ${path}: ${err}`);
    process.exit(1);
  }
  return db;
}

export async function buildCosSimFn(db: Level<string, Buffer>, allowDifferentCase = false) {
  return async function cosSim(word1: string, word2: string) {
    const vec1 = await getVec(db, word1)
      || (allowDifferentCase
        ? await getVec(db, word1.toLowerCase())
        : undefined);
    const vec2 = await getVec(db, word2)
      || (allowDifferentCase
        ? await getVec(db, word2.toLowerCase())
        : undefined);

    if (!vec1 || !vec2) {
      return null;
    }

    return cosine(vec1, vec2);
  };
}


export function cosine(vec1: number[], vec2: number[]) {
  const dot = vec1.reduce((acc, cur, i) => acc + cur * vec2[i]!, 0);
  const norm1 = Math.sqrt(vec1.reduce((acc, cur) => acc + cur ** 2, 0));
  const norm2 = Math.sqrt(vec2.reduce((acc, cur) => acc + cur ** 2, 0));
  return dot / (norm1 * norm2);
}


