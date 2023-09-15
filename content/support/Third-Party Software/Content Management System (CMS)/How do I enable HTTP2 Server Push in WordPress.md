---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115002816808-How-do-I-enable-HTTP-2-Server-Push-in-WordPress
title: How do I enable HTTP2 Server Push in WordPress
---

# How do I enable HTTP/2 Server Push in WordPress



HTTP/2 Server Push allows a website to push content to a browser, without having to wait for the HTML of one page to render first. In conjunction with the concurrency support built into HTTP/2, Server Push is able to dramatically reduce the amount of requests needed to load your website.

![Old URL: https://support.cloudflare.com/hc/en-us/article_attachments/115005733367/http2-server-push-2.png
Article IDs: 115002816808 | How do I enable HTTP/2 Server Push in WordPress
](/images/support/hc-import-http2_server_push_2.png)

Cloudflare supports HTTP/2 Server Push and it can be enabled for stylesheets and scripts using Cloudflare’s WordPress plugin. In order to utilise this feature, you must first ensure you have the Cloudflare WordPress plugin [installed and set-up on your site](https://support.cloudflare.com/hc/en-us/articles/227634427-Using-Cloudflare-with-WordPress).

Once the plugin is installed, you can enable HTTP/2 Server Push simply by adding the following configuration code to your _wp-config.php_ file:

_define('CLOUDFLARE\_HTTP2\_SERVER\_PUSH\_ACTIVE', true);_

You should insert this line above where it says _"/\* That's all, stop editing! Happy blogging. \*/_", like follows:|

![Old URL: https://support.cloudflare.com/hc/en-us/article_attachments/115005733547/Screen_Shot_2017-02-09_at_16.09.31.png
Article IDs: 115002816808 | How do I enable HTTP/2 Server Push in WordPress
](/images/support/hc-import-screen_shot_2017_02_09_at_16_09_31.png)

You should then start to see requests coming in which are initiated through Server Push, for example, in the Network tab of Chrome Development Tools you should see some asserts have "Push" as the initiator:

![Old URL: https://support.cloudflare.com/hc/en-us/article_attachments/115005787688/Screen-Shot-2016-04-26-at-15-08-59.png
Article IDs: 115002816808 | How do I enable HTTP/2 Server Push in WordPress
](/images/support/hc-import-screen_shot_2016_04_26_at_15_08_59.png)
