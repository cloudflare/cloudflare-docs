---
title: Overview
order: 0
type: overview
weight: 1
layout: list
pcx_content_type: landing-page
meta:
  title: Cloudflare D1 documentation
---

{{<content-column>}}

# Cloudflare D1 documentation

Built on SQLite, D1 is Cloudflare’s first [queryable relational database at the edge](https://blog.cloudflare.com/introducing-d1/). Create an entire database in a few quick steps by importing data or defining your tables and writing your queries within a Worker or through our API. With D1 you can:

* Interact with and push changes to your database directly through Wrangler
* Create and modify your database directly from the Cloudflare dashboard
* Store backups of your database in R2
* Export your backups to download to your local machine.

With D1 currently in Alpha, you can truly go full-stack and build rich apps including eCommerce sites, accounting software, SaaS solutions, CRMs and more.

{{<Aside type="warning">}}

While in the Alpha period, there is a possibility of breaking changes. The Alpha is meant for testing purposes and using it for Production traffic is not recommended.

{{</Aside>}} 

## Features coming soon
* **Larger databases**: During the alpha period, our databases will be limited to 100MB but we will be looking to support larger databases in the future. If your use case requires a larger database, please reach out to tell us about what you are building in our [Community Forum](https://community.cloudflare.com/c/developers/d1)
* **Read replication**: D1 will create read-only clones of your data and distribute across Cloudflare global network — close to where your users are — and constantly keep them up-to-date with changes.
* **Transactions**: Define a chunk of your Worker code that runs directly next to the database, giving you total control and maximum performance—each request first hits your Worker near your users, but depending on the operation, can hand off to another Worker deployed alongside a replica or your primary D1 instance to complete its work.

## Community support

Reach out to us on the [Cloudflare Developer Discord](https://discord.com/invite/cloudflaredev) in the [#d1-open-alpha channel](https://discord.com/channels/595317990191398933/992060581832032316). In this channel, you will be able to ask questions, surface any issues you run into, provide feedback and show off your projects directly with our product and engineering team.

[Follow @CloudflareDev on Twitter](https://twitter.com/cloudflaredev) to learn about product announcements, new tutorials, and what is new in Cloudflare Pages.

### Connect with the D1 team

To discuss an issue with the D1 team, open a thread on the [Community Forum](https://community.cloudflare.com/c/developers/d1).

### Connect with the Wrangler team

If you are having issues with Wrangler, report issues in the [wrangler2 GitHub repository](https://github.com/cloudflare/wrangler2/issues/new/choose).

{{</content-column>}}
