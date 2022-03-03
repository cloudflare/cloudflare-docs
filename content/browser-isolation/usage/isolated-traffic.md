---
title: Isolated traffic
weight: 3
meta:
  title: Isolated trafficExample isolation policies
---

# Isolated traffic

By default, no traffic is isolated until an Isolation policy has been added within HTTP Policies.

## API traffic is not isolated

Isolation policies are applied to requests that include `Accept: text/html*`. This allows Browser Isolation policies to co-exist with API traffic.

# Example isolation policies

### Block security threats

| Selector         | Operator | Value                  | Action  |
| ---------------- | -------- | ---------------------- | ------- |
| Security Threats | In       | `All security threats` | Isolate |

### Isolate everything

| Selector | Operator      | Value             | Action  |
| -------- | ------------- | ----------------- | ------- |
| Host     | matches regex | `www.example.com` | Isolate |

### Bypass common cert pinning sites

See [Gateway recommended rules](/cloudflare-one/faq/teams-troubleshooting/#i-see-untrusted-certificate-warnings-for-every-page-and-i-am-unable-to-browse-the-internet)
