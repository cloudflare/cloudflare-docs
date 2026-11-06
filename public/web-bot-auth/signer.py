import base64
import hashlib
import json
import secrets
import time
from urllib.parse import urlsplit

from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey

SIGNING_HEADERS = ("signature", "signature-input", "signature-agent")


def b64url(value):
    return base64.urlsafe_b64encode(value).rstrip(b"=").decode("ascii")


def authority(url):
    host = url.hostname.encode("idna").decode("ascii").lower()
    if ":" in host:
        host = f"[{host}]"
    return host if url.port in (None, 443) else f"{host}:{url.port}"


def origin(value):
    url = urlsplit(value)
    if (
        url.scheme != "https"
        or not url.hostname
        or url.username
        or url.password
        or url.path not in ("", "/")
        or url.query
        or url.fragment
    ):
        raise ValueError("Use an HTTPS origin, such as https://bot.example.com")
    return f"https://{authority(url)}"


class Signer:
    def __init__(self, private_key, signature_agent, allowed_origins):
        self._key = serialization.load_pem_private_key(private_key, password=None)
        if not isinstance(self._key, Ed25519PrivateKey):
            raise TypeError("Web Bot Auth requires an Ed25519 private key")
        x = b64url(
            self._key.public_key().public_bytes(
                serialization.Encoding.Raw, serialization.PublicFormat.Raw
            )
        )
        self.public_jwk = {"crv": "Ed25519", "kty": "OKP", "x": x}
        canonical = json.dumps(self.public_jwk, separators=(",", ":")).encode("ascii")
        self.key_id = b64url(hashlib.sha256(canonical).digest())
        self._agent = json.dumps(origin(signature_agent))
        if not allowed_origins:
            raise ValueError("Set allowed_origins explicitly")
        self._allowed = {origin(value) for value in allowed_origins}

    def headers(self, url_value, method="GET", host=None):
        url = urlsplit(str(url_value))
        if url.scheme != "https" or f"https://{authority(url)}" not in self._allowed:
            return {}
        if url.username or url.password:
            raise ValueError("URL credentials are unsupported")
        host_value = authority(url)
        if host and host != host_value:
            raise ValueError("Do not override the Host header")
        created = int(time.time())
        params = (
            '("@authority" "@method" "@path" "@query" "signature-agent")'
            f';created={created};expires={created + 60};keyid="{self.key_id}"'
            f';alg="ed25519";nonce="{secrets.token_urlsafe(18)}";tag="web-bot-auth"'
        )
        base = "\n".join(
            [
                f'"@authority": {host_value}',
                f'"@method": {method}',
                f'"@path": {url.path or "/"}',
                f'"@query": ?{url.query}',
                f'"signature-agent": {self._agent}',
                f'"@signature-params": {params}',
            ]
        )
        signature = base64.b64encode(self._key.sign(base.encode("ascii"))).decode(
            "ascii"
        )
        return {
            "signature-agent": self._agent,
            "signature-input": f"sig1={params}",
            "signature": f"sig1=:{signature}:",
        }

    def apply(self, headers, url, method):
        for name in SIGNING_HEADERS:
            headers.pop(name, None)
        headers.update(self.headers(url, method, headers.get("host")))
