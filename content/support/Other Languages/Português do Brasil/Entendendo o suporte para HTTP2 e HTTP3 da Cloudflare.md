---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/200168076-Entendendo-o-suporte-para-HTTP-2-e-HTTP-3-da-Cloudflare
title: Entendendo o suporte para HTTP2 e HTTP3 da Cloudflare
---

# Entendendo o suporte para HTTP/2 e HTTP/3 da Cloudflare

## Entendendo o suporte para HTTP/2 e HTTP/3 da Cloudflare

_Saiba como a Cloudflare oferece suporte a HTTP/2 e HTTP/3 para acelerar seu site sem exigir alterações na base de código existente._

___

## Visão geral

O HTTP/2 e o HTTP/3 aceleram o carregamento da página e são gratuitos para todos [planos da Cloudflare](http://www.cloudflare.com/plans).  O HTTP/2 é habilitado por padrão e requer um [certificado SSL na rede de borda da Cloudflare](https://support.cloudflare.com/hc/articles/203295200#h_036e2e20-96d8-4199-bb1f-0fbb41b5cdd0). Configure HTTP/2 e HTTP/3 por meio do aplicativo **Network** da Cloudflare. Domínios em planos gratuitos não podem desativar o HTTP/2.

Um navegador e um servidor web negociam automaticamente o protocolo mais alto disponível. Assim, o HTTP/3 tem precedência sobre o HTTP/2. 

Para determinar o protocolo usado para sua conexão, digite _example.com_/cdn-cgi/trace a partir de um navegador Web ou cliente e substitua _example.com_ com seu nome de domínio. Várias linhas de dados são retornadas. Se _http=h2_ aparecer nos resultados, a conexão ocorreu por HTTP/2. Outros valores possíveis são _http=http2+quic/99_ para HTTP/3 e _http=http/1.x_ para HTTP/1.x.

___

O HTTP/2 melhora os tempos de carregamento da página por meio de:

-   Multiplexing de conexão – recupera vários recursos em uma única solicitação de rede. As respostas são enviadas quando os recursos estão disponíveis para evitar retardar a renderização da página.
-   Compactação de cabeçalho HTTP – comprime cabeçalhos e simplifica solicitações HTTP para evitar reenviar cabeçalhos.
-   Push do servidor HTTP/2 – para aumentar a velocidade de carregamento da página, a Cloudflare fornece recursos adicionais para um cliente armazenar em cache sem aguardar solicitações adicionais.

Observação:

-   Nem todos os navegadores suportam HTTP/2 e usam HTTP 1.x em vez disso.
-   O multiplexing de conexão acontece por domínio.

___

## HTTP/3

O HTTP/3 permite conexões rápidas, confiáveis e seguras.  O HTTP/3 criptografa o transporte da Internet por padrão usando um protocolo do Google chamado QUIC.  Habilite o HTTP/3 por meio do aplicativo **Network** da Cloudflare.

Para mais informações, consulte a [documentação do desenvolvedor do HTTP/3](/http3/).

___

## Server Push

O recurso Server Push permite que os servidores Web de origem enviem recursos para o cliente ou navegador Web sem esperar para analisar HTML para referências a ativos adicionais, como imagens, folhas de estilo, JavaScript etc.  O Server Push evita o ciclo de solicitação e resposta HTTP usual para cada script ou folha de estilo em uma página. O Server Push está disponível para todos os planos da Cloudflare.

O Server Push extrai referências de URI dentro do parâmetro rel=preload do cabeçalho **Link** do seu servidor de origem. Esses URIs adicionais são então fornecidos ao cliente.  Os cabeçalhos **Link** de exemplo incluem:

`Link: </images/image.png>; rel=preload;`

`Link: </css/main.css>; rel=preload;`

O Server Push é limitado a 50 ativos por página e 100 por conexão.

___

## Recursos relacionados

-   [HTTP/3: o passado, o presente e o futuro](https://blog.cloudflare.com/http3-the-past-present-and-future/)
-   [O QUICening](https://blog.cloudflare.com/the-quicening/)
-   [Aproveite o QUIC e o Rust!](https://blog.cloudflare.com/enjoy-a-slice-of-quic-and-rust/)

Informações de suporte do navegador: 

-   [HTTP/2](http://caniuse.com/#feat=http2) 
-   [HTTP/3](https://caniuse.com/#feat=http3)
