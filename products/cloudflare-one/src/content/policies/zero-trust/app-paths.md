---
order: 4
---

# Application Paths

You can create unique rules for parts of an application that share a root path. When multiple rules are set for a common root path, they do not inherit rules. Instead, the more specific rule takes precedence. 

## Example scenario

An example application is deployed at `dashboard.com/eng` that anyone on the engineering team should be able to access. A policy called *engineering* restricts access to that path to members of the engineering team.

That policy may look like:

![Policy A](../../static/documentation/applications/app-path-1.png)


However, a tool deployed at `dashboard.com/eng/exec` should only be accessed by the executive team. When using only Policy A, this path inherits the rules from Policy A and members of the engineering team can access that path. To restrict access to `dashboard.com/eng/exec`, you'll need to create a second policy, e.g., *executives*, that grants access to the executive team only.

![Policy B](../../static/documentation/applications/app-path-2.png)

When applying *executives* to `dashboard.com/eng/exec`, the more specific policy takes precedence (*executives*), and the `/exec` path is gated by *executives*.

## Subdomains

You can configure an application for an apex domain, a particular subdomain, or all subdomains. This allows you to choose between protecting an entire website behind Access, or a specific path. To protect an entire website, leave the path field empty. To protect a subdmain, specify its path, for example `/admin`.

Access does not support overlapping definitions. For example, when setting rules for `/admin` and `/admin/specific` separately, `/admin/specific` does not inherit the rule set for `/admin`. The more specific rule is enforced.

Access does not support port numbers in the URL. Requests to URLs with port numbers are redirected to the URL and the port numbers stripped.

### Using wildcards in rules

Wildcard rules use an asterisk (`*`) in the *Subdomain* field in the Application Overview menu. Using a wildcard while configuring an application allows you to extend that application to all subdomains of a given apex domain at once.

When using wildcards in rules, keep in mind that:

* Using a wildcard in the *Subdomain* field **does not cover the apex domain**. You must create dedicated rules for the apex domain.

| Wildcard | Covers | Doesn't cover |
| -------- | ------ | ------------- |
| `*.example.com` | `alpha.example.com`, `beta.example.com` | `example.com` |

* Using a wildcard in the *Subdomain* field **does not cover multi-level subdomains**.

| Wildcard | Covers | Doesn't cover |
| -------- | ------ | ------------- |
| `*.example.com` | `test.example.com` | `test.beta.example.com` |


