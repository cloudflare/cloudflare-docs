---
title: Actions
pcx-content-type: reference
order: 220
---

# Firewall Rules actions

## Overview

The action of a Firewall Rule tells Cloudflare how to handle HTTP requests that have matched the rule expression.

## Supported actions

The table below lists the actions available in Firewall Rules. These actions are listed in order of precedence. If the same request matches two different rules which have the same priority, precedence determines the action to take.

For example, the *Allow* action takes precedence over the *Block* action. In a case where a request matches a rule with the *Allow* action and another with the *Block* action, precedence resolves the tie, and Cloudflare allows the request.

There are two exceptions to this behavior: the *Log* and *Bypass* actions. Unlike other actions, *Log* and *Bypass* do not terminate further evaluation within Firewall Rules. This means that if a request matches two different rules and one of those rules specifies the *Log* or *Bypass* action, the second action will be triggered instead, even though *Log*/*Bypass* has precedence.

<Aside type="note">

For reference information on rule actions available for Cloudflare products powered by the Ruleset Engine, refer to [Rules language: Actions reference](https://developers.cloudflare.com/ruleset-engine/rules-language/actions).

</Aside>

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
        <td><em>Legacy CAPTCHA</em></td>
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
          </ul>
        </td>
        <td>4</td>
      </tr>
      <tr>
        <td><em>Managed Challenge (Recommended)</em></td>
        <td>
          <ul>
            <li>
              Helps reduce the lifetimes of human time spent solving CAPTCHAs across the Internet.
            </li>
            <li>
              Depending on the characteristics of a request, Cloudflare will perform the following actions:
              <ul>
                <li>
                  Show a non-interactive challenge page (similar to the current JS Challenge).
                </li>
                <li>
                  Show a CAPTCHA challenge.
                </li>
              </ul>
            </li>
          </ul>
        </td>
        <td>5</td>
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
              The client that made the request must pass a Cloudflare JavaScript
              Challenge before proceeding.
            </li>
            <li>
              If successful, Cloudflare accepts the matched request; otherwise,
              it is blocked.
            </li>
          </ul>
        </td>
        <td>6</td>
      </tr>
      <tr>
        <td><em>Block</em></td>
        <td>Matching requests are denied access to the site.</td>
        <td>7</td>
      </tr>
    </tbody>

  </table>
</TableWrap>
