---
_build:
  publishResources: false
  render: never
  list: never
---

Virtual networks allow you to connect private networks that have overlapping IP ranges without creating conflicts for users or services. For example, an organization may want to expose two distinct virtual private cloud (VPC) networks which they consider to be “production” and “staging”. However, if the two private networks happened to receive the same RFC 1918 IP assignment, there may be two different resources with the same IP address. By creating two separate virtual networks, you can deterministically route traffic to duplicative private addresses like `10.128.0.1/32` staging and `10.128.0.1/32` production. These virtual networks will appear as user-selectable options within the WARP client GUI.