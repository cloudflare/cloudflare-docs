---
pcx_content_type: how-to
title: SMB
weight: 8
---

# Access an SMB drive through Cloudflare Tunnel

The Server Message Block (SMB) protocol allows users to read, write, and access shared resources on a network. Due to security risks, firewalls and ISPs usually block public connections to an SMB file share.  With Cloudflare Tunnel, you can provide secure and simple SMB access to users outside of your network.

Cloudflare Zero Trust offers two solutions for connecting to SMB servers:

- [Private subnet routing with Cloudflare WARP to Tunnel](#connect-to-smb-server-with-warp-to-tunnel)
- [Public hostname routing with `cloudflared access`](#connect-to-smb-server-with-cloudflared-access)

## Set up an SMB server on Linux

While SMB was developed for Microsoft Windows, Samba provides SMB connectivity from UNIX-like and BSD systems. A Samba server can be set up using this [guide](https://ubuntu.com/tutorials/install-and-configure-samba#1-overview) on an Ubuntu machine.

## Connect to SMB server with WARP to Tunnel

{{<render file="_warp-to-tunnel-intro.md">}}

### 1. Connect the server to Cloudflare

1. Create a Cloudflare Tunnel for your server by following our [dashboard setup guide](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/remote/). You can skip the connect an application step and go straight to connecting a network.

2. In the **Private Networks** tab for the tunnel, enter the private IP address of your server (or a range that includes the server IP).

3. (Optional) [Set up Zero Trust policies](/cloudflare-one/connections/connect-apps/private-net/connect-private-networks/#2-recommended-filter-network-traffic-with-gateway) to fine-tune access to your server.

### 2. Set up the client

In order for devices to connect to your Zero Trust organization, you will need to:

{{<render file="_warp-to-tunnel-client.md">}}

### 3. Connect as a user

#### macOS

1. In the Finder menu, select **Go** > **Connect to Server**.
2. Enter `smb://<smb-server-ip-address>/sambashare`.

   ![Connect to SMB server in macOS](/cloudflare-one/static/documentation/connections/connect-apps/use-cases/smb-connect.png)
3. Sign in with the username and password created while setting up the server.

#### Windows

1. Open File Explorer and right-click **Network** > **Map Network Drive**.
2. For **Folder**, enter `\\<server-private-ip>\sambashare`.
3. Select **Connect using different credentials**.
4. Select **Finish**.
5. Sign in with the username and password created while setting up the server.

## Connect to SMB server with `cloudflared access`

{{<render file="_tunnel-cloudflared-access.md">}}

### 1. Connect the server to Cloudflare

1. Create a Cloudflare Tunnel by following our [dashboard setup guide](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/remote/).

2. In the **Public Hostnames** tab, choose a domain from the drop-down menu and specify any subdomain (for example, `smb.example.com`).

3. For **Service**,  select _TCP_ and enter the SMB listening port (for example, `localhost:445`). SMB drives listen on port `139` or `445` by default.

4. Select **Save hostname**.

5. (Recommended) Add a [self-hosted application](/cloudflare-one/applications/configure-apps/self-hosted-apps/) to Cloudflare Access in order to manage access to your server.

### 2. Connect as a user

1. [Install `cloudflared`](/cloudflare-one/connections/connect-apps/install-and-setup/installation/) on the client machine.
2. Run the following command to open an SMB listening port. You can specify any available port on the client machine.

    ```sh
   $ cloudflared access tcp --hostname smb.example.com --url localhost:8445
   ```

   This command can be wrapped as a desktop shortcut so that end users do not need to use the command line.

3. [Open your SMB client](/cloudflare-one/connections/connect-apps/use_cases/smb/#3-connect-as-a-user) and configure the client to point to `smb://localhost:8445/sambashare`. Do not input the hostname.

4. Sign in with the username and password created while setting up the server.

#### Windows-specific requirements

If you are using a Windows machine and cannot specify the port for SMB, you might need to disable the local server. The local server on a client machine uses the same default port `445` for CIFS/SMB. By listening on that port, the local server can block the `cloudflare access` connection.

{{<Aside type="warning">}}
The Windows Server service supports share actions over a network like file, print, and named-pipe. Disabling this service can cause those actions to fail to start.
{{</Aside>}}

To disable the local server on a Windows machine:

1. Select **Win**+**R** to open the Run window.
2. Type `services.msc` and select **Enter**.
3. Locate the local server process, likely called `Server`.
4. Stop the service and set **Startup type** to _Disabled_.
5. Repeat steps 3 and 4 for `TCP/IP NetBIOS Helper`.
