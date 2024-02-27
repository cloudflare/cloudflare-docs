---
title: Recommended network policies
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

Add the following recommended network policies.

{{<details header="Quarantined-Users-NET-Restricted-Access" open="true">}}

Restrict the access to the Users included in a specific IdP User Group. So the Security Team can restrict the access to those users where malicious activity was detected.

| Selector         | Operator    | Value                               | Logic | Action |
| ---------------- | ----------- | ----------------------------------- | ----- | ------ |
| Destination IP   | not in list | _Quarantined-Users-IPAllowlist_     | Or    | Block  |
| SNI              | not in list | _Quarantined-Users-HostAllowlist_   | Or    |        |
| Domain SNI       | not in list | _Quarantined-Users-DomainAllowlist_ | And   |        |
| User Group Names | in          | _Quarantined Users_                 |       |        |

{{</details>}}

{{<details header="Posture-Fail-NET-Restricted-Access" open="true">}}

Restrict the access to the Devices where Baseline Posture Checks are not passed. If Posture Checks are integrated with service providers like Crowdstrike or Intune via API, this policy will be dynamically blocking the access to those devices that don't meet the Security Requirements.

| Selector                     | Operator    | Value                                          | Logic | Action |
| ---------------------------- | ----------- | ---------------------------------------------- | ----- | ------ |
| Destination IP               | not in list | _Posture-Fail-IPAllowlist_                     | Or    | Block  |
| SNI                          | not in list | _Posture-Fail-HostAllowlist_                   | Or    |        |
| Domain SNI                   | not in list | _Posture-Fail-DomainAllowlist_                 | And   |        |
| Passed Device Posture Checks | not in      | OS-Version \| Domain-Joined \| Disk-Encryption |       |        |

{{</details>}}

{{<details header="FinanceUsers-NET-HTTPS-FinanceServers (example)" open="true">}}

Allow HTTPs Access to the Finance Users to the Applications hosted in the Finance Servers.

| Selector         | Operator | Value             | Logic | Action |
| ---------------- | -------- | ----------------- | ----- | ------ |
| Destination IP   | in list  | _Finance-Servers_ | And   | Allow  |
| User Group Names | in       | _Finance-Users_   |       |        |

{{</details>}}

{{<details header="All-NET-Internet-Blocklist" open="true">}}

Block the traffic to Destination IPs, SNIs and Domain SNIs known to be malicious or pose a threat to your organization. This policy is usually implemented by creating custom blocklists or by using blocklists provided by threat intelligence partners or regional Computer Emergency and Response Teams (CERTs).

| Selector       | Operator | Value             | Logic | Action |
| -------------- | -------- | ----------------- | ----- | ------ |
| Destination IP | in list  | _IPBlocklist_     | Or    | Block  |
| SNI            | in list  | _HostBlocklist_   | Or    |        |
| Domain SNI     | in list  | _DomainBlocklist_ |       |        |

{{</details>}}

{{<details header="All-NET-SSH-Internet-Allowlist" open="true">}}

{{<Aside type="note">}}The Detected Protocol selector is only available for Enterprise users. For more information, refer to [Protocol detection](/cloudflare-one/policies/gateway/network-policies/protocol-detection/).{{</Aside>}}

Allow SSH traffic to specific endpoints in Internet and for Specific users. Similar policy can be used for another Non-Web Endpoints that need to be accessed. Recommended to filter also by Source IP or IdP Group.

| Selector          | Operator | Value               | Logic | Action |
| ----------------- | -------- | ------------------- | ----- | ------ |
| Destination IP    | in list  | _SSHAllowList_      | Or    | Allow  |
| SNI               | in list  | _SSHAllowlistFQDN_  | And   |        |
| Detected Protocol | is       | _SSH_               | And   |        |
| User Group Names  | in       | _SSH-Allowed-Users_ |       |        |

{{</details>}}

{{<details header="All-NET-NO-HTTP-HTTPS-Internet-Deny" open="true">}}

Block Policy to block all Non-Web Traffic towards Internet. By using Detected Protocol selector we guaranty that alternative ports for HTTP and HTTPs will be allowed as well.

| Selector          | Operator    | Value             | Logic | Action |
| ----------------- | ----------- | ----------------- | ----- | ------ |
| Destination IP    | not in list | _InternalNetwork_ | And   | Block  |
| Detected Protocol | is not in   | _HTTP_, _HTTPS_   |       |        |

{{</details>}}

{{<details header="All-NET-InternalNetwork-ImplicitDeny" open="true">}}

Implicit Deny Policy for all the Customer's Internal IP Ranges included in a List. It should be defined at the bottom to make sure we allow only the traffic that is explicitly allowed above.

| Selector       | Operator      | Value                                       | Action |
| -------------- | ------------- | ------------------------------------------- | ------ |
| Destination IP | in list       | _InternalNetwork_                           | Block  |

{{</details>}}
