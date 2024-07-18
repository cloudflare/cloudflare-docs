---
title: Overview
type: overview
pcx_content_type: overview
weight: 1
layout: overview
meta:
  title: Cloudflare Queues (beta)
---

# {{<heading-pill style="beta">}}Cloudflare Queues{{</heading-pill>}}

{{<description>}}

Send and receive messages with guaranteed delivery and no charges for egress bandwidth.

{{</description>}}

{{<plan type="paid">}}

{{<Aside>}}

[Cloudflare Queues is now in open Beta](https://blog.cloudflare.com/cloudflare-queues-open-beta/). Join the [`#queues-beta`](https://discord.cloudflare.com) channel in our Developer Discord to learn more.

{{</Aside>}}

Cloudflare Queues integrates with [Cloudflare Workers](/workers/) and enables you to build applications that can [guarantee delivery](/queues/reference/delivery-guarantees/), [offload work from a request](/queues/reference/how-queues-works/), [send data from Worker to Worker](/queues/configuration/configure-queues/), and [buffer or batch data](/queues/configuration/batching-retries/).

---

## Features

{{<feature header="Batching, Retries and Delays" href="/queues/configuration/batching-retries/">}}

Cloudflare Queues allows you to batch, retry and delay messages. 

{{</feature>}}

{{<feature header="Dead Letter Queues" href="/queues/configuration/dead-letter-queues/">}}

Redirect your messages when a delivery failure occurs.

{{</feature>}}

{{<feature header="Pull consumers" href="/queues/configuration/pull-consumers/">}}

Configure pull-based consumers to pull from a queue over HTTP from infrastructure outside of Cloudflare Workers.

{{</feature>}}

---

## Related products
 
{{<related header="R2" href="/r2/" product="r2">}}

Cloudflare R2 Storage allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.

{{</related>}}

{{<related header="Workers" href="/workers/" product="workers">}}

Cloudflare Workers allows developers to build serverless applications and deploy instantly across the globe for exceptional performance, reliability, and scale.

{{</related>}}

---

## More resources

{{<resource-group>}}

{{<resource header="Pricing" href="/queues/platform/pricing/" icon="price">}}Learn about pricing.{{</resource>}}

{{<resource header="Limits" href="/queues/platform/limits/" icon="documentation-clipboard">}}Learn about Queues limits.{{</resource>}}

{{<resource header="Try the Demo" href="https://github.com/Electroid/queues-demo#cloudflare-queues-demo" icon="learning-center-book">}}Try Cloudflare Queues which can run on your local machine.{{</resource>}}

{{<resource header="@CloudflareDev" href="https://x.com/cloudflaredev" icon="twitter">}}Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Workers.{{</resource>}}

{{<resource header="Developer Discord" href="https://discord.cloudflare.com" icon="logo-Discord">}}Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.{{</resource>}}


{{<resource header="Configuration" href="/queues/configuration/configure-queues/" icon="learning-center-book">}}Learn how to configure Cloudflare Queues using Wrangler.{{</resource>}}

{{<resource header="JavaScript APIs" href="/queues/configuration/javascript-apis/" icon="learning-center-book">}}Learn how to use JavaScript APIs to send and receive messages to a Cloudflare Queue.{{</resource>}}


{{</resource-group>}}



