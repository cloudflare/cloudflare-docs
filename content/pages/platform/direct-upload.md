---
pcx-content-type: concept
title: Direct Uploads
---

# Direct Uploads

With Direct Uploads, you can bring your prebuilt assets right to Pages. By using your own continuous integration (CI) tooling to handle the build, deploy your website's assets right to the Cloudflare edge network.

## Methods to uploading

Once you have your prebuilt assets ready, there are two ways to begin uploading: 

* [Wrangler](/pages/platform/direct-upload/#wrangler-cli).
* [Drag and drop](/pages/platform/direct-upload/#drag-and-drop).

{{<Aside type= "note">}}
  
Within a project, you can switch between creating deployments with either method. However, you cannot push additional changes through your standard Git integration within the same project if that repository is already using Direct Uploads.

{{</Aside>}}

## Supported file types

Below is the supported file types for each Direct Upload options:
* Wrangler: A single folder of assets(for example, HTML, CSS, JS, PNG, SVG).
* Drag and drop: Zip or folder of assets(for example, HTML, CSS, JS, PNG, SVG).

## Wrangler CLI 

### Set up Wrangler

To begin, [install and set up the latest version of Wrangler](/workers/wrangler/get-started/). Note that Pages integration with Wrangler relies on Wrangler 2.

#### Deploy your project with Wrangler

Run the following Wrangler command to create a project: 

```sh
wrangler pages publish <project directory>
```

After running `wrangler pages publish`, you will be prompted to choose whether you would like to publish assets for an existing project or if you would like to create a new one. To begin a new project, select create a new project, continue to name your project, and deploy. Subsequent deployments will reuse these values (saved in your `node_modules/.cache/wrangler` folder).

After you deploy your Project, go to your newly created Pages project in the Cloudflare dashboard to access deployment details, including its shareable and unique preview URL. 

#### Create a new deployment

After you have deployed your project, you can continue to add new deployments to that project. Deployments will be available at the following convention: `<DEPLOYMENT>.<PROJECT_NAME>.pages.dev`. 

```sh
wrangler pages publish <DIRECTORY> --branch=[BRANCH]
```

{{<Aside type= "note">}}

If you are in a Git workspace, Wrangler will automatically pull the branch information for you. Otherwise, you will be prompted to choose your branch (which will then determine if the deployment is production or preview).

{{</Aside>}}

#### Other useful commands

If you would like to use Wrangler to obtain a list of all available projects for direct upload, use:

```sh
wrangler pages project list
```

If you would like to use Wrangler to obtain a list of all unique preview URLs for a particular project, use:

```sh
wrangler pages deployment list
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

After you have your project created, select **Create a new deployment** to begin a new version of your site. Next, choose whether your new deployment will be made to your production or preview environment. If choosing preview, you can create a new deployment target or enter an existing one. Deployment targets allow you to access all changes at one preview subdomain with the following convention: `<DEPLOYMENT_TARGET>.<PROJECT_NAME>.pages.dev`. 

## Troubleshoot

### Limits

There is a 1,000 file [limit](/pages/platform/limits/#files) for Drag and Drop uploads. All Pages projects have a 25 MiB limit in place for individual file size. 

If using the drag and drop method, a red warning symbol will appear next to an asset if too large and thus unsuccessfully uploaded. In this case, you may choose to delete that asset but you cannot replace it. In order to do so, you must reupload the entire project.

### Using Functions

Drag-and-drop deployments made from the Cloudflare dashboard do not currently support compiling a `functions` folder of Pages Functions. In order to deploy a `functions` folder, you must use Wrangler.

However, note that a `_worker.js` file is supported by both Wrangler and drag-and-drop deployments made from the dashboard.


