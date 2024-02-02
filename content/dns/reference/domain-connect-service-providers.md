---
pcx_content_type: reference
title: Domain Connect service providers
weight: 5
meta:
    description: Learn how to onboard your templates to use Domain Connect with Cloudflare as DNS provider.
---

# Domain Connect service providers

If you are a service provider, consider this page for information on Cloudflare as a Domain Connect DNS provider and how you can onboard your template.

## What is Domain Connect

Domain Connect is an open standard that allows service providers, such as X and Y, to make it easier for their end users to configure the functionality without having to manually edit DNS records.

This is achieved with templates that close the gap between necessary configurations (required by the service provider) and necessary DNS records changes (that must happen at the authoritative DNS provider for a given domain).

For example,

## Onboard your templates

### Before you begin

* Although Domain Connect offers two different flows (synchronous and asynchronous), as most DNS providers, Cloudflare only supports synchronous calls. Refer to the Domain Connect [Getting Started](https://www.domainconnect.org/getting-started/) for more details.
* Domain Connect templates and tools are published on GitHub, so you must have a GitHub account to follow the steps below.

### 1 - Add templates to the repository

Domain Connect templates are published and maintained on a GitHub repository.

1. Create a fork of the [templates repository](https://github.com/Domain-Connect/Templates) on GitHub.
2. Add your template. You can create a copy of one of the existing templates and edit it according to your needs.
    * Refer to the [Domain Connect Spec](https://github.com/Domain-Connect/spec/blob/master/Domain%20Connect%20Spec%20Draft.adoc#52-template-definition) for details on the different available fields.
    * If present, you must set the `syncBlock` field on your template to `false`. This means the template flow will be synchronous, which is the only option supported by Cloudflare.
    * You must also provide a synchronous public key domain (`syncPubKeyDomain`). This is a domain that can be queried for `TXT` records containing a public key to verify your digital signature. When your template is in use, synchronous calls will be digitally signed.
3. Make sure you follow the naming format defined by Domain Connect: `<providerId>.<serviceId>.json`.

{{<Aside type="note" header="Tip">}}
You can use Domain Connect's [linter tool](https://github.com/Domain-Connect/dc-template-linter) with the option `-cloudflare` enabled to check your template against Cloudflare specific rules.
{{</Aside>}}

4. Submit a pull request to have your template(s) added to the repository.

Once Domain Connect has reviewed your template(s) and merged your pull request, contact Cloudflare as specified below.

### 2 - Email Cloudflare with details

