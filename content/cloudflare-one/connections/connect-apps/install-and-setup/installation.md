---
pcx-content-type: reference
title: Downloads
weight: 2
---

# Downloads

{{<render file="_cloudflared-new-ui.md">}}

Cloudflare Tunnel requires the installation of a lightweight server-side daemon, `cloudflared`, to connect your infrastructure to Cloudflare. `cloudflared` is an [open source project](https://github.com/cloudflare/cloudflared) maintained by Cloudflare.

Releases can be [found on GitHub](https://github.com/cloudflare/cloudflared/releases). Downloads are available as standalone binaries or packages like Debian and RPM.

Detailed release notes can be found on the [GitHub RELEASE_NOTES file](https://github.com/cloudflare/cloudflared/blob/master/RELEASE_NOTES).

## Linux

Download and install `cloudflared` via the [Cloudflare Package Repository](https://pkg.cloudflare.com/).

Alternatively, download the latest release directly.

{{<table-wrap>}}

| Type   | amd64 / x86-64                                                                                              | x86 (32-bit)                                                                                             | ARM                                                                                                      | ARM64                                                                                                        |
| ------ | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Binary | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64)      | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-386)     | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm)     | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64)       |
| .deb   | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb)  | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-386.deb) | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm.deb) | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb)   |
| .rpm   | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-x86_64.rpm) | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-386.rpm) | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm.rpm) | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-aarch64.rpm) |

{{</table-wrap>}}

## macOS

Download and install `cloudflared` via Homebrew:

```sh
$ brew install cloudflare/cloudflare/cloudflared
```

Alternatively, [download the latest Darwin amd64 release directly](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-darwin-amd64.tgz).

## Windows

Download and install `cloudflared` via winget in either Powershell or CMD:

```batch
winget install cloudflared```
  
Alternatively, download the [32](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-386.exe) or [64](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe) release directly

{{<Aside>}}

Instances of `cloudflared` do not automatically update on Windows. To update run ``winget upgrade cloudflared``

{{</Aside>}}

## Docker

A Docker image of `cloudflared` is [available on DockerHub](https://hub.docker.com/r/cloudflare/cloudflared).

## Update `cloudflared`

You can update cloudflared by running the following command.

```bash
cloudflared update
```

The update will cause `cloudflared` to restart which would impact traffic currently being served. You can perform zero-downtime upgrades by using Cloudflare's Load Balancer product or by using multiple `cloudflared` instances.

### Updating with Cloudflare Load Balancer

You can update `cloudflared` without downtime by using Cloudflare's Load Balancer product with your Cloudflare Tunnel deployment.

1.  Install a new instance of `cloudflared` and [create](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/) a new Tunnel.
2.  Configure the instance to point traffic to the same locally-available service as your current, active instance of `cloudflared`.
3.  [Add the address](/cloudflare-one/connections/connect-apps/routing-to-tunnel/lb/) of the new instance of `cloudflared` into your Load Balancer pool as priority 2.
4.  Swap the priority such that the new instance is now priority 1 and monitor to confirm traffic is being served.
5.  Once confirmed, you can remove the older version from the Load Balancer pool.

### Updating with multiple `cloudflared` instances

If you are not using Cloudflare's Load Balancer, you can use multiple instances of `cloudflared` to update without the risk of downtime.

1.  Install a new instance of `cloudflared` and [create](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/) a new Tunnel.
2.  Configure the instance to point traffic to the same locally-available service as your current, active instance of `cloudflared`.
3.  In the Cloudflare DNS dashboard, [replace](/cloudflare-one/connections/connect-apps/routing-to-tunnel/dns/) the address of the current instance of `cloudflared` with the address of the new instance. Save the record.
4.  Remove the now-inactive instance of `cloudflared`.

#### Running multiple instances in Windows

Windows systems require services to have a unique name and display name. You can run multiple instances of `cloudflared` by creating `cloudflared` services with unique names.

First, install and configure `cloudflared`. Next, create a service with a unique name and point to the `cloudflared` executable and configuration file.

```bash
sc.exe create <unique-name> binPath='<path-to-exe>' --config '<path-to-config>' displayname="Unique Name"
```

Proceed to create additional services with unique names. You can now start each unique service.

```bash
sc.exe start <unique-name>
```

## Deprecated versions

Cloudflare currently supports versions of `cloudflared` 2020.5.1 and later. Breaking changes unrelated to feature availability may be introduced that will impact versions released prior to 2020.5.1. You can read more about upgrading `cloudflared` in our [developer documentation](/cloudflare-one/connections/connect-apps/install-and-setup/installation/#updating-cloudflared).

| Version(s)                 | Deprecation status  |
| -------------------------- | ------------------- |
| 2020.5.1 and later         | Supported           |
| Versions prior to 2020.5.1 | No longer supported |
