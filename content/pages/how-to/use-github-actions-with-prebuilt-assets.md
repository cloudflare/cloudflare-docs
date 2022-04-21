---
pcx-content-type: how-to
title: Use GitHub actions for prebuilt assets
---

# Use GitHuub actions with Prebuilt assets

Cloudflare Pages now enables prebuilt assets uploads, allowing you to use custom build steps for your applications and deploy to Pages using the folder upload method option or with [Wrangler](/pages/platform/platform/functions/#develop-and-preview-locally). 

When using the folder upload method, you can drag and drop your application folder unto the Pages interface, and after the deploy step is completed, you will have your site live with a URL. 

# Developing locally and deploying with Wrangler

The second option when using prebuilt assets is to deploy your site from your CLI using [Wrangler](/pages/platform/functions/#develop-and-preview-locally/) by running this command:

```sh
# Creates a new Wrangler project
wrangler pages project create 
# Publish created project
wrangler pages project publish
```

First, install Wrangler globally on your machine by running this command in the terminal:

```sh
# Install Wrangler v2
npm install -g wrangler@beta
# Server folder with static assets
npx wrangler pages dev ./dist
```
You should see your project locally at `port:8788`.


# Using GitHub actions for CI/CD

[GitHub Actions](https://docs.github.com/en/actions) is a continuous integration and continuous delivery (CI/CD) platform that allows you to automate your build, test, and deployment pipeline. You can create workflows that build and test every pull request to your repository or deploy merged pull requests to production.

After initially setting up your project, you can set up a GitHub Action to automate your subsequent deployments from Wrangler. 

## Setup workflow

Create a `.github/workflows/pages-deployment.yaml` file at the root of your project. This file will contain the commands you want the process to take on the request you specified. For a detailed explanation of GitHub Actions syntax, refer to the [official documentation](https://docs.github.com/en/actions).

In your `pages-deployment.yaml` file, copy the following content:

```yaml
name: GitHub Actions Pages Publish
on: [push]
jobs:
  pages-publish:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository code
        uses: actions/checkout@v3
      - name: Setup node v16
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          check-latest: true # 16 is default, but lets make sure
      - name: Install Wrangler2 globally
        run: npm install -g wrangler@beta
      - name: Install dependencies
        run: npm install 
      - name: Build project
        run: npm run build # Switch this out with yor own build command
      - name: List files in the dist directory
        run: |
          ls ${{ github.workspace }}/dist
      - name: Check Wrangler version
        run: wrangler --version
      - name: Pages publish
       env:
         CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
         CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
       run: wrangler pages publish dist

```

In the above code block, you have set up an Action that runs when you push code to the repository; running on `ubuntu-latest`, it first checks out your repository with the latest version of Node. 

{{<Aside type= "note">}}

If your project uses a different version of Node, you can specify the version in the `node-version` step and change the `check-latest` value to "false"

{{<Aside>}}

The next step is to install [Wrangler 2](/pages/platform/functions/#develop-and-preview-locally/) globally in your project, run` npm install`, and then build your projects. To make sure you are building all the files you intend to in your project, the ` ls ${{ GitHub.workspace }}/dist`  step lists out all the files in your `dist` folder.

Finally, to publish your site, the Action makes sure you are logged in to your Account with your Cloudflare credentials stored as secrets in your project.

## Generate API Token from Cloudflare. 

First log  into the [Cloudflare dashboard](https://dash.cloudflare.com/) >  **My Profile** > **API Tokens** > **Create Token** and under Create Custom Token, select **Get started**. Start by naming the API Token, specify what product you are creating the API token for and give it the edit permission. 

![Select API token for Cloudflare Pages](../media/select-api-token-for-pages.png)

Click on **Continue to summary** and then **Create Token**. Now that you have created this token, you can push your project containing your Credentials to GitHub.

## Add Cloudflare credentials to GitHub secrets  

In the GitHub action you have set up, environment variables are needed to push your project up to Cloudflare Pages. Add the values of these environment variables in your project's GitHub repository by going to your projects repository > **Settings** > **Secrets** > **Actions** > **New repository secret**. 

Add the value of your `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`; this will ensure that these secrets are secure, and each time your Action runs, it will access these secrets. 


# Deploying with Cloudflare Pages

Deploy your site to Cloudflare Pages by running pushing your project to GitHub, the Action you have set will build your project with the build command specified and deploy. 
