---
title: Additional DNS records
pcx-content-type: configuration
meta:
  title: Load balance additional DNS records
---

# Load balance additional DNS records

In addition to load balancing between DNS records used for IP resolution — `A`, `AAAA`, and `CNAME` records — Enterprise customers can also load balance between **MX**, **SRV**, and **TXT** records.

## MX records

To load balance between multiple mail servers:

1.  Make sure you have the [required DNS records](/dns/manage-dns-records/how-to/email-records/#add-mx-records) for your mail servers.
2.  [Create a monitor](/load-balancing/how-to/create-monitor/) with a **Type** of _SMTP_.
3.  [Create a pool](/load-balancing/how-to/create-pool/) with your mail servers and attach the newly created monitor.
4.  [Create a load balancer](/load-balancing/how-to/create-load-balancer/) that includes your newly created pools. Since it will forward SMTP traffic, the load balancer should be [unproxied (DNS-only)](/load-balancing/understand-basics/proxy-modes/#gray-clouded-dns-only-load-balancing).

## SRV records

To load balance between different **SRV** records, which contain significantly more information than many other DNS records:

1.  [Create your SRV records](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records).
2.  [Create a monitor](/load-balancing/how-to/create-monitor/) with a **Type** of _UDP-ICMP_ or _TCP_.
3.  [Create a pool](/load-balancing/how-to/create-pool/) with your various SRV records and attach the newly created monitor.
4.  [Create a load balancer](/load-balancing/how-to/create-load-balancer/) that includes your newly created pools. This load balancer should be [unproxied (DNS-only)](/load-balancing/understand-basics/proxy-modes/#gray-clouded-dns-only-load-balancing).
