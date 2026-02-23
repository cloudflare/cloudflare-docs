---
# Code generator. DO NOT EDIT.

title: CASB Findings
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `casb_findings`.

## AssetDisplayName

Type: `string`

Asset display name (for example, 'My File Name.docx').

## AssetExternalID

Type: `string`

Unique identifier for an asset of this type. Format will vary by policy vendor.

## AssetLink

Type: `string`

URL to the asset. This may not be available for some policy vendors and asset types.

## AssetMetadata

Type: `object`

Metadata associated with the asset. Structure will vary by policy vendor.

## DetectedTimestamp

Type: `int or string`

Date and time the finding was first identified (for example, '2021-07-27T00:01:07Z').

## FindingTypeDisplayName

Type: `string`

Human-readable name of the finding type (for example, 'File Publicly Accessible Read Only').

## FindingTypeID

Type: `string`

UUID of the finding type in Cloudflare's system.

## FindingTypeSeverity

Type: `string`

Severity of the finding type (for example, 'High').

## InstanceID

Type: `string`

UUID of the finding in Cloudflare's system.

## IntegrationDisplayName

Type: `string`

Human-readable name of the integration (for example, 'My Google Workspace Integration').

## IntegrationID

Type: `string`

UUID of the integration in Cloudflare's system.

## IntegrationPolicyVendor

Type: `string`

Human-readable vendor name of the integration's policy (for example, 'Google Workspace Standard Policy').
