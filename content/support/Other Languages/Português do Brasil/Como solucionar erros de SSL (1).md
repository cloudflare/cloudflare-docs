---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/200169806-Como-solucionar-erros-de-SSL
title: Como solucionar erros de SSL (1)
---

# Como solucionar erros de SSL

_Saiba como o Cloudflare interage com os crawlers dos mecanismos de busca (principalmente do Google) e como solucionar erros de rastreamento._

### Neste artigo

-   [Visão geral](https://support.cloudflare.com/hc/pt-br/articles/200169806-Como-solucionar-erros-de-SSL#h_2a34f441-b447-44ea-a005-b3690e7a10bb)
-   [Ajustar taxas de rastreamento do Google e Bing](https://support.cloudflare.com/hc/pt-br/articles/200169806-Como-solucionar-erros-de-SSL#h_788dc59a-6fcd-4fb0-95fe-83c8e6a169ff)
-   [Prevenir erros de rastreamento](https://support.cloudflare.com/hc/pt-br/articles/200169806-Como-solucionar-erros-de-SSL#h_0038b632-a9b0-4ffd-a621-6770f6a17f00)
-   [Corrigir erros de rastreamento](https://support.cloudflare.com/hc/pt-br/articles/200169806-Como-solucionar-erros-de-SSL#h_3d7e8b91-2e5b-4c12-9ed4-8cc25be07790)
-   [Recursos relacionados](https://support.cloudflare.com/hc/pt-br/articles/200169806-Como-solucionar-erros-de-SSL#h_dc04971f-7f25-41ec-9b1d-33096cad773f)

___

## Visão geral

O Cloudflare coloca os rastreadores e bots de mecanismos de busca na lista de permissões. Se você perceber algum problema de rastreamento ou controle do Cloudflare no bot ou crawler do mecanismo de busca, [entre em contato com o suporte Cloudflare](https://support.cloudflare.com/hc/articles/200172476) e forneça as informações que você coletou para corrigir os erros de rastreamento usando os métodos descritos neste guia.

___

## Ajustar taxas de rastreamento do Google e Bing

Para otimizar o desempenho da CDN, o Google e o Bing atribuem taxas de rastreamento especiais a sites usando os serviços da CDN em ordem As taxas de rastreamento especiais não afetam negativamente a otimização do mecanismo de busca (SEO) e as páginas de resultados do mecanismo de busca (SERP). Para alterar as taxas de rastreamento do Bing e do Google, siga os guias abaixo:

-   Altere a taxa de rastreamento do Google [seguindo as instruções na documentação do Google](https://support.google.com/webmasters/answer/48620?hl=en).
-   Altere sua taxa de rastreamento do Bing seguindo as orientações da documentação do Bing:

-   [Controle de rastreamento do Bing](https://www.bing.com/webmaster/help/crawl-control-55a30302)
-   [Atraso de rastreamento e crawler do Bing](https://blogs.bing.com/webmaster/2009/08/10/crawl-delay-and-the-bing-crawler-msnbot)

___

## Prevenir erros de rastreamento

Leia as recomendações abaixo para prevenir erros do crawler:

-   Monitore o desempenho e a disponibilidade do seu site usando uma ferramenta de terceiros:
    -   [StatusCake](http://www.statuscake.com/)
    -   [Pingdom](http://www.pingdom.com/)
    -   [Monitor.Us](http://www.monitor.us/)
    -   [Updown](http://beta.updown.io/)

-   Não bloqueie os endereços IP do crawler do Google usando **Regras de firewall** ou **Regras de acesso via IP** no aplicativo Cloudflare **Firewall**.

-   Não bloqueie os Estados Unidos usando **Regras de firewall** ou **Regras de acesso via IP** no aplicativo Cloudflare **Firewall**.
-   Não bloqueie [User-Agents do Google](https://support.google.com/webmasters/answer/1061943) ou [Bing](https://www.bing.com/webmaster/help/which-crawlers-does-bing-use-8c184ec0) na configuração do seu servidor, .htaccess, [robots.txt](http://support.google.com/webmasters/bin/answer.py?answer=35303) , ou aplicativo Web.

-   Não permita o rastreamento de arquivos no diretório /cdn-cgi/. O Cloudflare usa essa rota internamente e o Google encontra erros ao rastreá-la. Desautorize rastreamentos de cdn-cgi via robots.txt:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Disallow: /cdn-cgi/</span></div></span></span></span></code></pre>{{</raw>}}

-   Verifique se o arquivo [robots.txt autoriza o crawler do AdSense](http://support.google.com/webmasters/bin/answer.py?hl=en&answer=1061943) .
-   [Restaure os endereços IP originais dos visitantes](https://support.cloudflare.com/hc/articles/200170916) nos logs do servidor.

___

## Corrigir erros de rastreamento

Segue abaixo o passo a passo para corrigir os erros de rastreamento relatados com mais frequência.

### Erros de HTTP 4XX

Os [erros de HTTP 4XX](https://support.cloudflare.com/hc/articles/115003014512) são o tipo mais comum de erro de rastreamento. O Cloudflare gera esses erros a partir do seu servidor Web e os envia para o Google. Os erros ocorrem por vários motivos, como uma página ausente no servidor Web ou um link formatado incorretamente no HTML. A solução dependerá do tipo de problema que você encontrar.

### Erros de HTTP 5XX

Os [erros de HTTP 5XX](https://support.cloudflare.com/hc/articles/115003011431) indicam que houve um erro interno no Cloudflare ou no servidor Web. Para confrontar a incidência de erros de rastreamento com interrupções no site, monitore o status do servidor Web de origem. Monitore o status do seu site usando Cloudflare e o endereço IP do servidor Web de origem para determinar se os erros ocorreram devido ao Cloudflare ou ao servidor Web de origem.

### Erros de DNS

As etapas de solução de problemas variam de acordo com o tipo de configuração do seu domínio no Cloudflare: CNAME ou completa. Para verificar qual configuraçãseu domínio usa, abra um terminal e execute o seguinte comando (substitua _www.exemplo.com_pelo seu domínio Cloudflare):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +short SOA www.exemplo.com</span></div></span></span></span></code></pre>{{</raw>}}

Para domínios com uma configuração CNAME, a resposta do resultado contém cdn.cloudflare.net. Por exemplo:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">exemplo.com.cdn.cloudflare.net.</span></div></span></span></span></code></pre>{{</raw>}}

Para domínios com uma configuração completa, a resposta do resultado contém o domínio cloudflare.com nos nameservers listados. Por exemplo:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  josh.ns.cloudflare.com. dns.cloudflare.com. 2013050901 10000 2400 604800 3600</span></div></span></span></span></code></pre>{{</raw>}}

Após confirmar como seu domínio está configurado no Cloudflare, prossiga com as etapas de solução de problemas pertinentes para configurá-lo.

**CNAME**

Entre em contato com seu provedor de hospedagem para investigar erros de DNS e forneça a data em que o Google encontrou os erros de DNS. Consulte, também, a página [Cloudflare System Status](http://www.cloudflare.com/system-status) em busca de falhas de rede ocorridas na data em que os erros foram encontrados pelo Google.

**Completo**

[Entre em contato com o suporte Cloudflare](https://support.cloudflare.com/hc/articles/200172476) e informe a data e a hora em que o Google apontou os erros.

### Solicitando assistência para solução de problemas

Se as etapas de solução de problemas acima não corrigirem os erros de rastreamento, siga as etapas abaixo para exportar os erros do crawler para um arquivo .csv no painel de controle do Google Webmaster Tools. Inclua esse arquivo .csv quando [entrar em contato com o Suporte Cloudflare](https://support.cloudflare.com/hc/articles/200172476) .

1.  Faça login na sua conta do Google Webmaster Tools e navegue até a seção **Integridade** do domínio afetado.
2.  Clique em **Erros de rastreamento** na navegação à esquerda.
3.  Clique em **Baixar** para exportar a lista de erros como um arquivo .csv
4.  Forneça o arquivo .csv baixado ao suporte da Cloudflare.

___

## Recursos relacionados

[Documentação do Google sobre erros de rastreamento e solução de problemas](https://support.google.com/webmasters/answer/7440203#not_found_404)
