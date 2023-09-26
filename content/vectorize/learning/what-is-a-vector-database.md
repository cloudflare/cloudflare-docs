---
title: Vector databases
pcx_content_type: concept
weight: 2
---

# Vector databases

Vector databases are a key part of building scalable AI-powered applications. They provide a form of “long term memory” on top of an existing ML model. Without a vector database, you would need to train your own model(s) or re-run your dataset through a model before making a query, which would be both slow and expensive.

## Why is a vector database useful?

A vector database enables many tasks: determining what other data (represented as vectors) is "close to" your input query allows you to build multiple different use-cases on top of a vector database, including:

- Semantic search - “find sentences that are similar to the one I input”
- Classification - “classify this input - e.g. tell me what groupings in my data it is closest to”
- Recommendation engines - “return content that is similar to these inputs based on my own product sales or user history”
- Anomaly detection - “is this data point similar to existing data, or different?”

Vector databases can also power [Retrieval Augmented Generation](https://arxiv.org/abs/2005.11401) (RAG) tasks, which allow you to bring additional context to LLMs (Large Language Models) by using the context from a vector search to augment the user prompt.

### Vector search

In a traditional vector search use-case, queries are made against a vector database by passing it a query vector, and having the vector database return a configurable list of vectors with the shortest distance ("most similar") to the query vector.

The step-by-step workflow resembles the below:

1. A developer turns their existing dataset (docs, images, logs stored in R2) into a set of vector embeddings (a one-way representation) by passing them through an ML model that is trained for that data type.
2. The output embeddings are inserted into a Vectorize database index.
3. A search query, classification request or anomaly detection query is also passed through the same ML model, returning an vector embedding representation of the query
4. Vetorize is queried with this embedding, and returns a set of the most similar vector embeddings to the provided query
5. The returned embeddings are used to retrieve the original source objects from dedicated storage (e.g. R2, KV, D1) and returned back to the user.

### Retrieval Augmented Generation

Retrieval Augmented Generation (RAG) is an approach used to improve the context provided to an LLM (Large Language Model) in generative AI use-cases, including chatbot and general question-answer applications. The vector database is used to enhance the prompt passed to the LLM: 

TODO - details

Visit the [RAG tutorial using Workers AI](/workers-ai/tutorials/build-a-retrieval-augmented-generation-ai/) to learn how to combine Workers AI and Vectorize for generative AI use-cases.

<sup>1</sup> You can learn more about the theory behind RAG by reading the [RAG paper](https://arxiv.org/abs/2005.11401)

## Terminology

### Databases and indexes

In Vectorize, a database and an index are the same concept: each index you create is separate from other indexes you create. Vectorize automatically manages optimizing and re-generating the index for you when you insert new data.

### Vectors 

TODO

### Dimensions

TODO - link to other docs

- The floating point numbers in each vector.
- Defined by the machine learning model used to generate embeddings.
- Dimensions map back to the features that the ML model has been trained to assess
- More dimensions ("wider" vectors) may provide more accuracy at the cost of compute and memory resources, as well as latency (speed) of vector search.

Refer to the [dimensions](/vectorize/learning/create-indexes/#dimensions) documentation to learn how to configure the accepted vector dimension size when creating a Vectorize index.

### Distance metrics

The distance metric an index uses for vector search define how it determines how "close" your query vector is to other vectors within the the index.

- Distance metrics determine how the vector search engine assesses “similarity” between vectors.
- Cosine, Euclidean (L2), and Dot Product are the most commonly used distance metrics in vector search.
- The machine learning model and type of embedding you use will typically determine which distance metric is best suited for your use-case.
- Different metrics determine different scoring characteristics. For example, the `cosine` distance metric is well suited to text, sentence similarity and/or document search use-cases; whereas `euclidean` can be better suited to image or speech recognition use-cases.

Refer to the [distance metrics](/vectorize/learning/create-indexes/#distance-metrics) documentation to learn how to configure a distance metric when creating a Vectorize index.
