---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/200172016-Entendendo-as-regras-gerenciadas-do-WAF-Firewall-de-aplicativos-Web-
title: Entendendo as regras gerenciadas do WAF (Firewall de aplicativos Web)
---

# Entendendo as regras gerenciadas do WAF (Firewall de aplicativos Web)

_As regras gerenciadas do WAF monitoram as solicitações da web ao seu domínio e filtram o tráfego indesejado com base em conjuntos de regras especificados por você._

### Neste artigo

-   [Visão geral](https://support.cloudflare.com/hc/pt-br/articles/200172016-Entendendo-as-regras-gerenciadas-do-WAF-Firewall-de-aplicativos-Web-#cAy9P8jRAD5eJw0QrL4VJ)
-   [Uma observação sobre falsos positivos e falsos negativos](https://support.cloudflare.com/hc/pt-br/articles/200172016-Entendendo-as-regras-gerenciadas-do-WAF-Firewall-de-aplicativos-Web-#B6O9QKf2vhGcHZZoaaJP3)
-   [Conjunto de regras gerenciado da Cloudflare](https://support.cloudflare.com/hc/pt-br/articles/200172016-Entendendo-as-regras-gerenciadas-do-WAF-Firewall-de-aplicativos-Web-#4vxxAwzbHx0eQ8XfETjxiN)
-   [Pacote: Conjunto de Regras Core do OWASP ModSecurity](https://support.cloudflare.com/hc/pt-br/articles/200172016-Entendendo-as-regras-gerenciadas-do-WAF-Firewall-de-aplicativos-Web-#sJbboLurEVhipzWYJQnyz)
-   [Recursos relacionados](https://support.cloudflare.com/hc/pt-br/articles/200172016-Entendendo-as-regras-gerenciadas-do-WAF-Firewall-de-aplicativos-Web-#6Tp6cDY8h4RtLwa7EdUoh3)

___

## Visão geral

As regras gerenciadas, um recurso do WAF (firewall de aplicativos web) da Cloudflare, identificam e removem atividades suspeitas de solicitações HTTP GET e POST. 

Exemplos de [conteúdo malicioso](https://www.cloudflare.com/learning/security/what-is-web-application-security/) que as regras gerenciadas identificam: 

-   Palavras-chave comuns usadas no spam de comentários (_XX_, _Rolex_, _Viagra_ etc.), 
-   ataques de Cross-Site Scripting (XSS), e 
-   Injeções de SQL (SQLi).

As regras gerenciadas estão disponíveis para planos Pro, Business e Enterprise para qualquer [subdomínio com proxy para a Cloudflare](https://support.cloudflare.com/hc/articles/200169626). Controle as configurações de regras gerenciadas em **Segurança** > **WAF** > **Regras gerenciadas**. As regras gerenciadas incluem três pacotes: 

-   **Conjunto de regras gerenciado da Cloudflare** 
-   **Pacote: Conjunto de Regras Core do OWASP ModSecurity**
-   **Regras solicitadas pelo cliente** 

Analise as ameaças bloqueadas por meio do [Firewall Analytics](/waf/analytics/), no **Registro de atividades** disponível em **Segurança** > **Visão geral**.

### Considerações importantes

-   As regras gerenciadas introduzem uma quantidade limitada de latência. 
-   As alterações nas regras gerenciadas do WAF levam cerca de 30 segundos para serem atualizadas globalmente.
-   A Cloudflare usa regras proprietárias para filtrar o tráfego. 
-   Os Websockets estabelecidos não disparam as regras gerenciadas para solicitações subsequentes.
-   As regras gerenciadas analisam as respostas JSON para identificar vulnerabilidades direcionadas a APIs. A análise da carga JSON é limitada a 128 KB.
-   As regras gerenciadas mitigam técnicas de padding. Recomendamos o seguinte:
    1.  Ative a regra _100048_. Essa regra agora protege contra ataques de padding, mas não é implantada por padrão, pois causa muitos falsos positivos em ambientes de cliente. No entanto, é importante que os clientes ajustem a configuração de regras gerenciadas. A Cloudflare está trabalhando em uma solução melhor no longo prazo.
    2.  Crie uma regra de firewall usando o [Editor de expressões](/ruleset-engine/rules-language/expressions/edit-expressions/#expression-editor), dependendo da necessidade de verificar cabeçalhos e/ou corpo para bloquear uma carga maior (> 128 KB). Certifique-se de testar a regra de firewall no modo _Registro_, pois ela pode estar propensa a gerar falsos positivos.
        -   _http.request.body.truncated_
        -   _http.request.headers.truncated_
-   Há algumas regras gerenciadas que a Cloudflare não desativa mesmo se a opção **Regras gerenciadas** estiver _Desativada_ no painel de controle da Cloudflare, como os IDs de regras _WP0025B_, _100043A_ e _100030_.

___

## Uma observação sobre falsos positivos e falsos negativos

Por padrão, as regras gerenciadas do WAF são totalmente gerenciadas por meio do painel de controle da Cloudflare e são compatíveis com a maioria dos sites e aplicativos web. No entanto, falsos positivos e falsos negativos são possíveis considerando a imensa internet:

-   **Falsos positivos**: solicitações legítimas detectadas e filtradas como maliciosas.
-   **Falsos negativos**: solicitações maliciosas não filtradas.

### Solucionar problemas de falsos positivos nas regras gerenciadas do WAF

A definição de conteúdo suspeito é subjetiva para cada site.  Por exemplo, o código PHP publicado em seu site é suspeito a menos que o site ensine a codificar e exija envios de código PHP dos visitantes.  Portanto, tal site deve desabilitar as regras gerenciadas relacionadas que interferem na operação normal.

Para testar falsos positivos, configure as regras gerenciadas do WAF no modo **Simular** para registrar a resposta a possíveis ataques sem contestação ou bloqueio. Além disso, use o [**registro de atividades**](/waf/analytics/paid-plans#activity-log) do Firewall Analytics para determinar quais regras gerenciadas causaram os falsos positivos.

Existem várias possíveis soluções para falsos positivos decorrentes do [WAF herdado](https://support.cloudflare.com/hc/pt-br/articles/200172016-Understanding-the-Cloudflare-Web-Application-Firewall-WAF-):

-   **Adicionar os endereços de IP do cliente à lista de permissões** [**Regras do Access de IP**](https://support.cloudflare.com/hc/articles/217074967)**:** Se o navegador ou o cliente visitar dos mesmos endereços de IP, é recomendado permitir. 
-   **Desativar as** [**regras gerenciadas correspondentes**](https://support.cloudflare.com/hc/articles/200172016): para o bloqueio ou a contestação de falsos positivos, mas reduz a segurança geral do site. Uma solicitação bloqueada pelo ID de Regra _981176_ refere-se a regras do OWASP. Diminua a sensibilidade do OWASP para resolver o problema.
-   **Ignorar as regras gerenciadas do WAF com uma regra de firewall:** crie um regra de firewall com a ação **ignorar** para desativar as regras gerenciadas do WAF para uma combinação específica de parâmetros. Por exemplo, [ignore as regras gerenciadas](/firewall/cf-firewall-rules/actions/) para uma URL específica e um endereço de IP ou agente usuário específicos.
-   **(não recomendado) Desativar as regras gerenciadas do WAF para tráfego para uma URL:**  diminui a segurança no endpoint da URL específica.  Configurado via [Page Rules](https://support.cloudflare.com/hc/pt-br/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-).

Existem várias possíveis soluções para falsos positivos decorrentes do [novo WAF](https://blog.cloudflare.com/new-cloudflare-waf/):

1.  **Adicionar exceção ao WAF:** é possível definir exceções para o WAF no [Painel de controle da Cloudflare](/waf/managed-rulesets/waf-exceptions/define-dashboard) ou usar a [API Rulesets](/waf/managed-rulesets/waf-exceptions/define-api).
2.  **Desativar as** [**regras gerenciadas correspondentes**](https://support.cloudflare.com/hc/articles/200172016): para o bloqueio ou a contestação de falsos positivos, mas reduz a segurança geral do site. Uma solicitação bloqueada pelo ID de Regra _949110_ refere-se às [novas regras do OWASP](https://blog.cloudflare.com/new-cloudflare-waf/). Diminua a sensibilidade do OWASP para resolver o problema.

**Observação:** ao [fazer contato com o Suporte da Cloudflare](https://support.cloudflare.com/hc/articles/200172476) para verificar se uma regra gerenciada do WAF foi acionada conforme o esperado, [forneça um arquivo HAR](https://support.cloudflare.com/hc/articles/203118044#h_8c9c815c-0933-49c0-ac00-b700700efce7) capturado durante o envio da solicitação específica em questão.

Estas são as diretrizes adicionais:

-   Se uma regra específica causar falsos positivos, defina o **Modo** da regra como _Desativar_ em vez de _Desligar_ o **Grupo** de regras inteiro.
-   Para falsos positivos com o conteúdo do administrador no seu site, crie uma [**regra de página**](https://support.cloudflare.com/hc/articles/218411427) para **Desativar a segurança** para a seção _admin_ dos recursos do seu site, ou seja, _seusite.com/admin_.

### Solucionar problemas de falsos negativos nas regras gerenciadas do WAF

Para identificar falsos negativos, analise os logs HTTP no servidor Web de origem. Para reduzir falsos negativos, use a seguinte lista de verificação:

-   As regras gerenciadas do WAF são _habilitadas_ em **Segurança** > **WAF** > **Regras gerenciadas**?
-   As regras gerenciadas do WAF estão sendo _desabilitadas_ via [**Page Rules**](https://support.cloudflare.com/hc/articles/218411427#summary-of-page-rules-settings)?
-   Nem todas as regras gerenciadas estão habilitadas por padrão. Por isso, analise as ações padrão de cada uma.
    -   Por exemplo, a Cloudflare permite solicitações com agentes de usuário vazios por padrão. Para bloquear solicitações com um agente de usuário vazio, altere a regra **Modo** para **Bloquear**
    -   Outro exemplo: se quiser bloquear ataques de injeção de SQL não mitigados, confira se as regras de SQLi relevantes estão ativadas e defina como **Bloquear** no grupo **Cloudflare Specials**.
-   Os registros de DNS que servem o tráfego HTTP têm proxy por meio da Cloudflare?
-   Uma [**regra de firewall** ignora](/firewall/cf-firewall-rules/actions/#supported-actions) as regras gerenciadas? 
-   Um país, ASN, intervalo de IP ou IP permitidos nas [**Regras do Access de IP**](https://support.cloudflare.com/hc/articles/217074967) ou nas [**regras de firewall**](/firewall/cf-firewall-rules/) corresponde ao tráfego de ataque?
-   O tráfego malicioso é direcionado aos seus endereços de IP de origem para desviar da proteção da Cloudflare? Bloqueie todo o tráfego, exceto dos [endereços de IP da Cloudflare](https://www.cloudflare.com/ips/) no servidor web de origem.

___

## Conjunto de regras gerenciado da Cloudflare

O **Conjunto de Regras Gerenciado da Cloudflare** contém regras de segurança escritas e administradas pela Cloudflare. Clique em um nome de conjunto de regras em **Grupo** para revelar as descrições da regra. 

O **Cloudflare Specials** é um **Grupo** que fornece segurança básica de firewall contra [ataques comuns](https://www.cloudflare.com/learning/security/what-is-web-application-security/).   

 

Ao visualizar um conjunto de regras, a Cloudflare mostra ações padrão para cada regra listadas em **Modo padrão**. O **Modo** disponível para regras individuais dentro de um **Conjunto de Regras Gerenciado da** **Cloudflare** é:

-   _Default – realiza a ação padrão listada em_ _**Modo Default**_ _ao visualizar uma regra específica._
-   _Disable –_ desabilita a regra específica dentro do grupo**.**
-   _Block_ –a solicitação é descartada. 
-   _CAPTHCA Legado_: o visitante recebe uma página de desafio CAPTCHA.
-   _Simulate_ – a solicitação é permitida, mas fica registrada no [**log de atividades**](/waf/analytics/paid-plans#activity-log).

O [WAF changelog](/waf/change-log/scheduled-changes/) da Cloudflare permite que os clientes monitorem alterações em andamento no **Conjunto de Regras Gerenciadas da Cloudflare.**

___

## Pacote: Conjunto de Regras Core do OWASP ModSecurity

### Entenda o pacote OWASP da Cloudflare

**Pacote: o Conjunto de Regras Core do OWASP ModSecurity** atribui uma pontuação a cada solicitação com base em quantas regras de OWASP são acionadas. Algumas regras de OWASP têm uma pontuação de sensibilidade maior do que outras. Depois que o OWASP avalia uma solicitação, a Cloudflare compara a pontuação final com a **Sensibilidade** configurada para o domínio. Se a pontuação exceder a **Sensibilidade**, a solicitação será acionada com base na **Ação** configurado dentro do **Pacote: Conjunto de Regras Core do OWASP ModSecurity**:

-   _Block_ –a solicitação é descartada.
-   _Challenge_ – o visitante recebe uma página de desafio CAPTCHA.
-   _Simulate_ – a solicitação é permitida, mas fica registrada no [**log de atividades**](/waf/analytics/paid-plans#activity-log).

A pontuação de sensibilidade necessária para acionar o WAF para uma **Sensibilidade** específica é a seguinte:

-   _Baixa_ – 60 e superior
-   _Média_ – 40 e superior
-   _Alta_ – 25 e superior

Para solicitações do Ajax, as seguintes pontuações são aplicadas:

-   _Baixa_ – 120 e superior
-   _Média_ – 80 e superior
-   _Alta_ – 65 e superior

Analise o [log de atividades](/waf/analytics/paid-plans#activity-log) para ver a pontuação final, bem como as regras individuais acionadas.

### Controle o pacote OWASP da Cloudflare

O **Pacote: Conjunto de Regras Core do OWASP ModSecurity** contém várias regras do [projeto OWASP](https://www.owasp.org/index.php/Category:OWASP_ModSecurity_Core_Rule_Set_Project). A Cloudflare não escreve nem administra regras do OWASP.  Clique em um nome de conjunto de regras em **Grupo** para revelar as descrições da regra.  Ao contrário do **Conjunto de Regras Gerenciado da Cloudflare**, as regras específicas do OWASP são _Ligadas_ ou _Desligadas._

Para gerenciar os limiares de OWASP, defina a **Sensibilidade** como _Baixa_, _Média_ ou _Alta_ em **Pacote: Conjunto de Regras Core do OWASP ModSecurity**. Se você definir a **Sensibilidade** como _Desativada_, desativará o pacote OWASP inteiro, inclusive todas as regras. A determinação da **Sensibilidade** adequada depende do setor e das operações da sua empresa. Por exemplo, uma configuração _Baixa_ é adequada para:

-   Alguns setores de negócios são mais propensos a acionar o WAF, além de
-   carregamentos de arquivos grandes. 

A Cloudflare recomenda configurar inicialmente a **Sensibilidade** como _Baixa_ e analisar os falsos positivos antes de aumentar mais a **Sensibilidade**.

___

## Recursos relacionados

-   [Firewall Analytics](/waf/analytics/)
-   [Regras do Firewall Cloudflare](/firewall/cf-firewall-rules/)
-   [Log de alterações do WAF da Cloudflare](/waf/change-log/scheduled-changes/)
