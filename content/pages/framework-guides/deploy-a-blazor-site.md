---
pcx-content-type: how-to
title: Deploy a Blazor Site
---

import TutorialsBeforeYouStart from "../\_partials/\_tutorials-before-you-start.md"

# Deploy a Blazor Site

[Blazor](https://blazor.net) is an SPA framework that can use C# code, rather than JavaScript in the browser. In this guide, you will build a site using Blazor, and deploy it using Cloudflare Pages.

## Install .NET

Blazor uses C#, so you will need to [install the .NET SDK](https://dotnet.microsoft.com/download) by grabbing the newest installation from the [.NET downloads page](https://dotnet.microsoft.com/download) and download and running the installer.

## Creating a new Blazor WASM project

There are two types of Blazor projects: Blazor Server applications, which run on the server, and Blazor WASM (WebAssembly), which run in the browser. Since Blazor Server is not static, this guide will use Blazor WASM. Create a new Blazor WASM application by running the following command in your terminal:

```sh
$ dotnet new blazorwasm my-blazor-project
```

## Creating the build script

To deploy, Cloudflare Pages will need a way to build the Blazor project. In the project's directory root, create a `build.sh` file. Populate the file with this:

    #!/bin/sh
    curl -sSL https://dot.net/v1/dotnet-install.sh > dotnet-install.sh
    chmod +x dotnet-install.sh
    ./dotnet-install.sh -c 6.0 -InstallDir ./dotnet6
    ./dotnet6/dotnet --version
    ./dotnet6/dotnet publish -c Release -o output

<TutorialsBeforeYouStart/>

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After creating a new repository, prepare and push your local application to GitHub by running the following commands in your terminal:

```sh
$ dotnet new gitignore
$ git init
$ git add -A
$ git commit -m "Initial commit"
$ git remote add origin https://github.com/yourgithubusername/githubrepo.git
$ git branch -M main
$ git push -u origin main
```

## Deploying with Cloudflare Pages

Deploy your site to Pages by logging into the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Account Home** > **Pages** dashboard and selecting **Create a project**. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

| Configuration option | Value            |
| -------------------- | ---------------- |
| Production branch    | `main`           |
| Build command        | `./build.sh`     |
| Build directory      | `output/wwwroot` |

</div>

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `dotnet`, your project dependencies, and building your site, before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Blazor site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Troubleshooting

### A file is over the 25MB limit

If you receive the error message `Error: Asset "/opt/buildhome/repo/output/wwwroot/_framework/dotnet.wasm" is over the 25MB limit`, you have two options:

1.  Reduce the size of your assets with the following [guide](https://docs.microsoft.com/en-us/aspnet/core/blazor/performance?view=aspnetcore-6.0#minimize-app-download-size).

Or

2.  Remove the `*.wasm` files from the output (`rm output/wwwroot/_framework/*.wasm`) and modify your Blazor application to [load the Brotli compressed files](https://docs.microsoft.com/en-us/aspnet/core/blazor/host-and-deploy/webassembly?view=aspnetcore-6.0#compression) instead.

## Learn more

By completing this guide, you have successfully deployed your Blazor site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/pages/framework-guides/).
