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
<summary>HTTP Header Validation</summary>

<div>

Only allow traffic with specific (and secret) HTTP headers.

- **Security**: Moderately secure.
- **Availability**: All customers.
- **Challenges**:
    - Requires more configuration efforts on application- and server-side to accept those headers.
    - Basic authentication is vulnerable to replay attacks. Because basic authentication does not encrypt user credentials, it is important that traffic always be sent over an encrypted SSL session.
    - There might be valid use cases for a mismatch in SNI / Host headers such as through [Page Rules](https://developers.cloudflare.com/support/page-rules/using-page-rules-to-rewrite-host-headers/), [Load Balancing](https://developers.cloudflare.com/load-balancing/additional-options/override-http-host-headers/), or [Workers](https://developers.cloudflare.com/workers/runtime-apis/request/), which all offer HTTP Host Header overrides.
- **Process**:
    1. Use [Transform rules](/rules/transform/request-header-modification/) or [Workers](/workers/examples/alter-headers/) to add an HTTP Auth Header.
    2. Configure your origin server to restrict access based on the [HTTP Auth Header](/workers/examples/auth-with-headers/) (or perform [HTTP Basic Authentication](/workers/examples/basic-auth/)).
    3. Configure your origin server to restrict access based on the [HTTP Host Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Host). Specifically, only allow requests which contain expected HTTP Host Header values, and reject all other requests. 

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