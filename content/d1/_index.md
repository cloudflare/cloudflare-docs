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

{{<plan type="all">}}

Built on SQLite, D1 is Cloudflare’s first queryable relational database. Create a database by [importing data](/d1/learning/importing-data/) or [defining your tables](/d1/get-started/#5-run-a-query-against-your-d1-database). [Write queries within a Worker](/d1/get-started/#write-queries-within-your-worker) or [Pages project](/pages/platform/functions/bindings/#d1-databases).

With D1, you can [interact with and push changes to your database directly through Wrangler](/d1/get-started/#1-install-and-authenticate-wrangler), create and modify your database directly from the Cloudflare dashboard, store backups of your database in R2 and [export your backups to download to your local machine](/d1/learning/backups/).

{{<Aside type="warning" header="Open Alpha">}}

While in the [Open Alpha](https://blog.cloudflare.com/d1-open-alpha/) period, there is a possibility of breaking changes. The Alpha is meant for testing purposes and using it for production traffic is not recommended.

With D1 currently in Alpha, go full-stack and build applications like e-commerce sites, accounting software, SaaS solutions, and CRMs.

To report bugs or request features, go to the [Cloudflare Community Forums](https://community.cloudflare.com/c/developers/d1/85). To give feedback, go to the [D1 Discord channel](https://discord.com/invite/cloudflaredev). If you are having issues with Wrangler, report issues in the [Wrangler GitHub repository](https://github.com/cloudflare/workers-sdk/issues/new/choose).

{{</Aside>}}

## Features
 
{{<feature header="Wrangler" href="/workers/wrangler/install-and-update/">}}

Manage your database with Workers. The Workers command-line interface, Wrangler, allows you to [create](/workers/wrangler/commands/#init), [test](/workers/wrangler/commands/#dev), and [deploy](/workers/wrangler/commands/#publish) your Workers.

{{</feature>}}

{{<feature header="Workers" href="/workers/">}}

Build serverless applications and deploy instantly across the globe for exceptional performance, reliability, and scale.

{{</feature>}}

{{<feature header="Pages" href="/pages/">}}

Deploy dynamic front-end applications.

{{</feature>}}

## Coming soon

* **Larger databases**: During the alpha period, database size is limited to 100 MB. We plan to support larger databases in the future. If your use case requires a larger database, complete the [Limit Increase Request Form](https://docs.google.com/forms/d/e/1FAIpQLSd_fwAVOboH9SlutMonzbhCxuuuOmiU1L_I5O2CFbXf_XXMRg/viewform) and we will contact you.

* **Read replication**: D1 will create and distribute read-only clones of your data across the Cloudflare global network. Cloudflare distributes your data close to where your users are and keeps your read-only clones up to date with changes.

* **Transactions**: Define a chunk of your Worker code that runs directly next to the database, giving you total control and maximum performance. Each request first hits your Worker near your users. Depending on the operation, your Worker can hand off to another Worker deployed alongside a replica, or your primary D1 instance, to complete its work.

## More resources
 
{{<resource-group>}}
 
{{<resource header="Pricing" href="/d1/platform/pricing/" icon="price">}}Learn about D1 pricing. While in Alpha, D1 will be free for all users to test and experiment with.{{</resource>}}
 
{{<resource header="Limits" href="/d1/platform/limits/" icon="documentation-clipboard">}}Learn about D1 limits and how to request an increase on a limit that conflicts with your project goals.{{</resource>}}

{{<resource header="Community projects" href="/d1/platform/community-projects/" icon="reference-architecture">}}Browse what developers are building with D1.{{</resource>}}

{{<resource header="Storage options" href="/workers/platform/storage-options/" icon="documentation-clipboard">}}Learn which storage option is best for your project.{{</resource>}}

{{<resource header="Developer Discord" href="https://discord.gg/cloudflaredev" icon="logo-Discord">}}Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.{{</resource>}}

{{<resource header="@CloudflareDev" href="https://twitter.com/cloudflaredev" icon="twitter">}}Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Developer Platform.{{</resource>}}
 
{{</resource-group>}}

