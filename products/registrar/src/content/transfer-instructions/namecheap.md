---
order: 5
---

# Namecheap

You can follow the instructions below to transfer your domain from NameCheap to Cloudflare.

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

## Step 4: Transfer to Cloudflare
In the Cloudflare transfer screen, input the authorization code. Each domain will have a unique authorization code and you will need to enter each for every domain you want to transfer.

--------

## Step 5: Approve the transfer
Unfortunately, the email confirmation which Namecheap sends as of Nov, 2020 contains a link to _cancel_ rather than _expedite_ or _approve_ the transfer. No alternative funtionality exists in the domain's control panel. You will need to wait the standard 5 days for your request to default to being approved and the domain to be transferred. Alternatively, you can try contacting Namecheap support directly.
