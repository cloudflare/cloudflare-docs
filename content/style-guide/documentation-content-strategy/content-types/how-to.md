---
pcx_content_type: concept
title: How to

---

# How to

## Purpose

The purpose of a how to is to explain how to complete a task within the product.

## Tone

instructional, straightforward

## content_type

`how-to`

## Structure

### Required components

[**Title**](/style-guide/documentation-content-strategy/component-attributes/titles/): Short verb phrase in second-person imperative. Do not use gerund phrases. 

[**Steps**](/style-guide/documentation-content-strategy/component-attributes/steps-tasks-procedures/): Numbered steps that complete a task.

[**Next steps**](/style-guide/documentation-content-strategy/component-attributes/next-steps/): What users should see as the end result of the steps and/or actionable next steps.

### Optional components

[**Context**](/style-guide/documentation-content-strategy/component-attributes/context/): An introductory paragraph on the following steps and what they will accomplish.

Provide context to the reader that is not in the section heading.

End with a colon or a period. Use a colon if it immediately precedes the steps. Use a period if there is more material (such as a note) between the context and the procedure.

Do not provide context for steps with a partial sentence that is completed by the numbered steps.

[**Prerequisites**](/style-guide/documentation-content-strategy/component-attributes/prerequisites/): Tasks or conditions that must be completed before a user can complete a series of steps.

[**Notes/warnings**](/style-guide/documentation-content-strategy/component-attributes/notes-tips-warnings/)

[**Examples**](/style-guide/documentation-content-strategy/component-attributes/examples/)

**Screenshots**

[**Related links**](/style-guide/documentation-content-strategy/component-attributes/links/): Bulleted list of links to associated resources.

## Template

Single procedure how-to

```
{
---
weight: xx
pcx_content_type: how-to
---
 
# Second-person imperative verb phrase
 
Context for procedure (optional)
 
1. Step one
1. Step two
1. Step three
1. ...
Next steps sentence - what users should see as the end result and/or actionable next steps.
}
```

How-to with multiple procedures

```
{
---
weight: xx
pcx_content_type: how-to
---
 
# Second-person imperative verb phrase
 
Context for procedures on page (optional)
 
## Second-person imperative verb phrase
 
1. Step one
1. Step two
1. Step three
1. ...
 
Next steps sentence - what users should see as the end result and/or actionable next steps.
 
## Second-person imperative verb phrase
 
1. Step one
1. Step two
1. Step three
1. ...
 
Next steps sentence - what users should see as the end result and/or actionable next steps.
}
```

How-to with multiple procedures that must be completed in order

```
{
---
weight: xx
pcx_content_type: how-to
---
 
# Second-person imperative verb phrase
 
Context for procedures on page (optional)
 
## 1. Second-person imperative verb phrase
 
1. Step one
1. Step two
1. Step three
1. ...
 
Next steps sentence - what users should see as the end result and/or actionable next steps.
 
## 2. Second-person imperative verb phrase
 
1. Step one
1. Step two
1. Step three
1. ...
 
Next steps sentence - what users should see as the end result and/or actionable next steps.
 
## 3. Second-person imperative verb phrase
 
1. Step one
1. Step two
1. Step three
1. ...
 
Next steps sentence - what users should see as the end result and/or actionable next steps.
}
```
