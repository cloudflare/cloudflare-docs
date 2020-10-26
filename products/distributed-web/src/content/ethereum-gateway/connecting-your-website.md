---
order: 3
---

# Connecting your Website

You can connect your own domain name to <https://cloudflare-eth.com> to allow
Ethereum network access from your own domain. This means that anyone can send
the HTTP (JSON RPC) queries as given in [Interacting with the Ethereum
Gateway](./interacting-with-the-eth-gateway/)
to your own domain. To do this, you should replace `https://cloudflare-eth.com`
with your domain, e.g. `myethereumgateway.xyz`, as the target of the HTTP
query.

To connect your domain to the Cloudflare Ethereum gateway, follow the instructions
at <https://cloudflare.com/distributed-web-gateway> on the 'Ethereum' tab. Essentially,
you need to:

1. Go to your DNS settings for your domain. If your website is on Cloudflare,
   the DNS settings are accessible from your dashboard. If your website is not
on Cloudflare, and you need help finding the DNS records, you can use
[DomainTools](https://whois.domaintools.com/) to identify your registrar.
2. Add a CNAME record from your domain (e.g. www.example.com) to
cloudflare-eth.com. Note: if your website is on Cloudflare, the little cloud
next to this record will automatically turn grey. Because you’ve CNAME’d to
our gateway, you’ll automatically receive Cloudflare's enterprise-level
performance and security enhancements, but you won’t be able to control those
settings yourself.
3. Navigate to the 'Ethereum' tab of <https://cloudflare.com/distributed-web-gateway>
and enter your website domain name into the text box at the bottom of the page.
4. You should receive a message indicating that the domain name setup completed
successfully.

Following these instructions will CNAME your domain to the Cloudflare Ethereum
Gateway, which will allow you to access the Ethereum network via your domain
name. Submitting your your domain name in the form launches a process that
provisions an SSL certificate for your website so that you can access the
Gateway over HTTPS.
