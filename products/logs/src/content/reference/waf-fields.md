---
title: WAF fields
order: 123
---

# WAF fields

The Web Application Firewall (WAF) contains rules managed by Cloudflare to block requests that contain malicious content.

## WAFAction

<TableWrap>

| Value | Action |
|---|---|
| <em><span style="font-weight: 400;">0</span></em> | Unknown |
| <em><span style="font-weight: 400;">1</span></em> | Allow |
| <em><span style="font-weight: 400;">2</span></em> | Drop |
| <em><span style="font-weight: 400;">3</span></em> | Challenge Allow |
| <em><span style="font-weight: 400;">4</span></em> | Challenge Drop |
| <em><span style="font-weight: 400;">5</span></em> | Simulate |
| <em><span style="font-weight: 400;">6</span></em> | Log |

</TableWrap>

## Deprecated fields for internal Cloudflare use

The values of these fields are subject to change by Cloudflare at any time and are irrelevant for customer data analysis:

- WAFFlags
- WAFMatchedVar
