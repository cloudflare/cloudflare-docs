---
# Code generator. DO NOT EDIT.

title: Page Shield events
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `page_shield_events`.

## Action

Type: `string`

The action which was taken against the violation. <br />Possible values are <em>log</em> \| <em>allow</em>.

## CSPDirective

Type: `string`

The violated directive in the report.

## Host

Type: `string`

The host where the resource was seen on.

## PageURL

Type: `string`

The page URL the violation was seen on.

## PolicyID

Type: `string`

The ID of the policy which was violated.

## ResourceType

Type: `string`

The resource type of the violated directive. Possible values are 'script', 'connection' or 'other' for unmonitored resource types

## Timestamp

Type: `int or string`

The timestamp of when the report was received.

## URL

Type: `string`

The resource URL.

## URLContainsCDNCGIPath (deprecated)

Type: `bool`

Whether the resource URL contains the CDN-CGI path.

## URLHost

Type: `string`

The domain host of the URL.
