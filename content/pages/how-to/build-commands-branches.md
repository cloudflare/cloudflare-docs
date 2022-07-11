---
pcx-content-type: how-to
title: 
---

# 

This guide will instruct you how to use different build commands on specific branches. For example, to run a specific script on a `staging` branch as opposed to your `production` branch, you can do so by using the `CF_PAGES_BRANCH` environment variable. This guide assumes that you have a Pages project and Cloudflare account ready.

##

First, create `.sh` file in your project directory. You can name the file anything but we advise you name the file `build.sh`. 

Then use the `CF_PAGES_BRANCH` environment variable to check which branch is currently being built. Populate your file with the following:

```sh
# !/bin/bash

if [ "$CF_PAGES_BRANCH" == "production" ]; then
  # Run the "production" script in package.json on the "production" branch

  npm run production

elif [ "$CF_PAGES_BRANCH" == "staging" ]; then
  # Run the "staging" script in package.json on the "staging" branch
  npm run staging

else
  # Else run the dev script
  npm run dev
fi
```

Log in to the Cloudflare dashboard > Pages > Settings > Build & Deployments > Build configurations > Edit configurations > Build command > `bash build.sh` > Save.

Do a deployment to confirm that the build is successful. 