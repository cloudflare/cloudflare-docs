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
<br/>

If you need to test out different implementations of configurations at the same time or multiple types of changes, create a new version of your zone.

To create a new version:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account and zone.
3. Go to **Version Management**.
4. On an existing version, select **Clone**. This will copy over all configuration settings from that version.
5. If needed, you can also **Edit Description** to provide more detail about the purpose of this version.

---

## Change settings in a version

{{<render file="_edit-version.md">}}
<br/>

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