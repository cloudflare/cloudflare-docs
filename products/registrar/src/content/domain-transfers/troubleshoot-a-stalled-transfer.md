---
order: 5
---

# Troubleshoot a stalled transfer

Your previous registrar has five days to release the domain after a successful transfer request. If your transfer has not completed within that timeframe, something has likely gone wrong. To resolve, we recommend you check the following settings and restart the transfer

 After five days, something has stopped the transfer. We recommend you check the following details and restart the transfer (you won’t be charged twice).

--------

## Registrar lock reapplied
You have reapplied registrar lock at your current registrar since requesting the transfer. You will need to remove it again to restart.

--------

## Transfer rejected
Your transfer has been rejected by your previous registrar. This can be caused if you actively rejected the transfer request in an email or your registrar’s UI, or if your registrar determines the domain is not eligible for transfer. You will need to restart the transfer and approve the request or contact your current registrar.

--------

## Auth code invalid
Your auth code has since changed or been deprecated and we cannot complete the transfer. Please confirm the code with your current registrar again.

--------

## WHOIS Guard / privacy protection
Some registrars, including GoDaddy and NameCheap, can prohibit transfer requests if you have WHOIS privacy services enabled. You will need to first disable those services at your current registrar.

--------

## Restarting your transfer
In the Cloudflare Overview page for your domain, you can find the details of your registration in the column on the right side of the page. In that card, `Domain Registration` select the button “Cancel and Retry”. You will not be charged twice for your transfer. Once you initiate the retry, you will need to reenter your auth code and confirm your WHOIS information.

Most issues with a stalled transfer can be resolved by checking these details and restarting the transfer from the UI.