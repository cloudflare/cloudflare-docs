---
order: 4
---

# Deployment

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

Deploying the Cloudflare WARP Client to support your Cloudflare for Teams configuration supports manual installs, simple deployment scripts, or advanced enterprise management tools, such as Microsoft Intune or Jamf.

<Aside>

<b> Before you start </b>

* Configure a device Access Policy to allow devices to authenticate against your organization.
* [Set your Cloudflare for Teams auth domain](https://developers.cloudflare.com/access/glossary#auth-domain).
* [Obtain your Gateway DoH subdomain](https://developers.cloudflare.com/gateway/getting-started/troubleshooting-policies/#find-a-location-doh-subdomain) (if using DNS Filtering).

</Aside>

## Parameters

Each client supports the following set of parameters as part of their deployment, regardless of the deployment mechanism.

### `organization`

| Field | Type | Example | Required |
| ----- | -------- | ---------- | --- | 
| `organization` | string | mycompanyname | yes |

**Description.** If your Teams [auth domain](https://developers.cloudflare.com/access/glossary#auth-domain) is `https://example.cloudflareaccess.com`, you would enter `example`.

### `gateway_unique_id`

| Field | Type | Example |  Required |
| ----- | -------- | ---------- | ------ | 
| `gateway_unique_id` | string | fix7p31bzg | no |

**Description.** Your [Gateway DoH subdomain](https://developers.cloudflare.com/gateway/getting-started/troubleshooting-policies/#find-a-location-doh-subdomain)

### `enable`

| Field | Type | Example |  Required | 
| ----- | -------- | ---------- | -------- |
| `enable` | boolean | true | no |

**Description.** Specifies whether If set to True, the client is always enabled and the user is unable to disconnect. If set to false, the client can disable the WARP Client at anytime.

### `service_mode`

| Field | Type | Example | Required |
| ----- | -------- | ---------- | -------- |
| `service_mode` | string | warp | no |

**Description.** Allows you to choose between Gateway only (`1dot1`) or Gateway w/WARP+ (`warp`).

### `support_url`

| Field | Type | Example | Required |
| ----- | -------- | ---------- | -------- |
| `support_url` | string | https://support.example.com | no |

**Description.** Allows you to add a web url or mailto that will change in-app feedback mechanism to point at your IT department for support.​ If the value is not specified, the mechanism will be disabled.

## Frequently Asked Questions

* **What happens if I don't supply a Gateway DoH subdomain?**
A DoH subdomain value is only required if you configure DNS Filtering.

* **How do I obtain logs in the event of an issue with client?**
The macOS and Windows clients installations each contain an application in their installed folders called warp-diag that can be used to obtain logs.
