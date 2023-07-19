---
title: Overview
type: overview
pcx_content_type: overview
weight: 1
layout: overview
meta:
  title: Cloudflare Queues
---

# Cloudflare Queues

{{<description>}}

Send and receive messages with guaranteed delivery and no charges for egress bandwidth.

{{</description>}}

{{<plan type="paid">}}

{{<Aside>}}

[Cloudflare Queues is now in open Beta](https://blog.cloudflare.com/cloudflare-queues-open-beta/). Join the [`#queues-beta`](https://discord.gg/rrZXVVcKQF) channel in our Developer Discord to learn more.

{{</Aside>}}

Cloudflare Queues integrates with [Cloudflare Workers](/workers/) and enables you to build applications that can [guarantee delivery](/queues/learning/delivery-guarantees/), [offload work from a request](/queues/learning/how-queues-works/), [send data from Worker to Worker](/queues/platform/configuration/), and [buffer or batch data](/queues/learning/batching-retries/).

---

## Features

{{<feature header="Wrangler" href="/workers/wrangler/install-and-update/">}}
The Workers command-line interface, Wrangler, allows you to [create](/workers/wrangler/commands/#init), [test](/workers/wrangler/commands/#dev), and [deploy](/workers/wrangler/commands/#publish) your Workers projects.

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

{{<resource header="Limits" href="/queues/platform/limits/" icon="documentation-clipboard">}}Learn about Queues limits (100 Queues per account).{{</resource>}}

{{<resource header="Try the Demo" href="https://github.com/Electroid/queues-demo#cloudflare-queues-demo" icon="learning-center-book">}}Try Cloudflare Queues which can run on your local machine.{{</resource>}}

{{<resource header="@CloudflareDev" href="https://twitter.com/cloudflaredev" icon="twitter">}}Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Workers.{{</resource>}}

{{<resource header="Developer Discord" href="https://discord.gg/cloudflaredev" icon="logo-Discord">}}Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.{{</resource>}}


{{<resource header="Configuration" href="/queues/platform/configuration/" icon="learning-center-book">}}Learn how to configure Cloudflare Queues using Wrangler.{{</resource>}}

{{<resource header="JavaScript APIs" href="/queues/platform/javascript-apis/" icon="learning-center-book">}}Learn how to use JavaScript APIs to send and receive messages to a Cloudflare Queue.{{</resource>}}


{{</resource-group>}}



