---
updated: 2022-07-27
pcx-content-type: how-to
title: Set build commands per branch
---

# Set build commands per branch

This guide will instruct you how to set build commands on specific branches. You will use the `CF_PAGES_BRANCH` environment variable to run a script on a `staging` branch as opposed to your `production` branch. This guide assumes that you have a Cloudflare account and a Pages project.

## Set up 

Create a `.sh` file in your project directory. You can choose your file's name, but we advise you name the file `build.sh`. 

Use the `CF_PAGES_BRANCH` environment variable to check which branch is currently being built. Populate your `.sh` file with the following:

```sh
# !/bin/bash

if [ "$CF_PAGES_BRANCH" == "production" ]; then
  # Run the "production" script in `package.json` on the "production" branch
  # "production" should be replaced with the name of your Production branch

  npm run production

elif [ "$CF_PAGES_BRANCH" == "staging" ]; then
  # Run the "staging" script in `package.json` on the "staging" branch
  # "staging" should be replaced with the name of your specific branch

  npm run staging

else
  # Else run the dev script
  npm run dev
fi
```

## Publish your changes

Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) > **Pages** > **Settings** > **Build & deployments** > **Build configurations** > **Edit configurations** > **Build command** > **`bash build.sh`** > **Save**.

To test that your build is successful, deploy your project.