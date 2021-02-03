---
order: 30
---

# Automatically starting Argo Tunnel

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

Argo Tunnel can install itself as a system service on Linux and Windows and as a launch agent on macOS.

By default, Argo Tunnel expects all of the configuration to exist in the `cloudflared/config.yml` configuration file. The available options are documented on the [configuration file reference](../reference/config.md), but at a minimum you should set `hostname` and `url`.

## Linux

Run the following command:

```sh
$ sudo cloudflared service install
```

If you have already logged in and have a certificate and (optionally) configuration file in `~/.cloudflared/`, these will be copied to `/etc/cloudflared/`. If you do not have a configuration file, you will need to create a `config.yml` file in the `etc/cloudflared` directory. The file must contain at least the following arguments:

```yml
hostname: tunnel.yourdomain.com
url: https://localhost:8000
logfile: /var/log/cloudflared.log
```

Sometimes firewalls or unusual network configuration can prevent `cloudflared` from automatically installing the certificate. If this occurs, your browser will download the certificate as a file named `cert.pem` after you login. You should see it in your browser's standard list of downloaded files. You'll need to move that `cert.pem` file from your browser's downloads folder into the `~/.cloudflared` folder. Copy and paste the following command to move the certificate to the `~/.cloudflared` directory on your system.

```sh
$ mv cert.pem ~/.cloudflared/cert.pem
```

## macOS

To run at login, open a Terminal and run the following command:

```sh
$ cloudflared service install
```

Argo Tunnel will be installed as a launch agent, and start whenever you log in, using your local user configuration found in `~/.cloudflared/`.

You can manually start the service by running:

```sh
$ launchctl start com.cloudflare.cloudflared
```

Output will be logged to `~/Library/Logs/com.cloudflare.cloudflared.err.log` and `~/Library/Logs/com.cloudflare.cloudflared.out.log`.

If you wish to run at boot, open a Terminal and run the following command:

```sh
$ sudo cloudflared service install
```

Argo Tunnel will be installed as a launch daemon, and start whenever your system boots, using your configuration found in `/etc/cloudflared`.

You can manually start the service by running:

```sh
$ sudo launchctl start com.cloudflare.cloudflared
```

Output will be logged to `/Library/Logs/com.cloudflare.cloudflared.err.log` and `/Library/Logs/com.cloudflare.cloudflared.out.log`.

## Windows

Open a Command Prompt with Administrator privileges, then type the following command:

```bash
PS C:\Cloudflared> .\cloudflared.exe service install
```

When running as a service, Argo Tunnel expects its configuration at `C:\Windows\system32\config\systemprofile\.cloudflared\config.yml` (assuming Windows is installed to C:\). You can copy your local configuration from `%UserProfile%\.cloudflared\config.yml`.

If you need to specify a custom config file location, you can do so in the the Windows registry after the service has been installed ([MSDN reference](https://docs.microsoft.com/en-us/dotnet/api/system.serviceprocess.servicebase.onstart?view=netframework-4.7.2)). Open `regedit`, go to the registry key `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Cloudflared`, and edit the `ImagePath` value to include `--config <path-to-config>`.

<Aside>

When running cloudflared as a service on Windows, the certificate path needs to be explicitly specified. This can be done in the config file:

```yaml
origincert: C:\ABSOLUTE\PATH\TO\cert.pem
```

In some cases, forward slashes should be used to set the explicit path to the certificate.

* In "Raw" YAML scalars, the backslash should be used directly. For example, `C:\cert.pem`.
* In single-quoted scalars, the backslash should be used directly. For example, `'C:\cert.pem'`.
* In double-quoted scalars, a forward slash should be used or the backslash should be escaped. For example, `"C:\\cert.pem"`.

```yaml
origincert: C:/cert.pem
```
</Aside>

<Aside>

`cloudflared` will set up Recovery Properties of the service so it restarts on failure, but **this feature is not fully supported on Windows Server 2003 and Windows XP.**

</Aside>

<Aside>

`cloudflared` does not support loading the system certificate pool in Windows.
To supply a certificate pool to `cloudflared` in Windows, encode the pool into a PEM file and supply it through the `--origin-ca-pool` flag.
</Aside>

To start the service, go to Service Manager and start the **Argo Tunnel agent** service, or run the following command:

```bash
C:\> sc start cloudflared
```

If you are a Powershell user, run this command instead:

```bash
PS C:> Start-Service cloudflared
```
