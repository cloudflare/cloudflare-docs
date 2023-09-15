---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/360050483011-Entendendo-o-suporte-para-gRPC-da-Cloudflare
title: Entendendo o suporte para gRPC da Cloudflare
---

# Entendendo o suporte para gRPC da Cloudflare

## Entendendo o suporte para gRPC da Cloudflare

_Saiba como o suporte para gRPC da Cloudflare protege seu tráfego da API._

___

## Visão geral

O protocolo gRPC foi desenvolvido pelo Google em 2015 para criar APIs eficientes com cargas úteis menores para reduzir o uso da largura de banda, diminuir a latência e fazer implementações mais rápidas.  A Cloudflare é compatível com gRPC para proteger suas APIs em todos os pontos de terminação gRPC com nuvem laranja.

A execução do tráfego gRPC na Cloudflare é compatível com a maioria dos produtos da Cloudflare, incluindo WAF, Gestão de Bots e Page Rules. O suporte para gRPC está disponível em todos os planos da Cloudflare, sem taxas adicionais.  No entanto, podem ocorrer cobranças de tráfego gRPC sobre produtos complementares, como Argo Smart Routing, WAF e Gestão de Bots. O suporte para gRPC é amplamente testado e considerado estável, mas bugs ainda são possíveis.  Informe comportamentos inesperados para o [Suporte da Cloudflare](https://support.cloudflare.com/hc/articles/200172476).

___

## Requisitos

-   Seu ponto final gRPC deve escutar na porta 443. 
-   Seu endpoint gRPC deve oferecer suporte ininterrupto a TLS e HTTP/2.
-   O HTTP/2 deve ser anunciado por ALPN.
-   Use _application/grpc_ ou _application/grpc+<message type_ (por exemplo, _application/grpc+proto_) para o cabeçalho **Content-Type** de solicitações gRPC.

___

## Limitações

Os produtos a seguir têm recursos limitados com solicitações gRPC:

-   No momento, o **Argo Tunnel** não é compatível com gRPC.
-   O **Cloudflare Access** não oferece suporte para o tráfego gRPC enviado através do proxy reverso da Cloudflare. O tráfego gRPC será ignorado pelo Access se o gRPC estiver habilitado na Cloudflare. Recomendamos desativar o gRPC para servidores de origem confidenciais protegidos pelo Access ou ativar outro meio de autenticar o tráfego gRPC para seus servidores de origem.

___

## Ativar o gRPC

Siga as instruções abaixo para ativar o gRPC:

1.  Faça login na sua conta da Cloudflare.
2.  Selecione o domínio adequado.
3.  Clique no aplicativo **Rede**.
4.  Habilite o **gRPC**.
