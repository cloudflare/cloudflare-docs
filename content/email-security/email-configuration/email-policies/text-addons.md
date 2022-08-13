---
title: Text add-ons
pcx_content_type: concept
weight: 1
---

# Text add-ons

When a message receives a specific [disposition](/email-security/reference/dispositions-and-attributes/) from Area 1, you can add additional information to the subject and body of each message.

This information provides additional context to your employees, which can help them make better decisions if you choose to have a more permissive email policy. Subject prefixes can tell recipients which category the message is in. Body prefixes provide more context about why the message was added to a specific category.

{{<Aside type="note">}}

Text add-ons are only applicable to customers using an [inline setup](/email-security/deployment/inline/).

{{</Aside>}}

## Update text add-ons

To update or add a new add-on to the subject or body of a message:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Email Policies** > **Text Add-Ons**.
4. Click **Edit**.
5. For each **Disposition**, choose whether prefixes are **Enabled** and whether you want to update the **Custom Label**.
6. If desired, you can also use **Subject Prefix** or **Body Prefix** to update the text added before or after the rendered disposition:

   - **Subject Prefix**: Includes a dynamic value for `%LABELS` that lists the disposition and can include additional text.
   - **Body Prefix**: Includes a dynamic value for `%LABELS` that lists the disposition and `%REASONS` that lists the reasons behind an assigned disposition. Can include additional, HTML-formatted text.

7. Click **Update Text Add-Ons**.
