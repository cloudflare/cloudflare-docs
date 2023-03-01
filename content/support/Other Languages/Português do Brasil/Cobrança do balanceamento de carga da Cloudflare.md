---
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/115005254367-Cobran%C3%A7a-do-balanceamento-de-carga-da-Cloudflare
title: Cobrança do balanceamento de carga da Cloudflare
---

# Cobrança do balanceamento de carga da Cloudflare

## Cobrança do balanceamento de carga da Cloudflare

_Saiba mais sobre como é calculada a cobrança do balanceamento de carga da Cloudflare._

### Neste artigo

-   [Cobrança do balanceamento de carga da Cloudflare](https://support.cloudflare.com/hc/pt-br/articles/115005254367-Cobran%C3%A7a-do-balanceamento-de-carga-da-Cloudflare#12345680)
-   [Preços do balanceamento de carga da Cloudflare](https://support.cloudflare.com/hc/pt-br/articles/115005254367-Cobran%C3%A7a-do-balanceamento-de-carga-da-Cloudflare#12345679)
-   [Uso cobrável do balanceamento de carga](https://support.cloudflare.com/hc/pt-br/articles/115005254367-Cobran%C3%A7a-do-balanceamento-de-carga-da-Cloudflare#12345681)

___

Quando ativado, o balanceamento de carga da Cloudflare é cobrado no nível da conta. Além da assinatura mensal, contaremos o número de solicitações de DNS ("consultas") para cada balanceamento de carga configurado, por mês. As primeiras 500.000 consultas, compartilhadas em todos os Load Balancers da sua conta, são gratuitas: o uso adicional além disso é cobrado a 50 centavos de dólar por 500.000 consultas, com o valor arredondado para as próximas 500 mil consultas.

Por exemplo:

-   81.451 consultas de DNS = assinatura + US$ 0 pelo uso.
-   511.881 consultas de DNS = assinatura + US$ 0,50 pelo uso.
-   2.994.155 consultas de DNS = assinatura + US$ 2,50 pelo uso.

Observe que as primeiras 500.000 consultas são baseadas em todos os Load Balancers ativos da sua conta, não por site (domínio), já que os Load Balancers podem ser compartilhados entre sites por meio da configuração de um registro CNAME.

___

## Preços do balanceamento de carga da Cloudflare

As assinaturas do balanceamento de carga da Cloudflare começam com um preço que varia entre US$ 5 e US$ 50 por mês, dependendo das opções de assinatura selecionadas.

Você pode configurar o balanceamento de carga para atender às suas necessidades específicas com base no número de servidores de origem, na frequência dos health checks, no número de regiões das quais provêm as verificações e no roteamento geográfico.

A assinatura de US$ 5 permite que você configure 2 servidores de origem para cada conta da Cloudflare, 5 servidores de origem por grupo, health checks de 60 segundos e verificações de 1 (uma) região: ideal para o balanceamento de carga direto ou failover. Grupos diferentes que contêm o mesmo endereço IP de origem contam como origens distintas para uma conta.

Servidores de origem adicionais estão disponíveis a US$ 5 por origem por mês. Para mais de 20 servidores de origem, [entre em contato com nossa equipe de vendas.](https://www.cloudflare.com/lp/dashboard-ss-load-balancing/)

___

## Uso cobrável do balanceamento de carga

O uso é contado como [consultas de DNS](https://en.wikipedia.org/wiki/Domain_Name_System) autoritativas frente aos nameservers da Cloudflare para cada um dos hostnames de Load Balancers que você configurou.

Você pode reduzir o número de consultas de DNS autoritativas configurando o Load Balancer como "fazendo proxy" (nuvem laranja) para seus serviços HTTP(S), o que irá configurar a TTL externa do DNS em 5 minutos e manter o desempenho equivalente ao failover com TTLs de DNS muito curtas. [Leia mais sobre as vantagens de fazer proxy (nuvem laranja) x não fazer proxy (nuvem cinza).](https://support.cloudflare.com/hc/en-us/articles/115005138088-Load-Balancing-TTLs-and-Orange-vs-Grey-Cloud)

### Cobrança dos clientes do plano Enterprise

Os clientes do Enterprise são cobrados com base em conversas com a equipe de vendas corporativas da Cloudflare. Os clientes do Enterprise também têm acesso a funcionalidades adicionais, incluindo:

-   Execuções de health checks a partir de [cada data center da Cloudflare](https://www.cloudflare.com/network/) (para aumentar o nível de detalhamento do failover)
-   Direção por data center (sobrepondo-se aos servidores de origem que um local específico deveria usar e em qual ordem)
-   Health checks com intervalos de cinco segundos
-   Compatibilidade com mais de 20 servidores de origem
-   Suporte Enterprise da Cloudflare (incluindo e-mail e telefone 24 horas por dia, 7 dias por semana, e um engenheiro de soluções nomeado)
