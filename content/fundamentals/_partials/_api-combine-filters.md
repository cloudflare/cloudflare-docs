---
_build:
  publishResources: false
  render: never
  list: never
---

Combine filters using `OR` and `AND` boolean logic:

- `AND` takes precedence over `OR` in all expressions.
- The `OR` operator is defined using a comma `,` or the `OR` keyword surrounded by whitespace.
- The `AND` operator is defined using a semicolon `;` or the `AND` keyword surrounded by whitespace.

  {{<Aside type="note">}}

  Note that the semicolon is a reserved character in URLs ([RFC 1738](https://www.rfc-editor.org/rfc/rfc1738)) and should be percent-encoded as `%3B`.

  {{</Aside>}}