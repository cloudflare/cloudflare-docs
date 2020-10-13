---
order: 6
---

# Argo Tunnel

Cloudflare Argo Tunnel provides a secure method to connect the origin server of your self-hosted application to Cloudflare without exposing a public IP address or allowing ingress directly to your environment.

## Using Cloudflare Argo Tunnel To Secure On-Premise Applications

Argo Tunnel ensures that requests route through Cloudflare before reaching the web server, so that you are certain that attack traffic is stopped by Cloudflare’s WAF and Unmetered DDoS mitigation and authenticated with Access by enabling these features on your account.

Argo Tunnel relies on the `cloudflared` daemon to create a persistent connection between your web server and the Cloudflare network. Once the daemon is running and you have the Tunnel configured, you can lock down the web server to external requests to only allow connections from Cloudflare.

You can [follow these instructions](https://developers.cloudflare.com/argo-tunnel/) to get started with Argo Tunnel.

## Validating JSON Web Tokens

If you do not use Argo Tunnel, you must secure your origin by [validating the JSON Web Token](/advanced-management/validating-json/) issued by Cloudflare Access. If you build an Access policy for an application that is available at a public IP address, any user who discovers that IP address can bypass Cloudflare. Validating the JSON Web Token ensures that the request arriving at your origin server first authenticated through Cloudflare Access.