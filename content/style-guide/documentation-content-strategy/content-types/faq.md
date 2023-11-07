---
pcx_content_type: concept
title: FAQ

---

# FAQ

## Purpose

The purpose of an FAQ is to provide simple answers to common questions.

## Tone

Guiding, straightforward, educational, authoritative

## content_type

`faq`

## Overview

A Frequently Asked Questions (FAQ) page is a priority area for SEO and digital marketing, and can be a simple way to improve navigation for users.

An effective FAQ page should:

+ Reflect the audience's need
+ Cover a broad range of content
+ Receive frequent updates
+ Solve problems
+ Drive page views
+ Showcase expertise, trust, and authority

## What should you include in an FAQ page?

The FAQ should include a list of questions and answers to a particular topic, and should only be used if your page has a list of questions with answers.

Make sure each question includes the entire text of the question.

Make sure the answer includes the entire answer, as well as a direct response to the question (if the question is phrased in a Yes/No manner).

## Structure

### Smaller FAQ pages (5-10 questions)

Smaller FAQ pages will not need structuring into sections.

[**Title**](/style-guide/documentation-content-strategy/component-attributes/titles/): FAQ

[**Context**](/style-guide/documentation-content-strategy/component-attributes/titles/): an introductory paragraph on the section and what users can expect from it.

Questions, answers

### Medium FAQ pages (10-15 questions)

Medium FAQ pages will need structuring into sections to facilitate readability and discoverability of content.

[**Title**](/style-guide/documentation-content-strategy/component-attributes/titles/): FAQ

[**Context**](/style-guide/documentation-content-strategy/component-attributes/titles/): an introductory paragraph on the section and what users can expect from it.

Navigation menu with a list of section titles

Section titles

Questions, answers

### Large FAQ pages (>15 questions)

Large FAQ pages (for product suites like Teams/Cloudflare One) will need structuring into sections, and each section will have its own subpage, to facilitate readability and discoverability of content.

#### Main FAQ page

[**Title**](/style-guide/documentation-content-strategy/component-attributes/titles/): FAQ

[**Context**](/style-guide/documentation-content-strategy/component-attributes/titles/) (page): an introductory paragraph on the section and what users can expect from it.

Section titles

[**Context**](/style-guide/documentation-content-strategy/component-attributes/titles/) (section): a one-liner describing what users will find in that sub-section

Button: a button leading to the subpage with the actual questions

#### Child FAQ page

Breadcrumbs back to the main FAQ page

[**Title**](/style-guide/documentation-content-strategy/component-attributes/titles/): corresponds to the section header from the Main FAQ page

Questions, answers

---

## Template

Due to some templating we have built into our site, FAQ pages can be further optimized with [structured data](https://developers.google.com/search/docs/appearance/structured-data/faqpage).

```
---
header: /1.1.1.1/faq.md
highlight: [4, 9-10, 12, 16-17]
---

---
pcx_content_type: faq
title: FAQ
structured_data: true
---

# FAQ

{{</*faq-item*/>}}
{{</*faq-question level=2 text="What is 1.1.1.1?" */>}}
 
{{</*faq-answer*/>}}
 
1.1.1.1 is Cloudflare's fast and secure DNS resolver.....
 
{{</*/faq-answer*/>}}
{{</*/faq-item*/>}}

```

For these components to work, you need to adjust several pieces of the page content:

- Frontmatter must have `structured_data: true` specified.
- Each FAQ item must be wrapped in the following elements:
    - `faq-item`: Overall wrapper.
    - `faq-question level=<HEADING_LEVEL> text="<TITLE>"`: Wraps the question itself. Has an optional level parameter to control the level of the header. This is useful if you have a FAQ divided into different sections.
    - `faq-answer`: Wraps the answer text.

---

## Question types

+ **Yes/No**
    + Can I do something?
    + Can the product do something?
+ **Procedural**
    + How do I do something?
    + How does something work?
    + How is something measured/counted?
+ **Definitions**
    + What (is/are) ...?
+ **Scenarios**
    + What if ...?
+ **Troubleshooting**
    + I see `<ERROR>`.
    + `<PRODUCT>` fails, shows errors,

## Guidelines

### General

Write the questions from the customer's POV, so use the first person.

✅ Can I use wildcards when creating policies?

❌ Can users use wildcards when creating policies?

### Yes/No

With this question type, users want to inquire about capabilities. Does the product enable them to do something? Can the product do something?

+ **Question**
    + Yes/no questions should start with structures like:
        + Can I....
        + (Can/Does) the product...
+ **Answer**
    + Start the answer with Yes/No.
        + ✅ Yes. Cloudflare Access supports several providers simultaneously.
        + ❌ Cloudflare Access supports several providers simultaneously.
    + Always follow with a short contextualization. Give the user all the information they need.

### Procedural

This question type addresses doubts regarding how to achieve a goal with the product, or how the product works. They should normally be addressed by either tutorials or how-tos in the main documentation, but it is worth calling out some commonly asked procedural questions in the FAQ too, and linking back to other areas of the documentation.

+ **Question**
    + Procedural questions should start with structures like:
        + How do I....
        + How does the product...
        + How does ... work?
+ **Answer**
    + Give concise but complete answers
    + **Link out to relevant documentation** (tutorials, how-tos, even blog posts) for more in-depth information

### Definitions

With this question type, users want to know what certain elements are. While this type of question should be addressed by the glossary, it is helpful to call out some basic definitions in the FAQ too (think of definitions for essential, recurring features in the product), and link out to the relevant part of the documentation.

+ **Question**
    + Definition questions should start with this structure:
        + What is/are...
+ **Answer**
    + Think of a dictionary – short, concise, informational definitions help
    + Link out to the glossary or other relevant documentation if needed

### Scenarios

With this type of question, the user will know how to tie the product to a specific real-life scenario they have had happening, or think will happen. They want to know if the product is fit to help them in those cases, too. While **tutorials** should address this type of questions, it is worth calling out the most basic scenario-related questions in the FAQ too, so as to help the user decide whether the product is a good fit for their needs.

+ **Question**
    + Scenario questions should start with this structure:
        + What if...
+ **Answer**
    + Give the relevant answer in the first sentence. Does the product work in that scenario?
    + Add brief context in a couple more sentences. If the product works, how?
    + Link out to relevant documentation

### Troubleshooting

This is a peculiar question type, in that the user notices something unexpected with the product and starts by stating what it is; questions can be left implicit: "what is wrong and how do I fix it?"

+ **Error**
    + I see...
    + `<Product>` does not work as expected when...
+ **Answer**
    + Provide a **reason** why the user is seeing what they are seeing.
    + Provide short, lean, actionable steps to solve the error
    + Link out to tutorials or how-tos for more information.

## Additional Information

If the FAQ includes more than 5-10 questions, revisit the user workflow and determine if any of the content in the FAQ should live elsewhere in the doc set.

Use sections if your product is large or incorporates several other products (like Cloudflare One). Try to limit the number of questions in each example and revisit the user workflow if the number of FAQs grows unwieldy.
