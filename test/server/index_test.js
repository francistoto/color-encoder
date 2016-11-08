require(global.TEST_HELPER); // <--- This must be at the top of every test file.

const request = require('supertest-as-promised');

const routes = require(`${global.__server}/index.js`);

describe('The Server', () => {
  const app = global.TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  global.it_('serves HTML to the root endpoint', function* anon() {
    yield request(app)
    .get('/')
    .expect(200)
    .expect((response) => {
      global.expect(response.res.headers['content-type']).to.equal('text/html; charset=UTF-8');
    });
  });
});
