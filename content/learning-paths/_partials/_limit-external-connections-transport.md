---
_build:
  publishResources: false
  render: never
  list: never
---

<details>
<summary>Authenticated Origin Pulls</summary>

<div>

[Authenticated Origin Pulls](/ssl/origin-configuration/authenticated-origin-pull/) helps ensure requests to your origin server come from the Cloudflare network.

- **Security**: Very secure.
- **Availability**: All customers.
- **Challenges**:
    - Requires [Full](/ssl/origin-configuration/ssl-modes/full/) or [Full (strict)](/ssl/origin-configuration/ssl-modes/full-strict/) encryption modes.
    - Requires more configuration efforts for application and server, such as uploading a certificate and configuring the server to use it.
    - For more strict security, you should upload your own certificate. Although Cloudflare provides you a certificate for easy configuration, this certificate only guarantees that a request is coming from the Cloudflare network.
    - Not scalable for large numbers of origin servers.

</div>
</details>

<details>
<summary>Cloudflare Tunnel (SSH / RDP)</summary>

<div>

{{<render file="_cloudflare-tunnels-origin-description.md">}}

</div>
</details>