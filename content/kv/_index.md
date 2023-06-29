
---
title: Workers KV
weight: xx
layout: overview
pcx_content_type: overview
---

# Workers KV

{{<description>}}
A global, low-latency, key-value data storage solution. 
{{</description>}}

{{<plan type="paid">}}

Workers KV supports exceptionally high read volumes with low latency, making it possible to build highly dynamic APIs and websites that respond as quickly as a cached static file would. 

With Workers KV, reads are periodically revalidated in the background, and requests which are not in cache and need to hit the centralized back end can see high latencies.

---

## Features

{{<feature header="Key-value storage" href="/kv/get-started/">}}
Learn how Workers KV stores data in a small number of centralized data centers, then caches that data in Cloudflare's data centers after access.
{{</feature>}}

{{<feature header="Wrangler" href="/workers/wrangler/install-and-update/">}}

The Workers command-line interface, Wrangler, allows you to [create](/workers/wrangler/commands/#init), [test](/workers/wrangler/commands/#dev), and [deploy](/workers/wrangler/commands/#publish) your Workers projects.

{{</feature>}}

{{<feature header="Bindings" href="/kv/learning/kv-bindings/">}}

Bindings allow your Workers to interact with resources on the Cloudflare developer platform, including [R2](/r2/), [KV](/workers/learning/how-kv-works/), [Durable Objects](/workers/learning/using-durable-objects/), and [D1](/d1/).

{{</feature>}}

---

## Related products

{{<related header="R2" href="/r2/" product="r2">}}

Cloudflare R2 Storage allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.

{{</related>}}

{{<related header="Durable Objects" href="/durable-objects/" product="durable objects">}}

Cloudflare Durable Objects allows developers to access scalable compute and permanent, consistent storage. 

{{</related>}}

{{<related header="D1" href="/d1/" product="d1">}}

Built on SQLite, D1 is Cloudflare’s first queryable relational database. Create an entire database by importing data or defining your tables and writing your queries within a Worker or through the API.

{{</related>}}

--- 

### More resources

{{<resource-group>}}

{{<resource header="Limits" href="/kv/platform/limits/" icon="documentation-clipboard">}} Learn about limits that apply to your Workers KV project. {{</resource>}}

{{<resource header="Pricing" href="/kv/platform/pricing/" icon="price">}} Understand pricing for free and paid tier rates. {{</resource>}}

{{<resource header="Discord" href="https://discord.com/channels/595317990191398933/893253103695065128" icon="logo-Discord">}} Ask questions, show off what you are building, and discuss the platform with other developers. {{</resource>}}

{{<resource header="Twitter" href="https://twitter.com/cloudflaredev" icon="twitter">}} Learn about product announcements, new tutorials, and what is new in Cloudflare Workers. {{</resource>}}

{{</resource-group>}}