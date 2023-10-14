#!/usr/bin/env node
const fs = require('fs');
const yaml = require('js-yaml');

if (process.argv.length !== 3) {
  console.error('Usage: node read-yaml.js <filename>');
  process.exit(1);
}

const filename = process.argv[2];

try {
  const yamlData = fs.readFileSync(filename, 'utf8');
  const parsedData = yaml.safeLoad(yamlData);
} catch (err) {
  console.error(`Error reading or parsing the YAML file: ${err.message}`);
  process.exit(1);
}

draw(parsedData)
