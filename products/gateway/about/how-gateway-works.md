---
title: How Cloudflare Gateway Works
alwaysopen: true
weight: 0
hidden: false
showNew: false
---

Cloudflare Gateway's secure DNS filtering service sits between a device and the Internet and filters traffic at the DNS layer.

The primary difference between 1.1.1.1 and Gateway’s secure DNS filtering is that 1.1.1.1 does not block any DNS queries. When a browser performs a DNS query for a domain, the 1.1.1.1 public DNS resolver simply looks up the answer for the DNS query either in cache or by performing a full recursive query.

Cloudflare Gateway's DNS resolver adds an additional step to introduce security into this flow. Instead of allowing all DNS queries, Gateway first checks the hostname being queried against the intelligence Cloudflare has about threats on the Internet. If that query matches a known threat or a blocked content category configured by an administrator, Gateway stops it before the site loads for the user - and potentially executes code or phishes that team member.


![How Gateway Works](../static/how-does-gateway-work-dns.png)

For example, if you are using Cloudflare Gateway, and send a DNS query to `example.com`:
1. Gateway checks if the DNS query is coming from your location.
2. If it is coming from your location, Gateway checks if `example.com` matches any of the policies you have set up. The policy could consist of domains that you are blocking with a custom list imported to Cloudflare Gateway in addition to broader security or content categories that you enabled.
3. If `example.com` matches a policy configuration, Cloudflare Gateway will block access to the domain.

### DNS over HTTPS for Cloudflare Gateway

Gateway currently supports DNS over HTTPS, and will also support DNS over TLS in the future. You can use **cloudflared** to setup your device and start sending DNS queries to Gateway in an encrypted fashion. It will also support other DNS over HTTPS clients, as long as you can change the hostname in your preferred DNS over HTTPS client. Here’s how DNS over HTTPS for Cloudflare Gateway works:

![How Encrypted DNS Works](../static/encrypted-dns-gateway.png)

The DNS over HTTPS client encrypts the DNS request and sends it to the closest Cloudflare’s data center. Upon receiving the encrypted DNS request, it will decrypt it and send it to Cloudflare Gateway. Cloudflare Gateway will log the request, apply the required security policies, and return the response to our edge. Our edge will encrypt the response and send it back to the DNS over HTTPS client.

By encrypting your DNS queries you will make sure that ISPs cannot snoop on your DNS queries, and at the same time you will be able to filter DNS requests that are malicious.
 

