---
title: Overview
order: 0
type: overview
weight: 1
layout: overview
pcx_content_type: overview
meta:
  title: Cloudflare D1
---

# Cloudflare D1

{{<description>}}

Create new serverless SQL databases to query from your Workers and Pages projects.

{{</description>}}

D1 is Cloudflare’s native serverless database. Create your first D1 database by [following the Get started guide](/d1/get-started/), learn how to [import data into a database](/d1/learning/importing-data/), and how to [query your database](/d1/platform/client-api/) directly from [Workers](/workers/) or [Pages](/pages/platform/functions/bindings/#d1-databases).

{{<Aside type="warning" header="Open Alpha">}}

While in the [Open Alpha](https://blog.cloudflare.com/d1-open-alpha/) period, there is a possibility of breaking changes. The Alpha is meant for testing purposes and using it for production traffic is not recommended.

To report bugs or request features, go to the [Cloudflare Community Forums](https://community.cloudflare.com/c/developers/d1/85). To give feedback, go to the [D1 Discord channel](https://discord.com/invite/cloudflaredev). If you are having issues with Wrangler, report issues in the [Wrangler GitHub repository](https://github.com/cloudflare/workers-sdk/issues/new/choose).

{{</Aside>}}

## Get started
 
{{<feature header="Create your first database" href="/d1/get-started/">}}

Learn how to create your first D1 database, establish a schema, import data and query D1 directly from an application [built with Workers](/workers/).

{{</feature>}}

{{<feature header="Workers" href="/workers/">}}

Build serverless applications and deploy instantly across the globe for exceptional performance, reliability, and scale.

{{</feature>}}

{{<feature header="Pages" href="/pages/">}}

Deploy dynamic front-end applications in record time.

{{</feature>}}

## Coming soon

* **Larger databases**: During the alpha period, the maximum per-database size is limited to 500 MB. We plan to support not only larger databases, but more databases, in the near future.

* **Read replication**: D1 will create and distribute replicas of your data across the Cloudflare global network, reducing the latency for your read queries. Cloudflare distributes your data close to where your users are and keeps your read replicas up to date with changes.

* **Metrics and observability**: Both the D1 dashboard and the [GraphQL analytics API](/analytics/graphql-api/) will include new metrics for query volume, errors, and storage consumed, so you can better troubleshoot issues and track costs.

## More resources
 
{{<resource-group>}}
 
{{<resource header="Pricing" href="/d1/platform/pricing/" icon="price">}}Learn about D1 pricing. While in Alpha, D1 will be free for all users to test and experiment with.{{</resource>}}
 
{{<resource header="Limits" href="/d1/platform/limits/" icon="documentation-clipboard">}}Learn about what limits D1 has and how to work within them.{{</resource>}}

{{<resource header="Community projects" href="/d1/platform/community-projects/" icon="reference-architecture">}}Browse what developers are building with D1.{{</resource>}}

{{<resource header="Storage options" href="/workers/learning/storage-options/" icon="documentation-clipboard">}}Learn more about the storage and database options you can build on with Workers.{{</resource>}}

{{<resource header="Developer Discord" href="https://discord.cloudflare.com" icon="logo-Discord">}}Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.{{</resource>}}

{{<resource header="@CloudflareDev" href="https://twitter.com/cloudflaredev" icon="twitter">}}Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Developer Platform.{{</resource>}}
 
{{</resource-group>}}

