---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/221327488-Por-que-meu-dom%C3%ADnio-foi-exclu%C3%ADdo-da-Cloudflare-
title: Por que meu domínio foi excluído da Cloudflare
---

# Por que meu domínio foi excluído da Cloudflare?

## Por que meu domínio foi excluído da Cloudflare?

_Este artigo informa as etapas para investigar e recuperar um domínio excluído de uma conta da Cloudflare._

### Neste artigo

-   [Visão geral](https://support.cloudflare.com/hc/pt-br/articles/221327488-Por-que-meu-dom%C3%ADnio-foi-exclu%C3%ADdo-da-Cloudflare-#h_71645430211540423470679)
-   [Etapa 1 - verificar os Logs de Auditoria na sua conta da Cloudflare](https://support.cloudflare.com/hc/pt-br/articles/221327488-Por-que-meu-dom%C3%ADnio-foi-exclu%C3%ADdo-da-Cloudflare-#h_75178970471540423485029)
-   [Etapa 2 - verifique se o registro do domínio está listando os nameservers da Cloudflare](https://support.cloudflare.com/hc/pt-br/articles/221327488-Por-que-meu-dom%C3%ADnio-foi-exclu%C3%ADdo-da-Cloudflare-#h_84363930121540423493275)
-   [Etapa 3 - verifique se a resolução do domínio está usando os nameservers da Cloudflare](https://support.cloudflare.com/hc/pt-br/articles/221327488-Por-que-meu-dom%C3%ADnio-foi-exclu%C3%ADdo-da-Cloudflare-#h_670950877161540423505236)
-   [Como recuperar um domínio excluído](https://support.cloudflare.com/hc/pt-br/articles/221327488-Por-que-meu-dom%C3%ADnio-foi-exclu%C3%ADdo-da-Cloudflare-#h_88537939911540919764865)
-   [Recursos relacionados](https://support.cloudflare.com/hc/pt-br/articles/221327488-Por-que-meu-dom%C3%ADnio-foi-exclu%C3%ADdo-da-Cloudflare-#h_186867048201540423513703)

___

## Visão geral

A exclusão de domínio geralmente ocorre pelos seguintes motivos:

-   Um usuário com acesso ao domínio o removeu.
-   Os nameservers não apontam mais para a Cloudflare. A Cloudflare monitora continuamente o registro de domínios.
-   O domínio não foi autenticado (pendente por 60 dias).

___

## Etapa 1 - verificar os Logs de Auditoria na sua conta da Cloudflare

Os **Logs de Auditoria** da Cloudflare contêm informações sobre a exclusão  de domínios. Leia [Como utilizar os Logs de Auditoria](https://support.cloudflare.com/hc/en-us/articles/115002833612-How-do-I-use-Audit-Logs-) para obter mais informações sobre o recurso  **Logs de Auditoria** .

1.  Faça o login no painel de controle da Cloudflare.
2.  Clique na conta apropriada da Cloudflare onde existia o domínio excluído.
3.  Clique em **Log de Auditoria** na segunda barra de navegação, na parte superior.
4.  Para obter o **Domínio**, digite o nome de domínio que foi excluído.
5.  Clique em uma _Ação_**Excluir** e verifique se o **Recurso** especifique _Conta_.
6.  Observe a **data**, o **endereço de IP do usuário** e o **usuário** que excluiu o domínio.
7.  Se o **endereço de IP do usuário** for _127.0.0.1_ ou não contiver dados, a exclusão foi feita automaticamente pelos sistemas da Cloudflare: Vá para a etapa 2 

___

## Etapa 2 - verifique se o registro do domínio está listando os nameservers da Cloudflare

1\. Use a aplicação "whois" baseado em comando fornecido com o seu sistema operacional ou consulte um site como [owhois.icann.org](https://whois.icann.org/en) ou [www.whois.net](https://www.whois.net/).

-   Se não conseguir localizar os dados do nameserver do seu domínio, entre em contato com o seu registrador ou com o provedor de domínios para obter as informações de registro do domínio.
-   Certifique-se de que os nameservers da Cloudflare sejam os únicos dois nameservers listados nos dados de registro do domínio.
-   Verifique se os nameservers estão digitados corretamente no registro do domínio.

2\. Confirme se os nameservers correspondem exatamente aos nameservers informados na seção **nameservers da Cloudflare** do aplicativo de **DNS** da Cloudflare.

3\. Se você identificar informações incorretas, faça login no portal do seu provedor de domínio para fazer atualizações ou entre em contato com o seu provedor de domínio para obter ajuda.

___

## Etapa 3 - verifique se a resolução do domínio está usando os nameservers da Cloudflare

1\. Use ferramentas de comando ou de terceiros para confirmar se os nameservers da Cloudflare estão configurados:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig NS something.anotherdomain.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +trace NS something.anotherdomain.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig NS something.anotherdomain.com @8.8.8.8</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

A opção +trace produzirá informações detalhadas quando a resposta de DNS falhar. Essas informações podem ser úteis para a solução de problemas junto ao seu provedor de DNS.

A opção @8.8.8.8 retornará resultados do resolvedor público de DNS do Google. Os resultados confirmarão se os resolvedores públicos recebem uma resposta de DNS.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">nslookup -type=ns something.anotherdomain.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">nslookup -type=ns something.anotherdomain.com 8.8.8.8</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Alguns serviços on-line, comos [whatsmydns.net](https://www.whatsmydns.net/), verificam a resolução de DNS no mundo inteiro.  

-   Certifique-se de que os dois nameservers da Cloudflare sejam os únicos nameservers retornados nos resultados da consulta.
-   Certifique-se de que não haja nenhum nameserver com erros de digitação.
-   Confirme se os nameservers correspondem exatamente aos nameservers informados na seção **nameservers da Cloudflare** do aplicativo de **DNS** da Cloudflare.

2\. Se você identificar informações incorretas, faça login no portal do seu provedor de domínio para fazer atualizações ou entre em contato com o seu provedor de domínio para obter ajuda.

3\. Se os dados do nameserver ou do registro do domínio estiverem corretos, entre em contato com o seu provedor de domínio para confirmar se tiveram problemas de propagação de DNS recentemente.

___

## Como recuperar um domínio excluído

Para recuperar um domínio excluído, utilize o link **\+ Adicionar site** localizado no lado direito da barra de navegação no topo do painel da Cloudflare. O domínio deve ser adicionado como um domínio novo.

___

## Recursos relacionados

-   [Nameservers secundários](https://support.cloudflare.com/hc/en-us/articles/360001356152-How-do-I-setup-and-manage-Secondary-DNS-) (recurso do plano Enterprise)
-   [Configuração de CNAME](/dns/zone-setups/partial-setup) (recurso dos planos Business e Enterprise)
-   [Como alterar os nameservers para a Cloudflare](/dns/zone-setups/full-setup/setup)
