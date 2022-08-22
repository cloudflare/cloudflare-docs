---
pcx_content_type: reference
title: Peering
weight: 5
---

# Peering

If you are running an IPFS node that serves many requests - like a public HTTP gateway - you may be able to speed up queries by maintaining long-lived connections to nodes that provide a large volume of data.

This process is known as **Peering** and you can tell IPFS to prioritize Cloudflare's peers by editing the Peering configuration in your IPFS config file.

```json
{
  "Peering": {
    "Peers": [
      {
        "ID": "QmcFf2FH3CEgTNHeMRGhN7HNHU1EXAxoEk6EFuSyXCsvRE",
        "Addrs": [
          "/dnsaddr/node-1.ingress.cloudflare-ipfs.com"
        ]
      },
      {
        "ID": "QmcFmLd5ySfk2WZuJ1mfSWLDjdmHZq7rSAua4GoeSQfs1z",
        "Addrs": [
          "/dnsaddr/node-2.ingress.cloudflare-ipfs.com"
        ]
      },
      {
        "ID": "QmcfFmzSDVbwexQ9Au2pt5YEXHK5xajwgaU6PpkbLWerMa",
        "Addrs": [
          "/dnsaddr/node-3.ingress.cloudflare-ipfs.com"
        ]
      },
      {
        "ID": "QmcfJeB3Js1FG7T8YaZATEiaHqNKVdQfybYYkbT1knUswx",
        "Addrs": [
          "/dnsaddr/node-4.ingress.cloudflare-ipfs.com"
        ]
      },
      {
        "ID": "QmcfVvzK4tMdFmpJjEKDUoqRgP4W9FnmJoziYX5GXJJ8eZ",
        "Addrs": [
          "/dnsaddr/node-5.ingress.cloudflare-ipfs.com"
        ]
      },
      {
        "ID": "QmcfZD3VKrUxyP9BbyUnZDpbqDnT7cQ4WjPP8TRLXaoE7G",
        "Addrs": [
          "/dnsaddr/node-6.ingress.cloudflare-ipfs.com"
        ]
      },
      {
        "ID": "QmcfZP2LuW4jxviTeG8fi28qjnZScACb8PEgHAc17ZEri3",
        "Addrs": [
          "/dnsaddr/node-7.ingress.cloudflare-ipfs.com"
        ]
      },
      {
        "ID": "QmcfgsJsMtx6qJb74akCw1M24X1zFwgGo11h1cuhwQjtJP",
        "Addrs": [
          "/dnsaddr/node-8.ingress.cloudflare-ipfs.com"
        ]
      },
      {
        "ID": "Qmcfr2FC7pFzJbTSDfYaSy1J8Uuy8ccGLeLyqJCKJvTHMi",
        "Addrs": [
          "/dnsaddr/node-9.ingress.cloudflare-ipfs.com"
        ]
      },
      {
        "ID": "QmcfR3V5YAtHBzxVACWCzXTt26SyEkxdwhGJ6875A8BuWx",
        "Addrs": [
          "/dnsaddr/node-10.ingress.cloudflare-ipfs.com"
        ]
      },
      {
        "ID": "Qmcfuo1TM9uUiJp6dTbm915Rf1aTqm3a3dnmCdDQLHgvL5",
        "Addrs": [
          "/dnsaddr/node-11.ingress.cloudflare-ipfs.com"
        ]
      },
      {
        "ID": "QmcfV2sg9zaq7UUHVCGuSvT2M2rnLBAPsiE79vVyK3Cuev",
        "Addrs": [
          "/dnsaddr/node-12.ingress.cloudflare-ipfs.com"
        ]
      }
    ]
  }
}
```