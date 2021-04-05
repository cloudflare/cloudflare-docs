---
title: 2 – Tracking your history
order: 2
---

# Tracking your history

In the [first step](/tutorial/hello-world) of the tutorial, you created and applied some basic Cloudflare configuration. Terraform was able to apply this configuration to your account because you provided your email address and API token at the top of the `cloudflare.tf` file:

```sh
$ head -n4 cloudflare.tf
provider "cloudflare" {
  email = "you@example.com"
  token = "your-api-key"
}
```

In this step of the tutorial, we’re going to store your configuration in GitHub where it can be tracked, peer-reviewed, and rolled back to as needed. But before we do so, we're going to remove your credentials from the Terraform config file so it doesn't get committed to a repository.

## 1. Using Environment Variables for Authentication

As a good security practice we need to remove your Cloudflare credentials from anything that will be committed to a repository. The Cloudflare Terraform provider supports reading these values from the `CLOUDFLARE_EMAIL` and `CLOUDFLARE_TOKEN` environment variables, so all we need to do is:

```sh
$ sed -ie 's/^.*email =.*$/  # email pulled from $CLOUDFLARE_EMAIL/' cloudflare.tf
$ sed -ie 's/^.*token =.*$/  # token pulled from $CLOUDFLARE_TOKEN/' cloudflare.tf

$ head -n4 cloudflare.tf
provider "cloudflare" {
  # email pulled from $CLOUDFLARE_EMAIL
  # token pulled from $CLOUDFLARE_TOKEN
}

$ export CLOUDFLARE_EMAIL=you@example.com
$ export CLOUDFLARE_TOKEN=your-api-key
```

Note that you need to leave the empty provider definition in the file, so that Terraform knows to install the Cloudflare plugin. In a future tutorial, we'll discuss some of the more [advanced options](https://www.terraform.io/docs/providers/cloudflare/index.html#argument-reference) that can be used with the provider.

After completing the above step, it's a good idea to make sure that you can still authenticate to Cloudflare. By running `terraform plan` we can get Terraform to pull the current state (which requires a valid email and API key):

```sh
$ terraform plan
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.

cloudflare_record.www: Refreshing state... (ID: c38d3102767284e7ca14d5dad3ab8b69)

------------------------------------------------------------------------

No changes. Infrastructure is up-to-date.

This means that Terraform did not detect any differences between your
configuration and real physical resources that exist. As a result, no
actions need to be performed.
```

## 2. Storing Configuration in GitHub

Now that credentials have been removed, it's time to initialize a git repository with your Cloudflare configuration and then push it to GitHub.

First we'll create the GitHub repository to store the config. This can be done via the GitHub UI or with a simple API call:

```sh
$ export GITHUB_USER=your-github-user
$ export GITHUB_TOKEN=your-github-token

$ export GITHUB_URL=$(curl -sSXPOST https://api.github.com/user/repos?access_token=$GITHUB_TOKEN -H 'Content-Type: application/json' \
-d '{"name": "cf-config", "private":"true"}' 2>/dev/null | jq -r .ssh_url)

$ echo $GITHUB_URL
git@github.com:$GITHUB_USER/cf-config.git
```

Now we'll initialize a git repository and make our first commit:

```sh
$ git init
Initialized empty Git repository in /Users/username/cf-config/.git/

$ git remote add origin $GITHUB_URL
$ git add cloudflare.tf

$ git commit -m "Step 2 - Initial commit with webserver definition."
[master (root-commit) 5acea17] Step 2 - Initial commit with webserver definition.
 1 file changed, 16 insertions(+)
 create mode 100644 cloudflare.tf
```

An astute reader may have noticed that we did _not_ commit the `.terraform` directory nor did we commit the `terraform.tfstate` file. The former was not committed because this repository may be used on a different architecture, and the plugins contained in this directory are built for the system on which `terraform init` was run. The latter was not committed as i) it may eventually contain sensitive strings and ii) it is not a good way to keep state in sync, as explained in Hashicorp's documentaion on [Remote State](https://www.terraform.io/docs/language/state/remote.html).

To prevent git from bugging us about these files, let's add them to a new .gitignore file, commit it, and push everything to GitHub:

```sh
$ cat > .gitignore <<'EOF'
.terraform/
terraform.tfstate*
EOF

$ git add .gitignore

$ git commit -m "Step 2 - Ignore terraform plugin directory and state file."
[master 494c6d6] Step 2 - Ignore terraform plugin directory and state file.
 1 file changed, 2 insertions(+)
 create mode 100644 .gitignore

$ git push
Counting objects: 6, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (4/4), done.
Writing objects: 100% (6/6), 762 bytes | 0 bytes/s, done.
Total 6 (delta 0), reused 0 (delta 0)
To git@github.com:$GITHUB_USER/cf-config.git
 * [new branch]      master -> master
```
