---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/200170476-Como-solucionar-erros-de-conte%C3%BAdo-misto
title: Como solucionar erros de conteúdo misto
---

# Como solucionar erros de conteúdo misto

## Como solucionar erros de conteúdo misto

_Resolva erros com conteúdo misto para garantir que o navegador da web do visitante não bloqueie os recursos HTTP servidos em HTTPS._

___

## Visão geral

Os domínios adicionados à Cloudflare recebem certificados SSL e podem servir tráfego em HTTPS. No entanto, após começarem a utilizar a Cloudflare, alguns clientes percebem problemas de renderização de páginas e conteúdo faltante quando começam a servir tráfego em HTTPS.

Geralmente, o problema se deve a uma solicitação de recursos HTTP para uma página da web servida em HTTPS.  Por exemplo, você digita `https://exemplo.com` em um navegador e a página contém uma referência de imagem por meio de HTTP no código HTML `<img src="http://example.com/resource.jpg">`.

De modo geral, se o seu site carregar todos os recursos de forma segura em HTTPS, os visitantes observarão um ícone de cadeado (geralmente um cadeado verde) na barra de endereço do seu navegador:

![green-lock-icon.png](/images/support/green-lock-icon.png)

Isso indica que seu site tem um certificado SSL ativo e que todos os recursos carregados pelo site são carregados em HTTPS. O cadeado verde garante aos visitantes que sua conexão é segura. Um dos [sintomas de conteúdo misto](https://support.cloudflare.com/hc/pt-br/articles/200170476-Como-solucionar-erros-de-conte%C3%BAdo-misto#h_a6c5a05b-baba-4f88-a75c-d61f206366ed) é que aparecem ícones diferentes ao invés do ícone de cadeado verde.

___

## Sintomas de ocorrência de conteúdo misto

A maioria dos navegadores modernos bloqueia solicitações HTTP em páginas HTTPS seguras. O conteúdo bloqueado pode incluir imagens, JavaScript, CSS ou outro conteúdo que afete a aparência ou o comportamento da página.

Abaixo estão os sinais de que seu navegador da web está observando conteúdo misto no site requisitado:

Para advertências de conteúdo misto, o navegador da web carrega os recursos, mas os usuários não veem o ícone de cadeado verde na URL. As mensagens de advertência aparecem nas ferramentas de depuração do navegador:

![mixed-content-warning.png](/images/support/mixed-content-warning.png)

Para erros de conteúdo misto, o navegador se recusa a carregar os recursos em uma conexão não segura:

![mixed-content-error.png](/images/support/mixed-content-error.png)

Informações sobre como usar as ferramentas de depuração do navegador para localizar esses problemas podem ser encontradas na documentação do [Chrome](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/fixing-mixed-content) e do [Firefox](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content). Alternativamente, você pode visualizar o código-fonte da sua página e localizar referências específicas a _http://_ nos caminhos para outros recursos.

___

## Solução

Existem dois métodos para resolver erros de conteúdo misto.

1\. Carregue todos os recursos por meio do seu código-fonte em HTML sem especificar um protocolo HTTP ou HTTPS. Por exemplo:

     _//domain.com/path/to.file_

     Ao invés de

     _http://domain.com/path/to.file_

2\. Dependendo do seu Sistema de Gerenciamento de Conteúdo, verifique se existem plugins que reescrevam automaticamente os recursos com HTTP como HTTPS. No aplicativo **SSL/TLS**, a Cloudflare oferece esse serviço por meio do [Automatic HTTPS Rewrites](https://support.cloudflare.com/hc/articles/227227647).

___

## Recursos relacionados

-   [Como depurar conteúdo misto no Chrome](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/fixing-mixed-content)
-   [Como depurar conteúdo misto no Firefox](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)
