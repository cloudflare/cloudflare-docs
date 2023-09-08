---
pcx_content_type: reference
title: Glossary
weight: 6
---

# Glossary

This page provides a list of terms and concepts to help you understand Radar and the information shown.

## Application-level Attacks

Layer 7 attack information based on mitigated requests, including the most frequent mitigation techniques as well as the trend of mitigated request volume over time. Selected location or ASN is the source of the mitigated requests.

## Autonomous Systems

The Internet is a network of networks, and autonomous systems are the networks that make up the Internet. More specifically, an autonomous system (AS) is a large network or group of networks that has a unified routing policy - the process by which a path through one or more networks is chosen.

Data packets hop from one AS to another until they reach their final destination. Every computer or device that connects to the Internet is connected to an AS. ISPs have one or more ASes, and each AS is assigned an official Autonomous System Number (ASN) for use in Border Gateway Protocol (BGP) routing. For example, Cloudflare's ASN is AS13335. Learn more [here](https://www.cloudflare.com/en-gb/learning/network-layer/what-is-an-autonomous-system/).

## BGP Announcements

Border Gateway Protocol (BGP) is the routing protocol for the Internet. Much like the post office processing mail, BGP picks the most efficient routes for delivering Internet traffic. A BGP announcement is a way for an AS to say to another, "When you receive traffic to this network prefix, please send it to me". That message is then processed and (possibly) forwarded to other ASes, allowing for every AS in the path to learn where to send traffic to that network prefix. Learn more [here](https://www.cloudflare.com/en-gb/learning/security/glossary/what-is-bgp/).

## BGP Route Leaks

[BGP route leaks](https://www.rfc-editor.org/rfc/rfc7908.html) are defined as the propagation of routing announcements beyond their intended scope.
In Cloudflare Radar, you can inspect the detected route leak events on the corresponding autonomous system number (ASN) pages. The columns in the table are defined as follows:

* `From`: The autonomous system (AS) from which the routes are learned from.
* `By`: The AS that leaked the routes, or the leaker.
* `To`: The AS that received and propagated the leaked routes.
* `Start` and `End`: The starting and ending time of a route leak event.
* `BGP Msgs.`: The number of BGP announcements that contain leaked routes.
* `Prefixes`: The number of IP prefixes a route leak event affects.
* `Origins`: The number of origin ASes a route leak event affects.
* `Vantage Points`: The number of route collectors that observed a route leak event.

Learn more about our route leak detection system design and usages  in [How we detect route leaks and our new Cloudflare Radar route leak service](https://blog.cloudflare.com/route-leak-detection-with-cloudflare-radar/) blog post.

## BGP Origin Hijacks

[BGP origin hijack](https://en.wikipedia.org/wiki/bgp_hijacking) is one type of BGP anomaly where networks falsely announce
ownership for groups of IP addresses (prefixes) that they do not own, control, or route to. A BGP origin hijack can redirect Internet traffic to the hijacker from its
legitimate destination, causing data loss with potential leak of private/confidential information.

In Cloudflare Radar, you can inspect the detected BGP origin hijack events in the "BGP Origin Hijacks" table. The columns
of the table are defined as follows:

* `ID`: Event ID, clickable and navigates to the event details page.
* `Detected Origin`: The AS that originated the prefixes at the time of detection, potentially being a BGP hijacker.
* `Expected Origin(s)`: The AS(es) that are expected to originate the corresponding prefixes based on various evidences.
* `Start Time (UTC)` and `Duration`: The detected timestamp in UTC with a human-readable time duration for how long the event lasted. Ongoing events will not have a duration value, indicated by the `--` sign.
* `BGP Messages`: The number of BGP messages that contain the detected anomaly.
* `Prefixes`: The prefixes hijacked during the event, showing only one full prefix due to table space limitation.
* `Confidence`: The level of confidence that we have on the event being a true hijacks. Values can be `High`, `Medium`, or `Low`.
* `Tags`: The relevant evidence presented as short tags, presenting key facts we compiled using additional data sources, such as RPKI validation results or network relationship.

You can also access the detection result programmatically via our [public API](https://developers.cloudflare.com/api/operations/radar-get-bgp-hijacks-events) ([CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) license).

## Certificates

Encryption is a critical part of a safe Internet. SSL/TLS is the standard security technology for establishing an encrypted link between a client and a server.

In Cloudflare Radar, you can view all certificates issued for a given domain by a trusted Certificate Authority that are listed in active certificate transparency logs.

You can review the certificates issued for your domain name to ensure that there have been no incorrect or fraudulent issuances of certificates associated with your domains. You can also sign up to receive alerts from our certificate transparency monitor in the [Cloudflare Dashboard](https://dash.cloudflare.com/).

## Connection Quality

Connection quality metrics include download and upload speed, latency (round-trip time), and latency jitter (round-trip time stability), reflecting the best expected performance for specific countries or ASNs. These metrics are derived from speed tests initiated by end users on the [Cloudflare Speed Test website](https://speed.cloudflare.com/), aggregated over the previous 90 days. The underlying raw data is freely accessible for analysis through [Measurement Lab's BigQuery](https://blog.cloudflare.com/aim-database-for-internet-quality/).

In speed, latency, and jitter rankings, only countries where users run speed tests with sufficient regularity are included. Consequently, certain countries may be excluded from the rankings, even though their data can be found in other sections of Radar.

Cloudflare Speed Test measures latency multiple times over the course of the test. Measurements taken before a download or upload begins are aggregated into idle latency and jitter, while measurements taken while a download or upload is in progress are aggregated as loaded latency and jitter.


## Content Categories

Cloudflare uses a variety of data sources to categorize domains. Using Cloudflare Radar, you can view the content categories associated with a given domain. Cloudflare customers using Cloudflare Gateway or 1.1.1.1 for Families can decide to block certain categories, like "Adult Content", in addition to security threats like malware and phishing.

In some cases, a domain may be miscategorized. For example, a social media site might be categorized as "Shopping & Auctions". If you believe a domain is miscategorized, or a domain has not yet been categorized, please provide your suggested category using [this form](https://radar.cloudflare.com/domains/feedback) to bring it to our attention.

## Domain Rankings

Domain Rankings is based on our anonymized and aggregated 1.1.1.1 resolver data, complies with our [privacy policy](https://www.cloudflare.com/en-gb/privacypolicy/), and aims to identify the top most popular domains that reflect how people use the Internet globally. Domain Rankings’ popularity metric is best described as the estimated number of unique users that access a domain over some period of time.

Trending domains are domains which are currently experiencing an increase in popularity. Domains Trending Today are domains spiking in popularity, reflecting increased interest potentially related to a particular event or a topic. Domains Trending This Week are domains that have steadily grown in popularity, reflecting an increase of their user base over the week.

## Geographical Distribution

Countries contributing traffic to this AS, and their relative contribution as percentage of the total AS traffic seen by Cloudflare.

## Internet Outages

Internet connectivity can experience outages or disruptions due to a number of factors. These factors include power outages, damage to fiber optic cables, severe weather, natural disasters, or government direction. Outages may be sub-national or national in geographic scope, or may impact one or more ASNs.

## Internet traffic trends

Trends observed in Internet traffic originating gloablly or within a given location or autonomous system within the selected time range, based on aggregated data from our network.

## IP address geolocation

IP address geolocation is the term used for the process of associating an IP address with a location in the physical world. IP geolocation used on Cloudflare Radar comes from a third-party database.

Note that a number of factors may affect the accuracy of the geolocation information, including mobile network architecture, the use of VPN services, and the use of privacy-protecting proxy services.

Learn more [here](https://www.maxmind.com/en/geoip-data-correction-request) about how to suggest a correction if you believe the location provided is incorrect.

## IPv6 adoption

The IPv4 vs. IPv6 graph shows the distribution of traffic by IP version, and is intended to highlight IPv6 adoption trends.

Note that prior to January 23, 2023, the IPv6 percentage shown in the chart was calculated as (IPv6 requests / IPv4+IPv6 requests). After that date, the IPv6 percentage is calculated as (IPv6 requests / requests for dual-stacked content).

## IQI

The Internet Quality Index estimates connection performance under average utilization, such as web browsing. It is based on end user measurements against a fixed set of Cloudflare and third-party targets, providing numbers for bandwidth, round-trip time (latency), and DNS response time, aggregated by continent, country, or ASN.

The IQI methodology requires a minimum number of measurements to generate estimates. As a result, graphs for smaller countries and ASNs may display occasional gaps, especially during nighttime. These gaps do not indicate outages. The number of measurements underlying IQI does not necessarily correlate with the volume of traffic observed by Cloudflare in a specific country or ASN.


## Network-level DDoS Attacks

Attacks mitigated by our Level 3 and 4 Denial of Service Attack prevention systems. We show the most used attack vectors as well as the change in attack volume over the selected time range. Selected location is the location of the data center(s) where the attacks were mitigated. Target industry and vertical categories are associated with the customers being attacked.

Industry categories include business types grouped by their primary activities, such as information technology and services, retail, or telecommunications. Vertical categories are high-level groupings that incorporate related industries, such as the "Internet and Telecom" vertical, which includes industries such as "Internet" and "Telecommunications".

Network-level DDoS attacks graphs are based on traffic measured in bytes.

## Traffic type filter

* **Human Only Traffic**: Traffic that our algorithms determine as being generated by human activity.

* **Automated Only Traffic**: Traffic that our algorithms determine as being generated by bot or automated script activity.

* **All Traffic**: Use all traffic, which includes both human activity and automated activity.

## Trends

Based on the aggregated HTTP/s metadata we see, we are able to to show trends about a diverse set of metrics, including the distribution of mobile device vs. desktop traffic, the percentage of traffic detected as coming from bots, and the distribution of user agents/browsers. We also provide insights into the usage of HTTPS and IPv6.

## Verified bots

Bot traffic describes any non-human traffic to a website or an app. Some bots are useful, such as search engine bots that index content for search or customer service bots that help users. Other bots may be used to perform malicious activities, such as break into user accounts or scan the web for contact information to send spam.

Verified bots, such as the ones from search engines, are usually transparent about who they are. Cloudflare manually approves well-behaved services that benefit the broader Internet and honor robots.txt.

Each entry on the Verified Bots list exists because a corresponding IP address was seen associated with a verified bot in the last 30 days. A verified bot is not necessarily good or bad.

## Visitor location

The data displayed on domain-specific geographic traffic patterns is based solely on data from our recursive DNS services. All data displayed is in accordance with our privacy policies and commitments. This data may include attack traffic and cross-origin requests.

## WHOIS

WHOIS is a standard for publishing the contact and nameserver information for all registered domains. Each registrar maintains their own WHOIS service. Anyone can query the registrar's WHOIS service to reveal the data behind a given domain.
