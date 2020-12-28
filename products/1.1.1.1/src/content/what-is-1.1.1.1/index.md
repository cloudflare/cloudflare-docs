---
order: 2
---

# What is 1.1.1.1?

## What is a DNS resolver?

When you request to visit an application like cloudflare.com, your computer needs to know which server to connect you to so that it can load the application. Computers don’t know how to do this name to address translation, so they ask a specialized server to do it for them.

This specialized server is called a DNS recursive resolver. The resolver’s job is to find the address for a given name, like 2400:cb00:2048:1::c629:d7a2 for cloudflare.com, and return it to the computer that asked for it.

Computers are configured to talk to specific DNS resolvers, identified by IP address. Usually the configuration is managed by your ISP (like Comcast or AT&T) if you’re on your home or wireless internet, and by your network administrator if you’re connected to the office internet. You can also change the configured DNS resolver your computer talks to yourself.

## What do DNS resolvers do?

How do resolvers know how to find the address of a domain name? They work backwards from the top.

Every resolver knows how to find the invisible ‘.’ at the end of domain names (e.g. cloudflare.com.). There are [hundreds of servers](http://www.root-servers.org/) all over the world that host the ‘.’ file. Cloudflare itself hosts [that file](http://www.internic.net/domain/root.zone) on all of its servers around the world through a [partnership with ISC](https://blog.cloudflare.com/f-root/). Resolvers are [hard coded to know the IP addresses](http://www.internic.net/domain/named.root) of those servers.

The resolver asks one of the root servers where to find the next link in the chain, the top-level domain (abbreviated to TLD) or domain ending. An example of a TLD is .com or .org. Luckily the root servers store the locations of all the TLD servers, so they can return which IP address the DNS resolver should go ask next.

The resolver then asks the TLD’s servers where it can find the domain it is looking for, for example, a resolver might ask .com where to find cloudflare.com. TLD’s host a file containing the location of every domain using the TLD.

Once the resolver has the final IP address, it returns the answer to the computer that asked.

This whole system - with the servers that host the information (they are called authoritative DNS) and the servers that seek the information (the DNS resolvers) is called the Domain Name System (DNS). DNS is like Google Maps for the internet. It translates the name of places to addresses so that you can figure out how to get there.
