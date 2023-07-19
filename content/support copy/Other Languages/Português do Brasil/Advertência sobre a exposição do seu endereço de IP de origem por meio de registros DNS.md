---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/115003687931-Advert%C3%AAncia-sobre-a-exposi%C3%A7%C3%A3o-do-seu-endere%C3%A7o-de-IP-de-origem-por-meio-de-registros-DNS
title: Advertência sobre a exposição do seu endereço de IP de origem por meio de registros DNS
---

# Advertência sobre a exposição do seu endereço de IP de origem por meio de registros DNS

## Advertência sobre a exposição do seu endereço de IP de origem por meio de registros DNS

_Se você tiver registros DNS com nuvens cinza, a Cloudflare poderá adverti-lo de que seus registros DNS podem revelar o endereço de IP do seu servidor de origem. Isso acontece com maior frequência com os registros A, AAAA, CNAME e DNS MX._

___

## Visão geral

Quando seus registros DNS estiverem com nuvem laranja, a Cloudflare estará acelerando e protegendo o seu site.

Uma consulta _dig_ do seu domínio raiz com nuvem laranja retorna um endereço de IP da Cloudflare. Assim, o endereço de IP do seu servidor de origem permanece oculto para o público. Lembre-se de que as vantagens da nuvem laranja só se aplicam ao tráfego de HTTP.

Em determinadas circunstâncias, o painel **registros DNS** no aplicativo de **DNS** do painel de controle da Cloudflare exibe uma advertência sempre que você tiver registros DNS com nuvens cinza que possam expor o endereço de IP do seu servidor de origem. Essa advertência não bloqueia nem afeta de forma alguma o tráfego destinado ao seu site .

Se o endereço de IP do seu servidor for exposto, o servidor fica mais vulnerável a ataques diretos.  Ainda é possível (porém, mais difícil) que invasores determinem o endereço de IP do seu servidor de origem ao fazer o proxy do tráfego para a Cloudflare.

Abaixo estão dois casos nos quais você pode ver uma advertência da Cloudflare relativa à exposição do IP.

___

## Caso 1 - registros DNS que deveriam estar com nuvem laranja

Se você vir a seguinte advertência:

_`Este registro está expondo o endereço de IP do seu servidor de origem. Para ocultar o endereço de IP de origem e aumentar a segurança do servidor, clique na nuvem cinza para alterá-la para laranja.`_

A Cloudflare recomenda que o registro esteja com nuvem laranja para que qualquer consulta dig desse registro retorne um endereço de IP da Cloudflare e o seu endereço de IP do servidor de origem permaneça oculto para o público.

Para que você possa aproveitar as vantagens de desempenho e segurança da Cloudflare, recomendamos que coloque nuvens laranja nos seus registros DNS que lidam com o tráfego de HTTP, incluindo os registros A, AAAA e CNAME.

___

## Caso 2 - registros DNS que precisam ser marcados com nuvens cinza

Quando você tem um registro em nuvem cinza _A_, _AAAA_, _CNAME_, ou _MX_ apontando para o mesmo servidor de origem que hospeda o seu site, a Cloudflare exibe uma das seguintes advertências:

_`Um registro A, AAAA, CNAME ou MX está apontando para o seu servidor de origem e expondo o seu IP de origem.`_

_`Esse registro está expondo o endereço de IP do seu servidor de origem e, possivelmente, o expondo à negação de serviço.`_

Uma consulta  _dig_  desses registros revela o endereço de IP do seu servidor de origem. Essa informação torna mais fácil para os possíveis invasores atacarem diretamente o seu servidor de origem.

No entanto, existem ocasiões nas quais alguns de seus registros DNS precisam manter uma nuvem cinza. Por exemplo:

-   Quando você precisa hospedar vários serviços (por exemplo, um site e e-mails) no mesmo servidor físico

Para mitigar esse risco, recomendamos que você:

-   Analise o impacto da hospedagem de vários serviços no mesmo servidor de origem nos casos em que registros DNS com nuvens cinza não puderem ser evitados
-   Coloque nuvens laranja em todos os registros que compartilham com seu domínio raiz o mesmo endereço de IP de origem e podem fazer proxy com segurança por meio da Cloudflare
