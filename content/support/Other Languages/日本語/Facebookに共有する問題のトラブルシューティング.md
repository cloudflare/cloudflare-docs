---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/217720788-Facebook%E3%81%AB%E5%85%B1%E6%9C%89%E3%81%99%E3%82%8B%E5%95%8F%E9%A1%8C%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0
title: Facebookに共有する問題のトラブルシューティング
---

# Facebookに共有する問題のトラブルシューティング

## Facebookに共有する問題のトラブルシューティング

Cloudflare **ファイアウォール**アプリ経由で、Facebook IPがブロックされないようにする方法を説明します。

___

## 概要

デフォルトで、CloudflareはFacebookからのリクエストをブロックしたり、チャレンジを使ったりすることはありません。ただし、Facebookへのウェブサイトの投稿は、次の状況下で_要注意_エラーが送られます：

-   セキュリティレベルが[攻撃を受けている](https://support.cloudflare.com/hc/search/click?data=BAh7CjoHaWRpBN5a7gs6CXR5cGVJIgxhcnRpY2xlBjoGRVQ6CHVybEkiSC9oYy9lbi11cy9hcnRpY2xlcy8yMDAxNzAyMDYtSG93LWRvLUktZW5hYmxlLUktbS1VbmRlci1BdHRhY2stbW9kZS0GOwdGOg5zZWFyY2hfaWRJIik4YjE5YTBmNS0zNDViLTRkZmEtYmEzYy01NDk4NDlhNmZkNjEGOwdGOglyYW5raQ8%3D--12cd9c846382e475f31a1186344911da7ed54d9c)とグローバルに設定されているか、[Page Rule](https://support.cloudflare.com/hc/articles/200172336)で設定されている、または
-   Facebook IPアドレスを含む、ユーザー定義のファイアウォールのチャレンジ、またはブロックがある場合。

Facebookとの共有をめぐる問題を解決するためには、

-   対応するIP、ASN、国別の[ファイアウォールルール](https://support.cloudflare.com/hc/articles/360016473712)、Facebook IPにチャレンジを使うかIPをブロックする[IP アクセスルール](https://support.cloudflare.com/hc/articles/217074967)を消去する方法が一つ。そして、
-   ご自分の[IP アクセスルール](https://support.cloudflare.com/hc/articles/217074967)にAS32934とAS63293をホワイトリストに設定し、チャレンジ、ブロック、攻撃下チャレンジをオーバーライドする方法があります。

Facebook共有をめぐる問題が発生した場合、Facebookの[オブジェクトデバッガー](https://developers.facebook.com/tools/debug/og/object/)にある**新しいスクレイピング情報を取得する**オプションを介して、ページを再度スクレイピングする必要があります。

それでも問題が解決されない場合は、下記の詳細とともに[Cloudflare サポートまでご連絡ください](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730):

-   Facebookと共有できないウェブサイトのURL
-   [Facebookのデバッグツール](https://developers.facebook.com/tools/debug/og/object/)からのアウトプット
-   URLから再度スクレイプしたという確認
