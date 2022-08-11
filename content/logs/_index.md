---
title: Overview
pcx_content_type: overview
weight: 1
layout: overview
meta:
  title: Cloudflare Logs
---

{{<beta>}}Cloudflare Logs{{</beta>}}

{{<description>}}
Detailed logs of your website's HTTP requests
{{</description>}}

{{<plan type="enterprise">}}

These logs are helpful for debugging, identifying configuration adjustments, and creating analytics, especially when combined with logs from other sources, such as your application server. For information about the types of data Cloudflare collects, refer to [Cloudflare's Data Products](/fundamentals/data-products/).

---

## Features

{{<feature header="Logpush" href="/logs/get-started/">}}

Push your request or event logs to your cloud service provider using Logpush, which can be configured via the Cloudflare dashboard or API.

{{</feature>}}

{{<feature header="Logpull" href="/logs/logpull/">}}

See logs of HTTP requests with Logpull.

{{</feature>}}

Note, the data from Logpull and Logpush is exactly the same.

---

## Related products

{{<related header="Audit Logs" href="/fundamentals/account-and-billing/account-security/review-audit-logs/" product="fundamentals">}}
Summarize the history of changes made within your Cloudflare account.
{{</related>}}

{{<related header="Web Analytics" href="/analytics/web-analytics/" product="analytics">}}
Provides privacy-first analytics without changing your DNS or using Cloudflare's proxy.
{{</related>}}

---

## More resources

{{<resource-group>}}

{{<resource header="Plans" href="https://www.cloudflare.com/products/cloudflare-logs/" icon="documentation-clipboard">}}Compare available Cloudflare plans{{</resource>}}

{{<resource header="Pricing" href="https://www.cloudflare.com/plans/#overview" icon="price">}}Explore pricing options for Logs{{</resource>}}

{{</resource-group>}}
