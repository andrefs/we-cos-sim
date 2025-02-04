import { describe, expect, it } from 'vitest';
import { buildCosSimFn, cosine, loadVec } from './cosSim';
import path from 'node:path';
import { getVec } from './utils';


const testLevel = path.join(__dirname, '..', '/test/en-lvl');
const db = await loadVec(testLevel);
let cosSim = await buildCosSimFn(db);


describe('loadVec', () => {
  it('should load a vector file into a LevelDB', async () => {
    const vec = await getVec(db, 'the');
    expect(vec).toHaveLength(300);
    expect(vec![0]).toBeCloseTo(-0.0517);
  })
});

describe('buildCosSimFn', () => {
  it('should return a function that calculates cosine similarity', async () => {
    const fn = await buildCosSimFn(db);
    expect(await fn('the', 'and')).toBeCloseTo(0.437)
  }, 0)

  it('should return 1 for the same word', async () => {
    expect(await cosSim('the', 'the')).toBeCloseTo(1);
  })

  it('should return a high value for similar words', async () => {
    expect(await cosSim('airbnb', 'AirBnB')).toBeCloseTo(0.9281)
  })


  it('should return null for words not in the model', async () => {
    expect(await cosSim('the', 'asdf')).toBeNull();
  })

  it('should return null if cannot find word matching case', async () => {
    expect(await cosSim('the', 'aIrbNb')).toBeNull();
  })

  it('should return the cosine similarity for words with different case if allowDifferentCase is true', async () => {
    const fn = await buildCosSimFn(db, true);
    expect(await fn('the', 'aIrbNb')).toBeCloseTo(0.0800);
  })
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
