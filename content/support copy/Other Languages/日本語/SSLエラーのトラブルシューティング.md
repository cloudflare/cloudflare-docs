---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/200170566-SSL%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0
title: SSLエラーのトラブルシューティング
---

# SSLエラーのトラブルシューティング

## SSLエラーのトラブルシューティング

_Cloudflareを通してプロキシされたドメインを閲覧する時に表示される一般的なSSLエラーをトラブルシューティングします。_

___

## 概要

Cloudflareが、ドメインのSSL証明書を提供するまで、HTTPSトラフィックの様々なブラウザで、以下のエラーが表示されます：

**Firefox**

     _ssl\_error\_bad\_cert\_domain_   _この接続は信頼されていません_

**Chrome**

     _接続がプライベートではありません_

**Safari**

     _SafariはWebサイトのIDを確認できません_

**Edge / Internet Explorer**

     _このWebサイトのセキュリティ証明書に問題があります_

ドメインでプロビジョニングされているCloudflare SSL証明書でも、古いブラウザが信頼されていないSSL証明書に関してエラーを表示します。それは、Cloudflare Universal SSL証明書で使われている[Server Name Indication (SNI) プロトコルをサポート](https://en.wikipedia.org/wiki/Server_Name_Indication#Support)していないためです。[Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730)が、Universal 証明書、専用証明書、カスタム証明書、またはカスタムホスト名証明書に関するProプラン、Businessプラン、またはEnterpriseプランのドメインに対する非SNIのサポートを有効にできます。

それ以外に、新しいブラウザを使用する時にSSLエラーが起きる場合、こうしたSSLエラーの一般的な原因を確認してください：

-   [リダイレクトループエラーまたは、HTTP 525エラー、526エラー](https://support.cloudflare.com/hc/ja/articles/200170566-SSL%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#h_7ec9ed4a-80ae-4fca-8be7-89a13c195d19)
-   [SSLエラーを返すのが一部のサブドメインだけ](https://support.cloudflare.com/hc/ja/articles/200170566-SSL%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#h_55e4d315-c60d-4798-9c4c-c75d9baed1b7)
-   [Cloudflare Universal SSL証明書がアクティブではない](https://support.cloudflare.com/hc/ja/articles/200170566-SSL%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#h_122b94f3-ff14-4544-b5fa-8875e08ff5f0)
-   [OCSPレスポンスエラー](https://support.cloudflare.com/hc/ja/articles/200170566-SSL%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#h_51354cf8-de93-4894-85e6-f0f7453d766d)
-   [SSLの期限切れまたはSSLの不一致エラー](https://support.cloudflare.com/hc/ja/articles/200170566-SSL%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#h_c1a6e78e-150d-4db6-89ab-eec7cb1ab03f)

___

### リダイレクトループエラーまたは、HTTP 525エラー、526エラー

**兆候**

訪問者がドメインを閲覧する際に[リダイレクトループエラー](https://support.cloudflare.com/hc/articles/115000219871)、またはHTTP [525](https://support.cloudflare.com/hc/articles/115003011431#525error)か[526](https://support.cloudflare.com/hc/articles/115003011431#526error)が認められる。Cloudflare**SSL/TLS**アプリで現行のCloudflareSSL/TSL暗号化モードがオリジンWebサーバーの設定と互換性がない時に、こうしたエラーが発生します。

**解決方法**

リダイレクトループについて、[リダイレクトループエラーのトラブルシューティングに関するガイドを参照してください](https://support.cloudflare.com/hc/articles/115000219871)。

HTTP [525](https://support.cloudflare.com/hc/articles/115003011431#525error)または[526](https://support.cloudflare.com/hc/articles/115003011431#526error)エラーを解決するには、以下の推奨されるSSL設定を参照してください。例えば、オリジンWebサーバーが

-   認証局発行の有効な証明書、またはCloudflareからの[Origin CA証明書](https://support.cloudflare.com/hc/articles/115000479507)のどちらかがあり、_[Full](https://support.cloudflare.com/hc/articles/200170416#h_845b3d60-9a03-4db0-8de6-20edc5b11057)_または_[Full (strict)](https://support.cloudflare.com/hc/articles/200170416#h_8afd8a8d-382d-4694-a2b2-44cbc9f637ef)_ **SSL**オプションのどちらかを利用している場合。

-   自己署名したSSL証明書があり、[_Full_**SSL**オプション](https://support.cloudflare.com/hc/articles/200170416#h_845b3d60-9a03-4db0-8de6-20edc5b11057)を使用している場合。

-   インストールしたSSL証明書が不足しており、[_Flexible_ **SSL**オプション](https://support.cloudflare.com/hc/articles/200170416#h_4e0d1a7c-eb71-4204-9e22-9d3ef9ef7fef)を利用している場合。

___

### 一部のサブドメインしかSSLエラーを返さない

**兆候**[Cloudflare Universal SSL](https://support.cloudflare.com/hc/articles/204151138)と通常の[専用SSL証明書](https://support.cloudflare.com/hc/articles/228009108)だけがルートレベルドメイン (_example.com_) とサブドメインの第１レベル(_\*.example.com_)をカバーしています。ドメインの訪問者が（_dev.www.example.com_のような）ブラウザで(_www.example.com_のような）ドメインの第1レベルではなく、サブドメインの第２レベルにアクセスする際に、エラーが認められた場合、次の方法のうち、いずれかを使い、問題解決をしてください。

**解決方法**

-   ドメインが少なくともBusinessプランであることを確認してから、_dev.www.example.com_をカバーする[カスタムSSL証明書](https://support.cloudflare.com/hc/articles/200170466)をアップロードする。または、
-   _dev.www.example.com_をカバーするカスタムホスト名が記載された[専用SSL証明書](https://support.cloudflare.com/hc/articles/228009108)を購入する。または、
-   第二レベルサブドメインへの有効証明書がオリジンWebサーバーがある場合、 _example.com_のCloudflare **DNS**アプリで_dev.www_ホスト名の隣にあるオレンジ色のクラウドをクリックする。

___

### Cloudflare Universal SSL証明書がアクティブではない

**兆候**

アクティブなCloudflareドメイン全てが、[Universal SSL証明書](https://support.cloudflare.com/hc/articles/204151138)を提供しています。ドメイン用のCloudflare **SSL/TLS**アプリの「**Edge 証明書**」タブ内で、SSL エラーが認められ、**Type** _Universal_の証明書がない場合、Universal SSL 証明書にはまだプロビジョニングされていません。

Cloudflareがドメイン名に対する証明書を発行できるようになる前に、当社のSSLベンダーが各SSL 証明書リクエストを検証します。このプロセスには、15分から24時間までかかることがあります。当社のSSL証明書ベンダーは、追加のレビューのためにドメイン名にフラグを立てることがあります。

**解決方法**

ドメインが[CNAMEセットアップ](https://support.cloudflare.com/hc/articles/360020348832)にある場合：

現在ご利用のホスティングプロバイダーでCAA DNSレコードが有効になっているかどうか確認してください。有効になっている場合は、ドメインで証明書がプロビジョニングされるように[Cloudflareが利用する認証局を指定](https://support.cloudflare.com/hc/articles/115000310832#h_645975761191543365946939)していることを確認してください。

Cloudflare**SSL/TLS**アプリの**Edge 証明書**タブにある**Universal SSLを無効にする**セクション下のドメインで[Universal SSL](https://support.cloudflare.com/hc/articles/204151138)が無効になっている場合：

-   Universal SSLを有効にするか、
-   [専用SSL](https://support.cloudflare.com/hc/articles/228009108)証明書を購入する、または
-   Cloudflareに[カスタムSSL証明書](https://support.cloudflare.com/hc/articles/200170466)を更新してください。

Cloudflare SSL 証明書が、Cloudflareドメインのアクティブ化の24時間以内に発行されない場合：

-   オリジンWebサーバーに、有効なSSL shoumeishoCloudflareがあり、[Cloudflareを一時的に停止](https://support.cloudflare.com/hc/articles/203118044#h_8654c523-e31e-4f40-a3c7-0674336a2753)し、
-   [サポートチケットを開けて](https://support.cloudflare.com/hc/en-us/requests/new)、次の情報を提供してください：  
    -   影響を受けたドメイン名、
    -   認められるエラーのスクリーンショット。

Cloudflareを一時利用停止にすると、サポートチームが問題を調査する間、HTTPトラフィックがオリジンWebサーバーから適切に提供されます。

___

### OCSPレスポンスエラー

**兆候**サイト訪問者に対して、OCSPレスポンスエラーが表示された。

**解決方法  
**  
このエラーの原因は、ブラウザのバージョン、またはCloudflareのSSLベンダーのうち一つの注意を必要とする問題のどちらかです。正しく診断するために、ブラウザエラーを見つけた訪問者が提供する次の情報がついたサポートチケットを開けてください：

1.  _[https://aboutmybrowser.com/](https://aboutmybrowser.com/)_からの出力
2.  訪問者ブラウザから _https://example.com/cdn-cgi/trace_ の出の出力。_example.com_ をWebサイトのドメイン名と置き換えてください。

___

### SSLの期限切れまたはSSLの不一致エラー

**兆候  
**  
訪問者のブラウザで、SSLの有効期限またはSSLの不一致に関するエラーメッセージが出る。

**解決方法**

[カスタムSSL](https://support.cloudflare.com/hc/articles/200170466)証明書を使用する場合、まず有効期限が切れていないことを確認するか、代替のSSL証明書をアップロードします。

Cloudflareサポートに連絡して、以下の情報を提供してください：

-   影響を受けたドメイン名、
-   認められるエラーのスクリーンショット。

___

## 関連リソース

-   [リダイレクトループエラー](https://support.cloudflare.com/hc/articles/115000219871)
-   [混在コンテンツエラー](https://support.cloudflare.com/hc/articles/200170476)
