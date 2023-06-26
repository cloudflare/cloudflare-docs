---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/200170076--I-m-Under-Attack-%E6%A8%A1%E5%BC%8F-%E7%9A%84%E4%BD%9C%E7%94%A8%E6%98%AF%E4%BB%80%E4%B9%88-
title: “I’m Under Attack 模式”的作用是什么？
---

# “I’m Under Attack 模式”的作用是什么？

![im_under_attack_page.png.scaled500.png](/images/support/im_under_attack_page.png) 

[“I'm Under Attack”](http://blog.cloudflare.com/introducing-im-under-attack-mode)将为受到攻击且需要 [DDoS 保护和缓解](https://www.cloudflare.com/ddos)的站点添加额外保护。如果您遭到攻击并且在攻击期间已启用此功能，则访问者将在我们分析流量时收到插页式页面大约五秒钟，以确保其是合法的访问者。

**注意：** 该网站的访问者必须启用 JavaScript 和 Cookie 才能通过插页式页面。

启用 I'm Under Attack 模式的方法请参阅[如何启用 I'm Under Attack 模式](https://support.cloudflare.com/hc/en-us/articles/200170206-How-do-I-enable-I-m-Under-Attack-mode-)。

**为什么我在进入 Cloudflare 上的站点之前收到“在访问前检查浏览器”消息？**

当站点所有者打开此“I'm Under Attack 模式”设置时，会出现“在访问 example.com 之前检查浏览器”页面。该页面通常会在 5 秒后消失，并授予您访问该站点的权限。

**注意**：您需要在浏览器中启用 JavaScript 和 Cookie 才能通过检查。检查是为了确保您不是机器人网络的一部分。
