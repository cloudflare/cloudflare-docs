---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/360035387431-Produtos-de-bot-da-Cloudflare-FAQs
title: Produtos de bot da Cloudflare - FAQs
---

# Produtos de bot da Cloudflare - FAQs

### Neste artigo

-   [Visão geral](https://support.cloudflare.com/hc/pt-br/articles/360035387431-Produtos-de-bot-da-Cloudflare-FAQs#12345679)
-   [Como a Cloudflare detecta bots?](https://support.cloudflare.com/hc/pt-br/articles/360035387431-Produtos-de-bot-da-Cloudflare-FAQs#h_vGKNSEuBtE5ymreIHOucE)
-   [Como posso saber o que está incluído no meu plano?](https://support.cloudflare.com/hc/pt-br/articles/360035387431-Produtos-de-bot-da-Cloudflare-FAQs#h_3dC1nAamuWNwImCpIkdlC8)
-   [Como faço para configurar meu produto de bot?](https://support.cloudflare.com/hc/pt-br/articles/360035387431-Produtos-de-bot-da-Cloudflare-FAQs#h_2PHwjg1FfXSS3K1aZE00yH)
-   [Bot da Yandex bloqueado inesperadamente pela regra gerenciada do WAF com a ID 100203](https://support.cloudflare.com/hc/pt-br/articles/360035387431-Produtos-de-bot-da-Cloudflare-FAQs#Yandex-bot-unexpectedly-blocked-WAF-100203)
-   [Como funciona o aprendizado de máquina?](https://support.cloudflare.com/hc/pt-br/articles/360035387431-Produtos-de-bot-da-Cloudflare-FAQs#h_4iPjq7Qq4Ozsq0XwibA2ea)
-   [Por que há uma ação "Desafio Gerenciado" nas regras de firewall?](https://support.cloudflare.com/hc/pt-br/articles/360035387431-Produtos-de-bot-da-Cloudflare-FAQs#managed-challenge)
-   [Qual é a diferença entre a pontuação de ameaças e a pontuação do Bot Management?](https://support.cloudflare.com/hc/pt-br/articles/360035387431-Produtos-de-bot-da-Cloudflare-FAQs#h_131SlrJFhqmrJjs0joDaXE)
-   [O que é o cf.bot\_management.verified\_bot?](https://support.cloudflare.com/hc/pt-br/articles/360035387431-Produtos-de-bot-da-Cloudflare-FAQs#h_zzzgV0HSwPUhOEs5UY9sD)
-   [Tenho um bot bom e quero adicioná-lo à lista de permissões (cf.bot\_management.verified\_bot). O que devo fazer?](https://support.cloudflare.com/hc/pt-br/articles/360035387431-Produtos-de-bot-da-Cloudflare-FAQs#h_5itGQRBabQ51RwT5cNJX8u)
-   [Quais informações eu preciso para solucionar meus problemas de bot?](https://support.cloudflare.com/hc/pt-br/articles/360035387431-Produtos-de-bot-da-Cloudflare-FAQs#h_2Ffw8AKdwQySoI8rnO02pc)
-   [O que devo fazer se estiver recebendo falsos positivos causados pelo Modo Bot Fight (BFM) ou Modo Super Bot Fight (SBFM)?](https://support.cloudflare.com/hc/pt-br/articles/360035387431-Produtos-de-bot-da-Cloudflare-FAQs#5KX8t3C6SObnoWs5F6YOlU)
-   [O recurso Super Bot Fight Mode (SBFM) ainda está bloqueando solicitações, apesar de ter sido desativado. Por quê?](https://support.cloudflare.com/hc/pt-br/articles/360035387431-Produtos-de-bot-da-Cloudflare-FAQs#h_6Q8mNs9Ur9mvXhjcH1KBcn)
-   [Recursos relacionados](https://support.cloudflare.com/hc/pt-br/articles/360035387431-Produtos-de-bot-da-Cloudflare-FAQs#3zR4ro73zaHshu5OldQIuB)

___

## Visão geral

As soluções de bot da Cloudflare identificam e mitigam o tráfego automatizado para proteger seu domínio contra bots prejudiciais.

Para obter mais informações sobre essas soluções de bot e como configurá-las, consulte a [documentação do desenvolvedor](https://developers.cloudflare.com/bots/).

___

## Como a Cloudflare detecta bots?

A Cloudflare usa vários métodos para detectar bots, mas eles variam de acordo com o plano. Para obter mais detalhes, consulte, [Produtos de bot da Cloudflare](https://developers.cloudflare.com/bots/about/plans).

___

## Como posso saber o que está incluído no meu plano?

Para ver o que seu plano oferece, confira a [documentação do desenvolvedor](https://developers.cloudflare.com/bots/about/plans).

___

## Como faço para configurar meu produto de bot?

Para aprender a configurar seu produto de bot, confira a [documentação do desenvolvedor](https://developers.cloudflare.com/bots/get-started).

___

## Bot da Yandex bloqueado inesperadamente pela regra gerenciada do WAF com a ID 100203

A Yandex atualiza bots com muita frequência e, talvez, você encontre mais falsos positivos enquanto essas alterações são propagadas. Bots novos e recém-atualizados, ocasionalmente, são bloqueados pela regra gerenciada do Cloudflare WAF com a ID 100203, pois a lista de IPs dos bots da Yandex ainda não foi sincronizada com as alterações mais recentes da empresa.

**Soluções alternativas:**

-   Desabilite temporariamente a regra gerenciada do WAF com a ID 100203
-   ou crie uma regra de firewall com a ação _Bypass_ para ignorar as regras gerenciadas do WAF quando uma solicitação for proveniente do **IP da Yandex** e o agente de usuário contiver **Yandex**.Consulte nossa [documentação para desenvolvedores](https://developers.cloudflare.com/firewall/cf-firewall-rules/actions).

**Solução:**

Quando o novo IP da Yandex for propagado para o nosso sistema, as solicitações não serão mais bloqueadas. No entanto, esse processo pode levar até 48 horas. Caso os bots da Yandex continuem sendo bloqueados após 48 horas, mesmo se não tiverem alterações, entre em contato com o [Suporte da Cloudflare](https://support.cloudflare.com/hc/pt-br/articles/200172476-Contacting-Cloudflare-Support).

___

## Como funciona o aprendizado de máquina?

O aprendizado de máquina supervisionado considera certas variáveis (X), como gênero e idade, e prevê outra variável (Y), como renda.

No Bot Management e Super Bot Fight da Cloudflare, as variáveis X são recursos de solicitação, enquanto a variável Y representa a probabilidade de resolver um CAPTCHA com base em valores X.

A Cloudflare usa dados de milhões de solicitações e retreinamos o sistema de forma periódica. Você pode aprender sobre esses dados em seus próprios registros de solicitação, como Logpull e Logpush da Cloudflare, bem como na API Firewall.

___

## Por que há uma ação "Desafio Gerenciado" nas regras de firewall?

Quando você escolhe desafiar diferentes categorias de bot com o Modo de combate a bots ou o Modo de super combate a bots, os Eventos de firewall mostram uma **Ação Realizada** de **Desafio Gerenciado**.

O Desafio Gerenciado também pode ser resultado de uma [regra de firewall](https://support.cloudflare.com/hc/articles/200170136#managed-challenge).

___

## Qual é a diferença entre a pontuação de ameaças e a pontuação do Bot Management?

A diferença é significativa:

-   A pontuação de ameaça (_cf.threat\_score_) é o que a Cloudflare usa para determinar a reputação de IP. Vai de 0 (boa) a 100 (ruim).
-   A pontuação do Bot Management (_cf.bot\_management.score)_ é o que a Cloudflare usa no Bot Management para mensurar se a solicitação é de um ser humano ou de um script**.** As pontuações variam de 1 (bot) a 99 (ser humano). As pontuações mais baixas indicam que a solicitação veio de um script, serviço de API ou agente automatizado. As pontuações mais altas indicam que a solicitação veio de um ser humano usando um navegador padrão para desktop ou móvel.

Esses campos estão disponíveis via [Regras de firewall da Cloudflare](https://developers.cloudflare.com/firewall/cf-firewall-rules).

___

## O que é o cf.bot\_management.verified\_bot?

O valor _cf.bot\_management.verified\_bot_ de uma solicitação é um booleano que indica se a solicitação veio de um bot permitido da Cloudflare.

A Cloudflare criou uma lista de permissões de bots bons e automatizados, por exemplo, mecanismo de pesquisa do Google, Pingdom e muito mais.

Esta lista de permissões é grande com base na verificação reversa de DNS, o que significa que os IPs que permitimos realmente correspondem ao serviço solicitante. Além disso, a Cloudflare usa vários métodos de validação, incluindo bloqueios ASN e listas públicas. Se nenhum desses tipos de validação estiver disponível para um cliente, usamos dados internos da Cloudflare e aprendizado de máquina para identificar endereços de IP legítimos de bons bots.

Para permitir o tráfego de bons bots, use o campo [Bot Verificado](https://developers.cloudflare.com/ruleset-engine/rules-language/fields#dynamic-fields) na regra de firewall.

___

## Tenho um bot bom e quero adicioná-lo à lista de permissões (cf.bot\_management.verified\_bot). O que devo fazer?

A Cloudflare mantém uma lista de exemplo de bots verificados no [Cloudflare Radar](https://radar.cloudflare.com/verified-bots).

Se você opera bots e quer entrar na lista de Bots Verificados da Cloudflare, é preciso seguir nossa [política pública para bots verificados](https://developers.cloudflare.com/bots/reference/verified-bots-policy/).  Caso seu bot já cumpra esses critérios, envie esta [solicitação on-line](https://docs.google.com/forms/d/e/1FAIpQLSdqYNuULEypMnp4i5pROSc-uP6x65Xub9svD27mb8JChA_-XA/viewform?usp=sf_link).

___

## Quais informações eu preciso para solucionar meus problemas de bot?

Se você estiver enfrentando erros com sua solução bot e precisar enviar uma solicitação de suporte, inclua as seguintes informações:

-   RAYIDs
-   Endereços de IP
-   IDs de regra de firewall, expressão de regras, taxas de resolução CAPTCHA
-   Agentes de usuário comuns entre falsos positivos
-   ASNs comuns entre falsos positivos
-   Capturas de tela de atividade estranha do firewall, como um enorme pico no tráfego desafiado no gráfico
-   URIs ou caminhos problemáticos
-   Descrição aproximada de como seu domínio está configurado.
    -   É uma zona SSL para SaaS enquanto as outras não são?
    -   A maioria do tráfego de API é enviada para um URI específico?
    -   Quanto tráfego móvel você espera?

___

## O que devo fazer se estiver recebendo falsos positivos causados pelo Modo Bot Fight (BFM) ou Modo Super Bot Fight (SBFM)?

**Como faço para desativar o recurso BFM****/SBFM?**

Se você encontrar algum problema com o recurso BFM/SBFM (por exemplo, um falso positivo), pode desativá-lo em **Segurança** > **Bots**.

-   Para os planos **gratuitos**, alterne a opção **Modo Combate a Bots** como **Desativado**
-   Nos planos **Pro** , clique no link **Configurar o Modo de Super Combate a Bots**, configure os recursos **Definitivamente automatizados** e **Bots verificados** como **Permitir** e alterne as opções **Proteção de recursos estáticos** e **Detecções de JavaScript** para **Desativar**
-   Nos planos **Business** e **Enterprise** (sem o complemento de Gerenciamento de Bots), clique no link **Configurar o Modo de Super Combate a Bots** e defina os recursos **Definitivamente automatizados**, **Provavelmente automatizados** e **Bots verificados** como **Permitir**. Depois, alterne as opções **Proteção de recursos estáticos** e **Detecções de JavaScript** para **Desativar**

___

## O recurso Super Bot Fight Mode (SBFM) ainda está bloqueando solicitações, apesar de ter sido desativado. Por quê?

Esse é um problema conhecido que a equipe do bots está trabalhando para resolver no futuro próximo. Enquanto isso, há uma solução alternativa para resolver esse problema. É necessário executar o comando de API a seguir para verificar e remover o conjunto de regras do SBFM:

1\. Liste os conjuntos de regras existentes no nível da zona


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -X GET &quot;https://api.cloudflare.com/client/v4/zones/zone_id/rulesets&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Email: email&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Key: key&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;Content-Type: application/json&quot;</span></div></span></span></span></code></pre>{{</raw>}}

2\. No resultado da etapa 1, encontre a ID do conjunto de regras que está associada à configuração do SBFM da zona. Você deve ver `"kind": "zone"` e `"phase": "http_request_sbfm"` para esse conjunto de regras.

3\. Use a ID do conjunto de regras que você encontrou para excluir o conjunto de regras do SBFM


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -X DELETE &quot;https://api.cloudflare.com/client/v4/zones/zone_id/rulesets/rulesets_id&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Email: email&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Key: key&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;Content-Type: application/json&quot;</span></div></span></span></span></code></pre>{{</raw>}}

Substitua <key> pela sua própria chave de API, que pode ser obtida em [Tokens de API](https://dash.cloudflare.com/profile/api-tokens).

___

## Recursos relacionados

-   [Gerenciamento de Bot da Cloudflare](https://developers.cloudflare.com/bots/) (Documentação do desenvolvedor)
-   [Regras de firewall da Cloudflare](https://developers.cloudflare.com/firewall/cf-firewall-rules/) (documentação para desenvolvedores)
-   [Bot Management da Cloudflare: aprendizado de máquina e mais](https://blog.cloudflare.com/cloudflare-bot-management-machine-learning-and-more/) (Blog da Cloudflare)
-   [Acabe com os bots: lições práticas sobre aprendizado de máquina](https://blog.cloudflare.com/stop-the-bots-practical-lessons-in-machine-learning/) (Blog da Cloudflare)
