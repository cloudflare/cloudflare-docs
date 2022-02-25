---
title: Create custom cache keys
pcx-content-type: how-to
---

# Create custom cache keys

<Aside type="note" header="Note">

Creating custom cache keys is limited to Enterprise users only.

</Aside>

1.  Log in to your Cloudflare account.
2.  Select the domain that requires changes to the Cache Key Template.
3.  Click the **Rules** > **Page Rules**.
4.  Click **Create Page Rule**.
5.  Under **If the URL matches**, enter the URL to match.
6.  Under **Then the settings are**, choose **Custom Cache Key** from the dropdown.
7.  Click the appropriate *Query String* setting.
8.  (Optional) Click Advanced and enter appropriate settings for:
    *   `Headers`
    *   `Cookie`
    *   `Host`
    *   `User Features`
9.  Choose a save option:
    *   **Save as Draft** to save the rule and leave it disabled. Note that disabled rules count towards the number of rules allowed for your domain.
    *   \*\*Save and Deploy \*\*to save the rule and enable it immediately.
