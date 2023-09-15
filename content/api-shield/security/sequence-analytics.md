---
pcx_content_type: concept
type: overview
title: Sequence Analytics
weight: 4
layout: list
---

# Sequence Analytics

Sequence Analytics surfaces a subset of important API request sequences found in your API traffic over time.

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

API Shield uses your configured session identifier to build a set of ordered API operations (HTTP host, method, and path) requested per session. We may surface sequences in various lengths depending how API Shield scores the sequences.

### Sequence scoring

API Shield scores sequences by a metric we call Correlation Score. Sequence Analytics displays the top 20 sequences by highest correlation score, and we refer to these as your most important sequences. High-importance sequences contain API requests which are likely to occur together in order.

### Important sequences

You should inspect each of your sequences to understand their correlation scores. High correlation score sequences may consist of rarely used endpoints (potentially anomalous user behavior) as well as commonly used endpoints (likely benign user behavior). Since the endpoints found in these sequences commonly occur together, they represent true usage patterns of your API. 

You should apply all possible API Shield protections to these endpoints ([rate limiting suggestions](/api-shield/security/volumetric-abuse-detection/), [Schema Validation](/api-shield/security/schema-validation/), [JWT Validation](/api-shield/security/jwt-validation/), and [mTLS](/api-shield/security/mtls/)) and check their specific endpoint order with your development team.

For more information, refer to our [blog post](https://blog.cloudflare.com/api-sequence-analytics).

### Repeated sequences

Repeated request sequences show true API usage. As a result, some operations are frequently repeated. Sequences that consist of repeated operations are pushed to the top of the list due to its score.

## Availability

Sequence Analytics is available for all API Shield customers. Pro, Business, and Enterprise customers who have not purchased API Shield can get started by [enabling the API Shield trial](https://dash.cloudflare.com/?to=/:account/:zone/security/api-shield) in the Cloudflare Dashboard or contacting your account manager.

## Limitations

Sequence Analytics currently requires a session identifier in order to build and track sequences made by an API consumer. Ensure that you have set up your session identifier(s) in the Cloudflare dashboard by going to **API Shield** > **Settings**.

Sequences are currently limited to nine operations in length.