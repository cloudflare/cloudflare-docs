---
order:
pcx-content: how-to
---

# Router

Follow these steps to configure 1.1.1.1 for Families:

## Block malware

1. Go to the IP address used to access your router's admin console in your browser.

   * Linksys and Asus routers typically use [http://192.168.1.1](http://192.168.1.1)
   * Netgear routers typically use [http://192.168.0.1](http://192.168.0.1) or [http://192.168.1.1](http://192.168.1.1)
   * D-Link routers typically use [http://192.168.0.1](http://192.168.0.1)
   * Ubiquiti routers typically use [http://unifi.ubnt.com](http://unifi.ubnt.com)

1. Enter the router password.
1. Find the place in the admin console where **DNS settings** are set.
1. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Replace the existing addresses with:

  ```txt
  1.1.1.2
  1.0.0.2
  2606:4700:4700::1112
  2606:4700:4700::1002
  ```

1. Save the updated settings.

## Block Malware and Adult Content

1. Go to the IP address used to access your router's admin console in your browser.
   * Linksys and Asus routers typically use [http://192.168.1.1](http://192.168.1.1)
   * Netgear routers typically use [http://192.168.0.1](http://192.168.0.1) or [http://192.168.1.1](http://192.168.1.1)
   * D-Link routers typically use [http://192.168.0.1](http://192.168.0.1)
   * Ubiquiti routers typically use [http://unifi.ubnt.com](http://unifi.ubnt.com)

1. Enter the router password.
1. Find the place in the admin console where DNS settings are set.
1. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Replace the existing addresses with:

  ```txt
  1.1.1.3
  1.0.0.3
  2606:4700:4700::1113
  2606:4700:4700::1003
  ```

1. Save the updated settings.