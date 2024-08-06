---
title: Magic Transit with CDN
pcx_content_type: how-to
weight: 3
---

# Use BYOIP with Magic Transit and CDN

[Magic Transit](/magic-transit/) customers using [BYOIP](/byoip/) can also benefit from the performance, reliability, and security that Cloudflare offers for HTTP-based applications.

This configuration will use the [IP address management service bindings](/byoip/service-bindings/) to enable Cloudflare [CDN services (Cache)](/cache/) on top of Magic Transit, on individual IP addresses or on a subnet.

## Before you begin

* Consider the service bindings [scope and limitations](/byoip/service-bindings/).
* Plan for what IP addresses you want to configure. If you want to add CDN to multiple contiguous IP addresses, specifying a CIDR block that incorporates all IPs is more efficient.
    {{<details header="Example" >}}

**Magic Transit protected prefix:** `203.0.113.100/24`

**IPs to upgrade to the CDN:**

`203.0.113.16`
`203.0.113.17`
`203.0.113.18`
`203.0.113.19`
`203.0.113.20`
`203.0.113.21`
`203.0.113.22`
`203.0.113.23`

**Best practice:** Add one discrete CDN Service Binding for `203.0.113.16` with a `/29` netmask.

{{</details>}}

* Note that a transitional state will take place for four to six hours after you complete all the steps. During this time, traffic destined to your origins will slowly transition from the Magic-Transit-to-origin pipeline to the CDN-to-origin pipeline.

## 1. Get account information

1. Log in to your Cloudflare account and your account ID and API token.
2. Make a `GET` request to the [List Services](/api/operations/ip-address-management-service-bindings-list-services) endpoint and take note of the `id` associated with the CDN service. Example below.
3. Use the [List Prefixes](/api/operations/ip-address-management-prefixes-list-prefixes) endpoint and take note of the `id` associated with the prefix (`cidr`) you will configure.

## 2. Create service binding


After the four to six-hours propagation state, once the service binding reaches an **active** state, all traffic will flow through the CDN-to-origin pipeline.

## 3. Create address map

* Account-level: for all proxied DNS records across all of the zones within an account

* Zone-Level: all proxied DNS records within a zone

{{<Aside type="note">}}
Subdomain setup alternative
{{</Aside>}}

## 4. Create DNS records

* Proxied

{{<Aside type="note">}}
Total TLS
{{</Aside>}}

## 5.(Optional) Add more layer 7 functionality