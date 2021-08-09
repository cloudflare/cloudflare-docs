---
order: 4
pcx-content-type: best-practices
---

# Working with GitHub

The **goal** is to ensure that PRs are easily **retrievable** and **readable**.

1. Make commit messages informative.

<Aside>

When you’re working on several files or making significant changes in your local repo, try to split work into smaller commits.

</Aside>

| <span style="color:red">✘</span> | <span style="color:green">✓</span> |
|---|---|
| *[commit 1]* fix access | *[commit 1]* fix image paths in getting-started.md |
|  | *[commit 2]* add step-by-step guide on configuring an idp |

2. When naming a PR, follow this title structure:

![Title Pattern](/pr-title-pattern.png)

| <span style="color:red">✘</span> | <span style="color:green">✓</span> |
|---|---|
| broken link in access docs | [Access] fix broken link in example_file.md |
| fixes | [1.1.1.1] fix code style in getting started and /dns-over-https |

3. Check that the PR description gives all the relevant context for the PR, and accurately describes what's being changed.

4. Assign the relevant **product label**.

  Product labels follow this structure, ***product:product-name***, e.g. `product:access`.

5. PCX will be automatically assigned as a reviewer when you create the PR.

--------------------------------

<ButtonGroup>
  <Button type="secondary" href="/contributing/content/accessibility">← Accessibility</Button>
</ButtonGroup>
