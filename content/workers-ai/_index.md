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

{{<beta>}}Workers AI{{</beta>}}

{{<description>}}
Run machine learning models, powered by serverless GPUs, on Cloudflare's global network.
{{</description>}}

Workers AI allows you to run machine learning models, on the Cloudflare network, from your own code -- whether that be from Workers, Pages, or anywhere via REST API.

### Designed for developers

You shouldn't have to understand the ins and outs of machine learning to leverage the power of it. With a focus on developer experience, it's powerful, yet simple, and only a few lines of code to get started:

```js
import { Ai } from '@cloudflare/ai';

const ai = new Ai(env.AI)

const output = await ai.run({ 
  model: 'llama-2', 
  input: {
    prompt: 'Tell me about Workers AI'  
  }
})
```

### Models you know and love
Workers AI comes with a curated set of popular open-source models that *just work*.

Supporting mutiple classes of models, here are some AI tasks you can unlock with Workers AI:

* **Natural language processing** - text generation + summarization + classification + translation, similarity analysis, question answering
* **Computer Vision** - image classification, object detection
* **Audio** - Automatic speech recognition (ASR)

### Runs on a global network of GPUs
With the launch of Workers AI, Cloudflare is slowly rolling out GPUs to it's global network. This enables you to build and deploy ambitious AI applications that run near your users, wherever they are.

### Batteries inlcuded with a vector database 
Adding Vectorize, Cloudflare's new vector database, is a single click or CLI command away. This addon enables you to perform tasks such as semantic search, reccomendations, anomaly detection or can be used to provide context + memory to an LLM.


## Get started


## Coming soon

* **Expanded catalog - more models**:

* **Metrics and observability**:

## More resources
 
{{<resource-group>}}
 
{{<resource header="Pricing" href="/d1/platform/pricing/" icon="price">}}Learn about D1 pricing. While in Alpha, D1 will be free for all users to test and experiment with.{{</resource>}}
 
{{<resource header="Limits" href="/d1/platform/limits/" icon="documentation-clipboard">}}Learn about what limits D1 has and how to work within them.{{</resource>}}
 
{{</resource-group>}}

