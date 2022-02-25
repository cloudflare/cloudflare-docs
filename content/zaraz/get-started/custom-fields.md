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

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website.
2.  Click **Zaraz**.
3.  Locate the third-party tool where you want to add the custom field and click **Edit**.
4.  Click **Settings** > **Add Field**.
5.  Choose the desired field from the drop-down menu, and click **Add**.
6.  Enter the variable you wish to pass to the tool.
7.  Click **Save**.

The new field will now be attached to every event that belongs to the tool.

## Add a custom field to a specific event

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website.
2.  Click **Zaraz**.
3.  Locate the third-party tool where you want to add the custom field and click **Edit**.
4.  Click the event you wish to modify.
5.  Click **Add Field**.
6.  Choose the desired field from the drop-down menu and click **Add**.
7.  Enter the variable you wish to pass to the event.
8.  Click **Save**.

The new field will now be used in this event.
