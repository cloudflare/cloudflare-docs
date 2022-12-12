---
_build:
  publishResources: false
  render: never
  list: never
---

1. In the Admin console, go to **Menu** > **Apps** > **Google Workspace** > **Gmail** > **Compliance**.

    ![Select the compliance option](/email-security/static/bcc-setup/gmail/step1-compliance.png)

2. Scroll to **Content Compliance** and select **CONFIGURE**.

    ![Select the configure option](/email-security/static/bcc-setup/gmail/step2-configure.png)

3. Add a **Content Compliance** filter and name it `Area 1 - BCC`.

4. In **Email messages to affect**, select **Inbound**.

    <div class="large-img">

    ![Choose inbound as the messages to affect](/email-security/static/bcc-setup/gmail/step4-inbound.png)

    </div>

5. Select the recipients that you want to send emails to Area 1 via BCC:
    1. Select **Add** to configure the expression.
    2. Select **Advanced content match**.
        1. In **Location**, select **Headers + Body** from the dropdown.
        2. In **Match type** select **Matches regex**.
        3. In **Regexp** input `.*`. You can customize the regex as needed and test within the admin page or on sites like https://regexr.com/.
        4. Select **SAVE**.

    <div class="medium-img">

    ![Configure expressions](/email-security/static/bcc-setup/gmail/step5-expressions.png)

    </div>

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
            <div class="medium-img">

            ![Configure recipients](/email-security/static/bcc-setup/gmail/step6-expressions.png)

            </div>
        5. Make sure that in **Spam and delivery options** > **Do not deliver spam to this recipient** is not checked.
        6. Under **Headers** select **Add X-Gm-Spam and X-Gm-Phishy headers**.
        7. Select **SAVE**.

        <div class="medium-img">

        ![Configure headers](/email-security/static/bcc-setup/gmail/step6-headers.png)

        </div>

7. Scroll down and select **Show options**.
    1. Under **Account types to affect** select **Groups**.
    2. Select **SAVE**.

    <div class="medium-img">

    ![Configure groups](/email-security/static/bcc-setup/gmail/step7-groups.png)

    </div>