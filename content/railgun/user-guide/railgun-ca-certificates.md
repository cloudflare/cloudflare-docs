---
pcx_content_type: reference
title: Using Railgun with Origin CA Certificates
weight: 24
---

# Using Railgun with Origin CA Certificates

While using Railgun and configuring Origin CA certificates, please note that additional steps are needed to avoid service impact for HTTPS requests being sent from the Listener to the site's origin (where the origin CA certificates are installed). This is due to the default trust store that is shipped with the Railgun Listener being an identical copy of the root certificates that it trusts (identical to what NSS/Mozilla trusts).

This means that when enabling Full SSL (Strict) in the dashboard while Railgun is enabled, the Listener will no longer consider the origin presenting the Origin CA certificate as trustworthy, resulting in a 520 error.

{{<Aside>}}

**Note**: This error condition will only occur if `validate.cert` is enabled (for example, set to **1**) from the `railgun.conf` file.

{{</Aside>}}

Here is an example of the error generated when `validate.cert = 1`, the origin uses an Origin CA leaf, and the Origin CA roots are not in the trust store for Railgun specified by `ca.bundle`:

    rg-listener: [2a074d8b36f00000-ATL] www.example.com origin request failed 123.123.123.123:443 to %!!(MISSING)s(MISSING): x509: certificate signed by unknown authority

Here are the following options available to avoid these errors:

1.  Set `validate.cert = 0` in the `railgun.conf` file.
2.  Add to the trust store specified in the `ca.bundle` parameter in the `railgun.conf`. This can be done by simply adding these root certificates at the end of the file using a text editor.

By default, `railgun.conf` defines the Listener's trust store as (for Debian/Ubuntu): `ca.bundle = /etc/ssl/railgun-ca-certs.crt`.

{{<Aside>}}

**Note**: As a reminder, the Listener will need to be restarted after making changes to the configuration file.

{{</Aside>}}
