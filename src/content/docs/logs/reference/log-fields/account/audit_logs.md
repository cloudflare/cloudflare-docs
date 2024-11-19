---
# Code generator. DO NOT EDIT.

title: Audit logs
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `audit_logs`.

## ActionResult

Type: `bool`

Whether the action was successful.

## ActionType

Type: `string`

Type of action taken.

## ActorEmail

Type: `string`

Email of the actor.

## ActorID

Type: `string`

Unique identifier of the actor in Cloudflare's system.

## ActorIP

Type: `string`

Physical network address of the actor.

## ActorType

Type: `string`

Type of user that started the audit trail.

## ID

Type: `string`

Unique identifier of an audit log.

## Interface

Type: `string`

Entry point or interface of the audit log.

## Metadata

Type: `object`

Additional audit log-specific information. Metadata is organized in key:value pairs. Key and Value formats can vary by ResourceType.

## NewValue

Type: `object`

Contains the new value for the audited item.

## OldValue

Type: `object`

Contains the old value for the audited item.

## OwnerID

Type: `string`

The identifier of the user that was acting or was acted on behalf of. If a user did the action themselves, this value will be the same as the ActorID.

## ResourceID

Type: `string`

Unique identifier of the resource within Cloudflare's system.

## ResourceType

Type: `string`

The type of resource that was changed.

## When

Type: `int or string`

When the change happened.
