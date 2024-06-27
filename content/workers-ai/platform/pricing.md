---
pcx_content_type: concept
title: Pricing
weight: 1
---

# Pricing

{{<Aside type="note">}}

Workers AI will begin billing for usage on non-beta models after April 1, 2024.

{{</Aside>}}

Workers AI is included in both the [Free and Paid Workers plans](/workers/platform/pricing/) and is priced at **$0.011 / 1,000 Regular Twitch Neurons** (also known as Neurons).

Our free allocation allows anyone to use a total of **10,000 Neurons per day at no charge on our [non-beta models](#non-beta-models)**. You can still enjoy unlimited usage on the beta models in the catalog until they graduate out of beta.

To use more than 10,000 Neurons per day for non-beta models, you need to sign up for the [Workers Paid plan](/workers/platform/pricing/#workers). On Workers Paid, you will be charged at $0.011 / 1,000 Neurons for any usage above the free allocation of 10,000 Neurons per day for the non-beta models.

You can monitor your Neuron usage in the [Cloudflare Workers AI dashboard](https://dash.cloudflare.com/?to=/:account/ai/workers-ai). To estimate Neurons and costs, use the [pricing calculator](https://ai.cloudflare.com/#pricing-calculator).

|              | Free <br> allocation | Overage<br>pricing            |
| ------------ | -------------------- | ----------------------------- |
| Workers Free | 10,000 Neurons per day  | N/A - Upgrade to Workers Paid |
| Workers Paid | 10,000 Neurons per day  | $0.011 / 1,000 Neurons           |

All limits reset daily at 00:00 UTC. If you exceed any one of the above limits, further operations will fail with an error.

## What are Neurons?

Neurons are our way of measuring AI outputs across different models. To give you a sense of what you can accomplish with 10,000 Neurons, you can: generate 100-200 LLM responses, 500 translations, 500 seconds of speech-to-text audio, 10,000 text classifications, or 1,500 - 15,000 embeddings depending on which models you use. Our serverless model allows you to pay only for what you use without having to worry about renting, managing, or scaling GPUs.

To estimate how many Neurons your requests will consume, use the [pricing calculator](https://ai.cloudflare.com/#pricing-calculator).

![Workers AI Pricing Calculator](images/workers-ai/pricing-calculator.png)

## Non-beta models

Beginning April 1, 2024, Cloudflare will begin charging $0.011/1,000 Neurons for all usage exceeding 10,000 Neurons per day for the following models:

- [bge-small-en-v1.5](/workers-ai/models/bge-small-en-v1.5/)
- [bge-base-en-v1.5](/workers-ai/models/bge-base-en-v1.5/)
- [bge-large-en-v1.5](/workers-ai/models/bge-large-en-v1.5/)
- [distilbert-sst-2-int8](/workers-ai/models/distilbert-sst-2-int8/)
- [llama-2-7b-chat-int8](/workers-ai/models/llama-2-7b-chat-int8/)
- [llama-2-7b-chat-fp16](/workers-ai/models/llama-2-7b-chat-fp16/)
- [mistral-7b-instruct-v0.1](/workers-ai/models/mistral-7b-instruct-v0.1/)
- [m2m100-1.2b](/workers-ai/models/m2m100-1.2b/)
- [resnet-50](/workers-ai/models/resnet-50/)
- [whisper](/workers-ai/models/whisper/)

Cloudflare will continue to add Neuron calculations for the other models in the catalog and graduate them out of beta in the future.

## Pricing comparison

Cloudflare uses Neurons to measure and bill for inference on Workers AI. This may differ from the input-based pricing you might see from other providers. We’ve prepared the below tables to help you understand and evaluate the estimated cost of Neurons and usage on Workers AI compared with the inputs used for the models available in our catalog.

**Please note that the below is provided for informational purposes only.** All conversions are based on Cloudflare’s public fees as of March 1, 2024, and do not include taxes and any other fees.

### Automatic Speech Recognition

| Model | Price per <br> minute of audio |
| ------- | ------------------------- |
| `whisper` | $0.0022 |

### Image Classification

| Model | Price per image |
| --------- | --------------- |
| `Resnet-50` | $0.0000025 |

### Text Classification

| Model | Price per 1M <br> input tokens |
| --------------------- | ------------------------- |
| `distilbert-sst-2-int8` | $0.33 |

### Text Embeddings

| Model | Price per 1M <br> input tokens |
| ----------------- | ------------------------- |
| `bge-small-en-v1.5` | $0.003 |
| `bge-base-en-v1.5` | $0.014 |
| `bge-large-en-v1.5` | $0.022 |

### Text Generation

On April 2, 2024, we updated pricing for our `mistral-7b-instruct` models to be 17x cheaper and `llama-2-7b-chat-int8` to be 7x cheaper. The pricing table below reflects the new pricing, but you can take a look at the [archived pricing](/workers-ai/platform/pricing/#archived-pricing) to see how pricing has changed.

| Model | Price per 1M <br> input tokens | Price per 1M <br> output tokens |
| -------------------- | ------------------------------ | ------------------------------- |
| `llama-2-7b-chat-fp16` | $0.56 | $6.66 |
| `llama-2-7b-chat-int8` | $0.16 | $0.24 |
| `mistral-7b-instruct` | $0.11 | $0.19 |

### Translation

| Model | Price per 1M <br> input tokens | Price per 1M <br> output tokens |
| ----------- | ------------------------ | ------------------------- |
| `m2m100-1.2b` | $0.13 | $0.70 |

## Pricing Example

All users receive free allocation of 10k Neurons a day (totaling to 300k Neurons a month).

If a user uses 50k Neurons per day, every day of the month, the Workers AI usage charge will be $13.20.

`(50k Neurons - 10k included daily Neurons) * 30 days * $0.011 / 1k Neurons = $13.20`

## Archived Pricing
As we find optimizations for our inference platform, we pass on these optimizations to our customers. You can refer to the archived pricing below to see how pricing has changed.

Before April 2, 2024:

| Model | Price per 1M <br> input tokens | Price per 1M <br> output tokens |
| -------------------- | ------------------------------ | ------------------------------- |
| `llama-2-7b-chat-int8` | $0.28 | $1.72 |
| `mistral-7b-instruct` | $0.28 | $3.33 |