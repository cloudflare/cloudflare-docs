---
_build:
  publishResources: false
  render: never
  list: never
---

The fallback origin is where Cloudflare will route traffic sent to your custom hostnames (must be proxied).

{{<Aside type="note">}}

If you are an Enterprise customer, you can route custom hostnames to distinct origins by using [custom origin server](/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/custom-origin/).

{{</Aside>}}

To create your fallback origin:

1. [Create](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) a proxied `A`, `AAAA`, or `CNAME` record pointing to the IP address of your fallback origin (where Cloudflare will send custom hostname traffic).

  {{<example>}}

  | **Type** | **Name** | **IPv4 address** | **Proxy status** |
  | -------- | -------- | ---------------- | ---------------- |
  | `A`        | `proxy-fallback` | `192.0.2.1` | Proxied       |

  {{</example>}}

2. Designate that record as your fallback origin.

  {{<tabs labels="Dashboard | API">}}
  {{<tab label="dashboard" no-code="true">}}
  
  1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
  2. Select your account and zone.
  3. Go to **SSL/TLS** > **Custom Hostnames**. 
  4. For **Fallback Origin**, enter the hostname for your fallback origin.
  5. Select **Add Fallback Origin**.
  
  {{</tab>}}
  {{<tab label="api" no-code="true">}}
  
  Using the hostname of the record you just created, [update the fallback origin value](/api/operations/custom-hostname-fallback-origin-for-a-zone-update-fallback-origin-for-custom-hostnames).
  
  {{</tab>}}
  {{</tabs>}}

3. Once you have added the fallback origin, confirm that its status is **Active**.

  {{<Aside type="note">}}When Cloudflare marks your fallback origin as **Active**, that only reflects that we are ready to send traffic to that DNS record.

  You need to make sure your DNS record is sending traffic to the correct origin location.
  
  {{</Aside>}}
