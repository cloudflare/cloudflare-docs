---
pcx-content-type: reference
title: Notification History
weight: 6
---

# Notification History

Notification History is a log of notifications that have been sent to your account via the Notifications service. Information contained in Notification History includes the notification itself, when the notification was sent, and who the notification was sent to.

## How to access Notification History

Currently, customers can access Notification History [via the Cloudflare API](https://api.cloudflare.com/#notification-history-properties). Using `GET`, customers can retrieve a list of history records for notifications sent to an account. The records are displayed for the last 30 or 90 days, based on type of plan.

The syntax is as follows:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">GET accounts/:identifier/alerting/v3/history</span></div></span></span></span></code></pre>{{</raw>}}

Example:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">curl -X GET &quot;https://api.cloudflare.com/client/v4/accounts/9a7806061c88ada191ed06f989cc3dac/alerting/v3/history?page=1&amp;per_page=25&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Email: user@example.com&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;Content-Type: application/json&quot;</span></div></span></span></span></code></pre>{{</raw>}}

## Availability

Notification History is available to all plans. The amount of history clients have access to depends on the the type of plan:

- **Free, Pro and Business**: History from the past 30 days.
- **Enterprise**: History from the past 90 days.

{{<Aside type="note" header="Note">}}

Customers will not be able to to access Notification History from before Oct 11, 2021.

{{</Aside>}}
