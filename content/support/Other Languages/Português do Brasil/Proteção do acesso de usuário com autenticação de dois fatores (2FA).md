---
pcx_content_type: troubleshooting
language_tag: portugese
title: Proteção do acesso de usuário com autenticação de dois fatores (2FA)
source: https://support.cloudflare.com/hc/pt-br/articles/200167906-Prote%C3%A7%C3%A3o-do-acesso-de-usu%C3%A1rio-com-autentica%C3%A7%C3%A3o-de-dois-fatores-2FA-
title: Proteção do acesso de usuário com autenticação de dois fatores (2FA)
---

# Proteção do acesso de usuário com autenticação de dois fatores (2FA) – Central de Ajuda da Cloudflare



## Visão geral

A autenticação de dois fatores acrescenta uma camada a mais de segurança no login de contas da Cloudflare. Esta etapa de autenticação adicional exige que você forneça algo que você sabe, como uma senha do Cloudflare, e algo que você possui, como um código de autenticação de um dispositivo móvel.

Para garantir que você possa acessar com segurança sua conta, mesmo sem acesso ao seu dispositivo móvel, ou seja, um novo telefone, o Cloudflare também fornece códigos de backup para baixar. 

Os superadministradores são os únicos usuários que podem ativar o 2FA nas contas Cloudflare. Como titular da conta, você recebe automaticamente a função de superadministrador. Depois que o 2FA é ativado, todos os membros da conta Cloudflare precisam configurar o 2FA em seus dispositivos móveis.

___

## Habilite a autenticação de dois fatores para sua conta do Cloudflare

Para ativar a autenticação de dois fatores para o seu login no Cloudflare:

1.  Faça o login no painel da Cloudflare.
2.  No menu suspenso **Meu perfil**, clique em **Faturamento**.
3.  Clique na guia **Autenticação** .
4.  Role para baixo até a seção Autenticação de dois fatores e clique para alternar para _Ativado_ .

![URL antigo: https://support.cloudflare.com/hc/article_attachments/360038176711/2FA_enable.png IDs do artigo: 200167906 | Como obter acesso usando a autenticação de dois fatores (2FA)](/images/support/hc-import-2fa_enable.png)

___

## Configure a autenticação de dois fatores para o seu login no Cloudflare

Todos os titulares de conta Cloudflare precisam ativar o 2FA. Se você não é um superadministrador,

-   Você será forçado a ativar o 2FA antes de aceitar o convite para ingressar em uma conta do Cloudflare como membro.
-   Escolha seu aplicativo de autenticação preferido e baixe no seu dispositivo móvel. Existem vários aplicativos de autenticação disponíveis, incluindo [Google Authenticator](https://support.google.com/accounts/answer/1066447?co=GENIE.Platform%3DAndroid&hl=en&oco=0) . Você verá um código QR. 

Para ativar o 2FA:

1\. Digitalize o código QR com o seu dispositivo móvel e insira o código no aplicativo autenticador.

2\. Digite sua senha do Cloudflare e clique em **Avançar.**

-   Se não conseguir digitalizar o código QR, clique em **Não é possível digitalizar o código QR, Siga as etapas alternativas** para configurar seu aplicativo autenticador manualmente.

![captura de tela de uma tela com instruções sobre como ativar o 2FA, digitalizando um código QR com seu dispositivo móvel](/images/support/2FA_scan_QR_code.png)

3\. Digite sua senha e clique em **Avançar** novamente para ver seus códigos de revisão de backup.

4\. Depois de ver seus códigos de backup, recomendamos que você os salve em um local seguro. Você pode clicar em **Baixar** , **Imprimir** ou **Copiar** para salvar os códigos e clique em **Avançar** .

![URL antigo: https://support.cloudflare.com/hc/article_attachments/360038176771/2FA_review_and_backup_codes_v2.png IDs do artigo: 200167906 | Como obter acesso usando a autenticação de dois fatores (2FA)](/images/support/hc-import-2fa_review_and_backup_codes_v2.png)

Você pode gerar novamente seus códigos de backup na tela a seguir ou a qualquer momento na guia **Autenticação** .

5\. Clique em **Próximo** na tela de configuração do código de backup para Concluir. Você verá que **Autenticação de dois fatores** agora está _Ativado_ .

6\. Você também tem a opção de solicitar um novo conjunto de códigos de backup. Clique em **regenerá-los agora** para salvar um novo conjunto de códigos de backup de dois fatores.

![URL antigo: https://support.cloudflare.com/hc/article_attachments/360038176791/2FA_configuration_complete.png IDs do artigo: 200167906 | Como obter acesso usando a autenticação de dois fatores (2FA)](/images/support/hc-import-2fa_configuration_complete.png)

___

## Desativar autenticação de dois fatores para sua conta Cloudflare

Os superadministradores são os únicos usuários que podem ativar o 2FA nas contas Cloudflare. Isso faz com que o 2FA seja desativado para todos os membros da conta.

Para desativar o 2FA para sua conta do Cloudflare:

1.  Faça o login no painel da Cloudflare.
2.  No menu suspenso **Meu perfil**, clique em **Faturamento**.
3.  Clique na guia **Autenticação** .
4.  Role para baixo até a seção **Autenticação de dois fatores** e clique para alternar para _Desativado_ . Você verá uma tela de confirmação.
5.  Digite sua senha, um código de aplicativo autenticador ou um código de backup e clique em **Desativar** .

![URL antigo: https://support.cloudflare.com/hc/article_attachments/360038195192/2FA_disable.png IDs do artigo: 200167906 | Como obter acesso usando a autenticação de dois fatores (2FA)](/images/support/hc-import-2fa_disable.png)

___

## Restaure o acesso perdido à autenticação de dois fatores do Cloudflare

Os problemas mais comuns da 2FA estão relacionados à perda de acesso a um dispositivo móvel ou código de autenticação. Na maioria dos casos, você pode resolver o problema usando um código de backup ou revisando a documentação do seu aplicativo de autenticação preferido.

Ao configurar a 2FA, você foi solicitado a salvar seus códigos de backup em um local seguro. Para restaurar o acesso perdido usando um código de backup do Cloudflare:

1\. Recupere o código de backup de onde você o armazenou.

2\. Navegue até a página de login do Cloudflare.

3\. Digite o código de backup na tela de logon e clique em **Logon** .

![URL antigo: https://support.cloudflare.com/hc/article_attachments/360038176971/2FA_backup_code_login_annontated.png IDs do artigo: 200167906 | Como obter acesso usando a autenticação de dois fatores (2FA)](/images/support/hc-import-2fa_backup_code_login_annontated.png)

4\. Depois de usar um código de backup, ele se torna inválido.

5\. Se você tentar inserir novamente um código de backup ou digitar o código errado, verá uma mensagem de erro na parte inferior da tela. Após várias tentativas com falha, você será solicitado a fazer login novamente.

Documentação de alguns aplicativos de autenticação comuns para revisão:

-   [Google Authenticator](https://support.google.com/accounts/answer/185834?hl=en&ref_topic=2954345)

Se você ainda não conseguir fazer login na sua conta Cloudflare, [entre em contato com o suporte](mailto:support@cloudflare.com) . Você será solicitado a verificar a propriedade da sua conta fazendo alterações no código do conteúdo do servidor de origem.

___

## Recursos relacionados

-   [Documentação de autenticação do Google](https://support.google.com/accounts/answer/1066447?hl=en&ref_topic=2954345&co=GENIE.Platform%3DiOS&oco=0)
-   [Como configurar contas multiusuário no painel Cloudflare](https://support.cloudflare.com/hc/en-us/articles/205065067-Setting-up-Multi-User-accounts-on-Cloudflare)
