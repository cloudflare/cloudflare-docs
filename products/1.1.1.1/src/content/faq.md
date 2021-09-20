---
order: 6
pcx-content-type: faq
---

# FAQ

## What is 1.1.1.1?

1.1.1.1 is Cloudflare's fast and secure DNS resolver. When you request to visit an application like `cloudflare.com`, your computer needs to know which server to connect you to so that it can load the application. Computers don’t know how to do this name to address translation, so they ask a specialized server to do it for them.

This specialized server is called a DNS recursive resolver. The resolver’s job is to find the address for a given name, like `2400:cb00:2048:1::c629:d7a2` for `cloudflare.com`, and return it to the computer that asked for it.

Computers are configured to talk to specific DNS resolvers, identified by IP address. Usually the configuration is managed by your ISP (like Comcast or AT&T) if you’re on your home or wireless Internet, and by your network administrator if you’re connected to the office Internet. You can also change the configured DNS resolver your computer talks to yourself.

## What do DNS resolvers do?

DNS resolvers are like address books for the Internet. They translate the name of places to addresses so that your browser can figure out how to get there. DNS resolvers do this by working backwards from the top until they find the website your are looking for.

Every resolver knows how to find the invisible ‘.’ at the end of domain names (for example, `cloudflare.com.`). There are [hundreds of root servers](http://www.root-servers.org/) all over the world that host the ‘.’ file, and resolvers are [hard coded to know the IP addresses](http://www.internic.net/domain/named.root) of those servers. Cloudflare itself hosts [that file](http://www.internic.net/domain/root.zone) on all of its servers around the world through a [partnership with ISC](https://blog.cloudflare.com/f-root/). 

The resolver asks one of the root servers where to find the next link in the chain — the top-level domain (abbreviated to TLD) or domain ending. An example of a TLD is `.com` or `.org`. Luckily, the root servers store the locations of all the TLD servers, so they can return which IP address the DNS resolver should go ask next.

The resolver then asks the TLD’s servers where it can find the domain it is looking for. For example, a resolver might ask `.com` where to find `cloudflare.com`. TLDs host a file containing the location of every domain using the TLD.

Once the resolver has the final IP address, it returns the answer to the computer that asked.

This whole system is called the Domain Name System (DNS). This system includes the servers that host the information (called authoritative DNS) and the servers that seek the information (the DNS resolvers).

## Does 1.1.1.1 support ANY?

Cloudflare [stopped supporting the ANY query](https://blog.cloudflare.com/deprecating-dns-any-meta-query-type/) in 2015 as ANY queries are more often used to perpetuate large volumetric attacks against the DNS system than valid use. 1.1.1.1 returns `NOTIMPL` when asked for `qtype==ANY`.

## How does 1.1.1.1 work with DNSSEC?

1.1.1.1 is a DNSSEC validating resolver. 1.1.1.1 sends the DO (DNSSEC Ok) bit on every query to convey to the authoritative server that it wishes to receive signed answers if available. 1.1.1.1 supports [all signature algorithms](https://www.iana.org/assignments/dns-sec-alg-numbers/dns-sec-alg-numbers.xhtml) including the newer DS-13, DS-14, and DNS-15.

## ​Does 1.1.1.1 send EDNS client subnet header?

1.1.1.1 is a privacy centric resolver so it does not send any client IP information and does not send the EDNS Client Subnet Header to authoritative servers.

## Does 1.1.1.1 support IPv6?

1.1.1.1 has full IPv6 support.

## What is Purge Cache?

1.1.1.1's Purge Cache tool allows you to refresh 1.1.1.1's DNS cache for domain names. To refresh the cache for a domain name, visit the [Purge Cache page](https://1.1.1.1/purge-cache/).

## What is query name minimization?

Cloudflare minimizes privacy leakage by only sending minimal query name to authoritative DNS servers. For example, if a client is looking for foo.bar.example.com, the only part of the query 1.1.1.1 discloses to .com is that we want to know who’s responsible for example.com and the zone internals stay hidden.

## What are root hints?

For decreased latency, reduced privacy leakage of queries and lower load on the DNS system, 1.1.1.1 upstreams to [locally hosted root zone files](https://blog.cloudflare.com/f-root/).

## Can IPs used by 1.1.1.1 be allowlisted?

Authoritative DNS providers may want to allowlist IP's 1.1.1.1 uses to query upstream DNS providers. The comprehensive list of IP's to allowlist is available at [https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/).
