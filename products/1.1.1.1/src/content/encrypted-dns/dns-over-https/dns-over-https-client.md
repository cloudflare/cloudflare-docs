---
order:
pcx-content-type: reference
---

# Connect to 1.1.1.1 using DoH clients

There are several DoH clients you can use to connect to 1.1.1.1.

## cloudflared

Follow this quick guide to start a DNS over HTTPS proxy to 1.1.1.1.

1. [Download the `cloudflared` daemon](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation).
1. Verify that the `cloudflared` daemon is installed by entering the following command:

    ```sh
    $ cloudflared --version
    cloudflared version 2020.11.11 (built 2020-11-25-1643 UTC)
    ```

1. Start the DNS proxy on an address and port in your network. If you do not specify an address and port, it will start listening on `localhost:53`. DNS (53) is a privileged port, so for the initial demo we will use a different port:

    ```sh
    $ cloudflared proxy-dns --port 5553
    INFO[2020-12-04T19:58:57Z] Adding DNS upstream - url: https://1.1.1.1/dns-query
    INFO[2020-12-04T19:58:57Z] Adding DNS upstream - url: https://1.0.0.1/dns-query
    INFO[2020-12-04T19:58:57Z] Starting metrics server on 127.0.0.1:44841/metrics
    INFO[2020-12-04T19:58:57Z] Starting DNS over HTTPS proxy server on: dns://localhost:5553
    ```

1. You can verify that it's running using a `dig`, `kdig`, `host`, or any other DNS client.

    ```sh
    $ dig +short @127.0.0.1 -p5553 cloudflare.com AAAA
    2606:4700::6810:85e5
    2606:4700::6810:84e5
    ```

1. Run `cloudflared` as a service so it starts on user login. On many Linux distributions, this can be done with:

    ```bash
    $ sudo tee /etc/systemd/system/cloudflared-proxy-dns.service >/dev/null <<EOF
    [Unit]
    Description=DNS over HTTPS (DoH) proxy client
    Wants=network-online.target nss-lookup.target
    Before=nss-lookup.target

    [Service]
    AmbientCapabilities=CAP_NET_BIND_SERVICE
    CapabilityBoundingSet=CAP_NET_BIND_SERVICE
    DynamicUser=yes
    ExecStart=/usr/local/bin/cloudflared proxy-dns

    [Install]
    WantedBy=multi-user.target
    EOF

    $ sudo systemctl enable --now cloudflared-proxy-dns
    ```

1. Change your system DNS servers to use `127.0.0.1`. On Linux, you can modify `/etc/resolv.conf`:

    ```sh
    $ sudo rm -f /etc/resolv.conf
    $ echo nameserver 127.0.0.1 | sudo tee /etc/resolv.conf >/dev/null
    ```

1. Finally, verify it locally with:

    ```sh
    $ dig +short @127.0.0.1 cloudflare.com AAAA
    2606:4700::6810:85e5
    2606:4700::6810:84e5
    ```

## DNSCrypt-Proxy

The [DNSCrypt-Proxy](https://dnscrypt.info) 2.0+ supports DoH out of the box. It supports both 1.1.1.1 and other services. It also includes more advanced features, such as load balancing and local filtering.

1. Install DNSCrypt-Proxy. You can [find the instructions in GitHub](https://github.com/jedisct1/dnscrypt-proxy/wiki/installation).
1. Verify that `dnscrypt-proxy` is installed and the version is 2.0 or later:

    ```sh
    $ dnscrypt-proxy -version
    2.0.8
    ```

1. Set up the configuration file using the [official instructions](https://github.com/jedisct1/dnscrypt-proxy/wiki/installation#setting-up-dnscrypt-proxy), and add `cloudflare` and `cloudflare-ipv6` to the server list in `dnscrypt-proxy.toml`:

    ```toml
    server_names = ['cloudflare', 'cloudflare-ipv6']
    ```

1. Make sure that nothing else is running on `localhost:53`, and check that everything works as expected:

    ```sh
    $ dnscrypt-proxy -resolve cloudflare-dns.com
    Resolving [cloudflare-dns.com]

    Domain exists:  yes, 3 name servers found
    Canonical name: cloudflare-dns.com.
    IP addresses:   2400:cb00:2048:1::6810:6f19, 2400:cb00:2048:1::6810:7019, 104.16.111.25, 104.16.112.25
    TXT records:    -
    Resolver IP:    172.68.140.217
    ```

1. Register it as a system service according to the [DNSCrypt-Proxy installation instructions](https://github.com/jedisct1/dnscrypt-proxy/wiki/installation).
