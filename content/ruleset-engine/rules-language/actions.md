---
title: Actions
pcx_content_type: reference
type: overview
weight: 5
layout: list
meta:
  title: Actions reference
---

# Actions reference

The action of a rule tells Cloudflare how to handle matches for the rule [expression](/ruleset-engine/rules-language/expressions/).

## Supported actions

The table below lists the actions available in the Rules language.

Some actions, like _Block_, will stop the evaluation of the remaining rules. The _Skip_ action will skip the evaluation of _some_ rules when there is a match, but the exact behavior will depend on the rule configuration.

The available actions depend on the [phase](/ruleset-engine/about/phases/) where you are configuring the rule. Refer to each product’s documentation for details on the phase(s) supported by that product.

{{<table-wrap>}}

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
      <td>
        <strong>Interactive Challenge</strong><br />
        <br />
        API value:<br />
        <code>challenge</code>
      </td>
      <td>
        <p>Useful for ensuring that the visitor accessing the site is human, not automated.</p>
        <p>The client that made the request must pass an interactive challenge.</p>
        <p>If successful, Cloudflare accepts the matched request; otherwise, it is blocked.</p>
      </td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>
        <strong>JS Challenge</strong><br />
        <br />
        API value:<br />
        <code>js_challenge</code>
      </td>
      <td>
        <p>
          Useful for ensuring that bots and spam cannot access the requested resource; browsers,
          however, are free to satisfy the challenge automatically.
        </p>
        <p>
          The client that made the request must pass a Cloudflare JavaScript Challenge before
          proceeding.
        </p>
        <p>If successful, Cloudflare accepts the matched request; otherwise, it is blocked.</p>
      </td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>
        <strong>Managed Challenge (Recommended)</strong><br />
        <br />
        API value:<br />
        <code>managed_challenge</code>
      </td>
      <td>
        <p>Helps reduce the lifetimes of human time spent solving CAPTCHAs across the Internet.</p>
        <p>
          Depending on the characteristics of a request, Cloudflare will dynamically choose the appropriate type of challenge from the following actions based on specific criteria:
        </p>
        <ul>
          <li>Show a non-interactive challenge page (similar to the current JS Challenge).</li>
          <li>Show a custom interactive challenge (such as click a button).</li>
        </ul>
      </td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>
        <strong>Block</strong><br />
        <br />
        API value:<br />
        <code>block</code>
      </td>
      <td>
        <p>Matching requests are denied access to the site.</p>
      </td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>
        <strong>Skip</strong><br />
        <br />
        API value:<br />
        <code>skip</code>
      </td>
      <td>
        <p>
          Allows user to dynamically skip one or more security features or products for a request.
        </p>
        <p>
          Depending on the rule configuration, matching requests will skip the evaluation of one or
          more security features or products:
        </p>
        <p>
          <ul>
            <li>Skip all remaining rules in the current ruleset</li>
            <li>Skip rulesets</li>
            <li>Skip rules of a ruleset</li>
            <li>Skip phases</li>
            <li>Skip specific security products that are not based on the Ruleset Engine</li>
          </ul>
        </p>
        <p>
          The available skip options depend on the phase where you configure the rule. Refer to each
          product’s documentation for details.
        </p>
      </td>
      <td>
        No
        <br />
        (but some rules may be skipped)
      </td>
    </tr>
    <tr>
      <td>
        <strong>Log</strong><br />
        <br />
        API value:<br />
        <code>log</code>
      </td>
      <td>
        <p>Records matching requests in the Cloudflare Logs.</p>
        <p>Only available on Enterprise plans.</p>
        <p>Recommended for validating rules before committing to a more severe action.</p>
      </td>
      <td>No</td>
    </tr>
    <tr>
      <td>
        <strong>Execute</strong><br />
        <br />
        API value:<br />
        <code>execute</code>
      </td>
      <td>
        <p>
          Executes the rules in the ruleset specified in the rule configuration. You can specify a
          managed ruleset or a custom ruleset to execute.
        </p>
        <p>In the Cloudflare dashboard, this action is not listed in action selection dropdowns.</p>
      </td>
      <td>No</td>
    </tr>
    <tr>
      <td>
        <strong>Rewrite</strong><br />
        <br />
        API value:<br />
        <code>rewrite</code>
      </td>
      <td>
        <p>
          Adjusts the URI path, query string, and/or HTTP headers of requests and responses, according to the rule configuration.
        </p>
        <p>Only available in:</p>
        <ul>
          <li><a href="/rules/transform/">Transform Rules</a>, in phases <code>http_request_transform</code>, <code>http_request_late_transform</code>, and <code>http_response_headers_transform</code>. In the Cloudflare dashboard, this action is not listed in action selection dropdowns. To use this action, create a Transform Rule.</li>
          <li>WAF custom rules checking for <a href="/waf/exposed-credentials-check/">exposed credentials</a>, in the <code>http_request_firewall_custom</code> phase at the account level. In the Cloudflare dashboard, this action is called <em>Exposed-Credential-Check Header</em>.</li>
        </ul>
      </td>
      <td>No</td>
    </tr>
    <tr>
      <td>
        <strong>Redirect</strong><br />
        <br />
        API value:<br />
        <code>redirect</code>
      </td>
      <td>
        <p>
          Navigates the user from a source URL to a target URL, according to the rule configuration, by replying with an HTTP redirect.
        </p>
        <p>
          Only available for <a href="/rules/url-forwarding/single-redirects/">Single Redirects</a> and <a href="/rules/url-forwarding/bulk-redirects/">Bulk Redirects</a>.
        </p>
        <p>
          In the Cloudflare dashboard, this action is not listed in action selection dropdowns. To use this action, create a redirect rule or a bulk redirect rule.
        </p>
      </td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>
        <strong>Route</strong><br />
        <br />
        API value:<br />
        <code>route</code>
      </td>
      <td>
        <p>
          Adjusts the <code>Host</code> header, Server Name Indication (SNI), resolved hostname, and/or resolved destination port of incoming requests.
        </p>
        <p>
          Only available for <a href="/rules/origin-rules/">Origin Rules</a>, in the <code>http_request_origin</code> phase.
        </p>
        <p>
          In the Cloudflare dashboard, this action is not listed in action selection dropdowns. To use this action, create an origin rule.
        </p>
      </td>
      <td>No</td>
    </tr>
    <tr>
      <td>
        <strong>Set Configuration</strong><br />
        <br />
        API value:<br />
        <code>set_config</code>
      </td>
      <td>
        <p>
          Changes the configuration settings of one or more Cloudflare products.
        </p>
        <p>
          Only available for <a href="/rules/configuration-rules/">Configuration Rules</a>, in the <code>http_config_settings</code> phase.
        </p>
        <p>
          In the Cloudflare dashboard, this action is not listed in action selection dropdowns. To use this action, <a href="/rules/configuration-rules/create-dashboard/">create a Configuration Rule</a>.
        </p>
      </td>
      <td>No</td>
    </tr>
  </tbody>
</table>

{{</table-wrap>}}

{{<Aside type="note">}}
Cloudflare Firewall Rules, a security product which is not based on the Ruleset Engine, supports a different set of actions, including the _Allow_ and _Bypass_ actions. Refer to [Firewall rules actions](/firewall/cf-firewall-rules/actions/) for more information.
{{</Aside>}}
