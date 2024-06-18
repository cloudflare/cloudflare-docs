---
title: Overview
order: 0
type: overview
weight: 1
layout: overview
pcx_content_type: overview
meta:
  title: Hyperdrive
---

# Hyperdrive

{{<description>}}

Turn your existing regional database into a globally distributed database.

{{</description>}}

{{<plan type="workers-paid">}}

Hyperdrive is a service that accelerates queries you make to existing databases, making it faster to access your data from across the globe, irrespective of your users' location. Hyperdrive supports any Postgres database, including those hosted on AWS, Google Cloud and Neon, as well as Postgres-compatible databases like CockroachDB and Timescale, with MySQL coming soon.

Use your existing Postgres drivers and object-relational mapping (ORM) libraries of your choice without any changes. Hyperdrive gives you a connection string that looks just like any other. You do not need to write new code or replace your favorite tools: Hyperdrive works with the ones you already use.

---

## Features
 
{{<feature header="Connect your database" href="/hyperdrive/get-started/" cta="Connect Hyperdrive to your database">}}

Connect Hyperdrive to your existing database and deploy a [Worker](/workers/) that queries it.

{{</feature>}}

{{<feature header="PostgreSQL support" href="/hyperdrive/configuration/connect-to-postgres/" cta="Connect Hyperdrive to your PostgreSQL database">}}

Hyperdrive allows you to connect to any PostgreSQL or PostgreSQL-compatible database.

{{</feature>}}

{{<feature header="Query Caching" href="/hyperdrive/configuration/query-caching/" cta="Learn about Query Caching">}}

Use Hyperdrive to cache the most popular queries executed against your database.

{{</feature>}}

---

## Related products

{{<related header="Workers" href="/workers/" product="workers">}}

Build serverless applications and deploy instantly across the globe for exceptional performance, reliability, and scale.

{{</related>}}

{{<related header="Pages" href="/pages/" product="pages">}}

Deploy dynamic front-end applications in record time.

{{</related>}}

---

## More resources
 
{{<resource-group>}}
 
{{<resource header="Pricing" href="/hyperdrive/platform/pricing/" icon="price">}}Learn about Hyperdrive's pricing.{{</resource>}}
 
{{<resource header="Limits" href="/hyperdrive/platform/limits/" icon="documentation-clipboard">}}Learn about Hyperdrive limits.{{</resource>}}

{{<resource header="Storage options" href="/workers/platform/storage-options/" icon="documentation-clipboard">}}Learn more about the storage and database options you can build on with Workers.{{</resource>}}

{{<resource header="Developer Discord" href="https://discord.cloudflare.com" icon="logo-Discord">}}Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.{{</resource>}}

{{<resource header="@CloudflareDev" href="https://x.com/cloudflaredev" icon="twitter">}}Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Developer Platform.{{</resource>}}
 
{{</resource-group>}}
