---

order: 12
---

# Connecting from a CLI

These instructions are not meant for configuring a service to run against an API. The token in this example is tailored to user identity and intended only for an end user interacting with an API via a command-line tool.

## Authenticate a session from the command line

Once you have installed `cloudflared`, you can use it to retrieve a Cloudflare Access token for a given application. This walkthrough uses the domain `example.com` as a stand-in for a protected API.

To generate a token, run the following command:

```sh
$ cloudflared access login https://example.com
```

With this command, `cloudflared` launches a browser window containing the same Access login page found when attempting to access a web application.

Select your identity provider and log in. If the browser window does not launch, you can use the unique URL that is automatically printed to the command line.

Once you have successfully authenticated, the browser returns the token to `cloudflared` in a cryptographic transfer and stores it. The token is valid for the session duration configured by the Access administrator.

### Access your API

Once you have retrieved a token, you can access the protected API. The `cloudflared` command-line tool includes a wrapper for transferring data via `curl`, which uses URL syntax (for more, see the [curl](https://github.com/curl/curl) GitHub project). The wrapper injects the token into the `curl` request as a query argument named _token_. You can invoke the wrapper as follows:

```sh
$ cloudflared access curl http://example.com
```

It is possible also to use the `put` command with `cloudflared` for any Unix tool to include the token in the request.

Read on for other available commands.

### Available commands

#### login

The `login` command initiates the login flow for an application behind Access.

```sh
$ cloudflared access login http://example.com
```

#### curl

The `curl` command invokes the client wrapper and includes the token in the request automatically.

```sh
$ cloudflared access curl http://example.com
```

#### token

The `token` command retrieves the token scoped to that specific application for use in other command-line tools.

```sh
$ cloudflared access token -app=http://example.com
```

### Using the token as an environment variable

It is possible to save the token as an environment variable for convenience and concision in scripts that access a protected application.

Set up a token as an environment variable as follows:

1. Run the following command to export the token to the shell environment:

    ```sh
    $ export TOKEN $(cloudflared access token -app=http://example.com
    ```

2. Confirm the token was saved with the following:

    ```sh
    $ echo $TOKEN
    ```

Once you have exported the token to your environment, use the variable with the Cloudflare Access request header in the script to access a protected endpoint, as in the following example:

```sh
$ curl -H "cf-access-token: $TOKEN" https://example.com/rest/api/2/item/foo-123
```

## Frequently asked questions (FAQ)

**Q:** Unable to establish Argo Tunnel connection

**A:** If you have an open browser session with a protected application, you must first log out of the application in the browser. Once you have logged out, use the `cloudflared access` command to initiate a new session from the command line.

**Q:** What happens if I attempt to reach an API protected by Access without authenticating?

**A:** The `cloudflared` command-line tool will return an error message.

**Q:** What happens if the browser window fails to launch?

**A:** The `cloudflared` also provides the login URL in the shell output so that you can use the URL to authenticate.

**Q:** What about API keys?

**A:** Access sits in front of your API and provides a method to secure requests while allowing your team to authenticate with the identity provider you already use. It does not replace API keys. You can continue to use and manage those as needed.
