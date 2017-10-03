const fs = require('fs');
const path = require('path');
const csvjson = require('csvjson');
const Route = require('./lib/route');

const baseUrl = 'https://www.mountainproject.com';

const pageFile = fs.readFileSync(path.join(__dirname, 'pages.tsv'), { encoding: 'utf8' });
const options = {
  delimiter: '\t',
  quote: '"',
};

const pages = csvjson.toArray(pageFile, options);
const { length } = pages;

// Promise runners for getting routes
const runners = [];

for (let i = 0; i < 100; i += 1) {
  const page = pages[i];
  if (page[3] !== 'true') continue;
  const url = `${baseUrl}${page[2]}`;
  const route = new Route(url);
  runners.push(route.get().catch((err) => {
    console.error(err);
    console.log(`For ${url}`);
  }));
}

Promise.all(runners).then((data) => {
  console.log(csvjson.toCSV(data, options));
});
