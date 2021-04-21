---
order: 0
---

# DNS policies (New)

When a user makes a DNS request to Gateway, Gateway matches the request against the content or security categories you have set up for your organization. If the domain does not belong to any blocked categories, or if it matches an Override policy, the user's client receives the DNS resolution and initiates an HTTP connection. 

![Gateway DNS flow](../../../static/documentation/policies/gateway-flow-1.jpg)

When creating a DNS policy, you can select as many security risk and content categories as you want to affect with the policy. 

Build a DNS policy by configuring the following elements:
* [Actions](#actions)
* [Expressions](#expressions)
* [Selectors](#selectors)
* [Operators](#operators)

<Aside>
Unless a more specific selector is configured in a rule (e.g., user email or source IP address for a registered location), then the rule will be evaluated against all DNS queries that reach Gateway from your organization.
</Aside>

## Actions
Just like actions in HTTP policies, actions in DNS policies allow you to choose what to do with a given set of elements. You can assign one action per policy.

These are the action types you can choose from:

* [Allow](#allow)
* [Block](#block)
* [Override](#override)
* [SafeSearch](#safesearch)
* [Youtube Restricted Mode](#youtube-restricted-mode)

### Allow

Rules with Allow actions allow DNS queries you specify within the Selectors and Value fields. For example, the following configuration allows DNS queries to domains we categorize as belonging to the Education content category:

| Selector | Operator | Value | Action |
| --- | --- | --- | --- |
| Content Categories | In | Education | Allow |

### Block

Rules with Block actions block DNS queries you specify within the Selectors and Value fields. For example, the following configuration blocks DNS queries to domains we categorize as belonging to the Adult Themes content category:

| Selector | Operator | Value | Action |
| --- | --- | --- | --- |
| Content Categories | In | Adult Themes | Block |

### Override

Rules with Override actions allow you to respond to all DNS queries for a given domain to another destination. For example, you can provide a custom response IP of 1.2.3.4 for all queries to www.example.com with the following rule:

| Selector | Operator | Value | Action |
| --- | --- | --- | --- |
| DNS Hostname | Is | `1.2.3.4` | Override |

### SafeSearch

SafeSearch is a feature of search engines that can help you filter explicit or offensive content. When you enable SafeSearch, the search engine filters explicit or offensive content and returns search results that are safe for children, you or at work.

You can use Cloudflare Gateway to enable SafeSearch on search engines like Google, Bing, Yandex, YouTube and DuckDuckGo. To enable SafeSearch, you can create the following rule:

| Selector | Operator | Value | Action |
| --- | --- | --- | --- |
| (None) | (None) | (None) | SafeSearch |

#### Test SafeSearch

You can test if SafeSearch is working by performing dig on the search engines. Instead of returning the regular IP address, you should see the CNAMEs returned like below:

##### Google
Google will return `forcesafesearch.google.com`.

![SafeSearch Google](../../../static/documentation/policies/google-safesearch.png)

##### YouTube
YouTube will return `restrict.youtube.com`.

![SafeSearch Youtube](../../../static/documentation/policies/youtube-safesearch.png)

##### Bing
Bing will return `strict.bing.com`.

![SafeSearch Bing](../../../static/documentation/policies/bing-safesearch.png)

##### DuckDuckGo
DuckDuckGo will return `safe.duckduckgo.com`.

![SafeSearch DuckDuckGo](../../../static/documentation/policies/duckduckgo-safesearch.png)

### YouTube Restricted Mode

Similarly, you can enforce YouTube Restricted mode by choosing the Youtube Restricted Mode action. YouTube Restricted Mode is an automated filter for adult and offensive content that's built into YouTube.

| Selector | Operator | Value | Action |
| --- | --- | --- | --- |
| (None) | (None) | (None) | YouTube Restricted Mode |

This setup ensures users will be blocked from accessing offensive sites using DNS.

## Selectors

Gateway matches DNS traffic against the following selectors, or criteria:

* DNS Content Categories
* DNS DoH Subdomain
* DNS Domain
* DNS Host
* DNS Query Rtype
* DNS Resolver IP
* DNS Security Categories
* DNS Src IP
* User Email
* User Group Emails
* User Group IDs
* User Group Names
* User Name

<TableWrap>

| Selector | Description |
| -------- | ----------- |
| DNS Domain | Use this selector to match against a domain and all subdomains—for example, if you want to block example.com and all subdomains of example.com. |
| DNS Host | Use this selector to match against only the hostname specified—for example, if you want to block only example.com but not subdomain.example.com. |
| DNS Query Rtype | This selector allows you to choose the DNS resource record type that you’d like to apply policies against—for example, you can choose to block A records for a domain but not MX records. |
| DNS Resolver IP | This selector allows you to apply policies to DNS queries that arrived to your Gateway Resolver IP address aligned with a registered location. For most Gateway customers, this is an IPv4 AnyCast address and policies created using this IPv4 address will apply to all locations. However, each location has a dedicated IPv6 address and some Gateway customers have been supplied with a dedicated IPv4 address—these both can be used to apply policies to specific registered locations. |
| DNS Src IP | Use this selector to apply DNS policies to a specific source IP address that queries arrived to Gateway from—for example, this could be the WAN IP address of the stub resolver used by an organization to send queries upstream to Gateway |

</TableWrap>

### DNS Security Categories

<Aside>

If you wish to block a hostname or URL that belongs to a security risk category, you need to block that category. If the security risk category is not configured as blocked, requests to that hostname or URL will appear in your Gateway logs as allowed requests.

</Aside>

<TableWrap>

| Category | Definition |
| -------- | ---------- |
| Anonymizer | Sites that allow users to surf the Internet anonymously. |
| Command and Control & Botnet | Sites that are queried by compromised devices to exfiltrate information or potentially infect other devices in a network. |
| Cryptomining | Sites that mine cryptocurrency by taking over the user's computing resources. |
| DGA Domains | Domains detected as generated by algorithms seen in malware. |
| DNS Tunneling | Domains with detected DNS tunneling activity. | 
| Malware | Sites hosting malicious content and other compromised websites. |
| New Domains | Domains that have been registered very recently. |
| Newly Seen Domains | Domains that have recently been resolved for the first time.|
| Phishing |Domains that are known for stealing personal information. |
| Private IP Address | Domains that resolve to private IP Addresses.
| Spam | Sites that are known for targeting users with unwanted sweepstakes, surveys, and advertisements. |
| Spyware | Sites that are known to distribute or contain code that displays unwanted advertisements or that gathers user information without the user’s knowledge.|
| Unreachable | Domains that resolve to unreachable IP addresses.|

</TableWrap>


### DNS Content Categories

<Aside type="Warning">
Sites that are classified as belonging to the Child Abuse category are blocked by default.
</Aside>

<TableWrap>

| Category | Definition |
| -------- | ---------- |
|Adult Themes	|	Sites that are hosting content related to pornography, nudity, sexuality, and other adult themes.|
|Business & Economy	|	Sites that are related to business, economy, finance, education, science and technology.|
|Deceptive Ads	|	Sites that spoof clicks, impressions, conversions for ads.|
|Drugs	|	Sites related to the use and promotion of illegal drugs or illegal use of prescribed drugs.|
|Education	|	Site hosting educational content that are not included in other categories like Science, Technology or Educational institutions.|
|Entertainment	|	Sites that are hosting entertaining content that are not included in other categories like Comic books, Audio streaming, Video streaming etc.|
|Gambling	|	Sites that are providing online gambling or are related to gambling.|
|Government & Politics	|	Sites related to government and politics.|
|Health	|	Sites containing information about health and fitness.|
|Information Technology	|	Sites related to information technology.|
|Internet Communication	|	Sites hosting applications that are used for communication like chat, mail etc.|
|Job Search & Careers	|	Sites that facilitate searching for jobs and careers.|
|Login Screens	|	Sites hosting login screens that are not included in other categories.|
|Miscellaneous	|	Sites that are not included in the listed security and content categories.|
|No Content	|	Sites that have no content.|
|Questionable Content	|	Sites hosting content that are related to hacking, piracy, profanity and other questionable activities.|
|Real Estate	|	Sites related to real estate.|
|Religion	|	Sites hosting content about religion, alternative religion, religious teachings, religious groups and spirituality.|
|Safe for Kids	|	Sites that are safe for kids to visit.|
|Security threats	|	Sites that contain security threats like malware, phishing, cryptomininng and other security threats.|
|Shopping & Auctions	|	Sites that are hosting content related to ecommerce, coupons, shopping, auctions and marketplaces.|
|Social & Family	|	Sites related to society and lifestyle.|
|Society & Lifestyle	|	Sites hosting information about lifestyle that are not included in other categories like fashion, food & drink etc.|
|Sports	|	Sites related to sports & recreation.|
|Technology	|	Sites hosting information about technology that are not included in the science category.|
|Travel	|	Sites that contain information about listings, reservations, services for travel.|
|Vehicles	|	Sites related vehicles, automobiles, including news, reviews, and other hobbyist information.|
|Violence	|	Sites hosting and/or promoting violent content.|
|Weather	|	Sites related to weather.|

</TableWrap>

## Operators

Operators are the way Gateway matches traffic to a selector. Matching happens as follows:

| Operator              |          Meaning
|:---------------------:|:---------------------------:|
|  is                   |  exact match, equals        |
|  is not               |  all except exact match     |
|  in                   |  in any of defined entries  |
|  not in               |  not in defined entries     |
|  matches regex        | regex evaluates to true         |
|  does not match regex |  all except when regex evals to true   |

### Blocking a subdomain

To block a domain and all subdomains, you can create the following rule:

| Selector | Operator | Value | Action |
| --- | --- | --- | --- |
| DNS Domain | Is | `example.com` | Block |

### Blocking a top-level domain

Just like you can choose to block a domain and all subdomains, you can block an entire top-level domain (TLD) by creating a rule. For example, if you wish to block all domains and subdomains registered as a `.net`, create the following rule:

| Selector | Operator | Value | Action |
| --- | --- | --- | --- |
| DNS Domain | Matches Regex | `[.]net` | Block |

Blocking a popular TLD like `.com` will prevent users from connecting to significant portions of the internet.

## Block Page

When choosing the Block action, toggle this setting to respond to queries with a block page. If disabled, Gateway will respond to blocked queries with `0.0.0.0`.




