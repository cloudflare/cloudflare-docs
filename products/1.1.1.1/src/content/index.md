---
order: 0
type: overview
pcx-content-type: landing-page
---

# Overview

<br/>
<div class="medium-img">

![Cloudflare 1.1.1.1](static/1111-fancycolor.gif)

</div>

<ContentColumn>

1.1.1.1 is a fast and private way to browse the Internet. It is a DNS resolver — meaning it is kind of like Google Maps for your computer, in that it translates places (like cloudflare.com) into addresses (like `2400:cb00:2048:1::c629:d7a2`). 

1.1.1.1 is deployed in 150+ cities worldwide, and has access to the addresses of 7M+ domain names on the same servers it runs on so [it’s the fastest resolver out there](https://www.dnsperf.com/#!dns-resolvers).

The addresses of 1.1.1.1 are:

- `1.1.1.1`
- `1.0.0.1`
- `2606:4700:4700::1111`
- `2606:4700:4700::1001`

Moreover, you can access 1.1.1.1 as a Tor hidden service at this address:

- [dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion](./fun-stuff/dns-over-tor/). //change address


## What is a DNS resolver?

When you request to visit an application like `cloudflare.com`, your computer needs to know which server to connect you to so that it can load the application. Computers do not know how to do this name to address translation, so they ask a specialized server to do it for them.

This specialized server is called a DNS recursive resolver. The resolver’s job is to find the address for a given name, like `2400:cb00:2048:1::c629:d7a2` for cloudflare.com, and return it to the computer that asked for it.

Computers are configured to talk to specific DNS resolvers that are identified by IP addresses. Usually, the configuration is managed by your ISP (like Comcast or AT&T) if you are using your home Internet connection, and by your network administrator if you are connected to the Internet through your office's connection. You can also change the configured DNS resolver your computer talks to yourself, so you can use a different server.

## How do DNS resolvers work?

DNS resolvers know how to find the address of a domain name by working backwards from the top.

Every resolver knows how to find the invisible ‘.’ at the end of domain names (e.g. cloudflare.com.). There are [hundreds of servers](http://www.root-servers.org/) all over the world that host the ‘.’ file. Cloudflare itself hosts [that file](http://www.internic.net/domain/root.zone) on all of its servers around the world through a [partnership with ISC](https://blog.cloudflare.com/f-root/). Resolvers are [hard coded to know the IP addresses](http://www.internic.net/domain/named.root) of those servers.

The resolver asks one of the root servers where to find the next link in the chain, the top-level domain (abbreviated to TLD) or domain ending. An example of a TLD is `.com` or `.org`. Luckily the root servers store the locations of all the TLD servers, so they can return which IP address the DNS resolver should go ask next.

The resolver then asks the TLD’s servers where it can find the domain it is looking for. For example, a resolver might ask `.com` where to find `cloudflare.com`. TLD’s host a file containing the location of every domain using the TLD.

Once the resolver has the final IP address, it returns the answer to the computer that asked.

This whole system is called the Domain Name System (DNS). This system includes the servers that host the information (called authoritative DNS) and the servers that seek the information (the DNS resolvers). DNS is like Google Maps for the Internet. It translates the name of places to addresses so that you can figure out how to get there.

<ButtonGroup>
  <Button type="primary" href="/1.1.1.1/setting-up-1.1.1.1">Set up 1.1.1.1</Button>
  <Button type="secondary" href="/1.1.1.1/what-is-1.1.1.1">Learn more</Button> //change button
</ButtonGroup>

</ContentColumn>