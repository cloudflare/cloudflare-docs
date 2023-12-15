---
title: Security Events
pcx_content_type: concept
weight: 2
layout: single
---

# Security Events

Security Events allows you to review {{<glossary-tooltip term_id="mitigated request">}}mitigated requests{{</glossary-tooltip>}} and helps you tailor your security configurations.

Users on a Free plan can view summarized security events by date in the **Activity log**. Customers on paid plans have access to additional graphs and dashboards that summarize the most relevant information about the current behavior of Cloudflare's security features on your zone.

## Main features

*   **Events summary**: Provides the number of security events on traffic during the selected time period, grouped according to the selected dimension (for example, Action, Host, Country).
*   **Events by service**: Lists the security-related activity per security feature (for example, WAF, API Shield).
*   **Top events by source**: Provides details of the traffic flagged or actioned by a Cloudflare security feature (for example, IP addresses, User Agents, Paths, Countries, Hosts, ASNs).
*   **Activity log**: Summarizes security events by date to show the action taken and the applied Cloudflare security product.

Security Events displays information about requests actioned or flagged by Cloudflare security products, including features such as [Browser Integrity Check](/waf/tools/browser-integrity-check/). Each incoming HTTP request might generate one or more security events. The Security Events dashboard only shows these events, not the HTTP requests themselves.

## Availability

The available features vary according to your Cloudflare plan:

{{<feature-table id="security.security_events">}}

## Known limitations

Security Events currently has these limitations:

*   Security Events may use sampled data to improve performance. If your search uses sampled data, Security Events might not display all events and filters might not return the expected results. To display more events, select a smaller time frame.

*   The UI may show an inaccurate number of events per page. Data queries are highly optimized, but this means that pagination may not always work because the source data may have been sampled. The GraphQL Analytics API does not have this pagination issue.

*   Triggered OWASP rules appear in the Security Events page under **Additional logs**, but they are not included in exported JSON files.
