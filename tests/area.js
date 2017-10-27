// This is not an automated test file. See spec.js for automated tests
// The purpose of this file is for viewing class function and debugging
const Area = require('../lib/area');

const area = new Area(process.argv[2]);

area.get().then((data) => {
  console.log(data);
});
