---
pcx_content_type: reference
title: Top Level Domains supported
weight: 3
---

# Top Level Domains supported

Cloudflare supports over 200 top-level domains (TLDs)[^1] and is always evaluating adding new TLDs.

You can find the full list of supported and coming soon TLDs on the [TLD policies page](https://www.cloudflare.com/tld-policies/). If you want to register a `.us` domain refer to  [Additional requirements for .US domains](#additional-requirements-for-us-domains).

## Domain availability

During your [TLD registration process](/registrar/get-started/register-domain/#how-to-register-a-new-domain), Cloudflare Registrar will inform you if the TLD you are looking for is available to register. If it does not appear in your search list, this means that TLD is not available for registration.

Possible causes for the domain not being available include:

* Someone else owns that domain.
* It is a premium domain, that is, one with non-standard pricing, which Cloudflare Registrar does not support.
* It is an Internationalized Domain Name (IDN) which Cloudflare Registrar does not support. These domains include international characters (such as `á`, `ü`, among others).

## Transfer a domain

When transferring a domain to Cloudflare Registrar, refer to [Restrictions](/registrar/get-started/transfer-domain-to-cloudflare/#restrictions) for a full list of aspects to consider before starting the transfer.

## Additional requirements for .US domains

If you want to register a `.us` domain, you must have a genuine connection to the United States as described in the [usTLD Nexus Policy](https://www.about.us/policies). When registering a domain name, registrants must identify the category under which they qualify for the usTLD Nexus Requirement:

<details>
<summary>Nexus Category 1</summary>
<div>

**C11**: A natural person who is a United States Citizen; or

**C12**: A natural person who is a permanent resident of the United States of America, or any of its possessions or territories.

</div>
</details>

<details>
<summary>Nexus Category 2</summary>
<div>

**C21**: A U.S.-based organization or company formed within one of the fifty (50) U.S. states, the District of Columbia, or any of the United States possessions or territories, or organized or otherwise constituted under the laws of a state of the United States of America, the District of Columbia or any of its possessions or territories or a U.S. federal, state, or local government entity or a political subdivision thereof.

</div>
</details>

<details>
<summary>Nexus Category 3</summary>
<div>

**C31**: A foreign entity or organization that has a bona fide presence in the United States of America or any of its possessions or territories who regularly engages in lawful activities, sales of goods or services or other business, commercial or non-commercial, including not-for-profit relations in the United States; or

**C32**: A foreign entity that has an office or other facility in the United States.

</div>
</details>

The nexus category information will be supplied to the .US registry. Failure to provide accurate information and/or to respond to requests for information may result in the suspension or cancellation of the domain registration.

### Application purpose

In addition to nexus information, registrants must also identify their intended use of the domain name. The possible options are:

- Personal use
- For-profit business
- Non-profit business or organization
- Government
- Education

### .US WHOIS requirements

The .US registry requires that domain contact data is displayed in the public WHOIS database. Redaction and/or use of WHOIS privacy services is prohibited. This is a registry policy that all registrars must comply with.

### .US domain transfers

Transferring a `.us` domain works in a similar way to other domains, but always requires approval via the Form of Authorization (FOA) email. You must select the approve link within five days for the transfer to proceed. If you do not respond, the transfer request will be cancelled.

Refer to [Transfer your domain to Cloudflare](/registrar/get-started/transfer-domain-to-cloudflare/) for more information.

[^1]: In the DNS hierarchy, a top-level domain (or TLD) represents what comes after the final dot in a domain name - like `.com`. Learn more in the [Learning Center](https://www.cloudflare.com/learning/dns/top-level-domain/)