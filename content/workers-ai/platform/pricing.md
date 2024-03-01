---
pcx_content_type: concept
title: Pricing
weight: 3
---

# Pricing

{{<Aside type="note">}}

Workers AI will begin billing for usage on non-beta models after April 1, 2024.

{{</Aside>}}

Workers AI is included in both the [Free and Paid Workers plans](/workers/platform/pricing/) and is priced at **$0.011 / 1K Regular Twitch Neurons** (also known as, Neurons).

Our free allocation allows anyone to use a total of **10K Neurons per day at no charge on our [non-beta models](#non-beta-models)**. You can still enjoy unlimited usage on the beta models in the catalog until they graduate out of beta.

To use more than 10,000 Neurons per day for non-beta models, you need to sign up for the [Workers Paid plan](/workers/platform/pricing/#workers). On Workers Paid, you will be charged at $0.011 / 1K Neurons for any usage above the free allocation of 10K neurons per day for the non-beta models.

You can monitor your Neuron usage in the [Cloudflare Workers AI dashboard](https://dash.cloudflare.com/?to=/:account/ai/workers-ai). To estimate Neurons and costs, use the [pricing calculator](ai.cloudflare.com/#pricing-calculator).

{{<table-wrap>}}

|              | Free <br> allocation | Overage<br>pricing            |
| ------------ | -------------------- | ----------------------------- |
| Workers Free | 10K Neurons per day  | N/A - Upgrade to Workers Paid |
| Workers Paid | 10K Neurons per day  | $0.011 / 1K Neurons           |

{{</table-wrap>}}
All limits reset daily at 00:00 UTC. If you exceed any one of the above limits, further operations will fail with an error.

## What are Neurons?

Neurons are our way of measuring AI outputs across different models. To give you a sense of what you can accomplish with 10K Neurons, you can: generate 100-200 LLM responses, 500 translations, 500 seconds of speech-to-text audio, 10,000 text classifications, or 1,500 - 15,000 embeddings depending on which models you use. Our serverless platform allows you to pay only for what you use without having to worry about renting, managing, or scaling GPUs.

To estimate how many Neurons your requests will consume, use the [pricing calculator](https://ai.cloudflare.com/#pricing-calculator).

![Workers AI Pricing Calculator](images/workers-ai/pricing-calculator.png)

## Non-beta models

Beginning April 1, 2024, Cloudflare will begin charging $0.011/1K Neurons for all usage exceeding 10,000 Neurons per day for the following models:

- bge-small-en-v1.5
- bge-base-en-v1.5
- bge-large-en-v1.5
- distilbert-sst-2-int8
- llama-2-7b-chat-int8
- llama-2-7b-chat-fp16
- mistral-7b-instruct
- m2m100-1.2b
- resnet-50
- whisper

Cloudflare will continue to add Neuron calculations for the other models in the catalog and graduate them out of beta in the future.

## Pricing Comparison

To give you an idea of how pricing compares to other providers, take a look at the tables below.

Note that we only charge in Neurons, the pricing below is **only meant for comparison purposes**.

### Automatic Speech Recognition

{{<table-wrap>}}
| Model | Price per <br> minute of audio |
| ------- | ------------------------- |
| whisper | $0.0022 |
{{</table-wrap>}}

### Image Classification

{{<table-wrap>}}
| Model | Price per image |
| --------- | --------------- |
| Resnet-50 | $0.0000025 |
{{</table-wrap>}}

### Text Classification

{{<table-wrap>}}
| Model | Price per 1M <br> input tokens |
| --------------------- | ------------------------- |
| distilbert-sst-2-int8 | $0.33 |
{{</table-wrap>}}

### Text Embeddings

{{<table-wrap>}}
| Model | Price per 1M <br> input tokens |
| ----------------- | ------------------------- |
| bge-small-en-v1.5 | $0.003 |
| bge-base-en-v1.5 | $0.014 |
| bge-large-en-v1.5 | $0.022 |
{{</table-wrap>}}

### Text Generation

{{<table-wrap>}}
| Model | Price per 1M <br> input tokens | Price per 1M <br> output tokens |
| -------------------- | ------------------------------ | ------------------------------- |
| llama-2-7b-chat-fp16 | $0.56 | $6.66 |
| llama-2-7b-chat-int8 | $0.28 | $1.72 |
| mistral-7b-instruct | $0.28 | $3.33 |
{{</table-wrap>}}

### Translation

{{<table-wrap>}}
| Model | Price per 1M <br> input tokens | Price per 1M <br> output tokens |
| ----------- | ------------------------ | ------------------------- |
| m2m100-1.2b | $0.13 | $0.70 |
{{</table-wrap>}}

## Pricing Example

All users receive free allocation of 10k Neurons a day (totaling to 300k Neurons a month).

If a user uses 50k Neurons per day, every day of the month, the Workers AI usage charge will be $13.20.

_(50k Neurons - 10k included daily Neurons) _ 30 days _ $0.011 / 1k Neurons_
