---
pcx_content_type: tutorial
source: https://support.cloudflare.com/hc/articles/360000841472
title: Add Multiple Sites via automation
---

# Add multiple sites via automation

To add multiple sites to Cloudflare at once and more efficiently, you can do so via the Cloudflare API.

Adding multiple sites can be useful when you:

- Have multiple domains mapping back to a single, canonical domain (common for domains in different countries - such as `.com.au`, `.co.uk` - that you want protected by Cloudflare).
- Are a [partner](https://www.cloudflare.com/partners/), agency, or IT consultancy, and manage multiple domains on behalf of your customers.
- Are moving an existing set of sites over to Cloudflare.

Using the API will allow you to add multiple sites quickly and efficiently, especially if you are already familiar with [how to change your name-servers](/dns/zone-setups/full-setup/setup/) or [add a DNS record](/dns/manage-dns-records/how-to/create-dns-records/).

___

{{<tutorial>}}

{{<tutorial-prereqs>}}

To add multiple sites to Cloudflare via automation, you need:

- An existing [Cloudflare account](/fundamentals/account-and-billing/account-setup/create-account/).
- Basic familiarity with the command line.
- `curl` installed (by default on macOS & Linux).
- [`flarectl`](https://github.com/cloudflare/cloudflare-go/releases) installed
- A Cloudflare [API token](/fundamentals/api/get-started/create-token/) with zone-level permissions for `Zone: Edit` and `DNS: Edit`.
- A list of domains you want to add, each on a separate line (newline separated), stored in a file like `domains.txt`.
- To have disabled [DNSSEC](/dns/concepts/#dnssec) for each domain at your registrar (where you bought your domain name).
  
{{<render file="_dnssec-providers.md" productFolder="dns">}}

{{<render file="_dnssec-enabled-migration.md" productFolder="dns">}}

{{</tutorial-prereqs>}}

{{<tutorial-step title="Add domains">}}

Add domains using [flarectl](https://github.com/cloudflare/cloudflare-go/releases), Cloudflare's official CLI.

1. Open the command line.
2. Set your API credentials:

  ```sh
  $ export CF_API_TOKEN=<API_TOKEN>
  ```

3. Create your domains using `flarectl`:

  ```sh
  $ for domain in $(cat domains.txt); do
      flarectl zone create --zone=$domain 
  done
  ```

{{<Aside type="warning">}}

{{<render file="_automation-number-limitations.md">}}

{{</Aside>}}

{{</tutorial-step>}}

{{<tutorial-step title="Trigger DNS scans" optional=true >}}

Cloudflare offers a [quick scan](/dns/zone-setups/reference/dns-quick-scan/) that helps populate a zone's DNS records. This scan is a best effort attempt based on a predefined list of commonly used record names and types.

To trigger this scan via the Cloudflare API:

1. Open your command line.
2. Use `flarectl` to compile a list of zone IDs into a new file (named `ids.txt`).

  ```sh
  $ for domain in $(cat domains.txt); do
    flarectl --json zone info --zone=$domain | jq -r '.[].ID' >> ids.txt
  done
  ```

3. For each line in `ids.txt`, make an API call to trigger the [DNS quick scan](/api/operations/dns-records-for-a-zone-scan-dns-records).

  ```sh
  $ for id in $(cat ids.txt); do  
      curl --request POST \
      --url "https://api.cloudflare.com/client/v4/zones/$id/dns_records/scan" \
      --header "Content-Type: application/json" \
      --header "Authorization: Bearer $CF_API_TOKEN"
  done
  ```

{{</tutorial-step>}}

{{<tutorial-step title="Update nameservers">}}

For each domain to become active on Cloudflare, it needs to use Cloudflare for its authoritative nameservers.

1. Open your command line.
2. Use `flarectl` to get a list nameservers associated with each domain. 

  ```sh
  $ for domain in $(cat domains.txt); do 
      flarectl zone info --zone=$domain 
  done
  ```

  The response will include a table containing the nameservers associated with each domain, similar to:

  {{<table-wrap>}}

  | ID | ZONE | PLAN | STATUS | NAME SERVERS | PAUSED | TYPE |
  | --- | --- | --- | --- | --- | --- | --- |
  | <ZONE_ID> | `example.com` | Free Website | pending | `arya.ns.cloudflare.com`, `tim.ns.cloudflare.com` | false  | full |

  {{</table-wrap>}}

3. Use the values in the **NAME SERVERS** column to [update the nameservers](/dns/zone-setups/full-setup/setup/#update-your-registrar) at the registrar of each domain.


{{</tutorial-step>}}

{{</tutorial>}}

___

## Limitations

{{<render file="_automation-number-limitations.md">}}
<br/>

After that, you cannot have more pending sites than active sites associated with your Cloudflare account. We recommend waiting until your pending sites have been [activated](/dns/zone-setups/reference/domain-status/) before adding additional domains.

## Common issues

If any errors were returned in this process, the domain may not be registered (or only just registered), be a subdomain, or otherwise been invalid. For more details, refer to [Cannot add domain](/dns/zone-setups/troubleshooting/cannot-add-domain/).