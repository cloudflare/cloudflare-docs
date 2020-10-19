---
order: 5
---

# DNS over Tor

Follow this quick guide to start using the hidden resolver or read about it in
[this blog post](https://blog.cloudflare.com/welcome-hidden-resolver/)

## Setting up a Tor client

The important difference between using all other modes of DNS and this mode is that packet
routing no longer uses IP addresses, and therefore all connections must be routed through a
Tor client. Before anything else, head to the
[Tor Project](https://www.torproject.org/download/download.html.en) website to download and
install a Tor client. If you use the Tor Browser, it will automatically start a SOCKS proxy at
`127.0.0.1:9150`. If you use Tor from the command line, create a config file like below and run
`tor -f tor.conf`:

	SOCKSPort 9150

Also, if you use the Tor Browser, you can head to the resolver's address to see the usual
1.1.1.1 page:

	https://dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion/

__Note:__ the HTTPS certificate indicator should say "Cloudflare, Inc. (US)."


__Protip:__ if you ever forget the dns4torblahblahblah.onion address, you can simply use cURL:

	curl -sI https://tor.cloudflare-dns.com | grep -i alt-svc
	alt-svc: h2="dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion:443"; ma=315360000; persist=1


## Setting up a local DNS proxy using socat

Of course, not all DNS clients support connecting to the Tor client, so the easiest way to
connect any DNS-speaking software to the hidden resolver is by forwarding ports locally, for
instance using [`socat`](http://www.dest-unreach.org/socat/).

### DNS over TCP, TLS, and HTTPS

The hidden resolver is set up to listen on TCP ports 53 and 853 for DNS over TCP and TLS. After
setting up a Tor proxy, run the following `socat` command as a privileged user, replacing the
port number appropriately:

	PORT=853; socat TCP4-LISTEN:${PORT},reuseaddr,fork SOCKS4A:127.0.0.1:dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion:${PORT},socksport=9150

From here, you can follow the regular guide for [Setting Up 1.1.1.1](../../setting-up-1.1.1.1/),
except always use `127.0.0.1` instead of 1.1.1.1. If you need to access the proxy from another
device, simply replace `127.0.0.1` in `socat` commands with your local IP address.

### DNS over UDP

Note that the Tor network does not support UDP connections, which is why some hacking is needed.
If your client only supports UDP connections, the solution is to encapsulate packets to port
UDP:53 on localhost as TCP packets using the following `socat` command:

	socat UDP4-LISTEN:53,reuseaddr,fork SOCKS4A:127.0.0.1:dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion:253,socksport=9150

### DNS over HTTPS

As explained in the blog post, our favorite way of using the hidden resolver is using DoH.

1. First, start with downloading `cloudflared` by following the regular guide for 
[Running a DNS over HTTPS Client](../../dns-over-https/cloudflared-proxy/).

2. Start a Tor SOCKS proxy and use `socat` to forward port TCP:443 to localhost:

		socat TCP4-LISTEN:443,reuseaddr,fork SOCKS4A:127.0.0.1:dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion:443,socksport=9150

3. Instruct your machine to treat the .onion address as localhost:

		cat << EOF >> /etc/hosts
		127.0.0.1 dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion
		EOF

4. Finally, start a local DNS over UDP daemon:

		cloudflared proxy-dns --upstream "https://dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion/dns-query"
		INFO[0000] Adding DNS upstream                           url="https://dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion/dns-query"
		INFO[0000] Starting DNS over HTTPS proxy server          addr="dns://localhost:53"
		INFO[0000] Starting metrics server                       addr="127.0.0.1:35659"

5. Profit!
