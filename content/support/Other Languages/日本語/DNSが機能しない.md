---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/217912538-DNS%E3%81%8C%E6%A9%9F%E8%83%BD%E3%81%97%E3%81%AA%E3%81%84
title: DNSが機能しない
---

# DNSが機能しない

## DNSが機能しない

_この記事では、ドメインのDNSが機能しない理由とトラブルシューティングの手順について説明します。_

___

## 症状

SafariやChromeなどのWebブラウザーでは、よく発生するDNSエラーがいくつかあります：

-   _このサイトにアクセスできません_
-   _このWebページを使用できません_
-   _err\_name\_not\_resolved_
-   _サーバーが見つかりません_
-   [_エラー1001 DNS解決エラー_](https://support.cloudflare.com/hc/articles/360029779472#error1001)

___

## 一般的な原因と解決策

DNS解決エラーの最も一般的な原因と推奨される解決策を以下に示します。

### ドメインまたはサブドメインに入力ミスがある

ドメインまたはサブドメインがリクエストURL内で正しく入力されていることを確認します。

### DNSレコードが見つからない

Cloudflareダッシュボードの **DNS** アプリに必要なDNSレコードがあることを確認します。これには、次のようなレコードが含まれます：

-   ルートドメイン（_example.com_など）
-   既存のサブドメイン（ _www.example.com、blog.example.com_など）など）

AおよびCNAMEの [DNSレコード](/dns/manage-dns-records/how-to/create-dns-records)の設定についてご確認ください。

### ドメインをCloudflareに追加する前にDNSSECを無効にしなかった

ドメインをCloudflareに追加する前に、ドメインプロバイダーにて [DNSSECを無効](https://support.cloudflare.com/hc/articles/205359838#h_94453043811540417238269)にしないと、DNS解決が失敗します。

### ネームサーバーがCloudflareを指さなくなった

Cloudflareのダッシュボードで **DNS** アプリを介してDNSレコードを管理し、ドメインがCloudflareのネームサーバーを指さなくなった場合、DNS解決は中断されます。 ドメインレジストラーがドメインのネームサーバーをデフォルトのネームサーバーを指すように切り替えた場合に、この問題が発生する可能性があります。 これが問題かどうかを確認するには、 [ドメインがCloudflareのネームサーバーを使用しているかどうかを確認](https://support.cloudflare.com/hc/articles/4426809598605)します。

### 未解決のIPアドレス

まれに、URLを要求しているクライアントのDNSリゾルバーが、有効なIPアドレスへのDNSレコードの解決に失敗することがあります。 問題が解消するかどうかを確認するために、少し待ってからページを再読み込みします。 Cloudflareはこの問題とは関係ありませんが、 [CloudflareのDNS リゾルバ―](/1.1.1.1/setup/) の使用が役立つかもしれません。 現在のDNSリゾルバーについて追加の支援が必要な場合は、ホスティングプロバイダーに連絡してください。
