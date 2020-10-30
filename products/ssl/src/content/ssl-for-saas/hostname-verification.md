---
order: 4
---

# Hostname verification

Cloudflare verifies ownership of each new hostname before traffic is allowed to proxy.   There are three methods to verify ownership: TXT record, HTTP token or CNAME.

--------

## CNAME

### Full setup

Cloudflare iterates over the CNAME chain starting from the hostname.  The value of the last CNAME must contain the domain that owns the custom hostname record.  For example, if the domain owning the custom hostname record is `saasprovider.com`, then the CNAME looks similar to `app.example.com CNAME proxy-fallback.saasprovider.com`

### Partial setup

1. Add a CNAME to your authoritative DNS to point to the fallback origin:

```txt
app.example.com CNAME proxy-fallback.saasprovider.com
```
2. Add a CNAME to Cloudflare DNS for your domain:

```txt
proxy-fallback.saasprovider.com CNAME proxy-fallback.saasprovider.com.cdn.cloudflare.net
```

To prevent unresolvable CNAME loops, only 10 consecutive CNAMES are followed to find the appropriate Custom Hostname CNAME.  The final CNAME must contain `<zone_name>.cdn.cloudflare.net`

### Apex verification

For verification, the account that owns the custom hostname must also own all A and AAAA records for the apex.  To verify ownership, the IP returned for the hostname must reside in the IP prefix allocated to the account.

The few seconds Cloudflare requires to iterate over the CNAME can cause a slight downtime.  This is likely acceptable for CNAME verification of Custom Hostnames for staging or development sites. However, Cloudflare recommends verification of Custom Hostnames via TXT record or HTTP token for live production traffic.  When TXT or HTTP verification completes and the Custom Hostname shows __Active__ in the Cloudflare __SSL/TLS__ app under the __Custom Hostnames__ tab, inform your customer to CNAME traffic to Cloudflare. 


### TXT

Each API call to create a Custom Hostname provides a TXT *ownership_verification* record for your customer to add to their DNS for ownership validation of the Custom Hostname.

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

### HTTP

Each API call to create a Custom Hostname also provides an HTTP ownership_verification record. Compared to TXT verification, HTTP verification doesn’t require your customer to change their DNS. HTTP verification is used mainly by organizations with a large deployed base of custom domains with HTTPS support. Serving the HTTP token from your origin web server allows hostname verification before proxying domain traffic through Cloudflare.

Cloudflare sends GET requests to the *http_url* using *User-Agent: Cloudflare Custom Hostname Verification*

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

Various hostname verification errors include:

<TableWrap>

| Error Message                                | Cause                   |
|----------------------------------------------|-------------------------|
| Zone does not have a fallback origin set     | Fallback is not active  |
| Fallback origin is initializing, pending_deployment,<br/>pending_deletion, or deleted | Fallback is not active  |
| Custom hostname does not CNAME to this zone  | Zone does not have apex proxying entitlement and custom hostname doesn’t CNAME to zone  |
| None of the A or AAAA records are owned by this<br/>account and the pre-generated ownership verification<br/>token was not found  | Account has apex proxying enabled but custom hostname is not pointing to reserved IPs for zone  |
| This account and the pre-generated ownership<br/>verification token was not found  | Hostname doesn’t CNAME to zone or none of the A/AAAA records match reserved IPs for zone  |

</TableWrap>

Applicable hostname verification status includes:

<TableWrap>

| Verification Status Messages   | Description                                                                                       |
|--------------------------------|---------------------------------------------------------------------------------------------------|
| Pending                        | Custom Hostname is pending hostname verification                                                  |
| Active                         | Custom Hostname has completed hostname verification and is active                                 |
| Moved                          | Custom Hostname is not active after Pending for the entirety of the Validation Backoff Schedule   |
| Delete                         | Custom Hostname was deleted from the zone.  Occurs if status is Moved for more than 7 days        |

</TableWrap>
