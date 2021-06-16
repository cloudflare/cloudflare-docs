---
pcx-content-type: concept
---

# DNS over HTTPS

When you input an address into your web browser, the browser has no idea where that website is. That is because a place like `cloudflare.com` needs to be translated into its real address (like `104.16.124.96`). This translation is done by querying DNS resolvers, such as 1.1.1.1. 

DNS resolvers are like the Google Maps of the Internet, helping browsers reach the correct place. 

Traditionally, these queries and replies are performed over plaintext, which means they are sent over the Internet without any kind of encryption or protection. This happens even when you are accessing a secured website. This has a huge impact on security and privacy, as these queries might be subject to surveillance, spoofing and tracking by malicious actors, advertisers, ISPs, and others.

To prevent this and secure your connections, you can send encrypted DNS queries to 1.1.1.1 over HTTPS. If you have a DNS over HTTPS compliant client (such as a router), use the following URLs to use a secure connection to 1.1.1.1 for Families. If you don't see a place in your router to input the following URLs, then your router is not compliant with DNS over HTTPS.

## Block Malware

To block all malware use the following URL:

https://security.cloudflare-dns.com/dns-query

## Block Malware and Adult Content

To block all malware and adult content use following URL:

https://family.cloudflare-dns.com/dns-query