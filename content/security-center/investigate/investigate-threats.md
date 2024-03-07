---
pcx_content_type: how-to
title: Investigate threats
weight: 3
---

# Investigate threats

Customers have the ability to investigate the details of an IP address, domain name, URL, Autonomous System Number (ASN), or JavaScript file. The Investigate feature can be found in your Cloudflare account's Security Center and in [Cloudflare Radar](https://radar.cloudflare.com/scan). 

You can search with Investigate by [IP address](/security-center/investigate/investigate-threats/#ip-address), [domain](/security-center/investigate/investigate-threats/#domain), [URL](/security-center/investigate/investigate-threats/#url) and [AS number](/security-center/investigate/investigate-threats/#as-number). 

{{<Aside>}}

Search methods are also available through the [API](/security-center/intel-apis/).

{{</Aside>}}

## IP Address

An [IP address](https://www.cloudflare.com/learning/dns/glossary/what-is-my-ip-address/) is a unique address that identifies a server. It stands for [Internet Protocol](https://www.cloudflare.com/learning/network-layer/internet-protocol/), which is the set of rules that allows servers to communicate with each other. 

IP address search allows you to search both [IPv4 and IPv6](https://www.cloudflare.com/learning/dns/glossary/what-is-my-ip-address/) addresses and retrieve relevant information such as their pointer records, AS numbers and passive DNS records. 

## Domain

A [domain name](https://www.cloudflare.com/learning/dns/glossary/what-is-a-domain-name/) is a string of text that maps to an IP address. They are used to help us remember where websites are hosted. Domain names are purchased through [Registrars](/registrar/) and can be acquired easily by anyone. 

By searching for a domain name, Cloudflare will provide an overview with the domain's category and IP addresses it currently resolves to.

{{<Aside>}}

A domain can have multiple categories. Cloudflare displays both the parent category and the detailed child category. You can [request category changes](/security-center/investigate/change-categorization/) for a domain. Miscategorized domains can also request to have a category added. This request goes through an approval process with the Cloudflare team.

{{</Aside>}}

As part of the domain search results, we show the WHOIS details and a history of its category changes over time. 

## AS Number

An [AS number](https://www.cloudflare.com/learning/network-layer/what-is-an-autonomous-system/) is a group of IP addresses belonging and controlled by a single organization. The entire group of networks have a single unified routing policy. The [Internet Assigned Numbers Authority](https://www.iana.org/) (IANA) is the organization responsible for managing the assignment and distribution of AS numbers. The AS number's routing policies are used by [BGP](https://www.cloudflare.com/learning/security/glossary/what-is-bgp/) which is how Cloudflare's [anycast network](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/) works. 

By searching for an AS number, Cloudflare will return registration data such as its country, description and type. It will also display data such as domain count, top 10 domains and subnets. 

With sufficient data, AS number search results will also return the geographical distribution of traffic in its network, application level attacks and network level attacks, each broken down by Cloudflare mitigation techniques and network protocols, respectively. 

## URL

By searching for a URL, we will provide a list of recent scan reports for that specific URL, limited to the past 30 days. You can view a previously generated report or scan again to generate a new one.

Different Cloudflare plans will have different [scan limitations](/security-center/investigate/scan-limits/).

### Visibility

When generating a new scan report, the default visibility is set to `Unlisted`, but you have the option to set it to `Public`. By choosing `Public`, the generated scan will be available to all Cloudflare dashboard and Cloudflare Radar users alike, which will increase awareness of potentially malicious websites for others.

We recommend choosing `Unlisted` if you are scanning infrastructure that is not intended to be shared with the wider Cloudflare community.

### Filters

While viewing the most recent scans, you have the ability to filter scan reports initiated from your Cloudflare account, `All account scans`, or `All global scans`, which includes all `Public` scans.
