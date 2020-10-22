---
order: 2
---

# Certificate transparency monitoring

Certificate Transparency Monitoring sends you emails when certificates are issued for your domain. This feature is in **public beta** and is opt-in (you are not automatically enrolled).

--------

## Overview

Every website must have a certificate to be trusted by major browsers. A certificate is a proof of identity — it says that you are who you say you are. This way, when browsers like Google Chrome request a website, they can ensure that the connection is secure before presenting content. Certificates are recorded in public “CT logs.” Examples include Google’s Argon log and Cloudflare’s Nimbus log.

If you enable CT Monitoring, we’ll send you an email whenever your domain is recognized in a CT log. Usually, the certificate we find is legitimate and no further action is required. We send emails so you can double-check for yourself. In rare cases, you may believe a certificate is illegitimate. This is when action is suggested (see below).

--------

## Opting in and out

Alerts are turned off by default. If you want to receive alerts, [visit the “Certificate Transparency Monitoring” card on the SSL/TLS Tab](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates#ct-alerting-card) of the Cloudflare dashboard. Depending on your plan, you’ll either see a simple toggle (turn it to “on”) or an option to “add” emails. We’ve provided the “add” option for those of you on Business and Enterprise plans. You can enter your desired email recipients — these addresses do not have to be tied to Cloudflare accounts. If you want to send emails to more than 10 people, consider setting up an email alias (ct-alerts@yourcompany.com).

To stop receiving alerts, switch the toggle to “off” (or remove your emails from the feature card).

--------

## Emails to be concerned about

Most certificate alerts are routine. We send alerts whenever a certificate for your domain appears in a log. Certificates expire (and must be reissued), so it is completely normal to receive issuance emails. If your domain is listed in the email, along with reasonable ownership and certificate information, then **no action is required**.

You *should* take action when something is clearly wrong. If you don’t recognize the certificate issuer, or if you’ve suddenly noticed problems with your website (around the same time the certificate email showed up), take action.

--------

## How to take action

### Option 1: Contact certificate authorities

Although we (at Cloudflare) can help you spot certificate issues, we usually aren’t the ones to contact when problems arise. We love to help — it’s just that Certificate Authorities are the only ones who can revoke malicious certificates. If you believe an illegitimate certificate was issued for your domain, you should contact the Certificate Authority listed in the email (this is the “Issuer”). Here are the contact links for several major Certificate Authorities:

[DigiCert support](https://www.digicert.com/support/#Contact)

[GlobalSign support](https://www.globalsign.com/en/company/contact/support/)

[GoDaddy support](https://www.godaddy.com/contact-us?sp_hp=B)

[IdenTrust support](https://www.identrust.com/support/support-team)

[Let’s Encrypt support](https://letsencrypt.org/contact/)

[Sectigo support](https://sectigo.com/support)

### Option 2: Contact domain registrars

Domain registrars may be able to “suspend” potentially malicious domains. If, for example, you notice that a malicious domain was registered through GoDaddy, contact GoDaddy’s support team to see if they can help you. The same goes for other registrars.

### Option 3: Improvise

There are other ways to combat malicious certificates. You can warn your visitors with an on-site notification, you can attempt to block domains by contacting browser makers (Google for Chrome, Apple for Safari, etc.), or you can [contact us to help combat malicious certificates](https://dash.cloudflare.com/redirect?account=support).

If someone is attempting to impersonate you online, you should absolutely take action. This is usually difficult to recognize, so exercise caution. **Remember: the vast majority of certificates are not malicious. Only take action if you believe something is wrong.**