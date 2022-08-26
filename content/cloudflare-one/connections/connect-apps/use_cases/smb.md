---
pcx_content_type: how-to
title: SMB
weight: 8
hidden: false
---
# Accessing a SMB drive through Cloudflare Tunnels

The Server Message Block, or SMB, protocol allows users to read, write, and access shared resources on a network. SMB was developed for Microsoft Windows. Samba provides SMB connectivity from UNIX-like and BSD systems. Cloudflare Tunnel provides users with a simple mechanism to connect a SMB file server.
A Samba server can be set up using this [guide](https://ubuntu.com/tutorials/install-and-configure-samba#1-overview) on an Ubuntu machine.

## WARP to Tunnel
The cloudflared daemon can be deployed on the SMB file server to create a private network and connect the server to Cloudflare’s network. The WARP agent can then be used to securely connect to the SMB server. This method enables the SMB server to be inaccessible from the Internet.

### Private network connector setup
Once the Samba server is set up and configured it needs to be made accessible.

To set up the tunnel on the machine use the following steps:
1. Log in to the [Zero Trust dashboard](https://dash.teams.cloudflare.com) and go to **Access** > **Tunnels**. 

1. Select **Create a tunnel**.

1. Enter a name for your tunnel.
    ![Connector appearing in the UI after cloudflared has run](/cloudflare-one/static/documentation/connections/connect-apps/use-cases/name-smb.png)

1. Select **Save tunnel**.

1. Next, you will need to install `cloudflared` and run it. To do so, check that the environment under **Choose an environment** reflects the operating system on your machine, then copy the command in the box below and paste it into a terminal window. Run the command.

1. Once the command has finished running, your connector will appear on the Zero Trust dashboard.

    ![Connector appearing in the UI after cloudflared has run](/cloudflare-one/static/documentation/connections/connect-apps/use-cases/connect-the-tunnel.png)

1. Select **Next**.

1. In the **Private Networks** tab, add the private IP subnet in the private network section. The private IP subnet should include the IP address of the SSH server. This will tell Cloudflare to send the traffic to that IP address in the private network to this tunnel.

1. Select **Save `<tunnel-name>`**.

Once the tunnel is running it is important to connect it to a Gateway Network Policy.

### Controlling who has access
In the Gateway section of the Zero Trust Dashboard, [policies](/cloudflare-one/policies/filtering/network-policies/) can be created to modify what users are able to connect to the SMB server. It is worth noting that some IP addresses are automatically excluded by WARP. WARP automatically excludes  RFC 1918 IP addresses, which are IP addresses used in private networks and not reachable from the Internet. If the IP address a user is trying to reach is also in the RFC IP range it needs to be removed from this exclusion list from Settings>Network>Split Tunnels.
    ![Settings Page](/cloudflare-one/static/documentation/connections/connect-apps/use-cases/settings.png)
Policies and rules can be created to control who can enroll a device. This will be done from Settings>WARP>Device enrollment permissions. The TLS decryption and Proxy modes must be enabled in the network settings as well.

### Connecting to the server as a client
A user trying to accesss the SMB server will need to [install the WARP client](/cloudflare-one/connections/connect-devices/warp/download-warp/) and [log in to the configured access group](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/) in the WARP app preferences.

#### Mac OS
1. While in Finder, select Go>Connect to Server...
    ![Connect to server...](/cloudflare-one/static/documentation/connections/connect-apps/use-cases/connect-to-server.png)
1. Enter smb://< smb server ip address> into the input box
    ![Connect to server...](/cloudflare-one/static/documentation/connections/connect-apps/use-cases/smb-connect.png)
1. Sign in with the username and password created while setting up the server
1. Select the resource to connect to

#### Windows
1. Open File Explorer and right click on Network>Map Network Drive
1. In the Folder section add \\< IP address >\sambashare (sambashare being the name of the folder created and shared through the server)
1. Ensure that the checkbox "Connect using different credentials" is active
1. Select Finish

## Cloudflare Access
A SMB file server can be routed through a public hostname so it can be accessed without being on a virtual private network. Accessing the SMB file server will require having cloudflared installed on both the server machine and on the client machine and an active zone in Cloudflare. The SMB traffic can then be proxied over this connection to access the content.

### Public hostname connector setup
To set up the tunnel to route the SMB server to a public hostname use the following steps:
1. Log in to the [Zero Trust dashboard](https://dash.teams.cloudflare.com) and go to **Access** > **Tunnels**. 

1. Select **Create a tunnel**.

1. Enter a name for your tunnel.
    ![Connector appearing in the UI after cloudflared has run](/cloudflare-one/static/documentation/connections/connect-apps/use-cases/name-the-tunnel.png)

1. Select **Save tunnel**.

1. Next, you will need to install `cloudflared` and run it. To do so, check that the environment under **Choose an environment** reflects the operating system on your machine, then copy the command in the box below and paste it into a terminal window. Run the command.

1. Once the command has finished running, your connector will appear on the Zero Trust dashboard.

    ![Connector appearing in the UI after cloudflared has run](/cloudflare-one/static/documentation/connections/connect-apps/use-cases/connect-the-tunnel.png)

1. Select **Next**.

1. In the **Public Hostnames** tab, choose a domain from the drop-down menu and specify any subdomain (i.e. smb.example.com).

1. Specify the service. SMB drives listen on port 139 or 445 by default. `tcp://localhost:445`.

1. Select **Save `<tunnel-name>`**.

Once the tunnel is running it is important to connect it to a Zero Trust policy.

### Create a Zero Trust policy
In the Access section of the Zero Trust dashboard an [application](/cloudflare-one/applications/configure-apps/) and [policies](/cloudflare-one/policies/access/) can be created to manage access to the SMB drive.
For example, if the drive is shared at smb.example.com, build a policy so that only team members are able to connect to that subdomain.

### Connect to the SMB drive
A user trying to access the SMB server will need to [install cloudflared](/cloudflare-one/connections/connect-apps/install-and-setup/installation/) on their device.
The following command creates the connection from the device to Cloudflare. Any available port can be specified.

    ```sh
    cloudflared access tcp --hostname smb.example.com --url localhost:8445
    ```
Use the SMB client to point to `tcp:localhost:8445`. The client will open a browser window to authenticate the user.

#### Windows-specific requirements

If you are using a Windows machine, and cannot specify the port for SMB, you might need to disable the local Server. The local Server on a client machine uses the same default port for CIFS/SMB, port `445`, and by listening on that port by default the Server can block the Cloudflare Access connection.

The Windows Server service supports share actions over a network like file, print, and named-pipe. Disabling this service can cause those actions to fail to start.

On the Windows machine, locate the Server process, likely called `Server` and running as `services.msc`. Terminate this service in the Run dialog box and ensure it is disabled on boot. Next, follow the same steps for the `TCP/IP NetBIOS Helper` service.