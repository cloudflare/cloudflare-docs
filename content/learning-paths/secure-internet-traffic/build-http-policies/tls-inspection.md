---
title: Use TLS inspection
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

TLS inspection allows Cloudflare Gateway to perform deeper traffic analysis and take actions like scanning request bodies for sensitive data, upgrading to a remote browser isolation session, and taking actions based on the complete URL and path of requests. This is desirable for security policy with users accessing sensitive systems, but there can be challenges. Without TLS inspection turned on, policies can still use user identity, device posture, IP, resolved domain, SNI, and a number of other attributes that support a Zero Trust security implementation.

Businesses are often hesitant to adopt TLS decryption practices due to concerns about interoperability with existing systems, maybe due to past experiences with legacy systems that conceptually worked in the same way. Cloudflare's approach to TLS decryption is capable, performant, modern, and above all, flexible. We understand that it's never possible to inspect absolutely all traffic—something will always break. Our recommendations keep this practical reality in mind.

## Get started

To decide why and how you should turn on TLS inspection, we recommend you start with the following steps:

### 1. Identify your goals

TLS inspection is requisite for most advanced security and {{<glossary-tooltip term_id="Cloudflare Data Loss Prevention (DLP)" link="/cloudflare-one/policies/data-loss-prevention/">}}data loss prevention (DLP){{</glossary-tooltip>}} capabilities in the Cloudflare Zero Trust suite. Some security organizations choose to avoid TLS decryption due to concerns about user privacy and acceptable use. This is an important and sometimes complicated organization decision, but it can be simplified by establishing goals related to your security practice. Questions to consider:

1. Is your organizational use of TLS decryption designed to protect from the 'known' (sensitive data in corporate-sanctioned SaaS applications, etc.) or the 'unknown' (users downloading or uploading files to brand-new blob storage buckets, etc.)?
2. Do you intend to primarily block by domain/hostname or by building policies for complete URLs?
3. Do you plan to scan the body of requests or files against DLP profiles or scan downloaded files with an antivirus or anti-malware engine?
4. Do you intend to use inline {{<glossary-tooltip term_id="Cloudflare Browser Isolation" link="/cloudflare-one/policies/browser-isolation/">}}Remote Browser Isolation{{</glossary-tooltip>}} to take advantage of data security capabilities like copy/paste blocking, keyboard blocking, and print blocking?

If the answer to a majority of these questions is no and your organization relies mostly on hostname or DNS-based security controls, then you may not need to inspect TLS (or may not need to inspect most/all of your users' TLS traffic. Because Cloudflare operates both as a secure web gateway and as a secure DNS resolver for your connected users, you can apply policy control that may increase your security posture without the need to broadly inspect TLS.

### 2. Turn on TLS inspection

To turn on TLS inspection for your Zero Trust organization:

{{<render file="gateway/_enable-tls-decryption.md" productFolder="cloudflare-one">}}

### 3. Determine the certificate used for inspection

TLS inspection requires a trusted private root certificate to be able to inspect and filter encrypted traffic. To accomplish this, it's important to determine which certificate you plan to use. The [default Cloudflare root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cert-with-warp/) is a simple and common solution that is usually appropriate for testing or proof-of-concept conditions when deployed to your devices.

If you already have a source-of-truth certificate that you use for other inspection or trust purposes, we recommend [using your own root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/custom-certificate/). A few reasons for this:

- Assuming the root certificate is already deployed on the relevant fleet of devices, using a single certificate streamlines your IT management.
- When using Cloudflare Zero Trust as a [comprehensive VPN replacement](/learning-paths/replace-vpn/), your users  may be required to establish a TLS connection with origin servers using certificates not signed by a public CA. To filter this traffic, you'll have the option to "pass through” to these origins while maintaining your security posture.
- External services like Git workflows or CLI tools rely on an existing certificate store, presenting the same cert in inspection is far less likely to interrupt their traffic flow, although these are things that you may wish to exempt from inspection.
- If you are using Cloudflare Gateway for Direct Internet Access, egressing traffic to Cloudflare from a network using the [WARP Connector](/cloudflare-one/connections/connect-networks/private-net/warp-connector/) or a [Magic WAN](/magic-wan/) IPsec/GRE tunnel, devices behind those tunnels will not be able to leverage HTTP policies that require decrypting TLS unless they have a certificate that matches either your uploaded certificate or the Cloudflare root certificate. It is more likely that your network infrastructure already has your own device certificates deployed, so using your own existing PKI infrastructure for inspection will reduce the steps necessary to better protect services leveraging this use case.

### 4. Build a baseline Do Not Inspect policy

Do you want to inspect by default, or do you only want to inspect explicit destinations? We recommend that you build a Gateway list of applications and endpoints to exclude from inspection and add the list as an OR operator in addition to our existing Do Not Inspect application group. For example:

| Selector    | Operator | Value               | Logic | Action         |
| ----------- | -------- | ------------------- | ----- | -------------- |
| Application | in       | _Do Not Inspect_    | Or    | Do Not Inspect |
| Host        | in list  | _Trusted Hostnames_ |       |                |

If your organization is newly adopting the security framework that requires TLS decryption, we recommend starting minimally. In fact, it may even be appropriate to choose to only explicitly inspect a predetermined list of hostnames, IPs, or specific user groups or device types and forego inspection for everything else while conducting testing our first-stage deployments. Cloudflare has a unique and flexible approach to where and when you have the capability to deploy inspection, meaning it can be as limited and granular as your organization needs without impacting device routing tables or other memory-sensitive local constructs.

### 5. Build the necessary pass-through rules

If inspection will not be applied to all devices running Cloudflare's device client (WARP), build pass through rules to accommodate any type of device or user group that should not be subject to inspection.

For example, if users are issued a corporate-managed iPhone with limited permissions, set an additional Do Not Inspect policy for all traffic matching the device posture value. That could include the OS type, OS version, or a list of serial numbers (updated via the API with hooks from your MDM tool) for those iPhones:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Gateway** > **Firewall Policies**.
2. In the **HTTP** tab, select **Add a policy**.
3. Name the policy.
4. In **Device Posture**, add the following expression:

    | Selector              | Operator | Value                                   | Logic | Action         |
    | --------------------- | -------- | --------------------------------------- | ----- | -------------- |
    | Passed Device Posture | in       | _iOS 17 or higher (OS version)_         | And   | Do Not Inspect |
    | Passed Device Posture | in       | _iPhone Serial Numbers (Serial number)_ |       |                |

5. Select **Create policy**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

1. Create a list of device serial numbers that you do not want to inspect.

    ```bash
    curl --request POST \
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

    ```bash
    curl <https://api.cloudflare.com/client/v4/accounts/{account_id}/gateway/rules> \
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

### 6. Build inverse-logic policies

If certain devices will be subject to policies but won't have the certificate installed, you'll need to accommodate by creating inverse-logic policies.

For example, if you are using Magic WAN tunnels or the WARP Connector to filter your network connected devices typically not all devices connecting through will have the relevant certificate installed. For those devices you should explicitly exempt TLS decryption for the source network IP range from which that traffic will be originating.
