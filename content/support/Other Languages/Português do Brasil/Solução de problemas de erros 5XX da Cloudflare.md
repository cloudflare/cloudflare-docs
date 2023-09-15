---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/115003011431-Solu%C3%A7%C3%A3o-de-problemas-de-erros-5XX-da-Cloudflare
title: Solução de problemas de erros 5XX da Cloudflare
---

# Solução de problemas de erros 5XX da Cloudflare

_Diagnostique e solucione erros 5XX para sites com proxy da Cloudflare._

### Neste artigo

-   [Visão geral](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Solu%C3%A7%C3%A3o-de-problemas-de-erros-5XX-da-Cloudflare#h_42ad57a0-3926-4162-b55e-c3a31864ea09)
-   [Análise de Erros](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Solu%C3%A7%C3%A3o-de-problemas-de-erros-5XX-da-Cloudflare#500error)
-   [Error 500: internal server error](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Solu%C3%A7%C3%A3o-de-problemas-de-erros-5XX-da-Cloudflare#500error)
-   [502: bad gateway ou 504: gateway timeout](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Solu%C3%A7%C3%A3o-de-problemas-de-erros-5XX-da-Cloudflare#502504error)
-   [503: service temporarily unavailable](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Solu%C3%A7%C3%A3o-de-problemas-de-erros-5XX-da-Cloudflare#503error)
-   [Erro 520: web server returns an unknown error](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Solu%C3%A7%C3%A3o-de-problemas-de-erros-5XX-da-Cloudflare#520error)
-   [Erro 521: web server is down](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Solu%C3%A7%C3%A3o-de-problemas-de-erros-5XX-da-Cloudflare#521error)
-   [Erro 522: connection timed out](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Solu%C3%A7%C3%A3o-de-problemas-de-erros-5XX-da-Cloudflare#522error)
-   [Erro 523: origin is unreachable](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Solu%C3%A7%C3%A3o-de-problemas-de-erros-5XX-da-Cloudflare#523error)
-   [Erro 524: a timeout occurred](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Solu%C3%A7%C3%A3o-de-problemas-de-erros-5XX-da-Cloudflare#524error)
-   [Erro 525: SSL handshake failed](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Solu%C3%A7%C3%A3o-de-problemas-de-erros-5XX-da-Cloudflare#525error)
-   [Erro 526: invalid SSL certificate](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Solu%C3%A7%C3%A3o-de-problemas-de-erros-5XX-da-Cloudflare#526error)
-   [Erro 527: Railgun Listener to origin (Railgun Listener para a origem)](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Solu%C3%A7%C3%A3o-de-problemas-de-erros-5XX-da-Cloudflare#527error)
-   [Erro 530](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Solu%C3%A7%C3%A3o-de-problemas-de-erros-5XX-da-Cloudflare#530error)
-   [Recursos relacionados](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Solu%C3%A7%C3%A3o-de-problemas-de-erros-5XX-da-Cloudflare#h_3ef3e669-ebcb-41e6-b688-e9ade0944392)

___

## Visão geral

Para solucionar a maioria dos erros 5XX, o curso de ação correto é primeiro entrar em contato com o provedor de hospedagem ou o administrador do site para solucionar os problemas e coletar dados.

### Detalhes do erro que precisam ser fornecidos ao seu provedor de hospedagem

1.  Código e mensagem específicos do erro 5XX
2.  Hora e fuso horário em que o erro 5XX ocorreu
3.  URL que resulta no erro 5XX de HTTP (por exemplo: _https://www.exemplo.com/imagens/icones/imagens1.png_)

Os detalhes adicionais a serem fornecidos ao seu provedor de hospedagem ou administrador do site estão listados em cada descrição de erro abaixo. As [Páginas de Erro Personalizadas](https://support.cloudflare.com/hc/articles/200172706) da Cloudflare alteram a aparência das páginas de erro padrão apresentadas neste artigo.

___

## Análise de Erros

As Análises de Erros por domínio estão disponíveis dentro do portal de suporte da sua conta.  As Análises de Erros permitem uma percepção dos erros de modo geral por código de erro HTTP e fornecem os URLs, respostas, endereço de IP do servidor de origem e os data centers da Cloudflare necessários para diagnosticar e solucionar o problema.  As Análises de Erros se baseiam em uma amostra de tráfego de 1%.

Para ver a Análise de Erros:

-   Navegue para o portal de suporte da Cloudflare.  Consulte as [instruções sobre como criar um tíquete de suporte](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730) para obter informações sobre como chegar ao portal de suporte.
-   Role para baixo até a seção **Análises de Erros**.
-   Clique em **Acessar Análises de Erro**s.
-   Digite o domínio a ser investigado.
-   Um gráfico de **Erros ao longo do tempo** será exibido.
-   Clique em um código de status na tabela embaixo do gráfico para expandir os detalhes do erro de tráfego.

___

## Error 500: internal server error

O erro 500 de modo geral indica um problema com seu servidor de origem.  O _Erro ao estabelecer uma conexão_ _com o banco de dados_ é uma mensagem de erro 500 de HTTP comum gerada pelo servidor de origem.  [Entre em contato com seu provedor de hospedagem](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) para solucioná-lo.

**Solução**

[Forneça os detalhes ao seu provedor de hospedagem](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) para que ele possa ajudar na solução do problema.

No entanto, se o erro 500 contiver "cloudflare" ou "cloudflare-nginx" no corpo da resposta em HTML, forneça as seguintes informações ao [suporte da Cloudflare](https://support.cloudflare.com/hc/articles/200172476):

1.  Seu nome de domínio
2.  Hora e fuso horário de ocorrência do erro 500
3.  A saída de _www.exemplo.com/cdn-cgi/trace_no navegador no qual o erro 500 foi observado (substitua _www.exemplo.com_ pelo seu domínio e nome de host reais)

___

## 502: bad gateway ou 504: gateway timeout

Um erro 502 ou 504 de HTTP ocorre quando a Cloudflare não consegue estabelecer contato com o servidor de origem.

Existem duas causas possíveis:

-   (Causa mais comum) [502/504 do seu servidor de origem](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_85e06a1a-fa89-4685-aa24-2aaf57c0141b)
-   [502/504 da Cloudflare](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_845d633d-0842-4315-9dd2-53185cc4e1de)

### 502/504 do seu servidor de origem

A Cloudflare retorna um erro 502 ou 504 de HTTP com a marca da Cloudflare quando o servidor de origem responde com um erro 502 padrão de gateway incorreto de HTTP ou erro 504 de tempo limite excedido do gateway:

![Exemplo de um erro 502 com a marca Cloudflare.](/images/support/image1.png)

**Solução**

Entre em contato com o seu provedor de hospedagem para solucionar essas causas comuns no servidor de origem:

-   Certifique-se de que o servidor de origem responda às solicitações para o hostname e domínio dentro do URL do visitante que gerou o erro 502 ou 504.
-   Investigue o excesso de cargas e falhas do servidor ou falhas da rede.
-   Identifique aplicações ou serviços que excederam o tempo limite ou foram bloqueados.

### 502/504 da Cloudflare

Um erro 502 ou 504 originário da Cloudflare aparece da seguinte maneira:

![Exemplo de um erro 502 sem marca.](/images/support/image5.png)

Se o erro não mencionar "cloudflare", entre em contato com o seu provedor de hospedagem para obter ajuda sobre [erros 502/504 do seu servidor de origem](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_85e06a1a-fa89-4685-aa24-2aaf57c0141b).

**Solução**

Para evitar atrasos no processamento de sua consulta, não deixe de fornecer ao [Suporte da Cloudflare](https://support.cloudflare.com/hc/articles/200172476) os detalhes necessários:

1.  Hora e fuso horário em que o problema ocorreu.
2.  O URL que resultou na resposta de erro 502 ou 504 de HTTP (por exemplo: _https://www.exemplo.com/imagens/icons/imagem1.png_)
3.  Saída da navegação para _www.exemplo.com/cdn-cgi/trace_ (substitua _www.exemplo.com_ pelo domínio e nome de host que causou o erro 502 ou 504 de HTTP)

___

## 503: service temporarily unavailable

O erro 503 de HTTP ocorre quando o servidor de origem está sobrecarregado. Há duas causas discerníveis possíveis por mensagem de erro:

-   O erro não contém "cloudflare" ou "cloudflare-nginx" no corpo da resposta HTML.

**Resolução**: entre em contato com seu provedor de hospedagem para verificar se aplicam o limite de taxa às solicitações para o servidor de origem.

-   O erro contém "cloudflare" ou "cloudflare-nginx" no corpo da resposta HTML.

**Resolução**: ocorreu um problema de conectividade em um data center da Cloudflare. Forneça ao [Suporte da Cloudflare](https://support.cloudflare.com/hc/articles/200172476) as seguintes informações:

1.  Seu nome de domínio
2.  Hora e fuso horário de ocorrência do erro 503
3.  A saída de _www.exemplo.com/cdn-cgi/trace_ no navegador no qual o erro 500 foi observado (substitua _www.exemplo.com_ pelo seu domínio e nome de host reais)

___

## Erro 520: web server returns an unknown error

O erro 520 ocorre quando o servidor de origem retorna uma resposta vazia, desconhecida ou inesperada à Cloudflare.

**Solução**

[Entre em contato com o seu provedor de hospedagem ou administrador do site](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) e solicite uma análise dos logs de erro do seu servidor de origem para verificar se há falhas e verifique as seguintes causas mais comuns:

-   A aplicação do servidor de origem travou
-   Os [IPs da Cloudflare](https://www.cloudflare.com/ips) não estão na lista de permissões do seu servidor de origem.
-   Cabeçalhos com mais de 16 KB (geralmente devido a um excesso de cookies)
-   Uma resposta vazia do servidor de origem que não tem um código de status de HTTP ou corpo da resposta
-   Ausência de cabeçalhos de resposta ou o servidor de origem não retornou [respostas de erro de HTTP apropriadas](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml).
    -   `conexão upstream fechada prematuramente durante a leitura do cabeçalho da resposta da entidade upstream` é um erro comum que você poderá perceber nos seus logs. Isso indica que o servidor de origem estava tendo problemas que fizeram com que a Cloudflare gerasse erros 520.

Se os erros 520 continuarem após você entrar em contato com seu provedor de hospedagem ou administrador do site, forneça ao [Suporte da Cloudflare](https://support.cloudflare.com/hc/articles/200172476) as seguintes informações:

-   O(s) URL(s) completo(s) do recurso solicitado quando o erro ocorreu
-   O **cf-ray** da Cloudflare na mensagem de erro 520
-   A saída de _http://www.exemplo.com/cdn-cgi/trace_ (substitua _www.exemplo.com_ por seu nome de host e o domínio no qual o erro 520 ocorreu)
-   Dois [arquivos HAR](https://support.cloudflare.com/hc/articles/203118044):
    -   um com a Cloudflare ativada no seu site; e
    -   o outro com a [Cloudflare temporariamente desativada](https://support.cloudflare.com/hc/articles/200169176).

___

## Erro 521: web server is down

O erro 521 ocorre quando o servidor de origem recusa as conexões da Cloudflare. As soluções de segurança no seu servidor de origem podem bloquear conexões legítimas de determinados [endereços de IP da Cloudflare](https://www.cloudflare.com/ips).

As duas causas mais comuns de erros 521 são:

-   A aplicação do servidor de origem está off-line
-   As solicitações da Cloudflare foram bloqueadas

**Solução**

[Entre em contato com o administrador do site ou o provedor de hospedagem](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) para eliminar essas causas mais comuns:

-   Certifique-se de que seu servidor de origem está responsivo
-   Analise os logs de erro do servidor de origem para identificar falhas ou indisponibilidades da aplicação do servidor da internet.
-   Confirme se os [endereços de IP da Cloudflare](https://www.cloudflare.com/ips) não estão bloqueados ou com limite de taxa
-   Inclua todas as [faixas de IP da Cloudflare](https://www.cloudflare.com/ips) na lista de permissões do firewall ou outro software de segurança do seu servidor de origem
-   Se tiver seu **modo SSL/TLS** configurado como **Full** \[Completo\] ou **Full (Strict)** \[Completo (Rigoroso)\], confirme que você instalou o [Certificado de Origem da Cloudflare](/ssl/origin-configuration/origin-ca).
-   Encontre informações adicionais de solução de problemas na [Comunidade da Cloudflare](https://community.cloudflare.com/t/community-tip-fixing-error-521-web-server-is-down/42461).

___

## Erro 522: connection timed out

O erro 522 ocorre quando o tempo limite para a Cloudflare entrar em contato com o servidor de origem é excedido. Dois tempos limite diferentes causam o erro 522 de HTTP, dependendo de quando eles ocorrem entre a Cloudflare e o servidor de origem:

1.  Antes de uma conexão ser estabelecida, o servidor de origem não retorna um SYN+ACK à Cloudflare no prazo de 15 segundos após o envio do SYN pela Cloudflare.
2.  Após uma conexão ter sido estabelecida, o servidor de origem não reconhece (ACK) a solicitação de recurso da Cloudflare no prazo de 90 segundos.

**Solução**

[Entre em contato com o seu provedor de hospedagem](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) para verificar as seguintes causas comuns no seu servidor de origem:

-   (Causa mais comum) [os endereços de IP da Cloudflare](https://www.cloudflare.com/ips/) estão com limite de taxa ou bloqueados no .htaccess, iptables ou firewalls. Confirme se o seu provedor de hospedagem incluiu os endereços de IP da Cloudflare na lista de permissões.
-   Um servidor de origem sobrecarregado ou off-line descarta as solicitações recebidas.
-   Os [Keepalives](http://tldp.org/HOWTO/TCP-Keepalive-HOWTO/overview.html) estão desabilitados no servidor de origem.
-   O endereço de IP do servidor de origem no seu aplicativo de **DNS** da Cloudflare não corresponde ao endereço de IP atualmente provisionado para o seu servidor de origem por seu provedor de hospedagem.
-   Os pacotes foram descartados no seu servidor de origem.

Se estiver usando o [Cloudflare Pages](/pages/), verifique se você está com uma configuração de domínio personalizada e se o seu registro CNAME está apontado para o seu domínio nas Páginas Personalizadas. Instruções sobre como configurar um domínio nas Páginas Personalizadas podem ser encontradas [aqui](/pages/getting-started#adding-a-custom-domain).

Se nenhuma das causas acima levar a uma resolução, solicite as seguintes informações do seu provedor de hospedagem ou administrador do site antes de [entrar em contato com o suporte da Cloudflare](https://support.cloudflare.com/hc/articles/200172476):

-   Um [MTR ou traceroute](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87) do servidor de origem para um [endereço de IP da Cloudflare](http://www.cloudflare.com/ips) que na maior parte das vezes se conectava ao servidor de origem antes que o problema ocorresse. Identifique um IP de conexão da Cloudflare registrado nos logs do servidor de origem.
-   Detalhes da investigação do provedor de hospedagem, como logs ou conversas pertinentes com o provedor de hospedagem.

___

## Erro 523: origin is unreachable

O erro 523 ocorre quando a Cloudflare não consegue entrar em contato com o servidor de origem. Isso costuma acontecer quando um dispositivo de rede entre a Cloudflare e o servidor de origem não tem uma rota para o endereço IP do servidor de origem.

**Resolução** [Entre em contato com o seu provedor de hospedagem](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) para excluir as seguintes causas comuns no seu servidor de origem:

-   Confirme se o endereço IP de origem correto está listado para os registros A ou AAAA no aplicativo DNS da Cloudflare.
-   Solucione problemas de roteamento da internet entre o seu servidor de origem e a Cloudflare ou o próprio servidor de origem.

Se nenhuma das causas acima levar a uma resolução, solicite as seguintes informações do seu provedor de hospedagem ou administrador:

-   Um [MTR ou traceroute](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87) do servidor de origem para um [endereço de IP da Cloudflare](http://www.cloudflare.com/ips) que na maior parte das vezes se conectava ao servidor de origem antes que o problema ocorresse. Identifique um IP de conexão da Cloudflare nos logs do servidor de origem.
-   Se você usa o Railgun por meio de um Parceiro de Hospedagem da Cloudflare, [entre em contato com o seu provedor de hospedagem](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) para solucionar os erros 523.
-   Se você administra sua instalação de Railgun, forneça o seguinte:
    -   Um [traceroute](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87) para o seu servidor de origem do seu servidor de Railgun.
    -   O arquivo syslog mais recente do seu servidor de Railgun.

___

## Erro 524: a timeout occurred

O erro 524 indica que a Cloudflare se conectou com sucesso ao servidor de origem, mas o servidor de origem não forneceu uma resposta HTTP antes que a conexão padrão de 100 segundos atingisse o tempo limite. Isso pode acontecer se o servidor estiver simplesmente demorando muito porque tem muito trabalho a fazer — por exemplo, uma consulta de dados muito grande ou porque o servidor está lutando por recursos e não consegue retornar nenhum dado em tempo hábil.

**Solução**

Abaixo as opções que sugerimos para uma solução temporária desse problema:

-   Implemente um levantamento de status de grandes processos em HTTP para evitar se defrontar com esse erro.
-   [Entre em contato com o seu provedor de hospedagem](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) para excluir as seguintes causas comuns no seu servidor de origem:
    -   Um processo de execução demorado no servidor de origem.
    -   Um servidor de origem sobrecarregado.

-   Os clientes do plano Enterprise podem aumentar o tempo limite de 524 para até 600 segundos usando o [ponto de extremidade de API proxy\_read\_timeout](https://api.cloudflare.com/#zone-settings-change-proxy-read-timeout-setting).
-   Se você executa regularmente solicitações de HTTP que demoram mais de 100 segundos para serem concluídas (por exemplo, grandes exportações de dados), transfira esses processos para um subdomínio sem proxy (com nuvem cinza) no aplicativo de **DNS** da Cloudflare.
-   Se o erro 524 ocorrer em um domínio que usa o Railgun da Cloudflare, certifique-se de que o _lan.timeout_ está configurado como superior ao padrão de 30 segundos e reinicie o serviço do railgun.

___

## Erro 525: SSL handshake failed

Os erros 525 indicam que o handshake de SSL entre a Cloudflare e o servidor de origem falhou. O erro 525 ocorre quando essas duas condições forem verdadeiras:

1.  Falha do [handshake de SSL](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/) entre a Cloudflare e o servidor de origem; e
2.  [Uma configuração de **SSL** _Full_ \[Completo\] ou _Full (Strict)_\[Completo (Rigoroso)\]](/ssl/origin-configuration/ssl-modes) na guia **Visão Geral**  do seu aplicativo de **SSL/TLS** na Cloudflare.

**Solução**

[Entre em contato com o seu provedor de hospedagem](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) para excluir as seguintes causas comuns no seu servidor de origem:

-   Não existe um certificado SSL válido instalado
-   A porta 443 (ou outra porta segura personalizada) não está aberta
-   Não há compatibilidade com [SNI](https://support.cloudflare.com/hc/articles/360026016272)
-   Os [conjuntos de cifras](/ssl/ssl-tls/cipher-suites) aceitos pela Cloudflare não correspondem aos conjuntos de cifras compatíveis com o servidor de origem

**Verificações adicionais**

-   Verifique se você tem um certificado instalado no seu servidor de origem. Você pode conferir [esse artigo](https://support.cloudflare.com/hc/pt-br/articles/203118044-Gathering-information-for-troubleshooting-sites#h_0c7f48b3-fc29-4266-8c63-477fe61a11c4) para obter mais detalhes sobre como executar alguns testes. Caso não tenha nenhum certificado, você pode criar e instalar nosso [certificado de CA de origem gratuito da Cloudflare](/ssl/origin-configuration/origin-ca). O uso de certificados de CA de origem permite que você criptografe o tráfego entre a Cloudflare e seu servidor de origem.
-   [Revise os conjuntos de cifras](/ssl/ssl-tls/cipher-suites) que seu servidor está usando para se certificar de que correspondam aos que são compatíveis com a Cloudflare.
-   Verifique os logs de erros do seu servidor a partir dos registros de data e hora nos quais você vê os erros 525 para se certificar de que existem erros que possam estar fazendo com que a conexão seja reiniciada durante o handshake de SSL.

___

## Erro 526: invalid SSL certificate

O erro 526 ocorre quando essas duas condições forem verdadeiras:

1.  A Cloudflare não consegue validar o certificado SSL no servidor de origem; e
2.  [Seu **SSL** está configurado como _Full (Strict)_ \[Completo (Rigoroso)\]](/ssl/origin-configuration/ssl-modes#full-strict) na guia **Visão Geral** do seu aplicativo de **SSL/TLS** da Cloudflare.

**Solução**

Solicite ao administrador do seu servidor ou ao seu provedor de hospedagem que analise os certificados SSL do servidor de origem e verifique se:

-   O certificado não está expirado
-   O certificado não foi revogado
-   O certificado foi assinado por uma [A](https://support.cloudflare.com/hc/articles/360026016272)[utoridade de Certificado](https://support.cloudflare.com/hc/articles/360026016272) (e não autoassinado)
-   O nome de domínio e nome de host solicitados ou de destino estão no **Nome Comum** ou no **Nome Alternativo do Sujeito** do certificado
-   O servidor de origem aceita conexões pela porta de SSL porta 443
-   [Pause a Cloudflare temporariamente](https://support.cloudflare.com/hc/articles/200169176) e visite o link  [https://www.sslshopper.com/ssl-checker.html#hostname=www.exemplo.com](https://www.sslshopper.com/ssl-checker.html#hostname=www.example.com) (substitua www.exemplo.com pelo seu nome de host e domínio) para verificar se não há problemas com o certificado SSL de origem:

![A tela mostra um certificado SSL sem nenhum erro.](/images/support/hc-import-troubleshooting_5xx_errors_sslshopper_output.png)

Se o servidor de origem usar um certificado autoassinado, configure o domínio para usar um _SSL_ _Full_ \[Completo\] ao invés de um SSL _Full SSL (Strict)_ \[Completo (Estrito)\]. Consulte as [configurações de SSL recomendadas para o seu servidor de origem](/ssl/origin-configuration/ssl-modes).

___

## Erro 527: Railgun Listener to origin (Railgun Listener para a origem)

Um erro 527 indica uma conexão interrompida entre a Cloudflare e o [servidor de Railgun (rg-listener)](https://support.cloudflare.com/hc/articles/200168406) do seu servidor de origem. As causas mais comuns incluem:

-   Interferência do firewall
-   Incidentes de rede ou perda de pacotes entre o servidor de Railgun e a Cloudflare

As causas mais comuns de erros 527 incluem:

-   [Tempos limite de conexão excedidos](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_c559b9e5-a342-47ed-bfae-66e10e42aade)
-   [Tempo limite da LAN excedido](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_f8e4890c-9459-4c9a-a4ab-e9b44fa16dbf)
-   [Recusas de conexão](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_2e3e4251-3642-4fce-bbcf-1a45bb2b2c11)
-   [Erros relacionados aos protocolos TLS/SSL](https://support.cloudflare.com/hc/pt-br/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_c30fe02c-98f2-4cbf-af8c-bafa9b4f5b8f)

Se entrar em contato com o suporte da Cloudflare, forneça as seguintes informações do Railgun Listener:

-   O conteúdo completo do arquivo _railgun.conf_ 
-   O conteúdo completo do arquivo _railgun.railgun_ 
-   Arquivos de log do Railgun detalhando os erros observados

### Tempos limite de conexão excedidos

Os seguintes erros de log do Railgun indicam uma falha na conexão entre o Railgun Listener e o seu servidor de origem:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">falha na conexão com 0.0.0.0:443/exemplo.com: dial tcp 0.0.0.0:443: tempo limite de E/S excedido</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sem resposta do servidor de origem (tempo limite excedido) 0.0.0.0:80/exemplo.com</span></div></span></span></span></code></pre>{{</raw>}}

**Solução**

Entre em contato com seu provedor de hospedagem para obter ajuda e testar problemas de conectividade entre o servidor de origem e o Railgun Listener. Por exemplo, um comando netcat testa a conectividade quando executado do Railgun Listener para o servidor de origem _SERVERIP_ e a _PORTA_ (80 para HTTP ou 443 para HTTPS):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">nc -vz PORTA do SERVERIP</span></div></span></span></span></code></pre>{{</raw>}}

### Tempo limite da LAN excedido

O seguinte erro de log do Railgun Listener será gerado se o servidor de origem não enviar uma resposta de HTTP ao Railgun Listener dentro do tempo limite padrão de 30 segundos:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  falha na conexão com 0.0.0.0:443/exemplo.com: dial tcp 0.0.0.0:443: tempo limite de E/S excedido</span></div></span></span></span></code></pre>{{</raw>}}

O tempo é ajustado pelo parâmetro lan.timeout do arquivo railgun.conf.

**Solução**

Aumente o limite de _lan.timeout_ no arquivo _railgun.conf_ ou reveja a configuração do servidor da internet. Entre em contato com o seu provedor de hospedagem para confirmar se o servidor de origem está sobrecarregado.

### Recusas de conexão

Os seguintes erros aparecem nos logs do Railgun quando as solicitações do Railgun Listener são recusadas:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Erro ao obter página: dial tcp 0.0.0.0:80:connection refused (conexão recusada)</span></div></span></span></span></code></pre>{{</raw>}}

**Solução**

Inclua o IP do seu Railgun Listener na lista de permissões do firewall do seu servidor de origem.

### Erros relacionados aos protocolos TLS/SSL

Os seguintes erros aparecem nos logs do Railgun quando as conexões de TLS falham:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">falha na conexão com 0.0.0.0:443/exemplo.com: erro remoto: falha do handshake</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">a conexão falhou no 0.0.0.0:443/example.com: dial tcp 0.0.0.0:443:connection refused</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"> a conexão falhou no 127.0.0.1:443/www.exemplo.com: x509: certificado válido para</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"> exemplo.com, mas não para www.exemplo.com</span></div></span></span></span></code></pre>{{</raw>}}

**Solução**

Se ocorrerem erros de TLS/SSL, verifique o seguinte no servidor de origem, e certifique-se de que:

-   A porta 443 está aberta
-   Um certificado SSL seja apresentado pelo servidor de origem
-   o SAN ou Nome Comum do certificado SSL do servidor de origem contêm o nome de host solicitado ou de destino
-   O **SSL** está configurado como [Full \[Completo\] ou Full (Script) \[Completo (Estrito)\]](/ssl/origin-configuration/ssl-modes) na guia **Visão Geral** do seu aplicativo de **SSL/TLS** na Cloudflare

___

## Erro 530

O erro 530 de HTTP é retornado acompanhado da exibição de um erro 1XXX. Procure o [erro 1XXX específico na Central de Ajuda da Cloudflare](https://support.cloudflare.com/hc/sections/200820298) para obter informações sobre solução de problemas.

___

## Recursos relacionados

-   [Reunindo informações para solucionar problemas do site](https://support.cloudflare.com/hc/pt-br/articles/203118044)
-   [Entrando em contato com o suporte da Cloudflare](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16)
-   [Personalizando páginas de erro da Cloudflare](https://support.cloudflare.com/hc/articles/200172706)
-   [Diagnóstico e uso do MTR/Traceroute](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87)
-   [Dicas da Comunidade da Cloudflare](https://community.cloudflare.com/tag/communitytip)
