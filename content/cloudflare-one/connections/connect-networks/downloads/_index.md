---
pcx_content_type: reference
title: Downloads
weight: 2
layout: single
---

# Downloads

Cloudflare Tunnel requires the installation of a lightweight server-side daemon, `cloudflared`, to connect your infrastructure to Cloudflare. If you are [creating a tunnel through the dashboard](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/remote/), you can simply copy-paste the installation command shown in the dashboard.

To download and install `cloudflared` manually, use one of the following links.

## GitHub repository

`cloudflared` is an [open source project](https://github.com/cloudflare/cloudflared) maintained by Cloudflare.

- [All releases](https://github.com/cloudflare/cloudflared/releases)

- [Release notes](https://github.com/cloudflare/cloudflared/blob/master/RELEASE_NOTES)

## Latest release

### Linux

You can download and install `cloudflared` via the [Cloudflare Package Repository](https://pkg.cloudflare.com/).

Alternatively, download the latest release directly:

{{<table-wrap>}}

| Type   | amd64 / x86-64                                                                                              | x86 (32-bit)                                                                                             | ARM                                                                                                      | ARM64                                                                                                        |
| ------ | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Binary | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64)      | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-386)     | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm)     | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64)       |
| .deb   | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb)  | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-386.deb) | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm.deb) | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb)   |
| .rpm   | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-x86_64.rpm) | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-386.rpm) | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm.rpm) | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-aarch64.rpm) |

{{</table-wrap>}}

### macOS

Download and install `cloudflared` via Homebrew:

```sh
$ brew install cloudflare/cloudflare/cloudflared
```

Alternatively, download the [latest Darwin amd64 release](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-darwin-amd64.tgz) directly.

### Windows

Download and install `cloudflared` via [winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/):

```bash
winget install --id Cloudflare.cloudflared
```

Alternatively, download the latest release directly:

| Type       | 32-bit                                                                                                     | 64-bit                                                                                                       |
| ---------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Executable | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-386.exe) | [Download](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe) |

{{<Aside>}}

Instances of `cloudflared` do not automatically update on Windows. You will need to perform manual updates.

{{</Aside>}}

### Docker

A Docker image of `cloudflared` is [available on DockerHub](https://hub.docker.com/r/cloudflare/cloudflared).

## Deprecated releases

Cloudflare supports the previous year of `cloudflared` releases. For example, if the [latest version](https://github.com/cloudflare/cloudflared/releases) is `2023.5.1`, version `2022.5.1` and later are supported. Deprecated versions may be impacted by breaking changes unrelated to feature availability.

To update `cloudflared`, refer to [these instructions](/cloudflare-one/connections/connect-networks/downloads/update-cloudflared/).
