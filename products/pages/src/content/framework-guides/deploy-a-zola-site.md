# Deploy a Zola site

[Zola](https://www.getzola.org/) is a fast static site generator in a single binary with everything built-in. In this guide, you'll create a new Zola application and deploy it using Cloudflare Pages. We'll be using the `zola` CLI to create a new Zola site.

## Installing Zola

First, [install](https://www.getzola.org/documentation/getting-started/installation/) the `zola` CLI, using the specific instructions for your operating system below:

### Homebrew (macOS)

If you use the package manager [Homebrew](https://brew.sh), you can use `brew install` to install Zola:

```sh
$ brew install zola
```

### Windows (Chocolatey)

If you use the package manager [Chocolatey](https://chocolatey.org/), you can use `choco install` to install Zola:

```sh
$ choco install zola
```

If you use the package manager [Scoop](https://scoop.sh/), you can use `scoop install` to install Zola:

```sh
$ scoop install zola
```

### Linux

Your Linux distro's package manager may include Zola. If this is the case, you can install it directly using your distro's package manager -- for instance, using `pkg`:

```sh
$ pkg install zola
```

If your package manager doesn't include Zola or you'd like to download a release directly, see the "Manual" section below.

### Manual installation

The Zola GitHub repository contains pre-built versions of the Zola command-line tool for various operating systems, which can be found on [the Releases page](https://github.com/getzola/zola/releases).

For more instruction on installing these releases, see [Zola's install guide](https://www.getzola.org/documentation/getting-started/installation/).

## Creating a new project

With Zola installed, you can create a new project using `zola init`. For now, we'll use the default template:

```sh
$ zola init my-zola-project
```

Upon running `zola init`, you will prompted with  three questions: 
1. What is the URL of your site? (https://example.com): 
You can leave this one blank  for  now 

2. Do you want to enable Sass compilation? [Y/n]: Y
3. Do you want to enable syntax highlighting? [y/N]: y
4. Do you want to build a search index of the content? [y/N]: y

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). Once you've created a new repository, you can push your local application to GitHub:

```sh
$ git remote add origin https://github.com/yourgithubusername/githubrepo
$ git branch -M main
$ git push -u origin main
```

## Deploying with Cloudflare Pages

You can deploy your site to Cloudflare Pages by going to the dashboard, and creating a new site. Select your new GitHub repository that you created above, and in the configuration section, provide the following information:

<TableLayout>

| Configuration option | Value          |
| -------------------- | -------------- |
| Production branch    | `main`         |
| Build command        | `zola build` |
| Build directory      | `public`       |

</TableLayout>

Below the configuration, make sure to set the Environment Variable for specifying the `ZOLA_VERSION`. 

For example, `ZOLA_VERSION`: `0.13.0`.

Once you've configured your site, you can begin your first deploy. You should see Cloudflare Pages installing `zola`, your project dependencies, and building your site, before deploying it.

<Aside>

For the complete guide to deploying your first site to Cloudflare Pages, check out [our Getting Started guide](/getting-started).

</Aside>

Once you've deployed your site, you'll receive a unique subdomain for your project on `pages.dev`. 

You can now add that subdomain as the `base_url` in your  `config.toml` file. 

For example: 
``` yaml
# The URL the site will be built for
base_url = "https://my-zola-project.pages.dev"
```

Every time you commit new code to your Zola site, Cloudflare Pages will automatically rebuild your project and deploy it. You'll also get access to [preview deployments](/platform/preview-deployments) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Learn more

Congrats, you've deployed your Zola site on Cloudflare Pages! To learn more about what you can do with the platform, [check out our How-To section](/how-to).
