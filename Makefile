download:
	curl -L https://github.com/tdewolff/minify/releases/download/v2.12.5/minify_linux_amd64.tar.gz > minify.tar.gz
	tar -xf minify.tar.gz

hugo:
	curl -L https://github.com/gohugoio/hugo/releases/download/v0.110.0/hugo_extended_0.110.0_Linux-64bit.tar.gz > hugo.tar.gz
	tar -xf hugo.tar.gz

build: download hugo
	npm run build:local
	./minify -q -r public -o .

tools:
	@echo "==> Installing development tooling..."
	go generate -tags tools tools/tools.go
