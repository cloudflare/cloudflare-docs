---
pcx_content_type: how-to
title: Create variables
weight: 4
---

# Create variables

Variables allow you to have one source of information you can reuse across tools and triggers in Zaraz's dashboard. This way, you only need to update this information once, and it will be reflected on all the places you are using that variable.

For example, instead of typing a specific domain multiple times across tools or triggers, you could just have one `my-domain` variable and use it instead.

Variables are accessible from drop-downs with `+` signs, specifically in tools settings and triggers. 

## Create a new variable

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website.
2. Select **Zaraz** > **Variables**.
3. Select **Create variable**, and give it a name.
4. In **Variable value** give your variable a value. For now, Zaraz only accepts strings, so you cannot change the Variable type field.
5. Select **Save**.

Your variable is now ready to be used with tools and triggers. 

## Use variables with tools

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website.
2. Select **Zaraz** > **Tools**.
3. Find the tool you want to use the variable in, and select **Edit**.
4. Select **Settings**.
5. Select the `+` sign in the drop-down field, and scroll to the **Variables** section to choose your variable.
6. (Optional): Select an actions associated with the tool > **Add field**.


## Use variables with triggers

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website.
2. Select **Zaraz** > **Triggers**.