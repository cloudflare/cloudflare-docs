---
pcx-content-type: reference
---

# WHOIS redaction

Cloudflare Registrar provides personal data redaction on WHOIS information, if permitted by the registry.

WHOIS is a standard for publishing the contact and nameserver information for all registered domains. Each registrar maintains their own WHOIS service. Anyone can query the registrar’s WHOIS service to reveal the data behind a given domain.

However, broadcasting the registrant contact information via the WHOIS service can cause spam mail to be delivered to your personal addresses. Cloudflare Registrar offers personal data redaction on WHOIS for free, that meets current ICANN guidelines.

Cloudflare’s WHOIS service can be found at https://rdap.cloudflare.com/. Select **WHOIS** as the search type.

## What is WHOIS redaction?

WHOIS redaction removes most contact information categorized as personal data (such as registrant name, email address, postal address) from the published WHOIS record for a domain. These fields will read `Data Redacted`. The nameserver, domain lock information, and date records for a domain are still available publicly. The following fields will continue to show in WHOIS, due to ICANN policy: 

* Registrant state/province.
* Registrant country.

Cloudflare still maintains the authoritative, unredacted, record of your WHOIS data. You can modify this information at any time in. To access it:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
1. Select **Registrar**.
1. Under **Manage** > **Default Contact**, select **Edit** to update your information.

<Aside type="note" header="Note">

WHOIS redaction is not the same as WHOIS privacy. WHOIS privacy replaces your information with proxy contact information, while redaction removes it altogether.

</Aside>

## What is RDAP?

RDAP (Registration Data Access Protocol) is a new standard for querying domain contact and nameserver information for all registered domains. This new protocol offers some advantages over WHOIS, including standardized data access, support for internationalization, and secure access controls. RDAP is intended to eventually replace WHOIS. However, Cloudflare currently provides both WHOIS and RDAP search capability.

Cloudflare’s RDAP service can be found at https://rdap.cloudflare.com/. Select **RDAP** as the search type.

## How can third parties reach registrants?

As part of the ICANN guidelines, registrars must have a method for third parties to reach the registrant without revealing their identity. Cloudflare has a form available where third parties can [submit a message for a given domain on Cloudflare Registrar](https://www.cloudflare.com/abuse/form). Cloudflare will forward the message to the registrant email on file for that domain.