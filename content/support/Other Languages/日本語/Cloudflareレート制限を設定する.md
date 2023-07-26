---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/115001635128-Cloudflare%E3%83%AC%E3%83%BC%E3%83%88%E5%88%B6%E9%99%90%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B
title: Cloudflareレート制限を設定する
---

# Cloudflareレート制限を設定する

_Cloudflareレート制限を設定し、サービス妨害攻撃、ブルートフォース攻撃のログイン試行、その他の不正行為からWebサイトアプリケーションを保護します。_

### 本記事の内容

-   [概要](https://support.cloudflare.com/hc/ja/articles/115001635128-Cloudflare%E3%83%AC%E3%83%BC%E3%83%88%E5%88%B6%E9%99%90%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B#4TBnjI1OqjroF6MLXB3Wmr)
-   [分析](https://support.cloudflare.com/hc/ja/articles/115001635128-Cloudflare%E3%83%AC%E3%83%BC%E3%83%88%E5%88%B6%E9%99%90%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B#7Cy9dajZBWM5pm9aIP5mMD)
-   [プランごとのレート制限許可](https://support.cloudflare.com/hc/ja/articles/115001635128-Cloudflare%E3%83%AC%E3%83%BC%E3%83%88%E5%88%B6%E9%99%90%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B#4gd3s4xzV2xOE4CUbRIEAo)
-   [レート制限ルールのコンポーネント](https://support.cloudflare.com/hc/ja/articles/115001635128-Cloudflare%E3%83%AC%E3%83%BC%E3%83%88%E5%88%B6%E9%99%90%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B#4uDonp8FX9ARo4nzdBvXiY)
-   [レート制限のしきい値を特定する](https://support.cloudflare.com/hc/ja/articles/115001635128-Cloudflare%E3%83%AC%E3%83%BC%E3%83%88%E5%88%B6%E9%99%90%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B#o8KwUgkUml3Y7bAapvXjP)
-   [Task 1: 基本レート制限ルールを設定する](https://support.cloudflare.com/hc/ja/articles/115001635128-Cloudflare%E3%83%AC%E3%83%BC%E3%83%88%E5%88%B6%E9%99%90%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B#3UWQC5PrVScHgEGRMobRMm)
-   [Task 2: 高度な基準を設定する（BusinessとEnterpriseプランのみ）](https://support.cloudflare.com/hc/ja/articles/115001635128-Cloudflare%E3%83%AC%E3%83%BC%E3%83%88%E5%88%B6%E9%99%90%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B#5iIwkkHwcJbNRynWjrDIGb)
-   [Task 3: 高度なレスポンスを設定する（BusinessとEnterpriseプランのみ）](https://support.cloudflare.com/hc/ja/articles/115001635128-Cloudflare%E3%83%AC%E3%83%BC%E3%83%88%E5%88%B6%E9%99%90%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B#7uCtK6GPAfWDNlSHch7KBs)
-   [Task 4: バイパスオプションを設定する（Enterpriseプランのみ）](https://support.cloudflare.com/hc/ja/articles/115001635128-Cloudflare%E3%83%AC%E3%83%BC%E3%83%88%E5%88%B6%E9%99%90%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B#3rCyCwZTjnPl3brIt7Ytrg)
-   [ルール実行の順序](https://support.cloudflare.com/hc/ja/articles/115001635128-Cloudflare%E3%83%AC%E3%83%BC%E3%83%88%E5%88%B6%E9%99%90%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B#rule-execution-order)
-   [関連リソース](https://support.cloudflare.com/hc/ja/articles/115001635128-Cloudflare%E3%83%AC%E3%83%BC%E3%83%88%E5%88%B6%E9%99%90%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B#516XYZwx0Mdhh7hLMg60iT)

___

## 概要

Cloudflare**レート制限**は、特定のURLに対する過剰なリクエストレート、またはドメイン全体に対する過剰なリクエストレートを自動的に特定し、軽減します。リクエストレートは、個々のCloudflareデータセンターでローカルに計算されます。**レート制限**の用途は、[DDoS](https://www.cloudflare.com/learning/ddos/glossary/denial-of-service/)攻撃対策、[ブルートフォース攻撃](https://www.cloudflare.com/learning/bots/brute-force-attack/)対策、フォーラム検索、APIコール、オリジンでのデータベース集中操作を含むリソースへのアクセス制限が最も一般的です。

個々のIPv4アドレスまたはIPv6 /64 IP範囲がルールのしきい値を超えると、クライアントがリクエストの送信を再開できるタイミングを示す **Retry-After** ヘッダーを含むHTTP 429レスポンスで、オリジンWebサーバーへのリクエストがさらにブロックされます。

___

## 分析

**分析**\>**セキュリティ**でレート制限分析を表示します。レート制限分析では、実線はシミュレートされたリクエストと一致するトラフィックを表し、点線は実際にブロックされたリクエストを表します。レート制限ルールで生成されたログは、[Cloudflare ログ](/logs/)を通じてEnterpriseプランのお客様にだけ表示されます。

Cloudflareは、ブロックされたリクエストに対してHTTP429エラーを返します。ロケーションごとにブロックされたリクエストの詳細は、**分析**\>**Traffic**で利用可能な分析ダッシュボード上の**ステータスコード**で、Enterpriseのお客様に提供されます。

___

## プランごとのレート制限許可

レート制限ルール数の上限は、ドメインのプランによって異なります：

| プラン | ルール数 | アクション | アクション時間 | リクエスト期間 |
| --- | --- | --- | --- | --- |
| Free | 1 | ブロック | 1分または1時間 | 10秒または1分 |
| Pro | 10 | ブロック、従来型のCAPTCHA、JSチャレンジ、マネージドチャレンジ、ログ | 1分または1時間 | 10秒または1分 |
| Business | 15 | ブロック、従来型のCAPTCHA、JSチャレンジ、マネージドチャレンジ、ログ | 1分、1時間、または24時間 | 10秒、1分または10分 |
| Enterprise | 100 | ブロック、従来型のCAPTCHA、JSチャレンジ、マネージドチャレンジ、ログ | 10秒から86400秒（24時間)の間で入力された時間 | 10秒から3600秒（1時間）の間で入力された任意の値 |

Cloudflareレート制限は、ドメインのClouflareプランによって、複数のレベルの設定管理をサポートしています。次の表では、ご利用中のプランでできることをまとめています：

| 
サイト

 | 

タスク

 | 

利用できるプラン

 |
| --- | --- | --- |
| 

1

 | 

基本レート制限ルールを設定

 | 

全プラン

 |
| 

2

 | 

高度な条件を設定

 | 

BusinessプランとEnterpriseプラン

 |
| 

3

 | 

高度なレスポンスを設定

 | 

BusinessプランとEnterpriseプラン

 |
| 

4

 | 

バイパスオプションを設定

 | 

Enterpriseプラン

 |

___

## レート制限ルールのコンポーネント

レート制限ルールは3つの異なるコンポーネントから構成されています。次のコンポーネントをクリックして詳細をご覧ください：

受信リクエストは次項と一致するものとします：

#### **リクエストパス**

例：

-   http://example.com/example
-   http://example.com/example/\*

リクエストパスは、アルファベットの大文字と小文字が区別されません。パターンは、クエリ文字列 (_?_）またはアンカー (_#_)の後のコンテンツと一致しません。アスタリスク (_\*_) は、空のシーケンスを含め、どの文字のシーケンスとも一致します。例：

-   \*.example.com/\* は、example.comのサブドメインでなら、どのパスでも一致します
-   \*example.com/example.html は、example.com の example.htmlと一致し、example.com\*のサブドメインはどれでも、
-   サイトのページと一致します。

_example.com/path_ のリクエストは、_example.com/path/_と同じではありません。 このルールで唯一の例外はホームページで、_example.com_ は _example.com/_と一致します。

#### **リクエストスキーム**

_HTTP_ または_HTTPS_です。指定されるものがない場合、両方が一致し、ルールには_\_ALL\__と表示されます。

#### **リクエスト方法**

_POST_ （投稿）または _GET_（取得）です。指定されるものがない場合、全ての方法が一致し、ルールには_\_ALL\__と表示されます。

#### **（任意）オリジンレスポンスコード**

例えば、HTTP401または403がオリジンWebサーバーから返される時だけ、**レート制限**ルールを適用します。レスポンスコード基準を満たすトリガールールは、オリジンレスポンスコードにかかわらず、クライアントからの後続のリクエストをブロックします。

ルールは、同じクライアントからのリクエスト全てで、その数も期間も一致することがあります。

#### **リクエストの数**

最低でもリクエストを2つ指定します。1つのリクエストをブロックする場合は、パスを利用不可能にします。例えば、オリジンWebサーバーが403を返すように設定します。

#### **リクエスト期間**

クライアントのリクエストが特定期間中にしきい値を超えると、ルールがトリガーされます。

 

ルール緩和は次の要素で構成されます：

#### **緩和アクション**

レート制限アクションは、**プランごとのレート制限許可**で述べた通り、ドメインプランに基づいています。

-   **ブロック** **\-** しきい値を超えると、CloudflareがHTTP 429 エラーを出します。
-   **従来型のCAPTCHA** **\-**訪問者は、CAPTCHAチャレンジで正解する必要があります。正解した場合、Cloudflareがリクエストを許可します。
-   **JS チャレンジ** **\-**訪問者はCloudflare JavaScriptチャレンジに正解する必要があります。正解すると、Cloudflareがリクエストを許可します。
-   **ログ -** リクエストは [Cloudflare ログ](https://support.cloudflare.com/hc/articles/216672448)に記録されます。これは、本番で適用される前にルールをテストするのに役立ちます。

#### **禁止期間**

しきい値よりも短いタイムアウトを設定すると、APIが自動的にしきい値と同じになるようにタイムアウトを増やします。

**レート制限**訪問者には、[カスタムエラーページ](https://support.cloudflare.com/hc/articles/200172706)が特定されない場合、既定のHTMLページが表示されます。さらに、BusinessプランとEnterpriseプランのお客様は、ルールそのものでレスポンスを特定できます。下記の_Task 3：高度なレスポンスを設定する_をご覧ください。

___

## レート制限のしきい値を特定する

Cloudflare**レート制限**の一般的なしきい値を特定するには、キャッシュされていない24時間のWebサイトリクエスト数を同じ24時間のユニーク訪問者数で割ります。そして、これを訪問の推定平均時間（分）で割ります。最後に４（またはそれ以上）を掛けて、1分間あたりの推定しきい値を決めます。攻撃のほとんどが典型的なトラフィックレートを１桁上回るため、4より上の値は問題ありません。

特定のURLへのURLレート制限を識別するために、特定のURLへの24時間分のキャッシュされていないリクエストとユニーク訪問者数を使用します。ユーザーレポートとご自身のモニタリングに基づいてしきい値を調整します。

___

## Task 1: 基本レート制限ルールを設定する

Cloudflare **レート制限**ルールの一般的な2つのルールを作成する方法についてクリックして詳細をご覧ください。

**レート制限**では、**ログインを保護する**機能をワンクリックで設定でき、5分以内に6 POST（投稿）以上のリクエストを送信する場合、15分間クライアントをブロックするというルールを作成できます。これはブルートフォースのほとんどの試行をブロックします。

1.  Cloudflareアカウントにログインします。
2.  保護するドメインを選択します。
3.  **セキュリティ > WAF > レート制限ルール**の順に進みます。
4.  **レート制限**の下で、**ログインを保護する**をクリックします。
5.  ダイアログが表示される「**ログインを保護する**」で、**ルール名**と「**ログインURLを入力する**」を入力します。
6.  「**保存**」（save）をクリックします。
7.  **レート制限**ルールの一覧に、**ルール名**が表示されます。

1\. Cloudflareダッシュボードにログインします。

2\. ドメインを選択します。

3\. **セキュリティ**\>**WAF**\>**レート制限ルール**の順に進みます。

4\. **レート制限ルールを作成する**をクリックします。新しいルールの詳細を特定するところで、ダイアログが開きます。

![レート制限ルールポップアップダイアログを例示のルール設定で作成します。そのルールでは、1時間で1分あたり150リクエストを超えるIP アドレスから来るリクエストをブロックします。](/images/support/previous-rate-limiting-create-rule.png)

5\. わかりやすい「**ルール名**」を入力します。

6\. 「**URLと一致するトラフィックの場合**」（If Traffic Matching the URL）では、ドロップダウンからHTTPスキームとURLを選択します。

7\. 「**同じIPアドレスからの超過**」（from the sme IP address exceeds）では、サンプリング期間のリクエスト数に、1より大きい整数を入力します。

8\. 「**時間ごとのリクエスト**」（requests per）については、サンプリング期間（リクエストがカウントされる期間）を選択します。Enterpriseプランのドメインは、手動で10秒から3600秒（1時間）までの任意の時間を入力できます。

9\. 「**次に**」(Then）ドロップダウンでは、ご利用中のプランで利用できるアクションを1つ選びます。詳細については、上記の_レート制限ルールのコンポーネント_にある_ルール緩和_セクションを確認してください。

10._ブロック_または_ログ_を選択した場合、**訪問者からのトラフィックと一致**させるために、しきい値がトリガーされた場合に、オプションを適用する時間（期間）を選択します。Enterprise プランのドメインは、10秒から86400秒（24時間）の間で任意の値を入力できます。

11.新しいルールをアクティブ化するために、**保存してデプロイする**をクリックします。

新規ルールがレート制限ルール一覧に表示されます。

一般的に、低いしきい値を設定する際は：

1.  既存のルールをそのままにし、低いしきい値で新しいルールを追加します。
2.  新しいルールが設定されたら、古いルールを削除する前に古いルールのアクション期間が経過するのを待ちます。

（正当なクライアントのブロックが原因で）高いしきい値を設定する際は、既存のルール内でしきい値を増やします。

___

## Task 2: 高度な基準を設定する（BusinessとEnterpriseプランのみ）

**高度な基準**オプションでは、HTTPメソッド、ヘッダーレスポンス、レート制限ルールと一致するオリジンレスポンスコードを設定します。

新規のルールまたは既存のルールに高度な基準を設定するには、次の手順にしたがってください。

1\. **高度な基準**を拡張します。

![レート制限ルールの高度な基準を設定する際に利用可能なフィールド。](/images/support/previous-rate-limiting-advanced-criteria.png)

2\. **メソッド**ドロップダウンから値を選択します。デフォルト値は、すべてのHTTPメソッドと一致するように_ANY_となっています。

3\. **HTTPレスポンスヘッダー**でフィルターをかけます。「**ヘッダーレスポンスフィールドを追加する**」をクリックし、オリジンWebサーバーから戻されたヘッダーを含めます。

**CF-Cache-Status**ヘッダーは、デフォルトで表示されます。そのため、Cloudflareはこうしたリソースのレート制限ではなく、キャッシュされたリソースを提供します。キャッシュされたレート制限リソースについても、**X**ボタンをクリックするか、**キャッシュされたアセットにもレート制限を適用する**を有効にして、このヘッダーを削除します。

**HTTPレスポンスヘッダー**で、複数のヘッダーがある場合、_AND_ブール論理が適用されます。ヘッダーを除外する場合は、_等しくない_オプションを使用します。各ヘッダーは大文字と小文字を区別しません。

4.**オリジンレスポンスコード**で、一致する各HTTPレスポンスコードの数値を入力します。カンマを使って、二つ以上のHTTPコードを区切ります。（たとえば、`401, 403` ）。

5\. （任意）ご利用プランに基づき、追加のレート制限機能を設定します。

6\. **保存とデプロイ**をクリックします。

___

## Task 3: 高度なレスポンスを設定する（BusinessとEnterpriseプランのみ）

**高度なレスポンスオプション**は、ルールのしきい値を超えた時にCloudflareによって戻される情報フォーマットを設定します。静的なプレーンテキストまたはJSONコンテンツを返したい場合に、**高度なレスポンス**を使います。

プレーンテキストまたはJSONレスポンスの設定：

1.**高度なレスポンス**を拡張します。

![レート制限ルールに関して高度なレスポンスを設定する際の利用可能なフィールド。](/images/support/previous-rate-limiting-advanced-response.png)

2\. デフォルト以外の**レスポンスタイプ**のフォーマット：_カスタムJSON_または_カスタムTEXT_を選択します。

3\. プレーンテキストまたはJSONレスポンスを入力します。最大レスポンスサイズは、32KBです。

4\. （任意）ご利用のプランに基づき、追加のレート制限機能を設定します。

6\. **保存とデプロイ**をクリックします。

### カスタムHTMLページまたはリダイレクトを使う

カスタムHTMLページを表示したい場合は、ダッシュボードで、HTTP 429エラー（「リクエストが多すぎます」）のためのカスタムページを設定します。**レスポンスタイプ**で（フィールドのデフォルト値）「デフォルトのCloudflareレート制限ページ」を選択した場合は、Cloudflareがこのページを表示します。

この方法を使って、レート制限が適用されたクライアントを特定のURLにリダイレクトできます：

1\. 表示したいページのURLにリダイレクトするHTMLページをサーバー上に作成します。以下の例のように、[メタデータ更新](https://www.w3.org/TR/WCAG20-TECHS/H76.html)タグをページコンテンツに含むようにします。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;!doctype html&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;html&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;head&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &lt;meta charset=&quot;utf-8&quot;&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &lt;title&gt;カスタム RLページ&lt;/title&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &lt;meta http-equiv=&quot;refresh&quot; content=&quot;0; url='https://yourzonename/block'&quot; /&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;/head&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;body&gt; &lt;/body&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;/html&gt;</span></div></span></span></span></code></pre>{{</raw>}}

作成したページのパブリックURLをメモします。

2\. Cloudflareダッシュボードで、 **アカウントホーム** > **設定** > **カスタムページ**にアクセスします。

3\. **429 エラー**の下で、**カスタムページ**をクリックします。

4\. 自身のサーバーで作成したページのURLを入力します。—ページにはメタデータ更新タグが含まれています—**公開**をクリックします。

プレーンテキストまたはJSONコンテンツを返したいけれども、レスポンスが32kbよりも大きいときも、同じアプローチをとります。この場合、リダイレクトされるURLは、表示したいプレーンテキストのURLか、JSONリソースのURLになります。

**注：**

-    レート制限 ルールは、429エラーのためにカスタムHTMLページに含んだリダイレクトURLと一致してはいけません。
-   サービス拒否攻撃から保護するには、リダイレクトするページにCloudflareがキャッシュしたリソースのみを含んでいる必要があります。

___

## Task 4: バイパスオプションを設定する（Enterpriseプランのみ）

**バイパス**によって許可リストまたは例外が作成され、レート制限が一致しても、特定のURLセットにアクションが適用されないようになります。次の手順で**バイパス**を設定します。

1\. **バイパス**を拡張します。

2\. **URLに関するバイパスルール**で、レート制限ルールから免除するために、このURLを入力します。URLの行に各URLを入力します。URLで指定されているHTTPまたはHTTPSは、ルールが保存されると自動的に消去され、代りにHTTPとHTTPSの両方に適用されます。

![レート制限ルール（各行1つ）について、バイパス用に２つのURLを設定します。](/images/support/previous-rate-limiting-bypass.png)

3\. （任意）ご利用のプランに基づき、追加のレート制限機能を設定します。

4\. **保存とデプロイ**をクリックします。

___

## ルール実行の順序

**ユースケース１**：リクエストが以下の両方のルールと一致する場合、

-   ルール１：_test.example.com_と一致
-   ルール２：_\*.example.com_と一致

または、

-   ルール１：_\*.example.com\*_と一致
-   ルール２：_test.example.com_と一致

ルール2が最初にトリガーされます。これはルール2が後で作成されたためです。

**ユースケース２**：ドメインの最後にあるアステリスク（\*）を削除すると、最後に作成されたルールに沿って実行されます**。**

-   ルール１：_test.example.com_と一致
-   ルール２：_\*.example.com_と一致

リクエストが両方のルールと一致する場合、ルール2が最初にトリガーされます。

-   ルール１：_\*.example.com_と一致
-   ルール２：_test.example.com_と一致

リクエストが両方のルールと一致する場合、ルール2が最初にトリガーされます。

___

## 関連リソース

-   [ELS（Enterprise Log Share）でレート制限はどのように報告されますか？](/logs/reference/log-fields)
-   [Cloudflareレート制限のトラブルシューティング](https://support.cloudflare.com/hc/articles/115000546328)
-   [Cloudflare APIを使ったレート制限設定](https://api.cloudflare.com/#rate-limits-for-a-zone-properties)
