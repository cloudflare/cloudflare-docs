---
pcx_content_type: reference
title: Device compatibility
---

# Device compatibility

Magic WAN is compatible with any device that supports IPsec with the [supported configuration parameters](/magic-wan/reference/tunnels/#supported-configuration-parameters) or supports GRE.

The matrix below includes example devices and links to the integration guides.

Appliance                                                                        | GRE tunnel                   | IPsec tunnel
-------------------------------------------------------------------------------- | ---------------------------- | ---
[Aruba EdgeConnect](/magic-wan/third-party/aruba-edgeconnect/)                   | ✅                            | ✅
Cisco ASA                                                                        | Compatibility on roadmap      | Specifications compatible[^1]
[Cisco IOS XE](/magic-wan/third-party/cisco-ios-xe/)                             | ✅                            | ✅
Cisco Meraki                                                                     | Compatibility on roadmap      | Specifications compatible[^1]
[Cisco SD-WAN](/magic-wan/third-party/viptela/)                                  | ✅                            | ✅
[Fortinet](/magic-wan/third-party/fortinet/)                                     | Specifications compatible[^1] | ✅
[Furukawa Electric FITELnet](/magic-wan/third-party/fitelnet/)                   | —                             | ✅
[Palo Alto Networks Next-Generation Firewall](/magic-wan/third-party/palo-alto/)                     | ✅                            | ✅
[pfSense](/magic-wan/third-party/pfsense/)                                       | ✅                            | ✅
Prisma SD-WAN (Palo Alto)                                                        | Specifications compatible[^1] | Specifications compatible[^1]
Riverbed                                                                         | Specifications compatible[^1] | Specifications compatible[^1]
[SonicWall](/magic-wan/third-party/sonicwall/)                                   | —                             | ✅
[Sophos Firewall](/magic-wan/third-party/sophos-firewall/)                       | ✅                            | ✅
[strongSwan](/magic-wan/third-party/strongswan/)                                 | —                             | ✅
Velocloud                                                                        | Compatibility on roadmap      | Compatibility on roadmap
Versa                                                                            | Specifications compatible[^1] | Compatibility on roadmap
[VyOS](/magic-wan/third-party/vyos/)                                             | ✅                            | ✅

VPN                                                                 | GRE tunnel               | IPsec tunnel 
------------------------------------------------------------------- |--------------------------|---
[Alibaba Cloud VPN Gateway](/magic-wan/third-party/alibaba-cloud/)  | —                        | ✅
[Amazon AWS Transit Gateway](/magic-wan/third-party/aws/)           | —                        | ✅
Azure VPN Gateway                                                   | Compatibility on roadmap | Specifications compatible[^1]
GCP Cloud VPN                                                       | Compatibility on roadmap | Specifications compatible[^1]

[^1]: Specifications compatible per vendor documentation; detailed integration guide coming soon.