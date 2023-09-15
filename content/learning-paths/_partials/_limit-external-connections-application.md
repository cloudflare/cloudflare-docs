---
_build:
  publishResources: false
  render: never
  list: never
---

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