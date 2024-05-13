---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/4424747060109-Registrar-troubleshoot-stalled-domain-transfers
title: Troubleshoot failed domain transfers
weight: 8
---

# Troubleshoot failed domain transfers

After you start the transfer process to Cloudflare Registrar, your previous registrar has five days to release the domain after a successful transfer request. If your transfer has not been completed within that time frame, something has likely gone wrong.

Most issues with a stalled transfer can be solved by checking the following details and [restarting the transfer](#restart-your-transfer).

## Registrar lock reapplied

You have reapplied the registrar lock at your current registrar since requesting the transfer. You will need to remove it again to restart the transfer process.

## Transfer rejected

Your transfer has been rejected by your previous registrar. There are several reasons for this to happen:

-   You actively rejected the transfer request in the email you received from your registrar or on your registrar’s interface.
-   Your registrar determined the domain is not eligible for transfer.
-   Some registrars allow customers to enable a setting to reject all transfer requests.
-   In some instances, registrars may reject the transfer if they suspect malicious behavior.

You will need to restart the transfer and approve the request or contact your current registrar to solve this issue.

## Auth code invalid

Your auth code (also referred to as authentication code and authorization code) has since changed or been deprecated, and Cloudflare cannot complete the transfer. Confirm the code with your current registrar again. To avoid mistakes, copy and paste the auth code provided by your current registrar.

## WHOIS Guard / privacy protection

Some registrars may prohibit transfer requests if you have WHOIS privacy services enabled. You need to first disable those services at your current registrar before you can proceed with the transfer process.

## Restart your transfer

{{<Aside type="note">}}
This solution does not apply to `.uk` domains.
{{</Aside>}}

1. Log in to [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Select **Domain Registration** > **Manage Domains**.
3. Find the correct domain and select **Manage**.
4. Select **Cancel Transfer and Retry**. After you initiate the retry, you must re-enter your auth code and confirm your WHOIS information.
