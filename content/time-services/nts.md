---
pcx_content_type: concept
title: Network Time Security
weight: 3
---

# Network Time Security

Network Time Security (NTS) provides cryptographic security for the client-server mode of the Network Time Protocol (NTP). This allows users to obtain time in an authenticated manner.

## Background

The NTS protocol is divided into two phases:

1. **NTS key exchange**: Establishes the necessary key material between the NTP client and the server, using a [Transport Layer Security (TLS) handshake](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/) (the same public key infrastructure as the web). Once the keys are exchanged, the TLS channel is closed and the protocol enters the second phase. 
2. **NTP authentication**: Authenticates NTP time syncronization packets using the results of the TLS handshake. For more information, refer to [RFC 8915](https://tools.ietf.org/html/rfc8915).

## Next steps

[Chrony](https://chrony.tuxfamily.org/doc/devel/chrony.conf.html) and [NTPsec](https://www.ntpsec.org/) have support for NTS. Read the relevant documentation for guidance on setting them up to point to our time service, `time.cloudflare.com`.

If you would like to hear about the development of additional clients or updates on our service or would like to announce that your client supports NTS, send an email `time-services+subscribe@cloudflare.com` and then reply to the confirmation email to be added to our distribution list.