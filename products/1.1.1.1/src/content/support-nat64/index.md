---
title: For IPv6-only networks
order: 9
---

# Supporting IPv6-only networks

IPv4 addresses are going away but networks still need to support them alongside IPv6 addresses. Networks usually deploy something called a dual-stack network to manage this transition. In dual-stack networks, the network expects only IPv6 addresses but still have a way to translate IPv4 addresses if it sees one. One of the components of a dual-stack network is DNS64. DNS64 allows configuring a DNS resolver to synthesize IPv6 addresses from IPv4 answers. DNS64 only does that when an AAAA record does not exist for a domain.

This document explains who should use DNS64 as well as how to configure and test it.

## Who is this for?

You should only enable DNS64 if you are managing or using an IPv6-only network. While the resolver can synthesize IPv6 addresses, it cannot synthesize their record signatures for domains using DNSSEC, so a DNS client that is able to revalidate signatures would reject these extra records without signatures. A good tradeoff is to use a secure protocol such as DNS over TLS, or DNS over HTTPS between the client and the resolver to prevent tampering.

## How can I configure it?

DNS64 is specifically for networks that already have NAT64 support. If you are a network operator who has NAT64, you can test our DNS64 support by updating it to the following IP addresses:

    2606:4700:4700::64
    2606:4700:4700::6400

Some devices use separate fields for all eight parts of IPv6 addresses and cannot accept the :: IPv6 abbreviation syntax. For such fields enter:

    2606:4700:4700:0:0:0:0:64
    2606:4700:4700:0:0:0:0:6400

## How can I test it?

After your configuration, visit an IPv4 only address to check if you can reach it, for example: https://ipv4.google.com.

Visit http://test-ipv6.com/ to test if it can detect your IPv6 address. If you receive a 10/10 that means your IPv6 is configured correctly.
