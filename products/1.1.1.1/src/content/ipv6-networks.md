---
order: 4
pcx-content-type: reference
---

# Support for IPv6-only networks

While network infrastructure is shifting towards IPv6-only networks, providers still need to support IPv4 addresses. Dual-stack networks are networks in which all nodes have both IPv4 and IPv6 connectivity capabilities, and can therefore understand both IPv4 and IPv6 packets. 

1.1.1.1 supports DNS64, a mechanism that synthesizes AAAA records from A records when no AAAA records exist. DNS64 allows configuring a DNS resolver to synthesize IPv6 addresses from IPv4 answers.

<Aside type="note">

You should only enable DNS64 if you are managing or using an IPv6-only network. While the resolver can synthesize IPv6 addresses, it cannot synthesize their record signatures for domains using DNSSEC, so a DNS client that is able to revalidate signatures would reject these extra records without signatures.

A good tradeoff is to use a secure protocol such as DNS over TLS, or DNS over HTTPS between the client and the resolver to prevent tampering.

</Aside>

## Configure DNS64

DNS64 is specifically for networks that already have NAT64 support. If you are a network operator who has NAT64, you can test our DNS64 support by updating it to the following IP addresses:

```txt
2606:4700:4700::64
2606:4700:4700::6400
```

Some devices use separate fields for all eight parts of IPv6 addresses and cannot accept the `::` IPv6 abbreviation syntax. For such fields enter:

```txt
2606:4700:4700:0:0:0:0:64
2606:4700:4700:0:0:0:0:6400
```

## Test DNS64

After your configuration, visit an IPv4 only address to check if you can reach it. For example, you can visit https://ipv4.google.com.

Visit http://test-ipv6.com/ to test if it can detect your IPv6 address. If you receive a `10/10`, your IPv6 is configured correctly.