---
pcx_content_type: how-to
title: RDP
weight: 2
---

# Connect to Remote Desktop through Cloudflare Tunnel

The Remote Desktop Protocol (RDP) provides a graphical interface for users to connect to a computer remotely. RDP is most commonly used to facilitate simple remote access to machines or workstations which users cannot physically access. However, this also makes RDP connections the frequent subject of attacks, since a misconfiguration can inadvertently allow unauthorized access to the machine.

With Cloudflare Zero Trust, you can enjoy the convenience of making your RDP server available over the Internet without the risk of opening any inbound ports on your local server.

Cloudflare Zero Trust offers two solutions to provide secure access to RDP servers:

- [Private subnet routing with Cloudflare WARP to Tunnel](#connect-to-rdp-server-with-warp-to-tunnel)
- [Public hostname routing with `cloudflared access`](#connect-to-rdp-server-with-cloudflared-access)

## Set up an RDP server in GCP

This example walks through how to set up an RDP server on a Google Cloud Platform (GCP) virtual machine (VM), but you can use any machine that supports RDP connections.

1. In your [Google Cloud Console](https://console.cloud.google.com/), [create a new project](https://developers.google.com/workspace/guides/create-project).  
2. Go to **Compute Engine** > **VM instances**.
3. Select **Create instance**.
4. Name your VM instance, for example `windows-rdp-server`.
5. Configure your VM instance:
    1. Scroll down to **Boot Disk** and select **Change**.
    2. For **Operating system**, select _Windows Server_.
    3. Choose a **Version** with Desktop Experience, for example _Windows Server 2016 Datacenter_.
6. Once your VM is running, open the dropdown next to **RDP** and select _View gcloud command to reset password_.
7. Select **Run in Cloud Shell**.
8. Run the command in the Cloud Shell terminal. You will be asked to confirm the password reset.
9. Copy the auto-generated password and username to a safe place.

## Install Microsoft Remote Desktop

You can use any RDP client to access and configure the RDP server. 

To access the server through Microsoft Remote Desktop:

1. Download and install [Microsoft Remote Desktop](https://apps.microsoft.com/store/detail/microsoft-remote-desktop/9WZDNCRFJ3PS?hl=en-us&gl=us).
2. Once downloaded, open Microsoft Remote Desktop and select **Add a PC**.
3. For **PC name**, enter the public IP address of your RDP server. In GCP, this is the **External IP** of the VM instance.
4. For **User account**, select **Add User Account** and enter your auto-generated password and username.
5. Select **Add**. The PC will display in Microsoft Remote Desktop.
6. To test basic connectivity, double-click the newly added PC.
7. When asked if you want to continue, select **Continue**.

You can now remotely access and configure your RDP server.

{{<Aside type="note">}}
By default, Internet Explorer will be installed and configured in [Enhanced Security mode](https://learn.microsoft.com/en-us/troubleshoot/developer/browsers/security-privacy/enhanced-security-configuration-faq#internet-explorer-enhanced-security-configuration). If the browser is slow or unable to load, you can turn off Enhanced Security and install an alternate browser such as Google Chrome.
{{</Aside>}}

## Connect to RDP server with WARP to Tunnel

{{<render file="_warp-to-tunnel-intro.md">}}

### 1. Connect the server to Cloudflare

{{<render file="_warp-to-tunnel-server.md">}}

### 2. Set up the client

In order for devices to connect to your Zero Trust organization, you will need to:

{{<render file="_warp-to-tunnel-client.md">}}

### 3. Connect as a user

Once the WARP client is configured, you can use your RDP client to connect to the server's private IP address (instead of the public IP address used initially).

To connect in Microsoft Remote Desktop:

1. Open Microsoft Remote Desktop and select **Add a PC**.
2. For **PC name**, enter the private IP address of your RDP server. In GCP, this is the **Internal IP** of the VM instance.
3. For **User account**, enter your RDP server username and password.
4. To test Zero Trust connectivity, double-click the newly added PC.
5. When asked if you want to continue, select **Continue**.

You now have secure, remote access to the RDP server.

## Connect to RDP server with `cloudflared access`

{{<render file="_tunnel-cloudflared-access.md">}}

### 1. Connect the server to Cloudflare

1. Create a Cloudflare Tunnel by following our [dashboard setup guide](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/remote/).

2. In the **Public Hostnames** tab, choose a domain from the drop-down menu and specify any subdomain (for example, `rdp.example.com`).

3. For **Service**,  select _RDP_ and enter the [RDP listening port](https://docs.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/change-listening-port) of your server (for example, `localhost:3389`). It will likely be port `3389`.

4. Select **Save hostname**.

5. (Recommended) Add a [self-hosted application](/cloudflare-one/applications/configure-apps/self-hosted-apps/) to Cloudflare Access in order to manage access to your server.

### 2. Connect as a user

1. [Install `cloudflared`](/cloudflare-one/connections/connect-apps/install-and-setup/installation/) on the client machine.
2. Run this command to open an RDP listening port:

    ```sh
    $ cloudflared access rdp --hostname rdp.example.com --url rdp://localhost:3389
    ```

    This process will need to be configured to stay alive and autostart. If the process is killed, users will not be able to connect.

{{<Aside type="note">}}
If the client machine is running Windows, port `3389` may already be consumed locally.  Select an alternative port to `3389` that is not being used.
{{</Aside>}}

3. While `cloudflared access` is running, connect from an RDP client such as Microsoft Remote Desktop:
    1. Open Microsoft Remote Desktop and select **Add a PC**.
    2. For **PC name**, enter `localhost:3389`.
    3. For **User account**, enter your RDP server username and password.
    4. Double-click the newly added PC.
    5. When asked if you want to continue, select **Continue**.

 When the client launches, a browser window will open and prompt the user to authenticate themselves.
