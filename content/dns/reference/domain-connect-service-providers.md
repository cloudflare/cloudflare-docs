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

This is achieved with templates that close the gap between necessary configurations (on the service provider side) and necessary DNS records changes (on the authoritative DNS provider side), making it seamless to the end user.

For example,

## Onboard your templates

### Requirements

* You must provide a synchronous public key domain (`syncPubKeyDomain`), as Cloudflare requires a digital signature in order to verify service providers.
* If present, you must set the `syncBlock` field on your template to `false`. This means the template flow will be synchronous, which is the only option supported by Cloudflare.

### 1 - Add the templates to Domain Connect repository

### 2 - Email Cloudflare with details