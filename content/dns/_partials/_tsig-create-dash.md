---
_build:
  publishResources: false
  render: never
  list: never
---

To create a TSIG using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Manage Account** > **Configurations**.
3. Click **DNS Zone Transfers**.
4. For **TSIG**, click **Create**. 
5. Enter the following information:
    - **TSIG name**: Provide a descriptive name.
    - **Secret (optional)**: Get a shared secret to add to your third-party nameservers. If left blank, this field generates a random secret.
    - **Algorithm**: Choose a TSIG signing algorithm.
6. Click **Create**.