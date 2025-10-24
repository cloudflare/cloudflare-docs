---
# Code generator. DO NOT EDIT.

title: Sinkhole HTTP Logs
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `sinkhole_http_logs`.

## AccountID

Type: `string`

The Account ID.

## Body

Type: `string`

The request body.

## BodyLength

Type: `int`

The length of request body.

## DestAddr

Type: `string`

The destination IP address of the request.

## Headers

Type: `string`

The request headers. If a header has multiple values, the values are comma separated. Each header is separated by the escaped newline character (\n).

## Host

Type: `string`

The host the request was sent to.

## Method

Type: `string`

The request method.

## Password

Type: `string`

The request password.

## R2Path

Type: `string`

The path to the object within the R2 bucket linked to this sinkhole that stores overflow body and header data. Blank if neither headers nor body was larger than 256 bytes.

## Referrer

Type: `string`

The referrer of the request.

## SinkholeID

Type: `string`

The ID of the Sinkhole that logged the HTTP Request.

## SrcAddr

Type: `string`

The sender's IP address.

## Timestamp

Type: `int or string`

The date and time the sinkhole HTTP request was logged.

## URI

Type: `string`

The request Uniform Resource Identifier.

## URL

Type: `string`

The request Uniform Resource Locator.

## UserAgent

Type: `string`

The request user agent.

## Username

Type: `string`

The request username.
