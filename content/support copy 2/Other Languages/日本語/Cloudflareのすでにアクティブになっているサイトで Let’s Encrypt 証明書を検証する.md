---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/214820528-Cloudflare%E3%81%AE%E3%81%99%E3%81%A7%E3%81%AB%E3%82%A2%E3%82%AF%E3%83%86%E3%82%A3%E3%83%96%E3%81%AB%E3%81%AA%E3%81%A3%E3%81%A6%E3%81%84%E3%82%8B%E3%82%B5%E3%82%A4%E3%83%88%E3%81%A7-Let-s-Encrypt-%E8%A8%BC%E6%98%8E%E6%9B%B8%E3%82%92%E6%A4%9C%E8%A8%BC%E3%81%99%E3%82%8B
title: Cloudflareのすでにアクティブになっているサイトで Let’s Encrypt 証明書を検証する
---

# Cloudflareのすでにアクティブになっているサイトで Let’s Encrypt 証明書を検証する

## Cloudflareのすでにアクティブになっているサイトで Let’s Encrypt 証明書を検証する

_アクティブなCloudflareサイトのLet's Encrypt SSL証明書を認証する方法を説明します。_

___

## 概要

このガイドは、こちらのドキュメントに記述される公式Let's Encryptのクライアントで検証するために、Webrootの方法をどう使うかについて詳しい補足説明が記載されています：[https://letsencrypt.readthedocs.org/en/latest/using.html#webroot](https://letsencrypt.readthedocs.org/en/latest/using.html#webroot)

なお、Let's Encrypt クライアントによってACME認証に使われるデフォルトの方法は、DVSNIの方法を活用します。当社のEdgeでSSL (TLS)を終了するため、これはCloudflareが有効になっているドメインでは失敗となります。ACMEサーバーはクライアントがオリジンでクライアントが提示する証明書を見ることはありません。DNSまたはHTTPといった代替のACME検証方法を使用すると、Cloudflareが有効化されたときに、正常に完了します。

___

## HTTP認証

Cloudflareで、すでにアクティブになっているサイトで最初にLet’s Encryptを設定する際、正しく検証する、証明書と秘密鍵のペアを取得することを必要とする全てが、検証するためのWebrootメソッドを使用します。

1.  Let’s Encryptクライアントをダウンロードし、ダウンロードディレクトリに変更します：


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">git clone https://github.com/letsencrypt/letsencrypt</span></div></span></span></span></code></pre>{{</raw>}}


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cd letsencrypt/</span></div></span></span></span></code></pre>{{</raw>}}
    
2.  自動インストールのスクルプとを実行します：  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">./letsencrypt-auto</span></div></span></span></span></code></pre>{{</raw>}}
    
3.  `letsencrypt` クライアントを`Certonly`コマンドと`--webroot` フラッグとともに使用して、HTTP認証を用いた証明書/キーのペアを認証、および取得することができるようになりました。コマンドの例は次のようになります：  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/root/.local/share/letsencrypt/bin/letsencrypt certonly --webroot --webroot-path /usr/share/nginx/html/ --renew-by-default --email email@host.tld --text --agree-tos -d example.tld -d www.example.tld</span></div></span></span></span></code></pre>{{</raw>}}
    
      
    どこで  
    
    **\--webroot-path**
    
    サイトが位置する（例で使われるNGINX）サーバー上のディレクトリ
    
    **\--renew-by-default**
    
    ドメインが以前に取得した証明書のスーパーセットである時、デフォルトで更新を選択する
    
    **\--email**
    
    登録と回復についての連絡先にしようされるEメール
    
    **\--text**
    
    テキスト出力を表示する
    
    **\--agree-tos**
    
    Let’s Encryptのサブスクライバー契約に同意する
    
    **\-d**
    
    ホスト名を特定して、SANに追加する。
    
4.  この認証方法を正しく完了すると、次のようなテキストが表示されます：  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">無事完了です！証明書とチェーンが/etc/letsencrypt/live/example.tld/fullchain.pemに保存されました。証明書の有効期限は2016-03-03までです。将来、証明書の新バージョンを取得するために、もう一度Let's Encryptを実行します。 </span></div></span></span></span></code></pre>{{</raw>}}
    
5.  なお、証明書とキーの両方が`/etc/letsencrypt/live/example.tld/` に保存されます。両方が取得されたら、手動で仮想ホストをアップデートしてこのキー／証明書のペアを使います。

Cloudflareのダッシュボードで必ずドメインのページルールをチェックし、認証URLのリクエストがリダイレクトされるか、HTTPSを介してのみアクセス可能となる方法がないことを確認してください。

___

## 更新

更新時間については、`letsencrypt更新`[コマンド](https://letsencrypt.readthedocs.org/en/latest/using.html#renewal)を使うと、証明書が、Cloudflare設定が変更することなく、正しく更新されるはずです。条件は次の通りです：

-   更新のためにletsencryptクライアントが使用する.conf ファイルには、`認証システム=Webroot`特定があります。
-   認証URLは、HTTP経由でアクセス可能です。
-   このURLに適用されるURLはありません。

また、上記の手順を繰り返すと、新しい証明書も発行されます。
