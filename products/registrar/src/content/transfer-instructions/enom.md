---
order: 2
---

# Enom

You can follow the instructions below to transfer your domain from Enom to Cloudflare.

--------

## Restrictions
To transfer to a new registrar, your domain must meet the following requirements.

* ICANN rules prohibit a domain from being transferred if it has been transferred within the last 60 days or if the WHOIS contact information was modified in the last 60 days (even if redacted).
* Your account at your current registrar must be active. If your domain has expired, you may have to pay a redemption fee to renew it before you can process a transfer.
* Cloudflare does not currently support premium domains. Some registries designate a domain name as “premium” and charge higher wholesale rates for these domains.

If it is listed as available for transfer in the Cloudflare dashboard, these restrictions have already been checked.

--------

## Email forwarding
Cloudflare Registrar does not currently support email forwarding. If you require email forwarding from your registrar, you will need to use a third-party forwarding service and configure your MX record in the Cloudflare DNS setting for the domain.

--------

## Step 1: Login to Enom
Login to the Enom account where the domain is registered. Navigate to **My Domains** from **Domains** in the navigation bar.

--------

## Step 2: Unlock the domain
In the **Manage Domain** menu, select **General Settings**. The settings will include a row, “Registrar-Lock” with two options: Enable and Disable. Set the Registrar-Lock to Disable.

--------

## Step 3: Request authorization code
Below Registrar-Lock and Auto Renew, there will be a row for “Auth Info / EPP Key”. Select “Email Auth Info to Registrant”. Enom will email your authorization code to the registrant email address.

If you do not receive the code, please check the registrant email address listed in the domain contact information for the given domain. It might be different than your Enom account email.

--------

## Step 4: Transfer to Cloudflare
In the Cloudflare transfer screen, input the authorization code. Each domain will have a unique authorization code and you will need to enter each for every domain you want to transfer.

--------

## Step 5: Approve the transfer
Once Cloudflare processes your transfer, Enom will send an email to the domain’s registrant contact (the same address where the authorization code was emailed). The email will contain a link that you can click to immediately approve and process the transfer. If you do not click the link, the transfer will automatically approve within 5 days.