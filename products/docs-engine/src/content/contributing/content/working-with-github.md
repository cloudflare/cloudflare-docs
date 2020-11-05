---
order: 1
---

# Working with GitHub

<Aside>
   <b>Goal</b>: ensure that PRs are easily <b>retrievable</b> and <b>readable</b>.

</Aside>

1. Give a meaningful title to every commit.  

 <b>Tip</b>: when you’re working on several files or making significant changes in your local repo, try to split work into logically meaningful commits.


<table>
  <tbody>
    <tr>
      <th align="center" style="color:red">✘</th>
      <th align="center" style="color:green">✓</th>
    </tr>
    <tr>
      <td>
        <ul>
          <li>fix access</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>fix image paths in getting-started.md</li>
          <li>add step-by-step guide on configuring an idp</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

2. When naming a PR, follow this title structure:

![Title Pattern](/pr-title-pattern.png)

<table class="center">
  <tbody>
    <tr>
      <th align="center" style="color:red">✘</th>
      <th align="center" style="color:green">✓</th>
    </tr>
    <tr>
      <td>broken link in access docs</td>
      <td>[Access] fix broken link in example_file.md</td>
    </tr>
    <tr>
      <td>fixes</td>
      <td>[1.1.1.1] fix code style in getting started and /dns-over-https</td>
    </tr>
  </tbody>
</table>

3. Check that the PR description reflects a bullet point list of all commit titles. Add any other comment you want to share with us.

4. Assign the relevant **product label**. Product labels follow this structure: ***product:product-name***.
   * `product:access`
   * `product:1.1.1.1`

5. Request a review from the code owner.  

  See [here](placeholder) a list of code owners per product.

