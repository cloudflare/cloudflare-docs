---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/360016450871-Cloudflare-Stream%E3%81%AE%E8%AB%8B%E6%B1%82
title: Cloudflare Streamの請求
---

# Cloudflare Streamの請求

## Cloudflare Streamの請求

_Cloudflare Streamの価格設定と請求金額の計算方法について説明します。_

### 本記事の内容

-   [Cloudflare Streamの料金設定](https://support.cloudflare.com/hc/ja/articles/360016450871-Cloudflare-Stream%E3%81%AE%E8%AB%8B%E6%B1%82#pricing)
-   [Cloudflare Streamの請求](https://support.cloudflare.com/hc/ja/articles/360016450871-Cloudflare-Stream%E3%81%AE%E8%AB%8B%E6%B1%82#billing)
-   [Cloudflare Streamの課金可能な分数](https://support.cloudflare.com/hc/ja/articles/360016450871-Cloudflare-Stream%E3%81%AE%E8%AB%8B%E6%B1%82#billable-minutes)
-   [関連リソース](https://support.cloudflare.com/hc/ja/articles/360016450871-Cloudflare-Stream%E3%81%AE%E8%AB%8B%E6%B1%82#related-resources)

___

[Cloudflare Stream](https://support.cloudflare.com/hc/en-us/articles/360017801091)はビデオアプリケーションを構築するためのビデオオンデマンドプラットフォームです。価格設定は、以下に示すように使用量とストレージに基づきます。

ユーザーに配信されるビデオの分数：

-   1,000分あたりUSD $1.00/月

Cloudflare Streamに保存したビデオの分数：

-   1,000分あたりUSD $5.00
-   事前請求

___

## Cloudflare Streamの請求

Cloudflare Streamは月ごとの請求になります。Cloudflare Streamは使用量に基づくため、前月に視聴および保存した分数に基づいて請求されます。たとえば、Cloudflare Streamの9月の請求書には、8月のCloudflare Streamの使用量に対する請求金額が記載されます。

請求金額は、1,000分単位で切り上げられます。 以下は配信および保存された分数に基づいて予想される請求金額を示したものです：

| **分数** | **切り上げ** | **発生する料金** |
| --- | --- | --- |
| 
ユーザーへの配信件数1,999件

 | 

2,000分

 | 

USD $2.00

 |
| 

Streamへの保存件数3,001件

 | 

4,000分

 | 

USD $20.00

 |
| 当該期間の合計料金（配信分の分数 + 保存分の分数） | 

USD $22.00

 |

___

## Cloudflare Streamの課金可能な分数

課金可能な分数は動画をCloudflareから訪問者に配信するのにかかった時間を示します。

サイトの訪問者が読み込んだ動画を視聴しなかった場合でも、Cloudflareは動画配信について請求します。しかし、訪問者のブラウザーが動画をローカルにキャッシュした場合、Cloudflareはその動画を視聴するのにかかった時間については請求しません。 つまり、訪問者が動画を複数回視聴した場合、Cloudflareは後続の視聴については請求しません。

Cloudflare Streamのプリロード動作はブラウザーによって異なります。動画の数秒をプリロードするブラウザーもあれば、動画全体をプリロードするブラウザーもあります。プリロードは動画の可用性を最適化するのに有益ですが、各自の使用例に適しているかどうかを検討してください。

Cloudflare Streamの課金可能な分数をCloudflareダッシュボードで確認して、配信分数に基づく請求金額の見積を出すことができます。

Cloudflare Streamの視聴分数を確認するには、次の手順に従います。

1.  Cloudflareアカウントにログインします。
2.  **「マイプロフィール（My Profile）」**ドロップダウンで、**「請求（Billing）」**をクリックします。Cloudflareアカウントに関連付けられているドメインの一覧が表示されます。
3.  Streamが有効になっているドメインを選択します。
4.  左のナビゲーションウィンドウで、**「課金可能な使用量（Billable Usage）」**をクリックします。 現在の日次トラフィックを示すグラフが表示されます。
5.  グラフの上にあるドロップダウンから**「前月（Previous month）」**を選択し、**「過去1か月間（Month to date）」**をクリックして前月の使用量を確認します。

___

-   [Cloudflare Streamの動画プラットフォーム](https://support.cloudflare.com/hc/en-us/articles/360017801091)
-   [Cloudflare Streamの開発者向けドキュメント](https://developers.cloudflare.com/stream/getting-started/)
