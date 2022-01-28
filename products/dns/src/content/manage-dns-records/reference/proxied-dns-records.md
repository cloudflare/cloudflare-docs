---
order:
pcx-content-type: concept
---

# Proxy status

When you *proxy* an **A**, **AAAA**, or **CNAME** DNS record for your application (also known as *orange-clouding*), all DNS traffic goes through Cloudflare before reaching your server IP address.

Proxying your traffic allows Cloudflare to [optimize, cache, and protect](https://developers.cloudflare.com/fundamentals/get-started/how-cloudflare-works) all requests for your application. 

## When to proxy your DNS records

In most cases, you should proxy your **A**, **AAAA**, and **CNAME** records. These are the only records you are allowed to proxy.

Beyond the performance and caching benefits, proxying your records hides your server's IP address and protects your application from [DDoS attacks](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/).

## When to use unproxied records

In some circumstances, you should not proxy your DNS records.

If you need to connect to your origin using a non-HTTP protocol (SSH, FTP, SMTP) or over a different port than ports 80 or 443, either leave your records unproxied (DNS-only) or use [Cloudflare Spectrum](https://developers.cloudflare.com/spectrum).

Because Cloudflare only supports proxied **A**, **AAAA**, and **CNAME** records, you do not have the option to proxy other record types within the dashboard. 

Additionally, you cannot proxy wildcard DNS records unless your domain is on an Enterprise plan.

<Aside type="note">

If you encounter a **CNAME** record that you cannot proxy — usually associated with another CDN provider — a proxied version of that record will cause connectivity errors. Cloudflare is purposely preventing that record from being proxied to protect you from a misconfiguration.

</Aside>

