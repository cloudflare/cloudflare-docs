---
pcx_content_type: how-to
title: Test DNS
weight: 2
---

# Test DNS

This section covers how to validate your Gateway DNS configuration.

## Prerequisites

Before you start, make sure you are connected to a network that is associated with the [location](/cloudflare-one/connections/connect-devices/agentless/dns/locations/) where the policy is applied.

## Test a DNS policy

Once you have created a DNS policy to block a domain, you can use either `dig` or `nslookup` to see if the policy is working as intended.

For example, if you created a policy to block `example.com`, you can do the following to see if Gateway is successfully blocking `example.com`:

1. Open your terminal.

2. Type `dig example.com` (`nslookup example.com` if you are using Windows) and press **Enter**.

3. If the [block page](/cloudflare-one/policies/filtering/configuring-block-page/) is disabled for the policy, you should see `REFUSED` in the answer section:

    ![Verify that a domain is blocked when the block page is disabled.](/cloudflare-one/static/documentation/faq/blocked-disabled.png)

    If the [block page](/cloudflare-one/policies/filtering/configuring-block-page/) is enabled for the policy, you should see `NOERROR` in the answer section and `162.159.36.12` and `162.159.46.12` as the answers:

    ![Verify that a domain is blocked when the block page is disabled.](/cloudflare-one/static/documentation/faq/blocked-enabled.png)

### Test a security or content category

If you are blocking a [security category](/cloudflare-one/policies/filtering/dns-policies/#security-categories) or a [content category](/cloudflare-one/policies/filtering/dns-policies/#content-categories), you can test that the policy is working by using the [test domain](#common-test-domains) associated with each category.

Once you have configured your Gateway policy to block the category, the test domain will show a block page when you attempt to visit the domain in your browser, or will return `REFUSED` when you perform `dig` using the command-line interface.

#### Test domain format

- **One-word category** — For categories with one-word names (for example, _Malware_), the test domain is of the form:

    ```txt
    <NAME_OF_CATEGORY>.testcategory.com
    ```

- **Multi-word category** — For categories with multiple words in the name (for example, _Parked & For Sale Domains_), the test domain uses the following format:

    - Remove any spaces between the words
    - Replace `&` with `and`
    - All letters are lowercase

#### Common test domains

| Category                       | Test domain                                   |
| ------------------------------ | --------------------------------------------- |
| _Anonymizer_                   | `anonymizer.testcategory.com`                 |
| _Command and Control & Botnet_ | `commandandcontrolandbotnet.testcategory.com` |
| _Cryptomining_                 | `cryptomining.testcategory.com`               |
| _Malware_                      | `malware.testcategory.com`                    |
| _New Domains_                  | `newdomains.testcategory.com`                 |
| _Parked & For Sale Domains_    | `parkedandforsaledomains.testcategory.com`    |
| _Phishing_                     | `phishing.testcategory.com`                   |
| _Private IP Address_           | `privateipaddress.testcategory.com`           |
| _Spam_                         | `spam.testcategory.com`                       |
| _Spyware_                      | `spyware.testcategory.com`                    |
| _Unreachable_                  | `unreachable.testcategory.com`                |

## Test EDNS

If you [enabled EDNS client subnet](/cloudflare-one/connections/connect-devices/agentless/dns/locations/) for your location, you can validate EDNS as follows:

1. Obtain your location's DOH subdomain:

    1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Gateway** > **Locations**.
    2. Select the location you are testing.
    3. Note the value of **DNS over HTTPS**.

2. Open a terminal and run the following command:

    ```sh
    $ curl 'https://<DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query?type=TXT&name=o-o.myaddr.google.com' -H 'Accept: application/dns-json' | json_pp
    ```

    The output should contain your EDNS client subnet:

    ```json
    ---
    highlight: [12]
    ---
    {
    "AD" : false,
    "Answer" : [
        {
            "TTL" : 60,
            "data" : "\"108.162.218.211\"",
            "name" : "o-o.myaddr.google.com",
            "type" : 16
        },
        {
            "TTL" : 60,
            "data" : "\"edns0-client-subnet 136.62.0.0/24\"",
            "name" : "o-o.myaddr.google.com",
            "type" : 16
        }
    ],
    "CD" : false,
    "Question" : [
        {
            "name" : "o-o.myaddr.google.com",
            "type" : 16
        }
    ],
    "RA" : true,
    "RD" : true,
    "Status" : 0,
    "TC" : false
    }
    ```

3. To verify your EDNS client subnet, obtain your source IP address:

        ```sh
        $ curl ifconfig.me
        136.62.12.156%
        ```
    The source IP address should fall within the /24 range specified by your EDNS client subnet.
