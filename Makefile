download:
	curl -L https://github.com/tdewolff/minify/releases/download/v2.12.4/minify_linux_amd64.tar.gz > minify.tar.gz
	tar -xf minify.tar.gz

build: download
	npm run build
	./minify -r public -o .
