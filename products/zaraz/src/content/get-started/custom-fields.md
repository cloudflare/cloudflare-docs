---
order: 5
pcx-content-type: how-to
title: Custom fields
---

# Add custom fields to third-party tools

Almost all tools in the Tools Library require that you enter information in more than one field to be properly configured. Beyond these required default fields, some tools let you add additional custom fields.

If we take Universal Google Analytics as an example, a default field would be your GA Property ID (the Google Analytics account ID), and an example of a custom field would be a Custom Dimension (like Custom Dimension 1).

If you add a custom field in the tool's configuration page, this field will be attached to every event that belongs to the tool. Alternatively, you can add custom fields to specific events that will only affect that event.

## Add a custom field at the tool level

1. Go to [Zaraz's main dashboard](https://dash.cloudflare.com/?to=/:account/:zone/zaraz).
1. Locate the third-party tool where you want to add the custom field and click **Edit**.
1. Click **Settings** > **Add Field**.
1. Choose the desired field from the drop-down menu, and click **Add**.
1. Enter the variable you wish to pass to the tool.
1. Click **Save**.

The new field will now be attached to every event that belongs to the tool.

## Add a custom field to a specific event

1. Go to [Zaraz's main dashboard](https://dash.cloudflare.com/?to=/:account/:zone/zaraz).
1. Locate the third-party tool where you want to add the custom field and click **Edit**.
1. Click the event you wish to modify.
1. Click **Add Field**.
1. Choose the desired field from the drop-down menu and click **Add**.
1. Enter the variable you wish to pass to the event.
1. Click **Save**.

The new field will now be used in this event.