---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/200172676-Como-funciona-a-prote%C3%A7%C3%A3o-contra-DDoS-da-Cloudflare
title: Como funciona a proteção contra DDoS da Cloudflare
---

# Como funciona a proteção contra DDoS da Cloudflare

_Saiba como a Cloudflare protege contra ataques DDoS e como identificar se seu site está sendo atacado._

### Neste artigo

-   [Visão geral](https://support.cloudflare.com/hc/pt-br/articles/200172676-Como-funciona-a-prote%C3%A7%C3%A3o-contra-DDoS-da-Cloudflare#h_948b870f-2a72-481a-8186-cccc7f4f7c9b)
-   [O conjunto de regras gerenciadas de proteção contra ataques DDoS HTTP da Cloudflare](https://support.cloudflare.com/hc/pt-br/articles/200172676-Como-funciona-a-prote%C3%A7%C3%A3o-contra-DDoS-da-Cloudflare#http-ddos-managed-rules)
-   [O conjunto de regras gerenciadas de proteção contra ataques DDoS na camada de rede da Cloudflare](https://support.cloudflare.com/hc/pt-br/articles/200172676-Como-funciona-a-prote%C3%A7%C3%A3o-contra-DDoS-da-Cloudflare#network-ddos-managed-rules)
-   [Saiba se você está sob ataque de DDoS](https://support.cloudflare.com/hc/pt-br/articles/200172676-Como-funciona-a-prote%C3%A7%C3%A3o-contra-DDoS-da-Cloudflare#h_bc8656d7-0088-4da1-b8da-2a369caa72d3)
-   [A Cloudflare está me atacando?](https://support.cloudflare.com/hc/pt-br/articles/200172676-Como-funciona-a-prote%C3%A7%C3%A3o-contra-DDoS-da-Cloudflare#h_60eb7a1e-a0b0-45c9-9c19-d67b93eea470)
-   [Recursos relacionados](https://support.cloudflare.com/hc/pt-br/articles/200172676-Como-funciona-a-prote%C3%A7%C3%A3o-contra-DDoS-da-Cloudflare#h_5d49e839-e040-49a9-acce-11bd03dfdcc2)

___

## Visão geral

Um [ataque de Negação de Serviço Distribuída](https://www.cloudflare.com/ddos) (DDoS) busca tornar um serviço on-line indisponível para os usuários finais.  Para todos os tipos de plano, a Cloudflare fornece mitigação ilimitada de ataques DDoS nas Camadas 3, 4 e 7. A Cloudflare não cobra pelo tamanho do ataque e não tem limite para tamanho, tipo ou duração do ataque.

A rede da Cloudflare foi desenvolvida para monitorar e mitigar automaticamente grandes [ataques de DDoS](https://www.cloudflare.com/ddos). Armazenar seu conteúdo em cache na Cloudflare também protege seu site contra ataques menores de DDoS, mas é importante ressaltar que ativos não armazenados em cache requerem uma [resposta manual adicional aos ataques de DDoS](/ddos-protection/best-practices/respond-to-ddos-attacks/).

Além disso, a Cloudflare ajuda a mitigar ataques menores de DDoS:

-   Para zonas em qualquer plano, quando a taxa de erros de HTTP estiver acima do nível de sensibilidade _Alto_ (padrão), com um limite de taxa de 1.000 erros por segundo. Para diminuir o nível de sensibilidade, [você pode configurar o conjunto de regras gerenciadas de proteção contra ataques DDoS HTTP](/ddos-protection/managed-rulesets/http).

-   Para zonas nos planos Pro, Business e Enterprise, a Cloudflare realiza uma verificação adicional para maior precisão na detecção: a taxa de erros por segundo também precisa ser no mínimo cinco vezes os níveis normais de tráfego de origem.

A Cloudflare determina a taxa de erro com base em todos os erros de HTTP na faixa 52X (Erro Interno do Servidor) e na faixa 53X, exceto para o [erro 530](https://support.cloudflare.com/hc/articles/115003011431#530error).

Os ataques DDoS por HTTP mitigados podem ser vistos no painel "Firewall Analytics" como eventos de DDoS por HTTP, que também estão disponíveis nos [Registros da Cloudflare](/logs/).

No momento, em mitigações de DDoS baseadas na taxa de erro HTTP, os clientes não podem excluir códigos de erro HTTP específicos.

Saiba mais sobre [ataques DDoS famosos](https://www.cloudflare.com/learning/ddos/famous-ddos-attacks/) e [DDoS](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/) na Central de Aprendizado da Cloudflare. Você também pode ler os estudos de caso de DDoS na seção de recursos relacionados, no final deste artigo.

___

## O conjunto de regras gerenciadas de proteção contra ataques DDoS HTTP da Cloudflare

O conjunto de regras gerenciadas de proteção contra ataques DDoS HTTP da Cloudflare é um conjunto de regras pré-configuradas usadas para corresponder a padrões de ataque conhecidos, ferramentas de ataque conhecidas, padrões suspeitos, violações de protocolo, solicitações que causam grandes quantidades de erros de origem, tráfego excessivo que atinge a origem/cache e vetores de ataque adicionais na camada de aplicativos na borda. O conjunto de regras está disponível para clientes da Cloudflare em todos os planos e é habilitado por padrão.

Se você espera grandes picos de tráfego legítimo, considere personalizar suas configurações de proteção contra DDoS para evitar falsos positivos, que ocorrem quando o tráfego legítimo é falsamente identificado como tráfego de ataque e bloqueado/desafiado.

Saiba mais sobre o conjunto de regras gerenciadas de proteção contra ataques DDoS HTTP da Cloudflare e as definições de configuração disponíveis  no [portal de Desenvolvedores da Cloudflare](/ddos-protection/managed-rulesets/http).

Para saber mais sobre as ações realizadas por sistemas de proteção contra ataques DDoS HTTP, consulte [Parâmetros de proteção contra ataques DDoS HTTP: ação](/ddos-protection/managed-rulesets/http/override-parameters#action).

___

## O conjunto de regras gerenciadas de proteção contra ataques DDoS na camada de rede da Cloudflare

O conjunto de regras gerenciadas de proteção contra ataques DDoS na camada de rede da Cloudflare é um conjunto de regras pré-configuradas usadas para fazer a correspondência de vetores de ataque DDoS conhecidos nos níveis 3 e 4 do modelo OSI. O conjunto de regras está disponível para clientes da Cloudflare em todos os planos e é habilitado por padrão.

Saiba mais sobre o conjunto de regras gerenciadas de proteção contra ataques DDoS na camada de rede da Cloudflare e as definições de configuração disponíveis no [portal de Desenvolvedores da Cloudflare](/ddos-protection/managed-rulesets/network).

Para saber mais sobre as ações realizadas por sistemas de proteção contra ataques DDoS de camada 3/4, consulte [Parâmetros de proteção contra ataques DDoS na camada de rede: ação](/ddos-protection/managed-rulesets/network/override-parameters#action).

___

## Saiba se você está sob ataque de DDoS

Sinais comuns de que você está sob ataque de DDoS:

-   Seu site está off-line ou lento para responder às solicitações.
-   Há picos inesperados no gráfico de **Solicitações via Cloudflare** ou **Largura de banda** no seu aplicativo Cloudflare **Analytics**.
-   Existem solicitações estranhas nos logs do servidor Web de origem que não correspondem ao comportamento normal do visitante.

___

## A Cloudflare está me atacando?

Há dois cenários comuns em que parece que a Cloudflare está atacando seu site:

-   A não ser que você [restaure os endereços de IP originais do visitante](https://support.cloudflare.com/hc/pt-br/sections/200805497-Restoring-Visitor-IPs), os endereços de IP da Cloudflare aparecerão nos logs do seu servidor para todas as solicitações com proxy.
-   O invasor está falsificando os IPs da Cloudflare. A Cloudflare apenas [envia tráfego para seu servidor Web de origem por algumas portas específicas](https://support.cloudflare.com/hc/articles/200169156) a menos que você use o [Cloudflare Spectrum](/spectrum/get-started/).

Idealmente, como a Cloudflare é um proxy reverso, seu provedor de hosting observa o tráfego de ataque que se conecta a partir de [endereços de IP da Cloudflare](https://www.cloudflare.com/ips/). Por outro lado, se estiver vendo conexões de endereços de IP que não pertencem à Cloudflare, trata-se de um ataque direto ao seu servidor Web de origem. A Cloudflare não pode parar os ataques diretamente no seu endereço de IP de origem porque o tráfego ignora a rede da Cloudflare.

___

## Recursos relacionados

-   [Resposta a ataques DDoS](/ddos-protection/best-practices/respond-to-ddos-attacks/)
-   [Melhores práticas: medidas preventivas de DDoS](https://support.cloudflare.com/hc/articles/200170166)
-   [Uso do Cloudflare Logs para investigar o tráfego DDoS (somente empresa)](https://support.cloudflare.com/hc/pt-br/articles/360020739772-Using-Cloudflare-Logs-ELS-to-Investigate-DDoS-Traffic-Enterprise-Only-)
-   [O que é ataque DDoS?](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)
-   [Como funcionam os ataques de amplificação de DNS](http://blog.cloudflare.com/deep-inside-a-dns-amplification-ddos-attack)

### Estudos de caso:

-   [Como iniciar e como parar um DDoS de 65 Gbps](http://blog.cloudflare.com/65gbps-ddos-no-problem)
-   [Os cessar-fogo não acaba com guerras virtuais](http://blog.cloudflare.com/ceasefires-dont-end-cyberwars)
-   [Reflexões sobre a reflexão (ataques)](https://blog.cloudflare.com/reflections-on-reflections/)
-   [O SSDP (Stupidly Simple DDoS Protocol) gera DDoS de 100 Gbps](https://blog.cloudflare.com/ssdp-100gbps/)
-   [Memcrashed – Principais ataques de amplificação da porta UDP 11211](https://blog.cloudflare.com/memcrashed-major-amplification-attacks-from-port-11211/)
-   [A verdadeira causa de grandes DDoS – falsificação de IP](https://blog.cloudflare.com/the-root-cause-of-large-ddos-ip-spoofing/)
