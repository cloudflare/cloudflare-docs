---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/115000546328-Cloudflare%E3%83%AC%E3%83%BC%E3%83%88%E5%88%B6%E9%99%90%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0
title: Cloudflareレート制限のトラブルシューティング
---

# Cloudflareレート制限のトラブルシューティング

## Cloudflareレート制限のトラブルシューティング

_適切なレート制限リクエストの一致を阻止し、Cloudflare API経由でエラーを引き起こす一般的な問題のトラブルシューティングをします。_

___

## 概要

**レート制限**の設定でよくある問題として、次のように適切なリクエスト一致を阻止するものがあります。

-   **ルールパターンで、HTTPまたはHTTPSプロトコルスキームを含む**（ _https://example.com/\*_など）。HTTPまたはHTTPSトラフィックだけに一致するようにルールを制限するために、リクエスト一致で、たとえば、_"schemes": \[ "HTTPS" \]_のように配列にスキームを使います。
-   **末尾のスラッシュ文字（/）を忘れる**。Cloudflareの**レート制限**は、ホームページ（ _example.com_ and _example.com/_など）のリクエストに限り、これを同等なものとして扱いますが、他のパスについては（_example.com/path/_と_example.com/path_など）、同等なものとして扱いません_。_ 末尾のスラッシュの有無に関わらず、両方のリクエストパスを一致させるために、ワイルドカード一致（ _example.com/path\*_など）を使います。
-   **クエリー文字列またはアンカーを含む**（_example.com/path?foo=bar_、または_example.com/path#section1_など）。_example.com/path_のようなルールは、_example.com/path?foo=bar_のリクエストと一致します。
-   [**IP Access ルール**](https://support.cloudflare.com/hc/articles/217074967)**をレート制限にオーバーライドする****。**
-   **ポート番号を含む**（_example.com:8443/api/_など）。レート制限製品はルール内でポート番号を考慮しないため、ルールに影響します。URLからポート番号を削除すると、レート制限ルールが予定通りにトリガーされます。

また、Cloudflare API経由で**レート制限**の設定を妨げる、一般的なエラーがいくつかあります。

-   _デコーディングがまだ実行されていない_ - これは、リクエストに_Content-Type:application/json_ヘッダーがないことを示しています。この問題を解決するには、APIリクエストにヘッダーを追加します。
-   _Ratelimit.api.not\_entitled_ - Enterpriseのお客様は、ルールを追加する前にCloudflareアカウントチームにご連絡していただく必要があります。
-   他のエラーについては、[APIドキュメント](https://api.cloudflare.com/#rate-limits-for-a-zone-errors)に記載されています。エラーが特定できない場合は、[Cloudflareサポートに連絡](https://support.cloudflare.com/hc/articles/200172476)をして、APIキーを編集した後で失敗したAPIリクエストを提示してください。

___

## 制限事項

レート制限は、ユーザ定義のレートを超えるトラフィックの急増を制限するように設計されています。このシステムは、明確な数のリクエストがオリジンサーバーに到達できるようには設計されていません。リクエストの検出と内部カウンターの更新との間に遅延が生じることがあります。この遅延（最大で数秒）により、エッジでアクション（ブロッキングやチャレンジングなど）が実行される前に、過剰なリクエストがオリジンに到達する可能性があります。

___

## 関連リソース

-   [Cloudflareレート制限を設定する](https://support.cloudflare.com/hc/articles/115001635128)
