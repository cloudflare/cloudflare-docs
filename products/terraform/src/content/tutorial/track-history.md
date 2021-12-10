---
title: 2 – Track your history
order: 2
pcx-content-type: tutorial
---

# Track your history

In the [Initialize Terraform](/tutorial/initialize-terraform) tutorial, you created and applied some basic Cloudflare configuration. Terraform applied this configuration to your account because you provided your email address and API token at the top of the `cloudflare.tf` file.

```sh
$ head -n13 cloudflare.tf | tail -n4
provider "cloudflare" {
  email = "you@example.com"
  api_token = "your-api-token"
}
```

In this tutorial, you will store your configuration in GitHub where it can be tracked, peer-reviewed, and rolled back to as needed. But first, you will remove your credentials from the Terraform config file to prevent committing it to a repository.

## 1. Use environment variables for authentication

As a good security practice, remove your Cloudflare credentials from anything that will be committed to a repository. The Cloudflare Terraform provider supports reading these values from the `CLOUDFLARE_EMAIL` and `CLOUDFLARE_API_TOKEN` environment variables in the example below.

```sh
$ sed -ie 's/^.*email =.*$/  # email pulled from $CLOUDFLARE_EMAIL/' cloudflare.tf
$ sed -ie 's/^.*api_token =.*$/  # token pulled from $CLOUDFLARE_API_TOKEN/' cloudflare.tf

$ head -n13 cloudflare.tf | tail -n4
provider "cloudflare" {
  # email pulled from $CLOUDFLARE_EMAIL
  # token pulled from $CLOUDFLARE_API_TOKEN
}

$ export CLOUDFLARE_EMAIL=you@example.com
$ export CLOUDFLARE_API_TOKEN=your-api-token
```

You must leave the empty provider definition in the file, so that Terraform knows to install the Cloudflare plugin. In a different tutorial, you will learn about [advanced options](https://www.terraform.io/docs/providers/cloudflare/index.html#argument-reference) that can be used with the provider.

After running the commands above, ensure that you can still authenticate to Cloudflare by running `terraform plan`. Terraform will pull the current state which requires a valid email and API token.

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

## 2. Store configuration in GitHub

After removing the credentials, initialize a git repository with your Cloudflare configuration and then push it to GitHub.

First, create the GitHub repository to store the config. This can be done via the GitHub UI or with an API call.

```sh
$ export GITHUB_USER=your-github-user
$ export GITHUB_TOKEN=your-github-token

$ export GITHUB_URL=$(curl -H "Authorization: token $GITHUB_TOKEN" -d '{"name": "cf-config", "private": true}' "https://api.github.com/user/repos" 2> /dev/null | jq -r .ssh_url)

$ echo $GITHUB_URL
git@github.com:$GITHUB_USER/cf-config.git
```

Next, initialize a git repository and make the first commit.

<Aside type="note" header="Note:">

You might need to [add your SSH key to your GitHub account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account). 
  
</Aside>

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

Notice that the `.terraform` directory and `terraform.tfstate` file were not committed. The `.terraform` directory was not committed because the repository may be used on a different architecture, and the plugins contained in the directory are built for the system on which `terraform init` was run. The `.terraform.` file was not committed because it may eventually contain sensitive strings, and it is not a good way to keep state in sync, as explained in Hashicorp's documentation on [Remote State](https://www.terraform.io/docs/language/state/remote.html).

To prevent git from notifying you about the two files, add them to a new .gitignore file, commit it, and push everything to GitHub.

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
