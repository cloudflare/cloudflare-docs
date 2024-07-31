---
title: Security
pcx_content_type: reference-architecture
weight: 1
meta:
    title: "Cloudflare Security Architecture"
    description: This document provides insight into how this network and platform are architected from a security perspective, how they are operated, and what services are available for businesses to address their own security challenges.
products: [Workers, Turnstile]
---

# Cloudflare Security Architecture

## Introduction
Today, everything and everyone needs to be connected to everything everywhere, all the time, and everything must be secure. However, many businesses are not built on infrastructure that supports this reality. Historically, employees worked in an office where most business systems (file servers, printers, applications) were located on and accessible only from the private office network. A security perimeter was created around the network to protect against outsider threats, most of which came from the public Internet.

However, as Internet bandwidth increased and more people needed to do work outside of the office, VPNs allowed employees access to internal systems from anywhere they could get an Internet connection. Applications then started to move beyond the office network, living in the cloud either as SaaS applications or hosted in IaaS platforms. Companies rushed to expand access to their networks and invest in new, dynamic methods to detect, protect, and manage the constantly evolving security landscape. But this has left many businesses with complex policies and fragile networks with many point solutions trying to protect different points of access.

Since 2010, Cloudflare has been building a unique, large-scale network on which we run a set of security services that allow organizations to build improved connectivity and better protect their public and private networks, applications, users, and data. This document provides insight into how this network and platform are architected from a security perspective, how they are operated, and what services are available for businesses to address their own security challenges. The document comprises two main sections:

- How Cloudflare builds and operates its secure global network.
- How to protect your business infrastructure and assets using Cloudflare services built on the network.

### Who is this document for and what will you learn?
This document is designed for IT and security professionals who are looking at using Cloudflare to secure aspects of their businesses. It is aimed primarily at Chief Information Security Officers (CSO/CISO) and their direct teams who are responsible for the overall security program at their organizations. Because the document covers the security of the entire Cloudflare platform it does not go into deep details about any particular service. Instead, please visit our [Architecture Center](https://www.cloudflare.com/architecture/) to find specific information for a service or product.

To build a stronger baseline understanding of Cloudflare, we recommend the following resources:

{{<render file="_what-is-cloudflare-link.md">}}
- [How Cloudflare strengthens security everywhere you do business](https://cf-assets.www.cloudflare.com/slt3lc6tev37/is7XGR7xZ8CqW0l9EyHZR/1b4311823f602f72036385a66fb96e8c/Everywhere_Security-Cloudflare-strengthens-security-everywhere-you_do-business.pdf) (10 minutes)

## Secure global network
Any cloud security solution needs to be fast and always available. Our network protects over 20% of Internet web properties, operates in over 320 cities, and is 50 ms away from 95% of the Internet-connected population. Each server in each data center runs every service, so that traffic is inspected in one pass and acted upon close to the end user. These servers are connected together by over 13,000 network peering relationships with a total network capacity of 280 Tbps. Cloudflare’s network is also connected to [every Internet exchange](https://bgp.he.net/report/exchanges#_participants) (more than Microsoft, AWS, and Google) to ensure that we are able to peer traffic from any part of the Internet.

With millions of customers using Cloudflare, the network serves over [57 million HTTP requests](https://radar.cloudflare.com/traffic) per second on average, with more than 77 million HTTP requests per second at peak. As we analyze all this traffic, we detect and block an average of [209 billion cyber threats each day](https://radar.cloudflare.com/security-and-attacks). This network runs at this massive scale to ensure that customers using our security products experience low latency, access to high bandwidth, and a level of reliability that ensures the ongoing security of their business. (Note metrics are correct as of June 2024.)

### Architecture
#### Network
The Cloudflare network is not like a traditional enterprise network. It has been designed from the ground up using a service isolation, least privilege, and zero trust architecture. Public-facing edge servers, and the data centers they reside in, can be seen as islands in a vast lake of connectivity — where nothing trusts anything without strong credentials and tight access policies.

![The Cloudflare network has data centers in over 320 major cities.](/images/reference-architecture/security/security-ref-arch-1.svg)

A unique aspect of the network's security architecture is how we use anycast networking. In every data center we broadcast the entire Cloudflare network range (IPv6 and IPv4) for both UDP and TCP. [Border Gateway Protocol](https://www.cloudflare.com/learning/security/glossary/what-is-bgp/) (BGP) ensures routers all around the Internet provide the shortest possible path for any user to the nearest Cloudflare server where traffic is inspected. From a security perspective, this is very important. During distributed denial-of-service (DDoS) attacks to customers behind our network, a combination of high bandwidth capacity and distribution of requests across thousands of local servers helps ensure our network stays performant and available, even during some of the largest attacks in [Internet history](https://blog.cloudflare.com/cloudflare-mitigates-record-breaking-71-million-request-per-second-ddos-attack).

Server updates, such as access policies, rate limiting, and firewall rules, are performed by our [Quicksilver service](https://blog.cloudflare.com/introducing-quicksilver-configuration-distribution-at-internet-scale). Customer changes are reflected across the entire network in seconds, allowing customers to respond to changing business requirements and ensuring policies are quickly implemented globally.

Every level of the network conforms to strict hardened security controls. Processes running on the edge are designed with a need-to-know basis and run with least privilege. We make heavy use of hardware security modules (HSMs) and the keys maintained within them ensure only the right access is given at the right time. To ensure tight control over and detailed visibility of changes to the network, all infrastructure is managed via code ([IaC](https://en.wikipedia.org/wiki/Infrastructure_as_code)).

#### Servers
Cloudflare designs and owns all the servers in our network. There are two main types.

- **Private core servers**: The control plane where all customer configuration, logging, and other data lives.
- **Public edge servers**: Where Internet and privately tunneled traffic terminates to the Cloudflare network, to be inspected and then routed to its destination.

Server hardware is designed by Cloudflare and built by industry-respected manufacturers that complete a comprehensive supply chain and security review. Every server runs an identical software stack, allowing for consistent hardware design. The operating system on edge servers is also a single design and built from a highly modified Linux distribution, tailored for the scale and speed of our platform. Cloudflare is a significant contributor to the Linux kernel, and we regularly share information on how we secure our [servers and services](https://blog.cloudflare.com/the-linux-kernel-key-retention-service-and-why-you-should-use-it-in-your-next-application), helping the Linux community and the rest of the Internet benefit from our [engineering](https://blog.cloudflare.com/linux-kernel-hardening).

#### Services
Every server runs all Cloudflare products and services that customers use to secure their networks and applications. Later in this document we provide an overview of these services, but for the moment it's important to provide insight into the development of the software. From the initial design of every product, the engineering team works hand in hand with security, compliance, and risk teams to review all aspects of the service. These teams can be viewed as part of the engineering and product teams, not an external group. They are essential to the development of everything we do at Cloudflare and we have some of the most respected professionals in the industry. Code is reviewed by security teams at every stage of development, and we implement many automated systems to analyze software looking for vulnerabilities. Threat modeling and penetration testing frameworks such as [OWASP](https://owasp.org/www-project-web-security-testing-guide/latest/3-The_OWASP_Testing_Framework/), [STRIDE](https://en.wikipedia.org/wiki/STRIDE_(security)), and [DREAD](https://en.wikipedia.org/wiki/DREAD_(risk_assessment_model)) are used during design, development, and the release process.

Many of our products run on our [serverless runtime](/workers/) environment, which leverages the very latest techniques in service isolation. We anticipated this secure runtime environment could be very valuable to our customers, so we productized it, allowing them to [build](/workers/reference/how-workers-works/) and [run](https://blog.cloudflare.com/cloud-computing-without-containers) their own applications on our network. More about that at the very end of this document.

#### Innovation
To ensure we are delivering the most secure network and platform possible, we are always innovating. New technologies need to be created to solve the ever-increasing range of security threats and challenges. Cloudflare leads many initiatives, such as further securing BGP using [RPKI](https://isbgpsafeyet.com/), and we regularly contribute to working IETF groups on many common Internet security protocols. We strive to help increase and monitor [IPv6 adoption](https://radar.cloudflare.com/adoption-and-usage), which inherently creates a more secure Internet, and we stay ahead of future challenges by deploying technologies such as [post-quantum cryptography](https://blog.cloudflare.com/post-quantum-for-all) before any increase in computing power from quantum computers threatens existing cryptographic techniques.

### Operational security
Not only must the design of the network be secure, but so should how we run and maintain it. We operate at a massive scale, and the common design of our servers helps optimize software deployments and monitoring. Defining who has access to maintain the network is fully automated, following infrastructure-as-code practices with role-based access controls (RBAC) and least privilege controls used everywhere.

Customers send sensitive information to our products and services. The mission for the Cloudflare compliance team is to ensure the underlying infrastructure that supports these services meets [industry compliance standards](https://www.cloudflare.com/trust-hub/compliance-resources/) such as FedRAMP, SOC II, ISO, PCI certifications, C5, privacy, and regulatory frameworks. The compliance team works with all engineering organizations to help integrate these requirements as part of the way we work. From a compliance perspective, our areas of focus include:

- Privacy and security of customer data
- Maintaining compliance validations
- Helping customers with their own compliance
- Monitoring the changes to the regulatory landscape
- Providing feedback to regulatory bodies on upcoming changes

We also run a [bug bounty program](https://hackerone.com/cloudflare), giving incentives for the community to find and report vulnerabilities to us for financial reward.

In summary, Cloudflare not only has built the right technology to secure our network, but also has well-staffed and mature teams ensuring that the right processes are created, followed, and monitored. As Cloudflare has grown over the past decade, we've accrued some of the best security knowledge in the industry, which in turn has attracted top talent to come work with us. This effect compounds each year, bringing our security skills and knowledge to greater heights. We are also very transparent about how Cloudflare runs and secures its network, and we [often blog](https://blog.cloudflare.com/secure-by-design-principles) about our processes and evolving approach to security.

## Using Cloudflare to protect your business
The reason the Cloudflare network exists is to provide services to customers to protect their own assets, such as users, applications, and data. The following section details what these services are, their basic architecture, and how they are used by customers. Note that this section does not go into extensive detail on each service. Instead, please refer to our [Architecture Center](https://cloudflare.com/architecture) or [product documentation](/products/) to understand more about a specific product, service, or solution. The goal in this document is to provide information about the overall set of security services available and the general use cases they are designed for. As such, we provide a table of contents so you can jump to a section of interest.

1. [Securing public and private resources](#securing-public-and-private-resources)
2. [Protecting public resources](#protecting-public-resources)
    1. [Common attacks and protection](#common-attacks-and-protection)
        1. [DDoS attacks](#ddos-attacks)
        2. [Zero-day attacks](#zero-day-attacks)
        3. [Unauthorized access](#unauthorized-access)
        4. [Client-side attacks](#client-side-attacks)
        5. [Data exfiltration](#data-exfiltration)
        6. [Credential stuffing](#credential-stuffing)
        7. [Brute force attacks](#brute-force-attacks)
        8. [Credit card skimming](#credit-card-skimming)
        9. [Inventory hoarding](#inventory-hoarding)
        10. [Fuzzing (vulnerability scanning)](#fuzzing-vulnerability-scanning)
        11. [Cross-Site Scripting (XSS) attacks](#cross-site-scripting-xss-attacks)
        12. [Remote Code Execution (RCE) attacks](#remote-code-execution-rce-attacks)
        13. [SQL injection (SQLi) attacks](#sql-injection-sqli-attacks)
        14. [Malware](#malware)
    2. [Cloudflare application security products](#cloudflare-application-security-products)
       1. [Security Analytics](#security-analytics)
       2. [Web Application Firewall (WAF)](#web-application-firewall-waf)
       3. [Rate limiting](#rate-limiting)
       4. [L7 DDoS](#l7-ddos)
       5. [API Gateway](#api-gateway)
       6. [Bot Management](#bot-management)
       7. [Page Shield](#page-shield)
       8. [SSL/TLS](#ssltls)
       9. [Security Center](#security-center)
       10. [Cloudflare for SaaS](#cloudflare-for-saas)
   1. [Cloudflare network security products](#cloudflare-network-security-products)
       1.  [Magic Transit](#magic-transit)
       2.  [Magic WAN](#magic-wan)
       3.  [Magic Firewall](#magic-firewall)
       4.  [Magic Network Monitoring](#magic-network-monitoring)
       5.  [Spectrum](#spectrum)
3. [Protecting private resources](#protecting-private-resources)
   1. [Securing connectivity to private resources](#securing-connectivity-to-private-resources)
   2. [User connectivity](#user-connectivity)
   3. [Integrating identity systems](#integrating-identity-systems)
   4. [Access control](#access-control)
   5. [Protecting data](#protecting-data)
   6. [Securing Internet access](#securing-internet-access)
4. [Observability](#observability)
5. [Developer platform](#developer-platform)

In general, what customers need to effectively combat and protect against the growing breadth and complexity of threats is a unified security solution that provides visibility, analytics, detection, and mitigation in an operationally consistent and efficient manner. Cloudflare addresses these needs in several ways:

- Operational consistency: Cloudflare has a single dashboard/UI for all administrative tasks.
- Operational simplicity: Cloudflare is well-known for minimizing operational complexity with well-designed user interfaces that minimize manual configurations and UI workflows. Additionally, cross-product integrations allow for automating configurations and policies.
- Continuous innovation: Cloudflare continues to innovate across its broad security portfolio with unique differentiating capabilities such as its CAPTCHA replacement product, Turnstile, and the industry-first API Sequence Mitigation capability.
- Workload location agnostic: Cloudflare was built first and foremost around performance and security services. As such, it was built from the ground up to be workload location agnostic with multi-cloud inherently being a top use case. Customers can deploy workloads in multiple clouds and/or on-prem and get the same operational consistency.
- Performance and scale: All Cloudflare services run on every server in every data center on the same global cloud, allowing for maximum performance in terms of global reachability and latency and ability to scale out, leveraging the full capacity of Cloudflare’s global infrastructure.
- API first: Cloudflare is API first. All configurations and capabilities available from the UI/dashboard are also available from the API. Cloudflare can easily be configured with Terraform to support automation for customer workflows/processes.

Cloudflare’s security services that protect networks, applications, devices, users, and data can be grouped into the following categories.

![Cloudflare has a wide range of security services across SASE/SSE, application and network security.](/images/reference-architecture/security/security-ref-arch-2.svg)

Note this list is focused on security and doesn't include products such as our content delivery network (CDN), load balancing, and domain name services (DNS).

### Securing public and private resources
There are two main types of resources our customers are trying to secure:

- **Public resources** are defined as any content, asset, or infrastructure that has an interface available and accessible to the general Internet, such as brand websites, ecommerce sites, and APIs. They can also be defined by the fact they are accessible by anonymous users or people who register themselves to gain access, such as social media websites, video streaming services, and banking services.
- **Private resources** are defined as content, assets, or infrastructure with the intended set of users constrained to a single company, organization, or set of customers. These services typically require accounts and credentials to gain access. Examples of such resources are the company HR system, source code repositories, and a point of sale (POS) system residing on a retail branch network. These resources are typically accessible only by employees, partners, and other trusted, known identities.

Public and private resources can also include both infrastructure-level components like servers and consumed resources like websites and API endpoints. Communication over networks and the Internet happens in different stages and levels as shown in the open systems interconnection (OSI) model diagram below.

![The network OSI model describes network communication from the physical through to the application layer.](/images/reference-architecture/security/security-ref-arch-3.svg)

Cloudflare can protect at multiple layers of the OSI model, and in this document we are primarily concerned with protecting resources at layers 3, 4, and 7.

- Layer 3, referred to as the “network layer,” is responsible for facilitating data transfer between two different networks. The network layer breaks up segments from the transport layer into smaller units, called packets, on the sender’s device and reassembles these packets on the receiving device. The network layer is where routing takes place — finding the best physical path for the data to reach its destination.
- Layer 4, referred to as the “transport layer,” is responsible for end-to-end communication between the two devices. This includes taking data from the session layer and breaking it up into chunks called “segments” before sending it to layer 3.

Cloudflare security products that can be used for L3 and L4 security include Cloudflare’s network services offerings, including [Magic Transit](/magic-transit/), [Magic Firewall](/magic-firewall/), [Magic WAN](/magic-wan/), [Magic Network Monitoring](/magic-network-monitoring/), and [Spectrum](/spectrum/).

- Layer 7, referred to as the “application layer,” is the top layer of the data processing that occurs just below the surface or behind the scenes of the software applications that users interact with. HTTP and API requests/responses are layer 7 events.

Cloudflare has a suite of application security products that includes [Web Application Firewall](/waf/) (WAF), [Rate Limiting](/waf/rate-limiting-rules/), [L7 DDoS](/ddos-protection/managed-rulesets/http/), [API Gateway](/api-shield/api-gateway/), [Bot Management](/bots/), and [Page Shield](/page-shield/).

Note that SaaS applications could be considered both public and private. For example, Salesforce has direct Internet-facing access but contains very private information and is usually only accessible by employee accounts that are provisioned by IT. For the purpose of this document, we will consider SaaS applications as private resources.

These are general guidelines because with Cloudflare it's possible to have very sensitive internal applications be protected by publicly accessible remote access services. We will explain more as we continue through this document.

### Protecting public resources
Businesses rely on public websites and API endpoints for daily ecommerce transactions and brand awareness, and often the entire business is an online service. High availability, performance, and security are top concerns, and customers use Cloudflare to ensure their businesses stay up and running. Cloudflare security services help prevent fraud, data exfiltration, and attacks that can create liability, cause losses and brand damage, and slow down or halt business.

Public assets need to be protected on multiple fronts and from various attacks; therefore, multiple different security capabilities need to be implemented. Additionally, customers must tackle the operational efficiency of solutions they implement. Managing multiple point products for mitigating different attacks or having multiple vendors to meet company security objectives and requirements creates many operational inefficiencies and issues, such as multiple UIs/dashboards, training, lack of cross-product integrations, etc.

The diagram below shows a typical request for a public asset going through the Cloudflare network. Our security services are part of many capabilities, and Cloudflare acts as a reverse proxy where requests are routed to the closest data center and performance and security services are applied prior to that request being routed onto the destination. These services can easily be consolidated and used together regardless of where workloads are deployed; the operations and implementation remain consistent. Note: the diagram doesn't detail all of Cloudflare's services.

![Every request through Cloudflare passes once for inspection across all security products.](/images/reference-architecture/security/security-ref-arch-4.svg)

The diagram highlights the following:
- The [world's fastest DNS service](https://www.dnsperf.com/) provides fast resolution of public hostnames
- Ensure data compliance by [choosing geographic locations](https://www.cloudflare.com/data-localization/) for the inspection and storage of data
- Spectrum extends Cloudflare security capabilities to all UDP/TCP applications
- Security services inspect a request in one pass
- Application performance services also act on the request in the same pass
- [Smart routing](/argo-smart-routing/) finds the lowest latency path between Cloudflare and the public destination

#### Common attacks and protection
Cloudflare's broad product portfolio protects against a wide variety of attacks. Several common attacks are described in more detail below and include a reference to the Cloudflare products that are used to mitigate the specific attack.

##### DDoS attacks
A [distributed denial-of-service (DDoS) attack](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/) is a malicious attempt to disrupt the availability of a targeted server, service, or network by overwhelming the target or its surrounding infrastructure with a flood of traffic. The goal is to slow down or crash a program, service, computer, or network, or to fill up capacity so that no one else can use or receive the service. DDoS attacks can occur at L3, L4, or L7, and Cloudflare provides protections at all these different layers.

![DDoS attacks are prevented at layers 3, 4 and 7.](/images/reference-architecture/security/security-ref-arch-5.svg)

Cloudflare’s L7 DDoS Protection prevents denial of service at layer 7; Spectrum protects at layer 4; and Magic Transit protects at layer 3. In addition to the core DDoS-specific security products, Cloudflare provides advanced rate limiting capabilities to allow for throttling traffic based on very granular request data, including headers information and API tokens. Cloudflare’s Bot Management capabilities can also limit denial-of-service attacks by effectively mitigating bot traffic.

Products: [L7 DDoS](/ddos-protection/managed-rulesets/http/), [Spectrum](/spectrum/), [Magic Transit](/magic-transit/)

##### Zero-day attacks
A zero-day exploit (also called a zero-day threat) is an attack that takes advantage of a security vulnerability that does not have a fix in place. It is referred to as a "zero-day" threat because once the flaw is discovered, the developer or organization has "zero days" to then come up with a solution.

Web Application Firewall (WAF) [Managed Rules](/waf/managed-rules/) allow you to deploy pre-configured managed rulesets that provide immediate protection against the following:

- Zero-day vulnerabilities
- Top 10 attack techniques
- Use of stolen/exposed credentials
- Extraction of sensitive data

WAF checks incoming web requests and filters undesired traffic based on sets of rules (rulesets) deployed at the edge. These managed rulesets are maintained and regularly updated by Cloudflare. From the extensive threat intelligence obtained from across our global network, Cloudflare is able to quickly detect and classify threats. As new attacks/threats are identified, Cloudflare will automatically push WAF rules to customers to ensure they are protected against the latest zero-day attacks.

Additionally, Cloudflare provides for [WAF Attack Score](/waf/about/waf-attack-score/), which complements Cloudflare managed rules by detecting attack variations. These variations are typically achieved by malicious actors via fuzzing techniques that are trying to identify ways to bypass existing security policies. WAF classifies each request using a machine learning algorithm, assigning an attack score from 1 to 99 based on the likelihood that the request is malicious. Rules can then be written which use these scores to determine what traffic is permitted to the application.

![Machine learning maintains lists of managed rules to determine if the request should be let through the WAF or not.](/images/reference-architecture/security/security-ref-arch-6.svg)

Products: [WAF - Cloudflare Managed Rules](/waf/managed-rules/)

##### Unauthorized access
Unauthorized access can result from broken authentication or broken access control due to vulnerabilities in authentication, weak passwords, or easily bypassed authorization. Cloudflare mTLS (mutual TLS) and JWT (JSON Web Tokens) validation can be used to bolster authentication. Clients or API requests that don’t have a valid certificate or JWT can be denied access via security policy. Customers can create and manage mTLS certificates from the Cloudflare dashboard or an API. Cloudflare’s WAF and [Exposed Credentials Check](/waf/managed-rules/check-for-exposed-credentials/) managed ruleset can be used to detect compromised credentials being used in authentication requests. WAF policies can also be used to restrict access to applications/paths based on different request criteria.

Products: [SSL/TLS - mTLS](/ssl/client-certificates/enable-mtls/), [API Gateway (JWT Validation)](/api-shield/security/jwt-validation/), [WAF](/waf/)

##### Client-side attacks
Client-side attacks like [Magecart](https://blog.cloudflare.com/detecting-magecart-style-attacks-for-pageshield) involve compromising third-party libraries, compromising a website, or exploiting vulnerabilities in order to exfiltrate sensitive user data to an attacker-controlled domain. Page Shield leverages Cloudflare’s position in the network as a reverse proxy to receive information directly from the browser about:

1. What JavaScript files/modules are being loaded
2. Outbound connections made
3. Inventory of cookies used by the application (planned to be available late 2024)

Page Shield uses threat-feed detections of malicious JavaScript domains and URLs. In addition, it can download JavaScript source files and run them through a machine learning classifier to identify malicious behavior and activity; the result is a JS Integrity Score designating if the JavaScript file is malicious. Page Shield can also detect changes to JavaScript files. Alerts using emails, webhooks, and PagerDuty can be set based on different criteria such as new resources identified, code changes, and malicious code/domains/URLs.

Page Shield [Content Security policies](/page-shield/policies/) can be created and applied to add an additional level of security that helps detect and mitigate certain types of attacks, including:

- Content/code injection
- Cross-site scripting (XSS)
- Embedding malicious resources
- Malicious iframes (clickjacking)

Products: [Page Shield](/page-shield/)

##### Data exfiltration
Data exfiltration is the process of acquiring sensitive data through malicious tactics or through misconfigured services. Cloudflare Sensitive Data Detection addresses common data loss threats. Within the WAF, these rules monitor the download of specific sensitive data — for example, financial and personally identifiable information. Specific patterns of sensitive data are matched upon and logged. Sensitive data detection is also integrated with API Gateway so customers are alerted on any API responses returning sensitive data matches.

Products: [WAF - Sensitive Data Detection](/waf/managed-rules/)

##### Credential stuffing
Credential stuffing is a cyberattack in which credentials obtained from a data breach on one service are used to attempt to log in to another unrelated service. Usually, automation tools or scripting are used to loop through a vast number of stolen credentials, sometimes augmented with additional data in the hopes of achieving account takeover.

Cloudflare Bot Management can be used to detect potentially malicious bots. Cloudflare challenges can also be used to challenge suspect requests and stop automated attempts to gain access. WAF policies can be used with specific request criteria to prevent attacks. Additionally, Cloudflare’s WAF and Exposed Credentials Check managed ruleset can be used to detect compromised credentials being used in auth requests. Rate limiting can also throttle requests and effectiveness of malicious credential stuffing techniques.

Products: [Bot Management](/bots/), [WAF](/waf/), [Rate Limiting](/waf/rate-limiting-rules/)

##### Brute force attacks
Brute force attacks attempt to guess passwords or clues, using random characters sometimes combined with common password suggestions. Usually, automation tools or scripting are used to loop through a vast number of possibilities in a short amount of time.

Cloudflare Bot Management can be used to detect potentially malicious bots. Cloudflare challenges can also be used to challenge suspect requests and stop automated brute force attacks. WAF and rate limiting policies can be used with specific request criteria to apply granular policies on application login pages to block or throttle traffic.

Products: [Bot Management](/bots/), [WAF](/waf/), [Rate Limiting](/waf/rate-limiting-rules/)

##### Credit card skimming
Credit card skimming is a fraudulent method to skim payment information from websites. Page Shield can be used to detect clients using malicious JavaScript libraries or making connections to known malicious domains or URLs. Page Shield will also detect changes to files/code being used on a site and give a JS Integrity Score to JavaScript files assessing whether the code is malicious. Content Security Policies (CSPs) can be deployed to enforce a positive security model. These capabilities can prevent compromised code from performing malicious behavior such as credit card skimming.

Products: [Page Shield](/page-shield/)

##### Inventory hoarding
Inventory hoarding is when malicious bots are used to buy large quantities of products online, preventing legitimate consumers from purchasing them. This can cause many issues for businesses, including creating artificial scarcity, causing inflated prices, and disrupting access for legitimate customers. Cloudflare Bot Management can be used to detect potentially malicious bots. Cloudflare challenges can also be used to challenge suspect requests and stop automated processes. WAF policies can be used with specific request criteria to prevent attacks.

Products: [Bot management](/bots/), [WAF](/waf/)

##### Fuzzing (vulnerability scanning)
[Fuzzing](https://owasp.org/www-community/Fuzzing) is an automated testing method used by malicious actors that uses various combinations of data and patterns to inject invalid, malformed, or unexpected inputs into a system. The malicious user hopes to find defects and vulnerabilities that can then be exploited. Cloudflare WAF leverages machine learning to detect fuzzing based attempts to bypass security policies. The WAF attack score complements managed rules and highlights the likeliness of an attack.

Bot Management can detect potentially malicious bots by automating vulnerability scanning. With API Gateway, customers can employ schema validation and sequence mitigation to prevent the automated scanning and fuzzing techniques with APIs.

Products: [WAF](/waf/), [Bot Management](/bots/), [API Gateway](/api-shield/api-gateway/)

##### Cross-Site Scripting (XSS) attacks
Cross-Site Scripting (XSS) attacks are a type of injection attack in which malicious scripts are injected into websites and then used by the end user’s browser to access sensitive user information such as session tokens, cookies, and other information.

Cloudflare WAF leverages machine learning to detect attempts to bypass security policies and provides a specific WAF Attack Score for the likeliness the request is an XSS attack.

Products: [WAF](/waf/)

##### Remote Code Execution (RCE) attacks
In a remote code execution (RCE) attack, an attacker runs malicious code on an organization’s computers or network. The ability to execute attacker-controlled code can be used for various purposes, including deploying additional malware or stealing sensitive data.

Cloudflare WAF leverages machine learning to detect attempts to bypass security policies and provides a specific WAF Attack Score for the likeliness the request is an RCE attack.

Products: [WAF](/waf/)

##### SQL injection (SQLi) attacks
Structured Query Language Injection (SQLi) is a code injection technique used to modify or retrieve data from SQL databases. By inserting specialized SQL statements into an entry field, an attacker is able to execute commands that allow for the retrieval of data from the database, the destruction of sensitive data, or other manipulative behaviors.

Cloudflare WAF leverages machine learning to detect attempts to bypass security policies and provides a specific WAF Attack Score for the likeliness the request is an SQLi attack.

Products: [WAF](/waf/)

##### Malware
Malware can refer to viruses, worms, trojans, ransomware, spyware, adware, and other types of harmful software. A key distinction of malware is that it needs to be intentionally malicious; any software that unintentionally causes harm is not considered to be malware.

When Uploaded Content Scanning is enabled, content scanning attempts to detect items such as uploaded files, and scans them for malicious signatures like malware. The scan results, along with additional metadata, are exposed as fields available in WAF custom rules, allowing customers to implement fine-grained mitigation rules.

Products: [WAF - Uploaded Content Scanning](/waf/about/content-scanning/)

#### Cloudflare application security products
This document has covered some common attacks and Cloudflare products used to detect and mitigate respective threats. Below we highlight and provide some additional details on each product across Cloudflare’s application and network security portfolio.

##### Security Analytics
Security Analytics brings together all of Cloudflare’s security detection capabilities within one dashboard. Customers can get a quick view and insight on mitigated and unmitigated traffic, attack traffic, bot traffic, malicious content upload attempts, and details around rate limiting analysis and account takeover analysis. Right from the dashboard displaying detected threats, with the click of a button customers can take action to put in place policies to mitigate.

![All security detection can be seen from a single dashboard.](/images/reference-architecture/security/security-ref-arch-7.svg)

##### Web Application Firewall (WAF)
Using Cloudflare [WAF](/waf/), customers can deploy custom rules based on very granular request criteria to mitigate specific threats or to block requests with certain HTTP anomalies. In addition, customers can deploy Cloudflare managed rules to mitigate zero-day attacks, common OWASP Top 10 attacks, requests using known leaked credentials, and requests extracting sensitive data.

[WAF Managed Rules](/waf/managed-rules/) allow customers to deploy pre-configured managed rulesets that provide immediate protection against:

- Zero-day vulnerabilities
- Top 10 attack techniques
- Use of stolen/exposed credentials
- Extraction of sensitive data

##### Rate limiting
[Rate limiting](/waf/rate-limiting-rules/) can be used to mitigate various attacks, including volumetric attacks, credential stuffing, web scraping, and DoS attacks. Cloudflare rate limiting allows customers to define rate limits for requests matching an expression, and the action to perform when those rate limits are reached. Rate limiting can be granular based on specific request or header criteria and can also be based on sessions or API tokens. Customers can configure actions including logging, blocking, and challenges for when the specified rate is exceeded.

Customers can also configure which request criteria is used as a counter for determining when to throttle or block after a limit is exceeded. Customers can implement two different behaviors for rate limiting:

1. **Block for the selected duration**. Once the rate is exceeded, the WAF will block all requests during the selected duration before the counter is reset.

![All actions are blocked once the rate limit is reached.](/images/reference-architecture/security/security-ref-arch-8.svg)

2. **Throttle requests over the maximum configured rate**. The WAF will block any requests exceeding the configured rate, and the remaining requests will be allowed. The analogy for this behavior is a sliding window effect.

![All security detection can be seen from a single dashboard.](/images/reference-architecture/security/security-ref-arch-9.svg)

##### L7 DDoS
The Cloudflare [HTTP DDoS Attack Protection](/ddos-protection/managed-rulesets/http/) managed ruleset is a set of pre-configured rules used to match known DDoS attack vectors at layer 7 (application layer) on the Cloudflare global network. The rules match known attack patterns and tools, suspicious patterns, protocol violations, requests causing large amounts of origin errors, excessive traffic hitting the origin/cache, and additional attack vectors at the application layer. Cloudflare updates the list of rules in the managed ruleset on a regular basis.

##### API Gateway
[API Gateway](/api-shield/api-gateway/) is Cloudflare’s API management and security product. API Gateway delivers visibility via API discovery and analytics, provides endpoint management, implements a positive security model, and prevents API abuse.

![All security detection can be seen from a single dashboard.](/images/reference-architecture/security/security-ref-arch-10.svg)


API Gateway’s API Discovery is used to learn all API endpoints in a customer’s environment using machine learning. After this step, customers can save endpoints to Endpoint Management so additional API performance and error information can be collected and security policies can be applied.

Customers can enable a positive security model using mTLS, JWT validation, and schema validation and protect against additional API abuse with rate limiting and volumetric abuse protection as well as sequence mitigation and GraphQL protections.

![The API gateway has many stages, discovery, review, using a positive security model, abuse protection, data protection and endpoint management/monitoring.](/images/reference-architecture/security/security-ref-arch-11.svg "Common user workflow for API Gateway")

##### Bot Management
[Bot Management](/bots/) is used to mitigate various malicious activities, including web scraping, price scraping, inventory hoarding, and credential stuffing. Cloudflare has multi-layered bot mitigation capabilities that include heuristics, machine learning, anomaly detection, and JS fingerprinting. Bot management also assigns a bot score to every request. WAF rules can be created around bot scores to create very granular security policies.

![Bot management can filter good and bad bots.](/images/reference-architecture/security/security-ref-arch-12.svg)

Additionally, Cloudflare can take the action of challenging clients if it suspects undesired bot activity. Cloudflare offers its [Managed Challenge](/waf/reference/cloudflare-challenges/) platform where the appropriate type of challenge is dynamically chosen based on the characteristics of a request. This helps avoid CAPTCHAs, which result in a poor customer experience.

Depending on the characteristics of a request, Cloudflare will choose an appropriate type of challenge, which may include but is not limited to:

- A non-interactive challenge page (similar to the current JS Challenge).
- A custom interactive challenge (such as clicking a button).
- Private Access Tokens (using recent Apple operating systems).

With [Turnstile](/turnstile/), Cloudflare has completely moved away from CAPTCHA. Turnstile is Cloudflare’s smart CAPTCHA alternative. It can be embedded into any website without sending traffic through Cloudflare and works without showing visitors a CAPTCHA. Turnstile allows you to run challenges anywhere on your site in a less intrusive way and uses APIs to communicate with Cloudflare’s Managed Challenge platform.

![Turnstile can be deployed to totally avoid presenting users with a CAPTCHA.](/images/reference-architecture/security/security-ref-arch-13.svg)

##### Page Shield
[Page Shield](/page-shield/) ensures the safety of website visitors’ browser environment and protects against client-side attacks like Magecart. By using a Content Security Policy (CSP) deployed with a report-only directive to collect information from the browser, Page Shield tracks loaded resources like scripts and detects new resources or connections being made by the browser. Additionally, Page Shield alerts customers if it detects scripts from malicious domains or URLs — or connections being made from the browser to malicious domains or URLs.

Page Shield can download JavaScript source files and run them through a machine learning classifier to identify malicious behavior and activity; the result is a JS Integrity Score designating if the JavaScript file is malicious.

##### SSL/TLS
Cloudflare’s [SSL/TLS](/ssl/) provides a number of features to meet customer encryption requirements and certificate management needs. An SSL/TLS certificate is what enables websites and applications to establish secure connections. With SSL/TLS, a client — such as a browser — can verify the authenticity and integrity of the server it is connecting with, and use encryption to exchange information.

Cloudflare’s global network is at the core of several products and services that Cloudflare offers. In terms of SSL/TLS, this means instead of only one certificate, there can actually be two certificates involved in a single request: an edge certificate and an origin certificate.

![SSL/TLS can be used for both Cloudflare to user, and origin server to Cloudflare security.](/images/reference-architecture/security/security-ref-arch-14.svg)

Edge certificates are presented to clients visiting the customer’s website or application. Origin certificates guarantee the security and authentication on the other side of the network, between Cloudflare and the origin server of the customer's website or application. [SSL/TLS encryption modes](/ssl/origin-configuration/ssl-modes/) control whether and how Cloudflare will use both these certificates, and you can choose between different modes.

Customers can also enable [mutual Transport Layer Security (mTLS)](/ssl/client-certificates/enable-mtls/) for hostnames and API endpoints to bolster security for authentication, enforcing that only devices with valid certificates can gain access. Additional security features like [Authenticated Origin Pulls](/ssl/origin-configuration/authenticated-origin-pull/) can be configured to help ensure requests to the origin server come from the Cloudflare network. [Keyless SSL](/ssl/keyless-ssl/) allows security-conscious clients to upload their own custom certificates and benefit from Cloudflare, but without exposing their TLS private keys. With [Cloudflare for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/), customers can also issue and validate certificates for their own customers.

##### Security Center
[Cloudflare Security Center](/security-center/) offers attack surface management (ASM) that inventories IT assets, enumerates potential security issues, controls phishing and spoofing risks, and enables security teams to investigate and mitigate threats in a few clicks. The Security Center is a great starting point for security analysts to get a global view of all potential issues across all applications/domains.

Key capabilities offered:

- Inventory and review IT infrastructure assets like domains, ASNs, and IPs.
- Manage an always up-to-date list of misconfigurations and risks in Cloudflare IT assets.
- Query threat data gathered from the Cloudflare network to investigate and respond to security risks.
- Gain full control over who sends email on your organization's behalf with DMARC Management.

##### Cloudflare for SaaS
If you build and host your own SaaS product offering, then [Cloudflare for SaaS](/cloudflare-for-platforms/) might be of interest. It allows customers to extend the security and performance benefits of Cloudflare’s network to their customers via their own custom or vanity domains. Cloudflare for SaaS offers multiple configuration options. In the below diagram, custom hostnames are routed to a default origin server called “fallback origin”.

![Bring Cloudflare security to customer domains using your SaaS application.](/images/reference-architecture/security/security-ref-arch-15.svg)

#### Cloudflare network security products
##### Magic Transit
[Magic Transit](/magic-transit/) protects entire IP subnets from DDoS attacks, providing for sub-second threat detection while also accelerating network traffic. It uses Cloudflare’s global network to mitigate attacks, employing standards-based networking protocols like BGP, GRE, and IPsec for routing and encapsulation.

All network assets, whether on-premises or in private or public-hosted cloud environments, can easily be protected by sitting behind and being advertised from the Cloudflare network providing for over 280 Tbps of network capacity.

![Magic Transit can secure your private network links.](/images/reference-architecture/security/security-ref-arch-16.svg)

##### Magic WAN
With [Magic WAN](/magic-wan/), customers can securely connect any traffic source — data centers, offices, devices, cloud properties — to Cloudflare’s network and configure routing policies to get the bits where they need to go. Magic WAN supports a variety of on-ramps, including anycast GRE and IPsec tunnels, Cloudflare Network Interconnect, Cloudflare Tunnel, WARP, and a variety of network on-ramp partners. Magic WAN can help end reliance on traditional SD-WAN appliances and securely connect users, offices, data centers, and hybrid cloud over the Cloudflare global network without relying on vendor-specific hardware or software.

##### Magic Firewall
[Magic Firewall](/magic-firewall/) is Cloudflare’s firewall-as-a-service solution delivered from Cloudflare’s global network and is integrated with Magic Transit and Magic WAN. It allows for enforcing consistent network security policies across customers’ entire WAN, including headquarters, branch offices, and virtual private clouds. Customers can deploy granular rules that globally filter on protocol, port, IP addresses, packet length, and bit field match.

##### Magic Network Monitoring
[Magic Network Monitoring](/magic-network-monitoring/) is a cloud network flow monitoring solution that gives customers end-to-end network traffic visibility, DDoS attack type identification, and volumetric traffic alerts. When a DDoS attack is detected, an alert can be received via email, webhook, or PagerDuty.

##### Spectrum
[Spectrum](/spectrum/) is a reverse proxy product that extends the benefits of Cloudflare to all TCP/UDP applications providing L4 DDoS protection. Spectrum also provides an IP firewall allowing customers to deny IPs or IP ranges to granularly control traffic to application servers. Customers can also configure rules to block visitors from a specified country or even an Autonomous System Number (ASN).

### Protecting private resources
Private resources typically contain highly sensitive, company confidential information and either by way of laws and regulations, or by the nature of the confidentiality of the data, access to them is much more restricted. Traditionally, private applications were only accessible on private networks in company buildings that users had to have physical access to. But as we all know today, access to private resources needs to take place from a wide range of locations, and paradoxically, private applications can live in very public locations. Most SaaS applications are exposed to the public Internet.

The following are typical attributes of private resources:
- Users have been pre-authorized and provisioned. They can't just sign up. They need to be given specific access to the resource either directly or via access control mechanisms such as certificates, group membership, or role assignment.
- Network access to a self-hosted resource is typically over-managed, private network routes and not accessible via the general Internet.
- Private resources that live in data centers (physical or virtual) and are connected to networks that are hosted and managed by the business, which are either on-premises or virtual private networks running in public cloud infrastructure.

As mentioned, traditional access to private resources required physical access to the network by being in the office connected via Ethernet. As remote access needs increased, companies installed on-premises VPN servers that allowed users and devices to "dial in" to these private networks. Many applications have left these private networks and instead migrated to SaaS applications or are hosted in public cloud infrastructure. This traditional approach has become unmanageable and costly, with a variety of technologies providing network connectivity and access control.

Another important thing to note is that many of the services used for securing and providing connectivity for public resources can also be used for private resources. The most obvious here is Magic WAN and Magic Firewall. Customers also use our WAF in front of privately hosted applications that are only accessible through private networks. The idea is that even if access to an application is only from trusted private connections, it is still possible for an attacker to compromise what seems to be a trusted device; therefore, application injection attacks and other vulnerabilities can be exploited by devices with existing trusted network access. This is exactly in line with the idea of a Zero Trust security program. Read more about the approaches to Zero Trust using a SASE platform in our [SASE reference architecture](/reference-architecture/architectures/sase/).

As we describe the following Cloudflare services, you will learn how the Cloudflare network and our methods of connecting it to your own private networks provides greater security, flexibility, and a more centralized control plane for access to private resources. The following diagram illustrates the sort of environment that represents a typical customer's private infrastructure.

![Cloudflare's SASE platform can protect users and devices no matter where in your enterprise network, or not, they reside.](/images/reference-architecture/security/security-ref-arch-18.svg)

Protecting internal resources can be broken down into the following areas.

- Securing connectivity between the user and the application/network.
- Identity systems providing authentication and maintaining user identities and group membership.
- Policies controlling user access to applications/data.
- Data protection controls to identify and protect sensitive and confidential data.
- Protecting users and devices from attacks (malware, phishing, etc.) that originate from access to the Internet.
- Operational visibility to IT and security teams.

#### Securing connectivity to private resources
Many privately hosted applications and networks do not have direct connectivity to the Internet. As mentioned previously, access traditionally has been enabled by one of two methods. One is when users connect physically to the same networks the private resources reside on, i.e. walking into the office and connecting to the office WiFi. The other is creating a virtual private network (VPN) connection over the Internet and "dialing in" to the private company network.

However, the need today is still the same. You have private networks with private applications — and remote users need access. You should regard Cloudflare as your new enterprise network, where all authorized users (employees, contractors, partners) can connect to any private application from anywhere. This means your network topology will feature Cloudflare in the middle, providing connectivity from all networks to each other.

![Cloudflare's SASE platform can also connect a wide variety of networks together into one larger, new corporate network.](/images/reference-architecture/security/security-ref-arch-19.svg)

In the above diagram you can see a variety of private networks and end user devices connected to Cloudflare, which then facilitates the routing and access controls between those networks, and therefore the applications and other resources. This is often regarded as East to West traffic. Because traffic originates from, and is destined for, a privately managed network.

Because all network traffic routes through Cloudflare, security controls are defined and apply to all traffic as it flows between networks. As long as a network, device, or user is connected to Cloudflare, you can identify it and apply policy. It also means things like data protection can be simplified — one single rule can be implemented to detect the transfer of and access to sensitive data and can be applied across the entire network with ease.

Existing private infrastructure can be complex. Cloudflare provides a variety of methods by which businesses can connect their networks and user devices into this new enterprise network. We often call these methods "on-ramps," which describes how traffic for a specific network or device is routed into Cloudflare. The following table outlines these different methods.

| Method      | Description | Common Use |
| ----------- | ----------- | ----------- |
| [Magic WAN](/magic-wan/) | IPsec or GRE tunnel from networking devices to Cloudflare, routing entire network traffic. | Connecting existing network routers to Cloudflare. Allowing all traffic into and out of the network to go through Cloudflare. |
| [Magic WAN Connector](/magic-wan/configuration/connector/) | Appliance-based IPsec or GRE tunnel from networking devices to Cloudflare, routing entire network traffic. | Uses the same technology as Magic WAN; however, instead of using existing networking devices, a dedicated appliance or virtual machine is used — the Magic WAN Connector. |
| [cloudflared](/cloudflare-one/connections/connect-networks/) | Software agent deployed on servers or alongside services like Kubernetes for creating a tunnel for incoming connections to private applications or networks. | IT admins or application owners can easily install this tunnel software to expose their application to the Cloudflare network. |
| [WARP Connector](/cloudflare-one/connections/connect-networks/private-net/warp-connector/) | Software agent deployed on servers for creating a tunnel for incoming and outgoing connections to private applications or networks. | Similar to cloudflared, but supports East to West traffic and is often used in place of Magic WAN when there is no ability to create an IPsec tunnel from existing devices. |
| [WARP Desktop Agent](/cloudflare-one/connections/connect-devices/warp/) | Software agent deployed on user devices, creating a tunnel for traffic to and from private applications and networks. | Connecting end user devices like phones and laptops to be part of the Cloudflare network. |
| [Cloudflare Network Interconnect](https://www.cloudflare.com/network-services/products/network-interconnect/) | Direct connection between your physical networks and Cloudflare. | When your applications live in the same data centers we operate in, we can connect those networks directly to Cloudflare. |

For more details on how these methods work, please refer to our [SASE reference architecture](/reference-architecture/architectures/sase/).

#### User connectivity
All the above methods are for connecting networks and applications to Cloudflare, and some users will be on devices connected directly to those networks. They might be in the corporate headquarters or working from a branch or retail location. However, many users are working from home, sitting in a coffee shop, or working on a plane. Cloudflare provides the following methods for connecting users to Cloudflare. This is the same concept of installing a VPN client on a user device, with the difference that the connection is made to our global network and not to your own VPN applicances.

##### Device agent
For the best user experience and the greatest degree of access control, we recommend deploying our [device agent](/cloudflare-one/connections/connect-devices/warp/) to devices. Supported on Windows, macOS, Linux, iOS, and Android, the agent performs two main roles. First, it routes all traffic from the device to Cloudflare, allowing for access to all your existing connected private networks and applications. Second, the agent provides device posture information such as operating system version, encrypted storage status, and other details. This information is then associated with the authenticated user and can be used as part of access control policy. The agent can be installed manually, but most enterprises deploy it using their device management (MDM) software.

##### Browser proxy
There may be instances where you cannot install software on end user devices. In those instances, Cloudflare provides a proxy endpoint where browsers can be configured to on-ramp their traffic to Cloudflare. This is either done manually by the end user, or by using [automated browser configuration](/cloudflare-one/connections/connect-devices/agentless/pac-files) files.

##### Isolated browser
In some situations, you have no ability to modify the end device in any way. In those instances we provide the ability for a user to access a browser that runs directly on our edge network. This [browser isolation service](/cloudflare-one/policies/browser-isolation/) requires users to point their browser at a Cloudflare URL, which in turn runs a headless, secure browser on one of our edge servers. Secure vectors are then used over HTTPS and WebRTC connections. For more information, refer to [this architecture](/reference-architecture/diagrams/sase/sase-clientless-access-private-dns/).

#### Integrating identity systems
Users cannot just sign up and access your private resources; their identity and associated credentials are typically created and managed in an enterprise identity provider (IdP). Cloudflare integrates with both [enterprise and consumer-based identity services](/cloudflare-one/identity/), as well as providing a simple one-time password (OTP) via email service for when you have a need to authenticate a user with only an email address.

Cloudflare supports integrations with multiple identity providers, including of the same type. So if you manage an Okta instance for your employees, but may have acquired another company with its own Okta instance, both can be integrated with Cloudflare. Cloudflare then acts as a proxy for the SSO process. Applications are configured using SAML and OIDC to use Cloudflare for authentication and then Cloudflare in turn redirects users through the authentication flow of an integrated IdP. Group information can also be synchronized via SCIM into Cloudflare to be used in access control policies.

![Many different IdP's can be integrated, from Google, Microsoft and Github as well as any SAML or OAuth system.](/images/reference-architecture/security/security-ref-arch-20.svg)

This centralization of identity into a common access control layer allows you to build clearly defined and easily managed policies that can be applied across the entire network. If you then decide to migrate from one IdP to another vendor, you only need to change one identity integration with Cloudflare, and all your downstream applications and existing policies will continue to work.

#### Access control
The focus on this document is about security, and now that applications, devices, identities, and networks are all connected, every request to and from any resource on the network, and also to the Internet, is now subject to Cloudflare's access control and firewall services. There are two services that apply policy-based controls to traffic.

- **Zero Trust Network Access**: Our [Access](/cloudflare-one/policies/access/) product manages access to specific networks or applications that are deemed private. It enforces authentication either for users via an existing identity provider, or for other applications via service tokens or mTLS.
- **Secure Web Gateway**: Our [Gateway](/cloudflare-one/policies/gateway/) product is used to analyze traffic and apply policies, no matter the destination. It is most commonly used to allow, block, or isolate traffic that is destined for the Internet. This can be used to apply access controls to SaaS applications, but any traffic flowing through Cloudflare can be inspected and acted upon by Gateway. Therefore it can also be used to add additional access controls to non-Internet, private tunneled applications.

![Cloudflare's ZTNA and SWG services can be combined to secure both private and Internet access.](/images/reference-architecture/security/security-ref-arch-21.svg)

Both of these technologies can be combined to ensure appropriate access to private applications. For users with our [device agent](/cloudflare-one/connections/connect-devices/warp/) installed, the policies can also include device-level requirements. When combined with identity data, policies such as the following can be written to control access to, for example, an internal database administration tool.

- User must have authenticated via the company IdP, and used MFA as part of the authentication
- User must be in the "Database Administrators" group in the IdP
- User device must have a Crowdstrike risk score above 70
- User device must be on the very latest release of the operating system

It is possible to define access groups of users that can be applied across multiple policies. This allows IT and security administrators to create a single definition of what a secure administrator looks like, which is then reusable across many policies.

![Policies can easily be written which define tight access groups to private resources.](/images/reference-architecture/security/security-ref-arch-22.svg)

#### Protecting data
All traffic is flowing through Cloudflare, so therefore all data is flowing through Cloudflare. This allows you to apply data controls on that traffic. Typically, employees are allowed access to sensitive applications and data only on managed devices where the device agent installs Cloudflare certificates that allow Cloudflare to terminate SSL connections on our network. This in turn allows for inspection of the contents of HTTPS web traffic and policy can be written to manage and secure that data.

Cloudflare has a [data loss prevention](/cloudflare-one/policies/data-loss-prevention/) (DLP) service that defines profiles that can be used to identify sensitive data. These profiles are then used in Gateway policies to match specific traffic and either allow, block, or isolate it.

The same DLP profiles can also be used in our Cloud Access Security Broker (CASB) service, where Cloudflare is integrated via APIs to SaaS applications. We then scan the storage and configuration of those applications looking for misconfiguration or sensitive data that's publicly exposed.

#### Securing Internet access
A lot of this section has focused on protecting access to private networks and applications, but a business must also protect their employees and their devices. Our [secure web gateway](/cloudflare-one/policies/gateway/) (SWG) service sits between users connected to Cloudflare and any resource they are attempting to access, both public and private. Policies can be written to prevent employees from accessing high-risk websites or known sites that distribute malware. Policies can also be written to mitigate phishing attacks by blocking access to domains and websites known to be part of phishing campaigns. Protecting users and their devices from Internet threats also reduces associated risks of those same users and devices accessing private resources.

Another critical private resource to secure is email. This is often one of the most private of all resources, as it contains confidential communications across your entire organization. It's also a common attack surface, mostly by way of phishing attacks. [Cloud Email Security](https://www.cloudflare.com/zero-trust/products/email-security/) (CES) examines all emails in your employee's inboxes and detects spoofed, malicious, or suspicious emails and can be configured to act accordingly. CES can be integrated by changing your domain MX records and redirecting all email via Cloudflare. Another option, for Microsoft and Google, is to integrate via API and inspect email already in a user’s inbox. For suspicious emails, links in the email are rewritten to leverage Cloudflare's [browser isolation service](/cloudflare-one/policies/browser-isolation/) so that when a user heads to that website, their local machine is protected against any malicious code that might be running in the browser.

![Cloud email security filters unwanted email traffic from your users inboxes.](/images/reference-architecture/security/security-ref-arch-23.svg)

### Observability
No matter if your resources are private or public, visibility into what's going on is critical. The Cloudflare administrative dashboard has a wide range of built-in dashboards and reports to get a quick overview. Notifications can also be configured to inform admins, either via email or services such as PagerDuty, of important events.

All Cloudflare services provide detailed logs into activity. These logs can also be exported into other security monitoring or SIEM tools via our log shipping integrations. There are built-in integrations for common services such as AWS, Datadog, Splunk, New Relic, and Sumo Logic. But we also support generic distribution of logs into Azure and Google storage as well as Amazon S3 and S3-compatible services.

In summary, the following diagram details how Cloudflare's SASE services can connect and secure access to your private resources. For a more in-depth review, please read our [SASE reference architecture](/reference-architecture/architectures/sase/).

![Cloud email security filters unwanted email traffic from your users inboxes.](/images/reference-architecture/security/security-ref-arch-24.svg)

## Developer platform

Many of Cloudflare's security services are built on a highly optimized serverless compute platform based on [V8 Isolates](https://blog.cloudflare.com/cloud-computing-without-containers) which powers our developer platform. Like all our services, serverless compute workloads run on all servers in our  global network. While our security services offer a wide range of features, customers always want the ultimate flexibility of writing their own custom solution. Customers therefore can use Cloudflare Workers and its accompanying services (R2, D1, KV, Queues) to interact with network traffic as it flows to and from their resources, as well as implementing complex security logic.

The following use cases show how our customers’ security teams have used our [developer platform](https://workers.cloudflare.com/):

- In our ZTNA service, Cloudflare Access, when a request is made to access a private resource, that request can include a call to a Cloudflare Worker, passing in everything known about the user. Custom business logic can then be implemented to determine access. For example:
    - Only allow access during employee working hours. Check via API calls to employee systems.
    - Allow access only if an incident has been declared in PagerDuty.
- Implement honeypots for bots: Because Workers can be attached to routes of any Cloudflare-protected resource, you can examine the bot score of a request and then redirect or modify the request if you suspect it's not legitimate traffic. For example, execute the request but modify the response to redact information or change values to protect data.
- Write complex web application firewall (WAF) type rules: As described above, our WAF is very powerful for protecting your public-facing applications. But with Workers, you can write incredibly complex rules based on information provided in the [IncomingRequestCfProperties](/workers/runtime-apis/request/#incomingrequestcfproperties), which expose metadata for every request. These properties contain extensive information and can be expressed as code for effective rule implementation.
- Enhance traffic with extra security information: Your downstream application may have other security products in front of it, or maybe provides other security if certain HTTP headers exist. Using Workers, you can enhance any requests to the application and add in headers to help the downstream application implement greater security controls.
- Write your own authentication service: Some customers have extreme requirements, and the power of Workers allows you, as we have with our own product suite, to write entire authentication stacks. One such customer [did just this](https://www.cloudflare.com/case-studies/epam/). While this isn't common, it's an example of the flexibility of using Cloudflare. You can mix complex code that you write with our own products to fine-tune exactly the right security outcome.

Using Workers for implementing some of your security controls has the following advantages:

- **Advanced logic and testability**: Enables the implementation of highly sophisticated logic that's easily testable through unit tests.
- **Accessibility to developers**: Security features are accessible to a broader audience due to native support in languages like JavaScript, TypeScript, Rust, and Python, catering to developers' familiarity.
- **Granularity and flexibility**: Offers unparalleled granularity, with support for regex, JSON parsing, and easy access to request/response headers and bodies enriched by Cloudflare. Policies can be designed based on any feature of the request/response.
- **Response modification**: While traditional security stacks often focus solely on requests, Workers empowers effortless modification of responses. For instance, verbose error messages can be obscured to enhance security.
- **Implement DevSecOps lifecycles**: Workers makes it very easy to adhere to DevSecOps best practices like version control, code audits, automated tests, gradual roll-outs, and rollback capabilities.

However, you should also consider the following:

- **Cost**: By adding Workers into the request process, you will incur extra costs. However, this might be acceptable for the scenarios where the significant security outcome is highly beneficial.
- **Latency**: While minimal, there will always be some impact on traffic latency because you are running your own logic on every request.
- **Requires developer skill set**: This is a bit obvious, but worth mentioning. Using Workers requires a development team to create, test, and maintain whatever code is implemented.

You can review some examples of how our Workers platform can be used for [security](/workers/examples/?tags=Security) or [authentication](/workers/examples/?tags=Authentication) use cases.

## Summary

You should now have a good understanding of the massive scale of the Cloudflare network, how it's secured and operated, and the broad range of services available to you for protecting your business assets. We have built the future of networking and security, and we invite you to consider using our services to better secure your business.

In summary, the benefits of using Cloudflare for your business’s security are:

- Protect all your business assets, public or private.
- Leverage a comprehensive range of security services on a single platform.
- Rely on a massively scaled network with high performance and reliability.
- Implement security controls once, in a single dashboard, and impact traffic from anywhere.
- Empower DevSecOps teams with full API and Terraform support.

We have a very simple [self-service signup](https://dash.cloudflare.com/sign-up), where many of our services can be evaluated for free. If you wish to work with our expert team to evaluate Cloudflare, please [reach out](https://www.cloudflare.com/plans/enterprise/contact/).
