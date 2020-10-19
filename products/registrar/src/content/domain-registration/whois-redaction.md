---
order: 3
---

# WHOIS redaction

Cloudflare Registrar provides personal data redaction on WHOIS information for all registered domains.

--------

## What is WHOIS?
WHOIS is a standard for publishing the contact and nameserver information for all registered domains. Each registrar maintains their own WHOIS service. Anyone can query the registrar’s WHOIS service to reveal the data behind a given domain.

However, broadcasting the registrant contact information, via the WHOIS service, can invite mountains of spam to your personal addresses. Cloudflare Registrar will be offering personal data redaction on WHOIS, that meets current ICANN guidelines, for free.

--------

## What is WHOIS redaction?
WHOIS redaction removes all contact information categorized as personal data from the published WHOIS record for a domain (registrant name, email address, postal address). Fields will read “Data Redacted”. The nameserver, domain lock information, and date records for a domain are still available publicly.

Cloudflare still maintains the authoritative, unredacted, record of your WHOIS data. You can modify this information at any time in the domain overview tab of the Cloudflare dashboard.

Note: WHOIS redaction is not the same as WHOIS Privacy. WHOIS Privacy replaces your information with proxy contact information. Redaction removes it altogether.

--------

## How can third parties reach registrants?
As part of the ICANN guidelines, registrars must make available a method for third parties to reach the registrant without revealing the identity of that registrant. Cloudflare has made a [form available where third parties can submit a message for a given domain on Cloudflare Registrar](https://www.cloudflare.com/abuse/form). Cloudflare will forward the message to the registrant email on file for that domain.

--------

## TLDs without WHOIS redaction
Some registries do not allow domains to be registered with WHOIS Redaction or WHOIS Privacy. Many of these are country TLDs (ccTLDs) like .uk. Cloudflare does not yet support TLDs that prohibit WHOIS redaction, but we will in the near future.