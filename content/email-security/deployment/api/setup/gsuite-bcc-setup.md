---
title: Gmail BCC setup
pcx_content_type: tutorial
weight: 1
meta:
    title: Setup phishing risk assessment for Gmail with Area 1
---

# Gmail BCC setup with Area 1

For customers using Gmail, setting up a phishing risk assessment with Area 1 and a BCC setup is quick and easy. All you need to do is create a content compliance filter to send emails to Area 1 through BCC. The following email flow shows how this works:

![Email flow when setting up a phishing assessment risk for Gmail with Area 1.](/email-security/static/gmail-bcc-flow.png)

To setup Area 1 phishing risk assessment for Gmail:

1. In the Admin console, go to **Menu** > **Apps** > **Google Workspace** > **Gmail** > **Compliance**.

2. Scroll to **Content Compliance** and select **CONFIGURE**.

3. Add a **Content Compliance** filter and name it `Area 1 - BCC`.

4. In **Email messages to affect**, select **Inbound**.

5. Select the recipients that you want to send emails to Area 1 via BCC:
    1. Select **Add** to configure the expression.
    2. Select **Advanced content match**.
        1. In **Location**, select **Headers + Body** from the dropdown.
        2. In **Match type** select **Matches regex**.
        3. In **Regexp** input `.*`. You can customize the regex as needed and test within the admin page or on sites like https://regexr.com/.
        4. Select **SAVE**.

6. In **If the above expressions match, do the following**, make the following
changes:
    1. In **Also deliver to** select **Add more recipients**.
        1. Under **Recipients** select **Add**.
        2. Change the setting to **Advanced**.
        3. In **Envelope recipient** select **Change envelope recipient**.
        4. In **Replace recipient** add the recipient BCC address. For example,`bcc_recipient@mxrecord.io`. This address is specific to each customer tenant and can be found in your [Portal](https://horizon.area1security.com/support/service-addresses).
{{<Aside type="note">}}
If you are located in the EU or GDPR applies to your organization, replace `@mxrecord.io` domain in the BCC recipient with `@mailstream-eu1.mxrecord.io`. For example, input `bcc_recipient@mailstream-eu1.mxrecord.io`. This will force emails to be processed in Germany under compliance with GDPR. 
{{</Aside>}}

        5. Make sure that in **Spam and delivery options** > **Do not deliver spam to this recipient** is not checked.
        6. Under **Headers** select **Add X-Gm-Spam and X-Gm-Phishy headers**.
        7. Select **SAVE**.

7. Scroll down and select **Show options**.
    1. Under **Account types to affect** select **Groups**.
    2. Select **SAVE**.