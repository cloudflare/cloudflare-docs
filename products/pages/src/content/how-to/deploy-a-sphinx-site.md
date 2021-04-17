# Deploy a Sphinx site

[Sphinx](https://www.sphinx-doc.org/) is a tool that makes it easy to create beautiful documentation, originally created
for Python documentation. It has found favour among many for its simplicity and ease of use.

In this guide you'll create a new Sphinx project and deploy it using Cloudflare Pages.

## Prerequisites

There are a few prerequisites before you can begin creating your Sphinx site, namely you'll need to install it!

### Installing Python

Sphinx is a Python based tool, which means you'll need to have Python installed to make use of it. We **recommend**
installing Python version 3.7 as this is the latest version at the time of writing Cloudflare Pages supports. Please
refer to the official Python docs on installing for your platform at their relevant pages:

- [Windows](https://www.python.org/downloads/windows/)
- [Linux/UNIX](https://www.python.org/downloads/source/)
- [Mac OS X](https://www.python.org/downloads/mac-osx/)
- [Other](https://www.python.org/download/other/)

### Installing Pipenv

Wonderful, by now you should have Python installed. If you already had Python installed, please be mindful that any
other global packages you may have installed could interfere with the following steps to install Pipenv, or your other
Python projects which depend on global packages!

[Pipenv](https://pipenv.pypa.io/en/latest/) is a Python based package manager that makes managing virtual environments
super simple. If you're not familiar with it yet, don't worry, it's easy to pick up. Cloudflare Pages natively supports
the use of Pipenv and by default has the latest version installed.

The quickest way to install Pipenv is by running the command:

```shell
$ pip install --user pipenv
```

This will install Pipenv to your user level directory and will make it accessible via your terminal. You can confirm
this by running the following command and seeing the expected output:

```shell
$ pipenv --version
pipenv, version 2020.11.15
```

### Installing Sphinx

Just one last step before can install Sphinx, we first have to create the directory we want our project to live in. From
your terminal run the following commands to create a new directory and navigate within it:

```shell
$ mkdir my-wonderful-new-sphinx-project
$ cd my-wonderful-new-sphinx-project
```

We're finally ready to install Sphinx. From your terminal run the following command to install Sphinx:

```shell
$ pipenv install sphinx
```

This will install sphinx into a new virtual environment managed by Pipenv, you should see a directory structure like
this:

```shell
my-wonderful-new-sphinx-project
|--Pipfile
|--Pipfile.lock
```

## Creating a new project

With Sphinx installed you can now run the quickstart command to create a template project for you. This command will
only work within the Pipenv environment we created in the previous step. To enter that environment run the following
command from your terminal:

```shell
$ pipenv shell
```

Now run the following command:

```shell
$ sphinx-quickstart
```

You will be presented with a number of questions, please answer them in the following:

```shell
$ Separate source and build directories (y/n) [n]: Y
$ Project name: <Your project name>
$ Author name(s): <You Author Name>
$ Project release []: <You can accept default here or provide a version>
$ Project language [en]: <You can accept en here or provide a regional language code>
```

This will create four new files in your active directory, `source/conf.py`, `index.rst`, `Makefile` and `make.bat`:

```shell
my-wonderful-new-sphinx-project
|--Pipfile
|--Pipfile.lock
|--source
|----conf.py
|--index.rst
|--Makefile
|--make.bat
```

You now have everything you need to start deploying your site to Cloudflare Pages. For learning how to create beautiful
documentation with Sphinx please see the official
docs [here](https://www.sphinx-doc.org/en/master/usage/quickstart.html).

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). Once you've created a new repository, you can
push your local application to GitHub:

```shell
$ git remote add origin https://github.com/yourgithubusername/githubrepo
$ git branch -M main
$ git push -u origin main
```

## Deploying with Cloudflare Pages

You can deploy your site to Cloudflare Pages by going to the dashboard, and creating a new site. Select your new GitHub
repository that you created above, and in the configuration section, provide the following information:

<TableLayout>

| Configuration option | Value          |
| -------------------- | -------------- |
| Production branch    | `main`         |
| Build command        | `make html`    |
| Build directory      | `build/html`   |

</TableLayout>

Below the configuration, make sure to set the environment variable for specifying the `PYTHON_VERSION`.

For example, `PYTHON_VERSION`: `3.7`.

Once you've configured your site, you can begin your first deploy. You should see Cloudflare Pages installing `Pipenv`,
your project dependencies, and building your site, before deploying it.

<Aside>

For the complete guide to deploying your first site to Cloudflare Pages, check
out [our Getting Started guide](/getting-started).

</Aside>

Once you've deployed your site, you'll receive a unique subdomain for your project on `pages.dev`. Every time you commit
new code to your Hugo site, Cloudflare Pages will automatically rebuild your project and deploy it. You'll also get
access to [preview deployments](/platform/preview-deployments) on new pull requests, so you can preview how changes look
to your site before deploying them to production.

## Learn more

Congrats, you've deployed your Sphinx site on Cloudflare Pages! To learn more about what you can do with the
platform, [check out our How-To section](/how-to).
