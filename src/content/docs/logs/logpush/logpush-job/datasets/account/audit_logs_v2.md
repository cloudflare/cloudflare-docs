---
# Code generator. DO NOT EDIT.

title: Audit Logs V2
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `audit_logs_v2`.

## AccountID

Type: `string`

The Cloudflare account ID.

## AccountName

Type: `string`

The Cloudflare account name.

## ActionDescription

Type: `string`

Description of action taken.

## ActionResult

Type: `string`

Whether the action was successful.

## ActionTimestamp

Type: `int or string`

When the change happened.

## ActionType

Type: `string`

Type of action taken.

## ActorContext

Type: `string`

Context of the actor.

## ActorEmail

Type: `string`

Email of the actor.

## ActorID

Type: `string`

Unique identifier of the actor in Cloudflare's system.

## ActorIPAddress

Type: `string`

Physical network address of the actor.

## ActorTokenDetails

Type: `object`

Details of how the actor is authenticated.

## ActorType

Type: `string`

Type of user that started the audit trail.

## AuditLogID

Type: `string`

Unique identifier of an audit log.

## Raw

Type: `object`

Raw data.

## ResourceID

Type: `string`

Unique identifier of the resource within Cloudflare's system.

## ResourceProduct

Type: `string`

Resource product.

## ResourceRequest

Type: `object`

Resource request.

## ResourceResponse

Type: `object`

Resource response.

## ResourceScope

Type: `string`

Resource scope.

## ResourceType

Type: `string`

The type of resource that was changed.

## ResourceValue

Type: `object`

Resource value.

## ZoneID

Type: `string`

The Cloudflare zone ID.

## ZoneName

Type: `string`

The Cloudflare zone name.
