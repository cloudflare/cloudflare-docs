---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/360057976851-Como-distribuir-v%C3%ADdeos-com-a-Cloudflare
title: Como distribuir vídeos com a Cloudflare
---

# Como distribuir vídeos com a Cloudflare

### Neste artigo

-   [Como usar os serviços da Cloudflare](https://support.cloudflare.com/hc/pt-br/articles/360057976851-Como-distribuir-v%C3%ADdeos-com-a-Cloudflare#h_5mvWTaW0VyVyibnzFh5EK3)
-   [Sou operador de um site e meu conteúdo foi redirecionado por violações de Termos de Serviço](https://support.cloudflare.com/hc/pt-br/articles/360057976851-Como-distribuir-v%C3%ADdeos-com-a-Cloudflare#h_17ENJA5McX8FiFmwFhbacY)
-   [Sou visitante do site. O site que estou tentando acessar exibe uma mensagem referente aos Termos de Serviço da Cloudflare em vez do conteúdo esperado](https://support.cloudflare.com/hc/pt-br/articles/360057976851-Como-distribuir-v%C3%ADdeos-com-a-Cloudflare#h_ktzs0UjPIhrLq0EKVFhR3)
-   [Sou operador do site e estou com receio de violar os Termos de Serviço](https://support.cloudflare.com/hc/pt-br/articles/360057976851-Como-distribuir-v%C3%ADdeos-com-a-Cloudflare#h_6B1A8c4GYUXZXtvk5nB6DI)

___

## Como usar os serviços da Cloudflare

A Cloudflare foi lançada em 2010, acreditando que todos merecem uma presença na web segura, rápida e confiável. Acreditávamos que você não deveria ter que pagar mais quando estivesse sob um ataque cibernético, então decidimos oferecer aos sites um plano gratuito e um preço fixo. Isso funcionou porque a maioria dos sites não consome muita largura de banda, significando que poderíamos fornecer nossos serviços de forma acessível para todos. Proibimos o streaming de conteúdo de vídeo usando nossa largura de banda desde o início. Embora fosse possível incorporar um vídeo de outro provedor, limitamos a capacidade de usar nossos serviços para distribuir bits de vídeo da nossa rede para seus visitantes. Isso, porque cada segundo de um vídeo tipico requer tanta largura de banda quanto o carregamento de uma página web completa.

Com o tempo, percebemos que alguns dos nossos clientes queriam transmitir vídeos usando nossa rede. Para atendê-los, desenvolvemos o produto [Stream](https://www.cloudflare.com/products/cloudflare-stream/). O Stream proporciona um desempenho excelente a uma tarifa acessível, cobrada com base na quantidade de carga que você coloca na nossa rede.

A maioria das pessoas respeita essas limitações e entende que elas existem para garantir uma alta qualidade de serviço para todos os clientes da Cloudflare. Infelizmente, alguns clientes tentam alterar as configurações do nosso serviço para transmitir vídeos, em violação dos nossos Termos de Serviço. Queremos garantir um serviço ótimo para todos, inclusive para as iniciativas de serviço público que oferecemos, como o [Projeto Galileo](https://www.cloudflare.com/galileo/), o [Projeto The Athenian](https://www.cloudflare.com/athenian/) e o [Projeto Fair Shot](https://www.cloudflare.com/fair-shot/). O uso indevido de nossos serviços por algumas pessoas limita nossa capacidade de oferecer tais iniciativas.

Veja a seguir algumas recomendações de uso para os serviços da Cloudflare com base naquilo que pode ter trazido você a esta página.

___

## Sou operador de um site e meu conteúdo foi redirecionado por violações de Termos de Serviço

Se você tem um plano Free, Pro ou Business e está veiculando vídeos ou uma quantidade desproporcional de conteúdo não HTML (como binários de software ou grandes volumes de imagens) em violação da [Seção 2.8 do Contrato de Assinatura por Autoatendimento](https://www.cloudflare.com/terms/), a Cloudflare poderá redirecionar seu conteúdo para vídeos e imagens alternativos. Quando isso acontecer, você receberá uma notificação por e-mail com informações sobre a zona que violou os Termos de Serviço. Não tente evitar o redirecionamento; isso poderá limitar sua capacidade de usar a Cloudflare no futuro.

## Opções para administradores da web removerem redirecionamentos 

-   **Veicular conteúdo redirecionado a partir de um subdomínio com nuvem cinza**
    -   A Seção 2.8 dos Termos de Serviço (TOS) de Autoatendimento da Cloudflare proíbe que os usuários veiculem uma quantidade desproporcional de conteúdo não HTML, como imagens e vídeos, sem um plano pago que inclua esses serviços. As restrições estabelecidas na Seção 2.8 do TOS não se aplicam ao conteúdo veiculado a partir de subdomínios com nuvem cinza (que não fazem proxy). 

-   **Veicular conteúdo redirecionado a partir de um serviço pago, conforme descrito abaixo**

## Como distribuir vídeos com a Cloudflare usando produtos pagos

A Cloudflare permite a distribuição de conteúdo de vídeo com serviços pagos específicos. Se você tiver interesse em veicular conteúdo de vídeo, existem duas opções recomendadas. 

### Opção 1: Cloudflare Stream 

O [Stream](https://www.cloudflare.com/products/cloudflare-stream/) é uma plataforma de vídeo sob demanda para a criação de aplicativos de vídeo. O Stream codifica, armazena e distribui vídeos otimizados formatados para diferentes dispositivos e conexões de rede. 

Para começar a usar o Stream, acesse o **Stream** no seu painel de controle ou [cadastre-se](https://dash.cloudflare.com/sign-up/stream). Seus vídeos do Stream não estão anexados a um domínio na sua conta da Cloudflare. Além disso, você não precisa de um domínio na Cloudflare para usar o Stream.

### Opção 2: Stream Delivery (somente Plano Enterprise)

O [Stream Delivery](https://www.cloudflare.com/products/stream-delivery/) oferece armazenamento em cache e distribuição de conteúdo em vídeo por meio dos data centers da Cloudflare em todo o mundo. Esse recurso de CDN só está disponível no Plano Enterprise da Cloudflare. [Entre em contato com nossa equipe de vendas](https://www.cloudflare.com/products/stream-delivery/#) se quiser explorar essa opção.

___

## Sou visitante do site. O site que estou tentando acessar exibe uma mensagem referente aos Termos de Serviço da Cloudflare em vez do conteúdo esperado

Essa situação poderá ocorrer se o operador do site estiver em violação da [Seção 2.8 do Contrato de Assinatura por Autoatendimento (TOS)](https://www.cloudflare.com/terms/) e não tiver adquirido um produto pago apropriado para distribuir o conteúdo que você está tentando acessar.

Fornecemos ao operador do site informações sobre a violação e como ele pode usar adequadamente os serviços da Cloudflare para distribuir o conteúdo que você está solicitando. Infelizmente, até que o operador do site adote medidas corretivas (como a compra de produtos autorizados a distribuir conteúdo de vídeo com a rede da Cloudflare), não poderemos remover essas restrições.

Medidas que você pode adotar nesse meio tempo:

1.  Dizer ao operador do site que, para começar, ele deve respeitar as regras que nos permitem fornecer serviços de baixo custo.
2.  Saber mais sobre as ações da Cloudflare no sentido de ajudar a construir uma internet melhor, como o [Projeto Galileo](https://www.cloudflare.com/galileo/), o [Projeto The Athenian](https://www.cloudflare.com/athenian/) e o [Projeto Fair Shot](https://www.cloudflare.com/fair-shot/).

Instalar o [1.1.1.1](https://1.1.1.1/) para ter uma experiência de internet mais privada e mais segura.

___

## Sou operador do site e estou com receio de violar os Termos de Serviço

Os planos Free, Pro e Business que veiculam vídeos ou uma quantidade desproporcional de conteúdo não HTML podem estar em violação da [Seção 2.8 do Contrato de Assinatura por Autoatendimento (TOS)](https://www.cloudflare.com/terms/). Para veicular vídeos ou uma grande quantidade de conteúdo não HTML, recomendamos usar uma das opções pagas descritas acima. 

## Como obter informações sobre o conteúdo que você está veiculando

Caso precise de mais informações sobre o conteúdo que sua zona está veiculando (por exemplo, tipo de conteúdo), você pode usar as seguintes ferramentas: 

-   Usuários do Cache Analytics: abra a **guia Armazenamento em Cache** no painel de controle para filtrar por tipo de conteúdo e identifique o tipo de tráfego que você está transferindo. 
-   Usuários sem o Cache Analytics: abra a **guia Análise de Dados** no painel de controle e selecione a seção **Desempenho** para obter informações sobre o conteúdo que você está veiculando.

![Cache Analytics: identifique o tipo de tráfego que está sendo transferido](/images/support/traffic-types.png)

## Ainda tem dúvidas? Entre em contato com o suporte

Caso tenha mais perguntas sobre o redirecionamento (por exemplo, se você acredita que seu conteúdo foi redirecionado por engano e tem provas disso), abra um [ticket de suporte](https://dash.cloudflare.com/redirect?account=support) e inclua as seguintes informações: 

-   Nome do seu domínio
-   Descrição do problema
-   Descrição do conteúdo que você está veiculando por meio da rede da Cloudflare
