---
pcx_content_type: reference
title: Account limits
weight: 11
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
| Domains per application     | 5     |

## Gateway

| Feature                                   | Limit |
| ----------------------------------------- | ----- |
| DNS policies per account                  | 500   |
| Network policies per account              | 500   |
| HTTP policies per account                 | 500   |
| DNS locations                             | 250   |
| Concurrent streams for HTTP/2 connections | 256   |
| Source IP addresses per proxy endpoint    | 2,000 |
| Lists                                     | 100   |
| Entries per list (Standard users)         | 1,000 |
| Entries per list (Enterprise users)       | 5,000 |
| DNS Logpush jobs                          | 5     |
| HTTP Logpush jobs                         | 5     |

## Data Loss Prevention

| Feature                                  | Limit   |
| ---------------------------------------- | ------- |
| Custom entries                           | 25      |
| Exact Data Match cells per spreadsheet   | 100,000 |
| Custom Wordlist keywords per spreadsheet | 200     |
| Custom Wordlist keywords per account     | 1,000   |

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
