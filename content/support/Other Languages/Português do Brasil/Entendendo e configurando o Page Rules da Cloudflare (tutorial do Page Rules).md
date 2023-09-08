---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/218411427-Entendendo-e-configurando-o-Page-Rules-da-Cloudflare-tutorial-do-Page-Rules-
title: Entendendo e configurando o Page Rules da Cloudflare (tutorial do Page Rules)
---

# Entendendo e configurando o Page Rules da Cloudflare (tutorial do Page Rules)

_As Page Rules acionam determinadas ações sempre que uma solicitação corresponde a um dos padrões de URL que você configurou. Saiba como criar e editar Page Rules e entenda as diferentes configurações disponíveis._

### Neste artigo

-   [Visão geral](https://support.cloudflare.com/hc/pt-br/articles/218411427-Entendendo-e-configurando-o-Page-Rules-da-Cloudflare-tutorial-do-Page-Rules-#h_5a7SkOsNo5d5LE7e9IRiz)
-   [Antes de começar](https://support.cloudflare.com/hc/pt-br/articles/218411427-Entendendo-e-configurando-o-Page-Rules-da-Cloudflare-tutorial-do-Page-Rules-#h_7rzfw5kI8cqu4VKur6Mnur)
-   [Como criar uma regra de página](https://support.cloudflare.com/hc/pt-br/articles/218411427-Entendendo-e-configurando-o-Page-Rules-da-Cloudflare-tutorial-do-Page-Rules-#h_38Gq7mduJiXIjpVLxp3q19)
-   [Como editar uma regra de página](https://support.cloudflare.com/hc/pt-br/articles/218411427-Entendendo-e-configurando-o-Page-Rules-da-Cloudflare-tutorial-do-Page-Rules-#h_2WLkFHGqwlRgnZg3i0fl9I)
-   [Como entender a equiparação e o uso de referências dos caracteres curinga](https://support.cloudflare.com/hc/pt-br/articles/218411427-Entendendo-e-configurando-o-Page-Rules-da-Cloudflare-tutorial-do-Page-Rules-#h_6N5SySNYCjYUUnCKnC1Ea6)
-   [Resumo das configurações do Page Rules](https://support.cloudflare.com/hc/pt-br/articles/218411427-Entendendo-e-configurando-o-Page-Rules-da-Cloudflare-tutorial-do-Page-Rules-#h_18YTlvNlZET4Poljeih3TJ)
-   [Problemas Conhecidos](https://support.cloudflare.com/hc/pt-br/articles/218411427-Entendendo-e-configurando-o-Page-Rules-da-Cloudflare-tutorial-do-Page-Rules-#h_5lzcszkjqrZ2bZpZOtMQoP)
-   [Detalhes adicionais](https://support.cloudflare.com/hc/pt-br/articles/218411427-Entendendo-e-configurando-o-Page-Rules-da-Cloudflare-tutorial-do-Page-Rules-#h_2VORFoOUImLy7rpTgEWYLM)
-   [Recursos relacionados](https://support.cloudflare.com/hc/pt-br/articles/218411427-Entendendo-e-configurando-o-Page-Rules-da-Cloudflare-tutorial-do-Page-Rules-#h_7hlLS0cORjDJ2NCQqZTp8X)

___

## Visão geral

Você pode configurar uma regra de página para acionar uma ou mais ações sempre que um determinado padrão de URL for correspondido. As regras de página estão disponíveis no aplicativo **Rules** , na guia **Page Rules** .

O número padrão de regras de página permitidas depende do plano do domínio, conforme mostrado abaixo.

| **Plano** | **Regras de página permitidas** |
| --- | --- |
| 
Grátis

 | 

3

 |
| 

Pro

 | 

20

 |
| 

Business

 | 

50

 |
| 

Empresarial

 | 

125

 |

Você pode [adquirir regras adicionais](https://www.cloudflare.com/features-page-rules/) (até um máximo de 100) para domínios nos planos Free, Pro e Business.

___

## Antes de começar

É importante entender dois comportamentos básicos do Page Rules:

-   Somente a regra de página de prioridade mais alta entre as equiparadas é aplicada a uma solicitação.
-   As regras de página são priorizadas em ordem decrescente no painel de controle da Cloudflare, com a regra de prioridade mais alta no topo.

Uma regra de página corresponde a um padrão de URL baseado no seguinte formato (composto por cinco segmentos): <scheme>://<hostname><:port>/<path>?<query\_string>.

Um exemplo de URL com esses quatro segmentos fica assim:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.example.com:443/image.png?parameter1=value1</span></div></span></span></span></code></pre>{{</raw>}}

Os segmentos _esquema_ e _porta_ são opcionais. Se estiver omitido o, _esquema_ corresponderá aos protocolos _http://_ e _https://_ . Se nenhuma _porta_ estiver especificada, a regra corresponderá todas as portas.

Por fim, você pode desativar uma regra de página a qualquer momento. Enquanto uma regra estiver desabilitada, as ações não serão acionadas, mas a regra continuará aparecendo no aplicativo **Rules** na guia **Page Rules**, será editável e contará para o número de regras permitidas para o seu domínio. A opção _Salvar como rascunho_ cria uma regra de página que fica desabilitada por padrão.

___

## Como criar uma regra de página

As etapas para criar uma regra de página são:

1.  Faça o login no painel de controle da Cloudflare.
2.  Selecione o domínio ao qual deseja adicionar a regra de página.
3.  Clique no aplicativo **Rules** .
4.  Na guia **Regras de página****,** clique em **Criar regra de páginae**. A caixa de diálogo _Criar regra de página para <seu domínio>_ será aberta.
5.  Sob **Se a URL corresponder**, insira a URL ou o padrão de URL que deve corresponder à regra. [_Saiba mais sobre a correspondência com caracteres curinga_](https://support.cloudflare.com/hc/pt-br/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-#h_6N5SySNYCjYUUnCKnC1Ea6)
6.  A seguir, em **Então, as configurações são:** , clique em **+ Adicionar uma configuração** e selecione a configuração desejada no menu suspenso. Você pode incluir mais de uma configuração por regra. Saiba mais sobre configurações no [resumo abaixo](https://support.cloudflare.com/hc/pt-br/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-#h_18YTlvNlZET4Poljeih3TJ).
7.  No menu suspenso **Ordem** , especifique a ordem desejada: _Primeira, Última_ ou _Personalizada_.
8.  Para salvar, clique em uma das opções a seguir:
    -   **Salvar como rascunho** para salvar a regra e deixá-la desativada.
    -   **Salvar e implantar** para salvar a regra e habilitá-la imediatamente.

___

## Como editar uma regra de página

Para modificar uma regra existente:

1.  Faça o login no painel de controle da Cloudflare.
2.  Selecione o domínio para o qual você deseja editar a sua regra de página.
3.  Clique no aplicativo **Rules** .
4.  Na guia **Page Rules**, localize a regra para editar.
5.  Prossiga e faça as alterações necessárias, da seguinte maneira:
    -   Para ativar ou desativar uma regra, clique no botão **Ativar/Desativar**.
    -   Para modificar o padrão de URL, as configurações e a ordem, clique no botão **Editar** (ícone de chave inglesa). Na caixa de diálogo, insira as informações que você deseja alterar.
    -   Para remover uma regra, clique no botão **Excluir** (ícone x) e confirme clicando em **OK** na caixa de diálogo **Confirmar**.

___

## Como entender a equiparação e o uso de referências dos caracteres curinga

Você pode usar o asterisco (\*) em qualquer segmento do URL para equipará-lo a determinados padrões. Por exemplo,


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">exemplo.com/t*ste</span></div></span></span></span></code></pre>{{</raw>}}

Será equiparado a:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/test</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/toast</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/trust</span></div></span></span></span></code></pre>{{</raw>}}

_example.com/foo/\*_ não corresponde a example.com/foo.  No entanto, _example.com/foo\*_ corresponde.

### Dicas úteis

-   Para equiparar tanto _http_ quanto _https_, basta escrever _exemplo.com_. Não é necessário escrever _\*exemplo.com_.
-   Para corresponder todas as páginas de um domínio, escreva _example.com/\*_. Simplesmente escrever _example.com_ não vai funcionar.
-   Para equiparar todas as páginas de um domínio e seus subdomínios, escreva \*_example.com/\*_. Simplesmente escrever _example.com_ não vai funcionar.
-   Um caractere curinga (\*) em um URL de regra de página terá correspondência mesmo se não houver caracteres presentes. Além disso, pode incluir qualquer trecho do URL, incluindo a string de consulta.

### Como usar referências de caracteres curinga na equiparação

Você pode usar uma referência de caractere curinga correspondido mais tarde usando a sintaxe _$X_ . _X_ indica a série de um padrão glob. Assim, $1 representa a primeira equiparação do caractere curinga, $2 a segunda e assim por diante.

Isso é especificamente útil com a configuração _Redirecionar URL_ . Por exemplo:

Você poderia redirecionar:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://*.exemplo.com/*</span></div></span></span></span></code></pre>{{</raw>}}

para:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://exemplo.com/imagens/$1/$2.jpg</span></div></span></span></span></code></pre>{{</raw>}}

Essa regra seria equiparada a:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://cloud.exemplo.com/flare.jpg</span></div></span></span></span></code></pre>{{</raw>}}

o que acabaria sendo redirecionado para:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://exemplo.com/imagens/cloud/flare.jpg</span></div></span></span></span></code></pre>{{</raw>}}

Para usar um caractere _$_ literal na URL que está sendo redirecionada, evite-o adicionando uma barra invertida (\\) na frente:: _\\$_.

___

## Resumo das configurações do Page Rules

As configurações controlam a ação que a Cloudflare executa quando uma solicitação é equiparada ao padrão de URL definido em uma regra de página. Você pode usar as configurações para ativar e desativar vários recursos da Cloudflare em vários aplicativos do painel de controle. Observe que:

-   Algumas configurações exigem um plano de domínio Pro, Business ou Enterprise.
-   Você pode especificar mais de uma configuração a ser aplicada quando a regra for acionada.

Abaixo está a lista completa de configurações disponíveis, apresentadas na ordem em que aparecem na interface do usuário no **Page Rules da Cloudflare** .

| 
**Como configurar**

 | 

**Descrição**

 | 

**Planos**

 |
| --- | --- | --- |
| 

Sempre use HTTPS

 | 

Ative ou desative o recurso **[Always Use HTTPS](/ssl/edge-certificates/additional-options/always-use-https)** da guia **Certificados de borda** no aplicativo **Cloudflare SSL/TLS** . Se ativado, qualquer URL _http://_ será convertido em _https://_ por meio de um redirecionamento 301.

Se essa opção não aparecer, você não possui um **Edge Certificate** ativo.

 | 

-   Todos

 |
| 

Minificação Automática

 | 

Indique quais extensões de arquivo devem ser minificadas automaticamente. [Saiba mais](https://support.cloudflare.com/hc/articles/200168196).

 | 

-   Todos

 |
| 

Reescrita Automática de HTTPS

 | 

Ative ou desative o recurso **Reescrita Automática de HTTPS da Cloudflare** da guia **Certificados de borda** no aplicativo  **Cloudflare SSL/TLS** . [Saiba mais](/ssl/edge-certificates/additional-options/automatic-https-rewrites).

 | 

-   Todos

 |
| 

TTL de cache de navegador

 | 

Controle por quanto tempo os recursos armazenados em cache pelos navegadores clientes permanecem válidos. A interface do usuário e a API da Cloudflare proíbem a configuração de **Cache do navegador TTL** como _0_ para domínios que não sejam empresariais. [Saiba mais](/cache/how-to/edge-browser-cache-ttl/).

 | 

-   Todos

 |
| 

Veriicação de Integridade do Navegador

 | 

Inspecione o navegador do visitante em busca de cabeçalhos geralmente associados a spammers e determinados bots. [Saiba mais](https://support.cloudflare.com/hc/articles/200170086).

 | 

-   Todos

 |
| 

Ignorar armazenamento em cache com um cookie

 | 

Ignore o cache e busque recursos no servidor de origem se uma expressão regular for equiparada a um nome de cookie presente na solicitação.

Se você adicionar tanto essa configuração quanto a configuração _Cache on Cookie_ à mesma regra de página, o _Cache on Cookie_ terá precedência sobre o _Bypass Cache on Cookie_.

_Consulte os detalhes adicionais abaixo para saber mais sobre a compatibilidade limitada com expressões regulares._

 | 

-   Business
-   Empresarial

 |
| 

Cache por tipo de dispositivo

 | 

Separe o conteúdo em cache com base no tipo de dispositivo do visitante. [Saiba mais.](/cache/how-to/edge-browser-cache-ttl/create-page-rules/#cache-by-device-type-enterprise-only)

 | 

-   Empresarial

 |
| 

Armadura contra Fraude do Cache

 | 

Proteja-se contra ataques de fraude do cache da web e, ao mesmo tempo, continue permitindo que ativos estáticos sejam armazenados em cache. Essa configuração verifica se a extensão da URL corresponde ao _Content-Type_ retornado. [Saiba mais.](/cache/cache-security/cache-deception-armor/)

 | 

-   Todos

 |
| 

Chave do cache

 | 

Também conhecida como _Chave do cache Personalizada_ .

Controle especificamente quais variáveis incluir ao decidir quais recursos armazenar em cache. Isso permite que os clientes determinem o que armazenar em cache com base em algo que não seja apenas a URL. [Saiba mais](/cache/how-to/cache-keys/).

 | 

-   Empresarial

 |
| 

Nível de cache

 | 

A aplicação do caching personalizado com base na opção selecionada:

**Bypass** \- Cloudflare não armazena em cache.

**No Query String** — fornece recursos do cache quando não há uma cadeia de consulta.

**Ignore Query String** – fornece os mesmos recursos para todo mundo independentemente da cadeia de consulta.

**Standard —** armazena em cache todo o conteúdo estático que possui uma cadeia de consulta.

**Coloque tudo em cache** –  trata todo o conteúdo como estático e armazena em cache todos os tipos de arquivos além do [conteúdo da Cloudflare armazenado em cache por padrão](/cache/concepts/default-cache-behavior#default-cached-file-extensions).  Respeita os cabeçalhos do cache do servidor de origem, a não ser que a **Edge Cache TTL** também esteja configurada na regra de página. Quando combinada com uma **Edge Cache TTL** > _0_, **Cache Everything** remove os cookies da resposta do servidor Web de origem.   


 | 

-   Todos

 |
| 

Cache on Cookie

 | 

Aplique a opção _Cache Everything_ (configuração _Cache Level_) com base na equiparação de uma expressão regular com um nome de cookie.

Se você adicionar tanto essa configuração quanto _Bypass Cache on Cookie_ à mesma regra de página, o _Cache on Cookie_ terá precedência sobre _Ignorar armazenamento em cache com um cookie_.

 | 

-   Business
-   Empresarial

 |
| 

TTL do cache por código de status

 | 

Clientes Enterprise podem definir o tempo até entrar no ar (TTL) do cache com base no status da resposta do servidor web de origem. O TTL do cache é a duração de um recurso na Rede da Cloudflare antes de ser marcado como obsoleto ou descartado do cache. Códigos de status são retornados pela origem do recurso.   Definir o TTL do cache com base no status da resposta substitui o comportamento-padrão do cache (armazenamento em cache padrão) para arquivos estáticos e também substitui as instruções do cache enviadas pelo servidor web de origem. Para armazenar em cache ativos não estáticos, defina o "Nível do cache" como "Colocar tudo em cache" usando uma regra de página. Definir o controle de cache sem armazenamento ou um TTL Baixo (usando max-age/s-maxage) aumenta as solicitações para os servidores web de origem e diminui a performance. [Saiba mais](https://support.cloudflare.com/hc/pt-br/articles/360043842472-Configuring-cache-TTL-by-status-code).

 | 

-   Empresarial

 |
| 

Desativar aplicativos

 | 

Desative todos os **Cloudflare Apps** ativos.

 | 

-   Todos

 |
| 

Desativar desempenho

 | 

Desligar:

-   [Minificação Automática](https://support.cloudflare.com/hc/articles/200168196)
-   [Rocket Loader](https://support.cloudflare.com/hc/articles/200168056)
-   [Mirage](https://support.cloudflare.com/hc/articles/200403554)
-   [Polish](https://support.cloudflare.com/hc/articles/360000607372)

 | 

-   Todos

 |
| 

Desativar o Railgun

 | 

Desative o recurso **Railgun** do aplicativo **Speed** da Cloudflare.

 | 

-   Business
-   Empresarial

 |
| 

Desativar a segurança

 | 

Desligar:

-   [Ofuscação de e-mail](https://support.cloudflare.com/hc/articles/200170016)
-   [Rate Limiting (versão anterior)](https://support.cloudflare.com/hc/articles/115001635128)
-   [Scrape Shield](https://support.cloudflare.com/hc/articles/200171036)
-   [Exclusão pelo servidor](https://support.cloudflare.com/hc/articles/200170036)
-   [Bloqueio de URL (zona)](/waf/tools/zone-lockdown/)
-   [Regras gerenciadas do WAF (versão anterior)](https://support.cloudflare.com/hc/articles/200172016)

 | 

-   Todos

 |
| 

TTL de cache de borda

 | 

Indique por quanto tempo um recurso deve ficar armazenado em cache na Rede de borda da Cloudflare. O _Edge Cache TTL_ não fica visível nos cabeçalhos de resposta.  O _Edge Cache TTL_ mínimo depende do tipo de plano:

Gratuito – 2 horas  
Pro – 1 hora  
Business – 1 segundo  
Enterprise – 1 segundo

 | 

-   Todos

 |
| 

Ofuscação de e-mail

 | 

Ative ou desative o recurso **Cloudflare Email Obfuscation** do aplicativo **Cloudflare Scrape Shield** . [Saiba mais.](https://support.cloudflare.com/hc/articles/200170016)

 | 

-   Todos

 |
| 

Redirecionamento de URL

 | 

Redireciona uma URL para outra usando um _redirecionamento HTTP 301/302_. _Consulte [Como entender a correspondência e o uso de referências dos caracteres curinga acima](https://support.cloudflare.com/hc/articles/218411427#h_6N5SySNYCjYUUnCKnC1Ea6)._

 | 

-   Todos

 |
| 

Substituição do Cabeçalho Host

 | 

Aplique um cabeçalho de host específico. [Saiba mais](https://support.cloudflare.com/hc/articles/206652947).

 | 

-   Empresarial

 |
| 

Cabeçalho de Geolocalização de IP

 | 

A Cloudflare adiciona um cabeçalho HTTP _CF-IPCountry_ que contém o código do país que corresponde ao visitante.

 | 

-   Todos

 |
| 

Mirage

 | 

Ative ou desative o **Mirage da Cloudflare** do aplicativo **Speed da Cloudflare** . [Saiba mais](https://support.cloudflare.com/hc/articles/200403554).

 | 

-   Pro
-   Business
-   Empresarial

 |
| 

Criptografia Oportunística

 | 

Ative ou desative o recurso **Criptografia Oportunística da Cloudflare** da guia **Certificados de borda** no aplicativo **SSL/TLS da Cloudflare** . [Saiba mais](/ssl/edge-certificates/additional-options/opportunistic-encryption).

 | 

-   Todos

 |
| Controle do Cache de Origem | O [Controle de Cache de Origem](/cache/concepts/cache-control/) é ativado por padrão nos domínios Gratuito, Pro e Business e desabilitado por padrão nos domínios Enterprise. | 

-   Todos

 |
| 

Passagem liberada de página de erro da origem

 | 

Ative ou desative as páginas de erro da Cloudflare geradas a partir de problemas enviados pelo servidor de origem. Se estiver ativada, essa configuração provoca páginas de erro emitidas pela origem.

 | 

-   Empresarial

 |
| 

Polish

 | 

Aplique opções do recurso **Polish** do aplicativo **Speed**  da Cloudflare. [Saiba mais](/images/polish).

 | 

-   Pro
-   Business
-   Empresarial

 |
| 

Classificação de Query String

 | 

Ative ou desative a reordenação de cadeias de consulta. Quando as cadeias de consulta têm a mesma estrutura, o caching melhora. [Saiba mais](https://support.cloudflare.com/hc/articles/206776797).

 | 

-   Empresarial

 |
| 

Substituição de Resolver

 | 

Altere o endereço de origem para o valor especificado nessa configuração. [Saiba mais](https://support.cloudflare.com/hc/articles/206190798).

 | 

-   Empresarial

 |
| 

Respeite as ETags consistentes

 | 

Ative ou desative as verificações de equivalência de byte por byte entre o cache da Cloudflare e o servidor de origem. [Saiba mais](https://support.cloudflare.com/hc/articles/218505467).

 | 

-   Empresarial

 |
| 

Buffering de Resposta

 | 

Ative ou desative se a Cloudflare deve aguardar receber um arquivo inteiro do servidor de origem antes de redirecioná-lo ao visitante do site. Por padrão, a Cloudflare envia os pacotes para o cliente à medida que eles chegam do servidor de origem.

 | 

-   Empresarial

 |
| 

Rocket Loader

 | 

Ative ou desative o **Cloudflare Rocket Loader** no aplicativo **Speed** da Cloudflare**.** [Saiba mais](https://support.cloudflare.com/hc/articles/200168056).

 | 

-   Todos

 |
| 

Nível de segurança

 | 

Opções de controle para o recurso **Nível de Segurança** do aplicativo **Segurança** . [Saiba mais](https://support.cloudflare.com/hc/articles/200170056).

 | 

-   Todos

 |
| 

Exclusão pelo servidor

 | 

Ative ou desative o recurso **Server Side Excludes** do aplicativo **Scrape Shield** da Cloudflare. [Saiba mais](https://support.cloudflare.com/hc/articles/200170036).

 | 

-   Todos

 |
| 

SSL

 | 

Opções de controle para o recurso **SSL** da guia **Certificado de borda** no aplicativo **SSL/TLS** da Cloudflare. [Saiba mais](/ssl/origin-configuration/ssl-modes).

 | 

-   Todos

 |
| 

Cabeçalho True-Client-IP

 | 

Ative ou desative o recurso **True-Client-IP Header** do aplicativo **Network** da Cloudflare. [Saiba mais](https://support.cloudflare.com/hc/articles/206776727).

 | 

-   Empresarial

 |
| 

Firewall de Aplicativos Web (versão anterior)

 | 

Ative ou desative as **regras gerenciadas do WAF**, definidas em **Segurança** > **WAF** > **Regras gerenciadas**. [Saiba mais](https://support.cloudflare.com/hc/articles/200172016).

Não é possível ativar ou desativar regras gerenciadas de WAF individuais usando as regras de página.

 | 

-   Pro
-   Business
-   Empresarial

 |

___

## Problemas Conhecidos

**Problema de configuração de regra de página levando ao** " **_Erro 500 (erro interno do servidor)_****"**

**Causa raiz**: Isso pode ser devido a um problema de configuração em uma regra de página. Ao criar uma regra de página que usa dois curingas, como uma regra de _redirecionamento de URL_, é possível criar uma regra que menciona o segundo curinga com o marcador de posição $2. Veja o exemplo abaixo:

![configuração de regra de página de exemplo com dois curingas. O URL de encaminhamento contém um espaço reservado $2, que será substituído pelo conteúdo correspondente à segunda ](/images/support/page-rule-create.png)

Ao atualizar a mesma regra, você pode remover um dos curingas do campo **Se o URL corresponder** e salvá-la. Veja o exemplo abaixo:

![configuração de regra de página incorreta com um único curinga, mas ainda usando o espaço reservado de $2 no URL de encaminhamento. Essa configuração causa ](/images/support/page-rule-update.png)

Se você fizer isso, o marcador de posição $2 fará referência a um caractere curinga que não existe mais e, como tal, um "_Erro 500 (erro interno do servidor)_"é lançado quando um URL aciona a regra da página .

**Solução**: atualize a regra de página e remova a referência _$2_ para o segundo curinga. Se houver apenas um curinga, apenas _$1_ pode ser usado.

___

## Detalhes adicionais

### Configuração de Ignorar armazenamento em cache com um cookie

Essa configuração está disponível para clientes dos planos business e enterprise.

A configuração **Ignorar armazenamento em cache com um cookie** é compatível com expressões regulares básicas (regex) conforme se segue:

-   Um operador de canal (representado por |) para correspondência a vários cookies usando a lógica booleana _OU_. Por exemplo, bypass=.\*_|PHPSESSID=.\*_ ignoraria o cache se um cookie chamado bypass ou PHPSESSID estivesse configurado, independentemente do valor do cookie.
-   O operador de caracteres curinga (representado por .\*), de modo que um valor de regra "t.\*ste=" se equipararia tanto a um cookie chamado teste quanto a um chamado teeeste.

As limitações incluem:

-   150 caracteres por regex de cookie
-   12 caracteres curingas por regex de cookie
-   1 caractere curinga entre cada | no regex de cookie

Para saber como configurar o **Ignorar armazenamento em cache com um cookie** com uma variedade de plataformas, consulte estes artigos:

-   [Cache de exibições de página anônimas com WordPress ou WooCommerce](https://support.cloudflare.com/hc/articles/236166048)
-   [Cache de exibições de página anônimas com Magento 1 e Magento 2](https://support.cloudflare.com/hc/articles/236168808)
-   [Como armazenar em cache um HTML estático?](https://support.cloudflare.com/hc/articles/202775670)

**Observação:** se você adicionar essa configuração e a configuração _Cache On Cookie_ somente empresarial à mesma regra de página, o _Cache On Cookie_ tem precedência sobre o _Ignorar armazenamento em cache com um cookie_.

### Ocorrências de nome de zona precisam terminar com uma barra

Ao salvar uma regra de página, a Cloudflare garante que haja uma barra após cada ocorrência de nome de zona no campo **Se o URL corresponder a**. Por exemplo, se o nome de zona for `example.com`, então:

-   `example.com` será salvo como `example.com/`
-   `example.com/path/example.com` será salvo como `example.com/path/example.com/`

Observe que `example.com/some-path/cloudflare.com` será salvo _sem_ a barra no final, pois o nome da zona não é `cloudflare.com`.

### Portas de rede compatíveis com o Page Rules

No campo **Se o URL corresponder** de uma regra de página, somente as portas a seguir podem ser especificadas:

-   Uma das portas HTTP/HTTPS [compatíveis com o proxy da Cloudflare](/fundamentals/get-started/reference/network-ports/#network-ports-compatible-with-cloudflares-proxy).
-   Uma porta personalizada de um aplicativo HTTPS do [Cloudflare Spectrum](/spectrum/).

### Como usar Page Rules com o Workers

Caso a URL da solicitação atual corresponda a uma regra de página e a uma [rota personalizada do Workers](/workers/platform/routes), algumas configurações do Page Rules não serão aplicadas. Para saber como usar o Page Rules com o Workers, consulte [Workers: Page Rules](/workers/configuration/workers-with-page-rules/) na documentação para desenvolvedores.

___

## Recursos relacionados

-   [Regras de página recomendadas a considerar](https://support.cloudflare.com/hc/articles/224509547)
-   [Quais subdomínios são apropriados para nuvens laranja/cinza?](https://support.cloudflare.com/hc/pt-br/articles/200169626-What-subdomains-are-appropriate-for-orange-gray-clouds-)
-   [Como uso o Coloque tudo em cache com a Cloudflare?](https://support.cloudflare.com/hc/articles/202775670)
-   [Como armazenar em cache um HTML estático?](https://support.cloudflare.com/hc/articles/200172256)
-   [Mensagem de erro offline ao atualizar ou acessar a seção admin do meu sistema de gerenciamento de conteúdo](https://support.cloudflare.com/hc/articles/200169526)
