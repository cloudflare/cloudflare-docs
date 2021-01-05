---
order: 0
---

# Filtering

Gateway policies allow you to grant or deny your users access to specific domains or domain categories. If the WARP client is configured to send DNS requests over DoH to Gateway, the DNS queries are evaluated against content and security policies configured for the organization. If the domain is allowed, the client receives the DNS resolution and initiates an HTTP connection.

Cloudflare Gateway currently filters HTTP traffic over port 80 and 443. If the HTTP connection is within a TLS connection, the TLS connection will be terminated at Cloudflare Gateway so the HTTP traffic can be inspected (unless an administrator configures a bypass rule). If the HTTP connection does not violate any policies configured by an administrator, the traffic is allowed through to the origin server.

<DirectoryListing path="/policies/filtering"/>