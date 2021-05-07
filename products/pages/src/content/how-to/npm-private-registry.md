# Install Private Packages

Pages supports custom package registries, allowing you to include private dependencies in your application. While this walkthrough may focus specifically on [npm](https://www.npmjs.com/), the Node package manager and registry, the same approach can be applied to other registry tools.

We'll be adjusting our Pages project's settings – either its [build command](/platform/build-configuration#build-commands-and-directories), its [Environment Variables](/platform/build-configuration#environment-variables), or both. An existing website can be modified at any time, but new projects can be initialized with these settings, too. Either way, altering the project settings won't be reflected ***until its next deployment***.

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

If your application is **only** using private modules from the npm registry, then good news! Simply add a new [Environment Variable](/platform/build-configuration#environment-variables) named `NPM_TOKEN` and paste the read-only token you created (in the previous section) as its value.

<Aside type="warning">

**Important:** Add the `NPM_TOKEN` variable to the "Production" and "Preview" environments.

</Aside>

That's it!

By default, `npm` looks for an environment variable named `NPM_TOKEN` and _because_ we didn't define a [custom registry endpoint](#custom-registry-endpoints), the npm registry is assumed. Local development should continue to work as expected, provided that you and your teammates are authenticated with npm accounts (see `npm whoami` and `npm login`) that have been granted access to the private package(s).

## Custom Registry Endpoints

A project may define its own root-level [`.npmrc` file](https://docs.npmjs.com/cli/v7/configuring-npm/npmrc), which configures how the npm CLI should behave. This includes the registry – or registries – that packages should be fetched from, as well as how to authenticate with those registries.

### Example Configuration

Here's a fairly complex `.npmrc` example file:

```ini
; Fetch "@acme/*" packages from custom registry
@acme:registry=https://acme.example.org

; Fetch "@foobar/*" packages from the GitHub Packages npm registry
@foobar:registry=https://npm.pkg.github.com

; Configure Access Tokens (per private registry)
//registry.npmjs.org/:_authToken=TOKEN_FOR_NPM
//npm.pkg.github.com/:_authToken=TOKEN_FOR_GITHUB
//acme.example.org/:_authToken=TOKEN_FOR_ACME
```

What's going on here?

With npm, [private packages are always scoped.](https://docs.npmjs.com/about-scopes) Because of this, we can redirect all packages belonging to a scope (AKA, a namespace) towards a particular registry destination. If a scope's registry isn't customized, then npm is the default. For example:

* the `@acme/water` package request will be sent to the `https://acme.example.org` registry;
* the `@foobar/hello` package request will be sent to the GitHub Packages registry; and
* all other packages, including packages with other scopes, will be sent to the npm registry

The last section assigns the access token each registry needs. These values _can be_ hardcoded, but **this is not recommended**! Instead, use environment variables:

```diff
--//registry.npmjs.org/:_authToken=TOKEN_FOR_NPM
--//npm.pkg.github.com/:_authToken=TOKEN_FOR_GITHUB
--//acme.example.org/:_authToken=TOKEN_FOR_ACME
++//registry.npmjs.org/:_authToken=$TOKEN_FOR_NPM
++//npm.pkg.github.com/:_authToken=$TOKEN_FOR_GITHUB
++//acme.example.org/:_authToken=$TOKEN_FOR_ACME
```

With these changes in place, your `npm install` command will load the `.npmrc` file and expect the `TOKEN_FOR_NPM`, `TOKEN_FOR_GITHUB`, and `TOKEN_FOR_ACME` environment variables to be defined.

This means that you must return to your Pages project settings and include the missing [Environment Variables](/platform/build-configuration#environment-variables) in order for installation to succeed.

<Aside>

**Note:** You only need to define an Access Token for the npm registry (see `TOKEN_FOR_NPM` in our example) if it is hosting private packages that your application requires.

</Aside>

### Local Development

Now that our `.npmrc` file expects Environment Variables to be defined, local development – or at least, running `npm install` locally – may be broken!

To fix this, you can define the environment variables locally, too. However, this can become unruly quickly and generally isn't recommended.

Instead, you can:

1. Rename your current `.npmrc` file to `.npmrc.pages` – the name itself is not important, but you should know what it is.

2. Restore your previous `.npmrc` file – the version that was previously working for you and your teammates.

3. In your `package.json` file, create a new `"setup:pages"` script to rename the `.npmrc.pages` file to `.npmrc`:
    ```js
    // package.json
    {
      "scripts": {
        "setup:pages": "mv .npmrc.pages .npmrc",
        // your existing scripts
      }
    }
    ```

4. Finally, customize your Pages project's [build command](https://developers.cloudflare.com/pages/platform/build-configuration#build-commands-and-directories) so that `npm run setup:pages` runs before your standard build command.

    Your final build command should look something like:

    ```
    npm run setup:pages && npm run build
    ```

Additionally, the "Production" and "Preview" environments should have all the Environment Variables that your `.npmrc.pages` file requires.

When done correctly, your next Production or Preview deployment should be able to connect to any custom registries and install your desired package(s).

## Conclusion

We covered a lot! It may have been a bit overwhelming, so let's recap quickly.

When all private packages are hosted by npm directly, simply define a `NPM_TOKEN` environment variable within the Pages project settings.

For more complex configurations, maintain a mirrored copy of your `.npmrc` file – for example, `.npmrc.pages` – and ensure that the mirror expects access tokens as environment variables. Then, within the Pages project configuration, ensure that all environment variables are defined. Lastly, customize the build command so that the original `.npmrc` file is replaced by the mirrored, Pages-specific copy. A final build command may look like this:

```sh
$ mv .npmrc.pages .npmrc && npm run build
```

The `.npmrc` overwrite only happens during the Pages build pipeline, which means that your local environments remain unaffected.

We hope you found this guide helpful!
