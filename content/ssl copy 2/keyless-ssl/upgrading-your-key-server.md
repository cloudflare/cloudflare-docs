---
pcx_content_type: how-to
title: Upgrade your key server
weight: 4
---

# Upgrade your key server

Periodically, you may need to update your key server when using Cloudflare's Keyless SSL.

To upgrade your key server:

1.  Back up the contents of `/etc/keyless`.
2.  Update your OS’ package listings, for example, `apt-get update` or `yum update`.
3.  Upgrade the gokeyless server:
4.  Debian/Ubuntu: `apt-get upgrade gokeyless`
5.  RHEL/CentOS: `yum install gokeyless`
6.  Restart the keyless instance:
7.  systemd: `service gokeyless restart`
8.  upstart/sysvinit: `/etc/init.d/gokeyless restart`
9.  Confirm that HTTPS connections are working as expected.

{{<Aside type="warning">}}

If you are running a [high availability configuration](/ssl/keyless-ssl/reference/high-availability/), upgrade one server at a time as new TLS connections will fail to terminate at Cloudflare’s edge without a functioning key server.

{{</Aside>}}
