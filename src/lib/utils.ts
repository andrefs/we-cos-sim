import path from 'node:path';
import fs from 'node:fs/promises';
import { pipeline } from 'stream/promises';
import oldFs from 'node:fs';
import { Readable } from 'node:stream';

export const DEFAULT_MODELS_PATH = path.join(process.env.HOME!, '.fasttext-models');

export async function downloadModel(lang: string, modelsPath = DEFAULT_MODELS_PATH) {
  console.log(`Downloading model for ${lang} (this will take a while)...`);
  const url = `https://dl.fbaipublicfiles.com/fasttext/vectors-crawl/cc.${lang}.300.vec.gz`;

  if (!oldFs.existsSync(DEFAULT_MODELS_PATH)) {
    oldFs.mkdirSync(DEFAULT_MODELS_PATH);
  }

  const modelFile = path.join(modelsPath, `cc.${lang}.300.vec.gz`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download model: ${response.statusText}`);
  }

  const nodeStream = Readable.fromWeb(response.body as any);
  const fileStream = oldFs.createWriteStream(modelFile);
  await pipeline(nodeStream, fileStream);

  console.log(`Model downloaded to ${modelFile}`);
}

