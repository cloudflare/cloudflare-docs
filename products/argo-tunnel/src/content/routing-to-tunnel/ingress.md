---
order: 20
---

# Ingress rules

| Before you start |
|---|
| 1. [Add a website to Cloudflare](https://support.cloudflare.com/hc/en-us/articles/201720164-Creating-a-Cloudflare-account-and-adding-a-website) |
| 2. [Change your domain nameservers to Cloudflare](https://support.cloudflare.com/hc/en-us/articles/205195708) |
| 3. [Enable Argo Smart Routing for your account](https://support.cloudflare.com/hc/articles/115000224552-Configuring-Argo-through-the-UI) |
| 4. [Install `cloudflared` and authenticate the software](/getting-started) |
| 5. [Create an Argo Tunnel](/create-tunnel) |

Each incoming request received by `cloudflared` causes `cloudflared` to send a request to a local service.
By configuring **ingress rules** in the [configuration file](/configuration/config), you can specify which local services a request should be proxied to.

## Matching traffic

When `cloudflared` gets an incoming request, it evaluates each ingress rule from top to bottom to find which rule matches the request. Rules can match either the hostname or path of an incoming request, or both.

If a rule doesn't specify a hostname, all hostnames will be matched. If a rule doesn't specify a path, all paths will be matched.

The last rule you list in the config file must be a catch-all rule that matches all traffic; otherwise, `cloudflared` won't be able to respond to all requests.

This is an example config file that specifies several different rules:

```yaml
ingress:
  # Rules map traffic from a hostname to a local service:
  - hostname: example.com
    service: https://localhost:8000
  # Rules can match the request's path to a regular expression:
  - hostname: static.example.com
    path: /*.(jpg|png|css|js)
    service: https://localhost:8001
  # Rules can match the request's hostname to a wildcard character:
  - hostname: "*.example.com"
    service: https://localhost:8002
  # An example of a catch-all rule:
  - service: https://localhost:8003
```

## Supported protocols

In addition to HTTP, `cloudflared` supports protocols like SSH, RDP, arbitrary TCP services, and unix sockets. See a [list of supported protocols](https://developers.cloudflare.com/access/protocols-and-connections).

You can also route traffic to the built-in *Hello World* test server. This is useful when you need to test your Argo Tunnel protocol.

```yaml
ingress:
  # Example of a request over TCP:
  - hostname: example.com
    service: tcp://localhost:8000
  # Example of a request over a Unix socket:
  - hostname: staging.example.com
    service: unix:/home/production/echo.sock
  # Example of a request mapping to the Hello World test server:
  - hostname: test.example.com
    service: hello_world
  # Example of a rule responding to traffic with an HTTP status:
  - service: http_status:404
```

With the catch-all rule, you can set `cloudflared` to respond to traffic with an HTTP status.


| Service | Description | Example `service` value |
|--|--|--|--|
| HTTP/S | Incoming HTTP requests are proxied directly to your local service | `https://localhost:8000` |
| HTTP/S over unix socket | Just like HTTP/S, but using a unix socket instead | `unix:/home/production/echo.sock` |
| TCP, RDP, SSH, SMB, kubectl to a single address | TCP requests are proxied to your local service. [Learn more](https://developers.cloudflare.com/access/protocols-and-connections). | `ssh://localhost:2222` |
| TCP, RDP, SSH, SMB, kubectl bastion mode | `cloudflared` will act like a jumphost, allowing access to any local address. | `bastion` |
| Hello World | Test server for validating your Argo Tunnel setup | `hello_world` |
| HTTP status | Responds to all requests with the given HTTP status | `http_status:404` |

## Single-service configuration

If you need to proxy traffic to only one local service, you can do so using the config file. As an alternative, you can set up single-service configurations using command line flags.

This is an example of a single service configured on the command line:

```bash
cloudflared tunnel --url localhost:8000 --no-chunked-encoding run mytunnel
```

## Origin configuration

You can configure various properties of the requests `cloudflared` makes. For example, you can set a specific host header, or you can use a specific number of keep-alive connections. For a complete list of configuration options, see the [configuration](/configuration) page.

The `originRequest` key in the root of your configuration file lets you configure these requests. Each local service will inherit this root-level config, and can override it with their own service-specific configuration.

```yaml
originRequest: # Root-level configuration
  connectTimeout: 30s
ingress:
  # Example of a rule inheriting the root-level connectTimeout of 30 seconds:
  - hostname: example.com
    service: localhost:8000
  # Example of a rule overriding the root-level connectTimeout of 30 seconds:
  - service: localhost:8001
    originRequest:
      connectTimeout: 10s
      disableChunkedEncoding: true
```


## Validating your configuration

To validate the ingress rules in your configuration file, run:

```bash
$ cloudflared tunnel ingress validate
```

This will ensure that the set of ingress rules specified in your config file is **valid**.

## Testing your configuration

To verify that `cloudflared` will proxy the right traffic to the right local service, use `cloudflared tunnel ingress rule`. This checks a URL against every rule, from first to last, and shows the first rule that matches. For example:

```bash
$ cloudflared tunnel ingress rule https://foo.example.com
Using rules from /usr/local/etc/cloudflared/config.yml
Matched rule #3
	hostname: *.example.com
	service: https://localhost:8000
```
