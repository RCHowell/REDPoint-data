// Class to get route data given a route url (Mountain Project)
const request = require('request-promise');
const cheerio = require('cheerio');

const baseUrl = 'https://www.mountainproject.com';

function parseParagraphs($, paragraphs) {
  const data = {};
  paragraphs.each((i, e) => {
    const header = $(e);
    const text = header.text().trim();
    if (text === 'Permit Required') data.permitInfo = $(e).next().text();
    if (text === 'Description') data.description = $(e).next().text();
    if (text === 'Location') data.location = $(e).next().text();
    if (text === 'Protection') data.protection = $(e).next().text();
  });
  return data;
}

function makeStringNotEmpty(data) {
  return (data === undefined) ? 'None' : data;
}

class Route {
  constructor(page) {
    this.url = `${baseUrl}${page.url}`;
    this.id = page.page_id;
  }

  // Visits the url and retrieves the route data
  get() {
    if (this.url === undefined || this.url === '') return Promise.resolve(undefined);
    const data = {};
    return request(this.url).then((res) => {
      const $ = cheerio.load(res);
      // raw route info from info table on Mountain Project route page
      const info = $('#rspCol800 table tbody tr td').text().split(':');
      if (typeof info[1] === 'undefined') Promise.reject();
      const typeInfo = info[1].split(',');
      const paragraphs = $('h3.dkorange');
      data.name = $('h1.dkorange').text().trim();
      data.type = typeInfo[0].trim();
      // data.pitches = lengthInfo[1].trim();
      const matchLength = info[1].match(/[0-9]+?(?=')/g);
      data.length = (matchLength) ? Number.parseInt(matchLength[0], 10) : 0;
      data.grade = info[3].split(' ')[0].trim();
      data.stars = Number.parseFloat($('span#starSummaryText.small span').find('meta').attr('content'));

      const paragraphData = parseParagraphs($, paragraphs);
      data.needsPermit = (typeof paragraphData.permitInfo === 'undefined') ? 0 : 1;
      data.permitInfo = makeStringNotEmpty(paragraphData.permitInfo);
      data.description = makeStringNotEmpty(paragraphData.description);
      data.location = makeStringNotEmpty(paragraphData.location);
      data.protection = makeStringNotEmpty(paragraphData.protection);
      data.url = this.url;
      data.route_id = this.id;
      return data;
    });
  }
}

module.exports = Route;
