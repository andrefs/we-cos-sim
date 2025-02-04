import fs from 'node:fs/promises';

async function loadVec(path: string) {
  const hash: { [word: string]: number[] } = {};
  const vec = await fs.readFile(path, 'utf-8');

  for (const line of vec.split('\n')) {
    const [word, ...vector] = line.split(' ');
    hash[word] = vector.map(Number);
  }
  return hash;
}

export async function buildCosSimFn(path: string) {
  const vec = await loadVec(path);
  return async function cosSim(word1: string, word2: string) {
    const vec1 = vec[word1];
    const vec2 = vec[word2];

    if (!vec1 || !vec2) {
      return 0;
    }

    const dot = vec1.reduce((acc, cur, i) => acc + cur * vec2[i], 0);
    const norm1 = Math.sqrt(vec1.reduce((acc, cur) => acc + cur ** 2, 0));
    const norm2 = Math.sqrt(vec2.reduce((acc, cur) => acc + cur ** 2, 0));
    return dot / (norm1 * norm2);
  };
}




