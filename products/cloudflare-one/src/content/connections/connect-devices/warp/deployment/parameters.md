---
order: 1
---

# Parameters

Each client supports the following set of parameters as part of their deployment, regardless of the deployment mechanism.

## Required fields

### `organization`

| Field | Value Type | Example | 
| ----- | -------- | ---------- |
| `organization` | string | mycompanyname |

**Description.** Your [team name](/glossary#team-name).

## Optional fields

### `gateway_unique_id`

| Field | Value Type | Example | 
| ----- | -------- | ---------- | 
| `gateway_unique_id` | string | fix7p31bzg |

**Description.** Your [Gateway DoH subdomain](/connections/connect-networks/locations/configuring-a-location#find-a-locations-doh-subdomain).

### `enable`

| Field | Value Type | Example | 
| ----- | -------- | ---------- | 
| `enable` | boolean | true |

**Description.** Specifies whether If set to True, the client is always enabled and the user is unable to disconnect. If set to false, the client can disable the WARP Client at anytime.

### `service_mode`

| Field | Value Type | Example | 
| ----- | -------- | ---------- | 
| `service_mode` | string | warp |

**Description.** 	Allows you to choose between Gateway only (`1dot1`) or Gateway w/WARP+ (`warp`).

### `support_url`

| Field | Value Type | Example | 
| ----- | -------- | ---------- | 
| `support_url` | string | `https://support.example.com` |

**Description.** 	Allows you to add a web url or mailto that will change in-app feedback mechanism to point at your IT department for support.​ If the value is not specified, the mechanism will be disabled.

## Frequently Asked Questions

* **What happens if I don't supply a Gateway DoH subdomain?**
A DoH subdomain value is only required if you configure DNS Filtering.

* **How do I obtain logs in the event of an issue with client?**
The macOS and Windows clients installations each contain an application in their installed folders called warp-diag that can be used to obtain logs.
