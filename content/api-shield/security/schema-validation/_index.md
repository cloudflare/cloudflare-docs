---
pcx_content_type: concept
title: Schema Validation
weight: 5
---

# Schema Validation

An API schema defines which API requests are valid based on several request properties like target endpoint and HTTP method.

Schema Validation allows you to check if incoming traffic complies with a previously supplied API schema. When you provide an API schema, API Shield creates rules for incoming traffic from the schema definitions. These rules define which traffic is allowed and which traffic gets logged or blocked.

For help configuring Schema Validation for one or more hosts using the dashboard, refer to [Configure Classic Schema Validation](/api-shield/reference/classic-schema-validation/).

## Operation IDs

If an Operation ID is missing, Cloudflare will generate one from the method and path.

## Specifications

The accepted file formats are YAML (`.yml` or `.yaml` file extension) and JSON (`.json` file extension).

## Limitations

Currently, API Shield cannot validate some features of API schemas, including the following: all responses, external references, non-basic path templating, or unique items.

There is a limit of 1000 total operations for enabled schemas. We will raise this limit in the near future.

Schema Validation 2.0 is only available via API. Changes will not reflect in the Cloudflare dashboard until a future release.

## Body inspection

API Shield has the ability to identify body specifications in uploaded schemas and validate the data of incoming API requests.

The supported content-type format is `application/json`. The code must validate that no other content media ranges are uploaded. 

`*/*`, `application/*`, and `application/json` media-ranges are valid. We will also only accept the `charset` parameter with a static value of `utf-8`.

## Availability

Schema Validation is only available for Enterprise customers. If you are interested in using this feature, contact your account team.
