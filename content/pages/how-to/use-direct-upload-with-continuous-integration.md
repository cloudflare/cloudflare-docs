---
pcx-content-type: how-to
title: Use Direct Upload with continuous integration
---

# Use Direct Upload with continuous integration

Cloudflare Pages now supports directly uploading prebuilt assets, allowing you to use custom build steps for your applications and deploy to Pages with [Wrangler](/workers/cli-wrangler/). This guide will teach you how to deploy your application to Pages, using continuous integration.

## Deploy with Wrangler

In your project directory, install [Wrangler](/workers/cli-wrangler/) so you can deploy a folder of prebuilt assets by running the following command:

```sh
# Publish created project
CF_ACCOUNT_ID=<ACCOUNT_ID> npx wrangler pages publish <DIRECTORY> --project-name=<PROJECT_NAME>
```
## Get credentials from Cloudflare

### Generate an API Token

To generate an API token:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/profile/api-tokens).
2. Select **My Profile** from the dropdown menu of your user icon on the top right of your dashboard.
3. Select **API Tokens** > **Create Token**.
4. Under **Custom Token**, select **Get started**. 
5. Name your API Token in the **Token name** field.
6. Under **Permissions**, select *Account*, *Cloudflare Pages* and *Edit*:
7. Select **Continue to summary** > **Create Token**.
 
![Follow the instructions above to create an API token for Cloudflare Pages](../media/select-api-token-for-pages.png)
 
Now that you have created your API token, you can use it to push your project from continuous integration platforms.

### Get project account ID 

To find your account ID, log in to the Cloudflare dashboard > select your zone in **Account Home** > find your account ID in **Overview** under **API* on the right-side menu. If you have not added a zone, add one by selecting **Add site**. You can purchase a domain from [Cloudflare's registrar](/registrar/)
 
## Use GitHub Actions
 
[GitHub Actions](https://docs.github.com/en/actions) is a continuous integration and continuous delivery (CI/CD) platform that allows you to automate your build, test, and deployment pipeline when using GitHub. You can create workflows that build and test every pull request to your repository or deploy merged pull requests to production.
 
After setting up your project, you can set up a GitHub Action to automate your subsequent deployments with Wrangler.

### Add Cloudflare credentials to GitHub secrets

In the GitHub Action you have set up, environment variables are needed to push your project up to Cloudflare Pages. To add the values of these environment variables in your project's GitHub repository:

 1. Go to your project's repository in GitHub.
 2. Under your repository's name, select **Settings**.
 3. Select **Secrets** > **Actions** > **New repository secret**.
 4. Create one secret and put **CLOUDFLARE_ACCOUNT_ID** as the name with the value being your Cloudflare account ID.
 5. Create another secret and put **CF_API_TOKEN** as the name with the value being your Cloudflare API token.
 
This will ensure that the secrets are secure. Each time your GitHub Actions runs, it will access these secrets.

Add the value of your Cloudflare account ID and Cloudflare API token as `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`, respectively. This will ensure that these secrets are secure, and each time your Action runs, it will access these secrets.

### Set up a workflow

Create a `.github/workflows/pages-deployment.yaml` file at the root of your project. The `.github/workflows/pages-deployment.yaml` file will contain the jobs you specify on the request, that is: `on: [push]` in this case. It can also be on a pull request. For a detailed explanation of GitHub Actions syntax, refer to the [official documentation](https://docs.github.com/en/actions).

In your `pages-deployment.yaml` file, copy the following content:
 
```yaml
---
filename: .github/workflows/pages-deployment.yaml
---
on: [push]
jobs:
 deploy:
   runs-on: ubuntu-latest
   name: Deploy to Pages
   steps:
     - uses: actions/checkout@v3
     - name: Publish
       uses: cloudflare/wrangler-action@2.0.0
       with:
         apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
         accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
         command: pages publish --project-name=<project name>
```

In the above code block, you have set up an Action that runs when you push code to the repository. Running on `ubuntu-latest`, the Action first reviews your repository with the latest version of Node.

{{<Aside type="note" header="Note">}}

If your project uses a Node version less than 16, you will have to upgrade your Node version as Wrangler requires at least Node.js v16.7.0.

{{</Aside>}}

The next step is to install [Wrangler](/workers/cli-wrangler/) in your project, using the `cloudflare/wrangler-action@2.0.0` Action, which requires you to use the secrets you added to GitHub. The Action makes sure you log in to your account with your Cloudflare credentials, stored as secrets in your project, to publish your site with the `pages publish` command.

## Using CircleCI for CI/CD
 
[CircleCI](https://circleci.com/) is another continuous integration and continuous delivery (CI/CD) platform that allows you to automate your build, test, and deployment pipeline. It can be configured to efficiently run complex pipelines with caching, docker layer caching, and resource classes.
 
Similar to GitHub Actions, CircleCI can use Wrangler to continuously deploy your projects each time to push to your code.
 
### Add Cloudflare credentials to CircleCI
 
After you have generated your Cloudflare API token and found your account ID in the dashboard, you will need to add them to your CircleCI dashboard to use your environment variables in your project.
 
To add environment variables, in the CircleCI web application:

1. Go to your project's settings.
2. Select **Projects** in the side menu.
3. Select the ellipsis (...) button in the project's row. You will see the option to add environment variables.
4. Select **Environment Variables** > **Add Environment Variable**.
5. Enter the name and value of the new environment variable, which is your Cloudflare credentials (`CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`).
 
![Follow the instructions above to add environment variables to your CircleCI settings](../media/project-settings-env-var-v2.png)
 
### Set up a workflow
 
Create a `.circleci/config.yml` file at the root of your project. This file contains the jobs that will be executed based on the order of your workflow. In your `config.yml` file, copy the following content:
 
```yaml
---
filename: .circleci/config.yml
---
version: 2.1
jobs:
 Publish-to-Pages:
   docker:
     - image: cimg/node:18
     environment:
        CLOUDFLARE_ACCOUNT_ID: $CLOUDFLARE_ACCOUNT_ID
        CLOUDFLARE_API_TOKEN: $CLOUDFLARE_API_TOKEN
   
   steps:
     - checkout
     # Run your project's build step
     - run: npm install && npm run build
     # Publish with wrangler
     - run: npx wrangler pages publish dist --project-name=<PROJECT NAME> # Replace dist with the name of your build folder and input your project name 
       
workflows:
 Publish-to-Pages-workflow:
   jobs:
     - Publish-to-Pages
```
 
Your continuous integration workflow is broken down into jobs when using CircleCI. From the code block above, you can see that you first define a list of jobs that run on each commit. For example, your repository will run on a prebuilt docker image `cimg/node:18`. It first checks out the repository with the Node version specified in the image.
 
{{<Aside type="note" header="Note">}}
 
If your project uses a Node version less than 16, you will have to upgrade your Node version as Wrangler requires at least Node.js v16.7.0.
 
{{</Aside>}}
 
The job then proceeds to run all the steps specified, after which you will need to define a `workflow` at the end of your file. You can learn more about creating a custom process with CircleCI from the [official documentation](https://circleci.com/docs/2.0/concepts/).

## Travis CI for CI/CD
 
Travis CI is an open-source continuous integration tool that handles specific tasks, such as pull requests and code pushes for your project workflow. Travis CI can be integrated into your GitHub projects, databases, and other preinstalled services enabled in your build configuration. To use Travis CI, you should have A GitHub, Bitbucket, GitLab or Assembla account.

### Add Cloudflare credentials to TravisCI

In your Travis project, add the Cloudflare credentials you have generated from the Cloudflare dashboard to access them in your `travis.yml` file. Go to your Travis CI dashboard and select your current project > **More options** > **Settings** > **Environment Variables**.

Set the environment variable's name and value and the branch you want it to be attached to. You can also set the privacy of the value.

### Setup

Go to Travis-ci.com and enable your repository by login in with your preferred provider. This guide uses GitHub. Next, create a `.travis.yml` file and copy the following into the file:

```yaml
---
filename: .travis.yml
---
language: node_js
node_js:
- "18.0.0" # You can specify more versions of Node you want your CI process to support
branches:
 only:
   - travis-ci-test # Specify what branch you want your CI process to run on
install:
 - npm install
 
script:
 - npm run build # Switch this out with your build command or remove it if you don't have a build step
 - npx wrangler pages publish dist --project-name=<PROJECT NAME>
 
env:
- CLOUDFLARE_ACCOUNT_ID: {$CLOUDFLARE_ACCOUNT_ID}
- CLOUDFLARE_API_TOKEN: {$CLOUDFLARE_API_TOKEN}
```

In the code block above you have specified the language as `node_js` and listed the value as `16.7.0` because Wrangler 2 depends on this Node version or higher. You have also set branches you want your continuous integration to run on. Finally, input your `PROJECT NAME` in the script section and your CI process should work as expected. 
