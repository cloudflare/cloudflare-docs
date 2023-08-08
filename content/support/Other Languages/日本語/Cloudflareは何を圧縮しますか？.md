---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/200168396-Cloudflare%E3%81%AF%E4%BD%95%E3%82%92%E5%9C%A7%E7%B8%AE%E3%81%97%E3%81%BE%E3%81%99%E3%81%8B-
title: Cloudflareは何を圧縮しますか？
---

# Cloudflareは何を圧縮しますか？

## Cloudflareは何を圧縮しますか？

Cloudflareの[CDN](https://www.cloudflare.com/features-cdn)[キャッシング静的コンテンツ](https://support.cloudflare.com/hc/en-us/articles/200172516-What-file-extensions-does-CloudFlare-cache-for-static-content-)とサイトをスピードアップさせるためのCCS、JS、HTMLの[自動縮小化](https://support.cloudflare.com/hc/en-us/articles/200168196-How-do-I-minify-HTML-CSS-and-JavaScript-to-optimize-my-site-)に加えて、Cloudflareはgzipとbrotli圧縮をして、サイト所有者をサポートします。

Cloudflareは、gzipまたはbrotliのエンコードされたレスポンスを以下のコンテンツタイプで互換性のあるクライアント/ブラウザに返します：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">text/htmltext/richtexttext/plaintext/csstext/x-scripttext/x-componenttext/x-java-sourcetext/x-markdownapplication/javascriptapplication/x-javascripttext/javascripttext/jsimage/x-iconapplication/x-perlapplication/x-httpd-cgitext/xmlapplication/xmlapplication/xml+rssapplication/jsonmultipart/bagmultipart/mixedapplication/xhtml+xmlfont/ttffont/otffont/x-woffimage/svg+xmlapplication/vnd.ms-fontobjectapplication/ttfapplication/x-ttfapplication/otfapplication/x-otfapplication/truetypeapplication/opentypeapplication/x-opentypeapplication/font-woffapplication/eotapplication/fontapplication/font-sfntapplication/wasm</span></div></span></span></span></code></pre>{{</raw>}}

オリジンからの特定レスポンスを暗号化する必要がない場合、オリジンWebサーバーで、`キャッシュ-管理:変換なし`に設定して、これを無効にできます。

___

## Brotli 圧縮を有効化

1.  Cloudflare アカウントにログインします。
2.  適切なドメインを選択します。
3.  **スピード**アプリをクリックします。
4.  「**最適化**」タブをクリックします。
5.  **Brotli**スイッチを_On_に切り替えます。

![brotli_on.png](/images/support/brotli_on.png)
