---
pcx_content_type: concept
title: Tutorial

---

# Tutorial

## Purpose

The purpose of a tutorial is to connect products to real-world scenarios to meet a user's goal.

## Tone

Guiding, straightforward, educational, authoritative

## content_type

`tutorial`

## Structure

### Required components

[**Title**](/style-guide/documentation-content-strategy/component-attributes/titles/): Short verb phrase in second-person imperative.

**Context**: An introductory paragraph on the user's goal or job-to-be-done and how they'll accomplish that in the tutorial. Consider including the intended audience for the tutorial. Refer to Context for more information.

**Consider the user story framing**: "As a `___`, I want to `___` so I can `___`."

[**Steps**](/style-guide/documentation-content-strategy/component-attributes/next-steps/): Numbered steps that complete a task. Refer to Steps/Tasks/Procedures for more information.

### Optional components

[**Notes/warnings**](/style-guide/documentation-content-strategy/component-attributes/notes-tips-warnings/)

[**Examples**](/style-guide/documentation-content-strategy/component-attributes/examples/)

**Screenshots**

[**Links**](/style-guide/documentation-content-strategy/component-attributes/links/)

**Boundaries**

## Guidelines

**A tutorial is:**
+ User-focused
+ Aligned to a user's goal or job-to-be-done
+ Descriptive and guiding

**A tutorial can:**

+ Describe how to integrate with a third party
+ Be delivered in the Cloudflare dashboard
+ Describe how to set up multiple products to complete a single job-to-be-done

**A tutorial is not:**

+ Product configuration information, how-to (or any of the other content types)
+ How to complete a task in the UI or API
+ A dumping ground for screenshots
+ Content with no end goal or job-to-be-done

## Template

We have a pre-built set of tutorial shortcodes that help organize and format tutorials:

- Wrap the entire process within a [`tutorial`](https://github.com/cloudflare/cloudflare-docs/blob/production/layouts/shortcodes/tutorial.html) shortcode.
- Include a [`tutorial-prereqs`](https://github.com/cloudflare/cloudflare-docs/blob/production/layouts/shortcodes/tutorial-prereqs.html) shortcode to wrap around any steps someone needs to take before getting started, which has a few input parameters defined in shortcode definition.
- Wrap individual steps in a [`tutorial-step`](https://github.com/cloudflare/cloudflare-docs/blob/production/layouts/shortcodes/tutorial-step.html) shortcode, which has a few input parameters defined in shortcode definition.

```
---
header: Tutorial example
---

---
pcx_content_type: tutorial
updated: 2023-06-30
---
 
# Second-person imperative verb phrase that reflects user goal or job-to-be-done
 
Context for tutorial, intended audience (optional)
 
{{</*tutorial*/>}}

{{</*tutorial-prereqs*/>}}

Various pre-reqs

{{</*/tutorial-prereqs*/>}}

{{</*tutorial-step title="Step 1"*/>}}

Step 1 content

{{</*/tutorial-step*/>}}

{{</*tutorial-step title="Step 2 content" optional=true */>}}

Step 2 content

{{</*/tutorial-step*/>}}

{{</*tutorial-step title="Step 3 content"*/>}}

Step 3 content

{{</*/tutorial-step*/>}}

{{</*tutorial-step title="Step 4"*/>}}

Step 4 content

{{</*/tutorial-step*/>}}

{{</*/tutorial*/>}}
```

## Examples

[Tutorials](/tutorials/)

## Additional information

We have a tool that pulls together everything labeled with `<pcx_content_type: tutorial>`: [Tutorials](/tutorials/)
