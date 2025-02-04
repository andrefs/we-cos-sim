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

## Testing

To run the tests, use:

```bash
npm test
```

## License

This project is licensed under the ISC License.

## Author

André Santos
