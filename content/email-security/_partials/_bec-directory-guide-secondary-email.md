---
_build:
  publishResources: false
  render: never
  list: never
---

When the Business Email Compromise list is configured, Cloudflare Area 1 will enforce the proper match of the sender’s display name and email address. Any variation from this strict requirement will raise a detection event. The reason of detection will be `Protected Name <NAME> should not appear as <non-configured email address>`. 

In some instances, you may want to allow your protected users to send emails from an alternate email address (like their personal email address). To configure this alternate address, you will have to add it to their directory entry.

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/), and select **Settings** (the gear icon).

2. Go to **Email Configuration** > **Enhanced Detections** > **Business Email Compromise**.

3. Search for the user you want to allow an alternate email address.

4. Select the three-dots button > **Edit**.

    ![Select edit to add alternate email addresses to your user](/email-security/static/bec/o365/step4-edit-user.png)

5. In **Secondary Emails** add the additional email addresses. Place each entry on a new line.

    ![Add each new email address to the Secondary Emails field. Place each address on a separate line](/email-security/static/bec/o365/step5-new-email.png)

6. Select **Save** to finish.