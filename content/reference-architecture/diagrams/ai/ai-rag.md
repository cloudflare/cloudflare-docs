---
title: Retrieval Augmented Generation (RAG)
pcx_content_type: reference-architecture-diagram
weight: 1
meta:
  title: "Reference Architecture Diagram: Retrieval Augmented Generation (RAG)"
---

# Retrieval Augmented Generation (RAG) Architecture

## Introduction

Retrieval-Augmented Generation (RAG) is an innovative approach in natural language processing that integrates retrieval mechanisms with generative models to enhance text generation. By incorporating external knowledge from pre-existing sources, RAG addresses the challenge of generating contextually relevant and informative text. This integration enables RAG to overcome the limitations of traditional generative models by ensuring that the generated text is grounded in factual information and context. RAG aims to solve the problem of information overload by efficiently retrieving and incorporating only the most relevant information into the generated text, leading to improved coherence and accuracy. Overall, RAG represents a significant advancement in NLP, offering a more robust and contextually aware approach to text generation.

Examples for application of these technique includes for instance customer service chat bots that use a knowledge base to answer support requests.

In the context of Retrieval-Augmented Generation (RAG), knowledge seeding involves incorporating external information from pre-existing sources into the generative process, while querying refers to the mechanism of retrieving relevant knowledge from these sources to inform the generation of coherent and contextually accurate text. Both are shown below.

## Knowledge Seeding

![Figure 1: Knowledge seeding](/images/reference-architecture/rag-ref-architecture-diagrams/rag-architecture-seeding.svg "Figure 1: Knowledge seeding")

1. **Client upload**: Send POST request with documents to API endpoint.
2. **Input processing**: Process incoming request using [Workers](/workers/) and send messages to [Queues](/queues/) to add processing backlog.
3. **Batch processing**: Use [Queues](/queues/) to trigger a [consumer](/queues/reference/how-queues-works/#consumers) that process input documents in batches to prevent downstream overload.
4. **Embedding generation**: Generate embedding vectors by calling [Workers AI](/workers-ai/) [text embedding models](/workers-ai/models/#text-embeddings) for the documents.
5. **Vector storage**: Insert the embedding vectors to [Vectorize](/vectorize/).
6. **Document storage**: Insert documents to [D1](/d1/) for persistent storage.
7. **Ack/Retry mechanism**: Signal success/error by using the [Queues Runtime API](/queues/reference/javascript-apis/#message) in the consumer for each document. [Queues](/queues/) will schedule retries, if needed.

## Knowledge Queries

![Figure 2: Knowledge queries](/images/reference-architecture/rag-ref-architecture-diagrams/rag-architecture-query.svg "Figure 2: Knowledge queries")

1. **Client query**: Send GET request with query to API endpoint.
2. **Embedding generation**: Generate embedding vectors by calling [Workers AI](/workers-ai/) [text embedding models](/workers-ai/models/#text-embeddings) for the incoming query.
3. **Vector search**: Query [Vectorize](/vectorize/) using the vector representation of the query to retrieve related vectors.
4. **Document lookup**: Retrieve related documents from [D1](/d1/) based on search results from [Vectorize](/vectorize/).
5. **Text generation**: Pass both the original query and the retrieved documents as context to [Workers AI](/workers-ai/) [text generation models](/workers-ai/models/#text-generation) to generation a response.

## Related resources

- [Tutorial: Build a RAG AI](/workers-ai/tutorials/build-a-retrieval-augmented-generation-ai/)
- [Workers AI: Text embedding models](/workers-ai/models/#text-embeddings)
- [Workers AI: Text generation models](/workers-ai/models/#text-generation)
