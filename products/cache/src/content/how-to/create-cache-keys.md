---
title: Create custom cache keys
pcx-content-type: how-to
---

# Create custom cache keys

<Aside type="note" header="Note">

Creating custom cache keys is limited to Enterprise users only.
    
</Aside>

1. Log in to your Cloudflare account.
1. Select the domain that requires changes to the Cache Key Template.
1. Click the **Rules** > **Page Rules**.
1. Click **Create Page Rule**.
1. Under **If the URL matches**, enter the URL to match.
1. Under **Then the settings are**, choose **Custom Cache Key** from the dropdown.
1. Click the appropriate *Query String* setting.
1. (Optional) Click Advanced and enter appropriate settings for:
    - `Headers`
    - `Cookie`
    - `Host`
    - `User Features`
1. Choose a save option:
    - **Save as Draft** to save the rule and leave it disabled. Note that disabled rules count towards the number of rules allowed for your domain.
    - **Save and Deploy **to save the rule and enable it immediately.

