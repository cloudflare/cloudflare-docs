---
title: Manage versions
pcx_content_type: how-to
weight: 3
---

# Manage versions

{{<render file="_version-definition.md">}}
<br/>

{{<Aside type="note">}}

During the open beta, you can only interact with environments and versions using the Cloudflare dashboard.

{{</Aside>}}

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

{{<render file="_edit-version.md">}}

{{<Aside type="note">}}

To change the version associated with an environment, you need to update settings on the [Environment](/version-management/how-to/environments/#change-environment-version) itself.

{{</Aside>}}

---

## View metrics

Once you begin [sending traffic](/version-management/reference/traffic-filters/) to an environment with a version applied, you can also view metrics about what happens to that traffic. 

To view metrics:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account and zone.
3. Go to **Version Management**.
4. On an existing version, select **View Metrics**.