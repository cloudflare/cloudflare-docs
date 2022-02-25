---
order: 3
pcx-content-type: how-to
---

# Upgrade your key server

To upgrade your key server:

1. Back up the contents of `/etc/keyless`.
1. Update your OS’ package listings, for example, `apt-get update` or `yum update`.
1. Upgrade the gokeyless server:
  1. Debian/Ubuntu: `apt-get upgrade gokeyless`
  1. RHEL/CentOS: `yum install gokeyless`
1. Restart the keyless instance:
  1. systemd: `service gokeyless restart`
  1. upstart/sysvinit: `/etc/init.d/gokeyless restart`
1. Confirm that HTTPS connections are working as expected.

<Aside type="warning">

If you are running a [high availability configuration](/keyless-ssl/reference/high-availability), upgrade one server at a time as new TLS connections will fail to terminate at Cloudflare’s edge without a functioning key server.

</Aside>
