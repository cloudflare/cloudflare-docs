---
title: Overview
type: overview
pcx_content_type: overview
weight: 1
layout: overview
meta:
  title: Cloudflare Workers
---

# Cloudflare Workers

{{<description>}}
Build serverless applications and deploy instantly across the globe for exceptional performance, reliability, and scale.
{{</description>}}

{{<plan type="all">}}
 
Cloudflare Workers provides a [serverless](https://www.cloudflare.com/learning/serverless/what-is-serverless/) execution environment that allows you to create new applications or augment existing ones without configuring or maintaining infrastructure. 

Cloudflare Workers runs on [Cloudflare’s global network](https://www.cloudflare.com/network/) in over 300 cities around the world, offering both [Free and Paid plans](/workers/platform/pricing/).

{{<render file="_non-contract-enablement.md" productFolder="fundamentals">}}
 
---

## Features
 
{{<feature header="Wrangler" href="/workers/wrangler/install-and-update/">}}

The Workers command-line interface, Wrangler, allows you to [create](/workers/wrangler/commands/#init), [test](/workers/wrangler/commands/#dev), and [deploy](//workers/wrangler/commands/#deploy) your Workers projects.

{{</feature>}}

{{<feature header="Bindings" href="/workers/configuration/bindings/">}}

Bindings allow your Workers to interact with resources on the Cloudflare developer platform, including [R2](/r2/), [KV](/workers/learning/how-kv-works/), [Durable Objects](/durable-objects/), and [D1](/d1/).

{{</feature>}}

{{<feature header="Playground" href="/workers/learning/playground/">}}

The Playground is a sandbox which gives you an instant way to preview and test a Workers script directly in the browser against any site. No setup required.

{{</feature>}}

---

## Related products
 
{{<related header="R2" href="/r2/" product="r2">}}

Cloudflare R2 Storage allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.

{{</related>}}

{{<related header="D1" href="/d1/" product="d1">}}

D1 is Cloudflare’s native serverless database. Create a database by importing data or defining your tables and writing your queries within a Worker or through the API.

{{</related>}}

{{<related header="Queues" href="/queues/" product="queues">}}

Cloudflare Queues integrates with Cloudflare Workers to allow developers to send and receive messages with guaranteed delivery, offering at-least once delivery, message batching, and no charge for egress bandwidth.

{{</related>}}

---

## More resources
 
{{<resource-group>}}
 
{{<resource header="Plans" href="/workers/platform/pricing/" icon="price">}}Learn about Free and Paid plans.{{</resource>}}
 
{{<resource header="Limits" href="/workers/platform/limits/" icon="documentation-clipboard">}}Learn about plan limits (Free plans get 100,000 requests per day).{{</resource>}}

{{<resource header="HTMLRewriter" href="/workers/runtime-apis/html-rewriter/" icon="reference-architecture">}}Parse and transform HTML from inside a Worker.{{</resource>}}

{{<resource header="Storage options" href="/workers/learning/storage-options/" icon="learning-center-book">}}Learn which storage option is best for your project.{{</resource>}}

{{<resource header="Developer Discord" href="https://discord.gg/cloudflaredev" icon="logo-Discord">}}Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.{{</resource>}}

{{<resource header="@CloudflareDev" href="https://twitter.com/cloudflaredev" icon="twitter">}}Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Workers.{{</resource>}}
 
{{</resource-group>}}
