---
pcx_content_type: reference
title: Device compatibility
---

# Device compatibility

Magic WAN is compatible with any device that supports {{<glossary-tooltip term_id="IPsec tunnel">}}IPsec{{</glossary-tooltip>}} with the [supported configuration parameters](/magic-wan/reference/tunnels/#supported-configuration-parameters) or supports {{<glossary-tooltip term_id="GRE tunnel">}}GRE{{</glossary-tooltip>}}.

The matrix below includes example devices and links to the integration guides.

Appliance                                                                                               | GRE tunnel                   | IPsec tunnel
---                                                                                                     | ---                          | ---
[Aruba EdgeConnect](/magic-wan/configuration/manually/third-party/aruba-edgeconnect/)                   | ✅                            | ✅
Cisco ASA                                                                                               | Compatibility on roadmap      | Specifications compatible[^1]
[Cisco IOS XE](/magic-wan/configuration/manually/third-party/cisco-ios-xe/)                             | ✅                            | ✅
[Cisco SD-WAN](/magic-wan/configuration/manually/third-party/viptela/)                                  | ✅                            | ✅
[Fortinet](/magic-wan/configuration/manually/third-party/fortinet/)                                     | Specifications compatible[^1] | ✅
[Furukawa Electric FITELnet](/magic-wan/configuration/manually/third-party/fitelnet/)                   | —                             | ✅
[Palo Alto Networks Next-Generation Firewall](/magic-wan/configuration/manually/third-party/palo-alto/) | ✅                            | ✅
[pfSense](/magic-wan/configuration/manually/third-party/pfsense/)                                       | ✅                            | ✅
Prisma SD-WAN (Palo Alto)                                                                               | Specifications compatible[^1] | Specifications compatible[^1]
Riverbed                                                                                                | Specifications compatible[^1] | Specifications compatible[^1]
[SonicWall](/magic-wan/configuration/manually/third-party/sonicwall/)                                   | —                             | ✅
[Sophos Firewall](/magic-wan/configuration/manually/third-party/sophos-firewall/)                       | ✅                            | ✅
[strongSwan](/magic-wan/configuration/manually/third-party/strongswan/)                                 | —                             | ✅
Velocloud                                                                                               | Compatibility on roadmap      | Compatibility on roadmap
Versa                                                                                                   | Specifications compatible[^1] | Compatibility on roadmap
[VyOS](/magic-wan/configuration/manually/third-party/vyos/)                                             | ✅                            | ✅

VPN                                                                                                     | GRE tunnel                    | IPsec tunnel
---                                                                                                     |---                            |---
[Alibaba Cloud VPN Gateway](/magic-wan/configuration/manually/third-party/alibaba-cloud/)               | —                             | ✅
[Amazon AWS Transit Gateway](/magic-wan/configuration/manually/third-party/aws/)                        | —                             | ✅
[Azure VPN Gateway](/magic-wan/configuration/manually/third-party/azure/)                               | —                             | ✅
[GCP Cloud VPN](/magic-wan/configuration/manually/third-party/google/)                                  | —                             | ✅

[^1]: Specifications compatible per vendor documentation; detailed integration guide coming soon.
