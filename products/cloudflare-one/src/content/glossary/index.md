---
order: 10
---

# Glossary

## [Cloudflare for Teams](https://www.cloudflare.com/teams-home/)
Cloudflare for Teams brings the power of Cloudflare’s global network to your internal teams and infrastructure. Teams empowers users with secure, fast and seamless access to any device on the Internet.

## [Cloudflare Access](https://www.cloudflare.com/en-gb/teams/access/)
Cloudflare Access replaces corporate VPNs with Cloudflare’s network. Instead of placing internal tools on a private network, customers deploy them in any environment, including hybrid or multi-cloud models, and secure them consistently with Cloudflare’s network.

## [Cloudflare Gateway](https://www.cloudflare.com/en-gb/teams/gateway/)
Cloudflare Gateway is a modern next generation firewall between your user, device or network and the public Internet. Once you setup Cloudflare Gateway, Gateway's DNS filtering service will inspect all Internet bound DNS queries, log them and apply corresponding policies.

## [Argo Tunnel](https://www.cloudflare.com/en-gb/products/argo-tunnel/)
A secure outbound connection which runs in your infrastructure to connect the applications and machines to Cloudflare.

## WARP client
Teams customers can use the Cloudflare WARP application to connect corporate desktops to Cloudflare Gateway for advanced web filtering. The Gateway features rely on the same performance and security benefits of the underlying WARP technology, with security filtering available to the connection.

---------------

## [App Launcher](/applications/app-launcher)
The App Launcher portal provides end users with a single dashboard from which they can open applications secured by Teams.

## active zone
A DNS zone is a portion of the DNS namespace that is managed by a specific organization or administrator. For a domain to be active on Cloudflare, its nameservers need to be changed to Cloudflare's.

## [application](/applications/)

The resource being protected by Cloudflare for Teams. An application can be a subdomain, a path, or a SaaS application.

## Authenticated Origin Pulls

Authenticated Origin Pulls let origin web servers validate that a web request came from Cloudflare. Cloudflare uses TLS client certificate authentication, a feature supported by most web servers, to present a Cloudflare certificate when establishing a connection between Cloudflare and the origin web server.

| Related products: | [Cloudflare SSL](https://developers.cloudflare.com/ssl/) |
|---|---|

## cloudflared

`cloudflared` is the software that powers [Argo Tunnel](#argo-tunnel). `cloudflared` runs alongside origin servers to connect to Cloudflare's network, as well as client devices for non-HTTP traffic from user endpoints.

## daemon
A program that performs tasks without active management or maintenance.

## [DoH](/connections/connect-without-agent/DNS/dns-over-https)
*DNS over HTTPS*

With DoH, DNS queries and responses are encrypted, and they are sent via the HTTP or HTTP/2 protocols. Like [DoT](#DoT), DoH ensures that attackers can't forge or alter DNS traffic. DoH traffic looks like other HTTPS traffic – e.g. normal user-driven interactions with websites and web apps – from a network administrator's perspective.

## DNS filtering

DNS filtering is the process of using the Domain Name System to block malicious websites and filter out harmful or inappropriate content. This ensures that company data remains secure and allows companies to have control over what their employees can access on company-managed networks. DNS filtering is often part of a larger access control strategy.

## DNS server

Each device connected to the Internet has a unique IP address which other machines use to find the device. DNS servers eliminate the need for humans to memorize IP addresses such as 192.168.1.1 (in IPv4), or more complex newer alphanumeric IP addresses such as 2400:cb00:2048:1::c629:d7a2 (in IPv6).

## [DoT](/connections/connect-without-agent/DNS/dns-over-tls)
*DNS over TLS*

DNS over TLS, or DoT, is a standard for encrypting DNS queries to keep them secure and private. DoT uses the same security protocol, TLS, that HTTPS websites use to encrypt and authenticate communications. (TLS is also known as "SSL.") DoT adds TLS encryption on top of the user datagram protocol (UDP), which is used for DNS queries. Additionally, it ensures that DNS requests and responses are not tampered with or forged via on-path attacks.

## hostname
The name given to a server or node on a network. In most cases, the public DNS name of a server.

## IdP
*identity provider*

An identity provider (IdP or IDP) stores and manages users' digital identities. Think of an IdP as being like a guest list, but for digital and cloud-hosted applications instead of an event. An IdP may check user identities via username-password combinations and other factors, or it may simply provide a list of user identities that another service provider (like an SSO) checks.

## JWT
*JSON web token*

An open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

## [location](/policies/filtering/dns-policies/configuring-locations)
Locations are physical entities like offices, homes, retail stores, movie theatres or a data center.

## mTLS
*mutual TLS*

Mutual TLS is a common security practice that uses client TLS certificates to provide an additional layer of protection, allowing to cryptographically verify the client information.

## Next-generation firewall
A next-generation firewall (NGFW) is more powerful than a traditional firewall. NGFWs have the capabilities of traditional firewalls, but they also have a host of added features to address a greater variety of organizational needs. NGFWs can run either in the cloud or on-premises.

## OAuth
OAuth is a technical standard for authorizing users. It is a protocol for passing authorization from one service to another without sharing the actual user credentials, such as a username and password. With OAuth, a user can sign in on one platform and then be authorized to perform actions and view data on another platform.

## OpenID Connect

A simple identity layer on top of the OAuth 2.0 protocol. It allows Clients to verify the identity of the End-User based on the authentication performed by an Authorization Server, as well as to obtain basic profile information about the End-User in an interoperable and REST-like manner. (From: [source](https://openid.net/connect/))

## organization domain

The organization domain is a unique subdomain assigned to your Cloudflare account; for example, `https://example.cloudflareaccess.com`. When setting up Teams for the first time, you’ll be asked to choose an [organization name](#organization-name) (in the domain above: `example`) for your organization domain. 

When navigating to the organization domain, users will be asked to authenticate. Once they do that, they’ll be able to access the [App Launcher](#app-launcher), and through the App Launcher, they’ll be able to access the applications you’ve protected behind Cloudflare for Teams.

You can find and edit your organization domain under **Access > Authentication > Organization domain**.

## organization name

The customizable portion of your [organization domain](#organization-domain). You can use your team name or your organization's. 

| organization domain | organization name |
| ------- | ----------- |
| `https://example.cloudflareaccess.com` | `example` |

## origin certificate

Cloudflare Origin Certificates are free SSL certificates issued by Cloudflare for installation on your origin server to facilitate end-to-end encryption for your visitors using HTTPS.

## [policy](/policies)
A set of rules that regulate your network activity, such as who logs into your applications, or which websites your users can reach.

## RDP
*Remote Desktop Protocol*

A protocol, or technical standard, for using a desktop computer remotely. RDP was initially released by Microsoft and is available for most Windows operating systems, but it can be used with Mac operating systems too.

## [SafeSearch](/policies/filtering/dns-policies/safesearch)

A feature of search engines that can help you filter explicit or offensive content. When you enable SafeSearch, the search engine filters explicit or offensive content and returns search results that are safe for children, you or at work.

## SAML
*Security Assertion Markup Language*

A standardized way to tell external applications and services that a user is who they say they are. SAML makes single sign-on ([SSO](#SSO)) technology possible by providing a way to authenticate a user once and then communicate that authentication to multiple applications.

## SASE
*Secure Access Service Edge*

A cloud-based security model which bundles software-defined networking with network security functions and delivers them from a single service provider. SASE packages software-defined wide area networking (SD-WAN) capabilities with other network security functions (like secure web gateways, Zero Trust network access, firewall-as-a-service, and cloud access security brokers) and is delivered from and managed on a single cloud platform.

## seat
A unique user who authenticates to connect to an application protected by Cloudflare Access, or to use a Gateway service.

## service token
Service tokens consist of an ID and Secret generated by Cloudflare Access that can be used by an automated system or application to reach an application protected by Cloudflare Access. Service tokens allow systems to authenticate without identity provider credentials in an automated way.

## SIEM
*Security Information and Event Management*

Security Information and Event Management (SIEM) solutions provide an analysis layer for logs generated by other systems.

## SMB
*Secure Messaging Block*

A network file sharing protocol that allows applications on a computer to read and write to files and to request services from server programs in a computer network. (From: [source](https://docs.microsoft.com/en-us/windows-server/storage/file-server/file-server-smb-overview))

## SSH
*Secure SHell protocol*

Secure Shell (SSH) protocol allows users to connect to infrastructure to perform activities like remote command execution.

## SSO
A technology which combines several different application login screens into one. With SSO, a user only has to enter their login credentials (username, password, etc.) one time on a single page to access all of their SaaS applications.

## Terraform
[Terraform](https://www.terraform.io/) is a tool for building, changing, and versioning infrastructure, and provides components and documentation for building Cloudflare resources.

## Tunnel certificate
The Argo Tunnel software, `cloudflared`, generates a certificate when you login with your Cloudflare account. The certificate consists of a [service token](#service-token) and [origin certificate](#origin-certificate).

## Zero Trust Security
An IT security model that requires strict identity verification for every person and device trying to access resources on a private network, regardless of whether they are sitting within or outside of the network perimeter. No single specific technology is associated with zero trust architecture; it is a holistic approach to network security that incorporates several different principles and technologies.
