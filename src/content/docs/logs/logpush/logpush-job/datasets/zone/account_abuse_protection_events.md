---
# Code generator. DO NOT EDIT.

title: Account Abuse Protection Events
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `account_abuse_protection_events`.

## AuthenticationIdentityProvider

Type: `string`

The identity provider used for login authentication. Only populated for login events. <br />Possible values are <em>unknown</em> \| <em>other</em> \| <em>selfHosted</em> \| <em>amazon</em> \| <em>apple</em> \| <em>discord</em> \| <em>facebook</em> \| <em>github</em> \| <em>linkedin</em> \| <em>microsoft</em>.

## AuthenticationMethod

Type: `string`

The authentication method used for login. Only populated for login events. <br />Possible values are <em>unknown</em> \| <em>password</em> \| <em>sso</em> \| <em>magicLink</em> \| <em>biometric</em> \| <em>passkey</em>.

## AuthenticationStatus

Type: `string`

The outcome of a login attempt. Only populated for login events. <br />Possible values are <em>unknown</em> \| <em>other</em> \| <em>success</em> \| <em>failureOther</em> \| <em>failureUserNotFound</em> \| <em>failureIncorrectPassword</em> \| <em>failureAccountLocked</em> \| <em>pendingMfa</em>.

## BotScore

Type: `int`

Cloudflare Bot Management score. Values from 1 (likely bot) to 99 (likely human).

## ClientASN

Type: `int`

Client AS number.

## ClientCity

Type: `string`

Approximate city of the client.

## ClientCountry

Type: `string`

2-letter ISO-3166 country code of the client IP address.

## ClientIP

Type: `string`

IP address of the client.

## Email

Type: `string`

The email address associated with the event.

## EphemeralID

Type: `string`

The Turnstile ephemeral device identifier, hex-encoded.

## EventSource

Type: `string`

The source of the Account Abuse Protection event. <br />Possible values are <em>cdn</em> \| <em>api</em>.

## EventType

Type: `string`

The type of user action. <br />Possible values are <em>login</em> \| <em>logout</em> \| <em>signup</em> \| <em>warpEnrollment</em> \| <em>profileUpdate</em> \| <em>transaction</em> \| <em>unknown</em> \| <em>passwordReset</em> \| <em>addPaymentMethod</em>.

## FraudEmailRisk

Type: `string`

Risk level of the email address. <br />Possible values are <em>Unknown</em> \| <em>Low</em> \| <em>Medium</em> \| <em>High</em>.

## Host

Type: `string`

The HTTP hostname requested by the visitor.

## JA4

Type: `string`

The JA4 TLS client fingerprint.

## RayID

Type: `string`

The RayID of the request.

## Timestamp

Type: `int or string`

The date and time the event occurred. To specify the timestamp format, refer to [Output types](/logs/logpush/logpush-job/log-output-options/#output-types).

## UserAgent

Type: `string`

The user-agent string of the visitor.

## UserID

Type: `string`

A zone-unique identifier for the user, hex-encoded. Derived from the external user identifier provided during event submission.
