---
type: example
summary: A short summary of the example. Should be no more than 100 characters or so.
demo: https://example.com
tags:
  - Tag1
  - Tag2
  - Tag3
---

# Example

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
// Example code block
const exampleURL = "https://example.com"

console.log(exampleURL)
```

<Demo src={props.frontmatter.demo} title={props.frontmatter.summary} aspectRatio={16/9}/>
