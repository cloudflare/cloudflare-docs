---
order: 110
---

# Common Errors

## HTTP 502

A 502 Error means that the Cloudflare edge can establish a connection with the `cloudflared` client, but the `cloudflared` client is not able to establish a connection with the web server. If you see this error, you should double check that your web server is running on the same port you told `cloudflared` when starting Tunnel.

You may also get this error if the TLS certificate used by the webserver is not valid. Check the [Invalid TLS certificate](#invalid-tls) section for more information.

## HTTP 503

A 503 error means either that the tunnel has been unregistered, or that there is a delay in DNS propagation.  Tunnels are unregistered when all instances of `cloudflared` exit for a domain.  In this case, start `cloudflared` to resume service.  Argo-Tunnel uses DNS connect your tunnels, this means that initial bring-up of a tunnel will take a few seconds for DNS to update.  `cloudflared` will report when your tunnel is ready to service requests.

## TLS Errors

### Cannot validate certificate

If you are pointing `cloudflared` to a locally-available URL that is different from your hostname, you may get TLS errors. To tell `cloudflared` to ignore those errors, you can include the **no-tls-verify** flag.

Find more information on the **no-tls-verify** flag [here](/reference/arguments/#no-tls-verify).

### <a name="invalid-tls"></a> Invalid TLS certificate
If the TLS certificate used by the webserver is not valid, you may get a 502 Error.
If you run:

```bash
cloudflared tunnel --hostname example.com http://localhost:8080
```

then Tunnel expects a certificate for localhost. You can use the origin-server-name field to specify what the name is in the certificate:

```bash
cloudflared tunnel --hostname example.com --origin-server-name example.com http://localhost:8080
```