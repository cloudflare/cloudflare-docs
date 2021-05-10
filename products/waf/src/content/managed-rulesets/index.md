---
order: 2
---

# Available Managed Rulesets

Cloudflare provides the following Managed Rulesets in the WAF:

<TableWrap><table style="table-layout:fixed; width:100%;">
  <thead>
    <tr>
      <td style='width:30%; white-space:normal'><strong>Ruleset</strong></td>
      <td style='width:70%; word-wrap:break-word; white-space:normal'><strong>Description</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style='width:30%; word-wrap:break-word; white-space:normal'><a href='https://support.cloudflare.com/hc/articles/200172016#4vxxAwzbHx0eQ8XfETjxiN'>Cloudflare Managed Ruleset</a></td>
      <td>Created by the Cloudflare security team, this ruleset provides fast and effective protection for all of your applications. The ruleset is updated frequently to cover new vulnerabilities and reduce false positives.</td>
    </tr>
    <tr>
      <td style='width:30%; word-wrap:break-word; white-space:normal'><a href='/exposed-credentials-check#the-exposed-credentials-check-managed-ruleset'>Cloudflare Exposed Credentials Check Managed Ruleset</a></td>
      <td>Deploy an automated credentials check on your end-user authentication endpoints. For any credential pair, the Cloudflare WAF performs a lookup against a public database of stolen credentials.</td>
    </tr>
    <tr>
      <td style='width:30%; word-wrap:break-word; white-space:normal'><a href='https://support.cloudflare.com/hc/articles/200172016#sJbboLurEVhipzWYJQnyz'>Cloudflare OWASP Core Ruleset</a></td>
      <td>Cloudflare's implementation of the Open Web Application Security Project, or OWASP ModSecurity Core Rule Set. Cloudflare routinely monitors for updates from OWASP based on the latest version available from the official code repository.</td>
    </tr>
    <tr>
      <td style='width:30%; word-wrap:break-word; white-space:normal'>Cloudflare Data Loss Prevention (Beta)</td>
      <td>Created by Cloudflare to address common data loss threats. These rules run on the response Phase and monitor download of files or specific sensitive data — for example, financial and personally identifiable information.</td>
    </tr>
  </tbody>
</table></TableWrap>

<Aside type='note' header='Note'>

The Cloudflare OWASP Core Ruleset is designed to work as a single entity to calculate threat scores and execute actions based on the score. When a scoring rule in the ruleset matches a request, the threat score increases.
The final rule in the OWASP ruleset triggers an action based on a threshold for the threat score.
You can configure the ruleset by overriding the threat score threshold in the final rule.
You can also activate or deactivate scoring rules by overriding the paranoia level categories.

</Aside>
