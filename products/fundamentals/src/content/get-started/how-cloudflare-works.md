---
order: 1
pcx-content-type: how-to
---

# How Cloudflare works

More than just using Cloudflare's [Content Delivery (CDN)](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/) services, customers rely on Cloudflare’s global network to enhance security, performance, and reliability of anything connected to the Internet.

<Aside type="note">

Cloudflare is not generally a hosting provider. Cloudflare generally cannot remove content from the Internet that it does not host.

</Aside>

Cloudflare is designed for easy setup. Anyone with a website and their own domain can use Cloudflare regardless of their platform choice. Cloudflare doesn’t require additional hardware, software, or changes to your code.

## Security

Cloudflare stops malicious traffic before it reaches your origin web server. Cloudflare analyzes potential threats in visitor requests based on a number of characteristics:

- Visitor's IP address
- Resources requested
- Request payload and frequency
- Customer-defined firewall rules

A DNS lookup of a proxied (orange-clouded) Cloudflare subdomain returns [Cloudflare IP addresses](https://www.cloudflare.com/ips/). Proxied traffic comes to Cloudflare's edge and then Cloudflare forwards the request to your server. Cloudflare masks your origin IP address for proxied DNS records so attackers cannot bypass Cloudflare and directly attack your origin web server.

Visitor <--[Connection 1]--> Cloudflare Edge <--[Connection 2]--> Origin Server

A DNS lookup of an unproxied (grey-clouded) Cloudflare subdomain returns the IP address that you have entered for the record. Unproxied traffic goes directly to your origin server and does not receive any of the benefits of using Cloudflare.

Visitor <--[Connection]--> Origin Server

[Create your Cloudflare account and add a domain](https://support.cloudflare.com/hc/en-us/articles/201720164) to review our security benefits.

## Performance

Cloudflare optimizes the delivery of website resources for your visitors. Cloudflare’s data centers serve your website’s [static resources](https://www.cloudflare.com/learning/cdn/caching-static-and-dynamic-content/) and ask your origin web server for dynamic content. [Cloudflare’s global network](https://www.cloudflare.com/network/) provides a faster route from your site visitors to our data centers than would be available to a visitor directly requesting your site. Even with Cloudflare between your website and your visitors, resource requests arrive to your visitor sooner.

## Reliability

Cloudflare’s globally distributed [Anycast network](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/) routes visitor requests to the nearest Cloudflare data center. Cloudflare distributed DNS responds to website visitors with Cloudflare IP addresses for traffic you proxy to Cloudflare. This also provides security by hiding the specific IP address of your origin web server.

<Aside type="note">

Cloudflare-proxied domains share IP addresses from a pool that belongs to the Cloudflare network. As a result, Cloudflare does not offer dedicated or exclusive IP addresses. To reduce the number of Cloudflare IPs that your domain shares with other Cloudflare customer domains, upgrade to a [Business or Enterprise plan and upload a Custom SSL certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates).

</Aside>

Also, our flat-rate pricing structure provides predictability and reliability in your [CDN](https://www.cloudflare.com/cdn-y/) and [DDoS](https://www.cloudflare.com/ddos/) bandwidth expenses. Cloudflare does not have bandwidth limits for domains on the Free, Pro and Business plans as long as those domains comply with our [Terms of Service](https://www.cloudflare.com/terms/). However, your hosting provider may still impose limits on bandwidth usage and/or charge for bandwidth. 

Note that additional terms may apply to:

- Self-serve domains with add-on features
- Domains in the Enterprise plan (contact your Cloudflare Account Team for additional details)

Learn how to [get started with Cloudflare](https://support.cloudflare.com/hc/en-us/articles/360027989951).

## Related resources

- [What is Cloudflare?](https://www.cloudflare.com/learning/what-is-cloudflare/)
- [Understanding Cloudflare DDOS protection](https://support.cloudflare.com/hc/en-us/articles/200172676)
- [Best Practices: DDoS preventative measures](https://support.cloudflare.com/hc/en-us/articles/200170166)