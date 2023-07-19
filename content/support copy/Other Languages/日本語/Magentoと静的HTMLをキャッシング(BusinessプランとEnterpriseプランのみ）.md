---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/236168808-Magento%E3%81%A8%E9%9D%99%E7%9A%84HTML%E3%82%92%E3%82%AD%E3%83%A3%E3%83%83%E3%82%B7%E3%83%B3%E3%82%B0-Business%E3%83%97%E3%83%A9%E3%83%B3%E3%81%A8Enterprise%E3%83%97%E3%83%A9%E3%83%B3%E3%81%AE%E3%81%BF-
title: Magentoと静的HTMLをキャッシング(BusinessプランとEnterpriseプランのみ）
---

# Magentoと静的HTMLをキャッシング(BusinessプランとEnterpriseプランのみ）

## Magentoと静的HTMLをキャッシング(BusinessプランとEnterpriseプランのみ）

_Magento for BusinessおよびEnterpriseでのみ利用できる、静的HTMLをキャッシュする方法について説明します。_

### 本記事の内容

-   [概要](https://support.cloudflare.com/hc/ja/articles/236168808-Magento%E3%81%A8%E9%9D%99%E7%9A%84HTML%E3%82%92%E3%82%AD%E3%83%A3%E3%83%83%E3%82%B7%E3%83%B3%E3%82%B0-Business%E3%83%97%E3%83%A9%E3%83%B3%E3%81%A8Enterprise%E3%83%97%E3%83%A9%E3%83%B3%E3%81%AE%E3%81%BF-#h_3gTROadnTWFqZeV63JQ26q)
-   [Cloudflare Page Ruleで静的HTMLをキャッシュする](https://support.cloudflare.com/hc/ja/articles/236168808-Magento%E3%81%A8%E9%9D%99%E7%9A%84HTML%E3%82%92%E3%82%AD%E3%83%A3%E3%83%83%E3%82%B7%E3%83%B3%E3%82%B0-Business%E3%83%97%E3%83%A9%E3%83%B3%E3%81%A8Enterprise%E3%83%97%E3%83%A9%E3%83%B3%E3%81%AE%E3%81%BF-#h_4VTKFNlOeF4MXnVsg5sNkB)
-   [Magento 1.8.x または 1.9.xにおける問題をトラブルシューティング](https://support.cloudflare.com/hc/ja/articles/236168808-Magento%E3%81%A8%E9%9D%99%E7%9A%84HTML%E3%82%92%E3%82%AD%E3%83%A3%E3%83%83%E3%82%B7%E3%83%B3%E3%82%B0-Business%E3%83%97%E3%83%A9%E3%83%B3%E3%81%A8Enterprise%E3%83%97%E3%83%A9%E3%83%B3%E3%81%AE%E3%81%BF-#h_2F3EyjMlfWDRnOzjkvhIGg)
-   [関連リソース](https://support.cloudflare.com/hc/ja/articles/236168808-Magento%E3%81%A8%E9%9D%99%E7%9A%84HTML%E3%82%92%E3%82%AD%E3%83%A3%E3%83%83%E3%82%B7%E3%83%B3%E3%82%B0-Business%E3%83%97%E3%83%A9%E3%83%B3%E3%81%A8Enterprise%E3%83%97%E3%83%A9%E3%83%B3%E3%81%AE%E3%81%BF-#h_600GCjGBJxeCueai2OREmf)

___

## 概要

Magentoを利用している Businessプランのお客様とEnterpriseのお客様は、当社の _Bypass Cache on Cookie_ ページルールで、匿名のページビューをキャッシュすることができます。この設定で、リクエストからリクエストへの再生成を必要としない、Cloudflare Edgeでの静的HTMLキャッシングができます。

Magento 管理パネルにログインする前、またはショッピングカートに何か追加する前に、ページビューが匿名化され、オリジンサーバーでMagentoがHTMLを継続的に再生成する必要がないように、リクエストをキャッシュすることが可能です。

___

## Cloudflare Page Ruleで静的HTMLをキャッシュする

 **Page Rules**を使って静的HTMLをキャッシュするには、

1\. Cloudflareアカウントにログインします。

2\.  **キャッシング** アプリをクリックします。 

3\.  **Browser Cache TTL**までスクロールダウンし、 **既存ヘッダーを尊重する**を選択します。

この設定を実行すると、匿名のページ訪問者をキャッシュするために必要なPage Ruleが設定できます。

4\. **ルール >** **Page Rules**へ移動します。

5\.  **Page Ruleを作成** ボタンをクリックして、ドメインを入力します。以下に示す通り、ドメインは www.orangeclouded.comです。

-   _Cache Everything_ (すべてをキャッシュする)は、Cloudflareに静的HTMLをキャッシュするように指示します。
-   _Bypass Cache on Cookie_ が設定された基準を満たす場合、（[静的画像とその他のファイルはキャッシュされますが、](https://support.cloudflare.com/hc/en-us/articles/200172516-Which-file-extensions-does-CloudFlare-cache-for-static-content-)）CloudflareはTHMLをキャッシュしません。Magento 1とMagento 2のどちらをご利用かによって、ルールが異なります。

`Magento 1    external_no_cache=.*|PHPSESSID=.*|adminhtml=.* Magento 2    admin=.*|PHPSESSID=.*|private_content_version=.*`

-   最後に _Edge Cache TTL_ を設定すると、オリジンからキャッシュ済みファイルが戻る前にCloudflareが保持できる最長期間を定義できます。長いEdge Cache TTL時間を設定しても、この時間が切れる前なら実行可能です。

![The Create a Page Rule dialog with settings to instruct Cloudflare to cache static HTML, the Bypass Cache on cookie rule instructing Cloudflare not to cache HTML while static images and other files are still cached, and the Edge Cache TTL set to a month.](/images/support/hc-import-page_rules_caching_static_html_with_magento.png)

6\.  **保存とデプロイ**をクリックします。

___

## Magento 1.8.x または 1.9.xにおける問題をトラブルシューティング

Magento 1.8.x サイト、または1.9.xで **Bypass Cache on Cookie** をセットアップすると、ユーザーが最初にショッピングカートにアイテムを追加したいとしても、「カートに追加する」が機能しない場合があります。

Magento 1.8.x と1.9.xは、Megentoフォーム全体で [Cross Site Request Forgery checks](https://www.section.io/blog/csrf-and-caching/) (CSRF) を導入しています。これはCookieを使用するため、匿名キャッシングメカニズムが問題を引き起こす可能性もあります。この問題の解決方法は3つあります。以下のセキュリティレベルに基づいて、オプションを紹介します。

1\. 最も低いセキュリティ:  _システム -> 設定 -> システム -> CSRF 保護 -> Urlに秘密鍵を追加する_ の設定が、デフォルトで _Yes_ となっています。この設定を _No_ にすると、Megentoフロントエンド全体でCSRFセキュリティプロテクションが無効となり、サイト上にCSRF保護をオンにできる別のメカニズムがあれば、このオプションだけが表示されます。ただし、この方法は推奨されません。  _システム -> ADMIN -> システム -> CSRF 保護 -> Urlに秘密鍵を追加する_のAdminパネルに同様の名前設定があることに注意してください。この設定はYesに保ち、 **変更しない**でください。この設定では、Adminエンドポイントにセキュリティを提供することになるため、使用には特別な注意が必要となります。

2\.  中程度のセキュリティ: ユーザーが「カートに追加する」フォームでCSRFチェックのみを無効にできるようにする Magento コミュニティモジュールがセキュリティリスクの重大性がやや低いところに存在します。  [Inovarti\_FixAddToCartMage18](https://github.com/deivisonarthur/Inovarti_FixAddToCartMage18/blob/master/README.md) プラグインが CSRF 保護から「カートに追加する」をホワイトリストに設定してこれを行います。 

3\.  最も高いセキュリティ: MagentoサイトのCSRFトークン値を動的に埋めるためにAJAXを使うことが最良の方法です。ユーザーが何かをカートに加えるためにボタンをクリックすると、ユーザーのセッションと一致する形式でCSRFを更新するためにジャンプするJavaScriptもあります。これにより、ページのほとんどをキャッシュから提供することが可能になりますが、トークンを取得するためにオリジンに戻るリクエストが必要となります。

最終的なAJAXのメカニズムが [Magento Turpentine拡張機能](https://github.com/nexcess/magento-turpentine)と呼ばれるプラグインで実行されています。このプラグインはVarnishでキャッシュの実行ができるように構築されましたが、Cloudflareで使うこともできます。

インストールには、いくつかオプションがあります。

-   TarballのパッケージをGitHubのダウンロードページからダウンロードし、インストールします。（これは、「Download as tar.gz」ボタンではないことに留意してください）そして、Magento 接続ダウンローダーまたはMagentoの コマンドを通して、インストールしてください。_mage_ コマンド。
-   インストールは  拡張キーを介して行います： `http://connect20.magentocommerce.com/community/Nexcessnet_Turpentine`
-   インストールは を使って行いますこちらを使用するだけで済みます： `modman clone https://github.com/nexcess/magento-turpentine.git`

プラグインをインストールしたら、 _システム (System) -> 設定 (Configration) -> TURPENTINE -> Varnish オプション (Varnish Option)_ の順に移動し、「Use VCL fix」オプションを検索し、「無効にする」に設定し、保存します。

![Use VCL fix option set to Disable.](/images/support/hc-import-use_vcl_fix_magento_cache_static_html.png)

___

## 関連リソース

-   [CloudflareのCDNについて理解する](https://support.cloudflare.com/hc/en-us/articles/200172516)
