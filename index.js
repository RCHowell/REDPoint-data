/**
  This is the main scraping script.
  This script performs a Depth First Search starting at the base of the Red River Gorge.
  This script constructs a table of the pages it found and their type.
  This script also constructs a transitive closure table
  for SQL graph representation and efficient descendent querying in SQL

  @ Author R. C. Howell 2017
*/

const request = require('sync-request');
const cheerio = require('cheerio');
const fs = require('fs');

const pages = fs.createWriteStream('./data/pages.tsv');
const relationships = fs.createWriteStream('./data/relationships.tsv');

// Write TSV Headers
// pages.write('PAGE_ID\tPAGE_NAME\tPAGE_URL\tIS_ROUTE\n');
// relationships.write('PARENT_ID\tCHILD_ID\n');

// Count tallies up how many nodes have been made, and uses that the node id
let COUNT = 0;

class Node {
  constructor(name, url, type) {
    COUNT += 1;
    this.id = COUNT;
    this.name = name;
    this.url = url;
    this.children = [];
    this.type = type;
  }

  addChild(child) {
    this.children.push(child);
  }
}

function writeToTSV(parent, child) {
  // This data is intended to be inserted into sqlite which doesn't have a boolean type
  const isRoute = (child.type === 'route') ? 1 : 0;
  pages.write(`${child.id}\t"${child.name}"\t"${child.url}"\t${isRoute}\n`);
}

// Setup to perform depth first search
const discovered = new Map();
const stack = []; // Javascript arrays behave like stacks

// Setup ancestry tracking during the search
const ancestries = new Map();

// Setup where to start searching from
const baseUrl = 'https://www.mountainproject.com';
const rootUrl = '/v/red-river-gorge/105841134';
const rootNode = new Node('Red River Gorge', rootUrl, 'area');

// Write root node without giving a parent
// writeToTSV(undefined, rootNode);

// Initialize control structures
stack.push(rootNode);
ancestries.set(rootNode.id, []);

// Regular expression used for decision making
const childrenAreAreas = /Select Area.../;

// Begin search to construct graph
while (stack.length !== 0) {
  const node = stack.pop();
  const nodeAnsestry = ancestries.get(node.id);
  const newAnsestry = nodeAnsestry.concat(node.id);
  if (discovered.has(node) === false) {
    discovered.set(node.name, true);

    // Scrape Info about this node's potential children
    const res = request('GET', `${baseUrl}${node.url}`);
    const body = res.getBody();
    const $ = cheerio.load(body);
    const listTitleElement = $('#viewerLeftNavColContent').find('b').get(1);
    const listTitle = $(listTitleElement).text();
    // List Title tells us what the children are.
    // Set a boolean to true if the children are areas.
    const discoveringAreas = childrenAreAreas.test(listTitle);

    // This could be refactored, but it's easier to understand like this
    if (discoveringAreas) {
      $('#viewerLeftNavColContent').find('a[target=_top]').each((i, e) => {
        const name = $(e).text().replace(/'/g, "''").replace(/"/g, "");
        const url = $(e).attr('href');
        const child = new Node(name, url, 'area');
        writeToTSV(node, child);
        ancestries.set(child.id, newAnsestry);
        node.addChild(child);
        stack.push(child);
      });
    } else {
      $('#leftNavRoutes').find('a').each((i, e) => {
        const name = $(e).text().replace(/'/g, "''").replace(/"/g, "");
        const url = $(e).attr('href');
        const child = new Node(name, url, 'route');
        writeToTSV(node, child);
        ancestries.set(child.id, newAnsestry);
        node.addChild(child);
      });
    }
  }
}


pages.end();

// Write the transitive closure table
ancestries.forEach((ancestry, id) => {
  const { length } = ancestry;
  for (let depth = 1; depth <= length; depth += 1) {
    const parentId = ancestry[length - depth];
    relationships.write(`${parentId}\t${id}\t${depth}\n`);
  }
});

relationships.end();
