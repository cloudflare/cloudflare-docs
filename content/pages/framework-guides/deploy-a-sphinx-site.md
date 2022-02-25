---
pcx-content-type: how-to
---
import TutorialsBeforeYouStart from "../_partials/_tutorials-before-you-start.md" 

# Deploy a Sphinx site

[Sphinx](https://www.sphinx-doc.org/) is a tool that makes it easy to create documentation and was originally made for the publication of Python documentation. It is well known for its simplicity and ease of use.

In this guide, you will create a new Sphinx project and deploy it using Cloudflare Pages.

## Prerequisites

  * Python 3 - Sphinx is based on Python, therefore you must have Python installed

  * [pip](https://pypi.org/project/pip/) - The PyPA recommended tool for installing Python packages

  * [pipenv](https://pipenv.pypa.io/en/latest/) - automatically creates and manages a virtualenv for your projects

<Aside type="note">

If you are already running a version of Python 3.7, ensure that Python version 3.7 is also installed on your computer before you begin this guide. Python 3.7 is the latest version supported by Cloudflare Pages.
 
</Aside>


The latest version of Python 3.7 is 3.7.11:

[Python 3.7.11](https://www.python.org/downloads/release/python-3711/)

### Installing Python

Refer to the official Python documentation for installation guidance:

- [Windows](https://www.python.org/downloads/windows/)
- [Linux/UNIX](https://www.python.org/downloads/source/)
- [Mac OS X](https://www.python.org/downloads/mac-osx/)
- [Other](https://www.python.org/download/other/)

### Installing Pipenv

If you already had an earlier version of Python installed before installing version 3.7, other global packages you may have installed could interfere with the following steps to install Pipenv, or your other Python projects which depend on global packages.

[Pipenv](https://pipenv.pypa.io/en/latest/) is a Python-based package manager that makes managing virtual environments simple. This guide will not require you to have prior experience with or knowledge of Pipenv to complete your Sphinx site deployment. Cloudflare Pages natively supports the use of Pipenv and, by default, has the latest version installed.

The quickest way to install Pipenv is by running the command:

```shell
$ pip install --user pipenv
```

This command will install Pipenv to your user level directory and will make it accessible via your terminal. You can confirm this by running the following command and reviewing the expected output:

```shell
$ pipenv --version
pipenv, version 2021.5.29
```

### Creating a Sphinx project directory

From your terminal, run the following commands to create a new directory and navigate to it:

```shell
$ mkdir my-wonderful-new-sphinx-project
$ cd my-wonderful-new-sphinx-project
```
### Pipenv with Python 3.7

Pipenv allows you to specify which version of Python to associate with a virtual environment. For the purpose of this guide, the virtual environment for your Sphinx project must use Python 3.7.

Use the following command:

```shell
~my-wonderful-new-sphinx-project$ pipenv --python 3.7
```
You should see the following output:

```shell
Creating a virtualenv for this project...
Pipfile: /home/ubuntu/my-wonderful-new-sphinx-project/Pipfile
Using /usr/bin/python3.7m (3.7.11) to create virtualenv...
⠸ Creating virtual environment...created virtual environment CPython3.7.11.final.0-64 in 1598ms
  creator CPython3Posix(dest=/home/ubuntu/.local/share/virtualenvs/my-wonderful-new-sphinx-project-Y2HfWoOr, clear=False, no_vcs_ignore=False, global=False)
  seeder FromAppData(download=False, pip=bundle, setuptools=bundle, wheel=bundle, via=copy, app_data_dir=/home/ubuntu/.local/share/virtualenv)
    added seed packages: pip==21.1.3, setuptools==57.1.0, wheel==0.36.2
  activators BashActivator,CShellActivator,FishActivator,PowerShellActivator,PythonActivator,XonshActivator

✔ Successfully created virtual environment! 
Virtualenv location: /home/ubuntu/.local/share/virtualenvs/my-wonderful-new-sphinx-project-Y2HfWoOr
Creating a Pipfile for this project...
```

List the contents of the directory:

```shell
~my-wonderful-new-sphinx-project$ ls
Pipfile
```



### Installing Sphinx

Before installing Sphinx, create the directory you want your project to live in.

From your terminal, run the following command to install Sphinx:

```shell
~/my-wonderful-new-sphinx-project$ pipenv install sphinx
```

You should see output similar to the following:

```shell
Installing sphinx...
Adding sphinx to Pipfile's [packages]...
✔ Installation Succeeded 
Pipfile.lock not found, creating...
Locking [dev-packages] dependencies...
Locking [packages] dependencies...
Building requirements...
Resolving dependencies...
✔ Success! 
Updated Pipfile.lock (763aa3)!
Installing dependencies from Pipfile.lock (763aa3)...
  🐍   ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 0/0 — 00:00:00
To activate this project's virtualenv, run pipenv shell.
Alternatively, run a command inside the virtualenv with pipenv run.
```

This will install Sphinx into a new virtual environment managed by Pipenv. You should see a directory structure like this:

```shell
my-wonderful-new-sphinx-project
|--Pipfile
|--Pipfile.lock
```

## Creating a new project

With Sphinx installed, you can now run the quickstart command to create a template project for you. This command will only work within the Pipenv environment you created in the previous step. To enter that environment, run the following command from your terminal:

```shell
~/my-wonderful-new-sphinx-project$ pipenv shell
Launching subshell in virtual environment...
ubuntu@sphinx-demo:~/my-wonderful-new-sphinx-project$  . /home/ubuntu/.local/share/virtualenvs/my-wonderful-new-sphinx-project-Y2HfWoOr/bin/activate
```

Now run the following command:

```shell
(my-wonderful-new-sphinx-project) user@hostname:~/my-wonderful-new-sphinx-project$ sphinx-quickstart
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
|----_static
|----_templates
|----conf.py
|----index.rst
|--Makefile
|--make.bat
```

You now have everything you need to start deploying your site to Cloudflare Pages. For learning how to create documentation with Sphinx, refer to the official [Sphinx documentation](https://www.sphinx-doc.org/en/master/usage/quickstart.html).


<TutorialsBeforeYouStart/>

## Creating a GitHub repository

In a separate terminal window that is not within the pipenv shell session, verify that SSH key-based authentication is working:

```shell
$ eval "$(ssh-agent)"
$ ssh-add -T ~/.ssh/id_rsa.pub
$ ssh -T git@github.com

The authenticity of host 'github.com (140.82.113.4)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'github.com,140.82.113.4' (RSA) to the list of known hosts.
Hi yourgithubusername! You've successfully authenticated, but GitHub does not provide shell access.
```

Create a new GitHub repository by visiting [repo.new](https://repo.new). After your repository is set up, push your application to GitHub by running the following commands in your terminal:

```shell
$ git init
$ git config user.name "Your Name"
$ git config user.email "username@domain.com"
$ git remote add origin git@github.com:yourgithubusername/githubrepo.git
$ git add .
$ git commit -m "Initial commit"
$ git branch -M main
$ git push -u origin main
```

## Deploying with Cloudflare Pages

Deploy your site to Pages by logging into the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Account Home** > **Pages** and selecting **Create a project**. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<TableLayout>

| Configuration option | Value          |
| -------------------- | -------------- |
| Production branch    | `main`         |
| Build command        | `make html`    |
| Build directory      | `build/html`   |

</TableLayout>

Below the configuration, make sure to set the environment variable for specifying the `PYTHON_VERSION`.

For example:

<TableLayout>

| Variable name         | Value          |
| --------------------  | -------------- |
| PYTHON_VERSION        | 3.7            |

</TableLayout>


After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `Pipenv`, your project dependencies, and building your site, before deployment.

<Aside type="note">

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/get-started).

</Aside>

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`. Every time you commit new code to your Sphinx site, Cloudflare Pages will automatically rebuild your project and deploy it.

You will also get access to [preview deployments](/platform/preview-deployments) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Learn more

By completing this guide, you have successfully deployed your Sphinx site on Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/framework-guides).
