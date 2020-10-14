---
order: 30
---

# Run as a service

<Aside>

Running `cloudflared` as a service is not yet compatible with creating a Tunnel with a name. Instead, follow the instructions below
</Aside>

Argo Tunnel can install itself as a system service on Linux and Windows and as a launch agent on macOS.

By default, Argo Tunnel expects all of the configuration to exist in the `cloudflared/config.yml` configuration file. The available options are documented on the [configuration file reference](https://developers.cloudflare.com/argo-tunnel/configuration/config/), but at a minimum you should set `hostname` and `url`.

## Linux

Run the following command:

```bash
$ sudo cloudflared service install
```

 If you have already logged in and have a certificate and (optionally) configuration file in `~/.cloudflared/`, these will be copied to `/etc/cloudflared/`.
 
 If you do not have a configuration file, you will need to create a `config.yml` file in the `etc/cloudflared` directory. The file must contain at least the following arguments:

```yml
hostname: tunnel.yourdomain.com
url: https://localhost:8000
logfile: /var/log/cloudflared.log
```

Sometimes firewalls or unusual network configuration can prevent `cloudflared` from automatically installing the certificate. If this occurs, your browser will download the certificate as a file named `cert.pem` after you login. You should see it in your browser's standard list of downloaded files. You'll need to move that `cert.pem` file from your browser's downloads folder into the `~/.cloudflared` folder. Copy and paste the following command to move the certificate to the `~/.cloudflared` directory on your system.
```bash
$ mv cert.pem ~/.cloudflared/cert.pem
```

## macOS

### Run at login

Open a Terminal and run the following command:

```bash
$ cloudflared service install
```

Argo Tunnel will be installed as a launch agent, and start whenever you log in, using your local user configuration found in `~/.cloudflared/`.

#### Manually start the service

Run the following command:

```bash
$ launchctl start com.cloudflare.cloudflared
```

Output will be logged to `~/Library/Logs/com.cloudflare.cloudflared.err.log` and `~/Library/Logs/com.cloudflare.cloudflared.out.log`.

### Run at boot

Open a Terminal and run the following command:

```bash
$ sudo cloudflared service install
```

Argo Tunnel will be installed as a launch daemon, and start whenever your system boots, using your configuration found in `/etc/cloudflared`.

#### Manually start the service

Run the following command:

```bash
$ sudo launchctl start com.cloudflare.cloudflared
```

Output will be logged to `/Library/Logs/com.cloudflare.cloudflared.err.log` and `/Library/Logs/com.cloudflare.cloudflared.out.log`.

## Windows

1. Open a Command Prompt with Administrator privileges. 

2. Type the following command:

```bash
PS C:\Cloudflared> .\cloudflared.exe service install
```

Assuming Windows is installed to `C:\`, when running as a service, Argo Tunnel expects its configuration at:

 `C:\Windows\system32\config\systemprofile\.cloudflared\config.yml` .
 
You can copy your local configuration from:

 `%UserProfile%\.cloudflared\config.yml`.

### Specify a custom location for the config file

If you need to specify a custom config file location, you can do so in the the Windows registry after the service has been installed ([MSDN reference](https://docs.microsoft.com/en-us/dotnet/api/system.serviceprocess.servicebase.onstart?view=netframework-4.7.2)):

1. Open `regedit`. 
2. Go to the registry key `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Cloudflared`. 
3. Edit the `ImagePath` value to include `--config <path-to-config>`.

### Start the service

To start the service, go to Service Manager and start the **Argo Tunnel agent** service, or run the following command:
```bash
C:\> sc start cloudflared
```
If you are a Powershell user, run this command instead:
```bash
PS C:> Start-Service cloudflared
```
<Aside>

When running cloudflared as a service on Windows, the certificate path needs to be explicitly specified. This can be done in the config file:

```yaml
origincert: C:\ABSOLUTE\PATH\TO\cert.pem
```

In some cases, forward slashes should be used to set the explicit path to the certificate.

* In "Raw" YAML scalars, the backslash should be used direct. For example, `C:\cert.pem`.
* In single-quoted scalars, the backslash should be used direct. For example, `'C:\cert.pem'`.
* In double-quoted scalars, a forward slash should be used or the backslash should be escaped. For example, `"C:\\cert.pem"`.

```yaml
origincert: C:/cert.pem
```
</Aside>

<Aside>

Cloudflared will set up Recovery Properties of the service so it restarts on failure, but **this feature is not fully supported on Windows Server 2003 and Windows XP.**

</Aside>

<Aside>

Cloudflared does not support loading the system certificate pool in Windows.
To supply a certificate pool to Cloudflared in Windows, encode the pool into a PEM file and supply it through the `--origin-ca-pool` flag.
</Aside>