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

