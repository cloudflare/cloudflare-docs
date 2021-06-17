---
order: 4
pcx-content-type: navigation
---

# Encrypted DNS

Traditionally, DNS queries and replies are performed over plaintext which means they are sent over the Internet without any kind of encryption or protection. This happens even when you are accessing a secured website. This has a huge impact on security and privacy, as these queries might be subject to surveillance, spoofing and tracking by malicious actors, advertisers, ISPs, and others.

To prevent this and secure your connections, 1.1.1.1 supports DNS over TLS (DoT) and DNS over HTTPS (DoH), two standards developed for encrypting plaintext DNS traffic. This prevents untrustworthy entities from interpreting and manipulating your queries. The main difference between DoT and DoH is the port they use to encrypt traffic, and the encryption method they use.

In the next chapters we will talk more about DNS over TLS (DoT) and DNS over HTTPS (DoH). Choose one of the links below to start.

<DirectoryListing path="/encrypted-dns"/>

<Aside>

**Note**: If you are an end-user trying to configure your browser to use DNS over HTTPS, please refer to our documentation regarding how to setup [Windows](/setting-up-1.1.1.1/windows) and [macOS](/setting-up-1.1.1.1/mac).

</Aside>