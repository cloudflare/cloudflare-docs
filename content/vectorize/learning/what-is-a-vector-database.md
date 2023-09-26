---
title: Vector databases
pcx_content_type: concept
weight: 2
---

# Vector databases

Vector databases are a key part of building scalable AI-powered applications. They provide a form of “long term memory” on top of an existing ML model. Without a vector database, you would need to train your own model(s) or re-run your dataset through a model before making a query, which would be both slow and expensive.

## Terminology

### Databases and indexes

In Vectorize, a database and an index are the same concept: each index you create is separate from other indexes you create. Vectorize automatically manages optimizing and re-generating the index for you when you insert new data.

### Vectors 

TODO

### Dimensions

TODO - link to other docs

### Distance metrics

TODO - link to other docs

## Why is a vector database useful?

A vector database enables many tasks: determining what other data (represented as vectors) is "close to" your input query allows you to build multiple different use-cases on top of a vector database, including:

- Semantic search - “find sentences that are similar to the one I input”
- Classification - “classify this input - e.g. tell me what groupings in my data it is closest to”
- Recommendation engines - “return content that is similar to these inputs based on my own product sales or user history”
- Anomaly detection - “is this data point similar to existing data, or different?”

Vector databases can also power [Retrieval Augmented Generation](https://arxiv.org/abs/2005.11401) (RAG) tasks, which allow you to bring additional context to LLMs (Large Language Models) by using the context from a vector search to augment the user prompt.

## Types of embeddings

Text, images, audio, etc.



