You can create a monitor within the [load balancer workflow](/how-to/create-load-balancer) or in the **Monitors** section of the dashboard:

1. Go to **Traffic** > **Load Balancing**.
1. Click **Manage Monitors**.
1. Click **Create**.
1. Add the following information:
    - **Type**: The protocol to use for health checks (_HTTP_, _HTTPS_, or _TCP_)
    - **Path**: The endpoint path to run health checks against
    - **Port**: The destination port for health checks

1. For additional settings, select **Advanced health check settings**:
     
     - **Interval**:
        - By increasing the default, you can improve failover time, but you may also increase load on your servers.
        - Minimum time in seconds is 60 (Pro), 10 (Business), and 5 (Enterprise).
     - **Timeout** and **Retries**: 
        - The health check will return unhealthy if it exceeds the duration specified in **Timeout** (and exceeds this duration more times than the specified number of **Retries**).
    - **Expected Code(s)**: The expected HTTP response codes listed individually (200, 302) or as a range (2xx, 3xx).
    - **Response Body**:
        - Looks for a case-insensitive substring in the response body.
        - Make sure that the value is relatively static and within the first 100,000 KB of the HTML page.
    - **Simulate Zone**: 
        - Pushes a request from Cloudflare Health Monitors through the Cloudflare stack as if it were a real visitor request to help analyze behavior or validate a configuration.
        - Ensures health checks are compatible with features like [authenticated origin pulls](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull) and [Argo Smart Routing](https://support.cloudflare.com/hc/articles/115000224552).
    - **Follow Redirects**: 
        - Instead of reporting a `301` or `302` code as unhealthy, the health check follows redirects to the final endpoint.
    - **Configure Request Header(s)**:
        - Useful if your servers are expecting specific incoming headers.

1. Select **Save**.

<Aside type="note" header="Note:">

To increase confidence in pool status, increase the `consecutive_up` and `consecutive_down` fields when [creating a monitor with the API](https://api.cloudflare.com/#account-load-balancer-monitors-create-monitor). To become healthy or unhealthy, monitored origins must pass this health check the consecutive number of times specified in these parameters.

</Aside>