---
title: Health Checks Analytics
pcx_content_type: reference
weight: 3
---

# Health Checks Analytics

Once you have set up a standalone Health Check including notification emails, use Health Check Analytics to debug possible origin issues.

To access health check analytics:
1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Traffic** > **Health Check Analytics**.

You can evaluate origin uptime, latency, failure reason, and specific event logs:
- **Health Checks By Uptime**: Shows the percentage of uptime for individual origins over time.
- **Health Checks By Failure Reason**: Shows a breakdown of failures by the specific reason. See [common error code causes and solutions below](/health-checks/health-checks-analytics/#common-error-codes).
- **Health Checks By Latency**: Shows average latency – measured in round trip time — for individual origins over time.
- **Event Log**: Shows individual health check data. 
  - Select each record for additional details on **Round trip time**, the **Failure Reason**, the **Average Waterfall** (showing chronological data about request stages), **Response status code**, and more.

## Common error codes

### TCP connection failed
#### Cause
Health Checks failed to establish a TCP connection to your origin server.

#### Solution
This typically occurs when there is a network failure between Cloudflare and your origin, and/or a firewall refuses to allow our connection. Ensure your network and firewall configurations are not interfering with traffic.

### HTTP timeout occurred
#### Cause
The origin failed to return an HTTP response within the timeout configured. This happens if you have the timeout set to a low number. For example, one to two seconds.
#### Solution
Cloudflare recommends increasing the HTTP response timeout to allow the origin server to respond.

### Response code mismatch error

#### Cause
Cloudflare receives an HTTP status code that does not match the values defined in the `expected_codes` property of your Health Check configuration.
#### Solution
Response codes must match the `expected_codes`. Confirm the values are correct by comparing the expected response codes and the status code received in the Event Log.
#### ​​Alternate cause
You may also see this issue if you have a Health Check configured to use HTTP connections and your origin server is redirecting to HTTPS. In this case, the response code will often be `301`, `302`, or `303`.
#### Solution
Change your Cloudflare Health Check configuration to use HTTPS or set the value of `follow_redirect` to `true` so that Cloudflare can resolve the correct status code.

### Response body mismatch error
#### Cause
The response body returns from your origin server and does not include the (case-insensitive) value of `expected_body` configured in your Health Check.
{{<Aside type="note">}} We only read the first 10 KB of the response. If you return a larger response, and the `expected_body` is not in the first 10 KB, the Health Check will fail.
{{</Aside>}}
#### Solution
Ensure the `expected_body` is in the first 10 KB of the response body.
​​
### TLS untrusted certificate error
#### Cause
The certificate is not trusted by a public Certificate Authority (CA).
#### Solution
If you’re using a self-signed certificate, Cloudflare recommends either using a publicly trusted certificate or setting the `allow_insecure` property on your Health Check to `true`.

### TLS name mismatch error
#### Cause
Our Health Check (client) was not able to match a name on the server certificate to the hostname of the request.
#### Solution
Inspect your Health Check configuration to confirm that the `header` value set in the Cloudflare Health Check is correct.

### TLS protocol error
#### Cause
This error can occur if you are using an older version of TLS or your origin server is not configured for HTTPS.
#### Solution
Ensure that your origin server supports TLS 1.2 or greater and is configured for HTTPS.

### TLS unrecognized name error
#### Cause
The server did not recognize the name provided by the client. When a host header is set, this is set as the ServerName in the initial TLS handshake. If it is not set, Cloudflare will not provide a ServerName, which can cause this error.
#### Solution
Set the host header in your Health Check object.

### ​​No route to host error
#### Cause
The IP address cannot be reached from Cloudflare’s network. Common causes are ISP or hosting provider network issues (e.g. BGP level), or that the IP does not exist.
#### Solution
Ensure IP is accurate, and check if there is an ISP or hosting provider network issue.

### TCP Timeout
#### Cause
Data transmission was not acknowledged and the retransmit of data did not succeed.
#### Solution
Confirm whether the SYN-ACK for the handshake takes place at your origin and contact [Cloudflare support](https://support.cloudflare.com/hc/en-us/articles/200172476).

### ​​Network Unreachable
#### Cause
Cloudflare cannot connect to the origin web server due to network unavailability. This is usually caused by a network issue or incorrect origin IP.
#### Solution
Check the IP entered for the origin in Cloudflare’s Health Checks configuration or the IP returned via DNS for the origin hostname.

### HTTP Invalid Response
#### Cause
Usually caused by an HTTP 502 error or bad gateway.
#### Solution
Ensure the origin web server responds to requests and that no applications have crashed or are under high load.

### DNS Unknown Host
#### Cause
The origin web server hostname does not exist.
#### Solution
Confirm the origin web server resolves to an IP address.

### Connection Reset by Peer
#### Cause
A network error occurred while the client received data from the origin web server.
#### Solution
Confirm whether the origin web server is experiencing a high amount of traffic or an error.

### Monitor Configuration Error
#### Cause
There was a configuration error in the Health Check and no checks were run against the origin.
#### Solution
Review your Health Check configuration to ensure it matches an expected request to your origin.

### ​​DNS Internal
#### Cause
The origin web server’s hostname resolves to an internal or restricted address. No checks are run against this origin.
#### Solution
Cloudflare does not allow use of an origin web server hostname that resolves to a Cloudflare IP.

### Other Failure
#### Cause
If the failure cannot be classified as any other type of failure mentioned above.
#### Solution
Contact [Cloudflare support](https://support.cloudflare.com/hc/en-us/articles/200172476).
