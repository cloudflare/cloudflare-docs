from requests.adapters import HTTPAdapter


class WebBotAuthAdapter(HTTPAdapter):
    def __init__(self, signer, **kwargs):
        # urllib3 retries happen beneath send(), so disable them.
        if "max_retries" in kwargs:
            raise ValueError("Retry through Session.send() to generate a new signature")
        super().__init__(max_retries=0, **kwargs)
        self._signer = signer

    def send(self, request, **kwargs):
        self._signer.apply(request.headers, request.url, request.method)
        return super().send(request, **kwargs)
