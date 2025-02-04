# we-cos-sim

we-cos-sim is a tool for calculating the cosine similarity between words using word embeddings. It leverages FastText vectors to provide semantic similarity scores.

## Features

- Download pre-trained FastText word vectors for different languages.
- Convert word vector models to LevelDB format for efficient querying.
- Calculate cosine similarity between words.

## Installation

To install the necessary dependencies, run:

```bash
npm install
```

## Usage in CLI

### Downloading a Model

To download a FastText model for a specific language, use the following command:

```bash
ts-node src/bin/download-model.ts <lang>
```

Replace `<lang>` with the desired language code (e.g., `en` for English).

### Converting Model to LevelDB

To convert a downloaded model to LevelDB format, use:

```bash
ts-node src/bin/model-to-level.ts <modelPath> <levelPath>
```

- `<modelPath>`: Path to the downloaded `.vec.gz` file.
- `<levelPath>`: Path where the LevelDB should be stored.

### Calculating Cosine Similarity

To calculate the cosine similarity between two words, use:

```bash
ts-node src/bin/we-cos-sim.ts <lang> <word1> <word2>
```

- `<lang>`: Language code for the model.
- `<word1>` and `<word2>`: The words to compare.

## Usage as a library

To use `we-cos-sim` as a library in your Node.js project, you can import the necessary functions and use them as follows:

### Loading a Vector Model

First, load a vector model into a LevelDB instance:

```typescript
import { loadVec } from "we-cos-sim/lib/cosSim";

async function loadModel() {
  const db = await loadVec("/path/to/leveldb");
  return db;
}
```

### Calculating Cosine Similarity

Once the model is loaded, you can calculate the cosine similarity between two words:

```typescript
import { buildCosSimFn } from "we-cos-sim/lib/cosSim";

async function calculateSimilarity(db, word1, word2) {
  const cosSim = await buildCosSimFn(db);
  const similarity = await cosSim(word1, word2);
  console.log(
    `Cosine similarity between "${word1}" and "${word2}":`,
    similarity,
  );
}

// Usage
loadModel().then((db) => calculateSimilarity(db, "word1", "word2"));
```

This example demonstrates how to load a model and calculate the cosine similarity between two words using the `we-cos-sim` library.

To run the tests, use:

```bash
npm test
```

## License

This project is licensed under the ISC License.

## Author

André Santos
