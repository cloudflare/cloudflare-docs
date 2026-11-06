package wba

import (
	"crypto/ed25519"
	"crypto/rand"
	"crypto/sha256"
	"crypto/x509"
	"encoding/base64"
	"encoding/json"
	"encoding/pem"
	"errors"
	"fmt"
	"net"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"time"
)

// Transport signs each RoundTrip, including requests created by redirects.
type Transport struct {
	inner   http.RoundTripper
	key     ed25519.PrivateKey
	keyID   string
	agent   string
	allowed map[string]bool
}

func authority(u *url.URL) string {
	host := strings.ToLower(u.Hostname())
	if port := u.Port(); port != "" && port != "443" {
		return net.JoinHostPort(host, port)
	}
	if strings.Contains(host, ":") {
		return "[" + host + "]"
	}
	return host
}

func origin(value string) (string, error) {
	u, err := url.Parse(value)
	if err != nil {
		return "", err
	}
	if u.Scheme != "https" || u.Hostname() == "" || u.User != nil ||
		(u.Path != "" && u.Path != "/") || u.RawQuery != "" || u.ForceQuery || u.Fragment != "" {
		return "", errors.New("use an HTTPS origin, such as https://bot.example.com")
	}
	for _, ch := range u.Host {
		if ch > 127 {
			return "", errors.New("use an ASCII hostname")
		}
	}
	return "https://" + authority(u), nil
}

func NewTransport(privatePEM []byte, signatureAgent string, allowedOrigins []string, inner http.RoundTripper) (*Transport, error) {
	block, _ := pem.Decode(privatePEM)
	if block == nil {
		return nil, errors.New("expected a PKCS#8 PEM private key")
	}
	parsed, err := x509.ParsePKCS8PrivateKey(block.Bytes)
	if err != nil {
		return nil, err
	}
	key, ok := parsed.(ed25519.PrivateKey)
	if !ok {
		return nil, errors.New("Web Bot Auth requires an Ed25519 private key")
	}
	agent, err := origin(signatureAgent)
	if err != nil {
		return nil, err
	}
	if len(allowedOrigins) == 0 {
		return nil, errors.New("set allowedOrigins explicitly")
	}
	allowed := make(map[string]bool)
	for _, value := range allowedOrigins {
		value, err := origin(value)
		if err != nil {
			return nil, err
		}
		allowed[value] = true
	}
	x := base64.RawURLEncoding.EncodeToString(key.Public().(ed25519.PublicKey))
	canonical, _ := json.Marshal(struct {
		Crv string `json:"crv"`
		Kty string `json:"kty"`
		X   string `json:"x"`
	}{"Ed25519", "OKP", x})
	digest := sha256.Sum256(canonical)
	if inner == nil {
		inner = http.DefaultTransport
	}
	return &Transport{inner, key, base64.RawURLEncoding.EncodeToString(digest[:]), strconv.Quote(agent), allowed}, nil
}

func (t *Transport) KeyID() string { return t.keyID }

func (t *Transport) RoundTrip(request *http.Request) (*http.Response, error) {
	r := request.Clone(request.Context())
	if r.Header == nil {
		r.Header = make(http.Header)
	}
	for name := range r.Header {
		if strings.EqualFold(name, "Signature") || strings.EqualFold(name, "Signature-Input") || strings.EqualFold(name, "Signature-Agent") {
			delete(r.Header, name)
		}
	}
	if !t.allowed[r.URL.Scheme+"://"+authority(r.URL)] {
		return t.inner.RoundTrip(r)
	}
	if r.URL.User != nil {
		return nil, errors.New("URL credentials are unsupported")
	}
	if r.Host != "" && r.Host != r.URL.Host {
		return nil, errors.New("do not override the Host header")
	}
	created := time.Now().Unix()
	nonce := make([]byte, 18)
	if _, err := rand.Read(nonce); err != nil {
		return nil, err
	}
	params := fmt.Sprintf(`("@authority" "@method" "@path" "@query" "signature-agent");created=%d;expires=%d;keyid="%s";alg="ed25519";nonce="%s";tag="web-bot-auth"`,
		created, created+60, t.keyID, base64.RawURLEncoding.EncodeToString(nonce))
	method := r.Method
	if method == "" {
		method = "GET"
	}
	path := r.URL.EscapedPath()
	if path == "" {
		path = "/"
	}
	base := strings.Join([]string{
		`"@authority": ` + authority(r.URL),
		`"@method": ` + method,
		`"@path": ` + path,
		`"@query": ?` + r.URL.RawQuery,
		`"signature-agent": ` + t.agent,
		`"@signature-params": ` + params,
	}, "\n")
	for _, ch := range base {
		if ch > 127 {
			return nil, errors.New("signature components must be ASCII")
		}
	}
	r.Header.Set("Signature-Agent", t.agent)
	r.Header.Set("Signature-Input", "sig1="+params)
	r.Header.Set("Signature", "sig1=:"+base64.StdEncoding.EncodeToString(ed25519.Sign(t.key, []byte(base)))+":")
	return t.inner.RoundTrip(r)
}

func (t *Transport) CloseIdleConnections() {
	if inner, ok := t.inner.(interface{ CloseIdleConnections() }); ok {
		inner.CloseIdleConnections()
	}
}
