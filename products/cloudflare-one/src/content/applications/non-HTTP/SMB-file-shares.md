---
order: 4
---

# SMB file shares

<Aside>

<b>Requirements</b>

* A Cloudflare account
* An **<a href="https://support.cloudflare.com/hc/articles/201720164-Creating-a-Cloudflare-account-and-adding-a-website">active zone</a>**  on Cloudflare
* The `cloudflared` daemon installed on the host and client machines

</Aside>

The Server Message Block (SMB) protocol allows users to access, read, and write to shared files.

Cloudflare Access provides a mechanism for end users to authenticate with their single sign-on (SSO) provider and connect to shared files over SMB without being on a virtual private network (VPN).

This section will cover:
1. [How to connect the machine hosting the file share to Cloudflare](#host-machine)
2. [How to connect from a Client machine](#client-machine)

## Connect the machine hosting the file share to Cloudflare

### 1. Install The Cloudflare Daemon On The Machine Hosting The File Share

The Cloudflare daemon, `cloudflared`, will maintain a secure, persistent, outbound-only connection from the machine to Cloudflare. SMB traffic will be proxied over this connection using [Cloudflare Argo Tunnel](https://www.cloudflare.com/products/argo-tunnel/).

Follow [these instructions](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation) to download and install `cloudflared` on the machine hosting the file share.

For example, on a Windows server, the following Powershell example can be used.

```bash
New-Item -Path "C:\cloudflared" -ItemType "directory"
Set-Location "C:\cloudflared"
(New-Object System.Net.WebClient).DownloadFile("https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-windows-amd64.zip","c:\cloudflared\cloudflared.zip")
Expand-Archive -LiteralPath c:\cloudflared\cloudflared.zip -DestinationPath c:\cloudflared
```
### 2. Authenticate `cloudflared`

1. Run the following command to authenticate `cloudflared` into your Cloudflare account.

```bash
\cloudflared.exe tunnel login
```

`cloudflared` will open a browser window and prompt you to login to your Cloudflare account.

If you are working on a machine that does not have a browser, or a browser window does not launch, you can copy the URL from the command-line output and visit the URL in a browser on any machine.

2. Once you login, Cloudflare will display the sites that you added to your account.

3. Select the site where you will create a subdomain to represent the SMB file share.

4. For example, if you plan to share the drive at `smb.site.com` select site.com from the list.

5. Once selected, `cloudflared` will download a wildcard certificate for the site. This certificate will allow cloudflared to create a DNS record for a subdomain of the site.

### 3. Secure The Subdomain With Cloudflare Access

Next, protect the subdomain you plan to register with a Cloudflare Access application policy. Follow [these instructions](/getting-started/policies/) to build a new policy to control who can connect to the drive.

For example, if you share the drive at `smb.site.com`, build a policy to only allow your team members to connect to that subdomain.

### 4. Connect The Drive To Cloudflare

By default, SMB drives listen on ports `445` or `139`. Confirm which port your drive uses. You can use nonstandard ports, as well.
Run the following command to connect the drive to Cloudflare, replacing the `smb.site.com` and `445` values with your site and port.

```bash
\cloudflared.exe tunnel --hostname smb.site.com --url tcp://localhost:445
```

`cloudflared` will confirm that the connection has been established. The process needs to be configured to stay alive and autostart. If the process is killed, end users will not be able to connect.

## Connect the machine hosting the file share to Cloudflare

### 1. Install The Cloudflare Daemon On The Client Machine

Follow the same steps above to download and install `cloudflared` on the client desktop that will connect to the drive. `cloudflared` will need to be installed on each user device that will connect.

### 2. Connect To The SMB Drive

1. Run the following command to create a connection from the device to Cloudflare. Any available port can be specified.
```bash
\cloudflared.exe access tcp --hostname smb.site.com --url localhost:8445
```
This command can be wrapped as a desktop shortcut so that end users do not need to use the command line.

2. Open your SMB client and configure the client to point to `tcp:localhost:8445`. Do not input the hostname.

3. When the client launches, `cloudflared` will launch a browser window and prompt the user to authenticate with your SSO provider.

## Windows-specific requirements

If you are using a Windows machine, and cannot specify the port for SMB, you might need to disable the local Server. The local Server on a client machine uses the same default port for CIFS/SMB, port `445`, and by listening on that port by default the Server can block the Cloudflare Access connection.

The Windows Server service supports share actions over a network like file, print, and named-pipe. Disabling this service can cause those actions to fail to start.

On the Windows machine, locate the Server process, likely called `Server` and running as `services.msc`. Terminate this service in the Run dialog box and ensure it is disabled on boot. Next, follow the same steps for the `TCP/IP NetBIOS Helper` service.

<Aside>

Ensure that the machine's firewall permits egress on ports `80`, `443`, and `2244`, otherwise cloudflared will return an error.
</Aside>
