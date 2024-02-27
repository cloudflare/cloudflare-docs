---
title: Isolate Access applications
pcx_content_type: overview
weight: 2
layout: learning-unit
---

{{<Aside type="note">}}
Requires Browser Isolation add-on.
{{</Aside>}}

[Cloudflare Browser Isolation](/cloudflare-one/policies/browser-isolation/) integrates with your web-delivered Access applications to protect sensitive applications from data loss. You can build Access policies that require certain users to access your application exclusively through Browser Isolation, while other users matching different policies continue to access the application directly. For example, you may wish to layer on additional security measures for third-party contractors or other users without a corporate device.

Cloudflare sends all isolated traffic through our Secure Web Gateway inspection engine, which allows you to apply Gateway HTTP policies such as:

- Restrict specific actions and HTTP request methods.
- Inspect the request body to match against [Data Loss Prevention](/cloudflare-one/policies/data-loss-prevention/) (DLP) profiles with as much specificity and control as if the user had deployed an endpoint agent.
- Control users ability to cut and paste, upload and download files, or print while in an isolated session.

```mermaid
flowchart LR
accTitle: Access policies for a private web application
A[Full-time employee]-->policy1-->D
B[Contractor]-->policy2-->E
subgraph C[Access application]
  policy1["Policy 1:
  Allow employees
  who pass device posture checks"]
  policy2["Policy 2:
  Allow and isolate contractors"]
end
D[Normal browsing]
E["Isolated browsing
with HTTP policies applied"]
```

## Prerequisites

{{<render file="access/_isolation-prereqs.md" productFolder="cloudflare-one">}}

## Enable Browser Isolation

{{<render file="access/_enable-isolation.md" productFolder="cloudflare-one">}}

## Example Access policies

The following two Access policies work together to require Browser Isolation for a subset of users. Policy 1 allows employees who are using the Cloudflare WARP client to access the application directly; their traffic already goes through our Secure Web Gateway for inspection. Users who do not match Policy 1, such as employees and contractors on an unmanaged device, are required to access the application through an isolated browser.

- **Policy 1: Allow employees**

  | Action | Rule type | Selector | Value |
  | ------ | ---- | -------- | -----------|
  | Allow  | Include | Emails ending in | `@team.com` |
  |        | Require | WARP | `WARP` |

  | Additional settings | Status  |
  | ------------------- | ------- |
  | Isolate application | Enabled |

- **Policy 2: Allow users without WARP**

  | Action | Rule type | Selector | Value |
  | ------ | ---- | -------- | -----------|
  | Allow  | Include | Emails ending in | `@team.com`, `@contractors.com` |

  | Additional settings | Status  |
  | ------------------- | ------- |
  | Isolate application | Enabled |

## Example HTTP policies

### Block file downloads

Blocks isolated users on unmanaged devices from downloading any files from your private application.

| Selector                     | Operator | Value                 | Logic | Action  |
|------------------------------|----------|-----------------------|-------|---------|
| Host                         | in       | `internal.site.com`   | And   | Isolate |
| Passed Device Posture Checks | not in   | `Corporate serial numbers` |       |         |

| Policy settings | Status |
| --------------  | - |
| Disable file downloads | Enabled |

### Block file downloads of sensitive data

{{<Aside type="note">}}
Requires Data Loss Prevention add-on.
{{</Aside>}}

Block isolated users on unmanaged devices from downloading files that contain credit card numbers. This logic requires two policies:

- **Policy 1: Block file downloads in isolated browser**

  | Selector                     | Operator | Value                 | Logic | Action  |
  |------------------------------|----------|-----------------------|-------|---------|
  | Host                         | in       | `internal.site.com`   | And   | Isolate |
  | Passed Device Posture Checks | not in   | `Corporate serial numbers` |       |         |

  | Policy settings | Status |
  | --------------  | - |
  | Disable file downloads | Enabled |

- **Policy 2: Block credit card numbers**

  | Selector                     | Operator | Value                    | Logic | Action  |
  |------------------------------|----------|--------------------------|-------|---------|
  | Host                         | in       | `internal.site.com`      | And   | Block   |
  | DLP Profile                  | in       | `Financial information`  |       |         |
