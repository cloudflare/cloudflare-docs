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
| Maximum username length                        | 63 characters (bytes) <sup>2</sup>                                                   |
| Maximum database name length                   | 63 characters (bytes) <sup>2</sup>                                                   |
| Maximum origin database connections per region | 10-20                                                                                |
| Maximum potential origin connections           | 10 \* number of regions serving traffic (approx. ~80 - 100 connections) <sup>3</sup> |

<sup>1</sup> Enterprise customers can request an increase. Submit a [Limit Increase Request Form](https://docs.google.com/forms/d/e/1FAIpQLSd_fwAVOboH9SlutMonzbhCxuuuOmiU1L_I5O2CFbXf_XXMRg/viewform) and we will contact you with the next steps.

<sup>2</sup> This is a limit enforced by PostgreSQL. Some database providers may enforce smaller limits.

<sup>3</sup> Hyperdrive maintains semi-regional connection pools to balance between latency, reliability and overall load on your origin database.

{{<Aside type="note">}}

You can request adjustments to limits that conflict with your project goals by contacting Cloudflare. Not all limits can be increased. To request an increase, submit a [Limit Increase Request](https://forms.gle/ukpeZVLWLnKeixDu7) and we will contact you with next steps.

{{</Aside>}}
