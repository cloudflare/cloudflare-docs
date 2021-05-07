---
updated: 2020-09-28
difficulty: Beginner
---

# Migrating from Firebase

In this tutorial, you'll learn how to migrate an existing Firebase application to Cloudflare Pages. You should already have an existing project deployed on Firebase that you'd like to host on Cloudflare Pages.

## Finding your build command and build directory

To move your application to Cloudflare Pages, you'll need to find your build command and build directory.

You'll use these to tell Cloudflare Pages how to deploy your project. If you've been deploying manually from your local machine using the `firebase` command-line tool, the `firebase.json` configuration file should include a `public` key that will be your build directory:

```json
---
header: firebase.json
---
{
  "public": "public"
}
```

Firebase Hosting doesn't ask for your build command, so if you're running a standard JavaScript set up, you'll probably be using `npm build` or a command specific to the framework or tool you're using (e.g. `ng build`).

Once you've found your build directory and build command, you can move your project to Cloudflare Pages.

## Creating a new Pages project

If you haven't pushed your static site to GitHub before, you should do so before continuing. This will also give you access to great features like automatic deployments, and [deployment previews](/platform/preview-deployments).

You can create a new repo by visiting [repo.new](https://repo.new) and following the instructions to push your project up to GitHub.

You can use the ["Getting started" guide](/getting-started) to add your project to Cloudflare Pages, using the **build command** and **build directory** that you saved earlier.

## Cleaning up your old application and assigning the domain

Once you've deployed your application, you should go into the Firebase dashboard and remove your old Firebase project. In your Cloudflare DNS settings for your domain, make sure that you've updated the CNAME record for your domain from Firebase to Cloudflare Pages.

Congrats! You've migrated your Firebase project to Cloudflare Pages.
