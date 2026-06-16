---
# Code generator. DO NOT EDIT.

title: MCP Portal Logs
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `mcp_portal_logs`.

## ClientCountry

Type: `string`

Country code of the client IP address.

## ClientIP

Type: `string`

IP address of the client that initiated the request.

## ColoCode

Type: `string`

Colo code of the data center that processed the request (for example, 'DFW').

## Datetime

Type: `int or string`

The date and time the request was made.

## Error

Type: `string`

The error message if the request failed and there is additional information.

## Method

Type: `string`

The JSON-RPC method of the request (for example, 'tools/call', 'prompts/get', 'resources/read').

## PortalAUD

Type: `string`

Audience tag of the MCP Portal.

## PortalID

Type: `string`

Unique identifier of the MCP Portal.

## PromptGetName

Type: `string`

For prompts/get requests, the name of the prompt being fetched.

## ResourceReadURI

Type: `string`

For resources/read requests, the URI of the resource being fetched.

## ServerAUD

Type: `string`

Audience tag of the upstream MCP Server.

## ServerID

Type: `string`

Unique identifier of the upstream MCP Server.

## ServerResponseDurationMs

Type: `int`

The time in milliseconds it took for the upstream MCP server to respond.

## ServerURL

Type: `string`

URL of the upstream MCP Server.

## SessionID

Type: `string`

Unique identifier of the stateful MCP session associated with the request.

## Success

Type: `bool`

If the request succeeded.

## ToolCallName

Type: `string`

For tools/call requests, the name of the tool being called.

## UserEmail

Type: `string`

Email address of the authenticated user who performed the request.

## UserID

Type: `string`

Unique identifier of the authenticated user who performed the request.
