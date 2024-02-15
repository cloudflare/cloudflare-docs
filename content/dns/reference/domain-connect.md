---
pcx_content_type: reference
title: Domain Connect
weight: 5
meta:
    description: Learn how to onboard your templates to use Domain Connect with Cloudflare as DNS provider.
---

# Domain Connect

If you are a service provider, consider this page for information on how Cloudflare supports [Domain Connect](https://www.domainconnect.org/) and how you can onboard your template.

## What is Domain Connect

Domain Connect is an open standard that allows service providers - such as email or web hosting platforms - to make it easier for their end users to configure functionality, without having to manually edit DNS records.

This is achieved with templates that close the gap between necessary configurations (required by the service provider) and necessary DNS records changes (that must happen at the authoritative DNS provider).

In practice, this means that when a user that owns `example.com` and has Cloudflare as their authoritative DNS provider wants to use your service, instead of having to manually update their DNS records, they will only have to authenticate themselves and the necessary changes will be applied automatically.

## Setup

### Before you begin

* Note that Cloudflare only supports the [Domain Connect synchronous flow](https://www.domainconnect.org/getting-started/).
* Domain Connect templates and tools are published on GitHub, so you must have a GitHub account and be familiar with [GitHub forks and pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks).

### 1. Add templates to the repository

Domain Connect templates are published and maintained on a GitHub repository.

1. Create a fork of the [templates repository](https://github.com/Domain-Connect/Templates).
2. Add your template. You can create a copy of one of the existing templates and edit it according to your needs.
    * Refer to the [Domain Connect Specification](https://github.com/Domain-Connect/spec/blob/master/Domain%20Connect%20Spec%20Draft.adoc#52-template-definition) for details on the different available fields.
    * If present, you must set the `syncBlock` field on your template to `false`. This means the template flow will be synchronous, which is the only option supported by Cloudflare.
    * You must also provide a synchronous public key domain (`syncPubKeyDomain` [^1]). When your template is in use, synchronous calls will be digitally signed.
3. Make sure you follow the naming format defined by Domain Connect: `<providerId>.<serviceId>.json`.

{{<Aside type="note" header="Tip">}}
You can use Domain Connect's [linter tool](https://github.com/Domain-Connect/dc-template-linter) with the option `-cloudflare` enabled to check your template against Cloudflare specific rules.
{{</Aside>}}

4. Submit a pull request to have your template(s) added to the repository.

Once your pull request has been reviewed and merged, contact Cloudflare as specified below.

### 2. Contact Cloudflare to onboard your template

When your template is onboarded, a graphical user interface flow will be available to your end users.

Send an email to `domain-connect@cloudflare.com`, including the following information:

1. List of template(s) you want to onboard, with their corresponding GitHub hyperlinks.
2. A logo to be displayed as part of the Domain Connect flow. Preferably in `SVG` format.
3. The default [proxy status](/dns/manage-dns-records/reference/proxied-dns-records/) you would like Cloudflare to set for `A`, `AAAA`, and `CNAME` records that are part of your template(s). Proxying other record types is not supported.
    {{<Aside type="note">}}
Proxy status is applied per template. If needed, organize the records in different templates to specify a different default proxy status per template. Once the records have been created, the domain owner can always change the proxy status for `A`, `AAAA`, and `CNAME` records later.
    {{</Aside>}}
4. (Optional) A Cloudflare [account ID](/fundamentals/setup/find-account-and-zone-ids/) for you to test the flow.

    If you have a [DNS provider discovery](https://github.com/Domain-Connect/spec/blob/master/Domain%20Connect%20Spec%20Draft.adoc#dns-provider-discovery) automation in place and will not list new DNS providers manually, Cloudflare can initially restrict your template to be exposed to the specified account only. Once you confirm everything is working as expected, Cloudflare will publish your template on the discovery endpoint, to be picked up by your automation.

[^1]:  A domain that can be queried for `TXT` records containing a public key to verify your digital signature.