---
order: 1
---

# Filter DNS on devices

You can use Cloudflare Gateway and the Cloudflare WARP client application to filter and log DNS queries from devices on any network.

**🗺️ This tutorial covers how to:**

* Create a DNS filtering policy that secures devices by blocking malicious hostnames
* Apply that policy to devices on any network

**⏲️Time to complete: ~45 minutes**

## Configure Cloudflare Gateway

Before you begin, you'll need to follow [these instructions](https://developers.cloudflare.com/gateway/getting-started/onboarding-gateway) to set up Cloudflare Gateway in your account. To perform DNS filtering, you need one of the following subscriptions:

* Teams Free
* Teams Standard
* Gateway

## Create a Default Location

When you [enable Cloudflare Gateway](https://developers.cloudflare.com/gateway/getting-started) for the first time, you will be prompted to configure your first location. You can use that Location to represent a physical office and/or roaming users.

Start by navigating to the `Locations` page in the `Gateway` section of the sidebar. You will see the first location that you added has been set as the Default. Any device that enrolls into your Gateway account will follow the policies set for the Default location by using the `DNS over HTTPS` address.

![Add DNS](../../static/secure-web-gateway/secure-dns-devices/locations.png)

If you wish to [use a different Location](https://developers.cloudflare.com/gateway/getting-started/configuring-locations) as your Default, and subsequently the one used for roaming devices, click `Add a location`. During location creation, toggle the `Default location` toggle and the new location will be the Default.

![New Default](../../static/secure-web-gateway/secure-dns-devices/new-default.png)

## Create a Gateway policy

Next, you can [build a policy](https://developers.cloudflare.com/gateway/getting-started/configuring-dns-policy) that will filter DNS queries for known malicious hostnames and other types of threats. Navigate to the `Policies` page. On the DNS tab, click `Add a policy`.

![Add Policy](../../static/secure-web-gateway/secure-dns-devices/add-policy.png)

Assign the policy a name and choose which locations will adhere to this policy. In this example, `Austin Office` is the only location and also the Default. Any devices which enroll will be grouped into this location using its `DNS over HTTPS` hostname.

![Apply Policy](../../static/secure-web-gateway/secure-dns-devices/apply-policy.png)

Under the `Security threats` tab you can toggle which types of threats to block. In this case, choosing `Block all` will toggle all threats to be blocked.

![Block Rules](../../static/secure-web-gateway/secure-dns-devices/block-rules.png)

You can also configure content or custom blocks. Once complete, click `Save`.

## Determine which devices can enroll

Now that you have a Default location and DNS filtering policy, you can [begin to enroll devices](https://developers.cloudflare.com/gateway/connecting-to-gateway). When devices enroll, users will be prompted to authenticate with your identity provider or a consumer identity service. By authenticating, you can attribute devices and DNS queries to users while also limiting who can enroll.

To begin, you will need to enable Cloudflare Access for your account. Cloudflare Access provides the identity integration to enroll users. This feature of Cloudflare Access is available in the Teams Free plan or in the Gateway plan at no additional cost. Follow [these instructions](https://developers.cloudflare.com/access/getting-started/access-setup) to add Access and integrate a free identity option or a specific provider.

Next, build a rule to decide which devices can enroll into your Gateway account. Navigate to the `Devices` page in the `My Teams` section of the sidebar.

![Device List](../../static/secure-web-gateway/secure-dns-devices/device-page.png)

Click `Device Settings` to build the enrollment rule. In the policy, define who should be allowed to enroll a device and click `Save`.

![Enroll Rule](../../static/secure-web-gateway/secure-dns-devices/enroll-rule.png)

## Enroll a device

You can use the WARP client to enroll a device into your security policies. Follow the [instructions here](https://developers.cloudflare.com/warp-client/setting-up) to install the client depending on your device type. Cloudflare Gateway does not need a special version of the client.

Once installed, click the gear icon.

![WARP](../../static/secure-web-gateway/secure-dns-devices/warp.png)

Under the `Account` tab, click `Login with Cloudflare for Teams`.

![Account View](../../static/secure-web-gateway/secure-dns-devices/account-view.png)

Input your Cloudflare for Teams org name. You will have created this during the Cloudflare Access setup flow. You can find it under the `Authentication` tab in the `Access` section of the sidebar.

![Org Name](../../static/secure-web-gateway/secure-dns-devices/org-name.png)

The user will be prompted to login with the identity provider configured in Cloudflare Access. Once authenticated, the client will update to `Teams` mode. You can click the gear to toggle between DNS filtering or full proxy. In this use case, you only need DNS filtering.

![DoH](../../static/secure-web-gateway/secure-dns-devices/with-doh.png)

You can confirm that the device is using the default location under the `Connection` tab. The DoH address will match that of the Default location.

![Confirm DoH](../../static/secure-web-gateway/secure-dns-devices/doh-subdomain.png)

## Optional: Deploy via MDM

You can deploy the WARP client on corporate devices in a way that does not require users to configure the Org Name. To do so, [follow these instructions](https://developers.cloudflare.com/warp-client/teams).