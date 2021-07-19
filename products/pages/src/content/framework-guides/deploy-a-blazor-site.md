---
pcx-content-type: how-to
---

# Deploy a Blazor Site  
  
[Blazor](https://blazor.net) is an SPA framework that can use C# code, rather than JavaScript in the browser. In this guide, you will build a site using Blazor, and deploy it using Cloudflare Pages.  

## Install .NET

Blazor uses C#, so you will need to [install the .NET SDK](https://dotnet.microsoft.com/download) by grabbing the newest installation from the [.NET downloads page](https://dotnet.microsoft.com/download) and download and running the installer.  

## Creating a new Blazor WASM project  

There are two types of Blazor projects, Blazor Server applications, which run on the server, and Blazor WASM (WebAssembly), which run in the browser. Since Blazor Server is not static, this guide will use Blazor WASM. Create a new Blazor WASM application by running:

```sh
$ dotnet new blazorwasm my-blazor-project
```
## Creating the build script

To deploy, Cloudflare Pages will need a way to build the Blazor project. In the project's directory root, create a `build.sh` file. Populate the file with this:

```
#!/bin/sh
curl -sSL https://dot.net/v1/dotnet-install.sh > dotnet-install.sh
chmod +x dotnet-install.sh
./dotnet-install.sh -c 5.0 -InstallDir ./dotnet5
./dotnet5/dotnet --version
./dotnet5/dotnet publish -c Release -o output
```

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After creating a new repository, prepare and push your local application to GitHub:

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

You can deploy your site to Cloudflare Pages by going to the dashboard, and creating a new site. Select your new GitHub repository that you created above, and in the configuration section, provide the following information:  

<TableLayout>

| Configuration option | Value            |
| -------------------- | ---------------- |
| Production branch    | `main`           |
| Build command        | `./build.sh`     |
| Build directory      | `output/wwwroot` |

</TableLayout>

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `dotnet`, your project dependencies, and building your site, before deploying it.

<Aside>

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Getting Started guide](/getting-started).

</Aside>

After deploying your site, you will receive a unique subdomain for your project on `pages.dev`. 
Every time you commit new code to your Blazor site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/platform/preview-deployments) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Learn more

You have successfully deployed your Blazor site on Cloudflare Pages. To learn more about what you can do with the platform, [refer to the Framework Guides section](/framework-guides).
