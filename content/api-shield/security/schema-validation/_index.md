---
pcx_content_type: concept
title: Schema Validation
weight: 5
---

# Schema Validation

An API schema defines which API requests are valid based on several request properties like target endpoint and HTTP method.

Schema Validation allows you to check if incoming traffic complies with a previously supplied API schema. When you provide an API schema, API Shield creates rules for incoming traffic from the schema definitions. These rules define which traffic is allowed and which traffic gets logged or blocked.

For help configuring Schema Validation for one or more hosts using the dashboard, refer to [Configure Schema Validation](/api-shield/security/schema-validation/configure/).

## Operation IDs

For more control with Schema Validation, include unique Operations IDs for each endpoint and method pair defined in the schema. Cloudflare supports Operation IDs with a maximum size of 32 characters.

These IDs are used to keep track of changes to the same endpoints when updating schemas and also to label logs in Firewall Events with the right endpoint and method

If an Operation ID is missing, Cloudflare will generate one from the method and path.

## Specifications

API Shield supports API schemas using OpenAPI Specification v3.

The accepted file formats are YAML (`.yml` or `.yaml` file extension) and JSON (`.json` file extension).

## Limitations

Currently, API Shield cannot validate some features of API schemas, including the following: all responses, external references, non-basic path templating, or unique items.

Regular expression support is a paid add-on in the Enterprise plan.

## Availability

Schema Validation is only available for Enterprise customers. If you are interested in using this product, contact your account team.
