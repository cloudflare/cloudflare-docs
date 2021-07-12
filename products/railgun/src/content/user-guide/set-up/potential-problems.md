---
title: Potential problems and common issues
order: 7
pcx-content-type: tutorial
---

# Potential problems

If you notice consistent 523, 524 or other error responses, please check the [System Status Map](https://www.cloudflarestatus.com/) and [contact support](https://support.cloudflare.com/) as needed. Railgun will fall-back to direct HTTP requests if our endpoints can’t contact your Railgun daemon, but consistent error responses may indicate a system or origin server problem. When contacting support, please provide a screenshot of ```http://www.yourdomain.com/cdn-cgi/trace``` if you are able, or a [traceroute](https://support.cloudflare.com/hc/en-us/articles/200169336-How-do-I-run-a-traceroute-) to your domain so we know which datacenter your requests are hitting. You can then [pause](https://support.cloudflare.com/hc/en-us/articles/200169176-How-do-I-temporarily-deactivate-Cloudflare-) Cloudflare via the website to disable the service and resume normal website traffic.

Railgun does not perform DNS queries when it receives a request for maximum efficiency and to prevent tampering. This means that the daemon is unaware of NAT routing or firewalls. NAT does not allow for addressing a public interface from within the associated LAN and Railgun requests will timeout and produce 502 errors. **This can be corrected by setting up a static IP mapping.** You can set that either through the hosts file for your system (usually at the path /etc/hosts) or through the `railgun-nat.conf` file in the same directory as the `railgun.conf` file. Please contact support if you require assistance with the NAT configuration file.


## Common issues

**Requests to** `example.com:2083` **go to port 443**

To run Railgun on non-standard ports you need to add the correct mapping to the `railgun-nat.conf` file. Otherwise, the connection goes to standard ports `80` or `443`. Example:

```txt
default = 127.0.0.1
example.com:2083 = 127.0.0.1:2083
```

---

**Railgun is returning an HTTP 502 in its error logs**

This commonly occurs when Railgun cannot reach your origin web server over port 443 (or port 80) within 30 seconds. Verify that the server your Railgun instance is on can connect via `telnet <host> 443`.

---

**Railgun is returning a** `connection failed 127.0.0.1:443/welcome.cloudflare.com: x509: certificate is valid for www.cloudflare.com, not welcome.cloudflare.com` **error**

Your origin webserver should have a certificate matching its hostname. If you are on an internal network and are aware of the risks, you can set `validate.cert = 0` in `railgun.conf` to turn off certificate validation (not recommended).

---

**I’m seeing** `bad Content-Length: "-1"`

Railgun expects that all POST, PUT, PATCH (and other non-idempotent methods) requests have either a `Content-Length` header or a `Transfer-Encoding: chunked` header present.

---

**There are errors containing** `memcached: connection failed` (Unix socket) **or** `dial tcp 127.0.0.1:11211: i/o timeout` (TCP) **in the logs**

Railgun cannot connect to the memcached server. These errors should not cause visible errors, but will cause Railgun to stream (and not compress) responses.

You should confirm that memcached is running, is accepting connections, and confirm the state of your memcached server via the memcached `stats` command.

---

**How can I tell what the compression ratio for a request is?**

`rg-diag` is installed alongside Railgun, and allows you to decode the `Cf-Railgun` header. Example:

```sh
$ bin/rg-diag -decode="151df128a1 2.05 0.009465 0031 5360"

Compression ratio 2.05%
Railgun version 5360
Railgun Flag map.file used to change IP
Railgun Flag rg-sender sent dictionary
Railgun Flag rg-listener found dictionary
```****
