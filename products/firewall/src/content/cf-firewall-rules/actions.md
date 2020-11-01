---
order: 220
---

# Actions

## Overview

Actions tell Cloudflare how to handle HTTP requests that have matched a firewall rule expression.

## Supported Actions

The table below lists the actions available in Firewall Rules. These actions are listed in order of precedence. If the same request matches two different rules which have the same priority, precedence determines the action to take.

For example, the _Allow_ action takes precedence over the _Block_ action. In a case where a request matches a rule with the _Allow_ action and another with the _Block_ action, precedence resolves the tie, and Cloudflare allows the request.

The only exception to this behavior involves the _Log_ action. Unlike the other actions, _Log_ does not terminate further evaluation within Firewall Rules. This means that if a request matches two different rules and one of those rules specifies the _Log_ action, the second action will be triggered instead, even though _Log_ has precedence. Although Firewall Rules would not trigger the _Log_ action in this case, Firewall Analytics would still record the hit as an “additional match.”

<TableWrap>
  <table style="width: 100%">
  <thead>
    <tr>
      <td><strong>Action</strong></td>
      <td><strong>Description</strong></td>
      <td><strong>Order of Precedence</strong></td>
    </tr>
  </thead>
    <tbody>
      <tr>
        <td><em>Log</em></td>
        <td>
          <ul>
            <li>Records matching requests in the Cloudflare Logs</li>
            <li>Only available for Enterprise plans</li>
            <li>
              Recommended for validating rules before committing to a more
              severe action
            </li>
          </ul>
        </td>
        <td>1</td>
      </tr>
      <tr>
        <td><em>Bypass</em></td>
        <td>
          <ul>
            <li>
              Allows user to dynamically disable Cloudflare security features
              for a request
            </li>
            <li>Available to all plans</li>
            <li>
              Matching requests exempt from evaluation by a user-defined list
              containing one or more of the following Cloudflare Firewall
              products/features:
              <ul>
                <li>User-agent Blocking</li>
                <li>Browser Integrity Check</li>
                <li>Hotlinking Protection</li>
                <li>Security Level (IP Reputation)</li>
                <li>Rate Limiting</li>
                <li>Zone Lockdown (PRO, BIZ, ENT)</li>
                <li>WAF Managed Rules (PRO, BIZ, ENT)</li>
              </ul>
            </li>
            <li>
              Requests which match the <em>Bypass</em> action are still subject
              to evaluation (and thus a challenge or block) within Firewall
              Rules, based on the order of execution.
            </li>
          </ul>
        </td>
        <td>2</td>
      </tr>
      <tr>
        <td><em>Allow</em></td>
        <td>
          <ul>
            <li>
              Matching requests are exempt from challenge and block actions
              triggered by other Firewall Rules content.
            </li>
            <li>
              The scope of the <em>Allow</em> action is limited to Firewall
              Rules; matching requests are <strong>not</strong> exempt from
              action by other Cloudflare Firewall products, such as IP Access
              Rules, WAF, etc.
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
        <td><em>Challenge (Captcha)</em></td>
        <td>
          <ul>
            <li>
              Useful for ensuring that the visitor accessing the site is human,
              not automated
            </li>
            <li>
              The client that made the request must pass a Captcha Challenge.
            </li>
            <li>
              If successful, Cloudflare accepts the matched request; otherwise,
              it is blocked.
            </li>
          </ul>
        </td>
        <td>4</td>
      </tr>
      <tr>
        <td><em>JS Challenge</em></td>
        <td>
          <ul>
            <li>
              Useful for ensuring that bots and spam cannot access the requested
              resource; browsers, however, are free to satisfy the challenge
              automatically.
            </li>
            <li>
              The client that made the request must pass a Cloudflare Javascript
              Challenge before proceeding.
            </li>
            <li>
              If successful, Cloudflare accepts the matched request; otherwise,
              it is blocked.
            </li>
          </ul>
        </td>
        <td>5</td>
      </tr>
      <tr>
        <td><em>Block</em></td>
        <td>Matching requests are denied access to the site.</td>
        <td>6</td>
      </tr>
    </tbody>

  </table>
</TableWrap>

## Choosing Actions in the Rule Builder

Choosing an action in the Cloudflare Expression Builder is simple. After naming a rule and building your expression, pick the appropriate option from the **Choose an action** drop-down list. In this example, the chosen action is _Block_:

![Create Firewall Rule page](../images/firewall-rules-actions-1.png)

For more on building firewall rules in the Firewall App, see [_Create, edit, and delete rules_](/cf-dashboard/create-edit-delete-rules/).
