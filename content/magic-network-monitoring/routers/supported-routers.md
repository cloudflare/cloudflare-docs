---
title: Supported routers
pcx_content_type: reference
weight: 1
meta:
    description: A list of open source, NetFlow, and sFlow routers.
---

# Supported routers

The majority of enterprise-grade routers are capable of exporting NetFlow or sFlow, and popular router brands that support either NetFlow or sFlow are listed below.

Relatively few consumer grade routers are capable of exporting NetFlow or sFlow. If you are a network hobbyist, business, or other organization, and your router options are limited, you can view the list of open source and affordable options below.

{{<Aside type="note" header="Note:">}}

These lists are not exhaustive, and we encourage you to check your router’s specification sheet to confirm your router is capable of exporting NetFlow or sFlow.

{{</Aside>}}

## NetFlow routers

### Popular network hobbyist/small business options

<details>
<summary>pfSense</summary>
<div class="special-class" markdown="1">

- [pfsense website](https://www.pfsense.org/)
- **Supported hardware model or plugin**: [softflowd](https://docs.netgate.com/pfsense/en/latest/recipes/netflow-with-softflowd.html)
</details>

<details>
<summary>Ubiquiti</summary>
<div class="special-class" markdown="1">

- [Ubiquiti website](https://www.ui.com/) 
- **Supported hardware model or plugin**: UISP EdgeRouter series 
</details>

### Enterprise NetFlow capable routers

<details>
<summary>Barracuda</summary>
<div class="special-class" markdown="1">

- **Supported hardware model or plugin**: CloudGen Firewall, NG Firewall
</details>

<details>
<summary>Cisco</summary>
<div class="special-class" markdown="1">

- [NetFlow/sFlow Support Matrix](https://community.cisco.com/t5/security-knowledge-base/netflow-support-matrix/ta-p/3644638?attachment-id=203270)
- **Supported hardware model or plugin**: ASR series, Catalyst series, ISR series, Nexus 1000v, Nexus 5000, Nexus 6000, Nexus 7000, Nexus 9000, WLC series, 800 series (not 860)
</details>

<details>
<summary>Fortinet</summary>
<div class="special-class" markdown="1">

- **Supported hardware model or plugin**: FortiGate series, FortiSwitch series 
</details>

<details>
<summary>Meraki</summary>
<div class="special-class" markdown="1">

- [NetFlow/sFlow Support Matrix (Meraki on page 2)](https://community.cisco.com/t5/security-knowledge-base/netflow-support-matrix/ta-p/3644638?attachment-id=203270)
- **Supported hardware model or plugin**: MX series, Z1 series
</details>

<details>
<summary>Mikrotik</summary>
<div class="special-class" markdown="1">

- [MikroTik website](https://wiki.mikrotik.com/wiki/Manual:IP/Traffic_Flow)
- **Supported hardware model or plugin**: Router OS v2.9, v3, v4, and later
</details>

<details>
<summary>Nokia</summary>
<div class="special-class" markdown="1">

- **Supported hardware model or plugin**: 7950 XRS series, 7750 SR series
</details>

<details>
<summary>Ubiquiti</summary>
<div class="special-class" markdown="1">

- [Ubiquiti website](https://www.ui.com/)
- **Supported hardware model or plugin**: 7950 XRS series, 7750 SR series
</details>

### Open source router OS

<details>
<summary>pfSense</summary>
<div class="special-class" markdown="1">

- [pfSense website](https://www.pfsense.org/)
- **Supported hardware model or plugin**: [softflowd](https://docs.netgate.com/pfsense/en/latest/recipes/netflow-with-softflowd.html)
</details>

<details>
<summary>OpenWrt</summary>
<div class="special-class" markdown="1">

- [OpenWrt website](https://openwrt.org/start)
- **Supported hardware model or plugin**: [Table of supported routers](https://openwrt.org/toh/start)<br> [OpenWrt NetFlow support](https://openwrt.org/packages/pkgdata/softflowd)
</details>

## sFlow routers

### Popular sFlow capable routers

<details>
<summary>Arista</summary>
<div class="special-class" markdown="1">

- **Supported hardware model or plugin**: 710P series, 720X series, 7010 series, 7020R series, 7050X3 series, 7060X series, 7150 series, 7160 series, 7170 series, 7250X series, 7280R series, 7300 series, 7500R series, 7800R3 series
</details>

<details>
<summary>Aruba</summary>
<div class="special-class" markdown="1">

- **Supported hardware model or plugin**: 2530 series, 2540 series, 2920 series, 2930F series, 2930M series, 3810 series, 5400R series, 8320 series, 8400 series
</details>

<details>
<summary>Cisco</summary>
<div class="special-class" markdown="1">

- [NetFlow/sFlow support matrix](https://community.cisco.com/t5/security-knowledge-base/netflow-support-matrix/ta-p/3644638?attachment-id=203270)
- **Supported hardware model or plugin**: 350 series Managed Switches, 350X series Stackable Managed Switches, 550X series Stackable Managed Switches, 8000 series Routers, ASR 9000 series Routers, Catalyst 1000 series, Catalyst 2960-L series, ME 1200 series, NCS 540 series Routers, NCS 5500 series Routers, Nexus 3000 series, Nexus 3100 series, Nexus 3200 series, Nexus 3600 series, Nexus 9200 series, Nexus 9300 series, Nexus 9500 series
</details>

<details>
<summary>Dell</summary>
<div class="special-class" markdown="1">

- **Supported hardware model or plugin**: Dell Networking N1100 series, Dell Networking N1500 series, Dell Networking N2000 series, Dell Networking N3000 series, Dell Networking N4000 series, Dell Networking C9000 series, Dell Networking S-series 10GbE switches, Dell Networking S-series 1GbE switches, Dell Networking S-series 25/40/50/100GbE switches, Dell Networking Z-series Core and Aggregation switches
</details>

<details>
<summary>D-Link</summary>
<div class="special-class" markdown="1">

- **Supported hardware model or plugin**: DXS-3400 series, DGS-3120 series, DGS-3630 series, DWS-3160-24TC, DWS-3160-24PC, DWS-4026
</details>

<details>
<summary>Edge-Core Networks</summary>
<div class="special-class" markdown="1">

- **Supported hardware model or plugin**: AS7700 series, AS5800 series, ECS4660 series, ECS4260 series, ECS4100 series, ECS4200 series, ECS4510 series, ECS3500 series, Open Networking
</details>

<details>
<summary>Extreme Networks</summary>
<div class="special-class" markdown="1">

- **Supported hardware model or plugin**: X440-G2 series, X450-G2 series, X460-G2 series, X620 series, X670-G2 series, X690 series, X770 series, X870 series, CER 2000 series, MLX series, SLX 9140, SLX 9240, SLX 9540, SLX 9850 series, VDX 6740, VDX 6940, VDX 8770, ERS 4900 series, ERS 5900 series, VSP 4000 series, VSP 8200 series, VSP 8400 series, 200 series, 8000 series
</details>

<details>
<summary>Fortinet</summary>
<div class="special-class" markdown="1">

- **Supported hardware model or plugin**: FortiGate series, FortiSwitch series
</details>

<details>
<summary>HPE</summary>
<div class="special-class" markdown="1">

- **Supported hardware model or plugin**: HPE 6600 Switch series, HPE 5900 Switch series, HPE 5700 Switch series, HPE 5500 Switch series, HPE FF 5940 Switch series, HPE FF 5950 Switch series, HPE FF 12900E Switch series
</details>

<details>
<summary>Hitachi</summary>
<div class="special-class" markdown="1">

- **Supported hardware model or plugin**: Apresia 3400 series, Apresia 5400 series, Apresia 13000 series, Apresia 15000 series, GR4000, GS4000, GS3000
</details>

<details>
<summary>Huawei</summary>
<div class="special-class" markdown="1">

- **Supported hardware model or plugin**: CloudEngine 5800 series, CloudEngine 6800 series, CloudEngine 7800 series, CloudEngine 8800 series, CloudEngine 12800 series, NetEngine 8000 series, S600-E series, S1720 series, S2700 series, S5700 series, S6720 series, S7700 series, S9700 series, S12700 series
</details>

<details>
<summary>Juniper</summary>
<div class="special-class" markdown="1">

- **Supported hardware model or plugin**: ACX5000, EX series, MX series, NFX series, OCX1100, PTX1000, PTX10000, QFX series
</details>

<details>
<summary>NEC</summary>
<div class="special-class" markdown="1">

- **Supported hardware model or plugin**: IP8800/S2500 series, IP8800/S3640 series, IP8800/S3650 series, IP8800/S3660 series, IP8800/S3830 series, IP8800/S4600 series, IP8800/S6300 series, IP8800/S6600 series, IP8800/S6700 series, IP8800/S8308 series, IP8800/S8600 series, IP8800/R8600 series, PF series (ProgrammableFlow)
</details>

<details>
<summary>Netgear</summary>
<div class="special-class" markdown="1">

- **Supported hardware model or plugin**: M4100 series, M4200 series, M4300 series, M5300 series, M6100 series, M7100 series, M7300 series, XSM7224S Switch series
</details>

<details>
<summary>Nokia</summary>
<div class="special-class" markdown="1">

- **Supported hardware model or plugin**: Service Router Linux, 7220 Interconnect Router, 7250 Interconnect Router
</details>

<details>
<summary>Nvidia</summary>
<div class="special-class" markdown="1">

- **Supported hardware model or plugin**: Cumulus Linux, NVIDIA Linux Switch, NVIDIA Onyx, SN2000 Open Ethernet Switches, SN3000 Open Ethernet Switches, SN4000 Open Ethernet Switches
</details>

<details>
<summary>Quanta Computer</summary>
<div class="special-class" markdown="1">

- **Supported hardware model or plugin**: T1000 series, T3000 series, T5000 series, T7000 series
</details>

<details>
<summary>ZTE</summary>
<div class="special-class" markdown="1">

- **Supported hardware model or plugin**: ZXR10 2900E series, ZXR10 3900E series, ZXR10 5200 series, ZXR10 5900E series
</details>

<details>
<summary>ZyXEL</summary>
<div class="special-class" markdown="1">

- **Supported hardware model or plugin**: MGS3520 series, XGS1900 series, XGS2210 series, XGS3700 series, XGS4600 series, XGS4700 series
</details>