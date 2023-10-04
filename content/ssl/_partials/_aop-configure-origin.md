---
_build:
  publishResources: false
  render: never
  list: never
---

With the certificate installed, set up your origin web server to accept client certificates.

<details>
<summary>Apache example</summary>
<div>

For this example, you would have saved the certificate `/path/to/origin-pull-ca.pem`.

```txt
SSLVerifyClient require
SSLVerifyDepth 1
SSLCACertificateFile /path/to/origin-pull-ca.pem
```

</div>
</details>

<details>
<summary>NGINX example</summary>
<div>

For this example, you would have saved your certificate to `/etc/nginx/certs/cloudflare.crt`.

```txt
ssl_client_certificate /etc/nginx/certs/cloudflare.crt;
ssl_verify_client on;
```

</div>

</details>

At this point, you may also want to enable logging on your origin so that you can verify the configuration is working.