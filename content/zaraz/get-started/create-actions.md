---
pcx_content_type: how-to
title: Create an action
weight: 3
meta:
  title: Create a third-party tool action
---

# Create a third-party tool action

Tools on Zaraz must have actions configured in order to do something. Every action has triggers assigned to it. When the conditions of the triggers are met, the action will start. An action can be anything the tool can do - sending analytics information, showing a widget, adding a script and much more.

To start using actions, first create a trigger to determine when this action will start. If you have already [set up a trigger](/zaraz/get-started/create-trigger/), follow these steps to create an action.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2. Go to **Zaraz** > **Tools Configuration**.
3. Under **Third-party tools**, locate the tool you want to configure an action for, and select **Edit**.
4. Select **Create action**.
5. Give the action a descriptive name.
6. In the **Firing Triggers** field, choose the relevant trigger or triggers you [previously created](/zaraz/get-started/create-trigger/). If you choose more than one trigger, the action will start when any of the selected triggers are matched.
7. Depending on the tool you are adding an action for, you might also have the option to choose an **Action type**. You might also need to fill in more fields in order to complete setting up the action.
8. Select **Save**.

The new action will appear under **Tool actions**. To edit or disable/enable an action, refer to [Edit tools and actions](/zaraz/get-started/edit-tools-and-actions/).