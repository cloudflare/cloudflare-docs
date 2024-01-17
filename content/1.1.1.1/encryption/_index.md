---
weight: 3
pcx_content_type: reference
title: Encryption
meta:
    title: Encrypt DNS traffic
---

# Encrypt DNS traffic

Traditionally, DNS queries and replies are performed over plaintext. They are sent over the Internet without any kind of encryption or protection, even when you are accessing a secured website. This has a great impact on security and privacy, as these queries might be subject to surveillance, spoofing and tracking by malicious actors, advertisers, ISPs, and others.

To prevent this and secure your connections, 1.1.1.1 supports [DNS over TLS (DoT)](/1.1.1.1/encryption/dns-over-tls/) and [DNS over HTTPS (DoH)](/1.1.1.1/encryption/dns-over-https/), two standards developed for encrypting plaintext DNS traffic. This prevents untrustworthy entities from interpreting and manipulating your queries.

You can also [configure your browser](/1.1.1.1/encryption/dns-over-https/encrypted-dns-browsers/) to secure your DNS queries.

If you need to secure connections in your smartphone, refer to 1.1.1.1's [iOS](/1.1.1.1/setup/ios/) or [Android](/1.1.1.1/setup/android/) apps.