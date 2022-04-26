---
pcx-content-type: reference
title: Glossary
weight: 11
---

# Glossary

## [Cloudflare Zero Trust](https://www.cloudflare.com/products/zero-trust/)

Cloudflare Zero Trust the power of Cloudflare’s global network to your internal teams and infrastructure. Cloudflare Zero Trust empowers users with secure, fast and seamless access to any device on the Internet.

## [Cloudflare Access](https://www.cloudflare.com/products/zero-trust/access/)

Cloudflare Access replaces corporate VPNs with Cloudflare’s network. Instead of placing internal tools on a private network, customers deploy them in any environment, including hybrid or multi-cloud models, and secure them consistently with Cloudflare’s network.

## [Cloudflare Gateway](https://www.cloudflare.com/products/zero-trust/gateway/)

Cloudflare Gateway is a modern next generation firewall between your user, device or network and the public Internet. Once you setup Cloudflare Gateway, Gateway's DNS filtering service will inspect all Internet bound DNS queries, log them and apply corresponding policies.

## [Cloudflare Tunnel](https://www.cloudflare.com/products/tunnel/)

Cloudflare Tunnel (formerly _Argo Tunnel_) establishes a secure outbound connection which runs in your infrastructure to connect the applications and machines to Cloudflare.

## WARP client

Cloudflare Zero Trust customers can use the Cloudflare WARP application to connect corporate desktops to Cloudflare Gateway for advanced web filtering. The Gateway features rely on the same performance and security benefits of the underlying WARP technology, with security filtering available to the connection.

---

## [App Launcher](/cloudflare-one/applications/app-launcher/)

The App Launcher portal provides end users with a single dashboard from which they can open applications secured by Cloudflare Zero Trust.

## active zone

A DNS zone is a portion of the DNS namespace that is managed by a specific organization or administrator. For a domain to be active on Cloudflare, its nameservers need to be changed to Cloudflare's.

## [application](/cloudflare-one/applications/)

The resource being protected by Cloudflare Zero Trust. An application can be a subdomain, a path, or a SaaS application.

## Authenticated Origin Pulls

[Authenticated Origin Pulls](/ssl/origin-configuration/authenticated-origin-pull/) let origin web servers validate that a web request came from Cloudflare. Cloudflare uses TLS client certificate authentication, a feature supported by most web servers, to present a Cloudflare certificate when establishing a connection between Cloudflare and the origin web server.

## certificate pinning

Certificate pinning is a security mechanism used to prevent man-in-the-middle (MITM) attacks on the Internet by hardcoding information about the certificate that the application expects to receive. If the wrong certificate is received, even if it's trusted by the system, the application will refuse to connect.

## cloudflared

`cloudflared` is the software that powers [Cloudflare Tunnel](#cloudflare-tunnel). `cloudflared` runs alongside origin servers to connect to Cloudflare's network, as well as client devices for non-HTTP traffic from user endpoints.

## daemon

A program that performs tasks without active management or maintenance.

## DNS filtering

DNS filtering is the process of using the Domain Name System to block malicious websites and filter out harmful or inappropriate content. This ensures that company data remains secure and allows companies to have control over what their employees can access on company-managed networks. DNS filtering is often part of a larger access control strategy.

## DNS server

Each device connected to the Internet has a unique IP address which other machines use to find the device. DNS servers eliminate the need for humans to memorize IP addresses such as 192.168.1.1 (in IPv4), or more complex newer alphanumeric IP addresses such as 2400:cb00:2048:1::c629:d7a2 (in IPv6).

## DNS over HTTPS

By default, DNS queries and responses are sent from a DNS client to a DNS server using the UDP or TCP protocols — which means they’re sent in plaintext, without encryption. This has a huge impact on security: unencrypted queries can be tracked and spoofed by malicious actors, advertisers, ISPs, and others.

[DNS over TLS (DoT)](#dns-over-tls) and [DNS over HTTPS (DoH)](/cloudflare-one/connections/connect-devices/agentless/dns-over-https/) are two standards developed for encrypting plaintext DNS traffic to prevent untrustworthy entities from interpreting and manipulating it. The main difference between DoT and DoH is the port they use to encrypt traffic, and the encryption method they use.

DoH uses port 443, which is the standard HTTPS traffic port, to wrap the DNS request in an HTTPS request. It uses HTTPS and HTTP/2 to encrypt traffic at the application layer. With DoH, DNS queries and responses are camouflaged within other HTTPS traffic, since it all comes and goes from the same port. This means they cannot easily be blocked without blocking all other HTTPS traffic as well, but it also provides users with greater privacy, as network administrators will have no visibility on the DNS queries hidden within the larger flow of HTTPS traffic.

## DoH subdomain

Each location in Cloudflare Zero Trust has a unique DoH subdomain (previously known as a _unique id_). If your organization uses DNS policies, you will need to enter your location's DoH subdomain as part of the WARP client settings. To find a location's DoH subdomain, navigate to **Gateway** > **Locations**, expand the location card for any given location, and get the subdomain of the DNS over HTTPS hostname. In the example below, the DoH subdomain is: `9y65g5srsm`.

| DNS over HTTPS hostname                               | DoH subdomain |
| ----------------------------------------------------- | ------------- |
| `https://9y65g5srsm.cloudflare-gateway.com/dns-query` | `9y65g5srsm`  |

## DNS over TLS

By default, DNS queries and responses are sent from a DNS client to a DNS server using the UDP or TCP protocols — which means they’re sent in plaintext, without encryption. This lack of privacy has a huge impact on security: unencrypted queries can be tracked and spoofed by malicious actors, advertisers, ISPs, and others.

[DNS over TLS (DoT)](/cloudflare-one/connections/connect-devices/agentless/dns-over-tls/) and [DNS over HTTPS (DoH)](#dns-over-https) are two standards developed for encrypting plaintext DNS traffic to prevent untrustworthy entities from interpreting and manipulating it. The main difference between DoT and DoH is the port they use to encrypt traffic, and the encryption method they use.

DNS over TLS uses its own port, 853, to wrap DNS requests within a TLS connection. With DoT, the encryption happens at the transport layer, where it adds TLS encryption on top of the user datagram protocol (UDP). Because DoT has a dedicated port, anyone with network visibility can see DoT traffic coming and going, even though the requests and responses themselves are encrypted. This gives administrators the ability to monitor and block DNS queries, which is important for identifying and stopping malicious traffic.

## hostname

The name given to a server or node on a network. In most cases, the public DNS name of a server.

## identity provider

An identity provider (IdP or IDP) stores and manages users' digital identities. Think of an IdP as being like a guest list, but for digital and cloud-hosted applications instead of an event. An IdP may check user identities via username-password combinations and other factors, or it may simply provide a list of user identities that another service provider (like an SSO) checks.

## JSON web token

An open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

## [location](/cloudflare-one/connections/connect-networks/locations/)

Locations are physical entities like offices, homes, retail stores, movie theatres or a data center.

## mTLS

_mutual TLS_

Mutual TLS is a common security practice that uses client TLS certificates to provide an additional layer of protection, allowing to cryptographically verify the client information.

## Next-generation firewall

A next-generation firewall (NGFW) is more powerful than a traditional firewall. NGFWs have the capabilities of traditional firewalls, but they also have a host of added features to address a greater variety of organizational needs. NGFWs can run either in the cloud or on-premises.

## OAuth

OAuth is a technical standard for authorizing users. It is a protocol for passing authorization from one service to another without sharing the actual user credentials, such as a username and password. With OAuth, a user can sign in on one platform and then be authorized to perform actions and view data on another platform.

## OpenID Connect

A simple identity layer on top of the OAuth 2.0 protocol. It allows Clients to verify the identity of the End-User based on the authentication performed by an Authorization Server, as well as to obtain basic profile information about the End-User in an interoperable and REST-like manner. (From: [source](https://openid.net/connect/))

## origin certificate

[Cloudflare Origin Certificates](/ssl/origin-configuration/origin-ca/) are free SSL certificates issued by Cloudflare for installation on your origin server to facilitate end-to-end encryption for your visitors using HTTPS.

## [policy](/cloudflare-one/policies/)

A set of rules that regulate your network activity, such as who logs in to your applications, or which websites your users can reach.

## RDP

_Remote Desktop Protocol_

A protocol, or technical standard, for using a desktop computer remotely. RDP was initially released by Microsoft and is available for most Windows operating systems, but it can be used with Mac operating systems too.

## [SafeSearch](/cloudflare-one/policies/filtering/dns-policies/#safesearch)

A feature of search engines that can help you filter explicit or offensive content. When you enable SafeSearch, the search engine filters explicit or offensive content and returns search results that are safe for children, you or at work.

## SAML

_Security Assertion Markup Language_

A standardized way to tell external applications and services that a user is who they say they are. SAML makes single sign-on ([SSO](#SSO)) technology possible by providing a way to authenticate a user once and then communicate that authentication to multiple applications.

## SASE

_Secure Access Service Edge_

A cloud-based security model which bundles software-defined networking with network security functions and delivers them from a single service provider. SASE packages software-defined wide area networking (SD-WAN) capabilities with other network security functions (like secure web gateways, Zero Trust network access, firewall-as-a-service, and cloud access security brokers) and is delivered from and managed on a single cloud platform.

## seat

A unique user who authenticates to connect to an application protected by Cloudflare Access, or to use a Gateway service.

## service token

Service tokens consist of an ID and Secret generated by Cloudflare Access that can be used by an automated system or application to reach an application protected by Cloudflare Access. Service tokens allow systems to authenticate without identity provider credentials in an automated way.

## SIEM

_Security Information and Event Management_

Security Information and Event Management (SIEM) solutions provide an analysis layer for logs generated by other systems.

## SMB

_Secure Messaging Block_

A network file sharing protocol that allows applications on a computer to read and write to files and to request services from server programs in a computer network. (From: [source](https://docs.microsoft.com/en-us/windows-server/storage/file-server/file-server-smb-overview))

## SSH

_Secure SHell protocol_

Secure Shell (SSH) protocol allows users to connect to infrastructure to perform activities like remote command execution.

## SSO

A technology which combines several different application login screens into one. With SSO, a user only has to enter their login credentials (username, password, etc.) one time on a single page to access all of their SaaS applications.

## team domain

Your team domain is a unique subdomain assigned to your Cloudflare account; for example, `<your-team-name>.cloudflareaccess.com`. Setting up a team domain is an essential step in your Cloudflare Zero Trust configuration. This is where your users will find the apps you've secured behind Cloudflare Zero Trust — displayed in the [App Launcher](/cloudflare-one/applications/app-launcher/) — and will be able to make login requests to them.

## team name

The customizable portion of your [team domain](#team-domain). You can change this name at any time in the Cloudflare Zero Trust dashboard, under **Settings** > **General**. However, changing your team name may disrupt integrations with identity providers and other applications. If you change the team name, you may need to update these configurations to reflect your new team name.

| team domain                             | team name        |
| --------------------------------------- | ---------------- |
| `<your-team-name>.cloudflareaccess.com` | `your-team-name` |

## Terraform

[Terraform](https://www.terraform.io/) is a tool for building, changing, and versioning infrastructure, and provides components and documentation for building Cloudflare resources.

## Tunnel certificate

The Cloudflare Tunnel software, `cloudflared`, generates a certificate when you login with your Cloudflare account. The certificate consists of a [service token](#service-token) and [origin certificate](#origin-certificate).

## Zero Trust Security

An IT security model that requires strict identity verification for every person and device trying to access resources on a private network, regardless of whether they are sitting within or outside of the network perimeter. No single specific technology is associated with zero trust architecture; it is a holistic approach to network security that incorporates several different principles and technologies.
