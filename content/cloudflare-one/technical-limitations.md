---
pcx-content-type: reference
title: Technical limitations
weight: 21
---

# Technical limitations

This page covers limitations for rules, applications, fields, and other features.

## Account defaults

| Feature                                | Limit |
| -------------------------------------- | ----- |
| Applications count                     | 500   |
| Audit Logpush jobs                     | 5     |
| DNS Logpush jobs                       | 5     |
| Email addresses per rule               | 1,000  |
| Group count                            | 300   |
| Group size                             | 1,000  |
| HTTP Logpush jobs                      | 5     |
| IP addresses per rule                  | 1,000  |
| Lists                                  | 100   |
| Locations                              | 250   |
| mTLS root certificates                 | 50    |
| Number of HTTP policies per account    | 500   |
| Number of DNS policies per account     | 500   |
| Number of Network policies per account | 500   |
| Service tokens count                   | 50    |
| IdP count                              | 50    |
| Rules count per application            | 1,000  |
| Rules count per group                  | 1,000  |

## Maximum name lengths

| Feature                | Character Limit |
| -----------------------| ----- |
| Application name       | 350   |
| Group name             | 350   |
| mTLS certificates name | 350   |
| Service token name     | 350   |
| IdP name               | 350   |
| Application URL        | <= 63 |
| Team Domain            | <= 63 |

## Cloudflare Tunnel limitations

All values are per account.

| Feature                                  | Limit |
| ---------------------------------------- | ----- |
| Tunnels per account*                      | 1,000  |
| IP routes per account*                    | 1,000  |
| Active `cloudflared` replicas per tunnel* | 25    |

Features marked by a `*` are soft limits which may be increased on Enterprise accounts. To request a limit increase, contact your account team.