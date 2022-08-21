---
pcx_content_type: concept
title: Direct Uploads
---

# Direct Uploads

Direct Uploads enable you to upload your prebuilt assets to the Pages platform and deploy them to the Cloudflare edge network. This guide will instruct you how to upload your assets using Wrangler or the Drag and Drop method.

## Upload methods

After you have your prebuilt assets ready, there are two ways to begin uploading:

* [Wrangler](/pages/platform/direct-upload/#wrangler-cli).
* [Drag and Drop](/pages/platform/direct-upload/#drag-and-drop).

{{<Aside type= "note">}}

Within a Direct Uploads project, you can switch between creating deployments with either Wrangler or Drag and Drop. However, you cannot create deployments with Direct Uploads on a project that you created through Git integration on the dashboard. Only projects created with Direct Uploads can be updated with Direct Uploads.

{{</Aside>}}

## Supported file types

Below is the supported file types for each Direct Upload options:
* Wrangler: A single folder of assets. (Zip files are not supported.)
* Drag and Drop: A zip file or single folder of assets.

## Wrangler CLI

### Set up Wrangler

To begin, [install and set up the latest version of Wrangler](/workers/wrangler/get-started/). Note that Pages relies on Wrangler 2.

#### Create your project

Log in to Wrangler with the `wrangler login` command then run the following command:

```sh
$ wrangler pages project create
```

You will then be prompted to specify the project name. Your project will be served at `<PROJECT_NAME>.pages.dev` (or your project name plus a few random characters if your project name is already taken). You will also be prompted to specify your production branch.

Subsequent deployments will reuse both of these values (saved in your `node_modules/.cache/wrangler` folder).


#### Publish your assets

From here, you have created an empty project and can now publish your assets for your first deployment and for all subsequent deployments in your production environment. To do this, execute the following command:

```sh
$ wrangler pages publish <OUTPUT_DIRECTORY>
```

Your production deployment will be available at `<PROJECT_NAME>.pages.dev`.

{{<Aside type= "note">}}

Before using the `wrangler publish` command, you will need to make sure you are inside the project. If not, you can also pass in the project path.

{{</Aside>}}

However, to publish assets to a preview environment, run:

```sh
$ wrangler pages publish <OUTPUT_DIRECTORY> --branch=<BRANCH_NAME>
```

For every branch you create, a branch alias will be available to you at `<BRANCH_NAME>.<PROJECT_NAME>.pages.dev`.

{{<Aside type= "note">}}

If you are in a Git workspace, Wrangler will automatically pull the branch information for you. Otherwise, you will need to specify your branch in this command.

{{</Aside>}}

If you would like to streamline the project creation and asset publishing steps, you can also use the publish command to both create and publish assets at the same time. If you execute this command first, you will still be prompted to specify your project name and production branch. These values will still be cached for subsequent deployments as stated above. If the cache already exists and you would like to create a new project, you will need to run the [`create` command](#create-your-project).

#### Other useful commands

If you would like to use Wrangler to obtain a list of all available projects for direct upload, use:

```sh
$ wrangler pages project list
```

If you would like to use Wrangler to obtain a list of all unique preview URLs for a particular project, use:

```sh
$ wrangler pages deployment list
```

For step-by-step directions on how to use Wrangler and continuous integration tools like GitHub Actions, Circle CI, and Travis CI together for continuous deployment, refer to [Use Direct Upload with continuous integration](/pages/how-to/use-direct-upload-with-continuous-integration/).

## Drag and drop

#### Deploy your project with drag and drop

To deploy with drag and drop:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. In **Account Home**, select your account > **Pages**.
3. Select **Create a project** > **Direct Upload** > enter your project name in the provided field > **Create project**.

Your project will be served from `<PROJECT_NAME>.pages.dev`. Next drag and drop your build output directory into the uploading frame. Once your files have been successfully uploaded, select **Save and Deploy** and continue to your newly deployed project.

#### Create a new deployment

After you have your project created, select **Create a new deployment** to begin a new version of your site. Next, choose whether your new deployment will be made to your production or preview environment. If choosing preview, you can create a new deployment branch or enter an existing one.

## Troubleshoot

### Limits

Regarding file count:

* For Wrangler uploads, there is a {{<snippet id="cf-pages-limits-file-count">}} file limit.
* For Drag and Drop uploads, there is a {{<snippet id="cf-pages-limits-drag-and-drop-file-count">}} file limit.

On both upload methods, there is a {{<snippet id="cf-pages-limits-file-size">}} limit in place for individual file size.


If using the Drag and Drop method, a red warning symbol will appear next to an asset if too large and thus unsuccessfully uploaded. In this case, you may choose to delete that asset but you cannot replace it. In order to do so, you must reupload the entire project.

### Using Functions

Drag-and-drop deployments made from the Cloudflare dashboard do not currently support compiling a `functions` folder of Pages Functions. In order to deploy a `functions` folder, you must use Wrangler.

However, note that a `_worker.js` file is supported by both Wrangler and drag-and-drop deployments made from the dashboard.


