---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/115000272247-Cobran%C3%A7a-do-Rate-Limiting-da-Cloudflare
title: Cobrança do Rate Limiting da Cloudflare
---

# Cobrança do Rate Limiting da Cloudflare

## Cobrança do Rate Limiting da Cloudflare

_Saiba mais sobre como a cobrança do Rate Limiting da Cloudflare é calculada._

___

Os clientes do Enterprise pagam uma tarifa fixa, conforme especificado no seu contrato. Todos os demais planos são [cobrados com base no uso](https://support.cloudflare.com/hc/en-us/articles/115004555148), que é discriminado na fatura mensal da assinatura.

As primeiras 10.000 solicitações faturáveis em todos os seus sites são gratuitas. A partir daí, você será cobrado a US$ 0,05 por cada 10.000 solicitações.

Por exemplo, se você tiver um total de 35.000 solicitações bem-sucedidas/permitidas que correspondam a qualquer regra de Rate Limiting

-   1-10.000 são gratuitas.
-   10.001-20.000 custam US$ 0,05
-   20.001-30.000 custam US$ 0,05
-   30.001-35.000 custam US$ 0,05 (a cobrança não é feita _pro rata_ se você usar apenas uma parte das 10.000 solicitações pagas)

Você será cobrado um total de US$ 0,15 pelo Rate Limiting em sua próxima [data de cobrança](https://support.cloudflare.com/hc/en-us/articles/200170286-How-does-CloudFlare-s-billing-for-apps-and-paid-plans-work-#section2) . A cobrança aparecerá como um item da sua fatura e listará o número total de solicitações cobradas.

Observe que as primeiras 10.000 solicitações são computadas em todos os sites da sua conta, e não 10.000 solicitações gratuitas por site: se você tiver um site com 20.000 solicitações e outro com 30.000, o valor de sua fatura será US$ 0,20 para o total de 50.000 solicitações, e não US$ 0,15.

___

## Uso cobrável do Rate Limiting

O Rate Limiting é cobrado com base no número de solicitações bem-sucedidas (não bloqueadas) que correspondem às regras que você definiu para todos os seus sites. Cada solicitação é contada apenas uma vez, para que você não seja cobrado duas vezes se uma solicitação corresponder a várias regras.

Por exemplo, considerando uma regra que corresponda a exemplo.com/ratelimit/\* e bloqueia clientes que enviam mais de 30 solicitações por minuto:

-   O cliente A envia 20.000 solicitações para exemplo.com/ratelimit/foo a uma taxa de 10 solicitações por minuto. Todas as solicitações são permitidas.
-   O cliente B envia 90.000 solicitações para exemplo.com/ratelimit/bar, geralmente a uma taxa de 10 solicitações por minuto, mas com picos de mais de 30 solicitações por minuto. 60.000 de suas solicitações são bloqueadas durante os picos e 30.000 são permitidas quando a taxa de solicitações é mais baixa.
-   O cliente C envia 20.000 solicitações para exemplo.com/elsewhere a uma taxa de 40 solicitações por minuto. Embora esse número exceda o limiar, não corresponde ao caminho da regra, então todas as 20.000 solicitações são permitidas.

Nesse exemplo, 50.000 (30.000 + 20.000) solicitações são cobráveis: os clientes A e B enviaram solicitações que correspondiam à regra, mas algumas solicitações do cliente B foram bloqueadas e essas solicitações bloqueadas não foram cobradas. No total, o custo será (50.000 - 10.000) \* US$ 0,05 = $ 0,20.

| 
**Cliente**

 | 

**URL da solicitação**

 | 

**Solicitações**

 | 

**Resultado**

 | 

**Custo mensal**

 |
| --- | --- | --- | --- | --- |
| A | exemplo.com/ratelimit/foo | 20.000 a 10 sol./min | O padrão do URL corresponde, mas o limiar não foi excedido. Todas as solicitações são permitidas. | 

(2-1) \* US$ 0,05 = US$ 0,05

_A cobrança é de apenas 10.000 solicitações, porque as 10.000 primeiras permitidas não incorrem em nenhum custo._

 |
| B |  exemplo.com/ratelimit/bar | 

90.000:

60.000 a 30 sol./min + 30.000 com menos de 30 sol./min

 | O padrão do URL corresponde. A regra bloqueia 60.000 e permite 30.000 solicitações. | 3 \* US$ 0,05 = US$ 0,15 |
| C |  exemplo.com/elsewhere | 20.000 a 40 sol./min | O padrão do URL não corresponde. A regra não se aplica. Todas as solicitações são permitidas. | US$ 0,00 |
|  **Total a ser cobrado:** | US$ 0,20 |
