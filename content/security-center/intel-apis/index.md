---
pcx_content_type: navigation
title: Intelligence APIs
weight: 5
---

# Intelligence APIs

## Background
Cloudflare provides a series of endpoints covering various areas of internet security and insights. 

Here is the list:

| Intelligence Endpoint | Definition |
| --- | --- |
| [ASN](https://developers.cloudflare.com/api/operations/asn-intelligence-get-asn-overview) | Provides an overview of the Autonymous System Number (ANS) and a list of subnets for it. |
| [Domain Intel](/api/operations/domain-intelligence-get-domain-details) | Provides security details and statistics about a domain. |
| [Domain History](/api/operations/domain-history-get-domain-history) | f |
| [IP](/api/operations/ip-intelligence-get-ip-overview) | f |
| [Passive DNS](/api/operations/passive-dns-by-ip-get-passive-dns-by-ip) | f |
| [Phishing](/api/operations/phishing-url-information-get-results-for-a-url-scan) | f |
| [Miscategorization](/api/operations/miscategorization-create-miscategorization) | f |
| [WHOIS](/api/operations/whois-record-get-whois-record) | f |

## API Examples

### ASN Intelligence
<details open>
<summary>Retrieve overview details about an ASN</summary>
<div>

```bash
$ curl --request "https://api.cloudflare.com/client/v4/accounts/{account_id}/intel/asn/13335" \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer <API_TOKEN>" \
    --header "Content-Type: application/json" | jq . 

{
    "result": {
        "asn": 13335,
        "description": "CLOUDFLARENET",
        "country": "US",
        "type": "isp"
    },
    "success": true,
    "errors": [],
    "messages": []
}    
```

{{<Aside>}}

{{</Aside>}}
</div>
</details>


### Domain Intelligence
<details open>
<summary>How to retrieve intel about a Domain</summary>
<div>

```sh
$ git checkout -b step3-https

Switched to a new branch 'step3-https'

resource "cloudflare_zone_settings_override" "example-com-settings" {
  zone_id = var.zone_id

  settings {
    tls_1_3                  = "on"
    automatic_https_rewrites = "on"
    ssl                      = "strict"
  }
}
EOF
```

</div>
</details>




<!-- {{<tabs labels="ASN | Domain Intel | Domain History | IP | Passive DNS | Phishing | Miscategorization | WHOIS">}}
{{<tab label="asn">}}
```bash
$ git checkout -b step3-https
Switched to a new branch 'step3-https'

$ cat >> cloudflare.tf <<'EOF'

resource "cloudflare_zone_settings_override" "example-com-settings" {
  zone_id = var.zone_id

  settings {
    tls_1_3                  = "on"
    automatic_https_rewrites = "on"
    ssl                      = "strict"
  }
}
EOF
```{{</tab>}}
{{<tab label="domain intel">}}
hi
{{</tab>}}
{{<tab label="domain history">}}
hi
{{</tab>}}
{{<tab label="ip">}}
hi
{{</tab>}}
{{<tab label="passive dns">}}
hi
{{</tab>}}
{{<tab label="phishing">}}
hi
{{</tab>}}
{{<tab label="miscategorization">}}
hi
{{</tab>}}
{{<tab label="whois">}}
hi
{{</tab>}}
{{</tabs>}} -->
