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

Cloudflare Workers runs on [Cloudflare’s global network](https://www.cloudflare.com/network/) in hundreds of cities worldwide, offering both [Free and Paid plans](/workers/platform/pricing/).

{{<button-group>}}
{{<button type="primary" href="/workers/get-started/">}}Get started{{</button>}}
{{<button type="secondary" href="https://dash.cloudflare.com/?to=/:account/workers-and-pages/create">}}Workers dashboard{{</button>}}
{{</button-group>}}

{{<render file="_non-contract-enablement.md" productFolder="fundamentals">}}

---

## Features

{{<feature header="Wrangler" href="/workers/wrangler/install-and-update/">}}

The Workers command-line interface, Wrangler, allows you to [create](/workers/wrangler/commands/#init), [test](/workers/wrangler/commands/#dev), and [deploy](/workers/wrangler/commands/#deploy) your Workers projects.

{{</feature>}}

{{<feature header="Bindings" href="/workers/runtime-apis/bindings/">}}

Bindings allow your Workers to interact with resources on the Cloudflare developer platform, including [R2](/r2/), [KV](/kv/concepts/how-kv-works/), [Durable Objects](/durable-objects/), and [D1](/d1/).

{{</feature>}}

{{<feature header="Playground" href="/workers/playground/" cta="Use the Playground">}}

The Playground is a sandbox which gives you an instant way to preview and test a Worker directly in the browser against any site. No setup required.

{{</feature>}}

---

## Related products

{{<related header="Workers AI" href="/workers-ai/" product="workers-ai">}}

Run machine learning models, powered by serverless GPUs, on Cloudflare’s global network.

{{</related>}}

{{<related header="R2" href="/r2/" product="r2">}}

Store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.

{{</related>}}

{{<related header="D1" href="/d1/" product="d1">}}

Create new serverless SQL databases to query from your Workers and Pages projects.

{{</related>}}

{{<related header="Durable Objects" href="/durable-objects/" product="durable-objects">}}

A globally distributed coordination API with strongly consistent storage.

{{</related>}}

{{<related header="KV" href="/kv/" product="kv">}}

Create a global, low-latency, key-value data storage.

{{</related>}}

{{<related header="Queues" href="/queues/" product="queues">}}

Send and receive messages with guaranteed delivery and no charges for egress bandwidth.

{{</related>}}

{{<related header="Hyperdrive" href="/hyperdrive/" product="hyperdrive">}}

Turn your existing regional database into a globally distributed database.

{{</related>}}

{{<related header="Vectorize" href="/vectorize/" product="vectorize">}}

Build full-stack AI applications with Vectorize, Cloudflare’s vector database.

{{</related>}}

{{<related header="Zaraz" href="/zaraz/" product="zaraz">}}

Offload third-party tools and services to the cloud and improve the speed and security of your website.

{{</related>}}



---

## More resources

{{<resource-group>}}

{{<resource header="Learning Path" href="/learning-paths/workers/" icon="reference-architecture">}}New to Workers? Get started with the Workers Learning Path.{{</resource>}}

{{<resource header="Plans" href="/workers/platform/pricing/" icon="price">}}Learn about Free and Paid plans.{{</resource>}}

{{<resource header="Limits" href="/workers/platform/limits/" icon="documentation-clipboard">}}Learn about plan limits (Free plans get 100,000 requests per day).{{</resource>}}

{{<resource header="Storage options" href="/workers/platform/storage-options/" icon="learning-center-book">}}Learn which storage option is best for your project.{{</resource>}}

{{<resource header="Developer Discord" href="https://discord.cloudflare.com" icon="logo-Discord">}}Connect with the Workers community on Discord to ask questions, share what you are building, and discuss the platform with other developers.{{</resource>}}

{{<resource header="@CloudflareDev" href="https://x.com/cloudflaredev" icon="twitter">}}Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Workers.{{</resource>}}

{{</resource-group>}}
