---
pcx_content_type: concept
title: Get started

---

# Get started

## Purpose

The purpose of Get started content is to help users go from not using a product to successfully configuring and setting up.

## content_type

`get-started`

## Structure

### Required components

[**Title**](/style-guide/documentation-content-strategy/component-attributes/titles/): Should be "Get started"

[**Prerequisites**](/style-guide/documentation-content-strategy/component-attributes/prerequisites/): Which may include:

+ An active zone
+ Certain subscription / enabled product / plan
+ Other tasks you might need to do to set up other things (your origin) outside of CF
+ Do you need to make certain decisions before you start?

[**Steps**](/style-guide/documentation-content-strategy/component-attributes/steps-tasks-procedures/): Steps that lead someone to whatever would be considered Product Adoption.

+ Often, these can be partialized files from your How-to pages.
+ This is usually the bare minimum (a single Bot Management FW rule) + the most general use case for a product.
+ This may at times contradict the flow in the Cloudflare dashboard at times. If it does, consider raising it up to the Product team.

### Optional components

**Next steps**: Point someone towards additional configuration options.

## Template

```
{
---
weight: xx
pcx_content_type: get-started
---
 
# Get started
 
Description
 
## Before you begin
 
All the things you need to do before you start configuring your product, both within Cloudflare and outside.
 
## Step 1 -- Step description
 
## Step 2 -- Steps until you get to activation
 
---
 
## Next steps
 
Point to more complex setup options.
}
```

## Example

[Waiting Room: Get started](/waiting-room/get-started/)
