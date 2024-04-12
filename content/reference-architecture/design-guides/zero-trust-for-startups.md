---
title: "Building Zero Trust Architecture into your Startup"
pcx_content_type: design-guide
weight:
meta:
  title: "zero trust architecture for startups"
---

# Building Zero Trust Architecture into your startup

## Introduction

Most of Cloudflare’s documentation (and, generally, the documentation of most vendors in the space) is written with the assumption that adopting zero trust products will require shifting away from something. For scenarios in which nothing is built, or there is no tool that fulfills the goals that your team is trying to accomplish, this can sometimes be confusing and alienating. New startups are especially under served; as you focus all your energy on getting your business off the ground, it can be time consuming or confusing to read documentation that is targeted toward enterprises undergoing network transformation.

This guide details how to use Cloudflare to build the foundations of a Zero Trust architecture early in the establishment of your security, networking, and development operations practices, which can lead to a sustainable, scalable business built on Zero Trust security principles.

The common principles for building a "business" have fundamentally changed. Twenty years ago, this may have looked like getting office space (or a garage), buying hardware infrastructure and servers, and buying user machines on which to begin building. As building continued, you would create your walled garden with hardware-stacked firewalls and security appliances to protect the things that are built primarily in one place. There’s lots of good written content on the evolution of networking and security practices, so we won’t belabor the point. The important detail is to recognize how the new model matters for your startup as you build.

Chances are good that most of your infrastructure will exist in a public cloud provider. Most of your code will probably be pushed and reviewed via common repository management tools, most of your developers will write code on MacOS or Linux machines, and your developers will probably rely heavily on a form of containerization for local development. Zero Trust security principles are just as relevant here - albeit much easier to achieve - as when your business has multiple complex functions and departments, and your assets and the proliferation of your data have significantly expanded.

Using Cloudflare Zero Trust is a simple and sometimes free way for startups to develop a comprehensive Zero Trust strategy that will grow and mature seamlessly and organically with your business.

### Who is this document for and what will you learn?

Cloudflare has lots of [existing content](/cloudflare-one/) related to the migration to and implementation of our Zero Trust product set. This document speaks directly to technical founders and founding engineers of young startup organizations who are looking to develop the framework for a modern corporate network with modern security control from their first line of code.

In this document, we’ll explore:

1. Getting started with practical Zero Trust remote access capabilities
2. Sources of truth for identity and device posture and how to use them
3. Network building, both traditional and mesh
4. Building Zero Trust into internal tooling
5. Threats on the Internet
6. TLS decryption and its relevance for your goals
7. Zero Trust for your SaaS tools
8. Navigating contractor and customer access
9. Building with Infrastructure as Code

A few things explicitly not covered in this document:

* Introduction to basic Zero Trust terminology and concepts
* Recommendations for or against specific third-party vendor usage. While other vendors are mentioned in this document, it’s purely illustrative and should not be taken as a formal recommendation from Cloudflare.
* Detail on why you should explore adopting a Zero Trust security methodology; we have lots of good resources detailing that in the links below
* Microsegmentation and autonomous Zero Trust concepts; these may be covered in future updates
* Passwordless authentication; this is a cool and emerging space, and we’ll provide some recommendations here in the future

## Getting Started - Foundational Decisions

### Asset Inventory

Before thinking about your remote access or security goals, it’s important to take stock of your current assets. What already exists and is in need of a sustainable model for security? If you have begun building infrastructure in a public cloud provider, how many distinct VPCs have you already established and how do they communicate with each other? More importantly, how and why do your users access those environments? Is it all through the console and browser-based management and terminal tools? Have you set up public IP access for some services over HTTPS or SSH? Are there resources that may accept ingress from the Internet that are intended to be entirely private? Have you established a modern or traditional VPN to allow remote access to the environment, and if so, how is it gated?

If you don’t know what you need to protect, it’ll be difficult to protect it, no matter how many security tools you have. Build a map of your private infrastructure (both physical and virtual) that contains company data. For many startups, this may just be a single cloud provider. Note all the resources in that environment that are accessed, either by human users, other infrastructure, or public or private APIs. Document the purpose of each service that is regularly accessed by human users; is this an internal web-based tool built to monitor your build pipeline? Is it a self-hosted analytics tool like Grafana, or a supporting metrics server like Prometheus? How are users reaching that service - via a public IP, a private IP, or a local path? Are users able to reach the service from other cloud environments or VPCs? If so, how are they connected? Once you’ve developed a comprehensive list, congratulations - you now have the asset inventory for your development of a Zero Trust architecture.

Next, consider stack-ranking these services by risk level in the event of a breach, to later determine the specificity of your security policy. For example, your internal tool to alert on build status may be a level 3, but your production database for customer information would be a level 1. A level 3 application may be able to be accessed by a user on their own device, assuming they can meet your identity control requirements, but a level 1 application may require access from a corporate device and the use of a specific kind of multi-factor authentication.

(Pro tip: if you’ve already grown to the point that asset inventory is very difficult or incredibly time-consuming for your business, you can use tools like our [Private Network Discovery](/cloudflare-one/insights/analytics/access/#private-network-origins) capability to build a sense of what your users access in your network space.)

### Common Goals and Outcomes

Many startups that use Cloudflare are encouraged to adopt a Zero Trust security posture by external sources like investors, partners, other vendors, risk analysts, or compliance officers. When that becomes the driving force behind an evaluation, it can be difficult to extract what kind of explicit goals your business will achieve by adopting a new framework for security posture and remote access.

Some common goals we hear from customers:

1. Make our internal tooling easy to access securely for our users
2. Build security into our development pipeline
3. Adopt increased security without sacrificing user and work experience
4. Define and execute a bring-your-own-device (BYOD) strategy
5. Simplify management of my networks and application access
6. Protect data in my SaaS applications and in my corporate network
7. Ensure auditability for “a quick view of what’s happening, who’s doing it, and if it’s okay”
8. Demonstrate security best practices to our end-customers

It’s also possible that your goals may be simpler or more tactical than this, like adopt a modern remote access tool,  securely connect internal networks, or only allow corporate devices to connect to my Gitlab Enterprise tenant. These are all perfectly valid; the most important element in goal setting will be to establish what you need now and balance it against what you may need or expect to need in the near or mid-term future. If you expect to grow significantly, sign customers with demanding security reviews, or apply for a new compliance certification, it’ll be important to start with a Zero Trust vendor that can layer on additional security tooling and capabilities without exponentially increasing complexity or cost.

Goal setting is also an important exercise for prioritization. If you know that your primary goal is to identify and put identity-aware security in front of all internal services, but that in the next six months you intend to restrict BYOD usage to level 3 applications, one goal will need to strategically support the execution of the second. Understanding the stack-rank of priorities over the next few months (knowing things change quickly in your startup!) can save you the time spent in re-architecture discussions or unraveling technical or commercial decisions with vendors that fit your needs in the short term, but not the mid-term.

### Identity

Identity is at the core of every Zero Trust strategy. Ultimately most customer goals revolve around using a central source of identity to interrogate, validate, and log all actions taken by a user involving their corporate resources, spanning both "owned" (hosted, private network) applications and SaaS applications. Identity can then be used to layer additional security controls through a directory or SSO provider, like multi-factor authentication, or phishing-resistant authentication.

One of the most important things you can do early in the security strategy development for your business is to coach your users to become accustomed to required multi-factor authentication. Phishing-resistant MFA options like physical keys, local authenticators, and biometric authentication have been credited by Cloudflare as a major factor in [stopping the attempted breach](https://blog.cloudflare.com/2022-07-sms-phishing-attacks) that affected Twilio and other SaaS companies in 2022.

In the context of getting started with Zero Trust, the type of identity provider that you decide to use (the most common being Google Workspace and Azure Active Directory - now called Microsoft Entra Identity) is less important than your implementation strategy. As long as you have a directory that is secure, allows for phishing-resistant authentication methods, and designated as your source of truth, you have the necessary components to integrate with a Zero Trust vendor like Cloudflare to deliver continuous interrogation of that identity-as-security posture for all your corporate tools.

Many directory services also provide Single Sign-On (SSO) solutions for integrating directly with SaaS applications. While this is a simple and logical choice, many enterprise applications make SSO integration a challenge, and onboarding a critical mass of SaaS applications to any one directory service can become material cost that drives vendor lock-in. As your organization continues to grow, your identity strategy will inevitably change and mature, and it’s important to maintain flexibility to address unexpected challenges, like some of the vendor breaches that we saw in 2023.

Along with the challenges related to flexibility, many extant SSO providers have yet to fully integrate device posture concepts into their source of truth model. Some vendors like Okta offer machine certification as part of an authentication event, but it’s limited to Okta’s FastPass product and doesn’t include signals from other sources or vendors to better determine what constitutes a corporate device.

**Where does Cloudflare fit in?**
Later in this document, we’ll describe using Cloudflare Zero Trust to protect your internal applications and how to use Cloudflare as your SSO in front of your SaaS applications to deliver a simple, unified security posture everywhere. Cloudflare matters in this case because once you’ve determined a source of truth for your identity provider, you need tooling to perform continuous authentication against your user population. This tooling is difficult to build and maintain, and a number of well-known technology companies have retired their internally built Zero Trust proxy in favor of Cloudflare in the past year alone, citing management complexity and inability to add new security functionality as the primary drivers.

Cloudflare can simplify your architecture by becoming the singular enforcement point for your identity against your private applications, your networks, your developer services, and your SaaS applications. Cloudflare, in turn, is one of the only vendors to provide Zero Trust authentication concepts as a web proxy (layer 7 services), as a VPN replacement (layer 3/4 services), and as a Secure Web Gateway.

### Device Posture

As your business grows and you have to begin to operationalize the distribution of endpoints to your user population, device posture is a key component of a strong Zero Trust strategy. Once you’ve validated your user’s identity posture, there is further opportunity to de-risk your applications or sensitive data from the potential of a breach. Even if your user is valid and has an active identity session, their device could theoretically be infected and could benefit from (or hijack) their valid identity session.

Companies use device posture as a methodology to prove that a connection is coming from a verified endpoint. Let’s quickly look at the theory behind device posture before listing some common strategies and approaches to getting started. Say you have sensitive data somewhere in AWS. It’s critical to the operation of your business. Your sensitive data is (rightly) protected behind your identity source of truth authentication, so when it’s accessed, you feel confident that it’s being accessed exclusively by users with the proper identity posture. Your users are all remote and connect to AWS from Macbooks that you mailed to them pre-configured with your Endpoint Detection software of choice. Users on their Macbooks, configured with enterprise Endpoint Detection and Response (EDR) software, have a lower risk of potential breach than the user’s personal laptop. But how do you prove that your users with valid identity posture only access your sensitive data from the devices with a lower risk of breach?

As your security organization grows and you begin to implement Data Loss Prevention strategies and tools, this becomes doubly important. If your users can theoretically access sensitive data without applying a burden of proof to the device used for access, users may be able to (intentionally or inadvertently) circumvent your security tooling and create the risk of exfiltration, or at a minimum, blind spots for your visibility and auditability.

Common device posture strategies usually rely on a combination of an endpoint management tool (like JAMF, InTune, etc.), a corporate certificate, and security tooling like Endpoint Detection software that might sit on the device. Some of this tooling can fingerprint your devices in a way that can be externally validated where supported. In order to achieve Zero Trust access controls with device posture validation, an endpoint agent from the Zero Trust vendor typically needs to be deployed on the devices; it’s then used to ‘independently’ verify a claim from a third party vendor before applying that device state to be used in a policy. It’s important to evaluate an ability for vendors to poll for state relatively frequently to adhere to the Zero Trust policy philosophy for “continuous evaluation” of state.

**Where does Cloudflare fit in?**
As you begin to use third-party vendors for Zero Trust security outcomes, those vendors need to ingest first-party signals to help you make the best security decisions. In this case, Cloudflare becomes your point of policy enforcement for device posture in addition to identity posture. The Cloudflare agent sitting on your devices will evaluate your uniquely determined device ownership or health metrics, and can use them in conjunction with policies about user identity to ensure access to sensitive resources both has proper identity verification and is coming from a compliant device with the acceptable level of security control.

## Network building, both traditional and mesh

In the ‘old world’ model (read: castle and moat security architecture), your infrastructure would probably be homogenous and protected by a firewall. Users not in the office (or other locations, vendors, etc) would terminate VPN connections on that firewall or another available headend with a public IP address in order to access network resources and form Wide Area Networking concepts. Because most infrastructure now lives in the cloud, and most startups begin remote-first, almost none of the traditional networking concepts will be explicitly relevant as you design the initial phases of your ‘corporate network’.

As you begin establishing patterns in the infrastructure that you build, it’s likely that you’ll collate around a single, primary cloud provider. The main concepts relevant for this document will focus on users ingressing into your network to access internal resources and services, and the way that your internal services communicate with the Internet broadly. Management of cloud infrastructure permissions and policies, as well as recognition of the ways in which your internal services can communicate with one another is equally relevant to a comprehensive Zero Trust strategy, but will be discussed in depth in future updates to this document.

In this more traditional networking model, your infrastructure will probably exist in one or multiple VPCs, which may or not be connected by cloud provider transit gateways, and the addressing of your services will probably be managed by your cloud provider. It’s likely that you will designate internal DNS from a cloud provider like AWS’ Route53 DNS. Most businesses still rely on internal DNS to some extent, no matter how cloud native they may be. There may always be a reason to maintain some concept of a privately networked space, as long as you maintain your own infrastructure. It’s possible that all users won’t have a need to understand or navigate using your internal DNS infrastructure, but technical users and services likely will.

### Connecting users to networks

This will probably be one of the most common Zero Trust ‘use cases’ for a majority of startups. *How can I get my user access to my internal network or application without managing VPN hardware or exposing my business to risk?* As you navigate the best way to connect your users to your private networks and services while adhering to Zero Trust principles, there are a few things to consider.

1. Limiting exposure. Zero Trust philosophy encourages limiting the amount of ways in which your networks or services can be accessed. Having public IP addresses or ingress paths into your network can introduce unwanted risk. This is a departure from traditional network architecture, and is typically accomplished by using outbound-only proxies that connect to Zero Trust vendors to only proxy authenticated traffic into your network, and not require any public IP access of any kind.
2. Limiting lateral movement. One of the best ways to reduce the blast radius of a potential breach - and a core tenet of Zero Trust architecture - is to practice least privilege access for all resources. The most analogous concept as it relates to Zero Trust frameworks is that of ‘microtunnels’ - a recommended approach in which each application or service that needs to be accessed receives its own distinct ‘route’ - building a practice in which only explicit services and users have access to specific resources will position future security orgs very favorably.

Defining a clear strategy for infrastructure creation and management - along with a predictable internal IP and DNS record structure - will be invaluable for accessing and protecting your assets as your organization continues to grow. A little later in the document, we’ll expand on creating infrastructure using automated workflows in a way that can instantly integrate with your chosen Zero Trust security provider. It will be significantly easier to layer security policies over your access control models if you have a continued, clear sense of what infrastructure exists and how it is addressed currently.

**Where does Cloudflare fit in?**
Cloudflare Zero Trust can make private networking concepts extensible to your end users with a combination of endpoint software and cloud networking connectors. In this case, you can use Cloudflare as an ‘overlay’ network to extend secure access to your internal network for end-users without exposing public IPs, allowing ingress from your cloud environments, or introducing any sort of additional risk that usually comes with remote access. A small piece of software can sit in your network and provide both ‘network’ tunnels (to provide users with administrative access to services on your internal network, replacing traditional exposed bastion concepts), and ‘application’ tunnels, which will serve as micro-tunnels which will only allow an authenticated user to explicitly reach the singular service defined in the tunnel.

This makes it significantly easier to manage user access to multiple, distinct private networking environments without forcing the user to change their profile, switch settings, or constantly disconnect or reconnect from one or multiple clients. It also gives you the capability to easily expose a single private application or service to specific audiences while adhering to Zero Trust practical principles.

### Connecting networks to networks
For most startups, worrying about networking is not at the top of their burn-down lists. Typically, businesses follow the path of least resistance, which typically involves simply-networked VPCs in AWS or GCP, and maybe a few external connections to physical locations. But if it hasn’t already, as your business grows your network will add complexity, and it will happen very quickly.

Some common extensions to the simplified corporate network include customer networks (more on those later), partners, multi-cloud additions, acquisitions, disaster-recovery planning, and more! And those are just the big ones… in a more likely sense, as your security organization matures, there will be more and more reasons to spread infrastructure across multiple VPCs even within the same cloud environment, and as security groups for those become increasingly complex, you will find that you are managing multiple internal networks with distinct policies and sometimes distinct operations.

As these network extensions become more relevant for your business, it’s worthwhile to review which connectivity options make the most sense, and how you can build a functionally complex network that still makes security paramount to its operations.

### Traditional Connectivity

When businesses only had physical connectivity requirements, like branch offices or supplemental data centers, the framework was much more simple. You’d use either edge devices like routers or firewalls to terminate physical connectivity, or a dedicated head-end device to build VPN (“virtual”) network connectivity between the sites. This would mean that you’d be providing a new route to a new network or subnet for all the machines on your initial site; basically connecting two ‘networks’ together.

Typically, the end-goal of bridging multiple sites (in addition to creating WAN connectivity) is management simplicity; having a unified network means simpler paths to solutions for supporting network functions like edge routing, gateways, and addressing via DCHP. However, this can also result in overly-broad policy management, and it can be difficult to manage the security implications of increasingly growing networks with increasingly complex edge-cases and unique scenarios.

For modern startup businesses, the problems won’t be as exactly as described, but the proliferation of complexity will still eventually become relevant. The best way to navigate this is to *plan effectively*. If you begin building your corporate network with security and growth frameworks necessary to operate an increasingly complex network, your growing pains as your security and IT organizations grow will be much less pronounced. The traditional methods of network connectivity still have significant value both in physical and in cloud environments, but using them efficiently while maintaining an effective security perimeter can be a challenge.

### Mesh Connectivity

Where traditional networking concepts primarily work with connecting networks to one another, mesh or peer-to-peer networking concepts blend networks with assets or independent endpoints.

[Note: in some analyst circles, this space is beginning to be referred to as ‘Secure Networking’, and while I can appreciate the need for differentiation, Cloudflare believes that there are methods for making both traditional and mesh networking effectively *secure*.]

In a traditional network, you may have a VPN tunnel that creates a site to site connection between the IP spaces of 10.0.0.0/8 and 192.168.0.0/24, giving all devices within either network a gateway to communicate locally with devices on either network. Conversely, in a mesh networking model, you may only want 10.2.3.4 to be able to communicate with the device with IP address 192.168.0.50.

If you only operate with ‘micro-tunnels’ (ex: discrete X can only reach discrete Y), you massively reduce your opportunities for lateral movement; if 10.2.3.4 could reach sensitive data on a different 192.168.0 IP address in the traditional model, they would not be able to attempt to connect in the mesh model. However, your increased security posture comes with a positive correlated growth in increased complexity. Not only do you (usually) need to manage agents on each endpoint relevant in a mesh network, but you then need to be prepared to build and manage discrete policies for each asset and connectivity path.

**Where does Cloudflare fit in?**
If both operating models sound complicated and imperfect, it’s because they both are; Cloudflare believes that a blend of the two is typically the right approach for businesses of all sizes, and if your organization is experimenting with Mesh Connectivity, we can help support discrete connectivity models, while layering in unique identity concepts, and helping to build networking frameworks that will support your needs as a growing startup, while keeping an eye on future growth and requirements, so that you can continue to scale efficiently.

The products that are typically most relevant in design for startups are a combination of our WARP Client and Cloudflare Tunnel via cloudflared and via WARP Connector. This will allow you to manage both remote access and mesh and traditional networking connectivity from a single dashboard with a single point of policy enforcement. This will mean that you can use device posture information, identity information, and client certificates in addition to more common L4 (port, IP, protocol of source and destination) indicators to build robust security policies for both human and autonomous network interaction.

Whether you are trying to provide remote access to your corporate network, extend your corporate network to encompass other cloud environments on on-premise equipment, or continue building out a model for mesh connectivity between critical infrastructure without introducing additional risk or overhead, you can do so with the above tools.

## Building Zero Trust into Internal Tooling

Among almost all the startups (and mature companies) that Cloudflare has worked with, security for internal tooling continues to be a ubiquitous challenge. You may build tools that you need to accomplish tasks specific to your business, or you may choose to self-host or use open source software which can also be consumed as popular SaaS applications for services, monitoring, or other functions. The principles above apply to managing remote access to these resources and deal primarily with authentication; achieving a Zero Trust model in practice would look like ensuring that access to each internal service is controlled by at least a continuous identity authentication proxy, ideally as far away from your infrastructure as possible, with clear auditability and the capability to ‘revoke’ user access on the fly.

However, one of the biggest challenges businesses face as they begin to adopt Zero Trust principles is not authentication, but authorization. Getting the user to the front door of your application in a Zero Trust model is (relatively) easy, but managing their credentials for that application, and ensuring that the two match, while maintaining a positive and non-invasive user experience, can be very difficult. The culmination of our experience with customers looking to solve these problems is relatively simple; in an ideal world, your authentication and your authorization should be handled by the same primary method. This would mean that while deliberating how to secure your internal applications - whether to build OAUTH functions into them directly, or to integrate directly with your primary SSO that you use for your SaaS applications - it’s important to consider how this may conflict or become duplicative with your identity validation methodology for end-user access. There are two primary ways to use these concepts to set yourself up for scalable success with authentication and authorization.

### Consuming Zero Trust vendor tokens

While we’re striving to make this guide relatively vendor agnostic, this concept does not exist for every Zero Trust or SSE vendor. This is due to Cloudflare’s relatively unique approach; because we’re the world’s largest provider for authoritative DNS, we provide authoritative DNS for the ‘external’ path to your internal applications that you have complete control over, and then mint tokens for your user access, based on the information we receive from your identity provider after a successful authentication event that matches your pre-determined policies for that application. Each token gets a unique tag to indicate its relevance to a specific application.

This token contains all of the content that would be signed in a user’s authentication event with your identity provider; their name, username, email, group memberships, and whatever other values are present. You can then use the Cloudflare token, which users will send with their requests to your internal applications, to validate their requests and authorize access to your internal tooling. This takes minimal additional work per-application, and can be built into application creation workflows where you would otherwise need a complete OAUTH integration or SSO integration. Then, your users will have a seamless experience both authenticating through your established Zero Trust proxy, and subsequently be authorized directly into your application with the same information.

[diagram]

### Your Zero Trust Vendor as an SSO

Some Zero Trust vendors provide the capability to operate as an SSO provider, integrating directly with your applications (like open-source or self-hosted solutions) which come with a pre-built SSO connector. In this flow, your SSO controls your authorization to the application, and your Zero Trust vendor calls out to your identity provider to make authentication decisions, without needing to manage multiple primary directories.

For Cloudflare users specifically, this offers a number of advantages in addition to streamlining authentication and authorization. It also reduces your reliance on a specific SSO vendor, and allows you to use multiple simultaneous authentication providers. The biggest benefit here is in the case of adopting or switching your identity provider. Businesses rarely use the same identity provider at 25-50 users that they use at 300-500+, but there is always significant friction in the hard cutover required to move from one SSO integration to another, without considering the time and frustration present in some applications SSO integrations. This can help alleviate that friction while providing streamlined AuthZ/AuthN, and getting additional security controls in front of your self-hosted applications, by aggregating all of your identity, device posture, and risk integrations within a single policy enforcement point.

**Where does Cloudflare fit in?**
This section was admittedly less agnostic than the others, but it’s because this is a place where Cloudflare has diverged from the rest of the market, and we feel confident that our methodology is best-suited to manage internal application authorization.

To make it clearer, we would recommend using our Cloudflare Access product for remote access to your internal services (by way of our Cloudflare Tunnel software in your network), and either [consuming the JWT](/cloudflare-one/identity/authorization-cookie/validating-json/) created by Cloudflare Access, or using [Access for SaaS](/cloudflare-one/applications/configure-apps/saas-apps/) to act as a SAML or OIDC proxy for your private, self-hosted applications which have SSO integrations pre-built. In a lot of cases, you may even use both products for application access. For example, if you’re self-hosting Sentry, and today it’s not available on the public Internet:

1. You’d set up a public hostname with Cloudflare Access which your users would navigate to Sentry on
2. Install a Cloudflare Tunnel with an associated Public Hostname route to point to your local Sentry service
3. Integrate Sentry with Access for SaaS as the SSO provider
4. Users reaching the application from outside your network will already carry the Cloudflare JWT, and will be seamlessly authenticated into your application.

## Remote Access for Contractors, Vendors, and Customers

Established and accepted patterns for corporate-user remote access don’t always extend to heterogenous sets of users, which usually includes contractors, third-party vendors, and even customers. All these user groups can have valid purposes to engage with your private resources. It’s possible you may hire development or maintenance contractors that need access to some parts of your network or application, but providing them complete network access would constitute risk.

It’s possible you may provide hosted or managed services to your customers in such a way that they would deploy within their own networks, and that you may need to connect with those services to appropriately manage them. Or, subsequently, you may host private resources for customers within your own environment and need to give them secure access to only their relevant tenant.

### Establishing Scope
Whenever you determine a need for external user access to your environment, you should first determine three attributes:
1. What they need to access
2. What level of authentication is required for that access
3. How long this access will be relevant

### Web access for third parties
After determining the scope, you should determine the least-privilege access model appropriate for the user group. This may mean integrating with a secondary identity provider (maybe the customer or vendor’s) to use in authentication events, or using a temporary authentication method like One Time PIN to authenticate against just their email address.

Some businesses also add vendors and contractor users to their identity provider to streamline authentication and to control methods like the use of MFA and other factors. At a minimum, it’s recommended to work with a Zero Trust security provider who supports multiple, simultaneous methods for authentication, and can apply them granularly, on specific policies, or targeting specific applications.

This allows you to keep all of your existing methods of secure remote access consistent; your external user cohort will use your same paths into your network, will be subject to all of your security controls, and you’ll have detailed logging and audit trails to dictate exactly what users had access to, how frequently they accessed them, and what kind of actions they took within your network. Assigning least-privilege controls can also easily establish their access model, and ensure that they aren’t able to perform any lateral actions or access unnecessary resources within your network.

### Administrative or network third party access
If this access can’t be established over a web browser, and needs network-level controls, your external users may need to be able to deploy your endpoint agent used for your Zero Trust deployment. This is not unusual, but common considerations will need to be taken to ensure this is a simple, manageable process.

Especially common with contractor groups is the presence of multiple endpoint agents on a single user machine: this can introduce routing complexity, and even conflicts, if some of the relevant private networks that contractor users engage with may overlap across businesses. A couple things to consider as you design this access model:
1. Can your Zero Trust vendor support multiple profiles for endpoint agent deployment? Contractor users should have especially tightly scoped routing controls to ensure limited access to your network and limited risks of conflict with other agents on the device
2. Is third-party access materially different from corporate user access? If not, you can streamline your administrative management activities by building functional identities and integrations for third parties, but new policies may not necessarily need to be created, as long as everything can be audited and differentiated. 

### Access to customer environments, and vice versa
There are sometimes cases in which corporate users need secure (persistent or ephemeral) access to customer environments, or customers may need similar secure access to unique, hosted environments within your network. These may include hosting software tenants for customers, maintenance for customer-hosted software, or requisite connectors for product functionality that tie into customer internal networks.

In cases where that is relevant, the traditional recommended model has been networking configuration like site-to-site VPNs and similar options. These can be scoped appropriately, but often result in overly broad connectivity between your corporate network and your customer network, and can introduce risk or overly-broad access capability.

In a Zero Trust security framework, this kind of access should be explicitly scoped in a least-privilege model. This can be accomplished by identity-aware or service-aware site-to-site connectivity, or by using unidirectional connector models to provide secure access in either direction, scoped to specific actions.

**Where does Cloudflare fit in?**
Cloudflare can help provide scoped secure access for both web and network connectivity to your third-party users in a Zero Trust framework.
- Cloudflare Access can integrate and use [multiple Identity Providers simultaneously](/cloudflare-one/identity/idp-integration/). This can be scoped to a single application, a singular policy, and can have granular capabilities to ‘force’ some user access to authenticate in specific ways. There are also many third-party specific workflows like [purpose justification](/cloudflare-one/policies/access/require-purpose-justification/), which can ensure that user access is both exceptionally easy for third parties, and exceptionally documented and controllable for administrators.
- Cloudflare Zero Trust can be deployed with flexible endpoint agent parameters and [logical groupings](/cloudflare-one/connections/connect-devices/warp/configure-warp/device-profiles/) for contractor and third-party users, so that you can ensure that if you have external users with internal access needs, they can be both tightly scoped and limit potential conflict with other external systems.
- [Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/) is lightweight, easy to deploy, and can act as a uni-directional access model to provide corporate users access to scoped customer resources. It can even be built into your deployment packages and deployed alongside services you manage in customer environments.
- When bidirectional (site-to-site) style traffic flows are a necessity for the way that you engage with your customers, their applications, or other management concerns, you can use the Cloudflare [WARP Connector](/cloudflare-one/connections/connect-networks/private-net/warp-connector/) to build secure, extensible networks relevant for each of your client controls. These have all the same inline security policy application and auditability controls as the rest of your deployment, so you can maintain a Zero Trust security posture while achieving customer connectivity.

## Protecting Against Internet Threats (or, is Secure Web Gateway a part of Zero Trust?)

Traditionally, the concept of Zero Trust access methodology has been explicitly relegated to user or machine access to internal or privileged resources. Functionally, replacing network extension and reducing over-permissioning and lateral movement threat vectors typically delivered from VPN remote access connectivity. But for many businesses, their VPN didn’t only proxy their private network traffic. It also managed their Internet traffic; typically either through a module to send DNS queries to a cloud provider, or by simply backhauling all user traffic to the corporate network to be sent through the corporate firewalls, as an extension of the castle and moat security model, to maintain a unified view of threats.

This reality has forced the vendors in the market to converge on addressing both functions that a VPN serves at the same time; it’s now common to hear Secure Web Gateway and Zero Trust Access discussed in the same sentence or same product. Although this was a vendor and analyst-derived shift rather than a security research-led one, it has seemed to improve security manageability for customers, and simplifies the buying and deployment process for startups. Namely, a single agent being deployed on your device to handle both your corporate and Internet traffic is an improvement over the proliferation of device agents required for all sorts of security tooling.

This document was meant to focus primarily on traditional Zero Trust concepts, and we didn’t plan to spend a lot of time talking about SWG adoption, TLS interception, and data protection, but a few concepts converge in such a way that it’s worthwhile for a short discussion.

### Long Live The New Perimeter

It’s likely that your business has no central ‘perimeter’ at all. You were probably born in the cloud, ship out user endpoints either raw or with some pre-configured security control, but everything is capable of happening remotely and asynchronously. It’s highly impactful for your productivity and ability to scale. However, as your security organization grows and matures, there will be an inherent benefit to setting a baseline security ‘posture’ that will denote the New Perimeter.

In the old world, your perimeter was denoted by your egress IP address (usually the public IP of your corporate network), and indicated that you were subject to a series of security controls before your traffic went out to the Internet. Maybe it was a firewall, IPS, IDS, or something else. For that reason, businesses began building the requirement of a specific source IP being attached to traffic before it could be ‘trusted’; this was used with vendors, third parties, and SaaS applications. Traffic originating from the corporate network (with your corporate source IPs) was one of the biggest indicators of ‘trust’. It’s no longer that simple.

In a world in which your Zero Trust provider and your SSO should ostensibly be able to protect most of your private applications, networks, services, and SaaS applications, users should be more empowered than ever to work from anywhere, and your asynchronous, highly effective style of work shouldn’t need to be interrupted if you follow best practices. **Your definition of a ‘secure’ endpoint becomes your new corporate perimeter.**

This measure is significantly better for security posture because, unlike a source IP address, it’s both highly targeted and continually validated. In the old world, this would mean egressing through a firewall and being subject to security controls; in the new world, this typically means verifying encryption, interrogating posture on the device, and determining whether or not the traffic coming from the machine was inspected by a Secure Web Gateway. It could even still include source IP address as a method of validation, but never as the primary control.

This offers you increased measures of security confidence. As you think about how you want to manage the usage of BYOD, and how you want to ensure your corporate data is being accessed securely, you just have to make a determination about what constitutes your secure endpoint strategy, and how you should interrogate requests to sensitive resources to ensure that they are compliant. For instance, if you only want users to be able to access Workday or another PII-heavy system if they are sending their traffic through your Secure Web Gateway and data loss prevention policies are enabled, what steps do you need to take in order for that to be possible?

So, the primary way that Internet Security (I.e. Secure Web Gateway, DNS filtering, traffic proxy, etc.) is relevant in this discussion: as an advanced security signal from which you can apply more accurate, more granular Zero Trust policies for your sensitive resources. It’s also good practice to get started with at least DNS filtering as soon as possible; developing the capability to deploy software and proxy traffic from your endpoints while you grow will become invaluable as the demands for your security organization continue to increase. As you start to think about other advanced security controls, like HTTP filtering and Data Loss Prevention, we recommend first reading Getting Started with TLS Decryption to get a sense of the decisions to be made before decrypting traffic, which is usually a topic of consternation within startups.

**Where does Cloudflare fit in?**
In addition to providing Zero Trust security capabilities for internal applications, network remote access, and SaaS applications, Cloudflare also provides DNS filtering, a L4 firewall, and Secure Web Gateway functionality, complete with application-awareness, TLS decryption, data loss prevention, CASB functionality, Browser Isolation, and the ability to adopt a dedicated egress IP structure directly from the Cloudflare network. All of this is controlled via policy that factors in user identity, device posture, and user risk. All of this is delivered from the same endpoint agent as your Zero Trust controls, and all uses the same policy engines and policy enforcement opportunities.

This allows you to functionally build a *new perimeter* by identifying, applying policy to, and securing the outbound traffic on your managed endpoint devices. You can achieve the same unified security control as the old *castle-and-moat perimeter*, while applying independent, granular security evaluation without backhauling any user traffic. Then, you can use that security evaluation to apply even stronger controls from your Zero Trust-protected applications, to distinguish between low, medium, and high risk users, make determinations about how to handle BYOD traffic, and more.

## Adopting SaaS, Securely

The heading above - and the concept of *SaaS Security* - mean a lot of things to a lot of people. For that reason, it’s a somewhat controversial topic, especially as it relates to Zero Trust. SaaS services saw huge user population booms during COVID, positively correlated with the increase in remote work. In an instant, it was easier and more practical for users to connect to services that existed *outside* of corporate infrastructure than it was to connect them to *internal* services.

Some make the argument that SaaS applications are either 1) inherently secure when you’ve integrated SSO, or 2) are the functional responsibility of the SaaS provider to keep secure. Neither are wrong, but both are slightly incomplete. While these only address the way in which your SaaS investment is accessed and secured, it doesn’t contextualize *why* companies use SaaS; typically for storing corporate information. The proliferation of ‘places your sensitive data may live’ will be an increasingly important factor in your SaaS security decisions.

The above statements all imply that you know what SaaS tooling your users engage with, but often that is not the case. First, we’ll address ‘sanctioned’ SaaS adoption, and then we will discuss concepts related to Shadow IT.

### Sanctioned SaaS

As discussed above, your SSO provider (ostensibly your primary line of defense to make your SaaS adoption ‘secure’) is only as useful as the amount of data that it can consume to make a policy decision. Subsequently, determining your required security posture is an important first step for your end-users before you build any sort of security policy. So, if you have applications which contain significant amounts of corporate data or other data subject to compliance laws or other regulations, it may make sense to restrict those exclusively to devices that fit your aforementioned ‘perimeter’.

The best way to accomplish this is to find an aggregator of your signal - like Cloudflare’s Access for SaaS discussed above - that can ensure all of the individual pieces of your security policy are all continuously being applied for user access. Can you accomplish all of this with a traditional SSO vendor? Maybe. Okta’s FastPass, for example, makes a determination of machine identity by validating a certificate that is installed on local devices, and could determine the source IP address of the request, but in most cases would not be able to tell you more about the security inspection events present in that user’s traffic, or anything else about the health of the end-user device.

If you decide that only machine certificates or only another measure of signal is appropriate for denoting a corporate device, this is totally appropriate at any stage of a business’ security maturity - many businesses have yet to adopt device posture of any kind.

Another way to manage your sanctioned SaaS applications is to integrate with your Zero Trust vendor via API, to scan them for misconfiguration, or the presence of unexpected sensitive data. This is independent of traditional Zero Trust Access controls, but is offered by most Zero Trust vendors, and can surface ongoing necessary configuration changes for all your SaaS tools in a single view. By evaluating the presence of sensitive data in SaaS applications that you manage, this can help you to develop a sense of policy priority; it may change the way that you think about what you should be able to be accessed via BYOD, vs. what should require access from a managed endpoint. Or, conversely, how can you quantify the risk for BYOD access such that your users can be effectively conditioned?

### Unsanctioned SaaS (Shadow IT)

The security model significantly changes when you move from SaaS apps which you do control (can integrate with SSO and other third party tools) to applications which you don’t control. This could be because it’s a secondary vendor that doesn’t support SSO, or could be services which haven’t been explicitly ‘approved’ by your IT organization for use - these are sometimes called Shadow IT. The logic is simple, especially with a startup. Users like to run fast and will use any avenue to get their work across the finish line. Sometimes that can mean using tools that haven’t been vetted or approved for use, or for potentially storing sensitive data.

This is typically addressed as part of a general Internet Security program, which sometimes falls within the same consideration set (or the same vendors) as a Zero Trust deployment. De-risking Unsanctioned SaaS is almost always centered around visibility. The most important thing you can do - without having things like SSO or your CASB tool integrated with an application - is understand breadth of usage. This usually requires using a forward-proxy tool like a DNS filter, Secure Web Gateway, or some email-specific tooling. This will provide insight into which users have engaged with non-sanctioned SaaS applications, and potentially even how they engaged with them (did they upload/download files, how much bandwidth have they transferred, etc.). 

This can give you the foundation to build policies and strategy around how your sensitive data gets used within SaaS tools. Some businesses limit the use of SaaS to explicitly approved corporate tools, while others are more lenient. There’s no wrong approach for this, but building an early framework for how to capture usage information so that you can work backwards in the event that it becomes a pressing matter for your organization will set you up for success.

This can also give your IT organization direction on which tools to consider procurement cycles for; if a critical mass of users already engages with a tool, it can sometimes make sense to get Enterprise capabilities to reduce risk or access increased security features, sometimes without dramatically changing cost. 

**Where does Cloudflare fit in?**
Cloudflare can help set a foundation for visibility and management of your [Shadow IT](/cloudflare-one/insights/analytics/access/) environment and subsequent discoveries. User traffic to the Internet can be audited and organized from the WARP client and our [Secure Web Gateway](/cloudflare-one/policies/gateway/), and can help get a handle on where your sensitive data moves, outside of your corporate accepted SaaS tenants. 

This can then be an opportunity to further expand your Zero Trust strategy by ensuring those newly discovered tools are either explicitly blocked or explicitly allowed, setting specific data security controls on them, or integrating them with your Zero Trust vendor using something like [Access for SaaS](/cloudflare-one/applications/configure-apps/saas-apps/aws-sso-saas/) to apply security policy.

## Long-term Management with APIs and Infrastructure as Code
Many startups we speak to are ultimately concerned with the headcount and expertise required to manage security tooling that appears complex or overprovisioned for their use case. Much of what they already do for development is managed through orchestration tools, Infrastructure as Code, and directly via API, so many customers want to eventually achieve a state of DevSecOps, where all Zero Trust (and other security tooling) projects can be built, managed, and maintained as code.

While this is somewhat of an emerging concept for traditional security tooling, it should still be a critical pillar of your management expectations as you evaluate any vendor. Moreover, while concepts like Terraform are supported by a number of Zero Trust vendors, they may not support, or publish provider or API endpoints, for every concept in the product, which can lead to duplication or division in management efforts.

If your goal as an organization is to manage your networking and security stacks as code, there may be challenges, but ultimately starting that framework early in your Zero Trust journey and network development will pay dividends as your business and security needs become inevitably more complex and challenging to manage.

We recommend as you continue to evaluate vendor partners for any Zero Trust or general security initiative, to ensure that they have well-documented and complete API endpoints for their entire product and all management controls, as well as documentation for orchestration and Infrastructure as Code tools like Terraform.

**Where does Cloudflare fit in?**
Cloudflare is very passionate about Zero Trust security in the context of DevSecOps. We build API-first as a primary ethos for all our products, and make all relevant API endpoints available to customers on the first day of feature availability, along with extensive [documentation](/api/).

Separately, many of our customers manage their Cloudflare Zero Trust deployment without ever touching our dashboard; they use Terraform or similar tools for their entire management plane. We have a comprehensive and complete [Terraform](/cloudflare-one/api-terraform/access-with-terraform/) provider to enable you to accomplish Zero Trust as Code.

## Conclusion

IN WORK