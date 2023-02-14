---
pcx_content_type: concept
title: Application paths
weight: 5
---

# Application paths

Application paths define the URLs protected by an Access policy. When adding a [self-hosted web application](/cloudflare-one/applications/configure-apps/self-hosted-apps/) to Access, you can choose to protect the entire website by entering its apex domain, or alternatively, protect specific subdomains and paths.

## Inheritance

Cloudflare Zero Trust allows you to create unique rules for parts of an application that share a root path. Imagine an example application is deployed at `dashboard.com/eng` that anyone on the engineering team should be able to access. However, a tool deployed at `dashboard.com/eng/exec` should only be accessed by the executive team.

When multiple rules are set for a common root path, the more specific rule takes precedence. For example, when setting rules for `dashboard.com/eng` and `dashboard.com/eng/exec` separately, the more specific rule for `dashboard.com/eng/exec` takes precedence, and no rule is inherited from `dashboard.com/eng`. If no separate, specific rule is set for `dashboard.com/eng/exec`, it will inherit any rules set for `dashboard.com/eng`.

## Wildcards

When you create an application for a specific subdomain or path, you can use asterisks (`*`) as wildcards. Wildcards allow you to extend the application you are creating to multiple subdomains or paths in a given apex domain.

### Protect all subdomains of an apex domain

Using a wildcard in the _subdomain_ field **does not cover the apex domain**.

{{<table-wrap>}}

| Entry           | Covers                                  | Doesn't cover |
| --------------- | --------------------------------------- | ------------- |
| `*.example.com` | `alpha.example.com`, `beta.example.com` | `example.com` |

{{</table-wrap>}}

### Protect all paths of an apex domain

If you want to protect an apex domain and all of the paths under it, leave the path field empty.

{{<table-wrap>}}

| Entry         | Covers                                                 | Doesn't cover       |
| ------------- | ------------------------------------------------------ | ------------------- |
| `example.com` | `example.com`, `example.com/alpha`, `example.com/beta` | `alpha.example.com` |

{{</table-wrap>}}

To protect all the paths under an apex domain, but not the apex domain itself, use a wildcard in the _path_ field.

{{<table-wrap>}}

| Entry           | Covers                                  | Doesn't cover |
| --------------- | --------------------------------------- | ------------- |
| `example.com/*` | `example.com/alpha`, `example.com/beta` | `example.com` |

{{</table-wrap>}}

### Protect multi-level subdomains

Using a wildcard in the _subdomain_ field to protect multi-level subdomains **does not cover that subdomain's top subdomain nor the apex domain**.

{{<table-wrap>}}

| Entry                | Covers                                            | Doesn't cover                     |
| -------------------- | ------------------------------------------------- | --------------------------------- |
| `*.test.example.com` | `alpha.test.example.com`, `beta.test.example.com` | `example.com`, `test.example.com` |

{{</table-wrap>}}

### Protect multi-level paths

Using a wildcard in the _path_ field to protect multi-level paths **does not cover that subpath's parent path nor the apex domain**.

{{<table-wrap>}}

| Entry                 | Covers                                           | Doesn't cover                     |
| --------------------- | ------------------------------------------------ | --------------------------------- |
| `example.com/alpha/*` | `example.com/alpha/one`, `example.com/alpha/two` | `example.com`, `example.com/beta` |

{{</table-wrap>}}

{{<Aside type="warning" header="Important">}}

You cannot use wildcards to partially match subdomain and path names. Using asterisks in any way other than the ones outlined above **will cause the wildcard to be invalidated**. This means your application won't be effective, and neither will be any rules you may try to enforce on it at a later time.

| Entry               | Does NOT cover                               |
| ------------------- | -------------------------------------------- |
| `example.com/cat-*` | `example.com/cat`, `example.com/cat-food`    |
| `*ing.example.com`  | `ing.example.com`, `engineering.example.com` |

{{</Aside>}}

## Unsupported URLs

### Port numbers

Port numbers are not supported in Access application paths. If a request includes a port number in the URL, Access will strip the port number and redirect the request to the default HTTP/HTTPS port.

### Anchor links

Since anchor links are processed by the browser and not the server, Access applications do not support `#` characters in the URL. For example, requests to `dashboard.com/#settings` will redirect to `dashboard.com`.
