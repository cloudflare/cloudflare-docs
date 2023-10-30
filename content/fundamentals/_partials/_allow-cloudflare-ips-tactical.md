---
_build:
  publishResources: false
  render: never
  list: never
---

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
