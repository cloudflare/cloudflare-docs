---
title: HTTP policy best practices
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

## TLS inspection best practices

TLS inspection allows Cloudflare Gateway to perform deeper traffic analysis and take actions like scanning request bodies for sensitive data, upgrading to a remote browser isolation session, and taking actions based on the complete URL and path of requests. This can be desirable for security policy with users accessing sensitive systems, but there can be challenges. Without TLS inspection turned on, policies can still key off user identity, device posture, IP, resolved domain, SNI, and a number of other attributes that support a Zero Trust security implementation.

It is common for businesses to be hesitant to widely adopt TLS decryption practices due to concerns about interoperability with existing systems, maybe due to past experiences with legacy systems that conceptually worked in the same way. Cloudflare's approach to TLS decryption is capable, performant, modern, and above all, flexible. We understand that it is never possible to inspect absolutely all traffic; something will always break. Our recommendations keep this practical reality in mind.

If your goals include any security outcomes that will require TLS decryption, we recommend you start in the following steps:

1. determine the certificate used for inspection
Do you plan to deploy the Cloudflare root certificate to your devices? This is a simple, common solution to deliver TLS decryption capabilities, and is usually appropriate for testing or proof of concept conditions. If you already have a 'source of truth' certificate that you use for other inspection or trust purposes, we would recommend using your own root certificate [link to BYOPKI documentation]. A few simple reasons for this:

   1. assuming it's already deployed on the relevant fleet of devices, using a single certificate streamlines your IT management
   2. if other services (git workflows, other cli tools, thick client applications, etc) rely on an existing certificate store, presenting the same cert in inspection is far less likely to interrupt their traffic flow, although these are things that you may wish to exempt from inspection.
   3. if you are using Cloudflare Gateway for Direct Internet Access, egressing traffic to Cloudflare from a network using the WARP Connector or a Magic WAN IPsec/GRE tunnel, devices behind those tunnels will not be able to leverage HTTP policies that require decrypting TLS unless they have a certificate that matches either your uploaded certificate or the Cloudflare root certificate. It is more likely in most scenarios that your network infrastructure already has your own device certificates deployed, so using your own existing PKI infrastructure for inspection will reduce the steps necessary to better protect services leveraging this use case.

2. Build a baseline 'do not inspect' policy. The Replace Your VPN learning path module has a section about leveraging a positive or a negative security model that also applies here; do you want to inspect by default, or do you want to only start by inspecting explicit destinations?

    We recommend that you build a list of applications and endpoints that you want to exempt from inspection, and add it as an or operator in addition to our existing, comprehensive Do Not Inspect application group.
    [screenshot]

3. if inspection will not be applied to all devices running WARP, build pass through rules to accommodate any type of device or user group which should not be subject to inspection. For example, if users are issued a corporate managed iPhone with limited permissions, you would set an additional do not inspect policy for all traffic matching the device posture value - either OS type, OS version, or a list of serial numbers (recommended to be updated via the API with hooks from your MDM tool) for those iPhones.
[screenshot and api example]

4. If there will be devices subject to policies that will not have the certificate installed, you will need inverse-logic policies to accommodate this. For example, if you are using Magic WAN tunnels or the WARP Connector to accomplish a Direct Internet Access (network gateway SWG) use case, and not all devices behind the tunnel have the relevant certificate installed, you should exempt TLS decryption for the source network IP range from which that traffic will be originating.

## Create your first policy

We suggest using a standard naming convention when building all policies; they should be unique across the Cloudflare account, should follow the same structure for easier evaluation, and should be as descriptive as possible.

### Order your policies

As you learned in the order of operation documentation, Gateway HTTP policies fire in top-down order in most scenarios. Because Do Not Inspect action policies are 'terminal' actions, we recommend grouping them in logical order above all of your other policies, because they will always functionally fire first regardless of where they are placed. Once these are ordered correctly, your Allow policies should follow, with any special considerations for allow actions (header IDs, certificate mismatch handling, etc.) called out in your policy descriptions. Following that, you can place your isolate policies, and then your block policies. There may be scenarios in which you want to intermingle your block policies within your other policy outcomes, and that's an acceptable approach, but you'll need to ensure that you don't have overly permissive allows or overly restrictive block policies within your greater structure that will cause unintended effects.

### Test your policies

Before instituting block or other actions that would impact your users, you can first measure impact by setting the policy as an 'allow' action. Then, monitor your users actions and look in your logs, sorting by that explicit policy, to see what traffic actions matched against it. If it's exactly what you would expect for the policy, you are probably safe to implement it as its intended action. If unexpected traffic flows matched against it, either user or device groups, or traffic destinations that are unexpected, review the design of your policy to ensure it's not overly permissive or restrictive. If the policy design looks correct, determine whether other policies that should fire before it may be impacting its ability to operate correctly, and review the order of operations for Gateway policies to ensure everything is firing as designed.
