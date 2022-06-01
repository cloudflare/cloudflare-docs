---
title: API parameter reference
pcx-content-type: reference
weight: 6
meta:
  title: Origin Rules API parameter reference
---

# API parameter reference

Create [different overrides](/rules/origin-rules/features/) by including different action parameters in the `action_parameters` field:

*   Define the `host_header` parameter to override the HTTP `Host` header of incoming requests.
*   Define the `origin` object to override the URL and/or port of incoming requests.

## Host header override parameters

The full syntax of the `action_parameters` field for overriding the HTTP `Host` header is the following:

```json
"action_parameters": {
  "host_header": "<HOST_HEADER_VALUE>"
}
```

## URL and port override parameters

The full syntax of the `action_parameters` field for overriding both the URL and the port of incoming requests is the following:

```json
"action_parameters": {
  "origin": {
    "host": "<HOST_NAME>",
    "port": <PORT>
  }
}
```

If you are only overriding the host name or the port, omit the `port` or `host` parameter, respectively.

## Different origin overrides in the same rule

The same rule can have different types of origin overrides. For example, a single rule can perform an HTTP `Host` header override and a destination port override. The syntax of such a rule would be the following:

```json
"action_parameters": {
  "host_header": "<HOST_HEADER_VALUE>",
  "origin": {
    "host": "<HOST_NAME>",
    "port": <PORT>
  }
}
```
