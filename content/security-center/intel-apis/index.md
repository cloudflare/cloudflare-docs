---
pcx_content_type: navigation
title: Threat Intelligence APIs
weight: 3
---

# Threat Intelligence APIs

Cloudflare provides a series of endpoints covering various areas of internet security and insights. 

| Intelligence Endpoint | Definition |
| --- | --- |
| [ASN Intelligence](/api/operations/asn-intelligence-get-asn-overview) | Provides an overview of the Autonomous System Number (ASN) and a list of subnets for it. |
| [Domain Intelligence](/api/operations/domain-intelligence-get-domain-details) | Provides security details and statistics about a domain. |
| [Domain History](/api/operations/domain-history-get-domain-history) | Provides historical security threat and content categories that are currently and previously assigned to a domain. |
| [IP Intelligence](/api/operations/ip-intelligence-get-ip-overview) | Provides the geolocation, ASN, infrastructure type of the ASN, and any security threat categories of an IP address. |
| [Passive DNS by IP](/api/operations/passive-dns-by-ip-get-passive-dns-by-ip) | Provides a list of all the domains, including first seen and last seen dates, that have resolved to a specific IP address. |
| [Phishing Intelligence](/api/operations/phishing-url-information-get-results-for-a-url-scan) | Provides phishing details about a URL.  |
| [Miscategorization Intelligence](/api/operations/miscategorization-create-miscategorization) | Enables users to submit requests for modifying a domain's category, subsequently undergoing review by the Cloudflare Intelligence team. |
| [WHOIS](/api/operations/whois-record-get-whois-record) | Provides the WHOIS registration information for a specific domain. |

## API Examples

Below you can find examples of Threat Intelligence API calls. Make sure you are using an [API Token](/fundamentals/api/get-started/create-token/) with the appropriate edit permissions. For comprehensive details, navigate to the respective API documentation using the links above.

### ASN Intelligence
<details open>
<summary>Get ASN Overview</summary>

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
</details>

### Domain Intelligence
<details>
<summary>Get Domain Details</summary>

```bash

$ curl --request "https://api.cloudflare.com/client/v4/accounts/{account_id}/intel/domain?domain=cloudflare.com" \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer <API_TOKEN>" \
    --header "Content-Type: application/json" | jq . 

{
    "result": {
        "domain": "cloudflare.com",
        "resolves_to_refs": [
            {
                "id": "ipv4-addr--71f6bb54-e0c5-5e7d-b939-5698fc15a102",
                "value": "104.16.133.229"
            },
            {
                "id": "ipv4-addr--015b0df4-7fcd-5409-9b56-cfd300c662f6",
                "value": "104.16.132.229"
            },
            {
                "id": "ipv6-addr--4a7455cd-e8d0-5bfb-8bdb-f6ebb1759508",
                "value": "2606:4700::6810:85e5"
            },
            {
                "id": "ipv6-addr--68f89579-7204-5ebd-a851-e91b3a86fc6d",
                "value": "2606:4700::6810:84e5"
            }
        ],
        "application": {},
        "content_categories": [
            {
                "id": 155,
                "super_category_id": 26,
                "name": "Technology"
            },
            {
                "id": 26,
                "name": "Technology"
            }
        ],
        "additional_information": {},
        "type": "Apex domain",
        "notes": "Apex domain given."
    },
    "success": true,
    "errors": [],
    "messages": []
}
```
</details>

### Domain History
<details>
<summary>Get Domain History</summary>

```bash

$ curl --request "https://api.cloudflare.com/client/v4/accounts/{account_id}/intel/domain-history?domain=cloudflare.com" \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer <API_TOKEN>" \
    --header "Content-Type: application/json" | jq . 

{
    "result": [
        {
            "domain": "cloudflare.com",
            "categorizations": [
                {
                    "categories": [
                        {
                            "id": 155,
                            "name": "Technology"
                        }
                    ],
                    "start": "2020-12-16T19:49:30.533482Z",
                    "end": "2023-05-31T08:12:53.547029Z"
                },
                {
                    "categories": [
                        {
                            "id": 115,
                            "name": "Login Screens"
                        },
                        {
                            "id": 155,
                            "name": "Technology"
                        }
                    ],
                    "start": "2023-05-31T08:12:53.547029Z"
                }
            ]
        }
    ],
    "success": true,
    "errors": [],
    "messages": []
}
```
</details>

### IP Intelligence
<details>
<summary>Get IP Overview</summary>

```bash

$ curl --request "https://api.cloudflare.com/client/v4/accounts/{account_id}/intel/ip?ipv4=1.1.1.1" \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer <API_TOKEN>" \
    --header "Content-Type: application/json" | jq . 

{
    "result": [
        {
            "ip": "1.1.1.1",
            "belongs_to_ref": {
                "id": "autonomous-system--2fa28d71-3549-5a38-af05-770b79ad6ea8",
                "value": 13335,
                "type": "isp",
                "country": "US",
                "description": "CLOUDFLARENET"
            },
            "ip_lists": null,
            "ptr_lookup": {
                "ptr_domains": [
                    "one.one.one.one."
                ],
                "ptr_lookup_errors": ""
            },
            "iana_reservations": []
        }
    ],
    "success": true,
    "errors": [],
    "messages": []
}
```
</details>

### Passive DNS by IP
<details>
<summary>Get Passive DNS by IP</summary>

```bash

$ curl --request "https://api.cloudflare.com/client/v4/accounts/{account_id}/intel/dns?ipv4=1.1.1.1&start=2023-07-15&end=2023-07-18&per_page=5" \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer <API_TOKEN>" \
    --header "Content-Type: application/json" | jq . 

{
    "result": {
        "reverse_records": [
            {
                "first_seen": "2023-07-15T00:00:00Z",
                "last_seen": "2023-07-18T00:00:00Z",
                "hostname": "internet-ping.svc.starlink.com"
            },
            {
                "first_seen": "2023-07-15T00:00:00Z",
                "last_seen": "2023-07-18T00:00:00Z",
                "hostname": "one.one.one.one"
            },
            {
                "first_seen": "2023-07-15T00:00:00Z",
                "last_seen": "2023-07-18T00:00:00Z",
                "hostname": "ping.ui.com"
            },
            {
                "first_seen": "2023-07-15T00:00:00Z",
                "last_seen": "2023-07-18T00:00:00Z",
                "hostname": "ping.ubnt.com"
            },
            {
                "first_seen": "2023-07-15T00:00:00Z",
                "last_seen": "2023-07-18T00:00:00Z",
                "hostname": "bflow.tiki.video"
            }
        ],
        "count": 778,
        "page": 1,
        "per_page": 5
    },
    "success": true,
    "errors": [],
    "messages": []
}

```
</details>

### Phishing Intelligence
<details>
<summary>Get results for a URL scan</summary>

```bash
$ curl --request "https://api.cloudflare.com/client/v4/accounts/{account_id}/brand-protection/url-info?url=http://worcester-realistic-ellen-portland.trycloudflare.com/login.html \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer <API_TOKEN>" \
    --header "Content-Type: application/json" | jq . 

{
    "errors": [],
    "messages": [],
    "result": [
        {
            "categorizations": [],
            "model_results": [
                {
                    "model_name": "MACHINE_LEARNING_v2",
                    "model_score": 0.999
                }
            ],
            "rule_matches": [
                {
                    "description": "Match frequently used phishing kit (Discord, Facebook, Instagram, Twitter)",
                    "name": "phishkit.social"
                }
            ],
            "scan_status": {
                "last_processed": "Wed, 19 Jul 2023 14:15:28 GMT",
                "scan_complete": true,
                "status_code": 200,
                "submission_id": 23098147
            },
            "url": "http://worcester-realistic-ellen-portland.trycloudflare.com/login.html"
        }
    ],
    "success": true
}
```
</details>

### Miscategorization Intelligence
<details>
<summary>Create Miscategorization</summary>

```bash

$ curl --request "https://api.cloudflare.com/client/v4/accounts/{account_id}/intel/miscategorization" \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer <API_TOKEN>" \
    --header "Content-Type: application/json" | jq . 
    --data '{
            "content_adds": [
                82
            ],
            "content_removes": [
                82
            ],
            "indicator_type": "url",
            "ip": null,
            "security_adds": [
                117,
                131
            ],
            "security_removes": [
                117
            ],
            "url": "https://wrong-category.theburritobot.com"
        }'

{
    "result": "",
    "success": true,
    "errors": [],
    "messages": []
}
```
</details>

### WHOIS
<details>
<summary>Get WHOIS Record</summary>

```bash

$ curl --request "https://api.cloudflare.com/client/v4/accounts/{account_id}/intel/whois?domain=cloudflare.com" \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer <API_TOKEN>" \
    --header "Content-Type: application/json" | jq . 

{
    "result": {
        "domain": "cloudflare.com",
        "created_date": "2009-02-17",
        "updated_date": "2017-05-24",
        "registrant": "DATA REDACTED",
        "registrant_org": "DATA REDACTED",
        "registrant_country": "United States",
        "registrant_email": "https://domaincontact.cloudflareregistrar.com/cloudflare.com",
        "registrar": "CloudFlare, Inc.",
        "nameservers": [
            "ns3.cloudflare.com",
            "ns4.cloudflare.com",
            "ns5.cloudflare.com",
            "ns6.cloudflare.com",
            "ns7.cloudflare.com"
        ]
    },
    "success": true,
    "errors": [],
    "messages": []
}
```
</details>