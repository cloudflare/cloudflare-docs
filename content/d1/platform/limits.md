---
pcx_content_type: concept
title: Limits
---

# Limits

While D1 is in Alpha, there are some limits to be aware of prior to begin testing.

* **Database size**: You can have a max database size of 100 MB. There are no limitations on rows and columns as long as your database falls within the size limitation.
* **Databases per account**: Create up to 10 D1 databases on a single account. If you need more, reach out to the team.
* **Backups**: Backups automatically run every hour. Backups will block access to the DB while they’re running. In most cases this should only be a second or two, and any requests that arrive during the backup will be queued.

{{<Aside type="note">}}

If you would like to explore other storage solutions for your application, Cloudflare also offers [Workers KV](/workers/runtime-apis/kv/), [Durable Objects](/workers/runtime-apis/durable-objects/), and [R2](/r2/get-started/). 

Refer to the [Storage options guide](/workers/platform/storage-objects/) to review which storage option is right for your use case.

{{</Aside>}}
