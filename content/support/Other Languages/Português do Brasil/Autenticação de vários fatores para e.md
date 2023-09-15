---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/115003614752-Autentica%C3%A7%C3%A3o-de-v%C3%A1rios-fatores-para-e-mail
title: Autenticação de vários fatores para e-mail
---

# Autenticação de vários fatores para e-mail

## Autenticação de vários fatores para e-mail

_Aumente a segurança da conta e evite o acesso não autorizado usando a autenticação de vários fatores para e-mails oferecida pela Cloudflare_

___

## Visão geral

A Cloudflare usa um método de autenticação de vários fatores (MFA) para aumentar a segurança da conta.  O MFA evita invasões à conta do cliente quando os invasores obtêm acesso não autorizado a uma conta porque a senha foi exposta ou era fácil de adivinhar.

A Cloudflare contestará qualquer tentativa de logon se o usuário fornecer as credenciais corretas a partir de um endereço IP não reconhecido.

![URL antiga: https://support.cloudflare.com/hc/article_attachments/360035322751/account_access_email.png IDs do artigo: 115003614752 | Autenticação de vários fatores para e-mails
](/images/support/hc-import-account_access_email.png)

A Cloudflare desafia o login enviando para o e-mail registrado na conta um código único que expira em 30 minutos. Depois que o código correto for fornecido pelo painel, esse IP será registrado e outras tentativas de login vindas desse endereço IP não serão questionadas por 90 dias.

![URL antiga: https://support.cloudflare.com/hc/article_attachments/360035323072/login_authentication.png IDs do artigo: 115003614752 | Autenticação de vários fatores para e-mails
](/images/support/hc-import-login_authentication.png)

Ao marcar "lembrar deste computador", esse dispositivo/navegador não receberá desafios de MFA por até 14 dias. Após 14 dias, a Cloudflare voltará a verificar o endereço IP para detectar logins desse dispositivo/navegador.

___

## Solução de problemas de MFA

Às vezes, os e-mails da Cloudflare são sinalizados como spam pelo serviço de e-mail do destinatário. Se você estiver esperando por um token de autenticação, verifique a pasta de spam em busca de e-mails da Cloudflare e configure um filtro para permitir e-mails da Cloudflare com endereço _o-reply@cloudflare.com__**.**_

Em outros casos, os e-mails são rejeitados pelo serviço de e-mail do destinatário. A Cloudflare tentará novamente, mas após algumas tentativas, sinalizará seu endereço de e-mail e não enviará mais nenhum.

Se, mesmo depois de confirmar que seu serviço de e-mail não está sinalizando a Cloudflare, você ainda não receber um e-mail, entre em contato com o [Suporte da Cloudflare.](https://support.cloudflare.com/requests/new)

___

## Recursos relacionados

-   [Proteção do acesso de usuário com autenticação de dois fatores](https://support.cloudflare.com/hc/pt-br/articles/200167906)
