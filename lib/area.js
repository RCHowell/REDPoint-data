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
    data.children = [];
    return request(this.url).then((res) => {
      const $ = cheerio.load(res);
      // const subtitle = $('h1.dkorange span');
      // Sort routes left to right
      console.log($('input[name="routeSortRadio"]').attr('title'));

      $('#leftNavRoutes').find('a').each((routeNumber, e) => {
        const name = $(e).text().replace(/'/g, "''").replace(/"/g, '');
        data.children.push({ name, routeNumber });
      });
      return data;
    });
  }
}

module.exports = Area;
