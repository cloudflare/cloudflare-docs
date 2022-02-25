---
title: Activate the Cloudflare WordPress plugin
order: 7
pcx-content-type: tutorial
---

# Activate the Cloudflare WordPress plugin

For users on the free plan, be sure to purchase APO before installing the WordPress plugin. For users on a Pro plan or higher, continue to Install and activate the Cloudflare WordPress plugin.

## Purchase APO

1. Open your Cloudflare dashboard.
1. Select the **Speed** tile and locate the **Optimized Delivery** section.
1. From **Automatic Platform Optimization for WordPress**, select **Purchase**.
1. Enter your payment information and select **Confirm payment**.

## Install and activate the Cloudflare WordPress plugin

The easiest way to begin using APO is directly from Cloudflare’s WordPress plugin. Before you can use APO, you must first install and activate the plugin and then activate APO.

1. Navigate and log in to your WordPress account.
1. Select **Plugins** > **Add new**.
1. In the search field, enter `Cloudflare`.
1. Locate the Cloudflare plugin and select **Install now**.
1. After the plugin finishes installing, select **Activate**. The Cloudflare plugin now displays in your Plugins list.

<Aside type="warning">

Cloudflare recommends turning off plugins such as WP Rocket Cache Plugin, W3 Total Cache, or similar plugins when first setting up APO. After confirming APO is working, we recommend testing whether turning on the plugins listed above improves results or causes unexpected behavior. In many cases, using APO along with other caching plugins can cause unexpected results.

We also recommend clearing the server cache for the WP Rocket Cache plugin, W3 Total Cache, or similar plugins after APO activation.

</Aside>

## Activate APO

To create the connection between WordPress and Cloudflare, you will create an API token from your Cloudflare dashboard and add it to WordPress. To set up APO on a subdomain, refer to [Subdomains and subdirectories](/reference/subdomain-subdirectories).

## Create the API token from Cloudflare

1. Open your Cloudflare dashboard.
1. Select **My Profile** from the top of the page. 
1. Select **API Tokens** > **Create Token**.
1. Locate **WordPress** from the list and select **Use template**.
1. Select **Continue to summary** at the bottom of the page.
1. On the **WordPress API token summary** page, select **Create Token**. Your API token displays.
1. Select the **Copy** button to copy your token. You will need to paste the token in the next section.

<Aside>

Copy and paste your API token into a document saved on your computer to easily reference it again.

</Aside>

## Add your API token to WordPress

1. Open your WordPress account and navigate to Plugins.
1. Locate the Cloudflare plugin and select **Settings**.
1. Select the option to sign in with an existing account.
1. Enter your email address and paste the token you copied in Step 5 of Create the API token from Cloudflare.
1. Select **Save API Credentials**.
1. For **Apply Recommended Cloudflare Settings for WordPress**, select **Apply**.
1. For **Automatic Platform Optimization**, switch the toggle to **On** to enable APO.

To verify APO is working, see [Verify APO works](/get-started/verify-apo-works).
