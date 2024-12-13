---
# Code generator. DO NOT EDIT.

title: Magic IDS Detections
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `magic_ids_detections`.

## Action

Type: `string`

What action was taken on the packet. Possible values are <em>pass</em> \| <em>block</em>.

## ColoCity

Type: `string`

The city where the detection occurred.

## ColoCode

Type: `string`

The IATA airport code corresponding to where the detection occurred.

## DestinationIP

Type: `string`

The destination IP of the packet which triggered the detection.

## DestinationPort

Type: `int`

The destination port of the packet which triggered the detection. It is set to 0 if the protocol field is set to <em>any</em>.

## Protocol

Type: `string`

The layer 4 protocol of the packet which triggered the detection. Possible values are <em>tcp</em> \| <em>udp</em> \| <em>any</em>. Variant <em>any</em> means a detection occurred at a lower layer (such as IP).

## SignatureID

Type: `int`

The signature ID of the detection.

## SignatureMessage

Type: `string`

The signature message of the detection. Describes what the packet is attempting to do.

## SignatureRevision

Type: `int`

The signature revision of the detection.

## SourceIP

Type: `string`

The source IP of packet which triggered the detection.

## SourcePort

Type: `int`

The source port of the packet which triggered the detection. It is set to 0 if the protocol field is set to <em>any</em>.

## Timestamp

Type: `int or string`

A timestamp of when the detection occurred.
