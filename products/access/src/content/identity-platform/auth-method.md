---
order: 3
---

# MFA Requirements

You can use Cloudflare Access to require that users log in to certain applications with specific types of multifactor authentication (MFA) methods. For example, you can create rules that only allow users to reach a given application if they authenticate with a physical hard key. This feature is only available to teams using the following identity providers:

* Okta
* Azure AD

## Adding authentication methods into the JWT

When users authenticate with their identity provider, the identity provider shares their username with Cloudflare Access. Cloudflare Access writes that value into the [JSON Web Token](/setting-up-access/json-web-token/) (JWT) generated for the user.

Certain identity providers can also share the multifactor authentication (MFA) method presented by the user to login. Cloudflare Access can add these values into the JWT and force. For example, if the user authenticated with their password and a physical hard key, the identity provider can send a confirmation to Cloudflare Access. Cloudflare Access then stores that method into the same JWT issued to the user.

Cloudflare Access follows [RFC 8176](https://tools.ietf.org/html/rfc8176), Authentication Method Reference Values, to define authentication methods.

## Creating a rule

You can build rules that require users to authenticate with certain types of MFA methods. When added, Cloudflare Access will reject user logins that did not use the required MFA method.

To add an MFA requirement to your application, follow the instructions below.

1. Navigate to the application in the Cloudflare for Teams dashboard or create a new application.
1. In the `Rules` section of the Application, edit an existing rule that contains an identity requirement or add a new rule.
1. The rule must contain an `Include` rule which defines an identity. For example, the `Include` rule should allow for users who are part of an email domain, identity provider group, or Access Group.
1. In the rule builder, add a `Require` rule. Select `Authentication Method` and choose the MFA method to require.
1. Save the rule.

## FAQs

### What happens if the user fails to present the required MFA method?

Cloudflare Access will reject the user, even if they successfully login to the identity provider with an alternative method.