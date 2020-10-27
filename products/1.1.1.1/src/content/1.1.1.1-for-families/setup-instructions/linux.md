---
order: 4
---

# Linux setup instructions

## Block malware

### Ubuntu

#### IPv4
* Click System > Preferences > Network Connections.
* Click on the Wireless tab, then choose the Wi-Fi network you are currently connected to.
* Click Edit then click IPv4.
* Remove any IP addresses that may be already listed and in their place add the following IP addresses:
    * **1.1.1.2**
    * **1.0.0.2**
* Click Apply

#### IPv6
* Click System > Preferences > Network Connections.
* Click on the Wireless tab, then choose the Wi-Fi network you are currently connected to.
* Then go to IPv6.
* Add the IPv6 address listed below:
    * **2606:4700:4700::1112**
    * **2606:4700:4700::1002**
* Click Apply.

### Debian

#### IPv4
* In the command line, type: `sudo vim /etc/resolv.conf`
* Replace the nameserver lines with: (Since you are using vim press the <kbd>i</kbd> key on your keyboard to edit the document)
    * **1.1.1.2**
    * **1.0.0.2**
* Save and exit vim by pressing the <kbd>ESC</kbd> key on your keyboard. Then after lifting the key type `:wq`.

#### IPv6
* In the command line, type: `sudo vim /etc/resolv.conf`
* Add the IPv6 address listed below:
    * **2606:4700:4700::1112**
    * **2606:4700:4700::1002**
* Save and exit vim by pressing the <kbd>ESC</kbd> key on your keyboard. Then after lifting the key type `:wq`

## Block Malware and Adult Content

### Ubuntu

#### IPv4
* Click System > Preferences > Network Connections.
* Click on the Wireless tab, then choose the Wi-Fi network you are currently connected to.
* Click Edit then click IPv4.
* Remove any IP addresses that may be already listed and in their place add the following IP addresses:
    * **1.1.1.3**
    * **1.0.0.3**
* Click Apply

#### IPv6
* Click System > Preferences > Network Connections.
* Click on the Wireless tab, then choose the Wi-Fi network you are currently connected to.
* Then go to IPv6.
* Add the IPv6 address listed below:
    * **2606:4700:4700::1113**
    * **2606:4700:4700::1003**
* Click Apply.

### Debian

#### IPv4
* In the command line, type: `sudo vim /etc/resolv.conf`
* Replace the nameserver lines with: (Since you are using vim press the <kbd>i</kbd> key on your keyboard to edit the document)
    * **1.1.1.3**
    * **1.0.0.3**
* Save and exit vim by pressing the <kbd>ESC</kbd> key on your keyboard. Then after lifting the key type `:wq`

#### IPv6
* In the command line, type: `sudo vim /etc/resolv.conf`
* Add the IPv6 address listed below:
    * **2606:4700:4700::1113**
    * **2606:4700:4700::1003**
* Save and exit vim by pressing the <kbd>ESC</kbd> key on your keyboard. Then after lifting the key type `:wq`
