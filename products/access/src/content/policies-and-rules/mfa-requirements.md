---
order: 3
---

# Enforce MFA

You can build rules into policies that require users to authenticate with certain types of MFA methods (if supported by your IdP). When added, Cloudflare Access will reject user logins that did not use the required MFA method. For example, you can create rules that only allow users to reach a given application if they authenticate with a physical hard key. This feature is only available to teams using the following identity providers:

* Okta
* Azure AD

To add an MFA requirement to your application, follow the instructions below.

1. Navigate to the application in the Cloudflare for Teams dashboard, or create a new application.

2. In the **Policies** section of the a application, edit an existing rule that contains an identity requirement or add a new rule.

 The rule must contain an Include rule which defines an identity. For example, the Include rule should allow for users who are part of an email domain, identity provider group, or Access Group.

3. In the rule builder, add a *Require* action.

4. Select *Authentication Method* and choose `mfa - multiple-factor authentication`.

![MFA](../static/summary/mfa.png)

5. Save the rule.

<Aside>

**What happens if the user fails to present the required MFA method?**

Cloudflare Access will reject the user, even if they successfully login to the identity provider with an alternative method.
</Aside>


## Adding authentication methods into the JWT

When users authenticate with their identity provider, the identity provider shares their username with Cloudflare Access. Cloudflare Access writes that value into the [JSON Web Token (JWT)](/glossary#jwt) generated for the user.

Certain identity providers can also share the multifactor authentication (MFA) method presented by the user to login. Cloudflare Access can add these values into the JWT and force. For example, if the user authenticated with their password and a physical hard key, the identity provider can send a confirmation to Cloudflare Access. Cloudflare Access then stores that method into the same JWT issued to the user.

Cloudflare Access follows [RFC 8176](https://tools.ietf.org/html/rfc8176), Authentication Method Reference Values, to define authentication methods.

For instructions on how to create policies to enforce MFA, see our [Policies and Rules section](/learning/policies-and-rules/#enforcing-mfa).