---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200170786-Restoring-original-visitor-IPs
title: Restoring original visitor IPs
---

# Restoring original visitor IPs



## Overview

When your [website traffic is routed through the Cloudflare network](https://support.cloudflare.com/hc/articles/205177068), we act as a reverse proxy. This allows Cloudflare to speed up page load time by routing packets more efficiently and caching static resources (images, JavaScript, CSS, etc.). As a result, when responding to requests and logging them, your origin server returns a [Cloudflare IP address](https://www.cloudflare.com/ips/).

For example, if you install applications that depend on the incoming IP address of the original visitor, a Cloudflare IP address is logged by default. The original visitor IP address appears in an appended HTTP header called [_CF-Connecting-IP_](https://support.cloudflare.com/hc/articles/200170986). By following our [web server instructions](https://support.cloudflare.com/hc/articles/200170786#JUxJSMn3Ht5c5yq), you can log the original visitor IP address at your origin server. If this HTTP header is not available when requests reach your origin server, check your [Transform Rules](/rules/transform/) and [Managed Transforms](/rules/transform/managed-transforms/) configuration.

The diagram below illustrates the different ways that IP addresses are handled with and without Cloudflare.

![The diagram illustrates the different ways that IP addresses are handled with and without Cloudflare.](/support/static/Restoring_IPs__1_.png)

{{<Aside type="warning">}}
Cloudflare no longer updates and supports *mod\_cloudflare*, starting
with versions **Debian 9** and **Ubuntu 18.04 LTS** of the Linux
operating system. We now recommend
[*mod\_remoteip*](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV)
for customers using Apache web servers. Customers who are interested in
building the *mod\_cloudflare* package can [download the
codebase](https://github.com/cloudflare/mod_cloudflare) from GitHub.
{{</Aside>}}

___

## mod\_remoteip

### Overview

Cloudflare no longer updates and supports _mod\_cloudflare._ However, if you are using an Apache web server with an operating system such as **Ubuntu Server 18.04** and **Debian 9 Stretch**, you can use _mod\_remoteip_ to log your visitor’s original IP address.

**As this module was created by an outside party, we can't provide technical support for issues related to the plugin.**

To install _mod\_remoteip_ on your Apache web server:

1\. Enable _mod\_remoteip_ by issuing the following command:

```sh
$ sudo a2enmod remoteip
```

2\. Update the site configuration to include _RemoteIPHeader CF-Connecting-IP_, e.g. `/etc/apache2/sites-available/000-default.conf`

```
ServerAdmin webmaster@localhost
DocumentRoot /var/www/html
ServerName remoteip.andy.support
RemoteIPHeader CF-Connecting-IP
ErrorLog ${APACHE_LOG_DIR}/error.log
CustomLog ${APACHE_LOG_DIR}/access.log combined
```

3\. Update combined _LogFormat_ entry in `apache.conf`, replacing _%h_ with _%a in_ `/etc/apache2/apache2.conf.` For example, if your current _LogFormat_ appeared as follows

```
LogFormat "%h %l %u %t \"%r\" %>s %O \"%{Referer}i\" \"%{User-Agent}i\"" combined
```

you would update _LogFormat_ to the following:

```
LogFormat "%a %l %u %t \"%r\" %>s %O \"%{Referer}i\" \"%{User-Agent}i\"" combined
```

4\. Define trusted proxy addresses by creating `/etc/apache2/conf-available/remoteip.conf` by entering the following code and [Cloudflare IPs](https://www.cloudflare.com/ips/):

```
RemoteIPHeader CF-Connecting-IP
RemoteIPTrustedProxy 192.0.2.1 (example IP address)
RemoteIPTrustedProxy 192.0.2.2 (example IP address)
(repeat for all Cloudflare IPs listed at https://www.cloudflare.com/ips/)
```

5\. Enable Apache configuration:

```sh
$ sudo a2enconf remoteip
Enabling conf remoteip.
To activate the new configuration, you need to run:
service apache2 reload
```

6\. Test Apache configuration:

```sh
$ sudo apache2ctl configtest
Syntax OK
```

7\. Restart Apache:

```sh
$ sudo systemctl restart apache2
```

{{<Aside type="note">}}
For more information on *mod\_remoteip*, refer to the [Apache
documentation](https://httpd.apache.org/docs/2.4/mod/mod_remoteip.html "Apache Module mod_remoteip").
{{</Aside>}}

___

## mod\_cloudflare

{{<Aside type="warning">}}
Cloudflare no longer updates and supports *mod\_cloudflare*, starting
with versions **Debian 9** and **Ubuntu 18.04 LTS** of the Linux
operating system. We now recommend
[*mod\_remoteip*](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV)
for customers using Apache web servers. Customers who are interested in
building the *mod\_cloudflare* package can [download the
codebase](https://github.com/cloudflare/mod_cloudflare) from GitHub.
{{</Aside>}}

There are two methods for installing mod\_cloudflare: by downloading the Apache extension from Github or by adding code to your origin web server.

### Downloading packets or scripts from Github

If you are using an Apache web server, you can download mod\_cloudflare from [Github](https://github.com/cloudflare/mod_cloudflare).

### Adding code to your origin web server

If you can't install mod\_cloudflare, or if there is no Cloudflare plugin available for your content management system platform to restore original visitor IP, add this code to your origin web server in or before the <body> tag on any page that needs the original visitor IPs:

```php
<?php if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CF_CONNECTING_IP'];?>
```

This command will only make the IP address available to scripts that need it. It doesn’t store the IP in your actual server logs.

### Apache

To remove _mod\_cloudflare_, you should comment out the Apache config line that loads _mod\_cloudflare_.

This varies based on your Linux distribution, but for most people, if you look `in /etc/apache2`, you should be able to search to find the line:

`LoadModule cloudflare_module`

Comment or remove this line, then restart apache, and _mod\_cloudflare_ should be gone.

If you are running Ubuntu or Debian, you should see.

`file/etc/apache2/mods-enabled/cloudflare.load`

delete this file to remove _mod\_cloudflare_, then restart Apache.

### Nginx

Mod\_cloudflare is installed by modifying [the nginx configuration file](http://nginx.org/en/docs/http/ngx_http_realip_module.html) `nginx.conf` with the `ngx_http_realip_module`.

To remove _mod\_cloudflare_ you should comment or remove this line, then restart nginx, and _mod\_cloudflare_ should be gone_._

{{<Aside type="note">}}
To remove *mod\_cloudflare* from other web server types, consult your
web server documentation for how to remove modules.
{{</Aside>}}

___

## Web server instructions

Refer below for instructions on how to configure your web server to log original visitor IPs based on your web server type:

{{<Aside type="warning">}}
Cloudflare no longer updates and supports *mod\_cloudflare*, starting
with versions **Debian 9** and **Ubuntu 18.04 LTS** of the Linux
operating system. We now recommend
[*mod\_remoteip*](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV)
for customers using Apache web servers. Customers who are interested in
building the *mod\_cloudflare* package can [download the
codebase](https://github.com/cloudflare/mod_cloudflare) from GitHub.
{{</Aside>}}

1.  Make sure the following is installed:
    -   Red Hat/Fedora`sudo yum install httpd-devel libtool git`
    -   Debian/Ubuntu`sudo apt-get install apache2-dev libtool git`
2.  Clone the following for the most recent build of _mod\_cloudflare_:
    -   Red Hat/Fedora/Debian/Ubuntu:`git clone https://github.com/cloudflare/mod_cloudflare.git; cd mod_cloudflare`
3.  Use the Apache extension tool to convert the .c file into a module:
    -   Red Hat/Fedora/Debain/Ubuntu:`apxs -a -i -c mod_cloudflare.c`
4.  Restart and verify the module is active:
    -   Red Hat/Fedora`service httpd restart; httpd -M|grep cloudflare`
    -   Debian/Ubuntu:`sudo apachectl restart; apache2ctl -M|grep cloudflare`
5.  If your web server is behind a load balancer, add the following line to your Apache configuration (httpd.conf usually) and replace 123.123.123.123 with your load balancer's IP address:

```
IfModule cloudflare_module
CloudFlareRemoteIPHeader X-Forwarded-For
CloudFlareRemoteIPTrustedProxy [insert your load balancer’s IP address]
DenyAllButCloudFlare
/IfModule
```

Use the [`ngx_http_realip_module` NGINX module](http://nginx.org/en/docs/http/ngx_http_realip_module.html) and the following configuration parameters:

```
set_real_ip_from 192.0.2.1 (example IP address)
(repeat for all Cloudflare IPs listed at https://www.cloudflare.com/ips/)

#use any of the following two

real_ip_header CF-Connecting-IP;
#real_ip_header X-Forwarded-For;
```

That list of prefixes needs to be updated regularly, and we publish the full list in [Cloudflare IP addresses](https://www.cloudflare.com/ips).

{{<Aside type="note">}}
To Include the original visitor IP in your logs, add the variables
\$http\_cf\_connecting\_ip and \$http\_x\_forwarded\_for in the
log\_format directive.
{{</Aside>}}

Also refer to: [Cloudflare and NGINX](https://danielmiessler.com/blog/getting-real-ip-addresses-using-cloudflare-nginx-and-varnish/).

{{<Aside type="warning">}}
Cloudflare no longer updates and supports *mod\_cloudflare*, starting
with versions **Debian 9** and **Ubuntu 18.04 LTS** of the Linux
operating system. We now recommend
[*mod\_remoteip*](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV)
for customers using Apache web servers. Customers who are interested in
building the *mod\_cloudflare* package can [download the
codebase](https://github.com/cloudflare/mod_cloudflare) from GitHub.
{{</Aside>}}

1.  Run the following script to install mod\_cloudflare as part of EasyApache: `bash <(curl -s https://raw.githubusercontent.com/cloudflare/mod_cloudflare/master/EasyApache/installer.sh)`
2.  Upon installing, you will need to recompile your Apache with the new mod\_cloudflare plugin.

When using Railgun (or other reverse proxy software, such as Varnish), user's requests will come from your Railgun server instead of Cloudflare. Because requests are not coming directly from Cloudflare, any added mods will not restore visitor IP addresses by default.

1.  To fix this, open up your Apache configuration. This can typically be found in `/etc/apache2/apache2.conf`, `/etc/httpd/httpd.conf`, `/usr/local/apache/conf/httpd.conf` or another location depending on configuration. If you're unsure, ask your hosting provider.
2.  At the very end add:`CloudflareRemoteIPTrustedProxy railgun_address`So, if your Railgun server is located at 127.0.0.1, it will look like:`CloudflareRemoteIPTrustedProxy 127.0.0.1`
3.  If you have more than one server to add to the trusted proxy list, you can add them at the end:CloudflareRemoteIPTrustedProxy 127.0.0.1 127.0.0.2

To have Lighttpd automatically rewrite the server IP for the access logs and for your application, you can follow one of the two solutions below.

1.  Open your **lighttpd.conf** file and add _mod\_extforward_ to the _server.modules_ list. It must come **after** _mod\_accesslog_ to show the real IP in the access logs
2.  Add the following code block anywhere in the **lighttpd.conf** file after the server modules list and then restart Lighttpd

```
$HTTP["remoteip"] == "192.2.0.1 (example IP address)" 
{
extforward.forwarder = ( "all" => "trust" )
extforward.headers = ("CF-Connecting-IP")
}

(repeat for all Cloudflare IPs listed at https://www.cloudflare.com/ips/)
```

{{<Aside type="tip">}}
If your origin connects to the Internet with IPv6,
**\$HTTP\[\"remoteip\"\]**, which is required for matching the remote IP
ranges does not work when IPv6 is enabled. Using the above method will
not work when trying to forward IP ranges. Add the following lines to
lighttpd.conf as an alternative solution:
`extforward.forwarder = ( "all" => "trust" ) extforward.headers = ("CF-Connecting-IP")`
{{</Aside>}}

1.  Go to your LiteSpeed Web Admin Console.
2.  Enable the option Use Client IP in Header in Configuration.
3.  Once enabled, your access logs will now show the correct IP addresses, and even PHP's `$_SERVER['REMOTE_ADDR']` variable will contain the client real IP address, instead of a Cloudflare IP address, which in itself will resolve most problems you could hit when enabling Cloudflare on PHP-enabled web sites (like WordPress or vBulletin installs).

##### For IIS 7 - 8:

Follow the directions [here](https://techcommunity.microsoft.com/t5/iis-support-blog/how-to-use-x-forwarded-for-header-to-log-actual-client-ip/ba-p/873115).

##### For IIS 8.5 - 10:

From IIS 8.5 onwards, custom logging is a built-in option. Refer to [IIS Enhanced Logging](http://www.iis.net/learn/get-started/whats-new-in-iis-85/enhanced-logging-for-iis85).

1.  In IIS Manager, double click on **Logging** in the _Actions_ menu of the site you are working on.
2.  After this launches, select **W3C** as the format and then click **Select Fields** next to the format drop-down in the _Log File_ sub-section.
3.  Click on **Add Field** and add in _CF-Connecting-IP_ header.
4.  Click **Ok**. You should see your new entry reflected under **Custom Fields**. Click on **Apply** when you are back in the _Logging_ window.

1.  If this is successful, the log file should now have an underscore:You should also see the change in the fields:
2.  Restart the site, then W3SVC, then the entire instance if the change doesn’t reflect immediately.When using enhanced logging in IIS 8.5+, it **does not restore** original visitor IP at the application level.

To have Tomcat7 automatically restore the original visitor IP to your access logs and application you will need to add `%{CF-Connecting-IP}i` into your log schema.

As an example, you could add the below block to your `server.xml` file.

```xml
<Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs" prefix="localhost_access_log." suffix=".txt" pattern="%{CF-Connecting-IP}i - %h %u %t - &quot;%r&quot; - %s - %b - %{CF-RAY}i"/>
```

Which would result in your logs looking like this:

`Visitor IP - Cloudflare IP - [04/Dec/2014:23:18:15 -0500] - "GET / HTTP/1.1" - 200 - 1895 - 193d704b85200296-SJC`

Refer to this third-party tutorial on restoring original visitor IP with [Magento and Cloudflare](https://tall-paul.co.uk/2012/03/02/magento-show-remote-ip-when-using-cloudflare/).

Similarly, Cloudflare did not write this [Magento extension](https://marketplace.magento.com/), but some of our customers have found it helpful.

As this plugin was created by an outside party, we can't provide technical support for issues related to the plugin.

To enable correct IP matching when running an Invision Power Board 3 installation through Cloudflare, follow these directions:

Log into your IPB installation's ACP.

1.  Click **System**.
2.  Under Overview, click **Security**.
3.  Under Security Center, click **Security Settings**.Check that _Trust IP addresses provided by proxies?_ is green.

##### IPB4 description of _Trust IP addresses provided by proxies?_

If your network environment means requests are handled through a proxy (such as in an intranet situation in an office or university, or on a load-balanced server cluster), you may need to enable this setting so that the correct IP address is used. However, when enabled, a malicious user can abuse the system to provide a fake IP address. In most environments, this setting should be left off.

If you are using an Apache server, then we would recommend installing [mod\_remoteip](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV) to restore the visitor IP back to your logs.

If you do not have access to your server to install a mod, then you may be able to [modify the core](https://www.phpbb.com/community/viewtopic.php?p=13936406#p13936406).

More recent versions of MyBB include a Scrutinize User's IP address option.

`Admin CP > Configuration > Server and Optimization Options > Scrutinize User's IP address? > Yes`

Alternatively, you may install the [Cloudflare management plugin](https://mods.mybb.com/view/antoligy-mybb-cloudflare-management-plugin) available for MyBB 1.6.

##### MyBB 1.6.0, 1.6.1, 1.6.2, or 1.6.3

1.  Navigate to `./inc/functions.php`.
2.  Go to line 2790.
3.  Replace:`if(isset($_SERVER['REMOTE_ADDR']))`With:`if(isset($_SERVER['HTTP_CF_CONNECTING_IP']))`
4.  Then, replace:`$ip = $_SERVER['REMOTE_ADDR'];`With:`$ip = $_SERVER['HTTP_CF_CONNECTING_IP'];`

A member of the Vanilla team has written a [Cloudflare plugin for Vanilla](https://open.vanillaforums.com/addon/cloudflaresupport-plugin) to restore original visitor IP to the log files for self-hosted sites.

As this plugin was created by an outside party, we can't provide technical support for issues related to the plugin.MediaWiki

1.  Open `includes/GlobalFunctions.php`. At approximately line 370, change the following:`$forward = "\t(proxied via {$_SERVER['REMOTE_ADDR']}{$forward})";`to`$forward = "\t(proxied via {$_SERVER['HTTP_CF_CONNECTING_IP']}{$forward})";`
2.  Open `includes/ProxyTools.php`. At approximately line 79, find:`if ( isset( $_SERVER['REMOTE_ADDR'] ) ){`and replace with:`if ( isset( $_SERVER['HTTP_CF_CONNECTING_IP'] ) ){`The second step only applies to MediaWiki versions 1.18.0 and older. Newer versions of MediaWiki have completely rewritten ProxyTools.php and the following code is no longer present.
3.  Find at approximately line 80:`$ipchain = array( IP::canonicalize($_SERVER['REMOTE_ADDR']) );`Save and upload to your origin web server.

##### For versions around 1.27.1:

1.  Go to line 1232 in `GlobalFunctions.php`, change `REMOTE_ADDR` to `HTTP_CF_CONNECTING_IP`.
2.  Next, go to `WebRequest.php`, in lines 1151 to line 1159, change `REMOTE_ADDR` to `HTTP_CF_CONNECTING_IP`.

A XenForo user has created a [plugin for Cloudflare](https://xenforo.com/community/resources/solidmean-cloudflare-detect.1595/).

As this plugin was created by an outside party, we can't provide technical support for issues related to the plugin.

1.  Open `library/config.php`.
2.  At the end, add:`if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) { $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CF_CONNECTING_IP'];}`
3.  Upload and overwrite.

An outside party has created a [module for Cloudflare and PunBB](http://punbb.informer.com/forums/post/147539/#p147539) that will restore original visitor IP.

As this plugin was created by an outside party, we can't provide technical support for issues related to the plugin.Cherokee server

1.  Launch `cherokee-admin` on your server.
2.  Navigate to the **Cherokee Administration interface** in your web browser.
3.  Select the **Virtual Server** for the domain that is being serviced by Cloudflare.
4.  On the _Logging_ tab for your selected **Virtual Server**, enable Accept Forwarded IPs.
5.  In the _Accept from Hosts_ box, enter [Cloudflare's IP addresses](https://www.cloudflare.com/ips/).

You can fix the IP address by changing the `PHP IP Server Param` field on the Livezilla server configuration to `HTTP_CF_CONNECTING_IP`.

To restore visitor IP to DataLife Engine:

1.  Open:/engine/inc/include/functions.inc.phpFind:`$db_ip_split = explode( ".", $_SERVER['REMOTE_ADDR'] );`Change to:`$db_ip_split = explode(".", $_SERVER['HTTP_CF_CONNECTING_IP'] );`
2.  Find:`$ip_split = explode( ".", $_SERVER['REMOTE_ADDR'] );`Change to:`$ip_split = explode(".", $_SERVER['HTTP_CF_CONNECTING_IP'] );`
3.  Open:/engine/modules/addcomments.phpFind:`$_SERVER['REMOTE_ADDR'],`Change to:`$_SERVER['HTTP_CF_CONNECTING_IP'],`
4.  Find:`$db_ip_split = explode( ".", $_SERVER['REMOTE_ADDR'] );`Change to:`$db_ip_split = explode( ".", $_SERVER['HTTP_CF_CONNECTING_IP'] );`

An outside developer has created a [Cloudflare extension for TYPO3](https://extensions.typo3.org/extension/cloudflare/) that will restore original visitor IP to your logs. The extension will also give the ability to clear your Cloudflare cache.

As this plugin was created by an outside party, we can't provide technical support for issues related to the plugin.

If you use the hosting control panel VestaCP, you have both Nginx and Apache running on your server. Requests are proxied through Nginx before going to Apache.

Because of this Nginx proxy, you actually need to the instructions to configure Nginx to return the real visitor IP address. [Mod\_remoteip](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV) for Apache is not needed unless you disable the Nginx server for some requests. Adding [mod\_remoteip](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV) to Apache will not conflict with the Nginx server configuration.

An outside developer has created a module to restore visitor IP called [node\_cloudflare.](https://github.com/keverw/node_CloudFlare)

___

## Restoring original visitor IP with HAProxy

In order to extract the original client IP in the X\_FORWARDD\_FOR header, you need to use the following configuration in HAProxy:

1.  Create a text file CF`_ips.lst` containing all IP ranges from https://www.cloudflare.com/en-gb/ips/
2.  Ensure to disable `option forwardfor` in HAProxy

HAProxy config:

```
acl from_cf src -f /path/to/CF_ips.lst
acl cf_ip_hdr req.hdr(CF-Connecting-IP) -m found
http-request set-header X-Forwarded-For %[req.hdr(CF-Connecting-IP)] if from_cf cf_ip_hdr
```

___

## Related Resources

-   [HTTP request headers](/fundamentals/get-started/reference/http-request-headers/)
-   [Transform Rules](/rules/transform/)
