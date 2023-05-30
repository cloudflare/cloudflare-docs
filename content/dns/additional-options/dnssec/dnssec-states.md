---
pcx_content_type: reference
title: DNSSEC states
layout: list
---

# DNSSEC states

This page describes different DNSSEC states and how they relate to the responses you get from the [DNSSEC details API endpoint](/api/operations/dnssec-dnssec-details).

{{<table-wrap>}}
| State            | API response                                                     | Description |
|------------------|------------------------------------------------------------------|-------------|
| Pending          | `"status":"pending"`<br /> `"modified_on":<TIME_STAMP>`          | DNSSEC has been enabled but the Cloudflare DS record has not been added at the registrar.        |
| Active           | `"status":"active"`<br /> `"modified_on":<TIME_STAMP>`           | DNSSEC has been enabled and the Cloudlfare DS record is present at the registrar.        |
| Pending-disabled | `"status":"pending-disabled"`<br /> `"modified_on":<TIME_STAMP>` | DNSSEC has been disabled but the Cloudflare DS record is still added at the registrar.        |
| Disabled         | `"status":"disabled"`<br /> `"modified_on":<TIME_STAMP>`         | DNSSEC has been disabled and the Cloudflare DS record has been removed from the registrar.        |
| Deleted          | `"status":"disabled"`<br /> `"modified_on": null`                | DNSSEC has never been enabled for the zone or DNSSEC has been disabled and then deleted using the [Delete DNSSEC records endpoint](/api/operations/dnssec-delete-dnssec-records).        |
{{</table-wrap>}}

{{<Aside type="warning">}}
Once you have enabled DNSSEC on a zone for the first time, you cannot transition directly from an `active` state to a `deleted` state. You can only [delete DNSSEC records](/api/operations/dnssec-delete-dnssec-records) once your zone DNSSEC is in a `disabled` state. Cloudflare prevents you from deleting DNSSEC records before removing the DS record from the registrar to avoid DNS resolution issues.
{{</Aside>}}

In both `pending` and `active` states, Cloudflare signs the zone and responds with `RRSIG`, `NSEC`, `DNSKEY`, `CDS`, and `CDNSKEY` record types.

In `pending-disabled` and `disabled` states, Cloudflare still signs the zone and serves `RRSIG`, `NSEC`, and `DNSKEY` record types, but the `CDS` and `CDNSKEY` records are set to zero ([RFC 8078](https://www.rfc-editor.org/rfc/rfc8078.html#section-4)), signaling to the registrar that DNSSEC should be disabled.

Refer to [How DNSSEC works](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/) to learn more about the authentication process and records involved.