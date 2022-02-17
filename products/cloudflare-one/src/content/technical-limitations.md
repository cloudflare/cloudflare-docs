---
order: 20
pcx-content-type: reference
---

# Technical limitations

This lists covers limitations for rules, applications, fields, and other features.

All values are per organization.

<TableWrap>

| Feature | Limit |
| ------- | ----- |
| Application name length (characters) | 350 |
| Group name length (characters) | 350 |
| mTLS root certificates count | 50 |
| mTLS certificates name length (characters) | 350 |
| Service Token name length | 350 |
| IdP name length (characters) | 350 |
| Application URL length (characters) | <= 63 |
| Team Domain max length (characters) | <= 63 |

</TableWrap>

## Cloudflare Tunnel limitations

All values are per account.

<TableWrap>

| Feature | Limit |
| ------- | ----- |
| Tunnels per account | 1000 |
| IP routes per account | 1000 |
| Active `cloudflared` replicas per tunnel | 25 |

</TableWrap>

## Account defaults

| Feature | Limit |
| ------- | ----- |
| Applications count | 500 |
| Audit Logpush jobs | 5 |
| DNS Logpush jobs | 5 |
| Email addresses per rule | 1000 |
| Group count | 300 |
| Group size | 1000 |
| HTTP Logpush jobs | 5 |
| IP addresses per rule | 1000 |
| Lists: total number of lists | 100 |
| Locations | 250 |
| Number of HTTP policies per account | 500 |
| Number of DNS policies per account | 500 |
| Number of network policies per account | 500 |
| Service Tokens count | 500 |
| IdP count | 50 |
| Rules count per application | 1000 |
| Rules count per group | 1000 |
