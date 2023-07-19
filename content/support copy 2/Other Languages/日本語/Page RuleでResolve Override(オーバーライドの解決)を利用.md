---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/206190798-Page-Rule%E3%81%A7Resolve-Override-%E3%82%AA%E3%83%BC%E3%83%90%E3%83%BC%E3%83%A9%E3%82%A4%E3%83%89%E3%81%AE%E8%A7%A3%E6%B1%BA-%E3%82%92%E5%88%A9%E7%94%A8
title: Page RuleでResolve Override(オーバーライドの解決)を利用
---

# Page RuleでResolve Override(オーバーライドの解決)を利用

## Page RuleでResolve Override(オーバーライドの解決)を利用

リクエストが解決されるURLまたはIPをオーバーライドする機能が、現在Page Ruleで利用できます。これはEnterpriseプランの機能のみです。

この機能が一般的に使われるのは、URI (例：mydomain.com/app)からアプリケーションを提供する場合です。 この場合、「アプリ」は他のサーバーにあることもサードパーティがホストしていることもあります。このエンドポイントへのリクエストは、サードパーティアプリケーションのサーバーに送信されなければなりません。CNAMホストを指定することができます。

**重要：CNAME レコードは、Cloudflare DNS内になければなりません**。

これらのレコードを完全に管理できるようにするには、同じゾーン名でResolve Override(オーバーライドの解決)を設定することをお勧めします。

1.  DNSレコードを作成します。

-   次のステップには、同じことを実行するために正しい方法がいくつかあって、セットアップは大幅に異なることがあります。この部分で、追加のサポートを必要とする場合は、セットアップと最終結果が何であるかについて、サポートに連絡をしてください。私の例では、s3バケットにホストをセットアップしていないので、s3汎用ホストヘッダーを解決し、全てのリクエストを私のサブフォルダーまたはアプリのサブフォルダーから全てのリクエストを要求し、s３バケットに移動します。

![pagerule.png](/images/support/pagerule.png)
