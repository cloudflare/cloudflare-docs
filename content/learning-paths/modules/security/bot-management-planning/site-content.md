---
title: Understand your site's content
pcx_content_type: learning-unit
weight: 4
layout: learning-unit
---

Before you implement any bot protection, you should review your site's content, as that might affect your implementation.

## Static resources

{{<render file="_static-resources-list.md" productFolder="bots" >}}

{{<render file="_static-resources-bm.md" productFolder="bots" >}}
<br/>

If you do not explicitly exclude static resources from your firewall rules, you may block good bots — like mail clients — that routinely fetch static resources.

To exclude static resources, you would need to include `not (cf.botManagement.staticResource)` as part of a firewall rule.

## WordPress installations

{{<render file="_wordpress-loopback-definition" productFolder="bots" >}}
<br/>

For more details, refer to [WordPress Loopback errors](/bots/reference/wordpress-loopback-issue/).