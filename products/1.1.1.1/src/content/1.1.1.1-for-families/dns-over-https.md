---
pcx-content: how-to
---

# DNS over HTTPS

When you type an Internet address such as `cloudflare.com`, the browser doesn't know which server to connect to. Computers don’t know how to do this name to address translation, so they ask a specialized server to do it for them.

Traditionally, these queries and replies are performed over plaintext, which means they are sent over the Internet without any kind of encryption or protection. This happens even when we are accessing a secured website, which has a huge impact on security and privacy as these queries might be subject to surveillance, spoofing and tracking by malicious actors, advertisers, ISPs, and others.

To prevent this and secure your connections, Cloudflare offers a service that encrypts DNS queries, and also protects against malware and adult content.

The secured connection to 1.1.1.1 for Families has two default options:
* One that blocks malware;
* One that blocks malware and adult content. 

The protection you get depends on the IP address configured.

If you have a DNS over HTTPS compliant client, such as a router, copy one of the following URLs to configure a secure connection to 1.1.1.1 for Families. Refer to your client's manual to find out how to configure a DNS server manually.

**If you want to block malware:**

```txt
https://security.cloudflare-dns.com/dns-query
```


**If you want to block malware and adult content:**

```txt
https://family.cloudflare-dns.com/dns-query
```