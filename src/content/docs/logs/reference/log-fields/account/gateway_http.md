---
# Code generator. DO NOT EDIT.

title: Gateway HTTP
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `gateway_http`.

## AccountID

Type: `string`

Cloudflare account tag.

## Action

Type: `string`

Action performed by gateway on the HTTP request.

## ApplicationIDs

Type: `array[int]`

IDs of the applications that matched the HTTP request parameters.

## ApplicationNames

Type: `array[string]`

Names of the applications that matched the HTTP request parameters.

## BlockedFileHash

Type: `string`

Hash of the file blocked in the response, if any.

## BlockedFileName

Type: `string`

File name blocked in the request, if any.

## BlockedFileReason

Type: `string`

Reason file was blocked in the response, if any.

## BlockedFileSize

Type: `int`

File size(bytes) blocked in the response, if any.

## BlockedFileType

Type: `string`

File type blocked in the response eg. exe, bin, if any.

## CategoryIDs

Type: `array[int]`

IDs of the categories that matched the HTTP request parameters.

## CategoryNames

Type: `array[string]`

Names of the categories that matched the HTTP request parameters.

## Datetime

Type: `int or string`

The date and time the corresponding HTTP request was made.

## DestinationIP

Type: `string`

Destination ip of the request.

## DestinationIPContinentCode

Type: `string`

Continent code of the destination IP of the HTTP request (for example, 'NA').

## DestinationIPCountryCode

Type: `string`

Country code of the destination IP of the HTTP request (for example, 'US').

## DestinationPort

Type: `int`

Destination port of the request.

## DeviceID

Type: `string`

UUID of the device where the HTTP request originated from.

## DeviceName

Type: `string`

The name of the device where the HTTP request originated from (for example, 'Laptop MB810').

## DownloadMatchedDlpProfileEntries

Type: `array[string]`

List of matched DLP entries in the HTTP request.

## DownloadMatchedDlpProfiles

Type: `array[string]`

List of matched DLP profiles in the HTTP request.

## DownloadedFileNames

Type: `array[string]`

List of files downloaded in the HTTP request.

## Email

Type: `string`

Email used to authenticate the client.

## FileInfo

Type: `object`

Information about files detected within the HTTP request.

## ForensicCopyStatus

Type: `string`

Status of any associated forensic copies that may have been captured during the request.

## HTTPHost

Type: `string`

Content of the host header in the HTTP request.

## HTTPMethod

Type: `string`

HTTP request method.

## HTTPStatusCode

Type: `int`

HTTP status code gateway returned to the user. Zero if nothing was returned (for example, client disconnected).

## HTTPVersion

Type: `string`

Version name for the HTTP request.

## IsIsolated

Type: `bool`

If the requested was isolated with Cloudflare Browser Isolation or not.

## PolicyID

Type: `string`

The gateway policy UUID applied to the request, if any.

## PolicyName

Type: `string`

The name of the gateway policy applied to the request, if any.

## PrivateAppAUD

Type: `string`

The private app AUD, if any.

## ProxyEndpoint

Type: ``



## Quarantined

Type: `bool`

If the request content was quarantined.

## Referer

Type: `string`

Contents of the referer header in the HTTP request.

## RequestID

Type: `string`

Cloudflare request ID. This might be empty on bypass action.

## SessionID

Type: `string`

Network session ID.

## SourceIP

Type: `string`

Source ip of the request.

## SourceIPContinentCode

Type: `string`

Continent code of the source IP of the request (for example, 'NA').

## SourceIPCountryCode

Type: `string`

Country code of the source IP of the request (for example, 'US').

## SourceInternalIP

Type: `string`

Local LAN IP of the device. Only available when connected via a GRE/IPsec tunnel on-ramp.

## SourcePort

Type: `int`

Source port of the request.

## URL

Type: `string`

HTTP request URL.

## UntrustedCertificateAction

Type: `string`

Action taken when an untrusted origin certificate error occurs (for example, expired certificate, mismatched common name, invalid certificate chain, signed by non-public CA). One of <em>none</em> \| <em>block</em> \| <em>error</em> \| <em>passThrough</em>.

## UploadMatchedDlpProfileEntries

Type: `array[string]`

List of matched DLP entries in the HTTP request.

## UploadMatchedDlpProfiles

Type: `array[string]`

List of matched DLP profiles in the HTTP request.

## UploadedFileNames

Type: `array[string]`

List of files uploaded in the HTTP request.

## UserAgent

Type: `string`

Contents of the user agent header in the HTTP request.

## UserID

Type: `string`

User identity where the HTTP request originated from.

## VirtualNetworkID

Type: `string`

The identifier of the virtual network the device was connected to, if any.

## VirtualNetworkName

Type: `string`

The name of the virtual network the device was connected to, if any.
