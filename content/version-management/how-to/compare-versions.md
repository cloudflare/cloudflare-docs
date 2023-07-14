---
title: Compare versions
pcx_content_type: how-to
weight: 4
---

# Compare versions

Quickly view differences between versions to make sure your configurations are correct before [promoting a version](/version-management/how-to/environments/#change-environment-version) to a new environment.

A common use case would be to compare the versions in staging and production to verify the changes before promoting the staging version to production.

To compare versions:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select your account and zone.
3. Go to **Version Management** > **Comparisons**.
4. Select two different versions.
5. Select **Compare**.

After a few seconds, the page will update automatically with a comparison on a per-product basis. The lower numbered version will always be presented on the left and the top will show you which environments the versions are assigned to so that you can ensure you are comparing the right versions.

![View changes side-by-side between versions](/images/version-management/compare-versions.png)

Changes will be highlighted for new additions and removals for that service. Based on the comparison, you can then decide if more changes are necessary or if that new version is ready to be rolled out.