---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/360035387431-Cloudflare%E3%81%AE%E3%83%9C%E3%83%83%E3%83%88%E8%A3%BD%E5%93%81-FAQ
title: Cloudflareのボット製品
---

# Cloudflareのボット製品 - FAQ – Cloudflareヘルプセンター

## Cloudflareのボット製品 - FAQ

### 本記事の内容

-   [概要](https://support.cloudflare.com/hc/ja/articles/360035387431-Cloudflare%E3%81%AE%E3%83%9C%E3%83%83%E3%83%88%E8%A3%BD%E5%93%81-FAQ#12345679)
-   [Cloudflareのボット検出はどのように行われますか？](https://support.cloudflare.com/hc/ja/articles/360035387431-Cloudflare%E3%81%AE%E3%83%9C%E3%83%83%E3%83%88%E8%A3%BD%E5%93%81-FAQ#h_vGKNSEuBtE5ymreIHOucE)
-   [自分のプランに何が含まれているかを知るには？](https://support.cloudflare.com/hc/ja/articles/360035387431-Cloudflare%E3%81%AE%E3%83%9C%E3%83%83%E3%83%88%E8%A3%BD%E5%93%81-FAQ#h_3dC1nAamuWNwImCpIkdlC8)
-   [ボット製品をセットアップする方法について教えてほしい。](https://support.cloudflare.com/hc/ja/articles/360035387431-Cloudflare%E3%81%AE%E3%83%9C%E3%83%83%E3%83%88%E8%A3%BD%E5%93%81-FAQ#h_2PHwjg1FfXSS3K1aZE00yH)
-   [Yandex ボットが ID 100203のWAFマネージドルールによりブロックされる](https://support.cloudflare.com/hc/ja/articles/360035387431-Cloudflare%E3%81%AE%E3%83%9C%E3%83%83%E3%83%88%E8%A3%BD%E5%93%81-FAQ#Yandex-bot-unexpectedly-blocked-WAF-100203)
-   [機械学習の仕組みは？](https://support.cloudflare.com/hc/ja/articles/360035387431-Cloudflare%E3%81%AE%E3%83%9C%E3%83%83%E3%83%88%E8%A3%BD%E5%93%81-FAQ#h_4iPjq7Qq4Ozsq0XwibA2ea)
-   [ファイアウォールルールに対するマネージドチャレンジが表示される理由は？](https://support.cloudflare.com/hc/ja/articles/360035387431-Cloudflare%E3%81%AE%E3%83%9C%E3%83%83%E3%83%88%E8%A3%BD%E5%93%81-FAQ#managed-challenge)
-   [脅威スコアとボット管理スコアの違いは何ですか？](https://support.cloudflare.com/hc/ja/articles/360035387431-Cloudflare%E3%81%AE%E3%83%9C%E3%83%83%E3%83%88%E8%A3%BD%E5%93%81-FAQ#h_131SlrJFhqmrJjs0joDaXE)
-   [cf.bot\_management.verified\_botとは？](https://support.cloudflare.com/hc/ja/articles/360035387431-Cloudflare%E3%81%AE%E3%83%9C%E3%83%83%E3%83%88%E8%A3%BD%E5%93%81-FAQ#h_zzzgV0HSwPUhOEs5UY9sD)
-   [良性のボットを実行し、それを許可リスト （cf.bot\_management.verified\_bot）に追加したいのですが、どうすればいいですか？](https://support.cloudflare.com/hc/ja/articles/360035387431-Cloudflare%E3%81%AE%E3%83%9C%E3%83%83%E3%83%88%E8%A3%BD%E5%93%81-FAQ#h_5itGQRBabQ51RwT5cNJX8u)
-   [ボットの問題をトラブルシューティングするには、どのような情報が必要ですか？](https://support.cloudflare.com/hc/ja/articles/360035387431-Cloudflare%E3%81%AE%E3%83%9C%E3%83%83%E3%83%88%E8%A3%BD%E5%93%81-FAQ#h_2Ffw8AKdwQySoI8rnO02pc)
-   [Botファイトモード（BFM）あるいはスーパーBotファイトモード（SBFM）に起因する誤検知がある場合、どうすればいいですか？](https://support.cloudflare.com/hc/ja/articles/360035387431-Cloudflare%E3%81%AE%E3%83%9C%E3%83%83%E3%83%88%E8%A3%BD%E5%93%81-FAQ#5KX8t3C6SObnoWs5F6YOlU)
-   [スーパーボットファイトモード（SBFM）が、機能をオフにしてもリクエストをブロックしていますが、なぜですか？](https://support.cloudflare.com/hc/ja/articles/360035387431-Cloudflare%E3%81%AE%E3%83%9C%E3%83%83%E3%83%88%E8%A3%BD%E5%93%81-FAQ#h_6Q8mNs9Ur9mvXhjcH1KBcn)
-   [関連リソース](https://support.cloudflare.com/hc/ja/articles/360035387431-Cloudflare%E3%81%AE%E3%83%9C%E3%83%83%E3%83%88%E8%A3%BD%E5%93%81-FAQ#3zR4ro73zaHshu5OldQIuB)

___

## 概要

Cloudflareのボットソリューションは、自動トラフィックを特定して軽減し、不正なボットからドメインを保護します。

ボットソリューションに関する詳細や、その設定方法については、[開発者向けドキュメント](https://developers.cloudflare.com/bots/)を参照してください。

___

Cloudflareは複数の方法を使ってボットを検出しますが、プランによって方法が異なります。詳細は、[Cloudflareボット製品](https://developers.cloudflare.com/bots/about/plans)を参照してください。

___

## 自分のプランに何が含まれているかを知るには？

ご利用のプランに何が含まれているのかを確認するには、当社の[開発者ドキュメント](https://developers.cloudflare.com/bots/about/plans)をお読みください。

___

## ボット製品をセットアップする方法について教えてほしい。

ボット製品のセットアップについては、当社の[開発者ドキュメント](https://developers.cloudflare.com/bots/get-started)をお読みください。

___

## Yandex ボットが ID 100203のWAFマネージドルールによりブロックされる

Yandex（ヤンデックス）は頻繁にボットを更新しており、更新内容が伝達される間、誤検知の発生が増えることがあります。新しく更新されたばかりのボットは、Cloudflare WAFマネージドルール（ID 100203）にブロックされることがあります。これはYandexボットのIPリストがYandexで行われた最新の変更と同期されていないためです。

**回避策：**

-   ID100203のWAFマネージドルールを一時的に無効にするか、
-   _バイパス_処理を行うファイアウォールルールを作成し、リクエストが**Yandex IP**から来ていたり、ユーザーエージェントが**Yandex**を含んでいるときにWAFマネージドルールをバイパスさせるようにします。当社の[開発者ドキュメント](https://developers.cloudflare.com/firewall/cf-firewall-rules/actions)で詳細を確認してください。

**解決策：**

新規のYandex IPが当社システムに伝達されると、リクエストはそれ以上ブロックされなくなります。この作業は最大48時間かかることがあります。ボットに変更がない状態で48時間経過後も、Yandexボットがブロックされていることが確認された場合は、[Cloudflareサポート](https://support.cloudflare.com/hc/ja/articles/200172476-Contacting-Cloudflare-Support)までご連絡ください。

___

## 機械学習の仕組みは？

教師あり機械学習は、性別や年齢のような特定の変数（X）を使って、収入のような別の変数（Y）を予測します。

ボット管理とスーパーボットファイトモードでは、X変数はリクエスト機能です。一方、Y変数はX値に基づくCaptchaを解決する確率を表します。

Cloudflareは、無数のリクエストからのデータを使用して、定期的にシステムを再トレーニングします。Cloudflare LogpullやLogpush、ファイアウォールAPIなどのリクエストログから、このデータについて知ることができます。

___

## ファイアウォールルールに対するマネージドチャレンジが表示される理由は？

ボットファイトモードまたはスーパーボットファイトモードで異なるボットカテゴリーにチャレンジする方を選択すると、ファイアウォールイベントが**マネージドチャレンジ**の**実行されたアクション**と一緒に表示されます。

マネージドチャレンジは、[ファイアウォールルール](https://support.cloudflare.com/hc/articles/200170136#managed-challenge)の結果としても表示されます。

___

## 脅威スコアとボット管理スコアの違いは何ですか？

次のように、大きな違いがあります。

-   脅威スコア（_cf.threat\_score_）は、Cloudflareが IP Reputationを決定するために使用するものです。0（良い）から100（悪い）で評価します。
-   ボット管理スコア (_cf.bot\_management.score)_ は、Cloudflareがボット管理で、リクエストが人間かスクリプトからのものかを測定するために使うものです**。**スコアの範囲は 1 (ボット) から 99 (人) までです。スコアが低い場合は、スクリプト、API サービス、または自動エージェントからのリクエストを示します。スコアが高い場合は、標準のデスクトップやモバイルWebブラウザを使用する人によってリクエストが送信されていることを示します。

これらのフィールドは、[Cloudflareファイアウォールルール](https://developers.cloudflare.com/firewall/cf-firewall-rules)を介して利用可能です。

___

## cf.bot\_management.verified\_botとは？

_cf.bot\_management.verified\_bot_のリクエストの値は、当該リクエストがCloudflareの許可リストに載っているボットによるかどうかを示すブール値です。

Cloudflareでは、自動化された良性ボットの許可リストを構築しています（例：Google検索エンジン、Pingdomなど）。

この許可リストは大きく、逆引きDNS検証に基づいているため、当社が許可するIPはリクエストしているサービスと本当に一致します。これに加えて、Cloudflareは、ASNブロックやパブリックリストを含む複数の検証方法を使用しています。お客様がこれらの検証タイプを利用できない場合は、Cloudflareの内部データと機械学習を使用して、良性のボットから正当なIPアドレスを特定します。

良性ボットからのトラフィックを許可するには、ファイアウォールルールの[検証済みボット](https://developers.cloudflare.com/ruleset-engine/rules-language/fields#dynamic-fields)フィールドを使用します。

___

## 良性のボットを実行し、それを許可リスト （cf.bot\_management.verified\_bot）に追加したいのですが、どうすればいいですか？

Cloudflareは[Cloudflare Radar](https://radar.cloudflare.com/verified-bots)で認証済みボットのサンプル一覧を管理しています。

ボットオペレーターとして、検証済みボットとしてCloudflareのリストに入れるためには、あなたのボットは当社の [検証済みボットパブリックポリシー](https://developers.cloudflare.com/bots/reference/verified-bots-policy/)に従う必要があります。 ボットがこの基準を満たす場合は、こちらの [オンライン申請書](https://docs.google.com/forms/d/e/1FAIpQLSdqYNuULEypMnp4i5pROSc-uP6x65Xub9svD27mb8JChA_-XA/viewform?usp=sf_link)を提出してください。

___

## ボットの問題をトラブルシューティングするには、どのような情報が必要ですか？

ボットソリューションでエラーが発生し、サポートリクエストを送信する必要がある場合は、次の情報を記載してください：

-   RayID
-   IPアドレス
-   ファイアウォールルール ID、ルール式、CAPTCHAの解決率
-   誤検知のよくあるユーザーエージェント
-   誤検知のよくあるASN
-   グラフ上のチャレンジされたトラフィックの急増など、ファイアウォールでみられる不審な活動のスクリーンショット
-   問題があるURIまたはパス
-   ドメインの設定方法の大まかな説明。
    -   一つのゾーンはSSL for SaaSになっていて、他は違いますか？
    -   ほとんどのAPIトラフィックは特定のURIに送信されていますか？
    -   予想されるモバイルトラフィックの量はどれくらいですか？

___

## Botファイトモード（BFM）あるいはスーパーBotファイトモード（SBFM）に起因する誤検知がある場合、どうすればいいですか？

**BFM****/SBFM機能を無効にする方法は？**

BFM/SBFM機能で問題（誤検知など）に直面した場合、**セキュリティ**\> **ボット**の順で当該機能を無効にできます。

-   **Freeプランの場合は**、**ボットファイトモード**オプションを**オフ**に切り替えます
-   **Pro**プランの場合は、**スーパーボットファイトモードの設定** リンクをクリックし、**確実に自動化されたボット**機能と**検証済みボット**機能をそれぞれ**許可する**に設定し、**静的リソース保護**と**JavaScript 検出**オプションを**オフ**に切り替えます。
-   **Business**プランと**Enterprise**プラン（ボット管理アドオンがない）の場合、**スーパーボットファイトモードの設定**リンクをクリックし、**確実に自動化されたボット**機能、**自動化の可能性が高いボット**機能、**検証済みボット**機能のそれぞれを**許可する**に設定し、**静的リソースの保護**と**JavaScript検出**オプションを**オフ**に切り替えます。

___

## スーパーボットファイトモード（SBFM）が、機能をオフにしてもリクエストをブロックしていますが、なぜですか？

これは既知の問題で、ボットチームが対応中です。近い将来解決される予定です。その間、このような問題のための回避策があります。 下記のAPIコマンドを実行して、SBFMルールセットを確認して削除する必要があります:

1\. 既存のゾーンレベルのルールセットを列挙します


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -X GET &quot;https://api.cloudflare.com/client/v4/zones/zone_id/rulesets&quot;\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Email: email&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Key: key&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;Content-Type: application/json&quot;</span></div></span></span></span></code></pre>{{</raw>}}

2．ステップ1の結果から、ゾーンのSBFM構成と関連するルールセットIDを見つけます。ルールセットには、`"kind": "zone"` と `"phase": "http_request_sbfm"` と記載されているはずです。

3\. 見つけたルールセットIDを使って、SBFMルールセットを削除します


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -X DELETE &quot;https://api.cloudflare.com/client/v4/zones/zone_id/rulesets/rulesets_id&quot;\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Email: email&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Key: key&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;Content-Type: application/json&quot;</span></div></span></span></span></code></pre>{{</raw>}}

注意: <key> は、ご自身のAPIキーと置き換える必要があります。APIキーは、[APIトークン](https://dash.cloudflare.com/profile/api-tokens)から入手可能です。

___

## 関連リソース

-   [Cloudflareボット管理](https://developers.cloudflare.com/bots/) (開発者向けドキュメント)
-   [Cloudflareファイアウォールルール](https://developers.cloudflare.com/firewall/cf-firewall-rules/) (開発者向けドキュメント)
-   [Cloudflareボット管理：機械学習など](https://blog.cloudflare.com/cloudflare-bot-management-machine-learning-and-more/) (Cloudflareブログ)
-   [ボットを止める：機械学習の実践的なレッスン](https://blog.cloudflare.com/stop-the-bots-practical-lessons-in-machine-learning/) (Cloudflareブログ)
