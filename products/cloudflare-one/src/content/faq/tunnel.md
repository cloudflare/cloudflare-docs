---
order: 0
---

# Troubleshooting and FAQ

This section addresses the most common issues you may come across when setting up or using Cloudflare for Teams.

<ButtonGroup>
  <Button type="primary" href="/faq/access/">Access</Button>
  <Button type="primary" href="/faq/gateway/">Gateway</Button>
  <Button type="primary" href="/faq/warp/">WARP client</Button>
  <Button type="primary" href="/faq/tunnel/">Argo Tunnel</Button>
  <Button type="primary" href="/faq/browser-isolation/">Browser Isolation</Button>  
  <Button type="primary" href="/faq/self-diagnostics/">Self diagnostics</Button> 
</ButtonGroup>

## Argo Tunnel help

### What causes tunnels to fail to authenticate?
To start using Argo Tunnel, a super administrator in the Cloudflare account must first log in through `cloudflared login`.
The client will launch a browser window and prompt the user to select a hostname in their Cloudflare account. Once selected, Cloudflare generates a certificate that consists of three components:

1. The public key of the origin certificate for that hostname
2. The private key of the origin certificate for that domain
3. A token that is unique to Argo Tunnel

Those three components are bundled into a single PEM file that is downloaded one time
during that login flow. The host certificate is valid for the root domain and any subdomain
one-level deep. Cloudflare uses that certificate file to authenticate `cloudflared` to
create DNS records for your domain in Cloudflare.

The third component, the token, consists of the zone ID (for the selected domain) and
an API token scoped to the user who first authenticated with the login command. When user
permissions change (if that user is removed from the account or becomes an admin of another
account, for example), Cloudflare rolls the user's API key. However, the certificate file
downloaded through `cloudflared` retains the older API key and can cause authentication
failures. The user will need to login once more through `cloudflared` to regenerate the
certificate. Alternatively, the administrator can create a dedicated service user to authenticate.

### What can cause a `websocket: bad handshake` error?

If your Cloudflare account has Universal SSL enabled and the `SSL/TLS encryption mode` is set to `Off`, `cloudflared` will return a `"websocket: bad handshake"` error. To resolve, set the `SSL/TLS encryption mode` to any setting other than `Off`. 

### What are the ports and IPs used by `cloudflared`?

Users can implement a positive security model with Argo Tunnel by restricting traffic originating from cloudflared. The parameters below can be configured for egress traffic inside of a firewall.

- TCP port 7844 (HTTPS)
- IPs are those behind **region1.argotunnel.com** and **region2.argotunnel.com** \*

Below the output of `dig` commands towards the above hostnames:

```bash

$ dig region1.argotunnel.com
...

;; ANSWER SECTION:
region1.argotunnel.com.	86400	IN	A	198.41.192.7
region1.argotunnel.com.	86400	IN	A	198.41.192.47
region1.argotunnel.com.	86400	IN	A	198.41.192.107
region1.argotunnel.com.	86400	IN	A	198.41.192.167
region1.argotunnel.com.	86400	IN	A	198.41.192.227

...

$ dig region2.argotunnel.com

...

;; ANSWER SECTION:
region2.argotunnel.com.	300	IN	A	198.41.200.193
region2.argotunnel.com.	300	IN	A	198.41.200.233
region2.argotunnel.com.	300	IN	A	198.41.200.13
region2.argotunnel.com.	300	IN	A	198.41.200.53
region2.argotunnel.com.	300	IN	A	198.41.200.113

...
```

\* *These IP addresses are unlikely to change but in the event that they do, Cloudflare will update the information here.*

### Can a user create an Argo Tunnel for an apex domain?

Yes. With [Named Tunnels](https://blog.cloudflare.com/argo-tunnels-that-live-forever/) you can create a CNAME at the apex that points to the named tunnel.

### Does Argo Tunnel support Websockets?

Argo Tunnel has full support for Websockets.

### How can Tunnel be used with Partial DNS (CNAME Setup)?

Cloudflare offers two modes of setup: Full Setup, in which the domain uses Cloudflare DNS name servers, and Partial Setup (also known as CNAME setup) in which the domain uses non-Cloudflare DNS servers.

The best experience with Argo Tunnel is using Full Setup because Cloudflare manages DNS for the domain and can automatically configure DNS records for newly started Tunnels.

You can still use Tunnel with Partial Setup. You will need to create a new DNS record with your current DNS provider for each new hostname connected through Argo Tunnel. The DNS record should be of type CNAME or ALIAS if it is on the root of the domain. The name of the record should be the subdomain it corresponds to (e.g. example.com or tunnel.example.com) and the value of the record should be subdomain.domain.tld.cdn.cloudflare.net. (e.g. example.com.cdn.cloudflare.net or tunnel.example.com.cdn.cloudflare.net)

### How are records managed after a Tunnel has been unregistered?

Tunnel deletes DNS records after 24-48 hours of being unregistered. Tunnel does not delete TLS certificates on your behalf once the tunnel is shut down. If you want to clean up a tunnel you’ve shut down, you can delete DNS records [in the DNS editor](https://dash.cloudflare.com/?zone=dns) and revoke TLS certificates in the Origin Certificates section of the [SSL/TLS tab of the Cloudflare dashboard](https://dash.cloudflare.com?to=/:account/:zone/ssl-tls/origin).

### Where can audit logs be found?

Audit Logs for Tunnel are available in the [account section of the Cloudflare dashboard](https://dash.cloudflare.com/?account=audit-log) which you can find by clicking on your name or email in the upper right-hand corner of the dashboard. The following actions are logged:

Action       | Description
-------------|--------------
Registered   | This is logged when Tunnel is started and connects to the Cloudflare edge.
Unregistered | This is logged when Tunnel is disconnected from the Cloudflare edge.
CNAME add    | This is logged when Tunnel registers a new DNS (CNAME or AAAA) record for the tunneled application.

### How can origin servers be secured when using Tunnel?

Tunnel can expose web applications to the internet that sit behind a NAT or firewall. Thus, you can keep your web server otherwise completely locked down. To double check that your origin web server is not responding to requests outside Cloudflare while Tunnel is running you can run netcat in the command line:

```bash
netcat -zv [your-server’s-ip-address] 80
netcat -zv [your-server’s-ip-address] 443
```

If your server is still responding on those ports, you will see:

```bash
[ip-address] 80 (http) open
```

If your server is correctly locked down, you will see:

```bash
[ip-address] 443 (https): Connection refused
```

### Why does the name "warp" appear in some legacy materials?

Argo Tunnel was previously named Warp during the beta phase. As Warp was added to the Argo product family, we changed the name to match.

### What is the maximum number of tunnels that can be run per account?

Argo Tunnel allows a maximum number of 1000 concurrently running tunnels per account.

### How is traffic encrypted between Argo Tunnel and HTTPs origin servers?

The Argo Tunnel daemon, `cloudflared`, performs its own SSL termination that is distinct from the origin.

The data in transit between the Cloudflare network and the instance of `cloudflared` is encrypted according to the stages below.

**`cloudflared` to Cloudflare**

* When `cloudflared` reaches out to the Cloudflare network, the daemon validates a TLS server name for `cftunnel.com`.
* The certificate is issued from a Cloudflare-managed root CA.

Details for this flow are available in the `cloudflared` repository [here](https://github.com/cloudflare/cloudflared/blob/2020.2.0/tlsconfig/certreloader.go#L124).

**`cloudflared` to origin**

* `cloudflared` trusts the system's certificate pool. If you need to add an additional CA, you can do so by setting the `--origin-ca-pool` flag.
* On Windows systems, the system certificate pool is not supported by the Go standard library used by `cloudflared`. As a result, Windows users will always need to set the `--origin-ca-pool` flag.
* `cloudflared` uses the Go HTTP client to connect to the origin. The daemon connects to the URL specified with the `--url` flag, which determines the TLS server name.
* When the Cloudflare network proxies a request through `cloudflared` to the origin, `cloudflared` converts this stream to an HTTP/1.1 [request](https://github.com/cloudflare/cloudflared/blob/2020.2.0/origin/tunnel.go#L591).
* `cloudflared` then issues the request and [receives](https://github.com/cloudflare/cloudflared/blob/2020.2.0/origin/tunnel.go#L642) an HTTP/1.1 response from the origin, in plaintext, which is encrypted and sent back to the Cloudflare network.

Details for this flow are available in the `cloudflared` repository [here](https://github.com/cloudflare/cloudflared/blob/2020.2.0/cmd/cloudflared/tunnel/configuration.go#L204).

### What is the format of the output of the metrics endpoint in `cloudflared`?

The output adheres to a standard [Prometheus metrics format](https://prometheus.io/docs/concepts/data_model/). The data can also [be added](https://prometheus.io/docs/introduction/first_steps/#configuring-prometheus) as a scrape target by a Prometheus server.

### What is the difference between Tunnel creating a CNAME or AAAA record in the hostname's DNS setting?

Tunnels that use Cloudflare's Load Balancer use CNAME records. Tunnels that do not use the Load Balancer product will create AAAA records.

### Does Argo Tunnel send visitor IPs to my origin?

No. When using Argo Tunnel, all requests to the origin are made internally between `cloudflared` and the origin.

To log external visitor IPs, you will need to [configure an alternative method](https://support.cloudflare.com/hc/en-us/articles/200170786-Restoring-original-visitor-IPs-Logging-visitor-IP-addresses-with-mod-cloudflare-).

### When does the cert.pem generated expire?
The Argo Tunnel login command generates an origin certificate and a service token. Both are stored in the `cert.pem`. The origin certificate is valid for at least 10 years and the service token is valid until revoked.

### How to revoke the credentials for a tunnel?
When you (as an administrator in possession of the cert.pem obtained with `cloudflared login`) create a tunnel via
`cloudflared tunnel create` this generates a JSON credentials file. That file can be distributed to other users (who do
not have the cert.pem) and they will (only) be able to start connections to serve that tunnel origin.

However, at some point in time you (as an administrator) may want to revoke those credentials. The correct way to do so
is by deleting that tunnel by its name. Doing so will stop the active
connections and prevent users (in possession of the tunnel credentials file) from starting them again.

### Did `cloudflared` run?

```sh
$ kubectl logs -lapp=hello -c tunnel
```

Returns logs from the cluster in the container, tunnel, where `cloudflared` is running as a sidecar.

### Did the cluster's deployment fail?

```sh
$ kubectl describe po -lapp=hello
```

Returns information about the pod running the containers.
Errors related to the failure to start the `cloudflared` process can be
gathered with this command.
