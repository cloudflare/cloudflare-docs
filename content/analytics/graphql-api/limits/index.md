---
pcx_content_type: reference
title: Limits
weight: 31
layout: single
---

# Limits

Cloudflare GraphQL API exposes more than 70 datasets representing products with
different configurations and data availability for different zones and accounts
plans.

To support this variety of products, Cloudflare GraphQL API has three layers of
limits:

* global limits
* user limits
* node (dataset) limits

## Global limits

These limits are applied to every query for every plan:

* A zone-scoped query can include up to **10 zones**
* An account-scoped query can include only **1 account**

## User limits

Cloudflare GraphQL API limits the number of GraphQL requests each user can send.
The default quota is **300 GraphQL queries over 5-minute window**. It allows a
user to run at least **1 query every second** or do a burst of 300 queries and
then wait 5 minutes before issuing another query.

That rate limit is applied in addition to the general rate limits enforced by
the Cloudflare API.

## Node limits and availability

Each data node has its limits, such as:

* how far back in time can data be requested,
* the maximum time period (in seconds) that can be requested in one query,
* the maximum number of fields that can be requested in one query,
* the maximum number of records that can be returned in one query.

Node limits are tied to requested `zoneTag` or `accountTag`. Larger plans have
access to a greater selection of datasets and can query over broader historical
intervals.

To get exact boundaries and availability for your zone(s) or account, please
refer to [settings][1].

[1]: </analytics/graphql-api/features/discovery/settings/>
