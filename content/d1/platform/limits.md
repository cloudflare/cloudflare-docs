---
pcx_content_type: concept
title: Limits
---

## Limits

While D1 is in Alpha, there are some limits to be aware of prior to begin testing.

* **Database size**: You can have a max database size of 100 MB. There are no limitations on rows and columns as long as your database falls within the size limitation.
* **Databases per account**: Create up to 10 D1 databases on a single account. If more is needed, please reach out to the team.
* **Backups**: Backups will not be automatic. They must be manually triggered.

{{<Aside type="note">}}

If you would like to explore other storage solutions for your application, Cloudflare also offers [Workers KV](https://developers.cloudflare.com/workers/runtime-apis/kv/), [Durable Objects](https://developers.cloudflare.com/workers/runtime-apis/durable-objects/) and [R2](https://developers.cloudflare.com/r2/get-started/). 

Refer to the [Storage options guide](/workers/platform/storage-objects/) to review which storage option is right for your use case.

{{</Aside>}}