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

`cloudflared` can accept traffic from many different domains, and proxy it to many different local services. Ingress
rules let you specify which local services a request should be proxied to. You can configure ingress rules in the
configuration file.

## Matching traffic

When `cloudflared` gets an incoming request, it evaluates each ingress rule from top to bottom to find which one matches
the request. Rules can match the hostname and/or path of an incoming request. The last rule you list in the config file
must be a catch-all rule that matches all traffic. If a rule doesn't specify a hostname, all hostnames will be matched.
If a rule doesn't specify a path, all paths will be matched.

This is an example config file that specifies several different rules:


```yaml
ingress:
  # Rules map traffic from a hostname to a local service
  - hostname: example.com
    service: https://localhost:8000
  # Rules can can optionally match the request's path to a regular expression.
  - hostname: static.example.com
    path: /*.(jpg|png|css|js)
    service: https://localhost:8001
  # You can use a wildcard subdomain in the hostname
  - hostname: "*.example.com"
    service: https://localhost:8002
  # The last rule must match all traffic (a "catch-all" rule).
  # This ensures ingress rules are exhaustive -- otherwise cloudflared wouldn't
  # be able to respond to all requests.
  - service: https://localhost:8003
```

To summarize: ingress rules match the URL of incoming traffic and proxy it to a given local service. Rules can match the
hostname and/or path of an incoming request. The last rule must be a catch-all rule that matches all traffic. If a rule
doesn't specify a hostname, all hostnames will be matched. If a rule doesn't specify a path, all paths will be matched.

## Types of local service

`cloudflared` supports more than just proxying traffic to an HTTP service running on localhost. Other options include
SSH, RDP, arbitrary TCP services, and unix sockets. You can also route traffic to the built-in Hello World test server,
or configure `cloudflared` to just respond with a certain HTTP status code.

```yaml
ingress:
  # Services don't have to use HTTP. List of other supported protocols here:
  # https://developers.cloudflare.com/access/protocols-and-connections
  - hostname: example.com
    service: tcp://localhost:8000
  # You can accept HTTP over a Unix socket too.
  - hostname: staging.example.com
    service: unix:/home/production/echo.sock
  # Traffic can be mapped to the built-in Hello World test server.
  # This could be useful for testing your Argo Tunnel deployment.
  - hostname: test.example.com
    service: hello_world
  # You can also respond to traffic with a HTTP status. This is particularly
  # useful for the catch-all rule -- you can just respond with e.g. HTTP 404.
  - service: http_status:404
```

For a complete list of non-HTTP protocols `cloudflared` supports, see [here](https://developers.cloudflare.com/access/protocols-and-connections).

## Configuring each origin

Each incoming request `cloudflared` receives causes `cloudflared` to send a request to a local service. You can configure
various properties of the requests `cloudflared` makes -- for example, setting a specific Host header or using a specific
number of keep-alive connections. You can configure these requests with the `originRequest` key in the root of your
configuration file. Each local service will inherit this root-level config, and can override it with their own
service-specific configuration. For example,

```yaml
originRequest: # Root-level configuration
  connectTimeout: 30s
ingress:
  # This service inherits all configuration from the root-level config, i.e.
  # it will use a connectTimeout of 30 seconds.
  - hostname: example.com
    service: localhost:8000
  # This service overrides some root-level config.
  - service: localhost:8001
    originRequest:
      connectTimeout: 10s
      disableChunkedEncoding: true
```

For a complete list of configuration options, see the [configuration](/configuration) page.

## Validating your configuration

To validate the ingress rules in your configuration file, simply run

```bash
$ cloudflared tunnel ingress validate
```

This will ensure your config file specifies a valid set of ingress rules.

## Testing your configuration

`cloudflared` can check which rule matches a given URL. Just use `cloudflared tunnel ingress rule`. For example:

```bash
$ cloudflared tunnel ingress rule https://foo.example.com
Using rules from /usr/local/etc/cloudflared/config.yml
Matched rule #3
	hostname: *.example.com
	service: https://localhost:8000
```

This checks the URL against every rule, from first to last, and shows the first rule that matches. This helps you verify
that `cloudflared` is going to proxy the right traffic to the right local service.

## Single-service configuration

To proxy traffic to _only one_ local service, you can:
 - Configure the service using the *configuration file* (the scenario covered so far)
 - Configure the service using the *command-line flags*, for example:

```bash
cloudflared tunnel --url localhost:8000 --no-chunked-encoding run mytunnel
```

For a complete list of configuration options, see the [configuration](/configuration) page.
