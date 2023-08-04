---
title: Overview
order: 0
type: overview
weight: 1
layout: overview
pcx_content_type: overview
meta:
  title: Cloudflare Durable Objects
---

# Cloudflare Durable Objects

{{<description>}}

A globally distributed coordination API with strongly consistent storage.

{{</description>}}

{{<plan type="paid">}}

Durable Objects provide a powerful API for coordinating the actions of multiple clients or users, each with private, transactional and strongly consistent storage attached.

Developers use Durable Objects to to build collaborative editing, interactive chat, multiplayer games and other applications that have a strong need to coordinate the actions of multiple clients, without requring you to build serialization and coordination primitives on your own. 

You can create millions of (or more) Durable Objects, representing a document, chat session, multiplayer game or other aspect of your system where events need to be coordinated or serialized. Each Durable Object is automatically located as close to the client or user as possible, minimizing latency between the client and Durable Objects.

---

## Features

{{<feature header="Transactional Storage API" href="/durable-objects/learning/in-memory-state/">}}

Understand how Durable Objects can act as a powerful coordination API for managing the actions of multiple clients or events.

{{</feature>}}

{{<feature header="Transactional Storage API" href="/durable-objects/api/transactional-storage-api/">}}

Learn how Durable Objects provide strongly consistent, serializable key-value storage.

{{</feature>}}

{{<feature header="Hibernatable WebSockets API" href="/durable-objects/api/hibernatable-websockets-api/">}}

Learn how the Hibernatable WebSockets API allows you to manage the connections of multiple clients at scale.

{{</feature>}}

{{<feature header="Durable Objects Alarms" href="/durable-objects/api/alarms-in-durable-objects/">}}

Learn how to trigger a Durable Object to wake up and perform compute in the future at customizable intervals.

{{</feature>}}

---

## Related products

{{<related header="Workers" href="/workers/" product="workers">}}

Cloudflare Workers provides a serverless execution environment that allows you to create new applications or augment existing ones without configuring or maintaining infrastructure.

{{</related>}}

{{<related header="D1" href="/d1/" product="d1">}}

D1 is Cloudflare’s SQL-based native serverless database. Create a database by importing data or defining your tables and writing your queries within a Worker or through the API.

{{</related>}}

{{<related header="R2" href="/r2/" product="r2">}}

Cloudflare R2 Storage allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.

{{</related>}}

---

## More resources

{{<resource-group>}}

{{<resource header="Built with Durable Objects" href="https://workers.cloudflare.com/built-with/collections/durable-objects/" icon="reference-architecture">}}See what other developers have built with Durable Objects.{{</resource>}}
 
{{<resource header="Limits" href="/durable-objects/platform/limits/" icon="documentation-clipboard">}}Learn about Durable Objects limits.{{</resource>}}

{{<resource header="Pricing" href="/durable-objects/platform/pricing/" icon="reference-architecture">}}Learn about Durable Objects pricing.{{</resource>}}

{{<resource header="Storage options" href="/workers/learning/storage-options/" icon="documentation-clipboard">}}Learn more about storage and database options you can build with Workers.{{</resource>}}

{{<resource header="Developer Discord" href="https://discord.gg/cloudflaredev" icon="logo-Discord">}}Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.{{</resource>}}

{{<resource header="@CloudflareDev" href="https://twitter.com/cloudflaredev" icon="twitter">}}Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Developer Platform.{{</resource>}}
 
{{</resource-group>}}
