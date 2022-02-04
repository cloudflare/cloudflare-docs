---
order: 3
pcx-content-type: reference
---

# Known limitations

Below, you will find information regarding the current limitations for Email Routing (beta).

## Internationalized Domain Names (IDNs)

Email Routing (beta) [does not support IDNs](https://en.wikipedia.org/wiki/Internationalized_domain_name) currently (February 2022). If you are setting up Email Routing from an IDN domain, email delivery might fail.

## Non-delivery reports (NDRs)

Currently, Email Routing does not forward non-delivery reports to the original sender. This means the sender will not receive a notification indicating that the email did not reach the intended destination. 

## Subdomains are only supported for Enterprise customers

Subdomains cannot use Email Routing to forward emails, unless they are part of an Enterprise account.

## Signs such "`+`" and "`.`" are treated as normal characters for custom addresses

Email Routing does not currently have advanced routing options. Characters such as `+` or `.`, which perform special actions in email providers like Gmail and Outlook, are currently treated as normal characters on custom addresses. More flexible routing options are in our roadmap.

## Restrictive DMARC policies can make forwarded emails fail

Due to the nature of email forwarding, restrictive DMARC policies might make forwarded emails fail to be delivered. Refer to [dmarc.org](https://dmarc.org/wiki/FAQ#My_users_often_forward_their_emails_to_another_mailbox.2C_how_do_I_keep_DMARC_valid.3F) for more information.