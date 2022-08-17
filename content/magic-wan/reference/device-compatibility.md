---
pcx_content_type: reference
title: Device compatibility
---

# Device compatibility

Magic WAN is compatible with any device that supports IPsec with the [supported configuration parameters](/magic-wan/how-to/ipsec/#supported-configuration-parameters) or supports GRE.

The matrix below includes example devices and links to the integration guides.

| Appliance                                                     |  GRE tunnel    |  IPsec tunnel  |
|---------------------------------------------------------------|----------------|----------------|
| [Aruba EdgeConnect](/magic-wan/tutorials/aruba-edgeconnect)   |   ✅           |    ✅           |
| [Cisco Viptela](/magic-wan/tutorials/viptela)                 |   ✅           |    ✅           |
| Cisco Meraki                                                  |   Compatibility on roadmap | Compatibility on roadmap   |
| Cisco ASA                                                     |   Compatibility on roadmap | Specifications compatible*   |
| Fortinet                                   |   Specifications compatible* | Specifications compatible*   |
| [pfSense](/magic-wan/tutorials/pfsense)                       |   ✅           |    ✅           |
| Prisma SD-WAN (Palo Alto)                  |   Specifications compatible* | Specifications compatible*   |
| Riverbed                 |   Specifications compatible* | Specifications compatible*   |
| [strongSwan](/magic-wan/tutorials/strongswan)            |  –  |  ✅  |
| Velocloud                |   Compatibility on roadmap | Compatibility on roadmap    |
| Versa                    |   Specifications compatible* | Compatibility on roadmap  | 
| [VyOS](/magic-wan/tutorials/vyos)          |  –  |  ✅ |

| VPN               | GRE tunnel                  |  IPsec tunnel |
|-------------------|-----------------------------|---------------|
| AWS VPN           | Compatibility on roadmap    | Incompatible natively.</br> **Workaround:** Set up VM as an IPSec tunnel endpoint with replay protection** disabled.|
| Azure VPN Gateway | Compatibility on roadmap    | Specifications compatible* |
| GCP Cloud VPN     | Compatibility on roadmap    | Incompatible natively. </br> **Workaround:** Set up VM as an IPSec tunnel endpoint with replay protection** disabled |


\* Specifications compatible per vendor documentation; detailed integration guide coming soon.</br>
\** For more information about replay attacks and anti-replay protection, refer to [Anti-replay protection](/magic-wan/reference/anti-replay-protection/).
