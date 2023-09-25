---
pcx_content_type: reference
title: Device compatibility
---

# Device compatibility

Magic WAN is compatible with any device that supports IPsec with the [supported configuration parameters](/magic-wan/reference/tunnels/#supported-configuration-parameters) or supports GRE.

The matrix below includes example devices and links to the integration guides.

Appliance                                                           | GRE tunnel                 | IPsec tunnel
--------------------------------------------------------------- | --------------------------- | ---
[Aruba EdgeConnect](/magic-wan/third-party/aruba-edgeconnect/)  | ✅                          | ✅
Cisco ASA                                                       | Compatibility on roadmap    | Specifications compatible*
[Cisco IOS XE](/magic-wan/third-party/cisco-ios-xe/)            | ✅                          | ✅
Cisco Meraki                                                    | Compatibility on roadmap    | Specifications compatible*
[Cisco SD-WAN](/magic-wan/third-party/viptela/)                 | ✅                          | ✅
[Fortinet](/magic-wan/third-party/fortinet/)                    | Specifications compatible*  | ✅
[Furukawa Electric FITELnet](/magic-wan/third-party/fitelnet/)  | -                           | ✅
[PAN-OS](/magic-wan/third-party/palo-alto/)                     | ✅                          | ✅
[pfSense](/magic-wan/third-party/pfsense/)                      | ✅                          | ✅
Prisma SD-WAN (Palo Alto)                                       | Specifications compatible*  | Specifications compatible*
Riverbed                                                        | Specifications compatible*  | Specifications compatible*
[SonicWall](/magic-wan/third-party/sonicwall/)                  | -                           | ✅
[Sophos Firewall](/magic-wan/third-party/sophos-firewall/)      | ✅                          | ✅
[strongSwan](/magic-wan/third-party/strongswan/)                | –                           | ✅
Velocloud                                                       | Compatibility on roadmap    | Compatibility on roadmap
Versa                                                           | Specifications compatible*  | Compatibility on roadmap
[VyOS](/magic-wan/third-party/vyos/)                            | ✅                          | ✅

VPN                                                                 | GRE tunnel               | IPsec tunnel 
------------------------------------------------------------------- |--------------------------|---
[Alibaba Cloud VPN Gateway](/magic-wan/third-party/alibaba-cloud/)  | -                        | ✅
[Amazon AWS Transit Gateway](/magic-wan/third-party/aws/)           | -                        | ✅
Azure VPN Gateway                                                   | Compatibility on roadmap | Specifications compatible*.
GCP Cloud VPN                                                       | Compatibility on roadmap | Specifications compatible*.


\* Specifications compatible per vendor documentation; detailed integration guide coming soon.</br>
\** For more information about replay attacks and anti-replay protection, refer to [Anti-replay protection](/magic-wan/reference/anti-replay-protection/).
