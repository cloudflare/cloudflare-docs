---
order: 0
type: overview
hideChildren: true
---

<ContentColumn>

# Web applications

You can protect two types of web applications: SaaS and self-hosted.

**SaaS applications** consist of applications your team relies on that are not hosted by your organization. Examples include Salesforce and Workday. To secure SaaS applications, you must integrate Cloudflare Access with the SaaS application's SSO configuration.

**Self-hosted applications** consist of internal applications that you host in your own environment. These can be the data center versions of tools like the Atlassian suite or applications created by your own team. To secure self-hosted applications, you must use Cloudflare's authoritative DNS and [connect the application](/connections/connect-apps) to Cloudflare.

<ButtonGroup>
  <Button type="primary" href="/applications/configure-apps/saas-apps/">Guide to SaaS applications</Button>
  <Button type="primary" href="/applications/configure-apps/self-hosted-apps/">Guide to self-hosted applications</Button>
</ButtonGroup>

</ContentColumn>
