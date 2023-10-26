---
title: Authentication
pcx_content_type: how-to
weight: 2
---

# Authentication

You can generate an API token to serve as the Access Key for usage with existing S3-compatible SDKs or XML APIs. 

You must purchase R2 before you can generate an API token.

To create an API token: 

1. In **Account Home**, select **R2**.
2. Under **Account details**, select **Manage R2 API tokens**.
3. Select [**Create API token**](https://dash.cloudflare.com/?to=/:account/r2/api-tokens).
4. Select the **R2 Token** text to edit your API token name.
5. Under **Permissions**, choose a permission types for your token. Refer to [Permissions](#permissions) for information about each option.
6. (Optional) If you select the **Object Read and Write** or **Object Read** permissions, you can scope your token to a set of buckets.
7. Select **Create API Token**.

After your token has been successfully created, review your **Secret Access Key** and **Access Key ID** values. These may often be referred to as Client Secret and Client ID, respectively.

{{<Aside type="warning">}}

You will not be able to access your **Secret Access Key** again after this step. Copy and record both values to avoid losing them.

{{</Aside>}}

You will also need to configure the `endpoint` in your S3 client to `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`.

Find your [account ID in the Cloudflare dashboard](/fundamentals/setup/find-account-and-zone-ids/).

Buckets created with jurisdictions must be accessed via jurisdiction-specific `endpoint`s:

- European Union (EU): `https://<ACCOUNT_ID>.eu.r2.cloudflarestorage.com`
- FedRAMP: `https://<ACCOUNT_ID>.fedramp.r2.cloudflarestorage.com`

{{<Aside type="warning">}}

Jurisdictional buckets can only be accessed via the corresponding jurisdictional endpoint. Most S3 clients will not let you configure multiple `endpoint`s, so you'll generally have to initialize one client per jurisdiction.

{{</Aside>}}

## Permissions

| Permission | Description |
|------------|-------------|
| Admin Read and Write | Allows the ability to create, list and delete buckets, and edit bucket configurations in addition to list, write, and read object access. |
| Admin Read only | Allows the ability to list buckets and view bucket configuration in addition to list and read object access. |
| Object Read & Write | Allows the ability to read, write, and list objects in specific buckets. |
| Object Read only | Allows the ability to read and list objects in specific buckets. |
