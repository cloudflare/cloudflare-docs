---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/360016450871-Faturamento-para-o-Cloudflare-Stream
title: Faturamento para o Cloudflare Stream
---

# Faturamento para o Cloudflare Stream

## Faturamento para o Cloudflare Stream

_Saiba mais sobre os preços do Cloudflare Stream e como o faturamento é calculado._

### Neste artigo

-   [Preços do Cloudflare Stream:](https://support.cloudflare.com/hc/pt-br/articles/360016450871-Faturamento-para-o-Cloudflare-Stream#pricing)
-   [Faturamento para o Cloudflare Stream](https://support.cloudflare.com/hc/pt-br/articles/360016450871-Faturamento-para-o-Cloudflare-Stream#billing)
-   [Minutos faturáveis do Cloudflare Stream](https://support.cloudflare.com/hc/pt-br/articles/360016450871-Faturamento-para-o-Cloudflare-Stream#billable-minutes)
-   [Recursos relacionados](https://support.cloudflare.com/hc/pt-br/articles/360016450871-Faturamento-para-o-Cloudflare-Stream#related-resources)

___

## Preços do Cloudflare Stream:

O [Cloudflare Stream](https://support.cloudflare.com/hc/en-us/articles/360017801091) é uma plataforma de vídeo sob demanda para a criação de aplicativos de vídeo. Os preços variam de acordo com o uso e armazenamento, conforme descrito abaixo.

Minutos em vídeo entregues aos usuários:

-   US$ 1,00 por 1.000 minutos/mês

Minutos em vídeo armazenados no Cloudflare Stream:

-   US$ 5,00 por 1.000 minutos
-   Faturado antecipadamente

___

O Cloudflare Stream é cobrado mensalmente. Como o preço é por uso, você será cobrado pelos minutos assistidos e armazenados no mês anterior. Por exemplo, sua fatura de setembro incluirá encargos referentes ao uso do Stream em agosto.

Os encargos faturados são arredondados para os próximos 1000 minutos. Seguem algumas estimativas de preços baseadas nos minutos entregues e armazenados:

| **Minutos** | **Arredondar para** | **Encargos gerados** |
| --- | --- | --- |
| 
1.999 entregues aos usuários

 | 

2.000 minutos

 | 

US$ 2,00

 |
| 

3.001 armazenados no Stream

 | 

4.000 minutos

 | 

US$ 20,00

 |
| Total dos encargos (minutos entregues + minutos armazenados) por período | 

US$ 22,00

 |

___

## Minutos faturáveis do Cloudflare Stream

Os minutos a pagar representam o tempo gasto na entrega de vídeos pelo Cloudflare aos seus visitantes.

Se um visitante do site carregar um vídeo e não o assistir, a Cloudflare ainda cobrará pela entrega do vídeo. No entanto, se o navegador do visitante armazena em cache o vídeo localmente, a Cloudflare não cobra pelo tempo gasto para visualizá-lo. Em outras palavras, se o visitante assistir ao vídeo várias vezes, não cobraremos pelas visualizações seguintes.

O comportamento de pré-carregamento do Cloudflare Stream varia de acordo com o navegador. Alguns navegadores pré-carregam alguns segundos de vídeo, enquanto outros pré-carregam o vídeo inteiro. Embora o pré-carregamento seja útil para otimizar a disponibilidade do vídeo, avalie se ele é adequado ao seu caso de uso.

Você pode visualizar os minutos a pagar do Cloudflare Stream no painel Cloudflare para calcular o preço pelos minutos entregues.

Para visualizar os minutos assistidos com o Stream:

1.  Faça login na sua conta da Cloudflare.
2.  No menu suspenso **Meu perfil**, clique em **Faturamento**. Você verá uma lista dos domínios associados à sua conta Cloudflare.
3.  Escolha o domínio que possui o Stream ativado.
4.  Na navegação à esquerda, clique em **Uso a pagar**. Você verá um gráfico que exibe seu tráfego diário atual.
5.  Escolha **Mês anterior** no menu suspenso acima do gráfico e clique em **Mês até agora** para visualizar o uso do mês anterior.

___

-   [Plataforma de vídeo Cloudflare Stream](https://support.cloudflare.com/hc/en-us/articles/360017801091)
-   [Documentação para desenvolvedores do Cloudflare Stream](https://developers.cloudflare.com/stream/getting-started/)
