---
pcx_content_type: reference
title: Validation status
weight: 5
meta:
    title: Validation status - Custom Hostname Validation
---

# Validation status

When you [validate a custom hostname](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/), that hostname can be in several different statuses.

{{<table-wrap>}}

| Status | Description |
| --- | --- |
| Pending | Custom hostname is pending hostname validation. |
| Active | Custom hostname has completed hostname validation and is active. |
| Active re-deploying |	Customer hostname is active and the changes have been processed. |
| Blocked | Custom hostname cannot be added to Cloudflare at this time. Custom hostname was likely associated with Cloudflare previously and flagged for abuse.<br/><br/>If you are an Enterprise customer, contact your Customer Success Manager. Otherwise, email `abusereply@cloudflare.com` with the name of the web property and a detailed explanation of your association with this web property. |
| Moved	| Custom hostname is not active after **Pending** for the entirety of the [Validation Backoff Schedule](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/backoff-schedule/) or it no longer points to the fallback origin. |
| Deleted | Custom hostname was deleted from the zone. Occurs when status is **Moved** for more than seven days. |

{{</table-wrap>}}