---
pcx_content_type: tutorial
title: Installation overview
weight: 2
---

# Installation overview

{{<render file="_railgun-deprecation-notice.md">}}

## Package Repository

Railgun is available only for 64-bit systems. The best way of installing Railgun is via the [Package Repository](https://pkg.cloudflare.com/). Run the commands mentioned on the Package Repository page in order to set this up. Debian, CentOS, Red Hat Enterprise Linux, and Amazon Linux users may use the Railgun binary package repository. Ubuntu and Debian users will be automatically subscribed to the `apt` repo after installing one of the packages linked below. Other users will need to install the `cloudflare-release` RPM as described on the repository home page. Installation of that RPM will install the repository and GPG key.

Once this has been set up, run the following command as root:

### RPM-based

```sh
$ yum install railgun-stable
```

### DEB-based

```sh
$ apt-get install railgun-stable
```

## System Startup

Installing the package will automatically add `/etc/init.d/railgun` to be started on boot on GNU/Linux.