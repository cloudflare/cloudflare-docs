---
_build:
  publishResources: false
  render: never
  list: never
---

To create quarantine policies:

1. Open the [Microsoft 365 Defender console](https://security.microsoft.com/).
2. Go to **Email & collaboration** > **Policies & rules**.
3. Select **Threat policies**.
4. Under **Rules**, select **Quarantine policies**.
5. Select **Add custom policy**.
6. Set the **Policy name** to `UserNotifyUserRelease`.
7. Select **Next**.
8. In **Recipient message access**, select **Set specific access (Advanced)**, and then:
    - In **Select release action preference**, choose _Allow recipients to release a message from quarantine_.
    - In **Select additional actions recipients can take on quarantined messages**, select the **Delete** and **Preview** checkboxes.

    ![Configure the Recipient message access as stated in the step above](/email-security/static/deployment/inline-setup/o365-area1-mx/use-cases/step8-allow-message-release.png)

9. Select **Next**.
10. In **Quarantine notification**, select **Enable**.
11. Select **Next**.
12. Review your settings and select **Submit**.
13. Select **Done**.
14. Select **Add custom policy**.
15. Set the **Policy name** to `UserNotifyAdminRelease`.
16. Select **Next**.
17. In **Recipient message access**, select **Set specific access (Advanced)**, and then:
    - In **Select release action preference**, from the drop-down menu, choose _Allow recipients to request a message to be released from quarantine_.
    - In **Select additional actions recipients can take on quarantined messages**, select the **Delete** and **Preview** checkboxes.

    ![Configure the Recipient message access as stated in the step above](/email-security/static/deployment/inline-setup/o365-area1-mx/use-cases/step8-request-message-release.png)

18. Select **Next**.
19. In **Quarantine notification**, select **Enable**.
20. Select **Next**.
21. Review your settings and select **Submit**.
22. Select **Done**.
