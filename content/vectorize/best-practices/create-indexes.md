---
title: Create indexes
weight: 3
pcx_content_type: concept
---

# Create indexes

Indexes are the "atom" of Vectorize. Vectors are inserted into an index and enable you to query the index for similar vectors for a given input vector.

Creating an index requires three inputs:

- A name, for example `prod-search-index` or `recommendations-idx-dev`.
- The (fixed) [dimension size](#dimensions) of each vector, for example 384 or 1536.
- The (fixed) [distance metric](#distance-metrics) to use for calculating vector similarity.

The configuration of an index cannot be changed after creation.

## Create an index

### wrangler CLI

{{<render file="_vectorize-wrangler-version.md">}}

To create an index with `wrangler`:

```sh
$ npx wrangler vectorize create your-index-name --dimensions=NUM_DIMENSIONS --metric=SELECTED_METRIC
```

To create an index that can accept vector embeddings from Worker's AI's [`@cf/baai/bge-base-en-v1.5`](/workers-ai/models/#text-embeddings) embedding model, which outputs vectors with 768 dimensions, use the following command:

```sh
$ npx wrangler vectorize create your-index-name --dimensions=768 --metric=cosine
```

## Dimensions

Dimensions are determined from the output size of the machine learning (ML) model used to generate them, and are a function of how the model encodes and describes features into a vector embedding.

The number of output dimensions can determine vector search accuracy, search performance (latency), and the overall size of the index. Smaller output dimensions can be faster to search across, which can be useful for user-facing applications. Larger output dimensions can provide more accurate search, especially over larger datasets and/or datasets with substantially similar inputs.

The number of dimensions an index is created for cannot change. Indexes expect to receive dense vectors with the same number of dimensions.

The following table highlights some example embeddings models and their output dimensions:

| Model / Embeddings API                   | Output dimensions | Use-case                   |
| ---------------------------------------- | ----------------- | -------------------------- |
| Workers AI - `@cf/baai/bge-base-en-v1.5` | 768               | Text                       |
| OpenAI - `ada-002`                       | 1536              | Text                       |
| Cohere - `embed-multilingual-v2.0`       | 768               | Text                       |
| Google Cloud - `multimodalembedding`     | 1408              | Multi-modal (text, images) |

{{<Aside type="note" header="Learn more about Workers AI">}}
Refer to the [Workers AI documentation](/workers-ai/models/#text-embeddings) to learn about its built-in embedding models.
{{</Aside>}}

## Distance metrics

Distance metrics are functions that determine how close vectors are from each other. Vectorize indexes support the following distance metrics:

| Metric        | Details                                                                                                                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cosine`      | Distance is measured between `-1` (most dissimilar) to `1` (identical). `0` denotes an orthogonal vector.                                                                                          |
| `euclidean`   | Euclidean (L2) distance. `0` denotes identical vectors. The larger the positive number, the further the vectors are apart.                                                                         |
| `dot-product` | Negative dot product. Larger negative values _or_ smaller positive values denote more similar vectors. A score of `-1000` is more similar than `-500`, and a score of `15` more similar than `50`. |

Determining the similarity between vectors can be subjective based on how the machine-learning model that represents features in the resulting vector embeddings. For example, a score of `0.8511` when using a `cosine` metric means that two vectors are close in distance, but whether data they represent is _similar_ is a function of how well the model is able to represent the original content.

Distance metrics cannot be changed after index creation, and that each metric has a different scoring function.