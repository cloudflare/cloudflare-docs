---
_build:
  publishResources: false
  render: never
  list: never
---

<details>
<summary>Add a custom entry</summary>
<div class="special-class" markdown="1">

1. Select **Add custom entry** and give it a name.
2. In **Value**, enter a regular expression (or regex) that defines the text pattern you want to detect. For example, `test\d\d` will detect the word `test` followed by 2 digits.

   - Regexes are written in Rust. We recommend validating your regex with [Rustexp](https://rustexp.lpil.uk/).
   - Detected text patterns are limited to 1024 bytes in length.
   - Regexes with `+` are not supported as they are prone to exceeding the length limit. For example `a+` can detect an infinite number of a's. We recommend using `a{min,max}` instead, such as `a{1,1024}`.

3. To save the detection entry, select **Done**.

</div>
</details>

<details>
<summary>Add existing entries</summary>
<div class="special-class" markdown="1">

Existing entries include [predefined detection entries](predefined-profiles/) and [Exact Data Match datasets](/cloudflare-one/policies/data-loss-prevention/exact-data-match/).

1. Select **Add existing entries**.
2. Choose which entries to want to add, then select **Confirm**.
3. To save the detection entry, select **Done**.

</div>
</details>
