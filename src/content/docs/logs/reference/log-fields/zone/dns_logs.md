---
# Code generator. DO NOT EDIT.

title: DNS logs
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `dns_logs`.

## ColoCode

Type: `string`

IATA airport code of the data center that received the request.

## EDNSSubnet

Type: `string`

IPv4 or IPv6 address information corresponding to the [EDNS Client Subnet (ECS)](/glossary/?term=ecs) forwarded by recursive resolvers. Not all resolvers send this information.

## EDNSSubnetLength

Type: `int`

Size of the [EDNS Client Subnet (ECS)](/glossary/?term=ecs) in bits. For example, if the last octet of an IPv4 address is omitted (`192.0.2.x.`), the subnet length will be 24.

## QueryName

Type: `string`

Name of the query that was sent.

## QueryType

Type: `int`

Integer value of query type. For more information refer to [Query type](https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-4).

## ResponseCached

Type: `bool`

Whether the response was cached or not.

## ResponseCode

Type: `int`

Integer value of response code. For more information refer to  [Response code](https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-6).

## SourceIP

Type: `string`

IP address of the client (IPv4 or IPv6).

## Timestamp

Type: `int or string`

Timestamp at which the query occurred.
