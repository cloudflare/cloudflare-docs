---
pcx_content_type: concept
title: Monorepos
---

# Monorepos
While some apps are built from a repository’s root, Pages also supports apps with more complex setups. A monorepo is a repository that has multiple subdirectories each containing its own application.

## Set up
You can create multiple projects with the same repository. You have the option to set the root directory of your project to tell Pages where you would like your build command to run. All project names must be unique even if connected to the same repository.

## Builds
When you connect a monorepo to Pages, any change to that repository despite the path will trigger a build to Pages by default. To avoid duplicative builds, you can [include/exclude build watch paths](/pages/configuration/build-watch-paths) to specify if Pages should skip a build.

## Git integration
Once you've created a separate project for each of the directories within your Git repository, each commit will issue a new build and deployment for all connected projects unless specified in your branch watch paths configuration. Your git source will display separate comments for each project with the updated project and deployment URL.

### GitHub check runs and GitLab commit statuses
If you have multiple projects associated with your repository, your check run/commit status will appear like the following on your repository:

![GitHub check run](/images/pages/configuration/ghcheckrun.png)
![GitLab commit status](/images/pages/configuration/glcommitstatus.png)

If a build skips for any reason (i.e. CI Skip, build watch paths, or branch deployment controls), the check run/commit status will not appear.

## Monorepo management tools:
It is common to use additional tooling when bringing a monorepo to Pages to help manage your repository. For simple subpackage management, you can utilize tools like [npm](https://docs.npmjs.com/cli/v8/using-npm/workspaces), [pnpm](https://pnpm.io/workspaces), and [Yarn](https://yarnpkg.com/features/workspaces) workspaces. You can also use more powerful tools such as [Turborepo](https://turbo.build/repo/docs), [NX](https://nx.dev/getting-started/intro), or [Lerna](https://nx.dev/getting-started/intro) to additionally manage dependencies and task execution.

## Limitations
* You must be using Build System V2 or later in order for monorepo support to be enabled.
* A soft limit of 5 projects per repo is imposed in order to prevent abuse. If you need this limit raised, contact your Cloudflare account team or use the [Limit Increase Request Form](https://docs.google.com/forms/d/e/1FAIpQLSd_fwAVOboH9SlutMonzbhCxuuuOmiU1L_I5O2CFbXf_XXMRg/viewform).
