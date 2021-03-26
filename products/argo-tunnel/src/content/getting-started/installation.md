---
order: 1
---

# Installation

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

Argo Tunnel requires the installation of a lightweight server-side daemon, `cloudflared`, to connect your infrastructure to Cloudflare. `cloudflared` is an [open source project](https://github.com/cloudflare/cloudflared) maintained by Cloudflare.

Releases can be [found on GitHub](https://github.com/cloudflare/cloudflared/releases). Downloads are available as standalone binaries or packages like Debian and RPM.

## Linux

Type   | amd64 / x86-64 | x86 (32-bit) | ARMv6 | ARM64 |
-------|----------------|--------------|------|------|
Binary | [Download](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-amd64.tgz) | [Download](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-386.tgz) | [Download](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-arm.tgz) | [Download from GitHub](https://github.com/cloudflare/cloudflared/releases) |
.deb   | [Download](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-amd64.deb) | [Download](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-386.deb) | [Download](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-arm.deb) | - |
.rpm   | [Download](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-amd64.rpm) | [Download](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-386.rpm) | [Download](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-arm.rpm) | - |

## Docker

A Docker image of `cloudflared` is [available on DockerHub](https://hub.docker.com/r/cloudflare/cloudflared).

## macOS

You can install `cloudflared` on macOS systems via Homebrew:

```sh
$ brew install cloudflare/cloudflare/cloudflared
```

Alternatively, you can download the latest Darwin amd64 release directly.

## Windows

Type   | 32-bit | 64-bit |
-------|----------------|-----|
ZIP | [Download](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-windows-386.zip) | [Download](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-windows-amd64.zip) |

Once `cloudflared` is installed:
1. Navigate to the **Downloads** folder.
2. Right-click on the ZIP folder and select `Extract All` to extract the executable.
3. Next, open PowerShell.
4. Navigate to the same Downloads folder.
5. Run the `cloudflared.exe` executable as an administrator to confirm the installation, replacing the path in the example below with the specifics of your directory:

```sh
PS C:\Users\Administrator\Downloads\cloudflared-stable-windows-amd64> .\cloudflared.exe --version
```

The command above should output the version of `cloudflared` if successfully installed.

<Aside>
Instances of `cloudflared` do not automatically update on Windows. You will need to perform manual updates.
</Aside>

## Updating `cloudflared`

You can update cloudflared by running the following command.

```bash
cloudflared update
```

The update will cause `cloudflared` to restart which would impact traffic currently being served. You can perform zero-downtime upgrades by using Cloudflare's Load Balancer product or by using multiple `cloudflared` instances.

### Updating with Cloudflare Load Balancer

We recommend this option if you are currently using Cloudflare's Load Balancer product with your Argo Tunnel deployment.

1. Install a new instance of `cloudflared` and [create](/create-tunnel) a new Argo Tunnel.
2. Configure the instance to point traffic to the same locally-available service as your current, active instance of `cloudflared`.
3. [Add the address](/routing-to-tunnel/lb) of the new instance of `cloudflared` into your Load Balancer pool as priority 2.
4. Swap the priority such that the new instance is now priority 1 and monitor to confirm traffic is being served.
5. Once confirmed, you can remove the older version from the Load Balancer pool.

### Updating with multiple `cloudflared` instances

1. Install a new instance of `cloudflared` and [create](/create-tunnel) a new Argo Tunnel.
2. Configure the instance to point traffic to the same locally-available service as your current, active instance of `cloudflared`.
3. In the Cloudflare DNS dashboard, [replace](/routing-to-tunnel/dns) the address of the current instance of `cloudflared` with the address of the new instance. Save the record.
4. Remove the now-inactive instance of `cloudflared`.


#### Running multiple instances in Windows

Windows systems require services to have a unique name and display name. You can run multiple instances of `cloudflared` by creating `cloudflared` services with unique names.

First, install and configure `cloudflared`. Next, create a service with a unique name and point to the `cloudflared` executable and configuration file.

`sc.exe create <unique-name> binPath='<path-to-exe>' --config '<path-to-config>' displayname="Unique Name"`

Proceed to create additional services with unique names. You can now start each unique service.

`sc.exe start <unique-name>`

## Deprecated versions

Cloudflare currently supports all versions of `cloudflared`. Starting on March 20, 2021, Cloudflare will no longer support versions released prior to 2020.5.1.

All features available in versions released prior to 2020.5.1 are available in current versions. Breaking changes unrelated to feature availability may be introduced that will impact versions released prior to 2020.5.1.

| Version(s) | Deprecation status |
|---|---|
| 2020.5.1 and later | Supported |
| Versions prior to 2020.5.1 | Will no longer be supported starting March 20, 2021 |
