---
pcx_content_type: concept
title: Concept

---

# Concept

<table>
  <tr>
    <th style="width:15%">Purpose</th>
    <td>The purpose of a concept is to provide conceptual or descriptive information so users understand the background and context of a particular topic.</td>
  </tr>
  <tr>
    <th>Tone</th>
    <td>instructional, descriptive, approachable, supportive</td>
  </tr>
  <tr>
    <th>content_type</th>
    <td>concept</td>
  </tr>
  <tr>
    <th>Required components</th>
    <td>Title Context Explanation</td>
  </tr>
  <tr>
    <th>Optional components</th>
    <td>TBD</td>
  </tr>
</table>

## Structure

### Required components

+ [Title](/style-guide/content-strategy/documentation-content-strategy/component-attributes/titles/) - Use "About" for concept pages that describe the functionality of your product. Otherwise, use a short noun phrase (feature name, functionality, Internet concept - Health checks, Status resource protection, CDN)
+ [Context](/style-guide/content-strategy/documentation-content-strategy/component-attributes/context/) - Provide a brief description of why users should care about this information.
+ Explanation - Explain the page topic. Keep paragraphs short and concise to avoid large blocks of text. Feel free to use bulleted lists, notes, and headings for visual breaks. 

## Template

```
---
title: About (for high-level product concept page only - otherwise omit this line)
weight: xx
pcx_content_type: concept
---
 
# About <product> or noun phrase
 
Provide a brief description of why users should care about this information.
 
Explain the page topic. Keep paragraphs short and concise to avoid large blocks of text. Feel free to use bulleted lists, notes, and headings for visual breaks.
```

## Additional information

Do not recreate information that's already available online. Instead, consider why a topic needs to be explained, what Cloudflare's perspective is on that topic, and what users need to understand about the topic in order to successfully use our products.

## Examples

https://developers.cloudflare.com/load-balancing/about 
https://developers.cloudflare.com/waf/about
https://developers.cloudflare.com/magic-transit/about/health-checks