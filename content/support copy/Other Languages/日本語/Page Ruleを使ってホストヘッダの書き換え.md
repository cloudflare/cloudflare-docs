---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/206652947-Page-Rule%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%83%9B%E3%82%B9%E3%83%88%E3%83%98%E3%83%83%E3%83%80%E3%81%AE%E6%9B%B8%E3%81%8D%E6%8F%9B%E3%81%88
title: Page Ruleを使ってホストヘッダの書き換え
---

# Page Ruleを使ってホストヘッダの書き換え

## Page Ruleを使ってホストヘッダの書き換え

お客様は、Cloudflareの**Page Rule**アプリを使ってホストヘッダーを書き換えることができます。この機能は現在、Enterpriseプランのドメインでご利用いただけます。

この機能の一般的に使われるのは、コンテントがAmazon S3 バケットでホストされている場合です。Amazonには、コンテンツをホストしているバケットと同じ名前があるホストヘッダーを受け入れるだけのように設計されています。このように、「Host: your-domain.com」へのリクエストは「Host: your-bucket.s3.amazonaws.com」へと書き換えられる必要があります。そうしないと、リクエストは拒否されます。

ヘッダーが書き直されていることを確認するために、Page Ruleに移動し、一致するURIを特定します。次に、「**設定を追加する**」をクリックし、「**ホストヘッダーをオーバーライドする**」を選択し、オーバーライド値を入力します。

ここで、指定されたURLと一致するリクエストは全て、**ホストヘッダーオーバーライド**テキストボックスに入ったものにオーバーライドしたホストヘッダーがあります。以下の例を参照してください。

![Page Ruleホストヘッダーのオーバーライド](/images/support/cf-page-rules-host-header-override.png)
