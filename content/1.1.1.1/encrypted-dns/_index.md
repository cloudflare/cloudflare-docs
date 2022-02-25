---
pcx-content-type: reference
title: Encrypt DNS traffic
weight: 4
---

# Encrypt DNS traffic

Traditionally, DNS queries and replies are performed over plaintext which means they are sent over the Internet without any kind of encryption or protection. This happens even when you are accessing a secured website. This has a huge impact on security and privacy, as these queries might be subject to surveillance, spoofing and tracking by malicious actors, advertisers, ISPs, and others.

To prevent this and secure your connections, 1.1.1.1 supports DNS over TLS (DoT) and DNS over HTTPS (DoH), two standards developed for encrypting plaintext DNS traffic. This prevents untrustworthy entities from interpreting and manipulating your queries.

Pick one of these standards to start.

{{<directory-listing>}}
