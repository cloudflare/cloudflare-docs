---
title: Glossary
pcx_content_type: glossary
weight: 10
---

# Glossary

Review the definitions for terms used across Cloudflare's documentation.

## account

Accounts group one or more members together with specific roles or permissions. Accounts can be associated with any number of domains.

## allowlist

An allowlist list of items (usually websites, IP addresses, email addresses, etc.) that are permitted to access a system.

**Related terms:** blocklist

## apex domain

Apex domain is used to refer to a domain that does not contain a subdomain part, such as `example.com` (without `www.`). It is also known as "root domain" or "naked domain".

## API key

An API key is unique to each Cloudflare user and used to confirm identity when using the [Cloudflare API](/api/).

**Related terms:** API token

## API token

API tokens authorize access to specific Cloudflare dashboard pages, accounts, and zones. API tokens are associated to the user that created them.

**Related terms:** API key

## application

In Cloudflare for Teams, an application is the resource being protected by Cloudflare for Teams. An application can be a subdomain, a path, or a SaaS application.

## backup codes

Backup codes allow restoration of Cloudflare account access outside the normal [two-factor authentication process](/support/account-management-billing/account-privacy-and-security/securing-user-access-with-two-factor-authentication-2fa/). A backup code becomes invalid after use.

**Related terms:** two-factor authentication

## blocklist

A blocklist is a list of items (usually websites, IP addresses, email addresses, etc.) that are prevented from accessing a system.

**Related terms:** allowlist

## cached bandwidth (cached egress bandwidth)

The amount of bandwidth served from Cloudflare without hitting the origin server. Cached bandwidth is the sum of all **EdgeResponseBytes** where **CacheCacheStatus** equals _hit_, _stale_, _updating_, _ignored_, or _revalidated_.

## cached requests

The number of requests served from Cloudflare without having to hit the origin server. Cached requests are the sum of all requests where **CacheCacheStatus** equals _hit_, _stale_, _updating_, _ignored_. This doesn’t include _revalidated_ since the request had to be sent to the origin server.

**Relevant terms:** requests, uncached requests

## certificate

SSL certificates enable encryption over HTTPS for traffic between a client and a website. SSL certificates contain the website's public key and the website's identity along with related information. Devices attempting to communicate with the origin web server reference the SSL certificate to obtain the public key and verify the server's identity. Cloudflare provides a [Universal SSL certificate](/ssl/edge-certificates/universal-ssl/) for each active Cloudflare domain.

**Related terms:** SSL certificate, CAA record, Certificate Authority, EV certificate, intermediate certificate, primary certificate, root certificate\
**Relevant links:** [Cloudflare SSL documentation](/ssl/)

## Certificate Authority (CA)

A CA is a trusted third party that provides SSL certificates for encrypting network traffic.

## Certification Authority Authorization (CAA) record

A CAA record declares which CAs are allowed to issue an SSL certificate for a domain.

**Related terms:** Certificate Authority\
**Relevant links:** [CAA FAQ](https://support.cloudflare.com/hc/articles/115000310832)

## certificate packs

Certificate packs allow Cloudflare to fallback to a different SSL certificate for browsers that do not support the latest standards. Certificate packs allow Custom SSL certificates to contain different signature algorithms for the same hostnames listed within the SSL certificate without taking up additional Custom SSL certificate quota for your Cloudflare account.

**Relevant links:** [Managing Custom SSL certificates](https://support.cloudflare.com/hc/articles/200170466)

## certificate pinning

Certificate pinning is a security mechanism used to prevent on-path attacks on the Internet by hardcoding information about the certificate that the application expects to receive. If the wrong certificate is received, even if it is trusted by the system, the application will refuse to connect.

## cipher suite

A set of encryption algorithms for establishing a secure communications connection. There are several cipher suites in wide use, and a client and server agree on the cipher suite to use when establishing the TLS connection. Support of multiple cipher suites allows compatibility across various clients.

**Relevant links:** [cipher suites documentation](/ssl/reference/cipher-suites/)

## cloud

A network of remote servers used to store and maintain data.

## cloudflared

`cloudflared` is the software that powers Cloudflare Tunnel. `cloudflared` runs alongside origin servers to connect to Cloudflare's network, as well as client devices for non-HTTP traffic from user endpoints.

**Relevant links:** [Connect applications with Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/)

## content delivery network (CDN)

A geographically distributed group of servers which work together to provide fast delivery of Internet content.

## credit

An amount applied to a specific Cloudflare account as credit for recurring subscriptions or plan payments. The Cloudflare billing system automatically applies credits in the next billing cycle.

## daemon

A program that performs tasks without active management or maintenance.

## data center

A physical location where servers run and other IT operations are hosted.

## denial-of-service (DoS) attack

A DoS attack is a type of cyber attack in which an attacker aims to render a computer or other device unavailable to its intended users by interrupting the device's normal functioning.

**Related terms:** DDoS attack

## distributed denial-of-service (DDoS) attack

A DDoS attack is a malicious attempt to disrupt normal traffic of a targeted server, service, or network by overwhelming the target or its surrounding infrastructure with a flood of Internet traffic.

**Related terms:** DoS attack\
**Relevant links:** [What is a DDoS attack?](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)

## domain

The domain name of your application on Cloudflare.

**Related terms:** website, zone

## Domain Name System (DNS)

The Domain Name System (DNS) is the phonebook of the Internet. DNS translates domain names to IP addresses.

**Relevant links:** [Learn about DNS](https://www.cloudflare.com/learning/dns/what-is-dns/)

## DNS filtering

DNS filtering is the process of using the Domain Name System to block malicious websites and filter out harmful or inappropriate content. This ensures that company data remains secure and allows companies to have control over what their employees can access on company-managed networks. DNS filtering is often part of a larger access control strategy.

**Relevant links:** [What is DNS filtering?](https://www.cloudflare.com/learning/access-management/what-is-dns-filtering/)

## DNS record

DNS records are instructions that live in authoritative DNS servers and provide information about a domain including what IP address is associated with that domain and how to handle requests for that domain.

**Related terms:** DNS\
**Relevant links:** [Learning Center guide on DNS records](https://www.cloudflare.com/learning/dns/dns-records/)

## DNS server

Each device connected to the Internet has a unique IP address which other machines use to find the device. DNS servers eliminate the need for humans to memorize IP addresses such as 192.168.1.1 (in IPv4), or more complex newer alphanumeric IP addresses such as 2001:db8::1:1:1:1 (in IPv6).

**Related terms:** DNS

## DNS zone

A portion of the DNS namespace that is managed by a specific organization or administrator.

**Related terms:** DNS

## dynamic content

Dynamic content is website content that has to be fetched from the origin server.

**Related terms:** static content

## edge response status code

HTTP response code sent from Cloudflare to the client (end user). The Cloudflare dashboard **Analytics** app uses the edge response status code.

## encryption algorithm

An encryption algorithm is a set of mathematical operations performed on data to ensure the data is only understood by the intended recipient.

## Extended Validation (EV) certificate

EV certificates provide maximum trust to visitors, but require the most validation effort by the CA. EV certificates show the name of the company or organization in the address bar of the visitor’s browser. An EV certificate requires additional documentation by the company or organization in order for the CA to approve the certificate.

## feature

A feature is a setting in the Cloudflare dashboard that corresponds to functionality within a Cloudflare product or API.

## firewall

A firewall is a security system that monitors and controls network traffic based on a set of security rules.

## hostname

A hostname is the name given to a server or node on a network. In most cases, the hostname is the public DNS name of a server.

## HTTP request

An HTTP request is the way Internet communications platforms such as web browsers ask for the information they need to load a website.

**Related terms:** HTTP
**Relevant links:** [What is HTTP?](https://www.cloudflare.com/learning/ddos/glossary/hypertext-transfer-protocol-http/)

## identity provider (IdP or IDP)

An identity provider (IdP or IDP) stores and manages users' digital identities. Think of an IdP as being like a guest list, but for digital and cloud-hosted applications instead of an event. An IdP may check user identities via username-password combinations and other factors, or it may simply provide a list of user identities that another service provider (like an SSO) checks.

## intermediate certification

For security purposes, CAs issue intermediate certificates for signing website certificates. Intermediate certificates provide a means for the CA to revoke a single intermediate certificate, thus affecting only a small subset of website certificates.

## IP address

IP stands for Internet Protocol, which is the set of rules that makes it possible for devices to communicate over the Internet. With billions of people accessing the Internet every day, unique identifiers are necessary to keep track of who is doing what. The Internet Protocol solves this by assigning IP numbers to every device accessing the Internet. Every assigned number is an IP address.

**Relevant links:** [What is my IP address?](https://www.cloudflare.com/learning/dns/glossary/what-is-my-ip-address/)

## Internet

The Internet is a global system of computer networks that provides a wide range of information and communication facilities.

## location

Locations in Cloudflare for Teams are physical entities like offices, homes, retail stores, movie theatres or a data center.

**Relevant links:** [Locations](/cloudflare-one/connections/connect-devices/agentless/dns/locations/)

## member or user

A member or user is an email account in Cloudflare that you can grant access to your organization account. Members belonging to multiple accounts can select which account to manage via the Cloudflare dashboard.

**Related terms:** account

## mTLS (mutual TLS)

mTLS is a common security practice that uses client TLS certificates to provide an additional layer of protection, allowing to cryptographically verify the client information.

**Related terms:** TLS
**Relevant links:** [Enable mTLS](/ssl/client-certificates/enable-mtls/)

## nameserver

A nameserver is a dedicated server that translates human readable hostnames into IP addresses. Nameservers like root servers, TLD servers, and authoritative nameservers are fundamental components of the Domain Name System (DNS).

**Related terms:** DNS

## OAuth

OAuth is a technical standard for authorizing users. It is a protocol for passing authorization from one service to another without sharing the actual user credentials, such as a username and password. With OAuth, a user can sign in on one platform and then be authorized to perform actions and view data on another platform.

## Organization Validated (OV) certificate

OV certificates are used by corporations or governments to portray an extra layer of confidence for their visitors. Rather than just validating domain ownership, the CA also validates the company’s registration using qualified independent information sources. The organization’s name is listed in the certificate.

## origin bandwidth (origin egress bandwidth)

The amount of data transferred from the origin server to Cloudflare within a certain period of time. Origin bandwidth is the sum of all **EdgeResponseBytes** where **OriginResponseStatus** doesn’t equal _0_.

## Origin Certificate

{{<render file="_origin-certificate-definition.md">}}

## origin request

An origin request is a request served from the origin server.

**Relevant terms:** request

## origin response status code

An origin response status code is an HTTP response code sent from the origin server to Cloudflare.

## plan

Plans distinguish the breadth of Cloudflare features accessible to a specific domain. Plan options include [Free, Pro, Business, or Enterprise](https://www.cloudflare.com/plans/).

## primary certificate / secondary certificate

Primary and secondary indicates the order in which Custom SSL certificates were uploaded to Cloudflare. The primary certificate is the first certificate added to a pack. The primary certificate defines the hostnames covered by the certificate.

## protocol

A protocol is a set of rules governing the exchange or transmission of data between devices.

## public key / private key

SSL public and private keys are essentially long strings of characters used for encrypting and decrypting data. Data encrypted with the public key can only be decrypted with the private key, and vice versa. Private keys are kept secret and unshared.

**Related terms:** certificate

## roles

Authorize which Cloudflare products and features a member is allowed to access in a Cloudflare account. Learn more about [roles](/fundamentals/account-and-billing/members/roles/).

## root certificate

A root certificate is generated by a CA and is used to sign certificates. Every browser includes a root store of trusted root certificates. Any certificate signed with the private key of a root certificate is automatically trusted by a browser.

## saved bandwidth (saved egress bandwidth)

The percentage of bandwidth saved by caching on the Cloudflare network.

## seat

A unique user who authenticates to connect to an application protected by Cloudflare Access, or to use a Gateway service.

## Secure Sockets Layer (SSL)

SSL was a widely used cryptographic protocol for providing data security for Internet communications. SSL was superseded by TLS; however, most people still refer to Internet cryptographic protocols as SSL.

## Server Name Indication (SNI)

SNI allows a server to host multiple TLS Certificates for multiple websites using a single IP address. SNI adds the website hostname in the TLS handshake to inform the server which website to present when using shared IPs. Cloudflare uses SNI for all Universal SSL certificates.

## Service Level Agreement (SLA)

An SLA is a contractual obligation for Cloudflare to maintain a specific level of service. Read the [Service Level Agreement (SLA) for the Cloudflare Business plan](https://www.cloudflare.com/business-sla/). Enterprise customers refer to the Enterprise SLA provided by their Subscription Agreement.

## service token

Service tokens consist of an ID and Secret generated by Cloudflare Access that can be used by an automated system or application to reach an application protected by Cloudflare Access. Service tokens allow systems to authenticate without identity provider credentials in an automated way.

## static content

Static content is website content that can be delivered to an end user directly from cache, without hitting the origin server.

**Related terms:** dynamic content

## Subject Alternative Name (SAN)

The SAN field of an SSL certificate specifies additional hostnames (sites, IP addresses, common names, subdomains, apex domains, etc.) protected by a single SSL Certificate.

## subscription, add-on, or plan extension

Subscriptions are a monthly fee in addition to standard plan costs that are visible within the Cloudflare Overview app. Subscriptions refer to:

- Plan Extensions (Enterprise), or
- Active Subscriptions (Free, Pro, and Business)

Some examples include products and services such as Argo, Access, Load Balancing, Stream, and more.

## team domain

Your team domain is a unique subdomain assigned to your Cloudflare account; for example, `<your-team-name>.cloudflareaccess.com`. Setting up a team domain is an essential step in your Teams configuration. This is where your users will find the apps you've secured behind Teams — displayed in the App Launcher — and will be able to make login requests to them.

**Relevant links:** [App Launcher](/cloudflare-one/applications/app-launcher/)

## team name

The customizable portion of your [team domain](#team-domain). You can change this name at any time in the Teams dashboard, under the **Authentication** tab.

| team domain                             | team name        |
| --------------------------------------- | ---------------- |
| `<your-team-name>.cloudflareaccess.com` | `your-team-name` |

## Terraform

[Terraform](https://www.terraform.io/) is a tool for building, changing, and versioning infrastructure, and provides components and documentation for building Cloudflare resources.

## threat

Any event that can potentially cause serious damage and lead to site attacks. In addition to threat analytics, you can monitor search engine crawlers visiting your websites. Cloudflare uses the IP reputation of a visitor to decide whether to present a challenge. A Cloudflare internal algorithm calculates an IP's reputation and assigns a threat score that ranges from 0 to 100.

The security levels and the challenge display criteria are:

- _High_ - for scores greater than 0
- _Medium_ - for scores greater than 14
- _Low_ - for scores greater than 24
- _Essentially off_ - for scores greater than 49

**Relevant links:** [Cloudflare Logs documentation](/logs/)

## total bandwidth (total egress bandwidth, edge bandwidth)

The amount of data transferred from Cloudflare to end users within a certain period of time. Total bandwidth equals the sum of all **EdgeResponseBytes** for a certain period of time.

## Transport Layer Security (TLS)

TLS is a security protocol that replaces SSL for data privacy and Internet communication security. TLS encrypts communications between web applications and servers such as between a visitor’s browser loading a website.

## Tunnel certificate

The Cloudflare Tunnel software, `cloudflared`, generates a certificate when you login with your Cloudflare account. The certificate consists of a [service token](#service-token) and [origin certificate](#origin-certificate).

## two-factor authentication (2FA)

Two-factor authentication adds an additional layer of login security to Cloudflare accounts. It requires users to provide both something known, such as a Cloudflare password, and something physically present, such as an authentication code from a mobile device.

## uncached bandwidth (uncached egress bandwidth)

The amount of bandwidth that is not cached, and therefore is served from the origin. Uncached bandwidth is the sum of all **EdgeResponseBytes** where **CacheCacheStatus** doesn’t equal _hit_, _stale_, _updating_, _ignored_, or _revalidated_.

## uncached requests

Uncached requests are requests that are not cached, and therefore are served from the origin server. Uncached requests are the sum of all requests where **CacheCacheStatus** doesn’t equal to _hit_, _stale_, _updating_, or _ignored_.

**Related terms:** requests, cached requests

## usage-based billing

Within subscriptions, certain products are charged based on usage. This is referred to as usage-based billing. The bill can vary month by month based on usage. This is in contrast to monthly flat fees such as for [plans](https://www.cloudflare.com/plans/) or additional [Page Rules](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/).

## web application firewall (WAF)

A WAF is a security system that helps protect web applications by filtering and monitoring HTTP traffic between a web application and the Internet.

**Relevant links:** [Cloudflare WAF](/waf/)

## Zero Trust Security

An IT security model that requires strict identity verification for every person and device trying to access resources on a private network, regardless of whether they are sitting within or outside of the network perimeter. No single specific technology is associated with zero trust architecture; it is a holistic approach to network security that incorporates several different principles and technologies.
