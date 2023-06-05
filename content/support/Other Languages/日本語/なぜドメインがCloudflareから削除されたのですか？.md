---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/221327488-%E3%81%AA%E3%81%9C%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%81%8CCloudflare%E3%81%8B%E3%82%89%E5%89%8A%E9%99%A4%E3%81%95%E3%82%8C%E3%81%9F%E3%81%AE%E3%81%A7%E3%81%99%E3%81%8B-
title: なぜドメインがCloudflareから削除されたのですか？
---

# なぜドメインがCloudflareから削除されたのですか？

## なぜドメインがCloudflareから削除されたのですか？

_この記事では、Cloudflareアカウントから削除されたドメインを調査して復元する手順について説明します。_

### 本記事の内容

-   [概要](https://support.cloudflare.com/hc/ja/articles/221327488-%E3%81%AA%E3%81%9C%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%81%8CCloudflare%E3%81%8B%E3%82%89%E5%89%8A%E9%99%A4%E3%81%95%E3%82%8C%E3%81%9F%E3%81%AE%E3%81%A7%E3%81%99%E3%81%8B-#h_71645430211540423470679)
-   [手順1 - Cloudflareアカウントの監査ログを調べる](https://support.cloudflare.com/hc/ja/articles/221327488-%E3%81%AA%E3%81%9C%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%81%8CCloudflare%E3%81%8B%E3%82%89%E5%89%8A%E9%99%A4%E3%81%95%E3%82%8C%E3%81%9F%E3%81%AE%E3%81%A7%E3%81%99%E3%81%8B-#h_75178970471540423485029)
-   [手順2 - ドメイン登録にCloudflareネームサーバーがあるかを確かめる](https://support.cloudflare.com/hc/ja/articles/221327488-%E3%81%AA%E3%81%9C%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%81%8CCloudflare%E3%81%8B%E3%82%89%E5%89%8A%E9%99%A4%E3%81%95%E3%82%8C%E3%81%9F%E3%81%AE%E3%81%A7%E3%81%99%E3%81%8B-#h_84363930121540423493275)
-   [手順3 - ドメイン解決にCloudflareネームサーバーが使用されるかを確かめる](https://support.cloudflare.com/hc/ja/articles/221327488-%E3%81%AA%E3%81%9C%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%81%8CCloudflare%E3%81%8B%E3%82%89%E5%89%8A%E9%99%A4%E3%81%95%E3%82%8C%E3%81%9F%E3%81%AE%E3%81%A7%E3%81%99%E3%81%8B-#h_670950877161540423505236)
-   [削除されたドメインを復元する](https://support.cloudflare.com/hc/ja/articles/221327488-%E3%81%AA%E3%81%9C%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%81%8CCloudflare%E3%81%8B%E3%82%89%E5%89%8A%E9%99%A4%E3%81%95%E3%82%8C%E3%81%9F%E3%81%AE%E3%81%A7%E3%81%99%E3%81%8B-#h_88537939911540919764865)
-   [関連リソース](https://support.cloudflare.com/hc/ja/articles/221327488-%E3%81%AA%E3%81%9C%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%81%8CCloudflare%E3%81%8B%E3%82%89%E5%89%8A%E9%99%A4%E3%81%95%E3%82%8C%E3%81%9F%E3%81%AE%E3%81%A7%E3%81%99%E3%81%8B-#h_186867048201540423513703)

___

## 概要

ドメインの削除は、次のような理由で起きることが多いです：

-   ドメインへのアクセス権を持つユーザーがドメインを削除した。
-   ネームサーバーがCloudflareを指さなくなった。Cloudflareがドメイン登録を継続的に監視する。
-   ドメインが認証されなかった（60日間保留状態）。

___

Cloudflareの **監査ログ** にドメイン 削除 に関する情報が含まれる。 **監査ログ機能** の追加情報については、 [「監査ログを使用する」](https://support.cloudflare.com/hc/en-us/articles/115002833612-How-do-I-use-Audit-Logs-) を参照してください。

1.  Cloudflareダッシュボードにログインします。
2.  削除されたドメインがあるCloudflareアカウントをクリックします。
3.  最上部から2番目のナビゲーションバーにある 「監査ログ（Audit Log）」 をクリックします。
4.   **ドメイン** については、削除されたドメイン名を入力します。
5.   _削除_  **アクション** をクリックし、 **リソース** が _アカウント_を示すことを確認します。
6.  ドメインを削除した **日付** 、**ユーザーIPアドレス**および **ユーザー** を確認します。
7.   **ユーザーIPアドレス** が _127.0.0.1_ である場合、またはデータが含まれていない場合、削除はCloudflareのシステムによって自動的に実行されました：手順2に進みます。 

___

## 手順2 - ドメイン登録にCloudflareネームサーバーがあるかを確かめる

1\. オペレーティングシステムまたは [whois.icann.org](https://whois.icann.org/en) または [www.whois.net](https://www.whois.net/)などのWebサイトが提供するコマンドラインベースの「WHOIS」アプリケーションを使用します。

-   ドメインのネームサーバーの詳細が見つからない場合は、ドメインレジストラーまたはドメインプロバイダーに連絡してドメイン登録情報を入手してください。
-   Cloudflareのネームサーバーが、ドメイン登録の詳細に記載されている2つのネームサーバーのみであることを確認します。
-   ドメイン登録内のネームサーバー名が正しいことを確認します。

2\. ネームサーバーが、Cloudflare  **DNS** アプリの **「Cloudflareネームサーバー（Cloudflare Nameservers）」** セクション内で提供されるネームサーバーと完全に一致していることを確認します。

3\. 情報が正しくない場合は、ドメインプロバイダーのポータルにログインして変更するか、またはドメインプロバイダーに連絡して支援を求めてください。

___

## 手順3 - ドメイン解決にCloudflareネームサーバーが使用されるかを確かめる

1\. コマンドラインまたはサードパーティツールを使用して、Cloudflareのネームサーバーが設定されているかどうかを確認します：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig NS something.anotherdomain.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +trace NS something.anotherdomain.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig NS something.anotherdomain.com @8.8.8.8</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

+traceオプションは、DNS応答が失敗したときに詳細情報を出力します。 この情報は、DNSプロバイダーの問題のトラブルシューティングを行う際に役立ちます。

@8.8.8.8オプションは、GoogleのパブリックDNSリゾルバーからの結果を返します。 その結果は、パブリックリゾルバーがDNS応答を受信するかどうかを確認します。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">nslookup -type=ns something.anotherdomain.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">nslookup -type=ns something.anotherdomain.com 8.8.8.8</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

-   Cloudflareの2つのネームサーバーのみが、クエリの結果として返されたネームサーバーであることを確認します。
-   ネームサーバーのスペル間違いがないことを確認します。
-   ネームサーバーが、Cloudflare **DNSアプリ**の**Cloudflareネームサーバー** セクション内で提供されるネームサーバーと完全に一致していることを確認します。

2\. 情報が正しくない場合は、ドメインプロバイダーのポータルにログインして変更するか、またはドメインプロバイダーに連絡して支援を求めてください。

3\. ネームサーバーとドメイン登録データが正しい場合は、ドメインプロバイダーに連絡して、DNS伝播に関する問題が最近発生したかどうかを確認します。

___

## 削除されたドメインを復元する

Recover a deleted domain via the **\+ Add site** link located on the right side of the top navigation bar in the Cloudflare dashboard. The domain must be added like a new domain.

___

## 関連リソース

-   [セカンダリネームサーバー](https://support.cloudflare.com/hc/en-us/articles/360001356152-How-do-I-setup-and-manage-Secondary-DNS-)（Enterpriseプランの機能）
-   [CNAMEセットアップ](/dns/zone-setups/partial-setup)（BusinessプランとEnterpriseプランの機能）
-   [ネームサーバーをCloudflareに変更する方法](/dns/zone-setups/full-setup/setup)
