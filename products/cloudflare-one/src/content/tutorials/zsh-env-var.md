---
updated: 2021-02-16
category: 🔐 Zero Trust
difficulty: Advanced
---

# Output an app's token to a variable with one command

You can use [Argo Tunnel](/connections/connect-apps) to connect applications and servers to Cloudflare's network. Argo Tunnel relies on a piece of software, `cloudflared`, to create those connections.

You can also secure those applications with [Cloudflare Access](/applications/self-hosted-apps). With Cloudflare Access, you can build Zero Trust rules which restrict who can reach your application based on signals like identity, multifactor method, device posture, and geography.

When users authenticate to the applications secured by Cloudflare Access, Cloudflare generates a JSON Web Token (JWT) that contains the user's information and permits the user to reach the application. In web-based use cases, the browser stores the JWT as a cookie.

You can also use `cloudflared` to quickly gather the JWT from an application and use it from the command line or for  programmatic use cases like scripts.

**🗺️ This tutorial covers how to:**

* Login to an application secured by Cloudflare Access from the command line using `cloudflared`
* Use Z Shell to create a time-saving command to store the JWT as an environment variable

**⏲️Time to complete: 5 minutes**

## Install `cloudflared`

Start by [downloading and installing](/connections/connect-apps/install-and-setup) the Argo Tunnel daemon, `cloudflared`. On Mac, you can do so by running the following `brew` command. If you do not have Homebrew, follow the [documentation](https://docs.brew.sh/Installation) to install it.

`$ brew install cloudflare/cloudflare/cloudflared`

## Login to an app from the command line

Once installed, you can use the `access login` command in `cloudflared` to generate the JWT for a given application.

```sh
$ cloudflare access login https://jira.company.com
```

`cloudflared` will print a URL that you can visit in a browser to authenticate to Cloudflare Access. If you are using a headless system, you can visit the URL in a different machine with a browser and the login will still return the JWT to `cloudflared`.

```sh
Please open the following URL and log in with your Cloudflare account:

<URL>

Leave cloudflared running to download the token automatically.
```

`cloudflared` will print the token and you can begin using it.

## Set as environment variable

If you have an application where you frequently need to request a token, you can save time and reduce steps by adding a command shell. This example uses the Z shell (Zsh).

<Aside>

To follow this tutoroial, you need `python2` and `zsh` installed. The commands below install them on an Ubuntu system.

```sh
apt install python2
apt install zsh
```

</Aside>

If you are using the Z shell, edit your existing `~/.zshrc` file or create one for the first time.

```sh
vim ~/.zshrc
```

You can add the following function to your file, replacing `https://jira.company.com` with the application you need. You can also rename the function to something shorter or more applicable to your application.

```sh
function login-jira() {
  export JIRA_TOKEN=$(cloudflared access login https://jira.company.com | python2 -c "import re, sys; print '\r\n'.join(re.findall('fetched your token:\n\n(.*)', sys.stdin.read()))")
  echo $JIRA_TOKEN
}
source ~/.bash_profile;
```

Next, run the following command in your shell to update your profile.

```sh
$ source ~/.zshrc
```

Now, you can run the following command to login to Cloudflare Access. Instead of printing the token, the shell will store it as an environment variable that you can use.

```sh
$ login-jira
```