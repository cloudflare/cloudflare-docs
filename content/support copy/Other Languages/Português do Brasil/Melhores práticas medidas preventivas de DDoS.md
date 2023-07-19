---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/200170166-Melhores-pr%C3%A1ticas-medidas-preventivas-de-DDoS
title: Melhores práticas medidas preventivas de DDoS
---

# Melhores práticas: medidas preventivas de DDoS

## Melhores práticas: medidas preventivas de DDoS

_Conheça as melhores práticas para proteger seu site habilitado para Cloudflare contra ataques DDoS._

___

## Visão geral

Após ingressar no Cloudflare, verifique se o site está totalmente preparado para possíveis ataques DDoS usando as recomendações a seguir.

### Processe seus registros DNS no Cloudflare via proxy

Os invasores tentam identificar seu endereço IP de origem para atacar diretamente seu servidor Web de origem sem as proteções do Cloudflare. Oculte o endereço IP de origem do ataque direto redirecionando o tráfego para o Cloudflare via proxy.

Configure seus registros DNS para proteção máxima seguindo o passo a passo abaixo:

1.  [Ative o proxy da Cloudflare (nuvem laranja)](https://support.cloudflare.com/hc/articles/200169626)
2.  Exclua os registros DNS usados para FTP ou SSH e use o IP de origem para executar diretamente solicitações de FTP ou SSH. Se preferir, redirecione o FTP e o SSH via proxy com o [Cloudflare Spectrum](/spectrum/getting-started/).
3.  [Registros de nuvem cinza A, AAAA ou CNAME correspondentes ao seu servidor de correio](https://support.cloudflare.com/hc/articles/200168876)
4.  Remova os registros curinga nos domínios Grátis, Pro ou Business, porque eles expõem seu endereço IP de origem. [O Cloudflare protege apenas registros curinga para domínios dos planos Enterprise](https://support.cloudflare.com/hc/articles/360017421192#CloudflareDNSFAQ-DoesCloudflaresupportwildcardDNSentries).

### Não limite as solicitações de IP do Cloudflare

A partir do momento em que o tráfego é redirecionado para o Cloudflare via proxy, as conexões com o servidor Web de origem passam a vir dos [endereços IP do Cloudflare](http://www.cloudflare.com/ips). Portanto, é importante que o servidor Web de origem [coloque na lista de permissões os endereços IP do Cloudflare](https://support.cloudflare.com/hc/articles/201897700) e bloqueie claramente o tráfego que não vem do Cloudflare ou de endereços IP do seu parceiro, provedor ou aplicação confiável.

### Restaure os IPs originais do visitante nos logs do servidor de origem

Para ver os IPs reais por trás de um ataque, [restaure os IPs originais dos visitantes](https://support.cloudflare.com/hc/sections/200805497) nos logs do servidor de origem. Caso contrário, todos os logs apresentarão o tráfego dos IPs do Cloudflare. O Cloudflare sempre incluirá o endereço IP original do visitante na solicitação, [na forma de cabeçalho HTTP](https://support.cloudflare.com/hc/articles/200170986).Avise seu provedor de hospedagem que você está usando um proxy reverso e que, ao analisar as conexões atuais, todo o tráfego virá dos endereços IP do Cloudflare.

### Altere os endereços IP do servidor depois de migrar o site para o Cloudflare

O Cloudflare oculta os endereços IP do seu servidor de origem para o tráfego que você redireciona por proxy para o Cloudflare. Como uma medida de segurança a mais, recomendamos que você entre em contato com seu provedor de hospedagem e solicite novos IPs do servidor de origem.

### Use o Rate Limiting para evitar ataques DDoS de camada 7 e por força bruta

Para impedir ataques disfarçados como solicitações HTTP normais, o Rate Limiting permite que os administradores de sites especifiquem limites de carga específicos que eles esperam que seus servidores Web recebam. Com um simples clique, configure o limite de taxa básico para [proteger suas páginas de login contra ataques de força bruta](https://support.cloudflare.com/hc/articles/115001635128#3UWQC5PrVScHgEGRMobRMm).

Os planos Cloudflare Grátis, Pro e Business incluem 10.000 solicitações gratuitas por mês. Consulte nosso guia no [Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128) para saber mais.

___

## Recursos relacionados

-   [Como funciona a proteção DDoS da Cloudflare](https://support.cloudflare.com/hc/articles/200172676)
-   [Resposta a ataques DDoS](/ddos-protection/best-practices/respond-to-ddos-attacks/)
-   [O que é ataque DDoS?](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)
