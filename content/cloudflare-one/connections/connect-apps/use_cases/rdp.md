---
pcx_content_type: how-to
title: RDP
weight: 8
hidden: false
---
# Remote Desktop Protocol
The Remote Desktop Protocol, or RDP, provides a graphical interface for users to connect to a computer remotely. It’s most commonly used to facilitate simple remote access to machines or workstations which users cannot physically access. However, this also makes it the frequent subject of attacks as, if misconfigured, it could be inadvertently exposed to the Internet. 

In this guide, we’ll walk through how to use Cloudflare’s Zero Trust platform to securely connect to machines over RDP through a positive security model. With Cloudflare Zero Trust, you can still enjoy the convenience of making your RDP server available over the Internet without the risk of opening any inbound ports on your local server. 

Today, Cloudflare Zero Trust offers two solutions to provide secure access to RDP servers.
-[Private subnet routing with Cloudflare Warp to Tunnel](#private-subnet-routing-with-cloudflare-warp-to-tunnel)
- [Cloudflared on client and server](#Cloudflare-Access)

## Private subnet routing with Cloudflare Warp to Tunnel
Building out a private network has two primary components: the server side, and the client side.

The server side of the equation is powered by Cloudflare Tunnel, which simply connects your infrastructure (whether that be a single application, many applications, or an entire network segment) to Cloudflare. This is made possible by running a simple command-line daemon in your environment to establish multiple secure, outbound-only links to Cloudflare. Simply put, Tunnel is what connects your network to Cloudflare.

On the other side of this equation, you need your end users to be able to easily connect to Cloudflare and, more importantly, your network. This connection is handled by our robust device agent, Cloudflare WARP. This agent can be rolled out to your entire organization in just a few minutes using your in-house MDM tooling, and it establishes a secure connection from your users’ devices to the Cloudflare network.

### Cloudflare Tunnel: Server side setup
In this example, we’ll walk through how to connect to an RDP server hosted in Google Cloud Platform (GCP). We’ll also highlight some best practices for deploying Cloudflare’s lightweight connector, cloudflared.

#### Creating a project in Google Cloud
To get started, you will need to navigate to the Google Cloud Console and create a project. This project will contain all of your future Google Cloud resources, including the Virtual Machine (VM) instances you will create in this process.

1. From the Cloud Console, navigate to Compute Engine.
1. Under Compute Engine, select VM Instances.
1. In the main window, select Create Instance.
1. Name your VM Instance. In this example, we will name it windows-desktop-experience.
1. Configure your VM Instance. The following settings are recommended to get started:
    - Machine Family: General Purpose
    - Series: E2
    - Machine Type: e2-medium
    - Boot Disk: Windows Server 2016 Datacenter
        - Note: Be sure to select an image which specifies Server with Desktop Experience
1. Once your image is running, select the drop down next to RDP in the Connect column
    - Next, select View gcloud command to reset password and Run in Cloud Shell
        - Save the auto-generated username and password securely. We’ll circle back to this at the end. 

#### Installing Microsoft Remote Desktop
To download Microsoft Remote Desktop, visit the Windows App Store. 

1. Once downloaded, open Microsoft Remote Desktop and select Add a PC. 
1. In the PC Name field, add the public IP address of your VM
1. In the User Account field, add the auto-generated username and password we securely saved above. 
1. To test basic connectivity, double click on the PC you just added to Microsoft Remote Desktop. 
    - You should now see a modal which asks you to click to Continue.
    - You should now be able to remotely access and configure your RDP server.
1. By default, Internet Explorer will be installed and locked down. If the browser is slow or unable to load we recommend quickly downloading Google Chrome as you’ll need to authenticate through a browser shortly.

#### Running `cloudflared` on a Virtual Machine
The easiest way to get started with `cloudflared` is through the [Zero Trust Dashboard](http://dash.teams.cloudflare.com). Get started by logging in to the dashboard and navigating to Access > Tunnels in the sidebar.

1. Select create a Tunnel and name it. In this example, we’ll name our Tunnel windows-desktop-experience
1. The dashboard should automatically detect the Operating System and Architecture of your machine. If for some reason you believe your OS was picked erroneously, feel free to manually select. 
1. When downloading the cloudflared binary, you may need to explicitly allow the installer to run. The installer may download silently and you can then run the cloudflared install command. 
1. Open the command prompt and right click to Run as administrator
1. Copy the install command in the dashboard. This command will authenticate, create, and run your Tunnel as a service on the server. Once this process is complete, you should see a connector populate and click Next
1. In the Private Network Tab, add the private IP address (i.e. 10.128.0.7/32) of the server and click save

Once the Tunnel is successfully running on your RDP server you can begin creating Zero Trust security policies to manage access. 

### Cloudflare Access: Zero Trust Policies
In the Access section of the [Zero Trust Dashboard](http://dash.teams.cloudflare.com), you will need to create a Private Network application and Zero Trust security policy to manage access to your RDP server. 

To get started, navigate to Access > Applications > Create an Application. 

1. Select Private Network application
1. Name your application. In this example, we’ll name our Application windows-desktop-experience.
1. For application type, select Destination IP and the value for our RDP server. In this example, our private IP address is 10.128.0.7
1. Select Next and you will find two auto-generated Zero Trust policies which can be modified to include Identity and Device based controls. 
1. Allow specific users by adding the User Email rule

{{<table-wrap>}}
| Selector | Operator | Value | Action |
|--|--|--|--|
|  Destination IP |in|10.0.0.0/8 |Allow|
|User email| Matches regex| *@example.com| Allow|
{{</table-wrap>}}
Else block rule
{{<table-wrap>}}
| Selector | Operator | Value | Action |
|--|--|--|--|
|  Destination IP |in|10.0.0.0/8 |Block|
{{</table-wrap>}}

Access rules are evaluated in order so a user with an email ending in @example.com will be able to access 10.0.0.0/8 while any other users will be blocked.
This rule is a great example to get started, but for more in-depth information on how identity-aware network policies work, read our [dedicated documentation page](/cloudflare-one/policies/filtering/network-policies/).

### Cloudflare Warp: Client side setup
Users can now connect over this private network by enrolling their devices into the Warp agent in the same account as the Cloudflare Tunnel configuration. As a note, they must be using Gateway with WARP mode which can be found by clicking the gear icon in the top right of the Warp agent. 

You can begin to enroll devices by creating a device enrollment rule. 

1. Go to Settings > Devices > Device enrollment.
1. Within Device enrollment permissions, select Manage.
1. Select Add a rule.
1. Determine who is allowed to enroll by using criteria including Access groups, groups from your identity provider, email domain, or named users. This example allows any user with a @example.com account to enroll.
1. Select Save.

Your rule will now be visible under the Device enrollment rules list.
To inspect traffic, Cloudflare requires that a certificate be installed on enrolled devices. You can also distribute this certificate through an MDM provider. The example below describes the manual distribution flow.

1. To download the Cloudflare certificate, refer to Install the Cloudflare certificate. 
1. To find the certificate in the Zero Trust Dashboard, go to Settings > Devices > Certificates.

Once the certificate has been installed, you can configure WARP to inspect HTTP traffic.

1. Go to Settings > Network.
1. Toggle Proxy to Enabled. This will tell Cloudflare to begin proxying any traffic from enrolled devices, except the traffic excluded using the split tunnel settings.
1. Toggle TLS decryption to Enabled. This will tell Cloudflare to begin decrypting traffic for inspection from enrolled devices, except the traffic excluded from inspection.

Follow the instructions to install the WARP client depending on your device type. Cloudflare Warp does not require a special version of the client.

1. Once the client is installed, select the gear icon.
1. Under the Account tab, select Login with Cloudflare Zero Trust.
1. Input your team name. You can find it on the Zero Trust Dashboard under Settings > General.

The user will be prompted to login with the identity provider configured in Cloudflare. Once authenticated, the client will update to “Zero Trust” mode. You can select the gear to toggle between DNS filtering or full proxy. Again, for this use case, you must select Gateway with WARP. These settings can be configured globally for an organization through a device management platform.
Once enrolled, your users will be able to connect to the private IPs configured for HTTP traffic in this example or arbitrary TCP traffic.

Once the WARP client is configured, the machine can be connected to by entering the private IP address into Microsoft Remote Desktop (instead of the public IP address we used initially). 

In Microsoft Remote Desktop:

1. Open Microsoft Remote Desktop and select Add a PC. 
1. In the PC Name field, add the private IP address of your VM
1. In the User Account field, add the auto-generated username and password we securely saved. 
1. To test Zero Trust connectivity, double click on the PC you just added to Microsoft Remote Desktop. 
    - You should now see a modal which asks you to click to Continue.
    - You should now be able to remotely access and configure your RDP server.

## Cloudflare Access
A tunnel for using RDP to access a machine can also be routed through a public hostname so it can be accessed without being on a virtual private network. The RDP traffic can then be proxied over this connection to access the content.
Connecting through a public hostname requires having an active zone in Cloudflare and having the daemons installed on the host or somewhere on the network that can reach the host and any client machines.

### Routing to the hostname

Create a tunnel through the Zero Trust Dashboard
1. Log in to the [Zero Trust Dashboard](http://dash.teams.cloudflare.com) and go to Access > Tunnels.
1. Select Create a tunnel.
1. Enter a name for your tunnel. Select Save tunnel.
1. Select the architecture of the windows device (32 or 64), download the cloudflared.msi file, and install it
1. Once the command has finished running, your connector will appear on the Zero Trust dashboard.
1. Select Next.
1. In the Public Hostnames tab, choose an application from the drop-down menu and specify any subdomain or path information (i.e rdp.example.com)
1. Specify the service. It will likely be port 80, 443, or 3389. (i.e. rdp://localhost:3389)

### Create a Zero Trust Policy
In the Access section of the [Zero Trust Dashboard](http://dash.teams.cloudflare.com), you will need to create a Self-hosted application and Zero Trust security policy to manage access to your RDP server. 

This will enable end users to authenticate with their single sign-on (SSO) provider and connect with the resources behind the tunnel.
To get started, navigate to Access > Applications > Create an [Application](/cloudflare-one/applications/configure-apps/self-hosted-apps/). 
[Policies](/cloudflare-one/policies/access/) can then be created for that specific application.

### Using cloudflared access to connect
The cloudflared daemon will need to be downloaded and installed on the client device in order to connect to the host server.
```sh
$ cloudflared access rdp --hostname rdp.example.com --url rdp://localhost:3389
```
In the RDP client enter localhost:3389 as the PC name, and the appropriate username and password if required. When the client launches a browser window will open and prompt the user to authenticate themselves. 
