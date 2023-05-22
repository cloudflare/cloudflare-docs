---
_build:
  publishResources: false
  render: never
  list: never
---

<details>
<summary>Authenticated Origin Pulls</summary>

<div>

[Authenticated origin pulls](/ssl/origin-configuration/authenticated-origin-pull/) help ensure requests to your origin server come from the Cloudflare network.

- **Security**: Very secure.
- **Availability**: All customers.
- **Challenges**: 
    - Requires [Full](/ssl/origin-configuration/ssl-modes/full/) or [Full (strict)](/ssl/origin-configuration/ssl-modes/full-strict/) encryption modes.
    - Requires more configuration efforts for application and server, such as uploading a Cloudflare [Origin CA certificate](/ssl/origin-configuration/origin-ca/) and configuring the server to use it.
    - Not scalable for large numbers of origin servers.

</div>
</details>

<details>
<summary>Cloudflare Tunnel (SSH / RDP)</summary>

<div>

{{<render file="_cloudflare-tunnels-origin-description.md">}}

</div>
</details>