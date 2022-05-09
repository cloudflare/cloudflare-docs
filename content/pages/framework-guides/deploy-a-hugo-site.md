---
pcx-content-type: how-to
title: Deploy a Hugo site
---

# Deploy a Hugo site

[Hugo](https://gohugo.io/) is a tool for generating static sites, written in Go. It is incredibly fast and has great high-level, flexible primitives for managing your content using Markdown and JSON.

In this guide, you will create a new Hugo application and deploy it using Cloudflare Pages. You will use the `hugo` CLI to create a new Hugo site.

## Installing Hugo

First, install the Hugo CLI, using the specific instructions for your operating system below:

### Linux

Your Linux distro's package manager may include Hugo. If this is the case, install it directly using your distro's package manager -- for instance, in Ubuntu, run the following command:

```sh
$ sudo apt-get install hugo
```

If your package manager does not include Hugo or you would like to download a release directly, refer to the [**Manual**](/pages/framework-guides/deploy-a-hugo-site/#manual-installation) section.

### Homebrew (macOS)

If you use the package manager [Homebrew](https://brew.sh), run the `brew install` command in your terminal to install Hugo:

```sh
$ brew install hugo
```

### Windows (Chocolatey)

If you use the package manager [Chocolatey](https://chocolatey.org/), run the `choco install` command in your terminal to install Hugo:

```sh
$ choco install hugo --confirm
```

### Windows (Scoop)

If you use the package manager [Scoop](https://scoop.sh/), run the `scoop install` command in your terminal to install Hugo:

```sh
$ scoop install hugo
```

### Manual installation

The Hugo GitHub repository contains pre-built versions of the Hugo command-line tool for various operating systems, which can be found on [the Releases page](https://github.com/gohugoio/hugo/releases).

For more instruction on installing these releases, refer to [Hugo's install guide](https://gohugo.io/getting-started/installing/).

{{<render file="_tutorials-before-you-start.md">}}

## Creating a new project

With Hugo installed, create a new project by running the `hugo new` command in your terminal:

```sh
$ hugo new site my-hugo-site
```

Hugo sites use themes to customize the look and feel of the statically built HTML site. There are a number of themes available at [themes.gohugo.io](https://themes.gohugo.io) -- for now, use the [Terminal theme](https://themes.gohugo.io/hugo-theme-terminal/) by running the following commands in your terminal:

```sh
$ cd my-hugo-site
$ git init
$ git submodule add https://github.com/panr/hugo-theme-terminal.git themes/terminal
$ git submodule update --init --recursive
```

You should also copy the default configuration provided by the theme into the `config.toml` file in your project's directory. Take the following information and customize it per your site's needs:

```toml
baseurl = "/"
languageCode = "en-us"
theme = "terminal"
paginate = 5

[params]
  # dir name of your main content (default is `content/posts`).
  # the list of set content will show up on your index page (baseurl).
  contentTypeName = "posts"

  # ["orange", "blue", "red", "green", "pink"]
  themeColor = "orange"

  # if you set this to 0, only submenu trigger will be visible
  showMenuItems = 2

  # show selector to switch language
  showLanguageSelector = false

  # set theme to full screen width
  fullWidthTheme = false

  # center theme with default width
  centerTheme = false

  # set a custom favicon (default is a `themeColor` square)
  # favicon = "favicon.ico"

  # set post to show the last updated
  # If you use git, you can set `enableGitInfo` to `true` and then post will automatically get the last updated
  showLastUpdated = false
  # Provide a string as a prefix for the last update date. By default, it looks like this: 2020-xx-xx [Updated: 2020-xx-xx] :: Author
  # updatedDatePrefix = "Updated"

  # set all headings to their default size (depending on browser settings)
  # it's set to `true` by default
  # oneHeadingSize = false

[params.twitter]
  # set Twitter handles for Twitter cards
  # see https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started#card-and-content-attribution
  # do not include @
  creator = ""
  site = ""

[languages]
  [languages.en]
    languageName = "English"
    title = "Terminal"
    subtitle = "A simple, retro theme for Hugo"
    owner = ""
    keywords = ""
    copyright = ""
    menuMore = "Show more"
    readMore = "Read more"
    readOtherPosts = "Read other posts"
    missingContentMessage = "Page not found..."
    missingBackButtonLabel = "Back to home page"

    [languages.en.params.logo]
      logoText = "Terminal"
      logoHomeLink = "/"

    [languages.en.menu]
      [[languages.en.menu.main]]
        identifier = "about"
        name = "About"
        url = "/about"
      [[languages.en.menu.main]]
        identifier = "showcase"
        name = "Showcase"
        url = "/showcase"
```

## Creating a post

Create a new post to give your Hugo site some initial content. Run the `hugo new` command in your terminal to generate a new post:

```sh
$ hugo new posts/hello-world.md
```

Inside of `hello-world.md`, add some initial content to create your post. Remove the `draft` line in your post's frontmatter when you are ready to publish the post. Any posts with `draft: true` set will be skipped by Hugo's build process.

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After your repository is set up, push your application to GitHub by running the following commands in your terminal:

```sh
$ git remote add origin https://github.com/yourgithubusername/githubrepo
$ git branch -M main
$ git push -u origin main
```

## Deploying with Cloudflare Pages

Deploy your site to Pages by logging in to the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Account Home** > **Pages** and selecting **Create a project**. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

| Configuration option | Value    |
| -------------------- | -------- |
| Production branch    | `main`   |
| Build command        | `hugo`   |
| Build directory      | `public` |

</div>

After completing configuration, click the **Save and Deploy** button. You should see Cloudflare Pages installing `hugo` and your project dependencies, and building your site, before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Hugo site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Using a specific Hugo version

You can set the environment variable `HUGO_VERSION` in your Worker > **Settings** to use a [specific version of Hugo](https://github.com/gohugoio/hugo/releases).

For example, `HUGO_VERSION`: `0.98.0`

## Learn more

By completing this guide, you have successfully deployed your Hugo site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/pages/framework-guides/).
