---
pcx_content_type: concept
title: Customer Metadata Boundary
weight: 3
---

# Customer Metadata Boundary

As part of the Data Localization Suite, the Customer Metadata Boundary (CMB) ensures that any traffic metadata which identifies a customer’s end user (that is, contains the customer's [Account ID](/fundamentals/setup/find-account-and-zone-ids/)) will stay in the `EU` (European Union) or in the `US` (United States), depending on the region the customer selects. For example, if a customer selects the `EU` Customer Metadata Boundary, metadata will **only** be sent to our core data center located in the European Union.

## Flow of customer traffic metadata

The following diagram is a high-level example of the flow of how metadata about a customer's traffic is generated on a Cloudflare data center. Logs are exclusively sent to the EU core data center for Cloudflare customers and their authorized users to access and view.

<br>

```mermaid
sequenceDiagram
    participant UserEU as End user
    participant CloudflarePoP as Closest data center
    participant EUCoreDC as Core data center in EU
    participant CloudflareSuperAdmin as Admin
 
    UserEU->>CloudflarePoP: Connects
    Note right of CloudflarePoP: Customer Logs generated <br> (for example, HTTP requests and Firewall events)
    CloudflarePoP-->>EUCoreDC: Forwards encrypted Customer Logs
    Note right of EUCoreDC: Authorized users can view Logs & Analytics <br> on the UI or via API
    CloudflareSuperAdmin->>EUCoreDC: Authenticated access
    EUCoreDC->>CloudflareSuperAdmin: Logs & Analytics
    CloudflarePoP->>UserEU: Response
```

<br>

## Log management

Additionally, customers have the option to configure Logpush to push their Customer Logs to various storage services, SIEMs, and log management providers.

## Product specific-behavior

For detailed information about product-specific behavior regarding Metadata Boundary, refer to the [Overview section](/data-localization/).