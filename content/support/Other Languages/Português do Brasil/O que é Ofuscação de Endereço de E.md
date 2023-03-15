---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/200170016-O-que-%C3%A9-Ofusca%C3%A7%C3%A3o-de-Endere%C3%A7o-de-E-mail-
title: O que é Ofuscação de Endereço de E-mail
---

# O que é Ofuscação de Endereço de E-mail?

## O que é Ofuscação de Endereço de E-mail?

_A Ofuscação de Endereço de E-mail da Cloudflare ajuda na prevenção de spam, ocultando endereços de e-mail que aparecem em suas páginas de processadores de e-mail e outros bots, enquanto permanecem visíveis para os visitantes do site._

___

## Visão geral

Processadores de e-mail e outros bots vagueiam pela Internet procurando endereços de e-mail para adicionar às listas que direcionam spam para destinatários. Essa tendência resulta em uma quantidade crescente de e-mails indesejados.

Os administradores da Web criaram maneiras inteligentes de se proteger contra isso: escrever endereços de e-mail (ou seja, ajuda \[@\] cloudflare \[ponto\] com) ou usar imagens incorporadas do endereço de e-mail. No entanto, você perde a conveniência de clicar no endereço de e-mail para enviar um e-mail automaticamente. Ao habilitar a Ofuscação de Endereço de E-mail da Cloudflare, os endereços de e-mail em sua página da Web serão ofuscados (ocultos) de bots, mas permanecerão visíveis para os seres humanos. Na verdade, não há alterações visíveis no seu site para os visitantes.

 Para que a ofuscação de endereço de e-mail funcione na Cloudflare, a página precisa ter um tipo de MIME (Content-Type) de "text/html" ou "application/xhtml+xml". 

___

## Verificar a ofuscação de endereço de e-mail

A Cloudflare permite a ofuscação de endereço de e-mail automaticamente quando você se inscreve. 

Para verificar a ofuscação de endereço de e-mail no painel de controle da Cloudflare:

1.  Faça o login no painel de controle da Cloudflare.
2.  Verifique se o site que você deseja verificar está selecionado.
3.  Clique no aplicativo **Scrape Shield** .
4.  Sob **Ofuscação de endereço de e-mail**, verifique se o botão de alternância está definido como _Ativado_.

Como alternativa, você pode recuperar a origem da página de um cliente HTTP, como CURL, uma biblioteca HTTP ou a opção de origem de visualização do navegador. Em seguida, revise o HTML de origem para confirmar que o endereço não está mais presente. 

___

## Solucionar problemas de ofuscação de e-mail

Para evitar comportamentos inesperados do site, os endereços de e-mail não ficam ofuscados quando aparecem em:

-   Qualquer atributo de tag HTML, exceto o atributo _href_ da tag _a_.
-   Outras tags HTML:
    -   _script_ tags: <script></script>
    -   _noscript_ tags: <noscript></noscript>
    -   _textarea_ tags: <textarea></textarea>
    -   _xmp_ tags: <xmp></xmp>
    -   _head_ tags: <head></head>
-   Qualquer página que não tem um tipo de MIME de "text/html" ou "application/xhtml+xml"

**Atenção:** a ofuscação de e-mail **não entrará em vigor** se você estiver usando o cabeçalho `Cache-Control: no-transform`.

___

## Evitar que a Cloudflare ofusque e-mails

Para evitar que a Cloudflare ofusque e-mails, você pode:

-   Adicionar o seguinte comentário no código HTML da página:  `<!--email_off-->``_your_` `_email addresses go here_``<!--/email_off-->`

-   Retornar endereços de e-mail no formato JSON para chamadas AJAX, certificando-se de que seu servidor Web retorne um tipo de conteúdo "application/json".

-   Desative o recurso "Ofuscação de email" usando uma regra de página a ser aplicada em um ponto de terminação específico para sua zona, seguindo nosso tutorial do Page Rules aqui: [Entendendo e configurando o Page Rules da Cloudflare (tutorial do Page Rules)](https://support.cloudflare.com/hc/pt-br/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-#h_18YTlvNlZET4Poljeih3TJ)
