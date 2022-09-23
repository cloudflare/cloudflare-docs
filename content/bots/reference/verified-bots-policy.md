---
pcx_content_type: reference
title: Verified Bots Policy
weight: 0
---
# Verified Bots Policy

In order to be listed by Cloudflare as a Verified Bot, your bot must conform to the following requirements.

## Bot Policy

### Minimum Traffic

A bot or proxy must have a minimum amount of traffic for Cloudflare to be able find it in the sampled data. 

{{<Aside type="example" header="Example">}}

The minimum traffic should have more than 1000 requests per day across multiple domains. 

{{</Aside>}}

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

GoogleBot/1.0 is a valid UA. 

{{</Aside>}}

### Domain Owner Consent

Domains should only be crawled with the explicit or implicit consent of the zone's owner or terms of use. For search engines crawlers, it's obligatory to read the `robots.txt` to exclude paths to crawl from owner. 

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


## Corporate Proxy Policy

### Service Scope

Service must be made for a widespread use of zones. 

### Service Purpose

The purpose of the service should be in general benign or helpful to both the owner of a zone and users of the service, such as: 

* Security enhancer
* Privacy enhancer
* Content enhancer

The service cannot perform any of the following: 

* Open Proxies
* Public Proxies
* Residential Proxies 
* Rotating Proxies
* Free VPNs

### Strict Service Use

The provider has strict user or abuse policies/SLAs.

### Public Documentaion

The bot must have publicly documented expected behavior or user-agent format.

### Traffic Categorization

Traffic can include automated traffic but the majority should be human traffic. 
