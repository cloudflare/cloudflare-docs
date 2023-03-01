---
source: https://support.cloudflare.com/hc/en-us/articles/115000272247-Billing-for-Cloudflare-Rate-Limiting
title: Billing for Cloudflare Rate Limiting
---

# Billing for Cloudflare Rate Limiting



## Overview

[Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128) automatically identifies and mitigates excessive request rates for specific URLs or for an entire domain.  Rate Limiting protects against [DDoS](https://www.cloudflare.com/learning/ddos/glossary/denial-of-service/) and [Brute-force attacks](https://www.cloudflare.com/learning/bots/brute-force-attack/), and limits access to forum searches, API calls, or resources that involve database-intensive operations at your origin.

Enterprise customers are charged a fixed rate as specified in their contract. All other plans are [billed based on usage](https://support.cloudflare.com/hc/en-us/articles/115004555148), which is reflected in the monthly subscription invoice.

The first 10,000 billable requests across all your websites are free. You will then be charged $0.05 per 10,000 requests thereafter.

For example, if you had a total of 35,000 good/allowed requests matching any rate-limiting rule:

-   1 - 10,000 are free.
-   10,001 - 20,000 cost $0.05
-   20,001 - 30,000 cost $0.05
-   30,001 - 35,000 cost $0.05 (billing is not prorated if you only use a portion of the 10,000 requests paid for)

You will be charged $0.15 in total for Rate Limiting on your next [billing date](https://support.cloudflare.com/hc/en-us/articles/200170286-How-does-CloudFlare-s-billing-for-apps-and-paid-plans-work-#section2). The charge will appear as a line item on your invoice and will list the total number of requests billed.

The first 10,000 requests are across all sites on your account, rather than receiving 10,000 free requests per site: if you have one site with 20,000 requests and another with 30,000, your bill will be $0.20 for the 50,000 total requests, not $0.15.

___

## Rate Limiting billable usage

Rate Limiting is billed based on the number of good (not blocked) requests that match your defined rules across all your websites. Each request is only counted once so you will not be double charged if a request matches multiple rules.

For example, given a rule that matches example.com/ratelimit/\* and blocks clients that send over 30 requests per minute:

-   Client A sends 20,000 requests to example.com/ratelimit/foo at a rate of 10 requests per minute. All requests are allowed.
-   Client B sends 90,000 requests to example.com/ratelimit/bar, usually at a rate of 10 requests per minute, but with bursts over 30 requests per minute. 60,000 of their requests are blocked during the bursts, and 30,000 are allowed when their request rate is lower.
-   Client C sends 20,000 requests to example.com/elsewhere at a rate of 40 requests per minute. While this exceeds the threshold, it doesn't match the rule path, so all 20,000 requests are allowed.

In this example, 50,000 (30,000 + 20,000) requests are billable: clients A and B both sent requests that matched the rule, but some of client B's request were blocked, and those blocked requests were not billed. In total, the cost is (50,000 - 10,000) \* $0.05 = $0.20.

| **Client** | **Request URL** | **Requests** | **Outcome** | **Monthly Cost** |
| --- | --- | --- | --- | --- |
| A | example.com/ratelimit/foo | 20,000 at 10 req/min | URL pattern matches but threshold is not exceeded. All requests pass through. | (2-1)\*$0.05 = $0.05 _Only charge for 10,000 requests because the first 10,000 allowed do not incur any cost._ |
| B |  example.com/ratelimit/bar | 90,000: 60,000 at 30 req/min + 30,000 under 30 req/min | URL pattern matches. Rule blocks 60,000 and allows 30,000 requests. | 3\*$0.05 = $0.15 |
| C |  example.com/elsewhere | 20,000 at 40 req/min | URL pattern doesn't match. Rule doesn't apply. All requests pass through. | $0.00 |
|  **Total to bill:** | $0.20 |
