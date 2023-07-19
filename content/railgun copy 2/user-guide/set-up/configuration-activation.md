---
pcx_content_type: tutorial
title: Configuration and activation
weight: 3
---

# Configuration and activation

{{<render file="_railgun-deprecation-notice.md">}}

Railgun is configured in `/etc/railgun/railgun.conf` (GNU/Linux). The most important directives are `wan.port`, which specifies the port Railgun listens on, and `memcached.servers`, a space separated list of `host:port` Memcached instances for Railgun to utilize. It is also possible to specify the full path to a single socket file for Memcached. Using a socket file is recommended for best performance if your Memcached does not require network communication. Make sure at least one Memcached instance is defined. Full details on the available options [can be found in the Railgun Execution docs](/railgun/user-guide/railgun-execution/).

If you will be using Railgun in combination with a website hosted behind the same NAT scheme, then you will also need to configure static IP mapping. In other words, if your website and Railgun node are running behind the same router or firewall, there are extra configuration steps necessary to properly route requests. More details in the [Potential problems and common issues](/railgun/user-guide/troubleshooting/potential-problems/) section. Contact support for assistance, or you can use the examples in `/etc/railgun/railgun-nat.conf` to define one yourself.

Railgun requires an activation step before usage. To activate, you will need:

* To update the configuration file with the external IP address or a hostname which resolves to the external IP of your Railgun instance for `activation.public_ip`
* Your activation token for `activation.token`.

You can determine the external IP address of a server with the following command:

```sh
$ curl icanhazip.com
```

By default, Railgun will listen on all interfaces. It is best practice to specify the interface you would like Railgun to use. You can do that by setting the `wan.ip` option to the IP address of the interface you would like Railgun to listen on. This is especially important if you have a local link IPv6 address, as Railgun will prefer that to an IPv4 address, and may not work as a result.

You can find the Railgun activation token listed on your account home, under [**Manage Account** > **Configurations** > **Railgun**](https://dash.cloudflare.com/?to=/:account/configurations/railgun). Details on this page can be found in the [Administration documentation](/railgun/user-guide/administration/). You should add a Railgun on the listing page, if you have not already. It can be named anything you like. After adding a Railgun, the token will be listed on the page and you can toggle the Railgun to **On**. The token is a 32 character hash of numbers and letters. Copy this hash into the `activation.token` option in your Railgun configuration file. If your public IP and activation token are properly configured, the first time you start Railgun it will register and download a newly generated SSL certificate to encrypt traffic. To make sure that activation works properly, check your logs for a successful activation response when starting Railgun:

```sh
$  tail -f /var/log/messages
Oct 27 22:29:41 www rg-listener: [Activation] Activation POST completed.
Oct 27 22:29:41 www rg-listener: [Activation] Assigned Railgun ID: 1
Oct 27 22:29:41 www rg-listener: [Activation] Acquired cert from server
```

If there is a certificate error in the system log or during startup, ensure that the necessary certificate bundle is installed as described in [Preparing the Environment](/railgun/user-guide/set-up/preparing-environment/) so that Railgun may connect securely back to Cloudflare’s activation servers.

As an example, we are going to use domain `port2408.net`. The newly generated certificate is signed against the `port2408.net` domain and our system will automatically set your new `port2408.net` subdomain to resolve to the IP specified by `activation.public_ip`. You can use this hostname to test Railgun without enabling the service for all users. For more details, refer to the [Testing Railgun](#testing-railgun) section below.

## Starting the service

You should start the service in the manner that your operating system recommends. This is likely either by using the `init` script directly, or by invoking the service command:

```bash
---
highlight: [1]
---
GNU/Linux
$ /etc/init.d/railgun start
Starting railgun:                                          [  OK  ]

$ service railgun start
Starting railgun:                                          [  OK  ]
```

After running the init script, there should be an `rg-listener` process listening on the configured port (2408 by default). You can use netstat to make sure:

```bash
---
highlight: [1]
---
GNU/Linux
$ netstat -plnt | grep 2408
tcp        0      0 :::2408                     :::*                        LISTEN      2981/rg-listener
```

Provided that your port is open to Cloudflare traffic, it is time for testing. If you do not see the process running, then there may be an issue with activation or your configuration. The Railgun panic log, which is written to `/var/log/railgun/panic.log` by default, may contain more information. You can also attempt to start Railgun without the `init` script to see if any errors are present at start:

```bash
---
highlight: [1]
---
GNU/Linux
$ sudo -u railgun /usr/bin/rg-listener -config=/etc/railgun/railgun.conf
```

## Testing Railgun

Once you have configured Railgun, you can test its operation on the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Speed** > **Optimization** > **Other**.
3. Scroll down to **Railgun** and select **Test**. 

This will indicate whether a request to your web server uses Railgun.

You can also use the log file to monitor results. By default, Cloudflare only logs errors. For testing, you need to raise the `log.level` option from `0` to `5` in your Railgun configuration and then restart the service. You can then `tail` the logs to watch the requests being processed:

```bash
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

Railgun will produce `5xx` messages when the `rg-listener` service is unable to reach the origin web server. It is essential that you check that the route between the Railgun server and the web server is clear before contacting support. The easiest way of checking that is by performing a `curl` command from the Railgun server to the origin web server. If Railgun and the web server are both run on the same physical server, check that it allows loopback HTTP connections on ports `80` and `443` in its firewall settings. Please ensure the correct port is open and contact support if errors persist.

## Going live

It is recommended that you consult the [Testing Railgun](#testing-railgun) section before enabling Railgun for all visitors to your site.

When you wish to go live, select the desired Railgun for your domain on the [Configurations](https://dash.cloudflare.com/?to=/:account/configurations/railgun) page and toggle the switch to **On**. Railgun may take up to five minutes to fully activate, after which you should see the `CF-Railgun` HTTP header present in responses from all your active Cloudflare DNS records.
