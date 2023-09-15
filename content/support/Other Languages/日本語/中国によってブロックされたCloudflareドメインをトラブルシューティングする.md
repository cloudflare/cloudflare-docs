---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/200169566-%E4%B8%AD%E5%9B%BD%E3%81%AB%E3%82%88%E3%81%A3%E3%81%A6%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%E3%81%95%E3%82%8C%E3%81%9FCloudflare%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%92%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%81%99%E3%82%8B
title: 中国によってブロックされたCloudflareドメインをトラブルシューティングする
---

# 中国によってブロックされたCloudflareドメインをトラブルシューティングする

### このセクションの記事

-   [トラブルシューティングサイトへの情報収集](https://support.cloudflare.com/hc/ja/articles/203118044-%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%82%B5%E3%82%A4%E3%83%88%E3%81%B8%E3%81%AE%E6%83%85%E5%A0%B1%E5%8F%8E%E9%9B%86 "トラブルシューティングサイトへの情報収集")
-   [Cloudflareサポートへのお問い合わせ](https://support.cloudflare.com/hc/ja/articles/200172476-Cloudflare%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%81%B8%E3%81%AE%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B "Cloudflareサポートへのお問い合わせ")
-   [Webトラフィックでのサージまたはスパイクをトラブルシューティングする](https://support.cloudflare.com/hc/ja/articles/200172906-Web%E3%83%88%E3%83%A9%E3%83%95%E3%82%A3%E3%83%83%E3%82%AF%E3%81%A7%E3%81%AE%E3%82%B5%E3%83%BC%E3%82%B8%E3%81%BE%E3%81%9F%E3%81%AF%E3%82%B9%E3%83%91%E3%82%A4%E3%82%AF%E3%82%92%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%81%99%E3%82%8B "Webトラフィックでのサージまたはスパイクをトラブルシューティングする")
-   [クロールエラーのトラブルシューティング](https://support.cloudflare.com/hc/ja/articles/200169806-%E3%82%AF%E3%83%AD%E3%83%BC%E3%83%AB%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0 "クロールエラーのトラブルシューティング")
-   [画像が見つからない時のトラブルシューティング](https://support.cloudflare.com/hc/ja/articles/200169906-%E7%94%BB%E5%83%8F%E3%81%8C%E8%A6%8B%E3%81%A4%E3%81%8B%E3%82%89%E3%81%AA%E3%81%84%E6%99%82%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0 "画像が見つからない時のトラブルシューティング")
-   [Facebookに共有する問題のトラブルシューティング](https://support.cloudflare.com/hc/ja/articles/217720788-Facebook%E3%81%AB%E5%85%B1%E6%9C%89%E3%81%99%E3%82%8B%E5%95%8F%E9%A1%8C%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0 "Facebookに共有する問題のトラブルシューティング")
-   [中国によってブロックされたCloudflareドメインをトラブルシューティングする](https://support.cloudflare.com/hc/ja/articles/200169566-%E4%B8%AD%E5%9B%BD%E3%81%AB%E3%82%88%E3%81%A3%E3%81%A6%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%E3%81%95%E3%82%8C%E3%81%9FCloudflare%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%92%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%81%99%E3%82%8B "中国によってブロックされたCloudflareドメインをトラブルシューティングする")

![](/images/support/513a9e8b35eaed0a35fce9cc22f9972e37872a33.png)

1.  [Cloudflareヘルプセンター](https://support.cloudflare.com/hc/ja)
2.  [トラブルシューティング](https://support.cloudflare.com/hc/ja/categories/200276217-%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0)
3.  [一般的なトラブルシューティング](https://support.cloudflare.com/hc/ja/sections/200804937-%E4%B8%80%E8%88%AC%E7%9A%84%E3%81%AA%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0)

## 中国によってブロックされたCloudflareドメインをトラブルシューティングする

_Cloudflareサイトが、中国のグレートファイアウォールによってブロックされているかどうかを判断します。_

___

## 概要

ドメインと関連づけられているCloudflare IPが中国でブロックされているか確認したい場合、次の詳細を[Cloudflare サポート](https://support.cloudflare.com/hc/articles/200172476)に提示してください：

1\. 中国国内のロケーションから、[あなたのドメインへtraceroute](http://support.cloudflare.com/entries/22050846-how-do-i-run-a-traceroute)し、ネットワークパスを示しています。

2. [グレートファイアウォール チェッカー](http://www.greatfirewallofchina.org/)からの結果です。

3\. 中国国内に位置するドメインへのDNS解決応答。[DNSチェッカー](https://dnschecker.org/)のようなツールを使用することをご検討ください。

4\. サイトでホストされているコンテンツの種類。中国では、ポルノグラフィ、ギャンブル、特定の政治的議論を含む、ある一定のコンテンツが検閲を受けます。

Cloudflareサポートでは、ドメインが中国でブロックされているかどうかを確認するだけで、ブロックを解除することはできません。
