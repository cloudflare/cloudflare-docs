---
title: Cloudflare Workers KV
weight: 1
layout: overview
pcx_content_type: overview
---

# Cloudflare Workers KV

{{<description>}}
Create a global, low-latency, key-value data storage. 
{{</description>}}

{{<plan type="workers-all">}}

Workers KV is a data storage that allows you to store and retrieve data globally. With Workers KV, you can build dynamic and performant APIs and websites that support high read volumes with low latency. 

---

## Features

{{<feature header="Key-value storage" href="/kv/get-started/">}}
Learn how Workers KV stores and retrieves data.
{{</feature>}}

{{<feature header="Wrangler" href="/workers/wrangler/install-and-update/">}}

The Workers command-line interface, Wrangler, allows you to [create](/workers/wrangler/commands/#init), [test](/workers/wrangler/commands/#dev), and [deploy](/workers/wrangler/commands/#publish) your Workers projects.

{{</feature>}}

{{<feature header="Bindings" href="/kv/concepts/kv-bindings/">}}

Bindings allow your Workers to interact with resources on the Cloudflare developer platform, including [R2](/r2/), [Durable Objects](/durable-objects/), and [D1](/d1/).

{{</feature>}}

---

## Related products

{{<related header="R2" href="/r2/" product="r2">}}

Cloudflare R2 Storage allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.

{{</related>}}

{{<related header="Durable Objects" href="/durable-objects/" product="durable-objects">}}

Cloudflare Durable Objects allows developers to access scalable compute and permanent, consistent storage. 

{{</related>}}

{{<related header="D1" href="/d1/" product="d1">}}

Built on SQLite, D1 is Cloudflare’s first queryable relational database. Create an entire database by importing data or defining your tables and writing your queries within a Worker or through the API.

{{</related>}}

--- 

### More resources

{{<resource-group>}}

{{<resource header="Limits" href="/kv/platform/limits/" icon="documentation-clipboard">}} Learn about KV limits. {{</resource>}}

{{<resource header="Pricing" href="/kv/platform/pricing/" icon="price">}} Learn about KV pricing. {{</resource>}}

{{<resource header="Discord" href="https://discord.com/channels/595317990191398933/893253103695065128" icon="logo-Discord">}} Ask questions, show off what you are building, and discuss the platform with other developers. {{</resource>}}

{{<resource header="Twitter" href="https://x.com/cloudflaredev" icon="twitter">}} Learn about product announcements, new tutorials, and what is new in Cloudflare Developer Platform. {{</resource>}}

{{</resource-group>}}
