---
title: User Guide
order: 1
---

# Using Cloudflare's Roughtime Service

Our service can be reached at `roughtime.cloudflare.com:2002`. The domain
resolves to an IP address in our [anycast IP
range](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/).  You
can use either IPv4 or IPv6.

Cloudflare-Roughtime is currently in beta. As such, our root public key may
change in the future. We will keep this page up-to-date with the most current
public key. You can also obtain it programmatically using DNS. For example:
```
$ dig TXT roughtime.cloudflare.com | grep -oP 'TXT\s"\K.*?(?=")'
gD63hSj3ScS+wuOeGrubXlq35N1c5Lby/S+T7MNTjxo=
```
