---
"[ // ]": null
title: Gateway DNS
---

# Gateway DNS

The descriptions below detail the fields available for `gateway_dns`.

{{<table-wrap>}}

| Field | Value | Type |
| -- | -- | -- |
| ColoID | The ID of the colo that received the DNS query (for example, 46, 72, 397) | int |
| ColoName | The name of the colo that received the DNS query (for example, 'SJC', 'MIA', 'IAD') | string |
| Datetime | The date and time the corresponding DNS request was made (for example, '2021-07-27T00:01:07Z') | int or string |
| DeviceID | UUID of the device where the HTTP request originated from (for example, 'dad71818-0429-11ec-a0dc-000000000000') | string |
| DstIP | The destination IP address the DNS query was made to (for example, '104.16.132.2290') | string |
| DstPort | The destination port used at the edge. The port changes based on the protocol used by the DNS query (for example, 0). | int |
| Email | Email used to authenticate the client (for example, 'user@test.com') | string |
| Location | Name of the location the DNS request is coming from. Location is created by the customer (for example, '7bdc7a9c-81d3-4816-8e56-000000000000') | string |
| MatchedCategoryIDs | ID or IDs of category that the domain was matched with the policy (for example, \[7,12,28,122,129,163]) | array\[int] |
| Policy | Name of the policy that was applied (if any) (for example, '7bdc7a9c-81d3-4816-8e56-de1acad3dec5') | string |
| PolicyID | Id of the policy/rule that was applied (if any) | string |
| Protocol | The protocol used for the DNS query by the client (for example, 'udp') | string |
| QueryCategoryIDs | ID or IDs of category that the domain belongs to (for example, \[7,12,28,122,129,163]) | array\[int] |
| QueryName | The query name (for example, 'example.com') | string |
| QueryNameReversed | Query name in reverse (for example, 'com.example') | string |
| QuerySize | The size of the DNS request in bytes (for example, 151) | int |
| QueryType | The type of DNS query (for example, 'A', 'AAAA', 'MX', or 'TXT') | string |
| RData | The rdata objects (for example, {"type":"5","data":"dns-packet-placeholder..."}) | array\[object] |
| ResolverDecision | Result of the DNS query (for example, 'overrideForSafeSearch') | string |
| SrcIP | The source IP address making the DNS query (for example, '104.16.132.229') | string |
| SrcPort | The port used by the client when they sent the DNS request (for example, 0) | int |
| UserID | User identity where the HTTP request originated from (for example, '00000000-0000-0000-0000-000000000000') | string |

{{</table-wrap>}}
