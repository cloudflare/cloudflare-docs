---
title: Create API token
order: 8
---

# Create an API token

To create the connection between WordPress and Cloudflare, you'll create an API token from your Cloudflare dashboard and add it to WordPress.

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
1. For **Purge Cache**, select **Purge Cache** and then **Purge Everything**.
