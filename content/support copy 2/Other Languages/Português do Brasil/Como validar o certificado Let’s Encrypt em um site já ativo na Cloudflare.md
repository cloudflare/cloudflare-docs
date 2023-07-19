---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/214820528-Como-validar-o-certificado-Let-s-Encrypt-em-um-site-j%C3%A1-ativo-na-Cloudflare
title: Como validar o certificado Let’s Encrypt em um site já ativo na Cloudflare
---

# Como validar o certificado Let’s Encrypt em um site já ativo na Cloudflare

## Como validar o certificado Let’s Encrypt em um site já ativo na Cloudflare

_Saiba como validar um certificado SSL Let’s Encrypt para um site ativo na Cloudflare._

___

## Visão geral

Este guia descreve detalhes adicionais sobre como usar o método Webroot para verificação no cliente oficial do Let’s Encrypt descrito na documentação desse link: [https://letsencrypt.readthedocs.org/en/Latest/using.html#webroot](https://letsencrypt.readthedocs.org/en/latest/using.html#webroot)

Observe que o método padrão utilizado para autenticação do ACME pelo cliente do Let’s Encrypt é o DVSNI. O método falhará para um domínio habilitado para a Cloudflare, já que concluímos o SSL (TLS) na nossa borda e o servidor ACME nunca verá o certificado que o cliente apresenta na origem. O uso de métodos alternativos de validação do ACME como DNS ou HTTP será concluído com sucesso quando a Cloudflare estiver habilitada.

___

## Validação de HTTP

Se você estiver configurando o Let’s Encrypt pela primeira vez para um site já ativo na Cloudflare, tudo o que é preciso fazer para verificar e obter seu certificado e seu par de chaves privadas com sucesso é usar o método Webroot para a verificação. 

1.  Baixe o cliente do Let’s Encrypt e alterne para o diretório de download:


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">git clone https://github.com/letsencrypt/letsencrypt</span></div></span></span></span></code></pre>{{</raw>}}


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cd letsencrypt/</span></div></span></span></span></code></pre>{{</raw>}}
    
2.  Execute o script de instalação automática:  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">./letsencrypt-auto</span></div></span></span></span></code></pre>{{</raw>}}
    
3.  Usando o cliente `letsencrypt` com o comando `certonly` e o sinalizador `--webroot` é possível verificar e obter o par cert/key usando a verificação de HTTP. Um exemplo de comando pode se parecer com o seguinte:  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/root/.local/share/letsencrypt/bin/letsencrypt certonly --webroot --webroot-path /usr/share/nginx/html/ --renew-by-default --email email@host.tld --text --agree-tos -d exemplo.tld -d www.exemplo.tld</span></div></span></span></span></code></pre>{{</raw>}}
    
      
    no qual  
    
    **\--webroot-path**
    
    é o diretório no qual o site está localizado no seu servidor (no exemplo, usando nginx);
    
    **\--renew-by-default**
    
    seleciona a renovação por padrão quando os domínios são um superconjunto de um certificado obtido anteriormente;
    
    **\--e-mail**
    
    é o e-mail de contato da recuperação e utilizado no cadastramento;
    
    **\--text**
    
    exibe o texto do resultado
    
    **\--agree-tos**
    
    dá o aceite ao Contrato de Assinatura do Let’s Encrypt
    
    **\-d**
    
    especifica os hostnames a serem adicionados ao SAN.
    
4.  A conclusão bem-sucedida desse método de verificação exibirá um texto parecido com o seguinte:  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Parabéns! Seu certificado e sua cadeia foram salvos em /etc/letsencrypt/live/exemplo.tld/fullchain.pem.    Seu certificado expirará em 2016-03-03. Para obter uma nova versão do certificado    no futuro, basta executar o Let’s Encrypt novamente.</span></div></span></span></span></code></pre>{{</raw>}}
    
5.  Observe que tanto o certificado quanto a chave serão salvos `/etc/letsencrypt/live/exemplo.tld/` . Após ambos terem sido obtidos, você precisará atualizar seu host virtual manualmente para que passe a utilizar esse par chave/cert.

Certifique-se de verificar as Page Rules para o domínio no painel da Cloudflare e confirme que não existe nenhuma que possa resultar no redirecionamento de uma solicitação da URL de validação ou que a torne acessível somente em HTTPS.

___

## Renovação

Quando chegar a hora da renovação, o [comando](https://letsencrypt.readthedocs.org/en/latest/using.html#renewal) `letsencrypt renew` deve permitir que o certificado seja renovado com sucesso sem qualquer alteração na configuração da Cloudflare, desde que:

-   O arquivo .conf utilizado pelo cliente letsencrypt para a renovação tenha um `authenticator = webroot` especificado.
-   O URL de validação seja acessível em HTTP.
-   Não existam redirecionamentos aplicados ao URL em questão. 

Alternativamente, a repetição das etapas acima também emitirá um novo certificado.
