---
pcx_content_type: how-to
title: Configure virtual Connector
weight: 4
---

## Configure Virtual Connector

Virtual Magic WAN Connector (Virtual Connector) is a virtual appliance alternative to the hardware based Magic WAN Connector appliance. These two versions of Connector are identical otherwise.

## Prerequisites

Before you can install Virtual Connector, you need an Enterprise account with Magic WAN enabled. Additionally,  you need to have a VMware host with sufficient compute, memory, and storage to run the virtual machine with Virtual Connector. This includes:

- Intel x86 CPU architecture
- ESXi hypervisor 7.0U1 or higher (free edition is supported)
- 4 virtual CPUs per virtual connector (We recommend deployment with a 1:1 virtual CPU to physical core allocation to avoid CPU over contention which will cause packet loss.)
- 4 GB of RAM per virtual connector
- 8 GB of disk per virtual connector
- One vSwitch port group or VLAN with access to the Internet (for example, through a WAN)
- One or more vSwitch port group or VLAN that will be the internal LAN


Refer to [VMware's documentation](https://docs.vmware.com/en/VMware-vSphere/7.0/com.vmware.esxi.install.doc/GUID-B2F01BF5-078A-4C7E-B505-5DFFED0B8C38.html) for more information on how to install ESXi and configure a virtual machine.

## 1. Obtain the Virtual Connector image

1. Contact your account team at Cloudflare to obtain the Virtual Connector [OVA package](https://docs.vmware.com/en/VMware-vSphere/7.0/com.vmware.vsphere.vm_admin.doc/GUID-AE61948B-C2EE-436E-BAFB-3C7209088552.html) and license keys.
    - This image can be deployed multiple times to create several instances of a Virtual Connector, in different locations or on the same ESXi host.
    - You will consume one license key for each instance created. For example, if you want to deploy 10 Virtual Connectors you should request 10 license keys and your account team will create 10 Connector instances in your Cloudflare dashboard.
2. Follow the instructions in [Create a site](/magic-wan/configuration/connector/configure-hardware-connector/#create-a-site) to create a site for each instance of the Virtual Connector.
    - The **Physical port** in the WAN and LAN will correspond to the virtual network interface on the Virtual Connector instance. For example, port `1` in the Cloudflare dashboard will correspond to `Network Adapter 1` and network interface `eno1` in the VMware GUI
    - Add the Connector that corresponds to the license key used in that Site.

## 2. Deploy the Virtual Connector on VMware

The following instructions assume you already have VMware ESXi hypervisor installed with sufficient resources. Refer to Prerequisites for more information.

1. Prepare your [vSwitch port groups](https://docs.vmware.com/en/VMware-vSphere/7.0/com.vmware.vsphere.networking.doc/GUID-0BBDC715-2F93-4460-BF07-5778658C66D1.html) and/or VLANs for your desired network topology. For example, a simple deployment typically has:
    - A WAN port group where the Virtual Connector will get an IP address (static or DHCP) that has access to the Internet.
    - A LAN port group, where the Virtual Connector will act as default router, and possibly DHCP server.
    - A `null` port group, for allocating unused virtual interfaces in the Virtual Connector.
2. Extract the files in the OVA image provided by your account team.
3. Use the **Create/Register VM wizard** to start deploying the Virtual Connector.
4. Choose a descriptive name for your virtual machine.
5. Upload the files you have extracted from the OVA image. These include `virtual-mconn.ovf`, `virtual-mconn.nvram`, and `virtual-mconn.vmdk`.
6. Virtual Connector needs 8 GB of storage space. This can be thinly provisioned, that is, the virtual disk can grow as there is a need for space. You do not need to allocate 8 GB of fixed disk space.
7. For networking mappings, you can select assignments for your desired topology according to the Vmware port groups and Cloudflare site configuration set-up above:
    - Each virtual network interface (vNIC) is named `enoX`. The number `X` maps to the port number for the WANs and LANs you have created for the [site configured](/magic-wan/configuration/connector/configure-hardware-connector/#create-a-site) in the Cloudflare dashboard.
    - Cloudflare recommends that you make a note of your configuration. You will need this information to configure these networks on the site in the Cloudflare dashboard. For example, you configure `eno1` as WAN port group, `eno2` as LAN port group, and all other interfaces (`eno3` — `eno8`) are allocated to the `null` port group.
8. Before completing the deployment wizard, disable **Power on automatically**. This is important so that you can configure the license key prior to boot.
9. Configure the virtual machine with the license key your account team provided you:
    1. Edit the **VM settings** and open **VM Options** > **Advanced** > **Edit Configuration**.
    2. **Add** these parameters:
        1. **Key**: `guestinfo.cloudflare.identity`
        2. **Value**: <YOUR_LICENCE_KEY>

{{<Aside type="note">}}
You cannot use the same license key twice, or reuse a key once the virtual machine has been registered with Cloudflare. You need a new key from your account team for every new Virtual Connector.
{{</Aside>}}

10. After you complete the deployment wizard, the Virtual Connector will boot up and make a request to Cloudflare. This is the step where Virtual Connector registers your provided license key and [downloads the site configuration](/magic-wan/configuration/connector/configure-hardware-connector/#create-a-site) for its connected site.
11. The Virtual Connector will set up the LAN and WAN connections according to the configuration downloaded from the site you created on the Cloudflare dashboard. The Virtual Connector will also establish IPsec tunnels.
12. If successful, the [tunnel health checks](/magic-wan/configuration/manually/how-to/check-tunnel-health-dashboard/) will show as healthy.
