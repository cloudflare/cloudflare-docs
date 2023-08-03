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

Create low-latency, permanent, and consistent storage.

{{</description>}}

{{<plan type="paid">}}

Durable Objects are Cloudflare's storage and coordination solution. Durable Objects provide you with scalable compute and strong transactional consistency. With Durable Objects, you can coordinate requests without accessing storage. 


Use Durable Objects to facilitate real-time chat, collaborative editing, video conferencing, game sessions and more.

---

## Features

{{<feature header="Transactional Storage API" href="/durable-objects/api/transactional-storage-api/">}}

Learn how Durable Objects provide consistent key-value storage.

{{</feature>}}

{{<feature header="Hibernatable WebSockets API" href="/durable-objects/api/hibernatable-websockets-api/">}}

Learn how the Hibernatable WebSockets API allows you to keep a long-term connection.

{{</feature>}}

{{<feature header="Durable Objects Alarms" href="/durable-objects/api/alarms-in-durable-objects/">}}

Learn how to schedule the Object to be waken up at a time in the future. 

{{</feature>}}

---

## Related products

{{<related header="Workers" href="/workers/" product="workers">}}

Cloudflare Workers provides a serverless execution environment that allows you to create new applications or augment existing ones without configuring or maintaining infrastructure.

{{</related>}}

{{<related header="D1" href="/d1/" product="d1">}}

D1 is Cloudflare’s native serverless database. Create a database by importing data or defining your tables and writing your queries within a Worker or through the API.

{{</related>}}

{{<related header="R2" href="/r2/" product="r2">}}

Cloudflare R2 Storage allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.

{{</related>}}

---

## More resources

{{<resource-group>}}
 
{{<resource header="Limits" href="/durable-objects/platform/limits/" icon="documentation-clipboard">}}Learn about Durable Objects limits.{{</resource>}}

{{<resource header="Pricing" href="/durable-objects/platform/pricing/" icon="reference-architecture">}}Learn about Durable Objects pricing.{{</resource>}}

{{<resource header="Storage options" href="/workers/learning/storage-options/" icon="documentation-clipboard">}}Learn more about storage and database options you can build with Workers.{{</resource>}}

{{<resource header="Developer Discord" href="https://discord.gg/cloudflaredev" icon="logo-Discord">}}Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.{{</resource>}}

{{<resource header="@CloudflareDev" href="https://twitter.com/cloudflaredev" icon="twitter">}}Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Developer Platform.{{</resource>}}
 
{{</resource-group>}}