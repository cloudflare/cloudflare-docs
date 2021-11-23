Make sure that your firewall or web server does not block or rate limit your configured health checks or requests associated with [Cloudflare IP addresses](https://www.cloudflare.com/ips).

Each health check has the HTTP user-agent of `"Mozilla/5.0 (compatible; Cloudflare-Traffic-Manager/1.0; +https://www.cloudflare.com/traffic-manager/; pool-id: $poolid)"`, where the `$poolid` is the first 16 characters of the [associated pool](/understand-basics/pools).

<Aside type="warning">

If you know that your origin server is healthy but load balancing is reporting it as unhealthy, refer to our [Monitor troubleshooting guide](https://support.cloudflare.com/hc/articles/4407016052493#h_4wg9kQ1xyMWU8HToLDLXRe).

</Aside>