[private]
@default:
	just --list

clean:
	rm -rf node_modules/

run YAML:
	pnpm install
	npx net_draw {{ YAML }}