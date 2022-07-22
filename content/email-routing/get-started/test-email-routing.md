---
title: Test Email Routing
pcx-content-type: get-started
weight: 1
---


## Test your Email Routing configuration

To test that your configuration is working properly, send an email to the custom address [you set up in the dashboard](#enable-email-routing). You should send your test email from a different address than the one you specified as the destination address. For example, if you set up `your-name@gmail.com` as the destination address, do not send your test email from that same Gmail account. Some email providers will discard what they interpret as an incoming duplicate email and will not show it in your inbox, making it seem like Email Routing is not working properly.

## DMARC enforcing

Email Routing enforces Domain-based Message Authentication, Reporting & Conformance (DMARC). Depending on the sender's DMARC policy, Email Routing will reject emails when there is an authentication failure. Refer to [dmarc.org](https://dmarc.org/) for more information on this protocol.