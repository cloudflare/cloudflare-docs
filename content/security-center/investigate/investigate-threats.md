---
pcx_content_type: how-to
title: Investigate threats
weight: 3
---

# Investigate threats

Customers have the ability to investigate the details of an IP address, domain name, URL, Autonomous System Number (ASN), or JavaScript File. The `Investigate` feature lives in the Security Center at the Cloudflare account level.

## Domain 

A [domain name](https://www.cloudflare.com/learning/dns/glossary/what-is-a-domain-name/) is a string of text that maps to an IP address. They are used to help us remember where websites live. Domain names are purchased through [Registrars](/registrar/) and can be acquired easily by anyone. By searching for a domain name in `Investigate`, Cloudflare will show you details such as categorization and WHOIS details.

In the overview section of the dashboard, we display [domain category](/cloudflare-one/policies/gateway/domain-categories/), the IP addresses it currently resolves to and an example API curl. 

A domain can have multiple categories. Cloudflare displays both the parent category and the detailed child category. You can [request category changes](/security-center/investigate/change-categorization/) for a domain. Uncategorized domains can also request to have a category added. This request goes through an approval process with the Cloudflare team.

### WHOIS

In the WHOIS section, we will dispaly details about the domains registration, such as it's creation date, last updated date, registrant (if available), registrar, and nameservers (if available). We will also supply an example API curl. 

### Domain history

Domain names do not always have a single purpose or owner. If the purpose of the website changes, so will its category. This section will display the changes in the domains category and the date the change occurred.

## IP Address search

An [IP address](https://www.cloudflare.com/learning/dns/glossary/what-is-my-ip-address/) is a unique address that identifies a server. It stands for [Internet Protocol](https://www.cloudflare.com/learning/network-layer/internet-protocol/), which is the set of rules that allows servers to communicate with eachother. 

IP address search allows you to search both [IPv4 and IPv6](https://www.cloudflare.com/learning/dns/glossary/what-is-my-ip-address/) addresses and retreive relevant information such as its pointer record, [AS number](/security-center/investigate/investigate-threats/#as-number-search) and passive DNS records. 

## AS Number search

An Autonomous System Number, more commonly referred to as an AS number, is a group of IP addresses belonging and controlled by a single organization. The entire group of networks have a single unified routing policy. The [Internet Assigned Numbers Authority](https://www.iana.org/) (IANA) is the organization responsible for managing the assignment and distribution of AS numbers. The AS number's routing policies are used by [BGP](https://www.cloudflare.com/learning/security/glossary/what-is-bgp/) which is how Cloudflare's [anycast network](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/) works. 

By searching for an AS number, Cloudflare will return registration data such as its country, description and type. It will also display data such as domain count, top 10 domains and subnets. 

With sufficient data, AS number search results will also return [geographical distributions](/security-center/investigate/investigate-threats/#geographical-distribution), [application level](/security-center/investigate/investigate-threats/#application-layer-attacks) and [network level](/security-center/investigate/investigate-threats/#network-layer-attacks) attacks. 

### Geographical distribution

Geographical distributions will display a breakdown by percentage of traffic in each region.

### Application level attacks

Application level attacks will display a break down of attacks against the AS number by mitigation method, such as [WAF](/waf/), [Rate Limiting](/waf/rate-limiting-rules/) and [other security tools](/products/?product-group=Application+security) offered by Cloudflare. It also displays the change of attack volume since the last scan. 

### Network level attacks

Network level attacks will display a break down of attacks by protocol deployed to block them. It also displays the change of attack volume since the last scan. 

