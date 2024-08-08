---
title: KnowBe4
pcx_content_type: how-to
meta:
    title: Phish Alert Button (PAB)
---

# KnowBe4 Phish Alert Button (PAB)

If you have KnowBe4 Phish Alert Button (PAB) for Microsoft Outlook, Microsoft Exchange, Microsoft 365, and Google Workspace follow the steps below to set it up with Email Security and report suspicious emails.

1. Log in to your KnowBe4 console. 
2. Select the **cog symbol** to go to your **Account Settings** screen.
3. Go to **Account Integrations** > **Phish Alert**.
4. In **Setting Name**, give your PAB a descriptive name.
5. (Optional) If you do not want to differentiate between spam and malicious emails, enter `<ACCOUNT_NAME>+user+malicious@submission.area1reports.com` in **Send Non-Simulated Emails to** to receive spam reports.
{{<render file="_service-addresses.md">}}
1. If you do want to differentiate between spam and malicious emails, go to **Comments and Disposition Settings**.
2. Select **Allow users to leave comments and disposition**.
3. Select **Disable Unknown Email Disposition**.
4. In **Send Dispositioned Emails to**, you need to enter the email addresses to forward spam and malicious emails. You can find these addresses in your **Email Security dashboard** > **Support** > [**Service Addresses**](https://horizon.area1security.com/support/service-addresses):
    1. **Phishing/Suspicious**: Enter your malicious email address. For example, `<ACCOUNT_NAME>+user+malicious@submission.area1reports.com`.
    2. **Spam/Junk**: Enter your spam email address. For example, `<ACCOUNT_NAME>+user+spam@submission.area1reports.com`.
5.  Select **Save changes**.