---
pcx-content-type: reference
title: Ingress rules
weight: 2
---

# Ingress rules

Each incoming request received by `cloudflared` causes `cloudflared` to send a request to a local service.
By configuring ingress rules in the [configuration file](/cloudflare-one/connections/connect-apps/configuration/configuration-file/), you can specify which local services a request should be proxied to.

You can define ingress rules in the configuration file.

## Requirements

Configuration files that contain ingress rules must always include a catch-all rule that concludes the file.

In the following example, `- service: http_status:404` serves as the catch-all rule for the file. The file also includes the Tunnel UUID, the path to the credentials file, and two ingress rules. Alternatively, the Tunnel UUID or name can be specified in the `tunnel run` command.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-yml" language="yml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-atrule">tunnel</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> 6ff42ae2</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">765d</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">4adf</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">8112</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">31c55c1551ef</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-key CodeBlock--token-atrule">credentials-file</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> /root/.cloudflared/6ff42ae2</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">765d</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">4adf</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">8112</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">31c55c1551ef.json</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-key CodeBlock--token-atrule">ingress</span><span class="CodeBlock--token-punctuation">:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-atrule">hostname</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> gitlab.widgetcorp.tech</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-key CodeBlock--token-atrule">service</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> http</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain">//localhost</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-number">80</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-atrule">hostname</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> gitlab</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">ssh.widgetcorp.tech</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-key CodeBlock--token-atrule">service</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> ssh</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain">//localhost</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-number">22</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-atrule">service</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> http_status</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-number">404</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

## Matching traffic

{{<Aside type="note">}}

You can use wildcards to match traffic to multiple subdomains or paths. For example, if you set the `hostname` key to `*.example.com`, both `test.example.com` and `try.example.com` will route traffic to your origin.

{{</Aside>}}

When `cloudflared` receives an incoming request, it evaluates each ingress rule from top to bottom to find which rule matches the request. Rules can match either the hostname or path of an incoming request, or both.

If a rule does not specify a hostname, all hostnames will be matched. If a rule does not specify a path, all paths will be matched.

The last rule you list in the config file must be a catch-all rule that matches all traffic.

This is an example config file that specifies several rules:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-yml" language="yml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-atrule">tunnel</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> 6ff42ae2</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">765d</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">4adf</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">8112</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">31c55c1551ef</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-key CodeBlock--token-atrule">credentials-file</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> /root/.cloudflared/6ff42ae2</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">765d</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">4adf</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">8112</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">31c55c1551ef.json</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-key CodeBlock--token-atrule">ingress</span><span class="CodeBlock--token-punctuation">:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment"># Rules map traffic from a hostname to a local service:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-atrule">hostname</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> example.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-key CodeBlock--token-atrule">service</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> https</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain">//localhost</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-number">8000</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment"># Rules can match the request's path to a regular expression:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-atrule">hostname</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> static.example.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-key CodeBlock--token-atrule">path</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> /</span><span class="CodeBlock--token-important">*.(jpg|png|css|js)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-key CodeBlock--token-atrule">service</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> https</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain">//localhost</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-number">8001</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment"># Rules can match the request's hostname to a wildcard character:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-atrule">hostname</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">'*.example.com'</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-key CodeBlock--token-atrule">service</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> https</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain">//localhost</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-number">8002</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment"># An example of a catch-all rule:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-atrule">service</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> https</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain">//localhost</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-number">8003</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

## Supported protocols

In addition to HTTP, `cloudflared` supports protocols like SSH, RDP, arbitrary TCP services, and Unix sockets. See a [list of supported protocols](/cloudflare-one/applications/non-http/).

You can also route traffic to the built-in _Hello World_ test server. This is useful when you need to test your Cloudflare Tunnel protocol.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-yml" language="yml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-atrule">tunnel</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> 6ff42ae2</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">765d</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">4adf</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">8112</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">31c55c1551ef</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-key CodeBlock--token-atrule">credentials-file</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> /root/.cloudflared/6ff42ae2</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">765d</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">4adf</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">8112</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">31c55c1551ef.json</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-key CodeBlock--token-atrule">ingress</span><span class="CodeBlock--token-punctuation">:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment"># Example of a request over TCP:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-atrule">hostname</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> example.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-key CodeBlock--token-atrule">service</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> tcp</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain">//localhost</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-number">8000</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment"># Example of an HTTP request over a Unix socket:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-atrule">hostname</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> staging.example.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-key CodeBlock--token-atrule">service</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> unix</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain">/home/production/echo.sock</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment"># Example of a request mapping to the Hello World test server:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-atrule">hostname</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> test.example.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-key CodeBlock--token-atrule">service</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> hello_world</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment"># Example of a rule responding to traffic with an HTTP status:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-atrule">service</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> http_status</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-number">404</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

With the catch-all rule, you can set `cloudflared` to respond to traffic with an HTTP status.

| Service                 | Description                                                                                      | Example `service` value           |
| ----------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------- |
| HTTP/S                  | Incoming HTTP requests are proxied directly to your local service.                               | `https://localhost:8000`          |
| HTTP over Unix socket | Just like HTTP, but using a Unix socket instead.                                               | `unix:/home/production/echo.sock` |
| HTTPS over Unix socket | Just like HTTPS, but using a Unix socket instead.                                               | `unix+tls:/home/production/echo.sock` |
| TCP                     | TCP connections are proxied to your local service.                                               | `tcp://localhost:2222`            |
| SSH                     | SSH connections are proxied to your local service. [Learn more](/cloudflare-one/tutorials/ssh/). | `ssh://localhost:22`              |
| RDP                     | RDP connections are proxied to your local service. [Learn more](/cloudflare-one/tutorials/rdp/). | `rdp://localhost:3389`            |
| kubectl bastion mode    | `cloudflared` will act like a jumphost, allowing access to any local address.                    | `bastion`                         |
| Hello World             | Test server for validating your Cloudflare Tunnel setup.                                         | `hello_world`                     |
| HTTP status             | Responds to all requests with the given HTTP status.                                             | `http_status:404`                 |

## Origin configuration

If you need to proxy traffic to multiple origins within one instance of `cloudflared`, you can define the way `cloudflared` sends requests to each service by specifying configuration options as part of your ingress rules.

In the following example, the top-level configuration `connectTimeout: 30s` sets a 30-second connection timeout for all services within that instance of `cloudflared`. The ingress rule for `service: localhost:8002` then configures an exception to the top-level configuration by setting `connectTimeout` for that service at `10s`. The 30-second connection timeout still applies to all other services.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-yml" language="yml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-atrule">tunnel</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> 6ff42ae2</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">765d</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">4adf</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">8112</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">31c55c1551ef</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-key CodeBlock--token-atrule">credentials-file</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> /root/.cloudflared/6ff42ae2</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">765d</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">4adf</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">8112</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">31c55c1551ef.json</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-key CodeBlock--token-atrule">originRequest</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-comment"># Top-level configuration</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-key CodeBlock--token-atrule">connectTimeout</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> 30s</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-key CodeBlock--token-atrule">ingress</span><span class="CodeBlock--token-punctuation">:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment"># This service inherits all configuration from the root-level config, i.e.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment"># it will use a connectTimeout of 30 seconds.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-atrule">hostname</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> example.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-key CodeBlock--token-atrule">service</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> localhost</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-number">8000</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-atrule">hostname</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> example2.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-key CodeBlock--token-atrule">service</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> localhost</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-number">8001</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment"># This service overrides some root-level config.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-atrule">service</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> localhost</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-number">8002</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-key CodeBlock--token-atrule">originRequest</span><span class="CodeBlock--token-punctuation">:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      </span><span class="CodeBlock--token-key CodeBlock--token-atrule">connectTimeout</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> 10s</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      </span><span class="CodeBlock--token-key CodeBlock--token-atrule">disableChunkedEncoding</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-boolean CodeBlock--token-important">true</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment"># Some built-in services (like `http_status`) don't use any config. So, this</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment"># rule will inherit all the config, but won't actually use it (because it just</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment"># responds with HTTP 404).</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-atrule">service</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> http_status</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-number">404</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

To set both top-level configurations and origin-specific configurations, you can use the following properties within `originRequest` rules:

- [connectTimeout](#connecttimeout)
- [tlsTimeout](#tlstimeout)
- [tcpKeepAlive](#tcpkeepalive)
- [noHappyEyeballs](#nohappyeyeballs)
- [keepAliveConnections](#keepaliveconnections)
- [keepAliveTimeout](#keepalivetimeout)
- [httpHostHeader](#httphostheader)
- [originServerName](#originservername)
- [caPool](#capool)
- [noTLSVerify](#notlsverify)
- [disableChunkedEncoding](#disablechunkedencoding)
- [proxyAddress](#proxyaddress)
- [proxyPort](#proxyport)
- [proxyType](#proxyyype)

### connectTimeout

Default: `30s`

Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to
establish TLS, which is controlled by [tlsTimeout](#tlstimeout).

### tlsTimeout

Default: `10s`

Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

### tcpKeepAlive

Default: `30s`

The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

### noHappyEyeballs

Default: `false`

Disable the "happy eyeballs" algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

### keepAliveConnections

Default: `100`

Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

### keepAliveTimeout

Default: `1m30s`

Timeout after which an idle keepalive connection can be discarded.

### httpHostHeader

Default: `""`

Sets the HTTP `Host` header on requests sent to the local service.

### originServerName

Default: `""`

Hostname that `cloudflared` should expect from your origin server certificate.

### caPool

Default: `""`

Path to the certificate authority (CA) for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.

### noTLSVerify

Default: `false`

Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.

### disableChunkedEncoding

Default: `false`

Disables chunked transfer encoding. Useful if you are running a WSGI server.

### proxyAddress

Default: `127.0.0.1`

`cloudflared` starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP.
This configures the listen address for that proxy.

### proxyPort

Default: `0`

`cloudflared` starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP.
This configures the listen port for that proxy. If set to zero, an unused port will randomly be chosen.

### proxyType

Default: `""`

`cloudflared` starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP.
This configures what type of proxy will be started. Valid options are:

- `""` for the regular proxy
- `"socks"` for a SOCKS5 proxy. Refer to the [tutorial on connecting through Cloudflare Access using kubectl](/cloudflare-one/tutorials/kubectl/) for more information.

## Validating your configuration

To validate the ingress rules in your configuration file, run:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ cloudflared tunnel ingress validate</span></div></span></span></span></code></pre>{{</raw>}}

This will ensure that the set of ingress rules specified in your config file is valid.

## Testing your configuration

To verify that `cloudflared` will proxy the right traffic to the right local service, use `cloudflared tunnel ingress rule`. This checks a URL against every rule, from first to last, and shows the first rule that matches. For example:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ cloudflared tunnel ingress rule https://foo.example.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Using rules from /usr/local/etc/cloudflared/config.yml</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Matched rule </span><span class="CodeBlock--token-comment">#3</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">	hostname: *.example.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">	service: https://localhost:8000</span></div></span></span></span></code></pre>{{</raw>}}
