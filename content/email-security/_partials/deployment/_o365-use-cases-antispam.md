---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: spamQuarantinePolicy;;phishingQuarantinePolicy;;highPhishingQuarantinePolicy;;img
---


To configure anti-spam policies:

1. Open the [Microsoft 365 Defender console](https://security.microsoft.com/).
2. Go to **Email & collaboration** > **Policies & rules**.
3. Select **Threat policies**.
4. Under **Policies**, select **Anti-spam**.
5. Select the **Anti-spam inbound policy (Default)** text (not the checkbox).
6. In **Actions**, scroll down and select **Edit actions**.

    <div class="large-img">

    ![Go to Actions and find Edit actions](/email-security/static/flexible-partial-images/o365-area1-mx/step6-edit-actions.png)

    </div>

7. Set the following conditions and actions (you might need to scroll up or down to find them):
    - **Spam**: _Move messages to Junk Email folder_.
    - **High confidence spam**: _Quarantine message_.
        - **Select quarantine policy**: $1.
    - **Phishing**: _Quarantine message_.
        - **Select quarantine policy**: $2.
    - **High confidence phishing**: _Quarantine message_.
        - **Select quarantine policy**: $3.
    - **Retain spam in quarantine for this many days**: Default is 15 days. Email Security (formerly Area 1) recommends 15-30 days.

    <div class="large-img">

    ![Select the spam actions in the above step](/email-security/static/flexible-partial-images/o365-area1-mx/$4)

    </div>

8. Select **Save**.