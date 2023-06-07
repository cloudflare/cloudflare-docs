---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/200170166-%E3%83%99%E3%82%B9%E3%83%88%E3%83%97%E3%83%A9%E3%82%AF%E3%83%86%E3%82%A3%E3%82%B9-DDoS%E5%AF%BE%E7%AD%96
title: ベストプラクティス：DDoS対策
---

# ベストプラクティス：DDoS対策

## ベストプラクティス：DDoS対策

_Cloudflare対応サイトをDDoS攻撃から保護するためのベストプラクティスを説明します。_

___

## 概要

Cloudflareにサインアップしたら、以下の推奨事項に従って、潜在的なDDoS攻撃に対する準備が万全であることを確認してください。

### DNSレコードをCloudflareにプロキシする

攻撃者は、Cloudflareに保護されていないWebサーバー（オリジンサーバー）を直接攻撃するために、オリジンIPアドレスを特定しようとします。 トラフィックをCloudflareにプロキシすることにより、オリジンIPアドレスを隠して直接攻撃を阻止します。

次の手順に従って、保護性能を最大化できるようにDNSレコードを設定します：

1.  [Cloudflareプロキシを有効にします（オレンジ色の雲マーク）。](https://support.cloudflare.com/hc/articles/200169626)
2.  FTPまたはSSH に使用されるDNSレコードを削除し、代わりにオリジンIPを使用してFTPリクエストまたはSSHリクエストを直接実行します。 あるいは、[Cloudflare Spectrum](/spectrum/getting-started/)を介してFTPとSSHをプロキシします。
3.  [メールサーバーに対応するAレコード、AAAAレコード、またはCNAMEレコードをグレー色の雲マークにする](https://support.cloudflare.com/hc/articles/200168876)
4.  ワイルドカードレコードはオリジンIPアドレスを暴露するため、無料プラン、Proプラン、またはBusinessプランのドメイン内のワイルドカードレコードを削除します。[Cloudflareは、Enterpriseプランのドメインのワイルドカードレコードのみを保護します](https://support.cloudflare.com/hc/articles/360017421192#CloudflareDNSFAQ-DoesCloudflaresupportwildcardDNSentries)。

### Cloudflare IPからのリクエストを制限しない

Cloudflareへのトラフィックをプロキシすると、Webサーバー（オリジンサーバー）との接続は、[CloudflareのIPアドレス](http://www.cloudflare.com/ips)を介したものになります。 したがって、Webサーバー（オリジンサーバー）が、[Cloudflare IPをホワイトリストに追加して](https://support.cloudflare.com/hc/articles/201897700)、をホワイトリストに追加し、Cloudflareや信頼できるパートナー、ベンダー、アプリケーションIPアドレスからでないトラフィックを明示的にブロックすることが重要です。

### オリジンサーバーログでオリジナルの訪問者IPを復元する

攻撃の背後にある実際のIPを確認するには、オリジンサーバーログで[オリジナルの訪問者のIP](https://support.cloudflare.com/hc/sections/200805497)復元します。 さもなければ、すべてのトラフィックがCloudflareのIPをログに記録します。 Cloudflareは、リクエストにオリジナルの訪問者のIPアドレスを[HTTPヘッダーとして](https://support.cloudflare.com/hc/articles/200170986)常に含めます。 リバースプロキシを使用していることと、現在の接続については、すべてのトラフィックがCloudflareのIPから送信されていることをホスティングプロバイダーに通知します。

### サイトをCloudflareに移動した後にサーバーのIPアドレスを変更する

Cloudflareは、CloudflareにプロキシするトラフィックのオリジンサーバーのIPアドレスを隠します。 セキュリティを強化するために、ホスティングプロバイダーに連絡して、新しいオリジンサーバーのIPアドレスの取得をリクエストすることをお勧めします。

### Rate Limitingを使用してブルートフォース攻撃やレイヤー7 DDoS攻撃を防止する

通常のHTTPリクエストを装った攻撃を阻止するために、Rate Limitingは、Webサイトアドミニストレーターが、Webサーバーが受信することが予想されるロードに対してきめ細かいThresholdsを指定できるようにします。1回クリックするだけで、基本のRate LimitingをSetupして、 [ブルートフォース攻撃からログインページを保護することができます](https://support.cloudflare.com/hc/articles/115001635128#3UWQC5PrVScHgEGRMobRMm)。

Cloudflareの無料プラン、Proプラン、Businessプランには10,000件/月の無料リクエストが含まれています。 詳細については、[Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128)に関するガイドを参照してください。

___

## 関連リソース

-   [CloudflareのDDoS保護について理解する](https://support.cloudflare.com/hc/articles/200172676)
-   [DDoS攻撃に対応する](/ddos-protection/best-practices/respond-to-ddos-attacks/)
-   [DDoS攻撃とは？](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)
