reset:
	cd ..
	git reset HEAD~30 --hard
	git clean -xdf
	cp ../docs/migrate/Makefile .

run:
	git fetch upstream production:production
	git pull upstream production

	@echo "\n~> copying /migrate directory"
	cp -rf ../docs/migrate .
	git add migrate
	@git commit -m "import migrate directory"

	@echo "\n~> creating /product-icons directory"
	@node create-svg-files.js

	cd migrate && pnpm i && pnpm migrate

# TODO: remove _headers
	@echo "\n~> copying content/* static files"
	cp ../docs/content/404.html content/.
	cp ../docs/content/_headers content/.
	git add content
	@git commit -m "import static content files"

	@echo "\n~> copying /assets directory"
	cp -rf ../docs/assets .
	git add assets
	@git commit -m "import assets directory"

	@echo "\n~> copying /layouts directory"
	cp -rf ../docs/layouts .
	git add layouts
	@git commit -m "import layouts directory"

	@echo "\n~> copying /config.toml file"
	cp ../docs/config.toml .
	git add config.toml
	@git commit -m "import config.toml file"

	@echo "\n~> copying /.vscode dir"
	cp ../docs/.editorconfig .
	cp -rf ../docs/.vscode .
	git add .vscode .editorconfig
	@git commit -m "import .vscode dir"

	@echo "\n~> copying /layouts directory"
	cp ../docs/package.json .
	rm *.js
	git add package.json *.js
	@git commit -m "update root files"

	@echo "\n~> updating .github/workflows directory"
	rm -rf .github/workflows
	cp -rf ../docs/.github/workflows .github/.
	git add .github
	@git commit -m "update github actions"

	@echo "\n~> importing Pages build scripts"
	cp -rf ../docs/bin .
	cp ../docs/Makefile .
	git add Makefile bin
	@git commit -m "import Pages build scripts"

	@echo "\n~> cleanup~!"
	rm -rf migrate
	git add migrate
	@git commit -m "remove migrate directory"

	@echo "\n~> removing components directories"
	-find content -name 'components' -type d -exec rm -rf {} \;
	@git add content
	@git commit -m "remove component dirs"

	@echo "\n~> removing website directory"
	rm -rf developers.cloudflare.com
	@git add developers.cloudflare.com
	@git commit -m "remove website dir"

	@echo "\n\n---\nRUN CURLs for STYLESHEETS~!\n---\n\n"

css:
	curl https://developers.cloudflare.com/styles.5e61057f51b868ffa0e8.css >> static/home.css
	curl https://developers.cloudflare.com/workers/styles.fb3b557bbbe33544deb0.css >> static/style.css


test: css
	pnpm i
	hugo serve -D