---
order:
pcx-content-type: navigation
---

# DNS over HTTPS

With DoH, DNS queries and responses are encrypted and sent via the HTTP or HTTP/2 protocols. DoH ensures that attackers can't forge or alter DNS traffic. DoH uses port 443, which is the standard HTTPS traffic port, to wrap the DNS query in an HTTPS request. DNS queries and responses are camouflaged within other HTTPS traffic, since it all comes and goes from the same port.

<DirectoryListing path="/encrypted-dns/dns-over-https"/>
