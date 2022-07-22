---
title: Email DNS records
pcx-content-type: reference
weight: 2
meta:
    title: Email Routing DNS records
---

# Email Routing DNS records

Email Routing's Settings section displays the DNS records needed for Email Routing to work. If the DNS records are correctly configured, you will see a green `Email DNS records configured` message. Click **View DNS records** for a list of the required MX records Email Routing is using.

You can also unlock your DNS records to make additional changes or disable Email Routing, or lock your DNS records.

## Misconfigured Email Routing records

Email Routing warns you when your DNS records are not properly configured. When this happens, Email Routing also shows which records are required, and which records you will have to delete (if any) to activate the service.

To activate Email Routing and clean your DNS records, click **Enable Email Routing**. Email Routing will guide you through this process.

This section will also show you a number of problems that might arise from misconfigured DNS settings, such as having multiple sender policy framework (SPF) records. Refer to [Troubleshooting SPF records](/email-routing/troubleshooting/spf-records/) for details on how to solve this issue.