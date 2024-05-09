---
_build:
  publishResources: false
  render: never
  list: never
---

If they do not want to use Cloudflare IP addresses — which are shared by all proxied hostnames — Enterprise customers have two potential alternatives:

- [**Bring Your Own IP (BYOIP)**](/byoip/): Cloudflare announces your IPs (an IP address range you lease/own) in all of our [locations](https://www.cloudflare.com/network/).
- **Static IP addresses**: Cloudflare sets static IP addresses for your domain. For more details, contact your account team.

Business and Enterprise customers can also reduce the number of Cloudflare IPs that their domain shares with other Cloudflare customer domains by [uploading a Custom SSL certificate](/ssl/edge-certificates/custom-certificates/).
