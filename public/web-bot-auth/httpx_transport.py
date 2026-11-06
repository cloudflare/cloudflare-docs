import httpx


class WebBotAuthTransport(httpx.BaseTransport):
    def __init__(self, signer, transport=None):
        self._signer = signer
        self._inner = (
            transport if transport is not None else httpx.HTTPTransport(retries=0)
        )

    def handle_request(self, request):
        self._signer.apply(request.headers, request.url, request.method)
        return self._inner.handle_request(request)

    def close(self):
        self._inner.close()


class AsyncWebBotAuthTransport(httpx.AsyncBaseTransport):
    def __init__(self, signer, transport=None):
        self._signer = signer
        self._inner = (
            transport if transport is not None else httpx.AsyncHTTPTransport(retries=0)
        )

    async def handle_async_request(self, request):
        self._signer.apply(request.headers, request.url, request.method)
        return await self._inner.handle_async_request(request)

    async def aclose(self):
        await self._inner.aclose()
