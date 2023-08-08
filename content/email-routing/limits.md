---
pcx_content_type: reference
title: Limits
weight: 7
---

# Limits

## Email Workers size limits

When you process emails with Email Workers and you are on [Workers’ free pricing tier](/workers/platform/pricing/) you might encounter an allocation error. This may happen due to the size of the emails you are processing and/or the complexity of your Email Worker. Refer to [Worker limits](/workers/platform/limits/#worker-limits) for more information.

You can use the [log functionality for Workers](/workers/observability/log-from-workers/) to look for messages related to CPU limits (such as `EXCEEDED_CPU`) and troubleshoot any issues regarding allocation errors.

If you encounter these error messages frequently, consider upgrading your Workers plan to [Workers Unbound](/workers/platform/limits/#unbound-usage-model) for higher usage limits.

## Message size

Currently, Email Routing does not support messages bigger than 25 MiB.

## Rules and addresses

Feature | Limit
--- | ---
[Rules](/email-routing/setup/email-routing-addresses/) | 200
[Addresses](/email-routing/setup/email-routing-addresses/#destination-addresses) | 200

You can request adjustments to limits that conflict with your project goals by contacting Cloudflare. To request an increase to a limit, complete the [Limit Increase Request Form](https://forms.gle/ukpeZVLWLnKeixDu7) and we will contact you with next steps.