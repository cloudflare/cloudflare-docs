---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/115001635128-Como-configurar-o-Rate-Limiting-da-Cloudflare
title: Como configurar o Rate Limiting da Cloudflare
---

# Como configurar o Rate Limiting da Cloudflare

_Configure o Rate Limiting da Cloudflare para proteger seus aplicativos do site contra ataques de negação de serviço, tentativas de login de força bruta e outros comportamentos abusivos._

### Neste artigo

-   [Visão geral](https://support.cloudflare.com/hc/pt-br/articles/115001635128-Como-configurar-o-Rate-Limiting-da-Cloudflare#4TBnjI1OqjroF6MLXB3Wmr)
-   [Análise de Dados](https://support.cloudflare.com/hc/pt-br/articles/115001635128-Como-configurar-o-Rate-Limiting-da-Cloudflare#7Cy9dajZBWM5pm9aIP5mMD)
-   [Licenças de Rate Limiting por plano](https://support.cloudflare.com/hc/pt-br/articles/115001635128-Como-configurar-o-Rate-Limiting-da-Cloudflare#4gd3s4xzV2xOE4CUbRIEAo)
-   [Componentes de uma regra de Rate Limiting](https://support.cloudflare.com/hc/pt-br/articles/115001635128-Como-configurar-o-Rate-Limiting-da-Cloudflare#4uDonp8FX9ARo4nzdBvXiY)
-   [Identifique os limiares do limite de taxa](https://support.cloudflare.com/hc/pt-br/articles/115001635128-Como-configurar-o-Rate-Limiting-da-Cloudflare#o8KwUgkUml3Y7bAapvXjP)
-   [Tarefa 1: configure uma regra básica de Rate Limiting](https://support.cloudflare.com/hc/pt-br/articles/115001635128-Como-configurar-o-Rate-Limiting-da-Cloudflare#3UWQC5PrVScHgEGRMobRMm)
-   [Tarefa 2: configure critérios avançados (apenas planos Business e Empresarial)](https://support.cloudflare.com/hc/pt-br/articles/115001635128-Como-configurar-o-Rate-Limiting-da-Cloudflare#5iIwkkHwcJbNRynWjrDIGb)
-   [Tarefa 3: configure a resposta avançada (apenas planos Business e Empresarial)](https://support.cloudflare.com/hc/pt-br/articles/115001635128-Como-configurar-o-Rate-Limiting-da-Cloudflare#7uCtK6GPAfWDNlSHch7KBs)
-   [Tarefa 4: configure a opção Ignorar (apenas planos Empresariais)](https://support.cloudflare.com/hc/pt-br/articles/115001635128-Como-configurar-o-Rate-Limiting-da-Cloudflare#3rCyCwZTjnPl3brIt7Ytrg)
-   [Ordem de execução das regras](https://support.cloudflare.com/hc/pt-br/articles/115001635128-Como-configurar-o-Rate-Limiting-da-Cloudflare#rule-execution-order)
-   [Recursos relacionados](https://support.cloudflare.com/hc/pt-br/articles/115001635128-Como-configurar-o-Rate-Limiting-da-Cloudflare#516XYZwx0Mdhh7hLMg60iT)

___

## Visão geral

O **Rate Limiting** da Cloudflare identifica e mitiga automaticamente taxas de solicitação excessivas para URLs específicas ou para um domínio inteiro.  As taxas de solicitação são calculadas localmente para data centers individuais da Cloudflare.  Os usos mais comuns para o **Rate Limiting** são [proteção contra DDoS](https://www.cloudflare.com/learning/ddos/glossary/denial-of-service/), [proteção contra ataque de força bruta](https://www.cloudflare.com/learning/bots/brute-force-attack/) e para limitar o acesso a pesquisas de fóruns, chamadas de API ou recursos que envolvem operações com uso intensivo de banco de dados na sua origem. 

Quando um endereço IPv4 individual ou intervalo de IP IPv6 /64 excede os limiares de regra, solicitações adicionais para o servidor Web de origem são bloqueadas com uma resposta HTTP 429 que inclui um cabeçalho **Tentar novamente depois** para indicar quando o cliente pode retomar o envio de solicitações.

___

## Análise de Dados

Veja a análise de dados do Rate Limiting em **Análise de Dados** > **Segurança**. A análise de dados do Rate Limiting usa linhas sólidas para representar o tráfego que corresponde a solicitações simuladas e linhas pontilhadas para retratar solicitações bloqueadas reais. Os registro gerados por uma regra de Rate Limiting só são visíveis para clientes Enterprise por meio do [Cloudflare Logs](/logs/). 

A Cloudflare retorna um erro HTTP 429 para solicitações bloqueadas.  Detalhes sobre solicitações bloqueadas por local são fornecidos a clientes Enterprise na análise de dados dos **Códigos de status** no painel de análise de dados disponível em **Análise de Dados** > **Tráfego**. 

___

## Licenças de Rate Limiting por plano

O número de regras permitidas de Rate Limiting depende do plano do domínio:

| Plano | Nº de regras | Ações | Duração da ação | Período da solicitação |
| --- | --- | --- | --- | --- |
| Grátis | 1 | Bloqueio | 1 minuto ou 1 hora | 10 segundos ou 1 minuto |
| Pro | 10 | Bloqueio, CAPTCHA legado, Desafio JS, Desafio Gerenciado ou Log | 1 minuto ou 1 hora | 10 segundos ou 1 minuto |
| Business | 15 | Bloqueio, CAPTCHA legado, Desafio JS, Desafio Gerenciado ou Log | 1 minuto, 1 hora ou 24 horas | 10 segundos, 1 minuto ou 10 minutos |
| Empresarial | 100 | Bloqueio, CAPTCHA legado, Desafio JS, Desafio Gerenciado ou Log | Qualquer duração inserida entre 10 segundos e 86400 segundos (24 horas) | Qualquer valor inserido entre 10 segundos e 3600 segundos (1 hora). |

O Rate Limiting da Cloudflare oferece suporte a vários níveis de controle de configuração, dependendo do plano Cloudflare do domínio.  A tabela abaixo mapeia o que você pode fazer com base no seu plano:

| 
número

 | 

Tarefa

 | 

Disponível em

 |
| --- | --- | --- |
| 

1

 | 

Configure uma regra básica de Rate Limiting

 | 

Todos os planos

 |
| 

2

 | 

Configure critérios avançados

 | 

Planos Business e Empresarial

 |
| 

3

 | 

Configure a resposta avançada

 | 

Planos Business e Empresarial

 |
| 

4

 | 

Configure a opção Ignorar

 | 

Plano Empresarial

 |

___

## Componentes de uma regra de Rate Limiting

Uma regra de Rate Limiting consiste em três componentes distintos.  Clique em um componente abaixo para expandir os detalhes:

As solicitações recebidas são correspondidas com base em:

#### **O caminho da solicitação**

Por exemplo:

-   http://example.com/example
-   http://example.com/example/\*

O caminho da solicitação não diferencia maiúsculas e minúsculas.  Os padrões não podem corresponder conteúdo depois de sequências de consulta (_?_) ou âncoras (_#_).  Um asterisco (_\*_) corresponderá a qualquer sequência de caracteres, incluindo uma sequência vazia. Por exemplo:

-   \*.example.com/\* corresponde a qualquer caminho em qualquer subdomínio de example.com
-   \*example.com/example.html corresponde a exemplo.html em example.com ou qualquer subdomínio de example.com
-   \* corresponde a qualquer página em seu site

Uma solicitação de _example.com/path_ não é igual a _example.com/path/_.  A única exceção a essa regra é a página inicial, _example.com_ , que corresponde a _example.com/_.

#### **O esquema de solicitação**

_HTTP_ ou _HTTPS_. Se nenhum for especificado, ambos corresponderão e a regra listará _\_ALL\__.

#### **O método de solicitação**

_POST_ ou _GET_. Se nenhum for especificado, todos os métodos corresponderão e a regra listará _\_ALL\__.

#### **(opcional) O código de resposta de origem**

Por exemplo, corresponda uma regra de **Rate Limiting** somente quando um HTTP 401 ou 403 for retornado do servidor Web de origem.  Uma regra acionada que corresponde aos critérios do código de resposta bloqueia as solicitações subsequentes desse cliente, independentemente do código de resposta de origem. 

Uma regra pode corresponder no número e no período de tempo de todas as solicitações provenientes do mesmo cliente:

#### **Número de solicitações**

Especifique um mínimo de duas solicitações.  Para bloqueio de solicitação única, torne o caminho indisponível; por exemplo, configurando seu servidor Web de origem para retornar um 403.

#### **Período da solicitação**

Uma regra é acionada depois que as solicitações de um cliente excedem o limiar para a duração especificada.

 

A mitigação de regras consiste em:

#### **Ação de mitigação**

As ações de limite de taxa baseiam-se no plano de domínio conforme mencionado acima em **Licenças de Rate Limiting por plano**:

-   **Bloquear** **\-** a Cloudflare emite um erro HTTP 429 quando o limiar é excedido.
-   **CAPTCHA Legado** **\-** O visitante deve ser aprovado no desafio captcha.  Caso seja aprovado, a Cloudflare permite a solicitação.
-   **Desafio JS** **\-** o visitante precisa passar em um desafio JavaScript da Cloudflare. Em caso afirmativo, a Cloudflare permite a solicitação.
-   **Registro:** as solicitações são registradas no [Cloudflare Logs](https://support.cloudflare.com/hc/articles/216672448). Isso ajuda a testar as regras antes de aplicar na produção.

#### **Duração da proibição**

Definir um excesso tempo limite menor que o limiar faz com que a API aumente automaticamente o excesso de tempo limite para igualar o limiar. 

Os visitantes do **Rate Limiting** recebem uma página HTML padrão se uma [página de erro personalizada](https://support.cloudflare.com/hc/articles/200172706) não for especificada.  Além disso, os clientes Business e Empresariais podem especificar uma resposta na própria regra. Consulte _Tarefa 3: configure uma resposta avançada_ abaixo.

___

## Identifique os limiares do limite de taxa

Para identificar um limiar geral para o **Rate Limiting** da Cloudflare, divida 24 horas de solicitações do site não armazenadas em cache pelos visitantes únicos pelas mesmas 24 horas. Então, divida pelos minutos médios estimados de uma visita.  Por fim, multiplique por 4 (ou mais) para estabelecer um limiar estimado por minuto para o site. Um valor superior a 4 é bom, já que a maioria dos ataques é uma ordem de magnitude acima das taxas de tráfego típicas.

Para identificar o Rate Limiting de URL para URLs específicas, use 24 horas de solicitações não armazenadas em cache e visitantes únicos para a URL específica.  Ajuste os limiares com base em relatórios de usuários e no seu próprio monitoramento.

___

## Tarefa 1: configure uma regra básica de Rate Limiting

Clique para expandir detalhes sobre como criar os dois tipos comuns de regra de **Rate Limiting** da Cloudflare.

O **Rate Limiting** contém uma ferramenta de um clique **Proteger seu login** que cria uma regra para bloquear o cliente por 15 minutos ao enviar mais de 5 solicitações POST em 5 minutos. Isso é suficiente para bloquear a maioria das tentativas de força bruta.

1.  Faça login na sua conta da Cloudflare.
2.  Selecione o domínio a ser protegido.
3.  Navegue até **Segurança > WAF > Regras de Rate Limiting**.
4.  Em **Rate Limiting**, clique em **Proteja seu login**.
5.  Digite o **Nome da regra** e **Digite sua URL de login** na caixa de diálogo **Proteger seu login** que é exibida.
6.  Clique em **Salvar**.
7.  O **Nome da regra** aparecerá na lista de regras do **Rate Limiting**.

1\. Entre no painel de controle da Cloudflare

2\. Selecione o domínio adequado.

3\. Navegue até **Segurança** > **WAF** > **Regras de Rate Limiting**.

4\. Clique em **Criar uma regra de limitação de taxa**.  Será aberta uma caixa de diálogo para especificar os detalhes da nova regra.

![Crie uma caixa de diálogo pop-up de regra de limitação de taxa com um exemplo de configuração de regra. A regra bloqueará solicitações de endereços de IP que excedam 150 solicitações por minuto por uma hora.](/images/support/previous-rate-limiting-create-rule.png)

5\. Insira um **Nome da regra** descritivo.

6\. Para **Se o tráfego corresponder à URL**, selecione um esquema HTTP na lista suspensa, bem como uma URL.

7\. Em **do mesmo endereço de IP excede**, insira um número inteiro maior que 1 para representar o  número de solicitações em um período de amostragem.

8\. Para **solicitações por**, selecione o período de amostragem (o período durante o qual as solicitações são contadas). Nos planos Enterprise, os domínios podem inserir manualmente qualquer duração entre 10 segundos e 3.600 segundos (1 hora).

9\. Na lista suspensa **Então**, escolha uma das ações disponíveis com base no seu plano.  Leia a seção _Mitigação de regra_ de _Componentes de uma regra de Rate Limiting_ acima para ver os detalhes.

10\. Se você selecionou _Bloqueio_ ou _Registro_, para **corresponder ao tráfego desse visitante por**, selecione por quanto tempo aplicar a opção depois que um limiar for acionado. Nos planos Enterprise, os domínios podem inserir qualquer duração entre 10 segundos e 86.400 segundos (24 horas).

11\. Para ativar a nova regra, clique em **Salvar e implantar**.

A nova regra aparece na lista de regras de limitação de taxa.

Em geral, ao definir um limiar inferior:

1.  Deixe as regras existentes no lugar e adicione uma nova regra com o limiar inferior.
2.  Quando a nova regra estiver em vigor, aguarde a duração da ação da regra antiga passar antes de excluir a regra antiga.

Ao definir um limiar mais alto (devido ao bloqueio de cliente legítimo), aumente o limiar dentro da regra existente.

___

## Tarefa 2: configure critérios avançados (apenas planos Business e Empresarial)

A opção **Critérios Avançados** configura quais métodos HTTP, respostas de cabeçalho e códigos de resposta de origem correspondem à sua regra de Rate Limiting.

Para configurar seus critérios avançados para uma regra nova ou existente, siga estas etapas:

1\. Expandir os **Critérios avançados**.

![Campos disponíveis ao configurar os critérios avançados para uma regra de limitação de taxa.](/images/support/previous-rate-limiting-advanced-criteria.png)

2\. Selecionar um valor na lista suspensa **Método(s)**. O valor padrão é _QUALQUER_, que corresponde a todos os métodos HTTP.

3\. Filtrar por **Cabeçalhos de resposta HTTP**. Clique em **Adicionar campo de resposta de cabeçalho** para incluir cabeçalhos retornados pelo seu servidor web de origem.

O cabeçalho **CF-Cache-Status** aparece por padrão para que a Cloudflare entregue recursos armazenados em cache em vez de limitar a taxa desses recursos. Para limitar também a taxa de recursos armazenados em cache, remova esse cabeçalho clicando no botão **X** ou ative **Também aplicar o limite de taxa a ativos armazenados em cache**.

Se você tiver mais de um cabeçalho em **Cabeçalhos de resposta HTTP**, uma lógica booleana _E_ será aplicada. Para excluir um cabeçalho, use a opção _Não é igual a_. Cada cabeçalho diferencia maiúsculas e minúsculas.

4\. Em **Código(s) de resposta de origem**, insira o valor numérico de cada código de resposta HTTP para corresponder.  Separe dois ou mais códigos HTTP com uma vírgula; por exemplo: `401, 403`).

5\. (Opcional) Configurar recursos adicionais de limitação de taxa, de acordo com seu plano.

6.  Clicar em **Salvar e implantar**.

___

## Tarefa 3: configure a resposta avançada (apenas planos Business e Empresarial)

A opção **Resposta Avançada** configura o formato de informação retornado pela Cloudflare quando o limiar de uma regra é excedido. Use a **Resposta Avançada** quando quiser retornar texto simples estático ou conteúdo JSON.

Para configurar texto simples ou uma resposta JSON:

1\. Expandir **Resposta avançada**.

![Campos disponíveis ao configurar uma resposta avançada para uma regra de limitação de taxa.](/images/support/previous-rate-limiting-advanced-response.png)

2\. Selecionar um formato de **Tipo de resposta** diferente do padrão: _JSON personalizado_ ou _TEXT personalizado_.

3\. Inserir o texto não criptografado ou a resposta JSON que você quer retornar. O tamanho máximo de resposta é de 32 KB.

4\. (Opcional) Configurar recursos adicionais de limitação de taxa, de acordo com seu plano.

5\. Clicar em **Salvar e implantar**.

### Usar uma página HTML personalizada ou um redirecionamento

Para exibir uma página HTML personalizada, configure uma página personalizada para erros de HTTP 429 ("Muitas solicitações") no painel. A Cloudflare mostra essa página quando você seleciona "Página padrão do Rate Limiting da Cloudflare" em **Tipo de resposta** (o valor-padrão do campo).

É possível usar esse método para redirecionar o cliente limitado por taxa a um URL específico:

1\. Crie uma página HTML no servidor que redirecione para o URL final da página que você quer exibir. Inclua uma tag [meta refresh](https://www.w3.org/TR/WCAG20-TECHS/H76.html) no conteúdo da página, como no exemplo a seguir:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;!doctype html&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;html&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;head&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &lt;meta charset=&quot;utf-8&quot;&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &lt;title&gt;Página de RL personalizado&lt;/title&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &lt;meta http-equiv=&quot;refresh&quot; content=&quot;0; url='https://yourzonename/block'&quot; /&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;/head&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;body&gt; &lt;/body&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;/html&gt;</span></div></span></span></span></code></pre>{{</raw>}}

Anote o URL público da página criada.

2\. No painel de controle da Cloudflare, navegue até **Página inicial da conta** > **Configurações** > **Páginas Personalizadas**.

3\. Em **Erros 429**, clique em **Páginas Personalizadas**.

4\. Insira o URL da página criada no servidor — que contém a tag meta refresh — e clique em **Publicar**.

Seguir a mesma abordagem para retornar texto não criptografado ou conteúdo JSON em respostas maiores que 32 KB. Nesse caso, o URL de redirecionamento seria o URL do texto não criptografado ou do recurso JSON que você quer exibir.

**Observações:**

-   Sua regra de Rate Limiting não pode coincidir com o URL de redirecionamento incluído na página HTML personalizada para erros 429.
-   Para proteger contra DDoS, a página de redirecionamento deve incluir somente recursos armazenados em cache pela Cloudflare.

___

## Tarefa 4: configure a opção Ignorar (apenas planos Empresariais)

**Ignorar** cria uma lista de permissões ou exceção para que nenhuma ação se aplique a um conjunto específico de URLs, mesmo que o limite de taxa seja correspondido. Siga estas etapas para configurar a opção **Ignorar**:

1\. Expandir **Ignorar**.

2\. Na caixa de texto **Ignorar regra para estes URLs**, inserir os URLs que estão isentos da regra de limitação de taxa. Inserir cada URL em sua própria linha. Um HTTP ou HTTPS especificado no URL será removido automaticamente quando a regra for salva e, em vez disso, se aplica a HTTP e HTTPS.

![Configurar dois URLs para ignorar uma regra de limitação de taxa (um por linha).](/images/support/previous-rate-limiting-bypass.png)

3\. (Opcional) Configurar recursos adicionais de limitação de taxa, de acordo com seu plano.

4\. Clicar em **Salvar e implantar**.

___

## Ordem de execução das regras

**Caso de uso 1**: se uma solicitação corresponder a ambas as regras abaixo,

-   regra 1: correspondência com _test.example.com_
-   regra 2: correspondência com _\*.example.com\*_

ou

-   regra 1: correspondência com _\*.example.com\*_
-   regra 2: correspondência com _test.example.com_

a regra 2 sempre será acionada primeiro, pois foi criada por último.

**Caso de uso 2:** ao remover o asterisco (\*) no final do domínio, a execução da regra dependerá de qual regra foi criada por último**.**

-   regra 1: correspondência com _test.example.com_
-   regra 2: correspondência com _\*.example.com_

A regra 2 acima será acionada primeiro se a solicitação corresponder às duas regras.

-   regra 1: correspondência com _\*.example.com_
-   regra 2: correspondência com _test.example.com_

A regra 2 acima será acionada primeiro se a solicitação corresponder às duas regras.

___

## Recursos relacionados

-   [Como o Rate Limiting é relatado no ELS (Enterprise Log Share)?](/logs/reference/log-fields)
-   [Solução de problemas no Rate Limiting da Cloudflare](https://support.cloudflare.com/hc/articles/115000546328)
-   [Configurar Rate Limiting por meio da API da Cloudflare](https://api.cloudflare.com/#rate-limits-for-a-zone-properties)
