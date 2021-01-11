---
order: 3
---

# Determining a location

Gateway uses different ways to match a DNS query to locations depending on the type of request and network. This is how Gateway determines the location of a DNS query:

![Determine location](../../../static/documentation/policies/gateway-determine-location-dns.png)

1. **Step 1**: Gateway checks whether the query was sent using DNS over HTTPS. If yes, Gateway looks up the location by its unique hostname. 

2. **Step 2**: if the query wasn't sent with DNS over HTTPS, Gateway checks whether it was sent over IPv4. If yes, it looks up the location by the source IPv4 address.

3. **Step 3**: If the query wasn't sent over IPv4, it means it was sent over IPv6. Gateway will look up the location associated with the DNS query based on the destination IPv6 address. 
