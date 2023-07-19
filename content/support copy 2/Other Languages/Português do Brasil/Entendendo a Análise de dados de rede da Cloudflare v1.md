---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/360038696631-Entendendo-a-An%C3%A1lise-de-dados-de-rede-da-Cloudflare-v1
title: Entendendo a Análise de dados de rede da Cloudflare v1
---

# Entendendo a Análise de dados de rede da Cloudflare v1

_Saiba como clientes do Magic Transit e do Cloudflare Spectrum usam Análise de Dados de Rede para explorar detalhes de tráfego e ataque DDoS de Camada 3 e 4._

### Neste artigo

-   [Visão geral](https://support.cloudflare.com/hc/pt-br/articles/360038696631-Entendendo-a-An%C3%A1lise-de-dados-de-rede-da-Cloudflare-v1#7rrlY887ZX7ZDVmx2V4bcm)
-   [Visualizar a Análise de Dados de rede](https://support.cloudflare.com/hc/pt-br/articles/360038696631-Entendendo-a-An%C3%A1lise-de-dados-de-rede-da-Cloudflare-v1#7x2T95w9RGgg782pVMujPb)
-   [Navegar na Análise de Dados de rede](https://support.cloudflare.com/hc/pt-br/articles/360038696631-Entendendo-a-An%C3%A1lise-de-dados-de-rede-da-Cloudflare-v1#h_3WlP6WsWFl28h92oS2k8O2)
-   [Aplicar filtros a dados](https://support.cloudflare.com/hc/pt-br/articles/360038696631-Entendendo-a-An%C3%A1lise-de-dados-de-rede-da-Cloudflare-v1#h_4Agjkc3QlLuhrCW43NsN3p)
-   [Selecionar uma dimensão para plotar](https://support.cloudflare.com/hc/pt-br/articles/360038696631-Entendendo-a-An%C3%A1lise-de-dados-de-rede-da-Cloudflare-v1#h_4UZtmYClrU0N7OYwZgHHoh)
-   [Visualizar o log de atividades](https://support.cloudflare.com/hc/pt-br/articles/360038696631-Entendendo-a-An%C3%A1lise-de-dados-de-rede-da-Cloudflare-v1#h_6GOQ2ficyicPxirroGewJP)
-   [Exportar dados e relatórios de log](https://support.cloudflare.com/hc/pt-br/articles/360038696631-Entendendo-a-An%C3%A1lise-de-dados-de-rede-da-Cloudflare-v1#h_3grb6OPVreABUQaQBekfHn)
-   [Limitações](https://support.cloudflare.com/hc/pt-br/articles/360038696631-Entendendo-a-An%C3%A1lise-de-dados-de-rede-da-Cloudflare-v1#h_6tCVFw0V6ufdvQnRIxu19t)
-   [Recursos relacionados](https://support.cloudflare.com/hc/pt-br/articles/360038696631-Entendendo-a-An%C3%A1lise-de-dados-de-rede-da-Cloudflare-v1#7flIreW1Np8fuxZYTbduF2)
-   [Dúvidas frequentes](https://support.cloudflare.com/hc/pt-br/articles/360038696631-Entendendo-a-An%C3%A1lise-de-dados-de-rede-da-Cloudflare-v1#h_2CqXhNxV03M5IUwklSR3n6)

___

## Visão geral

O acesso à Análise de Dados de rede exige o seguinte:

-   Um plano Empresarial da Cloudflare
-   Cloudflare [Magic Transit](/magic-transit/) ou [Spectrum](/spectrum/).

A tela do **Network Analytics** da Cloudflare fornece visibilidade quase em tempo real dos padrões de tráfego das camadas de transporte e de rede e dos ataques de DDoS O Network Analytics exibe dados em nível de bits e pacotes, os mesmos dados disponíveis por meio da [API do GraphQL Analytics](/analytics/graphql-api/).

![O painel de análise de dados mostra um resumo dos pacotes por tipo](/images/support/na-main-dashboard.png)

Aa Análise de Dados de rede acelera os relatórios e a investigação de tráfego malicioso. É possível filtrar dados por estes parâmetros:

-   Ação de mitigação realizada pela Cloudflare
-   IP, porta, ASN de origem
-   IP e porta de destino
-   A cidade e o país do data center da Cloudflare onde o tráfego foi observado
-   Tamanho, tipo, taxa e duração do ataque
-   Sinalizador TCP 
-   Versão de IP
-   Protocolo

Use a Análise de Dados de rede para identificar rapidamente a inteligência principal:

-   Principais vetores de ataques direcionados à rede 
-   Mitigação de tráfego ao longo do tempo, detalhada por ação 
-   Origem do ataque, por país ou data center

___

## Visualizar a Análise de Dados de rede

Você pode acessar a tela do **Network Analytics** na página inicial da sua conta da Cloudflare.

Para acessar a tela do **Network Analytics**, siga as etapas abaixo:

1.  Faça login na sua conta da Cloudflare.
2.  Caso tenha várias contas, selecione uma conta que tenha acesso ao Magic Transit ou Spectrum.
3.  Na **página inicial** da conta, clique em **Network Analytics**

___

## Navegar na Análise de Dados de rede

### Resumo do título e painéis laterais

O título e os painéis laterais fornecem um resumo da atividade durante o período selecionado na lista suspensa **Período**.

![Os painéis de cabeçalho e lateral resumem atividades nas últimas 24 horas](/images/support/na-navigate.png)

O título mostra o total de pacotes ou bits e o número de ataques detectados e mitigados. Quando há um ataque em andamento, o título indica a taxa máxima de pacotes (ou bits) em vez da contagem total.

Para alternar a visualização dos dados, clique nos painéis laterais **Pacotes** ou **Bits**.

### Definir o prazo para a exibição

Use a lista suspensa **Período** para alterar o intervalo de tempo durante o qual o Network Analytics exibe dados. Quando você seleciona um período, a tela inteira é atualizada para refletir sua escolha.

Quando você seleciona _Últimos 30 minutos_, a visualização da **Análise de Dados de Rede** mostra os dados dos últimos 30 minutos e atualiza a cada 20 segundos. Uma notificação _Ao vivo_ aparece ao lado da lista suspensa estatística para informar que a visualização está sendo atualizada automaticamente:

![Atualização automática ativada na Análise de Dados de Rede](/images/support/hc-dash-Network_Analytics-auto_refresh.png)

Ao selecionar a opção _Período personalizado_, você pode especificar um período de tempo de até 30 dias, em qualquer momento durante o ano anterior.

### Visualizar por taxa média ou volume total 

Escolha uma estatística na lista suspensa para alternar entre a plotagem de _Taxa média_e _Contagem total_. 

### Mostrar eventos de exposição/suspensão de prefixo IP

Ative o controle **Mostrar anotações** para exibir ou ocultar anotações de eventos de exposição/suspensão de prefixo IP na visualização da **Análise de Dados de Rede**. Clique em cada anotação para saber mais detalhes.

![Botão de alternância para exibir anotações no gráfico de Análise de Dados de Rede](/images/support/hc-dash-Network_Analytics-show_annotations.png)

### Ampliar o resumo de pacotes 

Clique e arraste o mouse em uma região do gráfico para ampliar. Usando essa técnica, você pode ampliar para um intervalo de tempo de até 3 minutos.

![Ampliar o resumo de pacotes ](/images/support/unnamed.gif)

Para diminuir o zoom, clique no ícone **X** no seletor de **intervalo de tempo**.

___

## Aplicar filtros a dados

É possível aplicar vários filtros e exclusões para ajustar o escopo dos dados exibidos na Análise de Dados de rede.

Os filtros afetam todos os dados exibidos na página Análise de Dados de rede.

Existem duas maneiras de filtrar dados do Network Analytics: use o botão **Adicionar filtro** ou clique em um dos **filtros de estatísticas**.

### Usar o botão Adicionar filtro

Clique no botão **Adicionar filtro** para abrir o popover **Novo filtro**. Especifique um campo, um operador e um valor para concluir sua expressão de filtro. Clique em **Aplicar** para atualizar a tela.

Ao aplicar filtros, observe estas diretrizes:

-   Não há suporte para caracteres curingas.
-   Você não precisa colocar os valores entre aspas.
-   Ao especificar um número ASN, deixe de fora o prefixo _AS_. Por exemplo, insira _1423_ em vez de _AS1423_.

### Usar um filtro estático

Para filtrar com base no tipo de dados associado a uma das estatísticas do Network Analytics, use os botões **Filtrar** e **Excluir** exibidos quando você passa o ponteiro do mouse sobre a estatística. 

Nesse exemplo, clicar no botão **Filtro** restringe o escopo da visualização apenas para o tráfego associado à ação _Permitir_.

### Crie uma regra de Magic Firewall com os filtros aplicados

É possível criar uma regra do [Magic Firewall](/magic-firewall) para bloquear todo o tráfego correspondente aos filtros selecionados na Análise de Dados de Rede. Os filtros compatíveis no momento são:

-   IP de destino
-   Protocolo
-   Data center de origem
-   IP de origem
-   Sinalizadores TCP

Outros tipos de filtros da Análise de Dados de Rede não serão adicionados à definição da nova regra. No entanto, é possível configurar ainda mais a regra no Magic Firewall.

Faça o seguinte:

1\. Aplique um ou mais filtros à Análise de Dados de Rede.

2\. Clique em **Criar regra de Magic Firewall**. 

![Criar um link para a regra de firewall na Análise de Dados de Rede](/images/support/hc-dash-Network_Analytics-create_firewall_rule.png)

O editor de regras do Magic Firewall é exibido com os filtros e os valores selecionados.

3\. Revise a definição da regra no editor de regras do Magic Firewall.

4\. Clique em **Adicionar nova**.

### Campos, operadores e valores de filtro com suporte 

A tabela abaixo mostra o intervalo de campos, operadores e valores que você pode usar para filtrar a Análise de Dados de rede.

| Campo | Operadores | Valor |
| --- | --- | --- |
| 
Ação

 | 

Igual a

Não é igual a

 | 

\- Permitir: tráfego permitido através dos sistemas automatizados de proteção contra DDoS da Cloudflare. Também pode incluir o tráfego mitigado pelas regras de firewall, pelo flowtrackd e por regras da Camada 7.

\- Bloquear: tráfego bloqueado pelos sistemas automatizados de proteção contra DDoS da Cloudflare.

\- Rastreamento de conexão: aplica-se apenas à Camada 7, pois o Magic Transit é excluído do escopo e nenhum conntrack é executado para prefixos do Magic Transit.

\- Limite de taxa: pode ser aplicado por IP de origem, sub-rede ou qualquer conexão. A decisão é tomada programaticamente com base em heurísticas.

\- Monitorar: ataques que foram identificados, mas optou-se por simplesmente observar e não mitigar com qualquer regra.

 |
| 

ID do ataque

 | 

Igual a

Não é igual a

 | 

Número do ataque

 |
| 

Tipo de ataque

 | 

Igual a

Não é igual a

 | 

Inundação de UDP

Inundação SNY

Inundação de ACK

Inundação de RST

Inundação de LDAP

Inundação de Natal

Inundação de FIN

Inundação de GRE

Inundação de ICMP

 |
| 

IP de destino

 | 

Igual a

Não é igual a

 | 

Endereço de IP

 |
| 

Porta de destino

 | 

Igual a

Não é igual a

Maior que

Maior que ou igual a

Menor que

Menor que ou igual a

 | 

Número da porta

Intervalo de portas

 |
| 

Intervalo de IPs de destino

 | 

Igual a

Não é igual a

 | 

Intervalo e máscara de IPs

 |
| 

Versão de IP

 | 

Igual a

Não é igual a

 | 

4 ou 6

 |
| 

Protocolo

 | 

Igual a

Não é igual a

 | 

TCP

UDP

ICMP

GRE (GRE)

 |
| 

ASN de origem

 | 

Igual a

Não é igual a

 | 

Número de AS

 |
| 

País de origem

 | 

Igual a

Não é igual a

 | 

Nome do país

 |
| 

Data center de origem

 | 

Igual a

Não é igual a

 | 

Localização do data center

 |
| 

IP de origem

 | 

Igual a

Não é igual a

 | 

Endereço de IP

 |
| 

Porta de origem

 | 

Igual a

Não é igual a

Maior que

Maior que ou igual a

Menor que

Menor que ou igual a

 | 

Número da porta

Intervalo de portas

 |
| 

Sinalizador TCP

 | 

Igual a

Não é igual a

Contém

 | 

SYN, SYN-ACK, FIN, ACK, RST

 |

___

## Selecionar uma dimensão para plotar

É possível plotar dados da Análise de Dados de rede em várias dimensões. Por padrão, a Análise de Dados de rede exibe dados detalhado por Ação.

Selecione uma das guias de **Resumo** para exibir os dados ao longo de uma dimensão diferente.

![Visualizar dados em várias dimensões](/images/support/unnamed__1_.gif)

Escolha entre estas opções: 

-   Ação
-   Tipo de ataque
-   IP de destino
-   Porta de destino
-   Versão de IP
-   Protocolo
-   ASN de origem
-   País de origem
-   Data center de origem
-   IP de origem
-   Porta de origem
-   Sinalizador TCP

### Compartilhar filtros da Análise de Dados de rede 

Quando você adiciona filtros e especifica um intervalo de tempo na página Análise de Dados de rede, a URL é alterada para refletir esses parâmetros.

Para compartilhar sua visualização dos dados, copie a URL e envie-a para outros usuários para que eles possam trabalhar com a mesma visualização.

![Selecionar o URL da página de Análise de Dados de Rede](/images/support/hc-dashboard-network-analytics-6.png)

___

## Visualizar o log de atividades

O **log de atividades** do Network Analytics mostra até 500 eventos de log no intervalo de tempo selecionado atualmente, paginados com 10 resultados por página por visualização de intervalo de tempo (a [API do GraphQL Analytics](/analytics/graphql-api/) não tem essa limitação). 

Para exibir detalhes do evento, clique no widget de expansão associado aos eventos.

### Configurar colunas

Para configurar quais colunas são exibidas no Log de atividades, clique no botão **Editar colunas**.

Isso é particularmente útil quando você gostaria de identificar um ataque DDoS, durante o qual pode especificar os atributos desejados tais como endereços de IP, taxa de bits máxima e ID do ataque, entre outros.

### Visualizar os itens principais

Os painéis **País de origem**, **Origem** e **Destino** exibem os principais itens em cada tela.

Para selecionar o número de itens a serem exibidos, use a lista suspensa associada à visualização.

Para ver os principais data centers, selecione _Data center_ na lista suspensa da tela **País de origem**. A tela **Data center de origem** substitui a tela **País de origem**.

___

## Exportar dados e relatórios de log

### Exportar dados do log de atividades 

Você pode exportar até 500 eventos brutos do log de atividades por vez. Essa opção é útil quando você precisa combinar e analisar dados da Cloudflare com seus próprios dados armazenados em um sistema ou banco de dados separado, como um sistema de Gerenciamento de Informações e Eventos de Segurança (SIEM).

Para exportar dados de log, clique em **Exportar**.

Escolha o formato CSV ou JSON para renderizar dados exportados. O nome do arquivo baixado refletirá o intervalo de tempo selecionado, usando este padrão:

_network-analytics-attacks-\[horário de início\]-\[horário de término\].json_

### Exportar um relatório da Análise de Dados de rede 

Para imprimir ou baixar um relatório instantâneo do **Network Analytics**, siga as etapas abaixo:

Clique em **Imprimir relatório**. A interface de impressão do seu navegador web exibe opções para imprimir ou salvar como PDF.

___

## Limitações

No momento, a Análise de Dados de rede tem estas limitações:

-   A Análise de Dados de Rede v1 mostra informações sobre ataques de [daemon de negação de serviço (DoSD)](https://blog.cloudflare.com/who-ddosd-austin/). Embora forneça uma visualização oportuna dos dados, não tem uma visão completa de todos os eventos. 
-   As origens de dados a seguir não estão disponíveis na Análise de Dados de Rede v1:
    -   Regras de Firewall _(disponível na Análise de Dados de Rede v2)_
    -   Regras da camada de aplicativos
    -   Gatekeeper e regras aplicadas manualmente
    -   [flowtrackd](https://blog.cloudflare.com/announcing-flowtrackd/) (proteção avançada de TCP) _(disponível na Análise de Dados de Rede v2)_
    -   Tráfego WARP e [tráfego em nuvem laranja](https://support.cloudflare.com/hc/pt-br/articles/205177068)
-   Os dados dos serviços da Cloudflare que fazem proxy de tráfego, como CDN, não estão disponíveis na Análise de Dados de rede.

___

## Recursos relacionados

-   [Análise de Dados de rede da Cloudflare v2](/analytics/network-analytics/)
-   [Migrar da da Análise de Dados de Rede v1 para a Análise de Dados de Rede v2](/analytics/graphql-api/migration-guides/network-analytics-v2)
-   [API do GraphQL da Cloudflare](/analytics/graphql-api/)
-   [Análise de Dados da Cloudflare: uma rápida visão geral](https://support.cloudflare.com/hc/articles/360037684111)
-   [Números de porta e nomes de serviço do IANA](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?&page=1)

___

## Dúvidas frequentes

### Por quanto tempo a Cloudflare retém dados no portal da Análise de Dados de rede?

Se você usa a Análise de Dados de Rede v2 (NAv2), pode consultar dados históricos de até **90 dias**.

A Análise de Dados de Rede v1 (NAv1) usa nós GraphQL para distribuir dados em fluxos de IP de 1 minuto, 1 hora e 1 dia. Por exemplo, o nó ipFlows1mGroups armazena dados em agregações de minuto.

Para identificar o intervalo de dados históricos que você pode consultar na NAv1, consulte essa tabela. Use a coluna _**notOlderThan**_ como um indicador do tempo de retenção.

| 
Nó de dados do GraphQL

 | 

maxDuration\*

 | 

notOlderThan\*\*

 | 

seleções de intervalo de tempo na Análise de Dados de rede

 | 

Número de pontos de dados

 |
| --- | --- | --- | --- | --- |
| 

ipFlows1mGroups

 | 

25 horas

 | 

30 dias

 | 

30 minutos

 | 

30

 |
| 

6 horas

 | 

71

 |
| 

12 Tbps

 | 

48

 |
| 

24 horas

 | 

96

 |
| 

ipFlows1dGroups

 | 

6 meses

 | 

1 ano

 | 

1 semana

 | 

168

 |
| 

1 mês

 | 

30

 |

_**\*MaxDuration**__define a janela de tempo que pode ser solicitada em uma consulta (varia de acordo com o nó de dados)._

_**\*\*notOlderThan**__limita até qual data anterior uma consulta pode pesquisar no registro. É um indicativo de quanto tempo os dados permanecem no nosso banco de dados._ 

Ao trabalhar com logs de ataque no painel, tenha em mente o seguinte:

-   Os logs de ataque são armazenados com carimbos de data/hora de início e término, estatísticas de pacotes e bits para a taxa de dados mínima, máxima e média, bem como totais, tipo de ataque e ação realizada. 
-   Os endereços de IP de origem são considerados informações que permitem identificação pessoal. Portanto, a Cloudflare os armazena apenas por 30 dias. Após 30 dias, os endereços de IP de origem são descartados e os logs são distribuídos primeiro em grupos de 1 hora, depois em grupos de 1 dia. As distribuições de 1 hora ficam armazenadas por 6 meses. As distribuições de um dia ficam armazenadas por 1 ano.

Para saber mais sobre como consultar e acessar dados de log, consulte a [API de Análise de Dados do GraphQL](/analytics/graphql-api/limits).

### Por que a Análise de Dados de rede indica que o IP de destino está "indisponível"?

O IP de destino aparece como _Indisponível_ quando não é incluído na assinatura em tempo real gerado pelos nossos [sistemas de proteção contra DDoS](https://blog.cloudflare.com/mitigating-a-754-million-pps-ddos-attack-automatically/). 

Para visualizar o IP de destino, filtre por **ID de ataque** e role a página até a seção **Destino** nas listas de itens principais. Quando você filtra um ID de ataque específico, todo o painel de Análise de Dados de rede se transforma em um relatório de ataques.
