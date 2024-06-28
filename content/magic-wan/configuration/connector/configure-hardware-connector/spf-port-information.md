---
pcx_content_type: reference
title: SFP+ port information
---

# SFP+ port information

The hardware version of the Magic WAN connector includes two [SFP+ ports](https://en.wikipedia.org/wiki/Small_Form-factor_Pluggable) that support 10G throughput. These ports can be configured as either a WAN or a LAN port, like all of the 1G RJ45 ports in the machine. Because a 10G WAN uplink will often be bottlenecked by IPsec tunnel speeds, the SFP+ ports are most useful for configuring high speed LANs, and for using fiber connections.

{{<Aside type="note" header="Virtual Connector and SFP+ ports">}}Since you decide and set up the hardware where Magic WAN Virtual Connector runs, you can ignore the information on this page.{{</Aside>}}

## Port configuration

SFP+ ports are next to the regular LAN ports. They are represented as follows in the dashboard:
- SFP+ **port 1** is represented by **port 7** in the dashboard
- SFP+ **port 2** is represented by **port 8** in the dashboard

![The left port, SFP+ 1, is port 7. The right port, SFP+ 2, is port 8.](/images/magic-wan/connector/spf-ports.png)

_The left port, SFP+ 1, is port 7. The right port, SFP+ 2, is port 8._

## SFP+ module compatibility

The Magic WAN Connector only supports 10Gbps SFP+ modules, including RJ45, DAC, and fiber, among others. Many 1 Gbps modules are incompatible with the Intel driver used internally, and thus are not supported.

Cloudflare supports the following SFP+ inputs:
- 10 Gbps Intel-compatible optics using 10GBase-SR, LR, ER. This includes Intel-compatible active optical cables (AOC) cables at 10 Gbps.
- 10 Gbps DAC Twinax cables, compatible with SFF-8431 v4.1 and SFF-8472 v10.4
- 10GBASE-T RJ45 converter modules

Cloudflare successfully deployed commonly available 10G modules that are also compatible across many vendors:
- StarTech Dell EMC Twinax SFP+ DAC
- Ubiquiti multi-mode, duplex, 10 Gbps fiber transceiver modules

Keep in mind that SFP+ modules/cables have to be compatible at both ends, that is, both sides of the connection should be 10 Gbps, and it should really be the same module/cable that is compatible with both hardware stacks. The choice of module/optic/cable ultimately depends on your specific interoperability needs, and it is much less of a “plug and play” situation as one expects from RJ45.

## Recover from unsupported SFP+ inputs

SFP+ modules should be installed and tested prior to deploying a Connector into production usage.

An unsupported SFP+ input is indicated by the interface failing to come up (that is, the Connector has no status lights), and also by the port (7 or 8) going offline until the hardware is rebooted.

When an unsupported module is plugged, the module should be removed and then the Connector rebooted by removing power for five seconds. The module should not remain plugged during reboot, or the Connector will have to be rebooted again after the module is removed.