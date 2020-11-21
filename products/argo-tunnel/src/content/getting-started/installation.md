---
order: 1
---

# Installation

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

### Cloudflare Load Balancer

We recommend this option if you are currently using Cloudflare's Load Balancer product with your Argo Tunnel deployment.

1. Install a new instance of `cloudflared` and [create](/create-tunnel/index) a new Argo Tunnel.
2. Configure the instance to point traffic to the same service or URL as your current, active instance of `cloudflared`.
3. [Add the address]((/routing-to-tunnel/lb)) of the new instance of `cloudflared` into your Load Balancer pool as priority 2.
4. Swap the priority such that the new instance is now priority 1 and monitor to confirm traffic is being served.
5. Once confirmed, you can remove the older version from the Load Balancer pool.

### Running multiple `cloudflared` instances

1. Install a new instance of `cloudflared` and [create](/create-tunnel/index) a new Argo Tunnel.
2. Configure the instance to point traffic to the same service or URL as your current, active instance of `cloudflared`.
3. In the Cloudflare DNS dashboard, [replace](/routing-to-tunnel/dns) the address of the current instance of `cloudflared` with the address of the new instance. Save the record.
4. Remove the now-inactive instance of `cloudflared`.
