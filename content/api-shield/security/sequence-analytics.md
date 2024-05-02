---
pcx_content_type: concept
type: overview
title: Sequence Analytics
weight: 4
layout: wide
---

# Sequence Analytics

Sequence Analytics tracks the order of API endpoint requests over time, allowing you to discover how users interact with your API. Sequence Analytics groups and highlights important user journeys (sequences) across your API. You can enforce preferred sequences using [Sequence Mitigation](/api-shield/security/sequence-mitigation/).

## Process

### Sequence building

A sequence is a time-ordered list of HTTP API requests made by a specific visitor as they browse a website, use a mobile app, or interact with a B2B partner via API.

For example, a portion of a sequence made during a bank funds transfer could look like:

| Order | Method | Path | Description |
| --- | --- | --- | --- |
| 1 | `GET` | `/api/v1/users/{user_id}/accounts` | `user_id` is the active user. |
| 2 | `GET` | `/api/v1/accounts/{account_id}/balance` | `account_id` is one of the user’s accounts. |
| 3 | `GET` | `/api/v1/accounts/{account_id}/balance` | `account_id` is a different account belonging to the user. |
| 4 | `POST` | `/api/v1/transferFunds` | This contains a request body detailing an account to transfer funds from, an account to transfer funds to, and an amount of money to transfer. |

API Shield uses your configured {{<glossary-tooltip term_id="session identifier">}}session identifier{{</glossary-tooltip>}} to build a set of ordered API operations (HTTP host, method, and path) requested per session. We may surface sequences in various lengths depending how API Shield scores the sequences.

### Sequence scoring

API Shield scores sequences by a metric called precedence score. Sequence Analytics displays sequences by the highest precedence score. High-scoring sequences contain API requests which are likely to occur together in order. 

Using the example above, a high score means that the last operation in the sequence `POST /api/v1/transferFunds` is highly likely to come after the other operations in sequence `GET /api/v1/users/{user_id}/accounts` followed by `GET /api/v1/accounts/{account_id}/balance`. The scores are probabilities, which API Shield estimates using data from the last 24 hours. 

### Secure your API

To proactively secure your API, you should inspect your highest-scoring sequences. For each high-scoring sequence, you should confirm with your development team if the final operation in the sequence must legitimately always be preceded by the other operations in the sequence. 

Using the above example, if `POST /api/v1/transferFunds` must legitimately always be preceded by `GET /api/v1/users/{user_id}/accounts` and `GET /api/v1/accounts/{account_id}/balance?`, you should create an **Allow** rule in Sequence Mitigation on the final operation of the sequence. 

You should also consider applying other API Shield protections to these endpoints ([rate limiting suggestions](/api-shield/security/volumetric-abuse-detection/), [Schema Validation](/api-shield/security/schema-validation/), [JWT Validation](/api-shield/security/jwt-validation/), and [mTLS](/api-shield/security/mtls/)).

For more information, refer to our [blog post](https://blog.cloudflare.com/api-sequence-analytics).

### Repeated sequences

True API usage shows many successively repeated operations. To facilitate exploration, Sequence Analytics collapses successively repeated operations into one.

## Availability

Sequence Analytics is available for all API Shield customers. Pro, Business, and Enterprise customers who have not purchased API Shield can get started by [enabling the API Shield trial](https://dash.cloudflare.com/?to=/:account/:zone/security/api-shield) in the Cloudflare dashboard or contacting your account manager.

## Limitations

Sequence Analytics currently requires a session identifier in order to build and track sequences made by an API consumer. Ensure that you have set up your session identifier(s) in the Cloudflare dashboard by going to **API Shield** > **Settings**.

Sequences are currently limited to nine operations in length.