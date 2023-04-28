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
