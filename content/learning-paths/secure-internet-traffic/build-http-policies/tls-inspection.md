---
title: Use TLS inspection
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

TLS inspection (also known as TLS decryption or HTTPS inspection) allows Cloudflare Gateway to perform deeper traffic analysis and take actions like scanning request bodies for sensitive data, upgrading to a remote browser isolation session, and redirecting based on the complete URL and path of requests.

TLS inspection is desirable for security policy involving users accessing sensitive systems, but it can also present challenges. Without TLS inspection turned on, policies can still use user identity, device posture, IP address, resolved domain, SNI, and a number of other attributes that support a Zero Trust security implementation.

Organizations are often hesitant to adopt TLS inspection practices due to concerns about interoperability with existing systems due to past experiences with legacy systems that conceptually worked in the same way. However, Cloudflare's approach to TLS inspection is capable, performant, modern, and above all, flexible. We understand that it is never possible to inspect absolutely all traffic — something will always break. Our recommendations keep this practical reality in mind.

## Get started

To decide why and how you should turn on TLS inspection, we recommend you start with the following steps:

### 1. Identify your goals

Cloudflare Zero Trust requires TLS inspection for most advanced security and {{<glossary-tooltip term_id="Cloudflare Data Loss Prevention (DLP)" link="/cloudflare-one/policies/data-loss-prevention/">}}data loss prevention (DLP){{</glossary-tooltip>}} features.

Some security organizations choose to avoid TLS inspection due to concerns about user privacy and acceptable use. This is an important and sometimes complicated organization decision, but you can simplify it by establishing goals related to your security practices. Questions to consider:

- Is your organizational use of TLS inspection designed to protect from the "known" (such as sensitive data in corporate-sanctioned SaaS applications) or the "unknown" (such as users downloading or uploading files to brand-new blob storage buckets)?
- Do you intend to primarily block by domain or hostname or by building policies for complete URLs?
- Do you plan to scan the body of requests or files against DLP profiles or scan downloaded files with an antivirus or anti-malware engine?
- Do you intend to use inline {{<glossary-tooltip term_id="Cloudflare Browser Isolation" link="/cloudflare-one/policies/browser-isolation/">}}Remote Browser Isolation{{</glossary-tooltip>}} to take advantage of data security capabilities like copy/paste blocking, keyboard blocking, and print blocking?

If the answer to a majority of these questions is no and your organization relies mostly on hostname or DNS-based security controls, then you may not need to inspect most, if not all TLS traffic. Because Cloudflare operates both as a secure web gateway and as a secure DNS resolver for your connected users, you can apply policy control that may increase your security posture without the need to broadly inspect TLS traffic.

### 2. Turn on TLS inspection

To turn on TLS inspection for your Zero Trust organization:

{{<render file="gateway/_enable-tls-decryption.md" productFolder="cloudflare-one">}}

### 3. Determine the certificate used for inspection

TLS inspection requires a trusted private root certificate to be able to inspect and filter encrypted traffic. The [default Cloudflare root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cert-with-warp/) is a simple and common solution that is usually appropriate for testing or proof-of-concept conditions when deployed to your devices.

Alternatively, if you already have a root CA that you use for other inspection or trust applications, we recommend [using your own certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/custom-certificate/). A few reasons for this include:

- Assuming the root certificate is already deployed on the relevant fleet of devices, using a single certificate streamlines your IT management.
- If external services like Git workflows or CLI tools rely on an existing certificate store, presenting the same certificate in inspection is far less likely to interrupt their traffic flow, although these are things that you may wish to exempt from inspection.
- If you are using [WARP Connector](/cloudflare-one/connections/connect-networks/private-net/warp-connector/) or a [Magic WAN](/magic-wan/) IPsec/GRE tunnel to on-ramp traffic to Cloudflare, devices behind those tunnels will not be able to use HTTP policies that require TLS inspection unless they have a certificate that matches your organization's certificate of choice. Your network infrastructure most likely already has your own device certificates deployed, so using your own existing public key infrastructure for inspection will simplify protection.

### 4. Build a baseline Do Not Inspect policy

Do you want to inspect all traffic by default, or do you only want to inspect explicit destinations? We recommend that you build a Gateway list of applications and endpoints to exclude from inspection and add the list as an OR operator in addition to our existing Do Not Inspect application group. For example:

| Selector    | Operator | Value               | Logic | Action         |
| ----------- | -------- | ------------------- | ----- | -------------- |
| Application | in       | _Do Not Inspect_    | Or    | Do Not Inspect |
| Host        | in list  | _Trusted Hostnames_ |       |                |

If your organization is newly adopting the security framework that requires TLS inspection, we recommend starting minimally. In fact, it may even be appropriate to choose to only explicitly inspect a predetermined list of hostnames, IPs, or specific user groups or device types and forego inspection for everything else during the initial deployment stage. Cloudflare has a unique and flexible approach to where and when you can deploy inspection, meaning it can be as limited and granular as your organization needs without impacting device routing tables or other memory-sensitive local constructs.

### 5. Build the necessary pass-through rules

You can build pass-through rules to accommodate any type of device or user group that should not be subject to inspection.

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

    ```bash
    curl https://api.cloudflare.com/client/v4/accounts/{account_id}/gateway/lists \
    --header "X-Auth-Email: <EMAIL>" \
    --header "X-Auth-Key: <API_KEY>" \
    --header "Content-Type: application/json" \
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
    curl https://api.cloudflare.com/client/v4/accounts/{account_id}/gateway/rules \
    --header "X-Auth-Email: <EMAIL>" \
    --header "X-Auth-Key: <API_KEY>" \
    --header "Content-Type: application/json" \
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

If you filter your network-connected devices with Magic WAN tunnels, the WARP Connector, or other devices that do not have the Cloudflare certificate installed, you will need to accommodate by creating pass-through policies. For these devices, you should explicitly exempt TLS inspection for the source network IP range from which that traffic will be originating. For example:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

| Selector           | Operator | Value            | Action         |
| ------------------ | -------- | ---------------- | -------------- |
| Source Internal IP | in       | `203.0.113.0/24` | Do Not Inspect |

{{</tab>}}
{{<tab label="api" no-code="true">}}

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/gateway/rules \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "name": "Do not inspect corporate devices",
  "conditions": [
    {
      "type": "traffic",
      "expression": {
        "in": {
          "lhs": "http.conn.internal_src_ip",
          "rhs": [
            {
              "cidr": "203.0.113.0/24"
            }
          ]
        }
      }
    }
  ]
}'
```

{{</tab>}}
{{</tabs>}}
