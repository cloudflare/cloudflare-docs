## Before transferring a domain to Cloudflare

* Ensure you have created [an account that includes your domain](https://support.cloudflare.com/hc/articles/201720164) and [changed your DNS name servers](https://support.cloudflare.com/hc/articles/205195708) to Cloudflare.
* Disable DNSSEC by:
    * Removing the DS record at your current DNS host.
    * [Disabling DNSSEC](https://support.cloudflare.com/hc/articles/360006660072) in the Cloudflare dashboard.
* If initiating multiple transfers, notify your financial institution to prevent them from flagging these charges as fraudulent.
* Renew your domain if it is within 15 days of expiration.
* Unlock your domain at your current registrar.
* Do not make any changes to the Registrant contact information. Updating the Registrant contact may result in your current registrar locking the domain for 60 days.