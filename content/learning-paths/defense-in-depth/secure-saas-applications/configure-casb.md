---
title: Scan SaaS applications with Cloudflare CASB
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

{{<Aside type="note">}}
Only available on Enterprise plans.
{{</Aside>}}

{{<glossary-definition term_id="Cloudflare CASB">}}

## Manage CASB integrations

{{<render file="casb/_manage-integrations.md" productFolder="cloudflare-one">}}

For more information, refer to [Scan SaaS applications](/cloudflare-one/applications/scan-apps/).

## Security features

### Inline CASB in Gateway

#### Tenant control

Tenant account customers can use the CASB API to manage integrations for their users.

For more information, refer to the [Tenant documentation](/tenant/).

#### Shadow IT Discovery

Shadow IT Discovery allows you to analyze what SaaS applications and other services your users visit. You can use this information to create Gateway policies to secure your organization.

To turn on and use Shadow IT Discovery, log in to [Zero Trust](https://one.dash.cloudflare.com), then go to **Analytics** > **Access**. For more information, refer to [Shadow IT Discovery](/cloudflare-one/insights/analytics/access/).

#### DLP in SaaS applications inline

If you use both Cloudflare CASB and Cloudflare DLP, you can use DLP to discover if files stored in your SaaS application contain sensitive data. Supported CASB integrations include:

{{<render file="casb/_casb-dlp-integrations.md" productFolder="cloudflare-one">}}

##### Upload/download control

When you use a supported integration with DLP, you can place restrictions on uploading and downloading based on a file's contents.

For more information, refer to [Scan SaaS applications with DLP](/cloudflare-one/applications/scan-apps/casb-dlp/).

### API CASB

#### General best practices

#### Integrating DLP policies
