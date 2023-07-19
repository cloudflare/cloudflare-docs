---
updated: 2021-08-19
category: 🔐 Zero Trust
pcx_content_type: tutorial
title: Integrate Microsoft MCAS with Cloudflare Zero Trust
---

# Integrate Microsoft MCAS with Cloudflare Zero Trust

Many security teams rely on Microsoft MCAS (Microsoft Cloud App Security), Microsoft's CASB solution, to identify and block threats on the Internet, as well as allow or block access to cloud applications. This tutorial covers how to integrate MCAS with Cloudflare Zero Trust, and create Gateway HTTP policies to ensure visibility and control over data.

Microsoft provides an MCAS API endpoint to allow queries to see which applications have been marked as blocked or allowed. With an MCAS API call, you can manage a URL category that contains the blocked URLs returned by the API query, and use the output to create a Hostname List that can be used by Gateway HTTP policies to block them.

**Time to complete:**

20 minutes

## Basic configuration

In your Microsoft account, you first need to create an API token and URL endpoint to use to query the URLs blocked by MCAS.
Follow the guide for [Managing API tokens for Microsoft Cloud App Security](https://docs.microsoft.com/en-us/cloud-app-security/api-authentication) to generate a new API token and a custom API URL for the API endpoint.

## Using the API to query banned applications

Once you have the API token and API URL, use curl to get the list of banned applications from Microsoft MCAS:

```txt
curl -v "https://<MCAS API URL>/api/discovery_block_scripts/?format=120&type=banned" -H "Authorization: Token <API token>"
```

This will return a list of banned hostnames. In this case, Angie's List is the banned application.

![Banned hostnames](/images/cloudflare-one/microsoft-mcas/mcas-domains.png)

### Processing the output

As you can see, the banned hostnames are preceded by a `.`. To use this output for a Zero Trust List, we need to do some text processing.

1.  Run the curl API call and direct the output to a file, in this case `mcas.txt`:

    ```txt
    curl -v "https://<MCAS API URL>/api/discovery_block_scripts/?format=120&type=banned" -H "Authorization: Token <API token>" > mcas.txt
    ```

1.  Remove the leading `.`, for example by running `sed` from the CLI:

    ```txt
    sed -i 's/^.//' mcas.txt
    ```

1.  This will give you the list of hostnames without leading `.`.

1.  Replace the file's `.txt` extension with `.csv`. The file can now be imported into Cloudflare Zero Trust as a Hostname list.

## Using the API to query allowed applications

If you would like to get a list of all of the MCAS allowed applications, you can use the same API query, but instead of using `type=banned`, use `type=allowed`. This will return a much larger list.

```sh
$ curl -v "https://<MCAS API URL>/api/discovery_block_scripts/?format=120&type=allowed" -H "Authorization: Token <API token>"
```

## Adding a hostname list in Zero Trust

1.  In Zero Trust, go to **My Team** > **Lists**
1.  Click on **Upload CSV**. Even though the hostname list is not really in CSV format, it will work with no issues.
1.  Add a name for the list, specify "Hostnames" as the list type, and give it a description.
1.  Drag and drop your MCAS output file created via the API call, or you can click **Select a file**.
1.  Click **Create**. You will see the list of hostnames that have been added to the list.
1.  Save the list.

Your list is now ready to be referenced by Gateway HTTP policies.

## Creating an HTTP policy

1.  Go to **Gateway** > **Firewall Policies** > **HTTP policies**.

1.  Click **Create a policy**.

1.  Set the expression to:

    - Selector: `Host`
    - Operator: `In List`
    - Value: your newly created list name.

1.  Set the Action to `Block`.

Now when trying to visit one of the MCAS defined sites, the user will be blocked.

![Access Restricted](/images/cloudflare-one/microsoft-mcas/mcas-block-page.png)
