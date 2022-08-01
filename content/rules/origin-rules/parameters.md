---
title: API parameter reference
pcx_content_type: reference
weight: 6
meta:
  title: Origin Rules API parameter reference
---

# API parameter reference

Create [different overrides](/rules/origin-rules/features/) by including different action parameters in the `action_parameters` field:

Override type | Parameter to include
--------------|---------------------
Host Header Override | [`host_header`](#host-header-override-parameters) (parameter)
Resolve Override / Destination Port Override| [`origin`](#resolve-override-and-destination-port-override-parameters) (object)
SNI Override | [`sni`](#sni-override-parameters) (object)

{{<Aside type="note">}}
The same Origin Rule can have different types of overrides. Refer to [Configuring several overrides in the same rule](#configuring-several-overrides-in-the-same-rule) for a syntax example.
{{</Aside>}}

## Host Header Override parameters

The full syntax of the `action_parameters` field for overriding the HTTP `Host` header is the following:

```json
"action_parameters": {
  "host_header": "<HOST_HEADER_VALUE>"
}
```

## Resolve Override and Destination Port Override parameters

The full syntax of the `action_parameters` field for overriding both the hostname and the destination port of incoming requests is the following:

```json
"action_parameters": {
  "origin": {
    "host": "<HOSTNAME>",
    "port": <PORT>
  }
}
```

If you are only overriding the hostname or the port, omit the `port` or `host` parameter, respectively.

## SNI Override parameters

The full syntax of the `action_parameters` field for overriding the SNI value of incoming requests is the following:

```json
"action_parameters": {
  "sni": {
    "value": "<SNI_VALUE>"
  }
}
```

## Configuring several overrides in the same rule

The same Origin Rule can have different types of overrides. For example, a single Origin Rule can perform an HTTP `Host` header override and a destination port override. The syntax of such a rule would be the following:

```json
"action_parameters": {
  "host_header": "<HOST_HEADER_VALUE>",
  "origin": {
    "host": "<HOSTNAME>",
    "port": <PORT>
  }
}
```
