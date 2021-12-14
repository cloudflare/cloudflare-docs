If you have another *A* or *AAAA* record in your Cloudflare **DNS** or your Cloudflare **Load Balancer** provides another origin in the same pool, **Zero-Downtime Failover** automatically retries requests to your origin even before a Load Balancing decision is made. 

Cloudflare currently retries only once for HTTP [521](https://support.cloudflare.com/hc/articles/115003011431#521error), [522](https://support.cloudflare.com/hc/articles/115003011431#522error), and [523](https://support.cloudflare.com/hc/articles/115003011431#523error) response codes.
