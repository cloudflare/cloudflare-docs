---
pcx_content_type: how-to
title: SSH
weight: 8
hidden: false
---

# Connect through Cloudflare Tunnels over SSH
The Secure Shell Protocol, or SSH, enables users to remotely access devices through the command line. SSH is commonly used to access machines from a physical distance.
In this guide, we’ll walk through how to use Cloudflare’s Zero Trust platform to securely connect to machines over SSH. With Cloudflare Zero Trust, you can make your server available over the internet without the risk of opening inbound ports on the server. 
Cloudflare Zero Trust provides two solutions to securely SSH to a server
- Private subnet routing with Cloudflare WARP to Tunnel
- Cloudflared on client and server
## WARP to Tunnel
Creating a private network has two components: the server, and the client.
The server’s infrastructure (whether that is a single application, multiple applications, or a network segment) is connected to Cloudflare by Cloudflare Tunnel. This is done by running the cloudflared daemon on the server. Simply put, Tunnel is what connects the network to Cloudflare.
End users need to be able to easily connect to Cloudflare and more importantly your network. This is managed by the Cloudflare WARP agent. 
### Connector Setup
With the cloudflared daemon, Zero Trust network rules can make the server accessible only by intended users.
To set up the connector use the following steps:
1. Log in to the [Zero Trust dashboard](https://dash.teams.cloudflare.com) and go to **Access** > **Tunnels**.
1. Select **Create a tunnel**.
1. Enter a name for your tunnel.
   ![Connector appearing in the UI after cloudflared has run](/cloudflare-one/static/documentation/connections/connect-apps/use-cases/name-the-tunnel.png)
1. Select **Save tunnel**.
1. Next, you will need to install `cloudflared` and run it. To do so, check that the environment under **Choose an environment** reflects the operating system on your machine, then copy the command in the box below and paste it into a terminal window. Run the command.
1. Once the command has finished running, your connector will appear on the Zero Trust dashboard.
   ![Connector appearing in the UI after cloudflared has run](/cloudflare-one/static/documentation/connections/connect-apps/use-cases/connect-the-tunnel.png)
1. Select **Next**.
1. In the **Private Networks** tab, add the private IP subnet in the private network section. The private IP subnet should include the IP address of the SSH server. This will tell Cloudflare to send the traffic to that IP address in the private network to this tunnel.
1. Select **Save `<tunnel-name>`**.
Once the tunnel is running you can create Zero Trust security policies to manage access.
### Zero Trust Policies
In the Access section of the Zero Trust Dashboard, you will need to create a Private Network application and Zero Trust security policy to manage access to your RDP server. 

To get started, navigate to Access > Applications > Create an Application. 

1. Select Private Network application
1. Name your application. In this example, we’ll name our Application windows-desktop-experience.
1. For application type, select Destination IP and the value for our RDP server.
1. Select Next and you will find two auto-generated Zero Trust policies which can be modified to include Identity and Device based controls. 
1. Allow specific users by adding the User Email rule

{{<table-wrap>}}
| Selector | Operator | Value | Action |
|--|--|--|--|
|  Destination IP |in|10.0.0.0/8 |Allow|
|User email| Matches regex| *@example.com| Allow|
{{<table-wrap>}}
Else block rule
{{<table-wrap>}}
| Selector | Operator | Value | Action |
|--|--|--|--|
|  Destination IP |in|10.0.0.0/8 |Block|
{{<table-wrap>}}


Access rules are evaluated in order so a user with an email ending in @example.com will be able to access 10.0.0.0/8 while any other users will be blocked.
This rule is a great example to get started, but for more in-depth information on how identity-aware network policies work, read our dedicated documentation page.
 
### WARP Management
It is worth noting that some IP addresses are automatically excluded by WARP (such as addresses in the range 10.0.0.0/8). WARP automatically excludes RFC 1918 IP addresses, which are IP addresses typically used in private networks and not reachable from the Internet. If the IP address a user is trying to reach is also in the RFC IP range it needs to be removed from this exclusion list from Settings>Network>Split Tunnels.
   ![Settings Page](/cloudflare-one/static/documentation/connections/connect-apps/use-cases/settings.png)
You also need to configure WARP to inspect HTTP traffic.

1. Go to Settings > Network.
1. Toggle Proxy to Enabled. This will tell Cloudflare to begin proxying any traffic from enrolled devices, except the traffic excluded using the split tunnel settings.
1. Toggle TLS decryption to Enabled. This will tell Cloudflare to begin decrypting traffic for inspection from enrolled devices, except the traffic excluded from inspection.

Users can connect over this private network by enrolling their devices into the Warp agent in the same account as the Cloudflare Tunnel configuration. As a note, they must be using Gateway with WARP mode which can be found by clicking the gear icon in the top right of the Warp agent. 

You can begin to enroll devices by creating a device enrollment rule. 

1. Go to Settings > Devices > Device enrollment.
1. Within Device enrollment permissions, select Manage.
1. Select Add a rule.
1. Determine who is allowed to enroll by using criteria including Access groups, groups from your identity provider, email domain, or named users. This example allows any user with a @example.com account to enroll.
Select Save.

Your rule will now be visible under the Device enrollment rules list.

### Connecting over WARP
A user trying to access the machine through SSH will need to [install the WARP client](/cloudflare-one/connections/connect-devices/warp/download-warp/), [download the root certificate](/cloudflare-one/connections/connect-devices/warp/set-up-warp/#4-install-the-cloudflare-root-certificate-on-your-devices), and [log in to the configured access group](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/) in the WARP app preferences.
The user can then SSH to the machine using the IP address. If a key pair exists to access the SSH server the key should be included in the command.
```
$ ssh -i "key" ubuntu@<private IP Address>
```
## Connecting with cloudflared access
Cloudflare Tunnels can also be routed through a public hostname, which allows them to be accessed without the WARP client. This instead uses cloudflared and Cloudflare Access to perform the onramp to the Cloudflare Network. Accessing the machine will require having cloudflared installed on both the server machine and on the client machine. The SSH traffic can then be proxied over this connection to access the content.
This can be done in conjunction with routing over WARP so that there are multiple ways to connect to the SSH server.
### Before you start
In order to route the tunnel through a public hostname make sure to [add a website to Cloudflare](/fundamentals/get-started/setup/add-site/).
### Making the tunnel
1. Log in to the [Zero Trust dashboard](https://dash.teams.cloudflare.com) and go to **Access** > **Tunnels**.
1. Select **Create a tunnel**.
1. Enter a name for your tunnel.
   ![Connector appearing in the UI after cloudflared has run](/cloudflare-one/static/documentation/connections/connect-apps/use-cases/name-the-tunnel.png)
1. Select **Save tunnel**.
1. Next, you will need to install `cloudflared` and run it. To do so, check that the environment under **Choose an environment** reflects the operating system on your machine, then copy the command in the box below and paste it into a terminal window. Run the command.
1. Once the command has finished running, your connector will appear on the Zero Trust dashboard.
   ![Connector appearing in the UI after cloudflared has run](/cloudflare-one/static/documentation/connections/connect-apps/use-cases/connect-the-tunnel.png)
1. Select **Next**.
1. In the **Public Hostnames** tab, choose a domain from the drop-down menu and specify any subdomain (i.e. ssh.example.com).
1. Specify the service, for ssh this will be `http://localhost:22`.
1. Select **Save `<tunnel-name>`**.
Once the tunnel is running it is important to connect it to a Zero Trust policy.
### Create a Zero Trust policy
In the Access section of the Zero Trust dashboard an [application](/cloudflare-one/applications/configure-apps/) and [policies](/cloudflare-one/policies/access/) can be created to manage access to the SSH server.
### Connect from a client machine
#### Native Terminal
You can now connect from a client machine using `cloudflared`.
This example uses a macOS laptop. On macOS, you can install `cloudflared` with the following command using Homebrew.
```sh
$ brew install cloudflare/cloudflare/cloudflared
```
While you need to install `cloudflared`, you do not need to wrap your SSH commands in any unique way. Instead, you will need to make a one-time change to your SSH configuration file.
```sh
$ vim ~/.ssh/config
```
Input the following values; replacing `ssh.example.com` with the hostname you created.
```txt
Host ssh.example.com
 ProxyCommand /usr/local/bin/cloudflared access ssh --hostname %h
```
You can now test the SSH flow by running a command to reach the service. When the command is run, `cloudflared` will launch a browser window to prompt you to authenticate with your identity provider before establishing the connection from your terminal.
#### Browser-rendered terminal
Cloudflare can render an SSH client in your browser without the need for client software or end user configuration changes.
1. In the Zero Trust dashboard, go to **Access** > **Applications**.
1. Choose your application and go to **Edit** > **Settings**.
1. In **Additional settings**, select _SSH_ from the **Browser Rendering** drop-down menu.
Once enabled, when users authenticate and visit the URL of the application, Cloudflare will render a terminal in their browser.
