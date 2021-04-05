---
title: Isolated traffic
order: 2
---

# Isolated traffic
By default, no traffic is isolated until an Isolation policy has been added within HTTP Policies.

## API traffic is not isolated
Isolation policies are applied to requests that include `Accept: text/html*`. This allows Browser Isolation policies to co-exist with API traffic.

# Example isolation policies

### Block security threats
| Selector | Operator | Value | Action |
| - | - | - | - |
| Security Threats | In | `All security threats` | Isolate

### Isolate everything
| Selector | Operator | Value | Action |
| - | - | - | - |
| Host | matches regex | `www.example.com` | Isolate

### Bypass common cert pinning sites

See [Gateway recommeded rules](https://developers.cloudflare.com/gateway/connecting-to-gateway/Troubleshooting#im-using-a-common-application-and-it-seems-unable-to-connect-when-i-inspect-http-traffic-or-presents-an-untrusted-certificate-error)

