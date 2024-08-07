---
pcx_content_type: concept
title: Limits
weight: 2
---

# Limits

The following limits apply to Hyperdrive configuration, connections, and queries made to your configured origin databases.

| Feature                                        | Limit                                                                                |
| ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| Maximum configured databases                   | 25 per account                                                                       |
| Initial connection timeout                     | 15 seconds                                                                           |
| Idle connection timeout                        | 10 minutes                                                                           |
| Maximum cached query response size             | 50 MB                                                                                |
| Maximum query (statement) duration             | 60 seconds                                                                           |
| Maximum username length                        | 63 characters (bytes) <sup>1</sup>                                                   |
| Maximum database name length                   | 63 characters (bytes) <sup>1</sup>                                                   |
| Maximum origin database connections per region | 10-20                                                                                |
| Maximum potential origin database connections           | 10 \* number of regions serving traffic (approx. ~80 - 100 connections) <sup>2</sup> |

{{<Aside type="note">}}

Hyperdrive does not have a hard limit on the number of concurrent _client_ connections made from your Workers.

As many hosted databases have limits on the number of unique connections they can manage, Hyperdrive attempts to keep number of concurrent pooled connections to your origin database lower.

{{</Aside>}}

<sup>1</sup> This is a limit enforced by PostgreSQL. Some database providers may enforce smaller limits.

<sup>2</sup> Hyperdrive maintains semi-regional connection pools to balance between latency, reliability and overall load on your origin database.

{{<Aside type="note">}}

You can request adjustments to limits that conflict with your project goals by contacting Cloudflare. Not all limits can be increased. To request an increase, submit a [Limit Increase Request](https://forms.gle/ukpeZVLWLnKeixDu7) and we will contact you with next steps.

{{</Aside>}}
