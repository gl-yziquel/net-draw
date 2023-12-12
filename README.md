(Broken) CLI to generate SVG from Draw-the-net YAML description of network topologies
=====================================================================================

This repository is inspired from the [Draw-the-Net web application][drawthe.net].
As such, it is not even remotely useful nor complete, let even in prototype
status. **DO NOT USE**. Its purpose has been to extract the Draw-the-Net
codebase into one single command line interface, for command line consumption.

[drawthe.net]: https://github.com/cidrblock/drawthe.net

Status: It does generate an SVG seemingly correctly, but the height is therein
set to 0. So: not a satisfactory situation. Nonetheless, the code extraction
from the browser oriented javascript to pure node.js javascript has been
performed. Please do feel free to capitalise on that work should you wish
to provide satisfactory SVG files as output from the YAML Draw-the-Net format
from a command line interface.

For the overall context, see the [Draw-the-Net demo][demo].

[demo]: http://go.drawthe.net/

The original codebase has initially been migrated to a setting where browser
based functionalities are handled by [the JSDOM polyfill library][jsdom]. It
then has been ported to run in a headless browser with puppeteer, and that is
the actual situation. This means that there is a development pathway to improve
the behaviour of the library in both context (JSDOM polyfill and puppeteer)
before making the library behave well in a standalone setup and eventually get
it packaged for pure node. The present codebase is alos likely an interesting
testbed, should one wish to improve the support for SVG in the JSDOM polyfill
library.

[jsdom]: https://github.com/jsdom/jsdom

Execute `just run` to run the code on a sample YAML file, and `just clean` to
clean up.

To generate the `urls.svg` file from the network topology description in
`urls.yaml`, you can also perform `npx net_draw urls.yaml > urls.svg`.

The `npm install -g .` command will install the `net_draw` executable on your
system.

**NOTA BENE**: All this really is a quick hack.
