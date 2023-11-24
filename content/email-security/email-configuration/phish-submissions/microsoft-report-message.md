---
title: Microsoft Report Message
pcx_content_type: how-to
---

# Microsoft Report Message

Microsoft 365 allows users to report missed {{<glossary-tooltip term_id="phishing">}}phish{{</glossary-tooltip>}} and spam messages directly to Area 1 from Outlook. This is achieved with the Report Message add-in functionality.

{{<Aside type="note">}}The Report Message add-in for Outlook does not support reporting bulk email. Refer to [PhishNet for Office 365](/email-security/email-configuration/phish-submissions/phishnet-o365/) to learn how to use Area 1's tool to report bulk email, spam and phish from Office 365.{{</Aside>}}


### Deploy Report Message add-in

To deploy the Report Message add-in to all users in your O365 organization:

1. Log in to your [Microsoft 365 admin center](https://admin.microsoft.com/).
2. Go to **Settings** > **Integrated apps** > **Add-ins**.
3. Select **Deploy Add-in** > **Next** > **Choose from the Store**, and search for **Report Message**.
4. Select **Add** to start configuring the add-in.
5. Choose how you want to deploy the add-in for your company. You can select between deploying the Report Message add-in to everyone in your company, or just for a specific group of people. Select **Deploy** when you are finished.
{{<Aside type="note">}}The deployment may take as long as 24 hours to complete.{{</Aside>}}
6. Now, log in to [Microsoft Security portal](https://security.microsoft.com/).
7. Go to **Settings** > **Email & Collaboration** > **User reported settings**.
8. Make sure you have **Monitor reported messages in Outlook** and **Use the built-in Report button in Outlook** checked.
9. In **Reported message destinations** > **Send reported messages to**, you have to chose either **Microsoft only** or **Microsoft and my reporting mailbox**.

### Set up transport rules for the add-in

Now that you have installed the Report Message add-in, you need to create transport rules to send messages to Area 1. We are going to create three rules:

- Spam messages
- False positives
- False negatives (malicious messages)

1. Log in to the [Exchange admin center](https://admin.exchange.microsoft.com/#/homepage).
2. Go to **Mail flow** > **Rules**.
3. Select **Add a Rule** > **Create a new rule**.
4. To handle **spam messages** reported to Microsoft, create a rule with the following settings:
    1. **Name**: `Spam Messages`
    2. **Apply this rule if**: _The sender_ > _address includes any of these words_
        1. **Specify words or phrases**: `abuse@messaging.microsoft.com`, `junk@office365.microsoft.com` > **Save**.
    3. **Do the following**: _Add recipients_ > _to the Bcc box_
        1. **Select members**: `<ACCOUNT_NAME>+user+spam@submission.area1reports.com` > **Save** > **Next**.
        {{<render file="_service-addresses.md">}}
    4. **Rule mode**: **Enforce**
    5. Select **Next** > **Finish**.
5. To handle **false positives** reported to Microsoft, create a rule with the following settings:
    1. **Name**: `False positives`
    2. **Apply this rule if**: _The sender_ > _address includes any of these words_
        1. **Specify words or phrases**: `false_positive@messaging.microsoft.com` > **Save**.
    3. **Do the following**: _Add recipients_ > _to the Bcc box_
        1. **Select members**: `<ACCOUNT_NAME>+user+benign@submission.area1reports.com` > **Save** > **Next**.
        {{<render file="_service-addresses.md">}}
    4. **Rule mode**: **Enforce**
    5. Select **Next** > **Finish**.
6. To handle **false positives** (malicious messages) reported to Microsoft, create a rule with the following settings:
    1. **Name**: `False positives`
    2. **Apply this rule if**: _The sender_ > _address includes any of these words_
        1. **Specify words or phrases**: `phish@office365.microsoft.com` > **Save**.
    3. **Do the following**: _Add recipients_ > _to the Bcc box_
        1. **Select members**: `<ACCOUNT_NAME>+user+malicious@submission.area1reports.com` > **Save** > **Next**.
        {{<render file="_service-addresses.md">}}
    4. **Rule mode**: **Enforce**
    5. Select **Next** > **Finish**.