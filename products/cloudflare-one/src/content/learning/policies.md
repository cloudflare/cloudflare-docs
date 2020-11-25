---
order: 2
---

# Policies

| Related products | [Access](https://developers.cloudflare.com/access/) | [Gateway](https://developers.cloudflare.com/gateway/) |
|---|---|---|

<Aside> 

**Definition**

Policies are sets of rules that allow you to control:
* **Inbound** requests to your applications, with **Access**
* **Outbound** traffic to the Internet, with **Gateway**

</Aside>

Cloudflare for Teams allows your organization to control inbound requests to your applications, as well as outbound traffic to the Internet. Policies also allow you to block security threats and potentially malicious websites.

While both policies in [Access](#access-policies) and policies in [Gateway](#gateway-policies) act as a set of rules that help you filter activity on your network, they are quite different in nature and scope. Let's dive into what you can do with policies in both products.

## Access policies

Access policies let you define who has access to your organization's applications. To build an Access policy, you will have to combine different elements; the way you assemble these "building blocks" determines the scope and effectiveness of your policy.

The elements that make up an Access policy are:

* **Actions**
* **Rules**
* **Criteria**

### Actions

Actions let you define what *action* you want to take on a certain user or user group. Do you want to allow someone access to your applications? Do you want to deny someone access to your applications? Do you want to bypass certain users?

The action is the first element you'll be asked to configure when you create an Access policy in the Teams dash. You can set only one action per policy.

These are the action types you can choose from:

* **​Allow**.  
    The allow action allows users that meet certain criteria to reach an application behind Access. 
* **Block**.  
    The block action prevents users from reaching an application behind Access. 
* **Bypass**.  
    The bypass action disables any Access enforcement for traffic that meets the defined rule criteria.
* **Service Auth**.  
    Service Auth rules enforce authentication flows that do not require an identity provider IdP) login, such as service tokens and mutual TLS.

**Note.** When applying a Bypass action, security settings revert to the defaults configured for the zone and any configured page rules. If Always use HTTPS is enabled for the site, then traffic to the bypassed destination continues in HTTPS. If it is not or you applied page rules to disable it, traffic is HTTP.

### Rules

Rules work like logical operators. They help you define which categories of users your policy will affect. Each action needs at least an Include rule; for each action, you can set as many rules as you need. 

These are the rule types you can choose from:

| Include | Exclude | Require |
| ------- | ------- | ------- |
| The Include action is similar to an OR logical operator. In case more than one Include rule is specified, users need to meet only one of the criteria. | The Exclude rule works like a NOT logical operator. A user meeting any Exclude criteria won’t be allowed access to the application. | The Require rule works like an AND logical operator. A user must meet all specified Require rules to be allowed access. |

### Criteria

When you add a rule to your policy, you will be asked to specify the criteria you want users to meet in order for the rule to be applied to them. For example, you may want your policy to apply to all your team members in a specific country, except the ones whose email ends in `@contractor.company.com`. 

Here is a list of all the criteria you can apply:

* **Emails** — `you@company.com`
* **Emails ending in** — `@company.com`
* **Access groups** — `example-team`
* **IP ranges** — `192.168.100.14` (supports IPv4 and IPv6).
* **Everyone** — allows, denies, or bypasses access to everyone.
* **Country** – uses the IP address to determine country.
* **Valid Certificate** - the request will need to present any valid client certificate.
* **Common Name** - the request will need to present a valid certificate with an expected common name.
* **Any Access Service Token** - the request will need to present the headers for any [service token](/access-service-auth/service-tokens) created for this account.
* **Service Token** - the request will need to present the correct service token headers configured for the specific application
* **Identity provider groups** — employs the user groups (if supported) you configured with your identity provider (IdP) or LDAP with Access. The IdP group option only displays if you use an identity provider that passes groups using SAML or OAuth Scope.
* **Authentication Method** - checks the [multifactor authentication](/learning/mfa-requirements) method used by the user, if supported by the identity provider.


### Example scenarios


| Action | Rule | Criteria |
| ------ | ---- | -------- |
| Allow  | Include | Emails Ending In: `@example.com` |

**Result**: this configuration lets any user with an `@example.com` email address, as validated against an IdP, reach the application. 

| Action | Rule | Criteria |
| ------ | ---- | -------- |
| Allow  | Include | Country: `Portugal` |
|  | Require | Emails Ending In: `@team.com` |
|  | Exclude | Email: `user-1@team.com`, `user-2@team.com` |

**Result**: this configuration lets any user from Portugal with a `@team.com` email address, as validated against an IdP, reach the application, except for `user-1` and `user-2`.

| Action | Rule | Criteria |
| ------ | ---- | -------- |
| Block  | Include | `Everyone` |

**Result**: this configuration blocks every request to the application.


## Gateway policies

Gateway policies allow you to grant or deny your users access to specific domains or domain categories.

### DNS policies

When a user makes a DNS request to Gateway, Gateway matches the request against the content or security categories you have set up for your organization. If the domain does not belong to any blocked categories, or if it matches an override rule, the user's client receives the DNS resolution and initiates an HTTP connection. 

DNS policies can be built by doing one or more of the following:

1. Selecting security threat categories you want to block.
1. Enabling SafeSearch.
1. Enabling YouTube Restricted Mode.
1. Selecting content categories you want to block.
1. Adding custom domains you want to block, allow, or override.

#### Security threat categories

When creating a DNS policy, you can select as many security threat categories as you want to block with the policy. This allows you to block known and potential security threats on the public Internet.

#### Content categories

<Aside>

Sites that are classified as belonging to the **Child Abuse** category are blocked by default.
</Aside>

When creating a DNS policy, you can select as many content categories as you want to block with the policy.

#### Destinations

Setting a **destination** for a policy allows you to have manual control on what action to take on requests for specific domains.
When setting a domain as a destination, you have the option to allow, block or override that domain.
* **Allow**. This action forces resolving this destination and all its sub-destinations, and takes precedence over any blocked destinations.
* **Block**. This action will block a destination and all its sub-destinations.
* **Override**. This action will forward all requests to a given destination to another destination you can set.

#### Order of operations

When a DNS query matches with a DNS policy, Gateway follows this order of operations:

| Step |          Check If           |                           If Matches                      |     Else    |
|:----:|:---------------------------:|:---------------------------------------------------------:|:-----------:|
|  1   |  Domain is in CSAM category | Block domain, return REFUSED                              |Go to step 2 |
|  2   |    Domain in Allow list     | Allow domain, return NOERROR with IP address of the domain|Go to step 3 |
|  3   |    Domain in Block list     | Block domain, return REFUSED                              |Go to step 4 |
|  4   |    Domain in SafeSearch     | Override domain, return NOERROR with safe CNAME           |Go to step 5 |
|  5   | Domain blocked by category  | Block domain, return REFUSED                              |Go to step 6 |
|  6   |            N/A              | Allow domain, return NOERROR with IP address of the domain|     N/A     |

### HTTP policies

You can decide to add a policy to filter HTTP traffic on the L7 firewall. Gateway will intercept all HTTP and HTTPS traffic and apply the rules you have configured in your policy to either block, allow, or override specific elements such as websites, IP addresses, and file types.

You can build an HTTP policy by configuring the following elements:

* **Actions**
* **Expressions**
* **Selectors**
* **Operators**

#### Actions

Just like actions on destinations in DNS policies, actions in HTTP policies allow you to choose what to do with a given set of elements (domains, IP addresses, file types, and so on). You can assign one action per policy.

These are the action types you can choose from:

* **Allow** 
* **Block** 
* **Bypass** lets administrators bypass certain elements from inspection. Administrators who wish to bypass a site must match against the host in order to prevent HTTP inspection from occuring on both encrypted and plaintext traffic. The bypass action is only available when matching against the host criteria.

#### Selectors
Gateway matches HTTP traffic against the following selectors, or criteria:
* **Host**
* **URL**
* **URL Query**
* **URL Path**
* **URL Path and Query**
* **HTTP Method**
* **HTTP Response**
* **Uploaded and Downloaded File Extension**
* **Uploaded and Downloaded Mime Type**
* **Content categories**

List of file extensions Gateway can match against:

<TableWrap>

| Image | Executable | Audio | Documents | Data | Compressed | System | Video |
|------|------|-------|------|--------|--------|--------|-----|
| avif | apk | m4a | doc | avro | 7z | bak | avi |
| bmp | bat | mid | docx | csv | arj | cab | flv |
| gif | bin | mp3 | odp | dat | bz2 | cpl | h264 |
| ico | cgi | mpa | ods | dmg | deb | cur | m4v |
| jpeg | com | wav | odt | iso | gz | emu | mkv |
| png | dll | wma | pdf | json | lz | ini | mov |
| psd | exe | ppt | | log | lz4 | scr | mp4 |
| svg | hta | pptx | | mdb | lzh | sys | mpeg |
| tif | jar | rtf | | nzb | lzma | tmp | wmv |
| webp | moo | txt | | orc | pak
|  | pif | xls | | parquet | rar
|  | pl | xlsx | | rc | rpm
|  | prg | | | sav | sz
|  | | | | wasm | xz | | 
|  |      | | | sql lite | z
|  |      | | | tar | zip
|  |      | | | toml | zlib |
|  |      | | | torrent | zst |
|  |      | | | xml |  |
|  |      | | | yaml | | 

</TableWrap>



#### Operators
Operators are the way Gateway matches traffic to a selector. Matching happens as follows:

| Operator              |          Meaning
|:---------------------:|:---------------------------:|
|  is                   |  exact match, equals        |
|  is not               |  all except exact match     |
|  in                   |  in any of defined entries  |
|  not in               |  not in defined entries     |
|  matches regex        | regex evaluates to true         |
|  does not match regex |  all except when regex evals to true   |

#### Expressions
Expressions are sets of conditions with which you can combine [selectors](#selectors) and [operators](#operators). By configuring one or more expressions, you can define the scope of your HTTP policy. 

#### Example scenarios

| Action | Selector | Operator | 
| ------ | ---- | -------- | 
| Block  | Content categories | in: `Gaming` | 

**Result**: this configuration blocks any traffic to domains categorized as `Gaming`. 

| Action | Selector | Operator | 
| ------ | ---- | -------- | 
| Block  | Downloaded File Extension | is: `torrent` |

**Result**: this configuration blocks the download of any torrent files. 

