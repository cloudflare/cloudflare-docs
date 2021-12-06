---
order:
title: Router
pcx-content-type: how-to
---

# Set up 1.1.1.1 for Families - Router

Follow these steps to configure 1.1.1.1 for Families:

## Block malware

1. Go to the IP address used to access your router's admin console in your browser.
   * Linksys and Asus routers typically use [http://192.168.1.1](http://192.168.1.1) or [http://router.asus.com](http://router.asus.com) (for ASUS).
   * Netgear routers typically use [http://192.168.1.1](http://192.168.1.1) or [http://routerlogin.net](http://routerlogin.net).
   * D-Link routers typically use [http://192.168.0.1](http://192.168.0.1).
   * Ubiquiti routers typically use [http://unifi.ubnt.com](http://unifi.ubnt.com).

1. Enter the router credentials. For consumer routers, the default credentials for the admin console are often found under or behind the device.
1. In the admin console, find the place where **DNS settings** are set. This may be contained within categories such as **WAN** and **IPv6** (Asus Routers) or **Internet** (Netgear Routers). Consult your router's documentation for details.
1. Take note of any IP addresses that are currently set and save them in a safe place in case you need to use them later.
1. For **IPv4**, replace the existing addresses with:

  ```txt
  1.1.1.2
  1.0.0.2
  ```
  
 1. For **IPv6**, replace the existing addresses with:
  
   ```txt
  2606:4700:4700::1112
  2606:4700:4700::1002
  ```

1. Save the updated settings.

## Block Malware and Adult Content

1. Go to the IP address used to access your router's admin console in your browser.
   * Linksys and Asus routers typically use [http://192.168.1.1](http://192.168.1.1) or [http://router.asus.com](http://router.asus.com) (for ASUS)
   * Netgear routers typically use [http://192.168.1.1](http://192.168.1.1) or [http://routerlogin.net](http://routerlogin.net)
   * D-Link routers typically use [http://192.168.0.1](http://192.168.0.1)
   * Ubiquiti routers typically use [http://unifi.ubnt.com](http://unifi.ubnt.com)

1. Enter the router credentials. For consumer routers, the default credentials for the admin console are often found under or behind the device.
1. In the admin console, find the place where **DNS settings** are set. This may be contained within categories such as **WAN** and **IPv6** (Asus Routers) or **Internet** (Netgear Routers). Consult your router's documentation for details.
1. Take note of any IP addresses that are currently set and save them in a safe place in case you need to use them later.
1. For **IPv4**, replace the existing addresses with:

  ```txt
  1.1.1.3
  1.0.0.3
  ```
  
 1. For **IPv6**, replace the existing addresses with:
  
   ```txt
  2606:4700:4700::1113
  2606:4700:4700::1003
  ```

1. Save the updated settings.