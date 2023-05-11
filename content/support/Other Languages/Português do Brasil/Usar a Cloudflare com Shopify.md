---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/203464660-Usar-a-Cloudflare-com-Shopify
title: Usar a Cloudflare com Shopify
---

# Usar a Cloudflare com Shopify

## Usar a Cloudflare com Shopify

_Saiba a melhor forma de configurar sua conta pessoal da Cloudflare como comerciante da Shopify, além dos benefícios de segurança e desempenho da Cloudflare para a Shopify._

___

## Visão geral

A Cloudflare faz parceria com a Shopify para fornecer a todos os sites de comerciantes da Shopify os benefícios de desempenho e segurança da Cloudflare. Os comerciantes da Shopify também podem usar sua própria conta da Cloudflare para proxy de tráfego da Web por meio da Cloudflare com um plano Empresarial. A habilitação da Cloudflare com sua própria conta, além dos benefícios da Cloudflare para a Shopify, é chamada de laranja a laranja (O2O). A O2O aplica suas configurações de segurança e as da Shopify.

![Diagrama de como a O2O funciona para comerciantes da Shopify na Cloudflare.](/support/static/hc-ext-shopify_o2o.png)

___

## Ativar a O2O para o site da Shopify

A habilitação da O2O está disponível apenas no plano Empresarial da Cloudflare.

Para habilitar a O2O em sua conta, você precisa de um registro de DNS A ou CNAME que aponte o domínio da sua loja para o domínio shops.myshopify.com. Coloque o registro em nuvem laranja.

Depois de adicionar o registro de DNS com proxy ativado, entre em contato com sua equipe de conta para habilitar a O2O no domínio da sua loja.

___

## Melhores práticas

Quando usados com O2O, certos recursos da Cloudflare podem interromper o fluxo de tráfego para sua loja Shopify ou exibir dados incorretos para seus visitantes, o que significa que você deve:

-   Não utilizar os seguintes recursos da Cloudflare:
    -   [Cache de HTML](/cache/)
    -   [Regras de firewall personalizadas](/firewall/)
    -   [Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128)
    -   [Argo Smart Routing](https://support.cloudflare.com/hc/articles/115000224552)
    -   [Balanceamento de Carga](/load-balancing/)
    -   [IPv6](https://support.cloudflare.com/hc/articles/229666767)
-   Tenha cuidado com os seguintes recursos da Cloudflare:
    -   [Page Rules](https://support.cloudflare.com/hc/articles/218411427): Page Rules configuradas incorretamente que correspondem ao subdomínio usado pelo Shopify podem bloquear ou distorcer o fluxo de visitantes de comércio eletrônico em seu site.
    -   [Workers](/workers/): de modo semelhante ao Page Rules, o Workers pode interromper o fluxo de tráfego para o seu site e, consequentemente, reduzir a receita. Insira o Workers com cautela. É aconselhável excluir o subdomínio usado com a Shopify da rota do Workers.
    -   [Registros DNS CAA](/ssl/edge-certificates/caa-records/): a Shopify emite certificados SSL/TLS para domínios de lojistas usando a Let's Encrypt. Se você adicionar algum registro de DNS CAA, deverá selecionar a Let's Encrypt como autoridade de certificação (CA) ou as conexões HTTPS poderão falhar.

___

## Para mais ajuda

Se você é um comerciante da Shopify e está configurando sua própria conta da Cloudflare, entre em contato com sua equipe de conta ou com o Suporte da Cloudflare para obter ajuda na resolução de problemas. A Cloudflare recorrerá à Shopify se houver problemas técnicos que a Cloudflare não possa resolver.

-   [Entrando em contato com o suporte da Cloudflare](https://support.cloudflare.com/hc/pt-br/articles/200172476-Contacting-Cloudflare-Support)
