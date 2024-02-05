---
pcx_content_type: concept
title: JSON Web Tokens Validation
weight: 5
---

# JSON Web Tokens Validation

{{<glossary-tooltip term_id="JSON web token (JWT)">}}JSON web tokens (JWT){{</glossary-tooltip>}} are often used as part of an authentication component on many web applications today. Since JWTs are crucial to identifying users and their access, ensuring the token’s integrity is important.

API Shield’s JWT Validation stops JWT replay attacks and JWT tampering by cryptographically verifying incoming JWTs before they are passed to your API origin. JWT Validation will also stop requests with expired tokens or tokens that are not yet valid.

## Process

Endpoints must be added to [Endpoint Management](/api-shield/management-and-monitoring/) for JWT Validation to protect them.

A JWT Validation configuration consists of creating a Token Validation Configuration by adding your JWT signer’s public keys and a JWT Validation Rule by specifying which hostnames and endpoints should be included for validation.

### Add a Token Validation Configuration

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2. Go to **Security** > **API Shield** > **Settings**.
3. Under **JSON Web Token Settings**, select **Add configuration**.
4. Add a name for your configuration.
5. Choose where Cloudflare can locate the JWT for this configuration on incoming requests, such as a header or cookie and its name.
6. Copy and paste your JWT issuer’s public key(s).

{{<Aside type="note">}}
Each JWT issuer typically publishes public keys for verification at a known URL on the Internet. If you do not know where to get them, contact your identity administrator.
{{</Aside>}}

To automatically keep your keys up to date when your identity provider refreshes them, you can use a Worker. Refer to [Configure Workers to automatically update keys](/api-shield/security/jwt-validation/jwt-worker/) to learn more about setting up the Worker.

### Add a JWT Validation Rule

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2. Go to **Security** > **API Shield** > **API Rules**.
3. Add a name for your rule.
4. Select a hostname to protect requests with saved endpoints using the rule.
5. Deselect any endpoints that you want JWT Validation to ignore (for example, an endpoint used to generate a JWT).
6. Select the Token Validation Configuration that corresponds to the incoming requests.
7. Choose whether to strictly enforce token presence on these endpoints. 
    - You may not expect 100% of clients to send in JWTs with their requests. If this is the case, choose _Ignore_. JWT Validation will still validate JWTs that are present.
    - You may otherwise expect all requests to the selected hostname and endpoints to contain JWTs. If this is the case, choose _Mark as non-compliant_.
8. Choose an action to take for non-compliant requests. For example, JWTs that do not pass validation (expired, tampered with, or bad signature tokens) or requests with missing JWTs when _Mark as non-compliant_ is selected in the previous step.
9. Select **Save**.

{{<Aside type="note">}}
Token configuration rules will automatically apply to new endpoints added to Endpoint Management if those endpoints also match the rule.
{{</Aside>}}

## Special cases

### Validate two JWTs with different identity providers on a single request

If you expect that two different JWTs should be present in a request and you want to validate both, you must create two different token configurations. When selecting the two configurations in your validation rule, select _Validate all configurations_ under **Validation behavior for multiple configurations**.

### Support a migration from one identity provider to another

If you expect to migrate between two different identity providers, you must create two different token configurations and two different validation rules, each corresponding to its own configuration. With this setup, you can change the action for different validation rules depending on the state of your migration.

## Availability

JWT Validation is available for all API Shield customers. Enterprise customers who have not purchased API Shield can preview [API Shield as a non-contract service](https://dash.cloudflare.com/?to=/:account/:zone/security/api-shield) in the Cloudflare dashboard or by contacting your account team. 

## Limitations

Currently, the following known limitations exist:

1. JWT Validation only operates on JWTs sent in client request headers or cookies. If your clients send in JWTs in a `POST` body, direct that feedback to your account team.
2. JWT Validation only operates for {{<glossary-tooltip term_id="API endpoint">}}endpoints{{</glossary-tooltip>}} (host, method, and path) added to Endpoint Management. You can add all of your endpoints to endpoint management through [API Discovery](/api-shield/management-and-monitoring/#add-endpoints-from-api-discovery), [Schema Validation](/api-shield/management-and-monitoring/#add-endpoints-from-schema-validation), [manually via the Cloudflare dashboard](/api-shield/management-and-monitoring/#add-endpoints-manually), or via the [API](/api/operations/api-shield-endpoint-management-add-operations-to-a-zone).