---
order: 4
---

# GoDaddy

You can follow the instructions below to transfer your domain from GoDaddy to Cloudflare.

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

## Step 1: Login to GoDaddy
Login to the GoDaddy account where the domain is registered. Navigate to the **Domain Settings** page.

--------

## Step 2: Unlock the domain and remove private registration
In **Domain Settings** select the **Edit** link next to Domain lock under **Additional Settings**. Toggle the lock off. [GoDaddy’s domain unlocking instructions can be found at godaddy.com](https://www.godaddy.com/help/unlock-my-domain-410).

Customers must also remove “Private Registration” prior to the transfer or GoDaddy can cancel the transfer.

--------

## Step 3: Request authorization code
While still in **Domain Settings**, also under *Additional Settings** you will need to select “Get Authorization Code”. GoDaddy will email the code to the address listed for the domain’s Administrator. [Godaddy’s Authorization code instructions can be found at godaddy.com](https://www.godaddy.com/help/get-an-authorization-code-to-transfer-my-domain-to-another-registrar-1685).

It may take up to 24 hours for GoDaddy to email you the code. If you do not receive the code, please check the registrant email address listed in the domain contact information for the given domain. It might be different than your GoDaddy account email.

--------

## Step 4: Transfer to Cloudflare
In the Cloudflare transfer screen, input the authorization code. Each domain will have a unique authorization code and you will need to enter each for every domain you want to transfer.

--------

## Step 5: Approve the transfer
Once Cloudflare processes your transfer, GoDaddy will list the domain as “Pending Transfers Out” in the GoDaddy dashboard under **Domain Manager**. You can accelerate the transfer by accepting the transfer in the dashboard. If you do not accept it, the transfer will automatically approve within 5 days.