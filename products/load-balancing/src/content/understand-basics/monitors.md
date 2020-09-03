---
title: Monitors
alwaysopen: true
weight: 17
---

import {Notice} from 'cf-gatsby-theme'

### Overview

Cloudflare health checks track the health of pools. They are configured through monitors, which define what type of health check to run and how frequently to run them. Cloudflare monitors your servers from each of our data centers.

Health checks that result in a status change for an origin server are recorded as events in the Load Balancing event logs. You can create, attach, and configure health checks from either the Load Balancing dashboard or the Cloudflare API.

---

### Important notes

- **Availability monitoring checks the health of origin servers every 15 seconds**. It reports results via email notifications and the Cloudflare API.
- **The default retry rate is 5 retries/second** and is completely configurable. We do not recommend increasing the retry rate significantly. Retries use exponential backoff (1, 2, 4, 8, 16 seconds by default).
- **You can configure** **monitoring for specific URLs** by sending periodic HTTP requests to the load balancer, taking advantage of customizable intervals, timeouts, and status codes. Once an origin server is marked unhealthy, multi-region failover reroutes traffic to the next available server in failover order.
- **Load Balancing monitors use the following HTTP user-agen**t: `"Mozilla/5.0 (compatible; Cloudflare-Traffic-Manager/1.0; +https://www.cloudflare.com/traffic-manager/; pool-id: $poolid)"`. The `$poolid` contains the first 16 characters of the Load Balancing pool that is the target of the health check.
- **To prevent health checks from failing**, and to secure user infrastructure against spoofed checks from bad actors, we recommend the following:
  - Only accept connections to hosts listed in the [Cloudflare IP ranges](https://www.cloudflare.com/ips/) in your firewall or web-server.
  - Use Cloudflare's user agent (see below) to reject HTTP requests that don't come from these ranges.
  - Ensure that your firewall or web server does not block or rate limit Cloudflare health checks.

---

### Properties

Monitors support a great deal of customization and have the following properties:

<div class="overflow-scroll object-definition-table">
    <table class="table table-striped">
        <thead>
            <tr>
                <td>
                    Name
                    <small>/type</small></td>
                <td>
                    Description
                    <small>/example</small></td>
                <td>Constraints</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="param-name"><strong>port</strong>
                    <br /><small><em>integer</em></small></td>
                <td class="param-description object-definition-param-description">
                    <div>
                        <p>Port number to connect to for the health check. Required for TCP checks. HTTP and HTTPS checks should only define the port when using a non-standard port (HTTP: default 80, HTTPS: default 443).</p>
                    </div>
                    <div><small class="example-code"><code>8080</code></small></div>
                </td>
                <td class="param-constraints">
                    <ul class="constraints unstyled">
                        <li>default value: 0</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td class="param-name"><strong>method</strong>
                    <br /><small><em>string</em></small></td>
                <td class="param-description object-definition-param-description">
                    <div>
                        <p>The method to use for the health check. This defaults to 'GET' for HTTP/HTTPS based checks and 'connection_established' for TCP based health checks.</p>
                    </div>
                    <div><small class="example-code"><code>"GET"</code></small></div>
                </td>
                <td class="param-constraints">
                    <ul class="constraints unstyled">
                        <li>default value: GET</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td class="param-name"><strong>timeout</strong>
                    <br /><small><em>integer</em></small></td>
                <td class="param-description object-definition-param-description">
                    <div>
                        <p>The timeout (in seconds) before marking the health check as failed</p>
                    </div>
                    <div><small class="example-code"><code>3</code></small></div>
                </td>
                <td class="param-constraints">
                    <ul class="constraints unstyled">
                        <li>default value: 5</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td class="param-name"><strong>path</strong>
                    <br /><small><em>string</em></small></td>
                <td class="param-description object-definition-param-description">
                    <div>
                        <p>The endpoint path to health check against. This parameter is only valid for HTTP and HTTPS monitors.</p>
                    </div>
                    <div><small class="example-code"><code>"/health"</code></small></div>
                </td>
                <td class="param-constraints">
                    <ul class="constraints unstyled">
                        <li>default value: /</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td class="param-name"><strong>interval</strong>
                    <br /><small><em>integer</em></small></td>
                <td class="param-description object-definition-param-description">
                    <div>
                        <p>The interval between each health check. Shorter intervals may improve failover time, but will increase load on the origins as we check from multiple locations.</p>
                    </div>
                    <div><small class="example-code"><code>90</code></small></div>
                </td>
                <td class="param-constraints">
                    <ul class="constraints unstyled">
                        <li>default value: 60</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td class="param-name"><strong>retries</strong>
                    <br /><small><em>integer</em></small></td>
                <td class="param-description object-definition-param-description">
                    <div>
                        <p>The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.</p>
                    </div>
                    <div><small class="example-code"><code>0</code></small></div>
                </td>
                <td class="param-constraints">
                    <ul class="constraints unstyled">
                        <li>default value: 2</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td class="param-name"><strong>follow_redirects</strong>
                    <br /><small><em>boolean</em></small></td>
                <td class="param-description object-definition-param-description">
                    <div>
                        <p>Follow redirects if returned by the origin. This parameter is only valid for HTTP and HTTPS monitors.</p>
                    </div>
                    <div><small class="example-code"><code>true</code></small></div>
                </td>
                <td class="param-constraints">
                    <ul class="constraints unstyled">
                        <li>default value: false</li>
                        <li>valid values: (true,false)</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td class="param-name"><strong>probe_zone</strong>
                    <br /><small><em>string</em></small></td>
                <td class="param-description object-definition-param-description">
                    <div>
                        <p>(known as Simulate Zone in the UI) pushes a request from Cloudflare Health Monitors through the Cloudflare stack as if it were a real visitor request to help analyze behavior or validate a configuration.  It allows you to emulate the specified zone while probing.</p>
                    </div>
                </td>
                <td class="param-constraints">
                </td>
            </tr>
            <tr>
                <td class="param-name"><strong>expected_body</strong>
                    <br /><small><em>string</em></small></td>
                <td class="param-description object-definition-param-description">
                    <div>
                        <p>A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy. This parameter is only valid for HTTP and HTTPS monitors.</p>
  <Notice type="info">
  

  
  The sub-string must appear within the first 10KiB of your response body.
  </Notice>
                    </div>
                </td>
                <td><div><small class="example-code"><code>"alive"</code></small></div></td>
              </tr>
              <tr>
              <td class="param-name"><strong>header</strong>
                <br /><small><em>object</em></small></td>
              <td class="param-description object-definition-param-description">
                <div>
                    <p>The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only valid for HTTP and HTTPS monitors.</p>
                </div>
                </td>
                <td>
                <div><small class="example-code"><code>{`{
                "Host": [
                  "example.com"
                ],
                "X-App-ID": [
                  "abc123"
                ]
              }`}</code></small></div>
              </td>
            </tr>
            <tr>
                <td class="param-name"><strong>allow_insecure</strong>
                    <br /><small><em>boolean</em></small></td>
                <td class="param-description object-definition-param-description">
                    <div>
                        <p>Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors.</p>
                    </div>
                    <div><small class="example-code"><code>true</code></small></div>
                </td>
                <td class="param-constraints">
                    <ul class="constraints unstyled">
                        <li>default value: false</li>
                        <li>valid values: (true,false)</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td class="param-name"><strong>modified_on</strong>
                    <br /><small><em>string (date-time)</em></small></td>
                <td class="param-description object-definition-param-description">
                    <div>
                        <p>Last modification time</p>
                    </div>
                    <div><small class="example-code"><code>"2014-01-01T05:20:00.12345Z"</code></small></div>
                </td>
                <td class="param-constraints">
                    <ul class="constraints unstyled">
                        <li>read only</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td class="param-name"><strong>created_on</strong>
                    <br /><small><em>string (date-time)</em></small></td>
                <td class="param-description object-definition-param-description">
                    <div>
                        <p>Creation time</p>
                    </div>
                    <div><small class="example-code"><code>"2014-01-01T05:20:00.12345Z"</code></small></div>
                </td>
                <td class="param-constraints">
                    <ul class="constraints unstyled">
                        <li>read only</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td class="param-name"><strong>type</strong>
                    <br /><small><em>string</em></small></td>
                <td class="param-description object-definition-param-description">
                    <div>
                        <p>The protocol to use for the health check. Currently supported protocols are 'HTTP','HTTPS' and 'TCP'.</p>
                    </div>
                    <div><small class="example-code"><code>"https"</code></small></div>
                </td>
                <td class="param-constraints">
                    <ul class="constraints unstyled">
                        <li>default value: http</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td class="param-name"><strong>id</strong>
                    <br /><small><em>string</em></small></td>
                <td class="param-description object-definition-param-description">
                    <div>
                        <p>API item identifier tag</p>
                    </div>
                    <div><small class="example-code"><code>"f1aba936b94213e5b8dca0c0dbf1f9cc"</code></small></div>
                </td>
                <td class="param-constraints">
                    <ul class="constraints unstyled">
                        <li>
                            max length:
                            
                            32
                            
                        </li>
                        <li>read only</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td class="param-name"><strong>description</strong>
                    <br /><small><em>string</em></small></td>
                <td class="param-description object-definition-param-description">
                    <div>
                        <p>Object description</p>
                    </div>
                    <div><small class="example-code"><code>"Login page monitor"</code></small></div>
                </td>
                <td class="param-constraints">
                    <ul class="constraints unstyled"></ul>
                </td>
            </tr>
            <tr>
                <td class="param-name"><strong>expected_codes</strong>
                    <br /><small><em>string</em></small></td>
                <td class="param-description object-definition-param-description">
                    <div>
                        <p>The expected HTTP response code or code range of the health check. This parameter is only valid for HTTP and HTTPS monitors.</p>
                    </div>
                    <div><small class="example-code"><code>"2xx"</code></small></div>
                </td>
                <td class="param-constraints">
                    <ul class="constraints unstyled">
                        <li>default value: 200</li>
                    </ul>
                </td>
            </tr>
        </tbody>
    </table>
</div>
  

---

### Managing monitors via the Load Balancing dashboard

Use the **Create Load Balancer** or **Edit Load Balancer** panels in the Load Balancing dashboard to manage health check monitors. For step-by-step guidance, see _[Create, attach, and configuring health checks](/load-balancing/create-load-balancer-ui#create-attach-and-configure-health-checks)_.

---

### Managing monitors via the Cloudflare API

Use the `load_balancers/monitors` endpoint to manage monitors via the Cloudflare API.

#### Commands

The Cloudflare API supports the following commands for monitors. (Examples are given for user-level endpoint but apply to the account-level endpoint as well.) For more detail, see _[Cloudflare API: Load Balancer Monitors](https://api.cloudflare.com/#load-balancer-monitors-properties)_.

<table>
  <tr>
   <td classNname="param-name"><strong>Command</strong></td>
   <td><strong>Method</strong></td>
   <td><strong>Endpoint</strong></td>
  </tr>
  <tbody>
  <tr>
   <td>Create Monitor</td>
   <td><code>POST</code></td>
   <td><code>user/load_balancers/monitors</code></td>
  </tr>
  <tr>
   <td>Delete Monitor</td>
   <td><code>DELETE</code></td>
   <td><code>user/load_balancers/monitors</code></td>
  </tr>
  <tr>
   <td>List Monitors</td>
   <td><code>GET</code></td>
   <td><code>user/load_balancers/monitors</code></td>
  </tr>
  <tr>
   <td>Monitor Details</td>
   <td><code>GET</code></td>
   <td><code>user/load_balancers/monitors/:identifier</code></td>
  </tr>
  <tr>
   <td>Update Monitor</td>
   <td><code>PUT</code></td>
   <td><code>user/load_balancers/monitors</code></td>
  </tr>
  </tbody>
</table>



---

### Health Check integration with PagerDuty

To integrate Cloudflare Health Check notifications with PagerDuty, follow the steps outlined in PagerDuty’s _[Email Integration Guide](https://www.pagerduty.com/docs/guides/email-integration-guide/)_. If you do not have a PagerDuty account, you will first need to set that up.

PagerDuty will generate an email address that will create incidents based on emails sent to that address.

If you already have email integration configured in PagerDuty, you can find the designated email address by going to **Configuration > Services > Email** (under **Integrations**).

![](../static/images/monitors-1.png)

When creating the Notifier object, configure the email to go to the PagerDuty integration email. Consequently, whenever a pool or origin goes down, an Incident will be created to capture it.

![](../static/images/monitors-2.png)
