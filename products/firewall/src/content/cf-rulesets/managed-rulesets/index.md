---
title: Work with managed rulesets
alwaysopen: true
order: 760
---

# Work with managed rulesets

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

**Managed rulesets** are rulesets your account is entitled to deploy but does not own. The owner of a managed ruleset is the **ruleset issuer**.

The issuer configures the default action and status for each rule in the ruleset. Only the issuer can modify the ruleset. The following code shows a rule configuration in a managed ruleset.

```json
    "rules": [
      {
        "id": "{rule-id}",
        "version": "1",
        "action": "block",
        "categories": [
          "drupal",
          "header",
          "wordpress"
        ],
        "last_updated": "2020-10-06T13:42:43.969912Z",
        "ref": "{reference}",
        "enabled": true
      }]

```

The issuer can add `categories` tags to rules in managed rulesets they own. Rules can have more than one `categories` tag. The rule in the example above is tagged with three categories.

You cannot edit or delete a managed ruleset, but you can override the configured default values when you deploy the ruleset from your root ruleset. You can override the behavior of an entire ruleset, the behavior of rules within a category, or the behavior of individual rules. You can delete the deployment of a managed ruleset from your root ruleset.

### Available Managed Rulesets

Cloudflare provides the following managed rulesets:

<TableWrap><table style="table-layout:fixed; width:100%;">
  <thead>
    <tr>
      <td style='width:30%; white-space:normal'><strong>Ruleset</strong></td>
      <td style='width:70%; word-wrap:break-word; white-space:normal'><strong>Description</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style='width:30%; word-wrap:break-word; white-space:normal'><a href='https://support.cloudflare.com/hc/en-us/articles/200172016-Understanding-the-Cloudflare-Web-Application-Firewall-WAF-#4vxxAwzbHx0eQ8XfETjxiN'>Cloudflare Managed Ruleset</a></td>
      <td>Created by the Cloudflare security team, this ruleset provides fast and effective protection for all of your applications. The ruleset is updated frequently to cover new vulnerabilities and reduce false positives.</td>
    </tr>
    <tr>
      <td style='width:30%; word-wrap:break-word; white-space:normal'><a href='https://support.cloudflare.com/hc/en-us/articles/200172016-Understanding-the-Cloudflare-Web-Application-Firewall-WAF-#sJbboLurEVhipzWYJQnyz'>Cloudflare OWASP Core Ruleset</a></td>
      <td>Cloudflare's implementation of the Open Web Application Security Project (OWASP) ModSecurity Core Rule Set. Cloudflare routinely monitors for updates from OWASP based on the latest version available from the official code repository.</td>
    </tr>
  </tbody>
</table></TableWrap>

<Aside type='note' header='Note'>

The Cloudflare OWASP Core Ruleset is designed to work as a single entity to calculate threat scores and execute actions based on the score. When a scoring rule in the ruleset matches a request, the threat score increases.
The final rule in the OWASP ruleset triggers an action based on a threshold for the threat score.
You can configure the ruleset by overriding the threat score threshold in the final rule.
You can also activate or deactivate scoring rules by overriding the paranoia level categories.

</Aside>

### Versions of Rulesets

Issuers can create new versions of a managed ruleset. Multiple versions of a managed ruleset can be in use at the same time.  When you deploy a managed ruleset, the most recent version of the ruleset is selected by default.

## Get started

To view your rulesets, see [view rulesets](/cf-rulesets/view-rulesets/).

To deploy a managed ruleset from your root ruleset, see [deploy a managed ruleset](/cf-rulesets/managed-rulesets/deploy-managed-ruleset/).

You cannot edit a managed ruleset, but you can customize managed ruleset behavior by using overrides when deploying it from your root ruleset. See [override a managed ruleset](/cf-rulesets/managed-rulesets/override-managed-ruleset).