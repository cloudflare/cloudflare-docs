---
order: 7
---

# Oblivious DNS over HTTPS

Oblivious DNS over HTTPS (or ODoH) is a new DNS protocol still in the works that separates client IP addresses from their DNS queries by routing the DNS queries over a proxy, so that the DNS resolver cannot link client IPs with their queries. You can learn more about it in this [blog post](https://blog.cloudflare.com/oblivious-dns/). Please note that this protocol and all related implementations are currently **experimental**, so use at your own risk.

Follow the progress of ODoH by following the IETF draft [here](https://datatracker.ietf.org/doc/draft-pauly-dprive-oblivious-doh/).

We have open sourced our interoperable ODoH library implementations in Rust, [odoh-rs](https://github.com/cloudflare/odoh-rs), and Go, [odoh-go](https://github.com/cloudflare/odoh-go), which you can use to implement your own client or target resolver. 

We have also open sourced test clients in Rust, [odoh-client-rs](https://github.com/cloudflare/odoh-client-rs) and Go, [odoh-client-go](https://github.com/cloudflare/odoh-client-go), which can be used to demo ODoH queries. 

We have also open sourced [odoh-server-go](https://github.com/cloudflare/odoh-server-go) as a sample server that can be used to run a proxy or a target for ODoH. `odoh-server-go` can act as both a proxy and a target. It listens on `/proxy` for proxy requests, and `/dns-query` for target requests. You could even run two instances of it and have one instance function as a proxy and the other as a target.

Finally, we have implemented support for ODoH queries in 1.1.1.1.

We are not aware of any DNS clients like [dnscrypt-proxy](https://github.com/DNSCrypt/dnscrypt-proxy) that currently implement ODoH, but watch out for developments in the future!

## Setting up proxy and target

Here's an example that demonstrates running your own proxy, and using 1.1.1.1 as a target.

In one terminal, start the proxy: 

```bash
$ git clone https://github.com/cloudflare/odoh-server-go
$ cd odoh-server-go/
$ go build
$ PORT=8080 ./odoh-server-go
```

From another terminal, use the client to send queries:

```bash
$ git clone https://github.com/cloudflare/odoh-client-rs
$ cd odoh-client-rs/
$ cat << EOF > config.toml
[server]
proxy = "http://localhost:8080/proxy"
target = "https://odoh.cloudflare-dns.com"
EOF
$ cargo run -- example.com A -c config.toml
Response: [Record { name_labels: Name { is_fqdn: true, labels: [example, com] }, rr_type: A, dns_class: IN, ttl: 72468, rdata: A(93.184.216.34) }]
```

## Sending ODoH queries to 1.1.1.1

If you don't want to run your own proxy or target, you can send ODoH queries to 1.1.1.1, which will go through the proxy listed in `tests/config.toml`:

```bash
$ git clone https://github.com/cloudflare/odoh-client-rs
$ cd odoh-client-rs/
$ cargo run -- example.com A
Response: [Record { name_labels: Name { is_fqdn: true, labels: [example, com] }, rr_type: A, dns_class: IN, ttl: 72468, rdata: A(93.184.216.34) }]
```
