---
title: WAF fields
order: 123
---

# WAF fields

The Web Application Firewall (WAF) contains rules managed by Cloudflare to block requests that contain malicious content.

## WAFAction

<TableWrap>

| Value | Action | Description |
|---|---|---|
| <em><span style="font-weight: 400;">0</span></em> | Unknown | Take no other action |
| <em><span style="font-weight: 400;">1</span></em> | Allow | Bypass all subsequent WAF rules |
| <em><span style="font-weight: 400;">2</span></em> | Drop | Block with an HTTP 403 response |
| <em><span style="font-weight: 400;">3</span></em> | Challenge Allow | Issue a CAPTCHA challenge |
| <em><span style="font-weight: 400;">4</span></em> | Challenge Drop | Unused |
| <em><span style="font-weight: 400;">5</span></em> | Simulate | Take no action other than logging the event |
| <em><span style="font-weight: 400;">6</span></em> | Log | Increment the anomaly score for OWASP rules. Records actions only if the total anomaly score for all matching OWASP rules exceeds the overall trigger threshold for an OWASP action (challenge, block, simulate) |

</TableWrap>

## Deprecated fields for internal Cloudflare use

The values of these fields are subject to change by Cloudflare at any time and are irrelevant for customer data analysis:

- WAFFlags
- WAFMatchedVar
