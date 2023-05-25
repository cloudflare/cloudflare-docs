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

In both `pending` and `active` states, Cloudflare signs the zone and responds with `RRSIG`, `NSEC`, `DNSKEY`, `CDS` and `CDNSKEY` record types.

In `disabled` state, Cloudflare still signs the zone and serves `RRSIG`, `NSEC` and `DNSKEY` record types, but the `CDS` and `CDNSKEY` records are set to zero ([RFC 8078](https://www.rfc-editor.org/rfc/rfc8078.html#section-4)), signaling to the registrar that DNSSEC should be disabled.

Once you have enabled DNSSEC on a zone for the first time, you cannot transition directly from an `active` state to a `deleted` state. You can only get to a `deleted` if you disable DNSSEC first and then use the [Delete DNSSEC records endpoint](/api/operations/dnssec-delete-dnssec-records).