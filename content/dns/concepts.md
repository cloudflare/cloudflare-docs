---
pcx_content_type: concept
title: Concepts
weight: 3
meta: 
    title: DNS concepts 
---

# Concepts

This page defines and articulates key concepts that are relevant to the Cloudflare DNS service and are used in this documentation. For more concepts and broader descriptions, check out the [Cloudflare Learning Center](https://www.cloudflare.com/learning/dns/what-is-dns/).

## Domain

Also known as domain name, a domain is the string of text that identifies a specific website, such as `google.com` or `facebook.com`. Every time you access a website from your web browser, a DNS query takes place and the domain name is mapped to the actual IP address where the website is hosted.

## Registrar

Before you can start using the Cloudflare DNS service, you must first have a domain. This is achieved by using a service called registrar. As explained in our [Learning Center](https://www.cloudflare.com/learning/dns/glossary/what-is-a-domain-name-registrar/), a registrar handles the reservation of domain names as well as the assignment of IP addresses for those domains.

Cloudflare offers at-cost domain registration through [Cloudflare Registrar](/registrar/).

## Zone

DNS zone is an administrative concept used for delegating control over DNS settings for different domains, subdomains or a set of both. You can read more about this in the [specific Learning Center article](https://www.cloudflare.com/learning/dns/glossary/dns-zone/).

For the purpose of this documentation, keep in mind that each site added to a Cloudflare account is listed in the account home page as a zone. The exact properties and behaviors of your zone depend on its [setup option](/dns/zone-setups/).

## Nameserver

Although the resolution of a DNS query involves a number of different servers, in this documentation nameserver usually refers to the Cloudflare authoritative nameservers. As explained in the [article about DNS server types](https://www.cloudflare.com/learning/dns/dns-server-types/), the authoritative nameserver is the last stop in the query, the server that returns the IP address for the requested domain.  

When you have a domain using a [full setup](/dns/zone-setups/full-setup/), Cloudflare provides the authoritative nameservers for your domain.

## DNS records

DNS records are instructions that live in the authoritative DNS servers and provide information about a zone. This includes what IP address is associated with a particular domain, but can also cover many other use cases, such as directing emails to a mail server or validating ownership of a domain.

For more details about using DNS records within Cloudflare, refer to [Manage DNS records](/dns/manage-dns-records/how-to/create-dns-records/) and [DNS record types](/dns/manage-dns-records/reference/dns-record-types/).

## DNSSEC

DNSSEC stands for DNS Security Extensions. It increases security by adding cryptographic signatures to DNS records. These signatures can then be checked to verify that a record came from the correct DNS server, preventing anyone else from issuing false DNS records on your behalf and redirecting traffic intended for your domain. You can read more about it in the [article about DNS security](https://www.cloudflare.com/learning/dns/dns-security/).

For help setting up DNSSEC in Cloudflare, refer to [Enable DNSSEC](/dns/dnssec/).
