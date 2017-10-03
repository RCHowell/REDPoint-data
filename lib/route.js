// Class to get route data given a route url (Mountain Project)
const request = require('request-promise');
const cheerio = require('cheerio');

class Route {
  constructor(url) {
    this.url = url;
  }

  // Visits the url and retrieves the route data
  get() {
    if (this.url === undefined || this.url === '') return Promise.resolve(undefined);
    const data = {};
    return request(this.url).then((res) => {
      const $ = cheerio.load(res);
      // raw route info from info table on Mountain Project route page
      const info = $('#rspCol800 table tbody tr td').text().split(':');
      const lengthInfo = info[1].split(',');
      const paragraphs = $('h3.dkorange');
      data.parent = $('#viewerLeftNavColContent').find('td').eq(0).text();
      data.name = $('h1.dkorange').text().trim();
      data.type = lengthInfo[0].trim();
      // data.pitches = lengthInfo[1].trim();
      data.length = Number.parseInt(info[1].match(/[0-9]\w/g)[0], 10);
      data.grade = info[3].split(' ')[0].trim();
      data.stars = Number.parseFloat($('span#starSummaryText.small span').find('meta').attr('content'));
      data.description = paragraphs.next().eq(0).text().trim();
      data.location = paragraphs.next().eq(1).text().trim();
      data.protection = paragraphs.next().eq(2).text().trim();
      data.url = this.url;
      return data;
    });
  }
}

module.exports = Route;
