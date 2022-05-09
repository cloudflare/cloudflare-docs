---
pcx-content-type: concept
title: Branch build controls
---

## Branch build controls 

When connected to your git source, Pages allows you to control which environments and branches you would like to automatically build. By default, Pages will trigger a build any time you commit to either your production or preview environment. However, with branch build controls, you can configure automatic deployments to suit your preference on a per project basis.

### Skip builds

Without any configuration required, you can choose to skip a build and deployment on an adhoc basis. By adding the `[CISkip]`, `[CI-Skip]`, `[Skip CI]`, `[Skip-CI]` or `[CF-Pages-Skip]` flag as a prefix in your commit message, Pages will omit that build/deployment. The prefixes are case insensitive. 

However, if you would like to configure your project’s settings for automatic deployments without having to use CI Skip, go to your Pages project > **Settings** > **Build & deployments** and select the configuration option for either the production deployment or the preview deployment.


### Production branch control 

To configure deployment options, go to your Pages project > **Settings** > **Builds & deployments** > **Configure Production deployments**. Pages will default to setting your production environment to the branch you first push, but you can set your production to another branch if you choose. 

You can also enable or disable automatic deployment behavior on the production branch by checking the **Enable automatic production branch deployments** box. You must save your settings in order for the new production branch controls to take effect. 

![Configure your preview deployments by following the steps above](../media/configure-preview-deployment.png)

### Preview branch control 

When configuring automatic builds for preview deployments, there are three options to choose from. 

* **All non-Production branches**: By default, Pages will automatically deploy any and every commit to a preview branch.
* **None**: Turns off automatic builds for all preview branches.
* **Custom branches**: Customize the automatic deployments of certain preview branches.

![Choose what kind of preview deployment you need for your Pages project in the Cloudflare dashboard](../media/include-preview-brances.png)

#### Custom preview branch control  

By selecting **Custom branches**, you can specify branches you wish to include and exclude from automatic deployments in the provided configuration fields. The configuration fields can be filled in two ways: 

* **Static branch names**: Enter the precise name of the branch you are looking to include or exclude (for example, staging or dev).
* **Wildcard syntax**: Use wildcards to match multiple branches. You can specify wildcards at the start or end of your rule. The order of execution for the configuration is:

<ol>
  <ol>
    <li>Excludes</li>
    <li>Includes</li>
    <li>Skip</li>
  </ol>
</ol>

Pages will process the exclude configuration first, then go to the include configuration. If a branch does not match either then it will be skipped.

#### Wildcards

A wildcard (`*`) is a character that is used within rules. It can be placed alone to match anything or placed at the start or end of a rule to allow for better control over branch configuration. A wildcard will match zero or more characters. 

For example, if you wanted to match all branches that started with `fix/` then you would create the rule `fix/*` to match strings like `fix/1`, `fix/bugs`or `fix/`.

**_Example 1:_**
    
If you want to enforce branch prefixes such as `fix/`, `feat/`, or `chore/` with wildcard syntax, you can include and exclude certain branches with the following rules:

* Include Preview branches:
`fix/*`, `feat/*`, `chore/*`

* Exclude Preview branches:
``
    
Here Pages will include any branches with the indicated prefixes and exclude everything else. In this example, the excluding option is left empty.

**_Example 2:_**

If you wanted to prevent [dependabot](https://github.com/dependabot) from creating a deployment for each PR it creates, you can exclude those branches with the following:

* Include Preview branches:
`*`

* Exclude Preview branches:
`dependabot/*`

Here Pages will include all branches except any branch starting with `dependabot`. In this example, the excluding option means any `dependabot/`  branches will not be built.

**_Example 3:_**

If you only want to deploy release-prefixed branches, then you could use the following rules:

* Include Preview branches:
`release/*`

* Exclude Preview branches:
`*`

This will deploy only branches starting with `release/`.
