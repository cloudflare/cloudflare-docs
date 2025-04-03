---
# Code generator. DO NOT EDIT.

title: Device posture results
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `device_posture_results`.

## ClientVersion

Type: `string`

The Zero Trust client version at the time of upload.

## DeviceID

Type: `string`

The device ID that performed the posture upload.

## DeviceManufacturer

Type: `string`

The manufacturer of the device that the Zero Trust client is running on.

## DeviceModel

Type: `string`

The model of the device that the Zero Trust client is running on.

## DeviceName

Type: `string`

The name of the device that the Zero Trust client is running on.

## DeviceSerialNumber

Type: `string`

The serial number of the device that the Zero Trust client is running on.

## DeviceType

Type: `string`

The Zero Trust client operating system type.

## Email

Type: `string`

The email used to register the device with the Zero Trust client.

## OSVersion

Type: `string`

The operating system version at the time of upload.

## PolicyID

Type: `string`

The posture check ID associated with this device posture result.

## PostureCheckName

Type: `string`

The name of the posture check associated with this device posture result.

## PostureCheckType

Type: `string`

The type of the Zero Trust client check or service provider check.

## PostureEvaluatedResult

Type: `bool`

Whether this posture upload passes the associated posture check, given the requirements posture check at the time of the timestamp.

## PostureExpectedJSON

Type: `object`

JSON object of what the posture check expects from the Zero Trust client.

## PostureReceivedJSON

Type: `object`

JSON object of what the Zero Trust client actually uploads.

## RegistrationID

Type: `string`

The UUID of the device registration associated with this posture result.

## Timestamp

Type: `int or string`

The date and time the corresponding device posture upload was performed (for example, '2021-07-27T00:01:07Z'). To specify the timestamp format, refer to [Output types](/logs/reference/log-output-options/#output-types).

## UserUID

Type: `string`

The uid of the user who registered the device.
