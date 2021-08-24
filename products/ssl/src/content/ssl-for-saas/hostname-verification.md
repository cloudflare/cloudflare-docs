---
order: 4
pcx-content-type: reference
---

# Hostname verification

Cloudflare verifies ownership of each new hostname before traffic is allowed to proxy.   There are four methods to verify ownership: TXT record, HTTP token, CNAME, or Apex.

## CNAME

### Full setup

Cloudflare iterates over the CNAME chain starting from the hostname.  The value of the last CNAME must contain the domain that owns the custom hostname record.  For example, if the domain owning the custom hostname record is `saasprovider.com`, then the CNAME looks similar to `app.example.com CNAME proxy-fallback.saasprovider.com`

### Partial setup

#### If using Cloudflare for a partial setup

1. Add a CNAME record to Cloudflare DNS for your domain:

  ```txt
  app.example.com CNAME proxy-fallback.saasprovider.com
  ```

1. Add a CNAME record to your authoritative DNS to point to the fallback origin:

  ```txt
  proxy-fallback.saasprovider.com CNAME proxy-fallback.saasprovider.com.cdn.cloudflare.net
  ```

<Aside type="warning" header="Warning:">To prevent unresolvable CNAME loops, only 10 consecutive CNAMES are followed to find the appropriate Custom Hostname CNAME. The final CNAME must contain <code class="InlineCode">[zone_name].cdn.cloudflare.net</code>.</Aside>

#### If using another DNS provider

1. Log into your authoritative DNS provider.
1. Add a CNAME record to point to the fallback origin owned by the SaaS provider.

  ```txt
  app.example.com CNAME proxy-fallback.saasprovider.com
  ```

## Apex verification

For verification, the account that owns the custom hostname must also own all A and AAAA records for the apex.  To verify ownership, the IP returned for the hostname must reside in the IP prefix allocated to the account.

The few seconds Cloudflare requires to iterate over the CNAME can cause a slight downtime.  This is likely acceptable for CNAME verification of Custom Hostnames for staging or development sites. However, Cloudflare recommends verification of Custom Hostnames via TXT record or HTTP token for live production traffic.  When TXT or HTTP verification completes and the Custom Hostname shows __Active__ in the Cloudflare __SSL/TLS__ app under the __Custom Hostnames__ tab, inform your customer to CNAME traffic to Cloudflare.

## TXT

Each API call to [create a Custom Hostname](https://api.cloudflare.com/#custom-hostname-for-a-zone-create-custom-hostname) provides a TXT *ownership_verification* record for your customer to add to their DNS for ownership validation of the Custom Hostname.

```json
{
  "result": [
    {
      "id": "3537a672-e4d8-4d89-aab9-26cb622918a1",
      "hostname": "app.example.com",
      // ...
      "status": "pending",
      "verification_errors": [
        "custom hostname does not CNAME to this zone."
      ],
      "ownership_verification": {
        "type": "txt",
        "name": "_cf-custom-hostname.app.example.com",
        "value": "0e2d5a7f-1548-4f27-8c05-b577cb14f4ec"
      },
      "created_at": "2020-03-04T19:04:02.705068Z"
    }
  ]
}
```
<Aside header="Note">
Once you activate a Custom Hostname, you can remove the TXT record.
</Aside>

## HTTP

Each API call to create a Custom Hostname also provides an HTTP *ownership_verification* record. Compared to TXT verification, HTTP verification doesn’t require your customer to change their DNS. HTTP verification is used mainly by organizations with a large deployed base of custom domains with HTTPS support. Serving the HTTP token from the zone's origin server allows hostname verification before proxying domain traffic through Cloudflare.

To get and use an HTTP ownership_verification record:

1. Make an API call to [create a Custom Hostname](https://api.cloudflare.com/#custom-hostname-for-a-zone-create-custom-hostname).

1. In the response, copy the `http_url` and `http_body` from the `ownership_verification_http` object:

  <details>
  <summary>Example response (truncated)</summary>
  <div>

  ```json
  {
    "result": [
      {
        "id": "24c8c68e-bec2-49b6-868e-f06373780630",
        "hostname": "app.example.com",
        // ...
        "ownership_verification_http": {
          "http_url": "http://app.example.com/.well-known/cf-custom-hostname-challenge/24c8c68e-bec2-49b6-868e-f06373780630",
          "http_body": "48b409f6-c886-406b-8cbc-0fbf59983555"
        },
        "created_at": "2020-03-04T20:06:04.117122Z"
      }
    ]
  }
  ```
  </div>
  </details>

1. Store the `http_url` and `http_body` on your origin web server.

  <details>
  <summary>Example configuration</summary>
  <div>

  ```
  location "/.well-known/cf-custom-hostname-challenge/24c8c68e-bec2-49b6-868e-f06373780630" {
    return 200 "48b409f6-c886-406b-8cbc-0fbf59983555\n";
  }
  ```
  </div>
  </details>

1. After a few minutes, you will see the hostname validation become **Active** in the UI.

<Aside>Cloudflare sends GET requests to the <code>http_url</code> using <code>User-Agent: Cloudflare Custom Hostname Verification</code>.</Aside>

## Error codes
Various hostname verification errors include:

<TableWrap>
<table style='table-layout:fixed; width:100%'>
<thead>
<tr>
<th>Error Message</th>
<th>Cause</th>
</tr>
</thead>
<tbody>
<tr>
<td style='width:50%; word-wrap:break-word; white-space:normal'>Zone does not have a fallback origin set</td>
<td>Fallback is not active.</td>
</tr>
<tr>
<td style='width:50%; word-wrap:break-word; white-space:normal'>Fallback origin is initializing, pending_deployment, pending_deletion, or deleted</td>
<td>Fallback is not active.</td>
</tr>
<tr>
<td style='width:50%; word-wrap:break-word; white-space:normal'>Custom hostname does not CNAME to this zone</td>
<td>Zone does not have apex proxying entitlement and custom hostname does not CNAME to zone.</td>
</tr>
<tr>
<td style='width:50%; word-wrap:break-word; white-space:normal'>None of the A or AAAA records are owned by this account and the pre-generated ownership verification token was not found</td>
<td>Account has apex proxying enabled but the custom hostname failed the hostname validation check on the A record.</td>
</tr>
<tr>
<td style='width:50%; word-wrap:break-word; white-space:normal'>This account and the pre-generated ownership verification token was not found</td>
<td>Hostname does not CNAME to zone or none of the A/AAAA records match reserved IPs for zone.</td>
</tr>
</tbody>
</table>
</TableWrap>

## Verification statuses

Applicable hostname verification status includes:

<TableWrap>
<table>
<thead>
<tr>
<th>Verification Status Messages</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>Pending</td>
<td>Custom hostname is pending hostname verification.</td>
</tr>
<tr>
<td>Active</td>
<td>Custom hostname has completed hostname verification and is active.</td>
</tr>
<tr>
<td>Active re-deploying</td>
<td>Customer hostname is active and the changes have been processed.</td>
</tr>
<tr>
<td>Blocked</td>
<td>Custom hostname cannot be added to Cloudflare at this time. If you are an Enterprise customer, please contact your Customer Success Manager. Otherwise, please email abusereply@cloudflare.com with the name of the web property and a detailed explanation of your association with this web property.</td>
</tr>
<tr>
<td>Moved</td>
<td>Custom hostname is not active after <em>Pending</em> for the entirety of the Validation Backoff Schedule.</td>
</tr>
<tr>
<td>Deleted</td>
<td>Custom hostname was deleted from the zone. Occurs when status is <em>Moved</em> for more than 7 days.</td>
</tr>
</tbody>
</table>
</TableWrap>
