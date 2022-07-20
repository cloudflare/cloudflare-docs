---
title: SPF records
pcx-content-type: how-to
weight: 1
meta:
    title: Troubleshooting SPF records
---

# Troubleshooting SPF records

Having multiple SPF records on your account is not allowed, and will prevent Email Routing from working properly. If your account has multiple SPF records, follow these steps to solve the issue.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Email**. Email Routing will warn you that you have multiple SPF records.
3. Click **Fix records**.
4. On the next page, delete the incorrect SPF record. If you are unsure of which SPF record to delete, delete all SPF records.
5. (Optional) If you deleted all SPF records, return to the main Email Routing screen, and click **Fix records**.
6. (Optional) On the next page, Email Routing will show you the missing SPF record. Click **Add records and enable**.

You should now have your DNS records correctly configured.