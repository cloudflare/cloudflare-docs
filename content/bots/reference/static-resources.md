---
pcx_content_type: reference
title: Static resource protection
weight: 0
---

# Static resource protection

Pro, Business, and Enterprise customers can use Cloudflare's bot solutions to protect their {{<glossary-tooltip term_id="static content">}}static resources{{</glossary-tooltip>}} from bots.

{{<Aside type="warning" header="Warning">}}
If you enable static resource protection, you may block good bots — like mail clients — that routinely fetch static resources. Make sure you understand your existing infrastructure before enabling this feature.
{{</Aside>}}

## Super Bot Fight Mode

To enable this feature as a Pro or Business customer or an Enterprise customer without Bot Management:

1.  Go to **Security** > **Bots**.
2.  Select **Configure Super Bot Fight Mode**.
3.  For **Static resource protection**, select **On**.

## Bot Management for Enterprise

{{<render file="_static-resources-bm.md">}}
<br/>

To exclude static resources, you would need to include `not (cf.bot_management.static_resource)` as part of your custom rule.

## Which files are protected?

{{<render file="_static-resources-list.md">}}