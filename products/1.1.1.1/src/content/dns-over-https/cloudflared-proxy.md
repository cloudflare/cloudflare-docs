---
order: 10
---

# Running a DNS over HTTPS client

There are several DNS over HTTPS (DoH) clients you can use to connect to 1.1.1.1 in order to protect your DNS queries from privacy intrusions and tampering.

## cloudflared

We've open sourced a golang DoH client you can use to get started. Follow this quick guide to start a DNS over HTTPS proxy to 1.1.1.1.

Step 1: Download the cloudflared daemon. You can [find it here](https://developers.cloudflare.com/argo-tunnel/downloads/).

Step 2: Verify that the `cloudflared` daemon is installed

    cloudflared --version
    cloudflared version 2018.3.11 (built 2018-03-30-1849 UTC)

Step 3: Start the DNS proxy on an address and port in your network. If you don't specify an address and port, it will start listening on `localhost:53`. DNS (53) is a privileged port, so you need to run the daemon as a privileged user in order to be able to bind to it.

    sudo cloudflared proxy-dns
    INFO[0000] Adding DNS upstream                           url="https://cloudflare-dns.com/dns-query"
    INFO[0000] Starting metrics server                       addr="127.0.0.1:49312"
    INFO[0000] Starting DNS over HTTPS proxy server          addr="dns://localhost:53"

Step 4: You can verify that it's running using a `dig`, `kdig`, `host`, or any other DNS client.

    dig +short @127.0.0.1 cloudflare.com AAAA
    2400:cb00:2048:1::c629:d6a2
    2400:cb00:2048:1::c629:d7a2

Step 5: Set up cloudflared as a service so it starts on user login. You can use numeric addresses, to avoid circular dependency on system resolver. First generate a configuration file, see the [configuration reference](https://developers.cloudflare.com/argo-tunnel/reference/config/) for the list of all possible variables. Here's an example:

    mkdir -p /usr/local/etc/cloudflared
    cat << EOF > /usr/local/etc/cloudflared/config.yml
    proxy-dns: true
    proxy-dns-upstream:
     - https://1.1.1.1/dns-query
     - https://1.0.0.1/dns-query
    EOF

Step 6: Install cloudflared as a service so it starts on user login. See the [Automatically starting Argo Tunnel](https://developers.cloudflare.com/argo-tunnel/reference/service/) for reference. Since `proxy-dns` requires to bind to privileged port 53, it needs to be installed with admin privileges:

    sudo cloudflared service install
    INFO[0000] Applied configuration from /usr/local/etc/cloudflared/config.yml
    INFO[0000] Installing Argo Tunnel as an user launch agent
    INFO[0000] Outputs are logged in /tmp/com.cloudflare.cloudflared.out.log and /tmp/com.cloudflare.cloudflared.err.log

Step 7: Verify that it's running, then switch your DNS servers to 127.0.0.1

    dig +short @127.0.0.1 cloudflare.com AAAA
    2400:cb00:2048:1::c629:d6a2
    2400:cb00:2048:1::c629:d7a2

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
