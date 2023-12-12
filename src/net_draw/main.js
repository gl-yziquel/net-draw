#!/usr/bin/env node
const fs = require('fs');
const yaml = require('js-yaml');

const htmlContent = fs.readFileSync('webpage.html', 'utf-8');

//const { JSDOM } = require('jsdom');
const puppeeter = require('puppeteer');

async function loadContents() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage()
  await page.setContent(htmlContent);
}

// see the link below for a puppeteer replacement of the commented out code.
// https://stackoverflow.com/questions/71452506/loading-html-into-chrome-followed-by-jsdom-instance
/*
const { window } = new JSDOM(htmlContent, {
  beforeParse(window) {
    window.Element.prototype.getComputedTextLength = function() {
      return 200
    }
  }
});
global.window = window;
global.document = window.document;
*/

/*
TODO: The require below should be run in the chrome browser. Not in the
calling node system. This is why the code below is commented.
*/
//const d4 = require('./dld4e-draw');

if (process.argv.length !== 3) {
  console.error('Usage: node read-yaml.js <filename>');
  process.exit(1);
}

const filename = process.argv[2];

let parsedData;
try {
  const yamlData = fs.readFileSync(filename, 'utf8');
  parsedData = yaml.safeLoad(yamlData);
} catch (err) {
  console.error(`Error reading or parsing the YAML file: ${err.message}`);
  process.exit(1);
}

(async () => {
  d4.draw(parsedData)
  const html = global.window.document
  const svgElement = document.querySelector('svg')
  console.log(svgElement.outerHTML)
  process.exit(0)
})()
