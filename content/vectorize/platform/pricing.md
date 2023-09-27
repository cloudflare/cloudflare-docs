---
pcx_content_type: concept
weight: 10
title: Pricing
---

# Pricing

{{<Aside type="note">}}

Vectorize is currently in public beta and is free to use on paid [Workers plans](/workers/platform/pricing/#workers).

{{</Aside>}}

Vectorize bills based on:

* **Queried Vector Dimensions**: The total number of vector dimensions queried. If you have 10,000 vectors with 384-dimensions in an index, and make 100 queries against that index, your total queried vector dimensions would sum to (`(10000 + 100) * 384`) 3.878 million.
* **Stored Vector Dimensions**: The total number of vector dimensions stored. If you have 1,000 vectors with 1536-dimensions in an index, your stored vector dimensions sum to 1.56 million.

You are not billed for CPU, memory, "active index hours", or the number of indexes you create. If you are not issuing queries against your indexes, you are not billed for queried vector dimensions.

## Billing metrics 

{{<render file="_vectorize-pricing.md" productFolder="workers">}}

## Frequently Asked Questions

Frequently asked questions related to Vectorize pricing:

* When will Vectorize start charging me?

We intend to enable billing for Vectorize usage in January 2024. 

* Will Vectorize always have a free tier? 

Yes, the [Workers free tier](/workers/platform/pricing/#workers) will always include the ability to prototype and experiment with Vectorize for free.

* What happens if I exceed the monthly included reads, writes and/or storage on the paid tier?

You will be billed for the additional reads, writes and storage according to [Vectorize's pricing](#billing-metrics).

* Does Vectorize charge for data transfer / egress?

No.

* Do queries I issue from the the HTTP API or the wrangler command-line count as billable usage?

Yes: any queries you issue against your index, including from the Workers API, HTTP API and CLI all count as usage.

* Does an empty index, with no vectors, contribute to storage?

No. Empty indexes do not count as stored vector dimensions.
