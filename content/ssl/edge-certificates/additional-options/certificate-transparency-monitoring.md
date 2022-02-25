---
pcx-content-type: concept
title: Certificate Transparency Monitoring
weight: 3
---

import CertTransparencyDefinition from "../../\_partials/\_cert-transparency-monitoring-definition.md"

# Certificate Transparency Monitoring

<CertTransparencyDefinition/>

{{<Aside type="note">}}

If you use a shared certificate, you may receive notifications for domains or subdomains that do not belong to you.

{{</Aside>}}

***

## Overview

Every website must have a certificate to be trusted by major browsers. A certificate is a proof of identity — it says that you are who you say you are. These certificates help browsers like Google Chrome "know" that a connection is secure before presenting content. Certificates are recorded in public **CT logs**, such as Google’s Argon log and Cloudflare’s Nimbus log.

If you enable Certificate Transparency (CT) Monitoring, Cloudflare will send you an email whenever your domain is recognized in a CT log. Usually, these certificates are legitimate and do not require further action. We send emails so you can double-check for yourself. If you use a shared certificate, you may receive emails for domains or subdomains that do not belong to you.

In rare cases, you may believe a certificate is illegitimate. This is when you should [take action](#how-to-take-action).

{{<Aside type="note">}}

For even more details, refer to the [introductory blog post](https://blog.cloudflare.com/introducing-certificate-transparency-and-nimbus/).

{{</Aside>}}

***

## Opting in and out

Alerts are turned off by default. If you want to receive alerts, go to [SSL/TLS](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates#ct-alerting-card) in the Cloudflare dashboard.

Features vary by plan:

*   **Free** and **Pro** customers will see a toggle to turn **On** or **Off**. Emails will go to all Cloudflare account members.
*   **Business** and **Enterprise** customers will see an option to **add emails**. These addresses do not have to be tied to Cloudflare accounts. If you want to send emails to more than 10 people, consider setting up an email alias.

To stop receiving alerts, switch the toggle to **Off** or remove your emails from the feature card.

{{<Aside type="note" header="Note:">}}
    CT monitoring does not detect phishing attempts. For example, for <code>cloudflare.com</code>, an alert would not trigger for a certificate issued for <code>cloudf1are.com</code> or <code>cloud-flare.com</code>.
{{</Aside>}}

***

## Emails to be concerned about

Most certificate alerts are routine. We send alerts whenever a certificate for your domain appears in a log. Certificates expire (and must be reissued), so it is completely normal to receive issuance emails. If your domain is listed in the email, along with reasonable ownership and certificate information, then **no action is required**.

You *should* take action when something is clearly wrong, such as if you:

*   Do not recognize the certificate issuer
*   Have recently noticed problems with your website

***

## How to take action

### Option 1: Contact certificate authorities

Only Certificate Authorities can revoke malicious certificates. If you believe an illegitimate certificate was issued for your domain, contact the Certificate Authority listed as the **Issuer** in the email.

*   [DigiCert support](https://www.digicert.com/support/#Contact)

*   [GlobalSign support](https://support.globalsign.com/)

*   [GoDaddy support](https://www.godaddy.com/contact-us?sp_hp=B)

*   [IdenTrust support](https://www.identrust.com/support/support-team)

*   [Let’s Encrypt support](https://letsencrypt.org/contact/)

*   [Sectigo support](https://sectigo.com/support)

### Option 2: Contact domain registrars

Domain registrars may be able to **suspend** potentially malicious domains. If, for example, you notice that a malicious domain was registered through GoDaddy, contact GoDaddy’s support team to see if they can help you. Do the same for other registrars.

### Option 3: Improvise

There are other ways to combat malicious certificates. You can warn your visitors with an on-site notification, ask browser makers (Google for Chrome, etc.) to block these domains, or you can [contact us to help combat malicious certificates](https://support.cloudflare.com/hc/articles/200172476).

If someone is attempting to impersonate you online, you should absolutely take action. This is usually difficult to recognize, so exercise caution. **Remember: the vast majority of certificates are not malicious. Only take action if you believe something is wrong.**

## HTTP Public Key Pinning

Certificate Transparency Monitoring addresses the same problems as HTTP Public Key Pinning (HPKP), but with [fewer technical issues](https://scotthelme.co.uk/im-giving-up-on-hpkp/).

Cloudflare does not offer or support HPKP and advises against using it with Universal SSL.
