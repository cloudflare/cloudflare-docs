# Install Private Packages

Cloudflare Pages supports custom package registries, allowing you to include private dependencies in your application. While this walkthrough focuses specifically on [npm](https://www.npmjs.com/), the Node package manager and registry, the same approach can be applied to other registry tools.

We'll be adjusting the [Environment Variables](/platform/build-configuration#environment-variables) in our Pages project's settings. An existing website can be modified at any time, but new projects can be initialized with these settings, too. Either way, altering the project settings won't be reflected ***until its next deployment***.

<Aside type="warning">

**Important:** Be sure to trigger a new deployment after changing any settings!

</Aside>


## Registry Access Token

Every package registry should have a means of issuing new access tokens. Ideally, you should create a new token specifically for Pages, as you would with any other CI/CD platform.

With npm, you can [create and view tokens through its website](https://docs.npmjs.com/creating-and-viewing-access-tokens) or you can use the `npm` CLI. If you have the CLI set up locally and are authenticated, you can run the following commands:

```sh
# verify the current npm user is correct
$ npm whoami

# create a readonly token
$ npm token create --read-only
#-> Enter password, if prompted
#-> Enter 2FA code, if configured
```

You'll end up with a read-only token that looks like a UUID string. Save this value for a later step.


## Private Modules on the npm Registry

When your application is **only** using private modules from the npm registry, then this section is for you!

Simply add a new [Environment Variable](/platform/build-configuration#environment-variables) named `NPM_TOKEN` and paste the [read-only token you created](#registry-access-token) as its value.

<Aside type="warning">

**Important:** Add the `NPM_TOKEN` variable to both the "Production" and "Preview" environments.

</Aside>

By default, `npm` looks for an environment variable named `NPM_TOKEN` and _because_ we didn't define a [custom registry endpoint](#custom-registry-endpoints), the npm registry is assumed. Local development should continue to work as expected, provided that you and your teammates are authenticated with npm accounts (see `npm whoami` and `npm login`) that have been granted access to the private package(s).


## Custom Registry Endpoints

When multiple registries are in use, a project will need to define its own root-level [`.npmrc`](https://docs.npmjs.com/cli/v7/configuring-npm/npmrc) configuration file. An example `.npmrc` file may look like this:

```ini
@foobar:registry=https://npm.pkg.github.com
//registry.npmjs.org/:_authToken=$TOKEN_FOR_NPM
//npm.pkg.github.com/:_authToken=$TOKEN_FOR_GITHUB
```

Here, all packages under the `@foobar` scope are directed towards the GitHub Packages registry. Then the registries are assigned their own access tokens via their respective environment variable names.

<Aside>

**Note:** You only need to define an Access Token for the npm registry (see `TOKEN_FOR_NPM` in our example) if it is hosting private packages that your application requires.

</Aside>

Your Pages project must then have the matching [Environment Variables](/platform/build-configuration#environment-variables) defined for all environments. In our example, that means `TOKEN_FOR_NPM` must contain [the read-only npm token](#registry-access-token) value and `TOKEN_FOR_GITHUB` must contain its own [personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token#creating-a-token).


### Managing Multiple Environments

In the event that your local development no longer works with your new `.npmrc` file, you will need to add some additional changes:

1. Rename the Pages-compliant `.npmrc` file to `.npmrc.pages`. This should be referencing environment variables.

2. Restore your previous `.npmrc` file – the version that was previously working for you and your teammates.

3. Create a new `is-pages.js` file in your project's root directory:

    ```js
    // Pages always has `NODE_VERSION` defined
    if (process.env.NODE_VERSION == null) process.exit(1);
    ```

4. In your `package.json` file, create a new `"preinstall"` script, which will rename the `.npmrc.pages` file to `.npmrc` **only** during the Pages build process:

    ```js
    // package.json
    {
      "scripts": {
        "preinstall": "node is-pages && mv .npmrc.pages .npmrc || echo \"Not Pages\"",
        // your existing scripts
      }
    }
    ```
