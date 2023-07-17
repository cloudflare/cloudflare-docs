---
pcx_content_type: concept
title: Get started

---

## Get started

<table>
  <tr>
    <th style="width:15%">Purpose</th>
    <td>The purpose of Get started content is to help users go from not using a product to successfully configuring and setting up.</td>
  </tr>
  <tr>
    <th>Tone</th>
    <td>N/A</td>
  </tr>
  <tr>
    <th>content_type</th>
    <td>get-started</td>
  </tr>
  <tr>
    <th>Required components</th>
    <td>Title <br/> Prerequisites <br/> Steps</td>
  </tr>
  <tr>
    <th>Optional components</th>
    <td>Next steps</td>
  </tr>
</table>

## Structure

+ [**Title**](/style-guide/content-strategy/documentation-content-strategy/component-attributes/titles/) - Should be "Get started"

+ [**Prerequisites**](/style-guide/content-strategy/documentation-content-strategy/component-attributes/prerequisites/) - Which may include:
  + An active zone
  + Certain subscription / enabled product / plan
  + Other tasks you might need to do to set up other things (your origin) outside of CF
  + Do you need to make certain decisions before you start?
+ [**Steps**](/style-guide/content-strategy/documentation-content-strategy/component-attributes/steps-tasks-procedures/) → Steps that lead someone to whatever would be considered Product Adoption.
  + Often, these can be partialized files from your How-to pages.
  + This is usually the bare minimum (a single Bot Management FW rule) + the most general use case for a product.
  + This may – at times – contradict the flow in the Cloudflare dashboard. If it does, consider raising it up to the Product team.
+ **Next steps** –> Point someone towards additional configuration options.

## Template

```
---
weight: xx
pcx_content_type: get-started
---
 
# Get started
 
Description
 
## Before you begin
 
All the things you need to do before you start configuring your product, both w/in CF and outside.
 
## Step 1 - Blah
 
## Step 2 -- Blah blah until you get to activation
 
---
 
## Next steps
 
Point to more complex setup options.
```

## Example

https://developers.cloudflare.com/waiting-room/get-started/
