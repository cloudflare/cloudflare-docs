---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/360050483011-Cloudflare%E3%81%AEgRPC%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%82%92%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B
title: CloudflareのgRPCサポートを理解する
---

# CloudflareのgRPCサポートを理解する

## CloudflareのgRPCサポートを理解する

_CloudflareのgRPCサポートがAPIトラフィックを保護する方法を説明します。_

### 本記事の内容

-   [概要](https://support.cloudflare.com/hc/ja/articles/360050483011-Cloudflare%E3%81%AEgRPC%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%82%92%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B#h_6Q6zlawxNIvWIARpDGxVXW)
-   [要件](https://support.cloudflare.com/hc/ja/articles/360050483011-Cloudflare%E3%81%AEgRPC%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%82%92%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B#h_1Z6TA2y1ycBzavrd5n9yss)
-   [制限事項](https://support.cloudflare.com/hc/ja/articles/360050483011-Cloudflare%E3%81%AEgRPC%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%82%92%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B#h_o7k9rF9QcJEBavDBTADzb)
-   [gRPCの有効化](https://support.cloudflare.com/hc/ja/articles/360050483011-Cloudflare%E3%81%AEgRPC%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%82%92%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B#h_o7k9rF9QcJEBavDBTADzb)

___

## 概要

gRPCプロトコルは、2015年にGoogleが帯域幅の使用量削減、遅延の減少、高速実装のために小さくしたペイロードで効果的なAPIを構築するために開発されました。CloudflareはgRPCがオレンジ色の雲マークのgRPCエンドポイントで、APIを保護できるようにサポートを提供しています。

Cloudflareで実行するgRPCトラフィックは、WAF、ボット管理、Page Ruleを含む、ほとんどのCloudflare製品との互換性があります。gRPCサポートは、Cloudflareの全プランで追加料金なくご利用いただけます。ただし、Argo Smart Routing、WAF、ボット管理などアドオン製品では、gRPCトラフィックに料金が発生します。gRPCサポートは、広くテストされており、安定していると考えられていますが、バグの可能性は依然としてあります。予期しない動作があった場合は、[Cloudflareサポート](https://support.cloudflare.com/hc/articles/200172476)まで報告してください。

___

## 要件

-   gRPCエンドポイントは、ポート443をリッスンする必要があります。
-   ご利用のgRPCエンドポイントが、TLSとHTTP/2をサポートしている必要があります。
-   HTTP/2は、ALPNでアドバタイズされる必要があります。
-   gRPCリクエストの**Content-Type**ヘッダーには、_application/grpc_または、_application/grpc+<message type_（例：_application/grpc+proto_）を使ってください。

___

## 制限事項

次の製品では、gRPCリクエストの機能が制限されています。

-   **Argo Tunnel**は現在gRPCをサポートしていません。
-   **Cloudflare Access**は、Cloudflareのリバースプロキシ経由で送信されたgRPCトラフィックをサポートしていません。CloudflareでgRPCが有効になっている場合、gRPCトラフィックはAccessで無視されます。Accessで保護されている、機密性の高いオリジンサーバーでgRPCを無効にするか、オリジンサーバーへのgRPCトラフィックを認証する別の方法を有効にすることをお勧めします。

___

次の手順に従うと、gRPCを有効にできます。

1.  Cloudflareアカウントにログインします。
2.  適切なドメインを選択します。
3.  **Network**（ネットワーク）アプリをクリックします。
4.  **gRPC**に切り替えます。
