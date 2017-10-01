// This is not an automated test file. See spec.js for automated tests
// The purpose of this file is for viewing class function and debugging
const Route = require('../lib/route');

const route = new Route('https://www.mountainproject.com/v/go-easy-billy-clyde/106282988');

route.get().then((data) => {
  console.log(data);
});
