---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/200170566-Como-solucionar-erros-de-SSL
title: Como solucionar erros de SSL
---

# Como solucionar erros de SSL

_Solucione erros comuns de SSL observados ao navegar para um domínio que faz proxy por meio da Cloudflare._

___

## Visão geral

Até que a Cloudflare forneça um certificado SSL para o seu domínio, os seguintes erros de tráfego HTTPS deverão aparecer em vários navegadores:

**Firefox**

     _ssl\_error\_bad\_cert\_domain_     _Essa conexão não é confiável_

**Chrome**

     _Sua conexão não é privada_

**Safari**

     _O Safari não conseguiu verificar a identidade do site_

**Edge/Internet Explorer**

     _Há um problema com o certificado de segurança desse site_

Mesmo se o seu domínio tiver um certificado SSL provisionado pela Cloudflare, os navegadores mais antigos exibem erros referentes a certificados SSL não confiáveis porque não [oferecem suporte ao protocolo SNI (Indicação de Nome de Servidor)](https://en.wikipedia.org/wiki/Server_Name_Indication#Support) utilizado pelos certificados Universal SSL da Cloudflare.

Salvo indicações em contrário, analise as seguintes causas comuns de erros de SSL caso ocorram erros de SSL ao utilizar um navegador mais recente:

-   [Erros de loop de redirecionamento ou erros 525 ou 526 de HTTP](https://support.cloudflare.com/hc/pt-br/articles/200170566-Como-solucionar-erros-de-SSL#h_7ec9ed4a-80ae-4fca-8be7-89a13c195d19)
-   [Apenas alguns dos seus subdomínios retornam erros de SSL](https://support.cloudflare.com/hc/pt-br/articles/200170566-Como-solucionar-erros-de-SSL#h_55e4d315-c60d-4798-9c4c-c75d9baed1b7)
-   [Seu certificado Universal SSL da Cloudflare não está ativo](https://support.cloudflare.com/hc/pt-br/articles/200170566-Como-solucionar-erros-de-SSL#h_122b94f3-ff14-4544-b5fa-8875e08ff5f0)
-   [Erro de resposta OCSP](https://support.cloudflare.com/hc/pt-br/articles/200170566-Como-solucionar-erros-de-SSL#h_51354cf8-de93-4894-85e6-f0f7453d766d)
-   [O SSL expirou ou erros de incompatibilidade de SSL](https://support.cloudflare.com/hc/pt-br/articles/200170566-Como-solucionar-erros-de-SSL#h_c1a6e78e-150d-4db6-89ab-eec7cb1ab03f)

___

### Erros de loop de redirecionamento ou erros 525 ou 526 de HTTP

**Sintoma**

Os visitantes observam [erros de loop de redirecionamento](https://support.cloudflare.com/hc/articles/115000219871) ou erros de HTTP [525](https://support.cloudflare.com/hc/articles/115003011431#525error) ou [526](https://support.cloudflare.com/hc/articles/115003011431#526error) ao navegar para o seu domínio. Esses erros ocorrem quando a opção atual de SSL no aplicativo **SSL/TLS** da Cloudflare não é compatível com a configuração do seu servidor web de origem.

**Solução**

Para loops de redirecionamento, consulte o nosso guia sobre [como solucionar erros de loops de redirecionamento](https://support.cloudflare.com/hc/articles/115000219871).

Para solucionar erros de HTTP [525](https://support.cloudflare.com/hc/articles/115003011431#525error) ou [526](https://support.cloudflare.com/hc/articles/115003011431#526error), consulte as nossas configurações recomendadas de SSL abaixo. Por exemplo, se o seu servidor web de origem...

-   tem um certificado válido de uma Autoridade de Certificação ou um [certificado de CA de origem](https://support.cloudflare.com/hc/articles/115000479507) da Cloudflare, use as opções _[Completo](https://support.cloudflare.com/hc/articles/200170416#h_845b3d60-9a03-4db0-8de6-20edc5b11057)_ ou _[Completo (rigoroso)](https://support.cloudflare.com/hc/articles/200170416#h_8afd8a8d-382d-4694-a2b2-44cbc9f637ef)_ para o **SSL**

-   tem certificados SSL autoassinados, use a opção [_Completo_ para o **SSL**](https://support.cloudflare.com/hc/articles/200170416#h_845b3d60-9a03-4db0-8de6-20edc5b11057)

-   não tiver nenhum certificado SSL instalado, utilize a opção [_Flexível_ para o **SSL**](https://support.cloudflare.com/hc/articles/200170416#h_4e0d1a7c-eb71-4204-9e22-9d3ef9ef7fef).

___

### Apenas alguns de seus subdomínios retornam erros de SSL

**Sintoma**

**O certificado**

[Universal SSL da Cloudflare](https://support.cloudflare.com/hc/articles/204151138) e os [certificados Dedicated SSL](https://support.cloudflare.com/hc/articles/228009108) comuns abrangem somente o domínio de nível principal (_exemplo.com_) e um nível de subdomínio (_\*.exemplo.com_). Se os visitantes do seu domínio observarem erros ao acessar em seus navegadores um segundo nível de subdomínio (como, por exemplo, _dev.www.exemplo.com_), mas não ao acessar o primeiro nível de subdomínio (como, por exemplo, _www.exemplo.com_), solucione o problema utilizando um dos seguintes métodos abaixo.

**Solução**

-   Certifique-se de que o domínio esteja pelo menos no Business plan e carregue um [certificado SSL personalizado](https://support.cloudflare.com/hc/articles/200170466) que inclua o nível _dev.www.exemplo.com_; ou
-   Adquira um [certificado Dedicated SSL com Hostnames Personalizados](https://support.cloudflare.com/hc/articles/228009108) que inclua o nível _dev.www.exemplo.com_; ou
-   Se você tiver um certificado válido para os subdomínios de segundo nível no seu servidor web de origem, clique no ícone de nuvem laranja ao lado do hostname _dev.www_ no aplicativo de **DNS** da Cloudflare para _exemplo.com_.

___

### Seu certificado Universal SSL da Cloudflare não está ativo

**Sintoma**

A Cloudflare fornece um [certificado Universal SSL](https://support.cloudflare.com/hc/articles/204151138) para todos os seus domínios ativos. Se você observar erros de SSL e não tiver um certificado do **Tipo** _Universal_ dentro da seção de **Certificados de borda** do aplicativo **SSL/TLS** da Cloudflare para o seu domínio, isso significa que o certificado Universal SSL ainda não foi provisionado.

Nossos fornecedores de SSL verificam cada solicitação de certificado SSL antes que a Cloudflare possa emitir um certificado para um nome de domínio. Esse processo pode levar de 15 minutos a 24 horas. Às vezes, pode acontecer de nossos fornecedores de certificado SSL sinalizarem um nome de domínio para uma revisão adicional.

**Solução**

-   habilite o Universal SSL no aplicativo **SSL/TLS** da Cloudflare; ou
-   adquira um [certificado Dedicated SSL](https://support.cloudflare.com/hc/articles/228009108); ou
-   carregue um [certificado SSL personalizado](https://support.cloudflare.com/hc/articles/200170466) na Cloudflare.

Se o seu certificado de SSL da Cloudflare não for emitido no prazo de 24 horas após a ativação do domínio na Cloudflare:

-   Se o seu servidor web de origem tiver um certificado SSL válido, [pause a Cloudflare temporariamente](https://support.cloudflare.com/hc/articles/203118044#h_8654c523-e31e-4f40-a3c7-0674336a2753); e
-   [Abra um chamado de suporte](https://support.cloudflare.com/hc/en-us/requests/new) para fornecer as seguintes informações:  
    -   nome do domínio afetado; e
    -   uma captura de tela dos erros que você observar.

Ao pausar a Cloudflare temporariamente, você permitirá que o tráfego HTTPS seja servido corretamente a partir do seu servidor web de origem enquanto a nossa equipe de suporte investiga o problema.

___

### Erro de resposta OCSP

**Sintoma**Os visitantes do seu site observam um erro de resposta OCSP.

**Solução  
**  
Esse erro é causado pela versão do navegador ou por um problema que demanda a atenção de um dos fornecedores de SSL da Cloudflare. Para diagnosticá-lo adequadamente, [abra um chamado de suporte](https://support.cloudflare.com/hc/en-us/requests/new) com as seguintes informações fornecidas pelo visitante que observar o erro do navegador:

1.  O resultado de _[https://aboutmybrowser.com/](https://aboutmybrowser.com/)_
2.  O resultado de _https://exemplo.com/cdn-cgi/trace_ do navegador do visitante. Substitua _exemplo.com_ pelo nome de domínio do seu site.

___

### O SSL expirou ou erros de incompatibilidade de SSL

**Sintoma  
**  
Os visitantes observam em seus navegadores mensagens de erro relativas à expiração ou incompatibilidade de SSL.

**Solução**

-   nome do domínio afetado; e
-   uma captura de tela dos erros que você observar.

___

## Recursos relacionados

-   [Erros de loop de redirecionamento](https://support.cloudflare.com/hc/articles/115000219871)
-   [Erros de conteúdo misto](https://support.cloudflare.com/hc/articles/200170476)
