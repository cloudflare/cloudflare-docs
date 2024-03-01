---
title: Enable TLS inspection
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

## Overview

TLS inspection allows Cloudflare Gateway to perform deeper traffic analysis and take actions like scanning request bodies for sensitive data, upgrading to a remote browser isolation session, and taking actions based on the complete URL and path of requests. This is desirable for security policy with users accessing sensitive systems, but there can be challenges. Without TLS inspection turned on, policies can still use user identity, device posture, IP, resolved domain, SNI, and a number of other attributes that support a Zero Trust security implementation.

Businesses are often hesitant to adopt TLS decryption practices due to concerns about interoperability with existing systems, maybe due to past experiences with legacy systems that conceptually worked in the same way. Cloudflare's approach to TLS decryption is capable, performant, modern, and above all, flexible. We understand that it’s never possible to inspect absolutely all traffic—something will always break. Our recommendations keep this practical reality in mind.

We recommend you start with the following steps:

### 1. Identify your goals

TLS inspection is requisite for most advanced security and data loss prevention (DLP) capabilities in the Cloudflare Zero Trust suite. Some security organizations choose to avoid TLS decryption due to concerns about user privacy and acceptable use. This is an important and sometimes complicated organization decision, but it can be simplified by establishing goals related to your security practice. Questions to consider:

1. Is your organizational use of TLS decryption designed to protect from the ‘known’ (sensitive data in corporate-sanctioned SaaS applications, etc.) or the ‘unknown’ (users downloading or uploading files to brand-new blob storage buckets, etc.)?
2. Do you intend to primarily block by domain/hostname or by building policies for complete URLs?
3. Do you plan to scan the body of requests or files against DLP profiles or scan downloaded files with an antivirus or anti-malware engine?
4. Do you intend to use inline Remote Browser Isolation to take advantage of data security capabilities like copy/paste blocking, keyboard blocking, and print blocking?

If the answer to a majority of these questions is no and your organization relies mostly on hostname or DNS-based security controls, then you may not need to inspect TLS (or may not need to inspect most/all of your users’ TLS traffic. Because Cloudflare operates both as a secure web gateway and as a secure DNS resolver for your connected users, you can apply defense-in-depth policy control that may increase your security posture without the need to broadly inspect TLS.

### 2. Determine the certificate used for inspection

TLS inspection requires a trusted private root certificate to be able to inspect and filter encrypted traffic. To accomplish this, it’s important to determine which certificate you plan to use. If you plan to deploy the Cloudflare root certificate to your devices, it’s a simple, common solution that is usually appropriate for testing or proof-of-concept conditions.

If you already have a source-of-truth certificate that you use for other inspection or trust purposes, we recommend [using your own root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/custom-certificate/). A few reasons for this:

- Assuming the root certificate is already deployed on the relevant fleet of devices, using a single certificate streamlines your IT management.
- When using Cloudflare Zero Trust as a comprehensive VPN replacement, your users  may be required to establish a TLS connection with origin servers using certificates not signed by a public CA. To filter this traffic, you’ll have the option to “pass through” to these origins while maintaining your security posture.
- External services like Git workflows or CLI tools rely on an existing certificate store, presenting the same cert in inspection is far less likely to interrupt their traffic flow, although these are things that you may wish to exempt from inspection.
- If you are using Cloudflare Gateway for Direct Internet Access, egressing traffic to Cloudflare from a network using the WARP Connector or a Magic WAN IPsec/GRE tunnel, devices behind those tunnels will not be able to leverage HTTP policies that require decrypting TLS unless they have a certificate that matches either your uploaded certificate or the Cloudflare root certificate. It is more likely that your network infrastructure already has your own device certificates deployed, so using your own existing PKI infrastructure for inspection will reduce the steps necessary to better protect services leveraging this use case.

### 3. Build a baseline Do Not Inspect policy

Do you want to inspect by default, or do you only want to inspect explicit destinations? We recommend that you build a Gateway List of applications and endpoints to exclude from inspection and add the list as an or operator in addition to our existing Do Not Inspect application group.

If your organization is newly adopting the security framework that requires TLS decryption, we recommend starting minimally. In fact, it may even be appropriate to choose to only explicitly inspect a predetermined list of hostnames, IPs, or specific user groups or device types and forego inspection for everything else while conducting testing our first-stage deployments. Cloudflare has a unique and flexible approach to where and when you have the capability to deploy inspection, meaning it can be as limited and granular as your organization needs without impacting device routing tables or other memory-sensitive local constructs.

### 4. Build the necessary pass-through rules

If inspection will not be applied to all devices running Cloudflare’s device client (WARP), build pass through rules to accommodate any type of device or user group that should not be subject to inspection.

For example, if users are issued a corporate-managed iPhone with limited permissions, set an additional Do Not Inspect policy for all traffic matching the device posture value. That could include the OS type, OS version, or a list of serial numbers (updated via the API with hooks from your MDM tool) for those iPhones:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

| Selector              | Operator | Value                                   | Logic | Action         |
| --------------------- | -------- | --------------------------------------- | ----- | -------------- |
| Passed Device Posture | in       | _iOS 17 or higher (OS version)_         | And   | Do Not Inspect |
| Passed Device Posture | in       | _iPhone Serial Numbers (Serial number)_ |       |                |

{{</tab>}}
{{<tab label="api" no-code="true">}}

1. Create a list of device serial numbers that you do not want to inspect.

    ```sh
    $ curl --request POST \
    --url <https://api.cloudflare.com/client/v4/accounts/account_id/gateway/lists> \
    --header 'Content-Type: application/json' \
    --header 'X-Auth-Email: ' \
    --data '{
    "description": "The serial numbers for administrators",
    "items": [
        {
        "value": "8GE8721REF"
        }
    ],
    "name": "Admin Serial Numbers",
    "type": "SERIAL"
    }'
    ```

2. Create a Do Not Inspect policy that checks the device against the list of serial numbers.

    ```sh
    $ curl https://api.cloudflare.com/client/v4/accounts/{account_id}/gateway/rules \
    --header 'Content-Type: application/json' \
    --header 'X-Auth-Email: <EMAIL>' \
    --header 'X-Auth-Key: <API_KEY>' \
    --data '{
    "name": "Do not inspect corporate devices",
    "conditions": [
    {
        "type": "device_posture",
        "expression": {
        "any": {
            "in": {
            "lhs": {
                "splat": "device_posture.checks.passed"
            },
            "rhs": [
                "{serial_number_list_uuid}"
            ]
            }
        }
        }
    }
    ],
    "action": "off",
    "precedence": 14002,
    "enabled": true,
    "filters": [
    "http"
    ]
    }'
    ```

{{</tab>}}
{{</tabs>}}

### 5. Build inverse-logic policies

If certain devices will be subject to policies but won’t have the certificate installed, you’ll need to accommodate by creating inverse-logic policies.

For example, if you are using Magic WAN tunnels or the WARP Connector to filter your network connected devices typically not all devices connecting through will have the relevant certificate installed. For those devices you should explicitly exempt TLS decryption for the source network IP range from which that traffic will be originating.

## Enable TLS inspection

Now that you’ve considered which devices and applications TLS inspection should and shouldn’t apply to, it’s time to enable TLS inspection.

### 1. Create your first policy

Use a standard naming convention when building all policies. Policy names should be unique across the Cloudflare account, follow the same structure, and be as descriptive as possible.

### 2. Order your policies

In most scenarios, Gateway HTTP policies fire in top-down order. Because Do Not Inspect action policies are 'terminal' actions, we recommend grouping them in logical order above all of your other policies because they will always functionally fire first regardless of where they are placed.

Once the Do Not Inspect policies are ordered correctly, Allow policies should follow, and the  Allow policy descriptions should include any special considerations for allow actions (header IDs, certificate mismatch handling, non-isolate traffic, etc.).

Next list your isolate and block policies. There may be scenarios in which you want to intermingle your block policies within your other policy outcomes. That's an acceptable approach, but you'll need to ensure that you don't have overly permissive allows or overly restrictive block policies within your greater structure that will cause unintended effects.

### 3. Test your policies

Before instituting blocks or other actions that would impact your users, first measure impact by setting the policy as an 'allow' action. Monitor your users’ actions and look in your logs, sorting by that explicit policy, to see what traffic actions matched against it. If the activity is exactly what you would expect for the policy, you are probably safe to implement it as its intended action.

If unexpected traffic flows matched against it (like user or device groups) or traffic destinations that are unexpected, review the design of your policy to ensure it's not overly permissive or restrictive. If the policy design looks correct, determine whether other policies that should fire before the TLS inspection policy may be impacting its ability to operate correctly, and review the order of operations for Gateway policies to ensure everything is firing as designed.
