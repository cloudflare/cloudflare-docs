---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/200168336-Cloudflare%E3%83%A2%E3%83%90%E3%82%A4%E3%83%AB%E3%83%AA%E3%83%80%E3%82%A4%E3%83%AC%E3%82%AF%E3%83%88%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6
title: Cloudflareモバイルリダイレクトについて
---

# Cloudflareモバイルリダイレクトについて

## Cloudflareモバイルリダイレクトについて

_モバイルリダイレクトが、モバイルデバイスで利用するWebサイトの外観と操作性を最適化する方法を説明します。_

___

## 概要

モバイルリダイレクトを使用すると、モバイルデバイスの訪問者をモバイル向けに最適化されたWebサイト、またはサブドメインのホームページに自動的にリダイレクトできます。リダイレクトがCloudflareのネットワークのエッジで行われ、サーバーへのラウンドトリップを排除することでユーザーエクスペリエンスが向上します。

リダイレクトをアクティブにするには、Cloudflareのパフォーマンスサービスを有効化( **DNS** 設定で[「オレンジ色のクラウド」](https://support.cloudflare.com/hc/articles/200169626) に)する必要があります。

___

## モバイルリダイレクトの有効化

1\. Cloudflareアカウントにログインします。

2\. モバイルリダイレクトを無効にしたいドメインに適切なCloudflareアカウントをクリックします。

3\.  **スピード** アプリをクリックします。

4\.  **最適化** タブをクリックします。

5\. Scroll down to thection of the **「最適化」** タブの **モバイル** セクションまでスクロールダウンします。

6\. ドロップダウンリストからリダイレクトしたいサブドメインを選択します。

7\.  **パスをキープする** または **パスをドロップする**_を選択します。_

8\. スイッチを **On**に切り替えます。

![Mobile Redirect card with a sample URL, Keep path option, and the feature toggled to ](/images/support/hc-import-speed_mobileredirect_enabled.png)

___

## 互換性のあるモバイルデバイス

以下のモバイルデバイスのブラウザは、モバイル向けに最適化されたサブドメインにリダイレクトされます。

-   iPhone
-   Android
-   iPod
-   Blackberry
-   Palm
-   Mobile
-   Windows CE
-   Opera mini
-   AvantGo
-   Docomo

___

## サイト全体の表示を許可

エンドユーザーがモバイルでサイト全体を表示できるようにするには、オリジンサーバーの _ルートドメインでのみ次のCookie値_を0（ゼロ）に設定する必要があります。

`__cf_mob_redir = 0; domain=.example.com`

この例では、.example.comがルートドメインの代わりです。

モバイルリダイレクトを更新し、Cookieを削除するか、選択した期間の経過後に有効期限が切れるように設定します。

___

## 関連リソース

-   [Cloudflareのプロキシと互換性のあるサブドメインを特定する](https://support.cloudflare.com/hc/articles/200169626)
