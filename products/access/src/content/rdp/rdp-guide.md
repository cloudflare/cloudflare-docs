---
order: 400
---

# Remote Desktop Protocol

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

The Remote Desktop Protocol (RDP) allows end users to connect to a desktop from a different machine.

Cloudflare Access provides a mechanism for end users to authenticate with their single sign-on (SSO) provider and connect to shared files over RDP without being on a virtual private network (VPN).

You can choose to deploy the Cloudflare agent on every target desktop or deploy it once, in a bastion mode, in your target environment.

### Requirements
* A Cloudflare account
* A site active on Cloudflare
* The `cloudflared` daemon installed on the host and client machines

If you have an origin that serves both RDP and HTTP requests, you need to place those services on separate domains or subdomains. Otherwise, errors occur when attempting to access the machine over different protocols. For example, requests made in a web browser will route over RDP and fail.

> To use Cloudflare Access, you first need to [add a site](https://dash.cloudflare.com/sign-up) to Cloudflare. You can use any site you have registered; the site does not need to be the same one you use for customer traffic and it does not need to match sites in your internal DNS.
>
> Adding the site to Cloudflare requires changing your domain's authoritative DNS to point to Cloudflare's nameservers. Once configured, all requests to that hostname will be sent to Cloudflare's network first, where Access policies can be applied.

# **Connect the remote desktop to Cloudflare**

## 1. Install the Cloudflare daemon on the remote machine

The Cloudflare daemon, `cloudflared`, will maintain a secure, persistent, outbound-only connection from the machine to Cloudflare. RDP traffic will be proxied over this connection using [Cloudflare Argo Tunnel](https://www.cloudflare.com/products/argo-tunnel/).

Follow [these instructions](https://developers.cloudflare.com/argo-tunnel/downloads/) to download and install `cloudflared` on the machine hosting the file share. Select the version depending on your architecture, 64-bit or 32-bit.

Place the `cloudflared` executable in a location accessible to the OS, for example:

```bash
C:\Cloudflared\bin\cloudflared.exe
```

Next, run CMD as an administrator to install the service.

![Open at login](/static/rdp/admin.png)

```bash
C:\Cloudflared\bin\cloudflared.exe service install
```

By default, the agent will run as a Local Account service and will look for the configuration and certificate file in the `systemprofile`. Run the following command to create a new directory within `systemprofile`.

```bash
mkdir C:\Windows\System32\config\systemprofile\.cloudflared
```

## 2. Authenticate the Cloudflare daemon

Run the following command to authenticate `cloudflared` into your Cloudflare account.

```bash
C:\Cloudflared\bin\cloudflared.exe login
```

`cloudflared` will open a browser window and prompt you to login to your Cloudflare account. If you are working on a machine that does not have a browser, or a browser window does not launch, you can copy the URL from the command-line output and visit the URL in a browser on any machine.

Once you login, Cloudflare will display the sites that you added to your account. Select the site where you will create a subdomain to represent the remote desktop. For example, if you plan to share the desktop at `rdp.site.com`, select `site.com` from the list. Each remote desktop requires a unique subdomain.

The file will download to the user profile. This must be copied to the `systemprofile` directory created previously.

```bash
copy C:\Users\%USERNAME%\.cloudflared\cert.pem C:\Windows\System32\config\systemprofile\.cloudflared
```

Once selected, `cloudflared` will download a wildcard certificate for the site. This certificate will allow `cloudflared` to create a DNS record for a subdomain of the site.

Finally, `cloudflared` will use a YML file for configuration. Run `Notepad.exe` as an administrator. This must be done as an administrator since this file will be saved to the system directory.

```bash
hostname: rdp.site.com
url: rdp://localhost:3389
logfile: C:\Windows\System32\config\systemprofile\.cloudflared\tunnel.log
```

Save this file to the following location.

```
C:\Windows\System32\config\systemprofile\.cloudflared\config.yml`
```

## 3. Secure the subdomain with Cloudflare Access

Next, protect the subdomain you plan to register with a Cloudflare Access policy. Follow [these instructions](/setting-up-access/configuring-access-policies/) to build a new policy to control who can connect to the desktop.

For example, if you share the desktop at `rdp.site.com`, build a policy to only allow your team members to connect to that subdomain.

## 4. Connect the remote desktop to Cloudflare

By default, the RDP protocol listens on port 3389. Confirm which port your remote desktop protocol uses. You can use nonstandard ports, as well.

If you are not using a configuration file, you can run the following command to connect the desktop to Cloudflare, replacing the `rdp.site.com` and `445` values with your site and port.

```bash
\cloudflared.exe tunnel --hostname rdp.site.com --url rdp://localhost:3389
```

If you are using an internal DNS and the target machine is running on a hostname, you will need to modify the command to start the Tunnel without TLS verification to avoid certificate mismatches. For example, if the remote desktop server is available at `rdp.internal.com`, the following command can be run.

```sh
$ cloudflared tunnel --hostname rdp.site.com --no-tls-verify --origin-server-name rdp.internal.com --url rdp://localhost:433
```

If you are using the configuration file created in Step 2 above, you can start the service from the Windows services panel or run:

```sh
$ sc start cloudflared
```

In both operations, `cloudflared` will confirm that the connection has been established. The process needs to be configured to stay alive and autostart. If the process is killed, end users will not be able to connect.

## 5. Bastion model

Instead of deploying `cloudflared` on each target machine, you can deploy it once in a private subnet in bastion or jump host model. To do so, follow steps 1 through 3 above and then use the configuration below. Ensure that the Access policy is in place before creating this connection as the connection will allow lateral traffic within the subnet.

```sh
$ cloudflared tunnel --hostname rdp.site.com --bastion
```

The command above will allow traffic to be proxied through `cloudflared` and to one of many target desktops in your network. End users will need to specify the destination of the specific desktop, which is documented below.

> This command will allow everything that can be routed from `cloudflared` to be reachable through the Tunnel. Ensure your network is properly segmented to avoid issues.

**Common issues**

* Ensure that the machine's firewall permits egress on ports 80, 443, and 3389, otherwise `cloudflared` will return an error.

# **Connect from a client machine**

## 1. Install the Cloudflare daemon on the client machine

Follow the same steps above to download and install `cloudflared` on the client desktop that will connect to the remote desktop. `cloudflared` will need to be installed on each user device that will connect.

## 2. Connect to the remote desktop

Run the following command to create a connection from the device to Cloudflare. Any available port can be specified.

```bash
\cloudflared.exe access rdp --hostname rdp.site.com --url localhost:2244
```

This command can be wrapped as a desktop shortcut so that end users do not need to use the command line.

Open your RDP client and configure the client to point to `localhost:2244`. Do not input the hostname.

When the client launches, `cloudflared` will launch a browser window and prompt the user to authenticate with your SSO provider.

## 3. Bastion model

If you are deploying Cloudflare Access for RDP in a bastion model, end users will need to specify the local address of the specific desktop they want to reach. In most cases, this will be the names used when connecting over RDP on a VPN.

```bash
\cloudflared.exe access rdp --hostname rdp.site.com --url localhost:2244 --destination rdpserver:3389
```

Next, open the RDP client on the machine and continue to point it to `localhost:2244` and initiate the connection.

## 4. Configuring a desktop shortcut

### Windows

You can help end users connect without requiring the command line by providing them with a shortcut that can be launched from the desktop.

1. Ensure that [cloudflared.exe](https://developers.cloudflare.com/argo-tunnel/downloads/) is installed on the end user device and available in the Windows Path.
2. Right-click on the Windows desktop and select `New -> Shortcut`.
3. In the wizard that appears, paste in the following command with the hostname your team uses:

```sh
$ cloudflared access rdp --hostname monday.example.com --url localhost:2244
```

4. Click `Next` and complete the wizard

At this point the shortcut will now be on the desktop; users can launch with a double-click. This shortcut can then be distributed to end users along with `cloudflared`.

**Common issues**

* You may get a warning indicating that the `.exe` (`cloudflared.exe`) is unknown. This can be skipped by clicking `More Info` in the dialog box and then clicking `Run Anyway`. This will only appear one time.

* Ensure that RDP is enabled on the target Windows machine. If not, you may encounter an error: `No connection could be made because the target machine
 actively refused it.`.

### MacOS

MacOS users can save a command shortcut that will launch the RDP flow. The command below can be saved as a `.command` file that can be launched on login.

```bash
var=/Applications/CF-RDP-Tunnel.command &&
echo "`which cloudflared` access rdp --hostname monday.example.com --url localhost:2244 &" > $var &&
chmod +x $var
```

You can confirm this is successful with the following command.

```sh
$ lsof -nP -iTCP:2244 | grep LISTEN
```

The following command can be used to kill the process.

```sh
$ sudo kill -9 [process id]
```

The command can then be configured to run at device login by navigating to `System Preferences` -> `Users & Groups`.

Select the `+` sign. Navigate to `Macintosh HD/Applications` and double click on the `CF-RDP-Tunnel.command` file created previously.

![App](/static/rdp/app.png)

The default behavior in MacOS is for the Terminal window to stay open. This can be configured to close automatically.

![Open at login](/static/rdp/close-exit.png)

**Common issues**

* Ensure that the machine's firewall permits egress on ports 80, 443, and 2244, otherwise `cloudflared` will return an error.

## Video guide

In this video, you’ll learn how to use Cloudflare Access to protect a Remote Desktop Protocol (RDP) connection by setting up a secure link with Argo Tunnel.

<StreamVideo id="2a3073fb7881b4fcba4b9e3709dfaacf"/>
