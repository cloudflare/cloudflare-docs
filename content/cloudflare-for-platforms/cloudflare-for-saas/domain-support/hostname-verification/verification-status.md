---
pcx_content_type: reference
title: Verification status
weight: 5
meta:
    title: Verification status - Custom Hostname Validation
---

# Verification status

When you [verify a custom hostname](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-verification/), that hostname can be in several different statuses.

{{<table-wrap>}}

| Status | Description |
| --- | --- |
| Pending | Custom hostname is pending hostname verification. |
| Active | Custom hostname has completed hostname verification and is active. |
| Active re-deploying |	Customer hostname is active and the changes have been processed. |
| Blocked | Custom hostname cannot be added to Cloudflare at this time. Custom hostname was likely associated with Cloudflare previously and flagged for abuse.<br/><br/>If you are an Enterprise customer, contact your Customer Success Manager. Otherwise, email `abusereply@cloudflare.com` with the name of the web property and a detailed explanation of your association with this web property. |
| Moved	| Custom hostname is not active after *Pending* for the entirety of the [Validation Backoff Schedule](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-verification/backoff-schedule/) or it no longer points to the fallback origin. |
| Deleted | Custom hostname was deleted from the zone. Occurs when status is *Moved* for more than 7 days. |

{{</table-wrap>}}