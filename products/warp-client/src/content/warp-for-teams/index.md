---
order: 3
---

# WARP Client for Teams

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

[Cloudflare for Teams](https://www.cloudflare.com/teams/) customers can use the Cloudflare WARP application to connect corporate desktops to [Cloudflare Gateway](https://developers.cloudflare.com/gateway/) for advanced web filtering. The Gateway features rely on the same performance and security benefits of the underlying WARP technology, now with security filtering available to the connection.

The result is a simple way for enterprises to protect their users wherever they are without requiring the backhaul of network traffic to a centralized security boundary. Instead, organizations can configure the WARP Client application to securely and privately send remote users’ traffic through a Cloudflare data center near them. Gateway administrators apply policies to outbound Internet traffic proxied through the client, allowing organizations to protect users from threats on the Internet, and stop corporate data from leaving their organization.

Here is how the WARP Client can help your organization:

* **Encryption of user traffic**  
 Regardless of your users’ location, all traffic from their device is encrypted with WARP and sent privately to the nearest WARP endpoint. Used in conjunction with Cloudflare Access, your applications are 10ms away from wherever your user is located, and VPNs are no longer needed.

* **Additional speed with WARP+**  
 Any Teams customer who deploys the Teams client applications will automatically receive the premium speed benefits of WARP+.

* **Gateway Device Roaming**  
 With Gateway Device Roaming, you can enforce Cloudflare Gateway policies anywhere your users roam on any operating system supported by the Cloudflare WARP Client.

* **L7 Firewall and user-based policies**  
 This allows your organization to enforce device authentication to your Teams account, enabling you to build user specific policies and force all traffic through the firewall.

* **Device and user auditing**  
 Administrators can audit specific user and device traffic. Used in conjunction with logpush, this will allow your organization to do detailed level tracing in case of a breach or audit. (Available with Enterprise Teams plan only)