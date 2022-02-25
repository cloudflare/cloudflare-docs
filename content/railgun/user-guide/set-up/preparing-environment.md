---
order: 4
pcx-content-type: tutorial
---

# Preparing the Environment

There are no dependencies to install Railgun. The only external requirement is a Memcached instance for Railgun to use as a cache backend. However, you should ensure that the latest CA certificate bundle is installed for your Operating System as it will be used to connect securely back to Cloudflare during activation. CentOS, Red Hat, Debian, and Ubuntu users should make sure that the `ca-certificates` package is installed and up-to-date via `yum` or `apt`.

Users of [mod\_cloudflare](https://www.cloudflare.com/resources-downloads), an Apache module which displays a visitor’s true source IP, should update their Apache configuration to include the IP of their Railgun instance as a trusted proxy. If Apache and Railgun run on the same server, the following line is needed within your Apache configuration (typically, `/etc/apache2/httpd.conf` or `/etc/httpd/httpd.conf`):

    CloudFlareRemoteIPTrustedProxy 127.0.0.1

If Railgun and Apache are on two separate machines, configure mod\_cloudflare to use the source IP of Railgun. This may be on a NATed address or the public IP, depending on your network configuration.

    CloudFlareRemoteIPTrustedProxy 192.168.1.100

Railgun runs on port 2408 via TCP by default and this port will need to be open to connections from Cloudflare [IPs](https://www.cloudflare.com/ips). If you are unfamiliar with networking, please reach out to your hosting provider to determine the proper way to open the port for your environment. You can script out adding rules for software firewalls as follows (use with caution):

```sh
$ for i in `curl https://www.cloudflare.com/ips-v4`; do ufw allow proto tcp from $i to any port 2408; done
$ for i in `curl https://www.cloudflare.com/ips-v4`; do iptables -I INPUT -p tcp -s $i --dport 2408 -j ACCEPT; done
```

For users with very restrictive firewall egress (outbound) policies, outbound TCP port 443 will also need to be allowed for Railgun activation to function properly. In addition, you will need to allow Railgun to make outbound connections to your web server on any ports that it listens on.
