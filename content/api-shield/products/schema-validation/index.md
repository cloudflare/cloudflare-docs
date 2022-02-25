---
pcx-content-type: concept
title: Schema Validation
weight: 5
---

# Schema Validation

An API schema defines which API requests are valid based on several request properties like target endpoint and HTTP method.

Schema Validation allows you to check if incoming traffic complies with a previously supplied API schema. When you provide an API schema, API Shield creates rules for incoming traffic from the schema definitions. These rules define which traffic is allowed and which traffic gets logged or blocked.

For help configuring Schema Validation for one or more hosts using the dashboard, refer to [Configure Schema Validation](/api-shield/configure/).

<Aside type='note'>

This feature is only available for customers on an Enterprise plan. Contact your Cloudflare Customer Success Manager to get access.

</Aside>

## Operation IDs

Cloudflare Schema Validation requires unique Operation IDs for each endpoint and method pair defined in the schema. If there are Operation IDs missing, the schema will be rejected. Operation ID is used to keep track of changes to the same endpoints when updating schemas, and also to label logs in Firewall Events with the right endpoint and method. Cloudflare supports Operation IDs with a maximum size of 32 characters.

## Specifications

API Shield supports API schemas using OpenAPI Specification v3.

The accepted file formats are YAML (`.yml` or `.yaml` file extension) and JSON (`.json` file extension).

## Limitations

Currently, API Shield cannot validate some features of API schemas, including the following: request body validations, all responses, external references, non-basic path templating, or unique items.

Regular expression support is a paid add-on in the Enterprise plan.
