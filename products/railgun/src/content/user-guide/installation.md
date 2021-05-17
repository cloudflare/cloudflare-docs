---
title: Installation
type: document
order: 3
pcx-content-type: tutorial
---

# Installation

## Preparing the Environment
There are no dependencies to install Railgun. The only external requirement is a Memcached instance for Railgun to use as a cache backend. However, you should ensure that the latest CA certificate bundle is installed for your Operating System as it will be used to connect securely back to Cloudflare during activation. CentOS, Red Hat, Debian, and Ubuntu users should make sure that the `ca-certificates` package is installed and up-to-date via `yum` or `apt`.

Users of [mod_cloudflare](https://www.cloudflare.com/resources-downloads), an Apache module which displays a visitor’s true source IP, should update their Apache configuration to include the IP of their Railgun instance as a trusted proxy. If Apache and Railgun run on the same server, the following line is needed within your Apache configuration (typically, `/etc/apache2/httpd.conf` or `/etc/httpd/httpd.conf`):

```
CloudFlareRemoteIPTrustedProxy 127.0.0.1
```

If Railgun and Apache are on two separate machines, configure mod_cloudflare to use the source IP of Railgun. This may be on a NATed address or the public IP, depending on your network configuration.

```
CloudFlareRemoteIPTrustedProxy 192.168.1.100
```
Railgun runs on port 2408 via TCP by default and this port will need to be open to connections from Cloudflare [IPs](https://www.cloudflare.com/ips). If you are unfamiliar with networking, please reach out to your hosting provider to determine the proper way to open the port for your environment. You can script out adding rules for software firewalls as follows (use with caution):

```
$ for i in `curl https://www.cloudflare.com/ips-v4`; do ufw allow proto tcp from $i to any port 2408; done
$ for i in `curl https://www.cloudflare.com/ips-v4`; do iptables -I INPUT -p tcp -s $i --dport 2408 -j ACCEPT; done
```
For users with very restrictive firewall egress (outbound) policies, outbound TCP port 443 will also need to be allowed for Railgun activation to function properly. In addition, you will need to allow Railgun to make outbound connections to your web server on any ports that it listens on.

## Installation Overview

### Downloads
Railgun is available only for 64-bit systems.

### Package Repository
The best way of installing Railgun is via the [Package Repository](https://pkg.cloudflare.com/). Run the commands mentioned on the Package Repository page in order to set this up. Debian, CentOS, Red Hat Enterprise Linux, and Amazon Linux users may utilize the Railgun binary package repository. Ubuntu and Debian users will be automatically subscribed to the APT repo after installing one of the packages linked below. Other users will need to install the `cloudflare-release` RPM as described on the repository home page. Installation of that RPM will install the repository and GPG key.

Once this has been set up, run the following command as root:

### RPM-based

```
$ yum install railgun-stable
```

### DEB-based

```
$ apt-get install railgun-stable
```

### System Startup
Installing the package will automatically add `/etc/init.d/railgun` to be started on boot on GNU/Linux.

## Configuration and activation
Railgun is configured in `/etc/railgun/railgun.conf` (GNU/Linux). The most important directives are `wan.port`, which specifies the port Railgun listens on, `memcached.servers`, a space separated list of `host:port` memcached instances for Railgun to utilize. It is also possible to specify the full path to a single socket file for memcached. Using a socket file is recommended for best performance if your memcached does not require network communication. Make sure at least one memcached instance is defined. Full details on the available options [can be found in the Raingul Execution docs](/user-guide/railgun-execution).

If you will be using Railgun in combination with a website hosted behind the same NAT scheme, then you will also need to configure a static IP mapping. In other words, if your website and Railgun node are running behind the same router or firewall, there are extra configuration steps necessary to properly route requests. More details in the Known Issues section below. Please contact support for assistance, or you can use the examples in `/etc/railgun/railgun-nat.conf` to define one yourself.

Railgun requires an activation step in order to use. To activate, you will need to update the configuration file with the external IP address or a hostname which resolves to the external IP of your Railgun instance for `activation.public_ip` and your activation token for `activation.token`. You can determine the external IP address of a server with the following command:

```
$ curl icanhazip.com
```

By default, Railgun will listen on all interfaces, although it is good practice to specify the interface you would like Railgun to use. You can do that by setting the wan.ip option to the IP address of the interface you would like Railgun to listen on. **This is especially important if you have a local link IPv6 address, as Railgun will prefer that to an IPv4 address and may not work as a result.**

Business and Enterprise users can find the Railgun activation token listed on the [Account Settings page](https://www.cloudflare.com/a/account/my-account). Details on this page can be found in the Administration documentation. Optimized Partners must use the [init](/user-guide/optimized-partner-api/creation-activation-deletion#get-init) API method to acquire an activation token (`rtkn`). Business and Enterprise users should add a Railgun on the listing page, if you haven’t already. It can be named anything you like. After adding a Railgun, the token will be listed on the page and you can toggle the Railgun to ‘On.’ The token is a 32 character hash of numbers and letters. Copy this hash into the `activation.token` option in your Railgun configuration file. If your public IP and activation token are properly configured, the first time you start Railgun it will register and download a newly generated SSL certificate to encrypt traffic. To make sure that activation works properly, check your logs for a successful activation response when starting Railgun:

```
$  tail -f /var/log/messages
Oct 27 22:29:41 www rg-listener: [Activation] Activation POST completed.
Oct 27 22:29:41 www rg-listener: [Activation] Assigned Railgun ID: 1
Oct 27 22:29:41 www rg-listener: [Activation] Acquired cert from server
```
If there is a certificate error in the system log or during startup, ensure that the necessary certificate bundle is installed as described in [Preparing the Environment](/user-guide/installation#preparing-the-environment) above so that Railgun may connect securely back to Cloudflare’s activation servers.

The newly generated certificate is signed against the port2408.net domain and our system will automatically set your new port2408.net subdomain to resolve to the IP specified by `activation.public_ip`. You can use this hostname to test Railgun without enabling the service for all users. More details are in the [Testing Railgun](/user-guide/installation#testing-railgun) section below.

## Starting the service
You should start the service in the manner that your operating system recommends. This is likely either by using the init script directly, or by invoking the service command:

```
(GNU/Linux)
$ /etc/init.d/railgun start
Starting railgun:                                          [  OK  ]

$ service railgun start
Starting railgun:                                          [  OK  ]
```

After running the init script, there should be an `rg-listener` process listening on the configured port (2408 by default). You can use netstat to make sure:

```
(GNU/Linux)
$ netstat -plnt | grep 2408
tcp        0      0 :::2408                     :::*                        LISTEN      2981/rg-listener
```

Provided that your port is open to Cloudflare traffic, it’s time for testing. If you don’t see the process running, then there may be an issue with activation or your configuration. The Railgun panic log, which is written to `/var/log/railgun/panic.log` by default, may contain more information. You can also attempt to start Railgun without the init script to see if any errors are present at start:

```
(GNU/Linux)
$ sudo -u railgun /usr/bin/rg-listener -config=/etc/railgun/railgun.conf
```
## Testing Railgun
Once you have configured Railgun, you can test its operation using the `Test` button under the performance section of your Cloudflare account. This will indicate whether a request to your web server uses Railgun.

The log file can also be used to monitor results. By default, we log only errors. For testing, you need to raise the `log.level` option from 0 to 5 in your Railgun configuration and then restart the service. You can then tail the logs to watch the requests being processed:

```
$  tail -f /var/log/messages
Oct 27 23:35:57 www railgun[199.27.130.135:22114]: Handling new WAN connection
Oct 27 23:35:57 www railgun[199.27.130.135:22114]: Rx [0000000000... FnPing 2012-10-27 23:37:55.872617 +0000 UTC]
Oct 27 23:35:57 www railgun[199.27.130.135:22114]: Tx [0000000000... FnPong 2012-10-27 23:37:55.872617 +0000 UTC]
Oct 27 23:35:57 www railgun[199.27.130.135:22114]: Transmit time: 550us
Oct 27 23:36:06 www railgun[199.27.130.135:22114]: Rx [ab18927f79... FnBegin ab18927f79... FnRequest HEAD http://example.com/ HTTP/1.1 188.165.194.208  ab18927f79... FnData DENone 374   ab18927f79... FnPush]
Oct 27 23:36:06 www railgun[199.27.130.135:22114]: ab18927f79... waiting for request
Oct 27 23:36:06 www railgun[199.27.130.135:22114]: ab18927f79... HEAD http://example.com/ HTTP/1.1 188.165.194.208 []
Oct 27 23:36:06 www railgun[199.27.130.135:22114]: ab18927f79... Starting connection to LAN
Oct 27 23:36:06 www railgun[199.27.130.135:22114]: ab18927f79... connected to 192.0.43.10:80
Oct 27 23:36:06 www railgun[199.27.130.135:22114]: ab18927f79... Request sent to server
Oct 27 23:36:06 www railgun[199.27.130.135:22114]: ab18927f79... waiting for response
Oct 27 23:36:06 www railgun[199.27.130.135:22114]: ab18927f79... Response is ready
Oct 27 23:36:06 www railgun[199.27.130.135:22114]: ab18927f79... Received response
Oct 27 23:36:06 www railgun[199.27.130.135:22114]: ab18927f79... Forcing wantedDelta
Oct 27 23:36:06 www railgun[199.27.130.135:22114]: ab18927f79... HTTP/1.1 301 Moved Permanently
Oct 27 23:36:06 www railgun[199.27.130.135:22114]: Tx [ab18927f79... FnData DENone 328  ]
Oct 27 23:36:06 www railgun[199.27.130.135:22114]: ab18927f79... completed (0 body bytes in 0.001572 seconds/0)#012
Oct 27 23:36:06 www railgun[199.27.130.135:22114]: ab18927f79... waiting for request
Oct 27 23:36:06 www railgun[199.27.130.135:22114]: Transmit time: 88us
Oct 27 23:36:06 www railgun[199.27.130.135:22114]: Tx [ab18927f79... FnPush]
Oct 27 23:36:06 www railgun[199.27.130.135:22114]: Transmit time: 48us
```

** Railgun will produce 5xx messages when the rg-listener service is unable to reach the origin web server. ** Checking that the route between the Railgun server and the web server is clear is essential before contacting support. The easiest way of checking that us just by performing a curl command from the Railgun server to the origin web server. If Railgun and the web server are both run on the same physical server, check that it allows loopback HTTP connections on ports 80 and 443 in its firewall settings. Please ensure the correct port is open and contact support if errors persist.

## Going live
It is recommended that you consult the [Testing Railgun](/user-guide/installation#testing-railgun) section before enabling it for all visitors to your site.

When you wish to go live, Enterprise and Business users should select the desired Railgun for your domain on the [Cloudflare Settings](https://www.cloudflare.com/a/account/my-account) page from the drop-down and then toggle the switch to ‘On’. Optimized Partners should use the [conn_set](/user-guide/optimized-partner-api/conections-enabling-disabling#get-conn_set) with `mode` set to `0` or [conn_setmode_enabled](/user-guide/optimized-partner-api/conections-enabling-disabling#get-conn_setmode_enabled) method to enable Railgun. Railgun may take up to five minutes to fully activate, after which you should see the `CF-Railgun` HTTP header present in responses from all your active Cloudflare DNS records.

## Potential problems
If you notice consistent 523, 524 or other error responses, please check the [System Status Map](https://www.cloudflarestatus.com/) and [contact support](https://support.cloudflare.com/) as needed. Railgun will fall-back to direct HTTP requests if our endpoints can’t contact your Railgun daemon, but consistent error responses may indicate a system or origin server problem. When contacting support, please provide a screenshot of ```http://www.yourdomain.com/cdn-cgi/trace``` if you are able, or a [traceroute](https://support.cloudflare.com/hc/en-us/articles/200169336-How-do-I-run-a-traceroute-) to your domain so we know which datacenter your requests are hitting. You can then [pause](https://support.cloudflare.com/hc/en-us/articles/200169176-How-do-I-temporarily-deactivate-Cloudflare-) Cloudflare via the website to disable the service and resume normal website traffic.

Railgun does not perform DNS queries when it receives a request for maximum efficiency and to prevent tampering. This means that the daemon is unaware of NAT routing or firewalls. NAT does not allow for addressing a public interface from within the associated LAN and Railgun requests will timeout and produce 502 errors. ** This can be corrected by setting up a static IP mapping. ** You can set that either through the hosts file for your system (usually at the path /etc/hosts) or through the `railgun-nat.conf` file in the same directory as the `railgun.conf` file. Please contact support if you require assistance with the NAT configuration file.

## Common issues
**Railgun is returning a HTTP 502 in its error logs.**

This commonly occurs when Railgun cannot reach your origin web server over port 443 (or port 80) within 30 seconds. Verify that the server your Railgun instance is on can connect via `telnet <host> 443`.

---

** Railgun is returning a ** `connection failed 127.0.0.1:443/welcome.cloudflare.com: x509: certificate is valid for www.cloudflare.com, not welcome.cloudflare.com` ** error. **

Your origin webserver should have a certificate matching its hostname. If you are on an internal network and are aware of the risks, you can set `validate.cert = 0` in `railgun.conf` to turn off certificate validation (not recommended).

---

** I’m seeing ** `bad Content-Length: "-1"` ** . **

Railgun expects that all POST, PUT, PATCH (and other non-idempotent methods) requests have either a `Content-Length` header or a `Transfer-Encoding: chunked` header present.

---

** There are errors containing ** `memcached: connection failed` (Unix socket) ** or ** `dial tcp 127.0.0.1:11211: i/o timeout` (TCP) ** in the logs. **

Railgun cannot connect to the memcached server. These errors should not cause visible errors, but will cause Railgun to stream (and not compress) responses.

You should confirm that memcached is running, is accepting connections, and confirm the state of your memcached server via the memcached `stats` command.

---

** How can I tell what the compression ratio for a request is? **

`rg-diag` is installed alongside Railgun, and allows you to decode the `Cf-Railgun` header — e.g.

```
% bin/rg-diag -decode="151df128a1 2.05 0.009465 0031 5360"

Compression ratio 2.05%
Railgun version 5360
Railgun Flag map.file used to change IP
Railgun Flag rg-sender sent dictionary
Railgun Flag rg-listener found dictionary
```