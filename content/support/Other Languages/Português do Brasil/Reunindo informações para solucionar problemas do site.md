---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/203118044-Reunindo-informa%C3%A7%C3%B5es-para-solucionar-problemas-do-site
title: Reunindo informações para solucionar problemas do site
---

# Reunindo informações para solucionar problemas do site

_Aprenda a coletar dados para diagnosticar problemas e facilitar a solução de problemas com o suporte do Cloudflare. Para a maioria dos problemas, o Cloudflare recomenda fortemente a geração de um arquivo HAR como ponto de partida._

### Neste artigo

-   [Visão geral](https://support.cloudflare.com/hc/pt-br/articles/203118044-Reunindo-informa%C3%A7%C3%B5es-para-solucionar-problemas-do-site#h_b4be207a-9957-429a-a460-fc6f40a5e88a)
-   [Gere um arquivo HAR](https://support.cloudflare.com/hc/pt-br/articles/203118044-Reunindo-informa%C3%A7%C3%B5es-para-solucionar-problemas-do-site#h_8c9c815c-0933-49c0-ac00-b700700efce7)
-   [Identifique o data center Cloudflare que atende sua solicitação](https://support.cloudflare.com/hc/pt-br/articles/203118044-Reunindo-informa%C3%A7%C3%B5es-para-solucionar-problemas-do-site#h_22b01241-01a5-4bed-a897-6e97cff5c288)
-   [Solucionar problemas de solicitações com cURL](https://support.cloudflare.com/hc/pt-br/articles/203118044-Reunindo-informa%C3%A7%C3%B5es-para-solucionar-problemas-do-site#h_0c7f48b3-fc29-4266-8c63-477fe61a11c4)
-   [Pausar Cloudflare temporariamente.](https://support.cloudflare.com/hc/pt-br/articles/203118044-Reunindo-informa%C3%A7%C3%B5es-para-solucionar-problemas-do-site#h_8654c523-e31e-4f40-a3c7-0674336a2753)
-   [Executar um traceroute](https://support.cloudflare.com/hc/pt-br/articles/203118044-Reunindo-informa%C3%A7%C3%B5es-para-solucionar-problemas-do-site#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87)
-   [Adicione o cabeçalho CF-RAY aos seus logs](https://support.cloudflare.com/hc/pt-br/articles/203118044-Reunindo-informa%C3%A7%C3%B5es-para-solucionar-problemas-do-site#h_f7a7396f-ec41-4c52-abf5-a110cadaca7c)
-   [Recursos relacionados](https://support.cloudflare.com/hc/pt-br/articles/203118044-Reunindo-informa%C3%A7%C3%B5es-para-solucionar-problemas-do-site#h_72a357d2-7fdb-47d8-a5c7-eadd8d60723e)

___

## Visão geral

É importante capturar o máximo de informações possível para diagnosticar um problema e [fornecer detalhes adequados ao suporte do Cloudflare](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16) . Este artigo explica como reunir informações sobre solução de problemas comumente solicitadas pelo Suporte Cloudflare.

___

## Gere um arquivo HAR

Um HTTP Archive (HAR) registra todas as solicitações do navegador da Web, incluindo os cabeçalhos de solicitação e resposta, o conteúdo do corpo e o tempo de carregamento da página.

Atualmente, apenas o Chrome e o Firefox podem acessar o recurso HAR por padrão. Outros navegadores exigem uma extensão do navegador ou não podem gerar um HAR. Ao instalar uma extensão do navegador, siga as instruções do provedor de extensão.

1 Em uma página do navegador, clique com o botão direito do mouse em qualquer lugar e selecione **Inspecionar Elemento** .

2\. As ferramentas do desenvolvedor aparecem na parte inferior ou esquerda do navegador. Clique na guia **Rede** .

![Captura de tela da guia de rede HAR das ferramentas de desenvolvedor do Chrome](/images/support/image.png)

3\. Marque **Preserve log** .

4\. Clique em gravar.

![Captura de tela HAR do botão de registro nas ferramentas de desenvolvimento do chrome](/images/support/image.png)

5\. Navegue até o URL que causa problemas. Quando o problema for solucionado, clique com o botão direito do mouse em qualquer um dos itens da guia **Rede** e selecione **Salvar tudo como HAR com o Conteúdo** .

![Captura de tela HAR do menu Salvar nas ferramentas de desenvolvedor do Chrome](/images/support/image.png)

6\. Anexe o arquivo HAR ao seu tíquete de suporte.

1\. No menu da aplicação, selecione **Tools** > **Web Developer** > **Network** ou pressione _Ctrl+Shift+I_ (Windows/Linux) or _Cmd+Option+I_ (OS X).

2\. Navegue até o URL que causa problemas.

3\. Após duplicar o problema, clique com o botão direito do mouse e escolha **Salvar tudo como HAR** .

1\. Navegue até **Ferramentas do desenvolvedor** (use _F12_ como atalho) e selecione a guia **Rede** .

2\. Navegue até o URL que causa problemas.

3\. Após duplicar o problema, clique em **Exportar como HAR** seguido por **Salvar como ...** .

1 No Safari, verifique se o menu **Desenvolver** exibido na parte superior da janela do navegador. Caso contrário, vá para **Safari** \> **Preferências** \> **Avançado** e selecione **Mostrar menu Desenvolver na barra de menus**

2\. Navegue para **Revelação** \> **Mostrar Web Inspector** .

3\. Navegue até o URL que causa problemas.

4\. Ctrl + clique em um recurso no Web Inspector e clique em **Exportar HAR** .

___

## Identifique o data center Cloudflare que atende sua solicitação

[Um mapa dos nossos data centers](https://www.cloudflare.com/network-map) pode ser consultado na [página de status Cloudflare](https://www.cloudflarestatus.com/), classificado por continente. O código de três letras no nome do data center é o [código IATA](http://en.wikipedia.org/wiki/IATA_airport_code) do aeroporto internacional principal mais próximo. Determine o data center da Cloudflare que atende solicitações para o seu navegador visitando: `http://``_www.exemplo.com_``/cdn-cgi/trace.`

Substitua _www.exemplo.com_ com seu domínio e nome de host. Observe o campo **colo** da saída.

___

## Solucionar problemas de solicitações com cURL

cURL é uma ferramenta de linha de comando para enviar solicitações HTTP/HTTPS e é útil para solucionar problemas:

-   Desempenho de HTTP/HTTPS
-   Respostas de erro HTTP
-   Cabeçalhos HTTP
-   API
-   Comparando respostas de servidor/proxy
-   certificados SSL

Execute o comando a seguir para enviar uma solicitação HTTP GET padrão ao seu site (substitua _www.exemplo.com_ com seu domínio e nome de host):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null https://www.exemplo.com/</span></div></span></span></span></code></pre>{{</raw>}}

Este exemplo de comando cURL retorna a saída detalhando a resposta HTTP e os cabeçalhos da solicitação, mas descarta a saída do corpo da página. A saída cURL confirma a resposta HTTP e se o Cloudflare está atualmente fazendo proxy de tráfego para o site. A presença do cabeçalho **CF-RAY** na resposta confirma que a solicitação foi enviada por proxy através do Cloudflare:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CF-Ray: 5097b5640cad8c56-LAX</span></div></span></span></span></code></pre>{{</raw>}}

Expanda as seções abaixo para obter dicas sobre solução de problemas de erros HTTP, desempenho, armazenamento em cache e certificados SSL/TLS:

Ao solucionar erros de HTTP nas respostas do Cloudflare, teste se sua origem causou os erros enviando solicitações diretamente para o servidor Web de origem. Para solucionar problemas de HTTP, execute uma cURL diretamente no endereço IP do servidor Web de origem (ignorando o proxy do Cloudflare):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null http://exemplo.com --connect-to ::203.0.113.34</span></div></span></span></span></code></pre>{{</raw>}}

medidas cURL latência ou degradação de desempenho para HTTP/HTTPS solicitações via os [_w_ ou _\--write-out_ opções cURL](https://curl.haxx.se/docs/manpage.html#-w) . O exemplo cURL abaixo mede vários vetores de desempenho na transação de solicitação, como a duração do handshake TLS, pesquisa de DNS, redirecionamentos, transferências etc.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null https://exemplo.com/ -w &quot;\nContent Type: %{content_type} \ \nHTTP Code: %{http_code} \ \nHTTP Connect:%{http_connect} \ \nNumber Connects: %{num_connects} \ \nNumber Redirects: %{num_redirects} \ \nRedirect URL: %{redirect_url} \ \nSize Download: %{size_download} \ \nSize Upload: %{size_upload} \ \nSSL Verify: %{ssl_verify_result} \ \nTime Handshake: %{time_appconnect} \ \nTime Connect: %{time_connect} \ \nName Lookup Time: %{time_namelookup} \ \nTime Pretransfer: %{time_pretransfer} \ \nTime Redirect: %{time_redirect} \ \nTime Start Transfer: %{time_starttransfer} \ \nTime Total: %{time_total} \ \nEffective URL: %{url_effective}\n&quot; 2&gt;&amp;1</span></div></span></span></span></code></pre>{{</raw>}}

[explicação dessa saída de tempo](https://blog.cloudflare.com/a-question-of-timing/) é encontrada no blog Cloudflare.

O cURL ajuda a revisar os cabeçalhos de resposta HTTP que influenciam o cache. Em particular, revise vários cabeçalhos HTTP ao solucionar problemas de cache do Cloudflare:

-   CF-Cache-Status
-   Cache-control/Pragma
-   Expires
-   Last-Modified
-   S-Maxage

#### Revendo certificados com cURL

O comando cURL a seguir mostra o certificado SSL fornecido pelo Cloudflare durante uma solicitação HTTPS (substitua _www.exemplo.com_ com seu domínio e nome de host):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null https://www.exemplo.com/ 2&gt;&amp;1 | egrep -v &quot;^{.*$|^}.*$|^\* http.*$&quot;</span></div></span></span></span></code></pre>{{</raw>}}

Para exibir o certificado de origem (supondo que um esteja instalado), substitua _203.0.113.34_ abaixo pelo endereço IP real do seu servidor Web de origem e substitua _www.exemplo.com_ com seu domínio e nome de host:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null https://www.exemplo.com --connect-to ::203.0.113.34 2&gt;&amp;1 | egrep -v &quot;^{.*$|^}.*$|^\* http.*$&quot;</span></div></span></span></span></code></pre>{{</raw>}}

#### Testando versões TLS

Se estiver solucionando problemas no suporte ao navegador ou confirmando quais versões do TLS são suportadas, o cURL permitirá testar uma versão específica do TLS adicionando uma das seguintes opções ao seu cURL:

-   \--tlsv1.0
-   \--tlsv1.1
-   \--tlsv1.2
-   \--tlsv1.3

___

## Pausar Cloudflare temporariamente.

Pause o Cloudflare para enviar tráfego diretamente para o servidor Web de origem, em vez do proxy reverso do Cloudflare. Nenhum serviço Cloudflare, como SSL ou WAF, é ativado para domínios em pausa. Uma alternativa para pausar o Cloudflare globalmente é [na nuvem cinza](https://support.cloudflare.com/hc/articles/200169626) os registros que recebem tráfego no seu aplicativo Cloudflare **DNS**.

Pausar Cloudflare temporariamente.

1.  Navegue para a guia **Overview** no painel Cloudflare.
2.  Clique em **Pausar Cloudflare no site** na parte inferior direita da página, em **Ações avançadas** .

___

## Executar um traceroute

O traceroute é uma ferramenta de diagnóstico de rede que mede a latência da rota de pacotes em uma rede. A maioria dos sistemas operacionais suporta o comando _traceroute_. Se você tiver problemas de conectividade com o seu site Cloudflare-proxy e [pedir suporte Cloudflare de assistência](https://support.cloudflare.com/hc/articles/200172476), lembre-se de informar a saída de um traceroute.

Leia as instruções abaixo para executar o traceroute em diferentes sistemas operacionais. Substitua _www.exemplo.com_ com seu domínio e nome de host nos exemplos abaixo:

1\. Abra o menu **Iniciar** .

2\. Clique em **Executar** .

3\. Para abrir a interface da linha de comandos, digite **cmd** e clique em **OK** .

4\. No prompt da linha de comandos, digite: Para IPv4 -


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&gt; tracert  www.exemplo.com </span></div></span></span></span></code></pre>{{</raw>}}

Para IPv6:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&gt; tracert -6  www.exemplo.com </span></div></span></span></span></code></pre>{{</raw>}}

5\. Pressione **Digite** .

6\. Você pode copiar os resultados para salvar em um arquivo ou colar em outro programa.

1\. Abra uma janela do terminal.

2\. No prompt da linha de comandos, digite:

For IPv4 -


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&gt; traceroute www.exemplo.com</span></div></span></span></span></code></pre>{{</raw>}}

Para IPv6:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&gt; traceroute -6 www.exemplo.com</span></div></span></span></span></code></pre>{{</raw>}}

3\. Você pode copiar os resultados para salvar em um arquivo ou colar em outro programa.

1.  Abra o aplicativo **Network Utility**.
2.  Clique na guia **Traceroute** .
3.  Digite o _domínio_ ou _endereço IP_ no campo de entrada apropriado e pressione **Traço** .
4.  Você pode copiar os resultados para salvar em um arquivo ou colar em outro programa.

Como alternativa, siga as mesmas instruções de traceroute do Linux acima ao usar o programa de terminal do Mac OS.

___

## Adicione o cabeçalho CF-RAY aos seus logs

O cabeçalho **CF-RAY** rastreia uma solicitação de site através da rede do Cloudflare. Forneça o **CF-RAY** de uma solicitação da Web ao suporte do Cloudflare ao solucionar um problema. Você também pode adicionar **CF-RAY** aos seus logs editando a configuração do servidor Web de origem com o snippet abaixo que corresponde à sua marca de servidor Web:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">LogFormat &quot;%h %l %u %t \&quot;%r\&quot; %&gt;s %b \&quot;%{Referer}i\&quot; \&quot;%{User-agent}i\&quot; %{CF-Ray}i&quot; cf_custom</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">log_format cf_custom '$remote_addr - $remote_user [$time_local] ' '&quot;$request&quot; $status $body_bytes_sent ' '&quot;$http_referer&quot; &quot;$http_user_agent&quot; ' '$http_cf_ray';</span></div></span></span></span></code></pre>{{</raw>}}

___

## Recursos relacionados

-   [Contato com o suporte da Cloudflare](https://support.cloudflare.com/hc/articles/200172476)
-   [Solução de problemas dos erros do Cloudflare HTTP 5XX](https://support.cloudflare.com/hc/articles/115003011431)
-   [Diagnosticando problemas de rede com MTR e traceroute](https://www.digitalocean.com/community/tutorials/how-to-use-traceroute-and-mtr-to-diagnose-network-issues)
-   [ferramenta de linha de comando cURL](https://curl.haxx.se/)
