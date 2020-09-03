---
title: About Magic Transit
alwaysopen: true
weight: 100
hidden: false
---


![Magic Transit deployment diagram](../static/magic-transit-architecture.png)

Magic Transit delivers its connectivity, security, and performance benefits by serving as the “front door” to your IP network. This means it accepts IP packets destined for your network, processes them, and then outputs them to your origin infrastructure.

Traffic is ingested by the Cloudflare Network with Anycast and Border Gateway Protocol (BGP), announcing your company’s IP address space and extending your network presence globally. Today, our Anycast edge network spans 193 cities in more than 90 countries around the world.

Once packets hit our network, traffic is inspected for attacks, filtered, steered, accelerated, and sent onward to the origin. Magic Transit will connect back to your origin infrastructure over Generic Routing Encapsulation (GRE) tunnels, private network interconnects (PNI), or other forms of peering.
