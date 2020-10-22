---
order: 5
---

# Upgrading your key server

<Aside type="warning">

If you are running in a high availability configuration, you should make sure to upgrade one server at a time as new TLS connections will fail to terminate at Cloudflare’s edge without a functioning key server.

</Aside>

1. Back up the contents of /etc/keyless.
2. Update your OS’ package listings, e.g., `apt-get update` or `yum update`
3. Upgrade the gokeyless server:
  1. Debian/Ubuntu: `apt-get upgrade gokeyless`
  2. RHEL/CentOS: `yum install gokeyless`
4. Restart the keyless instance:
  1. systemd: `service gokeyless restart`
  2. upstart/sysvinit: `/etc/init.d/gokeyless restart`
5. Confirm that HTTPS connections are working as expected.
