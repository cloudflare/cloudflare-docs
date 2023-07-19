---
pcx_content_type: reference
title: Verified Bots Policy
weight: 0
---
# Verified Bots Policy

In order to be listed by Cloudflare as a Verified Bot, your bot must conform to the below requirements. To provide the best possible protection to our customers, this policy may change in the future as we adapt to new bot behaviors.

## Bot Policy

### Minimum Traffic

A bot or proxy must have a minimum amount of traffic for Cloudflare to be able find it in the sampled data. The minimum traffic should have more than 1000 requests per day across multiple domains. 

### Minimum Zones

Service must be made for a widespread use of zones. 

{{<Aside type="example" header="Example">}}

A bot crawling one site is not valid. 

{{</Aside>}}

### Bot Identification

The user-agent with the following requirements: 
* Have at least 5 characters.
* Must not contain special characters.
* Must not include the same user-agent of another verified service. 

{{<Aside type="example" header="Example">}}

`GoogleBot/1.0` is a valid UA. 

{{</Aside>}}

### Domain Owner Consent

Domains should only be crawled with the explicit or implicit consent of the zone's owner or terms of use. Search engines crawlers must read the `robots.txt` to exclude paths to crawl from the owner. 

{{<Aside type="example" header="Example">}}

A tool trying to scalp inventories from different websites might be breaking terms of use while a search engine bot indexing websites but complying with `robots.txt` is a valid service. 

{{</Aside>}}

### Service Purpose

The purpose of the service should be benign or helpful to both the owner of a zone and the users of the service. The service cannot perform any of the following: 

* Bot tooling
* Scrapers 
* Scalpers
* Credential-stuffing
* Directory-traversal scanning
* Excessive data scrapping
* DDoS botnets

{{<Aside type="example" header="Example">}}

Price scraping is not a valid use case.

{{</Aside>}}

### Crawling Etiquette 

The crawling etiquette should check `robots.txt` if crawling the whole website. The service should have a rate limit of 1 request per second and it should not attempt to crawl sensitive paths. 

{{<Aside type="example" header="Example">}}

If a bot skips `robots.txt`, it will be rejected.

{{</Aside>}}

### Public Documentation

The bot must have publicly documented expected behavior or user-agent format.

## IP Validation 

A set of validation methods and requirements to gather set IP ranges for a verified service.

### Public IP List 

* A fixed and limited set of IP addresses, which can be verified via publicly accessible plain-text, `JSON`, or `CSV`.
* IP addresses used solely by the bot owner.
* A user-agent match pattern.

### Reverse DNS 

* A list of domain suffixes to validate DNS records.
* IP addresses should have PTR records set correctly.
* A user-agent match pattern.

### ASN 

* A valid `ASN` belonging to the bot owner.
* A user-agent match pattern.

## Breach of Policy 

If any of the requirements to validate are breached, a service will be removed from the global allowlist.

{{<Aside type="example" header="Examples">}}

* Adding a set of IPs that are not solely used by verified service. 
* The service IPs are breached by an attacker. 
* The service has vulnerabilities that have not been patched.
* A block of IPs not briefed on onboarding is added to the list. 
* The disclosed purpose of the service does not reflect on the traffic. 

{{</Aside>}}

## Online Application

To submit a verified bot that Cloudflare is not [currently tracking](https://radar.cloudflare.com/verified-bots), fill out an [online application](https://docs.google.com/forms/d/e/1FAIpQLSdqYNuULEypMnp4i5pROSc-uP6x65Xub9svD27mb8JChA_-XA/viewform?usp=sf_link). The waiting time is up to several weeks for verified bot requests to be evaluated.
