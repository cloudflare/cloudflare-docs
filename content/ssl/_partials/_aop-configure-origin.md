---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: param1;;param2
---

With the certificate installed, set up your origin web server to accept client certificates.

Check the examples below for Apache and NGINX or refer to your origin web server documentation - e.g. [HAProxy](https://www.haproxy.com/documentation/hapee/latest/security/authentication/client-certificate-authentication/), [Traefik](https://doc.traefik.io/traefik/https/tls/#client-authentication-mtls), [Caddy](https://caddyserver.com/docs/json/apps/http/servers/tls_connection_policies/client_authentication/mode/).

{{<details header="Apache example">}}

For this example, you would have saved the certificate to `/path/to/origin-pull-ca.pem`.

$1

```txt
SSLVerifyDepth 1
SSLCACertificateFile /path/to/origin-pull-ca.pem
```

{{</details>}}

{{<details header="NGINX example">}}

For this example, you would have saved your certificate to `/etc/nginx/certs/cloudflare.crt`.

$2

```txt
ssl_verify_client optional;
ssl_client_certificate /etc/nginx/certs/cloudflare.crt;
```

{{</details>}}

At this point, you may also want to enable logging on your origin so that you can verify the configuration is working.
