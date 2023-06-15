---
pcx_content_type: reference
title: Using Railgun with Origin CA Certificates
weight: 5
---

# Using Railgun with Origin CA Certificates

{{<render file="_railgun-deprecation-notice.md">}}

While using Railgun and configuring Origin CA certificates, you will need additional steps to avoid service impact for HTTPS requests being sent from the listener to the site's origin (where the origin CA certificates are installed). This happens because the default trust store shipped with the Railgun Listener is an identical copy of the root certificates that it trusts (identical to what NSS/Mozilla trusts).

This means that when enabling Full SSL (Strict) in the dashboard while Railgun is enabled, the listener will no longer consider the origin presenting the Origin CA certificate as trustworthy, resulting in a `520` error.

{{<Aside type="note">}}

This error condition will only occur if `validate.cert` is enabled (for example, set to `1`) from the `railgun.conf` file.

{{</Aside>}}

Here is an example of the error generated when `validate.cert = 1`, the origin uses an Origin CA leaf, and the Origin CA roots are not in the trust store for Railgun specified by `ca.bundle`:

```txt
rg-listener: [2a074d8b36f00000-ATL] www.example.com origin request failed 123.123.123.123:443 to %!!(MISSING)s(MISSING): x509: certificate signed by unknown authority
```

Here are the following options available to avoid these errors:

1.  Set `validate.cert = 0` in the `railgun.conf` file.
2.  Add to the trust store specified in the `ca.bundle` parameter in the `railgun.conf`. This can be done by simply adding these root certificates at the end of the file using a text editor.

By default, `railgun.conf` defines the listener's trust store as `ca.bundle = /etc/ssl/railgun-ca-certs.crt` (for Debian/Ubuntu).

{{<Aside type="note">}}

You will need to restart the listener after making changes to the configuration file.

{{</Aside>}}
