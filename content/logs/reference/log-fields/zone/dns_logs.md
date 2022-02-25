---
"[ // ]": null
title: DNS logs
---

# DNS logs

The descriptions below detail the fields available for `dns_logs`.

<TableWrap>

| Field | Value | Type |
| -- | -- | -- |
| ColoCode | IATA airport code of data center that received the request | string |
| EDNSSubnet | EDNS Client Subnet (IPv4 or IPv6). <br />See here: https://developers.cloudflare.com/logs/reference/glossary#edns-client-subnet-ecs | string |
| EDNSSubnetLength | EDNS Client Subnet length. <br />See here: https://developers.cloudflare.com/logs/reference/glossary#edns-client-subnet-ecs | int |
| QueryName | Name of the query that was sent | string |
| QueryType | Integer value of query type. <br />See here: https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-4 | int |
| ResponseCached | Whether the response was cached or not | bool |
| ResponseCode | Integer value of response code. <br />See here: https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-6 | int |
| SourceIP | IP address of the client (IPv4 or IPv6) | string |
| Timestamp | Timestamp at which the query occurred | int or string |

</TableWrap>
