---
pcx_content_type: concept
weight: 1
title: Pricing
---

# Pricing

{{<Aside type="note">}}

Vectorize is currently in public beta and is free to use on [Workers Paid plans](/workers/platform/pricing/#workers).

{{</Aside>}}

Vectorize bills based on:

* **Queried Vector Dimensions**: The total number of vector dimensions queried. If you have 10,000 vectors with 384-dimensions in an index, and make 100 queries against that index, your total queried vector dimensions would sum to (`(10000 + 100) * 384`) 3.878 million.
* **Stored Vector Dimensions**: The total number of vector dimensions stored. If you have 1,000 vectors with 1536-dimensions in an index, your stored vector dimensions sum to 1.56 million.

You are not billed for CPU, memory, "active index hours", or the number of indexes you create. If you are not issuing queries against your indexes, you are not billed for queried vector dimensions.

## Billing metrics 

{{<render file="_vectorize-pricing.md" productFolder="workers">}}

### Usage examples

The following table defines a number of example use-cases and the estimated monthly cost for querying a Vectorize index. These estimates do not include the Vectorize usage that is part of the Workers Free and Paid plans.

| Workload               | Dimensions per vector  | Stored dimensions    | Queries per month    | Calculation         | Estimated total      |
| ---------------------- | ---------------------- | -------------------- | -------------------- | ------------------- | -------------------- |
| Experiment             | 384                    | 5,000 vectors        | 10,000               | `(5000+10000)*384*(0.040/1000000)` | $0.24 / mo <sup>included</sup> |
| Scaling                | 768                    | 25,000 vectors       | 50,000               | `(25000+50000)*768*(0.040/1000000)` | $2.31 / mo <sup>partial</sup> |
| Production             | 768                    | 50,000 vectors       | 200,000               | `(50000+200000)*768*(0.040/1000000)` | $7.68 / mo |
| Large                  | 768                    | 250,000 vectors       | 500,000               | `(250000+500000)*768*(0.040/1000000)` | $23.04 / mo |
| XL                     | 1536                   | 500,000 vectors      | 1,000,000             | `(500000+1000000)*1536*(0.040/1000000)` | $92.16 / mo |

<sup>included</sup> All of this usage would fall into the Vectorize usage included in the Workers Free or Paid plan.

<sup>most</sup> Most of this usage would fall into the Vectorize usage included within the Workers Paid plan.

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

* Do queries I issue from the HTTP API or the wrangler command-line count as billable usage?

Yes: any queries you issue against your index, including from the Workers API, HTTP API and CLI all count as usage.

* Does an empty index, with no vectors, contribute to storage?

No. Empty indexes do not count as stored vector dimensions.
