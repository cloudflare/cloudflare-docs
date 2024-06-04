---
title: Recommended HTTP policies
pcx_content_type: learning-unit
weight: 5
layout: learning-unit
---

We recommend you add the following HTTP policies to build an Internet and SaaS app security strategy for your organization.

{{<details header="All-HTTP-Application-InspectBypass" open="true">}}

Bypass HTTP inspection for applications that use embedded certificates. This will help avoid any certificate pinning errors that may arise from an initial rollout.

{{<render file="gateway/policies/_do-not-inspect-applications.md" productFolder="cloudflare-one">}}

{{</details>}}

{{<details header="Android-HTTP-Application-InspectionBypass" open="true">}}

Bypass HTTPS inspection for Android applications (such as Google Drive) that use certificate pinning, which is incompatible with Gateway inspection.

| Selector                     | Operator | Value                             | Logic | Action         |
| ---------------------------- | -------- | --------------------------------- | ----- | -------------- |
| Application                  | in       | _Google Drive_                    | And   | Do Not Inspect |
| Passed Device Posture Checks | in       | _OS Version Android (OS version)_ |       |                |

{{</details>}}

{{<details header="All-HTTP-Domain-Inspection-Bypass" open="true">}}

Bypass HTTP inspection for a custom list of domains identified as incompatible with TLS inspection.

| Selector | Operator | Value                    | Logic | Action         |
| -------- | -------- | ------------------------ | ----- | -------------- |
| Domain   | in list  | _DomainInspectionBypass_ | Or    | Do Not Inspect |
| Domain   | in list  | _Known Domains_          |       |                |

{{</details>}}

{{<details header="All-HTTP-SecurityRisks-Blocklist" open="true">}}

{{<render file="zero-trust/_blocklist-security-categories.md">}}

| Selector       | Operator | Value                | Action |
| -------------- | -------- | -------------------- | ------ |
| Security Risks | in       | _All security risks_ | Block  |

{{</details>}}

{{<details header="All-HTTP-ContentCategories-Blocklist" open="true">}}

{{<render file="zero-trust/_blocklist-content-categories.md" withParameters="HTTP;;_Questionable Content_, _Security Risks_, _Miscellaneous_, _Adult Themes_, _Gambling_">}}

{{</details>}}

{{<details header="All-HTTP-DomainHost-Blocklist" open="true">}}

{{<render file="zero-trust/_blocklist-domain-host.md" withParameters="HTTP">}}

{{</details>}}

{{<details header="All-HTTP-Application-Blocklist" open="true">}}

{{<render file="zero-trust/_blocklist-application.md">}}

{{</details>}}

{{<details header="PrivilegedUsers-HTTP-Any-Isolate" open="true">}}

Isolate traffic for privileged users who regularly access critical systems or execute actions such as threat analysis and malware testing.

Security teams often need to perform threat analysis or malware testing that could trigger malware detection. Likewise, privileged users could be the target of attackers trying to gain access to critical systems.

| Selector         | Operator | Value              | Action  |
| ---------------- | -------- | ------------------ | ------- |
| User Group Names | in       | _Privileged Users_ | Isolate |

{{</details>}}

{{<details header="Quarantined-Users-HTTP-Restricted-Access" open="true">}}

{{<render file="zero-trust/_blocklist-restricted-users.md">}}

| Selector         | Operator    | Value                           | Logic | Action |
| ---------------- | ----------- | ------------------------------- | ----- | ------ |
| Destination IP   | not in list | _Quarantined-Users-IPAllowlist_ | And   | Block  |
| User Group Names | in          | _Quarantined Users_             |       |        |

{{</details>}}

{{<details header="All-HTTP-Domain-Isolate" open="true">}}

Isolate high risk domains or create a custom list of known risky domains to avoid data exfiltration or malware infection. Ideally, your incident response teams can update the blocklist with an [API automation](/security-center/intel-apis/) to provide real-time threat protection.

| Selector           | Operator | Value                              | Logic | Action  |
| ------------------ | -------- | ---------------------------------- | ----- | ------- |
| Content Categories | in       | _New Domain_, _Newly Seen Domains_ | Or    | Isolate |
| Domain             | in list  | _Domain Isolation_                 |       |         |

{{</details>}}
