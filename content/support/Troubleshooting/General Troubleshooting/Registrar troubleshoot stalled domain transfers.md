---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/4424747060109-Registrar-troubleshoot-stalled-domain-transfers
title: Registrar troubleshoot stalled domain transfers
---

# Registrar: troubleshoot stalled domain transfers



## Overview

After you start the transfer process to Cloudflare Registrar, your previous registrar has five days to release the domain after a successful transfer request. If your transfer has not been completed within that time frame, something has likely gone wrong.

Most issues with a stalled transfer can be solved by checking the following details and restarting the transfer from your Cloudflare dashboard.

___

## Registrar lock reapplied

You have reapplied the registrar lock at your current registrar since requesting the transfer. You will need to remove it again to restart the transfer process.

___

## Transfer rejected

Your transfer has been rejected by your previous registrar. There are several reasons for this to happen:

-   You actively rejected the transfer request in the email you received from your registrar or on your registrar’s interface.
-   Your registrar determined the domain is not eligible for transfer.
-   Some registrars allow customers to enable a setting to reject all transfer requests.
-   In some instances, registrars may reject the transfer if they suspect malicious behavior.

You will need to restart the transfer and approve the request or contact your current registrar to solve this issue.

___

## Auth code invalid

Your auth code (also referred to as authentication code and authorization code) has since changed or been deprecated, and Cloudflare cannot complete the transfer. Confirm the code with your current registrar again. To avoid mistakes, copy and paste the auth code provided by your current registrar.

___

## WHOIS Guard / privacy protection

Some registrars may prohibit transfer requests if you have WHOIS privacy services enabled. You need to first disable those services at your current registrar before you can proceed with the transfer process.

___

## Restarting your transfer

1.  Log in to [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2.  In the **Overview** app for your domain, scroll down to **Domain Registration.**
3.  Select **Cancel and Retry**. Once you initiate the retry, reenter your auth code and confirm your WHOIS information.
