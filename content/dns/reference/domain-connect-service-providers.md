---
pcx_content_type: reference
title: Domain Connect service providers
weight: 5
meta:
    description: Learn how to onboard your templates to use Domain Connect with Cloudflare as DNS provider.
---

# Domain Connect service providers

Consider this page for information on Cloudflare as a Domain Connect DNS Provider and how you can onboard your template, if you are a service provider.

## What is Domain Connect

Domain Connect is an open standard that allows service providers, such as X and Y, to make it easier for their end users to configure the functionality without having to manually edit DNS records.

This is achieved with a template that closes the gap between necessary configurations (on the service provider side) and necessary DNS records changes (on the authoritative DNS provider side), making it seamless to the end user.

For example,

## Onboard your template

{{<Aside type="warning" header="Only synchronous supported">}}
Although Domain Connect has both synchronous and asynchronous flows, as most DNS providers, Cloudflare DNS only supports the former.
{{</Aside>}}

### 1 - Add the template to Domain Connect repository

### 2 - Email Cloudflare with details