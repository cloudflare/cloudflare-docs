---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/360020739772-Uso-do-Cloudflare-Logs-ELS-para-investigar-o-tr%C3%A1fego-DDoS-somente-Enterprise-
title: Uso do Cloudflare Logs (ELS) para investigar o tráfego DDoS (somente Enterprise)
---

# Uso do Cloudflare Logs (ELS) para investigar o tráfego DDoS (somente Enterprise)

_Aprenda a identificar fontes de tráfego mal-intencionado classificando efetivamente o Cloudflare Logs (antigo ELS)._

### Neste artigo

-   [Visão geral](https://support.cloudflare.com/hc/pt-br/articles/360020739772-Uso-do-Cloudflare-Logs-ELS-para-investigar-o-tr%C3%A1fego-DDoS-somente-Enterprise-#3HsXqW7d3IsVSiXaSahndu)
-   [Etapa 1: Reunir as informações necessárias antes de consultar os Cloudflare Logs](https://support.cloudflare.com/hc/pt-br/articles/360020739772-Uso-do-Cloudflare-Logs-ELS-para-investigar-o-tr%C3%A1fego-DDoS-somente-Enterprise-#5M6vcNVVDhT11LZLh4j9Sb)
-   [1ª etapa: Baixe e salve os logs](https://support.cloudflare.com/hc/pt-br/articles/360020739772-Uso-do-Cloudflare-Logs-ELS-para-investigar-o-tr%C3%A1fego-DDoS-somente-Enterprise-#2jBVMFoEjzNQo8pBRDIDZA)
-   [Etapa 3: classificar os logs](https://support.cloudflare.com/hc/pt-br/articles/360020739772-Uso-do-Cloudflare-Logs-ELS-para-investigar-o-tr%C3%A1fego-DDoS-somente-Enterprise-#2tevqpfbZxVtOz6bAILuu8)
-   [Exemplo de fluxo de trabalho](https://support.cloudflare.com/hc/pt-br/articles/360020739772-Uso-do-Cloudflare-Logs-ELS-para-investigar-o-tr%C3%A1fego-DDoS-somente-Enterprise-#bNjbvBfyV4w7fQ9iHGUVV)

___

## Visão geral

Com o Cloudflare Logs (antigo ELS), você tem acesso a dados úteis para analisar o tráfego que pode mostrar padrões associados a um ataque de DDoS. Você pode executar esse tipo de análise, classificando os dados do Cloudflare Logs. Para começar, siga as etapas descritas abaixo e revise o exemplo de fluxo de trabalho fornecido.

Antes de seguir estas instruções, você precisa:

-   [gato](http://www.linfo.org/cat.html)
-   [jq](https://stedolan.github.io/jq/)
-   [API do Cloudflare Logs Logpull](https://support.cloudflare.com/hc/en-us/articles/216672448-Enterprise-Log-Share-Logpull-REST-API)

___

## Etapa 1: Reunir as informações necessárias antes de consultar os Cloudflare Logs

Reúna as seguintes informações:

1.  Endereço de email do administrador da zona
2.  ID da zona (encontrado em **Visão geral** \> **ID da zona** )
3.  Chave da API do cliente
4.  Hora de início (formato de exemplo: 1529171100)
5.  Hora de término (formato de exemplo: 1529171100)

___

## 1ª etapa: Baixe e salve os logs

O endpoint do Cloudflare tem um limite de faixa de tempo de 1 hora e o tamanho do arquivo de logs deve estar abaixo de 1 GB por solicitação. Se o tamanho do arquivo exceder 1 GB, o download será cortado em 1 GB, mesmo que os eventos registrados a partir do momento solicitado não estejam incluídos. Para evitar truncar seus logs, diminua o tempo de 1 hora para 45 minutos e assim por diante até que o tamanho do arquivo de log esteja abaixo de 1 GB.

### Opção 1:

Faça o download de \*todos\* os campos do Cloudflare Logs, salve em els.txt:

Modelo:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt -H &quot;X-Auth-Email: email&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received?start=starttime&amp;end=endtime&amp;fields=(curl -s -H &quot;X-Auth-Email: email&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received/fields&quot; | jq '. | to_entries[] | .key' -r | paste -sd &quot;,&quot; -)&quot;</span></div></span></span></span></code></pre>{{</raw>}}

Exemplo (com valores):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt-H &quot;X-Auth-Email:monkey@bannana.com&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/5b5f0xxxcbfbaxxxxxx0416d22f7b/logs/received?start=1529171100&amp;end=1529171100&amp;fields=(curl -s -H &quot;X-Auth-Email: monkey@bannana.com&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received/fields&quot; | jq '. | to_entries[] | .key' -r | paste -sd &quot;,&quot; -)&quot;</span></div></span></span></span></code></pre>{{</raw>}}

### Opção 2:

Faça o download de campos \*específicos\* do Cloudflare Logs, salve em els.txt:

Este comando incluirá apenas os seguintes campos nos logs solicitados: _CacheCacheStatus, CacheResponseBytes, CacheResponseStatus, CacheTieredFill, ClientASN_ .

Veja a lista completa dos campos [do Cloudflare Logs aqui](https://support.cloudflare.com/hc/en-us/articles/216672448-Enterprise-Log-Share-Logpull-REST-API) . Modelo:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt-H &quot;X-Auth-Email:email&quot; -H &quot;X-Auth-Key:api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received?start=starttime&amp;end=endtime&amp;fields=CacheCacheStatus,CacheResponseBytes,CacheResponseStatus,CacheTieredFill,ClientASN”</span></div></span></span></span></code></pre>{{</raw>}}

Exemplo (com valores):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt-H &quot;X-Auth-Email:monkey@bannana.com&quot; -H &quot;X-Auth-Key:api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/xx5x0xxxc45baxxxxxx0x6d23fxx/logs/received?start=1529171100&amp;end=1529171100&amp;fields=CacheCacheStatus,CacheResponseBytes,CacheResponseStatus,CacheTieredFill,ClientASN”</span></div></span></span></span></code></pre>{{</raw>}}

___

## Etapa 3: classificar os logs

Classifique os logs pelo valor do campo e envie-os para um arquivo.

-   Classifique pela resposta HTTP 200, com saída para o arquivo chamado els-200.txt


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~ $ cat  els.txt  | grep &quot;  : 200,  &quot; &gt;  els-200.txt </span></div></span></span></span></code></pre>{{</raw>}}

-   Classifique pela resposta HTTP 525, com saída para o arquivo chamado els-525.txt


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~ $ cat  els.txt  | grep &quot;  : 525,  &quot; &gt;  els-525.txt </span></div></span></span></span></code></pre>{{</raw>}}

### De onde vem o valor do campo " : 525, " ?

O padrão _: 525,_ (dois pontos, código de status, vírgula) é exclusivo para o campo _EdgeResponseStatus_ . A simples pesquisa no código de status HTTP _525_ sem dois pontos e vírgula à direita também incluiria entradas de log com o padrão _525_ em outros campos como _EdgeStartTimeStamp_ , por exemplo, que contém muitos números e também pode conter a sequência numérica _525_ .

![captura de tela dos arquivos de saída com o campo EdgeResponseStatus realçado](/images/support/hc-external-edge_response_status_ELS.png)

Os arquivos de saída (els-200.txt e els-525.txt) não são muito legíveis como estão. Para visualizá-los em um formato mais legível, use jq no seguinte comando:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~ $ cat els-525.txt | jq '.'</span></div></span></span></span></code></pre>{{</raw>}}

### Contar as solicitações por campo e enviá-las para um arquivo

Neste exemplo, contamos solicitações por versão do protocolo SSL, que é indicado pelo campo _ClientSSLProtocol_ no Cloudflare Logs (observe o período antes do nome do campo abaixo).


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~ $ jq -r  .ClientSSLProtocol   els-200.txt  | sort -n | uniq -c | sort -n &gt;  ClientSSLProtocol.txt </span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~ $ cat  ClientSSLProtocol.txt    </span></div></span></span></span></code></pre>{{</raw>}}

### Saída de exemplo:

![captura de tela da saída de exemplo ao classificar logs do ELS](/images/support/hc-import-11.png)

Os campos _ClientRequestURI, ClientIP, ClientRequestUserAgent, ClientCountry_ e _ClientRequestHost_ geralmente são os mais úteis para encontrar padrões de ataque nesses logs.

-   Classificar por _ClientRequestUserAgent_ permite definir regras de bloqueio do User-Agent.
-   Classificando por _ClientCountry_ permite definir regras de firewall com base no país.
-   Classificar por _ClientRequestURI_ permitirá definir regras de limitação de taxa para as páginas com o maior número de solicitações.

___

## Exemplo de fluxo de trabalho

Freqüentemente, você precisará classificar por vários campos para analisar e identificar a origem de um ataque. Por exemplo, dê uma olhada no seguinte fluxo de trabalho:

**Ação 1** : Classifique seus Cloudflare Logs baixados por _respostas HTTP 200_ , com saída para els-200.txt.

**Reason**: você não está interessado em respostas que já estão sendo bloqueadas pelo Cloudflare; ou seja, solicitações que resultam em uma resposta HTTP _503_ ou _403_. Uma solicitação que resulta em uma resposta _200 HTTP_ em nossa borda não é bloqueada pelo Cloudflare e provavelmente está indo até a origem se o ativo não estiver em cache na borda do Cloudflare. Tais solicitações, quando mal-intencionadas, são projetadas especificamente para sobrecarregar a origem.

**How to**:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~ $ cat  els.txt  | grep &quot;  : 200,  &quot; &gt;  els-200.txt </span></div></span></span></span></code></pre>{{</raw>}}

**Ação 2** : Classifique seus " HTTP 200 apenas " logs por URI, com saída para els-200-URI.txt.

**Reason**: dentre 200 respostas, você deseja ver as páginas que estão sendo mais solicitadas. **How to**:

Encontre os principais URIs:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~ $ jq -r  .ClientRequestURI   els-200.txt  | sort -n | uniq -c | sort -n &gt;  els-200-top-URIs.txt </span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~ $ cat  els-200-top-URIs.txt </span></div></span></span></span></code></pre>{{</raw>}}

Escolha um URI dessa lista e envie as entradas de log com esse URI para seu próprio arquivo. Para fazer isso, substitua _/ClientRequestURI/path/to/something/_ no comando abaixo pelo URI de sua escolha:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~ $ cat  els-200.txt  | grep &quot; /ClientRequestURI/caminho/para/algo/ &quot; &gt;  els-200-URI-1.txt </span></div></span></span></span></code></pre>{{</raw>}}

**Ação 3** : Contagem específica de URI, " HTTP 200 apenas " respostas por endereço IP, saída para els-200-URI-1-Top-IP.txt

**Motivo** : você deseja ver os principais endereços IP que estão solicitando o URI e resultando em uma resposta 200.

**Como:**


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ jq -r .ClientIP els-200-URI-1.txt |sort -n |uniq -c |sort -n &gt; els-200-URI-1-Top-IP.txt</span></div></span></span></span></code></pre>{{</raw>}}

**Saída do conteúdo do arquivo:**


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-200-URI-1-Top-IP.txt</span></div></span></span></span></code></pre>{{</raw>}}

Você pode restringir 200 respostas HTTP pelo URI da solicitação e pelos IPs que estão solicitando esses URIs. Você também pode classificar os logs ao contrário, restringindo as entradas de log pelos principais endereços IP e vendo qual URI é mais solicitado por endereço IP.
