---
_build:
  publishResources: false
  render: never
  list: never
---

If your token is lost or believed to be compromised, you can either create a new token or your token can be rolled to generate a new secret. Rolling your secret key into a new one will invalidate the previous secret, but the access and permissions will be the same as the previous key.

To roll your API token:

1.  Log in to your [Cloudflare account](https://dash.cloudflare.com) and go to **User Profile** > **API Tokens**.
2.  Next to the API token you wish to roll, click the **three dot icon** > **Roll**.
3.  Then, click **Confirm** to continue and you will see a new API token secret key.