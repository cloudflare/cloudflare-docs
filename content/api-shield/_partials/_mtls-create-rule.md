---
_build:
  publishResources: false
  render: never
  list: never
---

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.

2. Go to **SSL/TLS** > **Client Certificates**.

3. Select **Create a mTLS rule**.

4. In **Custom rules**, several rule parameters have already been filled in. Enter the URI path you want to protect in **Value**.

5. (Optional) Add a `Hostname` field and enter the mTLS-enabled hostnames you wish to protect in **Value**.

6. In **Choose action**, select `Block`.

7. Select **Deploy** to make the rule active.

Once you have deployed your mTLS rule, any requests without a [valid client certificate](/ssl/client-certificates/) will be blocked.
