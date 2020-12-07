---
order: 10
---

# Running a DNS over HTTPS client

There are several DNS over HTTPS (DoH) clients you can use to connect to 1.1.1.1 in order to protect your DNS queries from privacy intrusions and tampering.

## cloudflared

We've open sourced a Golang DoH client you can use to get started. Follow this quick guide to start a DNS over HTTPS proxy to 1.1.1.1.

Step 1: Download the cloudflared daemon. You can [find it here](https://developers.cloudflare.com/argo-tunnel/downloads/).

Step 2: Verify that the `cloudflared` daemon is installed

    cloudflared --version
    cloudflared version 2020.11.11 (built 2020-11-25-1643 UTC)

Step 3: Start the DNS proxy on an address and port in your network. If you don't
specify an address and port, it will start listening on `localhost:53`. DNS (53)
is a privileged port, so for the initial demo we will use a different port:

    cloudflared proxy-dns --port 5553
    INFO[2020-12-04T19:58:57Z] Adding DNS upstream - url: https://1.1.1.1/dns-query
    INFO[2020-12-04T19:58:57Z] Adding DNS upstream - url: https://1.0.0.1/dns-query
    INFO[2020-12-04T19:58:57Z] Starting metrics server on 127.0.0.1:44841/metrics
    INFO[2020-12-04T19:58:57Z] Starting DNS over HTTPS proxy server on: dns://localhost:5553

Step 4: You can verify that it's running using a `dig`, `kdig`, `host`, or any other DNS client.

    dig +short @127.0.0.1 -p5553 cloudflare.com AAAA
    2606:4700::6810:85e5
    2606:4700::6810:84e5

Step 5: Set up cloudflared as a service so it starts on user login. On many
Linux distributions, this can be done with:

    sudo tee /etc/systemd/system/cloudflared-proxy-dns.service >/dev/null <<EOF
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
    sudo systemctl enable --now cloudflared-proxy-dns

Step 6: Change your system DNS servers to use 127.0.0.1. On Linux, one can
modify `/etc/resolv.conf`:

    sudo rm -f /etc/resolv.conf
    echo nameserver 127.0.0.1 | sudo tee /etc/resolv.conf >/dev/null

Step 7: Finally verify it locally with:

    dig +short @127.0.0.1 cloudflare.com AAAA
    2606:4700::6810:85e5
    2606:4700::6810:84e5

## dnscrypt-proxy

The [dnscrypt-proxy](https://dnscrypt.info) 2.0+ supports DoH out of the box. It supports both 1.1.1.1, and other services. It includes more advanced features, such as load balancing and local filtering.

Step 1: Install the dnscrypt-proxy. You can [find the instructions here](https://github.com/jedisct1/dnscrypt-proxy/wiki/installation).

Step 2: Verify that the `dnscrypt-proxy` is installed, and at least version 2.0

    dnscrypt-proxy -version
    2.0.8

Step 3: Set up the configuration file using the [official instructions](https://github.com/jedisct1/dnscrypt-proxy/wiki/installation#setting-up-dnscrypt-proxy), and add 'cloudflare' and 'cloudflare-ipv6' to the server list in `dnscrypt-proxy.toml`

    server_names = ['cloudflare', 'cloudflare-ipv6']

Step 4: Make sure that nothing else is running on `localhost:53`, and check that everything works as expected

    dnscrypt-proxy -resolve cloudflare-dns.com
    Resolving [cloudflare-dns.com]

    Domain exists:  yes, 3 name servers found
    Canonical name: cloudflare-dns.com.
    IP addresses:   2400:cb00:2048:1::6810:6f19, 2400:cb00:2048:1::6810:7019, 104.16.111.25, 104.16.112.25
    TXT records:    -
    Resolver IP:    172.68.140.217

Step 5: Register it as a system service using the [instructions here](https://github.com/jedisct1/dnscrypt-proxy/wiki/installation#installing-as-a-system-service-windows-linux-macos)
