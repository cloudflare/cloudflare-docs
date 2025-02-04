---
# Code generator. DO NOT EDIT.

title: NEL reports
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `nel_reports`.

## ClientIPASN

Type: `int`

Client ASN.

## ClientIPASNDescription

Type: `string`

Client ASN description.

## ClientIPCountry

Type: `string`

Client country.

## LastKnownGoodColoCode

Type: `string`

IATA airport code of colo client connected to.

## Phase

Type: `string`

The phase of connection the error occurred in; <em>dns</em> \| <em>connection</em> \| <em>application</em> \| <em>unknown</em>.

## Timestamp

Type: `int or string`

Timestamp for error report.

## Type

Type: `string`

The type of error in the phase.
