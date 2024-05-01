---
weight: 8
pcx_content_type: faq
title: FAQ
structured_data: true
---

# FAQ

Below you will find answers to our most commonly asked questions. If you cannot find the answer you are looking for, refer to the [community page](https://community.cloudflare.com/) to explore more resources.

{{<faq-item>}}
{{<faq-question level=2 text="What is 1.1.1.1?" >}}

{{<faq-answer>}}

1.1.1.1 is Cloudflare's fast and secure DNS resolver. When you request to visit an application like `cloudflare.com`, your computer needs to know which server to connect you to so that it can load the application. Computers don’t know how to do this name to address translation, so they ask a specialized server to do it for them.

This specialized server is called a DNS recursive resolver. The resolver’s job is to find the address for a given name, like `2400:cb00:2048:1::c629:d7a2` for `cloudflare.com`, and return it to the computer that asked for it.

Computers are configured to talk to specific DNS resolvers, identified by IP address. Usually the configuration is managed by your ISP (like Comcast or AT&T) if you are on your home or wireless Internet, and by your network administrator if you’re connected to the office Internet. You can also change the configured DNS resolver your computer talks to yourself.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="How can I check if my computer / smartphone / tablet is connected to 1.1.1.1?" >}}

{{<faq-answer>}}

Visit [1.1.1.1/help](https://one.one.one.one/help) to make sure your system is connected to 1.1.1.1 and that it is working.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="What do DNS resolvers do?" >}}

{{<faq-answer>}}

DNS resolvers are like address books for the Internet. They translate the name of places to addresses so that your browser can figure out how to get there. DNS resolvers do this by working backwards from the top until they find the website your are looking for.

Every resolver knows how to find the invisible `.` at the end of domain names (for example, `cloudflare.com.`). There are [hundreds of root servers](http://www.root-servers.org/) all over the world that host the `.` file, and resolvers are [hard coded to know the IP addresses](http://www.internic.net/domain/named.root) of those servers. Cloudflare itself hosts [that file](http://www.internic.net/domain/root.zone) on all of its servers around the world through a [partnership with ISC](https://blog.cloudflare.com/f-root/).

The resolver asks one of the root servers where to find the next link in the chain — the top-level domain (abbreviated to TLD) or domain ending. An example of a TLD is `.com` or `.org`. Luckily, the root servers store the locations of all the TLD servers, so they can return which IP address the DNS resolver should go ask next.

The resolver then asks the TLD’s servers where it can find the domain it is looking for. For example, a resolver might ask `.com` where to find `cloudflare.com`. TLDs host a file containing the location of every domain using the TLD.

Once the resolver has the final IP address, it returns the answer to the computer that asked.

This whole system is called the [Domain Name System (DNS)](https://www.cloudflare.com/learning/dns/what-is-dns/). This system includes the servers that host the information (called [authoritative DNS](https://www.cloudflare.com/learning/dns/dns-server-types/)) and the servers that seek the information (the DNS resolvers).

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Does 1.1.1.1 support ANY?" >}}

{{<faq-answer>}}

Cloudflare [stopped supporting the ANY query](https://blog.cloudflare.com/deprecating-dns-any-meta-query-type/) in 2015 as ANY queries are more often used to perpetuate large volumetric attacks against the DNS system than valid use. 1.1.1.1 returns `NOTIMPL` when asked for `qtype==ANY`.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="How does 1.1.1.1 work with DNSSEC?" >}}

{{<faq-answer>}}

1.1.1.1 is a DNSSEC validating resolver. 1.1.1.1 sends the `DO` (`DNSSEC OK`) bit on every query to convey to the authoritative server that it wishes to receive signed answers if available. 1.1.1.1 supports the signature algorithms specified in [Supported DNSKEY signature algorithms](/1.1.1.1/encryption/dnskey/).

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="​Does 1.1.1.1 send EDNS Client Subnet header?" >}}

{{<faq-answer>}}

1.1.1.1 is a privacy centric resolver so it does not send any client IP information and does not send the {{<glossary-tooltip term_id="EDNS Client Subnet (ECS)" link="/glossary/?term=ecs">}}EDNS Client Subnet (ECS){{</glossary-tooltip>}} header to authoritative servers. The exception is the single Akamai debug domain `whoami.ds.akahelp.net` to aid in cross-provider debugging. However, Cloudflare does not send ECS to any of Akamai's production domains, such as `akamaihd.net` or similar.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Does 1.1.1.1 support IPv6?" >}}

{{<faq-answer>}}

1.1.1.1 has full IPv6 support.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="What is Purge Cache?" >}}

{{<faq-answer>}}

1.1.1.1's Purge Cache tool allows you to refresh 1.1.1.1's DNS cache for domain names. To refresh the cache for a domain name, visit the [Purge Cache page](https://one.one.one.one/purge-cache/).

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="What is query name minimization?" >}}

{{<faq-answer>}}

Cloudflare minimizes privacy leakage by only sending minimal query name to authoritative DNS servers. For example, if a client is looking for foo.bar.example.com, the only part of the query 1.1.1.1 discloses to .com is that we want to know who’s responsible for example.com and the zone internals stay hidden.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="What are root hints?" >}}

{{<faq-answer>}}

For decreased latency, reduced privacy leakage of queries and lower load on the DNS system, 1.1.1.1 upstreams to [locally hosted root zone files](https://blog.cloudflare.com/f-root/).

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Can IPs used by 1.1.1.1 be allowlisted?" >}}

{{<faq-answer>}}

Authoritative DNS providers may want to allowlist IP's 1.1.1.1 uses to query upstream DNS providers. The comprehensive list of IP's to allowlist is available at [https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/).

{{</faq-answer>}}
{{</faq-item>}}
