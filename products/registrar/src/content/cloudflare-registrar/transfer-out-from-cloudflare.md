---
order: 4
---

# Transfer out from cloudflare

Cloudflare Registrar makes it easy to transfer to another registrar. Follow the instructions below to transfer your domain out from Cloudflare.

--------

## Restrictions
ICANN rules prohibit a domain from being transferred if it has been transferred within the last 60 days or if the WHOIS registrant information has been modified in the last 60 days (even if redacted).

--------

## Unlocking your domain at Cloudflare
To begin, navigate to the Domain Overview tab in the Cloudflare dashboard. In the card for “Domain Registration” you’ll find a link to Transfer Out. When you select that link, you will unlock the domain and be provided with an authorization code.

![Domain registration dashboard screenshot](../static/start-transfer-out.png)

We’ll ask you to confirm this action in the next screen before we unlock your domain.

![Unlock domain modal](../static/confirm-unlock.png)

Cloudflare will generate an auth code for your domain in the next screen. Copy that code to use at your new registrar.

![Authorization code generation modal](../static/auth-generated.png)

If you lose your auth code, you can return to the overview page and select “Continue” next to the “Transfer Out” to display your auth code again.

![Domain registration renewal screenshot](../static/restart.png)

--------

## Transfer to a new registrar
At your new registrar, you’ll be asked for the authorization code from Cloudflare (it might be called EPP in some systems). Input the code from the Cloudflare dashboard. Your new registrar will send the transfer request to the registry for your domain. The registry will then send it to Cloudflare. When we receive the message, you can manually approve the transfer to initiate it immediately.

![Domain Transfer in dashboard](../static/accept-reject.png)

You will need to confirm the approval. You can also reject it at this stage; if you reject it, we will reapply the registrar lock

![Domain Transfer confirmation modal](../static/confirm.png)

If you do not manually approve the transfer, Cloudflare will process the transfer on the fifth day after receiving the request. In either case, when your transfer out completes we will remove your domain’s subscription so that you are not charged at your next renewal.