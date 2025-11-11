---
trigger: always_on
---

# General rules

## Partial files location

- The partial files used in the docs are located in src/content/partials/

## Partial files variables

- Some partial files have variables to account for the fact that the partials are reused in different places and even products.
- Some partials also have JSX fragments. These pieces of code are conditionally rendered in the pages where the specific variable (magic word as it's called sometimes) is present. An example of these conditionally rendered pieces of code is:

{ props.magicWord === "hardware" && (
  <>
    <p>You need to purchase <a href="https://www.cloudflare.com/magic-wan">{props.productOriginalName}</a> before you can purchase and use the {props.productName}. The {props.productName} can function as your primary edge device for your network, or be deployed in-line with existing network gear.</p>
  </>
)
}

This code would only be rendered if the page has a magicWord variable set to "hardware".

## General guidance

- Do not make any changes to content without showing me what you want to change and asking if I agree to the changes.
- Do not use HTML for ordered lists.
- When you use JSX fragments to conditionally render a block of code, always use the props variable to account for the fact that the partials are reused in different places and even products.
- When you use JSX fragments to conditionally render a block of code, be aware that you will probably need to use the <Markdown /> component to properly render content that is not a single sentence.
- Only use the <Markdown /> component in JSX conditionals, and only if needed.
- Do not duplicate content when creating ternary or binary conditions.
- When adding a variable to a link, use HTML instead of Markdown.
- Whenever something is not clear, ask the user for more input.