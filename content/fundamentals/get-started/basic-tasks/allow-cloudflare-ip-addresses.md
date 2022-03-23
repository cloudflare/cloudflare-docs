---
pcx-content-type: how-to
title: Allow Cloudflare IP addresses
weight: 5
---

# Allow Cloudflare IP addresses

If you [use Cloudflare-managed nameservers](/dns/zone-setups/full-setup/) — as most of our customers do — all traffic to [proxied DNS records](/dns/manage-dns-records/reference/proxied-dns-records/) passes through Cloudflare before reaching your origin server. This means that your origin server will stop receiving traffic from individual visitor IP addresses and instead receive traffic from [Cloudflare IP addresses](https://www.cloudflare.com/ips), which are shared by all proxied hostnames.

This setup can cause issues if your origin server blocks or rate limits connections from Cloudflare IP addresses. Because all visitor traffic will appear to come from Cloudflare IP addresses, blocking these IPs — even accidentally — will prevent visitor traffic from reaching your application.

## Review external tools

To avoid blocking Cloudflare IP addresses unintentionally, review your external tools to check that:

- Any security plugins — such as those for WordPress — allow Cloudflare IP addresses.
- [Bad Behavior](https://support.cloudflare.com/hc/articles/200169496) and [mod_security](https://github.com/SpiderLabs/ModSecurity) plugins are up to date.

## Configure origin server

### Allowlist Cloudflare IP addresses

To avoid blocking Cloudflare IP addresses unintentionally, you also want to allow Cloudflare IP addresses at your origin web server.

You can explicitly allow these IP addresses with a [.htaccess file](https://httpd.apache.org/docs/trunk/mod/mod_authz_core.html#require) or by using [iptables](https://www.linode.com/docs/security/firewalls/control-network-traffic-with-iptables/#block-or-allow-traffic-by-port-number-to-create-an-iptables-firewall). 

The following example demonstrates how your could use an iptables rule to allow a Cloudflare IP address range. Replace `$ip` below with one of the [Cloudflare IP address ranges](https://www.cloudflare.com/ips).

```bash
# For IPv4 addresses
iptables -I INPUT -p tcp -m multiport --dports http,https -s $ip -j ACCEPT
# For IPv6 addresses
ip6tables -I INPUT -p tcp -m multiport --dports http,https -s $ip -j ACCEPT
```

For more specific guidance, contact your hosting provider or website administrator.

### Block other IP addresses (recommended)

As a best practice, we also recommend that you explicitly block all traffic that does not come from Cloudflare IP addresses or the IP addresses of your trusted partners, vendors, or applications.

For example, you might [update your iptables](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/#block-or-allow-traffic-by-port-number-to-create-an-iptables-firewall) with the following commands:

```bash
# For IPv4 addresses
iptables -A INPUT -p tcp --dport http,https -j DROP
# For IPv6 addresses
ip6tables -A INPUT -p tcp --dport http,https -j DROP
```

For more specific guidance, contact your hosting provider or website administrator.

### Additional recommendations

#### Further protection

For further recommendations on securing your origin server, refer to our guide on [protecting your origin server](/fundamentals/get-started/origin-health/).

#### Visitor IP information

Because your origin server will receive Cloudflare IP addresses instead of visitor IP addresses, your server will return Cloudflare IP addresses when logging or responding to requests.

If you need accurate logs of visitor IP addresses, we recommend that you use [Cloudflare site analytics](https://support.cloudflare.com/hc/articles/360037684251).

If Cloudflare site analytics are not sufficient or your application's response depends on the incoming IP address of an individual visitor, you can also [restore visitor IP addresses](https://support.cloudflare.com/hc/articles/200170786). 

## Use your own IP addresses

If you do not want to use Cloudflare IP addresses, Enterprise customers have two potential alternatives:

- [**Bring Your Own IP (BYOIP)**](/byoip/): Cloudflare announces your IPs in all our locations.
- **Static IP addresses**: Cloudflare sets static IP addresses for your domain. For more details, reach out to your account team.