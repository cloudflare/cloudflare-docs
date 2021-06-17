---
pcx-content-type: concept
---

# DNS over HTTPS

When you request to visit an application like `cloudflare.com`, your computer needs to know which server to connect you to so that it can load the application. Computers don’t know how to do this name to address translation, so they ask a specialized server to do it for them.

Traditionally, these queries and replies are performed over plaintext, which means they are sent over the Internet without any kind of encryption or protection. This happens even when you are accessing a secured website. This has a huge impact on security and privacy, as these queries might be subject to surveillance, spoofing and tracking by malicious actors, advertisers, ISPs, and others.

To prevent this and secure your connections, you can send encrypted DNS queries to 1.1.1.1 over HTTPS. 1.1.1.1 for Families also categorizes destinations on the Internet based on the potential threat they pose regarding malware, phishing, or other types of security risks. When enabled, 1.1.1.1 for Families will block resolution of these destinations when a threat is found.

If you have a DNS over HTTPS compliant client, use the following URLs to use a secure connection to 1.1.1.1 for Families. 

## Block Malware

To block all malware use the following URL:

https://security.cloudflare-dns.com/dns-query

## Block Malware and Adult Content

To block all malware and adult content use following URL:

https://family.cloudflare-dns.com/dns-query