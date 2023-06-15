---
title: Manage versions
pcx_content_type: how-to
weight: 3
---

# Manage versions

{{<render file="_version-definition.md">}}

---

## Create version

{{<render file="_enable-default-creation.md">}}

If you need to test out different implementations of configurations at the same time or multiple types of changes, create a new version of your zone.

To create a new version:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account and zone.
3. Go to **Version Management**.
4. On an existing version, select **Clone**. This will copy over all configuration settings from that version.
5. If needed, you can also **Edit Description** to provide more detail about the purpose of this version.

---

## Change settings in a version

Your zone settings are split up into two areas: **Global Settings** and different versions.
-   Global settings control the non-versionable settings of a zone and - when changed - automatically apply to all versions of your zone.
- Version settings update the versionable settings of your zone and are:
    - Editable when not applied to a [read-only environment](/version-management/reference/read-only-environments/).
    - Applied when [associated with an environment](/version-management/how-to/environments/#change-environment-version).

### Editable versions

{{<render file="_edit-version.md">}}

{{<Aside type="note">}}

To change the version associated with an environment, you need to update settings on the [Environment](/version-management/how-to/environments/#change-environment-version) itself.

{{</Aside>}}

### Read-only versions

{{<render file="_production-read-only-default.md">}}
<br/>

In order to change settings in a version associated with a [read-only environment](/version-management/reference/read-only-environments/), either:

- [Change the environment version](/version-management/how-to/environments/#change-environment-version) to another version and then make changes to your version.
- [Edit](/version-management/how-to/environments/#edit-environment) the environment's settings to remove the **Read-only environment** setting. Then, promote a new version to this environment.

---

## View metrics

Once you begin [sending traffic](/version-management/reference/traffic-filters/) to an environment with a version applied, you can also view metrics about what happens to that traffic. 

To view metrics:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account and zone.
3. Go to **Version Management**.
4. On an existing version, select **View Metrics**.