import fs from 'node:fs/promises';
import { createGunzip } from 'node:zlib';

export async function loadVec(path: string) {
  const hash: { [word: string]: number[] } = {};

  const file = await fs.readFile(path);
  const gunzip = createGunzip();
  const vec = await new Promise<string>((resolve) => {
    let data = '';
    gunzip.on('data', (chunk) => data += chunk);
    gunzip.on('end', () => resolve(data));
    gunzip.end(file);
  });

  for (const line of vec.split('\n')) {
    const [word, ...vector] = line.split(' ');
    hash[word!] = vector.map(Number);
  }
  return hash;
}

export async function buildCosSimFn(path: string, allowDifferentCase = false) {
  const vec = await loadVec(path);
  return function cosSim(word1: string, word2: string) {
    const vec1 = vec[word1] || (allowDifferentCase ? vec[word1.toLowerCase()] : undefined);
    const vec2 = vec[word2] || (allowDifferentCase ? vec[word2.toLowerCase()] : undefined);

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


