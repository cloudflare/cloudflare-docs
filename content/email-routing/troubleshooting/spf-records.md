---
title: SPF records
pcx-content-type: how-to
weight: 1
meta:
    title: Troubleshooting SPF records
---

# Troubleshooting SPF records

Having multiple [sender policy framework (SPF) records](https://www.cloudflare.com/learning/dns/dns-records/dns-spf-record/) on your account is not allowed, and will prevent Email Routing from working properly. If your account has multiple SPF records, follow these steps to solve the issue.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Email**. Email Routing will warn you that you have multiple SPF records.
3. Click **Fix records**.
4. Delete the incorrect SPF record. If you are unsure of which SPF record to delete, delete all SPF records.
5. (Optional) If you deleted all SPF records, return to the main Email Routing screen, and click **Fix records**.
6. (Optional) Email Routing will show you the correct, missing SPF record. Click **Add records and enable**.

You should now have your SPF records correctly configured.