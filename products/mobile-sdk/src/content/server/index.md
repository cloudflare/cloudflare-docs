---
title: Server-Side Configuration
hidden: true
---

## Introduction ##

This document contains information about server-side considerations when working with the Neumob service.

## Request Filters ##

Typically the only change required on the server-side to enable the Neumob service is allowing any Neumob servers to make requests to your origin or CDN. There are two ways to do this, with a strong recommendation for the first approach.

### Neumob Headers ###

With Neumob SDK version 3.2.4+ (iOS) and 3.2.7+ (Android), the Neumob SDK adds a custom header to all requests sent through the Neumob Acceleration Network. The custom header is called "X-Neumob" with a base-64 encoded hash of the app client key.

**Requests with the "X-Neumob" header should be allowed through existing filters.**

An example Neumob custom header can be found below.

    X-Neumob: 7LE++QCMeQmJmxg/eqtZvz/tcDE=

### IP Addresses ###

**PLEASE NOTE THAT OUR IP ADDRESS LIST CHANGES OFTEN!**

It is *strongly* encouraged to filter based on HTTP header as listed above rather than IP address, but it is understood that sometimes this is not possible,
so Neumob makes available a real-time list of IP blocks and addresses used at every Point of Presence (PoP) within the Neumob Global Network.
These can be found by navigating to the following web address, which requires a portal account: `https://portal.neumob.com/v2s/ip-addresses <https://portal.neumob.com/v2s/ip-addresses>`_

## Monitoring with Neumob ##

The Neumob SDK uses a UDP-based custom protocol to provide acceleration over the "mobile" mile.
As a result, any monitor that tracks http/https over TCP will not see accelerated traffic between the device and Neumob's proxy service.
An example of one is Charles Proxy, but also packet analyzers like Wireshark will not be able to parse Neumob packets above the IP layer.

Neumob does, however, provide metrics and charting capabilities of its own, including by site, country, app version, network carrier, etc.
1. simple guide is here:  `Portal Brochure <http://resources.neumob.com/hubfs/resources/Neumob_Brochure_-_Portal.pdf>`_

## Other Notes ##

### NeumobBot ###

Neumob uses real-time measurements from our servers to find the best path to fetch content.
These measurements will be visible to your existing monitors.
1. distributed network of agents with User-Agent = NeumobBot are used to conduct these measurements, so they can be ignored.
   The rate of NeumobBot UDP requests is once per pop, per domain, per hour. This rate does not increase with traffic.

### Client IP Address ###

Neumob passes the mobile client's IP address in one place.

    X-Forwarded-For: 1.1.1.1
