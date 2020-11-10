---
order: 200
---

# Glossary

## [Cloudflare for Teams](https://www.cloudflare.com/teams-home/)
Cloudflare for Teams brings the power of Cloudflare’s global network to your internal teams and infrastructure. Teams empowers users with secure, fast and seamless access to any device on the Internet.

## [Cloudflare Access](https://developers.cloudflare.com/access/)
Cloudflare Access replaces corporate VPNs with Cloudflare’s network. Instead of placing internal tools on a private network, customers deploy them in any environment, including hybrid or multi-cloud models, and secure them consistently with Cloudflare’s network.

## [Cloudflare Gateway](https://developers.cloudflare.com/gateway/)
Cloudflare Gateway is a modern next generation firewall between your user, device or network and the public Internet. Once you setup Cloudflare Gateway, Gateway's DNS filtering service will inspect all Internet bound DNS queries, log them and apply corresponding policies.

## [Argo Tunnel](https://developers.cloudflare.com/argo-tunnel/)
A secure outbound connection which runs in your infrastructure to connect the applications and machines to Cloudflare.

## [Cloudflare Workers](https://developers.cloudflare.com/workers/)
Cloudflare Workers provides a serverless execution environment that allows you to create entirely new applications or augment existing ones without configuring or maintaining infrastructure.  

---------------

## Access App Launch
The Access App Launch portal provides end users with a single dashboard from which they can open applications secured by Access.

| Related products: | [Access](https://developers.cloudflare.com/access/) |
|---|---|

## Active zone
A DNS zone is a portion of the DNS namespace that is managed by a specific organization or administrator. For a domain to be active on Cloudflare, its nameservers need to be changed to Cloudflare's.

| Related products: | [Access](https://developers.cloudflare.com/access/) |
|---|---|

## Application (Access)

The resource being protected by Cloudflare Access. An application can be a subdomain, a path, or a SaaS application.

| Related products: | [Access](https://developers.cloudflare.com/access/) |
|---|---|


## Auth Domain
The unique subdomain assigned to your Cloudflare account; for example, https://example.cloudflareaccess.com

| Related products: | [Access](https://developers.cloudflare.com/access/) |
|---|---|

## Authenticated Origin Pulls

Authenticated Origin Pulls let origin web servers validate that a web request came from Cloudflare. Cloudflare uses TLS client certificate authentication, a feature supported by most web servers, to present a Cloudflare certificate when establishing a connection between Cloudflare and the origin web server.

| Related products: | [Cloudflare SSL](https://developers.cloudflare.com/ssl/) |
|---|---|

## cloudflared

`cloudflared` is the software that powers Argo Tunnel. `cloudflared` runs alongside origin servers to connect to Cloudflare's network, as well as client devices for non-HTTP traffic from user endpoints.

| Related products: | [Argo Tunnel](https://developers.cloudflare.com/argo-tunnel/) |
|---|---|

## daemon
A program that performs tasks without active management or maintenance.

| Related products: | [Argo Tunnel](https://developers.cloudflare.com/argo-tunnel/) |
|---|---|

## DoH
*DNS over HTTPS*  

With DoH, DNS queries and responses are encrypted, and they are sent via the HTTP or HTTP/2 protocols. Like [DoT](#DoT), DoH ensures that attackers can't forge or alter DNS traffic. DoH traffic looks like other HTTPS traffic – e.g. normal user-driven interactions with websites and web apps – from a network administrator's perspective.

| Related products: | [Gateway](https://developers.cloudflare.com/gateway/) |
|---|---|

## DNS filtering

DNS filtering is the process of using the Domain Name System to block malicious websites and filter out harmful or inappropriate content. This ensures that company data remains secure and allows companies to have control over what their employees can access on company-managed networks. DNS filtering is often part of a larger access control strategy.

| Related products: | [Gateway](https://developers.cloudflare.com/gateway/) |
|---|---|

## DNS server

Each device connected to the Internet has a unique IP address which other machines use to find the device. DNS servers eliminate the need for humans to memorize IP addresses such as 192.168.1.1 (in IPv4), or more complex newer alphanumeric IP addresses such as 2400:cb00:2048:1::c629:d7a2 (in IPv6).

| Related products: | [Gateway](https://developers.cloudflare.com/gateway/) | [Access](https://developers.cloudflare.com/access/) |
|---|---|---|

## DoT <a name="DoT"></a>
*DNS over TLS*

DNS over TLS, or DoT, is a standard for encrypting DNS queries to keep them secure and private. DoT uses the same security protocol, TLS, that HTTPS websites use to encrypt and authenticate communications. (TLS is also known as "SSL.") DoT adds TLS encryption on top of the user datagram protocol (UDP), which is used for DNS queries. Additionally, it ensures that DNS requests and responses are not tampered with or forged via on-path attacks.

| Related products: | [Gateway](https://developers.cloudflare.com/gateway/) |
|---|---|

## hostname
The name given to a server or node on a network. In most cases, the public DNS name of a server.

## IdP
*identity provider*  

An identity provider (IdP or IDP) stores and manages users' digital identities. Think of an IdP as being like a guest list, but for digital and cloud-hosted applications instead of an event. An IdP may check user identities via username-password combinations and other factors, or it may simply provide a list of user identities that another service provider (like an SSO) checks.

| Related products: | [Access](https://developers.cloudflare.com/access/) |
|---|---|

## JWT
*JSON web token*

An open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

| Related products: | [Access](https://developers.cloudflare.com/access/) |
|---|---|

## location
Locations are physical entities like offices, homes, retail stores, movie theatres or a data center.

| Related products: | [Gateway](https://developers.cloudflare.com/gateway/) |
|---|---|

## mTLS
*mutual TLS*

The Server Message Block (SMB) protocol is a network file sharing protocol that allows applications on a computer to read and write to files and to request services from server programs in a computer network.

## Next-generation firewall
A next-generation firewall (NGFW) is more powerful than a traditional firewall. NGFWs have the capabilities of traditional firewalls, but they also have a host of added features to address a greater variety of organizational needs. NGFWs can run either in the cloud or on-premises.

| Related products: | [Gateway](https://developers.cloudflare.com/gateway/) |
|---|---|

## OAuth
OAuth is a technical standard for authorizing users. It is a protocol for passing authorization from one service to another without sharing the actual user credentials, such as a username and password. With OAuth, a user can sign in on one platform and then be authorized to perform actions and view data on another platform.

| Related products: | [Access](https://developers.cloudflare.com/access/) |
|---|---|

## OpenID Connect

A simple identity layer on top of the OAuth 2.0 protocol. It allows Clients to verify the identity of the End-User based on the authentication performed by an Authorization Server, as well as to obtain basic profile information about the End-User in an interoperable and REST-like manner. (From: [source](https://openid.net/connect/))

| Related products: | [Access](https://developers.cloudflare.com/access/) |
|---|---|

## Origin certificate <a name="origin-certificate"></a>
Cloudflare Origin Certificates are free SSL certificates issued by Cloudflare for installation on your origin server to facilitate end-to-end encryption for your visitors using HTTPS.

| Related products: | [Argo Tunnel](https://developers.cloudflare.com/argo-tunnel/) |
|---|---|

## Policy
**Gateway**: a set of rules determining which domains, content categories, or domain categories are allowed through Gateway.  
**Access**: a set of rules determining which users are allowed to access an application through Access.

| Related products: | [Gateway](https://developers.cloudflare.com/gateway/) | [Access](https://developers.cloudflare.com/access/) |
|---|---|---|

## RDP
*Remote Desktop Protocol*

A protocol, or technical standard, for using a desktop computer remotely. RDP was initially released by Microsoft and is available for most Windows operating systems, but it can be used with Mac operating systems too.

## SafeSearch

A feature of search engines that can help you filter explicit or offensive content. When you enable SafeSearch, the search engine filters explicit or offensive content and returns search results that are safe for children, you or at work.

| Related products: | [Gateway](https://developers.cloudflare.com/gateway/) |
|---|---|

## SAML
*Security Assertion Markup Language*  

A standardized way to tell external applications and services that a user is who they say they are. SAML makes single sign-on ([SSO](#SSO)) technology possible by providing a way to authenticate a user once and then communicate that authentication to multiple applications.

| Related products: | [Access](https://developers.cloudflare.com/access/) |
|---|---|

## SASE
*Secure Access Service Edge*

A cloud-based security model which bundles software-defined networking with network security functions and delivers them from a single service provider. SASE packages software-defined wide area networking (SD-WAN) capabilities with other network security functions (like secure web gateways, Zero Trust network access, firewall-as-a-service, and cloud access security brokers) and is delivered from and managed on a single cloud platform.

| Related products: | [Access](https://developers.cloudflare.com/access/) |
|---|---|

## seat
A unique user who authenticates to connect to an application protected by Cloudflare Access, or to use a Gateway service.

| Related products: | [Gateway](https://developers.cloudflare.com/gateway/) | [Access](https://developers.cloudflare.com/access/) |
|---|---|---|

## service token <a name="service-token"></a>
Service tokens consist of an ID and Secret generated by Cloudflare Access that can be used by an automated system or application to reach an application protected by Cloudflare Access. Service tokens allow systems to authenticate without identity provider credentials in an automated way.

| Related products: | [Access](https://developers.cloudflare.com/access/) |
|---|---|


## SIEM
*Security Information and Event Management*  

Security Information and Event Management (SIEM) solutions provide an analysis layer for logs generated by other systems.

| Related products: | [Access](https://developers.cloudflare.com/access/) |
|---|---|


## SMB
*Server Message Block*

A network file sharing protocol that allows applications on a computer to read and write to files and to request services from server programs in a computer network. (From: [source](https://docs.microsoft.com/en-us/windows-server/storage/file-server/file-server-smb-overview))

| Related products: | [Access](https://developers.cloudflare.com/access/) |
|---|---|

## SSH
*Secure SHell protocol*

Secure Shell (SSH) protocol allows users to connect to infrastructure to perform activites like remote command execution.

| Related products: | [Access](https://developers.cloudflare.com/access/) |
|---|---|

## SSO <a name="SSO"></a>
A technology which combines several different application login screens into one. With SSO, a user only has to enter their login credentials (username, password, etc.) one time on a single page to access all of their SaaS applications.

| Related products: | [Access](https://developers.cloudflare.com/access/) |
|---|---|

## Terraform
[Terraform](https://www.terraform.io/) is a tool for building, changing, and versioning infrastructure, and provides components and documentation for building Cloudflare resources.

| Related products: | [Access](https://developers.cloudflare.com/access/) |
|---|---|

## Tunnel certificate
The Argo Tunnel software, `cloudflared`, generates a certificate when you login with your Cloudflare account. The certificate consists of a [service token](#service-token) and [origin certificate](#origin-certificate).

| Related products: | [Argo Tunnel](https://developers.cloudflare.com/argo-tunnel/) |
|---|---|

## WARP/WARP+
WARP is a mobile app designed for everyone. It uses Cloudflare's global network to secure all of your phone’s Internet traffic WARP automatically adds encryption from your device to the edge of Cloudflare’s network.

| Related products: | [Gateway](https://developers.cloudflare.com/gateway/) |
|---|---|

## Zero Trust Security
An IT security model that requires strict identity verification for every person and device trying to access resources on a private network, regardless of whether they are sitting within or outside of the network perimeter. No single specific technology is associated with zero trust architecture; it is a holistic approach to network security that incorporates several different principles and technologies.

| Related products: | [Access](https://developers.cloudflare.com/access/) |
|---|---|
