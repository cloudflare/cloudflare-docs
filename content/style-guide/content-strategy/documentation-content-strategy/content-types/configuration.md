---
pcx_content_type: concept
title: Configuration

---

# Configuration

## Purpose

The purpose of a configuration is to show examples of specific settings, values, and options.

## Tone

plain, descriptive, straightforward

## content_type

configuration

## When to use

Configurations are useful for parts of the product that are very configuration-intensive; for example, rules.

## Structure

### Required components

[**Title**](/style-guide/content-strategy/documentation-content-strategy/component-attributes/titles/): The title should be noun-based, because configurations are not designed to guide users towards achieving a goal – rather, they describe common ways to set up a specific feature depending on the user's needs.

**Context**: The context should be given in a paragraph right after the title. It should introduce the features, contextualize what type of configurations the user will encounter, and link to other relevant documentation.

**Settings and values**: This should be a reference table with a 1:1 correspondence between a setting the user can change, and the value they should input/select in order to reach the goal outlined in the context paragraph.

### Optional components

[**Navigation**](/style-guide/content-strategy/documentation-content-strategy/component-attributes/navigation/): When we have many configurations to cover, it's useful to include a navigation list to help the user find what they need.

## Template

```
---
 
weight: xx  
pcx_content_type: configuration
 
---
 
# Title
 
Write an overview of the high-level feature here, not more than 2-3 sentences. Outline what users can achieve with it, and if necessary, link to other parts of the docs.
 
* [Feature 1](/feature-1)
* [Feature 2](/feature-2)
* [Feature 3](/feature-3)
 
## Feature 1
 
(Feature 1) allows you to (placeholder). For example, the following configuration (placeholder).
 
| Setting 1 | Setting 2 | Setting 3 |
 
| - | - | - | 
 
| Value 1 | Value 2 | Value 3 |
 
## Feature 2
 
(Feature 2) allows you to (placeholder). For example, the following configuration (placeholder).
 
| Setting 1 | Setting 2 | Setting 3 |
 
| - | - | - | 
 
| Value 1 | Value 2 | Value 3 |
 
## Feature 3
 
(Feature 3) allows you to (placeholder). For example, the following configuration (placeholder).
 
| Setting 1 | Setting 2 | Setting 3 |
 
| - | - | - | 
 
| Value 1 | Value 2 | Value 3 |
```

## Additional Information

Configurations, aka use cases, are reference pages with examples of how you might set a product up based on your requirements. If you're creating a configuration and feel yourself wanting to include instructions, consider a [tutorial](/style-guide/content-strategy/documentation-content-strategy/content-types/tutorial/), [how-to](/style-guide/content-strategy/documentation-content-strategy/content-types/how-to/), or [example](/style-guide/content-strategy/documentation-content-strategy/component-attributes/examples/) instead.
