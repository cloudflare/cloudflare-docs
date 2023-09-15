---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/205043158-Conformidad-con-el-est%C3%A1ndar-de-seguridad-de-datos-PCI-y-certificados-SSL-TLS-de-Cloudflare
title: Conformidad con el estándar de seguridad de datos  PCI y certificados SSLTLS de Cloudflare
---

# Conformidad con el estándar de seguridad de datos  PCI y certificados SSL/TLS de Cloudflare



## Información general

Debido a vulnerabilidades conocidas, las versiones del protocolo TLS 1.0 y 1.1 no son suficientes para proteger la información. En lo que respecta a los clientes de Cloudflare, el impacto principal del estándar PCI es que estas versiones del protocolo son insuficientes para asegurar el tráfico relacionado con tarjetas de pago.

Los estándares de PCI recomiendan el uso del protocolo TLS 1.2. o superior.

También puedes consultar las medidas de [mitigación que implementa Cloudflare contra las vulnerabilidades](https://support.cloudflare.com/hc/en-us/articles/205043158#h_1TWWDdoBc31LFYj9kVNwlu) del protocolo TLS en las versiones 1.0 y 1.1.

___

## Set Minimum TLS Version to 1.2

To configure your Cloudflare domain to only allow connections using TLS 1.2 or newer protocols:

1\. Log in to the Cloudflare dashboard.

2\. Click the appropriate Cloudflare account and application.

4\. Navigate to **SSL/TLS** > **Edge Certificates**.

5\. For **Minimum TLS Version**, select **TLS 1.2** or higher.

___

## Mitigaciones de Cloudflare contra vulnerabilidades TLS conocidas

Cloudflare lleva a cabo varias mitigaciones contra vulnerabilidades conocidas para versiones TLS previas a 1.2. Por ejemplo, Cloudflare no es compatible con:

1.  Compresión de encabezado en TLS
2.  Compresión de encabezado en SPDY 3.1
3.  RC4
4.  SSL 3.0
5.  Renegociación con clientes
6.  Suites de cifrado DHE
7.  Cifrados para exportación

Las mitigaciones de Cloudflare brindan protección contra los siguientes ataques:

-   CRIME
-   BREACH
-   POODLE
-   Vulnerabilidades criptográficas de RC4
-   Ataque de renegociación SSL
-   Ataques de degradación de protocolo
-   FREAK
-   LogJam
-   3DES está deshabilitado por completo para TLS 1.1 y 1.2 y Cloudflare implementa mitigaciones para TLS 1.0

Cloudflare proporciona mitigaciones adicionales para:

-   Heartbleed
-   Trece con suerte
-   Vulnerabilidad de inyección CCS

Cloudflare ha aplicado parches contra estas vulnerabilidades en todos los servidores. Además, existen reglas administradas del WAF que mitigan varias de estas vulnerabilidades como Heartbleed y ShellShock.

### Retorno de la amenaza del oráculo de Bleichenbacher (ROBOT)

Los análisis de seguridad que notan la presencia de ROBOT en Cloudflare son un falso positivo. Cloudflare controla el relleno (padding) en tiempo real y cambia a una clave de sesión aleatoria si este es incorrecto.

### Sweet32 (CVE-2016-2183)

Una vulnerabilidad en el uso del algoritmo de encriptación Triple DES (3DES) en el protocolo Transport Layer Security (TLS). Sweet32 es actualmente un ataque de prueba de concepto, del que no hay casos conocidos circulando libremente. Cloudflare ha mitigado manualmente la vulnerabilidad de TLS 1.0 de la siguiente manera:

-   El atacante debe recabar 32 GB de datos de una sola sesión TLS.
-   Cloudflare fuerza nuevas claves de sesión de TLS 1.0 en el cifrado 3DES afectado mucho antes de que se recolecten los 32 GB de datos.
