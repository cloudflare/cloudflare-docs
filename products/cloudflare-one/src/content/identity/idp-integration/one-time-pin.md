---
order: 12
---

# One-Time Pin Login

Cloudflare Access can send a one-time PIN (OTP) to approved email addresses as an alternative to configuring an identity provider. You can simultaneously configure an OTP and IdP to allow users to use their own authentication method.

For example, if your team uses Okta® but you’re collaborating with someone outside your organization, use OTP to grant them access.

## Set up OTP

To set up OTP to allow guest-user access, you simply add the guest user's email address to a [Zero Trust rule](/policies/zero-trust/policy-management#add-a-policy) and to the [group](/identity/users/groups) that allows your team to reach the application.

This is the workflow for your guest user:

1. Select OTP on login to your application.
2. Enter their email address and click **Send me a code**.

    ![Login page](../../static/documentation/identity/otp/otp1.png)

    Access sends a one-time PIN they use to authenticate. This secure PIN expires 10 minutes after the initial request.

3. Receive a PIN when the email address matches a Policy.
4. Paste PIN in login page and click **Sign in**.

    ![PIN field](../../static/documentation/identity/otp/otp2.png)

5. Access logs them in.

## Example API Config

```json
{
    "config": {},
    "type": "onetimepin",
    "name": "my example idp"
}
