---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/205043158-Conformidade-com-PCI-e-SSL-TLS-da-Cloudflare
title: Conformidade com PCI e SSLTLS da Cloudflare
---

# Conformidade com PCI e SSL/TLS da Cloudflare

## Conformidade com PCI e SSL/TLS da Cloudflare

_Saiba como configurar a Cloudflare de modo a cumprir os requisitos de digitalização do padrão PCI e entenda quais mitigações a Cloudflare implementou para versões anteriores de TLS/SSL._

### Neste artigo

-   [Visão geral](https://support.cloudflare.com/hc/pt-br/articles/205043158-Conformidade-com-PCI-e-SSL-TLS-da-Cloudflare#4kBCxczA0ijVjWhuqonQ0o)
-   [Configure a Versão Mínima de TLS como 1.2](https://support.cloudflare.com/hc/pt-br/articles/205043158-Conformidade-com-PCI-e-SSL-TLS-da-Cloudflare#5C1eNXjWqBpeXLwYlB0r0I)
-   [Mitigações da Cloudflare com relação a vulnerabilidades conhecidas de TLS](https://support.cloudflare.com/hc/pt-br/articles/205043158-Conformidade-com-PCI-e-SSL-TLS-da-Cloudflare#d6HRH9USMPriPWa0o)

___

## Visão geral

Devido a vulnerabilidades conhecidas, tanto o TLS 1.0 quanto o TLS 1.1 são insuficientes para proteger suas informações. Especificamente no caso dos clientes da Cloudflare, o impacto primário exercido pelo padrão PCI é que tanto o TLS 1.0 quanto o TLS 1.1 são considerados insuficientes para proteger o tráfego relacionado a cartões de pagamento.

As normas da PCI recomendam o uso do TLS 1.2 ou versões mais recentes.

Veja também as [mitigações implementadas pela Cloudflare com relação às vulnerabilidades](https://support.cloudflare.com/hc/en-us/articles/205043158#h_1TWWDdoBc31LFYj9kVNwlu) para TLS 1.0 e 1.1.

___

## Configure a Versão Mínima de TLS como 1.2

Para configurar seu domínio na Cloudflare de modo a permitir apenas conexões que utilizem protocolos TLS 1.2 ou mais recentes:

1\. Entre no painel de controle da Cloudflare.

2\. Clique na conta adequada da Cloudflare e no aplicativo.

4\. Navegue até **SSL/TLS** > **Certificados de Borda**.

5\. Em **Versão Mínima de TLS**, selecione **TLS 1.2** ou uma opção mais recente.

___

## Mitigações da Cloudflare com relação a vulnerabilidades conhecidas de TLS

Existem várias medidas de mitigação que a Cloudflare executa com relação a vulnerabilidades conhecidas de versões TLS anteriores à 1.2. Por exemplo, a Cloudflare não dá suporte a:

1.  Compactação de cabeçalho em TLS
2.  Compactação de cabeçalho em SPDY 3.1
3.  RC4
4.  SSL 3.0
5.  Renegociação com clientes
6.  Conjuntos de cifras DHE
7.  Cifras com grau de exportação

As mitigações da Cloudflare protegem contra vários ataques:

-   CRIME
-   VIOLAÇÃO
-   POODLE
-   Fraquezas criptográficas do RC4
-   Ataque de renegociação de SSL
-   Ataques de rebaixamento de protocolo
-   FREAK
-   LogJam
-   O padrão 3DES é integralmente desativado para as versões de TLS 1.1 e 1.2 e a Cloudflare implementa mitigações para o TLS 1.0

A Cloudflare ainda oferece mitigações adicionais para:

-   Heartbleed
-   Lucky Thirteen
-   Vulnerabilidade de injeção de CCS

A Cloudflare reforçou todos os servidores contra essas vulnerabilidades. Além disso, o WAF da Cloudflare tem regras gerenciadas para mitigar várias dessas vulnerabilidades, incluindo o Heartbleed e o ShellShock.

### Ameaça ROBOT (Return Of Bleichenbacher's Oracle)

As verificações de segurança que observam a presença do ROBOT na Cloudflare são um falso positivo. A Cloudflare verifica o padding em tempo real e alterna para uma chave de sessão aleatória se o padding estiver incorreto.

### Sweet32 (CVE-2016-2183)

Uma vulnerabilidade no uso do algoritmo de criptografia Triplo DES (3DES) no protocolo TLS (Transport Layer Security). No momento, o ataque Sweet32 é um ataque de prova de conceito e não existe nenhum exemplo conhecido no mundo real. A Cloudflare mitigou manualmente a vulnerabilidade do TLS 1.0 da seguinte maneira:

-   o invasor precisa coletar 32 GB de dados em uma única sessão de TLS
-   A Cloudflare força novas chaves de sessão TLS 1.0 sobre a cifra 3DES afetada bem antes dos 32 GB de dados serem coletados
