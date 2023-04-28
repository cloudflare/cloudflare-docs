---
title: Overview
type: overview
pcx_content_type: overview
weight: 1
layout: list
meta:
  title: Cloudflare Queues
---

{{<content-column>}}

# Cloudflare Queues

Cloudflare Queues allows developers to send and receive messages with guaranteed delivery. It integrates with [Cloudflare Workers](/workers/) and offers at-least once delivery, message batching, and does not charge for egress bandwidth.

{{<Aside>}}

[Cloudflare Queues is now in open Beta](https://blog.cloudflare.com/cloudflare-queues-open-beta/). Join the [`#queues-beta`](https://discord.gg/rrZXVVcKQF) channel in our Developer Discord to learn more.

{{</Aside>}}

{{<button-group>}}
{{<button type="primary" href="https://github.com/Electroid/queues-demo#cloudflare-queues-demo" target="_blank">}}Try the Demo{{</button>}}
{{<button type="secondary" href="/queues/platform/javascript-apis/">}}JavaScript APIs{{</button>}}
{{<button type="secondary" href="/queues/platform/configuration/">}}Configuration{{</button>}}
{{<button type="secondary" href="/queues/platform/pricing/">}}Pricing{{</button>}}
{{</button-group>}}

Cloudflare Queues enable you to build applications that can:

- **Guarantee delivery**: If your application cannot lose data, Queues will guarantee that each message is stored on-disk and processed at-least once.
- **Offload work from a request**. If a Worker needs to do more processing, but should not block the entire request -- a durable, observable alternative to using `waitUntil()`.
- **Send data from Worker to Worker**. You can configure producer and consumer Workers that can send data between each other.
- **Buffer or batch data**. If a service has bursty load, you can send that load to a Queue, then process it in predictable batches.

{{</content-column>}}


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

{{<resource header="Plans" href="/workers/platform/pricing/" icon="price">}}Learn about Free and Paid plans.{{</resource>}}

{{<resource header="Limits" href="/workers/platform/limits/" icon="documentation-clipboard">}}Learn about plan limits (Free plans get 100,000 requests per day).{{</resource>}}
{{<resource header="Developer Discord" href="https://discord.gg/cloudflaredev" icon="logo-Discord">}}Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.{{</resource>}}
{{<resource header="@CloudflareDev" href="https://twitter.com/cloudflaredev" icon="twitter">}}Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Workers.{{</resource>}}
{{<resource header="Configuration" href="https://developers.cloudflare.com/queues/platform/configuration/" icon="learning-center-book">}}Learn how to configure Cloudflare Queues using Wrangler.{{</resource>}}
{{<resource header="JavaScript APIs" href="https://developers.cloudflare.com/queues/platform/javascript-apis/" icon="learning-center-book">}}Learn how to use JavaScript APIs to send and receive messages to a Cloudflare Queue.{{</resource>}}
{{</resource-group>}}








