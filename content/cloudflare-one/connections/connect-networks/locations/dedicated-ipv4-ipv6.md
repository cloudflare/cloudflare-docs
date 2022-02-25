---
order: 1
pcx-content-type: concept
---

# Dedicated destination IPv4 and IPv6 addresses

When you create a location, default destination IP addresses are assigned to the location that users can use to forward queries.

A unique, dedicated destination IPv6 address is provisioned for every location you create. That destination address is how Gateway will identify which account and location to apply DNS filtering rules.

For queries over IPv4, the default destination addresses are anycast IP addresses, and they are shared across every Cloudflare Gateway account. The source IPv4 address the query came from is used to determine which account and location should apply DNS policies to the query. Enterprise customers can request a dedicated IPv4 address to be provisioned for a location in lieu of the default anycast addresses. Like IPv6, queries forwarded to that address will be identified using the dedicated destination IPv4 address.

By default, DNS queries forwarded to a dedicated destination IPv4 or IPv6 address are correlated to an account and the DNS filtering policy applied. Follow these steps if you would like to restrict which IPv4 and IPv6 networks can send queries to your dedicated addresses:

1.  [Create a location](/connections/connect-networks/locations/configuring-a-location) and take note of the destination address. Enterprise customers can obtain a dedicated IPv4 address for a location.
2.  [Create an IP list](/policies/lists) with the IPv4 and/or IPv6 addresses that your organization will source queries from.
3.  Create your DNS policies with an added condition to match where the query came from using the “Source IP” selector.

If you want to block security threats and only allow queries from specific networks to a dedicated IPv4 or IPv6 address, you could create the following policy:

**Policy name**: for example, `Block security threats`

**Condition 1**:

| Selector | Operator | Value |
| -- | -- | -- | -- |
| Security Categories | In | Select all categories that apply |

**Condition 2**:

| Selector | Operator | Value |
| -- | -- | -- |
| Source IP | In List | The name of the IP list containing your organization's networks |

**Action**: Block

DNS queries made to the destination addresses but from IP addresses not included in the IP list will not be filtered or populate your organization’s [Gateway activity logs](/analytics/logs/activity-log).
