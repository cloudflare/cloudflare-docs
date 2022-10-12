---
pcx_content_type: how-to
title: One-time PIN login
weight: 2
---

# One-time PIN login

Cloudflare Access can send a one-time PIN (OTP) to approved email addresses as an alternative to integrating an identity provider. You can simultaneously configure OTP login and the identity provider of your choice to allow users to select their own authentication method.

For example, if your team uses Okta® but you are collaborating with someone outside your organization, you can use OTP to grant access to guests.

## Set up OTP

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Settings** > **Authenticaton**.
2. Under **Login methods**, select **Add new**.
3. Select **One-time PIN**.
4. If your organization uses a 3rd party email scanning service (for example, Mimecast or Barracuda), add `no-reply@notify.cloudflare.com` to your Allow List.

To grant a user access to an application, simply add their email address to an [Access policy](/cloudflare-one/policies/access/policy-management/#add-a-policy).

## Log in with OTP

To log in to Access using the one-time PIN:

1. Go to the application protected by Access.
2. On the Access login page, enter your email address and select **Send me a code**.
    ![Enter email to sign in with OTP.](/cloudflare-one/static/documentation/identity/otp/otp1.png)
3. If the email is allowed by an Access policy, you will receive a PIN in your inbox. This secure PIN expires 10 minutes after the initial request.

  {{<Aside type="note">}}
  By design, blocked users will not receive an email. The login page will always say **A code has been emailed to you**, regardless of whether or not an email was sent.
  {{</Aside>}}
  
4. Paste the PIN into the Access login page and select **Sign in**.
    ![Enter PIN to sign in.](/cloudflare-one/static/documentation/identity/otp/otp2.png)

    - If the code was valid, you will be redirected to the application.
    - If the code was invalid, you will see **That account does not have access.**

{{<Aside type="note">}}
Access only logs an authentication attempt after the user enters a code. If the user enters their email but never submits a code, the event will not appear in your [audit logs](/cloudflare-one/analytics/logs/audit-logs/#authentication-audit-logs).
{{</Aside>}}

## Example API Config

```json
{
  "config": {},
  "type": "onetimepin",
  "name": "my example idp"
}
```
