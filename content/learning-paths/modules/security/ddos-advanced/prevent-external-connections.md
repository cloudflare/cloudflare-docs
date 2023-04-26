---
title: Restrict external connections
pcx_content_type: learning-unit
weight: 4
layout: learning-unit
---

To fully secure your origin, you should limit or restrict external connections to your origin server. These suggestions vary in their level of completeness and complexity and depend on your application and origin setup.

## Application layer

<details>
<summary>Cloudflare Tunnel (HTTP / WebSockets)</summary>

<div>

{{<render file="_cloudflare-tunnels-origin-description.md">}}

</div>
</details>

<details>
<summary>HTTP Basic Authentication</summary>

<div>

Only allow traffic with specific (and secret) HTTP headers.

- **Security**: Moderately secure.
- **Availability**: All customers.
- **Challenges**:
    - Requires more configuration efforts on application- and server-side to accept those headers.
    - Basic authentication is vulnerable to replay attacks. Because basic authentication does not encrypt user credentials, it is important that traffic always be sent over an encrypted SSL session.
- **Process**:
    1. Use [Transform rules](/rules/transform/request-header-modification/) or [Workers](/workers/examples/alter-headers/) to add an HTTP Auth Header.
    2. Configure your origin server to restrict access based on the [HTTP Auth Header](/workers/examples/auth-with-headers/) (or perform [HTTP Basic Authentication](/workers/examples/basic-auth/)).

</div>
</details>

<details>
<summary>JSON Web Tokens (JWT) Validation</summary>

<div>

Only allow traffic with the appropriate JWT.

- **Security**: Very secure.
- **Availability**: Some customers.
- **Challenges**:
    - Requires either installing incremental software or modifying application code.
    - Lots of manual work.
- **Resources**:
    - [Validate JWTs for an Access application](/cloudflare-one/identity/authorization-cookie/validating-json/)
    - [Validate JWTs for an API](/api-shield/security/jwt-validation/)

</div>
</details>

## Transport Layer

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

## Network Layer

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

<details>
<summary>Cloudflare Network Interconnect</summary>

<div>

[Cloudflare Network Interconnect](/network-interconnect/) allows you to connect your network infrastructure directly with Cloudflare – rather than using the public Internet – for a more reliable and secure experience

- **Security**: Very secure.
- **Availability**: Enterprise-only.
- **Challenges**
    - Requires some networking knowledge.
    - Only applies to some customer use cases.

</div>
</details>

<details>
<summary>Cloudflare Aegis</summary>

<div>

[Cloudflare Aegis](https://blog.cloudflare.com/cloudflare-aegis/) prevents external connections by providing dedicated egress IP addresses.

- **Security**: Very secure.
- **Availability**: Enterprise-only.
- **Challenges**: Requires network-level firewall policies.

</div>
</details>