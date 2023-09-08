---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/204144518-Perguntas-frequentes-sobre-SSL
title: Perguntas frequentes sobre SSL
---

# Perguntas frequentes sobre SSL

### Tenho vários certificados da Cloudflare. Qual será usado?

Os certificados da Cloudflare são priorizados por [tipo de certificado](https://support.cloudflare.com/hc/articles/203295200) e também pelo hostname mais específico.  Em geral, a priorização de certificado SSL ocorre da seguinte forma, da prioridade mais alta para a mais baixa:

-   [Custom SSL](https://support.cloudflare.com/hc/articles/200170466)
-   [SSL dedicado](https://support.cloudflare.com/hc/articles/228009108)
-   [Universal SSL](https://support.cloudflare.com/hc/articles/204151138)   

As exceções à priorização geral ocorrem com base na especificidade do hostname.  Certificados que mencionam um hostname específico são preferíveis a certificados curingas.  Por exemplo, um certificado Universal SSL que menciona explicitamente _www.exemplo.com_ tem prioridade sobre um certificado correspondente ao hostname _www_ por caractere curinga, como _\*.exemplo.com._  

___

### Ter o SSL da Cloudflare será útil para o SEO?

Sim, o Google anunciou que usa o [HTTPS como um sinal de SEO para o ranking](http://googleonlinesecurity.blogspot.co.uk/2014/08/https-as-ranking-signal_6.html).

Para mais obter mais ajustes de SEO, confira nosso artigo sobre [como aprimorar o SEO e seus rankings com a Cloudflare](https://support.cloudflare.com/hc/en-us/articles/231109348-How-do-I-Improve-SEO-Rankings-On-My-Website-Using-Cloudflare-).

___

### O SSL da Cloudflare oferece suporte a Nomes de Domínio Internacionalizados (IDN)?

A Cloudflare suporta nomes de domínios com byte duplo/IDN/punycode.  Os nomes de domínio com caracteres não latinos recebem certificados SSL como qualquer outro domínio adicionado à Cloudflare.

___

### Quanto tempo leva para o SSL da Cloudflare ser ativado?

Se a Cloudflare for o seu [provedor de DNS autoritativo](https://www.cloudflare.com/learning/dns/dns-server-types/#authoritative-nameserver), os certificados Universal SSL geralmente são emitidos 15 minutos após a ativação do domínio na Cloudflare e não é necessária nenhuma ação do cliente após a ativação do domínio.  Alternativamente, se você utiliza os [serviços da Cloudflare por meio de registros CNAME](https://support.cloudflare.com/hc/articles/360020615111) configurados no seu provedor de DNS autoritativo, o provisionamento do certificado Universal SSL exigirá a adição manual dos [registros de verificação de DNS](https://support.cloudflare.com/hc/articles/360020615111#h_989980109291544055191509) no seu provedor de DNS autoritativo.  Os certificados Dedicated SSL também costumam ser emitidos em 15 minutos.

Caso a Autoridade de Certificação requeira uma revisão manual dos requisitos de marca, phishing ou TLD, pode levar mais de 24 horas para um certificado Universal SSL ser emitido.

___

### O que significa uma verificação de marca de SSL inválida?

Alguns domínios não são qualificáveis para o Universal SSL caso contenham palavras que entrem em conflito com domínios de marca registrada.  

Para solucionar esse problema, você pode:

-   [carregar seu próprio certificado](https://support.cloudflare.com/hc/en-us/articles/200170466-How-do-I-upload-a-custom-SSL-certificate-Business-or-Enterprise-only-) se o domínio estiver em um Business plan ou [Enterprise plan](https://www.cloudflare.com/enterprise-service-request); ou
-   adquirir um [certificado dedicado](https://support.cloudflare.com/hc/en-us/articles/228009108-Dedicated-SSL-Certificates).

___

### Como faço para redirecionar todos os visitantes para HTTPS/SSL?

Para redirecionar o tráfego de todos os subdomínios e hosts do seu domínio, habilite a funcionalidade **Sempre usar HTTPS** no aplicativo **SSL/TLS** da Cloudflare.  Alternativamente, se você não quiser que seu site inteiro seja redirecionado para HTTPS, redirecione com base em cada URL usando o aplicativo **[Page Rules](https://support.cloudflare.com/hc/en-us/articles/218411427)** da Cloudflare.

Enquanto o seu site estiver sendo protegido por meio da Cloudflare, não é recomendável executar redirecionamentos no seu servidor web de origem.

-   Os redirecionamentos do Page Rule são processados na borda da Cloudflare, resultando em uma resposta mais rápida e reduzindo o número de solicitações para o seu servidor.
-   Os redirecionamentos do servidor web de origem podem causar [erros de loop de redirecionamento](https://support.cloudflare.com/hc/articles/115000219871).

Ao configurar as Page Rules no Page Rules, o método mais simples de redirecionar solicitações em HTTP para HTTPS é a opção _Sempre Usar HTTPS_.  Você também pode usar a ação _Encaminhamento de URL_ com um redirecionamento _301_ se, além de forçar o HTTPS, precisar redirecionar para outro subdomínio. Por exemplo, uma correspondência do Page Rules para


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://exemplo.com/*</span></div></span></span></span></code></pre>{{</raw>}}

com um _Encaminhamento de URL_ para


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.exemplo.com/$1</span></div></span></span></span></code></pre>{{</raw>}}

redirecionará as solicitações do domínio raiz _exemplo.com_ para o subdomínio _www.exemplo.com_ e, ao mesmo tempo, preservará o diretório da URL.

Forçar o HTTPS não soluciona problemas de [conteúdo misto](https://support.cloudflare.com/hc/en-us/articles/200170476-How-do-I-fix-the-SSL-Mixed-Content-Error-Message-), já que os navegadores verificam o protocolo dos recursos incluídos antes de fazer uma solicitação. Será necessário usar somente links relativos ou links com HTTPS nas páginas que você forçar para HTTPS. A Cloudflare pode resolver automaticamente alguns links de conteúdo misto usando a nossa funcionalidade [Automatic HTTPS Rewrites](https://support.cloudflare.com/hc/en-us/articles/227227647-How-do-I-use-Automatic-HTTPS-Rewrites-).

___

### O SSL funciona para parceiros de hospedagem?

Um certificado Universal SSL gratuito está disponível para todos os domínios novos adicionados à Cloudflare por um parceiro de hospedagem, seja por meio de integrações de DNS Completas, seja por meio de CNAME.

Para provisionar o certificado Universal SSL gratuito, faça proxy de um subdomínio por meio da Cloudflare.

___

### Os certificados de SSL da Cloudflare são compartilhados?

Os certificados Universal SSL são compartilhados entre vários domínios para vários clientes. Se você estiver preocupado com o compartilhamento de certificados, a Cloudflare recomenda um [certificado Dedicated SSL ou SSL personalizado](https://support.cloudflare.com/hc/articles/203295200).

___

### Tenho um certificado SSL instalado no meu site, por que estou vendo um certificado da Cloudflare?

A Cloudflare precisa descriptografar o tráfego para filtrar o tráfego mal-intencionado e armazená-lo em cache. Em seguida, a Cloudflare criptografa novamente o tráfego ou envia um tráfego de texto sem formatação para o servidor web de origem, dependendo da [opção de SSL](https://support.cloudflare.com/hc/articles/200170416) selecionada no aplicativo **SSL/TLS**.

___

### Quero que a Cloudflare use um certificado SSL que comprei em outro lugar

Os domínios dos planos Business e Enterprise têm permissão para carregar um [certificado Custom SSL](https://support.cloudflare.com/hc/articles/200170466).

___

### Como faço para forçar meu site a só usar HTTPS/SSL?

Para forçar todo o tráfego para HTTPS, ative a funcionalidade "Sempre usar HTTPS" dentro do aplicativo **SSL/TLS** da Cloudflare ou [faça-o por meio do aplicativo**Page Rules**](https://support.cloudflare.com/hc/articles/200170536).

___

### O Projeto Galileu inclui o suporte a SSL?

Os clientes do Projeto Galileu podem usar o [Universal SSL gratuito](https://www.cloudflare.com/ssl) da Cloudflare para proteger o tráfego do site.

___

### Habilitar a Cloudflare afeta a exigência de TLS 1.2 do PayPal?

Não. Já que a Cloudflare não faz proxy das conexões feitas diretamente com o site paypal.com, habilitar a Cloudflare para o seu domínio não afeta a forma como são feitas as conexões com TLS .

Para determinar se o seu servidor ou navegador suporta esses padrões, visite o site [https://tlstest.paypal.com](https://tlstest.paypal.com/) a partir de um cliente ou navegador que use o Paypal. Uma resposta **PayPal\_Connection\_OK** demonstra que o cliente já suporta padrões de TLS compatíveis com o Paypal.

___

### Como posso servir um certificado SSL nos data centers da Cloudflare na China?

Os certificados [Universal SSL](https://support.cloudflare.com/hc/articles/204151138) e [Dedicated SSL](https://support.cloudflare.com/hc/articles/228009108) da Cloudflare não são implantados na China.  Se o seu domínio estiver em um Enterprise plan e tiver obtido acesso a data centers na China, os data centers da Cloudflare na China servirão um certificado SSL para o seu domínio apenas nas seguintes condições:

1.  Você carregou um [certificado SSL personalizado](https://support.cloudflare.com/hc/articles/200170466).
2.  A opção **Permitir chaves privadas na China (Certificados Personalizados)** está configurada como _Ativa_ no aplicativo **SSL/TLS** da Cloudflare.

___

### A Cloudflare oferece suporte à autenticação de cliente TLS?

A Autenticação de Cliente TLS valida que um certificado apresentado por um cliente foi assinado pelo certificado raiz de Autoridade de Certificação da empresa.  Como esse certificado é validado em cada solicitação, o acesso pode ficar limitado às conexões de clientes autorizados.  Para habilitar a autenticação de cliente TLS por meio da Cloudflare, consulte a nossa documentação sobre [Autenticação Mútua de TLS](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/).

___

### Como faço para ativar o Universal SSL com o GitHub?  

Consulte a postagem sobre [como usar o Universal SSL da Cloudflare com as Páginas do GitHub](https://blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/) no blog da Cloudflare.
