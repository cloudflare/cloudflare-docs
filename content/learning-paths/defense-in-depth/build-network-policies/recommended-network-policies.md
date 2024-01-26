---
title: Recommended network policies
pcx_content_type: overview
weight: 1
layout: learning-unit
---

Add the following recommended network policies.

## 1. Quarantined-Users-NET-Restricted-Access

Restrict the access to the Users included in a specific IdP User Group. So the Security Team can restrict the access to those users where malicious activity was detected.

| Selector         | Operator    | Value                               | Logic | Action |
| ---------------- | ----------- | ----------------------------------- | ----- | ------ |
| Destination IP   | not in list | <Quarantined-Users-IPAllowlist>     | Or    | Block  |
| SNI              | not in list | <Quarantined-Users-HostAllowlist>   | Or    |        |
| Domain SNI       | not in list | <Quarantined-Users-DomainAllowlist> | And   |        |
| User Group Names | in          | <Quarantined Users>                 |       |        |

## 2. Posture-Fail-NET-Restricted-Access

Restrict the access to the Devices where Baseline Posture Checks are not passed. If Posture Checks are integrated with service providers like Crowdstrike or Intune via API, this policy will be dynamically blocking the access to those devices that don't meet the Security Requirements.

| Selector                     | Operator    | Value                                          | Logic | Action |
| ---------------------------- | ----------- | ---------------------------------------------- | ----- | ------ |
| Destination IP               | not in list | <Posture-Fail-IPAllowlist>                     | Or    | Block  |
| SNI                          | not in list | <Posture-Fail-HostAllowlist>                   | Or    |        |
| Domain SNI                   | not in list | <Posture-Fail-DomainAllowlist>                 | And   |        |
| Passed Device Posture Checks | not in      | OS-Version \| Domain-Joined \| Disk-Encryption |       |        |

## 3. FinanceUsers-NET-HTTPS-FinanceServers (example)

Allow HTTPs Access to the Finance Users to the Applications hosted in the Finance Servers.

| Selector         | Operator | Value             | Logic | Action |
| ---------------- | -------- | ----------------- | ----- | ------ |
| Destination IP   | in list  | <Finance-Servers> | And   | Allow  |
| User Group Names | in       | <Finance-Users>   |       |        |

## 4. All-NET-Internet-Blocklist

Block the traffic to Destination IPs, SNIs and Domain SNIs known to be malicious or pose a threat to your organization. This policy is usually implemented by creating custom blocklists or by using blocklists provided by threat intelligence partners or regional Computer Emergency and Response Teams (CERTs).

| Selector       | Operator | Value             | Logic | Action |
| -------------- | -------- | ----------------- | ----- | ------ |
| Destination IP | in list  | <IPBlocklist>     | Or    | Block  |
| SNI            | in list  | <HostBlocklist>   | Or    |        |
| Domain SNI     | in list  | <DomainBlocklist> |       |        |

## 5. All-NET-SSH-Internet-Allowlist

{{<Aside type="note">}}The Detected Protocol selector is only available for Enterprise users. For more information, refer to [Protocol detection](/cloudflare-one/policies/gateway/network-policies/protocol-detection/).{{</Aside>}}

Allow SSH traffic to specific endpoints in Internet and for Specific users. Similar policy can be used for another Non-Web Endpoints that need to be accessed. Recommended to filter also by Source IP or IdP Group.

| Selector          | Operator | Value               | Logic | Action |
| ----------------- | -------- | ------------------- | ----- | ------ |
| Destination IP    | in list  | <SSHAllowList>      | Or    | Allow  |
| SNI               | in list  | <SSHAllowlistFQDN>  | And   |        |
| Detected Protocol | is       | _SSH_               | And   |        |
| User Group Names  | in       | <SSH-Allowed-Users> |       |        |

## 6. All-NET-NO-HTTP-HTTPS-Internet-Deny

Block Policy to block all Non-Web Traffic towards Internet. By using Detected Protocol selector we guaranty that alternative ports for HTTP and HTTPs will be allowed as well.

| Selector          | Operator    | Value             | Logic | Action |
| ----------------- | ----------- | ----------------- | ----- | ------ |
| Destination IP    | not in list | <InternalNetwork> | And   | Block  |
| Detected Protocol | is not in   | <HTTP \| HTTPS>   |       |        |

## 7. All-NET-InternalNetwork-ImplicitDeny

Implicit Deny Policy for all the Customer's Internal IP Ranges included in a List. It should be defined at the bottom to make sure we allow only the traffic that is explicitly allowed above.

| Selector       | Operator      | Value                                       | Action |
| -------------- | ------------- | ------------------------------------------- | ------ |
| Destination IP | in list       | <InternalNetwork>                           | Block  |
