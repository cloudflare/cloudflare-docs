---
title: Scan SaaS applications with Cloudflare CASB
pcx_content_type: learning-unit
weight: 4
layout: learning-unit
---

{{<Aside type="note">}}
Only available on Enterprise plans.
{{</Aside>}}

{{<glossary-definition term_id="Cloudflare CASB">}}

Cloudflare's API-implemented CASB addresses the final, common security concern for administrators of SaaS applications or security organizations: How can I get insights into the existing configurations of my SaaS tools and proactively address issues before there is an incident? CASB integrates with a number of leading SaaS applications and surfaces instant security insights related to misconfiguration and potential for data loss. CASB also powers [risk score heuristics](/cloudflare-one/insights/risk-score/) organized by severity.

For more information on Cloudflare CASB, including available SaaS integrations, refer to [Scan SaaS applications](/cloudflare-one/applications/scan-apps/).

## Manage CASB integrations

{{<render file="casb/_manage-integrations.md" productFolder="cloudflare-one">}}

### Integrate DLP policies

If you use both Cloudflare CASB and Cloudflare Data Loss Prevention (DLP), you can use DLP to discover if files stored in your SaaS application contain sensitive data. CASB integrations supported by DLP include:

{{<render file="casb/_casb-dlp-integrations.md" productFolder="cloudflare-one">}}

For more information, refer to [Scan SaaS applications with DLP](/cloudflare-one/applications/scan-apps/casb-dlp/).
