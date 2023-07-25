---
pcx_content_type: how-to
title: Investigate threats
weight: 3
---

# Investigate threats

Users can search based on the IP address, domain name, URL or AS number.

The search results will display the following information:

## Domain / URL search

### Overview

+ [Categorization](https://developers.cloudflare.com/cloudflare-one/policies/gateway/domain-categories/): A domain can have multiple categories. Cloudflare displays both the parent category and the detailed child category.

    You can view and [request categorization](/security-center/investigate/change-categorization/) for a domain. Uncategorized domains can also request to have a category added. This request goes through an approval process through the Cloudflare team.

+ IP resolution (current)
+ API curl

### WHOIS

+ Creation date of the domain
+ Most recent update
+ Registrant (if available)
+ Registrar
+ Nameservers (if available)
+ API curl

### Domain history

+ Category
+ Changed On
+ API curl

## IP Address search

### Overview

+ Type (IPv4 / IPv6)
+ ASN Info

### Passive DNS Records

+ Hostname
+ First seen timestamp
+ Last seen timestamp

## AS Number search

### Overview

+ Country, description and Type
+ Domain count and Top 10 domains (if count >10)
+ Subnets
+ API curls (for AS Number overview and for Subnets)

### Geographical distribution

+ Percent of traffic distribution
+ API curl

### Application Level Attacks

+ Distribution of Layer 7 attacks by mitigation techniques deployed to block them
+ Layer 7 attack volume since last scan

### Network Level Attacks

+ Distribution of Layer 3/4 attacks by protocol deployed to block them
+ Layer 3/4 attack volume since last scan

## Analyze

You can upload a JavaScript file to scan for malicious content using the **Analyze** feature.

The scanner provides a percentage of integrity, a general measurement of safety, for the file. You can decide what percentage of integrity is safe to use.

Contact your account team if you are interested in enabling this feature.
