---
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/115005254367-Cloudflare-Load-Balancing%E3%81%AE%E8%AB%8B%E6%B1%82
title: Cloudflare Load Balancingの請求
---

# Cloudflare Load Balancingの請求

## Cloudflare Load Balancingの請求

_Cloudflare Load Balancingの課金方法を説明します。_

### 本記事の内容

-   [Cloudflare Load Balancingの請求](https://support.cloudflare.com/hc/ja/articles/115005254367-Cloudflare-Load-Balancing%E3%81%AE%E8%AB%8B%E6%B1%82#12345680)
-   [Cloudflare Load Balancingの価格設定](https://support.cloudflare.com/hc/ja/articles/115005254367-Cloudflare-Load-Balancing%E3%81%AE%E8%AB%8B%E6%B1%82#12345679)
-   [Load Balancingの課金可能な使用量](https://support.cloudflare.com/hc/ja/articles/115005254367-Cloudflare-Load-Balancing%E3%81%AE%E8%AB%8B%E6%B1%82#12345681)

___

Cloudflare Load Balancingを有効にするとアカウントレベルで課金されます。 月単位のサブスクリプションに加えて、設定されたロードバランサーごとに、1か月間のDNSリクエスト（「クエリ」）の数をカウントします。 アカウント内のすべてのロードバランサーで共有される最初の500,000件のクエリは無料です：それを超える使用は、500,000クエリあたり50セントで課金され、次の500,000件のクエリに切り上げられます。

例：

-   81,451件のDNSクエリ = サブスクリプション + $0
-   511,881件のDNSクエリ = サブスクリプション + $0.50
-   2,994,155件のDNSクエリ = サブスクリプション + $2.50

CNAMEレコードを設定することでロードバランサーはサイト全体で共有できるため、最初の500,000件のクエリは、サイト（ドメイン）あたりではなく、アカウント内のすべてのアクティブなロードバランサーに基づくものです。

___

## Cloudflare Load Balancingの価格設定

Cloudflare Load Balancingのサブスクリプションは、$5～$50/月です。 金額はサブスクリプションオプションによって異なります。

オリジン、ヘルスチェックの頻度、チェック対象となる地域の数、ジオルーティングなどに基づく特定の要件を満たすようにLoad Balancingを設定できます。

$5/月のサブスクリプションを利用することにより、1アカウントあたり2つのオリジン、1プールあたり5つのオリジン、60秒のヘルスチェック、1地域からのチェックを設定することができます。簡単明瞭なロードバランシングやフェイルオーバーに最適です。同じオリジンIPアドレスを含む異なるプールは、アカウントの異なるオリジンとしてカウントされます。

追加のオリジンは、1オリジンあたり$5/月で利用できます。 20を超えるオリジンについては、[セールスチームにお問い合わせ](https://www.cloudflare.com/lp/dashboard-ss-load-balancing/)ください。

___

## Load Balancingの課金可能な使用量

使用量は、設定した負荷分散する各ホスト名のCloudflareのネームサーバーに対する権威[DNSクエリ](https://en.wikipedia.org/wiki/Domain_Name_System)としてカウントされます。

HTTP（S）サービスに対して「プロキシが実行された」（オレンジ色の雲マーク）としてロードバランサーを設定することで、権威DNSクエリの数を減らすことができます。 そうすることで、外部DNS TTLは5分に設定され、フェイルオーバーのパフォーマンスを非常に短いDNS TTLと同じにすることができます。[プロキシ環境（オレンジ色の雲マーク）と非プロキシ環境（グレー色の雲マーク）のそれぞれのメリットの詳細については、こちらをご覧ください。](https://support.cloudflare.com/hc/en-us/articles/115005138088-Load-Balancing-TTLs-and-Orange-vs-Grey-Cloud)

### Enterpriseプランのお客様の請求

Enterpriseプランのお客様の請求方法は、CloudflareのEnterpriseセールスチームとの話し合いに基づいて決まります。Enterpriseプランのお客様は、以下を含むほかの機能にもアクセスできます：

-   [すべてのCloudflareデータセンター](https://www.cloudflare.com/network/)からのヘルスチェックの実行（フェイルオーバー粒度の向上）
-   データセンターごとのステアリング（特定の場所の使用とその使用順序をオリジンに指定する）
-   5秒のヘルスチェック間隔
-   20を超えるオリジンサーバーのサポート
-   Cloudflare Enterpriseサポート（メール、電話、専任ソリューションエンジニアとのチャットによる24時間365日のサポートを含む）
