---
pcx_content_type: how-to
title: Scoped API tokens
weight: 3
---

# Scoped API tokens

The administrators managing policies and groups in Cloudflare Access might be different from the users responsible for configuring firewall rules or other Cloudflare settings. Cloudflare Access supports [scoped API tokens](/fundamentals/api/get-started/create-token/) so that team members and automated systems can manage settings specific to Access without having permission to modify other configurations in Cloudflare.

## Creating a scoped API token

1.  In the [Cloudflare dashboard](https://dash.cloudflare.com/), select the user icon > **My Profile**.

1.  Select the **API Tokens** tab. The existing tokens will display.

    ![Existing API tokens listed in the API Tokens tab.](/images/cloudflare-one/api-terraform/create-token.png)

1.  Select **Create Token**.

1.  Select **Get started** next to **Create Custom Token**.

1.  Select **Account** and **Access: Organizations, Identity Providers, and Groups** in the drop-downs under **Permissions**. You can configure the token to be Read or Write in the third drop-down.

    ![Dropdown displaying read and write options for API token customization.](/images/cloudflare-one/api-terraform/edit-token.png)

1.  In the final section, the token can be applied to a single account or multiple if you are an administrator of multiple Cloudflare accounts.

1.  Select **Continue to summary**. The next page will display the token details and instructions on how to use it.

## Review tokens

You can review tokens created in the **API Tokens** tab. In this view, you can roll, revoke, or edit issued tokens.

![A list of created API tokens.](/images/cloudflare-one/api-terraform/view-token.png)
