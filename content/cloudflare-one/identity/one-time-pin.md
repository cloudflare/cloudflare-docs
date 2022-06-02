---
pcx-content-type: how-to
title: One-time PIN login
weight: 2
---

# One-time PIN login

Cloudflare Access can send a one-time PIN (OTP) to approved email addresses as an alternative to integrating an identity provider. You can simultaneously configure OTP login and the identity provider of your choice to allow users to use their own authentication method.

For example, if your team uses Okta® but you’re collaborating with someone outside your organization, you can use OTP to grant access to external resources.

## Set up OTP

To set up OTP to allow guest-user access, you simply add the guest user's email address to an [Access policy](/cloudflare-one/policies/access/policy-management/#add-a-policy) and to the [group](/cloudflare-one/identity/users/groups/) that allows your team to reach the application.

This is the workflow for your guest user:

1.  When logging in to your application, they will select **OTP**.

1.  Then, they will enter their email address and click **Send me a code**.

    ![Login page](/cloudflare-one/static/documentation/identity/otp/otp1.png)

    Access will send a one-time PIN they can use to authenticate. This secure PIN expires 10 minutes after the initial request.

1.  If their email address matches a policy, they will receive a PIN.

1.  Next, they will paste the PIN in the login page and click **Sign in**.

    ![PIN field](/cloudflare-one/static/documentation/identity/otp/otp2.png)

Access will then log them in.

## Example API Config

```json
{
  "config": {},
  "type": "onetimepin",
  "name": "my example idp"
}
```
