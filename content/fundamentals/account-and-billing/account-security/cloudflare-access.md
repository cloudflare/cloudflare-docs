---
pcx_content_type: how-to
title: Allow Cloudflare access
weight: 4
meta:
    title: Provide edit access to Cloudflare Support
---

# Provide edit access to Cloudflare Support

Occasionally, you may want to allow edit access to your account for Cloudflare Support. A typical use case might be migrating a complex or sensitive domain over to Cloudflare.

By default, Cloudflare Support does not have edit access to your account.

To enable editing access by Cloudflare Support:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account (you must be logged in as a **Super Administrator**).
2. Go to **Manage Account** > **Configurations**.
3. For **Editing Permission**, switch the toggle to **On**.
4. Select a duration.
5. Click **Approve**.

{{<Aside type="note">}}

In an emergency, Cloudflare Support can override your **Editing Permissions** and make updates to your account, but your Super Administrator will receive an email and the action will be recorded in your [Audit Logs](/fundamentals/account-and-billing/account-security/review-audit-logs/) with an **Action** of **Break glass**.

{{</Aside>}}