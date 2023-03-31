---
title: Get started
pcx_content_type: get-started
weight: 3
---

# Get started

Follow this tutorial to start testing and deploying zone configuration changes with Version Management.

## Step 1 - Enable versioning

{{<render file="_enable-versioning.md">}}

## Step 2 (optional) - Create additional environments

{{<render file="_enable-default-creation.md">}}

These environments each serve a specific purpose and are accessed differently:
{{<render file="_environment-defaults.md">}}

{{<render file="_create-environment-situation.md">}}
<br/>

For more details, refer to [Create environment](/version-management/how-to/environments/#create-environment).

## Step 3 - Update settings

{{<render file="_edit-version.md">}}
<br/>

## Step 4 - Test version

Once you have made changes to a version, apply that version to your lowest-ranked environment.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account and zone.
3. Go to **Version Management**.
4. Go to **Environments**.
5. On your lowest-ranked environment, use the **Version** dropdown to select your desired version.

To test your version, send requests to that environment that match the pattern specified in its [traffic filters](/version-management/reference/traffic-filters/).

For more details about what happens to these requests, refer to the version's [metrics](/version-management/how-to/versions/#view-metrics).

## Step 5 - Promote version

Next, [promote](/version-management/how-to/environments/#change-environment-version) your version through your different environments.

{{<render file="_promote-version.md">}}

After promoting to each environment, test the new version in your new environment.

## Step 6 - Repeat

For new changes to your zone, [create a new version](/version-management/how-to/versions/#create-version) and repeat this process.