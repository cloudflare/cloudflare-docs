---
title: Reference
pcx_content_type: Content
---

# Reference

<table>
  <tr>
    <th style="width:20%">Purpose</th>
    <td>The purpose of reference content is to provide supplemental information (a “deep dive”) for further learning on settings, values, or options. While reference information is helpful for users, reference information should not block or prevent users from completing tasks.</td>
  </tr>
  <tr>
    <th>Tone</th>
    <td>plain, straightforward</td>
  </tr>
  <tr>
    <th>content_type</th>
    <td>reference</td>
  </tr>
  <tr>
    <th>Required components</th>
    <td>Title<br/>Context</td>
  </tr>
  <tr>
    <th>Optional components</th>
    <td>Code snippets<br/>Dynamic Lists<br/>Examples<br/>Notes/tips/warnings<br/>Screenshots<br/>Tables</td>
  </tr>
</table>

## Structure

### Required components

[**Title**](/style-guide/content-strategy/documentation-content-strategy/component-attributes/titles/): For a single Reference page, use "Reference" as the title. For a reference section with child pages, use nouns in the title. For example, [Common Cf-Polished statuses](https://developers.cloudflare.com/images/polish/cf-polished-statuses/).

[**Context**](/style-guide/content-strategy/documentation-content-strategy/component-attributes/context/): Provide an introductory paragraph to explain how and why a user might utilize the information on this page.

### Optional components

**Code snippets**: Examples of API responses or commands to run certain tasks.

[**Dynamic Lists**](/style-guide/content-strategy/documentation-content-strategy/component-attributes/dynamic-lists/): Long lists of fields (more than 20).

[**Examples**](/style-guide/content-strategy/documentation-content-strategy/component-attributes/examples/): Code samples that reference a specific configuration or API call.

[**Notes/tips/warnings**](/style-guide/content-strategy/documentation-content-strategy/component-attributes/notes-tips-warnings/): Relevant information that can help or simplify concepts or warn users of potential impacts.

**Screenshots**: Images of a completed configuration for complicated tasks.

**Tables**: Longer lists of features and an associated number value or terms and their definitions.

## Examples

[Cache — Common Cf-Polished statuses](https://developers.cloudflare.com/images/polish/cf-polished-statuses/)

[Logpush — Logpush API configuration](https://developers.cloudflare.com/logs/get-started/api-configuration/)

## Template

Single reference page
```
---
weight: xx
pcx_content_type: reference
---
 
# Reference
 
Write an overview of the reference information on this page. If this section has child pages, add navigation links below using the DirectoryListing snippet to add links for each child page in a bulleted list.
 
<DirectoryListing path="/reference"/>
 
## Concise noun title
 
Brief description of content in this section.
 
## Concise noun title
 
Brief description of content in this section.
```
