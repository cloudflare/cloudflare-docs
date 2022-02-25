---
pcx-content-type: reference
---

# Domain statuses

Once you [add a domain](https://support.cloudflare.com/hc/articles/201720164) to Cloudflare on a full or partial setup, it moves through several statuses:

*   **Setup**: You initiated but did not finish the signup process.

*   **Pending Nameserver Update**:

    *   [*Full setups*](/zone-setups/full-setup): You have either not changed your authoritative nameservers at your registrar or your change has not yet been authenticated.
    *   [*Partial setups*](/zone-setups/partial-setup): You have either not added the verification TXT record to your authoritative DNS or that record has not yet been authenticated.

      <Aside type="warning">

    Pending zones cannot be used to [proxy traffic to Cloudflare](/manage-dns-records/reference/proxied-dns-records#limitations-for-pending-domains).

      </Aside>

*   **Active**: Cloudflare has authenticated your nameserver changes or verification TXT record and you can proxy domain traffic through Cloudflare.

*   **Moved**: Your domain has failed multiple DNS checks, meaning that your domain setup is no longer using Cloudflare.

If your domain's status changes, you will receive an email at the address associated with your account.

## Domain removal

If domains remain in the **Pending Nameserver Update** or **Moved** status for too long, Cloudflare removes them from your account and the Cloudflare network.

If you need to re-add a domain to your account, follow the [regular onboarding flow](https://support.cloudflare.com/hc/articles/201720164).
