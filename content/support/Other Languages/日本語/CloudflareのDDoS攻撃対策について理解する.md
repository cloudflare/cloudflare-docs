---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/200172676-Cloudflare%E3%81%AEDDoS%E6%94%BB%E6%92%83%E5%AF%BE%E7%AD%96%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B
title: CloudflareのDDoS攻撃対策について理解する
---

# CloudflareのDDoS攻撃対策について理解する

## CloudflareのDDoS攻撃対策について理解する

_CloudflareがDDoS攻撃からの保護を実現する方法とWebサイトが攻撃を受けているかどうかを確認する方法について説明します。_

### 本記事の内容

-   [概要](https://support.cloudflare.com/hc/ja/articles/200172676-Cloudflare%E3%81%AEDDoS%E6%94%BB%E6%92%83%E5%AF%BE%E7%AD%96%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B#h_948b870f-2a72-481a-8186-cccc7f4f7c9b)
-   [Cloudflare HTTP DDoS 攻撃対策マネージドルールセット](https://support.cloudflare.com/hc/ja/articles/200172676-Cloudflare%E3%81%AEDDoS%E6%94%BB%E6%92%83%E5%AF%BE%E7%AD%96%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B#http-ddos-managed-rules)
-   [Cloudflareネットワークレイヤー DDoS 攻撃対策マネージドルールセット](https://support.cloudflare.com/hc/ja/articles/200172676-Cloudflare%E3%81%AEDDoS%E6%94%BB%E6%92%83%E5%AF%BE%E7%AD%96%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B#network-ddos-managed-rules)
-   [DDoS攻撃を受けているかどうかを確認する](https://support.cloudflare.com/hc/ja/articles/200172676-Cloudflare%E3%81%AEDDoS%E6%94%BB%E6%92%83%E5%AF%BE%E7%AD%96%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B#h_bc8656d7-0088-4da1-b8da-2a369caa72d3)
-   [Cloudflareから攻撃を受けているか?](https://support.cloudflare.com/hc/ja/articles/200172676-Cloudflare%E3%81%AEDDoS%E6%94%BB%E6%92%83%E5%AF%BE%E7%AD%96%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B#h_60eb7a1e-a0b0-45c9-9c19-d67b93eea470)
-   [関連リソース](https://support.cloudflare.com/hc/ja/articles/200172676-Cloudflare%E3%81%AEDDoS%E6%94%BB%E6%92%83%E5%AF%BE%E7%AD%96%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B#h_5d49e839-e040-49a9-acce-11bd03dfdcc2)

___

## 概要

[分散サービス妨害攻撃](https://www.cloudflare.com/ddos)（DDoS）は、エンドユーザーがオンラインサービスを利用できないようにします。Cloudflareは、全プランのお客様に、レイヤー3、4、7におけるDDoS攻撃に対する定額制の軽減策を提供しています。攻撃規模によって請求額を増やすことも、攻撃の規模や種類、攻撃時間に上限を設けることもありません。

Cloudflareのネットワークは、大規模な[DDoS攻撃](https://www.cloudflare.com/ddos)を自動的に監視および軽減するように構築されています。小規模のDDoS攻撃からWebサイトを保護するためにCloudflareでコンテンツをキャッシュするのが有効な方法ですが、キャッシュされないアセットについては、[手動でDDoS攻撃に対応する](/ddos-protection/best-practices/respond-to-ddos-attacks/)必要があります。

さらに、Cloudflareは小規模なDDoS 攻撃を軽減するお手伝いもしています。

-   どのプランのゾーンでも、HTTPエラー率が、しきい値が毎秒1,000エラーの_High_（デフォルト）感度レベルを超える場合です。感度レベルは、[HTTP DDoS 攻撃対策マネージドルールセットを設定する](/ddos-protection/managed-rulesets/http)ことで、下げることができます。

-   Pro プラン、Business プラン、Enterprise プランのゾーンについて、Cloudflareはより高い精度の検出を行うために追加のチェックを行います。つまり、秒ごとのエラー率も通常のオリジントラフィックレベルの5倍以上が必要となります。

Cloudflareでは、52X番台（内部サーバーエラー）と[530エラー](https://support.cloudflare.com/hc/articles/115003011431#530error)を除く53X番台のHTTPエラーすべてに基づいてエラー率を決定します。

HTTP 攻撃の緩和が、HTTP DDoSイベントとして、ファイアウォール分析ダッシュボードで表示されます。こうしたイベントは、[Cloudflare Logs](/logs/)でも、利用できます。

現在、HTTPエラー率に基づくDDoS 軽減に関して、お客様は特定のHTTPエラーコードを除外することはできません。

[よく知られているDDoS攻撃](https://www.cloudflare.com/learning/ddos/famous-ddos-attacks/)および[DDoS](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)の詳細については、Cloudflareのラーニングセンターをご覧ください。また、DDoSの導入事例については、この記事の最後にある「関連リソース」セクションを参照してください。

___

Cloudflare HTTP DDoS攻撃対策マネージドルールセットとは事前に設定されたルールがセットになったものです。既知の攻撃パターンや既知の攻撃ツール、疑わしいパターン、プロトコル違反、大量のオリジンエラーを引き起こすリクエスト、オリジン/Cacheにヒットする過剰なトラフィック、エッジのアプリケーション層における追加の攻撃ベクトルとマッチさせるために用いられます。このルールセットはデフォルトで有効になっており、Cloudflareのお客様はすべてのプランでご利用いただけます。

正当なトラフィックの大きな急増が予想される場合、正当なトラフィックが攻撃のトラフィックとして誤認され、ブロックやチャレンジされたりする誤検知を回避するために、DDoS攻撃対策設定をカスタマイズすることをご検討ください。

Cloudflare HTTP DDoS攻撃対策マネージドルールセットと利用できる設定について[Cloudflare開発者ポータル](/ddos-protection/managed-rulesets/http)で詳しくお読みください。

HTTP DDoS 攻撃対策システムで適用されるアクションに関する詳細情報については、[HTTP DDoS 攻撃対策パラメーター：アクション](/ddos-protection/managed-rulesets/http/override-parameters#action)をご参照ください。

___

## Cloudflareネットワークレイヤー DDoS 攻撃対策マネージドルールセット

CloudflareネットワークレイヤーDDoS 攻撃対策マネージドルールセットとは、事前に設定されたルールがセットになったもので、OSI 参照モデルのレベル３とレベル４で既知のDDoS攻撃ベクトルと一致するために使用されます。このルールセットはデフォルトで有効になっており、Cloudflareのお客様はすべてのプランでご利用いただけます。

Cloudflareネットワークレイヤー DDoS攻撃対策マネージドルールセットと利用できる設定について[Cloudflare開発者ポータル](/ddos-protection/managed-rulesets/network)で詳しくお読みください。

L3/4 DDoS 攻撃対策システムで適用されるアクションに関する詳細情報については、[ネットワークレイヤー DDoS 攻撃対策パラメーター：アクション](/ddos-protection/managed-rulesets/network/override-parameters#action)をご参照ください。

___

## DDoS攻撃を受けているかどうかを確認する

DDoS攻撃を受けていることを示す一般的な兆候は次のとおりです：

-   サイトがオフラインであるか、またはリクエストに対する応答が遅い。
-   **Cloudflare経由のリクエスト**のグラフまたはCloudflare **Analytics**アプリの**帯域幅**に予期しない突発的上昇がみられる場合。
-   通常の訪問者の行動と一致しない異常なリクエストがWebサーバー（オリジンサーバー）にある。

___

## Cloudflareから攻撃を受けているか?

Cloudflareがサイトを攻撃していると誤認される一般的なシナリオが2つあります：

-   [オリジナルの訪問者のIPアドレスを復元](https://support.cloudflare.com/hc/ja/sections/200805497-Restoring-Visitor-IPs)しない限り、CloudflareのIPアドレスは、すべてのプロキシされたリクエストのサーバーログに表示されます。
-   攻撃者はCloudflareのIPアドレスをスプーフィングしています。[Cloudflare Spectrum](/spectrum/get-started/)を使用しない限り、Cloudflareは、[いくつかの特定のポートを介してのみトラフィックをWebサーバー（オリジンサーバー）に送信](https://support.cloudflare.com/hc/articles/200169156)します。

Cloudflareはリバースプロキシであるため、ホスティングプロバイダーが[Cloudflare IPアドレス](https://www.cloudflare.com/ips/)から接続する攻撃のトラフィックを監視するのが理想です。その一方で、Cloudflareに属していないIPアドレスからの接続が確認できる場合、攻撃はオリジンWebサーバーに直接向けられています。Cloudflareは、トラフィックがCloudflareのネットワークをバイパスするため、オリジンIPアドレスに直接向けられた攻撃を阻止することはできません。

___

## 関連リソース

-   [DDoS攻撃に対応する](/ddos-protection/best-practices/respond-to-ddos-attacks/)
-   [ベストプラクティス：DDoS攻撃対策](https://support.cloudflare.com/hc/articles/200170166)
-   [Cloudflare Logsを使用してDDoSトラフィックを調べる（Enterpriseプランのみ）](https://support.cloudflare.com/hc/ja/articles/360020739772-Using-Cloudflare-Logs-ELS-to-Investigate-DDoS-Traffic-Enterprise-Only-)
-   [DDoS攻撃とは？](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)
-   [DNSアンプ攻撃の仕組み](http://blog.cloudflare.com/deep-inside-a-dns-amplification-ddos-attack)

### ケーススタディ：

-   [65GbpsのDDoS攻撃を開始する方法とそれを停止する方法](http://blog.cloudflare.com/65gbps-ddos-no-problem)
-   [停戦はサイバー戦争を終わらせない](http://blog.cloudflare.com/ceasefires-dont-end-cyberwars)
-   [リフレクション攻撃を振り返る](https://blog.cloudflare.com/reflections-on-reflections/)
-   [驚くほど単純なDDoSプロトコル（SSDP）が100 GbpsのDDoS攻撃を発生させる](https://blog.cloudflare.com/ssdp-100gbps/)
-   [Memcrashed - UDPポート11211からの大規模なアンプ攻撃](https://blog.cloudflare.com/memcrashed-major-amplification-attacks-from-port-11211/)
-   [大規模なDDoS攻撃の本当の原因 - IPスプーフィング](https://blog.cloudflare.com/the-root-cause-of-large-ddos-ip-spoofing/)
