[private]
@default:
	just --list

clean:
	rm -rf node_modules/

run YAML="urls.yaml":
	pnpm install
	npx net_draw {{ YAML }}