---
pcx_content_type: reference
title: Postmaster
weight: 7
---

# Postmaster

The postmaster page provides technical information about Email Routing to professionals who administer email systems, and other email providers.

Here you will find information regarding Email Routing, along with best practices, rules, guidelines, and troubleshooting tools.

## Contact information

The best way to contact us is using our [community forum](https://community.cloudflare.com/new-topic?category=Feedback/Previews%20%26%20Betas&tags=email) or our [Discord server](https://discord.com/invite/cloudflaredev).

## DKIM signature

[DKIM (DomainKeys Identified Mail)](https://en.wikipedia.org/wiki/DomainKeys_Identified_Mail) ensures that email messages are not altered in transit between the sender and the recipient's SMTP servers through public-key cryptography.

Through this standard, the sender publishes its public key to a domain's DNS once, and then signs the body of each message before it leaves the server. The recipient server reads the message, gets the domain public key from the domain's DNS, and validates the signature to ensure the message was not altered in transit.

Email Routing signs email on behalf of `email.cloudflare.net`. If the sender did not sign the email, the receiver will likely use Cloudflare's signature for authentication.

Below is the DKIM key for `email.cloudflare.net`:

```sh
$ dig TXT 2022._domainkey.email.cloudflare.net +short

"v=DKIM1; h=sha256; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnraPy1d8e6+lzeE1HIoUvYWoAOUSREkNHcwxA/ueVM8f6FKXvPu/9gVpgkn8iUyaCfk2z1MW+OVLuFeH64YRMa39mkaQalgke2tZ05SnjRUtYEHYvfrqPuMT+Ouk+GecpgvrtMq5gMXm6ZfeUhQkdWxmMQJGf4fdW5I0piUQJMhK/Qc1dNRSskk" "TiUtXKnsEdjTN2xcnHhyj985S0xOEAxm9Uj1rykPqVvKpqEdjUkujbXOwR0KmHTvPyFpBjCCfxAVqOwwo9zBYuvk/nh0qlDgLIpy0SimrYhNFCq2XBxIj4tdUzIl7qZ5Ck6zLCQ+rjzJ4sm/zA+Ov9kDkbcmyrwIDAQAB"
```

## DMARC enforcing

Email Routing enforces Domain-based Message Authentication, Reporting & Conformance (DMARC). Depending on the sender's DMARC policy, Email Routing will reject emails when there is an authentication failure. Refer to [dmarc.org](https://dmarc.org/) for more information on this protocol.

## IPv6 support

Currently, Email Routing will connect to the upstream SMTP servers using IPv6 if they provide AAAA records for their MX servers, and fall back to IPv4 if that is not possible.

Below is an example of a popular provider that supports IPv6:

```sh
$ dig mx gmail.com
 
gmail.com. 3084 IN MX 5 gmail-smtp-in.l.google.com.
gmail.com. 3084 IN MX 20 alt2.gmail-smtp-in.l.google.com.
gmail.com. 3084 IN MX 40 alt4.gmail-smtp-in.l.google.com.
gmail.com. 3084 IN MX 10 alt1.gmail-smtp-in.l.google.com.
gmail.com. 3084 IN MX 30 alt3.gmail-smtp-in.l.google.com.
 
$ dig AAAA gmail-smtp-in.l.google.com
 
gmail-smtp-in.l.google.com. 17 IN AAAA 2a00:1450:400c:c09::1b
```

Email Routing also supports IPv6 through Cloudflare’s inbound MX servers.

## Message size

Currently, Email Routing does not support messages bigger than 25 MiB.

## MX, SPF, and DKIM records

Email Routing automatically adds a few DNS records to the zone when our customers enable Email Routing. If we take `example.com` as an example:

```txt
example.com. 300 IN MX 13 amir.mx.cloudflare.net.
example.com. 300 IN MX 86 linda.mx.cloudflare.net.
example.com. 300 IN MX 24 isaac.mx.cloudflare.net.

example.com. 300 IN TXT "v=spf1 include:_spf.mx.cloudflare.net ~all"
```

[The MX (mail exchange) records](https://www.cloudflare.com/learning/dns/dns-records/dns-mx-record/) tell the Internet where the inbound servers receiving email messages for the zone are. In this case, anyone who wants to send an email to `example.com` can use the `amir.mx.cloudflare.net`, `linda.mx.cloudflare.net`, or `isaac.mx.cloudflare.net` SMTP servers.

## Outbound hostnames

In addition to the outbound prefixes, Email Routing will use the domain `email.cloudflare.net` for the `HELO/EHLO` command.

PTR records (reverse DNS) ensure that each hostname has an corresponding IP. For example:

```sh
$ dig a0-7.email.cloudflare.net +short
104.30.0.7

$ dig -x 104.30.0.7 +short
a0-7.email.cloudflare.net.
```

## Outbound prefixes

Email Routing sends its traffic using both IPv4 and IPv6 prefixes, when supported by the upstream SMTP server.

If you are a postmaster and are having trouble receiving Email Routing's emails, allow the following outbound IP addresses in your server configuration:

**IPv4**

`104.30.0.0/19`

**IPv6**

`2405:8100:c000::/38`

_Ranges last updated: October 4th, 2022_

## Sender rewriting

Email Routing rewrites the SMTP envelope sender (`MAIL FROM`) to the forwarding domain to avoid issues with [SPF](#spf-record). Email Routing uses the [Sender Rewriting Scheme](https://en.wikipedia.org/wiki/Sender_Rewriting_Scheme) to achieve this.

This has no effect to the end user's experience, though. The message headers will still report the original sender's `From:` address.

## SMTP errors

In most cases, Email Routing simply forwards the upstream SMTP errors back to the sender client in-session.

## Spam and abusive traffic

Handling spam and abusive traffic is essential to any email provider. Email Routing filters emails based on advanced anti-spam criteria, [powered by Area 1](/email-security/). When Email Routing detects and blocks a spam email, you will receive a message with details explaining what happened. For example:

```txt
554 <YOUR_IP_ADDRESS> found on one or more DNSBLs (abusixip). Refer to https://developers.cloudflare.com/email-routing/postmaster/#spam-and-abusive-traffic/
```

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