---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/360050483011-Compatibilidad-de-Cloudflare-con-los-servicios-gRPC
title: Compatibilidad de Cloudflare con los servicios gRPC
---

# Compatibilidad de Cloudflare con los servicios gRPC



## Información general

Google desarrolló el protocolo gRPC en 2015 para crear interfaces de programación de aplicaciones eficientes con cargas útiles más pequeñas con el fin de reducir el uso del ancho de banda, la latencia y acelerar las implementaciones. Cloudflare actualmente ofrece compatibilidad beta para que gRPC proteja tus API en cualquier terminal de gRPC con nube naranja.

La ejecución del tráfico gRPC en Cloudflare es compatible con la mayoría de nuestros productos, como el WAF, Gestión de bots y Reglas de página. La compatibilidad con gRPC está disponible en todos los planes de Cloudflare sin coste adicional. Sin embargo, pueden exisitir cargos adicionales por el tráfico gRPC en productos complementarios como Argo Smart Routing, WAF y Gestión de bots. La compatibilidad de gRPC ha sido ampliamente probada y se considera estable, pero aún así pueden aparecer errores.  Informa de comportamientos inesperados a [Soporte de Cloudflare](https://support.cloudflare.com/hc/articles/200172476) .

___

## Requisitos:

-   Tu servidor de gRPC tiene que escuchar en el puerto 443. 
-   Tu punto de conexión gRPC debe admitir TLS y HTTP/2.
-   HTTP/2 debe anunciarse a través de ALPN.
-   Utiliza _application/grpc_ o _application/grpc+<message type_ (por ejemplo: _application/grpc+proto_) para el encabezado **Content-Type** de las solicitudes de gRPC.

___

## Limitaciones

Los siguientes productos tienen capacidades limitadas con las solicitudes de gRPC:

-   **Argo Tunnel** no admite actualmente gRPC.
-   **Cloudflare Access** no admite el tráfico gRPC enviado a través del proxy inverso de Cloudflare. El tráfico gRPC será ignorado por Access si gRPC está habilitado en Cloudflare. Recomendamos desactivar gRPC para cualquier servidor de origen sensible protegido por Access o habilitar otro medio de autenticación del tráfico gRPC a tus servidores de origen.

___

## Habilitar gRPC

Sigue los siguientes pasos para habilitar gRPC:

{{<Aside type="note">}}
[Coloca en la nube naranja el
dominio](https://support.cloudflare.com/hc/articles/200169626) que aloja
tu servidor de gRPC.
{{</Aside>}}

1.  Inicia sesión en tu cuenta de Cloudflare.
2.  Selecciona la cuenta de Cloudflare correspondiente.
3.  Haz clic en la aplicación **Red** .
4.  Activa el **gRPC**.
