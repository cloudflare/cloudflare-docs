---
order: 5
pcx-content-type: concept
---

# DNS over HTTPS

Even if you are visiting a site using HTTPS, your DNS query is sent over an unencrypted connection. That means that even if you are browsing an encrypted website like https://cloudflare.com, anyone listening to packets on the network knows you are attempting to visit cloudflare.com.

Another problem with unencrypted DNS is that it makes it easy for someone to perform a man-in-the-middle type of attack, and change DNS answers to route unsuspecting visitors to their phishing, malware or surveillance site. Domain name system security extensions (DNSSEC) solves this problem by providing a mechanism to check the validity of a DNS answer, but only a single-digit percentage of domains use it.

To combat this problem, Cloudflare offers DNS resolution over an HTTPS endpoint. If you build a mobile application, browser, operating system, IoT device or router, you can choose for your users to use the DNS over HTTPS endpoint instead of sending DNS queries over plaintext for increased security and privacy of your users.  

In this chapter, we go over the ways in which you can configure DNS over HTTPS (DoH).