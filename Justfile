[private]
@default:
	just --list

clean:
	rm -r target/
	rm -r node_modules/

run YAML="urls.yaml":
	pnpm install
	npm run browserify
	npx net_draw {{ YAML }}
