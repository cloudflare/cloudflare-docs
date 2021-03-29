# Deploy a Blazor Site  
  
[Blazor](https://blazor.net) is an SPA framework that can use C# code, rather then JavaScript in the browser. In this guide, you will build a site using Blazor, and deploy it using Cloudflare Pages.  
## Install .NET
Blazor uses C#, so you will need to [install the .NET SDK](https://dotnet.microsoft.com/download) by grabbing the newest installation from the [.NET downloads page](https://dotnet.microsoft.com/download) and download and running the installer.  
## Creating a new Blazor WASM project  
There are two types of Blazor projects, Blazor Server applications, which run on the server, and Blazor WASM (WebAssembly), which run in the browser. Since Blazor Server is not static, we'll be using Blazor WASM. Create a new Blazor WASM application by running:
```sh
$ dotnet new blazorwasm my-blazor-project
```  
When you have completed your application, make sure to run  
```sh
$ dotnet publish
```
## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). Once you've created a new repository, you can push your local application to GitHub:

```sh
$ git remote add origin https://github.com/yourgithubusername/githubrepo.git
$ git branch -M main
$ git push -u origin main
```

## Deploying with Cloudflare Pages
You can deploy your site to Cloudflare Pages by going to the dashboard, and creating a new site. Select your new GitHub repository that you created above, and in the configuration section, provide the following information:  
<TableLayout>
| Configuration option | Value          |
| -------------------- | -------------- |
| Production branch    | `main`         |
| Build command        | `curl -sSL https://dot.net/v1/dotnet-install.sh > dotnet-install.sh; chmod +x dotnet-install.sh; ./dotnet-install.sh -c 5.0 -InstallDir ./dotnet5; ./dotnet5/dotnet --version; ./dotnet5/dotnet publish -c Release -o output;` |
| Build directory      | `output/wwwroot`       |
</TableLayout>
Once you've configured your site, you can begin your first deploy. You should see Cloudflare Pages installing `dotnet`, your project dependencies, and building your site, before deploying it.

<Aside>

For the complete guide to deploying your first site to Cloudflare Pages, check out [our Getting Started guide](/getting-started).

</Aside>

Once you've deployed your site, you'll receive a unique subdomain for your project on `pages.dev`. 
Every time you commit new code to your Blazor site, Cloudflare Pages will automatically rebuild your project and deploy it. You'll also get access to [preview deployments](/platform/preview-deployments) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Learn more

Congrats, you've deployed your Blazor site on Cloudflare Pages! To learn more about what you can do with the platform, [check out our How-To section](/how-to).
