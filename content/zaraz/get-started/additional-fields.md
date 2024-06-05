---
pcx_content_type: how-to
title: Additional fields
weight: 5
---

# Additional fields

Almost all tools in the Tools Library require that you enter information in more than one field to be properly configured. Beyond these required default fields, some tools let you add additional fields.

If we take Universal Google Analytics as an example, a default field would be your GA Property ID (the Google Analytics account ID), and an example of an additional field would be a Custom Dimension (like Custom Dimension 1).

## Add an additional field to a specific action

Adding an additional field to an action will attach it to this action only, and will not affect your other actions. 

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2. Select **Zaraz** > **Tools Configuration** > **Third-party tools**.
3. Locate the third-party tool with the action you want to add the additional field to, and select **Edit**.
4. Select the action you wish to modify.
5. Select **Add Field**.
6. Choose the desired field from the drop-down menu and select **Add**.
7. Enter the variable you wish to pass to the action.
8. Select **Save**.

The new field will now be used in this event.

## Add an additional field to all actions in a tool

Adding an additional field to the tool sets it as a default field for all of the tool actions. It is the same as adding it to every action in the tool.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2. Select **Zaraz** > **Tools**.
3. Locate the third-party tool where you want to add the field, and select **Edit**.
4. Select **Settings** > **Add Field**.
5. Choose the desired field from the drop-down menu, and select **Add**.
6. Enter the variable you wish to pass to all the actions in the tool.
7. Select **Save**.

The new field will now be attached to every action that belongs to the tool.