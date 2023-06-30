---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/200170786-Restaurar-os-IPs-originais-dos-visitantes
title: Restaurar os IPs originais dos visitantes
---

# Restaurar os IPs originais dos visitantes

## Restaurar os IPs originais dos visitantes

_Saiba como configurar o mod\_cloudflare para registrar o endereço de IP original do seu visitante com base no seu tipo de servidor web de origem (incluindo Apache, NGINX, Microsoft IIS e outros)._

### Neste artigo

-   [Visão geral](https://support.cloudflare.com/hc/pt-br/articles/200170786-Restaurar-os-IPs-originais-dos-visitantes#cF7JFXws2pZ4bgu)
-   [mod\_remoteip](https://support.cloudflare.com/hc/pt-br/articles/200170786-Restaurar-os-IPs-originais-dos-visitantes#C5XWe97z77b3XZV)
-   [mod\_cloudflare](https://support.cloudflare.com/hc/pt-br/articles/200170786-Restaurar-os-IPs-originais-dos-visitantes#S7Z4EJQFN997YRY)
-   [Instruções do servidor web](https://support.cloudflare.com/hc/pt-br/articles/200170786-Restaurar-os-IPs-originais-dos-visitantes#JUxJSMn3Ht5c5yq)
-   [Restaurar o IP original do visitante com HAProxy](https://support.cloudflare.com/hc/pt-br/articles/200170786-Restaurar-os-IPs-originais-dos-visitantes#h_4vfodjrBunNww4MmSGAgmh)
-   [Recursos relacionados](https://support.cloudflare.com/hc/pt-br/articles/200170786-Restaurar-os-IPs-originais-dos-visitantes#h_qHFQv3Kt9lWvqXaP3womy)

___

## Visão geral

Quando o [tráfego do seu site é roteado pela rede da Cloudflare](https://support.cloudflare.com/hc/articles/205177068), atuamos como um proxy reverso. Dessa forma, a Cloudflare pode diminuir o tempo de carregamento da página, roteando pacotes com mais eficiência e armazenando em cache os recursos estáticos (imagens, JavaScript, CSS etc.). Como resultado, ao responder a solicitações e registrá-las, seu servidor de origem retorna um [endereço de IP da Cloudflare](https://www.cloudflare.com/ips/).

Por exemplo, se você instalar aplicativos que dependem do endereço de IP de entrada original do visitante, um endereço de IP da Cloudflare é registrado por padrão.O endereço de IP original do visitante aparece em um cabeçalho HTTP anexado chamado [_CF-Connecting-IP_](https://support.cloudflare.com/hc/articles/200170986). Seguindo nossas [instruções do servidor web](https://support.cloudflare.com/hc/articles/200170786#JUxJSMn3Ht5c5yq), você pode registrar o endereço de IP original do visitante em seu servidor de origem.Se este cabeçalho HTTP não estiver disponível quando as solicitações chegarem a seu servidor de origem, verifique sua configuração [Regras de transformação](/rules/transform/) e [Transformações gerenciadas](/rules/transform/managed-transforms/).

O diagrama a seguir descreve as diferentes maneiras de gerenciar endereços IP com e sem o Cloudflare.

![The diagram illustrates the different ways that IP addresses are handled with and without Cloudflare.](/images/support/Restoring_IPs__1_.png)

___

## mod\_remoteip

### Visão geral

A Cloudflare deixou de atualizar e de ser compatível com o _mod\_cloudflare._ No entanto, se você estiver usando um servidor Apache com um sistema operacional como **Ubuntu Server 18.04** e **Debian 9 Stretc**h, poderá usar o _mod\_remoteip_ para registrar o endereço de IP original do visitante.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Como este módulo foi criado por terceiros, não podemos fornecer suporte técnico para problemas relacionados ao plug-in.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Para instalar _mod\_remoteip_ no servidor web Apache:

1\. Ative _mod\_remoteip_ emitindo o seguinte comando:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo a2enmod remoteip</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

2\. Atualize a configuração do site para incluir  _RemoteIPHeader CF-Connecting-IP_, por exemplo `/etc/apache2/sites-available/000-default.conf`


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ServerAdmin webmaster@localhost</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">DocumentRoot /var/www/html</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ServerName remoteip.andy.support</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPHeader CF-Connecting-IP</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ErrorLog ${APACHE_LOG_DIR}/error.log</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CustomLog ${APACHE_LOG_DIR}/access.log combined</span></div></span></span></span></code></pre>{{</raw>}}

3\. Atualize a entrada _LogFormat_ combinada em `apache.conf`, substituindo _%h_ por _%a em_ `/etc/apache2/apache2.conf.` Por exemplo, se o _LogFormat_ que aparecer for


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">LogFormat &quot;%h %l %u %t &quot;%r&quot; %&gt;s %O &quot;%{Referer}i&quot; &quot;%{User-Agent}i&quot;&quot; combined</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

você deve atualizar o _LogFormat_ da seguinte maneira:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">LogFormat &quot;%a %l %u %t &quot;%r&quot; %&gt;s %O &quot;%{Referer}i&quot; &quot;%{User-Agent}i&quot;&quot; combined</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

4\. Defina endereços de proxy confiáveis criando `/etc/apache2/conf-available/remoteip.conf` digitando o seguinte código e os [IPs da Cloudflare](https://www.cloudflare.com/ips/):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPHeader CF-Connecting-IP</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPTrustedProxy 192.0.2.1 (example IP address)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPTrustedProxy 192.0.2.2 (example IP address)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">(repetir para todos os IPs da Cloudflare listados em [https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/))</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

5\. Ative a configuração do Apache:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo a2enconf remoteip</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Habilitar conf remoteip.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Para ativar a nova configuração, você precisa executar:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">service apache2 reload</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

6\. Configuração de teste do Apache:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo apache2ctl configtest</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Sintaxe OK</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

7\. Reinicie o Apache:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo systemctl restart apache2</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

___

## mod\_cloudflare

Há dois métodos para instalar o mod\_cloudflare: baixar a extensão Apache do GitHub ou adicionar código ao seu servidor web de origem.

### Baixar pacotes ou scripts do GitHub

Se você estiver usando um servidor web Apache, você pode baixar o mod\_cloudflare do [GitHub](https://github.com/cloudflare/mod_cloudflare).

### Adicionar código ao seu servidor Web de origem

Se você não conseguir instalar o mod\_cloudflare ou se um plug-in Cloudflare para a plataforma do sistema de gerenciamento de conteúdo não estiver disponível para restaurar o IP original do visitante, adicione esse código ao servidor Web de origem na tag <body> ou antes dela em qualquer página que exija os IPs originais do visitante:

`<?php if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CF_CONNECTING_IP'];?>`

Este comando fará com que o endereço de IP fique disponível apenas para os scripts que precisam dele, sem ser armazenado nos registros reais do servidor.

### Apache

Para remover o _mod\_cloudflare_, você precisa comentar na linha de configuração do Apache que carrega o _mod\_cloudflare_.

Isso varia dependendo da sua distribuição Linux, mas na maioria dos casos, se você procurar `em /etc/apache2`, poderá fazer uma busca e encontrar a linha:

`LoadModule cloudflare_module`

Comente ou remova essa linha e reinicie o Apache. O _mod\_cloudflare_ deve ter sumido.

Se estiver usando Ubuntu ou Debian, você verá:

`file/etc/apache2/mods-enabled/cloudflare.load`

exclua este arquivo para remover o _mod\_cloudflare_ e reinicie o Apache.

### NGINX

O mod\_cloudflare é instalado quando você modifica [o arquivo de configuração nginx](http://nginx.org/en/docs/http/ngx_http_realip_module.html) `nginx.conf` com o `ngx_http_realip_module`.

Para remover o _mod\_cloudflare_ , você tem que comentar ou remover essa linha; ao reiniciar o nginx, o _mod\_cloudflare_  deve ter sumido_._

___

## Instruções do servidor web

Veja abaixo as instruções sobre como configurar seu servidor web para registrar os IPs originais dos visitantes com base em seu tipo de servidor web:

1.  Certifique-se de que estejam instalados:
    -   Red Hat/Fedora`sudo yum install httpd-devel libtool git`
    -   Debian/Ubuntu`sudo apt-apt install apache2-dev libtool git`
2.  Clone o seguinte para a criação mais recente do  _mod\_cloudflare_:
    -   Red Hat/Fedora/Debian/Ubuntu:`git clone https://github.com/cloudflare/mod_cloudflare.git; cd mod_cloudflare`
3.  Use a ferramenta de extensão do Apache para converter o arquivo .c em um módulo:
    -   Red Hat/Fedora/Debain/Ubuntu:`apxs -a -i -c mod_cloudflare.c`
4.  Reinicialize e verifique se o módulo está ativo:
    -   Red Hat/Fedora`service httpd restart; httpd -M|grep cloudflare`
    -   Debian/Ubuntu:`sudo apachectl restart; apache2ctl -M|grep cloudflare`
5.  Se o servidor da internet estiver por trás de um balanceador de carga, adicione a seguinte linha à sua configuração do Apache (geralmente httpd.conf) e substitua 123.123.123.123 pelo endereço de IP do seu balanceador de carga:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">IfModule cloudflare_module</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CloudFlareRemoteIPHeader X-Forwarded-For</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CloudFlareRemoteIPTrustedProxy **[insert your load balancer’s IP address]**</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">DenyAllButCloudFlare</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/IfModule</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Use o módulo [`ngx_http_realip_module` Módulo NGINX](http://nginx.org/en/docs/http/ngx_http_realip_module.html) e os seguintes parâmetros de configuração:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">set_real_ip_from 192.0.2.1 (exemplo de endereço de IP)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">(repetir para todos os IPs da Cloudflare listados em [https://www.cloudflare.com/ips/)](https://www.cloudflare.com/ips/)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">#use um dos dois seguintes</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">real_ip_header CF-Connecting-IP;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">#real_ip_header X-Forwarded-For;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Essa lista de prefixos precisa ser atualizada regularmente. Publicamos a lista completa em [endereços de IP da Cloudflare](https://www.cloudflare.com/ips).

Consulte também: [Cloudflare e NGINX](https://danielmiessler.com/blog/getting-real-ip-addresses-using-cloudflare-nginx-and-varnish/).

1.  <Execute o seguinte script para instalar o mod\_cloudflare como parte do EasyApache: `bash <(curl -s https://raw.githubusercontent.com/cloudflare/mod_cloudflare/master/EasyApache/installer.sh)`
2.  Após a instalação, você precisa recompilar seu Apache com o novo plugin mod\_cloudflare.

Ao usar o Railgun (ou outro software de proxy reverso, como o Varnish), as solicitações do usuário virão do seu servidor de Railgun e não da Cloudflare. Devido ao fato de que as solicitações não virão diretamente da Cloudflare, qualquer mod adicionado não irá restaurar os endereços de IP dos visitantes por padrão.

1.  Para corrigir isso, abra sua configuração do Apache, que de modo geral pode ser encontrada em `/etc/apache2/apache2.conf`, `/etc/httpd/httpd.conf`, `/usr/local/apache/conf/httpd.conf` ou outro local, dependendo da configuração. Se você não tiver certeza, pergunte ao seu provedor de hospedagem.
2.  No final, adicione:`CloudflareRemoteIPTrustedProxy railgun_address`Portanto, se estiver localizado em 127.0.0.1, seu servidor de Railgun se parecerá com o seguinte:`CloudflareRemoteIPTrustedProxy 127.0.0.1`
3.  Se você tiver mais de um servidor para adicionar à lista de proxies confiáveis, poderá adicioná-los no final:CloudflareRemoteIPTrustedProxy 127.0.0.1 127.0.0.2

Para que o Lighttpd registre automaticamente o IP do servidor para os logs de acesso e para a sua aplicação, você pode seguir uma das duas soluções abaixo.

1.  Abra seu arquivo **lighttpd.conf** e adicione _mod\_extforward_ à lista  _server.modules_. Ela deve vir **após**_mod\_accesslog_ para mostrar o IP real nos registros de acesso
2.  Adicione o seguinte bloco de código em qualquer lugar no arquivo **lighttpd.conf** depois da lista de módulos do servidor e então reinicie o Lighttpd


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$HTTP[&quot;remoteip&quot;] == &quot;192.2.0.1 (example IP address)&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">extforward.forwarder = ( &quot;all&quot; =&gt; &quot;trust&quot; )</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">extforward.headers = (&quot;CF-Connecting-IP&quot;)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">}</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">(repetir para todos os IPs de Cloudflare listados em [https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/))</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

1.  Acesse o seu Web Admin Console do LiteSpeed.
2.  Habilite a opção Use Client IP no Cabeçalho, em Configuração.
3.  Uma vez ativada, seus logs de acesso passarão a mostrar os endereços IP corretos, e até a variável `$_SERVER['REMOTE_ADDR']` do PHP conterá o endereço de IP real do cliente, ao invés de um endereço de IP da Cloudflare, o que por si só resolverá a maioria dos problemas que você poderia encontrar ao ativar a Cloudflare em sites habilitados para PHP (como instalações do WordPress ou vBulletin).

##### Para o IIS 7 - 8:

Siga as instruções [aqui](https://techcommunity.microsoft.com/t5/iis-support-blog/how-to-use-x-forwarded-for-header-to-log-actual-client-ip/ba-p/873115).

##### Para o IIS 8.5 - 10:

Do IIS 8.5 em diante, os registros de log personalizados são uma opção integrada. Consulte [IIS Enhanced Logging](http://www.iis.net/learn/get-started/whats-new-in-iis-85/enhanced-logging-for-iis85)

1.  No Gerenciador do IIS, clique duas vezes em **Logging** no menu _Actions_ do site no qual você está trabalhando.
2.  Em seguida, selecione **W3C** como formato e clique em **Select Fields** ao lado do menu suspenso de formatação, na subseção _Log File_ .
3.  Clique em **Add Field** e adicione ao cabeçalho _CF-Connecting-IP_ .
4.  Clique em **Ok**. Você deverá ver sua nova entrada refletida em **Custom Fields**. Clique em **Apply** quando voltar à janela de _Logging_ .

1.  Se o procedimento for bem-sucedido, o arquivo de log agora deve ter um sublinhado:Você deverá também ver a alteração nos campos:
2.  Reinicie o site, em seguida o W3SVC e, a seguir, a instância inteira, se a alteração não for refletida imediatamente.Ao utilizar o registro aprimorado no IIS 8.5+, ele **não restaura** o IP original do visitante no nível do aplicativo.

Para que o Tomcat7 restaure automaticamente o IP do visitante original nos seus registros de acesso e aplicativo, você precisará adicionar `%{CF-Connecting-IP}i` ao seu esquema de registros.

Como exemplo, você pode adicionar o bloco abaixo ao seu arquivo server.xml

`<Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs" prefix="localhost_access_log." suffix=".txt" pattern="%{CF-Connecting-IP}i - %h %u %t - &quot;%r&quot; - %s - %b - %{CF-RAY}i"/>`

O que, como resultado, faria seus logs se parecerem com o seguinte:

`IP do visitante — IP da Cloudflare — [04/Dec/2014:23:18:15 -0500] - "GET / HTTP/1.1" - 200 - 1895 - 193d704b85200296-SJC`

Assista a esse tutorial de terceiros sobre como restaurar IPs de visitantes com o  [Magento e a Cloudflare](https://tall-paul.co.uk/2012/03/02/magento-show-remote-ip-when-using-cloudflare/).

Da mesma forma, a Cloudflare não escreveu essa [extensão Magento](https://marketplace.magento.com/), mas alguns de nossos clientes a acharam útil.

Como esse plug-in foi criado por terceiros, não podemos fornecer suporte técnico para problemas relacionados ao plug-in.

Para habilitar a equiparação correta do IP ao executar uma instalação do Invision Power Board 3 por meio da Cloudflare, siga essas instruções:

Faça login no ACP da sua instalação de IPB.

1.  Clique em **Sistema**.
2.  Em Overview, clique em **Security**.
3.  Em Security Center, clique em **Security Settings**.Verifique se _Trust IP addresses provided by proxies?_ está verde.

##### Descrição do IPB4 para _Trust IP addresses provided by proxies?_

Se o seu ambiente de rede significa que as solicitações são tratadas por meio de um proxy (como em uma situação de intranet em um escritório ou universidade ou em um cluster de servidores com carga balanceada), talvez seja necessário habilitar essa configuração para que o endereço IP correto seja usado. Quando estiver habilitada, no entanto, um usuário mal-intencionado poderá abusar do sistema para fornecer um endereço IP falso. Na maioria dos ambientes, essa configuração deve ser deixada desativada.

Informações sobre como restaurar IPs de visitantes com Simple Machines (SMF) podem ser encontradas no [Simple Machines Forum](https://custom.simplemachines.org/mods/index.php?mod=2502).

Se você estiver usando um servidor Apache, recomendamos instalar o [mod\_remoteip](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV) para restaurar o IP do visitante de volta para os seus registros.

Se você não tem acesso ao seu servidor para instalar um mod, então você pode [modificar o núcleo](https://www.phpbb.com/community/viewtopic.php?p=13936406#p13936406).

As versões mais recentes do MyBB incluem uma opção de Scrutinize User do endereço IP (examinar o usuário).

`CP Admin > Configuração > Opções de servidor e de otimização > Examinar o endereço IP do usuário? > Sim`

Alternativamente, você pode instalar o [plug-in de gerenciamento da Cloudflare](https://mods.mybb.com/view/antoligy-mybb-cloudflare-management-plugin) disponível para o MyBB 1.6.

##### MyBB 1.6.0, 1.6.1, 1.6.2, or 1.6.3

1.  Navegue até `./inc/functions.php`.
2.  Ir para a linha 2790.
3.  Substitua:`if(isset($_SERVER['REMOTE_ADDR']))`Por:`if(isset($_SERVER['HTTP_CF_CONNECTING_IP']))`
4.  Em seguida, substitua:`$ip = $_SERVER['REMOTE_ADDR'];`Por:`$ip = $_SERVER['HTTP_CF_CONNECTING_IP'];`

Um membro da equipe do Vanilla criou um plug-in da  [Cloudflare para o Vanilla](https://open.vanillaforums.com/addon/cloudflaresupport-plugin)  para restaurar o IP do visitante original nos arquivos de log para sites auto-hospedados.

Como esse plug-in foi criado por terceiros, não podemos fornecer suporte técnico para problemas relacionados ao plugin.MediaWiki

1.  Abra `includes/GlobalFunctions.php`. Aproximadamente na linha 370, altere o seguinte:`$forward = "\t(proxied via {$_SERVER['REMOTE_ADDR']}{$forward})";`TO`$forward = "\t(proxied via {$_SERVER['HTTP_CF_CONNECTING_IP']}{$forward})";`
2.  Abra `includes/ProxyTools.php`. Aproximadamente na linha 79, localize:`if ( isset( $_SERVER['REMOTE_ADDR'] ) ){`e substitua por:`if ( isset( $_SERVER['HTTP_CF_CONNECTING_IP'] ) ){`A segunda etapa se aplica apenas às versões 1.18.0 e anteriores do MediaWiki. As versões mais recentes do MediaWiki reescreveram completamente o ProxyTools.php e o código a seguir não está mais presente.
3.  Aproximadamente na linha 80, localize:`$ipchain = array( IP::canonicalize($_SERVER['REMOTE_ADDR']) );`Salve e carregue no seu servidor de origem.

##### Para versões em torno de 1.27.1:

1.  Vá para a linha 1232 em `GlobalFunctions.php`, altere `REMOTE_ADDR` para `HTTP_CF_CONNECTING_IP`.
2.  A seguir, vá para `WebRequest.php`, entre as linhas 1151 e 1159, altere `REMOTE_ADDR` para `HTTP_CF_CONNECTING_IP`.

Um usuário do Xenforo criou um [plugin para a Cloudflare](https://xenforo.com/community/resources/solidmean-cloudflare-detect.1595/).

Como esse plug-in foi criado por terceiros, não podemos fornecer suporte técnico para problemas relacionados ao plug-in.

1.  Abra `library/config.php`.
2.  No final, acrescente:`if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) { $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CF_CONNECTING_IP'];}`
3.  Carregue e substitua o arquivo.

Uma terceiro criou um [módulo para a Cloudflare e o PunBB](http://punbb.informer.com/forums/post/147539/#p147539) que irá restaurar o IP original do visitante.

Como esse plug-in foi criado por terceiros, não podemos fornecer suporte técnico para problemas relacionados ao servidor plugin.Cherokee

1.  Inicie o `cherokee-admin` no seu servidor.
2.  Navegue até a **interface de administração do Cherokee** no seu navegador web.
3.  Selecione o  **Virtual Server** para o domínio que está sendo atendido pela Cloudflare.
4.  Na guia _Logging_ do **Virtual Server** selecionado, ative Accept Forwarded IPs
5.  Na caixa  _Accept from Hosts_ , digite os [endereços de IP da Cloudflare](https://www.cloudflare.com/ips/).

Você pode corrigir o endereço IP alterando o campo `PHP IP Server Param` na configuração do servidor do Livezilla para `HTTP_CF_CONNECTING_IP`.

Para restaurar o IP do visitante no DataLife Engine:

1.  Abra:/engine/inc/include/functions.inc.phpLocalize:`$db_ip_split = explode( ".", $_SERVER['REMOTE_ADDR'] );`Altere para:`$db_ip_split = explode(".", $_SERVER['HTTP_CF_CONNECTING_IP'] );`
2.  Localize:`$ip_split = explode( ".", $_SERVER['REMOTE_ADDR'] );`Altere para:`$ip_split = explode(".", $_SERVER['HTTP_CF_CONNECTING_IP'] );`
3.  Abra:/engine/modules/addcomments.phpLocalize:`$_SERVER['REMOTE_ADDR'],`Altere para:`$_SERVER['HTTP_CF_CONNECTING_IP'],`
4.  Localize:`$db_ip_split = explode( ".", $_SERVER['REMOTE_ADDR'] );`Altere para:`$db_ip_split = explode( ".", $_SERVER['HTTP_CF_CONNECTING_IP'] );`

Um desenvolvedor externo criou uma [extensão da Cloudflare para TYPO3](https://extensions.typo3.org/extension/cloudflare/) que irá restaurar o IP do visitante original para os seus registros. A extensão também permite limpar seu cache da Cloudflare.

Como esse plug-in foi criado por terceiros, não podemos fornecer suporte técnico para problemas relacionados ao plug-in.

Se estiver usando o painel de controle de hospedagem do VestaCP, você terá tanto o Nginx quanto o Apache em execução no servidor. As solicitações são enviadas por proxy por meio do Nginx antes de ir para o Apache.

Devido a esse proxy do Nginx, você na verdade precisa das instruções para configurar o Nginx para retornar o endereço de IP do visitante real.[Mod\_remoteip](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV) para Apache não é necessário, a menos que você desative o servidor Nginx para algumas solicitações. Adicionar o  [mod\_remoteip](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV)  ao Apache não entrará em conflito com a configuração do servidor Nginx.

Um desenvolvedor externo criou um módulo para restaurar o IP do visitante chamado [node\_cloudflare.](https://github.com/keverw/node_CloudFlare)

___

## Restaurar o IP original do visitante com HAProxy

Para extrair o IP original do cliente no cabeçalho X\_FORWARDD\_FOR, é necessário utilizar a seguinte configuração no HAProxy:

1.  Crie um arquivo de texto CF`_ips.lst` contendo todas as faixas de IP de https://www.cloudflare.com/en-gb/ips/
2.  Assegure-se de desativar a `opção forwardfor` no HAProxy

Configuração do HAProxy:

`acl from_cf src -f /path/to/CF_ips.lst`

`acl cf_ip_hdr req.hdr(CF-Connecting-IP) -m found`

`http-request set-header X-Forwarded-For %[req.hdr(CF-Connecting-IP)] if from_cf cf_ip_hdr`

___

## Recursos relacionados

-   [Cabeçalhos de solicitação HTTP](/fundamentals/get-started/http-request-headers)
-   [Regras de transformação](/rules/transform/)
