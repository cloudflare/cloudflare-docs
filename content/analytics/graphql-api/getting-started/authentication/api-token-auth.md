---
pcx_content_type: how-to
title: Configure an Analytics API token
weight: 21
---

# Configure an Analytics API token

Cloudflare recommends API tokens as the preferred authentication method with Cloudflare APIs. This article walks through creating API tokens for authentication to the GraphQL Analytics API.

For more details on API tokens and the full range of supported options, refer to [Creating API tokens](/api/get-started/create-token/).

To create an API token for authentication to the GraphQL Analytics API, use this workflow:

- [Access the Create API Token page](#access-the-create-api-token-page)
- [Configure a custom API token](#configure-a-custom-api-token)
- [Review and create your API token](#review-and-create-your-api-token)
- [Copy and test your API token](#copy-and-test-your-api-token)

## Access the Create API Token page

To access the **Create Custom Token** page, follow these steps:

1.  Log in to your Cloudflare account and select _My Profile_ from the user account drop-down list.

![User account drop-down menu](/analytics/static/images/account-profile.png)

1.  In your user profile page, select the **API Tokens** tab.

2.  In the **API Tokens** page, click **Create Token**.

![API Tokens tab](/analytics/static/images/user-profile-api-tokens-tab.png)

The **Create API Token** page displays.

![Clicking Get started in the Create API Token page](/analytics/static/images/create-api-token-page-display.png)

The next section of this walkthrough shows you how to configure a custom token for access to the GraphQL Analytics API.

## Configure a custom API token

To configure a custom token, follow these steps:

1.  Click **Get started** in the **Custom token** section of the **Create API Token** page:

![Clicking Get started in the Create API Token page](/analytics/static/images/create-api-token-get-started.png)

The **Create Custom Token** page displays:

![Create Custom Token page](/analytics/static/images/create-custom-api-token.png)

1.  Enter a descriptive name for your token in the **Token name** text input field.

2.  To configure access to the GraphQL Analytics API, use the **Permissions** drop-down lists. To set permissions for the GraphQL Analytics API, select _Analytics_ from the second drop-down list.

This example scopes zone-level permissions for read access to the Analytics API:

![Permissions configuration page](/analytics/static/images/create-custom-token-permissions.png)

1.  To configure the specific zones to which the token grants access, use the **Zone Resources** drop-down lists. In this example, the token is set to grant access to all zones:

![Resources configuration page](/analytics/static/images/create-custom-token-zone-resources.png)

1.  \[Optional] To restrict the API token to specific IP addresses, use the **IP Address Filtering** controls.

![IP Address Filtering configuration page](/analytics/static/images/create-custom-token-ip-address-filtering.png)

1.  To define how long the token is valid, click the **TTL** (time-to-live) start/end date picker.

![TTL configuration page](/analytics/static/images/create-custom-token-ttl.png)

1.  Click **Continue to summary**.

The next section of this walkthrough covers how to review and test your API token.

## Review and create your API token

Once you click **Continue to summary**, the **API Token Summary** page displays.

Use the **API Token Summary** to confirm that you have scoped the API Token to the desired permissions and resources before creating it.

![API Token Summary page](/analytics/static/images/api-token-summary.png)

Once you have validated your API token configuration, click **Create Token**.

## Copy and test your API token

When you create a new token, a confirmation page displays that includes your token and a custom `curl` command.

![Page displaying your API token and the `curl`command to test your token](/analytics/static/images/api-token-confirmation-page.png)

To copy the token to your device's clipboard, click the **Copy** button.

{{<Aside type="warning" header="Warning">}}

The token displays only on the confirmation page, so copy the token and store it safely, since anyone who has the token can use it to access your data.

If you lose the token, you can [regenerate it from the API Tokens page](https://support.cloudflare.com/hc/en-us/articles/200167836-Managing-API-Tokens-and-Keys#12345681), so that you do not have to configure all the permissions again.

{{</Aside>}}

To test your token, copy the `curl` command and paste it into a terminal.

When you have finished, click **View all API tokens**.
