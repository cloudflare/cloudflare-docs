---
pcx_content_type: reference
title: Token validity periods
weight: 4
---

# Token validity periods

When you perform [TXT](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/txt/) domain control validation, you will need to share these tokens with your customers.

However, these tokens expire after a certain amount of time, depending on your chosen certificate authority.

| Certificate authority | Token validity |
| --- | --- |
| Let's Encrypt | 7 days |
| Google Trust Services | 14 days |

{{<Aside type="warning">}}
{{<render file="_dcv-invalid-token-situations.md" productFolder="ssl" >}}
{{</Aside>}}