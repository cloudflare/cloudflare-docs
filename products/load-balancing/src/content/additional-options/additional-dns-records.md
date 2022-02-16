---
title: Additional DNS records
pcx-content-type: configuration
---

# Load balance additional DNS records

In addition to load balancing between DNS records used for IP resolution — **A**, **AAAA**, and **CNAME** records — Enterprise customers can also load balance between **MX**, **SRV**, and **TXT** records.

## MX records

To load balance between multiple mail servers:

1. Make sure you have the [required DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/email-records#add-mx-records) for your mail servers.
1. [Create a monitor](/how-to/create-monitor) with a **Type** of *SMTP*.
1. [Create a pool](/how-to/create-pool) with your mail servers and attach the newly created monitor.
1. [Create a load balancer](/how-to/create-load-balancer) that includes your newly created pools. Since it will forward SMTP traffic, the load balancer should be [unproxied (DNS-only)](/understand-basics/proxy-modes#gray-clouded-dns-only-load-balancing).

## SRV records

To load balance between different **SRV** records, which contain significantly more information than many other DNS records:

1. [Create your SRV records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records#create-dns-records).
1. [Create a monitor](/how-to/create-monitor) with a **Type** of *UDP-ICMP* or *TCP*.
1. [Create a pool](/how-to/create-pool) with your various SRV records and attach the newly created monitor.
1. [Create a load balancer](/how-to/create-load-balancer) that includes your newly created pools. This load balancer should be [unproxied (DNS-only)](/understand-basics/proxy-modes#gray-clouded-dns-only-load-balancing).