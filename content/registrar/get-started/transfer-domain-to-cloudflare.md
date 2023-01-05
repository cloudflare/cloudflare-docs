---
pcx_content_type: tutorial
title: Transfer your domain to Cloudflare
weight: 2
---

# Transfer your domain to Cloudflare

Transferring your domain to Cloudflare tells your registry that a different registrar can now set those authoritative records for you. The relationship is based on trust. Registries only trust one registrar at any given time to make changes on your behalf.

Transferring a domain to a new registrar informs the registry that they should instead trust that new registrar to modify information. The process requires some action steps at your new and previous registrar. Each registrar handles transfers a bit differently, but in general, they follow a pattern based on rules set by ICANN, the organization responsible for regulating domain registration.

This section contains generic instructions on how to transfer your domain to Cloudflare from most registrars.

---

{{<render file="_before-you-begin.md">}}

---

{{<render file="_restrictions.md">}}

---

## Set up a domain transfer

To begin, complete the following steps in your current registrar to transfer your domain to Cloudflare. Below, you will find links for detailed transfer instructions from some of the most popular registrars:

- [Enom](https://help.enom.com/hc/articles/360040309012)
- [GoDaddy](https://www.godaddy.com/help/transfer-my-domain-away-from-godaddy-3560)
- [Namecheap](https://www.namecheap.com/support/knowledgebase/article.aspx/258/84/what-should-i-do-to-transfer-a-domain-from-namecheap/)
- [Network Solutions](https://customerservice.networksolutions.com/prweb/PRAuth/webkm/help/article/KC-474/networksolutions)
- [Ionos by 1&1](https://www.ionos.com/help/domains/domain-transfers/#acc4514)

### 1. Log in to your registrar account

Log in to the registrar account where the domain is currently registered.

### 2. Unlock the domain

Registrars include a lightweight safeguard to prevent unauthorized users from starting domain transfers. This is known as registrar lock, but you might also see it referred to as domain lock. In WHOIS, it may appear as `clientTransferProhibited`. When enabled, the lock prevents any other registrar from attempting to initiate a transfer.

Only the registrant can enable or disable this lock, typically through the administration interface of the registrar. To proceed with a transfer, remove this lock if it is enabled.

### 3. Remove WHOIS privacy

In most cases, domains may be transferred even if WHOIS privacy services have been enabled. However, some registrars may prohibit the transfer if the WHOIS privacy service has been enabled.

### 4. Request an authorization code

Your new registrar needs to confirm with your old registrar that the transfer flow is authorized. To do that, your old registrar will provide an authorization code to you.

{{<Aside type="note">}}

This code is often referred to as an authorization code, auth code, authinfo code, or transfer code. You will need to input that code to complete your transfer to Cloudflare. Cloudflare will use it to confirm the transfer is authentic.

{{</Aside>}}

### 5. Initiate your transfer to Cloudflare

From your Cloudflare Account Home, go to [**Transfer Domains**](https://dash.cloudflare.com/?to=/:account/domains/transfer). Cloudflare Registrar will display the zones available for transfer.

You will be presented with the price for each transfer. When you transfer a domain, you are required by ICANN to pay to extend its registration by one year from the expiration date. You can remove domains from your transfer by selecting **x**.

If you do not have a payment method on file, add one at this step before proceeding.

You will not be billed at this step. Cloudflare will only bill your card when you input the auth code and confirm the contact information at the conclusion of your transfer request.

{{<Aside type="note">}}

Sites can be unavailable for a few reasons, including:

- You did not [add your domain](/fundamentals/get-started/setup/add-site/) to your Cloudflare.
- The site was registered in the last 60 days.
- Cloudflare does not yet support the TLD.
- The domain is designated as a premium domain by the registry.
- The domain has a status that does not allow for a transfer.
- You failed to follow the steps highlighted above in [creating an account with your domain](/fundamentals/account-and-billing/account-setup/create-account/) and [changing your DNS nameservers to Cloudflare](/dns/zone-setups/full-setup/).

{{</Aside>}}

{{<render file="_email-verification.md">}}

### 6. Input your authorization code

In the next page, input the authorization code for each domain you are transferring. You also need to unlock each domain so that Cloudflare can process your request. For more information, refer to the instructions provided by your [current registrar on how to transfer your domain](/registrar/get-started/transfer-domain-to-cloudflare/#set-up-a-domain-transfer).

### 7. Confirm or input your contact information

In the final stage of the transfer process, input the contact information for your registration. Cloudflare Registrar redacts this information by default but is required to collect the authentic contact information for this registration. It is important that you provide accurate WHOIS contact information. You may be required to verify the contact information. Failure to provide accurate information and/or failure to verify the information may result in suspension or deletion of your domain.

You can always [modify the contact information](/registrar/account-options/domain-contact-updates/) later, if needed.

After entering the contact information, agree to the domain registration terms of service by selecting **Confirm transfer**.

### 8. Approve the transfer

Once you have requested your transfer, Cloudflare will begin processing it, and send a Form of Authorization (FOA) email to the registrant, if the information is available in the public WHOIS database. The FOA is what authorizes the domain transfer.

After this step, your previous registrar will also email you to confirm your request to transfer. Most registrars will include a link to confirm the transfer request. If you select that link, you can accelerate the transfer operation. If you do not act on the email, the registrar can wait up to five days to process the transfer to Cloudflare. You may also be able to approve the transfer from within your current registrar dashboard.

{{<Aside type="note">}}

Registrants transferring a `.us` domain will always receive a FOA email.

{{</Aside>}}

## Transfer statuses

You can check the status of your transfer in **Account Home** > **Overview** > **Domain Registration** for your domain. Below, you can find a list of the possible transfer statuses.

- **Transfer in progress**: Your request has been submitted by Cloudflare to your previous registrar. Cloudflare is now waiting on them to confirm they have received the request. If this status persists for more than a day (24 hours), ensure that the domain has been unlocked at your current registrar and any WHOIS privacy services have been removed.

- **Pending approval**: Your current registrar has received the transfer request. They can now wait up to five days to release the domain. If you want to move faster, you can manually approve the transfer for immediate release in the dashboard of most registrars.

- **Transfer rejected**: your transfer has been rejected. This can occur if you canceled the request at your current registrar instead of approving it. If you still wish to transfer, you can select **Retry** and initiate a new transfer request.

{{<render file="_next-steps.md">}}