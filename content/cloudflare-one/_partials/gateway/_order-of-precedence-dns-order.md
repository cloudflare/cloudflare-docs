---
_build:
  publishResources: false
  render: never
  list: never

---

  1. Policy #1 does not match `test.example.com` — move on to check Policy #2.
  2. Policy #2 matches, so DNS resolution is allowed.
  3. Policy #3 is not evaluated because there has already been an explicit match.
