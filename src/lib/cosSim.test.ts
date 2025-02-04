import { describe, expect, it, beforeAll } from 'vitest';
import { buildCosSimFn } from './cosSim';
import path from 'node:path';

describe('buildCosSimFn', () => {
  it('should return a function that calculates cosine similarity', async () => {
    const cosSim = await buildCosSimFn(path.join(__dirname, './test-model-en.vec.gz'));
    expect(cosSim('the', 'and')).toBeCloseTo(0.437)
  }, 0)
});

