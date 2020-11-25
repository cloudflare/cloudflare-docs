---
order: 30
---

# Run as a service

Argo Tunnel can install itself as a system service on Linux and Windows and as a launch agent on macOS.

By default, Argo Tunnel expects all of the configuration to exist in the `cloudflared/config.yml` configuration file. The available options are documented on the [configuration file reference](/configuration/config/), but at a minimum you must specify the following arguments to run as a service:

|Argument|Description|
|---|---|
|`url`|The destination for proxied traffic in your environment if your origin is not listening on localhost:8080|
|`tunnel`|The UUID of your Tunnel
|`credentials-file`|The location of the credentials file for your Tunnel|

You must [create the Tunnel](/create-tunnel), and its credentials file, prior to installing it as a service. Creating the Tunnel in advance will generate the `credentials` file.

If you do not want to create the tunnel in advance, you must install `cloudflared` with the `--legacy` flag.

## Linux

Run the following command:

```sh
$ sudo cloudflared service install
```

If you have already logged in and have a configuration file in `~/.cloudflared/`, these will be copied to `/etc/cloudflared/`.

If you do not have a configuration file, you will need to create a config.yml file with fields listed above. You can pass a custom file by running `cloudflared --config CONFIG-FILE service install`.

<Aside>

The above arguments are required for pre-configured Argo Tunnel deployments. If you are using legacy Argo Tunnel, without names, you can append the `--legacy` flag when running cloudflared tunnel install command.

</Aside>

## macOS

### Run at login

Open a Terminal and run the following command:

```sh
$ cloudflared service install
```

Argo Tunnel will be installed as a launch agent, and start whenever you log in, using your local user configuration found in `~/.cloudflared/`.

#### Manually start the service

Run the following command:

```sh
$ launchctl start com.cloudflare.cloudflared
```

Output will be logged to `~/Library/Logs/com.cloudflare.cloudflared.err.log` and `~/Library/Logs/com.cloudflare.cloudflared.out.log`.

### Run at boot

Run the following command:

```sh
$ sudo cloudflared service install
```

Argo Tunnel will be installed as a launch daemon, and start whenever your system boots, using your configuration found in `/etc/cloudflared`.

#### Manually start the service

Run the following command:

```sh
$ sudo launchctl start com.cloudflare.cloudflared
```

Output will be logged to `/Library/Logs/com.cloudflare.cloudflared.err.log` and `/Library/Logs/com.cloudflare.cloudflared.out.log`.

## Windows

To run as a service on Windows, you must specify four arguments in the configuration file.

|Argument|Description|
|---|---|
|`url`|The destination for proxied traffic in your environment if your origin is not listening on localhost:8080|
|`tunnel`|The UUID of your Tunnel
|`credentials-file`|The location of the credentials file for your Tunnel|
|`logfile`|The location to store `cloudflared` logs`


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

By default, the Windows service runs in “access” client mode. If you need to specify a custom config file location, you can do so in the Windows registry after the service has been installed ([MSDN reference](https://docs.microsoft.com/en-us/dotnet/api/system.serviceprocess.servicebase.onstart?view=netframework-4.7.2)):

1. Open `regedit`.
2. Go to the registry key `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Cloudflared`.
3. Edit the `ImagePath` value to include `--config <path-to-config>`.

Additionally, you will need to add `tunnel run` arguments and, in some cases, a pointer to the config file. For example: `.../cloudflared.exe tunnel [--config FILE] run`.

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

When running cloudflared as a service on Windows, the  path to the credentials file needs to be explicitly specified. This can be done in the config file:

```yaml
---
filename: config.yml
---
credentials-file: C:\ABSOLUTE\PATH\TO\UUID.json
```

In some cases, forward slashes should be used to set the explicit path to the credentials file.

* In "Raw" YAML scalars, the backslash should be used directly. For example, `C:\UUID.json`.
* In single-quoted scalars, the backslash should be used directly. For example, `'C:\UUID.json'`.
* In double-quoted scalars, a forward slash should be used or the backslash should be escaped. For example, `"C:\\UUID.json"`.

```yaml
---
filename: config.yml
---
credentials-file: C:/UUID.json
```

</Aside>

`cloudflared` will set up Recovery Properties of the service so it restarts on failure, but **this feature is not fully supported on Windows Server 2003 and Windows XP.**