---
pcx_content_type: reference
title: Account limits
weight: 21
---

# Account limits

This page lists the default account limits for rules, applications, fields, and other features. These limits may be increased on Enterprise accounts. To request a limit increase, contact your account team.

## Access

| Feature                     | Limit |
| --------------------------- | ----- |
| Applications count          | 500   |
| Audit Logpush jobs          | 5     |
| Email addresses per rule    | 1,000 |
| Group count                 | 300   |
| Group size                  | 1,000 |
| IP addresses per rule       | 1,000 |
| mTLS root certificates      | 50    |
| Service tokens count        | 50    |
| IdP count                   | 50    |
| Rules count per application | 1,000 |
| Rules count per group       | 1,000 |

## Gateway

| Feature                                             | Limit |
| --------------------------------------------------- | ----- |
| DNS Logpush jobs                                    | 5     |
| HTTP Logpush jobs                                   | 5     |
| Lists                                               | 100   |
| DNS policies                                        | 500   |
| DNS locations                                       | 250   |
| Number of concurrent streams for HTTP/2 connections | 256   |
| Number of DNS policies per account                  | 500   |
| Number of HTTP policies per account                 | 500   |
| Number of Network policies per account              | 500   |
| Number of source IP addresses per proxy endpoint    | 2,000 |

## Data Loss Prevention

| Feature                | Limit   |
| ---------------------- | ------- |
| Custom entries         | 25      |
| Exact Data Match cells | 100,000 |

## Cloudflare Tunnel

| Feature                                  | Limit |
| ---------------------------------------- | ----- |
| Tunnels per account                      | 1,000 |
| IP routes per account                    | 1,000 |
| Active `cloudflared` replicas per tunnel | 25    |

## Digital Experience Monitoring

| Feature           | Limit |
| ----------------- | ----- |
| Tests per account | 10    |

## Maximum number of characters

| Feature                | Character limit |
| ---------------------- | --------------- |
| Application name       | 350             |
| Group name             | 350             |
| mTLS certificates name | 350             |
| Service token name     | 350             |
| IdP name               | 350             |
| Application URL        | 63              |
| Team domain            | 63              |
