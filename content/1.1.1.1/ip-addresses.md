---
weight: 2
pcx_content_type: reference
title: IP addresses
meta:
  description: Get IPv4 and IPv6 addresses for Cloudflare DNS resolvers, 1.1.1.1 and 1.1.1.1 for Families.
---

# 1.1.1.1 IP addresses

Consider the tables below to know which IPv4 or IPv6 addresses are used by the different Cloudflare DNS resolver offerings.

For detailed guidance refer to [Set up](/1.1.1.1/setup/).

---

## 1.1.1.1

1.1.1.1 is Cloudflare’s public DNS resolver. It offers a fast and private way to browse the Internet.

|       IPv4      |                    IPv6                   |
| --------------- | ----------------------------------------- |
| `1.1.1.1` <br/>`1.0.0.1` | `2606:4700:4700::1111` <br/>`2606:4700:4700::1001` |

Refer to [Encryption](/1.1.1.1/encryption/) to learn how to use 1.1.1.1 in an encrypted way.

---

## 1.1.1.1 for Families

{{<render file="_for-families-intro.md" >}} <br />

For more information, refer to [1.1.1.1 for Families set up](/1.1.1.1/setup/#1111-for-families).

### Block malware

|  IPv4            | IPv6                                      |
| -----------------|-------------------------------------------|
|  `1.1.1.2` <br/>`1.0.0.2` | `2606:4700:4700::1112` <br/>`2606:4700:4700::1002` |


### Block malware and adult content

|  IPv4            | IPv6                                      |
| -----------------|-------------------------------------------|
|  `1.1.1.3` <br/>`1.0.0.3` | `2606:4700:4700::1113` <br/>`2606:4700:4700::1003` |