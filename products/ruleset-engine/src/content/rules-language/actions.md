---
title: Actions
pcx-content-type: reference
order: 4
type: overview
---

# Actions reference

The action of a rule tells Cloudflare how to handle HTTP requests that match the rule [expression](/rules-language/expressions).

## Supported actions

The table below lists the actions available in the Rules language.

Some actions, like _Block_, will stop the evaluation of the remaining rules. The _Skip_ action will skip the evaluation of _some_ rules when there is a match, but the exact behavior will depend on the rule configuration.

The available actions depend on the [phase](/about#phases) where you are configuring the rule. Refer to each product’s documentation for details on the phase(s) supported by that product.

<TableWrap>

<table style="width: 100%">
  <thead>
    <tr>
      <th>Action</th>
      <th>Description</th>
      <th>Stops rule evaluation?</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Log</strong><br/><br/>API value:<br/><code class="InlineCode">log</code></td>
      <td>
        <p>Records matching requests in the Cloudflare Logs.</p>
        <p>Only available on Enterprise plans.</p>
        <p>Recommended for validating rules before committing to a more severe action.</p>
      </td>
      <td>No</td>
    </tr>
    <tr>
      <td><strong>Skip</strong><br/><br/>API value:<br/><code class="InlineCode">skip</code></td>
      <td>
        <p>Allows user to dynamically skip one or more security features or products for a request.</p>
        <p>Depending on the rule configuration, matching requests will skip the evaluation of one or more security features or products:</p>
        <p>
          <ul>
            <li>Skip all remaining rules in the current ruleset</li>
            <li>Skip rulesets</li>
            <li>Skip rules of a ruleset</li>
            <li>Skip phases</li>
            <li>Skip specific security products that are not based on the Ruleset Engine</li>
          </ul>
        </p>
        <p>The available skip options depend on the phase where you configure the rule. Refer to each product’s documentation for details.</p>
      </td>
      <td>No<br/>(but some rules may be skipped)</td>
    </tr>
    <tr>
      <td><strong>Challenge (CAPTCHA)</strong><br/><br/>API value:<br/><code class="InlineCode">challenge</code></td>
      <td>
        <p>Useful for ensuring that the visitor accessing the site is human, not automated.</p>
        <p>The client that made the request must pass a CAPTCHA challenge.</p>
        <p>If successful, Cloudflare accepts the matched request; otherwise, it is blocked.</p>
      </td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>Managed Challenge</strong><br/><br/>API value:<br/><code class="InlineCode">managed_challenge</code></td>
      <td>
        <p>Helps reduce the lifetimes of human time spent solving CAPTCHAs across the Internet.</p>
        <p>Depending on the characteristics of a request, Cloudflare will perform the following actions:</p>
        <p>
          <ul>
            <li>Show a non-interactive challenge page, similar to the current JS Challenge.</li>
            <li>Show a CAPTCHA challenge.</li>
          </ul>
        </p>
      </td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>JS Challenge</strong><br/><br/>API value:<br/><code class="InlineCode">js_challenge</code></td>
      <td>
        <p>Useful for ensuring that bots and spam cannot access the requested resource; browsers, however, are free to satisfy the challenge automatically.</p>
        <p>The client that made the request must pass a Cloudflare JavaScript Challenge before proceeding.</p>
        <p>If successful, Cloudflare accepts the matched request; otherwise, it is blocked.</p>
      </td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>Block</strong><br/><br/>API value:<br/><code class="InlineCode">block</code></td>
      <td>
        <p>Matching requests are denied access to the site.</p>
      </td>
      <td>Yes</td>
    </tr>
  </tbody>
</table>

</TableWrap>
