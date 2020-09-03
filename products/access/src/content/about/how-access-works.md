---
title: "How Access works"
---

Cloudflare Access evaluates requests to your application and determines whether visitors are authorized based on policies you define.

![Access Generic](../static/summary/network-diagram.png)

Cloudflare Access replaces corporate VPNs with Cloudflare’s network. Instead of placing internal tools on a private network, teams deploy them in any environment, including hybrid or multi-cloud models, and secure them consistently with Cloudflare’s network.

Administrators build rules to decide who should be able to reach the tools protected by Access. In turn, when users need to connect to those tools, they are prompted to authenticate with their team’s identity provider. Cloudflare Access checks their login against the configured policy rules of allowed users and, if permitted, allows the request to proceed.

Deploying Access does not require exposing new holes in corporate firewalls. Teams connect resources to Cloudflare through a secure outbound connection, Argo Tunnel, which runs in your infrastructure to connect the applications and machines to Cloudflare. That tunnel makes outbound-only calls to the Cloudflare network and organizations can replace complex firewall rules with just one: disable all inbound connections.

To defend against attackers addressing IPs directly, Argo Tunnel can help secure the resource and force outbound requests through Cloudflare Access. With Argo Tunnel and firewall rules preventing inbound traffic, no request can reach those IPs without first hitting Cloudflare, where Access can evaluate the request for authentication.

<stream src="16c1aae7bf7f50c648fec8afa6b7f6fa" controls></stream>
<script data-cfasync="false" defer type="text/javascript" src="https://embed.videodelivery.net/embed/r4xu.fla9.latest.js?video=16c1aae7bf7f50c648fec8afa6b7f6fa"></script>

## Access login flow

When users connect to an application, Cloudflare Access checks their request for authentication in the form of a JSON Web Token (JWT) that Cloudflare generates and signs. The token is either stored as a cookie in the browser called `CF_AUTHORIZATION` or sent as a request header.

If the user does not yet have a token, Cloudflare Access redirects them to the identity provider configured for their organization. The user can login and will be redirected to Cloudflare, where a token will be issued. Cloudflare Access then checks the identity in that token against the rules configured to determine if the user can proceed.

## Secure your origin server

To secure your application with Access's edge-based control, it is important that no one can access your origin server directly. When using Access, secure your origin server as follows:

1. **Force all requests to your origin server through Cloudflare's network** using one of the  methods below:
    * **Set up Argo Tunnel**. Argo Tunnel offers an easy way to securely expose web servers to the Internet without opening firewall ports and configuring access control lists. For details see [_Getting started_](https://developers.cloudflare.com/argo-tunnel/quickstart/) in the Argo Tunnel developers documentation.
    
    * **Limit connections to the origin** so that only connections from [Cloudflare IP ranges](https://www.cloudflare.com/ips/) are allowed.

1. **Validate JSON web tokens (JWTs).** Validating the header alone is not sufficient. You must also confirm the JWT and signature to avoid identity spoofing. For more, see [_Validating JSON web tokens_](https://developers.cloudflare.com/access/setting-up-access/validate-jwt-tokens/).
