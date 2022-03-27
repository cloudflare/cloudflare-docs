---
updated: 2020-11-28
category: 🛡️ Web Gateway
difficulty: Beginner
pcx-content-type: tutorial
title: Filter DNS on home or office network
---

# Filter DNS on home or office network

You can use Cloudflare Gateway to filter and log DNS queries from any device in your network without installing client software.

**🗺️ This tutorial covers how to:**

- Create a DNS filtering policy that secures a home or office network by blocking malicious hostnames
- Review logs and events that occur on that network

**⏲️ Time to complete:**

15 minutes

## Before you start

1.  [Add Gateway to your account](/cloudflare-one/setup/)

---

## Configure Cloudflare Gateway

Before you begin, you'll need to follow [these instructions](/cloudflare-one/setup/) to set up Cloudflare Gateway in your account. To perform DNS filtering, you need one of the following subscriptions:

- Zero Trust Free
- Zero Trust Standard

## Add a location

During the Gateway onboarding flow, the dashboard will prompt you to configure a location for the IP you are currently using. Gateway will automatically detect the IP of your current network and assign it to the location being created.

If you want to create a different location, one that you are not currently using, you can add a new location from the `Locations` page in the `Gateway` Section.

![Add Location](/cloudflare-one/static/secure-web-gateway/secure-dns-network/add-location.png)

## Create a Gateway policy

Next, you can [build a policy](/cloudflare-one/policies/filtering/dns-policies/) that will filter DNS queries for known malicious hostnames and other types of threats. Navigate to the `Policies` page. On the DNS tab, click `Create a DNS policy`.

![Add Policy](/cloudflare-one/static/secure-web-gateway/secure-dns-network/create-dns-policy.png)

First, assign the policy a name and add an optional description. Next, build an expression to determine what is blocked.

In this example, the policy will block any hostnames that Cloudflare's data intelligence platform identifies as containing security risks like malware or phishing campaigns. You can click `All security risks` to include all options or check individual types of threats in the dropdown.

![Block Threats](/cloudflare-one/static/secure-web-gateway/secure-dns-network/block-threats.png)

The policy will block security threats for any location in your Cloudflare Zero Trust deployment. If you want to only block the security risks selected above for the location created previously, add an `AND` rule to the selector. Choose `Location` and check the location to include in this policy.

![Include Location](/cloudflare-one/static/secure-web-gateway/secure-dns-network/include-location.png)

Finally, choose `Block` as the action and create the policy.

![Block Action](/cloudflare-one/static/secure-web-gateway/secure-dns-network/block-action.png)

The rule will appear in your DNS policies list.

![Rule Listed](/cloudflare-one/static/secure-web-gateway/secure-dns-network/rule-listed.png)

## Configure your router

You will need to make a one-time change to your router to use Cloudflare Gateway for DNS filtering for all devices in your network.

Instructions to change your router's DNS settings are available in the Zero Trust dashboard. Navigate to the `Locations` page and expand the location you want to configure. Click `Setup instructions`.

![Expand Location](/cloudflare-one/static/secure-web-gateway/secure-dns-network/expand-location.png)

The default toggle presented will be `Router`. Follow the instructions on the page to change your router settings. Additional instructions are available for routers from specific manufacturers in the [1.1.1.1 documentation](/1.1.1.1/setup/router/).

![Expand Location](/cloudflare-one/static/secure-web-gateway/secure-dns-network/router-instructions.png)

## Review events

Once configured, you can review DNS queries made from your network in the **Analytics** > **Gateway** page.

![Gateway Analytics](/cloudflare-one/static/secure-web-gateway/secure-dns-network/gateway-analytics.png)
