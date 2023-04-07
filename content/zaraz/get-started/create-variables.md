---
pcx_content_type: how-to
title: Create a variable
weight: 4
---

# Create a variable

Variables are reusable blocks of information. They allow you to have one source of data you can reuse across tools and triggers in the dashboard. You can then update this data in a single place. 

For example, instead of typing a specific user ID in multiple fields, you can create a variable with that information instead. If there is a change and you have to update the user ID, you just need to update the variable and the change will be reflected across the dashboard.

Worker Variables are a special type of variable that generates value dynamically. Learn more about Worker Variables [here](/zaraz/advanced/worker-variables/).

## Create a new variable

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2. Go to **Zaraz** > **Tools Configuration** > **Variables**.
3. Select **Create variable**, and give it a name.
4. In **Variable type** select between `String`, `Secret` or `Worker` from the drop-down menu. Use `Secret` when you have a private value that you do not want to share, such as an API token.
5. In **Variable value** enter the value of your variable.
6. Select **Save**.

Your variable is now ready to be used with tools and triggers.

## Next steps

Refer to [Add a third-party tool](/zaraz/get-started/add-tool/) and [Create a trigger](/zaraz/get-started/create-trigger/) for more information on how to add a variable to tools and triggers.

If you need to edit or delete variables, refer to [Edit variables](/zaraz/get-started/edit-variables/).
