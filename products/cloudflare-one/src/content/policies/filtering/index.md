---
order: 0
---

# Secure Web Gateway

With Secure Web Gateway polices, Cloudflare for Teams allows you to set up two types of filtering:

* **DNS filtering:** filtering DNS queries from networks or devices.
* **HTTP filtering:** inspecting and filtering HTTP traffic over port 80 and 443 from enrolled devices. If the HTTP connection is within a TLS connection, the TLS connection will be terminated at Cloudflare Gateway so the HTTP traffic can be inspected (unless an administrator configures a bypass rule).

This section describes how to create both DNS and HTTP policies in Cloudflare for Teams. To review how to connect networks and devices to Cloudflare, check out the [Connections section](/connections).

<DirectoryListing path="/policies/filtering"/>