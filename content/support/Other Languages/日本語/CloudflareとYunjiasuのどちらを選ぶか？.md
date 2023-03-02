---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/209156358-Cloudflare%E3%81%A8Yunjiasu%E3%81%AE%E3%81%A9%E3%81%A1%E3%82%89%E3%82%92%E9%81%B8%E3%81%B6%E3%81%8B-
title: CloudflareとYunjiasuのどちらを選ぶか？
---

# CloudflareとYunjiasuのどちらを選ぶか？

## CloudflareとYunjiasuのどちらを選ぶか？

_パフォーマンスとセキュリティの向上のために、CloudflareとYunjiasuのどちらを選ぶかについて説明します。_

___

## 概要

CloudflareとBaidu（百度）の提携は、両サービスにとって多くのメリットをもたらしました。

以下に該当する場合は、[Cloudflare](https://www.cloudflare.com/plans)にサインアップすることをお勧めします：

1.  ユーザー層の大部分が、中国本土_以外_に所在している。
2.  英語で提供されるサービス（サポートを含む）を使用したい。
3.  [ICPライセンス](https://support.cloudflare.com/hc/en-us/articles/209714777-ICP-FAQ)を持っていない。
4.  HTTPSが必要である。

以下に該当する場合は、[Yunjiasu](http://su.baidu.com/)サービスを選択することをお勧めします：

1.  ユーザー層が主に中国本土に所在している。
2.  中国語で提供されるサービス（サポートを含む）を希望する。
3.  [ICPライセンス](https://support.cloudflare.com/hc/en-us/articles/209714777-ICP-FAQ)を持っている。
4.  HTTP専用のドメインである。

チャイナネットワークは共同提供であるため、ドメインは一度に1つのプロバイダーを介してのみ有効にすることができます。 現在、ドメインがCloudflareにある場合、ドメインをCloudflareアカウントから削除し、Yunjiasuアカウントに[サインアップ](http://su.baidu.com/)して、ドメインをYunjiasuアカウントに追加する必要があります。YunjiasuからCloudflareに切り替える場合も同じ手順に従います。

2つのサービス間で異なるドメインを設定する場合は、CloudflareとYunjiasuの両方のユーザーになることができます。

___

## 関連リソース

[ICP番号について理解して設定する](https://support.cloudflare.com/hc/articles/209714777)
