---
pcx_content_type: faq
title: FAQ
weight: 7
---

# FAQ

Below you will find answers to our most commonly asked questions. If you cannot find the answer you are looking for, refer to the [community page](https://community.cloudflare.com/) to explore more resources.

- [Domain transfers](#domain-transfers)
- [Domain registrations](#domain-registrations)
- [Billing](#billing)

## Domain transfers

### Why did my transfer fail?

Domain transfers sometimes fail. Refer to [Registrar: troubleshoot stalled domain transfers](https://support.cloudflare.com/hc/articles/4424747060109) for more information on what might have happened and how to solve the issue.

If you cannot solve the issue, open a support ticket or contact your account team.

### Why did my domain's expiration date change after transferring it to Cloudflare?

ICANN requires that any transfer also extends the expiration date of your domain by at least one year — that is one year from your current expiration date, not one year from the date of transfer. For example, if you transfer a domain on October 10, 2021, but it expires on March 10, 2022, your new expiration date will be March 10, 2023.

Whenever a domain is first registered, the registrant purchases control of that domain for some number of years — up to 10 years. For example, a domain registered on October 8, 2020 will have an expiration date of October 8th in some year between 2021 and 2030, depending on the amount of years originally purchased.

Transferring a domain adds time to the current expiration date, unless your domain already has [10 years on the term](#i-registered-my-domain-for-10-years-at-another-registrar-if-i-transfer-it-to-cloudflare-will-i-gain-another-year).

### What happens to my nameservers when I transfer my domain to Cloudflare?

Cloudflare Registrar only supports transfers of domains that are active on Cloudflare. Domains on Cloudflare use nameservers assigned by Cloudflare to the associated account and those nameservers must remain in place for the domain to be Active.

### How can I see the status of my domain transfer?

Once you initiate a domain transfer, your previous registrar has five days to release the domain. In most cases, they will send you an email to confirm you want to transfer. If you actively acknowledge that email (through a link or the registrar's dashboard), they can process it immediately.

To see the progress of your transfer, log in to the Cloudflare dashboard and select your account. Then, select **Registrar** > **Transfer** to see a list of domain transfers that are in progress. To accelerate the process, be sure to check with your old registrar how you can approve the transfer out.

Once successful, you will receive an email from Cloudflare and be able to manage the domain in the dashboard under **Overview** of that site.

### Why am I not allowed to transfer my domain?

ICANN prohibits domain transfers within 60 days of a change to the WHOIS data or registrar of a domain. If you modified your contact information, transferred registrars, or registered your domain in the last 60 days, Cloudflare will be unable to process your transfer immediately.

You can leave the domain **In Progress** and Cloudflare will attempt to process the transfer until the 60-day window passes.

{{<Aside type="note" header="Note">}}This information does not apply to `.uk` domains.{{</Aside>}}

### Why am I not able to start a transfer?

If you have an <a href='https://support.cloudflare.com/hc/articles/203471284#h_1l0KGygoBX9QYjNrhAcHjg'>unverified email address</a>, you might experience issues when initiating a domain transfer.

### What happens if I enter the wrong auth code?

If you enter an incorrect auth code (also referred to as authentication code or authorization code), return to the **Domain Registration** page or the **Overview** for your site. You can use the available input field to reenter your authentication code.

### I registered my domain for 10 years at another registrar. If I transfer it to Cloudflare will I gain another year?

No. A domain cannot have more than 10 years on the term. If you registered your domain for 10 years, you will get 10 years upon transferring it to Cloudflare.

---

## Domain registrations

### Can I register a premium domain?

Cloudflare does not currently support premium domains. Some registries designate a domain name as “premium” and charge higher wholesale rates for these domains.

### My domain’s registration was not extended by one year after transferring to Cloudflare

When you transfer your domain to Cloudflare, the registry will extend your registration by one year. However, in one specific circumstance your transfer could result in you keeping your original expiration date.

When a domain expires, the registration enters the auto-renew grace period. During that time, you can renew the domain at your registrar to avoid losing it. If your domain expires at your current registrar, you renew it and then transfer to Cloudflare within 45 days, the registry can restrict the addition of an extra year.

Say you have `example.com` registered and it expires on December 10, 2021. You decide to renew it during the auto-renew grace period on December 20, 2021. That renewal extends the registration to December 20, 2022. You then transfer to Cloudflare on December 30, 2021. Since that transfer is within 45 days of the expiration, the registry may not add the year to your registration. When you transfer to Cloudflare or any registrar in this circumstance, your expiration can still remain December 20th, 2022.

If a year is not added to your registration, you have effectively paid twice for the same added year. Per ICANN rules, you are entitled to request a refund at your previous registrar.

### What Happens When a Domain Expires?

Cloudflare currently offers a 40-day grace period for most top-level domains (TLDs). During this period you may renew/extend the domain at any time from within the dashboard but no further auto-renew attempts will be made. For the first 30 days of the grace period, the domain will continue to resolve as normal. On the 30th day after the expiration date, the domain will be suspended and a parked suspension page will be displayed. You may still renew the domain at any time during this suspension period. On the 40th day, the domain will enter the Redemption Period and will no longer resolve to any web page. The redemption period lasts for 30 days. During this time, it may be possible to restore and renew the domain. A restore fee may apply in addition to the renewal fee. Contact your account team for assistance. At the end of the 30 day redemption period, the domain will be placed in pending delete status for a period of five days, after which it will be released and made available for re-registration. The domain cannot be restored or renewed during this period.

In summary, here is what will happen after a domain expires:

- **Day 0:** Expiration Date.
- **Day 1 - 30:** Grace Period (domain resolves normally).
- **Day 31 - 40:** Suspension Period (domains resolves to suspension page).
- **Day 41 - 70:** Redemption Period.
- **Day 71 - 75:** Pending Delete Period.

---

## Billing

### How much does Cloudflare Registrar cost?

Refer to [What is Cloudflare Registrar](https://www.cloudflare.com/learning/dns/what-is-cloudflare-registrar/) for more information on pricing.

### When will I be billed?

You will be billed when you input your authorization code and initiate the transfer of your domain to Cloudflare. Currently, Cloudflare Registrar only uses the primary payment method for any associated transaction. Make sure to copy and paste the code to avoid mistakes. The transfer will not initiate if the code is incorrect.

### Is there a fee to transfer a .UK domain?

No, there is no fee to transfer a `.uk` domain. Also, an additional year is NOT added during the transfer process. However, if the domain is nearing the expiration date and is set to auto-renew, it may be automatically renewed shortly after the completion of the transfer.
