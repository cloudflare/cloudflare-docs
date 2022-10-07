---
pcx_content_type: reference
title: Supported fields and operators
weight: 51
---

# Supported fields and operators

The fields available for load balancing rules depend on whether Cloudflare proxies the traffic going through your load balancer.

If you use the wrong type of fields, you might see unexpected behavior from load balancing rules. For best results, always use the fields associated with your traffic's proxy status.

![Choose load balancer fields based on the proxy status header](/load-balancing/static/images/proxy-status.png)

## Fields supported regardless of proxy

Regardless of whether your traffic is proxied, you have access to the following fields:

- **IP address** (`ip.src`) {{<type>}}IP&nbsp;address{{</type>}}: Varies based on whether your traffic is proxied:
  - *Proxied*: Provides the client TCP IP address, which may be adjusted to reflect the actual address of the client by using HTTP headers such as `X-Forwarded-For` or `X-Real-IP`.
  - *DNS-only*: Provides the ECS source address, if available. If not available, then provides the client resolver IP.
- **Load Balancer Region** (`cf.load_balancer.region`) {{<type>}}bytes{{</type>}}: Provides the [region name](/load-balancing/reference/region-mapping-api/#list-of-load-balancer-regions) of the data center processing the request.
- **Load Balancer Name** (`cf.load_balancer.name`) {{<type>}}bytes{{</type>}}: Provides the name of the load balancer executing these rules.

## Proxied traffic

If your traffic is proxied, you have access to all the fields listed under **Proxied Only** and [**Both**](#fields-supported-regardless-of-proxy), such as:

- `Request Method`
- `URI`
- `Timestamp`
- `Header`

For the most up to date list of these fields, [create a load balancing rule](/load-balancing/additional-options/load-balancing-rules/create-rules/) in the UI.

For more details about the field type or properties, refer to the [Rules language documentation](/ruleset-engine/rules-language/fields/).

## Unproxied traffic

If your traffic is not proxied through Cloudflare, you have access to all the fields listed under **Unproxied only** and [**Both**](#fields-supported-regardless-of-proxy).

Cloudflare Load Balancers support the following unproxied fields:

<table style="width:100%">
  <thead>
    <tr>
      <th style="width:20%">Name in Expression Builder</th>
      <th style="width:40%">Field</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Query Type</td>
      <td valign="top"><code>dns.qry.type</code><br />{{<type>}}Int{{</type>}}</td>
      <td>
        <p>The numeric value of the <a href= "https://en.wikipedia.org/wiki/List_of_DNS_record_types">DNS query type</a>
        </p>
        <p>Example Values:</p>
          <ul>
              <li><code class="InlineCode">1 (A record)</code></li>
              <li><code class="InlineCode">28 (AAAA record)</code></li>
          </ul>
      </td>
    </tr>
      <tr>
      <td>Question</td>
      <td valign="top"><code>dns.qry.typ</code><br />{{<type>}}boolean{{</type>}}</td>
      <td>
        <p>A boolean indicating that the received DNS message was a question</p>
      </td>
    </tr>
    <tr>
      <td>Query Name</td>
      <td valign="top"><code>dns.qry.name</code><br />{{<type>}}Bytes{{</type>}}</td>
      <td>
        <p>The byte of the query name asked, such as <code>example.com</code> </p>
      </td>
    </tr>
    <tr>
      <td>Query Name Length</td>
      <td valign="top"><code class>dns.qry.name.len</code><br />{{<type>}}Int{{</type>}}</td>
      <td>
        <p>The length in bytes of the query name.
        </p>
      </td>
    </tr>  
    <tr>
      <td>ECS Exists</td>
      <td valign="top"><code class>dns.rr.opt.client</code><br />{{<type>}}boolean{{</type>}}</td>
      <td>
        <p>Whether the EDNS Client Subnet (ECS) address was sent with the DNS request.
        </p>
      </td>
    </tr>  
    <tr>
      <td>ECS Address</td>
      <td valign="top"><code class>dns.rr.opt.client.addr</code><br />{{<type>}}string{{</type>}}</td>
      <td>
        <p> If present, the ECS address sent with the DNS request.
        </p>
      </td>
    </tr>
  </tbody>
</table>

---

## Operators and grouping symbols

- **Comparison operators** specify how values defined in an expression must relate to the actual HTTP request value for the expression to return true.

- **Logical operators** combine two expressions to form a compound expression and use order of precedence to determine how an expression is evaluated.

- **Grouping symbols** allow you to organize expressions, enforce operator precedence, and nest expressions.

For examples and usage, refer to [Operators and grouping symbols](/ruleset-engine/rules-language/operators/) in the Rules language documentation.
