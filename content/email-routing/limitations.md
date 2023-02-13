---
pcx_content_type: reference
title: Limitations
weight: 6
---

# Limitations

Below, you will find information regarding the current limitations for Email Routing.

## Email Workers size limits

When you process emails with Email Workers and you are on [Workers’ free pricing tier](/workers/platform/pricing/) you might encounter an allocation error. This may happen due to the size of the emails you are processing and / or the complexity of your Email Worker. Refer to [Workers limits](/workers/platform/limits/#worker-limits) for more information.

You can use the [log functionality for Workers](/workers/learning/logging-workers/) to look for messages related to CPU limits (such as `EXCEEDED_CPU`) and troubleshoot any issues regarding allocation errors.

If you encounter these error messages frequently, consider upgrading your Workers plan to [Workers Unbound](/workers/platform/limits/#unbound-usage-model) for higher usage limits.

## Email address internationalization (EAI)

Email Routing [does not support internationalized email addresses](https://en.wikipedia.org/wiki/International_email). Email Routing only supports[Internationalized domain names](https://en.wikipedia.org/wiki/Internationalized_domain_name). 

This means that you can have email addresses with an internationalized domain, but not an internationalized local-part (the first part of your email address, before the `@` symbol). Refer to the following examples:

* `info@piñata.es` - Supported.
* `piñata@piñata.es` - Not supported.

## Non-delivery reports (NDRs)

Email Routing does not forward non-delivery reports to the original sender. This means the sender will not receive a notification indicating that the email did not reach the intended destination.

## Subdomains are only supported for Enterprise customers

Subdomains cannot use Email Routing to forward emails, unless they are part of an Enterprise account.

## Signs such "`+`" and "`.`" are treated as normal characters for custom addresses

Email Routing does not have advanced routing options. Characters such as `+` or `.`, which perform special actions in email providers like Gmail and Outlook, are currently treated as normal characters on custom addresses. More flexible routing options are in our roadmap.

## Restrictive DMARC policies can make forwarded emails fail

Due to the nature of email forwarding, restrictive DMARC policies might make forwarded emails fail to be delivered. Refer to [dmarc.org](https://dmarc.org/wiki/FAQ#My_users_often_forward_their_emails_to_another_mailbox.2C_how_do_I_keep_DMARC_valid.3F) for more information.

## Sending or replying to an email from your Cloudflare domain

Email Routing does not support sending or replying from your Cloudflare domain. When you reply to emails forwarded by Email Routing, the reply will be sent from your destination address (like `my-name@gmail.com`), not your custom address (like `info@my-company.com`).