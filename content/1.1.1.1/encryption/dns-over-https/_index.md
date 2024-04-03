---
pcx_content_type: reference
title: DNS over HTTPS
---

# DNS over HTTPS

With DNS over HTTPS (DoH), DNS queries and responses are encrypted and sent via the HTTP or HTTP/2 protocols. DoH ensures that attackers cannot forge or alter DNS traffic. DoH uses port 443, which is the standard HTTPS traffic port, to wrap the DNS query in an HTTPS request. DNS queries and responses are camouflaged within other HTTPS traffic, since it all comes and goes from the same port.

{{<directory-listing>}}
