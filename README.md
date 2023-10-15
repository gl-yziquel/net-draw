(Broken) CLI to generate SVG from Draw-the-net YAML description of network topologies
=====================================================================================

This repository is inspired from the [Draw-the-Net web application](https://github.com/cidrblock/drawthe.net). As such, it is not even remotely useful nor complete, let even in prototype status. DO NOT USE. Its purpose has been to extract the Draw-the-Net into one single command line interface, for command line consumption.

Status: It does generate an SVG seemingly correctly, but the height and width is therein set to 0. So: not satisfactory status. Nonetheless, the code extraction from the browser oriented javascript to pure node.js javascript has been performed. Please do feel free to capitalise on that work should you wish to provide satisfactory SVG files as output from the YAML Draw-the-Net format.

For the overall context, see the [Draw-the-Net demo](http://go.drawthe.net/).

The original codebase has been migrated to a setting where browser based functionalities are handled by the JSDOM polyfill library. The present codebase is likely an interesting testbed, should one wish to improve the support for SVG in JSDOM.

Execute `just run` to run the code on a sample YAML file, and `just clean` to clean up.

To generate the `urls.svg` file from the network topology description in `urls.yaml`, you can also perform `npx net_draw urls.yaml > urls.svg`.