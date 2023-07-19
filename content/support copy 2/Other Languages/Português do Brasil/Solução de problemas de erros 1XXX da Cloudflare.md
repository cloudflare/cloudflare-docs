---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare
title: Solução de problemas de erros 1XXX da Cloudflare
---

# Solução de problemas de erros 1XXX da Cloudflare

_Diagnosticar e resolver erros 1XXX para sites com proxy da Cloudflare._

### Neste artigo

-   [Visão geral](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#h_e6ba4204-ab4f-464b-afdc-e8177e418e34)
-   [Erro 1000: DNS aponta para IP proibido](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1000)
-   [Erro 1001: Erro de resolução do DNS](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1001)
-   [Erro 1002: DNS aponta para IP proibido](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1002a)
-   [Erro 1002: Restrito](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1003)
-   [Erro 1003 Acesso negado: Acesso direto ao IP não permitido](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1003)
-   [Erro 1004: host não configurado para servir o tráfego da Web](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1004)
-   [Erros 1006, 1007, 1008 ou 1106 Acesso Negado: Seu endereço de IP foi banido](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error100610071008)
-   [Erros 1009 Acesso negado: país ou região banidos](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#h_1FIuVf9XCVpeBz8Cn6B0Fj)
-   [Erro 1010: O proprietário deste site baniu seu acesso com base na assinatura do seu navegador](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1010)
-   [Erro 1011: Acesso negado (hotlinking negado)](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1011)
-   [Erro 1012: Acesso negado](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1012)
-   [Erro 1013: incompatibilidade de nome de host HTTP e TLS SNI](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1013)
-   [Erro 1014: usuário cruzado CNAME banido](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1014)
-   [Erro 1015: Você está sendo limitado pela taxa](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1015)
-   [Erro 1016: Erro no DNS de origem](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1016)
-   [Erro 1018: Não foi possível encontrar o host](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1018)
-   [Erro 1019: Erro no servidor de computação](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1019)
-   [Erro 1020: Acesso negado](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1020)
-   [Erro 1023: Não foi possível encontrar o host](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1023)
-   [Erro 1025: Verifique mais tarde](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1025)
-   [Erro 1033: Erro no Argo Tunnel](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#h_W81O7hTPalZtYqNYkIHgH)
-   [Erro 1034: IP de borda restrito](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#h_4eD6Gcxp4zQqS4ciCJaLt0)
-   [Erro 1035: regravação de solicitação inválida (caminho do URI inválido)](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1035)
-   [Erro 1036: regravação de solicitação inválida (comprimento máximo excedido)](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1036)
-   [Erro 1037: regra de regravação inválida (não foi possível avaliar a expressão)](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1037)
-   [Erro 1040: regravação de solicitação inválida (modificação do cabeçalho não permitida)](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1040)
-   [Erro 1041: regravação de solicitação inválida (valor de cabeçalho inválido)](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1041)
-   [Erro 1101: Erro de renderização](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1101)
-   [Erro 1102: Erro de renderização](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1102)
-   [Erro 1104: Já existe uma variação desse endereço de e-mail em nosso sistema. É preciso alterar, porque só uma variação é permitida.](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#error1104)
-   [Erro 1200: Limite de conexão de cache](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#h_302a97f3-eba3-4c0a-a589-76ba95f60dcf)
-   [Recursos relacionados](https://support.cloudflare.com/hc/pt-br/articles/360029779472-Solu%C3%A7%C3%A3o-de-problemas-de-erros-1XXX-da-Cloudflare#h_80755d09-43f2-4656-b1f9-2989196b30a6)

___

## Visão geral

Os erros descritos neste documento podem ocorrer ao visitar um site com proxy da Cloudflare. Para erros na API ou no painel da Cloudflare, consulte nossa [documentação da API da Cloudflare](https://api.cloudflare.com/). Os erros HTTP 409, 530, 403, 429 são os códigos de erro HTTP retornados no cabeçalho de status HTTP para uma resposta. Os erros 1XXX aparecem no corpo HTML da resposta.

Se as resoluções em cada descrição de erro abaixo não resolverem o erro, [entre em contato com o Suporte da Cloudflare](https://support.cloudflare.com/hc/articles/200172476).

___

## Erro 1000: DNS aponta para IP proibido

### Causas comuns

A Cloudflare interrompeu a solicitação por um dos seguintes motivos:

-   Um registro A dentro do aplicativo DNS da Cloudflare aponta para um [Endereço de IP da Cloudflare](https://www.cloudflare.com/ips/), ou uma Origem de Balanceador de Carga aponta para um registro com proxy.
-   Seu registro A ou CNAME do DNS da Cloudflare faz referência a outro proxy reverso (como um servidor Web nginx que usa a função proxy\_pass) que, em seguida, faz proxy da solicitação para a Cloudflare uma segunda vez.
-   O cabeçalho da solicitação X-Forwarded-For tem mais de 100 caracteres.
-   A solicitação inclui dois cabeçalhos X-Forwarded-For
-   Um problema de Indicação de Nome do Servidor (SNI) ou uma discrepância na origem.

### Solução

-   Se um registro A dentro do seu aplicativo DNS da Cloudflare apontar para [Endereço de IP da Cloudflare](https://www.cloudflare.com/ips/), atualize o endereço de IP para o endereço de IP do servidor Web de origem.
-   Há um proxy reverso na sua origem que envia a solicitação de volta pelo proxy Cloudflare. Em vez de usar um proxy reverso, entre em contato com seu provedor de hospedagem ou administrador do site para configurar um redirecionamento HTTP na sua origem.

___

## Erro 1001: Erro de resolução do DNS

### Causas comuns

-   Uma solicitação da Web foi enviada para um endereço de IP da Cloudflare para um domínio Cloudflare inexistente.
-   Um domínio externo que não está usando a Cloudflare tem um registro CNAME para um domínio ativo na Cloudflare
-   O destino do registro CNAME de DNS não resolve.
-   Um registro CNAME no seu aplicativo DNS da Cloudflare requer resolução por meio de um provedor de DNS que está atualmente offline.
-   [Always Online](/cache/how-to/always-online/) está habilitado para um domínio [Custom Hostname (SSL for SaaS](/ssl/ssl-for-saas)).

### Solução

Um domínio não Cloudflare não pode CNAME para um domínio Cloudflare, a menos que o domínio não Cloudflare seja adicionado a uma conta Cloudflare.

A tentativa de acessar diretamente os registros de DNS usados para [configurações da CNAME na Cloudflare](/dns/zone-setups/partial-setup) também resulta em um erro 1001 (por exemplo: _www.exemplo.com.cdn.cloudflare.net_).

Desabilite o [Always Online](/cache/how-to/always-online/#enable-always-online) se estiver usando [Custom Hostnames (SSL para SaaS)](/ssl/ssl-for-saas).

___

## Erro 1002: DNS aponta para IP proibido

### Causas comuns

-   Um registro de DNS no seu aplicativo DNS da Cloudflare aponta para um dos [endereços de IP da Cloudflare](https://www.cloudflare.com/ips/).
-   Um destino incorreto foi especificado para um registro CNAME no seu aplicativo DNS da Cloudflare.
-   Seu domínio não está na Cloudflare, mas possui um CNAME que se refere a um domínio da Cloudflare.

### Solução

Atualize seu registro _A_ ou _CNAME_ na Cloudflare para apontar para o seu endereço IP de origem, ao invés de um endereço IP da Cloudflare:

1.  Entre em contato com seu provedor de hospedagem para confirmar seu endereço de IP de origem ou destino de registro CNAME.
2.  Faça login na sua conta da Cloudflare.
3.  Selecione o domínio que gera o erro 1002.
4.  Selecione o aplicativo de **DNS**.
5.  Clique em **Valor** para atualizar o registro _A_.
6.  Atualize o registro _A_.

Para garantir que seu servidor Web de origem não faça proxy de suas próprias solicitações por meio da Cloudflare, configure o servidor Web de origem para resolver seu domínio Cloudflare para:

-   O endereço de IP interno da NAT ou
-   O endereço de IP público do servidor Web de origem.

___

## Erro 1002: Restrito

### Causa comum

O domínio Cloudflare resolve para um endereço de IP local ou não permitido ou um endereço de IP não associado ao domínio.

### Solução

Se você possui o site:

1.  Confirme os endereços de IP do servidor da Web de origem com seu provedor de hospedagem,
2.  Faça login na sua conta Cloudflare e
3.  Atualize os registros A no aplicativo DNS da Cloudflare para o endereço IP confirmado pelo seu provedor de hospedagem.

___

## Erro 1003 Acesso negado: Acesso direto ao IP não permitido

### Causa comum

Um cliente ou navegador acessa diretamente um [endereço de IP da Cloudflare](https://www.cloudflare.com/ips).

### Solução

Navegue até o nome de domínio do site no seu URL em vez do endereço de IP da Cloudflare.

___

## Erro 1004: host não configurado para servir o tráfego da Web

### Causas comuns

-   A equipe da Cloudflare desativou o proxy do domínio devido a abusos ou violações dos termos de serviço.
-   As alterações de DNS ainda não foram propagadas ou os _registros de DNS tipo A_ do proprietário do site apontam para [endereços IP da Cloudflare](https://www.cloudflare.com/ips).

### Solução

Se o problema persistir além de 5 minutos, [entre em contato com o Suporte da Cloudflare](https://support.cloudflare.com/hc/articles/200172476).

___

## Erros 1006, 1007, 1008 ou 1106 Acesso Negado: Seu endereço de IP foi banido

### Causas comuns

Um cliente da Cloudflare bloqueou o tráfego do seu cliente ou navegador.

### Solução

Solicite ao proprietário do site que investigue as configurações de segurança da Cloudflare ou autorize o endereço de IP do seu cliente. Como o proprietário do site bloqueou sua solicitação, o suporte da Cloudflare não pode substituir as configurações de segurança de um cliente.

___

## Erros 1009 Acesso negado: país ou região banidos

### Causas comuns

O proprietário do site (por exemplo, exemplo.com) proibiu o país ou região do seu endereço de IP de acessar o site.

### Solução

Verifique se o seu endereço de IP é permitido no recurso de segurança [Regras de acesso de IP](https://support.cloudflare.com/hc/pt-br/articles/217074967-Configuring-IP-Access-Rules).

___

## Erro 1010: O proprietário deste site baniu seu acesso com base na assinatura do seu navegador

### Causa comum

O proprietário de um site bloqueou sua solicitação com base no navegador da Web do seu cliente.

### Solução

Notifique o proprietário do site sobre o bloqueio. Se você não puder determinar como entrar em contato com o proprietário do site, busque os dados de contato do domínio no [banco de dados Whois](https://whois.icann.org/en/lookup). Os proprietários do site desabilitaram a **Browser** **Integrity Check** na guia **Configurações** do aplicativo de **Firewall**.

___

## Erro 1011: Acesso negado (hotlinking negado)

### Causa comum

É feita uma solicitação para um recurso que usa a [Proteção de Hotlink da Cloudflare](https://support.cloudflare.com/hc/articles/200170026).

### Solução

Notifique o proprietário do site sobre o bloqueio. Se você não puder determinar como entrar em contato com o proprietário do site, busque os dados de contato do domínio no [banco de dados Whois](https://whois.icann.org/en/lookup).  A **Proteção de Hotlink** é gerenciada por meio do aplicativo **Scrape Shield** da Cloudflare.

___

## Erro 1012: Acesso negado

### Causa comum

O proprietário de um site proíbe o acesso com base em atividades maliciosas detectadas no computador ou na rede do visitante (ip\_address). A causa mais provável é uma infecção por vírus ou malware no computador do visitante.

### Solução

Atualize seu software antivírus e execute uma verificação completa do sistema. A Cloudflare não pode substituir as configurações de segurança que o proprietário do site definiu para o domínio. Para solicitar acesso ao site, entre em contato com o proprietário do site para que ele autorize seu endereço de IP. Se você não puder determinar como entrar em contato com o proprietário do site, busque as informações de contato do domínio no [banco de dados WHOIS](https://whois.icann.org/en/lookup).

___

## Erro 1013: incompatibilidade de nome de host HTTP e TLS SNI

### Causa comum

O hostname enviado pelo cliente ou pelo navegador por meio da [Indicação de Nome do Servidor](/fundamentals/glossary#server-name-indication-sni) (SNI) não corresponde ao cabeçalho do host da solicitação.

### Solução

O erro 1013 é geralmente causado pelo seguinte:

-   seu navegador local configurando o cabeçalho do host SNI incorreto ou
-   um tráfego SSL de proxy de rede causou uma incompatibilidade entre o SNI e o cabeçalho Host da solicitação.

Teste a incompatibilidade de SNI por meio de uma ferramenta on-line, como: [SSL Shopper](https://www.sslshopper.com/ssl-checker.html).

Forneça ao Suporte da Cloudflare as seguintes informações:

1.  Um [arquivo HAR](https://support.cloudflare.com/hc/articles/203118044) capturado durante a duplicação do erro.

___

## Erro 1014: usuário cruzado CNAME banido

### Causa comum

Por padrão, a Cloudflare proíbe _registros de DNS tipo CNAME_ entre domínios de contas diferentes na Cloudflare. Os _registros CNAME_ são permitidos em um mesmo domínio (_www.exemplo.com_ CNAME para _api.exemplo.com_) e abrangendo diversas zonas com a mesma conta de usuário (_www.exemplo.com_ CNAME para _www.example.net_) ou usando nossa solução [Cloudflare para SaaS](https://www.cloudflare.com/saas/).

### Solução

Para permitir a resolução do registro CNAME de um domínio em uma conta diferente da Cloudflare, o proprietário do domínio do destino CNAME precisa usar o [Cloudflare para SaaS](https://www.cloudflare.com/saas/); mais especificamente, nossa solução [SSL para SaaS](/ssl/ssl-for-saas/).

___

## Erro 1015: Você está sendo limitado pela taxa

### Causa comum

O proprietário do site implementou [Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128) que afeta o tráfego de visitantes.

### Solução

-   Se você é um visitante do site, entre em contato com o proprietário do site para solicitar a exclusão do seu IP da limitação de taxa.
-   Se você é o proprietário do site, releia [limiares de Rate Limiting da Cloudflare](https://support.cloudflare.com/hc/articles/115001635128) e ajuste a configuração de Rate Limiting.
-   Se o seu Rate Limiting bloqueia solicitações em um curto período de tempo (por exemplo, 1 segundo), tente aumentar o período para 10 segundos.

___

## Erro 1016: Erro no DNS de origem

### Causa comum

A Cloudflare não pode resolver o endereço IP do servidor Web de origem.OA

As causas comuns do Erro 1016 são:

-   Ausência de um _registro de DNS tipo A_ que mencione o endereço IP de origem.
-   Um _registro CNAME_ no DNS da Cloudflare aponta para um domínio externo não resolvível.
-   Os hostnames de origem (CNAMEs)nos pools padrão, de região e de fallback do [Balanceador de Carga](/load-balancing/) da Cloudflare não podem se resolvidos. Use um grupo de fallback configurado com um IP de origem como backup, caso todos os outros grupos estejam indisponíveis.
-   Ao criar um aplicativo Spectrum com uma origem CNAME, você precisa primeiro criar um CNAME no lado do DNS da Cloudflare que aponte para a origem. Consulte [Origens CNAME no Spectrum](/spectrum/how-to/cname-origins) para saber mais

### Solução

Para resolver o erro 1016:

1.  Verifique se as configurações de DNS da Cloudflare incluem um _registro A_ que aponta para um endereço IP válido, resolvido por meio de uma [ferramenta de pesquisa de DNS](https://dnschecker.org/).
2.  Para um registro CNAME que aponta para um domínio diferente, verifique se o domínio de destino é resolvido por meio de uma [ferramenta de pesquisa DNS](https://dnschecker.org/).

___

## Erro 1018: Não foi possível encontrar o host

### Causas comuns

-   O domínio da Cloudflare foi ativado recentemente e há um atraso na propagação das configurações do domínio para a rede de borda da Cloudflare
-   O domínio da Cloudflare foi criado por meio de um parceiro da Cloudflare (por exemplo, um provedor de hosting) e o DNS do provedor falhou.

### Solução

Entre em contato com o [Suporte da Cloudflare](https://support.cloudflare.com/hc/articles/200172476) com os seguintes detalhes:

1.  Seu nome de domínio
2.  Uma captura de tela do erro 1018, incluindo o **RayID** mencionado na mensagem de erro
3.  A hora e o fuso horário em que ocorreu o erro 1018

___

## Erro 1019: Erro no servidor de computação

### Causa comum

Um script Cloudflare Worker faz referência a si mesmo recursivamente.

### Solução

Verifique se o Cloudflare Worker não acessa uma URL que chama o mesmo script Workers.

___

## Erro 1020: Acesso negado

### Causa comum

Um cliente ou navegador é bloqueado pelas regras de firewall de um cliente da Cloudflare.

### Solução

Se você não é o proprietário do site, forneça ao proprietário do site uma captura de tela da mensagem de erro 1020 que você recebeu.

Se você é o proprietário do site:

1.  Recupere uma captura de tela do erro 1020 do seu cliente
2.  Pesquise o [**Registro de Eventos de Firewall**](/waf/analytics) na guia**Visão Geral** do aplicativo de **Firewall** da Cloudflare para obter a **RayID** ou o endereço IP do cliente na mensagem de erro 1020 do visitante.

3\. Avalie a causa do bloqueio e atualize a **Regra de Firewall** ou permita o endereço IP do visitante nas [**Regras do Acesso de IPs**](https://support.cloudflare.com/hc/articles/217074967).

___

## Erro 1023: Não foi possível encontrar o host

### Causas comuns

-   Se o proprietário acabou de se cadastrar na Cloudflare, as informações do site podem levar alguns minutos para serem distribuídas para a nossa rede global. Algo está errado com a configuração do site.
-   Geralmente, isso acontece quando as contas foram inscritas em uma organização parceira (por exemplo, provedor de hosting) e o DNS do provedor falhou.

### Solução

Entre em contato com o [Suporte da Cloudflare](https://support.cloudflare.com/hc/articles/200172476) com os seguintes detalhes:

1.  Seu nome de domínio
2.  Uma captura de tela do erro 1023, incluindo a **RayID** mencionada na mensagem de erro
3.  A hora e o fuso horário em que ocorreu o erro 1023

___

## Erro 1025: Verifique mais tarde

### Causa comum

Uma solicitação não é atendida porque o domínio atingiu [limites de plano para o Cloudflare Workers](/workers/platform/limits).

### Solução

Adquira o plano Unlimited Workers na [página Planos](https://dash.cloudflare.com/redirect?account=workers/plans) no painel do Workers.

___

## Erro 1033: Erro no Argo Tunnel

### Causa comum

Você solicitou uma página em um site (`tunel.exemplo.com`) que está na rede da Cloudflare. O host (`tunel.exemplo.com`) está configurado como um Argo Tunnel e, no momento, a Cloudflare não consegue resolvê-lo.

### Solução

-   **Se você for um visitante desse site**: tente novamente daqui a alguns minutos.
-   **Se você for o proprietário desse site**: certifique-se de que o _cloudflared_ está sendo executado e pode alcançar a rede. Você pode querer ativar o [balanceamento de carga](/cloudflare-one/connections/connect-networks/routing-to-tunnel/lb) para o seu túnel.

___

## Erro 1034: IP de borda restrito

### Causa comum

Os clientes que anteriormente apontaram seus domínios para `1.1.1.1` encontrarão o **erro 1034**. Isso ocorre por causa de uma nova verificação de validação da borda nos sistemas da Cloudflare para evitar erros de configuração e/ou possível abuso.

### Solução

Confira se os registros de DNS estão apontados para endereços de IP que você controla. Caso um endereço de IP reserva seja necessário para configurações "sem origem", use o endereço reservado IPv6 `100::` ou o endereço reservado IPv4 `192.0.2.0`.

___

## Erro 1035: regravação de solicitação inválida (caminho do URI inválido)

### Causa comum

O valor ou expressão do seu caminho de URI regravado não é válido.

Esse erro também ocorre quando o destino da regravação do URL é um caminho em `/cdn-cgi/`.

### Solução

Certifique-se de que o caminho de URI regravado não está vazio e começa com um caractere `/` (barra).

Por exemplo, a seguinte expressão de regravação do caminho de URI não é válida:

`concat(lower(ip.geoip.country), http.request.uri.path)`

Para consertar a expressão acima, adicione um prefixo `/`:

`concat("/", lower(ip.geoip.country), http.request.uri.path)`

___

## Erro 1036: regravação de solicitação inválida (comprimento máximo excedido)

### Causa comum

O valor ou expressão do seu caminho de URI regravado ou string de consulta está muito longo.

### Solução

Use uma expressão ou valor mais curtos para o valor do seu caminho de URI regravado/string de consulta.

___

## Erro 1037: regra de regravação inválida (não foi possível avaliar a expressão)

### Causa comum

Não foi possível avaliar a expressão da regra de regravação. Existem várias causas possíveis para esse erro, mas um dos possíveis significados é que um elemento da expressão continha um valor indefinido ao ser avaliado.

Por exemplo, você obteve um erro 1037 ao usar a expressão dinâmica de regravação de URL abaixo e o cabeçalho `X-Source` não está incluído na solicitação:

`http.request.headers["x-source"][0]`

### Solução

Certifique-se de que todos os elementos da sua expressão de regravação estejam definidos. Por exemplo, se você estiver se referindo a um valor do cabeçalho, certifique-se de que o cabeçalho esteja definido.

___

## Erro 1040: regravação de solicitação inválida (modificação do cabeçalho não permitida)

### Causa comum

Você está tentando modificar um cabeçalho HTTP que as Regras de Modificação de Cabeçalho de Solicitação HTTP não podem alterar.

### Solução

Certifique-se de não estar tentando modificar um dos [cabeçalhos de solicitação HTTP reservados](/rules/transform#http-request-header-modification-rules).

___

## Erro 1041: regravação de solicitação inválida (valor de cabeçalho inválido)

### Causas comuns

O valor de cabeçalho adicionado/modificado é muito longo ou contém caracteres que não são permitidos.

### Solução

-   Use uma expressão ou valor mais curtos para definir o valor do cabeçalho.
-   Remova os caracteres que não são permitidos. Consulte a seção [Formato dos nomes e valores de cabeçalho de solicitação HTTP](/rules/transform/create-header-modification-rule#format-of-http-request-header-names-and-values) nos Documentos do Desenvolvedor para obter mais informações sobre os caracteres permitidos.

___

## Erro 1101: Erro de renderização

### Causa comum

Um Cloudflare Worker lança uma exceção de JavaScript em tempo de execução.

### Solução

[Forneça os detalhes adequados do problema](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16) ao Suporte da Cloudflare.

___

## Erro 1102: Erro de renderização

### Causa comum

Um Cloudflare Worker excede um [limite de tempo de CPU](/workers/observability/log-from-workers/#identifying-and-handling-errors-and-exceptions). Tempo de CPU é o tempo gasto na execução de código (por exemplo, loops, análise de JSON etc). O tempo gasto em solicitações de rede (busca, resposta) não conta para o tempo de CPU.

### Solução

Entre em contato com o desenvolvedor do código do Workers para otimizar o código para reduzir o uso da CPU nos scripts ativos do Workers.

___

## Erro 1104: Já existe uma variação desse endereço de e-mail em nosso sistema. É preciso alterar, porque só uma variação é permitida.

### Causa comum

Esse erro ocorre quando já há uma variação do e-mail que você quer adicionar. Por exemplo, _meu+usuario@exemplo.com_ e _meu.usuario@exemplo.com_ são entendidos como iguais pelo sistema.

### Solução

Para solucionar o problema, faça login com o usuário antigo e defina o e-mail como uma conta "secundária". Dessa forma, o novo endereço ficará liberado.

___

## Erro 1200: Limite de conexão de cache

### Causa comum

Há muitas solicitações enfileiradas na borda da Cloudflare que estão aguardando processamento pelo seu servidor Web de origem.  Esse limite protege os sistemas da Cloudflare.

### Solução

Ajuste seu servidor Web de origem para aceitar conexões de entrada mais rapidamente.  Ajuste suas configurações de cache para melhorar as taxas de acerto do cache, para que menos solicitações cheguem ao servidor Web de origem.  Entre em contato com seu provedor de hosting ou administrador Web para obter assistência.

___

## Recursos relacionados

-   [Entrando em contato com o suporte da Cloudflare](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16)
-   [Personalizando páginas de erro da Cloudflare](https://support.cloudflare.com/hc/articles/200172706)
