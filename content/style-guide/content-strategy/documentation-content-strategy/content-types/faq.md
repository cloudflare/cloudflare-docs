---
pcx_content_type: concept
title: FAQ

---

# FAQ

<table>
    <tr>
        <th style="width:20%">Purpose</th>
        <th>The purpose of an FAQ is to provide simple answers to common questions.</th>
    </tr>
    <tr>
        <td>Tone</td>
        <td>Guiding, straightforward, educational, authoritative</td>
    </tr>
    <tr>
        <td>content_type</td>
        <td>faq</td>
    </tr>
    <tr>
        <td>Required components</td>
        <td>Title<br/>Context<br/>Questions<br/>Answers</td>
    </tr>
    <tr>
        <td>Optional components</td>
        <td>Sections<br/>Screenshots<br/>Notes/warnings<br/>Links</td>
    </tr>
</table>

## Structure

### Smaller FAQ pages (5-10 questions)

Smaller FAQ pages won't need structuring into sections. The structure is as follows:

Title: FAQ

Context: an introductory paragraph on the section and what users can expect from it.

Questions, answers

### Medium FAQ pages (10-15 questions)

Medium FAQ pages will need structuring into sections to facilitate readability and discoverability of content.

Title: FAQ

Context: an introductory paragraph on the section and what users can expect from it.

Navigation menu with a list of section titles

Section titles

Questions, answers

### Large FAQ pages (>15 questions)

Large FAQ pages (for product suites like Teams/Cloudflare One) will need structuring into sections, and each section will have its own subpage, to facilitate readability and discoverability of content.

```
Main FAQ page

Title: FAQ

Context (page): an introductory paragraph on the section and what users can expect from it.

Section titles

Context (section): a one-liner describing what users will find in that sub-section

Button: a button leading to the subpage with the actual questions
```

```
Child FAQ page

Breadcrumbs back to the main FAQ page

Title: corresponds to the section header from the Main FAQ page

Questions, answers
```

## Question types

+ **Yes/No**
    + Can I do something?
    + Can the product do something?
+ **Procedural**
    + How do I do something?
    + How does something work?
    + How is something measured/counted?
+ **Definitions**
    + What (is|are) ...?
+ **Scenarios**
    + What if ...?
+ **Troubleshooting**
    + I see `<ERROR>`.
    + `<PRODUCT>` fails, shows errors,

## Guidelines

### General

Write the questions from the customer's POV, so use the first person.

✅Can I use wildcards when creating policies?

❌Can users use wildcards when creating policies?

### Yes/No

With this question type, users want to inquire about capabilities. Does the product enable them to do something? Can the product do something?

+ **Question**
    + Yes/no questions should start with structures like:
        + Can I....
        + (Can|Does) the product...
+ **Answer**
    + Start the answer with Yes/No.
        + ✅Yes. Cloudflare Access supports several providers simultaneously.
        + ❌Cloudflare Access supports several providers simultaneously.
    + Always follow with a short contextualization. Give the user all the information they need.

### Procedural

This question type addresses doubts regarding how to achieve a goal with the product, or how the product works. They should normally be addressed by either tutorials or how-tos in the main docs, but it's worth calling out some commonly asked procedural questions in the FAQ too, and linking back to other areas of the docs.

+ Question
    + Procedural questions should start with structures like:
        + How do I....
        + How does the product...
        + How does ... work?
+ Answer
    + Give concise but complete answers
    + **Link out to relevant docs** (tutorials, how-tos, even blog posts) for more in-depth info

### Definitions

With this question type, users want to know what certain elements are. While this type of question should be addressed by the glossary, it's helpful to call out some basic definitions in the FAQ too (think of definitions for essential, recurring features in the product), and link out to the relevant part of the docs.

+ **Question**
    + Definition questions should start with this structure:
        + What is/are...
+ **Answer**
    + Think of a dictionary – short, concise, informational definitions help
    + Link out to the glossary or other relevant docs if needed

### Scenarios

With this type of question, the user will know how to tie the product to a specific real-life scenario they have had happening, or think will happen. They want to know if the product is fit to help them in those cases, too. While **tutorials** should address this type of questions, it's worth calling out the most basic scenario-related questions in the FAQ too, so as to help the user decide whether the product is a good fit for their needs.

+ Question
    + Scenario questions should start with this structure:
        + What if...
+ Answer
    + Give the relevant answer in the first sentence. Does the product work in that scenario?
    + Add brief context in a couple more sentences. If the product works, how?
    + Link out to relevant docs

### Troubleshooting

This is a peculiar question type, in that the user notices something unexpected with the product and starts by stating what it is; questions can be left implicit: "what's wrong and how do I fix it?"

+ **Error**
    + I see...
    + `<Product>` doesn't work as expected when...
+ **Answer**
    + Provide a **reason** why the user is seeing what they're seeing.
    + Provide short, lean, actionable steps to solve the error
    + Link out to tutorials or how-tos for more information.

## Additional Information

If the FAQ includes more than 5-10 questions, revisit the user workflow and determine if any of the content in the FAQ should live elsewhere in the doc set.

Use sections if your product is large or incorporates several other products (like Cloudflare One). Try to limit the number of questions in each example and revisit the user workflow if the number of FAQs grows unwieldy.
