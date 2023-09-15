---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/360037684251-Entendendo-a-An%C3%A1lise-de-Dados-de-sites-da-Cloudflare
title: Entendendo a Análise de Dados de sites da Cloudflare
---

# Entendendo a Análise de Dados de sites da Cloudflare

_O aplicativo Análise de Dados (Site) da Cloudflare ajuda você a adquirir insights sobre cada site específico na sua conta Cloudflare. Essas métricas incluem dados de solicitação e resposta para tráfego da Web, segurança, performance, DNS e Workers._

___

## Visão geral

O aplicativo **Análise de Dados** (Site) do painel da Cloudflare é um importante componente da linha de produtos geral de Análise de Dados da Cloudflare.  Especificamente, esse aplicativo oferece acesso a uma ampla gama de métricas, coletadas no nível do site ou domínio.

___

## Veja a análise de dados do seu site

Para ver as métricas do seu site:

1.  Faça o login no painel de controle da Cloudflare.
2.  Clique na **conta** da Cloudflare adequada para seu site e escolha o **domínio**.
3.  Em seguida, clique no ícone do aplicativo **Análise de Dados**.

Depois de carregado, o aplicativo Análise de Dados exibe um conjunto de guias para **Tráfego**, **Segurança**, **Performance**, **DNS**, **Workers** e **Logs** (somente domínios Enterprise). Para entender as várias métricas disponíveis, consulte _Analise as métricas do seu site_ abaixo.

![IU do aplicativo de Análise de Dados no Painel de controle da Cloudflare exibindo dados de tráfego da web](/images/support/hc-dash-analytics-dashboard_overview.png)

Os planos Pro, Business e Empresarial veem a análise de dados da web mais recente na guia Tráfego.

![Captura de tela da interface do usuário no painel da Análise de Dados da Cloudflare para clientes Pro, Business e Empresariais.](/images/support/hc-dash-analytics-web_traffic.png)

___

## Analise as métricas do seu site

Esta seção descreve as métricas disponíveis em cada guia do aplicativo Análise de Dados. Antes de prosseguir, observe que cada guia pode conter:

-   Um ou mais painéis para categorizar ainda mais as métricas subjacentes; e
-   um menu suspenso (no canto superior direito do painel) para filtrar métricas para um período de tempo específico.  O período de tempo que você pode selecionar pode variar com base no plano da Cloudflare ao qual seu domínio está associado.

Veja abaixo um resumo de cada guia do aplicativo Análise de Dados.

### Tráfego

#### Plano gratuito

Essas métricas incluem solicitações legítimas do usuário, bem como crawlers e ameaças. A guia Tráfego apresenta os seguintes recursos: 

-   **Tráfego da Web** – exibe métricas para _Solicitações_, _Largura de Banda_, _Visitantes Únicos_ e [_Códigos de Status_](https://support.cloudflare.com/hc/articles/206973867-Status-code-metrics-in-Cloudflare-Site-Analytics). Se você usa o Cloudflare Workers, as análises de dados de subsolicitações estarão disponíveis na guia **Workers**.
-   **Solicitações de tráfego da Web por país** – é um mapa interativo que divide o número de solicitações por país.  Esse painel também inclui uma tabela de dados para **Principais países/regiões de tráfego** que exibe os países com maior número de solicitações (até cinco, se os dados existirem).
-   **Compartilhe suas estatísticas –** permite compartilhar as estatísticas reais do site em redes sociais (Twitter) para: _bytes salvos,_ _solicitações SSL atendidas_ e _ataques bloqueados_.

#### Plano Pro, Business ou Empresarial

A análise de dados baseia-se nos logs de borda da Cloudflare, sem necessidade de scripts ou rastreadores de terceiros. A guia Tráfego apresenta as seguintes métricas:

-   **Visitas** – uma visita é definida como uma visualização de página originada de um site diferente ou link direto. A Cloudflare verifica onde o referer HTTP não corresponde ao nome do host. Uma visita pode consistir em várias visualizações de página. 
-   **Visualizações de página** – uma visualização de página é definida como uma resposta HTTP bem-sucedida com um tipo de conteúdo de HTML. 
-   **Solicitações** – uma solicitação HTTP. Uma visualização de página comum requer muitas solicitações.
-   **Transferência de dados** – total de dados HTTP transferidos em solicitações.

Para ver métricas mais detalhadas, escolha **Adicionar filtro** . Você também pode filtrar cada métrica por **Indicador**, **Host**, **País**, **Caminho**, **Código de status**, **Código de status de origem**, **Navegador**, **Sistema operacional** ou **Tipo de dispositivo**. 

Para alterar o período de tempo, use o menu suspenso no lado direito acima do gráfico. Você também pode arrastar para ampliar o gráfico.

### Segurança

Para essa guia, o número e o tipo de gráficos podem variar com base nos dados existentes e no plano do cliente. A maioria das métricas nessa guia vem do aplicativo Cloudflare Firewall. Os painéis disponíveis incluem:

-   **Ameaças** – exibe um resumo de dados e um gráfico de área mostrando ameaças contra o site.
-   **Ameaças por país** – mapa interativo que destaca os países onde as ameaças se originaram. Inclui também tabelas de dados com estatísticas sobre **Principais países/regiões de ameaças** e **Principais crawlers/bots.**
-   **Rate Limiting** (serviço adicional) – apresenta um gráfico de linhas que destaca solicitações correspondentes e bloqueadas, com base nos limites de taxa.  Para saber mais, consulte [Análise de Dados de Rate Limiting](https://support.cloudflare.com/hc/pt-br/articles/115003414428-Rate-Limiting-Analytics).
-   **Visão geral** – exibe um conjunto de gráficos de pizza para: **Total de ameaças detidas**, **Distribuição de tráfego pot SSL** e **Tipos de ameaças mitigadas**. Se disponível, o link expansível **Detalhes** exibe uma tabela com dados numéricos.

### Performance

As métricas agregadas nessa guia abrangem vários serviços da Cloudflare.  Os painéis disponíveis incluem:

-   **Performance de Origem (Argo)** (serviço complementar) – exibe métricas relacionadas ao tempo de resposta entre a rede de borda da Cloudflare e os servidores de origem nas últimas 48 horas.  Para mais detalhes, consulte [Análise de Dados do Argo](https://support.cloudflare.com/hc/articles/115001255631-Argo-Analytics).
-   **Visão geral** – exibe um conjunto de gráficos de pizza para: **Versão HTTP do Cliente Usada**, **Largura de Banda Economizada** e **Detalhamento do Content Type**. Se disponível, o link expansível **Detalhes** exibe uma tabela com dados numéricos.

### DNS

A guia DNS apresenta várias estatísticas para consultas DNS.  As métricas estão disponíveis desde que a Cloudflare seja o servidor DNS autoritativo do site, mesmo que o site não tenha proxy da Cloudflare. Portanto, métricas de DNS não são oferecidas para sites com [Configuração da CNAME](https://support.cloudflare.com/hc/articles/360020348832-Understanding-a-CNAME-Setup).

Os painéis de métricas disponíveis na guia DNS incluem:

-   **Consultas de DNS** – exibe vários gráficos de área e tabelas de dados para métricas de registro de DNS, incluindo consultas por _Código de Resposta_, _Tipo de Registro_, bem como registros que retornam uma resposta _NXDOMAIN_ (o registro de DNS não existe). É possível filtrar por um ou vários registros de DNS inserindo nomes de registros (por exemplo, www.example.com) no menu suspenso próximo ao topo.
-   **Consultas de DNS por data center** – permite que você veja a distribuição de consultas de DNS nos data centers da Cloudflare. As métricas aparecem como mapas interativos e tabelas de dados e incluem estatísticas para _Tráfego_, _NXDOMAIN_ e _NOERROR_ .

### Workers

Esse painel apresenta métricas para o Cloudflare Workers. Para saber mais, leia [Análise de Dados da Cloudflare com o Workers](https://support.cloudflare.com/hc/articles/360007553512-Cloudflare-analytics-with-Workers).

### Logs

A guia Logs não é um recurso de métricas. Em vez disso, os Clientes no plano Empresarial podem ativar o serviço [Logpush do Cloudflare Logs](/logs/about/). É possível usar o Logpush para baixar e analisar dados usando qualquer ferramenta de análise de dados de sua escolha. 

___

## Recursos relacionados

-   [Análise de Dados da Cloudflare: uma rápida visão geral](/analytics)
-   [A API GraphQL da Análise de Dados da Cloudflare](/analytics/)
