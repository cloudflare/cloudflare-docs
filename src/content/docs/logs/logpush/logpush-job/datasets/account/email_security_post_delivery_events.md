---
# Code generator. DO NOT EDIT.

title: Email Security Post-Delivery Events
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `email_security_post_delivery_events`.

## AlertID

Type: `string`

Email Security alert ID for the original message.

## CompletedAt

Type: `int or string`

The timestamp when the post-delivery action completed. To specify the timestamp format, refer to [Output types](/logs/logpush/logpush-job/log-output-options/#output-types).

## Destination

Type: `string`

Target folder for MOVE operations (for example, 'RecoverableItemsPurges').

## FinalDisposition

Type: `string`

Threat disposition of the original message. <br />Possible values are <em>unset</em> \| <em>none</em> \| <em>malicious</em> \| <em>suspicious</em> \| <em>spam</em> \| <em>spoof</em> \| <em>bulk</em>.

## Folder

Type: `string`

Resolved folder name after a successful MOVE.

## From

Type: `string`

From header address of the original message (for example, 'firstlast@cloudflare.com').

## FromName

Type: `string`

From header display name of the original message (for example, 'First Last').

## MessageID

Type: `string`

RFC Message-ID header of the original message.

## MessageTimestamp

Type: `int or string`

The timestamp of the original message. To specify the timestamp format, refer to [Output types](/logs/logpush/logpush-job/log-output-options/#output-types).

## MicrosoftTenantID

Type: `string`

Microsoft 365 tenant identifier.

## Operation

Type: `string`

Post-delivery action type. <br />Possible values are <em>move</em> \| <em>submission</em> \| <em>quarantineRelease</em>.

## PostfixID

Type: `string`

Email Security postfix queue identifier for the original message.

## Reasons

Type: `array[string]`

Detection findings that prompted the post-delivery action (for example, 'Malicious URL').

## Recipient

Type: `string`

Email address of the targeted mailbox (for example, 'firstlast@cloudflare.com').

## RequestedAt

Type: `int or string`

The timestamp when the post-delivery action was requested. To specify the timestamp format, refer to [Output types](/logs/logpush/logpush-job/log-output-options/#output-types).

## RequestedBy

Type: `string`

Identity that requested the post-delivery action; expected format is an email address.

## RequestedDisposition

Type: `string`

Requested disposition for SUBMISSION operations.

## Status

Type: `string`

Status message returned by the post-delivery provider (for example, 'OK').

## Subject

Type: `string`

Subject header of the original message.

## Success

Type: `bool`

Whether the post-delivery action succeeded.

## To

Type: `array[string]`

Recipient addresses of the original message (for example, 'firstlast@cloudflare.com').
