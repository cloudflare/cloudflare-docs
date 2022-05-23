---
_build:
  publishResources: false
  render: never
  list: never
---

## Before transferring a domain to Cloudflare

* Ensure that you have:
  * Created [a Cloudflare account](https://support.cloudflare.com/hc/articles/201720164).
  * [Added the domain](/fundamentals/get-started/setup/add-site/) you are transferring to Cloudflare to your account.
  * [Changed your DNS name servers](/dns/zone-setups/full-setup/) to Cloudflare.
* Disable DNSSEC by:
  * Removing the DS record at your current DNS host.
  * [Disabling DNSSEC](/registrar/account-options/enable-dnssec/) in the Cloudflare dashboard.
* If initiating multiple transfers, notify your financial institution to prevent them from flagging these charges as fraudulent.
* Renew your domain if it is within 15 days of expiration.
* Unlock your domain at your current registrar.
* Do not make any changes to the Registrant contact information. Updating the Registrant contact may result in your current registrar locking the domain for 60 days.
* Make sure your account has a valid credit card on file.
* If you are transferring a `.us` domain, refer to the [Additional requirements for .US domains](/registrar/faq/#additional-requirements-for-us-domains) before proceeding.