(Broken) CLI to generate SVG from Draw-the-net YAML description of network topologies
=====================================================================================

This repository is inspired from the [Draw-the-Net web application](https://github.com/cidrblock/drawthe.net). As such, it is not even remotely useful nor complete, let even in prototype status. DO NOT USE. Its purpose is to illustrate and provide meat and context to a GitHub pull request on the [JSDOM polyfill library](https://github.com/jsdom/jsdom) concerning the SVG `.getBoundingClientRect()` method.

For the overall context, see the [Draw-the-Net demo](http://go.drawthe.net/).

This repo has (only begun to) cannibalise the Draw-the-Net codebase in the expectation of providing a CLI able, in node js, to convert a YAML description of a network topology into an SVG graphical representation. As such, it relies on functionalities of a web browser to correctly render SVG on a DOM, which functionality is not present in a node js runtime. The JSDOM library provides a polyfill able to provide a DOM to node js; alas, its SVG support is lacking. Which is highlighted below:

Execute `just run` to run the code on a sample YAML file, and `just clean` to clean up.

```console
mini-me@virtucon ~/git/draw-net-cli (master)> just run
pnpm install
Lockfile is up to date, resolution step is skipped
Already up to date
Done in 808ms
npx net_draw urls.yaml
/home/mini-me/git/draw-net-cli/src/net_draw/dld4e-draw.js:45
  var parentBox = d3.select("#svg").node().getBoundingClientRect()
                                          ^

TypeError: Cannot read properties of null (reading 'getBoundingClientRect')
    at Object.draw (/home/mini-me/git/draw-net-cli/src/net_draw/dld4e-draw.js:45:43)
    at Object.<anonymous> (/home/mini-me/git/draw-net-cli/src/net_draw/main.js:28:4)
    at Module._compile (node:internal/modules/cjs/loader:1241:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1295:10)
    at Module.load (node:internal/modules/cjs/loader:1091:32)
    at Module._load (node:internal/modules/cjs/loader:938:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:83:12)
    at node:internal/main/run_main_module:23:47

Node.js v20.7.0
error: Recipe `run` failed on line 10 with exit code 1
```