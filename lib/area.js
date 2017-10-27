// class to get area info given an area url
const request = require('request-promise');
const cheerio = require('cheerio');

const baseUrl = 'https://www.mountainproject.com';

class Area {
  constructor(url) {
    this.url = `${baseUrl}${url}`;
  }

  get() {
    if (this.url === undefined || this.url === '') return Promise.resolve(undefined);
    const data = {};
    data.children = [];
    return request(this.url).then((res) => {
      const $ = cheerio.load(res);
      $('#leftNavRoutes tr').each((i, tr) => {
        const url = $(tr).find('a').attr('href');
        // const name = $(e).text().replace(/'/g, "''").replace(/"/g, '');
        const routeNumber = $(tr).attr('poslr');
        if (url) data.children.push({ url: `${baseUrl}${url}`, routeNumber });
      });
      return data;
    });
  }
}

module.exports = Area;
