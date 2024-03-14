---
pcx_content_type: concept
title: Rollbacks
---

# Rollbacks

Rollbacks allow you to instantly revert your project to a previous production deployment.

Any production deployment that has been successfully built is a valid rollback target. When your project has rolled back to a previous deployment, you may still rollback to deployments that are newer than your current version.

{{<Aside type="warning">}}
Preview deployments are not valid rollback targets. Additionally, a deployment brnach must have at least two commits in order for rollbacks to be made accessible from the UI. Otherwise, the **Rollback to this deployment** option will not be presented.
{{</Aside>}}

In order to perform a rollback, go to **Deployments** in your Pages project. Browse the **All deployments** list and select the three dotted actions menu for the desired target. Select **Rollback to this deployment** for a confirmation window to appear. When confirmed, your project's production deployment will change instantly.

![Deployments for your Pages project that can be used for rollbacks](/images/pages/platform/rollbacks.png)

## Related resources

- [Preview Deployments](/pages/configuration/preview-deployments/)
- [Pausing Automatic Builds](/pages/configuration/git-integration/#pausing-automatic-builds)
