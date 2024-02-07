---
pcx_content_type: how-to
title: Configure virtual Connector
weight: 4
---

# Configure Virtual Connector

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

Contact your account team at Cloudflare to obtain the Virtual Connector [OVA package](https://docs.vmware.com/en/VMware-vSphere/7.0/com.vmware.vsphere.vm_admin.doc/GUID-AE61948B-C2EE-436E-BAFB-3C7209088552.html) and license keys. This image can be deployed multiple times to create several instances of a Virtual Connector, in different locations or on the same ESXi host.

You will consume one license key for each instance created. For example, if you want to deploy 10 Virtual Connectors you should request 10 license keys, and your account team will create 10 Connector instances in your Cloudflare dashboard.

## 2. Deploy the Virtual Connector on VMware

The following instructions assume you already have VMware ESXi hypervisor installed with sufficient resources. Refer to [Prerequisites](#prerequisites) for more information.

1. When setting up your VMware ESXi, you need to create port groups for Virtual Connector. Go to **Networking** > **Port groups**, and prepare your vSwitch port groups and/or VLANs for your desired network topology. For example, a simple deployment typically has:
    - A WAN port group where the Virtual Connector will get an IP address (static or DHCP) that has access to the Internet.
    - A LAN port group, where the Virtual Connector will act as default router, and possibly DHCP server.
    - A `null` port group, for allocating unused virtual interfaces in the Virtual Connector. You can, for example, create a `null` port group with the name of `null`, and a **VLAN ID** of `99`.
2. Extract the files in the OVA image provided by your account team. The OVA image includes the files required to install and configure the virtual machine (VM) for Virtual Connector with the appropriate settings. Take note of the folder where you have extracted these files as you will need to refer to it when creating the VM.
3. Go to **Virtual Machines** > **Create/Register VM** wizard to start deploying the Virtual Connector.
4. Choose a descriptive name for your virtual machine.
5. Upload the files you have extracted from the OVA image. These include `mconn.ovf`, `mconn.ova`, `mconn.nvram`, and `mconn.vmdk`.
6. In **Networking mappings**, select assignments for your desired topology according to the port groups you set up previously:
    1. For example, map `eno1` port to `VM Network` to create your WAN, and `eno2` to `LAN0` to act as your LAN port.
    2. Allocate any unused ports to the `null` port group.
    3. Take note of your configuration. You will need this information to configure your network in the Cloudflare dashboard.
7. Before completing the deployment wizard, disable **Power on automatically**. This is important so that you can configure the license key prior to boot.
8. Configure the virtual machine with the license key your account team provided you:
    1. Select the Virtual Connector's VM > **Settings**.
    2. Go to **VM Options** > **Advanced** > **Edit Configuration**.
    3. Select **Add parameter** to add your lincence key. Scroll down to the last entry (this is where VMware adds the new parameter), and add the following two new entries:
        - **Key**: `guestinfo.cloudflare.identity`
        - **Value**: `<YOUR_LICENCE_KEY>`

  {{<Aside type="note">}} You cannot use the same license key twice, or reuse a key once the virtual machine has been registered with Cloudflare. You need a new key from your account team for every new Virtual Connector.{{</Aside>}}

9. Select **Save** to finish configuring your Virtual Connector.
10. Now, you need to continue set up in your Cloudflare dashboard.

## 3. Set up Cloudflare dashboard

1. Follow the instructions in [Create a site](/magic-wan/configuration/connector/configure-hardware-connector/#create-a-site) to create a site for each instance of the Virtual Connector.
2. The **Physical port** in WAN and LAN needs to correspond to the virtual network interface on the Virtual Connector instance you have set up in VMware. Following our example from the previous steps, for the **WAN** configuration we need to choose port `1` since that is what corresponds to the `eno1` port we set up in VMware.
3. Do not forget to [activate your Connector](/magic-wan/configuration/connector/configure-hardware-connector/#device-activation).
4. After setting up your site in the Cloudflare dashboard, you will need to return to the VMware interface to boot up Virtual Connector.

## 4. Boot your Virtual Connector

1. Go to **Virtual Machines** in VMware, and boot up Virtual Connector's VM.
2. The Virtual Connector will make a request to Cloudflare. This is the step where Virtual Connector registers your provided license key and [downloads the site configuration](/magic-wan/configuration/connector/configure-hardware-connector/#create-a-site) for its connected site.
3. The Virtual Connector will set up the LAN and WAN connections according to the configuration downloaded from the site you created on the Cloudflare dashboard. The Virtual Connector will also establish IPsec tunnels.
4. If successful, the [tunnel health checks](/magic-wan/configuration/manually/how-to/check-tunnel-health-dashboard/) will show as healthy.
5. If you do not see a [healthy heartbeat](/magic-wan/configuration/connector/reference/#heartbeat) the Cloudflare dashboard, reboot the Virtual Connector's VM in VMware.

## Next steps

- Learn more about Magic WAN Connector, such as security, heartbeat, and device metrics in [Device information](/magic-wan/configuration/connector/reference/).
- Refer to [Troubleshooting](/magic-wan/configuration/connector/troubleshooting/) to learn what to do if you are experiencing difficulties.