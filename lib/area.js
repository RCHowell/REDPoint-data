// class to get area info given an area url
const request = require('request-promise');
const cheerio = require('cheerio');

class Area {
  constructor(url) {
    this.url = url;
  }

  get() {
    if (this.url === undefined || this.url === '') return Promise.resolve(undefined);
    const data = {};
    return request(this.url).then((res) => {
      const $ = cheerio.load(res);
      const subtitle = $('h1.dkorange span');
      return subtitle;
    });
  }
}

module.exports = Area;
