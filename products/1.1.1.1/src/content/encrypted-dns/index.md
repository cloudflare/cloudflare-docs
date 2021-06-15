---
order: 4
pcx-content-type: navigation
---

# Encrypted DNS

Traditionally, DNS queries and replies are performed over plaintext which means they are sent over the Internet without any kind of encryption or protection. This happens even when you are accessing a secured website. This has a huge impact on security and privacy, as these queries might be subject to surveillance, spoofing and tracking by malicious actors, advertisers, ISPs, and others.

To prevent this and secure your connections, 1.1.1.1 supports DNS over TLS (DoT) and DNS over HTTPS (DoH), two standards developed for encrypting plaintext DNS traffic. This prevents untrustworthy entities from interpreting and manipulating your queries. The main difference between DoT and DoH is the port they use to encrypt traffic, and the encryption method they use.

DNS over TLS uses its own port, 853, to wrap DNS requests within a TLS connection. With DoT, the encryption happens at the transport layer, where it adds TLS encryption on top of the user datagram protocol (UDP). Because DoT has a dedicated port, anyone with network visibility can see DoT traffic coming and going, even though the requests and responses themselves are encrypted. This gives administrators the ability to monitor and block DNS queries, which is important for identifying and stopping malicious traffic.

DoH uses port 443, which is the standard HTTPS traffic port, to wrap the DNS request in an HTTPS request. It uses HTTPS and HTTP/2 to encrypt traffic at the application layer. With DoH, DNS queries and responses are camouflaged within other HTTPS traffic, since it all comes and goes from the same port. This means they cannot easily be blocked without blocking all other HTTPS traffic as well, but it also provides users with greater privacy, as network administrators will have no visibility on the DNS queries hidden within the larger flow of HTTPS traffic.

In the next chapters we will talk more about DNS over TLS (DoT) and DNS over HTTPS (DoH).

<DirectoryListing path="/encrypted-dns"/>
