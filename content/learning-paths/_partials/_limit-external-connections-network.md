---
_build:
  publishResources: false
  render: never
  list: never
---

<details>
<summary>Allowlist Cloudflare IP addresses</summary>

<div>

Explicitly block all traffic that does not come from [Cloudflare IP addresses](/fundamentals/get-started/setup/allow-cloudflare-ip-addresses/) (or the IP addresses of your trusted partners, vendors, or applications).

- **Security**: Moderately secure.
- **Availability**: All customers.
- **Challenges**:
    - Requires allowlisting Cloudflare IP ranges at your origin server.
    - Vulnerable to IP spoofing.

</div>
</details>