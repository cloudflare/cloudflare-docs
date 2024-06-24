---
title: Text add-ons
pcx_content_type: concept
weight: 1
---

# Text add-ons

When a message receives a specific {{<glossary-tooltip term_id="disposition" link="/email-security/reference/dispositions-and-attributes/">}}disposition{{</glossary-tooltip>}} from Cloud Email Security (formerly Area 1), you can add additional information to the subject and body of each message.

This information provides additional context to your employees, which can help them make better decisions if you choose to have a more permissive email policy:
- **Subject prefixes**: Can tell recipients which category the message is in. Subject prefixes always state the final [disposition](/email-security/reference/dispositions-and-attributes/) of the message.
- **Body prefixes**: Provide more context about why the message was added to a specific category. Body prefixes include all the detections that were triggered. This information depends on the [prefixes you enable](#update-text-add-ons).

For example, an email might have the dispositions `EXTERNAL MALICIOUS` in the subject, and `EXTERNAL MALICIOUS SUSPICIOUS UCE` in its body.

{{<Aside type="note">}}

Text add-ons are only applicable to customers using an [inline setup](/email-security/deployment/inline/).

{{</Aside>}}

## Update text add-ons

To update or add a new add-on to the subject or body of a message:

1. Log in to the [Cloud Email Security dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Email Policies** > **Text Add-Ons**.
4. Select **Edit**.
5. For each **Disposition**, choose whether prefixes are **Enabled** and whether you want to update the **Custom Label**.
6. If desired, you can also use **Subject Prefix** or **Body Prefix** to update the text added before or after the rendered disposition:

    - **Subject Prefix**: Includes a dynamic value for `%LABELS` that lists the disposition and can include additional text.
    - **Body Prefix**: Includes a dynamic value for `%LABELS` that lists the disposition and `%REASONS` that lists the reasons behind an assigned disposition. Can include additional, HTML-formatted text.

7. Select **Update Text Add-Ons**.