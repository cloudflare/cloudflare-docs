---
title: Admin Quarantine
pcx_content_type: how-to
weight: 7
---

# Admin Quarantine

Admin Quarantine allows you to automatically prevent incoming messages from reaching a recipient's inbox based on the [disposition](/email-security/reference/dispositions-and-attributes/) assigned by Area 1.

The messages sent to Admin Quarantine are determined by your [domain settings](/email-security/email-configuration/domains-and-routing/domains/).

Enabling quarantine by disposition is hierarchical and you cannot enable only one disposition if there are other dispositions above it. For example, if you try to enable just `Spam`, Area 1 will also enable `Malicious`, the disposition that sits above `Spam`. Similarly, if you enable `Spoof` everything above this disposition will be enabled. `Malicious` is the only disposition that can be enabled without additional dispositions.
    
![Choosing a disposition is hierarchical](/email-security/static/admin-quarantine/quarantine-by-disposition.png)

## Quarantine emails by disposition

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).

2. Go to **Settings** (the gear icon).

3. Select **Email Configuration** > **Domains**.

4. Select the three dots on the domain that you want to configure admin quarantine for, and choose **Edit**.

5. In **Quarantine Policy** choose the dispositions you want to enable quarantine for that domain.


6. Select **Update Domain**.

{{<Aside type="note" header="Note">}}
Quarantine by disposition needs to be configured manually per domain.
{{</Aside>}}

## Access Admin Quarantine

You can view and potentially release emails that were sent to **Admin Quarantine**: 

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).

2. Go to **Email** > **Admin Quarantine**.

    ![Access Admin Quarantine to review emails](/email-security/static/admin-quarantine/access-quarantine.png)

3. Review emails as needed.

## Release quarantined emails

From **Admin Quarantine**, you can also release quarantined emails by selecting one or more messages:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).

2. Go to **Email** > **Admin Quarantine**.

3. Find the email you want to release.

4. Select **...** > **Release**.

    ![Select release to remove emails from quarantine](/email-security/static/admin-quarantine/release-emails.png)

5. Select **Release** to confirm that you want to release the selected email.

6. (Optional) You can also release multiple messages, by selecting the box next to each message you want to release.

These email messages will then be sent to the original recipients from the `quarantine@area1reports.com` email address with the original message attached in a ZIP file.