---
pcx_content_type: concept
title: Overview

---

# Overview

## Purpose

The purpose of a landing page is to welcome users and provide an overview of the product.

## Tone

Accessible, welcoming, conversational, outspoken

## content_type

overview

## Structure

### Required components

**Metadata title**: Overview

**Title**: Name of the product, group of products, or conceptual content area. H1. Usually a noun. Don't add "documentation" to the title. Do not use gerund phrases.

**Intro/overview**: Brief welcoming introductory content. May be combined with product description.

**Product description**: What does this product do? Why would you use it?

**Product availability**: What plan(s) is this available to? Review [available plan types](https://github.com/cloudflare/cloudflare-docs/blob/production/layouts/shortcodes/plan.html#L1).

**Product attributes**: What's included with this product? (Specific actions, protections, etc)

### Optional components

**Features**: A few main features specific to product. Includes a link to relevant documentation on feature.

**Related products**: Links to docs for products used or configured together with current product.

**More resources**: External links to related resources, such as plans, pricing. Don't duplicate the information from the footer. Also, if the product is free to use or there aren't any useful links, feel free to skip this section. Review [available icons in the source code](https://github.com/cloudflare/cloudflare-docs/tree/production/static/icons/resources).

**Visual**: Graphic or image that enhances the landing page. Should be something relatively static that won't require much (if any) updating in the future.

**Integration information**

## Template

```
---
title: Overview
weight: xx
layout: overview
pcx_content_type: overview
---
 
# Cloudflare <product name> (or {{</*beta*/>}}Cloudflare <product name>{{</*/beta*/>}} for products in beta)
 
{{</*description*/>}}
Product description - What does this product do? Why would you use it? Short overview of product capability (~10-15 words).
{{</*/description*/>}}
 
{{</*plan type="<type>"*/>}}
 
Summary - Brief welcoming introductory content. A few sentences describing the product’s benefits to the customer. Focus on customer benefit but can also include general product information.
 
---
 
## Features
 
{{</*feature header="Name of feature" href="/link/to/feature/"*/>}}
Description highlighting capabilities of product feature. This section accepts Markdown lists for multiple attributes.
{{</*/feature*/>}}
 
---
 
## Related products
 
{{</*related header="<Name of product>" href="</link/to/product>" product="<slugified-product-name>"*/>}}
Description of product used together or connected configuration with current product.
{{</*/related*/>}}
 
---
 
## More resources
 
{{</*resource-group*/>}}
 
{{</*resource header="<Resource name>" href="https://www.cloudflare.com/link-to-resource/" icon="icon-name"*/>}}
Description of external resource related to current product.
{{</*/resource*/>}}
 
{{</*/resource-group*/>}}
```

## Additional Information

Only use Overview for the first page in a developer doc set.

## Examples

Examples of in-work designs are below, and a more detailed view is available in the "Template Examples" section of this Figma board. A live example is available in the Argo Smart Routing docs.
 Expand source

Many availabilities
Below there's an example for a product whose availability is complex, and is not easy to just use one type of plan. To create something similar to the example below, insert `{{</*plan type="<PLAN_TYPE>"*/>}}` below each of the feature component, like so:

```
{{</*feature header="<CLOUDFLARE_PRODUCT>" href="/path/to/product"*/>}}

{{</*plan type="PLAN_TYPE"*/>}}

Description of content in this section.

{{</*/feature*/>}}
```
