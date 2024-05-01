---
title: Durability
pcx_content_type: concept
---

# Durability

R2 was designed for data durability and resilience and provides 99.999999999% (eleven 9s) of annual durability, which describes the likelihood of data loss.

For example, if you store 1,000,000 objects on R2, you can expect to lose an object once every 100,000 years, which is the same level of durability as other major providers.

{{<Aside type="warning">}}

Keep in mind that if you accidentally delete an object, you are responsible for implementing your own solution for backups.

{{</Aside>}}
