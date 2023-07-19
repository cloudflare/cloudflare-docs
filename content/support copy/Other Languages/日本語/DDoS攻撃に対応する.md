---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/200170196-DDoS%E6%94%BB%E6%92%83%E3%81%AB%E5%AF%BE%E5%BF%9C%E3%81%99%E3%82%8B
title: DDoS攻撃に対応する
---

# DDoS攻撃に対応する

## DDoS攻撃に対応する

_分散型サービス妨害（DDoS）攻撃からWebサイトを保護しましょう。 継続的な攻撃を阻止するための基本的な対策手法を説明します。_

### 本記事の内容

-   [概要](https://support.cloudflare.com/hc/ja/articles/200170196-DDoS%E6%94%BB%E6%92%83%E3%81%AB%E5%AF%BE%E5%BF%9C%E3%81%99%E3%82%8B#h_49125146-d910-42ad-a0d8-3d08a4eae681)
-   [手順1：Under Attack Modeを有効にする](https://support.cloudflare.com/hc/ja/articles/200170196-DDoS%E6%94%BB%E6%92%83%E3%81%AB%E5%AF%BE%E5%BF%9C%E3%81%99%E3%82%8B#h_dfff923a-5879-4750-a747-ed7b639b6e19)
-   [手順2：Webアプリケーションファイアウォール（WAF）を有効にする](https://support.cloudflare.com/hc/ja/articles/200170196-DDoS%E6%94%BB%E6%92%83%E3%81%AB%E5%AF%BE%E5%BF%9C%E3%81%99%E3%82%8B#h_b97416a5-5196-4f12-acb6-f81bbfcfa95f)
-   [手順3：ファイアウォールアプリ経由でトラフィックをチャレンジまたはブロックする](https://support.cloudflare.com/hc/ja/articles/200170196-DDoS%E6%94%BB%E6%92%83%E3%81%AB%E5%AF%BE%E5%BF%9C%E3%81%99%E3%82%8B#h_a2c9a5ce-d652-46db-9e82-bc3f06835348)
-   [手順4：Cloudflareサポートに問い合わせる](https://support.cloudflare.com/hc/ja/articles/200170196-DDoS%E6%94%BB%E6%92%83%E3%81%AB%E5%AF%BE%E5%BF%9C%E3%81%99%E3%82%8B#h_995ffed3-18a9-4f8c-833c-81236061b1e8)
-   [関連リソース](https://support.cloudflare.com/hc/ja/articles/200170196-DDoS%E6%94%BB%E6%92%83%E3%81%AB%E5%AF%BE%E5%BF%9C%E3%81%99%E3%82%8B#h_034beb4b-231e-40d8-b938-5c1b446e26a6)

___

## 概要

Cloudflareのネットワークは、非常に大規模な[DDoS攻撃](https://www.cloudflare.com/ddos)を自動的に軽減します。 Cloudflareでコンテンツをキャッシュすることも、小規模のDDoS攻撃からWebサイトを保護するのに役立ちますが、キャッシュされていないアセットについては、このガイドに記載されている追加の手動での介入手順が必要な場合があります。

___

## 手順1：Under Attack Modeを有効にする

[**Under Attack Mode**](https://support.cloudflare.com/hc/articles/200170076)を有効にするには、次の手順に従います：

1\. Cloudflareアカウントにログインします。

2\. 現在攻撃を受けているドメインを選択します。

3\. Cloudflare Overviewアプリの「Quick Actions」セクション内の**Under Attack Mode**を_「オン（On）」_に切り替えます。

4\. \[オプション\] ファイアウォールアプリの設定内の[**チャレンジパッセージ**](https://support.cloudflare.com/hc/articles/200170136)を調整します。

___

## 手順2：Webアプリケーションファイアウォール（WAF）を有効にする

次の手順に従って、Cloudflare [WAF](https://support.cloudflare.com/hc/en-us/articles/200172016-What-does-the-Web-Application-Firewall-WAF-do-)を有効にします：

1.  Cloudflareアカウントにログインします。
2.  追加の保護が必要なドメインを選択します。
3.  ファイアウォールアプリの「マネージドルール（Managed Rules）」タブ内で、**Webアプリケーションファイアウォール**を_「オン（On）」_に切り替えます。

___

## 手順3：ファイアウォールアプリ経由でトラフィックをチャレンジまたはブロックする

Cloudflareの**ファイアウォール**アプリは、次の方法でトラフィックのブロックを容易にします：

-   [**IP Access Rules**](/waf/tools/ip-access-rules/) \-複数のIPアドレス、/16または/24のIPレンジ、あるいは自律システム番号（ASN）をブロックする場合に推奨されます。 
-   [**ファイアウォールルール**](/firewall/cf-dashboard/create-edit-delete-rules/) \- 国、有効なIPレンジ、またはより複雑な攻撃パターンをブロックする場合に推奨されます。

-   [**Zone Lockdown**](/waf/tools/zone-lockdown/) \-信頼できる IPアドレスまたはサイトの一部のIPレンジのみを許可する場合に推奨されます。
-   [**ユーザーエージェント**](/waf/tools/user-agent-blocking/) \-ドメイン全体の [不審なUser Agent Blocking](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) をブロックする場合に推奨されます。

どの国またはIPをブロックまたはチャレンジするかを決めるには、ログファイルを確認します。 ホスティングプロバイダーに連絡して、次の情報を入手してください：

-   Webサーバー（オリジンサーバー）に到達している攻撃トラフィック
-   攻撃によってアクセスされているリソース
-   攻撃の一般的な特性（IPアドレス、ユーザエージェント、国、ASNなど）。

___

## 手順4：Cloudflareサポートに問い合わせる

上記の手順を実行しても、Webサーバー（オリジンサーバー）に大きな負荷をかける攻撃を阻止できない場合は、[Cloudflareサポート](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730)に連絡して支援を求めてください。

___

## 関連リソース

-   [CloudflareのDDoS保護について理解する](https://support.cloudflare.com/hc/articles/200172676)
-   [ベストプラクティス：DDoS対策](https://support.cloudflare.com/hc/articles/200170166)
-   [「I’m Under Attack Mode」とは？](https://support.cloudflare.com/entries/22053133)
-   [Cloudflare Logsを使用してDDoSトラフィックを調べる（Enterpriseプランのみ）](https://support.cloudflare.com/hc/en-us/articles/360020739772-Using-Cloudflare-Logs-ELS-to-Investigate-DDoS-Traffic-Enterprise-Only-)
-   [DDoS攻撃を法執行機関に報告する方法](https://www.icann.org/news/blog/how-to-report-a-ddos-attack)
