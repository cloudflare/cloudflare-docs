---
order: 0
---

# Secure Web Gateway

Gateway polices filter DNS requests and HTTP traffic to the Internet.

Cloudflare Gateway filters traffic in two modes:

* **DNS filtering:** Filter DNS queries from networks or devices.
* **HTTP filtering:** Inspect and filter HTTP traffic over port 80 and 443 from enrolled devices. If the HTTP connection is within a TLS connection, the TLS connection will be terminated at Cloudflare Gateway so the HTTP traffic can be inspected (unless an administrator configures a bypass rule).

This section describes how to create DNS and HTTP policies in Cloudflare for Teams. You can review how to connect networks and devices to Cloudflare in the [Connections section](/connections)

<DirectoryListing path="/policies/filtering"/>