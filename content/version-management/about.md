---
title: About
pcx_content_type: concept
weight: 2
---

# How it works

Version Management works through a combination of **environments** and **versions**.

```mermaid
stateDiagram-v2
    V2: Version 2
    V22: Version 2 <br/>(applied manually)
    V23: Version 2 <br/>(promoted from Development)
    V24: Version 2 <br/>(promoted from Staging)
    Revert: Production (rollback)
    V1: Version 1 <br/>(rolled back due to issues)
    V2 --> Development
    Development --> Staging
    Staging --> Production
    Production --> Revert
    state Development {
        V22
    }
    note right of Development
            At each level, test then promote the version.
        end note
    state Staging {
        V23
    }
    state Production {
        V24
    }
    state Revert {
        V1
    }
    note right of Revert
            Once promoted into an environment, a version can be rolled back.
        end note
```

## Environments

{{<render file="_environment-definition.md">}}
<br/>

When you first [enable](/version-management/how-to/enable/) version management, Cloudflare will automatically create three environments for you: 

{{<render file="_environment-defaults.md">}}

When you [create](/version-management/how-to/versions/#create-version) a new version, that version will be available to apply to your **Development** environment (or whatever environment has the lowest rank). Once you test a version in your **Development** environment, you would promote that version to the **Staging** environment and - with no issues - then promote it to **Production**.

To send traffic to specific environments, send requests to that environment that match the pattern specified in its [traffic filters](/version-management/reference/traffic-filters/).

## Versions

{{<render file="_version-definition.md">}}
<br/>

{{<render file="_enable-default-creation.md">}}

When your version is ready, you would then test and promote it through various environments until it reaches **Production** (or whatever your final environment is).

You can create a new version at any time by choosing to [**Clone**](/version-management/how-to/versions/#create-version) an existing version, which automatically copies over configuration settings from an existing version.

Version settings are applied to zone traffic when you when you [promote a version](/version-management/how-to/environments/#promote-a-version) to a new environment and then send traffic to that environment that matches the pattern specified in its [traffic filters](/version-management/reference/traffic-filters/).