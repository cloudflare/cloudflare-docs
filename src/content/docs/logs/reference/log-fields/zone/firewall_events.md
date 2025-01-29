---
# Code generator. DO NOT EDIT.

title: Firewall events
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `firewall_events`.

## Action

Type: `string`

The code of the first-class action the Cloudflare Firewall took on this request. <br />Possible actions are <em>unknown</em> \| <em>allow</em> \| <em>block</em> \| <em>challenge</em> \| <em>jschallenge</em> \| <em>log</em> \| <em>connectionclose</em> \| <em>challengesolved</em> \| <em>challengebypassed</em> \| <em>jschallengesolved</em> \| <em>jschallengebypassed</em> \| <em>bypass</em> \| <em>managedchallenge</em> \| <em>managedchallengenoninteractivesolved</em> \| <em>managedchallengeinteractivesolved</em> \| <em>managedchallengebypassed</em>.

## ClientASN

Type: `int`

The ASN number of the visitor.

## ClientASNDescription

Type: `string`

The ASN of the visitor as string.

## ClientCountry

Type: `string`

Country from which request originated.

## ClientIP

Type: `string`

The visitor's IP address (IPv4 or IPv6).

## ClientIPClass

Type: `string`

The classification of the visitor's IP address, possible values are: <em>unknown</em> \| <em>badHost</em> \| <em>searchEngine</em> \| <em>allowlist</em> \| <em>monitoringService</em> \| <em>noRecord</em> \| <em>scan</em> \| <em>tor</em>.

## ClientRefererHost

Type: `string`

The referer host.

## ClientRefererPath

Type: `string`

The referer path requested by visitor.

## ClientRefererQuery

Type: `string`

The referer query-string was requested by the visitor.

## ClientRefererScheme

Type: `string`

The referer URL scheme requested by the visitor.

## ClientRequestHost

Type: `string`

The HTTP hostname requested by the visitor.

## ClientRequestMethod

Type: `string`

The HTTP method used by the visitor.

## ClientRequestPath

Type: `string`

The path requested by visitor.

## ClientRequestProtocol

Type: `string`

The version of HTTP protocol requested by the visitor.

## ClientRequestQuery

Type: `string`

The query-string was requested by the visitor.

## ClientRequestScheme

Type: `string`

The URL scheme requested by the visitor.

## ClientRequestUserAgent

Type: `string`

Visitor's user-agent string.

## ContentScanObjResults

Type: `array[string]`

List of content scan results.

## ContentScanObjSizes

Type: `array[int]`

List of content object sizes.

## ContentScanObjTypes

Type: `array[string]`

List of content types.

## Datetime

Type: `int or string`

The date and time the event occurred at the edge.

## Description

Type: `string`

The description of the rule triggered by this request.

## EdgeColoCode

Type: `string`

The airport code of the Cloudflare datacenter that served this request.

## EdgeResponseStatus

Type: `int`

HTTP response status code returned to browser.

## Kind

Type: `string`

The kind of event, currently only possible values are: <em>firewall</em>.

## LeakedCredentialCheckResult

Type: `string`

Result of the check for [leaked credentials](/waf/detections/leaked-credentials/). <br />Possible results are: <em>password_leaked</em> \| <em>username_and_password_leaked</em> \| <em>username_password_similar</em> \| <em>username_leaked</em> \| <em>clean</em>.

## MatchIndex

Type: `int`

Rules match index in the chain. The last matching rule will have MatchIndex <em>0</em>. If another rule matched before the last one, it will have MatchIndex <em>1</em>. The same applies to any other matching rules, which will have a MatchIndex value of <em>2</em>, <em>3</em>, and so on.

## Metadata

Type: `object`

Additional product-specific information. Metadata is organized in key:value pairs. Key and Value formats can vary by Cloudflare security product and can change over time.

## OriginResponseStatus

Type: `int`

HTTP origin response status code returned to browser.

## OriginatorRayID

Type: `string`

The RayID of the request that issued the challenge/jschallenge.

## RayID

Type: `string`

The RayID of the request.

## Ref

Type: `string`

The user-defined identifier for the rule triggered by this request. Use refs to label your rules individually alongside the Cloudflare-provided RuleID. You can set refs via the [Rulesets API](/ruleset-engine/rulesets-api/) for some security products.

## RuleID

Type: `string`

The Cloudflare security product-specific RuleID triggered by this request.

## Source

Type: `string`

The Cloudflare security product triggered by this request. <br />Possible sources are <em>unknown</em> \| <em>asn</em> \| <em>country</em> \| <em>ip</em> \| <em>iprange</em> \| <em>securitylevel</em> \| <em>zonelockdown</em> \| <em>waf</em> \| <em>firewallrules</em> \| <em>uablock</em> \| <em>ratelimit</em> \| <em>bic</em> \| <em>hot</em> \| <em>l7ddos</em> \| <em>validation</em> \| <em>botfight</em> \| <em>apishield</em> \| <em>botmanagement</em> \| <em>dlp</em> \| <em>firewallmanaged</em> \| <em>firewallcustom</em> \| <em>apishieldschemavalidation</em> \| <em>apishieldtokenvalidation</em> \| <em>apishieldsequencemitigation</em>.
