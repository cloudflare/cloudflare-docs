---
order: 8
---

# DNS over HTTPS

Even if you are visiting a site using HTTPS, your DNS query is sent over an unencrypted connection. That means that even if you are browsing https://cloudflare.com, anyone listening to packets on the network knows you are attempting to visit cloudflare.com.

The second problem with unencrypted DNS is that it is easy for a Man-In-The-Middle to change DNS answers to route unsuspecting visitors to their phishing, malware or surveillance site. DNSSEC solves this problem as well by providing a mechanism to check the validity of a DNS answer, but only a single-digit percentage of domains use DNSSEC.

To combat this problem, Cloudflare offers DNS resolution over an HTTPS endpoint. If you build a mobile application, browser, operating system, IoT device or router, you can choose for your users to use the DNS over HTTPS endpoint instead of sending DNS queries over plaintext for increased security and privacy of your users.  
