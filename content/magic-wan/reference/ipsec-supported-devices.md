---
pcx-content-type: reference
title: Supported IPsec devices
---

# Supported IPsec devices

| Appliance                                                     |  GRE tunnel    |  IPsec tunnel  |
|---------------------------------------------------------------|----------------|----------------|
| [Aruba EdgeConnect](/magic-wan/tutorials/aruba-edgeconnect)   |   ✅           |    ✅           |
| [Cisco Viptela](/magic-wan/tutorials/viptela)                 |   ✅           |    ✅           |
| Cisco Meraki                                                  |   Compatibility on roadmap | Compatibility on roadmap   |
| Cisco ASA                                                     |   Compatibility on roadmap | Compatibility on roadmap   |
| Fortinet                                   |   Specifications compatible* | Specifications compatible*   |
| Prisma SD-WAN (Palo Alto)                  |   Specifications compatible* | Specifications compatible*   |
| Riverbed                 |   Specifications compatible* | Specifications compatible*   |
| [strongSwan](/magic-wan/tutorials/strongswan)            |  –  |  ✅  |
| Velocloud                |   Compatibility on roadmap | Compatibility on roadmap    |
| Versa                    |   Specifications compatible* | Compatibility on roadmap  | 
| [VyOS](/magic-wan/tutorials/vyos)          |  –  |  ✅ |

| VPN        | GRE tunnel  |  IPsec tunnel |
|------------------|-------------|---------------|
| AWS VPN  |   Specifications compatible*  | Incompatible natively.</br> **Workaround:** Set up VM as an IPSec tunnel endpoint with replay protection disabled.|
| Azure VPN Gateway    | Compatibility on roadmap  | Specifications compatible* |
| GCP Cloud VPN        | Specifications compatible* | Incompatible natively. </br> **Workaround:** Set up VM as an IPSec tunnel endpoint with replay protection disabled) |


\* Specifications compatible per vendor documentation; detailed integration guide coming soon.