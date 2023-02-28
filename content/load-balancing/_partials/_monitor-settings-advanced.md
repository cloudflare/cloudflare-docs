---
_build:
  publishResources: false
  render: never
  list: never
---

*   **Interval**:
    *   By increasing the default, you can improve failover time, but you may also increase load on your servers.
    *   Minimum time in seconds is 60 (Pro), 15 (Business), and 10 (Enterprise).
*   **Timeout** and **Retries**:
    *   The health check will return unhealthy if it exceeds the duration specified in **Timeout** (and exceeds this duration more times than the specified number of **Retries**).
*   **Expected Code(s)**: The expected HTTP response codes listed individually (`200`, `302`) or as a range (for example, entering `2xx` would cover all response codes in the `200` range).
*   **Response Body**:
    *   Looks for a case-insensitive substring in the response body.
    *   Make sure that the value is relatively static and within the first 100 MB of the HTML page.
*   **Simulate Zone**:
    *   Pushes a request from Cloudflare Health Monitors through the Cloudflare stack as if it were a real visitor request to help analyze behavior or validate a configuration.
    *   Ensures health checks are compatible with features like [authenticated origin pulls](/ssl/origin-configuration/authenticated-origin-pull/) and [Argo Smart Routing](/argo-smart-routing/).
*   **Follow Redirects**:
    *   Instead of reporting a `301` or `302` code as unhealthy, the health check follows redirects to the final endpoint.
*   **Configure Request Header(s)**:
    *   Useful if your servers are expecting specific incoming headers.
*   **Header**:
    *   The HTTP request headers to send in the health check. It is recommended that you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only valid for HTTP and HTTPS monitors.