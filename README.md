(Broken) CLI to generate SVG from Draw-the-net YAML description of network topologies
=====================================================================================

This repository is inspired from the [Draw-the-Net web application](https://github.com/cidrblock/drawthe.net). As such, it is not even remotely useful nor complete, let even in prototype status. Its purpose is to illustrate and provide meat and context to a GitHub pull request on the [JSDOM polyfill library](https://github.com/jsdom/jsdom) concerning the SVG `.getBoundingClientRect()` method.

For the overall context, see the [Draw-the-Net demo](http://go.drawthe.net/).

This repo has (only begun to) cannibalise the Draw-the-Net codebase in the expectation of providing a CLI able, in node js, to convert a YAML description of a network topology into an SVG graphical representation. As such, it relies on functionalities of a web browser to correctly render SVG on a DOM, which functionality is not present in a node js runtime. The JSDOM library provides a polyfill able to provide a DOM to node js; alas, its SVG support is lacking.
