---
order: 9
hidden: true
---

# SMB File Shares

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

The Secure Messaging Block (SMB) protocol allows users to access, read, and write to shared files.

Cloudflare Access provides a mechanism for end users to authenticate with their single sign-on (SSO) provider and connect to shared files over SMB without being on a virtual private network (VPN).

### Requirements
* A Cloudflare account
* A site active on Cloudflare
* The `cloudflared` daemon installed on the host and client machines

> Cloudflare Access requires you to first [add a site](https://dash.cloudflare.com/sign-up) to Cloudflare. You can use any site you have registered; the site does not need to be the same one you use for customer traffic and it does not need to match sites in your internal DNS.
>
> Adding the site to Cloudflare requires changing your domain's authoritative DNS to point to Cloudflare's nameservers. Once configured, all requests to that hostname will be sent to Cloudflare's network first, where Access policies can be applied.

# **Connect the machine hosting the file share to Cloudflare**

## 1. Install the Cloudflare daemon on the machine hosting the file share

The Cloudflare daemon, `cloudflared`, will maintain a secure, persistent, outbound-only connection from the machine to Cloudflare. SMB traffic will be proxied over this connection using [Cloudflare Argo Tunnel](https://www.cloudflare.com/products/argo-tunnel/).

Follow [these instructions](https://developers.cloudflare.com/argo-tunnel/downloads/) to download and install `cloudflared` on the machine hosting the file share.

For example, on a Windows server, the following Powershell example can be used.

```bash
New-Item -Path "C:\cloudflared" -ItemType "directory"
Set-Location "C:\cloudflared"
(New-Object System.Net.WebClient).DownloadFile("https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-windows-amd64.zip","c:\cloudflared\cloudflared.zip")
Expand-Archive -LiteralPath c:\cloudflared\cloudflared.zip -DestinationPath c:\cloudflared
```

## 2. Authenticate the Cloudflare daemon

Run the following command to authenticate `cloudflared` into your Cloudflare account.

```bash
\cloudflared.exe tunnel login
```

`cloudflared` will open a browser window and prompt you to login to your Cloudflare account. If you are working on a machine that does not have a browser, or a browser window does not launch, you can copy the URL from the command-line output and visit the URL in a browser on any machine.

Once you login, Cloudflare will display the sites that you added to your account. Select the site where you will create a subdomain to represent the SMB file share. For example, if you plan to share the drive at `smb.site.com` select `site.com` from the list.

Once selected, `cloudflared` will download a wildcard certificate for the site. This certificate will allow `cloudflared` to create a DNS record for a subdomain of the site.

## 3. Secure the subdomain with Cloudflare Access

Next, protect the subdomain you plan to register with a Cloudflare Access policy. Follow [these instructions](/setting-up-access/configuring-access-policies/) to build a new policy to control who can connect to the drive.

For example, if you share the drive at `smb.site.com`, build a policy to only allow your team members to connect to that subdomain.

## 4. Connect the drive to Cloudflare

By default, SMB drives listen on ports 445 or 139. Confirm which port your drive uses. You can use nonstandard ports, as well.

Run the following command to connect the drive to Cloudflare, replacing the `smb.site.com` and `445` values with your site and port.

```bash
\cloudflared.exe tunnel --hostname smb.site.com --url tcp://localhost:445
```

`cloudflared` will confirm that the connection has been established. The process needs to be configured to stay alive and autostart. If the process is killed, end users will not be able to connect.

# **Connect from a client machine**

## 1. Install the Cloudflare daemon on the client machine

Follow the same steps above to download and install `cloudflared` on the client desktop that will connect to the drive. `cloudflared` will need to be installed on each user device that will connect.

## 2. Connect to the SMB drive

Run the following command to create a connection from the device to Cloudflare. Any available port can be specified.

```bash
\cloudflared.exe access tcp --hostname smb.site.com --url localhost:8445
```

This command can be wrapped as a desktop shortcut so that end users do not need to use the command line.

Open your SMB client and configure the client to point to `tcp:localhost:8445`. Do not input the hostname.

When the client launches, `cloudflared` will launch a browser window and prompt the user to authenticate with your SSO provider.

### Windows-specific requirements on the client

If you are using a Windows machine, and cannot specify the port for SMB, you might need to disable the local Server. The local Server on a client machine uses the same default port for CIFS/SMB, port 445, and by listening on that port by default the Server can block the Cloudflare Access connection.

*The Windows Server service supports share actions over a network like file, print, and named-pipe. Disabling this service can cause those actions to fail to start.*

On the Windows machine, locate the Server process, likely called "Server" and running as `services.msc`. Terminate this service in the Run dialog box and ensure it is disabled on boot. Next, follow the same steps for the "TCP/IP NetBIOS Helper" service.

**Common issues**

* Ensure that the machine's firewall permits egress on ports 80, 443, and 2244, otherwise `cloudflared` will return an error.