---
pcx-content-type: concept
title: Cloudflare Load Balancer
weight: 0
---

# Cloudflare Load Balancer

You can configure Spectrum and Cloudflare's Load Balancing to provide TCP healthchecks, failover, and traffic steering to bring resiliency to your Spectrum applications. To prevent issues with DNS resolution for a Spectrum application, do not use the same Spectrum hostname as a current Load Balancing hostname.

{{<Aside type="note" header="Note">}}

This feature requires an Enterprise plan. If you would like to upgrade, contact your account team.

{{</Aside>}}

## TCP health checks

You can configure Cloudflare's Load Balancer to probe any TCP port for an accepted connection, which is in addition to HTTP and HTTPS probing capabilities.

Health Checks are optional within a Load Balancer. However, without a health check, the load balancer will distribute traffic to all origins in the first pool. With the Health Checks enabled, hosts that have gone into an error state will not receive traffic maintaining uptime. This allows you to enable intelligent failover within a pool of hosts or amongst multiple pools.

The example below shows a TCP health check configuration for an application running on port 2408 with a refresh rate every 30 seconds. You can configure TCP health checks through the dashboard or through Cloudflare's API.

<details>
<summary>
  TCP health check - Dashboard example
</summary>
<div class="special-class" markdown="1">

![Health Check UI](/spectrum/img/load-balancing/spectrum-tcp-check.png)

</div>
</details>

<details>
<summary>
  TCP health check - API example
</summary>
  <div class="special-class" markdown="1">
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">'https://api.cloudflare.com/client/v4/organizations/{ORG_ID}/load_balancers/monitors'</span><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">-H </span><span class="CodeBlock--token-string">'Content-Type: application/json'</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">-H </span><span class="CodeBlock--token-string">'X-Auth-Email: user@example.com'</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">-H </span><span class="CodeBlock--token-string">'X-Auth-Key: 00000000000'</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">-X POST --data </span><span class="CodeBlock--token-string">'{&quot;description&quot;:&quot;Spectrum Health Check&quot;,&quot;type&quot;:&quot;tcp&quot;,&quot;port&quot;:2048,&quot;interval&quot;:30,&quot;retries&quot;:2,&quot;timeout&quot;:5,&quot;method&quot;:&quot;connection_established&quot;}'</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-json" language="json"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;description&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;Spectrum Health Check&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;type&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;tcp&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;port&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-number">2048</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;interval&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-number">30</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;retries&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-number">2</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;timeout&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-number">5</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;method&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;connection_established&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

</div>
</details>

## Weights

[Origin Weights](/load-balancing/understand-basics/traffic-steering/origin-level-steering/#weights) allow you to have origins without the same capacity or allow you to split traffic amongst hosts for any other reason.

Weight configured within a load balancer pool will be honored with load balancing through Spectrum. If configured, Cloudflare will distribute traffic amongst the available origins within a pool according to the relative weights assigned to each origin.

## Traffic steering policies

All pool steering modes are available for transport load balancing through Spectrum:

- [Standard failover](/load-balancing/understand-basics/traffic-steering/steering-policies/standard-options/#off---failover): Traffic goes from unhealthy pools to the next healthy pool in your configuration.
- [Dynamic steering](/load-balancing/understand-basics/traffic-steering/steering-policies/dynamic-steering/): Traffic goes to the fastest pool for a given user.
- [Geo steering](/load-balancing/understand-basics/traffic-steering/steering-policies/geo-steering/): Traffic goes to a specific geographic region or — for Enterprise customers only — specific data centers.
- [Proximity steering](/load-balancing/understand-basics/traffic-steering/steering-policies/proximity-steering/): Traffic goes to the closest physical data center.

## Load balancing rules

Currently, you cannot use [load balancing custom rules](/load-balancing/additional-options/load-balancing-rules/) with Cloudflare Spectrum.

For more information about setting up a Load Balancer to use with Spectrum, refer to [Create a Load Balance](/spectrum/how-to/create-load-balancer/).
