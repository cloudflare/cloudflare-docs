---
pcx-content-type: how-to
title: Using a Worker as your origin
weight: 0
---

# Using a Worker as your origin

If you are building your application on [Cloudflare Workers](/workers/), you can use a Worker as the origin for your SaaS zone (also known as your fallback origin).

1.  In your SaaS zone, [create and set a fallback origin](/cloudflare-for-saas/start/getting-started/#step-1--create-fallback-origin-and-cname-target), but use a "fake" proxied DNS record.

    - **Example**: `service.example.com AAAA 100::`

2.  In that same zone, navigate to **Workers**.

3.  Click **Add route**.

4.  Decide whether you want traffic bound for your SaaS zone (`example.com`) to go to that Worker:

    - If _yes_, set the following values:

      - **Route**: `*/*` (routes everything — including custom hostnames — to the Worker).
      - **Worker**: Select the Worker used for your SaaS application.

    - If _no_, set the following values:

      - **Route**: `*.<zonename>.com/*` (only routes custom hostname traffic to the Worker)
      - **Worker**: **None**

5.  Click **Save**.
