---
title: Generate an S3 Auth token
pcx_content_type: how-to
---

# Generate an S3 Auth token

In this guide, you will learn how to generate an API token to serve as the Access Key for usage with existing S3-compatible SDKs and/or XML APIs. 

You must [purchase R2](/r2/get-started/#purchase-r2) before you can generate an API token.

To create an API token: 

1. In **Account Home**, select **R2**.
2. Select **Manage R2 API Tokens** on the right side of the dashboard.
3. Select **Create API token**.
4. Select the pencil icon or **R2 Token** text to edit your API token name.
5. Under **Permissions**, select **Read** or **Edit** for your token.
6. Select **Create API Token**.

After your token has been successfully created, review your **Secret Access Key** and **Access Key ID** values. These may often be referred to as Client Secret and Client ID, respectively.

{{<Aside type="warning">}}

You will not be able to access your **Secret Access Key** again after this step. Copy and record both values to avoid losing them.

{{</Aside>}}

The S3 endpoint is available via `https://<ACCOUNT_ID>.r2.cloudflarestorage.com` endpoint. Find your [account ID in the Cloudflare dashboard](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/).
