---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/5995821690637-Como-migrar-das-regras-gerenciadas-do-WAF-para-os-Conjuntos-de-Regras-Gerenciados-do-WAF
title: Como migrar das regras gerenciadas do WAF para os Conjuntos de Regras Gerenciados do WAF
---

# Como migrar das regras gerenciadas do WAF para os Conjuntos de Regras Gerenciados do WAF

_A Cloudflare permitirá que os clientes comecem a migrar suas zonas das regras gerenciadas de WAF para os novos Conjuntos de Regras Gerenciados de WAF._

___

## Visão geral

Em 4 de maio de 2022, a Cloudflare dará início à fase 1 da migração do WAF, das [regras gerenciadas do WAF](https://support.cloudflare.com/hc/articles/200172016) para os novos [Conjuntos de Regras Gerenciados do WAF](https://developers.cloudflare.com/waf/managed-rulesets/). Você poderá começar o processo de migração nas zonas qualificáveis que constam do painel de controle da Cloudflare. Os Conjuntos de Regras Gerenciados do WAF oferecem as seguintes vantagens:

-   Desempenho aprimorado de detecção
-   Maior flexibilidade de configuração (definir filtros de WAF personalizados, configurar substituições de conjuntos de regras globais)
-   Experiência do usuário aprimorada
-   Acesso a [verificação de credenciais expostas](https://developers.cloudflare.com/waf/managed-rulesets/exposed-credentials-check/)

Atualmente, o processo de migração é sempre iniciado por você no painel de controle da Cloudflare. **A migração é irreversível**: após ter migrado para os Conjuntos de Regras Gerenciados do WAF, você não poderá voltar a usar as regras gerenciadas do WAF. Após você ter migrado para os novos Conjuntos de Regras Gerenciados do WAF, a guia **Regras gerenciadas** no painel de controle da Cloudflare (disponível em **Segurança** > **WAF** > **Regras gerenciadas**) exibirá uma nova interface e as APIS de regras gerenciadas do WAF deixarão de funcionar.

___

## Impacto da migração

Sua configuração atual de regras gerenciadas será migrada para a configuração de Conjuntos de Regras Gerenciados do WAF, de forma que a mesma proteção se aplique à sua zona quando você migrar para o novo WAF.

A Cloudflare recomenda que você verifique o [**Log de atividade**](https://developers.cloudflare.com/waf/analytics/paid-plans/#activity-log) no Firewall Analytics nos dias seguintes à migração, procurando por solicitações legítimas sendo bloqueadas pelos Conjuntos de Regras Gerenciados do WAF. Se identificar quaisquer solicitações bloqueadas incorretamente, você pode ajustar a ação da regra de WAF correspondente para ser incluída no _Log_. Para obter mais informações sobre como alterar uma ação de uma regra de um Conjunto de Regras Gerenciado, consulte o artigo [Configurar uma única regra em um Conjunto de Regras Gerenciado](https://developers.cloudflare.com/waf/managed-rulesets/deploy-zone-dashboard/#configure-a-single-rule-in-a-managed-ruleset) na documentação do WAF.

### Alterações no painel de controle da Cloudflare

Após a migração ter sido concluída, o painel de controle da Cloudflare irá exibir a interface dos Conjuntos de Regras Gerenciados em **Segurança** > **WAF** > **Regras gerenciadas**, na qual você poderá implantar seus Conjuntos de Regras Gerenciados e ajustar sua configuração.

![Após a migração para os Conjuntos de Regras Gerenciados do WAF, o painel de controle da Cloudflare irá exibir uma nova interface na qual você pode implantar os Conjuntos de Regras Gerenciados para a sua zona.](/support/static/waf-migration-dashboard-differences.png)

Ao contrário do que ocorre nas regras gerenciadas do WAF, não existe um botão geral ligar/desligar para ativar o WAF na nova interface. Em vez disso, você deve implantar cada Conjunto de Regras Gerenciado do WAF individualmente na sua zona.

Para obter mais informações sobre como configurar Conjuntos de Regras Gerenciados do WAF no painel de controle, consulte o artigo [Implantar Conjuntos de Regras Gerenciados para uma zona no painel de controle](https://developers.cloudflare.com/waf/managed-rulesets/deploy-zone-dashboard/), na documentação para desenvolvedores.

### Alterações da API

Após a migração, as APIs para interagir com as regras gerenciadas do WAF **irão parar de funcionar**. Essas APIs são as seguintes:

-   [Pacotes de Regras do WAF](https://api.cloudflare.com/#waf-rule-packages-properties)
-   [Grupos de Regras do WAF](https://api.cloudflare.com/#waf-rule-groups-properties)
-   [Regras de WAF](https://api.cloudflare.com/#waf-rules-properties)

Para interagir com os Conjuntos de Regras Gerenciados do WAF, você precisa usar a [API de Conjuntos de Regras](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/). Para obter mais informações sobre como implantar Conjuntos de Regras Gerenciados do WAF por meio de uma API, consulte o artigo [Implantar conjuntos de regras por meio de uma API](https://developers.cloudflare.com/waf/managed-rulesets/deploy-api/), na documentação para desenvolvedores.

___

## Zonas qualificáveis (fase 1)

A migração irá ocorrer em fases. Com início em 4 de maio de 2022, a migração estará disponível para um subconjunto de zonas qualificáveis e, gradualmente, se tornará disponível para todas as zonas qualificáveis.

Durante a fase 1 você poderá migrar as zonas que cumpram os seguintes requisitos:

-   A zona deve ter:
    -   O WAF desabilitado ou
    -   o WAF habilitado e apenas o Conjunto de Regras Gerenciado da Cloudflare habilitado (o Conjunto de Regras Core do OWASP ModSecurity deve estar desabilitado).
-   A zona não deverá ter nenhuma [regra de firewall](https://developers.cloudflare.com/firewall/cf-dashboard/) ou [Regra de Página](https://support.cloudflare.com/hc/articles/218411427) que possam ignorar, habilitar ou desabilitar regras gerenciadas do WAF:
    -   Regras de firewall configuradas com _Ignorar_ > _Regras Gerenciadas do WAF_.
    -   Page Rules configuradas com _Desabilitar Segurança_.
    -   Page Rules configuradas com _Firewall de Aplicativos Web: desligado_ ou _Firewall de Aplicativos Web: ligado_.
-   A zona não deve ter nenhuma [substituição de WAF controlada por URI](https://api.cloudflare.com/#waf-overrides-properties) (disponível somente por meio de API).

Quaisquer zonas que não cumpram esses requisitos não poderão migrar durante a fase 1.

Na fase 2, que ocorrerá mais tarde, todas as zonas serão qualificáveis para a migração. Esta página será atualizada com informações adicionais antes do início da fase 2.

___

## Início da migração

1\. Entre no [painel de controle da Cloudflare](https://dash.cloudflare.com/) e selecione sua conta e zona.

2\. Vá para **Segurança** > **WAF** > **Regras gerenciadas**.

![O banner da migração exibido em WAF > Regras gerenciadas, disponível para as zonas qualificáveis, permite que você faça a atualização das regras gerenciadas para os Conjuntos de Regras Gerenciados.](/support/static/waf-migration-banner.png)

3\. No banner de atualização, clique em **Atualizar agora**. Esse banner só é exibido nas zonas qualificáveis.

4\. Na caixa de diálogo pop-up, confirme que você deseja iniciar a migração das regras gerenciadas do WAF para os Conjuntos de Regras Gerenciados clicando em **Atualizar**. A migração é **irreversível.**

Após você confirmar a operação, a migração terá início.

O processo de migração poderá levar alguns minutos. Quando a migração terminar, o painel de controle irá exibir a nova interface dos Conjuntos de Regras Gerenciados do WAF em **Segurança** > **WAF** > **Regras gerenciadas**. Para verificar se a migração foi concluída, atualize o painel de controle.
