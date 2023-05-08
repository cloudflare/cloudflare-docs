---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/200170196-Resposta-a-ataques-DDoS
title: Resposta a ataques DDoS
---

# Resposta a ataques DDoS

## Resposta a ataques DDoS

_Proteja seu site contra um ataque de DDoS (Negação de Serviço Distribuída). Aprenda as contramedidas básicas para interromper um ataque em curso._

### Neste artigo

-   [Visão geral](https://support.cloudflare.com/hc/pt-br/articles/200170196-Resposta-a-ataques-DDoS#h_49125146-d910-42ad-a0d8-3d08a4eae681)
-   [Etapa 1: ative o modo "Estou sob Ataque"](https://support.cloudflare.com/hc/pt-br/articles/200170196-Resposta-a-ataques-DDoS#h_dfff923a-5879-4750-a747-ed7b639b6e19)
-   [Etapa 2: habilite o WAF (Web Application Firewall)](https://support.cloudflare.com/hc/pt-br/articles/200170196-Resposta-a-ataques-DDoS#h_b97416a5-5196-4f12-acb6-f81bbfcfa95f)
-   [Etapa 3: desafie ou bloqueie o tráfego por meio do aplicativo de Firewall](https://support.cloudflare.com/hc/pt-br/articles/200170196-Resposta-a-ataques-DDoS#h_a2c9a5ce-d652-46db-9e82-bc3f06835348)
-   [Etapa 4: entre em contato com o suporte do Cloudflare](https://support.cloudflare.com/hc/pt-br/articles/200170196-Resposta-a-ataques-DDoS#h_995ffed3-18a9-4f8c-833c-81236061b1e8)
-   [Recursos relacionados](https://support.cloudflare.com/hc/pt-br/articles/200170196-Resposta-a-ataques-DDoS#h_034beb4b-231e-40d8-b938-5c1b446e26a6)

___

## Visão geral

A rede da Cloudflare mitiga automaticamente os [ataques de DDoS](https://www.cloudflare.com/ddos) muito grandes. O armazenamento do seu conteúdo em cache na Cloudflare também protege seu site contra pequenos ataques de DDoS, mas os ativos não armazenados em cache podem exigir as etapas adicionais de intervenção manual fornecidas neste guia.

___

## Etapa 1: ative o modo "Estou sob Ataque"

Para ativar o modo [**Estou sob Ataque**](https://support.cloudflare.com/hc/articles/200170076):

1\. Faça login na sua conta Cloudflare.

2\. Selecione o domínio atualmente sob ataque.

3\. Alterne o modo **Estou sob Ataque** para _Ativado_ na seção **Ações Rápidas** do aplicativo **Overview** da Cloudflare.

4\. \[Opcional\] Ajuste o [**Tempo de Validade do Desafio**](https://support.cloudflare.com/hc/articles/200170136) na guia **Configurações** do aplicativo **Firewal**.

___

## Etapa 2: habilite o WAF (Web Application Firewall)

Ative o [WAF](https://support.cloudflare.com/hc/en-us/articles/200172016-What-does-the-Web-Application-Firewall-WAF-do-) da Cloudflare por meio do seguinte procedimento:

1.  Faça login na sua conta da Cloudflare.
2.  Selecione o domínio que requer proteção adicional.
3.  Alterne o **Web Application Firewall** para_Ativado_dentro da guia **Managed Rules** do aplicativo **Firewall** .

___

## Etapa 3: desafie ou bloqueie o tráfego por meio do aplicativo de Firewall

O aplicativo **Firewall** da Cloudflare facilita o bloqueio de tráfego por meio dos seguintes métodos:

-   [**Access Rules para IP**](/waf/tools/ip-access-rules/)  — recomendado para bloquear vários endereços IP, faixas de IP /16 ou /24 ou Números do Sistema Autônomo (ASNs). 
-   [**Firewall Rules**](/firewall/cf-dashboard/create-edit-delete-rules/)  — recomendado para bloquear um país, qualquer faixa de IPs válidos ou padrões de ataque mais complexos.

-   [**Zone Lockdown**](/waf/tools/zone-lockdown/)  — recomendado para permitir apenas endereços IP ou faixas de IP confiáveis para uma parte do seu site.
-   [**User Agent Blocking**](/waf/tools/user-agent-blocking/)  — recomendado para bloquear [cabeçalhos de User Agents](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) suspeitos em todo o seu domínio.

Para decidir qual país ou quais IPs bloquear ou desafiar, verifique seus arquivos de log. Entre em contato com seu provedor de hospedagem para ajudar a identificar:

-   o tráfego do ataque atingindo o seu servidor de origem;
-   os recursos sendo acessados pelo ataque; e
-   características comuns do ataque (endereços IP, User Agents países, ASNs etc).

___

## Etapa 4: entre em contato com o suporte do Cloudflare

Se você não conseguir impedir que um ataque sobrecarregue o seu servidor de origem utilizando as etapas acima, [entre em contato com o Suporte](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730) da Cloudflare para obter ajuda.

___

## Recursos relacionados

-   [Como funciona a proteção DDoS da Cloudflare](https://support.cloudflare.com/hc/articles/200172676)
-   [Melhores práticas: medidas preventivas de DDoS](https://support.cloudflare.com/hc/articles/200170166)
-   [O que modo "Estou sob Ataque" faz?](https://support.cloudflare.com/entries/22053133)
-   [Uso do Cloudflare Logs para investigar o tráfego DDoS (somente empresa)](https://support.cloudflare.com/hc/en-us/articles/360020739772-Using-Cloudflare-Logs-ELS-to-Investigate-DDoS-Traffic-Enterprise-Only-)
-   [Como notificar um ataque de DDoS à polícia](https://www.icann.org/news/blog/how-to-report-a-ddos-attack)
