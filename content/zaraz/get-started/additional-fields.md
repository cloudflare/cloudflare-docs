---
pcx-content-type: how-to
title: Additional fields
weight: 6
---

# Additional fields

Almost all tools in the Tools Library require that you enter information in more than one field to be properly configured. Beyond these required default fields, some tools let you add additional fields.

If we take Universal Google Analytics as an example, a default field would be your GA Property ID (the Google Analytics account ID), and an example of an additonal field would be a Custom Dimension (like Custom Dimension 1).

## Add an additional field to a specific action

Adding an additonal field to an action will attach it to this action only, and will not affect your other actions. 

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website.
2. Click **Zaraz** > **Tools**.
3. Locate the third-party tool with the action you want to add the additional field to, and click **Edit**.
4. Click the action you wish to modify.
5. Click **Add Field**.
6. Choose the desired field from the drop-down menu and click **Add**.
7. Enter the variable you wish to pass to the action.
8. Click **Save**.

The new field will now be used in this event.

## Add an additional field to all actions in a tool

Adding an additional field to the tool sets it as a default field for all of the tool actions. It is the same as adding it to every action in the tool.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website.
2. Click **Zaraz** > **Tools**.
3. Locate the third-party tool where you want to add the the field, and click **Edit**.
4. Click **Settings** > **Add Field**.
5. Choose the desired field from the drop-down menu, and click **Add**.
6. Enter the variable you wish to pass to all the actions in the tool.
7. Click **Save**.

The new field will now be attached to every action that belongs to the tool.