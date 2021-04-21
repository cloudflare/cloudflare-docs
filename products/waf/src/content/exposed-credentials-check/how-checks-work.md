---
order: 1
---

# How exposed credentials checks work

WAF rules can include a check for exposed credentials. When enabled in a given rule, exposed credentials checking happens when there is a match for the rule expression (that is, the rule expression evaluates to `true`). 

At this point, the WAF looks up the username/password pair in the request against a database of publicly available stolen credentials. When both the rule expression and the exposed credentials check are true, there is a rule match, and Cloudflare performs the action configured in the rule.

For example, the following rule blocks `POST` requests to the `/login.php` URI when Cloudflare identifies the submitted credentials as previously exposed:

<Example>

**Rule #1**

Rule expression:<br/>
`http.request.method == "POST" and http.request.uri == "/login.php"`

Exposed credentials check with the following configuration:
* Username expression: `http.request.body.form["user_id"]`
* Password expression: `http.request.body.form["password"]`

Action: _Challenge (Captcha)_

</Example>

When there is a match for the rule above and Cloudflare detects exposed credentials, the WAF presents the user with a challenge.
