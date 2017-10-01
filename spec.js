const Route = require('./lib/route');

describe('Testing Route Scraping', () => {

  it('Should handle an undefined url', (done) => {
    const route = new Route();
    route.get()
      .then((data) => {
        expect(data).toBe(undefined);
        done();
      })
      .catch((err) => { throw new Error(err) });
  });

  it('Should handle an empty url', (done) => {
    const route = new Route('');
    route.get()
    .then((data) => {
      expect(data).toBe(undefined);
      done();
    })
    .catch((err) => { throw new Error(err) });
  });

  it('Should properly parse a valid route url', (done) => {
    // Initializing a route scraping for 'Local Color' at Funk Rock City
    const url = 'https://www.mountainproject.com/v/local-color/105867551';
    const route = new Route(url);

    route.get()
      .then((data) => {
        expect(data).toEqual({
          parent: 'Funk Rock City',
          name: 'Local Color',
          type: 'TR',
          pitches: '1 pitch',
          length: 80,
          grade: '5.10b',
          stars: 2.0,
          description: 'If you liked Funkadelic and Manic Impression, this TR is more of the same.  Climb the Route Manic Impression or Veldhaus Route to access the large ledge & set a TR on the anchors mid-way between them.  The climbing more or less follows the hang of the rope.',
          location: '10 meters right of Right Of Passage there is a set of anchors at the top of this face for a TR. Please use your own biners and do not directly thread the anchors and wear them out.',
          protection: 'TR from fixed anchors.',
          url,
        });
        done();
      })
      .catch((err) => { throw new Error(err) });
  });

});
