---
pcx_content_type: concept
title: Build watch paths 
---

# Build watch paths

When connected to your git source, Pages allows you to watch for push events affecting specific paths to build. By default, Pages will trigger a deployment any time you push to your repository. This can be especially helpful if you are using a monorepo project structure and want to limit the amount of builds being kicked off. 

## Configure paths 

Because pushes to your repo by default trigger an automatic build, you can configure both include and exclude paths for your repository. This way, commits that alter any files within the includes list will trigger automatic builds, and commits that alter only files within the excludes list will skip the build. 

To configure deployment options, go to your Pages project > Settings > Builds & deployments > Build watch paths. Pages will default to setting your project’s includes paths to everything ([*]) and excludes paths to nothing (`[]`).  

The configuration fields can be filled in two ways:

* **Static filepaths**: Enter the precise name of the file you are looking to include or exclude (for example, `docs/README.md`).
* **Wildcard syntax:** Use wildcards to match multiple path directories. You can specify wildcards at the start or end of your rule. 

For each path in a push event, build watch paths will be evaluated as follows:
  * Paths satisfying excludes conditions are ignored first 
  * Any remaining paths are checked against includes conditions 
  * If any matching path is found, a build is triggered. Otherwise the build is skipped

Pages will bypass the path matching for a push event and default to building the project if: 
* A push event contains 0 file changes, in case a user pushes a dummy push event 
* A push event contains 3000+ file changes or 20+ commits

## Examples

### Example 1
 If you want to trigger a build from all changes within a set of directories, such as all changes in the folders `project-a/` and `packages/` 
* Include paths: `project-a/*, packages/*`
* Exclude paths: ``

### Example 2
If you want to trigger a build for any changes, but want to exclude changes to a certain directory, such as all changes in a docs/ directory
* Include paths: `*`
* Exclude paths: `docs/*`

### Example 3
If you want to trigger a build for a specific file or specific filetype, for example all files ending in `.md`.
* Include paths: `*.md`
* Exclude paths: ``




