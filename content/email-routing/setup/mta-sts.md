---
title: Configure MTA-STS
pcx_content_type: how-to
weight: 4
---

# Configure MTA-STS

MTA Strict Transport Security ([MTA-STS](https://datatracker.ietf.org/doc/html/rfc8461)) was introduced by email service providers including Microsoft, Google and Yahoo as a solution to protect against downgrade and man-in-the-middle attacks in SMTP sessions, as well as solving the lack of security-first communication standards in email.

Suppose that `example.com` is your domain and uses Email Routing. Here’s how you can enable MTA-STS for it.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **DNS** > **Records** and create a new CNAME record with the name `_mta-sts` that points to Cloudflare’s record `_mta-sts.mx.cloudflare.net`. Make sure to disable the proxy mode.

![MTA-STS CNAME record](/images/email-routing/mta-sts-record.png)

3. Confirm that the record was created

```bash
$ dig txt _mta-sts.example.com
_mta-sts.example.com. 300 IN  CNAME _mta-sts.mx.cloudflare.net.
_mta-sts.mx.cloudflare.net. 300 IN  TXT "v=STSv1; id=20230615T153000;"
```

This tells the other end client that is trying to connect to us that we support MTA-STS.

Next you need an HTTPS endpoint at `mta-sts.example.com` to serve your policy file. This file defines the mail servers in the domain that use MTA-STS. The reason why HTTPS is used here instead of DNS is because not everyone uses DNSSEC yet, so we want to avoid another MITM attack vector.

To do this you need to deploy a simple Worker that allows Email clients to pull Cloudflare’s Email Routing policy file using the “well-known” URI convention.

4. Go to your **Account** > **Workers & Pages** and press **Create Application**. Pick the "MTA-STS" template from the list.

![MTA-STS Worker](/images/email-routing/mta-sts-worker.png)

2. This Worker proxies `https://mta-sts.mx.cloudflare.net/.well-known/mta-sts.txt` to your own domain. After deploying it, go to the Worker configuration, then **Triggers** > **Custom Domains** and **Add Custom Domain**. Type the subdomain `mta-sts.example.com`.

![MTA-STS Worker Custom Domain](/images/email-routing/mta-sts-domain.png)

You can then confirm that your policy file is working with the following:

```bash
$ curl https://mta-sts.example.com/.well-known/mta-sts.txt
version: STSv1
mode: enforce
mx: *.mx.cloudflare.net
max_age: 86400
```

This says that you domain `example.com` enforces MTA-STS. Capable email clients will only deliver email to this domain over a secure connection to the specified MX servers. If no secure connection can be established the email will not be delivered.

Email Routing also supports MTA-STS upstream, which greatly improves security when forwarding your Emails to service providers like Gmail, Microsoft, and others.

While enabling MTA-STS involves a few steps today, we aim to simplify things for you and automatically configure MTA-STS for your domains from the Email Routing dashboard as a future improvement.