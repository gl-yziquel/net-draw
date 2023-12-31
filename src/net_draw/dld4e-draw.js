const d3 = require('d3');
const d4_process = require('./dld4e-process.js');
const d4_title = require('./dld4e-title.js');
const d4_gridlines = require('./dld4e-gridlines.js');
const d4_groups = require('./dld4e-groups.js');
const d4_connections = require('./dld4e-connections.js');
const d4_icons = require('./dld4e-icons.js');
const d4_notes = require('./dld4e-notes.js');
//const requirejs = require('requirejs');

// Commented. requirejs is not available within puppeteer.
/*
requirejs.config({
  nodeRequire: require,
  baseUrl: __dirname,
  paths: {
    'code-prettify': 'node_modules/code-prettifier/loader'
  }
})
*/

// The code below is a really ugly hack to get the module system to work more
// or less ok in node. The code was initially extracted from some code made
// for the browser and adapted to node. We are now trying to get that code
// executed back into a puppeteer browser in a more or less clean and modular
// way. This code is thus commented in order to make that port to puppeteer
// fail where the problem really is. Force fail to debug attitude. Thug life.
/*
let PR

// Use globalThis instead of window, and push that code into puppeteer.
global.window.define = function(name, args, response) {
  PR = response()
}

global.window.define.amd = true

function load_PR() {
  return new Promise((resolve, reject) => {
    requirejs(['code-prettify'], function(mod) {
      return resolve(PR)
    })
  })
}
*/

async function draw(doc) {
  // set the drawing defaults
  var drawingDefaults = {
    fill: "orange",
    aspectRatio: "1:1",
    rows: 10,
    columns: 10,
    groupPadding: .33,
    gridLines: true,
    gridPaddingInner: .4, // the space between icons (%)
    iconTextRatio: .33,
    margins: {top: 20, right: 20, bottom: 50, left: 20 }
  }
  // set the title defaults
  var titleDefaults = {
    text: "Decent looking diagrams for engineers",
    subText: "More information can be found at http://github.com/cidrblock/drawthe.net",
    author: "Bradley A. Thornton",
    company: "Self",
    date: new Date().toLocaleDateString(),
    version: 1.01,
    color: "orange",
    stroke: "orange",
    fill: "orange",
    heightPercentage: 6, // percent of total height
    logoUrl: "build/images/radial.png",
    logoFill: "orange"
  }
  // incase there are none
  var connections = doc.connections || [];
  var groups = doc.groups || [];
  var notes = doc.notes || [];
  var icons = doc.icons || [];

  // merge the doc properties into the defaults
  var diagram = Object.assign(drawingDefaults, doc.diagram || {})
  var title = Object.assign(titleDefaults, doc.title || {})

  // set the background color of the whole page
  document.body.style.background = diagram.fill

  // find a good fit for the diagram
  var parentBox = d3.select("#svg").node().getBoundingClientRect()
  var ratios = diagram.aspectRatio.split(':')

  // set the desired h/w
  var availbleHeight = parentBox.height - diagram.margins.top - diagram.margins.bottom
  var availbleWidth = parentBox.width - diagram.margins.left - diagram.margins.right

  if (availbleHeight < availbleWidth) {
    svgHeight = availbleHeight
    svgWidth = svgHeight/ratios[1] * ratios[0]
  } else if (availbleWidth < availbleHeight) {
    svgWidth = availbleWidth
    svgHeight = svgWidth/ratios[0] * ratios[1]
  } else {
    svgWidth = availbleWidth
    svgHeight = availbleHeight
  }
  // downsize if outside the bounds
  if (svgHeight > availbleHeight) {
    svgHeight = availbleHeight
    svgWidth = svgHeight/ratios[1] * ratios[0]
  }
  if (svgWidth > availbleWidth) {
    svgWidth = availbleWidth
    svgHeight = svgWidth/ratios[0] * ratios[1]
  }

  // using the svg dimentions, set the title and digrams
  title.height = svgHeight * title.heightPercentage/100
  diagram.height = svgHeight - title.height
  diagram.width = diagram.height/ratios[1] * ratios[0]
  diagram.x = (svgWidth - diagram.width)/2
  diagram.y = (svgHeight - title.height - diagram.height)

  // create our bands
  diagram.xBand = d3.scaleBand()
    .domain(Array.from(Array(diagram.columns).keys()))
    .rangeRound([diagram.x,diagram.width + diagram.x])
    .paddingInner(diagram.gridPaddingInner);

  diagram.yBand = d3.scaleBand()
    .domain(Array.from(Array(diagram.rows).keys()).reverse())
    .rangeRound([diagram.y,diagram.height + diagram.y])
    .paddingInner(diagram.gridPaddingInner);

  // remove the old diagram
  d3.select("svg").remove();

  // and add the svg
  var svg = d3.select("#svg").append("svg")
    .attr("width", parentBox.width )
    .attr("height", parentBox.height )
    .style("background-color", diagram.fill )
    .call(d3.zoom().on("zoom", function () {
        svg.attr("transform", d3.event.transform)
    }))
    .append("g")
      .attr("transform", "translate(" + (parentBox.width - svgWidth)/2 + "," + (parentBox.height - svgHeight)/2 + ")");

  // set x1,y1,x2,y2,width,height,centerX and centerY for all the stuff
  notes = d4_process.processEntities(svg, diagram, notes)
  icons = d4_process.processEntities(svg, diagram, icons)
  connections = d4_process.processConnections(connections, groups, icons)
  groups = d4_process.processGroups(groups, diagram, icons)

  // draw all the things
  d4_title.drawTitle(svg, diagram, title)
  d4_gridlines.drawGridLines(svg, diagram)
  d4_groups.drawGroups(svg, diagram, groups, icons)
  d4_connections.drawConnections(svg, diagram, connections, icons, notes)
  d4_icons.drawIcons(svg, diagram, icons, diagram.iconTextRatio)
  d4_notes.drawNotes(svg, diagram, notes)
  let PR = await load_PR()
  PR.prettyPrint()

  // move all the labels to the front
  svg.selectAll('.connectionLabel')
    .each( function(d) { d3.select(this).moveToFront(); } )
  svg.selectAll('.groupLabel')
    .each( function(d) { d3.select(this).moveToFront(); } )
  svg.selectAll('.iconLabel')
    .each( function(d) { d3.select(this).moveToFront(); } )
};

// Commented out node-specific code.
/*
module.exports = {
  draw,
};
*/

// Exporting to global object to access draw() after browserify.
globalThis.window.draw = draw
