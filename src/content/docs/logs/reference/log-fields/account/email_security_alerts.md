---
# Code generator. DO NOT EDIT.

title: Email Security Alerts
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `email_security_alerts`.

## AlertID

Type: `string`

The canonical ID for an Email Security Alert (for example, '4WtWkr6nlBz9sNH-2024-08-28T15:32:35').

## AlertReasons

Type: `array[string]`

Human-readable list of findings which contributed to this message's final disposition.

## Attachments

Type: `array[object]`

List of objects containing metadata of attachments contained in this message (for example, [{"Md5": "91f073bd208689ddbd248e8989ecae90", "Sha1": "62b77e14e2c43049c45b5725018e78d0f9986930", "Sha256": "3b57505305e7162141fd898ed87d08f92fc42579b5047495859e56b3275a6c06", "Ssdeep": "McAQ8tPlH25e85Q2OiYpD08NvHmjJ97UfPMO47sekO:uN9M553OiiN/OJ9MM+e3", "Name": "attachment.gif", "ContentTypeProvided": "image/gif", "ContentTypeComputed": "application/x-msi", "Encrypted": true, "Decrypted": true]}, ...]).

## CC

Type: `array[string]`

Email address portions of the CC header provided by the sender (for example, 'firstlast@cloudflare.com').

## CCName

Type: `array[string]`

Email address portions of the CC header provided by the sender (for example, 'First Last').

## FinalDisposition

Type: `string`

Final disposition attributed to the message. <br />Possible values are <em>unset</em> \| <em>malicious</em> \| <em>suspicious</em> \| <em>spoof</em> \| <em>spam</em> \| <em>bulk</em>.

## From

Type: `string`

Email address portion of the From header provided by the sender (for example, 'firstlast@cloudflare.com').

## FromName

Type: `string`

Name portion of the From header provided by the sender (for example, 'First Last').

## Links

Type: `array[string]`

List of links detected in this message, benign or otherwise; limited to 100 in total.

## MessageDeliveryMode

Type: `string`

The message's mode of transport to Email Security. <br />Possible values are <em>unset</em> \| <em>api</em> \| <em>direct</em> \| <em>bcc</em> \| <em>journal</em> \| <em>retroScan</em>.

## MessageID

Type: `string`

Value of the Message-ID header provided by the sender.

## Origin

Type: `string`

The origin of the message. <br />Possible values are <em>unset</em> \| <em>internal</em> \| <em>external</em> \| <em>secondPartyInternal</em> \| <em>thirdPartyInternal</em> \| <em>outbound</em>.

## OriginalSender

Type: `string`

The original sender address as determined by Email Security mail processing (for example, 'firstlast@cloudflare.com').

## ReplyTo

Type: `string`

Email address portion of the Reply-To header provided by the sender (for example, 'firstlast@cloudflare.com').

## ReplyToName

Type: `string`

Name portion of the Reply-To header provided by the sender (for example, 'First Last').

## SMTPEnvelopeFrom

Type: `string`

Value of the SMTP MAIL FROM command provided by the sender (for example, 'First Last <firstlast@cloudflare.com>').

## SMTPEnvelopeTo

Type: `array[string]`

Values of the SMTP RCPT TO command provided by the sender (for example, 'First Last <firstlast@cloudflare.com>').

## SMTPHeloServerIP

Type: `string`

IPv4/v6 of the SMTP HELO server.

## SMTPHeloServerIPAsName

Type: `string`

Autonomous System Name of the SMTP HELO server's IP.

## SMTPHeloServerIPAsNumber

Type: `string`

Autonomous System Number of the SMTP HELO server's IP.

## SMTPHeloServerIPGeo

Type: `string`

SMTP HELO server geolocation info (for example, 'US/NV/Las Vegas').

## SMTPHeloServerName

Type: `string`

Hostname provided by the SMTP HELO server.

## Subject

Type: `string`

Value of the Subject header provided by the sender.

## ThreatCategories

Type: `array[string]`

Threat categories attributed by Email Security processing (for example, 'CredentialHarvester', 'Dropper').

## Timestamp

Type: `int or string`

Start time of message processing (for example, '2024-08-28T15:32:35Z'). To specify the timestamp format, refer to [Output types](/logs/reference/log-output-options/#output-types).

## To

Type: `array[string]`

Email address portions of the To header provided by the sender (for example, 'firstlast@cloudflare.com').

## ToName

Type: `array[string]`

Name portions of the To header provided by the sender (for example, 'First Last').
