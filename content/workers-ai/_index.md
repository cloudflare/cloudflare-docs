---
title: Overview
order: 0
type: overview
weight: 1
layout: overview
pcx_content_type: overview
meta:
  title: Workers AI
---

{{<heading-pill style="beta" heading="h1">}}Workers AI{{</heading-pill>}}

{{<Aside type="warning">}}
Workers AI is currently in Open Beta and is **not recommended for production data and traffic**, and limits + access are subject to change
{{</Aside>}}

{{<description>}}
Run machine learning models, powered by serverless GPUs, on Cloudflare's global network.
{{</description>}}

Workers AI allows you to run machine learning models, on the Cloudflare network, from your own code -- whether that be from Workers, Pages, or anywhere via REST API.

### Designed for developers

You shouldn't have to understand the ins and outs of machine learning to leverage the power of it. With a focus on developer experience, it's powerful, yet simple, and only a few lines of code to get started:

```js
import { Ai } from '@cloudflare/ai';

const ai = new Ai(env.AI)

const output = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
  prompt: 'Tell me about Workers AI'  
})
```

### Models you know and love

Workers AI comes with a curated set of popular open-source models that *just work*.

Supporting multiple classes of models, here are some AI tasks you can unlock with Workers AI:

* **Natural language processing** - text generation + summarization + classification + translation, similarity analysis, question answering
* **Computer Vision** - image classification, object detection
* **Audio** - Automatic speech recognition (ASR)

### Runs on a global network of GPUs

With the launch of Workers AI, Cloudflare is slowly rolling out GPUs to its global network. This enables you to build and deploy ambitious AI applications that run near your users, wherever they are.

### Batteries included with a vector database

Adding Vectorize, Cloudflare's new vector database, is a single click or CLI command away. This addon enables you to perform tasks such as semantic search, recommendations, anomaly detection or can be used to provide context + memory to an LLM. Head over to the [Vectorize docs](/vectorize) to learn more. 

## Get Started
 
{{<resource-group>}}
 
{{<resource header="Get started - CLI" href="/workers-ai/get-started/workers-wrangler" icon="learning-center-book">}}Build and deploy your first Workers AI app from your **local development environment**{{</resource>}}
 
{{</resource-group>}}

