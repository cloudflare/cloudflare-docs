When you secure origin connections, it prevents attackers from discovering and overloading your origin server with requests:

- **DNS**: Set up [proxied (orange-clouded) DNS records](https://support.cloudflare.com/hc/articles/200169626) and [change your domain nameservers](https://support.cloudflare.com/hc/articles/205195708), which will also require that you [allow Cloudflare IP addresses](https://support.cloudflare.com/hc/articles/201897700) at your origin.
- **SSL**: 
    - Set up [authenticated origin pulls](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull) to ensure all origin connections comes from Cloudflare
    - Use an [origin CA certificate](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca) to encrypt traffic between Cloudflare and your origin server (and enable [Strict SSL mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes#strict)).
- **Cloudflare Tunnel**: Secure origin connections with a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps)