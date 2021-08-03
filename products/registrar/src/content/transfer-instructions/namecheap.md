---
order: 5
pcx-content: how-to
---

import BeforeYouBegin from "../_partials/_before-you-begin.md"

# Namecheap

You can follow the instructions below to transfer your domain from NameCheap to Cloudflare.

---

## Before you begin

<BeforeYouBegin/>

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

## Step 1: Login to Namecheap
Login to the Namecheap account where the domain is registered. Navigate to the **Domain List** page and select “Manage”.

--------

## Step 2: Unlock the domain and remove WhoisGuard
Select the **Sharing & Transfer** tab. In that tab, you will find a card labeled “Transfer Out”. First, click “Unlock” next to “Domain Lock”.

Customers must remove “WhoisGuard” from NameCheap prior to transferring the domain.

--------

## Step 3: Request authorization code
While still on the **Sharing & Transfer** tab, click the button “Auth Code” next to “Domain Lock”. Namecheap will email the code to the email on file for your account.

--------

## Step 4: Add domain to Cloudflare
Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login). Choose the account where you want to add the domain. From the accounts home, click **Add a Site** to add the new domain to your Cloudflare account.

---

## Step 5: Transfer to Cloudflare
After your previous registrar approves the transfer, go to your Cloudflare dashboard. From your accounts home, click **Registrar** > **Transfer** and input the authorization code. Each domain will have a unique authorization code and you will need to enter each for every domain you want to transfer.

If you do not see this screen or do not have an authorization code, please ensure you have gone through all the steps mentioned above before trying to transfer your domain to Cloudflare.

--------

## Step 6: Approve the transfer
Once Cloudflare processes your transfer, Namecheap will send an email to the domain’s registrant contact (the same address where the authorization code was emailed). To approve the transfer, do **not** take any action. The transfer will automatically approve within 5 days.
