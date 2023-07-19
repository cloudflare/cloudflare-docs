---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115001661191-Cloudflare-PHP-API-Binding
title: Cloudflare PHP API Binding
---

# Cloudflare PHP API Binding

{{<Aside type="warning">}}

This PHP API binding has been deprecated. You should refer to the [REST API documentation](/api/) instead.

{{</Aside>}}

## Overview

Cloudflare offers a PHP API binding for those using PHP 7.0 or greater; this binding supports the latest version 4 of the Cloudflare API. You can use this SDK for a variety of purposes, including:

-   Manage and automate changes to your DNS records within Cloudflare
-   Programmatically add zones to your account
-   Version and change control for Page Rules
-   Automatically blocking IPs and User Agents using Zone Lockdown and UserAgent Rules
-   Fetch Cloudflare's IP ranges for automating your firewall allowlist

___

## Supported Features

This article explains a few common examples of using Cloudflare's PHP API Binding; we currently support the following endpoints and authentication methods: 

### V4 Endpoints

-   DNS
-   IPs
-   Page Rules
-   User Agent Rules
-   User Management (partial)
-   Zone Lockdown
-   Zones

### Authentication

-   User Service Keys
-   API Keys

___

## Installation

The [Cloudflare PHP API Binding](https://packagist.org/packages/cloudflare/sdk) is available on Packagist as [cloudflare/sdk](https://packagist.org/packages/cloudflare/sdk) and can be installed using Composer by running _composer require cloudflare/sdk:_

![Code - composer require cloudflare/sdk](/images/support/cmd-composer_require_cloudflare_sdk.png)

Alternatively should you wish to look directly at the source code or make contributions, you can find the original source code on GitHub in the [cloudflare/cloudflare-php](https://github.com/cloudflare/cloudflare-php) repository. 

___

## Getting Started

Here is a simple example of using the API


```php
getUserID() . PHP_EOL;
```

Running this simple script via terminal yields the following output:

![Getting user ID](/images/support/cmd-getting-user-id.png)

___

## Listing Zones

Here is a simple script to list all the zones on an account, using the following code:

```php
listZones()->result as $zone) {
    echo $zone->name.' ('.$zone->plan->name.')'.PHP_EOL;
}
```

Running this via the command line yields the following output:

![Script to list all the zones on an account](/images/support/cmd-listing-zones.png)

___

## Purge Cache on Every Website

Here's another example which utilises the cache purge endpoint to clear the entire cache on every website in our account (note that you can purge individual files using the cache using the cachePurge method instead of cachePurgeEverything):

```php
listZones()->result as $zone) {
    echo "Cache purge for " . $zone->name . ": ";
    echo $zones->cachePurgeEverything($zone->id) == true ? "successful" : "failed";
    echo PHP_EOL;
}
```

Here is the output of running this script via the command line:

![Purge Cache on Every Website](/images/support/php-cache-purge-everything.png)

___

## Creating Page Rules

The SDK can also be used for Programmatically adding Page Rules to a Cloudflare Zone, here's a simple example of adding a Cache Bypass rule:

```php
getZoneID("junade.com");

$pageRulesTarget = new \Cloudflare\API\Configurations\PageRulesTargets('https://junade.com/noCache/*');

$pageRulesConfig = new \Cloudflare\API\Configurations\PageRulesActions();
$pageRulesConfig->setCacheLevel('bypass');

$pageRules = new \Cloudflare\API\Endpoints\PageRules($adapter);
$pageRules->createPageRule($zoneID, $pageRulesTarget, $pageRulesConfig, true, 6);
```

We are able to easily get the ID of a given zone using the getZoneID method in the Zones endpoint class, this helper method makes it easier to get the zone ID from the zone name.

Note that the SDK uses dependency injection for specifying the target and the configuration of the page rules. That's why we need to pass instances of the PageRulesTargets and the PageRuleActions classes into the createPageRule method.

___

## DNS

The SDK can also be used for Programmatically adding records, here's an example of adding an example DNS record:

```php
getZoneID("junade.com");

$dns = new \Cloudflare\API\Endpoints\DNS($adapter);
if ($dns->addRecord($zoneID, "A", 'example', '8.8.8.8', 0, true) === true) {
    echo "DNS record created.". PHP_EOL;
}
```

Further, we can also delete, list and view details of DNS records through this SDK. For example; let's create a simple script to list the type and name of every DNS record on our zone:

```php
getZoneID("icyapril.com");

$dns = new \Cloudflare\API\Endpoints\DNS($adapter);
foreach ($dns->listRecords($zoneID)->result as $record) {
    echo $record->type." ".$record->name.PHP_EOL;
}
```

Here's the example when I run this script against one of my zones:

![Script to list the type and name of every DNS record on our zone](/images/support/php-list-dns-type-name.png)
