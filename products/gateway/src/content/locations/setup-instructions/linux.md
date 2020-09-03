---
title: "Linux Setup Instructions"
alwaysopen: true
weight: 4
---

# Ubuntu

## IPv4
* Click System > Preferences > Network Connections.
* Click on the Wireless tab, then choose the Wi-Fi network you are currently connected to.
* Click Edit then click IPv4.
* Remove any IP addresses that may be already listed and in their place add the following IP addresses:
    * **172.64.36.1**
    * **172.64.36.2**
* Click Apply

## IPv6
* Click System > Preferences > Network Connections.
* Click on the Wireless tab, then choose the Wi-Fi network you are currently connected to.
* Then go to IPv6.
* Add the IPv6 address from that we listed based on your location configuration
* Click Apply.

# Debian

## IPv4
* In the command line, type: `sudo vim /etc/resolv.conf`
* Replace the nameserver lines with: (Since you are using vim press the i key on your keyboard to edit the document)
    * **172.64.36.1**
    * **172.64.36.2**
* Save and exit vim by pressing the ESC key on your keyboard. Then after lifting the key type `:wq`

## IPv6
* In the command line, type: `sudo vim /etc/resolv.conf`
* Add the IPv6 address from that we listed based on your location configuration
* Save and exit vim by pressing the ESC key on your keyboard. Then after lifting the key type `:wq`
