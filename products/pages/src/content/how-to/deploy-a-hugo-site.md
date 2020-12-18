# Deploy a Hugo site

Hugo is a tool for generating static sites, written in Go. It's incredibly fast and has great high-level, flexible primitives for managing your content using Markdown and JSON.

In this guide, you'll create a new Hugo application and deploy it using Cloudflare Pages. We'll be the `hugo` CLI to create a new Hugo site.

## Installing Hugo

First, install the Hugo CLI, using the specific instructions for your operating system below:

### Linux

Your Linux distro's package manager may include Hugo. If this is the case, you can install it directly using your distro's package manager -- for instance, in Ubuntu:

```sh
$ sudo apt-get install hugo
```

If your package manager doesn't include Hugo or you'd like to download a release directly, see the "Manual" section below.

### Homebrew (macOS)

If you use the package manager [Homebrew](https://brew.sh), you can use `brew install` to install Hugo:

```sh
$ brew install hugo
```

### Windows (Chocolatey)

If you use the package manager [Chocolatey](https://chocolatey.org/), you can use `choco install` to install Hugo:

```sh
$ choco install hugo --confirm
```

### Manual installation

The Hugo GitHub repository contains pre-built versions of the Hugo command-line tool for various operating systems, which can be found on [the Releases page](https://github.com/gohugoio/hugo/releases).

For more instruction on installing these releases, see [Hugo's install guide](https://gohugo.io/getting-started/installing/).

## Creating a new project

With Hugo installed, you can create a new project using `hugo new`:

```sh
$ hugo new site my-hugo-site
```

Hugo sites use _themes_ to customize the look and feel of the statically built HTML site. There are a number of themes available at [themes.gohugo.io](https://themes.gohugo.io) -- for now, we'll pick the [Terminal theme](https://themes.gohugo.io/hugo-theme-terminal/) and install it:

```sh
$ cd my-hugo-site
$ git init
$ git clone https://github.com/panr/hugo-theme-terminal.git themes/terminal
```

You should also copy the default configuration provided by the theme into the `config.toml` file. Take the following information and customize it per your site's needs:

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

Finally, you can create a new post to give your Hugo site some initial content. Run the `hugo new` command to generate a new post:

```sh
$ hugo new posts/hello-world.md
```

Inside of `hello-world.md`, you can add some initial content to flesh out your post. Make sure to remove the `draft` line in your post's frontmatter when you're ready to publish the post: any posts with `draft: true` set will be skipped by Hugo's build process.

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

| Configuration option | Value    |
| -------------------- | -------- |
| Production branch    | `main`   |
| Build command        | `hugo`   |
| Build directory      | `public` |

</TableLayout>

Once you've configured your site, you can begin your first deploy. You should see Cloudflare Pages installing `create-react-app`, your project dependencies, and building your site, before deploying it.

<Aside>

For the complete guide to deploying your first site to Cloudflare Pages, check out [our Getting Started guide](/getting-started).

</Aside>

Once you've deployed your site, you'll receive a unique subdomain for your project on `pages.dev`. Every time you commit new code to your Hugo site, Cloudflare Pages will automatically rebuild your project and deploy it. You'll also get access to [preview deployments](/platform/preview-deployments) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Learn more

Congrats, you've deployed your Hugo site on Cloudflare Pages! To learn more about what you can do with the platform, [check out our How-To section](/how-to).
