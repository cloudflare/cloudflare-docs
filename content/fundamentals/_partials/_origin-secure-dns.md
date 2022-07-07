---
_build:
  publishResources: false
  render: never
  list: never
---

When you secure origin connections, it prevents attackers from discovering and overloading your origin server with requests.

- **DNS**: 

    1. **Proxy records** (when possible): Set up [proxied (orange-clouded) DNS records](/dns/manage-dns-records/reference/proxied-dns-records/) to hide your origin IP addresses and provide DDoS protection. As part of this, you should [allow Cloudflare IP addresses](/fundamentals/get-started/setup/allow-cloudflare-ip-addresses/) at your origin to prevent requests from being blocked.
    2. **Review DNS-only records**: Audit existing **DNS-only** records (`SPF`, `TXT`, and more) to make sure they do not contain origin IP information.
    3. **Evaluate mail infrastructure**: If possible, do not host a mail service on the same server as the web resource you want to protect, since emails sent to non-existent addresses get bounced back to the attacker and reveal the mail server IP.
    4. **Rotate origin IPs**: Once [onboarded](https://support.cloudflare.com/hc/articles/4426809598605), rotate your origin IPs, as DNS records are in the public domain. Historical records are kept and would contain IP addresses prior to joining Cloudflare.