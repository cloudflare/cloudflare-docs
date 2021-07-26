When you secure origin connections, it prevents attackers from discovering and overloading your origin server with requests.

- **DNS**: [Set up proxied (orange-clouded) DNS records](https://support.cloudflare.com/hc/articles/200169626) and [change your domain nameservers](https://support.cloudflare.com/hc/articles/205195708), which will also require that you [allow Cloudflare IP addresses](https://support.cloudflare.com/hc/articles/201897700) at your origin.
- **SSL**: 
    - To encrypt traffic between Cloudflare and your server, [choose Full (strict)](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes#strict) SSL/TLS mode (requires server configuration)
    - To ensure requests originate from the Cloudflare network, [set up authenticated origin pulls](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull).
- **Cloudflare Tunnel**: To encrypt all traffic and prevent any inbound connections to your origin, [set up a Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps).