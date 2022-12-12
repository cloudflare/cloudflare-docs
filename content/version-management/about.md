---
title: About
pcx_content_type: concept
weight: 2
---

# How it works

Version Management work through a combination of **environments** and **versions**.

<div class="mermaid">
stateDiagram-v2
    V2: Version 2
    V22: Version 2 <br/>(Automatically added)
    V23: Version 2 <br/>(promoted from Dev)
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
</div>

## Environments

An environment is a container used to test different **versions** of your zone configurations.

When you first [enable](/version-management/how-to/enable/) version management, Cloudflare will automatically create three environments for you: **Development**, **Staging**, and **Production**.

Versions of different configurations typically move in this order. Once you test a version in your **Development** environment, you would promote that version to the **Staging** environment and - with no issues - then promote to **Production**.

If your organization requires more environments - such as **Testing** - you can [create](/version-management/how-to/environments/) as many as needed.

To send traffic to specific environments, review the [traffic filters](/version-management/reference/traffic-filters/) on the enviroment and update the required characteristics - **Edge Server IP**, **Cookie**, **Hostname**, or **User Agent** - of your requests.

## Versions

A version is a collection of configuration settings related to your zone, such as Firewall Rules, Page Rules, and [other optimization settings](/version-management/reference/available-settings/).

When you first [enable](/version-management/how-to/enable/) version management, Cloudflare will automatically **Version 1** of your zone, which duplicates all existing zone settings. The same applies when you [**Clone**](/version-management/how-to/versions/) an existing zone: Cloudflare automatically copies over configuration settings from the existing version.

Within each version, you can [update](/version-management/how-to/manage-applications-and-versions/#edit-a-version) settings as needed. These settings are saved automatically.

Version settings are applied to zone traffic when you when you [promote a version](/version-management/how-to/environments/) to a new environment and then send traffic to that environment (via [traffic filters]([traffic filters](/version-management/reference/traffic-filters/)).