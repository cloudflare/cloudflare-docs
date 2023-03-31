---
updated: 2020-12-13
category: 🛡️ Web Gateway
difficulty: Beginner
pcx_content_type: tutorial
title: Block sites by TLD
---

# Block sites by TLD

You can use Cloudflare Gateway to block DNS queries a entire top level domain (TLD). These policies will block any hostname in a specific TLD.

**This tutorial covers how to:**

- Build a policy in Gateway to block entire TLDs

**Time to complete:**

5 minutes

## Before you start

1.  [Add Gateway to your account](/cloudflare-one/setup/)

## Build a policy to block by TLD

Visit Zero Trust. Open the `Policies` page in the Gateway section and select the `DNS` tab.

Click **Create a policy**. In the policy builder, name the policy and optionally provide a description.

Choose `Domain` in the Selector, `matches regex` in the Operator, and input the following value:

    [.]fail

Replacing `fail` with the TLD you intend to block.

![DNS policy fields configured to block the .fail tld.](/cloudflare-one/static/secure-web-gateway/block-tld/block-fail.png)

Choose `Block` as the action. Optionally, enable the block page to present a block page to users. Users must have the Cloudflare certificate installed to see the block page.

Finish the policy by clicking **Create policy**.

Input the TLD you need to block. If you need to block `.fail` remove the leading `.` and only input `fail`. Click **Add to policy** and save the policy.

{{<Aside type="note">}}

For more information on how policies work with regular expressions, refer to [Network policy values](/cloudflare-one/policies/filtering/network-policies/#value)

{{</Aside>}}

## Review logs

You can test your policy by attempting to visit a domain with the blocked TLD. To review logs of the block, navigate to the `Logs` section of Zero Trust, select `Gateway`, and choose the `DNS` tab.

You can filter for events by policy. Select the name of the policy in the `Policy` drop down menu.
