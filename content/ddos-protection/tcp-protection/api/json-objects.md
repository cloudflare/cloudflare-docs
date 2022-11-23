---
title: JSON objects
pcx_content_type: reference
weight: 3
meta:
  title: Advanced TCP Protection API - JSON objects
---

# JSON objects

This page contains examples of the JSON objects used in the API.

## Prefix

```json
{
  "id": "31c70c65-9f81-4669-94ed-1e1e041e7b06",
  "prefix": "192.0.2.0/24",
  "comment": "Game ranges",
  "excluded": false,
  "created_on": "2022-01-01T13:06:04.721954+01:00",
  "modified_on": "2022-01-01T13:06:04.721954+01:00"
}
```

## Prefix in allowlist

```json
{
  "id": "31c70c65-9f81-4669-94ed-1e1e041e7b06",
  "prefix": "192.0.2.0/24",
  "comment": "Game ranges",
  "enabled": true,
  "created_on": "2021-10-01T13:06:04.721954+01:00",
  "modified_on": "2021-10-01T13:06:04.721954+01:00",
},
```

The `prefix` field can contain an IP address or a CIDR range.

## SYN flood rule or out-of-state TCP rule

```json
{
  "id": "31c70c65-9f81-4669-94ed-1e1e041e7b06",
  "scope": "region",
  "name": "WEUR",
  "rate_sensitivity": "medium",
  "burst_sensitivity": "medium",
  "created_on": "2021-10-01T13:10:38.762503+01:00",
  "modified_on": "2021-10-01T13:10:38.762503+01:00"
}
```

The `scope` field value must be one of `global`, `region`, or `datacenter`. You must provide a region code (or data center code) in the `name` field when specifying a `region` (or `datacenter`) scope.

The `rate_sensitivity` and `burst_sensitivity` field values must be one of `low`, `medium`, or `high`.

## Filter

```json
{
  "id": "20b99eb6-8b48-48dd-a5b9-a995a0843b57",
  "expression": "ip.dst in { 192.0.2.0/24 203.0.113.0/24 } and tcp.dstport in { 80 443 10000..65535 }",
  "mode": "enabled",
  "created_on": "2022-11-01T13:10:38.762503+01:00",
  "modified_on": "2022-11-01T13:10:38.762503+01:00"
 }
```

The `expression` field is a [Rules language expression](/ruleset-engine/rules-language/expressions/) up to 8,192 characters that can include the following fields:

* `ip.src`
* `ip.dst`
* `tcp.srcport`
* `tcp.dstport`

{{<Aside type="note">}}
Expressions of SYN flood protection and out-of-state TCP protection filters do not currently support functions.
{{</Aside>}}

The `mode` value must be one of `enabled`, `disabled`, or `monitoring`.
