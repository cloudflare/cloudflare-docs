---
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/115001856951-%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8-Cloudflare-%E9%98%BB%E6%AD%A2%E6%81%B6%E6%84%8F%E7%94%A8%E6%88%B7%E4%BB%A3%E7%90%86-
title: 如何使用 Cloudflare 阻止恶意用户代理？
---

# 如何使用 Cloudflare 阻止恶意用户代理？

## 如何使用 Cloudflare 阻止恶意用户代理？

## 用户代理 (UA) 规则

用户代理规则[与访问您站点的浏览器或应用程序发送的用户代理标头](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent)相匹配。UA 规则适用于整个域。UA 规则不支持通配符 (\*)。

在 [URL lockdown rules之后应用 UA 规则。](https://support.cloudflare.com/hc/en-us/articles/115001595131) 如果您使用lockdown来允许某个 IP 地址，则将跳过相匹配 URL 的 UA 规则。

UA 规则可以应用以下操作：阻止、质询（即 CAPTCHA）、js\_challenge。


![Screenshot_from_2018-03-21_11-23-53.png](/support/static/Screenshot_from_2018-03-21_11-23-53.png)

以下是阻止“Bad Bot”网络爬虫的示例规则。

![Screenshot_from_2018-03-21_11-23-43.png](/support/static/Screenshot_from_2018-03-21_11-23-43.png)

您还可以使用我们的[客户端 API 创建规则。](https://api.cloudflare.com/#user-agent-blocking-rules-create-a-useragent-rule)


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"> $ curl -XPOST -H &quot;X-Auth-Email: $MYEMAIL&quot; -H &quot;X-Auth-Key: $MYAPIKEY&quot; -H &quot;Content-Type: application/json&quot; https://api.cloudflare.com/client/v4/zones/$MYZONETAG/firewall/ua_rules</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &quot;description&quot;:&quot;Block Bad Bot&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &quot;mode&quot;: &quot;block&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &quot;configuration&quot;:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  {</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &quot;target&quot;: &quot;ua&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &quot;value&quot;:&quot;BadBot/1.0.2 (+http://bad.bot)&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  }</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">}</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

 您可以创建的最大 UA 规则数取决于计划类型。 

| **计划** | **最大规则数** |
| --- | --- |
| Free | 10 |
| Pro | 50 |
| Business | 250 |
| Enterprise | 1000 |
