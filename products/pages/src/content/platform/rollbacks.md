---
order: 5
pcx-content-type: concept
---

# Rollbacks

Rollbacks allow you to instantly revert your project to a previous production deployment.

Any production deployment that has been successfully built is a valid rollback target. When your project has rolled back to a previous deployment, you may still rollback to deployments that are _newer_ than your current version. Please note that preview deployments are not valid rollback targets.

In order to perform a rollback, select a Pages project and ensure its Deployments tab is activated. Then browse the **All deployments** list and click on the actions menu for the desired target. A confirmation window will appear after clicking on the "Rollback to this deployment" option. When confirmed, your project's production deployment will change instantly.

![rollbacks preview](rollbacks.png)

## See Also

- [Preview Deployments](/platform/preview-deployments)
- [Pausing Automatic Builds](/platform/github-integration#pausing-automatic-builds)
