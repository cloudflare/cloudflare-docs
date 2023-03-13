---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/214820528-Cloudflare%EC%97%90-%EC%9D%B4%EB%AF%B8-%ED%99%9C%EC%84%B1%ED%99%94%EB%90%9C-%EC%82%AC%EC%9D%B4%ED%8A%B8%EC%9D%98-Let-s-Encrypt-%EC%9D%B8%EC%A6%9D%EC%84%9C-%EC%9C%A0%ED%9A%A8%EC%84%B1-%EA%B2%80%EC%82%AC
title: Cloudflare에 이미 활성화된 사이트의 Let’s Encrypt 인증서 유효성 검사
---

# Cloudflare에 이미 활성화된 사이트의 Let’s Encrypt 인증서 유효성 검사

## Cloudflare에 이미 활성화된 사이트의 Let’s Encrypt 인증서 유효성 검사

_활성 Cloudflare 사이트의 Let's Encrypt SSL 인증서의 유효성 검사 방법에 대해 알아보세요._

___

## 개요

본 가이드는 다음 문서에 설명된 공식 Let's Encrypt 클라이언트의 유효성 검사에 Webroot 방법을 사용하는방법을 자세히 소개합니다: [https://letsencrypt.readthedocs.org/en/latest/using.html#webroot](https://letsencrypt.readthedocs.org/en/latest/using.html#webroot)

참고로, Let's Encrypt 클라이언트의 ACME 인증 방법은 기본적으로 DVSNI 방법을 사용합니다. 이 방법은 Cloudflare가 SSL(TLS)을 에지에서 종료하고 ACME 서버가 원본에서 클라이언트가 제시한 인증서를 절대 보지 못하기 때문에, Cloudflare가 있는 도메인에서는 작동하지 않습니다. Cloudflare를 사용하는 경우, DNS나 HTTP 같은 다른 ACME 유효성 검사 방법을 사용하면 성공적으로 완료됩니다. 

___

## HTTP 유효성 검사

Cloudflare에 이미 활성화된 사이트에 처음으로 Let’s Encrypt를 구성하는 경우 유효성 검증에 Webroot 방법을 사용하기 위한 인증서와 개인 키를 성공적으로 확인하고 확보하기만 하면 됩니다. 

1.  Let’s Encrypt 클라이언트와 변경 사항을 다운로드 디렉토리에 다운로드하세요.


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">git clone https://github.com/letsencrypt/letsencrypt</span></div></span></span></span></code></pre>{{</raw>}}


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cd letsencrypt/</span></div></span></span></span></code></pre>{{</raw>}}
    
2.  자동 설치용 스크립트를 실행하세요.  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">./letsencrypt-auto</span></div></span></span></span></code></pre>{{</raw>}}
    
3.  `certonly` 명령과 `--webroot` 플래그를 포함한 `letsencrypt` 클라이언트를 사용하여 HTTP 검사를 사용하는 인증서/키 쌍을 확인하고 확보할 수 있습니다. 명령 예는 다음과 같습니다.  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/root/.local/share/letsencrypt/bin/letsencrypt certonly --webroot --webroot-path /usr/share/nginx/html/ --renew-by-default --email email@host.tld --text --agree-tos -d example.tld -d www.example.tld</span></div></span></span></span></code></pre>{{</raw>}}
    
      
    여기서  
    
    **\--webroot-path**
    
    는 사이트가 있는 서버의 디렉토리(예에서는 nginx)
    
    **\--renew-by-default**
    
    도메인이 이전 확보한 인증서의 상위 집합인 경우 기본으로 갱신을 선택합니다
    
    **\--email**
    
    등록 및 복원 연락에 사용하는 이메일입니다.
    
    **\--text**
    
    텍스트 출력을 표시합니다
    
    **\--agree-tos**
    
    Let’s Encrypt의 가입자 약정에 동의합니다
    
    **\-d**
    
    SAN에 추가할 호스트 이름을 지정합니다.
    
4.  이 확인 방법을 성공적으로 완료하면 다음과 비슷한 메시지가 나타납니다.  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">축하합니다! 인증서와 체인인이 /etc/letsencrypt/live/example.tld/fullchain.pem에 저장됐습니다.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    인증서는 2016-03-03에 만료됩니다. 앞으로 새 버전의 인증서를 받으려면</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Let's Encrypt를 다시 실행하면 됩니다.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}
    
5.  인증서와 키는 모두 `/etc/letsencrypt/live/example.tld/` 에 저장됩니다. 이들을 확보한 후 가상 호스트를 수동 업데이트하여 이 키/인증서 쌍을 사용하게 해야 합니다.

Cloudflare dashboard에서 도메인의 Page Rules를 확인하고 유효성 검사 URL 요청을 리디렉션하거나 HTTPS을 통해서만 액세스할 수 있게 하는 요소가 없는지 확인하세요.

___

## 갱신

갱신할 때가 되면 `letsencrypt renew` [명령](https://letsencrypt.readthedocs.org/en/latest/using.html#renewal)으로  Cloudflare 구성을 변경하지 않고 인증서를 성공적으로 갱신할 수 있어야 합니다. 단 다음과 같은 조건을 충족해야 합니다.

-   letsencrypt 클라이언트가 갱신에 사용하는 .conf 파일에 `authenticator = webroot`가 지정되어 있습니다.
-   유효성 검증 URL을 HTTP를 통해서만 액세스할 수 있습니다.
-   해당 URL에 리디렉션이 적용되지 않습니다. 

또는 위 단계를 다시 실행해도 새 인증서가 발행됩니다.
