---
pcx_content_type: configuration
title: Run in CI/CD
---

# Run Wrangler in CI/CD

To run Wrangler in a continuous integration/continuous deployment (CI/CD) environment, you must provide a [Cloudflare API token](/fundamentals/api/get-started/create-token/) and [account ID](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/).

## Create a Cloudflare API token

To create a token:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select the user icon on the top right of your dashboard > **My Profile**.
3. Select [**API Tokens**](https://dash.cloudflare.com/profile/api-tokens) > **Create Token**. 

![API Token Templates](/images/workers/wrangler/templates.png)

4. Select **Use template** next to **Edit Cloudflare Workers**. All templates are prefilled with a token name and permissions. You also need to modify the account and zone resources you want assigned to the token.
5. After editing your token, select **Continue to summary** and review the permissions before selecting create token.
6. Create an `.env` file in your project directory and set `CLOUDFLARE_API_TOKEN` as the key and your token as the value. 

```bash
CLOUDFLARE_API_TOKEN=<YOUR_API_TOKEN_VALUE>
```

You can also inline the value directly with the `npx wrangler deploy` command. For example: `CLOUDFLARE_API_TOKEN=XXX npx wrangler deploy`.

Refer to [API Token](/fundamentals/api/get-started/create-token/) for more information on set up.

## Account ID

You have three options for telling Wrangler which Cloudflare account to use:

- If there is only one account associated with the API token, then the account ID is inferred automatically;
- Add the `account_id` to the project's `wrangler.toml` file (for example, `account_id = "12345679"`).
- Add the account ID to the `CLOUDFLARE_ACCOUNT_ID` environment variable.
