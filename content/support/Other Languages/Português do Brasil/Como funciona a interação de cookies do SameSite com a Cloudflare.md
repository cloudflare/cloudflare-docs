---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/360038470312-Como-funciona-a-intera%C3%A7%C3%A3o-de-cookies-do-SameSite-com-a-Cloudflare
title: Como funciona a interação de cookies do SameSite com a Cloudflare
---

# Como funciona a interação de cookies do SameSite com a Cloudflare

## Como funciona a interação de cookies do SameSite com a Cloudflare

_Conheça o cookie SameSite e veja como ele protege contra a falsificação de solicitações entre sites (CSRF)._

___

## Visão geral

[O cookie SameSite](https://www.chromium.org/updates/same-site) do Google Chrome altera a maneira como o Google Chrome lida com o controle SameSite. O Google impõe o SameSite para se proteger de cookies de marketing que rastreiam usuários e da falsificação de solicitações entre sites (CSRF) que permite que invasores roubem ou manipulem seus cookies.  

O cookie SameSite possui 3 modos diferentes:

-   **Strict**: os cookies são criados por um elemento primário (o domínio visitado). Por exemplo, um cookie primário é criado pelo Cloudflare ao acessar o site Cloudflare.com.
-   **Lax**: os cookies são enviados apenas para o nível superior do domínio (por exemplo, _\*.foo.com_). Por exemplo, se alguém (_blog.naughty.com_) vinculou uma imagem (_img.foo.com/bar.png_), o cliente não envia um cookie para _img.foo.com_ porque não ele não é o elemento primário nem o elemento principal.
-   **None**: os cookies são enviados com todas as solicitações.

Configurações do SameSite para [cookies Cloudflare](https://support.cloudflare.com/hc/articles/200170156):

| Política de cookies da Cloudflare | Configuração SameSite | Somente HTTP |
| --- | --- | --- |
| \_\_cfduid | SameSite=Lax | Não |
| \_\_cf\_bm | SameSite=None; Secure | Sim |
| cf\_clearance | SameSite=None; Secure | Sim |
| \_\_cfruid | SameSite=None; Secure | Sim |
| \_\_cflb | SameSite=Lax | Não |

___

## Problemas conhecidos sobre cookies SameSite e cf\_clearance

Quando um desafio [Cloudflare CAPTCHA](https://support.cloudflare.com/hc/articles/200170136) ou JavaScript é resolvido como para uma [**Regra de firewall**](https://support.cloudflare.com/hc/articles/360016473712) ou [**Regra de acesso via IP**](https://support.cloudflare.com/hc/articles/217074967), um cookie **cf\_clearance** é definido no navegador do cliente. O cookie _cf\_clearance_ tem uma vida útil padrão de 30 minutos, mas é configurado pelo [**tempo de validade do desafio**](https://support.cloudflare.com/hc/articles/200170136#2dwCrNWIMnNJDP6AVjEQ3e) na guia **Configurações** do aplicativo Cloudflare **Firewall**.

O Cloudflare usa o **SameSite**\=_None_ desde o cookie **cf\_clearance** para que as solicitações de visitantes de diferentes hostnames não sejam atendidas com desafios ou erros posteriores. Quando usado, o **SameSite**\=_None_ deve atuar em conjunto com o sinalizador _Secure_.

O uso do sinalizador _Secure_ requer o envio do cookie via conexão HTTPS. Por padrão, o cookie **cf\_clearance** muda para **SameSite**\=_Lax_ se você usar HTTP em alguma parte do seu site, podendo causar problemas.

Se estiver usando HTTP em alguma parte do site, o cookie **cf\_clearance** muda para **SameSite**\=_Lax_, o que pode fazer com que o site não funcione corretamente. Para resolver o problema, transfira o tráfego do site para HTTPS. O Cloudflare oferece dois recursos que podem ajudar:

-   [**Automatic HTTPS Rewrites**](https://support.cloudflare.com/hc/articles/227227647), e 
-   [**Always Use HTTPS**](https://support.cloudflare.com/hc/articles/204144518#h_a61bfdef-08dd-40f8-8888-7edd8e40d156).

___

## Recursos relacionados

-   [Saiba mais sobre o cookie SameSite](https://web.dev/samesite-cookies-explained/)
-   [Como funcionam os cookies da Cloudflare](https://support.cloudflare.com/hc/articles/200170156)
-   [Perguntas frequentes sobre o DNS da Cloudflare](https://support.cloudflare.com/hc/articles/204144518#h_999722138611548960019807)
-   [Entenda o Automatic HTTPS Rewrites](https://support.cloudflare.com/hc/articles/227227647)
