---
pcx_content_type: how-to
title: Edit variables
weight: 8
meta:
    title: Edit a variable
---

# Edit a variable

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2. Go to **Zaraz** > **Tools Configuration** > **Variables**.
3. Locate the variable you want to edit, and select **Edit** to make your changes.
4. Select **Save** to save your edits. 

## Delete a variable

{{<Aside type="warning" header="Important">}}You cannot delete a variable being used in tools or triggers.{{</Aside>}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2. Go to **Zaraz** > **Tools Configuration** > **Third-party tools**. 
3. Locate any tools using the variable, and delete the variable from those tools.
4. Select **Zaraz** > **Tools Configuration** > **Triggers**. 
5. Locate all the triggers using the variable, and delete the variable from those triggers.
6. Navigate to **Zaraz** > **Tools Configuration** > **Variables**.
7. Locate the variable you want to delete, and select **Delete**.