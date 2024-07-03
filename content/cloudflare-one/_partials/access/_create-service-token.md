---
_build:
  publishResources: false
  render: never
  list: never
---

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Service Auth** > **Service Tokens**.

2. Select **Create Service Token**.

3. Name the service token. The name allows you to easily identify events related to the token in the logs and to revoke the token individually.

4. Choose a **Service Token Duration**. This sets the expiration date for the token.

5. Select **Generate token**. You will see the generated Client ID and Client Secret for the service token, as well as their respective request headers.

6. Copy the Client Secret.

   {{<Aside type="warning">}}This is the only time Cloudflare Access will display the Client Secret. If you lose the Client Secret, you must generate a new service token.
   {{</Aside>}}
