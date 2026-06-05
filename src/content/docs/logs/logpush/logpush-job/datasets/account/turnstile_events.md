---
# Code generator. DO NOT EDIT.

title: Turnstile Events
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `turnstile_events`.

## ASN

Type: `int`

The visitor's autonomous system number (ASN).

## Action

Type: `string`

The Turnstile widget action string configured by the customer.

## BrowserMajor

Type: `int`

The major version of the visitor's browser.

## BrowserName

Type: `string`

The name of the visitor's browser (for example, 'Chrome', 'Firefox').

## ClientIP

Type: `string`

IP address of the visitor.

## CountryCode

Type: `string`

The 2-letter ISO-3166 country code of the visitor.

## EventType

Type: `string`

The type of Turnstile event. Possible values are <em>challenge_issued</em> \| <em>challenge_non_interactive_solved</em> \| <em>challenge_interactive_solved</em> \| <em>challenge_non_interactive_siteverify_solved</em> \| <em>challenge_interactive_siteverify_solved</em> \| <em>challenge_clearance_siteverify_solved</em> \| <em>challenge_siteverify_failed_double_redemption</em> \| <em>challenge_siteverify_failed_invalid_token</em> \| <em>challenge_siteverify_failed_other</em> \| <em>challenge_siteverify_ratelimited</em>.

## Hostname

Type: `string`

The hostname where the Turnstile widget was loaded.

## OSMajor

Type: `int`

The major version of the visitor's operating system.

## OSName

Type: `string`

The name of the visitor's operating system (for example, 'Windows', 'macOS').

## Sitekey

Type: `string`

The Turnstile sitekey (widget identifier).

## Timestamp

Type: `int or string`

The date and time the event was logged.

## UserAgent

Type: `string`

The visitor's full user agent string.
