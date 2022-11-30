---
title: Actions
pcx_content_type: reference
weight: 1
meta:
  title: Firewall rules actions
layout: list
---

# Firewall rules actions

{{<content-column>}}

The action of a firewall rule tells Cloudflare how to handle HTTP requests that have matched the rule expression.

## Supported actions

The table below lists the actions available in firewall rules. These actions are listed in order of precedence. If the same request matches two different rules which have the same priority, precedence determines the action to take.

For example, the _Allow_ action takes precedence over the _Block_ action. In a case where a request matches a rule with the _Allow_ action and another with the _Block_ action, precedence resolves the tie, and Cloudflare allows the request.

There are two exceptions to this behavior: the _Log_ and _Bypass_ actions. Unlike other actions, _Log_ and _Bypass_ do not terminate further evaluation within firewall rules. This means that if a request matches two different rules and one of those rules specifies the _Log_ or _Bypass_ action, the second action will be triggered instead, even though _Log_/_Bypass_ has precedence.

{{<Aside type="note">}}

For reference information on rule actions available for Cloudflare products powered by the Ruleset Engine, refer to [Rules language: Actions reference](/ruleset-engine/rules-language/actions/).

{{</Aside>}}

{{</content-column>}}

{{<table-wrap>}}

  <table style="width: 100%">
  <thead>
    <tr>
      <th>Action</th>
      <th>Description</th>
      <th>Order of precedence</th>
    </tr>
  </thead>
    <tbody>
      <tr>
        <td>
          <strong>Log</strong><br/>
          <br/>
          API value:<br/>
          <code class="InlineCode">log</code>
        </td>
        <td>
          <ul>
            <li>Records matching requests in the Cloudflare Logs.</li>
            <li>Only available for Enterprise plans.</li>
            <li>Recommended for validating rules before committing to a more severe action.</li>
          </ul>
        </td>
        <td>1</td>
      </tr>
      <tr>
        <td><strong>Bypass</strong><br/>
          <br/>
          API value:<br/>
          <code class="InlineCode">bypass</code>
        </td>
        <td>
          <ul>
            <li>Allows user to dynamically disable Cloudflare security features for a request.</li>
            <li>Available to all plans.</li>
            <li>
              <p>Matching requests exempt from evaluation by a user-defined list containing one or more of the following Cloudflare security features:</p>
              <ul>
                <li>User-agent Blocking</li>
                <li>Browser Integrity Check</li>
                <li>Hotlinking Protection</li>
                <li>Security Level (IP Reputation)</li>
                <li>Rate Limiting (previous version)</li>
                <li>Zone Lockdown (PRO, BIZ, ENT)</li>
                <li>WAF managed rules (previous version; PRO, BIZ, ENT)</li>
              </ul>
              <p><strong>Notes:</strong></p>
              <ul>
                <li>Currently, you cannot bypass Bot Fight Mode or Super Bot Fight Mode. For more information on these products, refer to <a href="/bots/">Cloudflare bot solutions</a>.</li>
                <li>You cannot bypass the new <a href="/waf/">Cloudflare WAF</a>, only its previous version (<a href="https://support.cloudflare.com/hc/articles/200172016">WAF managed rules</a>).</li>
              </ul>
              <p></p>
            </li>
            <li>Requests which match the <em>Bypass</em> action are still subject to evaluation (and thus a challenge or block) within Firewall Rules, based on the order of execution.</li>
          </ul>
        </td>
        <td>2</td>
      </tr>
      <tr>
        <td><strong>Allow</strong><br/>
          <br/>
          API value:<br/>
          <code class="InlineCode">allow</code>
        </td>
        <td>
          <ul>
            <li>
              Matching requests are exempt from challenge and block actions
              triggered by other firewall rules content.
            </li>
            <li>
              The scope of the <em>Allow</em> action is limited to firewall
              rules; matching requests are <strong>not</strong> exempt from
              action by other Cloudflare security products such as Bot Fight Mode, IP Access
              Rules, and Managed Rulesets.
            </li>
            <li>
              Matched requests will be mitigated if they are part of a DDoS
              attack.
            </li>
          </ul>
        </td>
        <td>3</td>
      </tr>
      <tr>
        <td><strong>Legacy CAPTCHA</strong><br/>
          <br/>
          API value:<br/>
          <code class="InlineCode">challenge</code>
        </td>
        <td>
          <ul>
            <li>
              This option is not recommended. Instead, choose <strong>Managed Challenge (Recommended)</strong>, which issues CAPTCHAs only when necessary.
            </li>
            <li>
              The client that made the request must pass a CAPTCHA challenge.
            </li>
            <li>
              If successful, Cloudflare accepts the matched request; otherwise,
              it is blocked.
            </li>
            <li>For additional information, refer to <a href="#notes-about-challenge-actions">Notes about challenge actions</a>.</li>
          </ul>
        </td>
        <td>4</td>
      </tr>
      <tr>
        <td><strong>Managed Challenge<br/>(Recommended)</strong><br/>
          <br/>
          API value:<br/>
          <code class="InlineCode">managed_challenge</code>
        </td>
        <td>
          <ul>
            <li>
              Helps reduce the lifetimes of human time spent solving CAPTCHAs across the Internet.
            </li>
            <li>
              Depending on the characteristics of a request, Cloudflare will dynamically choose the appropriate type of challenge from the following actions based on specific criteria:
              <ul>
                <li>
                  Show a non-interactive challenge page (similar to the current JS Challenge).
                </li>
                <li>
                  Present an invisible proof of work challenge to the browser.
                </li>
                <li>
                  Show a custom interactive challenge (such as click a button).
                </li>
                <li>
                  Show a CAPTCHA challenge.
                </li>
              </ul>
            </li>
            <li>For additional information, refer to <a href="#notes-about-challenge-actions">Notes about challenge actions</a>.</li>
          </ul>
        </td>
        <td>5</td>
      </tr>
      <tr>
        <td><strong>JS Challenge</strong><br/>
          <br/>
          API value:<br/>
          <code class="InlineCode">js_challenge</code>
        </td>
        <td>
          <ul>
            <li>
              Useful for ensuring that bots and spam cannot access the requested
              resource; browsers, however, are free to satisfy the challenge
              automatically.
            </li>
            <li>
              The client that made the request must pass a Cloudflare JavaScript
              Challenge before proceeding.
            </li>
            <li>
              If successful, Cloudflare accepts the matched request; otherwise,
              it is blocked.
            </li>
            <li>For additional information, refer to <a href="#notes-about-challenge-actions">Notes about challenge actions</a>.</li>
          </ul>
        </td>
        <td>6</td>
      </tr>
      <tr>
        <td><strong>Block</strong><br/>
          <br/>
          API value:<br/>
          <code class="InlineCode">block</code>
        </td>
        <td>Matching requests are denied access to the site.</td>
        <td>7</td>
      </tr>
    </tbody>

  </table>
{{</table-wrap>}}

## Notes about challenge actions

When you configure a firewall rule with one of the challenge actions — _Managed Challenge_, _JS Challenge_, or _Legacy CAPTCHA_ — and a request matches the rule, one of two things can happen:

* The request is blocked if the visitor fails the challenge
* The request is allowed if the visitor passes the challenge

In this last case, no further firewall rules will be processed. This means that the action of any later rules with a challenge or _Block_ action also matching the request will not be applied, and the request will be allowed.