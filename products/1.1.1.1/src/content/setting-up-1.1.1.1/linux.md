---
order: 6
---

# Linux

Follow this quick guide to start using 1.1.1.1 on your Linux device.

## Ubuntu

Step 1: Click System > Preferences > Network Connections.

Step 2: Click on the Wireless tab, then choose the Wi-Fi network you are currently connected to.

Step 3: Click Edit then click IPv4.

Step 4: Change the DNS servers listed to:

```txt
1.1.1.1
1.0.0.1
```

Step 5: Click Apply

Step 6: Then go to IPv6.

Step 7: Add the DNS servers:

```txt
2606:4700:4700::1111
2606:4700:4700::1001
```

Step 8: Click Apply.

## Debian

Step 1: In the command line, type:

```sh
$ sudo vim /etc/resolv.conf
```

Step 2: Replace the nameserver lines with:
(Since you are using vim press the <kbd>i</kbd> key on your keyboard to edit the document)

For IPv4:

```txt
nameserver 1.0.0.1
nameserver 1.1.1.1
```

For IPv6:

```txt
nameserver 2606:4700:4700::1111
nameserver 2606:4700:4700::1001
```

Step 3: Save and exit vim by pressing the <kbd>ESC</kbd> key on your keyboard. Then after lifting the key type `:wq`.
