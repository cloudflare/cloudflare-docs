---
pcx-content-type: reference
title: Postmaster
weight: 4
---

# Postmaster

The postmaster page provides technical information about Email Routing to professionals who administer email systems, and other email providers.

Here you will find information regarding Email Routing, along with best practices, rules, guidelines, and troubleshooting tools.

## Limits

Currently, Email Routing does not support messages bigger than 25 MiB.

## Outbound prefixes

Email Routing sends its traffic using IPv4 prefixes.

If you are a postmaster and are having trouble receiving Email Routing's emails, allow the following outbound IP addresses in your server configuration:

```txt
104.30.0.0/20
```

_Ranges last updated: December 7, 2021_

## Outbound hostnames

In addition to the outbound prefixes, Email Routing will use the domain `email.cloudflare.net` for the `HELO/EHLO` command.

PTR records (reverse DNS) ensure that each hostname has an corresponding IP. For example:

```sh
$ dig a0-7.email.cloudflare.net +short
104.30.0.7

$ dig -x 104.30.0.7 +short
a0-7.email.cloudflare.net.
```

## MX, SPF, and DKIM records

Email Routing automatically adds a few DNS records to the zone when our customers enable Email Routing. If we take `example.com` as an example:

```txt
example.com. 300 IN MX 13 amir.mx.cloudflare.net.
example.com. 300 IN MX 86 linda.mx.cloudflare.net.
example.com. 300 IN MX 24 isaac.mx.cloudflare.net.

example.com. 300 IN TXT "v=spf1 include:_spf.mx.cloudflare.net ~all"
```

[The MX (mail exchange) records](https://www.cloudflare.com/learning/dns/dns-records/dns-mx-record/) tell the Internet where the inbound servers receiving email messages for the zone are. In this case, anyone who wants to send an email to `example.com` can use the `amir.mx.cloudflare.net`, `linda.mx.cloudflare.net`, or `isaac.mx.cloudflare.net` SMTP servers.

## SPF record

A SPF DNS record is an anti-spoofing mechanism that is used to specify which IP addresses and domains are allowed to send emails on behalf of your zone.

The Internet Engineering Task Force (IETF) tracks the SPFv1 specification [in RFC 7208](https://datatracker.ietf.org/doc/html/rfc7208). Refer to the [SPF Record Syntax](http://www.open-spf.org/SPF_Record_Syntax/) to learn the SPF syntax.

Email Routing's SPF record contains the following:

```txt
v=spf1 include:_spf.mx.cloudflare.net ~all
```

In the example above:

- `spf1`: Refers to SPF version 1, the most common and more widely adopted version of SPF.
- `include`: Include a second query to `_spf.mx.cloudflare.net` and allow its contents.
- `~all`: Otherwise [`SoftFail`](http://www.open-spf.org/SPF_Record_Syntax/) on all other origins. `SoftFail` means NOT allowed to send, but in transition. This instructs the upstream server to accept the email but mark it as suspicious if it came from any IP addresses outside of those defined in the SPF records.

If we do a TXT query to `_spf.mx.cloudflare.net`, we get:

```txt
_spf.mx.cloudflare.net. 300 IN TXT "v=spf1 ip4:104.30.0.0/20 ~all"
```

This response means:

- Allow all IPv4 IPs coming from the `104.30.0.0/20` subnet.
- Otherwise, `SoftFail`.

You can read more about SPF, DKIM, and DMARC in our [Tackling Email Spoofing and Phishing](https://blog.cloudflare.com/tackling-email-spoofing/) blog.

## DKIM

DKIM (DomainKeys Identified Mail) ensures that email messages are not altered in transit between the sender and the recipient's SMTP servers through public-key cryptography.

Through this standard, the sender publishes its public key to a domain's DNS once, and then signs the body of each message before it leaves the server. The recipient server reads the message, gets the domain public key from the domain's DNS, and validates the signature to ensure the message was not altered in transit.

Email Routing signs email on behalf of `email.cloudflare.net`. If the sender did not sign the email, the receiver will likely use Cloudflare's signature for authentication.

Below is the DKIM key for `email.cloudflare.net`:

```sh
$ dig TXT 2022._domainkey.email.cloudflare.net +short

"v=DKIM1; h=sha256; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnraPy1d8e6+lzeE1HIoUvYWoAOUSREkNHcwxA/ueVM8f6FKXvPu/9gVpgkn8iUyaCfk2z1MW+OVLuFeH64YRMa39mkaQalgke2tZ05SnjRUtYEHYvfrqPuMT+Ouk+GecpgvrtMq5gMXm6ZfeUhQkdWxmMQJGf4fdW5I0piUQJMhK/Qc1dNRSskk" "TiUtXKnsEdjTN2xcnHhyj985S0xOEAxm9Uj1rykPqVvKpqEdjUkujbXOwR0KmHTvPyFpBjCCfxAVqOwwo9zBYuvk/nh0qlDgLIpy0SimrYhNFCq2XBxIj4tdUzIl7qZ5Ck6zLCQ+rjzJ4sm/zA+Ov9kDkbcmyrwIDAQAB"
```

## Sender rewriting

Email Routing rewrites the SMTP envelope sender (`MAIL FROM`) to the forwarding domain to avoid issues with SPF. Email Routing uses a scheme similar to the [Sender Rewriting Scheme](https://en.wikipedia.org/wiki/Sender_Rewriting_Scheme).

For example, when receiving an email at `mycfdomain.com` with a sender address of `me@example.com`, Email Routing will rewrite the `MAIL FROM` to `me=example.com@mycfdomain.com`. The rewriting happens during the SMTP session to the destination upstream.

This has no effect to the end user's experience, though. The message headers will still report the original sender's `From:` address.

## Spam and abusive traffic

Handling spam and abusive traffic is essential to any email provider. Below is a list of how Email Routing tackles this issue:

- Email Routing provides reverse DNS PTR records to all of its SMTP egress ranges. PTR records are often used as a reputation parameter.
- Email Routing rejects emails whose SPF validation fails.
- Email Routing refuses to send email to poorly configured SMTP servers — for example, servers with broken TLS certificates.
- Email Routing requires double opt-in to confirm ownership of new destination addresses. Email Routing sends an email with a timed verification link to the new address specified by the user. The destination address is only usable after the customer clicks that link.

## SMTP errors

In most cases, Email Routing simply forwards the upstream SMTP errors back to the sender client in-session.

## Contact information

The best way to contact us is using our [community forum](https://community.cloudflare.com/new-topic?category=Feedback/Previews%20%26%20Betas&tags=email) or our [Discord server](https://discord.com/invite/cloudflaredev).
