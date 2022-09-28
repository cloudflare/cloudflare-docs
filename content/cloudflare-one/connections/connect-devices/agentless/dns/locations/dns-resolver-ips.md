---
pcx_content_type: concept
title: DNS resolver IPs and hostnames
layout: single
weight: 2
---

# DNS resolver IPs and hostnames

When you create a location, Gateway assigns IPv4/IPv6 addresses and DoT/DoH hostnames to that location. These are the IP addresses and hostnames you send your DNS queries to for Gateway to resolve.

To view the DNS resolver IPs for a location, navigate to **Gateway** > **Locations** and expand its location card.

![View IP addresses and hostnames assigned to a Gateway location](/cloudflare-one/static/documentation/policies/location-ips.png)

## How Gateway matches queries to locations

Gateway uses different ways to match a DNS query to locations depending on the type of request and network. This is how Gateway determines the location of a DNS query:

![Flowchart for how Gateway determines the location of a DNS query. See below for discussion.](/cloudflare-one/static/documentation/policies/gateway-determine-location-dns.png)

**Step 1**: Gateway checks whether the query was sent using DNS over HTTPS. If yes, Gateway looks up the location by its unique hostname.

**Step 2**: If the query was not sent with DNS over HTTPS, Gateway checks whether it was sent over IPv4. If yes, it looks up the location by the source IPv4 address.

**Step 3**: If the query was not sent over IPv4, it means it was sent over IPv6. Gateway will look up the location associated with the DNS query based on the unique DNS resolver IPv6 address.

## IPv6 address

When you create a location, your location will receive a unique DNS resolver IPv6 address.
This IPv6 address is how Gateway will match DNS queries to locations and apply the appropriate filtering rules.

## IPv4 address

### DNS resolver IP

For queries over IPv4, the default DNS resolver IP addresses are anycast IP addresses, and they are shared across every Cloudflare Zero Trust account.

If you are on the Enterprise plan, you can request a dedicated DNS resolver IPv4 address to be provisioned for a location in lieu of the default anycast addresses. Like IPv6, queries forwarded to that address will be identified using the dedicated DNS resolver IPv4 address.

### Source IP

Gateway uses the public source IPv4 address of your network to identify your location, apply policies and log DNS requests. Unless you have purchased a [dedicated IPv4 resolver IP](#dns-resolver-ip), you must provide source IP addresses for the IPv4 traffic you want to filter with DNS policies. Otherwise, Gateway will not be able to attribute the traffic to your account.

When creating a location, the Zero Trust dashboard automatically identifies the source IP address of the network you are on.

If you are on the Enterprise plan, you have the option of manually entering one or more source IP addresses of your choice. This enables you to create Gateway locations even if you are not connecting from any of those networks' IP addresses.

## DNS over TLS

Each location is assigned a unique hostname for DNS over TLS (DoT). Gateway will identify your location based on its DoT hostname.

## DNS over HTTPS

Each location is assigned a unique hostname for DNS over HTTPS (DoH). Gateway will identify your location based on its DoH hostname.

### DoH subdomain

Each location in Cloudflare Zero Trust has a unique DoH subdomain (previously known as unique ID). If your organization uses DNS policies, you can enter your location's DoH subdomain as part of the WARP client settings.

In the example below, the DoH subdomain is: `65y9p2vm1u`.

| DNS over HTTPS hostname | DoH subdomain |
| --- | --- |
| `https://65y9p2vm1u.cloudflare-gateway.com/dns-query` | `65y9p2vm1u` |

## Send specific queries to Gateway

By default, all queries from a configured location will be sent to its DNS resolver IP address to be inspected by Gateway. You can configure Gateway to only filter queries originating from specific networks within a location:

1. [Create an IP list](/cloudflare-one/policies/filtering/lists/) with the IPv4 and/or IPv6 addresses that your organization will source queries from.
2. Add a [Source IP](/cloudflare-one/policies/filtering/dns-policies/#source-ip) condition to your DNS policies.

For example, if you want to block security threats for specific networks, you could create the following policy:

**Condition 1**:

| Selector            | Operator | Value                            |
| ------------------- | -------- | -------------------------------- |
| Security Categories | In       | Select all categories that apply |

**Condition 2**:

| Selector  | Operator | Value                                                           |
| --------- | -------- | --------------------------------------------------------------- |
| Source IP | In List  | The name of the IP list containing your organization's networks |

**Action**: Block

DNS queries made from IP addresses that are not in your IP list will not be filtered or populate your organization’s [Gateway activity logs](/cloudflare-one/analytics/logs/gateway-logs/).
