---
pcx_content_type: reference
title: Glossary
weight: 1
---

# Glossary

Here is a list of terms and concepts to help you understand Radar and the information shown.

## Application-level Attacks

Layer 7 threat information based on requests that were blocked. Including the most frequent blocking reasons as well as the development of blocked requests over time.

## Autonomous Systems

The Internet is a network of networks, and autonomous systems are the networks that make up the Internet. More specifically, an autonomous system (AS) is a large network or group of networks that has a unified routing policy - the process by which a path through one or more networks is chosen.

Data packets hop from one AS to another until they reach their final destination. Every computer or device that connects to the Internet is connected to an AS. ISPs have one or more ASs, and each AS is assigned an official Autonomous System Number (ASN) for use in Border Gateway Protocol (BGP) routing. For example, Cloudflare's ASN is AS13335. Learn more [here](https://www.cloudflare.com/en-gb/learning/network-layer/what-is-an-autonomous-system/).

## BGP Announcements

Border Gateway Protocol (BGP) is the routing protocol for the Internet. Much like the post office processing mail, BGP picks the most efficient routes for delivering Internet traffic. A BGP announcement is a way for an AS to say to another, "When you receive traffic to this network prefix, please send it to me". That message is then processed and (possibly) forwarded to other ASes, allowing for every AS in the path to learn where to send traffic to that network prefix. Learn more [here](https://www.cloudflare.com/en-gb/learning/security/glossary/what-is-bgp/).

## Certificates

Encryption is a critical part of a safe Internet. SSL/TLS is the standard security technology for establishing an encrypted link between a server and a browser.

In Cloudflare Radar, you can view all SSL certificates issued for a given site by a trusted Certificate Authority that are listed in active certificate transparency logs.

You can review the certificates issued for your domain name to ensure that there have been no incorrect or fraudulent issuances of certificates associated with your domains. You can also sign up to receive alerts from our certificate transparency monitor in the [Cloudflare Dashboard](https://dash.cloudflare.com/).

## Content Categories

Cloudflare uses a variety of data sources to categorize domains. Using Cloudflare Radar, you can view the content categories associated with a given domain. Cloudflare customers, using Cloudflare Gateway or 1.1.1.1 for Families, can decide to block certain categories, like "Adult Content", in addition to security threats like malware and phishing.

In some cases, a domain can be miscategorized. For example, a social media site might be categorized as "Shopping & Auctions". If you believe a domain is miscategorized, or a domain has not yet been categorized, please provide your suggested category [using this form](https://radar.cloudflare.com/categorization-feedback) to bring it to our attention.

## Geographical Distribution

Countries contributing traffic to this AS, and their relative contribution as percentage of the total AS traffic seen by Cloudflare. The total traffic includes other ASes through which traffic flows to their final destinations, as well as any devices that connect directly to this AS.

## Global Traffic Ranking Trend

The Cloudflare 100k ranking is a measure of a website or web application's relative popularity. This ranking is calculated using a range of data that Cloudflare has about global Internet traffic patterns. The most popular website or web application, based on our ranking methodology, is ranked #1.

This chart shows the Cloudflare 100k daily global ranking for this site over the last 7 / 30 days.

## Internet traffic change

The change in the amount of Internet traffic within the selected time range, based on data from our network.

## Network-level DDoS Attacks

Attacks mitigated by our Level 3 and 4 Denial of Service Attack prevention systems. We show the most used attack vectors as well as the change in attack volume over the selected time range.

## Traffic Type Filter

* **Human Only Traffic**: Traffic that our algorithms determine as being due to Human activity.

* **Automated Only Traffic**: Traffic that our algorithms determine as being due to Bot and Automated Script activity.

* **All Traffic**: Use all traffic, which includes both Human activity and Automated activity.

## Trending Domains & Most Popular Domains

Our global and country-level domain ranking is calculated using aggregated data that Cloudflare has about global Internet traffic patterns. The most popular website or web application, based on our ranking methodology, is ranked #1.

The top trending domains are calculated based on a combination of domain popularity, the percentage change in traffic patterns, and the change in rank over the selected time period.

Domains for a given web application are grouped together and are displayed in the ranking table using their best known domain. For example, TikTok, which shows up in the ranking data as 'tiktok.com', includes all domains associated with TikTok, such as 'tiktokcdn.com' and 'tiktokv.com'.

Domains categorized as pornography or content servers have been excluded from our ranking.

Domain-specific trend information, such as rankings, is made available for all websites, whether or not the website is operated by a Cloudflare customer. This information is derived from aggregated data from the 1.1.1.1 Public DNS Resolver that has been anonymized in accordance with our privacy commitments for the resolver and external data sources. Any other information obtained from the Cloudflare network (e.g., Internet traffic changes in a region) is based on aggregated data that contains no personal or customer identifying information.

## Trends

Based on the meta data we collect on HTTP requests we are able to to show trends over a diverse set of data points. This includes the distribution of mobile vs. desktop traffic. The percentage of traffic detected as coming from bots and the distribution of browsers. Also we are visualising some ongoing developments such as the usage of HTTPS or the share of IPv6.

It also includes graphs about interesting developments in Internet technologies like the adoption rate of operating systems such as iOS 14.

## Verified Bots

Each entry on the list of Verified Bots exists because a corresponding IP was seen associated with a verified bot in the last 30 days. Bot traffic describes any non-human traffic to a website or an app. A verified bot is not necessarily good or bad.

Some bots are useful, such as search engine bots that index content for search or customer service bots that help users. Other bots may be used to perform malicious activities, such as break into user accounts or scan the web for contact information to send spam.

## Visitor Location

The data displayed on domain-specific geographic traffic patterns is based solely on data from our recursive DNS services. All data displayed is in accordance with our privacy policies and commitments. This data may include attack traffic and cross-origin requests.

## WHOIS

WHOIS is a standard for publishing the contact and nameserver information for all registered domains. Each registrar maintains their own WHOIS service. Anyone can query the registrar's WHOIS service to reveal the data behind a given domain.