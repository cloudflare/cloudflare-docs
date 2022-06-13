---
pcx-content-type: reference
title: Supported IPsec devices
---

# Supported IPsec devices

| Appliance                                                     |  GRE tunnel    |  IPsec tunnel  |
|---------------------------------------------------------------|----------------|----------------|
| [Aruba EdgeConnect](/magic-wan/tutorials/aruba-edgeconnect)   |   ✅           |    ✅           |
| [Cisco Viptela](/magic-wan/tutorials/viptela)                 |   ✅           |    ✅           |
| Cisco Meraki                                                  |   Incompatible | Incompatible   |
| Cisco ASA                                                     |   Incompatible | Incompatible   |
| Fortinet                                   |   Specifications compatible* | Specifications compatible*   |
| Prisma SD-WAN (Palo Alto)                  |   Specifications compatible* | Specifications compatible*   |
| Riverbed                 |   Specifications compatible* | Specifications compatible*   |
| [stongSwan](/magic-wan/tutorials/strongswan)            |  –  |  ✅  |
| Velocloud                |   Incompatible | Incompatible    |
| Versa                    |   Specifications compatible* | Incompatible  | 
| [VyOS](/magic-wan/tutorials/vyos)          |  –  |  ✅ |

| VPN        | GRE tunnel  |  IPsec tunnel |
|------------------|-------------|---------------|
| AWS VPN  |   Specifications compatible*  | Incompatible natively.</br> **Workaround:** Set up VM as an IPSec tunnel endpoint with replay protection disabled.|
| Azure VPN Gateway    | Incompatible  | Specifications compatible* |
| GCP Cloud VPN        | Specifications compatible* | Incompatible natively. </br> **Workaround:** Set up VM as an IPSec tunnel endpoint with replay protection disabled) |


\* Specifications compatible per vendor documentation; testing and verification pending.