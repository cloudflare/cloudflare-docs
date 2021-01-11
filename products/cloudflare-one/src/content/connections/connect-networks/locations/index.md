---
order: 2
---

# Locations

Locations are usually physical entities like offices, homes, retail stores, movie theatres, or data centers. The fastest way to start sending DNS queries from a location and protect it from security threats is by changing the DNS resolvers at the router to the dedicated IPv6 addresses for those locations.

If you don’t have IPv6 network, you can set up a location by adding the source IP for the location and changing the DNS resolvers to:

* **172.64.36.1**
* **172.64.36.2**

If you want to send your DNS queries over an encrypted connection, you can use the hostname that we provide in the dashboard to send queries using DNS over HTTPS.

* [Configuring a location](/locations/configuring-a-location)
* [Setup instructions](/locations/setup-instructions)


## How Gateway matches queries to locations

Gateway uses different ways to match a DNS query to locations depending on the type of request and network. This is how Gateway determines the location of a DNS query:

![Determine location](../../../static/documentation/policies/gateway-determine-location-dns.png)

1. **Step 1**: Gateway checks whether the query was sent using DNS over HTTPS. If yes, Gateway looks up the location by its unique hostname. 

2. **Step 2**: if the query wasn't sent with DNS over HTTPS, Gateway checks whether it was sent over IPv4. If yes, it looks up the location by the source IPv4 address.

3. **Step 3**: If the query wasn't sent over IPv4, it means it was sent over IPv6. Gateway will look up the location associated with the DNS query based on the destination IPv6 address. 