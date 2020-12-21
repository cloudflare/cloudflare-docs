---
order: 3
hidden: true
---

# Access with MFA

You can use Cloudflare Access to require that users log in to certain applications with specific types of multifactor authentication (MFA) methods. For example, you can create rules that only allow users to reach a given application if they authenticate with a physical hard key. This feature is only available to teams using the following identity providers:
* Okta
* Azure AD

## Adding Authentication Methods Into The JWT

When users authenticate with their identity provider, the identity provider shares their username with Cloudflare Access. Cloudflare Access writes that value into the [JSON Web Token (JWT)](/glossary#jwt) generated for the user.

Certain identity providers can also share the multifactor authentication (MFA) method presented by the user to login. Cloudflare Access can add these values into the JWT and force. For example, if the user authenticated with their password and a physical hard key, the identity provider can send a confirmation to Cloudflare Access. Cloudflare Access then stores that method into the same JWT issued to the user.

Cloudflare Access follows [RFC 8176](https://tools.ietf.org/html/rfc8176), Authentication Method Reference Values, to define authentication methods.

For instructions on how to create policies to enforce MFA, see our [Policies and Rules section](/learning/policies-and-rules/#enforcing-mfa).