---
title: Secure compromised account
pcx_content_type: tutorial
weight: 5
---

# Secure compromised account

If you observe suspicious activity within your Cloudflare account, secure your account with these steps.

## Step 1 - Change your password

For more guidance on changing your password, refer to [Change email address or password](https://support.cloudflare.com/hc/en-us/articles/203471284#12345679).

## Step 2 - Revoke active account sessions

{{<render file="_revoke-active-sessions.md">}}

## Step 3 - Enable Two-Factor Authentication (2FA)

To prevent future compromises, make sure that you have [Two-Factor Authentication (2FA)](/support/account-management-billing/account-privacy-and-security/securing-user-access-with-two-factor-authentication-2fa/) enabled on your account.

## Step 4 - Change API keys and tokens

### API keys

{{<render file="_api-change-api-key.md">}}

### API tokens

{{<render file="_api-roll-token.md">}}

## Step 5 - Review the audit log

{{<render file="_view-audit-log.md">}}

If you notice any settings were changed, you should undo those changes.
