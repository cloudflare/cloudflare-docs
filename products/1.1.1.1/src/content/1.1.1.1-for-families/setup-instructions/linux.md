---
order: 4
---

# Linux setup instructions

## Block malware

### Ubuntu

#### IPv4
1. Click System > Preferences > Network Connections.
1. Click on the Wireless tab, then choose the Wi-Fi network you are currently connected to.
1. Click Edit then click IPv4.
1. Remove any IP addresses that may be already listed and in their place add the following IP addresses:
    * **1.1.1.2**
    * **1.0.0.2**
1. Click Apply

#### IPv6
1. Click System > Preferences > Network Connections.
1. Click on the Wireless tab, then choose the Wi-Fi network you are currently connected to.
1. Then go to IPv6.
1. Add the IPv6 address listed below:
    * **2606:4700:4700::1112**
    * **2606:4700:4700::1002**
1. Click Apply.

### Debian

#### IPv4
1. In the command line, type: `sudo vim /etc/resolv.conf`
1. Replace the nameserver lines with: (Since you are using vim press the <kbd>i</kbd> key on your keyboard to edit the document)
    * **1.1.1.2**
    * **1.0.0.2**
1. Save and exit vim by pressing the <kbd>ESC</kbd> key on your keyboard. Then after lifting the key type `:wq`.

#### IPv6
1. In the command line, type: `sudo vim /etc/resolv.conf`
1. Add the IPv6 address listed below:
    * **2606:4700:4700::1112**
    * **2606:4700:4700::1002**
1. Save and exit vim by pressing the <kbd>ESC</kbd> key on your keyboard. Then after lifting the key type `:wq`

## Block Malware and Adult Content

### Ubuntu

#### IPv4
1. Click System > Preferences > Network Connections.
1. Click on the Wireless tab, then choose the Wi-Fi network you are currently connected to.
1. Click Edit then click IPv4.
1. Remove any IP addresses that may be already listed and in their place add the following IP addresses:
    * **1.1.1.3**
    * **1.0.0.3**
1. Click Apply

#### IPv6
1. Click System > Preferences > Network Connections.
1. Click on the Wireless tab, then choose the Wi-Fi network you are currently connected to.
1. Then go to IPv6.
1. Add the IPv6 address listed below:
    * **2606:4700:4700::1113**
    * **2606:4700:4700::1003**
1. Click Apply.

### Debian

#### IPv4
1. In the command line, type: `sudo vim /etc/resolv.conf`
1. Replace the nameserver lines with: (Since you are using vim press the <kbd>i</kbd> key on your keyboard to edit the document)
    * **1.1.1.3**
    * **1.0.0.3**
1. Save and exit vim by pressing the <kbd>ESC</kbd> key on your keyboard. Then after lifting the key type `:wq`

#### IPv6
1. In the command line, type: `sudo vim /etc/resolv.conf`
1. Add the IPv6 address listed below:
    * **2606:4700:4700::1113**
    * **2606:4700:4700::1003**
1. Save and exit vim by pressing the <kbd>ESC</kbd> key on your keyboard. Then after lifting the key type `:wq`
