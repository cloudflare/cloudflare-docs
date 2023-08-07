<div align="center">
  
<img src="https://raw.githubusercontent.com/ietf-tools/common/main/assets/logos/datatracker.svg" alt="IETF Datatracker" height="125" />

[![Release](https://img.shields.io/github/release/ietf-tools/datatracker.svg?style=flat&maxAge=300)](https://github.com/ietf-tools/datatracker/releases)
[![License](https://img.shields.io/github/license/ietf-tools/datatracker)](https://github.com/ietf-tools/datatracker/blob/main/LICENSE)
[![Code Coverage](https://codecov.io/gh/ietf-tools/datatracker/branch/feat/bs5/graph/badge.svg?token=V4DXB0Q28C)](https://codecov.io/gh/ietf-tools/datatracker)  
[![Python Version](https://img.shields.io/badge/python-3.9-blue?logo=python&logoColor=white)](#prerequisites)
[![Django Version](https://img.shields.io/badge/django-4.x-51be95?logo=django&logoColor=white)](#prerequisites)
[![Node Version](https://img.shields.io/badge/node.js-16.x-green?logo=node.js&logoColor=white)](#prerequisites)
[![MariaDB Version](https://img.shields.io/badge/postgres-14-blue?logo=postgresql&logoColor=white)](#prerequisites)

##### The day-to-day front-end to the IETF database for people who work on IETF standards.

</div>

- [**Production Website**](https://datatracker.ietf.org)
- [Changelog](https://github.com/ietf-tools/datatracker/releases)
- [Contributing](https://github.com/ietf-tools/.github/blob/main/CONTRIBUTING.md)
- [Getting Started](#getting-started) - *[ tl;dr ](#the-tldr-to-get-going)*
    - [Creating a Fork](#creating-a-fork)
    - [Git Cloning Tips](#git-cloning-tips)
    - [Docker Dev Environment](docker/README.md)
- [Database & Assets](#database--assets)
- [Old Datatracker Branches](https://github.com/ietf-tools/old-datatracker-branches/branches/all)
- [Frontend Development](#frontend-development)
    - [Intro](#intro)
    - [Vite](#vite-vue-3)
    - [Parcel](#parcel-legacyjquery)
    - [Bootstrap](#bootstrap)
    - [Serving Static Files via CDN](#serving-static-files-via-cdn)
    - [Handling of External Javascript and CSS Components](#handling-of-external-javascript-and-css-components)
    - [Handling of Internal Static Files](#handling-of-internal-static-files)
    - [Changes to Template Files](#changes-to-template-files)
    - [Deployment](#deployment)
- [Running Tests](#running-tests)
    - [Python](#python-tests)
    - [Frontend](#frontend-tests)
    - [Diff Tool](#diff-tool)

---

### Getting Started

This project is following the standard **Git Feature Workflow** development model. Learn about all the various steps of the development workflow, from creating a fork to submitting a pull request, in the [Contributing](https://github.com/ietf-tools/.github/blob/main/CONTRIBUTING.md) guide.

> Make sure to read the [Styleguides](https://github.com/ietf-tools/.github/blob/main/CONTRIBUTING.md#styleguides) section to ensure a cohesive code format across the project.

You can submit bug reports, enhancement and new feature requests in the [discussions](https://github.com/ietf-tools/datatracker/discussions) area. Accepted tickets will be converted to issues.

#### Creating a Fork

Click the <kbd>Fork</kbd> button in the top-right corner of the repository to create a personal copy that you can work on.

> Note that some GitHub Actions might be enabled by default in your fork. You should disable them by going to **Settings** > **Actions** > **General** and selecting **Disable actions** (then Save).

#### Git Cloning Tips

As outlined in the [Contributing](https://github.com/ietf-tools/.github/blob/main/CONTRIBUTING.md) guide, you will first want to create a fork of the datatracker project in your personal GitHub account before cloning it.

Because of the extensive history of this project, cloning the datatracker project locally can take a long time / disk space. You can speed up the cloning process by limiting the history depth, for example *(replace `USERNAME` with your GitHub username)*:

- To fetch only up to the 10 latest commits:
    ```sh
    git clone --depth=10 https://github.com/USERNAME/datatracker.git
    ```
- To fetch only up to a specific date:
    ```sh
    git clone --shallow-since=DATE https://github.com/USERNAME/datatracker.git
    ```

#### The tl;dr to get going

Note that you will have to have cloned the datatracker code locally - please read the above sections.

Datatracker development is performed using Docker containers. You will need to be able to run docker (and docker-compose) on your machine to effectively develop. It is possible to get a purely native install working, but it is _very complicated_ and typically takes a first time datatracker developer a full day of setup, where the docker setup completes in a small number of minutes.

Many developers are using [VS Code](https://code.visualstudio.com/) and taking advantage of VS Code's ability to start a project in a set of containers. If you are using VS Code, simply start VS Code in your clone and inside VS Code choose `Restart in container`.

If VS Code is not available to you, in your clone, type `cd docker; ./run`

Once the containers are started, run the tests to make sure your checkout is a good place to start from (all tests should pass - if any fail, ask for help at tools-develop@). Inside the app container's shell type:
```sh
ietf/manage.py test --settings=settings_postgrestest
```

Note that we recently moved the datatracker onto PostgreSQL - you may still find older documentation that suggests testing with settings_sqlitetest. That will no longer work.

For a more detailed description of getting going, see [docker/README.md](docker/README.md).

#### Overview of the datatracker models

A beginning of a [walkthrough of the datatracker models](https://notes.ietf.org/iab-aid-datatracker-database-overview) was prepared for the IAB AID workshop.

#### Docker Dev Environment

In order to simplify and reduce the time required for setup, a preconfigured docker environment is available.

Read the [Docker Dev Environment](docker/README.md) guide to get started.

### Database & Assets

Nightly database dumps of the datatracker are available as Docker images: `ghcr.io/ietf-tools/datatracker-db:latest`  

> Note that to update the database in your dev environment to the latest version, you should run the `docker/cleandb` script.

### Frontend Development

#### Intro

We now use `yarn` to manage assets for the Datatracker, and `vite`/`parcel` to package them. `yarn` maintains its `node` packages under the `.yarn` directory.

The datatracker uses 2 different build systems, depending on the use case:
- [**Vite**](https://vitejs.dev/) for Vue 3 pages / components
- [**Parcel**](https://parceljs.org/) for legacy pages / jQuery

#### Vite *(Vue 3)*

Pages will gradually be updated to Vue 3 components. These components are located under the `/client` directory.

Each Vue 3 app has its own sub-directory. For example, the agenda app is located under `/client/agenda`.

The datatracker makes use of the Django-Vite plugin to point to either the Vite.js server or the precompiled production files. The `DJANGO_VITE_DEV_MODE` flag, found in the `ietf/settings_local.py` file determines whether the Vite.js server is used or not.

In development mode, you must start the Vite.js development server, in addition to the usual Datatracker server:

```sh
yarn dev
```

Any changes made to the files under `/client` will automatically trigger a hot-reload of the modified components.

To generate production assets, run the build command:

```sh
yarn build
```

This will create packages under `ietf/static/dist-neue`, which are then served by the Django development server, and which must be uploaded to the CDN.

#### Parcel *(Legacy/jQuery)*

The Datatracker includes these packages from the various Javascript and CSS files in `ietf/static/js` and `ietf/static/css` respectively, bundled using Parcel.
Static images are likewise in `ietf/static/images`.

Whenever changes are made to the files under `ietf/static`, you must re-run the build command to package them:

``` shell
yarn legacy:build
```

This will create packages under `ietf/static/dist/ietf`, which are then served by the Django development server, and which must be uploaded to the CDN.

#### Bootstrap

The "new" datatracker uses Twitter Bootstrap for the UI.

Get familiar with <https://getbootstrap.com/getting-started/> and use those UI elements, CSS classes, etc. instead of cooking up your own.

Some ground rules:

-   Think hard before tweaking the bootstrap CSS, it will make it harder to upgrade to future releases.
-   No `<style>` tags in the HTML! Put CSS into the "morecss" block of a template instead.
-   CSS that is used by multiple templates goes into static/css/ietf.css or a new CSS file.
-   Javascript that is only used on one template goes into the "js" block of that template.
-   Javascript that is used by multiple templates goes into static/js/ietf.js or a new js file.
-   Avoid CSS, HTML styling or Javascript in the python code!

#### Serving Static Files via CDN

##### Production Mode

If resources served over a CDN and/or with a high max-age don't have different URLs for different versions, then any component upgrade which is accompanied by a change in template functionality will have a long transition time during which the new pages are served with old components, with possible breakage. We want to avoid this.

The intention is that after a release has been checked out, but before it is deployed, the standard django `collectstatic` management command will be run, resulting in all static files being collected from their working directory location and placed in an appropriate location for serving via CDN. This location will have the datatracker release version as part of its URL, so that after the deployment of a new release, the CDN will be forced to fetch the appropriate static files for that release.

An important part of this is to set up the `STATIC_ROOT` and `STATIC_URL` settings appropriately. In 6.4.0, the setting is as follows in production mode:

```
STATIC_URL = "https://www.ietf.org/lib/dt/%s/"%__version__
STATIC_ROOT = CDN_ROOT + "/a/www/www6s/lib/dt/%s/"%__version__
```

The result is that all static files collected via the `collectstatic` command will be placed in a location served via CDN, with the release version being part of the URL.

##### Development Mode

In development mode, `STATIC_URL` is set to `/static/`, and Django's `staticfiles` infrastructure makes the static files available under that local URL root (unless you set `settings.SERVE_CDN_FILES_LOCALLY_IN_DEV_MODE` to `False`). It is not necessary to actually populate the `static/` directory by running `collectstatic` in order for static files to be served when running `ietf/manage.py runserver` -- the `runserver` command has extra support for finding and serving static files without running collectstatic.

In order to work backwards from a file served in development mode to the location from which it is served, the mapping is as follows:

| Development URL | Working copy location |
| --------------- | --------------------- |
| localhost:8000/static/ietf/*  |  ietf/static/ietf/* |
| localhost:8000/static/secr/*  |  ietf/secr/static/secr/*|

#### Handling of External Javascript and CSS Components

In order to make it easy to keep track of and upgrade external components, these are now handled by a tool called `yarn` via the configuration in `package.json`.

To add a new package, simply run (replace `<package-name>` with the NPM module name):
```sh
yarn add <package-name>
```

#### Handling of Internal Static Files

Previous to this release, internal static files were located under `static/`, mixed together with the external components. They are now located under `ietf/static/ietf/` and `ietf/secr/static/secr`, and will be collected for serving via CDN by the `collectstatic` command. Any static files associated with a particular app will be handled the same way (which means that all `admin/` static files automatically will be handled correctly, too).

#### Changes to Template Files

In order to make the template files refer to the correct versioned CDN URL (as given by the STATIC_URL root) all references to static files in the templates have been updated to use the `static` template tag when referring to static files. This will automatically result in both serving static files from the right place in development mode, and referring to the correct versioned URL in production mode and the simpler `/static/` URLs in development mode.

#### Deployment

During deployment, it is now necessary to run the management command:

```sh
ietf/manage.py collectstatic
````
before activating a new release.

## Running Tests

### Python Tests

From a datatracker container, run the command:
```sh
./ietf/manage.py test --settings=settings_postgrestest
```

> You can limit the run to specific tests using the `--pattern` argument.

### Frontend Tests

Frontend tests are done via Playwright. There're 2 different type of tests:

- Tests that test Vue pages / components and run natively without any external dependency.
- Tests that require a running datatracker instance to test against (usually legacy views).

> Make sure you have Node.js 16.x or later installed on your machine.

#### Run Vue Tests

> :warning: All commands below **MUST** be run from the `./playwright` directory, unless noted otherwise.

1. Run **once** to install dependencies on your system:
    ```sh
    npm install
    npm run install-deps
    ```

2. Run in a **separate process**, from the **project root directory**:
    ```sh
    yarn preview
    ```

3. Run the tests, in of these 3 modes, from the `./playwright` directory:

    3.1 To run the tests headlessly (command line mode):
    ```sh
    npm test
    ```
    3.2 To run the tests visually **(CANNOT run in docker)**:
    ```sh
    npm run test:visual
    ```

    3.3 To run the tests in debug mode **(CANNOT run in docker)**:
    ```sh
    npm run test:debug
    ```

#### Run Legacy Views Tests

First, you need to start a datatracker instance (dev or prod), ideally from a docker container, exposing the 8000 port.

> :warning: All commands below **MUST** be run from the `./playwright` directory.

1. Run **once** to install dependencies on your system:
```sh
npm install
npm run install-deps
```

2. Run the tests headlessly (command line mode):
```sh
npm run test:legacy
```

### Diff Tool

To compare 2 different datatracker instances and look for diff, read the [diff tool instructions](dev/diff).
