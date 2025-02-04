import { describe, expect, it, beforeAll } from 'vitest';
import { buildCosSimFn, cosine, loadVec } from './cosSim';
import path from 'node:path';

const testModel = path.join(__dirname, '../test-model-en.vec.gz');

describe('loadVec', () => {
  it('should load a vector file into a hash', async () => {
    const vec = await loadVec(testModel);
    expect(vec['the']).toHaveLength(300);
    expect(vec['the']![0]).toBeCloseTo(-0.0517);
  })
});

describe('buildCosSimFn', () => {
  it('should return a function that calculates cosine similarity', async () => {
    const cosSim = await buildCosSimFn(testModel);
    expect(cosSim('the', 'and')).toBeCloseTo(0.437)
  }, 0)
});


describe('cosine', () => {
  it('should return the cosine similarity between two vectors', () => {
    expect(cosine([1, 0], [0, 1])).toBeCloseTo(0);
    expect(cosine([1, 0], [1, 0])).toBeCloseTo(1);
    expect(cosine([1, 1], [1, 1])).toBeCloseTo(1);
    expect(cosine([1, 1], [-1, -1])).toBeCloseTo(-1);
    expect(cosine([1, 1], [1, -1])).toBeCloseTo(0);
    expect(cosine([1, 1], [0, 1])).toBeCloseTo(0.707);
    expect(cosine([1, 1], [1, 0])).toBeCloseTo(0.707);
    expect(cosine([1, 1], [0, 0])).toBeNaN();
    expect(cosine([0.3, 0.4], [0.4, 0.3])).toBeCloseTo(0.96);
    expect(cosine([0.1, 0.2], [0.3, 0.4])).toBeCloseTo(0.984);
  });
})
